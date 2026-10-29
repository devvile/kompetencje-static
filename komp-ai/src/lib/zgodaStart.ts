/*
 * Zgoda konsumenta na rozpoczęcie świadczenia przed upływem 14 dni na
 * odstąpienie od umowy (art. 38 pkt 1 i 13 ustawy o prawach konsumenta).
 * Reguła W JEDNYM MIEJSCU — używają jej formularz (przeglądarka) i Server Action.
 *
 * Próg 15 dni (nie 14): umowa zawiera się dopiero przy płatności (sesja Stripe
 * ważna 1 h), do tego strefy czasowe — dzień zapasu.
 * Brak daty startu („Termin wkrótce") → zgoda wymagana zawsze (bezpieczniej).
 * Kursy z kilkoma terminami (w przyszłości): liczyć od terminu WYBRANEGO przez klienta.
 */

export const ZGODA_START_PROG_DNI = 15;

export const ZGODA_START_TRESC =
  "Żądam rozpoczęcia świadczenia usługi przed upływem 14-dniowego terminu na odstąpienie od umowy i wyrażam zgodę na dostarczenie mi treści cyfrowych (w tym nagrań i materiałów kursu) przed upływem tego terminu. Przyjmuję do wiadomości, że tracę prawo odstąpienia od umowy: w zakresie zajęć na żywo – po ich pełnym wykonaniu, a w zakresie treści cyfrowych – z chwilą rozpoczęcia ich dostarczania.";

/** krótka etykieta przy checkboxie (wersja minimalistyczna); pełna treść = ZGODA_START_TRESC
 *  pod rozwijanym „pełna treść zgody" — klikając checkbox klient akceptuje pełną treść */
export const ZGODA_START_KROTKO =
  "Chcę zacząć kurs przed upływem 14 dni na odstąpienie od umowy i wiem, że tracę wtedy prawo odstąpienia.";

export const ZGODA_START_BLAD =
  "Aby zapisać się na kurs, który zaczyna się za mniej niż 14 dni, zaznacz zgodę na rozpoczęcie kursu przed upływem terminu na odstąpienie.";

/** true = przy zapisie potrzebna (i obowiązkowa) zgoda na start przed upływem 14 dni */
export function wymagaZgodyNaStart(start?: string, now: Date = new Date()): boolean {
  if (!start) return true;
  const t = new Date(start).getTime();
  if (Number.isNaN(t)) return true; // nieczytelna data → bezpiecznie
  return t - now.getTime() < ZGODA_START_PROG_DNI * 24 * 60 * 60 * 1000;
}
