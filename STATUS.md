# STATUS — strona kompetencje.ai
Ostatnia aktualizacja: 2026-10-08

## Faza
Faza 1 (wierne odwzorowanie designu) jest w ~85% — strona główna, „O nas" i strony prawne gotowe; trwa strona kursu. Równolegle ruszyły animacje (Faza 2) i grafiki/wideo generowane AI (Faza 3).

## Ostatnio ukończone
- Zaplanowany proces zakupu kursu: formularz zapisu → płatność Stripe → automatyczna lista zgłoszeń w bazie (kto się zapisał, kto zapłacił, kto porzucił płatność). Każdy uczestnik wypełnia formularz osobno. Przygotowana struktura bazy.
- Przygotowany techniczny „szkielet” płatności online (Stripe) — strona umie przekierować klienta na bezpieczną stronę płatności Stripe; do działania brakuje kluczy konta Stripe i cen kursów.
- Podstrona **Manifest** z pełną treścią, autorskim układem i animowanym robotem (wideo „włączania się") — gotowa do review.
- Nowa grafika robota w sekcji Manifest na stronie głównej (wariant z wizjerem, wygenerowany AI).
- Animowane wideo dłoni w sekcji „Human and Machine" (desktop + mobile).
- Przycisk „wróć na górę" w stopce na całej stronie.
- Menu mobilne (burger) działa na wszystkich podstronach; poprawione linki nawigacji.

## W toku
- Strona pojedynczego kursu: wersja desktop częściowo zbudowana (hero, „co zyskasz", program); brakuje sekcji „dla kogo", paska z datą startu, kontaktu i całej wersji mobilnej.

## Czekam na / zablokowane
- **Patryk**: założenie bazy Supabase (region UE) i przekazanie kluczy — potrzebne do zapisywania zgłoszeń.
- **Designer**: projekt formularza zapisu na kurs w Figmie (do tego czasu może powstać wersja tymczasowa).
- **Patryk**: review całej strony głównej (desktop + mobile) — czeka od lipca.
- **Patryk**: review podstrony /manifest.
- **Patryk**: prawdziwy numer telefonu do stopki (w projekcie jest placeholder „000 000 000").
- **Patryk**: dane firmy (nazwa, adres, NIP) do regulaminu i polityki prywatności + weryfikacja prawna tych treści.
- **Patryk**: decyzja, dokąd publikujemy kod (stare repo czy nowe) — blokuje wdrożenie online.
- **Zespół/designer**: projekty pozostałych podstron (docelowy wygląd Manifestu z Figmy, ewentualne kolejne widoki).

## Następne kroki
- Formularz zapisu na kurs: najpierw sam wygląd (bez zapisywania danych), potem podpięcie bazy i płatności.
- Dokończenie strony kursu (desktop: brakujące sekcje, potem wersja mobilna).
- Podpięcie wysyłki formularza kontaktowego (teraz formularz nie wysyła wiadomości).
- Kolejne animacje (sekcje DNA, kontakt, stopka) i grafiki hero generowane AI dla podstron.

## Ryzyka / uwagi
- Płatności online (Stripe) działają na razie tylko w trybie testowym i jako szkic — do uruchomienia potrzebne będą ceny kursów, formularz zapisu i strona podziękowania.
- Faktury: wymagany system zgodny z KSeF (np. Fakturownia/inFakt) — jeszcze niewykupiony; przed startem sprzedaży trzeba go wybrać.
- W projekcie kursu widnieje data „KURS STARTUJE JUŻ 20 LIPCA" — już nieaktualna; przed publikacją trzeba ustalić prawdziwą datę startu (docelowo daty i ceny powinny być łatwo edytowalne).
- Treści prawne (regulamin, polityka prywatności) to robocze wersje — wymagają weryfikacji prawnika przed startem.
- Strona nie jest jeszcze nigdzie opublikowana online — działa tylko lokalnie.
