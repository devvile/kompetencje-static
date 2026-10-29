// Kurs „AI pod kontrolą od podstaw" (Context Control) — szablon v3.
// Figma 5ufIXE17KqmkvVrfSVzUFE, desktop 2279:2811, mobile 2310:3040.
// Mock przyszłego dokumentu Sanity — treść 1:1 z designu (placeholdery
// [CENA], [DD.MM.RRRR] z designu NIE są kopiowane — patrz TODO niżej).
// Assety: public/assets/kurs3/kontrola/.
import type { KursV2Page } from "./types";

const A = "/assets/kurs3/kontrola";

export const kursAiPodKontrola: KursV2Page = {
  _type: "kursV2Page",
  slug: "ai-pod-kontrola-od-podstaw",
  layout: "v3",
  name: "AI pod kontrolą od podstaw",
  metaTitle: "AI pod kontrolą od podstaw — kurs AI online na żywo",
  metaDescription:
    "Kurs kompetencje.ai: zamień AI w spersonalizowany warsztat. Warstwa kontekstowa, bezpieczne dane, mniej błędów i automatyzacja z MCP – bez kodowania.",
  // TODO cena do potwierdzenia — design ma placeholder „[CENA] PLN"
  price: { value: 1500, currency: "PLN", note: "brutto, płatność jednorazowa" },
  hero: {
    number: "01",
    kicker: "KURS ONLINE NA ŻYWO I W NAGRANIU",
    titleLines: ["AI POD", "KONTROLĄ"],
    titlePill: "Context Control",
    titleAccent: "OD PODSTAW",
    lead: "Używasz AI jak wyszukiwarki internetowej?",
    description: [
      { text: "Większość profesjonalistów wkleja pytanie, dostaje odpowiedź i " },
      { text: "traci przy tym 80% możliwości narzędzia", strong: true },
      {
        text: ". Nauczysz się zamieniać AI w spersonalizowany warsztat, który wykonuje zadania dokładnie tak, jak go poprosisz. Twoje dane, Twoje reguły, powtarzalność – ",
      },
      { text: "szybkie wyniki przy minimalnym marginesie błędu", strong: true },
      { text: "." },
    ],
    extraStats: [{ icon: "czas", value: "ok. 8 h", label: "nauki" }],
    image: {
      src: `${A}/k3k-hero-robot.webp`,
      alt: "Robot AI trzyma kostkę z warstwami kontekstu: wiedza, pliki, zadania",
      // design: niebieska „gwiazdka w gwiazdce" + koła i ukośne paski zamiast limonkowej gwiazdy
      decorStar: false,
      bottom: 0, // 2279:2886: robot 635×775 kończy się równo z dołem hero (845)
    },
    backdrop: "circles",
    pad: [29, 30], // 2279:2816: treść y29 → hero 845 (dół 30: nasza treść ~9px niższa niż w Figmie)
    ctaLabel: "ZAPISUJĘ SIĘ NA KURS",
    toolsLabel: "Pracujesz w:",
    tools: ["Claude", "AWS Bedrock / ONA"],
    toolsNote: "Nie musisz znać tych narzędzi – wszystko pokazujemy od zera, krok po kroku.",
    assurances: [
      { icon: "check", text: "Bez kodowania, krok po kroku" },
      { icon: "star", text: "Prowadzi praktyk z 6 latami w fintechu i analityce danych" },
    ],
    // startDate: design ma placeholder „Start: [DD.MM.RRRR]" → do czasu podania daty „Start: wkrótce"
  },
  benefits: {
    heading: "CO ZYSKASZ NA KURSIE?",
    items: [
      {
        title: "Model, który zna Twój kontekst",
        text: "Budujesz warstwę kontekstową: CLAUDE.md, bazę wiedzy, SOP-y i INDEX. Model przestaje zgadywać i odpowiada w Twoim pokoju, nie w pustce.",
      },
      {
        title: "Bezpieczne dane, świadome decyzje",
        text: "Wiesz, które dane możesz wkleić do darmowego modelu, a które wymagają wersji enterprise. Znasz 4 pytania, które warto zadać działowi IT.",
      },
      {
        title: "Błędy wyłapane, zanim narobią szkód",
        text: "Rozpoznajesz halucynacje, dryf kontekstowy i rozszerzanie zakresu. Breadcrumbing pokazuje, skąd model wziął odpowiedź.",
      },
      {
        title: "Automatyzacja od podstaw, z MCP",
        text: "Rozpisujesz zadania na trzy strefy: wspomaganie, ułatwienie, automatyzacja. Przez MCP łączysz model z Jira, Confluence czy pocztą – bezpiecznie, zadanie po zadaniu.",
      },
    ],
    // bento v3 (Figma 2279:2887)
    bento: {
      badge: "EFEKTY KURSU",
      headingLines: ["CO ZYSKASZ", "NA KURSIE?"],
      // UWAGA: K3Benefits pozycjonuje dekor wg geometrii kursu „Z rozmowy do oferty"
      // (obrót 13.54°, kadr 218%); tu dekor to prostokąt 813×476 w (561, −55), bez obrotu.
      decor: `${A}/k3k-decor.webp`,
      decorBox: { x: 561.1, y: -55.4, w: 813.1, h: 476.1 }, // 2279:2888 (bez obrotu)
      tiles: [
        // 2279:2904 makieta „KONTEKST" + odznaka „4 PLIKI" + pigułki KB/SOP — wycinek eksportu 2×, tło = tło kafla #131dff
        { kind: "image", src: `${A}/k3k-kontekst-mock.webp`, x: 400, y: 48, w: 308, h: 416 },
        // 2279:2933–2936 trzy grafiki w ramkach + pigułka
        {
          kind: "grafiki-trio",
          images: [`${A}/k3k-dane-klodka.webp`, `${A}/k3k-dane-tarcza.webp`, `${A}/k3k-dane-dokument.webp`],
          pill: "SOC 2 · enterprise",
        },
        // 2279:2943 lupa (320×170 w 72,14) wpisana w pudełko „slajdy" 404×200 + pigułki 2279:2944
        {
          kind: "slajdy",
          src: `${A}/k3k-bledy-lupa.webp`,
          pills: ["Halucynacja", "Dryf kontekstu", "Breadcrumbing"],
          contentTop: 224,
        },
        // 2279:2960 wykres „trzy strefy" + gwiazdka — wycinek eksportu 2×, tło = tło kafla #06093a
        { kind: "image", src: `${A}/k3k-strefy-chart.webp`, x: 400, y: 50, w: 300, h: 370, titlePx: 28 },
      ],
      marquee: ["AI POD KONTROLĄ", "BEZPIECZNE DANE", "MNIEJ BŁĘDÓW", "AUTOMATYZACJA OD PODSTAW"],
    },
  },
  // Figma 2279:3434
  audience: {
    heading: "DLA KOGO JEST KURS",
    items: ["managerowie", "przedsiębiorcy", "specjaliści IT", "specjaliści spoza IT"],
  },
  // Figma 2279:3584. Design ma jedną odpowiedź (z placeholderami) — pozostałe
  // napisane ostrożnie, bez nowych faktów.
  faq: {
    heading: ["NAJCZĘSTSZE", "PYTANIA"],
    lead: "Nie ma tu Twojego pytania? Napisz do nas – formularz jest poniżej.",
    items: [
      // DO WERYFIKACJI — design: „Start: [DD.MM.RRRR]. … [DO UZUPEŁNIENIA]"
      {
        q: "Kiedy startuje kurs i jak wyglądają zajęcia?",
        a: "Termin startu podamy wkrótce. Kurs to wstęp i 6 części, łącznie około 8 godzin – na żywo lub w nagraniu, we własnym tempie.",
      },
      // DO WERYFIKACJI
      {
        q: "Czy muszę umieć programować?",
        a: "Nie. Kurs prowadzimy bez kodowania – wszystkie narzędzia pokazujemy od zera, krok po kroku.",
      },
      // DO WERYFIKACJI
      {
        q: "Jakie konta i narzędzia są potrzebne?",
        a: "Pracujemy w Claude, w wersji firmowej przez AWS Bedrock lub ONA. Nie musisz znać tych narzędzi – wszystko pokazujemy od zera. Pytania o dostęp w Twojej firmie wyślij przez formularz poniżej.",
      },
      // DO WERYFIKACJI
      {
        q: "Używam w pracy innego modelu niż Claude. Czy kurs mi się przyda?",
        a: "Kurs prowadzimy na Claude, a w module 02 omawiamy też ChatGPT i Gemini. Jeśli chcesz sprawdzić, czy kurs pasuje do Twojego narzędzia, napisz do nas przez formularz poniżej.",
      },
      // DO WERYFIKACJI
      {
        q: "Nie mam budżetu na narzędzia enterprise. Co wtedy?",
        a: "W module 02 pokazujemy, czym różnią się darmowe narzędzia od wersji firmowych i które dane można w nich bezpiecznie umieszczać. Z pytaniem o Twoją sytuację napisz do nas przez formularz poniżej.",
      },
      // DO WERYFIKACJI (cena w designie: placeholder)
      {
        q: "Ile kosztuje kurs i czy dostanę fakturę?",
        a: "Cenę znajdziesz w karcie zapisu – to kwota brutto, płatność jednorazowa. Dane do faktury (w tym NIP firmy) podajesz w formularzu zapisu.",
      },
    ],
  },
  ctaBand: {
    // design: tekst w krzywych HK Modular „GOTOWY, ŻEBY AI PRACOWAŁO POD TWOJĄ KONTROLĄ?"
    text: "Gotowy, żeby AI pracowało pod Twoją kontrolą?",
    ctaLabel: "ZAPISZ SIĘ",
    variant: "modular",
  },
  program: {
    heading: "PROGRAM",
    modules: [
      {
        title: "Z czym właściwie pracujesz",
        effect:
          "Potrafisz wyjaśnić, jak działa model, dlaczego halucynuje i co znaczy „budowanie pokoju”.",
        lessons: [
          {
            title: "Terminal i szkielet projektu",
            items: [
              "Otwierasz terminal i poznajesz podstawowe polecenia: pwd, ls, cd, mkdir, touch, nano",
              "Budujesz szkielet folderów .claude/, który wypełnisz w części 3",
              "Pracujesz na Claude w AWS Bedrock lub ONA, nie w darmowym Claude.ai",
              "Ściągawka terminala pod ręką przez cały kurs",
            ],
          },
          {
            title: "Jak naprawdę działa LLM",
            items: [
              "Token, trening i statystyczna predykcja – bez wewnętrznego kroku weryfikacji",
              "Transformer i mechanizm uwagi pokazane wizualnie, bez matematyki",
              "Pustka kontekstowa: „You can pass” na egzaminie i na przejściu dla pieszych",
              "Demo: to samo pytanie bez kontekstu i z kontekstem, obok siebie",
            ],
          },
        ],
      },
      {
        title: "Bezpieczeństwo: czyje są te dane?",
        effect:
          "Wiesz, które dane możesz bezpiecznie umieścić w modelu, a które trzeba chronić – zanim zaczniesz budować.",
        lessons: [
          {
            title: "Darmowe narzędzia a wersje enterprise",
            items: [
              "ChatGPT, Gemini i Claude.ai w wersji free: trening na danych i recenzenci-ludzie",
              "AWS Bedrock, ONA i Google Workspace Gemini – co dają wersje firmowe",
              "SOC 2 wyjaśnione prosto: co oznacza dla Twoich danych",
              "Co się psuje, gdy dane poufne trafiają do darmowego planu",
            ],
          },
          {
            title: "Ramka decyzyjna o danych",
            items: [
              "Wrażliwość × ekspozycja regulacyjna × audytowalność = wymagany poziom ochrony",
              "Test lakmusowy: czy Twój dział prawny miałby z tym problem?",
              "Jak rozpoznać, na jakim poziomie pracujesz",
              "4 pytania, które warto zadać działowi IT",
            ],
          },
        ],
      },
      {
        title: "Budowanie pokoju: warstwa kontekstowa",
        effect:
          "Masz własną, działającą warstwę kontekstową: CLAUDE.md, bazę wiedzy, SOP-y i INDEX.",
        lessons: [
          {
            title: "Wzorzec ANALYZE.md",
            items: [
              "Dlaczego to, co na początku, kształtuje całą odpowiedź modelu",
              "5 elementów: rola, fazy, formaty wyjściowe, reguły jakości, warunek zakończenia",
              "Architektura promptów zamiast pojedynczych promptów",
              "Wzorzec, który przeniesiesz do każdego zadania",
            ],
          },
          {
            title: "Architektura trójwarstwowa",
            items: [
              "CLAUDE.md – rola, stawka i kluczowe pojęcia, zawsze ładowany",
              "KB – słownik: czym rzeczy są w Twoim kontekście",
              "SOP-y – książka przepisów: jak rzeczy się u Ciebie robi",
              "INDEX – nawigacja: które pliki załadować do zadania",
            ],
          },
          {
            title: "Ćwiczenie i test na żywo",
            items: [
              "4 reguły antyhalucynacyjne – każda z wyjaśnieniem, dlaczego działa",
              "20 minut budowania: opis projektu, 3 wpisy KB, 2 SOP-y i szkic INDEX",
              "To samo pytanie bez warstwy i z warstwą kontekstową",
              "Czego jeszcze brakowało – wnioski do dalszej pracy",
            ],
          },
        ],
      },
      {
        title: "Niezawodność, błędy i ludzki umysł",
        // DO WERYFIKACJI: druga część („trzy strefy") pasuje treścią raczej do modułu 05
        effect:
          "Rozpoznajesz typ błędu i wiesz, jak go naprawić, a swoje zadania masz rozpisane na trzy strefy: wspomaganie, ułatwienie, automatyzacja.",
        lessons: [
          {
            title: "Taksonomia błędów i breadcrumbing",
            items: [
              "Halucynacja: pewny siebie, błędny wynik",
              "Dryf kontekstowy: wczesne instrukcje rozmywają się w długiej rozmowie",
              "Wyciekanie instrukcji i rozszerzanie zakresu odpowiedzi",
              "Breadcrumbing: „Przeprowadź mnie przez swoje rozumowanie krok po kroku”",
            ],
          },
          {
            title: "Emocje i antropomorfizacja",
            items: [
              "Model nie kłamie – kłamstwo wymaga intencji, a intencja myślenia",
              "„Model nie ma X w kontekście” zamiast „model jest uparty”",
              "Dlaczego nie warto przeklinać na AI",
              "Wyciekanie zachowań: nawyki z pracy z LLM w relacjach z ludźmi",
            ],
          },
        ],
      },
      {
        title: "Skala, połączenia i gotowość do automatyzacji",
        effect: "Masz osobisty plan automatyzacji i jedno zadanie, które wdrażasz od razu.",
        lessons: [
          {
            title: "Kiedy automatyzować",
            items: [
              "MCP w skrócie: statyczny kontekst ma ściany, MCP dodaje drzwi",
              "Lista dojrzałości dla każdej strefy pracy",
              "„Jeśli to działa, gdy jestem na urlopie, i się zepsuje – kto to wykryje?”",
              "Atrofia poznawcza: moment, gdy „samochód jedzie tobą”",
            ],
          },
          {
            title: "Osobisty plan automatyzacji",
            items: [
              "Strefa 1: wspomagam teraz, z procesem recenzji",
              "Strefa 2: buduję w tym kierunku, z kryterium sukcesu",
              "Strefa 3: przyszłość i zidentyfikowane ryzyko atrofii",
              "Jedno konkretne zadanie do wdrożenia w tym tygodniu",
            ],
          },
        ],
      },
      {
        title: "MCP: łączenie modelu ze światem",
        effect:
          "Łączysz model z żywymi systemami świadomie: najpierw budujesz pokój, potem otwierasz drzwi.",
        lessons: [
          {
            title: "Co umożliwia MCP",
            items: [
              "Otwarty protokół: model wywołuje narzędzia w trakcie rozmowy",
              "Odczyt danych: Jira, Confluence, GitHub, bazy danych, poczta",
              "Zapis, obliczenia i przepływy między systemami",
              "Dane z MCP podlegają tym samym regułom bezpieczeństwa",
            ],
          },
          {
            title: "Gotowe i własne serwery",
            items: [
              "Znajdź, zainstaluj i skonfiguruj serwer – bez haseł zapisanych w kodzie",
              "Wywołania narzędzi widoczne i możliwe do sprawdzenia",
              "Własny serwer w FastMCP – około 10 linii Pythona",
              "MCP daje zasięg, warstwa kontekstowa daje osąd",
            ],
          },
        ],
      },
    ],
  },
  // Figma 2279:3448
  instructor: {
    pill: "POZNAJMY SIĘ · KTO PROWADZI KURS?",
    name: "PIOTR MAŁYSZ",
    tagsTop: ["ANALIZA DANYCH", "FINTECH"],
    tagBottom: "PRAWO I TECHNOLOGIE",
    photo: `${A}/k3k-piotr.webp`,
    photoAlt: "Piotr Małysz — prowadzący kursu",
    role: "Prowadzący kursu",
    bio: [
      {
        text: "Współzałożyciel firmy specjalizującej się we wdrażaniu i praktycznym wykorzystaniu sztucznej inteligencji w biznesie. Łączy doświadczenie z obszaru fintechu, analityki danych, nowych technologii oraz prawa, wspierając organizacje w ",
      },
      { text: "efektywnym, bezpiecznym i skalowalnym", strong: true },
      { text: " wdrażaniu AI." },
    ],
    stats: [
      { value: "6 lat", label: "w fintechu i analityce danych" },
      { value: "Współzałożyciel", label: "firmy wdrażającej AI w biznesie" },
    ],
    pathHeading: "JAK PRACUJE I UCZY",
    steps: [
      {
        title: "Prawo i technologia w jednym",
        text: "Łączy wiedzę prawniczą z technologiczną, dlatego od początku wie, gdzie trafiają dane i jakie zasady obowiązują przy ich przetwarzaniu.",
      },
      {
        title: "Praca z wrażliwymi danymi",
        text: "Realizował projekty oparte na dużych zbiorach danych, wrażliwych informacjach i złożonych procesach technologicznych.",
      },
      {
        title: "Technologia w praktyce",
        text: "Przekłada zaawansowane technologie na praktyczne zastosowania i mierzalną wartość biznesową.",
      },
    ],
    ctaLabel: "ZAPISZ SIĘ NA KURS",
  },
  mobile: {
    instructorPill: "KTO PROWADZI KURS?", // pełny tekst nie mieści się na 375px
    stickyName: "AI pod kontrolą",
  },
  // Figma 2279:3559
  enroll: {
    heading: "Nie czekaj, aż inni Cię wyprzedzą!",
    cardTitle: "AI POD KONTROLĄ OD PODSTAW",
    // design: pierwszy punkt „6 modułów, 13 lekcji, ok. 8 godzin" — szablon dokleja liczby automatycznie
    included: [
      "Własna warstwa kontekstowa: CLAUDE.md, KB, SOP-y i INDEX",
      "Osobisty plan automatyzacji, zadanie po zadaniu",
    ],
    ctaLabel: "ZAPISZ SIĘ",
  },
};
