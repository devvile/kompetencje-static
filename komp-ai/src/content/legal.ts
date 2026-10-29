// Mock content stron prawnych — docelowo dokumenty Sanity.
// UWAGA (FLAG dla Patryka): PROJEKT TREŚCI do weryfikacji przez prawnika przed publikacją.
// Wszystkie [PLACEHOLDERY W NAWIASACH] trzeba uzupełnić prawdziwymi danymi
// (dane firmy, e-mail, system do faktur, czas dostępu do nagrań itd.).
import type { LegalPage } from "./types";

export const politykaPrywatnosci: LegalPage = {
  _type: "legalPage",
  slug: "polityka-prywatnosci",
  kickerLines: ["zanim nam zaufasz —", "sprawdź, jak dbamy o twoje dane"],
  pageTitle: "Polityka prywatności",
  heading: "PRYWATNOŚĆ",
  updated: "Ostatnia aktualizacja: 29 października 2026",
  sections: [
    {
      _type: "legalSection",
      num: "01",
      title: "ADMINISTRATOR DANYCH",
      blocks: [
        {
          text: "Administratorem Twoich danych osobowych jest Patryk Czemierowski prowadzący jednoosobową działalność gospodarczą pod firmą „Futurista Patryk Czemierowski”, adres: ul. Pory 78, 02-757 Warszawa, NIP 7123092049, REGON 529334846, wpisany do Centralnej Ewidencji i Informacji o Działalności Gospodarczej (CEIDG), dalej „Administrator” lub „my”.",
        },
        {
          text: "W każdej sprawie dotyczącej Twoich danych możesz napisać do nas na adres patryk@kompetencje.ai. Nie wyznaczyliśmy inspektora ochrony danych, bo nie mamy takiego obowiązku.",
        },
        {
          text: "Polityka opisuje, jak przetwarzamy dane osób, które korzystają z serwisu kompetencje.ai, zapisują się na kursy i webinary, piszą do nas przez formularz kontaktowy lub zapisują się na newsletter.",
        },
      ],
    },
    {
      _type: "legalSection",
      num: "02",
      title: "JAKIE DANE PRZETWARZAMY",
      blocks: [
        { text: "Przetwarzamy tylko te dane, które sam nam podajesz, oraz podstawowe dane techniczne:" },
        {
          items: [
            "przy zapisie na kurs: imię, nazwisko, adres e-mail, numer telefonu, a jeśli chcesz fakturę – nazwę firmy, adres i NIP,",
            "przy płatności: informacje o transakcji (kwota, data, status płatności); pełne dane karty widzi tylko operator płatności Stripe, my ich nie otrzymujemy,",
            "przy zapisie na bezpłatny webinar: dane podane w formularzu zapisu, w szczególności imię, nazwisko i adres e-mail,",
            "w formularzu kontaktowym: imię, adres e-mail, numer telefonu (jeśli go podasz) i treść wiadomości,",
            "przy zapisie na newsletter: adres e-mail i informację o udzielonej zgodzie,",
            "dane techniczne: adres IP i podstawowe informacje o urządzeniu i przeglądarce, zapisywane w logach serwera przez dostawcę hostingu.",
          ],
        },
      ],
    },
    {
      _type: "legalSection",
      num: "03",
      title: "CELE I PODSTAWY PRAWNE",
      blocks: [
        { text: "Każdy cel przetwarzania ma swoją podstawę prawną z art. 6 ust. 1 RODO:" },
        {
          items: [
            "zawarcie i wykonanie umowy o udział w kursie, w tym kontakt w sprawie terminu, dostępu i nagrań – art. 6 ust. 1 lit. b RODO,",
            "obsługa zapisu na bezpłatny webinar i wysyłka informacji o nim – art. 6 ust. 1 lit. b RODO,",
            "przyjęcie płatności oraz wystawienie i przechowywanie faktur i dokumentacji księgowej – art. 6 ust. 1 lit. c RODO (obowiązek prawny),",
            "rozpatrzenie reklamacji i obsługa odstąpienia od umowy – art. 6 ust. 1 lit. c RODO,",
            "odpowiedź na wiadomość z formularza kontaktowego – art. 6 ust. 1 lit. f RODO (nasz prawnie uzasadniony interes, czyli komunikacja z Tobą),",
            "ustalenie, dochodzenie lub obrona roszczeń – art. 6 ust. 1 lit. f RODO,",
            "zapewnienie bezpieczeństwa i prawidłowego działania serwisu – art. 6 ust. 1 lit. f RODO,",
            "wysyłka newslettera – art. 6 ust. 1 lit. a RODO (Twoja zgoda).",
          ],
        },
        {
          text: "Nie podejmujemy wobec Ciebie decyzji opartych wyłącznie na zautomatyzowanym przetwarzaniu, w tym profilowaniu, które wywoływałyby skutki prawne lub w podobny sposób istotnie na Ciebie wpływały.",
        },
      ],
    },
    {
      _type: "legalSection",
      num: "04",
      title: "CZY MUSISZ PODAĆ DANE",
      blocks: [
        {
          text: "Podanie danych jest dobrowolne. Bez danych oznaczonych w formularzu jako wymagane nie zapiszemy Cię jednak na kurs lub webinar ani nie odpowiemy na wiadomość.",
        },
        {
          text: "Dane do faktury podajesz tylko wtedy, gdy chcesz ją otrzymać. Jeśli o nią poprosisz, podanie tych danych wynika z przepisów podatkowych.",
        },
        {
          text: "Zgoda na newsletter jest całkowicie dobrowolna. Jej brak nie ma wpływu na zapis na kurs ani na webinar.",
        },
      ],
    },
    {
      _type: "legalSection",
      num: "05",
      title: "NEWSLETTER",
      blocks: [
        {
          text: "Newsletter wysyłamy wyłącznie osobom, które wyraziły na to zgodę, na przykład zaznaczając odpowiednie pole w formularzu zapisu. Piszemy w nim o naszych kursach, webinarach i materiałach o AI.",
        },
        {
          text: "Z newslettera możesz się wypisać w każdej chwili – klikając link w wiadomości albo pisząc na adres patryk@kompetencje.ai. Cofnięcie zgody nie wpływa na zgodność z prawem wysyłek sprzed jej cofnięcia.",
        },
      ],
    },
    {
      _type: "legalSection",
      num: "06",
      title: "ODBIORCY DANYCH",
      blocks: [
        {
          text: "Twoje dane powierzamy tylko firmom, które pomagają nam prowadzić serwis. Przetwarzają je na nasze polecenie, na podstawie umów powierzenia i tylko w niezbędnym zakresie:",
        },
        {
          items: [
            "Vercel – hosting serwisu,",
            "LiveWebinar – platforma, na której prowadzimy kursy i webinary online (imię, nazwisko lub nick i adres e-mail uczestnika),",
            "Supabase – baza danych, w której zapisujemy zgłoszenia na kursy,",
            "Stripe – obsługa płatności online,",
            "Resend – wysyłka wiadomości e-mail (po uruchomieniu tej usługi),",
            "[SYSTEM DO FAKTUR] – wystawianie faktur,",
            "[BIURO RACHUNKOWE] – prowadzenie księgowości.",
          ],
        },
        {
          text: "Dane mogą też otrzymać organy publiczne, jeśli wymagają tego przepisy. Nie sprzedajemy Twoich danych i nie udostępniamy ich innym firmom do ich własnego marketingu.",
        },
      ],
    },
    {
      _type: "legalSection",
      num: "07",
      title: "PRZEKAZYWANIE DANYCH POZA EOG",
      blocks: [
        {
          text: "Część naszych dostawców, w szczególności Vercel, Stripe, Supabase i Resend, może przetwarzać dane poza Europejskim Obszarem Gospodarczym (EOG). W takim przypadku przekazanie odbywa się tylko na podstawie mechanizmów przewidzianych w RODO.",
        },
        { text: "Podstawą przekazania jest, w zależności od dostawcy:" },
        {
          items: [
            "decyzja Komisji Europejskiej stwierdzająca odpowiedni stopień ochrony danych, w tym dla firm certyfikowanych w ramach EU–US Data Privacy Framework,",
            "standardowe klauzule umowne zatwierdzone przez Komisję Europejską.",
          ],
        },
        {
          text: "Podstawa przekazania dla poszczególnych dostawców: [PODSTAWA PRZEKAZANIA – DO WERYFIKACJI]. Na Twoją prośbę przekażemy informację o zastosowanych zabezpieczeniach i sposobie uzyskania ich kopii.",
        },
      ],
    },
    {
      _type: "legalSection",
      num: "08",
      title: "JAK DŁUGO PRZECHOWUJEMY DANE",
      blocks: [
        { text: "Dane przechowujemy tylko tak długo, jak to potrzebne do danego celu:" },
        {
          items: [
            "dane z zapisu na kurs – przez czas realizacji umowy, a potem do upływu terminu przedawnienia roszczeń z umowy,",
            "faktury i dokumenty księgowe – przez 5 lat, licząc od końca roku kalendarzowego, w którym upłynął termin płatności podatku,",
            "dane związane z reklamacją lub odstąpieniem od umowy – do zakończenia sprawy, a potem do upływu terminu przedawnienia roszczeń,",
            "dane z zapisu na bezpłatny webinar – do zakończenia webinaru i przez 2 lata po nim,",
            "wiadomości z formularza kontaktowego – do zakończenia sprawy, nie dłużej niż 12 miesięcy od ostatniego kontaktu,",
            "dane do newslettera – do cofnięcia zgody, a informację o udzieleniu i cofnięciu zgody – do upływu terminu przedawnienia roszczeń,",
            "logi serwera – przez okres wynikający z ustawień dostawcy hostingu, nie dłużej niż 30 dni.",
          ],
        },
        {
          text: "Jeśli wniesiesz skuteczny sprzeciw wobec przetwarzania opartego na naszym prawnie uzasadnionym interesie, przestaniemy przetwarzać dane w tym celu wcześniej.",
        },
      ],
    },
    {
      _type: "legalSection",
      num: "09",
      title: "TWOJE PRAWA",
      blocks: [
        { text: "W związku z przetwarzaniem danych masz prawo do:" },
        {
          items: [
            "dostępu do swoich danych i otrzymania ich kopii,",
            "sprostowania danych, które są nieprawidłowe lub niepełne,",
            "usunięcia danych, jeśli nie ma już podstawy do ich przetwarzania,",
            "ograniczenia przetwarzania,",
            "przenoszenia danych, które przetwarzamy na podstawie umowy lub zgody,",
            "sprzeciwu wobec przetwarzania opartego na naszym prawnie uzasadnionym interesie,",
            "cofnięcia zgody w dowolnym momencie, bez wpływu na zgodność z prawem przetwarzania sprzed jej cofnięcia.",
          ],
        },
        {
          text: "Aby skorzystać z tych praw, napisz na adres patryk@kompetencje.ai. Odpowiemy bez zbędnej zwłoki, nie później niż w ciągu miesiąca.",
        },
        {
          text: "Jeśli uważasz, że przetwarzamy Twoje dane niezgodnie z prawem, możesz złożyć skargę do Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa).",
        },
      ],
    },
    {
      _type: "legalSection",
      num: "10",
      title: "PLIKI COOKIES",
      blocks: [
        {
          text: "Serwis kompetencje.ai nie korzysta dziś z narzędzi analitycznych ani reklamowych i nie zapisuje na Twoim urządzeniu plików cookies w celach statystycznych lub marketingowych. Czcionki ładujemy z naszego własnego serwera, a nie z zewnętrznych usług.",
        },
        {
          text: "Pliki cookies pojawiają się na stronie płatności prowadzonej przez Stripe. Stripe używa ich, aby bezpiecznie przeprowadzić płatność i zapobiegać oszustwom. Zasady opisuje polityka prywatności Stripe.",
        },
        {
          text: "Jeśli w przyszłości wprowadzimy narzędzia analityczne lub reklamowe, uruchomimy je dopiero po uzyskaniu Twojej zgody i wcześniej zaktualizujemy tę politykę. Pliki cookies możesz w każdej chwili usunąć lub zablokować w ustawieniach przeglądarki.",
        },
      ],
    },
    {
      _type: "legalSection",
      num: "11",
      title: "BEZPIECZEŃSTWO",
      blocks: [
        {
          text: "Stosujemy środki techniczne i organizacyjne odpowiednie do ryzyka, w szczególności szyfrowane połączenie (HTTPS) i ograniczony dostęp do bazy zgłoszeń. Dostęp do danych mają tylko osoby, które potrzebują ich do obsługi kursów i webinarów.",
        },
      ],
    },
    {
      _type: "legalSection",
      num: "12",
      title: "ZMIANY POLITYKI",
      blocks: [
        {
          text: "Możemy zmieniać tę politykę, na przykład gdy zmienią się przepisy, nasi dostawcy lub funkcje serwisu. Aktualna wersja jest zawsze dostępna pod adresem kompetencje.ai/polityka-prywatnosci, z datą ostatniej aktualizacji na górze strony.",
        },
        {
          text: "O istotnych zmianach poinformujemy osoby zapisane na kursy lub newsletter wiadomością e-mail.",
        },
      ],
    },
  ],
  outro: "masz pytania o swoje dane ?",
  ctaLabel: "NAPISZ DO NAS",
  ctaHref: "/#kontakt",
  metaTitle: "Polityka prywatności",
  metaDescription:
    "Polityka prywatności kompetencje.ai: kto przetwarza Twoje dane, w jakim celu i jak długo oraz jakie prawa Ci przysługują.",
};

