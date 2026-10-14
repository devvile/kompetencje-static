"use server";

/*
 * Server Action: zapis na kurs.
 *  1. walidacja (lib/zapis.ts — te same reguły co w przeglądarce),
 *  2. wiersz w `zgloszenia` (status „oczekuje"),
 *  3. sesja Stripe Checkout (client_reference_id = id zgłoszenia) →
 *     klient przekierowany na stronę płatności Stripe.
 * Status płatności w bazie ustawia WYŁĄCZNIE webhook (/api/stripe/webhook).
 * Powrót: success → /kursy/[slug]/dziekujemy?session_id=…,
 *         anulowanie → /kursy/[slug]/platnosc-przerwana.
 * Bez SUPABASE_* → „unavailable" (nic nie zapisuje); bez STRIPE_SECRET_KEY →
 * zgłoszenie zapisane, „ok" (podziękowanie bez płatności).
 */
import { getKursV2Page } from "@/content";
import { normalizeZapis, validateZapis, type ZapisResult } from "@/lib/zapis";

/** sesja płatności ważna 1 h — po wygaśnięciu webhook oznacza zgłoszenie jako porzucone */
const SESSION_TTL_S = 60 * 60;

export async function zapiszNaKurs(slug: string, fd: FormData): Promise<ZapisResult> {
  const kurs = await getKursV2Page(slug);
  if (!kurs) return { status: "error" };

  const v = normalizeZapis(fd);
  const errors = validateZapis(v);
  if (Object.keys(errors).length) return { status: "invalid", errors };

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SECRET_KEY) {
    return { status: "unavailable" };
  }

  const amount = Math.round(kurs.price.value * 100);
  const currency = kurs.price.currency.toLowerCase();

  let id: string;
  try {
    const { supabaseAdmin } = await import("@/lib/supabase");
    const { data, error } = await supabaseAdmin()
      .from("zgloszenia")
      .insert({
        kurs_slug: slug,
        imie: v.imie,
        nazwisko: v.nazwisko,
        email: v.email,
        telefon: v.telefon || null,
        chce_fakture: v.faktura,
        firma: v.faktura ? v.firma : null,
        nip: v.faktura ? v.nip.replace(/[\s-]/g, "") : null,
        faktura_status: v.faktura ? "do_wystawienia" : null,
        zgoda_regulamin_at: new Date().toISOString(),
        zgoda_marketing: v.newsletter,
        kwota_grosze: amount,
        waluta: kurs.price.currency,
      })
      .select("id")
      .single();
    if (error || !data) return { status: "error" };
    id = data.id as string;
  } catch {
    return { status: "error" };
  }

  const { stripe, stripeConfigured, appUrl } = await import("@/lib/stripe");
  if (!stripeConfigured()) return { status: "ok", id };

  try {
    const base = appUrl();
    const session = await stripe().checkout.sessions.create({
      ui_mode: "hosted_page",
      mode: "payment",
      submit_type: "pay",
      locale: "pl",
      customer_email: v.email,
      client_reference_id: id,
      metadata: { zgloszenie_id: id, kurs_slug: slug },
      payment_intent_data: { metadata: { zgloszenie_id: id, kurs_slug: slug } },
      // dane (telefon, NIP, firma) zbiera nasz formularz — Stripe ich nie dubluje
      billing_address_collection: "auto",
      automatic_tax: { enabled: false },
      allow_promotion_codes: false,
      expires_at: Math.floor(Date.now() / 1000) + SESSION_TTL_S,
      line_items: [
        {
          quantity: 1,
          // stała cena z panelu Stripe (opcjonalnie) albo cena z danych kursu
          ...(kurs.stripePriceId
            ? { price: kurs.stripePriceId }
            : {
                price_data: {
                  currency,
                  unit_amount: amount,
                  product_data: { name: `Kurs online: ${kurs.name}` },
                },
              }),
        },
      ],
      success_url: `${base}/kursy/${slug}/dziekujemy?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/kursy/${slug}/platnosc-przerwana`,
    });

    const { supabaseAdmin } = await import("@/lib/supabase");
    await supabaseAdmin().from("zgloszenia").update({ stripe_session_id: session.id }).eq("id", id);

    if (!session.url) return { status: "error" };
    return { status: "redirect", url: session.url };
  } catch {
    return { status: "error" };
  }
}
