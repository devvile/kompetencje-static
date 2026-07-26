// Mock content widoku KURS (course details) — docelowo dokumenty Sanity per kurs.
// Treści 1:1 z Figmy (node 245:2627 / 341:2201); placeholdery designera zachowane
// tam, gdzie są ewidentnie treścią wzorcową („przedstawiamy wartość").
// POPRAWIONE literówki designu: „przedsięborcy" → „przedsiębiorcy",
// „freelancerze" → „freelancerzy" (zgłoszone Patrykowi).
import type { KursPage } from "./types";

export const kursAgentAi: KursPage = {
  _type: "kursPage",
  slug: "agent-ai-w-twoim-biznesie",
  hero: {
    titleLines: ["AGENT AI", "W TWOIM"],
    titleAccent: "BIZNESIE",
    description: [
      { text: "Dowiedz się, jak wykorzystać sztuczną inteligencję do " },
      { text: "automatyzacji procesów,", strong: true },
      { text: " zwiększenia efektywności i " },
      { text: "skalowania działań", strong: true },
      {
        text: " bez zwiększania zespołu. Ten kurs pokaże Ci krok po kroku, jak wdrożyć AI do codziennej pracy — od obsługi klientów, przez marketing, aż po operacje — tak, aby ",
      },
      { text: "realnie wspierało", strong: true },
      { text: " rozwój Twojego biznesu." },
    ],
    metaFormat: "Kurs online",
    metaModules: "4 moduły",
    metaLessons: "16 lekcji",
  },
  zyskasz: {
    headingLines: ["CO", "ZYSKASZ", "NA", "KURSIE?"],
    benefits: [
      "przedstawiamy wartość",
      "przedstawiamy wartość",
      "przedstawiamy wartość",
      "przedstawiamy wartość",
    ],
  },
  program: {
    kicker: "gotowy do wejścia na następny poziom wtajemniczenia ?",
    heading: "PROGRAM",
    modules: [
      {
        num: "01",
        title: "WPROWADZENIE DO AI I MICROSOFT 365 COPILOT",
        bubble: "tutaj dowiesz się tego i tego",
        lessons: [
          {
            title: "Wprowadzenie do AI",
            items: [
              "Czym jest AI?",
              "Jak powstawała sztuczna inteligencja?",
              "Wpływ AI na biznes",
              "Przykłady zastosowania AI",
            ],
          },
          {
            title: "Wprowadzenie do Microsoft 365 Copilot",
            items: [
              "Co to jest Copilot?",
              "Jak działa Copilot w Microsoft 365?",
              "Copilot jako przewaga konkurencyjna",
              "Zasady tworzenia promptów",
            ],
          },
        ],
      },
      {
        num: "02",
        title: "COPILOT W PRAKTYCE",
        bubble: "na tym etapie będziesz potrafił to i to",
        lessons: [
          {
            title: "Copilot w codziennej pracy",
            items: [
              "Zarządzanie pocztą e-mail",
              "Organizacja spotkań i kalendarza",
              "Praca nad dokumentami",
              "Tworzenie prezentacji",
            ],
          },
          {
            title: "Copilot w komunikacji wewnętrznej",
            items: [
              "Co to jest Copilot?",
              "Jak działa Copilot w Microsoft 365?",
              "Copilot jako przewaga konkurencyjna",
              "Zasady tworzenia promptów",
            ],
          },
          {
            title: "Copilot w dziale HR",
            items: [
              "Co to jest Copilot?",
              "Jak działa Copilot w Microsoft 365?",
              "Copilot jako przewaga konkurencyjna",
              "Zasady tworzenia promptów",
            ],
          },
        ],
      },
    ],
    outro: "nie czekaj aż inni cię wyprzedzą !",
    ctaLabel: "ZAPISZ SIĘ",
  },
  dlaKogo: {
    headingLines: ["DLA", "KOGO", "JEST", "KURS"],
    audience: ["managerowie", "przedsiębiorcy", "freelancerzy", "dyrektorzy firm"],
  },
  marqueeText: "KURS STARTUJE JUŻ 20 lipca",
  kontaktHeadingLines: ["Napisz do nas", "pomożemy dobrać kurs", "do TWOICH POTRZEB"],
};

/** slug → kurs; na razie oba kursy z home wskazują na ten sam mock */
export const kursy: Record<string, KursPage> = {
  "agent-ai-w-twoim-biznesie": kursAgentAi,
  "bezpieczenstwo-aplikacji": { ...kursAgentAi, slug: "bezpieczenstwo-aplikacji" },
};
