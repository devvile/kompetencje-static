-- Zgoda konsumenta na rozpoczęcie świadczenia przed upływem 14 dni na odstąpienie
-- od umowy (formularz zapisu, lib/zgodaStart.ts). Czas wyrażenia zgody;
-- NULL = zgoda nie była wymagana (kurs startował za 15 dni lub później).
-- Uruchomić na dev, potem na prod (SQL Editor → Run).

alter table public.zgloszenia
  add column if not exists zgoda_start_przed_terminem_at timestamptz null;

comment on column public.zgloszenia.zgoda_start_przed_terminem_at is
  'Czas zgody na start przed upływem 14 dni na odstąpienie; NULL = nie była wymagana (kurs za >=15 dni)';
