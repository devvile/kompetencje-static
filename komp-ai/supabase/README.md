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
