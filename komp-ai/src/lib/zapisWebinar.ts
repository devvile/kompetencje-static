/*
 * Zapis na bezpłatny webinar — walidacja WSPÓLNA dla przeglądarki i serwera.
 * Pola = kolumny tabeli `webinar_zapisy` (supabase/migrations/0003_webinar_zapisy.sql).
 */
export interface WebinarZapisInput {
  imie: string;
  email: string;
  regulamin: boolean;
  newsletter: boolean;
}

export type WebinarZapisErrors = Partial<Record<keyof WebinarZapisInput, string>>;

export type WebinarZapisResult =
  /** zapis przyjęty; mailSent = czy wyszło potwierdzenie (false, gdy Resend nieskonfigurowany) */
  | { status: "ok"; mailSent: boolean }
  /** ten e-mail jest już zapisany na ten webinar */
  | { status: "duplicate" }
  | { status: "invalid"; errors: WebinarZapisErrors }
  /** baza niepodłączona (brak SUPABASE_*) */
  | { status: "unavailable" }
  | { status: "error" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalizeWebinarZapis(fd: FormData): WebinarZapisInput {
  const s = (k: string) => String(fd.get(k) ?? "").trim();
  return {
    imie: s("imie"),
    email: s("email").toLowerCase(),
    regulamin: fd.get("regulamin") === "on",
    newsletter: fd.get("newsletter") === "on",
  };
}

export function validateWebinarZapis(v: WebinarZapisInput): WebinarZapisErrors {
  const e: WebinarZapisErrors = {};
  if (!v.imie) e.imie = "Podaj imię.";
  if (!v.email) e.email = "Podaj adres e-mail.";
  else if (!EMAIL_RE.test(v.email)) e.email = "Sprawdź adres e-mail.";
  if (!v.regulamin) e.regulamin = "Zaakceptuj regulamin i politykę prywatności.";
  return e;
}
