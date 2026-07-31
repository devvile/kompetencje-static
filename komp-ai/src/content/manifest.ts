// Treść podstrony /manifest — dostarczona przez Patryka 2026-07-31.
// Mock przyszłego dokumentu Sanity (patrz types.ts / index.ts).
// strong = limonkowy marker w prezentacji (kluczowe frazy).
import type { ManifestPage } from "./types";

export const manifestPage: ManifestPage = {
  _type: "manifestPage",
  kickerLines: [],
  heading: "MANIFEST",
  paragraphsTop: [
    [
      { text: "Stoimy na czele nowej ery, gdzie " },
      { text: "kreatywność spotyka się z technologią", strong: true },
      { text: ", na nowo definiując to, co możliwe. Nigdy w historii ludzkości nie byliśmy w miejscu, w którym jesteśmy teraz. Powstanie Sztucznej Inteligencji jest " },
      { text: "przełomem", strong: true },
      { text: ", który zapisze się wielkimi literami jako nowy rozdział w historii ludzkości." },
    ],
    [
      { text: "Jesteśmy w trakcie rewolucji, której skala i zasięg są ciężkie do przewidzenia. Postęp technologiczny pędzi nieubłaganie, a my chcemy być " },
      { text: "waszym przewodnikiem", strong: true },
      { text: " w zmianach, które nadchodzą." },
    ],
  ],
  stat: {
    from: 25,
    to: 50,
    label: "miejsc pracy zostanie zastąpionych przez automatyzację związaną z AI",
    sub: "— o takiej skali zmian mówią różne autorytety.",
  },
  displayLine: ["PRZYSZŁOŚĆ NALEŻY", "DO ODWAŻNYCH"],
  paragraphsBottom: [
    [
      { text: "Przyszłość należy do odważnych, gotowych z odwagą i zaangażowaniem patrzeć przed siebie. Wierzymy, że dzięki odpowiednim kompetencjom, wykorzystanie technologii Sztucznej Inteligencji pozwala uzyskać " },
      { text: "niesamowitą przewagę", strong: true },
      { text: " i wykorzystać ją w zmieniającej się światowej gospodarce i rynku pracy." },
    ],
    [
      { text: "Z dumą chcemy być częścią tej rewolucji i prowadzić " },
      { text: "polskie przedsiębiorstwa i Polaków ku lepszemu jutru", strong: true },
      { text: "." },
    ],
  ],
  closingLine:
    "Dołączcie do nas w tej podróży i niech nasza iskra inspiracji i kreatywności rozpali razem ogień jaśniejszej przyszłości.",
  ctaLabel: "POZNAJ NASZE KURSY",
  ctaHref: "/#kursy",
  metaTitle: "Manifest — nasze podejście do kompetencji AI",
  metaDescription:
    "Manifest kompetencje.ai — stoimy na czele nowej ery, w której kreatywność spotyka się z technologią. Przeczytaj, dlaczego kompetencje AI to przewaga w nadchodzącej rewolucji.",
};
