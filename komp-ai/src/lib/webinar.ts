/*
 * Formatowanie danych webinaru (czas polski, Europe/Warsaw) — wspólne dla
 * strony szczegółów (WebinarTemplate) i karty reklamy (WebinarPromo).
 */
import type { WebinarPage } from "@/content/types";

const TZ = "Europe/Warsaw";

function parts(iso: string, opts: Intl.DateTimeFormatOptions) {
  const p = new Intl.DateTimeFormat("pl-PL", { ...opts, timeZone: TZ }).formatToParts(new Date(iso));
  return (t: string) => p.find((x) => x.type === t)?.value ?? "";
}

function valid(iso?: string): iso is string {
  return !!iso && !Number.isNaN(new Date(iso).getTime());
}

/** „piątek, 23.10, godz. 18:00" / „Termin wkrótce" */
export function formatStart(iso?: string) {
  if (!valid(iso)) return "Termin wkrótce";
  const g = parts(iso, { weekday: "long", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
  return `${g("weekday")}, ${g("day")}.${g("month")}, godz. ${g("hour")}:${g("minute")}`;
}

/** „23.10.2026" */
export function formatDate(iso?: string) {
  if (!valid(iso)) return null;
  const g = parts(iso, { day: "2-digit", month: "2-digit", year: "numeric" });
  return `${g("day")}.${g("month")}.${g("year")}`;
}

/** „18:00–19:00" (start + czas trwania) */
export function formatTimeRange(iso: string | undefined, durationMin: number) {
  if (!valid(iso)) return null;
  const hm = (d: Date) => {
    const g = parts(d.toISOString(), { hour: "2-digit", minute: "2-digit" });
    return `${g("hour")}:${g("minute")}`;
  };
  const start = new Date(iso);
  return `${hm(start)}–${hm(new Date(start.getTime() + durationMin * 60_000))}`;
}

/** 0 → „Bezpłatnie" */
export function formatWebinarPrice(p: WebinarPage["details"]["price"]) {
  return p.value === 0 ? "Bezpłatnie" : `${p.value} ${p.currency}`;
}
