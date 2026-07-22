import type { ONasPage } from "./types";

export const oNasPage: ONasPage = {
  _type: "oNasPage",
  hero: {
    kickerLines: ["CHANGING YOUR", "IDEA OF WHAT AI", "CAN DO"],
    // „KOMPE" solid jako jeden string (w Figmie per litera — decyzja Patryka:
    // implementujemy stringiem, ma po prostu tak wyglądać); „TENCJE" outline
    // Poppins, rozsunięte wokół robota na TEN | CJE
    titleSolid: "KOMPE",
    titleOutlineLeft: "TEN",
    titleOutlineRight: "CJE",
  },
  qa: [
    {
      pill: "KIM JESTEŚMY ?",
      text: "Jesteśmy nowoczesną firmą szkoleniową specjalizującą się w rozwijaniu kompetencji AI wśród pracowników i organizacji w Polsce.",
    },
    {
      pill: "CO ROBIMY ?",
      text: "Prowadzimy szkolenia z AI, pomagamy zdobywać kompetencje w stosowaniu AI.",
    },
    {
      pill: "CO JEST DLA NAS WAŻNE ?",
      text: "Ważne jest dla nas przygotowanie polskiego biznesu i pracowników na wyzwania i szanse, jakie stwarza rozwój sztucznej inteligencji. ",
    },
    {
      pill: "CO NAS WYRÓŻNIA ?",
      text: "Nowoczesne podejście przykładające uwagę na realne zastosowanie nauczanych scenariuszy opartych o prawdziwe procesy biznesowe, a także duży nacisk na naukę poprzez praktykę.",
    },
  ],
  qaM: {
    tagline: ["WYRUSZ Z NAMI", "KU PRZYSZŁOŚCI !"],
    items: [
      {
        pill: "KIM JESTEŚMY ?",
        align: "left",
        segs: [
          { text: "Jesteśmy nowoczesną firmą szkoleniową " },
          { text: "specjalizującą się w rozwijaniu kompetencji AI", strong: true },
          { text: " wśród pracowników i organizacji w Polsce." },
        ],
      },
      {
        pill: "CO ROBIMY ?",
        align: "right",
        segs: [
          { text: "Prowadzimy " },
          { text: "szkolenia z zakresu korzystania ze sztucznej inteligencji", strong: true },
          { text: ", pomagamy zdobywać kompetencje w stosowaniu AI." },
        ],
      },
      {
        pill: "CO JEST DLA NAS WAŻNE ?",
        align: "left",
        segs: [
          { text: "Ważne jest dla nas " },
          { text: "przygotowanie polskiego biznesu", strong: true },
          { text: " i pracowników na wyzwania i szanse, jakie stwarza rozwój sztucznej inteligencji." },
        ],
      },
      {
        pill: "CO NAS WYRÓŻNIA ?",
        align: "center",
        segs: [
          { text: "Nowoczesne podejście przykładające uwagę na realne zastosowanie nauczanych " },
          { text: "scenariuszy opartych o prawdziwe procesy biznesowe,", strong: true },
          { text: " a także duży nacisk na naukę poprzez praktykę." },
        ],
      },
    ],
  },
  lime: {
    headerSegs: ["Prowadzimy szkolenia, które naprawdę ", "działają", ". "],
    col1Title: "Nie uczymy teorii",
    col1BodyP1:
      "uczymy na podstawie prawdziwych procesów biznesowych i konkretnych scenariuszy, z którymi uczestnicy spotykają się na co dzień w swojej pracy. ",
    col1BodyP2:
      "Duży nacisk kładziemy na naukę przez praktykę, bo wierzymy, że tylko działanie buduje trwałe kompetencje. ",
    col2Title: "Zależy nam na czymś więcej niż przekazanie wiedzy",
    col2BodyP1:
      "chcemy, by polskie firmy i ich pracownicy byli gotowi nie tylko na wyzwania związane z rozwojem AI, ale by potrafili aktywnie korzystać z szans, które ze sobą przynosi. ",
    col2BodyP2:
      "Dlatego stawiamy na realne scenariusze oparte o prawdziwe procesy biznesowe, naukę przez praktykę.",
    footNote: ["Nowoczesne podejście dostosowane ", "do potrzeb polskiego rynku. "],
  },
  prowadzacy: {
    pill: "POZNAJMY SIĘ !",
    tags: [
      ["PROGRAMOWANIE", "AGENCI AI", "AUTOMATYZACJE AI"],
      ["DANE", "AGENCI AI", "ZARZĄDZANIE PROCESAMI"],
      // w Figmie desktop "PROJECT MANAGMENT" (literówka; mobile ma poprawnie) — poprawione
      ["DESIGN", "MARKETING", "PROJECT MANAGEMENT"],
    ],
    // bio identyczne dla 3 osób w Figmie (placeholder designera) — do podmiany per osoba
    bio: {
      intro:
        "Współzałożyciel firmy specjalizującej się we wdrażaniu i praktycznym wykorzystaniu sztucznej inteligencji w biznesie. Łączy doświadczenie z obszaru fintechu, analityki danych, nowych technologii oraz prawa, wspierając organizacje w efektywnym, bezpiecznym i skalowalnym wdrażaniu rozwiązań AI.",
      mainP1:
        "Przez blisko 6 lat pracował w środowisku fintech i analityki kryptowalutowej, realizując projekty oparte na dużych zbiorach danych, wrażliwych informacjach oraz złożonych procesach technologicznych. Doświadczenie zdobywał w organizacji, która przeszła drogę od startupu do przejęcia przez dużą amerykańską firmę, co pozwoliło rozwinąć kompetencje w zakresie pracy w międzynarodowym środowisku oraz zarządzania złożonymi systemami i procesami",
      mainP2:
        "Absolwent prawa Uniwersytetu Warszawskiego. Karierę rozpoczynał w obszarze ochrony danych osobowych w kancelarii prawnej, co uzupełniło jego profil o perspektywę regulacyjną i odpowiedzialne podejście do technologii.",
      extra:
        "Wykorzystuje sztuczną inteligencję jako kluczowe narzędzie pracy — do automatyzacji procesów, analizy danych oraz optymalizacji działań biznesowych. Specjalizuje się w przekładaniu zaawansowanych technologii na praktyczne zastosowania, koncentrując się na realnych rezultatach i mierzalnej wartości biznesowej.",
    },
  },
};
