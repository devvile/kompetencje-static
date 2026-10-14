/*
 * Formularz zapisu na kurs — walidacja WSPÓLNA dla przeglądarki (komunikaty
 * przy polach) i serwera (Server Action nie ufa klientowi). Pola = kolumny
 * tabeli `zgloszenia` (supabase/migrations/0001_zgloszenia.sql).
 */

export interface ZapisInput {
  imie: string;
  nazwisko: string;
  email: string;
  telefon: string;
  faktura: boolean;
  nip: string;
  firma: string;
  regulamin: boolean;
  newsletter: boolean;
}

export type ZapisErrors = Partial<Record<keyof ZapisInput, string>>;

export type ZapisResult =
  /** zgłoszenie zapisane, płatność → przekierowanie na Stripe Checkout */
  | { status: "redirect"; url: string }
  /** zgłoszenie zapisane, ale płatności online brak (brak STRIPE_SECRET_KEY) */
  | { status: "ok"; id: string }
  | { status: "invalid"; errors: ZapisErrors }
  /** baza zgłoszeń jeszcze niepodłączona (brak SUPABASE_* w env) */
  | { status: "unavailable" }
  | { status: "error" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** NIP: 10 cyfr + suma kontrolna (wagi 6,5,7,2,3,4,5,6,7) */
export function isValidNip(raw: string) {
  const d = raw.replace(/[\s-]/g, "");
  if (!/^\d{10}$/.test(d)) return false;
  const w = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  const sum = w.reduce((s, x, i) => s + x * Number(d[i]), 0);
  return sum % 11 === Number(d[9]);
}

export function normalizeZapis(fd: FormData): ZapisInput {
  const s = (k: string) => String(fd.get(k) ?? "").trim();
  return {
    imie: s("imie"),
    nazwisko: s("nazwisko"),
    email: s("email").toLowerCase(),
    telefon: s("telefon"),
    faktura: fd.get("faktura") === "on",
    nip: s("nip"),
    firma: s("firma"),
    regulamin: fd.get("regulamin") === "on",
    newsletter: fd.get("newsletter") === "on",
  };
}

export function validateZapis(v: ZapisInput): ZapisErrors {
  const e: ZapisErrors = {};
  if (!v.imie) e.imie = "Podaj imię.";
  if (!v.nazwisko) e.nazwisko = "Podaj nazwisko.";
  if (!v.email) e.email = "Podaj adres e-mail.";
  else if (!EMAIL_RE.test(v.email)) e.email = "Sprawdź adres e-mail.";
  if (v.telefon && v.telefon.replace(/\D/g, "").length < 9) e.telefon = "Numer telefonu wygląda na niepełny.";
  if (v.faktura) {
    if (!v.nip) e.nip = "Podaj NIP firmy.";
    else if (!isValidNip(v.nip)) e.nip = "Nieprawidłowy NIP.";
    if (!v.firma) e.firma = "Podaj nazwę firmy.";
  }
  if (!v.regulamin) e.regulamin = "Zaakceptuj regulamin i politykę prywatności.";
  return e;
}
