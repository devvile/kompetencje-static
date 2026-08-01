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
  /** zdjęcie karty desktop (prawa kolumna 415×554) */
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

/* ============ KURS (course details) ============ */

export interface KursHeroData {
  /** linie solid blue tytułu, np. ["AGENT AI", "W TWOIM"] */
  titleLines: string[];
  /** linia akcentowa lime, np. "BIZNESIE" */
  titleAccent: string;
  description: RichSeg[];
  metaFormat: string; // "Kurs online"
  metaModules: string; // "4 moduły"
  metaLessons: string; // "16 lekcji"
}

export interface KursLesson {
  title: string;
  /** punkty lekcji — w designie osobne linie jednego bloku */
  items: string[];
}

export interface KursModule {
  num: string; // "01"
  title: string; // "WPROWADZENIE DO AI I MICROSOFT 365 COPILOT"
  lessons: KursLesson[];
  /** dymek-komentarz przy module (elipsa z tekstem) */
  bubble: string;
}

export interface KursPage {
  _type: "kursPage";
  slug: string;
  hero: KursHeroData;
  zyskasz: {
    /** nagłówek łamany na linie */
    headingLines: string[];
    benefits: string[];
  };
  program: {
    kicker: string; // "gotowy do wejścia na następny poziom wtajemniczenia ?"
    heading: string; // "PROGRAM"
    modules: KursModule[];
    outro: string; // "nie czekaj aż inni cię wyprzedzą !"
    ctaLabel: string; // "ZAPISZ SIĘ"
  };
  dlaKogo: {
    headingLines: string[];
    audience: string[];
  };
  marqueeText: string; // "KURS STARTUJE JUŻ 20 lipca"
  kontaktHeadingLines: string[];
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
  /** kicker HK nad tytułem (linie) */
  kickerLines: string[];
  /** wielki napis display, "MANIFEST" */
  heading: string;
  /** akapity 1-2 (obok robota); strong = limonkowy marker */
  paragraphsTop: RichSeg[][];
  /** stat na niebieskiej beli: 25–50% miejsc pracy */
  stat: {
    from: number;
    to: number;
    /** tekst za liczbami */
    label: string;
    /** dopisek pod labelem */
    sub: string;
  };
  /** wielka linia display ("PRZYSZŁOŚĆ NALEŻY DO ODWAŻNYCH") */
  displayLine: [string, string];
  /** akapity 3-4 (po beli); strong = limonkowy marker */
  paragraphsBottom: RichSeg[][];
  /** zamknięcie o iskrze (wyróżnione) */
  closingLine: string;
  ctaLabel: string;
  ctaHref: string;
  metaTitle: string;
  metaDescription: string;
}
