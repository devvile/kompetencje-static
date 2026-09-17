// Pobieranie treści kursów. Dziś: pliki w tym katalogu; po podpięciu CMS-a
// zmienia się WYŁĄCZNIE ciało getCourse()/getCourseSlugs() (GROQ) — komponenty
// i trasa /kursy/[slug] pozostają bez zmian.
import type { CourseContent } from "./types";
import { course as agentAi } from "./agent-ai-w-twoim-biznesie";
import { course as zRozmowyDoOferty } from "./z-rozmowy-do-oferty";

export type { CourseContent } from "./types";

/** kursy z własnym plikiem treści */
const courses: Record<string, CourseContent> = {
  [agentAi.slug]: agentAi,
  [zRozmowyDoOferty.slug]: zRozmowyDoOferty,
};

/** Slugi linkowane ze strony głównej, które NIE mają jeszcze własnej treści —
 * tymczasowo dostają szablon kursu „agent-ai-w-twoim-biznesie", żeby nic nie
 * zniknęło ze strony (decyzja Patryka 2026-09-17; docelowo dedykowane pliki
 * / dokumenty CMS). Stary slug `automatyzacja-pracy-z-ai` celowo NIE jest
 * tutaj — ma przekierowanie 301 w next.config.ts. */
const FALLBACK_SLUGS = ["bezpieczenstwo-aplikacji", "prompt-engineering", "tworzenie-tresci-z-ai"];
const FALLBACK_COURSE = agentAi;

export async function getCourse(slug: string): Promise<CourseContent | null> {
  const own = courses[slug];
  if (own) return own;
  if (FALLBACK_SLUGS.includes(slug)) return { ...FALLBACK_COURSE, slug };
  return null;
}

export async function getCourseSlugs(): Promise<string[]> {
  return [...Object.keys(courses), ...FALLBACK_SLUGS];
}

/* ---------- pochodne z treści (nie wpisywać ręcznie w danych) ---------- */

/** polska liczebność: 1 moduł / 2–4 moduły / 5+ modułów (12–14 → „modułów") */
export function pluralPl(n: number, forms: [string, string, string]): string {
  const [one, few, many] = forms;
  const abs = Math.abs(n);
  const last = abs % 10;
  const last2 = abs % 100;
  if (abs === 1) return `${n} ${one}`;
  if (last >= 2 && last <= 4 && !(last2 >= 12 && last2 <= 14)) return `${n} ${few}`;
  return `${n} ${many}`;
}

/** „3 moduły" / „8 lekcji" na pasek hero — liczone z modules/lessons */
export function courseStats(course: CourseContent): { modules: string; lessons: string } {
  const modules = course.modules.length;
  const lessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
  return {
    modules: pluralPl(modules, ["moduł", "moduły", "modułów"]),
    lessons: pluralPl(lessons, ["lekcja", "lekcje", "lekcji"]),
  };
}
