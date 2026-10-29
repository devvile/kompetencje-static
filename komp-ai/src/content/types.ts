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
  /** waga fontu (np. 500/600/700) — bez markera */
  weight?: number;
  /** letter-spacing w em (np. rozstrzelone „r e w o l u c j i") */
  trackEm?: number;
}

export interface HomeManifest {
  _type: "homeManifest";
  lineA: string; // "NIE CHODZI O TO,"
  lineB: string; // "czy AI zmieni Twoją branżę."
  lineC: [string, string]; // "CHODZI O TO," / "CZY JESTEŚ NA TO GOTOWY."
  /** wstęp akapitu (strong = pogrubienie) */
  paragraph: RichSeg[];
  /** wniosek z limonkową kreską (strong = pogrubienie w kolorze lime) — redesign 2026-10 */
  conclusion: RichSeg[];
  pill: RichSeg[];
  bar: { left: string; center: string; right: string };
  marqueeText: string;
  mobileTagline: string; // "i wyrusz z nami ku przyszłości !"
  mobileCtaLabel: string; // "POZNAJ NASZE KURSY"
}

export interface DnaCard {
  _type: "dnaCard";
  price: string;
  leadLabel: string;
  leadName: string;
  /** 3 linie nagłówka; ostatnia w kolorze lime */
  titleLines: [string, string, string];
  body: RichSeg[];
  ctaLabel: string;
  ctaHref: string;
  /** pigułka pod tytułem („✦ Context Control") — redesign 2026-10 */
  pill?: string;
  /** grafika karty desktop (redesign 2026-10):
   *  panel = szary panel 451×542 po prawej (tekst po lewej),
   *  robot = robot z alfą na niebieskim po lewej (tekst po prawej) */
  art?: { kind: "panel"; src: string } | { kind: "robot"; src: string };
  /** zdjęcie karty desktop (prawa kolumna 415×554) — stary układ, gdy brak `art` */
  photo: string;
  /** zdjęcie karty mobile (316×210, zaokrąglone) */
  photoM: string;
}

export interface KursTile {
  _type: "kursTile";
  tag: string;
  title: [string, string];
  price: string;
  ctaLabel: string;
  ctaHref: string;
  /** zdjęcie kafla (273×211, pełna szerokość panelu) */
  photo: string;
  /** pionowy sidebar na lime pasku */
  leadLabel: string;
  leadName: string;
}

export interface HumanMachine {
  _type: "humanMachine";
  titleTop: string;
  titleBottom: string;
  caption: string;
}

export interface LecturerCrop {
  w: string;
  h: string;
  left: string;
  top: string;
}

export interface Lecturer {
  _type: "lecturer";
  name: string;
  /** nazwisko łamane na linie na mobile (desktop: jedna linia w labelce) */
  nameLines: string[];
  photo: string;
  /** kadr zdjęcia z Figmy: wymiary/offset img w % ramki karty (Sanity później: hotspot/crop) */
  crop: LecturerCrop;
  /** kadr wariantu mobile (inne proporcje przycięcia w designie) */
  cropM: LecturerCrop;
}

export interface Prowadzacy {
  _type: "prowadzacy";
  heading: string;
  /** pill „poznajmy się !" nad nagłówkiem (tylko mobile) */
  kicker: string;
  people: Lecturer[];
}

export interface FormField {
  _type: "formField";
  id: string;
  label: string;
  placeholder: string;
  kind: "text" | "email" | "tel" | "textarea";
}

export interface Kontakt {
  _type: "kontakt";
  headingLines: string[];
  fields: FormField[];
  consentLabel: string;
  submitLabel: string;
  /** pasek CTA nad nagłówkiem (home desktop, redesign 2026-10: „POZNAJ NASZE KURSY") */
  coursesCta?: { label: string; href: string };
}

export interface FooterLink {
  _type: "footerLink";
  label: string;
  href: string;
}

export interface Footer {
  _type: "footer";
  descriptionLines: string[];
  copyrightLime: string;
  copyrightWhite: string;
  navLinks: FooterLink[];
  legalLinks: FooterLink[];
  contactHeading: string;
  email: string;
  phone: string;
}

export interface HomePage {
  _type: "homePage";
  hero: HomeHero;
  manifest: HomeManifest;
  dnaCards: DnaCard[];
  kursTiles: KursTile[];
  /** webinary promowane kartą nad paskiem TY DECYDUJESZ (slugi z content/webinary.ts) */
  webinarSlugs: string[];
  humanMachine: HumanMachine;
  prowadzacy: Prowadzacy;
  kontakt: Kontakt;
}

