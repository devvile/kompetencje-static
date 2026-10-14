// Treść podstrony /manifest — tekst Patryka (2026-07-31) w układzie z designu
// v2 (Figma 5ufIXE17KqmkvVrfSVzUFE, frame MANIFEST 458:1640, 2026-10).
// Mock przyszłego dokumentu Sanity (patrz types.ts / index.ts).
// strong = limonkowy marker (niebieski tekst na limonce).
import type { ManifestPage } from "./types";

export const manifestPage: ManifestPage = {
  _type: "manifestPage",
  heading: "MANIFEST",
  intro: [
    [
      { text: "Stoimy na czele " },
      { text: "nowej ery,", fontPx: 30, weight: 500 },
      { text: " gdzie " },
      { text: "kreatywność spotyka się z technologią,", strong: true },
      { text: " na nowo definiując to, co możliwe." },
    ],
    [
      { text: "Nigdy w historii ludzkości nie byliśmy w miejscu, w którym jesteśmy teraz. Powstanie Sztucznej Inteligencji jest " },
      { text: "przełomem,", strong: true },
      { text: " który zapisze się wielkimi literami jako nowy rozdział w historii ludzkości." },
    ],
  ],
  lead: [
    { text: "Jesteśmy w trakcie " },
    { text: "rewolucji,", weight: 600, trackEm: 0.44 },
    { text: " której skala i zasięg są ciężkie do przewidzenia. " },
    { text: "Postęp technologiczny pędzi nieubłaganie,", weight: 700 },
    { text: " a my chcemy być Twoim przewodnikiem w zmianach, które nadchodzą." },
  ],
  stat: {
    from: 25,
    to: 50,
    label: "miejsc pracy zostanie zastąpionych przez automatyzację związaną z AI",
    sub: "— o takiej skali zmian mówią różne autorytety.",
  },
  future: { word: "przyszłość", tail: "należy do odważnych !" },
  futureHeading: "Przyszłość należy do tych, którzy ją tworzą",
  futureBody:
    "gotowych z odwagą i zaangażowaniem patrzeć przed siebie. Wierzymy, że dzięki odpowiednim kompetencjom, wykorzystanie technologii Sztucznej Inteligencji pozwala uzyskać niesamowitą przewagę i wykorzystać ją w zmieniającej się światowej gospodarce i rynku pracy.",
  pride: [
    { text: "Z dumą chcemy być częścią tej rewolucji i prowadzić polskie przedsiębiorstwa oraz Polaków " },
    { text: "ku lepszemu jutru.", weight: 700 },
  ],
  closingKicker: "DOŁĄCZ do nas w tej podróży!",
  closingLines: [
    "niech nasza iskra inspiracji",
    "i kreatywności rozpali razem ogień",
    "jaśniejszej przyszłości.",
  ],
  ctaLabel: "POZNAJ NASZE KURSY",
  ctaHref: "/#kursy",
  metaTitle: "Manifest — nasze podejście do kompetencji AI",
  metaDescription:
    "Manifest kompetencje.ai — stoimy na czele nowej ery, w której kreatywność spotyka się z technologią. Przeczytaj, dlaczego kompetencje AI to przewaga w nadchodzącej rewolucji.",
};
