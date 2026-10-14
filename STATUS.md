# STATUS — strona kompetencje.ai
Ostatnia aktualizacja: 2026-10-15

## Faza
Faza 1 (wierne odwzorowanie designu) jest w ~85% — strona główna, „O nas" i strony prawne gotowe; trwa strona kursu. Równolegle ruszyły animacje (Faza 2) i grafiki/wideo generowane AI (Faza 3).

## Ostatnio ukończone
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
- Strona pojedynczego kursu: wersja desktop częściowo zbudowana (hero, „co zyskasz", program); brakuje sekcji „dla kogo", paska z datą startu, kontaktu i całej wersji mobilnej.

## Czekam na / zablokowane
- **Patryk**: termin webinaru, potwierdzenie prowadzącego (w projekcie było puste pole; wpisaliśmy Piotra Małysza) i link, pod który mają prowadzić przyciski „Zapisz się".
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
- Dokończenie konfiguracji płatności (Stripe: webhook, test płatności testowej, klucze na Vercel).
- Formularz zapisu na kurs: najpierw sam wygląd (bez zapisywania danych), potem podpięcie bazy i płatności.
- Dokończenie strony kursu (desktop: brakujące sekcje, potem wersja mobilna).
- Podpięcie wysyłki formularza kontaktowego (teraz formularz nie wysyła wiadomości).
- Kolejne animacje (sekcje DNA, kontakt, stopka) i grafiki hero generowane AI dla podstron.

## Ryzyka / uwagi
- Nowe projekty designera są w nowym pliku Figmy — do ustalenia, czy cała dalsza praca przechodzi na ten plik.
- Na tabletach strona główna i „O nas" pokazują formularz kontaktowy w bardzo małym rozmiarze — na Manifeście już poprawione, warto ujednolicić.
- Płatności online (Stripe) są gotowe w trybie testowym — przed startem sprzedaży potrzebny test całego procesu i klucze produkcyjne.
- Faktury: wymagany system zgodny z KSeF (np. Fakturownia/inFakt) — jeszcze niewykupiony; przed startem sprzedaży trzeba go wybrać.
- W projekcie kursu widnieje data „KURS STARTUJE JUŻ 20 LIPCA" — już nieaktualna; przed publikacją trzeba ustalić prawdziwą datę startu (docelowo daty i ceny powinny być łatwo edytowalne).
- Treści prawne (regulamin, polityka prywatności) to robocze wersje — wymagają weryfikacji prawnika przed startem.
- Wersja testowa strony jest wdrażana na Vercel (projekt kompetencje-main) z każdą zmianą w repozytorium; płatności i zapisy wymagają jeszcze konfiguracji kluczy produkcyjnych.
