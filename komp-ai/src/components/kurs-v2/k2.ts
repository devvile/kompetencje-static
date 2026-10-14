import type { KursV2Page } from "@/content/types";

/*
 * Szablon KURS v2 (design UI/UX, Figma 5ufIXE17KqmkvVrfSVzUFE / 2009:1973,
 * frame 1440 szer.). Layout = flex/auto-layout jak w Figmie, ale wymiary
 * w cqw kontenera (1cqw = 14.4px designu) → proporcjonalne skalowanie na
 * laptopach, MacBookach, desktopach i 2K/4K (cap --workspace). Drobne fonty
 * mają podłogę px (fs), żeby na 768–1280 nie spadały poniżej czytelności.
 * Fonty jak w designie: Audiowide (font-audio) dla numerów modułów, haseł,
 * imienia i owali; HK Modular dla przycisków i etykiet (przycisk hero miał
 * notatkę designera „Audiowide → zamień na HK Modular").
 */
export const c = (px: number) => `${(px / 14.4).toFixed(4)}cqw`;
export const fs = (px: number, minPx: number) => `max(${minPx}px, ${c(px)})`;

/** Szerokość płótna ograniczona też WYSOKOŚCIĄ okna: nav + hero (827 px przy
 * płótnie 1440) zawsze mieszczą się w pierwszym ekranie — np. monitor
 * 1920×1200 dostaje całą stronę proporcjonalnie mniejszą (szerokość i
 * wysokość jednym współczynnikiem) zamiast ×1.33. Tła sekcji zostają na
 * pełną szerokość okna. */
export const K2_MAX_W = "min(var(--workspace), calc(100svh * 1440 / 827))";

/** kotwica sekcji zapisu (cena + CTA) — cel przycisku „zapisz się" prowadzącego */
export const ENROLL_ID = "zapis";

/** przycisk otwierający formularz zapisu (K2EnrollModal przechwytuje klik);
 * href = adres #zapisz-sie (bez JS / link do udostępnienia) */
export const ENROLL_OPEN = {
  href: "#zapisz-sie",
  "data-enroll-open": "",
} as const;

/* ---------- dane pochodne (liczone z treści, nie wpisywane ręcznie) ---------- */

/** polska odmiana: 1 moduł · 2–4 moduły · 5+ modułów (12–14 → modułów) */
export function plural(n: number, one: string, few: string, many: string) {
  if (n === 1) return `${n} ${one}`;
  const d = n % 10;
  const dd = n % 100;
  return `${n} ${d >= 2 && d <= 4 && !(dd >= 12 && dd <= 14) ? few : many}`;
}

/** sama forma słowa (bez liczby): moduł/moduły/modułów */
export function pluralWord(n: number, one: string, few: string, many: string) {
  return plural(n, one, few, many).replace(/^\d+ /, "");
}

export function kursCounts(k: KursV2Page) {
  const modules = k.program.modules.length;
  const lessons = k.program.modules.reduce((n, m) => n + m.lessons.length, 0);
  return {
    modules,
    lessons,
    modulesLabel: plural(modules, "moduł", "moduły", "modułów"),
    lessonsLabel: plural(lessons, "lekcja", "lekcje", "lekcji"),
    modulesWord: pluralWord(modules, "moduł", "moduły", "modułów"),
    lessonsWord: pluralWord(lessons, "lekcja", "lekcje", "lekcji"),
  };
}

/** „1500 PLN" (spacja tysięcy dla ≥10 000: „12 000 PLN") */
export function formatPrice(p: KursV2Page["price"]) {
  const v =
    p.value >= 10000
      ? p.value.toLocaleString("pl-PL").replace(/\u00a0/g, " ")
      : String(p.value);
  return `${v} ${p.currency}`;
}

/** pełny tytuł kursu: linie + akcent („Z ROZMOWY DO OFERTY W 60 MINUT") */
export function kursTitle(k: KursV2Page) {
  return [...k.hero.titleLines, k.hero.titleAccent].join(" ");
}

/** numer modułu 01, 02… */
export const modNum = (i: number) => String(i + 1).padStart(2, "0");
