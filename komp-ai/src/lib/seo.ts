// Wspólne stałe SEO. Next nie łączy `openGraph` głęboko — obiekt z podstrony
// ZASTĘPUJE ten z layoutu, więc każda podstrona składa OG przez `ogFor()`,
// żeby nie gubić siteName/locale/obrazka.
import type { Metadata } from "next";

/** domena KANONICZNA = ta, którą serwuje Vercel (apex kompetencje.ai przekierowuje na www).
 *  Canonical/sitemap/OG muszą wskazywać adres bez przekierowania, inaczej Google dostaje
 *  sprzeczne sygnały i nie indeksuje stron. Zmiana domeny głównej w Vercelu = zmiana tutaj. */
export const SITE_URL = "https://www.kompetencje.ai";
export const SITE_NAME = "Kompetencje.ai";

/** obrazek udostępniania z app/opengraph-image.tsx — Next dokleja go sam tylko
 *  tam, gdzie podstrona NIE definiuje własnego openGraph, więc podajemy jawnie */
const OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: "Kompetencje.ai — kursy AI" };

/** indeksujemy tylko produkcję; preview Vercela i lokalne buildy dostają noindex w robots.txt */
export const isIndexable = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : true;

export function ogFor(path: string, title: string, description: string): Metadata["openGraph"] {
  return {
    type: "website",
    locale: "pl_PL",
    siteName: SITE_NAME,
    url: path,
    title,
    description,
    images: [OG_IMAGE],
  };
}
