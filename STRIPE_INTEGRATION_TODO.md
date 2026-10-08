# Stripe Checkout — TODO integracji

Integracja: **Hosted Stripe Checkout** — klient jest przekierowywany na stronę płatności hostowaną przez Stripe.

## Values to Replace

Poniższe wartości to placeholdery — trzeba je podmienić przed uruchomieniem produkcyjnym.

**Pliki z placeholderami:**
- [komp-ai/src/app/api/checkout/route.ts](komp-ai/src/app/api/checkout/route.ts)
- [komp-ai/.env.local](komp-ai/.env.local) (plik lokalny, ignorowany przez git)

| Field | Current Value | What to Set |
|-------|--------------|-------------|
| mode | payment | `"payment"` dla jednorazowej opłaty (kursy), `"subscription"` dla rozliczeń cyklicznych. Przy `"subscription"` dodać `payment_method_collection: "always"`. |
| success_url | `${DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}` | Adres strony „dziękujemy za zakup" (strona `/success` jeszcze nie istnieje). Zachować szablon `{CHECKOUT_SESSION_ID}`. |
| cancel_url | `${DOMAIN}` | Adres powrotu po anulowaniu płatności (np. strona danego kursu `/kursy/[slug]`). |
| line_items[].price | price_... | Prawdziwy Price ID z Dashboardu (https://dashboard.stripe.com/prices) lub API. Przy kilku kursach — wybierać cenę na podstawie danych z żądania (np. slug kursu → Price ID). |
| STRIPE_SECRET_KEY | sk_test_... | Klucz tajny z https://dashboard.stripe.com/test/apikeys (w produkcji `sk_live_...`). |
| DOMAIN | http://localhost:3000 | W produkcji `https://kompetencje.ai`. |

## Configured Parameters

Parametry skonfigurowane w Checkout Studio — ustawione poprawnie.

**Pliki z tymi parametrami:**
- [komp-ai/src/app/api/checkout/route.ts](komp-ai/src/app/api/checkout/route.ts)

| Parameter | Value |
|-----------|-------|
| ui_mode | hosted_page (zainstalowane SDK `stripe` 23.0.0 ≥ 21.0.0) |
| billing_address_collection | auto |
| phone_number_collection | { enabled: true } |
| automatic_tax | { enabled: false } |
| allow_promotion_codes | false |
| payment_method_collection | always (tylko dla `mode: "subscription"` — obecnie pominięty, bo `mode: "payment"`) |
| submit_type | auto |
| integration_identifier | hosted_web_0002 |
| origin_context | web |

## Setup

1. Zależność `stripe` jest już zainstalowana w `komp-ai/` (`npm install` po pullu).
2. Uzupełnij `komp-ai/.env.local`:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   DOMAIN=http://localhost:3000
   ```
   Na hostingu (np. Vercel) ustaw te same zmienne w panelu projektu. Nazwy są tylko serwerowe — **nie** używać prefiksu `NEXT_PUBLIC_`.
3. Uruchom `npm run dev` w `komp-ai/`.

## Nowe pliki

```text
komp-ai/
├── .env.local                       # klucze (lokalnie, poza gitem)
└── src/app/api/checkout/route.ts    # POST → tworzy Checkout Session → 303 redirect do Stripe
```

## Jak to działa

1. Przycisk zakupu wysyła formularz: `<form action="/api/checkout" method="POST"><button>Kup kurs</button></form>`
   (do podpięcia w sekcji kursu — obecnie żaden przycisk nie wskazuje na endpoint).
2. Route handler tworzy sesję `stripe.checkout.sessions.create(...)` i odpowiada przekierowaniem 303 na `session.url`.
3. Klient płaci na stronie Stripe → wraca na `success_url` (lub `cancel_url` przy anulowaniu).

## Testowanie

- Używaj kluczy trybu testowego (`sk_test_...`).
- Karty testowe: `4242 4242 4242 4242` (sukces), `4000 0025 0000 3155` (wymaga 3D Secure), `4000 0000 0000 9995` (odrzucona) — dowolna przyszła data ważności, dowolny CVC.
- Więcej: https://docs.stripe.com/testing

## Następne kroki

- Utworzyć produkty/ceny kursów w Dashboardzie i zmapować slug kursu → Price ID (np. w `src/content/`).
- Podpiąć przyciski „kup kurs" do `/api/checkout` (przekazać slug kursu w formularzu).
- Dodać stronę `/success` (i ewentualnie odczyt sesji po `session_id`).
- Realizacja zamówień: webhook `checkout.session.completed` (`STRIPE_WEBHOOK_SECRET`) — nadanie dostępu do kursu, e-mail potwierdzający.
- Śledzenie zamówień: brak bazy danych w projekcie — zdecydować, gdzie zapisywać zakupy.

## Zasoby

- https://support.stripe.com
- https://docs.stripe.com/mcp
