import type { HomePage, SiteSettings } from "./types";

export const siteSettings: SiteSettings = {
  _type: "siteSettings",
  nav: [
    { _type: "navLink", label: "KURSY", href: "/kursy" },
    { _type: "navLink", label: "O NAS", href: "/o-nas" },
    { _type: "navLink", label: "MANIFEST", href: "/manifest" },
    // W designie "KONTACT" — literówka designera, poprawiona świadomie.
    { _type: "navLink", label: "KONTAKT", href: "/kontakt" },
  ],
};

export const homePage: HomePage = {
  _type: "homePage",
  hero: {
    _type: "homeHero",
    headlineLine1: "ZDOBĄDŹ Z NAMI",
    headlineLine2: "KOMPETENCJE AI",
    kicker: "WYKORZYSTAJ DZIŚ SWOJĄ SZANSE",
    tagline: "i wyrusz z nami ku przyszłości !",
    ctaLabel: "WYBIERZ KURS DLA SIEBIE",
    ctaHref: "/kursy",
  },
};
