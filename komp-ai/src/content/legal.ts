// Mock content stron prawnych — docelowo dokumenty Sanity.
// UWAGA (FLAG dla Patryka): dane administratora ([NAZWA FIRMY], adres, NIP)
// oraz e-mail kontaktowy to PLACEHOLDERY do uzupełnienia prawdziwymi danymi;
// całość treści do weryfikacji prawnej przed publikacją.
import type { LegalPage } from "./types";

export const politykaPrywatnosci: LegalPage = {
  _type: "legalPage",
  slug: "polityka-prywatnosci",
  kickerLines: ["zanim nam zaufasz —", "sprawdź, jak dbamy o twoje dane"],
  pageTitle: "Polityka prywatności",
  heading: "PRYWATNOŚĆ",
  updated: "Ostatnia aktualizacja: 22 lipca 2026",
  sections: [
    {
      _type: "legalSection",
      num: "01",
      title: "ADMINISTRATOR DANYCH",
      blocks: [
        {
          text: "Administratorem danych osobowych zbieranych za pośrednictwem serwisu kompetencje.ai jest [NAZWA FIRMY] z siedzibą w [ADRES], NIP [NIP], zwana dalej „Administratorem”.",
        },
        {
          text: "W sprawach związanych z ochroną danych osobowych możesz skontaktować się z nami pod adresem e-mail: kontakt@kompetencje.ai.",
        },
      ],
    },
    {
      _type: "legalSection",
      num: "02",
      title: "JAKIE DANE PRZETWARZAMY",
      blocks: [
        { text: "W zależności od tego, jak korzystasz z serwisu, przetwarzamy następujące dane:" },
        {
          items: [
            "dane podane w formularzu kontaktowym: imię, adres e-mail, numer telefonu, treść wiadomości,",
            "dane podane przy zakupie kursu: dane rozliczeniowe niezbędne do wystawienia dokumentu sprzedaży,",
            "dane techniczne zbierane automatycznie: adres IP, typ przeglądarki, dane o aktywności w serwisie (pliki cookies).",
          ],
        },
      ],
    },
    {
      _type: "legalSection",
      num: "03",
      title: "CELE I PODSTAWY PRAWNE",
      blocks: [
        { text: "Twoje dane przetwarzamy wyłącznie w konkretnych celach:" },
        {
          items: [
            "odpowiedź na wiadomość z formularza kontaktowego — art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes),",
            "zawarcie i realizacja umowy o dostęp do kursu — art. 6 ust. 1 lit. b RODO,",
            "wypełnienie obowiązków księgowych i podatkowych — art. 6 ust. 1 lit. c RODO,",
            "marketing własnych usług, w tym newsletter — art. 6 ust. 1 lit. a RODO (zgoda, którą możesz cofnąć w każdej chwili).",
          ],
        },
      ],
    },
    {
      _type: "legalSection",
      num: "04",
      title: "ODBIORCY DANYCH",
      blocks: [
        {
          text: "Dane możemy powierzać podmiotom, które wspierają nas w prowadzeniu serwisu: dostawcy hostingu, operatorowi płatności, biuru księgowemu oraz dostawcom narzędzi analitycznych i mailingowych. Wszystkie te podmioty przetwarzają dane na podstawie umów powierzenia i wyłącznie w zakresie niezbędnym do świadczenia usług.",
        },
        {
          text: "Nie sprzedajemy Twoich danych i nie przekazujemy ich podmiotom trzecim do ich własnych celów marketingowych.",
        },
      ],
    },
    {
      _type: "legalSection",
      num: "05",
      title: "OKRES PRZECHOWYWANIA",
      blocks: [
        {
          items: [
            "korespondencja z formularza — do zakończenia sprawy, maksymalnie 12 miesięcy od ostatniego kontaktu,",
            "dane związane z zakupem kursu — przez okres wymagany przepisami podatkowymi (5 lat od końca roku podatkowego),",
            "dane przetwarzane na podstawie zgody — do momentu jej cofnięcia.",
          ],
        },
      ],
    },
    {
      _type: "legalSection",
      num: "06",
      title: "TWOJE PRAWA",
      blocks: [
        { text: "W związku z przetwarzaniem danych przysługują Ci prawa:" },
        {
          items: [
            "dostępu do danych i otrzymania ich kopii,",
            "sprostowania, usunięcia lub ograniczenia przetwarzania,",
            "przenoszenia danych,",
            "sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie,",
            "cofnięcia zgody w dowolnym momencie (bez wpływu na zgodność z prawem wcześniejszego przetwarzania),",
            "skargi do Prezesa Urzędu Ochrony Danych Osobowych.",
          ],
        },
        { text: "Aby skorzystać z któregokolwiek z praw, napisz do nas na adres kontakt@kompetencje.ai." },
      ],
    },
    {
      _type: "legalSection",
      num: "07",
      title: "PLIKI COOKIES",
      blocks: [
        {
          text: "Serwis korzysta z plików cookies — niezbędnych do jego prawidłowego działania oraz, za Twoją zgodą, analitycznych i marketingowych. Możesz zarządzać cookies w ustawieniach przeglądarki; ograniczenie cookies niezbędnych może wpłynąć na działanie serwisu.",
        },
      ],
    },
    {
      _type: "legalSection",
      num: "08",
      title: "ZMIANY POLITYKI",
      blocks: [
        {
          text: "Polityka może być aktualizowana, np. przy zmianie przepisów lub funkcji serwisu. Aktualna wersja jest zawsze dostępna pod adresem kompetencje.ai/polityka-prywatnosci wraz z datą ostatniej aktualizacji.",
        },
      ],
    },
  ],
  outro: "masz pytania o swoje dane ?",
  ctaLabel: "NAPISZ DO NAS",
  ctaHref: "/#kontakt",
  metaTitle: "Polityka prywatności — kompetencje.ai",
  metaDescription:
    "Dowiedz się, jak kompetencje.ai chroni Twoje dane osobowe: jakie dane zbieramy, w jakich celach, jak długo je przechowujemy i jakie prawa Ci przysługują.",
};