export interface SiteSettings {
  _type: "siteSettings";
  nav: NavLink[];
  footer: Footer;
}

export interface ONasHero {
  kickerLines: string[];
  titleSolid: string;
  titleOutlineLeft: string;
  titleOutlineRight: string;
}

export interface ONasQaItem {
  pill: string;
  text: string;
}

export interface ONasLime {
  /** nagłówek HK z akcentem: [normal, akcent(większy), normal] */
  headerSegs: [string, string, string];
  col1Title: string;
  /** akapit 1 (Regular) i 2 (SemiBold), rozdzielone odstępem */
  col1BodyP1: string;
  col1BodyP2: string;
  col2Title: string;
  col2BodyP1: string;
  col2BodyP2: string;
  footNote: [string, string];
}

export interface ONasBio {
  intro: string;
  mainP1: string;
  mainP2: string;
  extra: string;
}

export interface ONasProwadzacy {
  pill: string;
  /** tagi per osoba: [rząd górny×2, dolny×1] */
  tags: [string, string, string][];
  /** bio w Figmie identyczne dla 3 osób (placeholder designera) — jedno wspólne */
  bio: ONasBio;
}

export interface ONasQaItemM {
  pill: string;
  segs: RichSeg[];
  align: "left" | "right" | "center";
}

export interface ONasPage {
  _type: "oNasPage";
  hero: ONasHero;
  qa: ONasQaItem[];
  /** mobile: inne treści i mixed-bold niż desktop */
  qaM: {
    tagline: [string, string];
    items: ONasQaItemM[];
  };
  lime: ONasLime;
  prowadzacy: ONasProwadzacy;
}

/* KURS (podstrona kursu): schemat w ./courses/types.ts (CourseContent) */

/* ============ KURS v2 — wielokrotnie używalny szablon strony kursu ============
 * Design UI/UX 2026-10 (Figma 5ufIXE17KqmkvVrfSVzUFE, frame 2009:1973).
 * Jeden dokument KursV2Page = jedna podstrona /kursy/[slug]. Wszystko, co
 * zależy od kursu, jest tutaj; layout/typografia/kolory w KursV2Template.
 * Liczby modułów i lekcji liczą się AUTOMATYCZNIE z `program` (hero, karta
 * ceny, JSON-LD) — nie wpisuje się ich ręcznie.
 * W RichSeg strong = pogrubienie (nie limonkowy marker). */

export type KursV2Icon = "moduly" | "lekcje" | "czas";

export interface KursV2Lesson {
  title: string;
  /** punkty lekcji (lista) */
  items: string[];
}

export interface KursV2Module {
  /** tytuł modułu (wyświetlany uppercase); numer 01/02… nadawany automatycznie */
  title: string;
  lessons: KursV2Lesson[];
  /** tekst w owalu „efekt modułu" (opcjonalny) */
  effect?: string;
}

/** Grafika hero (prawa kolumna). Wymiary w px płótna 1440 — domyślnie jak
 * robot z designu (635×775, x −39 względem kolumny grafiki); stopy grafiki
 * stoją na niebieskim panelu „Co zyskasz" (kotwica do dołu hero). */
export interface KursV2HeroImage {
  src: string;
  alt: string;
  /** szerokość/wysokość pudełka grafiki (object-contain, wyrównanie do dołu) */
  width?: number;
  height?: number;
  /** przesunięcie poziome względem kolumny grafiki (domyślnie −39) */
  offsetX?: number;
  /** limonkowa gwiazda za grafiką (domyślnie true) */
  decorStar?: boolean;
}

export interface KursV2Instructor {
  pill: string; // „POZNAJMY SIĘ · KTO PROWADZI KURS?"
  name: string;
  /** tagi nad zdjęciem (1–3 krótkie) i jeden pod zdjęciem */
  tagsTop: string[];
  tagBottom?: string;
  /** zdjęcie ~400×646 (kadr pionowy; object-cover) */
  photo: string;
  /** opcjonalny kadr na mobile (~306×383, proporcja 4:5); domyślnie `photo` */
  photoMobile?: string;
  /** okrągły avatar (~88×88) w formularzu zapisu; domyślnie `photo` */
  avatar?: string;
  photoAlt: string;
  role: string; // „Prowadzący kursu"
  bio: RichSeg[];
  /** statystyki w rzędzie (zwykle 2) */
  stats: { value: string; label: string }[];
  pathHeading: string; // „JAK PRACUJE I UCZY"
  /** kroki 01–0N (numeracja automatyczna) */
  steps: { title: string; text: string }[];
  ctaLabel: string;
}

