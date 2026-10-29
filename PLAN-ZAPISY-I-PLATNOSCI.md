# Plan: zapisy na webinary i kursy, płatności, maile

Plan uzgodniony z Patrykiem 29 października 2026. Bieżący stan zadań prowadzimy w `TODO.md`.

## Decyzje

- **Bez kont użytkowników i logowania.** Klient podaje dane w formularzu, a wszystko dostaje mailem.
- **Maile wysyła Resend.** Patryk zakłada konto i podpina domenę 29 października 2026 wieczorem.
- **System do faktur:** jeszcze niewybrany. Do czasu wyboru faktury wystawiamy ręcznie z listy zapisów w bazie.
- **Zajęcia online:** LiveWebinar. Na start jeden link do pokoju na wydarzenie, zapisany w danych webinaru lub kursu.

## Dlaczego bez kont

- **Więcej zapisów.** Każde dodatkowe pole i hasło zmniejsza liczbę zapisów. Przy kursie za 1500 zł i darmowym webinarze zapis ma być jak najprostszy.
- **Nie ma takiej potrzeby.** Zajęcia i nagrania i tak są na LiveWebinar, więc własny panel z materiałami nie jest potrzebny.
- **Mniej danych osobowych.** Jest mniej do zabezpieczenia i do opisania w polityce prywatności.

Konta warto dodać dopiero wtedy, gdy kursów będzie kilka i klient powinien widzieć swoje zakupy i nagrania w jednym miejscu.

## Webinar (bezpłatny)

1. **Formularz.** [x] Ten sam wygląd co przy kursie, tylko krótszy: imię, e-mail, zgoda na regulamin i politykę oraz newsletter (opcjonalny). Przycisk „Zapisz się za darmo” otwiera okno z formularzem.
2. **Baza.** [x] Tabela `webinar_zapisy` w Supabase (migracja `0003`). Jeden e-mail można zapisać na dany webinar tylko raz. Limit miejsc opcjonalnie, później.
3. **Mail zaraz po zapisie.** [x] Potwierdzenie z terminem, linkiem do LiveWebinar oraz regulaminem i polityką. Wychodzi automatycznie od chwili, gdy w Vercel będą ustawione `RESEND_API_KEY` i `MAIL_FROM`. [ ] Plik do dodania wydarzenia w kalendarzu (.ics).
4. **Przypomnienia.** [ ] Dzień i godzinę przed startem, przez Vercel Cron. Kolumny w bazie na to już są.
5. **Po webinarze.** [ ] Mail z nagraniem i ofertą kursu. Dane trzymamy 2 lata, zgodnie z polityką prywatności.

## Kurs (płatny)

Już działa:
- formularz z walidacją;
- zgody, w tym zgoda na start kursu przed upływem 14 dni (migracja `0002`);
- zapis w bazie;
- płatność w Stripe;
- webhook, który ustawia status „opłacone”, „porzucone” albo „zwrot”.

Do zrobienia:

1. **Mail po opłaceniu.** Gdy zgłoszenie dostanie status „opłacone”, wysyłamy potwierdzenie zakupu. Zawiera podsumowanie, treść zgody na start, regulamin i informację o fakturze. To wymóg prawny (potwierdzenie na trwałym nośniku), a jego brak **blokuje start sprzedaży**.
2. **Dostęp do zajęć.** Link do LiveWebinar w mailu i przypomnienia przed każdym spotkaniem. Jeśli klient nie wyraził zgody na start przed upływem 14 dni, materiały i nagrania wysyłamy dopiero po 14 dniach od zapisu. Reguła jest już w kodzie (`lib/zgodaStart.ts`).
3. **Faktury.** Po opłaceniu webhook zakłada fakturę w systemie zgodnym z KSeF, na przykład Fakturownia albo inFakt przez ich API, i wysyła ją klientowi. Do tego czasu faktury wystawiamy ręcznie.
4. **Płatności.** Trzeba włączyć w Stripe BLIK i Przelewy24. Zwroty Patryk robi w panelu Stripe, a webhook sam oznacza zgłoszenie.
5. **Lista zapisów dla Patryka.** Na start wystarczy panel Supabase. Później prosta lista na stronie, chroniona hasłem, z eksportem do CSV.
6. **Opcjonalnie.** Limit miejsc na kurs. Mail „nie dokończyłeś płatności”, wysyłany tylko osobom, które zgodziły się na kontakt.

## Kolejność prac

1. Resend (konto i DNS) i mail po opłaceniu kursu. To odblokowuje sprzedaż.
2. Zapis na webinar z mailem potwierdzającym (zrobione 29 października 2026), potem przypomnienia.
3. Linki do LiveWebinar i przypomnienia przed zajęciami kursów.
4. Automatyczne faktury, gdy system będzie wybrany.
5. Lista zapisów dla Patryka.

## Co jest potrzebne od Patryka

- **Resend.** Konto z podpiętą domeną kompetencje.ai, a w Vercel zmienne `RESEND_API_KEY` i `MAIL_FROM` (opcjonalnie `MAIL_REPLY_TO`).
- **Migracje bazy.** Uruchomić `0002` i `0003` z `komp-ai/supabase/migrations`, najpierw na bazie testowej, potem na produkcyjnej, i zrobić to przed wgraniem zmian.
- **LiveWebinar.** Link do pokoju dla każdego webinaru i kursu.
- **Faktury.** Wybór systemu.
- **Webinar.** Decyzja, czy ma mieć limit miejsc.
