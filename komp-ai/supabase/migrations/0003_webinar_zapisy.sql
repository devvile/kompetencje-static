-- Zapisy na bezpłatne webinary (1 wiersz = 1 osoba na 1 webinar).
-- Uruchomić na dev, potem na prod (SQL Editor → Run).
-- Retencja: dane do zakończenia webinaru + 2 lata (polityka prywatności).

create table if not exists public.webinar_zapisy (
  id                       uuid primary key default gen_random_uuid(),
  created_at               timestamptz not null default now(),

  webinar_slug             text not null,
  -- termin webinaru w chwili zapisu (gdy znany) — do przypomnień i retencji
  webinar_start            timestamptz,

  imie                     text not null,
  email                    text not null,

  zgoda_regulamin_at       timestamptz not null,
  zgoda_marketing          boolean not null default false,

  -- maile (Resend): potwierdzenie i przypomnienia
  mail_potwierdzenie_at    timestamptz,
  przypomnienie_24h_at     timestamptz,
  przypomnienie_1h_at      timestamptz,

  -- ten sam e-mail tylko raz na dany webinar
  unique (webinar_slug, email)
);

create index if not exists webinar_zapisy_slug_idx on public.webinar_zapisy (webinar_slug);

-- RLS bez polityk = tabela niedostępna z przeglądarki; dostęp tylko serwer (secret key) i panel.
alter table public.webinar_zapisy enable row level security;
