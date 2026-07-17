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
}

export interface KursTile {
  _type: "kursTile";
  tag: string;
  title: [string, string];
  price: string;
  ctaLabel: string;
  ctaHref: string;
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

export interface ONasPage {
  _type: "oNasPage";
  hero: ONasHero;
  qa: ONasQaItem[];
  lime: ONasLime;
  prowadzacy: ONasProwadzacy;
}
