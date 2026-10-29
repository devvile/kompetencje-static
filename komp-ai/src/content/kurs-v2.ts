// Kursy w szablonie v2 (design UI/UX, Figma 5ufIXE17KqmkvVrfSVzUFE / 2009:1973).
// Mock przyszłych dokumentów Sanity — treść 1:1 z designu.
//
// NOWY KURS = nowy obiekt KursV2Page + wpis w `kursyV2` (slug = adres
// /kursy/<slug>). Assety kursu w public/assets/kurs2/ (grafika hero ~1270 px
// szer. webp z przezroczystością, zdjęcie prowadzącego ~800×1292 jpg).
// Liczby modułów/lekcji, numeracja i JSON-LD liczą się same z danych.
import type { KursV2Page } from "./types";
import { kursAiPodKontrola } from "./kurs-ai-kontrola";

export const kursZRozmowyDoOferty: KursV2Page = {
  _type: "kursV2Page",
  slug: "z-rozmowy-do-oferty",
  layout: "v3",
  name: "Z rozmowy do oferty w 60 minut",
  metaTitle: "Z rozmowy do oferty w 60 minut — kurs AI online na żywo",
  metaDescription:
    "Kurs kompetencje.ai: z notatek, cennika i rozmowy z klientem w godzinę przygotujesz ofertę w PDF lub PPTX z grafikami w stylu Twojej marki. Claude Code + Higgsfield, bez programowania.",
  price: { value: 1500, currency: "PLN", note: "brutto, płatność jednorazowa" },
  hero: {
    number: "02",
    kicker: "KURS ONLINE NA ŻYWO",
    titleLines: ["Z ROZMOWY", "DO OFERTY"],
    titlePill: "AI w pracy z klientem",
    titleAccent: "W 60 MINUT",
    lead: "Sprzedajesz usługi, a oferty piszesz po godzinach?",
    description: [
      { text: "Wrzucasz notatki, cennik i zapis rozmowy z klientem, a " },
      { text: "po godzinie masz gotową ofertę", strong: true },
      {
        text: " w PDF lub PPTX z grafikami w stylu Twojej marki. Przejdziemy cały proces: od briefu, przez wycenę opartą o realne stawki, po plik, który ",
      },
      { text: "klient podpisuje", strong: true },
      { text: "." },
    ],
    extraStats: [{ icon: "czas", value: "60 min", label: "na ofertę" }],
    image: {
      src: "/assets/kurs2/k2-hero-robot.webp",
      alt: "Robot AI zamienia rozmowę z klientem w gotową ofertę",
    },
    ctaLabel: "ZAPISUJĘ SIĘ NA KURS",
    toolsLabel: "Pracujesz w:",
    tools: ["Claude Code", "Higgsfield"],
    assurances: [
      { icon: "check", text: "Bez programowania, krok po kroku" },
      { icon: "star", text: "Prowadzi praktyk z 7 latami wdrożeń w firmach" },
    ],
  },
  benefits: {
    heading: "CO ZYSKASZ NA KURSIE?",
    items: [
      {
        title: "Oferta w godzinę, nie w dwa wieczory",
        text: "Jeden folder z materiałami, jeden prompt, gotowy plik PDF lub PPTX. Wracasz do klienta tego samego dnia, a nie w przyszłym tygodniu.",
        textMobile: "Jeden folder z materiałami, jeden prompt, gotowy plik PDF lub PPTX.",
      },
      {
        title: "Grafiki pod Twoją markę, bez grafika",
        text: "Ilustracje, wizualizacje usług i tła generowane w Higgsfield w jednym spójnym stylu. Wiesz, kiedy warto płacić kredytami, a kiedy wystarczy tekst.",
        textMobile: "Ilustracje i tła generowane w Higgsfield w jednym spójnym stylu.",
      },
      {
        title: "Prezentacja prosto z rozmowy",
        text: "Rozmowa z Messengera, transkrypt ze spotkania albo notatka głosowa zamieniają się w prezentację, zanim klient zdąży zapomnieć, o czym rozmawialiście.",
        textMobile: "Rozmowa z Messengera albo notatka głosowa zamieniają się w prezentację.",
      },
      {
        title: "Wycena oparta o rynek, nie o zgadywanie",
        text: "Agent w kilka minut zbiera stawki rynkowe i oferty konkurencji dla Twojej usługi. Cenę w ofercie potrafisz obronić jednym zdaniem.",
        titleMobile: "Wycena oparta o rynek",
        textMobile: "Agent w kilka minut zbiera stawki rynkowe i oferty konkurencji.",
      },
    ],
    // układ bento v3 (Figma 2148:2028)
    bento: {
      badge: "EFEKTY KURSU",
      headingLines: ["CO ZYSKASZ", "NA KURSIE?"],
      decor: "/assets/kurs3/k3-oferta-bubble.webp",
      tiles: [
        { kind: "oferta-mock" },
        { kind: "grafiki-trio", images: ["/assets/kurs3/k3-oferta-g1.webp", "/assets/kurs3/k3-oferta-g2.webp", "/assets/kurs3/k3-oferta-g3.webp"], pill: "Higgsfield · jeden styl" },
        { kind: "slajdy", src: "/assets/kurs3/k3-oferta-slajdy.webp", pills: ["Messenger", "Transkrypt", "Notatka głosowa"], contentTop: 222.5 },
        { kind: "wycena-chart", bars: [110, 170, 140, 205, 125], highlight: 3, label: "Twoja cena", pills: ["Stawki rynkowe", "Konkurencja"], titlePx: 28 },
      ],
      marquee: ["OFERTA W GODZINĘ", "GRAFIKI POD TWOJĄ MARKĘ", "PREZENTACJA Z ROZMOWY", "WYCENA OPARTA O RYNEK"],
    },
  },
  // v3 (Figma 2172:2164)
  audience: {
    heading: "DLA KOGO JEST KURS",
    items: ["managerowie", "przedsiębiorcy", "freelancerzy", "dyrektorzy firm"],
  },
  // v3 (Figma 2159:2143). Design ma jedną odpowiedź (placeholder) — pozostałe
  // napisane ostrożnie (bez nowych faktów); DO WERYFIKACJI przez Patryka.
  faq: {
    heading: ["NAJCZĘSTSZE", "PYTANIA"],
    lead: "Nie ma tu Twojego pytania? Napisz do nas – formularz jest poniżej.",
    items: [
      { q: "Kiedy startuje kurs i jak wyglądają spotkania?", a: "Kurs prowadzimy na żywo online. Termin startu podamy wkrótce – zostaw kontakt w formularzu poniżej, a damy znać jako pierwszym." },
      { q: "Czy będą nagrania, jeśli nie mogę być na żywo?", a: "Napisz do nas przez formularz poniżej – podpowiemy, jak nadrobić spotkanie, w którym nie możesz uczestniczyć." },
      { q: "Jakie konta i narzędzia są potrzebne?", a: "Pracujemy w Claude Code i Higgsfield. Nie musisz umieć programować – wszystko konfigurujemy razem, krok po kroku." },
      { q: "Ile kosztuje kurs i jak płacę?", a: "Kurs kosztuje 1500 PLN brutto, płatność jednorazowa. Płacisz online przez bezpieczną bramkę Stripe zaraz po zapisie." },
      { q: "Czy dostanę fakturę?", a: "Tak. Dane do faktury (w tym NIP firmy) podajesz w formularzu zapisu." },
      { q: "Czy mogę zrezygnować i odzyskać pieniądze?", a: "Zasady rezygnacji i zwrotów opisuje regulamin. W razie pytań napisz do nas przez formularz poniżej." },
    ],
  },
  ctaBand: {
    text: "Gotowy, żeby Twoja następna oferta wyszła w godzinę?",
    ctaLabel: "ZAPISZ SIĘ",
  },
  program: {
    heading: "PROGRAM",
    modules: [
      {
        title: "Szybka prezentacja z rozmowy",
        effect:
          "Na tym etapie potrafisz odpowiedzieć klientowi gotową prezentacją w ciągu jednej rozmowy, zamiast obiecywać „wyślę w przyszłym tygodniu”.",
        lessons: [
          {
            title: "Wejściem nie musi być porządny dokument",
            items: [
              "Rozmowa z klientem na Messengerze lub WhatsAppie jako źródło oferty",
              "Transkrypt ze spotkania (Fireflies) i notatka głosowa jako wejście",
              "Referencja stylu: PDF, który Ci się podoba, albo strona Twojej firmy",
              "Krótka instrukcja: co ma być w środku, cena, termin, następny krok",
            ],
          },
          {
            title: "Od rozmowy do PDF w 15 minut",
            items: [
              "Agent wyciąga z rozmowy ustalenia, potrzeby i obiekcje klienta",
              "Prezentacja 2–4 strony gotowa do odesłania w tej samej rozmowie",
              "Co model źle zrozumiał: nazwiska, kwoty, terminy do sprawdzenia",
              "Co jest ustaleniem, a co luźną gadką – jak to ograniczyć w instrukcji",
            ],
          },
          {
            title: "Iteracja i wysyłka",
            items: [
              "Druga wersja po uwagach klienta bez zaczynania od zera",
              "Ta sama treść jako PDF na telefon i PPTX na spotkanie",
              "Follow-up: mail podsumowujący i przypomnienie po tygodniu",
              "Zgoda na nagrywanie i dane klienta – jedno zdanie, które załatwia sprawę",
            ],
          },
        ],
      },
      {
        title: "Oferta z grafikami: Claude Code + Higgsfield",
        effect:
          "Po tym module masz własny zestaw startowy: CLAUDE.md, szablon briefu, checklistę i pierwszą ofertę dla swojej firmy.",
        lessons: [
          {
            title: "Brief, który robi 80% roboty",
            items: [
              "Oferta wygenerowana vs oferta dobra – dwa briefy, dwa wyniki obok siebie",
              "Pięć pytań briefu: kto, jaki problem, co sprzedajesz, za ile, co dalej",
              "Twoje dane wchodzą do promptu: cennik, referencje, zdjęcia realizacji",
              "Plik CLAUDE.md – marka, styl i zasady zapisane raz, użyte w każdej kolejnej ofercie",
            ],
          },
          {
            title: "Od notatki do PPTX",
            items: [
              "Trzy pliki w folderze: notatka o firmie, cennik, opis klienta",
              "Jeden prompt – struktura oferty i teksty slajdów",
              "Grafiki przez MCP Higgsfield: hero, ilustracje usług, tła sekcji",
              "Otwierasz w PowerPoint i poprawiasz ręcznie to, co chcesz",
            ],
          },
          {
            title: "Higgsfield – kiedy tak, kiedy nie",
            items: [
              "Ta sama oferta z grafikami i bez – porównanie na żywo",
              "Spójność wizualna: jeden styl obrazów, kolory firmy, logo",
              "Czego nie generować: zdjęcia realnych realizacji, oznaczanie obrazów AI",
              "Ile to kosztuje: realne kredyty i czas na jedną ofertę",
            ],
          },
          {
            title: "Checklista przed wysłaniem",
            items: [
              "Halucynacje w ofertach kosztują: wymyślone certyfikaty, terminy, gwarancje",
              "Każda liczba i obietnica sprawdzona ręcznie",
              "Iteracja zamiast jednego strzału: dwie rundy poprawek w tym samym oknie",
              "Prawo i dane: anonimizacja rozmów, bez NDA i danych osobowych w promptach",
            ],
          },
        ],
      },
      {
        title: "Szybki research i wycena",
        effect:
          "Po tym module cena w Twojej ofercie ma uzasadnienie, a Ty wiesz o kliencie więcej niż on o Tobie.",
        lessons: [
          {
            title: "Stawki rynkowe w 10 minut",
            items: [
              "Agent przeszukuje sieć: ile kosztuje Twoja usługa u innych, w Twoim mieście i branży",
              "Tabela porównawcza: widełki, co wchodzi w cenę, co jest dopłatą",
              "Skąd wziął liczbę: weryfikacja źródeł, bo model potrafi zmyślić stawkę",
              "Argumenty do ceny wpisane prosto do oferty",
            ],
          },
          {
            title: "Klient, konkurencja, obiekcje",
            items: [
              "Szybki profil klienta przed spotkaniem: strona, opinie, czym się chwali",
              "Trzy oferty konkurencji w jednej tabeli: co mają, czego nie mają",
              "Lista prawdopodobnych obiekcji i gotowe odpowiedzi w prezentacji",
              "Wynik researchu jako plik wejściowy do briefu z modułu 02",
            ],
          },
        ],
      },
    ],
  },
  instructor: {
    pill: "POZNAJMY SIĘ · KTO PROWADZI KURS?",
    name: "PATRYK CZEMIEROWSKI",
    tagsTop: ["AUTOMATYZACJE AI", "AGENCI AI"],
    tagBottom: "PROGRAMOWANIE",
    photo: "/assets/kurs2/k2-patryk.jpg",
    photoMobile: "/assets/kurs2/k2-patryk-m.jpg",
    avatar: "/assets/kurs2/k2-patryk-avatar.png",
    photoAlt: "Patryk Czemierowski — prowadzący kursu",
    role: "Prowadzący kursu",
    bio: [
      {
        text: "Założyciel Kompetencje.ai oraz firmy technologicznej Futurista, która wdraża oprogramowanie i rozwiązania oparte na AI. Pomaga firmom ",
      },
      { text: "praktycznie wykorzystywać AI", strong: true },
      { text: " w automatyzacji pracy i procesach biznesowych." },
    ],
    stats: [
      { value: "7 lat", label: "w technologii i wdrożeniach oprogramowania" },
      { value: "B2B", label: "wdrożenia w firmach i korporacjach" },
    ],
    pathHeading: "JAK PRACUJE I UCZY",
    steps: [
      {
        title: "Uczy prosto i praktycznie",
        text: "Zamienia AI z modnego hasła w narzędzie pracy, a złożone tematy tłumaczy prosto i od razu do zastosowania.",
      },
      {
        title: "Od procesu do działającego systemu",
        text: "Przekłada procesy klienta na systemy, które porządkują pracę i automatyzują zadania.",
      },
      {
        title: "Technologia i potrzeby firmy",
        text: "Łączy programistyczny background z doświadczeniem z wdrożeń, więc rozumie i technikę, i potrzeby organizacji.",
      },
    ],
    ctaLabel: "ZAPISZ SIĘ NA KURS",
  },
  // v3 mobile (2139:1991) używa tych samych tekstów hero co desktop
  mobile: {
    instructorPill: "KTO PROWADZI KURS?",
    stickyName: "Z rozmowy do oferty",
    stickyCtaLabel: "ZAPISUJĘ SIĘ",
  },
  enroll: {
    heading: "Nie czekaj, aż inni Cię wyprzedzą!",
    included: [
      "Zestaw startowy: CLAUDE.md, szablon briefu i checklista",
      "Pierwsza oferta przygotowana dla Twojej firmy",
    ],
    ctaLabel: "ZAPISZ SIĘ",
    form: {
      note: "Bez programowania · instrukcja krok po kroku dla Windows i Mac",
      submitLabel: "PRZEJDŹ DO PŁATNOŚCI",
      footnote: "Na następnym kroku wybierzesz metodę płatności.",
    },
  },
};

export const kursyV2: Record<string, KursV2Page> = {
  [kursZRozmowyDoOferty.slug]: kursZRozmowyDoOferty,
  [kursAiPodKontrola.slug]: kursAiPodKontrola,
};
