import "server-only";
import Stripe from "stripe";

// Klient Stripe — WYŁĄCZNIE serwer (Server Actions, route handlers, strony RSC).
// Lokalnie/preview klucz testowy sk_test_..., produkcja sk_live_... (Vercel env).
let client: Stripe | null = null;

export function stripeConfigured() {
  return !!process.env.STRIPE_SECRET_KEY;
}

export function stripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Brak STRIPE_SECRET_KEY w .env.local");
  client ??= new Stripe(key);
  return client;
}

/** adres aplikacji bez ukośnika na końcu (success/cancel URL) */
export function appUrl() {
  return (process.env.DOMAIN || "http://localhost:3000").replace(/\/$/, "");
}
