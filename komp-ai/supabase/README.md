# Supabase — bazy dev i prod

Dwa osobne projekty Supabase (region Frankfurt / eu-central-1), ten sam schemat:

| Środowisko | Gdzie są klucze |
|---|---|
| **dev** (lokalnie + Vercel Preview) | `.env.local` lokalnie; Vercel → Settings → Environment Variables → *Preview* + *Development* |
| **prod** | Vercel → Settings → Environment Variables → tylko *Production* |

Zmienne (nazwy identyczne w obu środowiskach, różnią się wartości):
`SUPABASE_URL`, `SUPABASE_SECRET_KEY` — wzór w `.env.example`.

## Zmiany schematu

Każda zmiana = nowy plik w `migrations/` z kolejnym numerem (`0002_...sql`).
Uruchamiać najpierw na dev, po sprawdzeniu — ten sam plik na prod. Nie edytować
plików już uruchomionych na prod.

## Migracje

| Plik | Co robi |
|---|---|
| `0001_zgloszenia.sql` | tabela `zgloszenia` (zgłoszenia, zgody RODO, status płatności) |
| `0002_zgoda_start_przed_terminem.sql` | kolumna `zgoda_start_przed_terminem_at` — czas zgody konsumenta na rozpoczęcie kursu przed upływem 14 dni na odstąpienie; `NULL` = zgoda nie była wymagana (kurs startował za 15 dni lub później). Reguła: `src/lib/zgodaStart.ts`. |

**Uwaga:** kod zapisu wysyła już `zgoda_start_przed_terminem_at` — bez migracji 0002 insert do
`zgloszenia` się nie uda. Uruchomić 0002 na dev i prod PRZED wdrożeniem tej wersji.
| `0003_webinar_zapisy.sql` | tabela `webinar_zapisy` — zapisy na bezpłatne webinary (imię, e-mail, zgody, znaczniki maili: potwierdzenie i przypomnienia); unikalny e-mail na webinar. Bez niej formularz zapisu na webinar zwraca błąd. |
