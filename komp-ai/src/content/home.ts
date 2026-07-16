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
  manifest: {
    _type: "homeManifest",
    lineA: "NIE CHODZI O TO,",
    lineB: "CZY AI ZMIENI TWOJĄ BRANŻĘ.",
    lineC: ["CHODZI O TO,", "CZY JESTEŚ NA TO GOTOWY."],
    paragraph: [
      { text: "Nowe narzędzia pojawiają się każdego dnia,", strong: true, break: true },
      { text: "", break: true },
      { text: "a Ty zastanawiasz się, od czego zacząć i jak realnie je wykorzystać w pracy lub biznesie. " },
      { text: "Bez odpowiedniego kierunku łatwo utknąć w chaosie", strong: true },
      { text: " informacji i stracić czas na rzeczy, które nie przynoszą efektów." },
    ],
    pill: [
      { text: "Mamy dla Ciebie kurs, który odpowie na " },
      { text: "Twoje potrzeby", strong: true, fontPx: 22 },
      { text: " i zapewni Ci " },
      { text: "kompetencje przyszłości", strong: true, fontPx: 23 },
      { text: " – bez zbędnej teorii zacznij używać AI świadomie, efektywnie i " },
      { text: "na własnych zasadach.", strong: true, fontPx: 23 },
    ],
    bar: {
      left: "ai to narzędzie.",
      center: "TY DECYDUJESZ",
      right: "jak bardzo zmieni twoją pracę",
    },
    marqueeText: "sprawdź liste obecnych hot kursów dzisiaj",
    mobileTagline: "i wyrusz z nami ku przyszłości !",
    mobileCtaLabel: "POZNAJ NASZE KURSY",
  },
  // UWAGA: designer zostawił obie karty z identyczną treścią (placeholder) —
  // treść drugiej karty do podmiany, gdy klient dostarczy.
  dnaCards: [1, 2].map(() => ({
    _type: "dnaCard" as const,
    price: "1500 PLN netto",
    leadLabel: "PROWADZĄCY",
    leadName: "PIOTR MAŁYSZ",
    titleLines: ["AGENT AI", "W TWOIM", "BIZNESIE"] as [string, string, string],
    body: [
      { text: "Dowiedz się, jak wykorzystać sztuczną inteligencję do automatyzacji procesów, zwiększania efektywności i " },
      { text: "skalowania działań bez zwiększania zespołu. ", strong: true, break: true },
      { text: "", break: true },
      // literówki designera poprawione: "rozwók"→"rozwój", "aż do  operacje"→"aż po operacje"
      { text: "Ten kurs pokaże Ci jak krok po kroku, wdrożyć AI do codziennej pracy - od obsługi klientów, przez marketing, aż po operacje - tak, aby realnie wspierało rozwój Twojego biznesu." },
    ],
    ctaLabel: "ZOBACZ SZCZEGÓŁY", // w designie "SZCZEGOŁY" (literówka)
    ctaHref: "/kursy/agent-ai-w-twoim-biznesie",
  })),
  // 3 identyczne kafle w designie (placeholder) — treść do podmiany
  kursTiles: [1, 2, 3].map(() => ({
    _type: "kursTile" as const,
    tag: "AI W BIZNESIE",
    title: ["BEZPIECZEŃSTWO", "APLIKACJI"] as [string, string],
    price: "1500 PLN netto",
    ctaLabel: "DOWIEDZ SIĘ WIĘCEJ",
    ctaHref: "/kursy/bezpieczenstwo-aplikacji",
  })),
  humanMachine: {
    _type: "humanMachine",
    titleTop: "HUMAN",
    titleBottom: "MACHINE",
    caption: "THE FUTURE OF COLLABORATION",
  },
};