export const regulamin: LegalPage = {
  _type: "legalPage",
  slug: "regulamin",
  kickerLines: ["jasne zasady gry —", "wszystko czarno na białym"],
  pageTitle: "Regulamin",
  heading: "REGULAMIN",
  updated: "Ostatnia aktualizacja: 29 października 2026",
  sections: [
    {
      _type: "legalSection",
      num: "01",
      title: "SPRZEDAWCA I POSTANOWIENIA OGÓLNE",
      blocks: [
        {
          text: "Regulamin określa zasady korzystania z serwisu kompetencje.ai, zapisu na płatne kursy online i bezpłatne webinary oraz korzystania z formularza kontaktowego. Jest to regulamin, o którym mowa w art. 8 ustawy o świadczeniu usług drogą elektroniczną.",
        },
        {
          text: "Serwis prowadzi i sprzedaje kursy Patryk Czemierowski prowadzący jednoosobową działalność gospodarczą pod firmą „Futurista Patryk Czemierowski”, adres: ul. Pory 78, 02-757 Warszawa, NIP 7123092049, REGON 529334846, wpisany do Centralnej Ewidencji i Informacji o Działalności Gospodarczej (CEIDG), dalej „Sprzedawca” lub „my”.",
        },
        {
          text: "Kontaktować się z nami możesz pod adresem e-mail patryk@kompetencje.ai lub przez formularz kontaktowy w serwisie. Regulamin jest dostępny bezpłatnie pod adresem kompetencje.ai/regulamin – możesz go w każdej chwili pobrać, zapisać i wydrukować.",
        },
      ],
    },
    {
      _type: "legalSection",
      num: "02",
      title: "DEFINICJE",
      blocks: [
        { text: "Pojęcia użyte w regulaminie oznaczają:" },
        {
          items: [
            "Serwis – strona internetowa dostępna pod adresem kompetencje.ai,",
            "Ty lub Klient – osoba fizyczna, osoba prawna albo jednostka organizacyjna, która korzysta z Serwisu lub zapisuje się na Kurs albo Webinar,",
            "Konsument – osoba fizyczna, która zawiera z nami umowę niezwiązaną bezpośrednio z jej działalnością gospodarczą lub zawodową,",
            "Przedsiębiorca na prawach konsumenta – osoba fizyczna, która zawiera umowę bezpośrednio związaną z jej działalnością gospodarczą, gdy z treści umowy wynika, że nie ma ona dla niej charakteru zawodowego, w szczególności w świetle przedmiotu działalności ujawnionego w CEIDG,",
            "Kurs – płatne szkolenie online prowadzone na żywo w ustalonym terminie, w przypadku części kursów udostępniane także w formie Nagrania,",
            "Nagranie – zapis Kursu udostępniany Klientowi jako treść cyfrowa, jeśli strona Kursu przewiduje taki dostęp,",
            "Webinar – bezpłatne spotkanie online prowadzone na żywo,",
            "Materiały – treści udostępniane w ramach Kursu lub Webinaru, w szczególności prezentacje, nagrania, ćwiczenia i szablony,",
            "Umowa – umowa o udział w Kursie albo Webinarze zawierana na odległość przez Serwis.",
          ],
        },
      ],
    },
    {
      _type: "legalSection",
      num: "03",
      title: "WYMAGANIA TECHNICZNE",
      blocks: [
        { text: "Aby korzystać z Serwisu, Kursów i Webinarów, potrzebujesz:" },
        {
          items: [
            "urządzenia z dostępem do internetu (komputera, tabletu lub telefonu),",
            "aktualnej wersji przeglądarki, na przykład Chrome, Firefox, Safari lub Edge, z włączoną obsługą JavaScript,",
            "aktywnego adresu e-mail,",
            "na zajęciach na żywo – głośników lub słuchawek, a jeśli chcesz zabierać głos – mikrofonu i kamery,",
            "stabilnego łącza internetowego, które pozwala na odtwarzanie wideo.",
          ],
        },
        {
          text: "Kursy i Webinary odbywają się na platformie LiveWebinar. Link do zajęć wyślemy Ci e-mailem przed ich rozpoczęciem.",
        },
        {
          text: "Korzystanie z internetu wiąże się z typowymi zagrożeniami, takimi jak złośliwe oprogramowanie czy próby wyłudzenia danych. Dbaj o aktualne oprogramowanie i nie otwieraj podejrzanych linków – nigdy nie poprosimy Cię e-mailem o hasło ani dane karty.",
        },
      ],
    },
    {
      _type: "legalSection",
      num: "04",
      title: "USŁUGI W SERWISIE",
      blocks: [
        { text: "W Serwisie świadczymy następujące usługi:" },
        {
          items: [
            "płatne Kursy online na żywo, na przykład „Z rozmowy do oferty w 60 minut” i „AI pod kontrolą od podstaw”, w części z dostępem do Nagrania,",
            "bezpłatne Webinary online na żywo,",
            "formularz kontaktowy, przez który możesz zadać nam pytanie,",
            "newsletter, który wysyłamy wyłącznie za Twoją zgodą.",
          ],
        },
        {
          text: "Szczegóły każdego Kursu – program, termin, czas trwania, cenę i informację o Nagraniu – podajemy na jego stronie w Serwisie. Opis na stronie Kursu jest częścią Umowy.",
        },
        {
          text: "Nie wolno przesyłać przez Serwis treści bezprawnych, obraźliwych ani naruszających prawa innych osób. Usługi formularza kontaktowego i newslettera są bezpłatne i możesz z nich zrezygnować w każdej chwili.",
        },
      ],
    },
    {
      _type: "legalSection",
      num: "05",
      title: "ZAPIS NA KURS I ZAWARCIE UMOWY",
      blocks: [
        { text: "Zapis na Kurs przebiega w następujących krokach:" },
        {
          items: [
            "wypełniasz formularz zapisu: imię, nazwisko, adres e-mail i numer telefonu, a jeśli chcesz fakturę – dane firmy i NIP,",
            "akceptujesz regulamin i politykę prywatności (to warunek zapisu), a zgodę na newsletter możesz zaznaczyć dobrowolnie,",
            "przechodzisz do płatności przez Stripe i opłacasz Kurs,",
            "otrzymujesz od nas e-mail z potwierdzeniem zapisu i zawarcia Umowy.",
          ],
        },
        {
          text: "Umowa zostaje zawarta w chwili, gdy płatność zostanie zaakceptowana przez operatora płatności. Potwierdzenie zawarcia Umowy, wraz z treścią regulaminu, wyślemy na podany adres e-mail.",
        },
        {
          text: "Jeśli płatność się nie powiedzie lub ją przerwiesz, zapis nie jest skuteczny i Umowa nie zostaje zawarta. Możesz wtedy zapisać się ponownie, o ile są jeszcze wolne miejsca.",
        },
        {
          text: "Liczba miejsc na Kurs może być ograniczona. Jeśli miejsca skończą się w trakcie Twojej płatności, zwrócimy całą wpłatę w ciągu 14 dni.",
        },
      ],
    },
    {
      _type: "legalSection",
      num: "06",
      title: "CENY I PŁATNOŚCI",
      blocks: [
        {
          text: "Ceny Kursów podajemy w złotych polskich (PLN) jako ceny brutto, czyli kwoty, które faktycznie płacisz. Cena obejmuje wszystkie podatki, jeśli mają zastosowanie, i nie doliczamy do niej żadnych dodatkowych opłat.",
        },
        {
          text: "Za Kurs płacisz jednorazowo, z góry, przez operatora płatności Stripe. Dostępne metody płatności – karta płatnicza, a gdy zostaną uruchomione także BLIK lub Przelewy24 – widzisz na stronie płatności.",
        },
        {
          text: "Gdy obniżamy cenę Kursu, obok ceny po obniżce podajemy także najniższą cenę z 30 dni przed wprowadzeniem obniżki.",
        },
        {
          text: "Fakturę wystawiamy na Twoje żądanie, na podstawie danych podanych w formularzu zapisu. Faktury wystawiamy w systemie [SYSTEM DO FAKTUR], zgodnie z przepisami o Krajowym Systemie e-Faktur (KSeF).",
        },
      ],
    },
    {
      _type: "legalSection",
      num: "07",
      title: "KURSY NA ŻYWO I NAGRANIA",
      blocks: [
        {
          text: "Kurs odbywa się online, w terminie podanym na stronie Kursu. Link do zajęć wyślemy na Twój adres e-mail przed ich rozpoczęciem.",
        },
        {
          text: "Jeśli nie weźmiesz udziału w zajęciach w ustalonym terminie, nie oznacza to, że nie wykonaliśmy Umowy. Jeśli Kurs przewiduje Nagranie, możesz z niego skorzystać na zasadach poniżej.",
        },
        {
          text: "Jeśli strona Kursu przewiduje Nagranie, udostępnimy je przez 360 dni od dnia jego udostępnienia. Po tym czasie dostęp wygasa.",
        },
        {
          text: "Z ważnych przyczyn, takich jak choroba prowadzącego albo awaria platformy, możemy przenieść Kurs na inny termin. Poinformujemy Cię o tym e-mailem. Jeśli nowy termin Ci nie odpowiada, możesz odstąpić od Umowy, a my zwrócimy całą wpłatę w ciągu 14 dni.",
        },
        {
          text: "Dostęp do Kursu i Nagrania jest imienny. Nie wolno przekazywać linku ani danych dostępowych innym osobom.",
        },
      ],
    },
    {
      _type: "legalSection",
      num: "08",
      title: "BEZPŁATNE WEBINARY",
      blocks: [
        {
          text: "Na Webinar zapisujesz się przez formularz zapisu, bez żadnych opłat. Umowa o udział w Webinarze zostaje zawarta z chwilą wysłania formularza i obejmuje udział w Webinarze w podanym terminie.",
        },
        {
          text: "Z udziału w Webinarze możesz zrezygnować w każdej chwili, bez podawania przyczyny i bez kosztów, pisząc na adres patryk@kompetencje.ai.",
        },
        {
          text: "W trakcie Webinaru możemy przedstawić nasze płatne Kursy. Zapis na Webinar nie zobowiązuje Cię do żadnego zakupu.",
        },
        {
          text: "Z ważnych przyczyn możemy zmienić termin Webinaru lub go odwołać. Poinformujemy Cię o tym e-mailem z wyprzedzeniem, jeśli to możliwe.",
        },
      ],
    },
    {
      _type: "legalSection",
      num: "09",
      title: "ODSTĄPIENIE OD UMOWY",
      blocks: [
        {
          text: "Jeśli jesteś Konsumentem lub Przedsiębiorcą na prawach konsumenta, możesz odstąpić od Umowy w ciągu 14 dni od dnia jej zawarcia, bez podawania przyczyny. Wystarczy, że przed upływem tego terminu wyślesz nam oświadczenie o odstąpieniu na adres patryk@kompetencje.ai.",
        },
        {
          text: "Możesz skorzystać ze wzoru formularza odstąpienia od umowy, który stanowi załącznik nr 2 do ustawy o prawach konsumenta – znajdziesz go w rozdziale 15 „WZÓR FORMULARZA ODSTĄPIENIA OD UMOWY” na końcu regulaminu. Nie jest to obowiązkowe. Otrzymanie oświadczenia potwierdzimy e-mailem.",
        },
        {
          text: "Po odstąpieniu zwrócimy Ci wszystkie płatności w ciągu 14 dni od otrzymania oświadczenia, tą samą metodą płatności, której użyłeś, chyba że wyraźnie zgodzisz się na inną. Nie poniesiesz żadnych opłat za zwrot.",
        },
        {
          text: "Jeśli wyraźnie zażądasz, abyśmy zaczęli świadczyć usługę przed upływem 14 dni, a potem odstąpisz od Umowy, zapłacisz za część Kursu zrealizowaną do chwili odstąpienia, proporcjonalnie do ceny.",
        },
        { text: "Prawo odstąpienia od Umowy nie przysługuje Ci:" },
        {
          items: [
            "w zakresie zajęć na żywo – po pełnym wykonaniu usługi, jeśli rozpoczęliśmy ją za Twoją wyraźną i uprzednią zgodą, a Ty przyjąłeś do wiadomości, że po jej pełnym wykonaniu utracisz prawo odstąpienia,",
            "w zakresie Nagrań i innych treści cyfrowych – od chwili rozpoczęcia ich dostarczania, jeśli nastąpiło to za Twoją wyraźną i uprzednią zgodą przed upływem terminu odstąpienia, po poinformowaniu Cię o utracie tego prawa, a my przekazaliśmy Ci potwierdzenie na trwałym nośniku, na przykład e-mailem.",
          ],
        },
      ],
    },
    {
      _type: "legalSection",
      num: "10",
      title: "REKLAMACJE",
      blocks: [
        {
          text: "Odpowiadamy za to, aby Kurs, Nagranie i Materiały były zgodne z Umową. Jeśli coś nie działa lub odbiega od opisu, złóż reklamację na adres patryk@kompetencje.ai.",
        },
        { text: "W reklamacji podaj:" },
        {
          items: [
            "swoje imię, nazwisko i adres e-mail użyty przy zapisie,",
            "nazwę i termin Kursu lub Webinaru,",
            "opis problemu i datę jego wystąpienia,",
            "swoje żądanie, na przykład usunięcie problemu lub obniżenie ceny.",
          ],
        },
        {
          text: "Odpowiemy na reklamację w ciągu 14 dni od jej otrzymania, na adres e-mail, z którego ją wysłano. Jeśli jesteś Konsumentem i nie odpowiemy w tym terminie, uznaje się, że reklamację uwzględniliśmy.",
        },
        {
          text: "Konsumentowi i Przedsiębiorcy na prawach konsumenta przysługują uprawnienia przewidziane w ustawie o prawach konsumenta dla treści i usług cyfrowych: doprowadzenie do zgodności z Umową, obniżenie ceny albo odstąpienie od Umowy. Wobec pozostałych Klientów odpowiedzialność z tytułu rękojmi jest wyłączona w zakresie, w jakim pozwala na to prawo.",
        },
      ],
    },
    {
      _type: "legalSection",
      num: "11",
      title: "PRAWA AUTORSKIE",
      blocks: [
        {
          text: "Kursy, Nagrania, Materiały oraz treści Serwisu są chronione prawem autorskim i należą do nas albo do osób, które udzieliły nam na nie licencji.",
        },
        {
          text: "Z chwilą zawarcia Umowy udzielamy Ci niewyłącznej i nieprzenoszalnej licencji na korzystanie z Materiałów na własny użytek, w tym na potrzeby Twojej pracy lub działalności. Licencja obowiązuje przez czas dostępu do Kursu, a Materiały pobrane w tym czasie możesz zachować.",
        },
        { text: "Bez naszej pisemnej zgody nie możesz w szczególności:" },
        {
          items: [
            "nagrywać zajęć na żywo,",
            "kopiować, publikować ani rozpowszechniać Nagrań i Materiałów,",
            "udostępniać Materiałów, linków ani dostępu do Kursu innym osobom,",
            "wykorzystywać Materiałów do prowadzenia własnych szkoleń.",
          ],
        },
      ],
    },
    {
      _type: "legalSection",
      num: "12",
      title: "ODPOWIEDZIALNOŚĆ",
      blocks: [
        {
          text: "Kursy i Webinary mają charakter edukacyjny. Pokazujemy w nich, jak korzystać z narzędzi sztucznej inteligencji, ale to Ty decydujesz, jak wykorzystasz tę wiedzę i jakie dane wprowadzisz do tych narzędzi.",
        },
        {
          text: "Narzędzia AI omawiane na zajęciach są dostarczane przez inne firmy, na ich własnych zasadach. Nie odpowiadamy za ich działanie, dostępność, ceny ani zmiany wprowadzane przez ich dostawców.",
        },
        {
          text: "Nie odpowiadamy za przerwy w dostępie wynikające z przyczyn od nas niezależnych, w szczególności z awarii Twojego sprzętu lub łącza. Prace techniczne, jeśli to możliwe, planujemy poza terminami zajęć.",
        },
        {
          text: "Wobec Klientów, którzy nie są Konsumentami ani Przedsiębiorcami na prawach konsumenta, nasza odpowiedzialność jest ograniczona do wysokości ceny zapłaconej za Kurs i nie obejmuje utraconych korzyści. Postanowienia tego rozdziału nie ograniczają praw Konsumentów wynikających z przepisów.",
        },
      ],
    },
    {
      _type: "legalSection",
      num: "13",
      title: "POZASĄDOWE ROZWIĄZYWANIE SPORÓW",
      blocks: [
        {
          text: "Zależy nam, aby każdy spór rozwiązać polubownie, dlatego w razie problemu najpierw napisz do nas. Jeśli jesteś Konsumentem, możesz też skorzystać z pozasądowych sposobów rozpatrywania reklamacji i dochodzenia roszczeń:",
        },
        {
          items: [
            "zwrócić się o bezpłatną pomoc do powiatowego lub miejskiego rzecznika konsumentów albo organizacji konsumenckiej,",
            "złożyć wniosek o mediację lub do stałego polubownego sądu konsumenckiego przy wojewódzkim inspektoracie Inspekcji Handlowej.",
          ],
        },
        {
          text: "Informacje o tych sposobach i procedurach znajdziesz na stronie Urzędu Ochrony Konkurencji i Konsumentów: www.uokik.gov.pl. Skorzystanie z nich jest dobrowolne.",
        },
      ],
    },
    {
      _type: "legalSection",
      num: "14",
      title: "POSTANOWIENIA KOŃCOWE",
      blocks: [
        {
          text: "Zasady przetwarzania danych osobowych opisuje Polityka prywatności dostępna pod adresem kompetencje.ai/polityka-prywatnosci.",
        },
        { text: "Możemy zmienić regulamin z ważnych przyczyn, w szczególności:" },
        {
          items: [
            "zmiany przepisów prawa,",
            "zmiany sposobu płatności lub dostawców, z których korzystamy,",
            "wprowadzenia nowych usług lub zmiany funkcji Serwisu.",
          ],
        },
        {
          text: "O zmianie poinformujemy w Serwisie i e-mailem osoby z aktywnym dostępem do Kursu, co najmniej 14 dni przed jej wejściem w życie. Do Umów zawartych przed zmianą stosujemy regulamin w wersji z dnia zawarcia Umowy.",
        },
        {
          text: "W sprawach nieuregulowanych regulaminem stosuje się prawo polskie, w szczególności Kodeks cywilny i ustawę o prawach konsumenta. Wybór prawa polskiego nie pozbawia Konsumenta ochrony, jaką dają mu bezwzględnie obowiązujące przepisy kraju jego zwykłego pobytu.",
        },
      ],
    },
    {
      _type: "legalSection",
      num: "15",
      title: "WZÓR FORMULARZA ODSTĄPIENIA OD UMOWY",
      blocks: [
        {
          text: "Wzór zgodny z załącznikiem nr 2 do ustawy z 30 maja 2014 r. o prawach konsumenta. Formularz wypełnij i odeślij tylko wtedy, gdy chcesz odstąpić od umowy – możesz go przesłać e-mailem na adres patryk@kompetencje.ai. Możesz też złożyć oświadczenie w dowolnej innej formie.",
        },
        {
          text: "Adresat: Futurista Patryk Czemierowski, ul. Pory 78, 02-757 Warszawa, e-mail: patryk@kompetencje.ai.",
        },
        {
          text: "Ja/My(*) niniejszym informuję/informujemy(*) o moim/naszym(*) odstąpieniu od umowy o świadczenie następującej usługi / dostarczenie następujących treści cyfrowych(*):",
        },
        {
          items: [
            "nazwa kursu lub webinaru: …………………………………………,",
            "data zawarcia umowy: …………………………………………,",
            "imię i nazwisko konsumenta(-ów): …………………………………………,",
            "adres konsumenta(-ów): …………………………………………,",
            "adres e-mail podany przy zapisie: …………………………………………,",
            "podpis konsumenta(-ów) (tylko jeżeli formularz jest przesyłany w wersji papierowej): …………………………………………,",
            "data: ………………………………………….",
          ],
        },
        {
          text: "(*) Niepotrzebne skreślić.",
        },
      ],
    },
  ],
  outro: "wolisz zapytać wprost ?",
  ctaLabel: "NAPISZ DO NAS",
  ctaHref: "/#kontakt",
  metaTitle: "Regulamin",
  metaDescription:
    "Regulamin kompetencje.ai: zapis na kursy AI online i bezpłatne webinary, płatności, nagrania, odstąpienie od umowy i reklamacje.",
};

export const legalPages: Record<string, LegalPage> = {
  "polityka-prywatnosci": politykaPrywatnosci,
  regulamin,
};
