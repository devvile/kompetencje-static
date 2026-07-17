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
};