export interface KursV2Page {
  _type: "kursV2Page";
  slug: string;
  /** nazwa kursu zdaniem („Z rozmowy do oferty w 60 minut") — podsumowanie
   * w formularzu zapisu, przyklejony pasek, JSON-LD */
  name: string;
  metaTitle: string;
  metaDescription: string;
  /** opcjonalny Price ID z panelu Stripe (price_…); brak → cena z `price` */
  stripePriceId?: string;
  /** cena — jedno źródło dla hero, karty zapisu, płatności Stripe i JSON-LD */
  price: {
    value: number; // 1500
    currency: string; // "PLN"
    /** dopisek pod ceną, np. „brutto, płatność jednorazowa" */
    note: string;
  };
  hero: {
    /** numer kursu w ofercie („02") */
    number: string;
    kicker: string; // „KURS ONLINE NA ŻYWO"
    /** linie tytułu (Montserrat Black); pigułka doklejana do OSTATNIEJ linii */
    titleLines: string[];
    titlePill?: string;
    /** linia na limonkowym tle */
    titleAccent: string;
    lead: string;
    description: RichSeg[];
    /** statystyki DODATKOWE po automatycznych „N moduły" i „M lekcji";
     * desktop: „value label" w jednej linii, mobile: value nad label */
    extraStats?: { icon: KursV2Icon; value: string; label: string }[];
    image: KursV2HeroImage;
    ctaLabel: string;
    toolsLabel?: string; // „Pracujesz w:"
    tools?: string[];
    assurances: { icon: "check" | "star"; text: string }[];
  };
  benefits: {
    heading: string;
    /** titleMobile/textMobile — opcjonalne krótsze wersje na telefon */
    items: { title: string; text: string; titleMobile?: string; textMobile?: string }[];
  };
  ctaBand: { text: string; ctaLabel: string };
  program: { heading: string; modules: KursV2Module[] };
  instructor: KursV2Instructor;
  /** opcjonalne teksty TYLKO na telefon (brak pola = tekst z desktopu) */
  mobile?: {
    kicker?: string; // „KURS ONLINE"
    lead?: string;
    description?: RichSeg[];
    /** zapewnienia w karcie ceny hero (brak = jak na desktopie) */
    assurances?: { icon: "check" | "star"; text: string }[];
    instructorPill?: string; // „KTO PROWADZI KURS?"
    /** przyklejony dolny pasek (pojawia się po przewinięciu hero) */
    stickyName?: string; // „Z rozmowy do oferty"; domyślnie tytuł kursu
    stickyCtaLabel?: string; // „ZAPISUJĘ SIĘ"
  };
  enroll: {
    heading: string;
    /** domyślnie tytuł kursu (linie tytułu + akcent) */
    cardTitle?: string;
    /** punkty „w cenie" PO automatycznym „N moduły i M lekcji online" */
    included: string[];
    ctaLabel: string;
    /** formularz zapisu (modal / panel od dołu) */
    form?: {
      /** limonkowe zapewnienie w podsumowaniu */
      note?: string;
      /** tekst przycisku wysyłki (domyślnie „PRZEJDŹ DO PŁATNOŚCI") */
      submitLabel?: string;
      /** informacja pod przyciskiem */
      footnote?: string;
    };
  };
}

/* ============ WEBINAR — szablon strony szczegółów ============
 * Design: Figma 5ufIXE17KqmkvVrfSVzUFE, frame 2002:1803 („WEBINAR – przed
 * aktualizacją 07.10"). Jeden dokument WebinarPage = /webinary/[slug].
 * Termin podany jako data ISO formatuje się sam („czwartek, 23.10, godz. 18:00",
 * strefa Europe/Warsaw); cena 0 = „Bezpłatnie". */

