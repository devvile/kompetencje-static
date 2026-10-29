import type { HomePage, SiteSettings } from "./types";

export const siteSettings: SiteSettings = {
  _type: "siteSettings",
  nav: [
    // KURSY = po prostu landing (decyzja Patryka 2026-07-28)
    { _type: "navLink", label: "KURSY", href: "/" },
    { _type: "navLink", label: "O NAS", href: "/o-nas" },
    // MANIFEST = własna podstrona (na razie placeholder)
    { _type: "navLink", label: "MANIFEST", href: "/manifest" },
    // W designie "KONTACT" — literówka designera, poprawiona świadomie.
    // KONTAKT = landing, kotwica na formularzu (smooth scroll)
    { _type: "navLink", label: "KONTAKT", href: "/#kontakt" },
  ],
  footer: {
    _type: "footer",
    // 3 segmenty: desktop łamie po segmencie 2 (2 linie), mobile po każdym (3 linie)
    descriptionLines: [
      "Edukacja AI na najwyższym poziomie.",
      "Łączymy ludzką kreatywność",
      "z możliwościami maszyn.",
    ],
    copyrightLime: "2026 KOMPETENCJE.AI ",
    copyrightWhite: "all rights reserved",
    navLinks: [
      { _type: "footerLink", label: "KURSY", href: "/" },
      { _type: "footerLink", label: "O NAS", href: "/o-nas" },
      // "/szkolenia" nie istnieje (404) — tymczasowo kotwica na wyróżnione kursy
      { _type: "footerLink", label: "SZKOLENIA", href: "/#kursy" },
    ],
    legalLinks: [
      { _type: "footerLink", label: "REGULAMIN", href: "/regulamin" },
      // w designie "POlityka prywatnośco" — literówka designera, poprawiona
      { _type: "footerLink", label: "POLITYKA PRYWATNOŚCI", href: "/polityka-prywatnosci" },
    ],
    contactHeading: "KONTAKT",
    email: "patryk@kompetencje.ai",
    phone: "513 301 081",
  },
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
    ctaHref: "/#kursy",
  },
  manifest: {
    _type: "homeManifest",
    lineA: "NIE CHODZI O TO,",
    lineB: "CZY AI ZMIENI TWOJĄ BRANŻĘ.",
    lineC: ["CHODZI O TO,", "CZY JESTEŚ NA TO GOTOWY."],
    paragraph: [
      { text: "Nowe narzędzia pojawiają się każdego dnia,", strong: true },
      { text: " a Ty zastanawiasz się, od czego zacząć i jak realnie je wykorzystać w pracy lub biznesie." },
    ],
    conclusion: [
      { text: "Bez odpowiedniego kierunku łatwo " },
      { text: "utknąć w chaosie informacji", strong: true },
      { text: " i stracić czas na rzeczy, które nie przynoszą efektów." },
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
  // Karty zróżnicowane (życzenie Patryka 2026-08-01); treść marketingowa
  // robocza — do akceptacji/podmiany przez klienta. Grafiki: Higgsfield
  // (nano banana, styl-referencja = card-waga-src.png).
  dnaCards: [
    {
      _type: "dnaCard" as const,
      price: "1500 PLN brutto",
      leadLabel: "PROWADZĄCY",
      leadName: "PIOTR MAŁYSZ",
      // redesign 2026-10 (Figma 2315:3152): nowy kurs zamiast „Agent AI w Twoim biznesie";
      // podstrona kursu jeszcze nie istnieje → CTA tymczasowo do formularza kontaktu
      titleLines: ["AI POD", "KONTROLĄ", "OD PODSTAW"] as [string, string, string],
      pill: "Context Control",
      body: [
        { text: "Większość profesjonalistów wkleja pytanie, dostaje odpowiedź i traci przy tym " },
        { text: "80% możliwości", strong: true },
        { text: " narzędzia. Zamień AI w " },
        { text: "spersonalizowany warsztat", strong: true },
        { text: ", który działa na Twoich danych i według Twoich reguł.", break: true },
        { text: "", break: true },
        { text: "Nauczysz się budować własną " },
        { text: "warstwę kontekstową", strong: true },
        { text: ", chronić wrażliwe dane i łączyć model z firmowymi systemami przez MCP – od podstaw, krok po kroku." },
      ],
      ctaLabel: "ZOBACZ SZCZEGÓŁY",
      ctaHref: "/#kontakt",
      art: { kind: "panel" as const, src: "/assets/card-ai-kontrola-panel.webp" },
      photo: "/assets/card-waga-src.png",
      photoM: "/assets/m-card-ai-kontrola.webp", // kadr robota z panelu desktop
    },
    {
      // Treść OSTATECZNA od Patryka (2026-09-17): kurs „Z rozmowy do oferty
      // w 60 minut" (zastąpił roboczą „PRACUJ MĄDRZEJ Z AI"). Linie tytułu
      // szersze niż slot 297px @45px → CardDesktop dopasowuje stopień per
      // linia (FitText).
      _type: "dnaCard" as const,
      price: "1500 PLN brutto",
      leadLabel: "PROWADZĄCY",
      leadName: "PATRYK CZEMIEROWSKI",
      titleLines: ["Z ROZMOWY", "DO OFERTY", "W 60 MINUT"] as [string, string, string],
      pill: "AI w pracy z klientem",
      body: [
        { text: "Z notatek, cennika i rozmowy z klientem na Messengerze " },
        { text: "do gotowej oferty w PDF lub PPTX", strong: true },
        { text: " – w Claude Code, z grafikami pod Twoją markę z Higgsfield.", break: true },
        { text: "", break: true },
        { text: "Nauczysz się budować brief, który robi 80% roboty, robić prezentację prosto z rozmowy i " },
        { text: "wyceniać na podstawie realnych stawek rynkowych", strong: true },
        { text: ", nie zgadywania." },
      ],
      ctaLabel: "ZOBACZ SZCZEGÓŁY",
      ctaHref: "/kursy/z-rozmowy-do-oferty",
      art: { kind: "robot" as const, src: "/assets/card-oferta-robot.webp" },
      photo: "/assets/card-automatyzacja-src.png",
      photoM: "/assets/m-card-automatyzacja-r.png",
    },
  ],
  // karty webinarów nad paskiem TY DECYDUJESZ (na razie 1)
  webinarSlugs: ["zbuduj-agenta-ai-w-60-minut"],
  kursTiles: [
    {
      _type: "kursTile" as const,
      tag: "AI W BIZNESIE",
      title: ["BEZPIECZEŃSTWO", "APLIKACJI"] as [string, string],
      price: "1500 PLN brutto",
      ctaLabel: "DOWIEDZ SIĘ WIĘCEJ",
      ctaHref: "/kursy/bezpieczenstwo-aplikacji",
      photo: "/assets/kurs-bezpieczenstwo.png",
      leadLabel: "PROWADZĄCY:",
      leadName: "PIOTR MAŁYSZ",
    },
    {
      _type: "kursTile" as const,
      tag: "GENERATYWNA AI",
      title: ["TWORZENIE", "TREŚCI Z AI"] as [string, string],
      price: "1200 PLN brutto",
      ctaLabel: "DOWIEDZ SIĘ WIĘCEJ",
      ctaHref: "/kursy/tworzenie-tresci-z-ai",
      photo: "/assets/kurs-tresci.png",
      leadLabel: "PROWADZĄCA:",
      leadName: "WIKTORIA SŁAWIŃSKA",
    },
    {
      _type: "kursTile" as const,
      tag: "PRACA Z AI",
      title: ["PROMPT", "ENGINEERING"] as [string, string],
      price: "990 PLN brutto",
      ctaLabel: "DOWIEDZ SIĘ WIĘCEJ",
      ctaHref: "/kursy/prompt-engineering",
      photo: "/assets/kurs-prompt.png",
      leadLabel: "PROWADZĄCY:",
      leadName: "PATRYK CZEMIEROWSKI",
    },
  ],
  humanMachine: {
    _type: "humanMachine",
    titleTop: "HUMAN",
    titleBottom: "MACHINE",
    caption: "THE FUTURE OF COLLABORATION",
  },
  prowadzacy: {
    _type: "prowadzacy",
    heading: "NASI PROWADZĄCY",
    kicker: "POZNAJMY SIĘ !",
    people: [
      {
        // w Figmie "patryk czemierowski" lowercase — HK Modular ma tylko wersaliki
        _type: "lecturer",
        name: "PATRYK CZEMIEROWSKI",
        nameLines: ["PATRYK", "CZEMIEROWSKI"],
        photo: "/assets/prow-patryk-2x.jpg",
        crop: { w: "114.39%", h: "121.72%", left: "-12.52%", top: "-7.75%" },
        cropM: { w: "114.39%", h: "121.72%", left: "-12.52%", top: "-7.75%" },
      },
      {
        _type: "lecturer",
        name: "PIOTR MAŁYSZ",
        nameLines: ["PIOTR MAŁYSZ"],
        photo: "/assets/prow-piotr-2x.jpg",
        crop: { w: "107.11%", h: "113.98%", left: "-3.55%", top: "0%" },
        cropM: { w: "106%", h: "106%", left: "-4.26%", top: "-0.21%" },
      },
      {
        _type: "lecturer",
        name: "WIKTORIA SŁAWIŃSKA",
        nameLines: ["WIKTORIA", "SŁAWIŃSKA"],
        photo: "/assets/prow-wiktoria-2x.jpg",
        crop: { w: "114.67%", h: "116.75%", left: "-7.37%", top: "-3.2%" },
        cropM: { w: "100%", h: "99.4%", left: "0%", top: "0.6%" },
      },
    ],
  },
  kontakt: {
    _type: "kontakt",
    headingLines: ["NAPISZ DO NAS", "POMOŻEMY DOBRAĆ KURS", "DO TWOICH POTRZEB"],
    coursesCta: { label: "POZNAJ NASZE KURSY", href: "/#kursy" },
    fields: [
      { _type: "formField", id: "imie", label: "IMIĘ", placeholder: "Wpisz imię", kind: "text" },
      { _type: "formField", id: "nazwisko", label: "NAZWISKO", placeholder: "Wpisz nazwisko", kind: "text" },
      { _type: "formField", id: "email", label: "ADRES EMAIL", placeholder: "Wpisz swój adres email", kind: "email" },
      // placeholder telefonu z designu ("000 000 000") zostawiony celowo
      { _type: "formField", id: "telefon", label: "NUMER TELEFONU", placeholder: "000 000 000", kind: "tel" },
      { _type: "formField", id: "wiadomosc", label: "NAPISZ WIADOMOŚĆ", placeholder: "Wpisz swoją wiadomość do nas...", kind: "textarea" },
    ],
    // w designie "Akceptuje regulamin i politykę rodo blablabla" (placeholder designera)
    consentLabel: "Akceptuję regulamin i politykę prywatności",
    submitLabel: "WYŚLIJ",
  },
};
