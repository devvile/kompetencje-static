/*
 * POST /api/stripe/webhook — JEDYNE miejsce, które zmienia status zgłoszenia.
 * Weryfikacja podpisu (STRIPE_WEBHOOK_SECRET); idempotentne (Stripe ponawia
 * zdarzenia). Zdarzenia (Dashboard → Webhooks, lokalnie `stripe listen`):
 *  checkout.session.completed             → oplacone (gdy payment_status = paid)
 *  checkout.session.async_payment_succeeded → oplacone (płatności odroczone)
 *  checkout.session.async_payment_failed  → porzucone
 *  checkout.session.expired               → porzucone (tylko z „oczekuje")
 *  charge.refunded                        → zwrot (pełny zwrot)
 */
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";

async function markPaid(s: Stripe.Checkout.Session) {
  const id = s.client_reference_id ?? s.metadata?.zgloszenie_id;
  if (!id) return;
  await supabaseAdmin()
    .from("zgloszenia")
    .update({
      status: "oplacone",
      oplacone_at: new Date().toISOString(),
      stripe_session_id: s.id,
      stripe_payment_intent: typeof s.payment_intent === "string" ? s.payment_intent : (s.payment_intent?.id ?? null),
      kwota_grosze: s.amount_total,
      waluta: s.currency?.toUpperCase() ?? null,
    })
    .eq("id", id)
    .neq("status", "zwrot");
}

async function markAbandoned(s: Stripe.Checkout.Session) {
  const id = s.client_reference_id ?? s.metadata?.zgloszenie_id;
  if (!id) return;
  await supabaseAdmin().from("zgloszenia").update({ status: "porzucone" }).eq("id", id).eq("status", "oczekuje");
}

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = req.headers.get("stripe-signature");
  if (!secret || !sig) return new Response("Brak konfiguracji webhooka", { status: 400 });

  const body = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe().webhooks.constructEvent(body, sig, secret);
  } catch {
    return new Response("Nieprawidłowy podpis", { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const s = event.data.object;
        if (s.payment_status === "paid") await markPaid(s);
        break; // „unpaid" = płatność odroczona → czekamy na async_payment_*
      }
      case "checkout.session.async_payment_succeeded":
        await markPaid(event.data.object);
        break;
      case "checkout.session.async_payment_failed":
      case "checkout.session.expired":
        await markAbandoned(event.data.object);
        break;
      case "charge.refunded": {
        const ch = event.data.object;
        const pi = typeof ch.payment_intent === "string" ? ch.payment_intent : ch.payment_intent?.id;
        if (pi && ch.refunded) {
          await supabaseAdmin().from("zgloszenia").update({ status: "zwrot" }).eq("stripe_payment_intent", pi);
        }
        break;
      }
    }
  } catch {
    // 500 → Stripe ponowi zdarzenie później
    return new Response("Błąd zapisu", { status: 500 });
  }

  return new Response("ok", { status: 200 });
}