export const regulamin: LegalPage = {
  _type: "legalPage",
  slug: "regulamin",
  kickerLines: ["jasne zasady gry —", "wszystko czarno na białym"],
  pageTitle: "Regulamin",
  heading: "REGULAMIN",
  updated: "Ostatnia aktualizacja: 22 lipca 2026",
  sections: [
    {
      _type: "legalSection",
      num: "01",
      title: "POSTANOWIENIA OGÓLNE",
      blocks: [
        {
          text: "Regulamin określa zasady korzystania z serwisu kompetencje.ai oraz zakupu i realizacji kursów online oferowanych w serwisie. Właścicielem serwisu i sprzedawcą jest [NAZWA FIRMY] z siedzibą w [ADRES], NIP [NIP], zwana dalej „Sprzedawcą”.",
        },
        {
          text: "Korzystanie z serwisu oznacza akceptację niniejszego regulaminu. Kontakt ze Sprzedawcą: kontakt@kompetencje.ai.",
        },
      ],
    },
    {
      _type: "legalSection",
      num: "02",
      title: "DEFINICJE",
      blocks: [
        {
          items: [
            "Serwis — strona internetowa dostępna pod adresem kompetencje.ai,",
            "Kurs — szkolenie online udostępniane w formie cyfrowej (nagrania, materiały, zadania),",
            "Klient — osoba fizyczna, prawna lub jednostka organizacyjna dokonująca zakupu w serwisie,",
            "Konsument — Klient będący osobą fizyczną, dokonujący zakupu niezwiązanego bezpośrednio z działalnością gospodarczą lub zawodową.",
          ],
        },
      ],
    },
    {
      _type: "legalSection",
      num: "03",
      title: "ZAKRES USŁUG",
      blocks: [
        {
          text: "Sprzedawca oferuje kursy online z zakresu kompetencji AI. Szczegółowy opis każdego kursu — program, liczba modułów i lekcji, format — znajduje się na stronie danego kursu.",
        },
        {
          text: "Do korzystania z kursów niezbędne jest urządzenie z dostępem do internetu, aktualna przeglądarka internetowa oraz aktywny adres e-mail.",
        },
      ],
    },
    {
      _type: "legalSection",
      num: "04",
      title: "ZAMÓWIENIA I PŁATNOŚCI",
      blocks: [
        {
          text: "Zamówienia składane są przez formularz zakupu w serwisie. Ceny podane przy kursach są cenami brutto. Płatność realizowana jest za pośrednictwem operatora płatności wskazanego w procesie zakupu.",
        },
        {
          text: "Umowa zostaje zawarta z chwilą potwierdzenia zamówienia przez Sprzedawcę, a dokument sprzedaży wystawiany jest zgodnie z obowiązującymi przepisami.",
        },
      ],
    },
    {
      _type: "legalSection",
      num: "05",
      title: "DOSTĘP DO KURSU",
      blocks: [
        {
          text: "Dostęp do kursu przyznawany jest po zaksięgowaniu płatności, na adres e-mail podany w zamówieniu, w terminie wskazanym na stronie kursu. Jeżeli kurs ma określoną datę startu, dostęp uruchamiany jest w tej dacie.",
        },
        {
          text: "Materiały kursowe objęte są prawami autorskimi. Dostęp jest imienny — udostępnianie materiałów osobom trzecim, ich kopiowanie i rozpowszechnianie jest zabronione.",
        },
      ],
    },
    {
      _type: "legalSection",
      num: "06",
      title: "ODSTĄPIENIE OD UMOWY",
      blocks: [
        {
          text: "Konsument ma prawo odstąpić od umowy w terminie 14 dni od jej zawarcia bez podania przyczyny, składając oświadczenie na adres kontakt@kompetencje.ai.",
        },
        {
          text: "Prawo odstąpienia nie przysługuje w odniesieniu do treści cyfrowych, jeżeli spełnianie świadczenia rozpoczęło się za wyraźną zgodą Konsumenta przed upływem terminu odstąpienia i po poinformowaniu go o utracie tego prawa (art. 38 pkt 13 ustawy o prawach konsumenta).",
        },
      ],
    },
    {
      _type: "legalSection",
      num: "07",
      title: "REKLAMACJE",
      blocks: [
        {
          text: "Reklamacje dotyczące działania serwisu lub kursów można składać na adres kontakt@kompetencje.ai. Reklamacja powinna zawierać opis problemu oraz dane umożliwiające kontakt.",
        },
        {
          text: "Sprzedawca rozpatruje reklamacje w terminie 14 dni od ich otrzymania i informuje o wyniku na podany adres e-mail.",
        },
      ],
    },
    {
      _type: "legalSection",
      num: "08",
      title: "DANE OSOBOWE",
      blocks: [
        {
          text: "Zasady przetwarzania danych osobowych w serwisie opisuje Polityka prywatności dostępna pod adresem kompetencje.ai/polityka-prywatnosci.",
        },
      ],
    },
    {
      _type: "legalSection",
      num: "09",
      title: "POSTANOWIENIA KOŃCOWE",
      blocks: [
        {
          text: "W sprawach nieuregulowanych regulaminem zastosowanie mają przepisy prawa polskiego, w szczególności Kodeksu cywilnego i ustawy o prawach konsumenta. Sprzedawca może zmienić regulamin z ważnych przyczyn; do umów zawartych przed zmianą stosuje się wersję obowiązującą w dniu zawarcia umowy.",
        },
      ],
    },
  ],
  outro: "wolisz zapytać wprost ?",
  ctaLabel: "NAPISZ DO NAS",
  ctaHref: "/#kontakt",
  metaTitle: "Regulamin — kompetencje.ai",
  metaDescription:
    "Regulamin serwisu kompetencje.ai: zasady zakupu kursów AI online, płatności, dostęp do materiałów, odstąpienie od umowy i reklamacje.",
};

export const legalPages: Record<string, LegalPage> = {
  "polityka-prywatnosci": politykaPrywatnosci,
  regulamin,
};
