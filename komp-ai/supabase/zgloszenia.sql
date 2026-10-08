-- Tabela zgłoszeń na kursy (1 zgłoszenie = 1 uczestnik = 1 płatność).
-- Uruchomić raz w Supabase: SQL Editor → wkleić → Run.
-- Pola danych osobowych są wstępne — do korekty, gdy formularz pojawi się w Figmie.

create table public.zgloszenia (
  id                    uuid primary key default gen_random_uuid(),
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),

  -- kurs
  kurs_slug             text not null,

  -- dane uczestnika (z formularza)
  imie                  text not null,
  nazwisko              text not null,
  email                 text not null,
  telefon               text,

  -- faktura (opcjonalnie; wystawianie przez KSeF — później)
  chce_fakture          boolean not null default false,
  firma                 text,
  nip                   text,
  faktura_status        text,  -- np. 'do_wystawienia' / 'wystawiona' — dla przyszłej integracji

  -- zgody (RODO)
  zgoda_regulamin_at    timestamptz not null,
  zgoda_marketing       boolean not null default false,

  -- płatność (ustawiane WYŁĄCZNIE przez webhook Stripe)
  status                text not null default 'oczekuje'
                        check (status in ('oczekuje', 'oplacone', 'porzucone', 'zwrot')),
  stripe_session_id     text unique,
  stripe_payment_intent text,
  kwota_grosze          integer,
  waluta                text,
  oplacone_at           timestamptz
);

create index zgloszenia_status_idx on public.zgloszenia (status);
create index zgloszenia_email_idx  on public.zgloszenia (email);

-- automatyczna aktualizacja updated_at
create function public.set_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger zgloszenia_updated_at
  before update on public.zgloszenia
  for each row execute function public.set_updated_at();

-- RLS bez żadnych polityk = tabela niedostępna z przeglądarki (klucz anon).
-- Dostęp ma tylko serwer (klucz service_role) i panel Supabase.
alter table public.zgloszenia enable row level security;
