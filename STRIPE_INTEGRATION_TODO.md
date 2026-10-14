# Stripe — zapisy na kursy (stan 2026-10-15)

Przepływ (zaimplementowany, czeka na test end-to-end):

1. Strona kursu → przycisk „zapisz się" → formularz (`K2EnrollModal`).
2. Server Action `komp-ai/src/app/kursy/[slug]/actions.ts`:
   walidacja → wiersz w `zgloszenia` (status `oczekuje`) → Stripe Checkout Session
   (`client_reference_id` = id zgłoszenia, `customer_email`, cena z danych kursu albo
   `stripePriceId`, sesja ważna 1 h) → przekierowanie na stronę płatności Stripe.
3. Powrót:
   - sukces → `/kursy/[slug]/dziekujemy?session_id=…` (stan z API Stripe: opłacone /
     w toku / niedokończone / błąd),
   - anulowanie → `/kursy/[slug]/platnosc-przerwana` („Spróbuj ponownie").
4. Webhook `POST /api/stripe/webhook` — JEDYNE miejsce zmiany statusu w bazie:
   `checkout.session.completed` (paid) / `async_payment_succeeded` → `oplacone`,
   `async_payment_failed` / `expired` → `porzucone`, `charge.refunded` → `zwrot`.

## Do zrobienia przed startem

- [ ] `STRIPE_WEBHOOK_SECRET` w `.env.local` — lokalnie:
      `stripe listen --forward-to localhost:3000/api/stripe/webhook` (wypisze `whsec_…`).
- [ ] Test end-to-end w trybie testowym (karta 4242 4242 4242 4242) — zgoda Patryka
      (zapis trafi do bazy Supabase).
- [ ] Produkcja (Vercel): `STRIPE_SECRET_KEY` (sk_live), `STRIPE_WEBHOOK_SECRET` (endpoint
      w Dashboardzie z 5 zdarzeniami jak wyżej), `DOMAIN=https://kompetencje.ai`, SUPABASE_*.
- [ ] Stripe Dashboard: włączyć e-maile z potwierdzeniem płatności (Settings → Emails →
      Successful payments) — ekran „dziękujemy" obiecuje potwierdzenie e-mailem.
- [ ] Metody płatności (BLIK, Przelewy24, karty) — włączyć w Dashboardzie (Checkout pokaże
      dostępne automatycznie).
- [ ] Faktury / KSeF — osobny temat (kolumny `chce_fakture`, `nip`, `firma`, `faktura_status`).
