// Webinary (szablon WebinarTemplate, design Figma 2002:1803). Mock dokumentów Sanity.
// NOWY WEBINAR = nowy obiekt WebinarPage + wpis w `webinary` (slug → /webinary/<slug>).
// `published: false` → strona działa pod adresem, ale Google jej nie indeksuje,
// nie ma jej w sitemapie ani linków w serwisie.
import type { WebinarPage } from "./types";

export const webinarAgentAi: WebinarPage = {
  _type: "webinarPage",
  slug: "zbuduj-agenta-ai-w-60-minut",
  published: false,
  name: "Zbuduj swojego agenta AI w 60 minut",
  metaTitle: "Webinar: zbuduj swojego agenta AI w 60 minut — AI GYM",
  metaDescription:
    "Bezpłatny warsztat online na żywo kompetencje.ai: w godzinę zbudujesz własnego agenta AI w Google Gemini, który zna Twoją rolę i standardy. Metoda działa też w ChatGPT i Claude.",
  badge: "AI GYM  ·  WEBINAR NA ŻYWO",
  title: { before: ["ZBUDUJ SWOJEGO"], accent: "AGENTA AI", after: ["W 60 MINUT"] },
  tagline: "TE SAME DANE. INNY MÓZG.",
  description: [
    [
      {
        text: "Pytasz AI i dostajesz odpowiedź, która jest poprawna… i zupełnie bezużyteczna. Ogólnikowa, bez kontekstu Twojej pracy, zespołu i priorytetów.",
      },
    ],
    [
      { text: "Na tym warsztacie to zmienisz. " },
      { text: "W godzinę zbudujesz własnego agenta AI", strong: true },
      {
        text: ", który zna Twoją rolę, Twoje standardy i sposób komunikacji, i od pierwszego pytania odpowiada jak ktoś z Twojego zespołu.",
      },
    ],
  ],
  boldNote: "Bez slajdów. Bez teorii na start. Najpierw budujesz, potem rozumiesz, dlaczego to działa.",
  // TODO: docelowy link zapisu (formularz / platforma webinarowa) — na razie kontakt
  register: { href: "/#kontakt", label: "ZAPISZ SIĘ", note: ["Online, na żywo.", "Wystarczy laptop i konto Google."] },
  details: {
    // design 2002:1803 ma placeholder [IMIĘ I NAZWISKO]; nowsza wersja (479:1789): Piotr Małysz
    instructor: "Piotr Małysz",
    // start: "2026-10-23T18:00:00+02:00", ← uzupełnić, gdy termin będzie znany
    format: "Warsztat praktyczny online, na żywo",
    duration: "60 minut, z czego 20 budujesz agenta",
    durationMin: 60,
    tool: "Google Gemini (Gemy)",
    price: { value: 0, currency: "PLN" },
    priceLabel: "INWESTYCJA",
    note: "Metoda działa tak samo w ChatGPT i Claude, więc przeniesiesz ją do narzędzi, których używasz na co dzień.",
  },
  comparison: {
    heading: ["TO SAMO PYTANIE.", "DWIE RÓŻNE ODPOWIEDZI."],
    text: "Warsztat zaczynamy od demo na żywo: zwykły czat AI i spersonalizowany agent podsumowują ten sam miesiąc maili. AI nie staje się mądrzejsze. Dostaje kontekst, rolę i strukturę, i to wystarczy.",
    plain: {
      label: "ZWYKŁY CZAT AI",
      items: [
        "Relacjonuje, co się wydarzyło",
        "Wszystkie problemy traktuje tak samo",
        "Brzmi równie pewnie, gdy zgaduje",
        "Kończy ogólnymi radami",
      ],
      effect: "Efekt: poprawne streszczenie. I tyle.",
    },
    agent: {
      label: "TWÓJ AGENT AI",
      items: [
        "Mówi, co jest zagrożone i co z tym zrobić",
        "Ustawia priorytety: krytyczne, wysokie, średnie",
        "Oznacza, co wie, co wnioskuje, a co zgaduje",
        "Zadaje pytania, o których jeszcze nie pomyślałeś",
      ],
      effect: "Efekt: gotowy materiał do podjęcia decyzji.",
    },
  },
  agenda: {
    heading: "JAK WYGLĄDA TA GODZINA",
    subheading: "Najpierw działasz, potem rozumiesz.",
    steps: [
      {
        time: "0–10 MIN",
        title: "Demo: te same dane, inny mózg",
        text: "Zwykły czat kontra agent na tym samym zadaniu. Różnicę zobaczysz w kilka sekund.",
      },
      {
        time: "10–30 MIN",
        title: "Budujesz własnego agenta",
        text: "Krok po kroku, metodą dwóch promptów. Po 20 minutach masz asystenta dopasowanego do Twojej roli.",
      },
      {
        time: "30–40 MIN",
        title: "Test w prawdziwej pracy",
        text: "Dajesz agentowi zadanie z codziennej pracy i porównujemy, co zbudowali inni uczestnicy.",
      },
      {
        time: "40–60 MIN",
        title: "Kiedy ufać AI, a kiedy sprawdzać",
        text: "Psychologia współpracy z AI i prompt antyhalucynacyjny: agent sam oznacza, co wie, a co zgaduje.",
      },
    ],
  },
  outcomes: {
    heading: ["Z CZYM", "WYCHODZISZ"],
    items: [
      "Działający agent AI dopasowany do Twojej roli",
      "Metoda, dzięki której zbudujesz kolejnych agentów do dowolnych zadań",
      "Gotowy prompt antyhalucynacyjny do każdego narzędzia AI",
      "Komplet materiałów: przewodnik, generatory promptów i szablony",
      "Wyczucie, kiedy ufać odpowiedziom AI, a kiedy je sprawdzać",
    ],
  },
  audience: {
    heading: "DLA KOGO?",
    tags: [
      "PROJECT MANAGEROWIE",
      "TEAM I TECH LEADZI",
      "SPRZEDAŻ",
      "MARKETING",
      "OBSŁUGA KLIENTA",
      "SPECJALIŚCI I MANAGEROWIE",
    ],
    text: "Dla każdego, kto używa AI w pracy i chce dostawać odpowiedzi, które da się od razu wykorzystać. Nie musisz programować. Wystarczy, że znasz swoją pracę.",
    safety: {
      label: "BEZPIECZEŃSTWO DANYCH",
      text: "Ćwiczymy na danych niepoufnych. Pokażemy też, jak bezpiecznie przenieść metodę do firmowych wersji narzędzi AI.",
    },
  },
  closing: {
    lines: ["PRZYJDŹ Z PRAWDZIWYM PROBLEMEM.", "WYJDŹ Z NARZĘDZIEM, KTÓRE GO ROZWIĄZUJE."],
  },
  // karta reklamy na stronie głównej (design 2085:1762 „REKLAMA WEBINARU – V5")
  promo: {
    // teksty z redesignu home (Figma 2204:1684, 2026-10)
    chips: [
      { icon: "star", text: "Agent gotowy w 20 min", variant: "lime" },
      { icon: "arrow", text: "Dla specjalistów i managerów", variant: "outline" },
    ],
    headingLines: ["AGENT AI,", "ZNA SPECYFIKĘ", "TWOJEJ PRACY"],
    headingSmall: "KTÓRY",
    description: [
      { text: "AI zmyśla i nie pomaga przy Twojej pracy?", strong: true, weight: 700 },
      { text: " Pokażę Ci, jak szybko zbudować agenta, który nie tylko mówi prawdę, ale też jest ekspertem w Twojej dziedzinie. " },
      { text: "W 60 minut", strong: true },
      { text: " nauczysz go ról członków zespołu i Twoich standardów komunikacji. Gdy czegoś nie wie, mówi to wprost. " },
      { text: "Wychodzisz z agentem i gotowymi promptami do tworzenia kolejnych.", strong: true },
    ],
    image: "/assets/webinar/w-ad-panel-piotr-v2.webp",
    imageAlt: "Piotr Małysz — prowadzący webinar",
    expertise: "Automatyzacja · procesy · dane",
    formatChip: "Online, na żywo",
    ctaLabel: "ZAPISZ SIĘ ZA DARMO",
    ctaNote: "Bez kodowania · wystarczy konto Google",
  },
};

export const webinary: Record<string, WebinarPage> = {
  [webinarAgentAi.slug]: webinarAgentAi,
};
