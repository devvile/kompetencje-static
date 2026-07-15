// Typowany content layer — mock przyszłych schematów Sanity.
// Komponenty używają WYŁĄCZNIE async getterów z ./index.ts;
// podpięcie prawdziwego Sanity = podmiana ciał getterów na GROQ.

export interface NavLink {
  _type: "navLink";
  label: string;
  href: string;
}

export interface HomeHero {
  _type: "homeHero";
  headlineLine1: string;
  headlineLine2: string;
  kicker: string;
  tagline: string;
  ctaLabel: string;
  ctaHref: string;
}

/** Fragment tekstu z wariantem wagi/rozmiaru (mock przyszłego portable text) */
export interface RichSeg {
  text: string;
  strong?: boolean;
  /** nadpisany rozmiar w px designu (desktop); mobile skaluje proporcjonalnie */
  fontPx?: number;
  /** twardy łamacz linii PO segmencie */
  break?: boolean;
}

export interface HomeManifest {
  _type: "homeManifest";
  lineA: string; // "NIE CHODZI O TO,"
  lineB: string; // "czy AI zmieni Twoją branżę."
  lineC: [string, string]; // "CHODZI O TO," / "CZY JESTEŚ NA TO GOTOWY."
  paragraph: RichSeg[];
  pill: RichSeg[];
  bar: { left: string; center: string; right: string };
  marqueeText: string;
  mobileTagline: string; // "i wyrusz z nami ku przyszłości !"
  mobileCtaLabel: string; // "POZNAJ NASZE KURSY"
}

export interface HomePage {
  _type: "homePage";
  hero: HomeHero;
  manifest: HomeManifest;
}

export interface SiteSettings {
  _type: "siteSettings";
  nav: NavLink[];
}
