import "server-only";
import { createClient } from "@supabase/supabase-js";

// Klient Supabase z kluczem Secret (sb_secret_..., dawniej service_role) — WYŁĄCZNIE po stronie serwera
// (Server Actions, route handlers). Tabela `zgloszenia` ma RLS bez polityk,
// więc klucz anon/przeglądarka nie ma do niej dostępu.
export function supabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) {
    throw new Error("Brak SUPABASE_URL / SUPABASE_SECRET_KEY w .env.local");
  }
  return createClient(url, key, { auth: { persistSession: false } });
}
