// Treść OSTATECZNA (dostarczona przez Patryka 2026-09-17) — nie redagować.
import type { CourseContent } from "./types";

export const course: CourseContent = {
  slug: "z-rozmowy-do-oferty",
  metaTitle: "Z ROZMOWY DO OFERTY W 60 MINUT – kurs AI online | Kompetencje.ai",
  metaDescription:
    "Kurs online: z notatek, cennika i rozmowy z klientem do gotowej oferty w PDF lub PPTX w Claude Code, z grafikami z Higgsfield i wyceną opartą o stawki rynkowe.",

  hero: {
    titleLines: ["Z ROZMOWY", "DO OFERTY", "W 60 MINUT"],
    lead:
      "Dowiedz się, jak z tego, co i tak masz pod ręką – notatek, cennika, rozmowy z klientem na Messengerze albo nagrania ze spotkania – przygotować w Claude Code gotową do wysłania ofertę handlową w PDF lub PPTX, z grafikami wygenerowanymi pod Twoją markę w Higgsfield. Ten kurs pokaże Ci krok po kroku cały proces: od briefu, przez wycenę opartą o realne stawki rynkowe, aż po plik, który klient otwiera i podpisuje.",
    format: "Kurs online",
  },

  benefits: [
    {
      title: "Oferta w godzinę, nie w dwa wieczory",
      text: "Jeden folder z materiałami, jeden prompt, gotowy plik PDF lub PPTX. Wracasz do klienta tego samego dnia, a nie w przyszłym tygodniu.",
    },
    {
      title: "Grafiki pod Twoją markę, bez grafika",
      text: "Ilustracje, wizualizacje usług i tła generowane w Higgsfield w jednym spójnym stylu. Wiesz, kiedy warto płacić kredytami, a kiedy wystarczy tekst.",
    },
    {
      title: "Prezentacja prosto z rozmowy",
      text: "Rozmowa z Messengera, transkrypt ze spotkania albo notatka głosowa zamieniają się w prezentację, zanim klient zdąży zapomnieć, o czym rozmawialiście.",
    },
    {
      title: "Wycena oparta o rynek, nie o zgadywanie",
      text: "Agent w kilka minut zbiera stawki rynkowe i oferty konkurencji dla Twojej usługi. Cenę w ofercie potrafisz obronić jednym zdaniem.",
    },
  ],

  teaser: ["Gotowy, żeby Twoja następna oferta", "wyszła w godzinę?"],

  modules: [
    {
      number: "01",
      title: "SZYBKA PREZENTACJA Z ROZMOWY",
      lessons: [
        {
          title: "Wejściem nie musi być porządny dokument",
          bullets: [
            "Rozmowa z klientem na Messengerze lub WhatsAppie jako źródło oferty",
            "Transkrypt ze spotkania (Fireflies) i notatka głosowa jako wejście",
            "Referencja stylu: PDF, który Ci się podoba, albo strona Twojej firmy",
            "Krótka instrukcja: co ma być w środku, cena, termin, następny krok",
          ],
        },
        {
          title: "Od rozmowy do PDF w 15 minut",
          bullets: [
            "Agent wyciąga z rozmowy ustalenia, potrzeby i obiekcje klienta",
            "Prezentacja 2–4 strony gotowa do odesłania w tej samej rozmowie",
            "Co model źle zrozumiał: nazwiska, kwoty, terminy do sprawdzenia",
            "Co jest ustaleniem, a co luźną gadką – jak to ograniczyć w instrukcji",
          ],
        },
        {
          title: "Iteracja i wysyłka",
          bullets: [
            "Druga wersja po uwagach klienta bez zaczynania od zera",
            "Ta sama treść jako PDF na telefon i PPTX na spotkanie",
            "Follow-up: mail podsumowujący i przypomnienie po tygodniu",
            "Zgoda na nagrywanie i dane klienta – jedno zdanie, które załatwia sprawę",
          ],
        },
      ],
      summary:
        "Na tym etapie potrafisz odpowiedzieć klientowi gotową prezentacją w ciągu jednej rozmowy, zamiast obiecywać „wyślę w przyszłym tygodniu”.",
    },
    {
      number: "02",
      title: "OFERTA Z GRAFIKAMI: CLAUDE CODE + HIGGSFIELD",
      lessons: [
        {
          title: "Brief, który robi 80% roboty",
          bullets: [
            "Oferta wygenerowana vs oferta dobra – dwa briefy, dwa wyniki obok siebie",
            "Pięć pytań briefu: kto, jaki problem, co sprzedajesz, za ile, co dalej",
            "Twoje dane wchodzą do promptu: cennik, referencje, zdjęcia realizacji",
            "Plik CLAUDE.md – marka, styl i zasady zapisane raz, użyte w każdej kolejnej ofercie",
          ],
        },
        {
          title: "Od notatki do PPTX",
          bullets: [
            "Trzy pliki w folderze: notatka o firmie, cennik, opis klienta",
            "Jeden prompt – struktura oferty i teksty slajdów",
            "Grafiki przez MCP Higgsfield: hero, ilustracje usług, tła sekcji",
            "Otwierasz w PowerPoint i poprawiasz ręcznie to, co chcesz",
          ],
        },
        {
          title: "Higgsfield – kiedy tak, kiedy nie",
          bullets: [
            "Ta sama oferta z grafikami i bez – porównanie na żywo",
            "Spójność wizualna: jeden styl obrazów, kolory firmy, logo",
            "Czego nie generować: zdjęcia realnych realizacji, oznaczanie obrazów AI",
            "Ile to kosztuje: realne kredyty i czas na jedną ofertę",
          ],
        },
        {
          title: "Checklista przed wysłaniem",
          bullets: [
            "Halucynacje w ofertach kosztują: wymyślone certyfikaty, terminy, gwarancje",
            "Każda liczba i obietnica sprawdzona ręcznie",
            "Iteracja zamiast jednego strzału: dwie rundy poprawek w tym samym oknie",
            "Prawo i dane: anonimizacja rozmów, bez NDA i danych osobowych w promptach",
          ],
        },
      ],
      summary:
        "Po tym module masz własny zestaw startowy: CLAUDE.md, szablon briefu, checklistę i pierwszą ofertę dla swojej firmy.",
    },
    {
      number: "03",
      title: "SZYBKI RESEARCH I WYCENA",
      lessons: [
        {
          title: "Stawki rynkowe w 10 minut",
          bullets: [
            "Agent przeszukuje sieć: ile kosztuje Twoja usługa u innych, w Twoim mieście i branży",
            "Tabela porównawcza: widełki, co wchodzi w cenę, co jest dopłatą",
            "Skąd wziął liczbę: weryfikacja źródeł, bo model potrafi zmyślić stawkę",
            "Argumenty do ceny wpisane prosto do oferty",
          ],
        },
        {
          title: "Klient, konkurencja, obiekcje",
          bullets: [
            "Szybki profil klienta przed spotkaniem: strona, opinie, czym się chwali",
            "Trzy oferty konkurencji w jednej tabeli: co mają, czego nie mają",
            "Lista prawdopodobnych obiekcji i gotowe odpowiedzi w prezentacji",
            "Wynik researchu jako plik wejściowy do briefu z modułu 02",
          ],
        },
      ],
      summary:
        "Po tym module cena w Twojej ofercie ma uzasadnienie, a Ty wiesz o kliencie więcej niż on o Tobie.",
    },
  ],

  closingLine: "Nie czekaj, aż inni Cię wyprzedzą!",
  cta: { label: "ZAPISZ SIĘ", href: "#kontakt" },
};