export interface WebinarPage {
  _type: "webinarPage";
  slug: string;
  /** opublikowany = indeksowany w Google; false → noindex (strona „ukryta") */
  published: boolean;
  /** nazwa zdaniem („Zbuduj swojego agenta AI w 60 minut") — SEO, JSON-LD */
  name: string;
  metaTitle: string;
  metaDescription: string;
  /** pigułka nad tytułem („AI GYM · WEBINAR NA ŻYWO") */
  badge: string;
  /** tytuł: linie przed akcentem, linia na limonkowym tle, linie po */
  title: { before: string[]; accent: string; after: string[] };
  tagline: string; // „TE SAME DANE. INNY MÓZG."
  /** akapity opisu; strong = pogrubienie */
  description: RichSeg[][];
  /** pogrubiona linia pod opisem */
  boldNote?: string;
  /** zapis: link (formularz / platforma webinarowa), tekst przycisku, linie obok przycisku */
  register: { href: string; label: string; note: string[] };
  /** karta „SZCZEGÓŁY" */
  details: {
    /** imię i nazwisko — pionowo na limonkowym pasku karty */
    instructor: string;
    /** data i godzina startu (ISO, np. "2026-10-23T18:00:00+02:00"); brak = „Termin wkrótce" */
    start?: string;
    format: string;
    duration: string;
    /** czas w minutach — do JSON-LD (Event.endDate) */
    durationMin: number;
    tool?: string;
    /** 0 = „Bezpłatnie" */
    price: { value: number; currency: string };
    /** etykieta wiersza ceny (design: „INWESTYCJA"; domyślnie „CENA") */
    priceLabel?: string;
    note?: string;
  };
  /** sekcja „to samo pytanie, dwie odpowiedzi" (opcjonalna) */
  comparison?: {
    heading: string[];
    text: string;
    plain: { label: string; items: string[]; effect: string };
    agent: { label: string; items: string[]; effect: string };
  };
  agenda: { heading: string; subheading?: string; steps: { time: string; title: string; text: string }[] };
  outcomes: { heading: string[]; items: string[] };
  audience: { heading: string; tags: string[]; text: string; safety?: { label: string; text: string } };
  closing: { lines: string[]; ctaLabel?: string };
  /** karta reklamy webinaru na stronie głównej (design 2085:1762) — opcjonalna;
   * prowadzący, cena, data i godziny biorą się z `details` */
  promo?: {
    chips: { icon: "star" | "arrow"; text: string; variant: "lime" | "outline" }[];
    /** linie nagłówka; OSTATNIA na limonkowo */
    headingLines: string[];
    /** małe słowo doklejone do 1. linii nagłówka („KTÓRY") */
    headingSmall?: string;
    description: RichSeg[];
    /** grafika panelu (zdjęcie prowadzącego z tłem), proporcja ~483×561 */
    image: string;
    imageAlt: string;
    /** pigułka na zdjęciu („Agenci AI · procesy · fintech") */
    expertise?: string;
    /** trzecia pigułka po dacie i godzinie („Online, na żywo") */
    formatChip: string;
    ctaLabel: string; // „ZAPISZ SIĘ ZA DARMO"
    ctaNote?: string;
  };
}

/* ============ STRONY PRAWNE (polityka prywatności / regulamin) ============ */

/** Blok treści sekcji prawnej: akapit LUB lista punktowana */
export interface LegalBlock {
  text?: string;
  items?: string[];
}

export interface LegalSection {
  _type: "legalSection";
  num: string; // "01"
  title: string;
  blocks: LegalBlock[];
}

export interface LegalPage {
  _type: "legalPage";
  slug: string;
  /** kicker HK nad nagłówkiem (linie) */
  kickerLines: string[];
  /** pełny tytuł strony do h1/SEO, np. "Polityka prywatności" */
  pageTitle: string;
  /** wielki napis display bleedujący na blue box, np. "REGULAMIN" */
  heading: string;
  /** "Ostatnia aktualizacja: ..." */
  updated: string;
  sections: LegalSection[];
  outro: string;
  ctaLabel: string;
  ctaHref: string;
  metaTitle: string;
  metaDescription: string;
}

export interface ManifestPage {
  _type: "manifestPage";
  /** wielki napis display, "MANIFEST" */
  heading: string;
  /** akapity w niebieskim boksie (obok robota); strong = limonkowy marker */
  intro: RichSeg[][];
  /** akapit w limonkowej karcie pod boksem */
  lead: RichSeg[];
  /** stat na niebieskiej beli: 25–50% miejsc pracy */
  stat: {
    from: number;
    to: number;
    /** tekst za liczbami */
    label: string;
    /** dopisek pod labelem */
    sub: string;
  };
  /** „przyszłość" w elipsie + „należy do odważnych !" */
  future: { word: string; tail: string };
  /** nagłówek sekcji limonkowej + akapit pod nim */
  futureHeading: string;
  futureBody: string;
  /** tekst w niebieskim boksie (prawy dół sekcji limonkowej) */
  pride: RichSeg[];
  /** zamknięcie: kicker HK + linie na limonkowych belkach */
  closingKicker: string;
  closingLines: string[];
  ctaLabel: string;
  ctaHref: string;
  metaTitle: string;
  metaDescription: string;
}
