# STATUS — strona kompetencje.ai
Ostatnia aktualizacja: 2026-10-29

## Faza
Faza 1 (wierne odwzorowanie designu) jest w ~85% — strona główna, „O nas" i strony prawne gotowe; trwa strona kursu. Równolegle ruszyły animacje (Faza 2) i grafiki/wideo generowane AI (Faza 3).

## Ostatnio ukończone
- Znaleziona przyczyna, dla której Google nie indeksował strony: strona podawała jako „właściwy” adres bez „www”, a ten przekierowuje na wersję z „www”. Wszystkie adresy (mapa strony, znaczniki dla Google, linki udostępniania) wskazują teraz na www.kompetencje.ai.
- Formularz zapisu na kurs: gdy kurs zaczyna się za mniej niż 15 dni (albo nie ma jeszcze daty), pojawia się obowiązkowa zgoda klienta na rozpoczęcie kursu przed upływem 14 dni na odstąpienie od umowy. Zgoda jest zapisywana w bazie z datą i widoczna przy płatności w Stripe. Przy checkboxie jest krótkie zdanie, a pełna treść zgody rozwija się po kliknięciu „Pełna treść zgody”.
- Naprawione: na telefonie na stronie głównej nie pokazywały się zdjęcia prowadzących (animacja odsłaniania nigdy się nie uruchamiała).
- Strona webinaru na telefonie ma teraz te same elementy co na komputerze (kafelki, pasek liczb, pieczątka, przykładowe pytanie, przypis, formularz) — ułożone pod wąski ekran. Projektu mobilnego w Figmie nie było, więc wzorem była wersja komputerowa.
- Strona webinaru „Zbuduj swojego agenta AI w 60 minut" (komputer) zaktualizowana według nowego projektu Victorii: nowy początek strony (kafelki „co potrafi agent", pasek z liczbami, okrągła pieczątka AI GYM), pasek z przykładowym pytaniem między porównaniem odpowiedzi, przypis w programie, subtelne siatki w tle i formularz kontaktowy na dole strony — przyciski „Zapisz się" przewijają do niego.
- Strona „O nas" na telefonie: usunięte usterki na niebieskim tle — opisy prowadzących mają teraz półprzezroczyste ramki z efektem szkła jak w projekcie, tekst mieści się w ramkach, ozdobne linie nie przecinają już tekstu; poprawione też logo „.AI" na górze strony (biała obwódka przy kropce).
- Nowa strona kursu „AI pod kontrolą od podstaw" (komputer + telefon) według projektu Victorii — 6 modułów, 13 lekcji, sekcja „Dla kogo", najczęstsze pytania, formularz. Karta tego kursu na stronie głównej prowadzi teraz do nowej strony.
- Strona kursu „Z rozmowy do oferty w 60 minut" przebudowana według nowych widoków Victorii — na komputerze i telefonie: kafle „Co zyskasz" z ilustracjami, program w czytelnych kartach lekcji, nowe sekcje „Dla kogo jest kurs" i „Najczęstsze pytania", formularz kontaktowy na dole strony, termin startu w kilku miejscach (do wpisania).
- Na monitorach szerszych niż 3000 pikseli (4K, ultra wide) strona ma dokładnie rozmiar z projektu — górny ekran ma 833 piksele wysokości, nic się już nie powiększa.
- Formularz kontaktowy jest teraz zwarty i mieści się w całości na jednym ekranie — na laptopie, dużych monitorach i telefonie, na stronie głównej, „O nas" i Manifeście (niższe pola i krótsze pole wiadomości; wygląd poza tym bez zmian).
- Strona główna na bardzo szerokich monitorach (ultra wide, 4K): elementy nie rosną już ponad ok. 1,1× rozmiaru z projektu, a ich skala dopasowuje się do wysokości okna — strona nie wygląda jak wielki plakat. Kolorowe pasy sekcji (niebieskie, limonkowe, stopka) sięgają do krawędzi ekranu zamiast kończyć się „pudełkiem". Na laptopach i telefonach bez zmian.
- Strona główna zaktualizowana według „ostatniego szlifu" designerki Victorii — na komputerze i telefonie: nowa grafika robota i nowy układ tekstów w sekcji „Nie chodzi o to", pasek „TY DECYDUJESZ" przeniesiony nad kartę webinaru, odświeżona karta webinaru (nowe teksty, nowe zdjęcie, osobny projekt na telefon), nowe grafiki i etykiety w kartach kursów, nowy przycisk „POZNAJ NASZE KURSY" nad formularzem kontaktowym, drobne przesunięcia w kilku sekcjach. Pierwsza karta kursu to teraz nowy kurs „AI pod kontrolą od podstaw" (przycisk tymczasowo prowadzi do formularza kontaktowego). Zgodność z projektem: 97–99% (różnice to głównie dane, których projekt jeszcze nie ma, np. termin webinaru).
- Na dużych monitorach (Full HD, 2K, 4K) strona nie jest już przesadnie powiększona: treść ma najwyżej ok. 1760 pikseli szerokości, a na Full HD po bokach pojawiły się szare marginesy. Na laptopach i telefonach nic się nie zmieniło.
- Audyt SEO całej strony: wszystkie podstrony mają poprawne tytuły, opisy, adresy kanoniczne i grafikę do udostępniania. Plik dla robotów wyszukiwarek uzupełniony — wprost wpuszczamy też wyszukiwarki AI (ChatGPT, Claude, Perplexity, Gemini), żeby asystenci AI mogli polecać nasze kursy. Poprawione tytuły regulaminu i polityki prywatności (nazwa marki była w nich dwa razy).
- Podstawy SEO: Google dostaje teraz mapę strony i instrukcje, co indeksować; linki do strony wklejane na LinkedIn/Messenger pokazują firmową grafikę z tytułem; w wynikach wyszukiwania marka jest opisana jako organizacja edukacyjna. Trzy kursy, które na razie mają skopiowaną treść innego kursu, są ukryte przed Google, dopóki nie dostaną własnych opisów.
- Naprawiony link „SZKOLENIA" w stopce (prowadził do nieistniejącej strony) — tymczasowo prowadzi do kursów na stronie głównej.
- Przegląd całej strony: działa poprawnie na wszystkich podstronach, ale strony są za ciężkie (strona główna ~25 MB) — na telefonach z gorszym zasięgiem ładują się wolno. Zaplanowane odchudzenie.
- Ze strony głównej tymczasowo zniknęła sekcja z trzema małymi kartami kursów (gotowa do przywrócenia jednym przełącznikiem).
- Na stronie głównej, nad paskiem „TY DECYDUJESZ", pojawiła się karta reklamująca webinar (według projektu designera) — prowadzi do strony szczegółów webinaru. Data i godzina uzupełnią się same po wpisaniu terminu.
- Strona szczegółów webinaru („Zbuduj swojego agenta AI w 60 minut") jako uniwersalny szablon — kolejne webinary dodajemy samymi danymi (termin, prowadzący, cena, program). Strona jest podlinkowana ze strony głównej, ale jeszcze niewidoczna w Google.
- Formularz zapisu na kurs (okno na komputerze, panel wysuwany od dołu na telefonie) według projektu designera — z kontrolą poprawności danych (e-mail, NIP do faktury, zgody). Po wysłaniu zgłoszenie trafia do bazy, a klient przechodzi na bezpieczną stronę płatności Stripe; po powrocie widzi ekran podziękowania (albo informację o przerwanej płatności lub błędzie). Status opłacenia zapisuje się automatycznie.
- Strona kursu działa teraz jako uniwersalny szablon: kolejny kurs dodajemy, podając jego dane (cena, grafika, prowadzący, program, korzyści) — bez programowania nowej strony. Liczba modułów i lekcji liczy się sama, a Google dostaje informacje o kursie i cenie (lepsze wyniki wyszukiwania).
- Nowa podstrona kursu **„Z rozmowy do oferty w 60 minut"** według projektu designera — wersja na komputery (laptopy, MacBooki, duże monitory) i tablety, wiernie odwzorowana. Wersja na telefon gotowa (z przyklejonym paskiem z ceną i przyciskiem zapisu).
- Podstrona **Manifest** przebudowana według nowego projektu designera — wersja komputerowa wiernie odwzorowana (laptopy, MacBooki, duże monitory), plus dopracowana wersja na telefon i tablet (projekt nie zawierał wersji mobilnej, więc przygotowaliśmy ją w tym samym stylu). Gotowa do przeglądu.
- Nowa animacja robota na Manifeście („włączanie się" — zapala się wizjer i świecące linie, robot podnosi głowę), wygenerowana AI i wycięta z tła tak, że działa na każdym tle i w każdej przeglądarce (także na iPhonie). Przygotowane 2 warianty do wyboru.
- Zaplanowany proces zakupu kursu: formularz zapisu → płatność Stripe → automatyczna lista zgłoszeń w bazie (kto się zapisał, kto zapłacił, kto porzucił płatność). Każdy uczestnik wypełnia formularz osobno. Przygotowana struktura bazy.
- Przygotowany techniczny „szkielet” płatności online (Stripe) — strona umie przekierować klienta na bezpieczną stronę płatności Stripe; do działania brakuje kluczy konta Stripe i cen kursów.
- Nowa grafika robota w sekcji Manifest na stronie głównej (wariant z wizjerem, wygenerowany AI).
- Animowane wideo dłoni w sekcji „Human and Machine" (desktop + mobile).
- Przycisk „wróć na górę" w stopce na całej stronie.
- Menu mobilne (burger) działa na wszystkich podstronach; poprawione linki nawigacji.

## W toku
- Dopasowanie podstron „O nas" i „Manifest" do monitorów ultra wide (tła sekcji do krawędzi ekranu).
- Strona pojedynczego kursu: wersja desktop częściowo zbudowana (hero, „co zyskasz", program); brakuje sekcji „dla kogo", paska z datą startu, kontaktu i całej wersji mobilnej.

## Czekam na / zablokowane
- **Patryk**: dodanie strony do Google Search Console, zgłoszenie mapy strony i prośba o zindeksowanie strony głównej oraz kursów (instrukcja w CHANGELOG); opcjonalnie w Vercelu zmiana przekierowania bez-www → www na stałe.
- **Patryk**: uruchomienie aktualizacji bazy (nowa kolumna na zgodę, plik 0002 w supabase/migrations) na bazie testowej i produkcyjnej — do tego czasu zapisy działają, ale data zgody nie trafia do bazy (jest tylko w Stripe).
- **Bloker startu sprzedaży**: brak maila z potwierdzeniem zapisu (Resend) — prawo wymaga przesłania klientowi potwierdzenia zgody i regulaminu na trwałym nośniku.
- **Patryk**: odpowiedzi do „Najczęstszych pytań" na stronach kursów (w projekcie jest tylko jedna, zastępcza) — szczególnie nagrania spotkań i zasady zwrotów; termin startu kursów; cena kursu „AI pod kontrolą od podstaw".
- **Patryk**: przegląd zaktualizowanej strony głównej (komputer + telefon) po poprawkach Victorii.
- **Patryk**: podstrona i treść kursu „AI pod kontrolą od podstaw" (dziś przycisk karty prowadzi do formularza kontaktowego) oraz decyzja: ceny w kartach „netto" (jak w projekcie) czy „brutto" (jak teraz na stronie).
- **Patryk**: dokąd ma prowadzić „SZKOLENIA" w stopce (osobna strona szkoleń dla firm czy lista kursów)?
- **Patryk**: linki do profili firmy (LinkedIn, Instagram itp.) — Google połączy je z marką.
- **Patryk**: konto Resend (wysyłka maili) i dostęp do ustawień DNS domeny kompetencje.ai — bez tego formularz kontaktowy nie wysyła wiadomości.
- **Patryk**: termin webinaru (dopóki go nie ma, strona webinaru jest ukryta przed Google, mimo że link do niej jest na stronie głównej), potwierdzenie prowadzącego (w projekcie było puste pole; wpisaliśmy Piotra Małysza) i link, pod który mają prowadzić przyciski „Zapisz się".
- **Designer**: (opcjonalnie) widoki mobilne programu kursu, paska „Gotowy…" i karty zapisu — teraz zrobione przez nas w tym samym stylu.
- **Patryk**: na telefonie projekt mówi „praktyk z 6 latami w fintechu", na komputerze „7 latami wdrożeń w firmach" — który tekst jest prawdziwy?
- **Patryk**: przegląd strony kursu „Z rozmowy do oferty" oraz decyzje: czy stopka ma być jak w nowym projekcie (prostsza) czy jak na reszcie strony; skąd na stronie głównej linkujemy do tego kursu.
- **Patryk**: zgoda na próbny zapis i płatność testową (bez prawdziwych pieniędzy) — zapis trafi do bazy zgłoszeń; oraz włączenie w Stripe potwierdzeń e-mail i metod płatności (BLIK, Przelewy24).
- **Designer**: projekt formularza zapisu na kurs w Figmie (do tego czasu może powstać wersja tymczasowa).
- **Patryk**: review całej strony głównej (desktop + mobile) — czeka od lipca.
- **Patryk**: przegląd nowej podstrony Manifest (komputer + telefon) i wybór jednego z dwóch wariantów animacji robota.
- **Patryk**: prawdziwy numer telefonu do stopki (w projekcie jest placeholder „000 000 000").
- **Patryk**: dane firmy (nazwa, adres, NIP) do regulaminu i polityki prywatności + weryfikacja prawna tych treści.
- **Zespół/designer**: projekty pozostałych podstron (ewentualne kolejne widoki) oraz wersje mobilne nowych widoków.

## Następne kroki
- Odchudzenie strony (lżejsze formaty zdjęć, wideo tylko w wersji dla danego urządzenia, usunięcie zbędnych plików) — cel: strona główna 3–5 MB zamiast ~25 MB.
- Po podpięciu domeny: zgłoszenie strony w Google Search Console.
- Uruchomienie wysyłki formularza kontaktowego i maili z potwierdzeniem zapisu (usługa Resend).
- Dokończenie konfiguracji płatności (Stripe: webhook, test płatności testowej, klucze na Vercel).
- Formularz zapisu na kurs: najpierw sam wygląd (bez zapisywania danych), potem podpięcie bazy i płatności.
- Dokończenie strony kursu (desktop: brakujące sekcje, potem wersja mobilna).
- Podpięcie wysyłki formularza kontaktowego (teraz formularz nie wysyła wiadomości).
- Kolejne animacje (sekcje DNA, kontakt, stopka) i grafiki hero generowane AI dla podstron.

## Ryzyka / uwagi
- Na tabletach strona główna i „O nas" pokazują formularz kontaktowy w bardzo małym rozmiarze — na Manifeście już poprawione, warto ujednolicić.
- Płatności online (Stripe) są gotowe w trybie testowym — przed startem sprzedaży potrzebny test całego procesu i klucze produkcyjne.
- Faktury: wymagany system zgodny z KSeF (np. Fakturownia/inFakt) — jeszcze niewykupiony; przed startem sprzedaży trzeba go wybrać.
- W projekcie kursu widnieje data „KURS STARTUJE JUŻ 20 LIPCA" — już nieaktualna; przed publikacją trzeba ustalić prawdziwą datę startu (docelowo daty i ceny powinny być łatwo edytowalne).
- Treści prawne (regulamin, polityka prywatności) to robocze wersje — wymagają weryfikacji prawnika przed startem.
- Wersja testowa strony jest wdrażana na Vercel (projekt kompetencje-main) z każdą zmianą w repozytorium; płatności i zapisy wymagają jeszcze konfiguracji kluczy produkcyjnych.
