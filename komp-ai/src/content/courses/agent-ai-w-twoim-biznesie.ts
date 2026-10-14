// Stara treść szablonu kursu (Figma node 245:2627 / 341:2201), przeniesiona
// 1:1 z poprzedniego mocka `content/kurs.ts` do nowego schematu CourseContent.
// Placeholdery designera („przedstawiamy wartość", „tutaj dowiesz się tego
// i tego") zachowane celowo — treść do dostarczenia przez klienta.
// UWAGA (zgłoszone): lekcje „Copilot w komunikacji wewnętrznej" i „Copilot
// w dziale HR" mają w designie skopiowane punkty z lekcji „Wprowadzenie do
// Microsoft 365 Copilot" — przeniesione bez poprawiania.
// Poprawione literówki designu: „przedsięborcy" → „przedsiębiorcy",
// „freelancerze" → „freelancerzy" (dotyczyło sekcji „dla kogo", której
// szablon nie renderuje).
// Ten kurs jest też FALLBACKIEM dla slugów bez własnego pliku (patrz index.ts).
import type { CourseContent } from "./types";

export const course: CourseContent = {
  slug: "agent-ai-w-twoim-biznesie",
  metaTitle: "AGENT AI W TWOIM BIZNESIE — kurs AI online | Kompetencje.ai",
  metaDescription:
    "Kurs online kompetencje.ai: wdrażanie AI w biznesie krok po kroku — automatyzacja procesów, Microsoft 365 Copilot, praktyczne moduły i lekcje.",

  hero: {
    titleLines: ["AGENT AI", "W TWOIM", "BIZNESIE"],
    // w poprzednim mocku fragmenty „automatyzacji procesów,", „skalowania
    // działań" i „realnie wspierało" były pogrubione (RichSeg.strong);
    // schemat CourseContent ma lead jako zwykły string — pogrubienia spłaszczone
    lead:
      "Dowiedz się, jak wykorzystać sztuczną inteligencję do automatyzacji procesów, zwiększenia efektywności i skalowania działań bez zwiększania zespołu. Ten kurs pokaże Ci krok po kroku, jak wdrożyć AI do codziennej pracy — od obsługi klientów, przez marketing, aż po operacje — tak, aby realnie wspierało rozwój Twojego biznesu.",
    format: "Kurs online",
  },

  benefits: [
    { title: "przedstawiamy wartość", text: "" },
    { title: "przedstawiamy wartość", text: "" },
    { title: "przedstawiamy wartość", text: "" },
    { title: "przedstawiamy wartość", text: "" },
  ],

  teaser: ["gotowy do wejścia", "na następny poziom wtajemniczenia ?"],

  modules: [
    {
      number: "01",
      title: "WPROWADZENIE DO AI I MICROSOFT 365 COPILOT",
      lessons: [
        {
          title: "Wprowadzenie do AI",
          bullets: [
            "Czym jest AI?",
            "Jak powstawała sztuczna inteligencja?",
            "Wpływ AI na biznes",
            "Przykłady zastosowania AI",
          ],
        },
        {
          title: "Wprowadzenie do Microsoft 365 Copilot",
          bullets: [
            "Co to jest Copilot?",
            "Jak działa Copilot w Microsoft 365?",
            "Copilot jako przewaga konkurencyjna",
            "Zasady tworzenia promptów",
          ],
        },
      ],
      summary: "tutaj dowiesz się tego i tego",
    },
    {
      number: "02",
      title: "COPILOT W PRAKTYCE",
      lessons: [
        {
          title: "Copilot w codziennej pracy",
          bullets: [
            "Zarządzanie pocztą e-mail",
            "Organizacja spotkań i kalendarza",
            "Praca nad dokumentami",
            "Tworzenie prezentacji",
          ],
        },
        {
          title: "Copilot w komunikacji wewnętrznej",
          bullets: [
            "Co to jest Copilot?",
            "Jak działa Copilot w Microsoft 365?",
            "Copilot jako przewaga konkurencyjna",
            "Zasady tworzenia promptów",
          ],
        },
        {
          title: "Copilot w dziale HR",
          bullets: [
            "Co to jest Copilot?",
            "Jak działa Copilot w Microsoft 365?",
            "Copilot jako przewaga konkurencyjna",
            "Zasady tworzenia promptów",
          ],
        },
      ],
      summary: "na tym etapie będziesz potrafił to i to",
    },
  ],

  closingLine: "nie czekaj aż inni cię wyprzedzą !",
  cta: { label: "ZAPISZ SIĘ", href: "#kontakt" },
};
