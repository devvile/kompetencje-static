// Treść podstrony kursu (/kursy/[slug]) — to jest przyszły schemat CMS-a.
// Jeden plik danych na kurs w tym katalogu; szablon renderuje WYŁĄCZNIE z tych
// danych (komponenty sekcji dostają CourseContent jako props i nic więcej).
// Liczby na pasku hero („3 moduły", „8 lekcji") są liczone z modules/lessons —
// nie wpisuje się ich ręcznie (patrz ./index.ts → courseStats).

export type CourseContent = {
  slug: string;
  metaTitle: string; // <title>
  metaDescription: string;
  hero: {
    /** H1 w 3 liniach; wersaliki i kolory robi CSS (linia 3 = lime) */
    titleLines: [string, string, string];
    lead: string;
    format: string; // "Kurs online"
  };
  /** dokładnie 4 wiersze panelu „CO ZYSKASZ NA KURSIE?" */
  benefits: { title: string; text: string }[];
  /** linijka zaczepna nad napisem PROGRAM, w 2 liniach */
  teaser: [string, string];
  modules: {
    number: string; // "01"
    title: string;
    lessons: { title: string; bullets: string[] }[];
    /** tekst w dymku przy pierwszej lekcji modułu */
    summary: string;
  }[];
  closingLine: string;
  cta: { label: string; href: string };
};
