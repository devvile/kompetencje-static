# CHANGELOG

## 2026-10-29 (15) — SEO: kanoniczna domena www (powód braku indeksacji) + logi 30 dni

- Diagnoza na produkcji: robots.txt i sitemap.xml OK (Allow, sitemap podany), ALE apex
  `kompetencje.ai` robi 307 → `www.kompetencje.ai`, a canonical/og:url/sitemap/JSON-LD wskazywały
  apex → Google: kanoniczny adres przekierowuje (sprzeczne sygnały, strony poza indeksem).
- `lib/seo.ts`: `SITE_URL = "https://www.kompetencje.ai"`; KursV2Template/WebinarTemplate biorą
  SITE_URL (zamiast własnej stałej). Sprawdzone lokalnie: canonical, og:url, sitemap, robots, JSON-LD = www.
- Polityka: logi serwera max 30 dni. Zostały: [SYSTEM DO FAKTUR] ×2, [BIURO RACHUNKOWE].
- Do zrobienia przez Patryka: Google Search Console (właściwość domeny), zgłoszenie sitemap,
  „Sprawdź URL” → „Poproś o zindeksowanie” dla home i kursów. Opcjonalnie w Vercelu przekierowanie
  apex → www jako stałe (308) zamiast 307.

## 2026-10-29 (14) — regulamin/polityka: czas dostępu, retencja webinaru, LiveWebinar, wzór odstąpienia

- Nagrania dostępne 360 dni; dane z zapisu na webinar 2 lata po webinarze; platforma zajęć: LiveWebinar
  (dodana też do odbiorców danych w polityce).
- Regulamin: rozdział 15 „WZÓR FORMULARZA ODSTĄPIENIA OD UMOWY” (wzór z zał. nr 2 do ustawy o prawach
  konsumenta, z danymi sprzedawcy i e-mailem); rozdział o odstąpieniu odsyła do niego.
- Zostały: [SYSTEM DO FAKTUR] ×2, [BIURO RACHUNKOWE], [OKRES PRZECHOWYWANIA LOGÓW].

## 2026-10-29 (13) — dane sprzedawcy/administratora w regulaminie i polityce

- `content/legal.ts`: Patryk Czemierowski, JDG „Futurista Patryk Czemierowski”, ul. Pory 78,
  02-757 Warszawa, NIP 7123092049, REGON 529334846, wpis do CEIDG (zamiast KRS + numeru —
  JDG nie ma numeru KRS). NIP i REGON zweryfikowane sumą kontrolną.
- E-mail kontaktowy: patryk@kompetencje.ai (7 miejsc). Zostały placeholdery: [SYSTEM DO FAKTUR] ×2, [BIURO RACHUNKOWE],
  [CZAS DOSTĘPU], [OKRES PO WEBINARZE], [OKRES PRZECHOWYWANIA LOGÓW], [PLATFORMA DO ZAJĘĆ ONLINE],
  [WZÓR FORMULARZA ODSTĄPIENIA].

## 2026-10-29 (12) — zgoda konsumenta na start kursu przed upływem 14 dni (formularz zapisu)

- `src/lib/zgodaStart.ts`: `wymagaZgodyNaStart(start, now)` — jedna reguła dla przeglądarki i serwera:
  start za < 15 dni (zapas na sesję Stripe 1 h i strefy) LUB brak/nieczytelna data → zgoda wymagana;
  treść zgody i komunikat błędu jako stałe.
- Data startu kursu = `KursV2Page.hero.startDate` (w kursach nie ma `details.start` — to pole webinarów).
- `K2EnrollModal`: nowy checkbox (styl jak regulamin/newsletter), niezaznaczony, widoczny tylko gdy
  wymagany; reguła liczona przy otwarciu formularza; gdy serwer zgłosi błąd zgody — pole się pokazuje.
- `lib/zapis.ts`: pole `zgodaNaStart` w `normalizeZapis`, `validateZapis(v, kursStart, now)`.
- `actions.ts`: reguła liczona ponownie na serwerze z danych kursu; `zgoda_start_przed_terminem_at`
  (czas zgody / NULL) w insercie; Stripe `metadata.zgoda_start: "tak" | "nie_wymagana"` (sesja i PaymentIntent).
- `supabase/migrations/0002_zgoda_start_przed_terminem.sql` + README (UWAGA: uruchomić przed wdrożeniem —
  bez kolumny insert się nie uda).
- Testy w przeglądarce (dev, data tymczasowo w danych, przywrócona): +7 dni → checkbox jest, bez
  zaznaczenia błąd; +30 dni → checkboxa nie ma; brak daty → checkbox jest i jest wymagany. tsc czysty.
- Wersja minimalistyczna (decyzja Patryka): przy checkboxie krótka etykieta `ZGODA_START_KROTKO`,
  pełna treść `ZGODA_START_TRESC` pod rozwijanym „Pełna treść zgody" (poza <label>, klik nie zaznacza).
- Zabezpieczenie wdrożenia: gdy w bazie brak kolumny (migracja 0002 nieuruchomiona), zapis ponawiany
  bez niej + log błędu — zapisy nie stoją; zgoda i tak trafia do metadanych Stripe.
- Wgrane razem z nową treścią regulaminu i polityki prywatności (`content/legal.ts`, agent projektowy).

## 2026-10-29 (11) — fix: niewidoczne zdjęcia prowadzących na home (mobile)

- Zdjęcia mają animację `.reveal-wipe` (start: `clip-path: inset(101%)`). Chrome liczy przecięcie
  IntersectionObserver po przycięciu → pusty prostokąt → `.is-in` nigdy nie dochodziło, zdjęcia
  zostawały ukryte na zawsze (testy szły z reduced-motion, więc tego nie łapały).
- `RevealObserver`: dla `.reveal-wipe` obserwowany jest niewidoczny „sentinel" o tym samym
  położeniu i rozmiarze, a `.is-in` trafia do właściwego elementu. Sprawdzone z animacjami
  włączonymi (390px): wszystkie 20 elementów [data-reveal] odsłonięte; hscroll ok; build OK.

## 2026-10-29 (10) — webinar mobile dopasowany do desktopu v2

- Brak widoku mobile w Figmie (decyzja Patryka) — źródło prawdy = desktop 479:1789, układ w jednej
  kolumnie (max 640): pieczątka AI GYM, nowy opis + akapit, kafelki „co potrafi agent" (3 kolumny),
  pasek liczb (wartość nad podpisem), przycisk „ZAPISZ SIĘ ZA DARMO" z kursorem, karta (PROWADZĄCY
  + nazwisko Black), pigułki TE SAME DANE → INNY MÓZG, pasek promptu (tekst zawija się), przypis
  w kroku 3, pogrubione zdanie w „Dla kogo", siatki/poświaty w tle, gwiazda przy zamknięciu.
  Montserrat (font-display) jak na desktopie. Kontakt mobile już był (route).
- Walidacja: 375/390 px retina przejrzane, hscroll ok 375–2560, desktop bez zmian (0.00%), build OK.

## 2026-10-29 (9) — webinar desktop v2 (Figma 479:1789)

- Hero: nowy opis + akapit „Na tym warsztacie… który:", 3 kafelki z ikonami (`features`), niebieski
  pasek liczb (`stats`), przycisk „ZAPISZ SIĘ ZA DARMO" 334×66 z kursorem, karta przesunięta o 106
  (wiersz CENA zamiast INWESTYCJA, nazwisko Montserrat Black 20), pigułki „TE SAME DANE → INNY MÓZG"
  pod kartą (`taglinePills`, zastępują tagline), pieczątka AI GYM (SVG), poświata + siatka w tle.
- Porównanie: pasek „promptu" nad kartami (`comparison.prompt`), nowe teksty, listy 440 szer.
- Przebieg: poświata + siatka w pasie, krok 3 z przypisem (`steps[].note`).
- Korzyści: sekcja 1258 szer., kolumny wyśrodkowane, pogrubione zdanie (`audience.textBold`).
- Zamknięcie: siatka pod przyciskiem, nowa gwiazda-strzałka, kursor; kontakt + POZNAJ NASZE KURSY
  (OnasKontakt w route, `#kontakt` = cel przycisków zapisu).
- FX/pieczątka: eksporty SVG z Figmy z wyciętym tłem strony (przezroczyste, ostre na retinie).
- Walidacja 1440×1028: sekcje = design ±7px, diff 7.4–11% (AA tekstu), hscroll ok 375–2560,
  `next build` OK. Mobile webinaru bez zmian układu (brak widoku mobile v2 w Figmie) — nowe teksty
  opisu i odbiorców widoczne też na telefonie.

## 2026-10-29 (8) — /o-nas mobile: usunięte glitche na niebieskim tle (przegląd całej strony)

- Figma `326:1050` bez zmian względem lipcowego renderu (diff 0.01%) — błędy były po naszej stronie.
- Opisy prowadzących (3 osoby): ramki przebudowane 1:1 z Figmy (Frame 20/21/22, 66/14/67, 71/72/73):
  szkło `rgba(255,255,255,.2)` + `backdrop-blur 25`, bio2 zaokrąglone tylko z lewej (bleed do prawej),
  bio1 szara z obrysem blue zaokrąglona z prawej, bio3 zaokrąglona, padding 30/52. Tekst Montserrat
  Medium 12, lh normal (było 12.5/15 → u Wiktorii wychodził poza ramkę). Ramka = flex z paddingiem
  (tekst nie może już wyjść poza nią).
- Konturowe gwiazdy STAR_OUTLINE jako czyste wektory z Figmy (`onas-m-star-o1/2/3.svg`, tła
  wycięte z eksportu) POD ramkami — wcześniej wycięte z renderu PNG (`onas-m-pr-l1/r1/l2a/l2b/r2/l3/r3`,
  usunięte) leżały NAD ramkami: linie przecinały tekst, przy lewej krawędzi ostre paski.
- Hero: logo `.AI` (`onas-m-logo-f.png`) oczyszczone z resztek robota (891 px niebieskich
  przebarwień), robot (`onas-robot-m-f.png`) bez białego koła po kropce logo (przesunięte względem
  kropki → biała obwódka); dziura domalowana z sąsiednich pikseli.
- Walidacja: sekcje opisów vs Figma 8.5–8.8% (AA tekstu), retina 2× przejrzana w całości,
  hscroll ok 375–2560, tsc czysty.

## 2026-10-29 (7) — kurs v3: „AI pod kontrolą od podstaw" (desktop + mobile)

- Figma `2279:2811` (desktop 1440×12531) / `2310:3040` (mobile). Treść i grafiki wyciągnięte
  przez subagenta: `src/content/kurs-ai-kontrola.ts` (slug `ai-pod-kontrola-od-podstaw`,
  zarejestrowany w `kursyV2`), assety `public/assets/kurs3/kontrola/` (webp 2×). 6 modułów, 13 lekcji.
- Szablon rozszerzony o parametry per kurs: `hero.backdrop: "circles"` (koła SVG, ukośne paski
  gradientem, kropki, niebieska gwiazdka), `hero.toolsNote`, `hero.pad`, `hero.image.bottom`,
  `ctaBand.variant: "modular"` (HK wersaliki, pasek 247), `benefits.bento.decorBox`.
  Kafle bento: 1 i 4 = `image` (wycinek eksportu 2× na tle kafla), 2 = grafiki-trio, 3 = slajdy.
- Karta „AI pod kontrolą" na home → `/kursy/ai-pod-kontrola-od-podstaw` (było `/#kontakt`).
- Fix: pigułka prowadzącego na mobile (375px) rozpychała stronę → `mobile.instructorPill`.
- Walidacja 1440×900: hero 8.2%, bento 5.4%, CTA 3.1%, program 7.8%, dla kogo 6.8%, FAQ 5.7%;
  wysokości sekcji = design ±10px; mobile 402 — układ zgodny (strona ~330px krótsza niż design);
  hscroll ok 375–2560; `next build` OK.
- DO WERYFIKACJI (Patryk): cena ([CENA] w designie, w danych 1500), wszystkie odpowiedzi FAQ,
  efekt modułu 04 (druga połowa wygląda na treść modułu 05), termin startu.

## 2026-10-29 (6) — kurs v3: „Z rozmowy do oferty" wg nowych widoków (desktop + mobile)

- Figma `2136:2432` (desktop 1440×10645) / `2139:1991` (mobile 402×14958); rendery
  `design-refs/kurs-v3/` (gitignore). Szablon KursV2Template z flagą `layout: "v3"`.
- Nowe komponenty: `K3Benefits` (bento 4 kafle; ilustracje w HTML/CSS z rejestru `BentoArt`:
  oferta-mock, grafiki-trio, slajdy, wycena-chart, image; ukośny marquee), `K3Program` (moduły:
  białe karty lekcji 3/2 kolumny, pigułka „N LEKCJE", pasek EFEKT MODUŁU), `K3Audience`
  („DLA KOGO JEST KURS"), `K3Faq` (akordeon `<details>` bez JS + JSON-LD FAQPage), `K3Mobile`
  (MBento3 — te same ilustracje przez `ArtCrop`, MProgram3, MAudience3, MFaq3).
- Zmiany w istniejących: K2Hero (wiersz „Start:" z `hero.startDate`, opis 560, padding v3),
  K2CtaBand wydzielony z K2Benefits (+ kursor), K2Enroll (nagłówek HK, „Start kursu:"),
  K2Mobile (teksty hero jak desktop, Start, sekcje v3). Kontakt + pasek POZNAJ NASZE KURSY =
  OnasKontakt z layoutem `KURS_KONTAKT` (route), nagłówek „MASZ PYTANIE O KURS? / NAPISZ DO NAS".
- Typy: `KursV2Page.layout`, `hero.startDate`, `benefits.bento`, `audience`, `faq`,
  `KursV3BentoArt` (+ `mobileCrop`).
- Walidacja 1440×900 (różnice = AA tekstu): bento 8.4%, CTA 8.6%, program ~6.5–10%,
  dla kogo 8.6%, FAQ 6.7%; wysokości sekcji = design ±5px (hero 854, bento 1560, CTA 262,
  program 3042/3047, dla kogo 568, cena 596/594, FAQ 778/780). Prowadzący: wysokość dopasowana
  do okna (PAD_Y, jak dotąd). hscroll ok 375–2560. Retina: zdjęcia kafli webp 2×.
- FAQ: w designie tylko jedna odpowiedź (placeholder) — pozostałe napisane ostrożnie, bez nowych
  faktów → DO WERYFIKACJI (Patryk).

## 2026-10-29 (5) — próg 3000px: skala 1:1 z designem

- `globals.css`: `@media (min-width: 3000px)` → `--workspace: 1440px`, `--hero-slack: 0px`
  (hero home: `min-height` używa `var(--hero-slack, 120px)`). Na 4K / ultra wide bez skalowania
  systemu strona ma rozmiar 1:1 z Figmą: hero 833, formularz 670 (było 953 / 744).
- Zmierzone: 3840×1900 i 3440×1300 → workspace 1440, hero 833; 2999×1300 bez zmian (wzór
  z wpisu (3)); 1440×833 piksel w piksel jak przed (0.00%); hscroll ok 375–2560.

## 2026-10-29 (4) — formularz kontaktowy mieści się na jednym ekranie

- Życzenie Patryka: cały formularz w wysokości ekranu. Wspólne komponenty
  `shared/ContactFormDesktop` (864 → 670) i `shared/ContactFormMobile` (864 → 618):
  niższe pola (50→44 / 42), mniejsze odstępy, pole wiadomości 186→110 / 96, mniejsze paddingi.
  Szerokość, fonty i kolory bez zmian. Eksport `FORM_SHRINK` / `FORM_M_SHRINK` — sekcje
  kontaktu na home, /o-nas i /manifest skracają się o tyle samo (prawa gwiazda desktop w górę).
- Walidacja (scroll do formularza): 1440×833 form 670, 1920/2560×950 form 744, 402×700 form 618,
  375×667 form 576, /o-nas 670, /manifest 639 — wszystkie mieszczą się w oknie. hscroll ok.
- Odstępstwo od designu (świadome, decyzja Patryka) — formularz w Figmie nadal 864.

## 2026-10-29 (3) — ultra wide: skala zależna od wysokości okna + tła do krawędzi

- `--workspace` = `min(1600px, calc(720px + 50vw), max(1440px, calc(100svh * 1440 / 833)))`
  (było `min(1760px, 720px + 50vw)`): max skala 1.11× designu, a na niskich szerokich oknach cała
  strona ma skalę hero zamiast rosnąć wszerz. ≤1440 bez zmian.
- Home desktop: tła sekcji do krawędzi ekranu (manifest blue, pasek lime/biały, prowadzący
  szary/blue, kontakt blue + biała linia CTA, stopka #000ae6 + linia) — gradienty z proporcji canvasu.
- Hero home: `h-svh` → `min-height: min(100svh, poster + 120px)` — 100svh jak dotąd, ale na
  ultra wide/tablecie pionowo bez ogromnych szarych pasów nad/pod hero.
- Walidacja: 1440×833 i 402×875 piksel w piksel jak przed zmianą (0.00%), 1440×900 ta sama
  wysokość strony, hscroll ok 375–2560, zrzuty 2560×950 / 3440×1300 / 5120×1300.
- Otwarte: /o-nas i dół /manifest nadal mają tła „w pudełku" na ultra wide (→ TODO).

## 2026-10-29 (2) — home: „ostatni szlif" Victorii (Figma `5ufIXE17KqmkvVrfSVzUFE`), desktop + mobile

- Źródło: nowy plik `5ufIXE17KqmkvVrfSVzUFE` (home 245:3490 desktop 1440×9284, 375:1738 mobile
  402×11657). Rendery + metadane: `design-refs/home-v2-*`. Zmiany wyznaczone porównaniem STARY design
  ↔ NOWY design (nie strona ↔ design — hero mobile jest świadomie wg ramki 2043:1621).
  Narzędzia: `design-refs/tools/rowalign2.js`, `tmpl-find.js` (NOBG), `unmix-blue.js`,
  `unmix-gray.js`, `unmix-2bg.js` (flood-fill, TH).
- Decyzje Patryka (w sesji): karta 1 = nowy kurs „AI pod kontrolą od podstaw" (CTA `/#kontakt`,
  podstrona później); kafle „NIE CZEKAJ" zostają ukryte; webinar = nowe teksty, daty z danych.
- DESKTOP:
  - Hero: delty z metadanych (nagłówek/kicker −10, tagline −13/−12, przycisk −8, .AI −16/−2,
    gwiazdy −10) + kursor przy przycisku (`kursor.svg`). Diff 1.20%.
  - Manifest (2240:1628) przepisany: robot z hologramami (`manifest-robot-v2.webp`, ten sam
    PNG na mobile), lineB pod lineA + linia z gwiazdkami (`gwiazdka4-*.svg`), lineC 3 linie,
    akapit + „wniosek" z lime kreską (`HomeManifest.conclusion`), gwiazdki wycięte z renderu.
    Typografia PL: `lib/typo.ts` `nbspOrphans` (a/i/w/z… sklejone nbsp — tak łamie Figma). 2.87%.
  - Kolejność: pasek TY DECYDUJESZ + marquee PRZED kartą webinaru (`app/page.tsx`).
  - Karta webinaru (2204:1684): karta 612 wys., kolumna prowadzącego (nazwisko Black 24 |
    PROWADZĄCY | cena), nagłówek z małym „KTÓRY" (`promo.headingSmall`), nowe teksty
    (`content/webinary.ts`), nowy panel zdjęcia (`w-ad-panel-piotr-v2.webp`), gwiazda wycięta
    z dwóch teł. ~4.9% (różnica = „Termin wkrótce" zamiast dwóch pól daty).
  - Karty kursów v2 (`DnaCard.pill`, `DnaCard.art` panel|robot): sidebar 15px, pigułka ✦,
    kursor przy CTA, karta 1 = szary panel z robotem (eksport 2317:3152), karta 2 = robot
    z alfą + 2 obrócone gwiazdki SVG; nowe eksporty helis 1/3 (`dna1-v2`, `dna3-v2`),
    gwiazda-strzałka z renderu. 2.83%.
  - Prowadzący: tło od 63.4 (było 103), treść −89.6 → 1.46%. Kontakt: pasek „POZNAJ NASZE
    KURSY" (`Kontakt.coursesCta`), canvas 1649, treść +143 → 1.34%.
- MOBILE:
  - Hero: bez zmian w designie (tylko kursor — nie dodany, nasz hero ma własny układ).
  - Manifest od y1520: nowy układ jak desktop (robot + gradient w tło, pill obrys 2px blue,
    17px), CTA na białej linii; ManifestBarMobile = AI TO NARZĘDZIE + pasek + szary pas
    JAK BARDZO + NOWY biały pasek haseł (marquee). 2.35% (górna połowa).
  - Karta webinaru mobile wg 2245:1665 (układ przepływowy, pionowy pasek 44, zdjęcie 290×340,
    max 520px na tabletach) — zastępuje autorską wersję.
  - Karty kursów: canvas 1780 od końca webinaru; karta 1 w układzie 715 + pigułka (kadr robota
    `m-card-ai-kontrola.webp`), karta 2 = nowy układ 841 z robotem i gwiazdkami; helisa
    `m-dna3-v2.webp`. Karta 2 ~9.5% (łamanie tekstu).
  - Prowadzący: Piotr −98, Wiktoria −196, sekcja 2088, duża konturowa gwiazda przy nagłówku
    (`prow-star-big-m-f.png`) → 3.53%. Kontakt: canvas 1295.5 (−47.5).
- Walidacja: tsc czyste, eslint bez nowych błędów (2 stare w StopkaSection), hscroll ok
  375–2560, tablet 768 sprawdzony.
- Figma: ~30 wywołań MCP na pliku `5ufIX…` (limit planu nieznany).
- Decyzje Patryka po review (BotFarm): na mobile pokazujemy tylko nowy kurs (bez starego
  „Agent AI w Twoim biznesie"); przerwa przed HUMAN/MACHINE zostaje bez zmian.

## 2026-10-29 — mniejszy obszar roboczy na szerokich ekranach

- `globals.css`: `--workspace: 2400px` → `min(1760px, calc(720px + 50vw))`. 1440 bez zmian;
  1920 → 1680 (margines 120px); 2560/3840 → 1760 (wcześniej 2400 = ~1.7× skali designu na 4K).
  Wszystkie użycia idą przez `var(--workspace)` (max-w, hero, kurs-v2, webinar) — bez zmian w komponentach.
- Walidacja: shot.js 1440/1920/2560/3840 + pomiar lewej krawędzi (1/120/400/1040px), hscroll ok 375–2560.
  Uwaga: dev server nie złapał zmiany w globals.css przez HMR — pomógł restart + usunięcie `.next`.
- Zablokowane: redesign home z nowego pliku Figma `5ufIXE17KqmkvVrfSVzUFE` — w tej sesji brak
  połączenia z Figma MCP (→ TODO).

## 2026-10-28 (2) — audyt SEO + robots.txt

- Audyt wyrenderowanego HTML 13 adresów (dev): title/description/canonical/OG/robots/h1/
  nagłówki/alt/landmarki/JSON-LD/301/404 + robots.txt i sitemap.xml.
- `robots.ts`: grupa crawlerów AI (wyszukiwarki ChatGPT/Claude/Perplexity/Gemini/Apple/Bing)
  jawnie dopuszczona z tymi samymi Disallow (bot z własną grupą ignoruje „*”); usunięty `Host`
  (dyrektywa tylko Yandexa).
- Regulamin/Polityka: title „Regulamin — kompetencje.ai | Kompetencje.ai” → „Regulamin | Kompetencje.ai”.
- Walidacja: curl robots.txt i tytułów, `tsc --noEmit` czyste.
- Otwarte (→ TODO): webinar `published:false` (noindex, poza sitemapą, a promowany na home);
  description >160 zn. na 5 stronach; 404 po angielsku (brak `not-found.tsx`); og:image home
  w dev = localhost (sprawdzić na produkcji); ~75% obrazków z `alt=""` — zweryfikować,
  które nie są dekoracyjne.

## 2026-10-28 — analiza strony + podstawy SEO

- Analiza stanu: build/tsc czyste, lint 15 błędów (nieblokujące), waga stron 10–25 MB
  (PNG przez `<img>`, desktopowe wideo pobierane na mobile, prefetch ciągnie obrazki home),
  ~60 MB nieużywanych plików w `public/assets`. Wnioski → TODO.
- `src/lib/seo.ts`: `ogFor(path, title, desc)` — type/locale/siteName/url/obrazek; Next łączy
  metadane płytko, więc OG z podstrony gubił `og:image` i siteName (sprawdzone na buildzie).
- `app/robots.ts` (+ sitemap URL; poza produkcją Vercela `Disallow: /`), `app/sitemap.ts`
  (7 URL-i: home, o-nas, manifest, 2 prawne, 2 kursy; webinar `published:false` pominięty),
  `app/opengraph-image.tsx` (brand blue, HK Modular, logo na jasnym kaflu).
- JSON-LD EducationalOrganization + WebSite w layout; `twitter:card` summary_large_image;
  kanonik `/` tylko na home (w layoucie dziedziczyłby go np. 404).
- Kursy z treścią zastępczą (`bezpieczenstwo-aplikacji`, `prompt-engineering`,
  `tworzenie-tresci-z-ai`) → `noindex, follow` + poza sitemapą (`isPlaceholderCourse`).
- Stopka SZKOLENIA `/szkolenia` (404 na każdej stronie) → `/#kursy`.
- Walidacja: next build, curl robots/sitemap/OG/meta na 10 adresach, render OG obejrzany.
- Świadomie NIE zmienione: podwójny h1 (wariant desktop + mobile w DOM, jeden ukryty
  `display:none`, ten sam tekst) — usunięcie h1 z wariantu mobile szkodziłoby mobile-first
  indexingowi.
- Otwarte: wydajność (next/image, wideo per breakpoint, prefetch, sprzątanie public/).

## 2026-10-15 (7) — ukryta sekcja 3 kart kursów na home

- `app/page.tsx`: flaga `SHOW_KURSY_TILES = false` — `KursySection` (3 karty kursów, desktop)
  nie jest renderowana; komponent, animacje i dane `homePage.kursTiles` bez zmian
  (włączenie = `true`). Kotwica nav `/#kursy` siedzi na DnaSection — działa dalej.
  Przejście DNA → HUMAN/MACHINE sprawdzone na 1440 (czyste), hscroll OK.

## 2026-10-15 (6) — karta reklamy webinaru na stronie głównej

- Design: Figma `2085:1762` („REKLAMA WEBINARU – V5", 1440×720). `components/webinar/WebinarPromo.tsx`:
  ≥1024 poster 1:1 (cqw, teksty HTML zamiast krzywych z Illustratora, tło z siatką, panel
  ze zdjęciem = eksport `2085:1829`, plakietka AI GYM, gwiazdy, ikony pigułek), <1024 układ
  pionowy (autorski). CTA → `/webinary/[slug]`.
- Dane: `WebinarPage.promo` (pigułki, nagłówek — ostatnia linia limonkowa, opis, zdjęcie,
  pigułka kompetencji, forma, CTA, dopisek); prowadzący, cena („BEZPŁATNIE") oraz data
  i godziny („[DD.MM.RRRR]", „[GG:MM–GG:MM]" z designu) liczą się z `details` — bez
  terminu pokazuje „Termin wkrótce". Wspólne formatowanie dat: `src/lib/webinar.ts`.
- Home: `homePage.webinarSlugs` (lista kart — na razie 1); sekcja wstawiona między manifest
  a pasek TY DECYDUJESZ. ManifestSection rozdzielony na `ManifestSection` (poster 0..1130 /
  mobile 0..2150) + `ManifestBar` (pasek + marquee / „AI TO NARZĘDZIE" + pasek) — wygląd bez
  zmian (pasek vs Figma 1.77%, kolumna tekstów manifestu 3.75%).
- Strona webinaru jest teraz podlinkowana z home, ale nadal `published: false` → noindex.
- hscroll czysty 360–2560; tsc czysty.

## 2026-10-15 (5) — strona szczegółów webinaru (WebinarTemplate)

- Design: Figma `2002:1803` („WEBINAR – przed aktualizacją 07.10", wskazany przez Patryka;
  nowsza wersja `479:1789` ma dodatkowo avatar prowadzącego, okrągłą plakietkę i siatki FX).
- Route `/webinary/[slug]` (NIEpodlinkowany w serwisie); `published: false` → `noindex, nofollow`.
- Model `WebinarPage` (types.ts) + `content/webinary.ts` (getter `getWebinarPage`): pigułka,
  tytuł (linie przed/akcent/po), tagline, opis (RichSeg), CTA zapisu (`register.href` — na
  razie /#kontakt), karta szczegółów (prowadzący, `start` ISO → „piątek, 23.10, godz. 18:00"
  Europe/Warsaw lub „Termin wkrótce", format, czas, narzędzie, cena 0 → „Bezpłatnie"),
  porównanie (opcjonalne), przebieg (dowolna liczba kroków, numeracja auto), korzyści,
  dla kogo + bezpieczeństwo, zamknięcie.
- `components/webinar/WebinarTemplate.tsx`: ≥1024 1:1 z designem (cqw płótna 1440, płótno
  ograniczone wysokością okna — intro + CTA w 1. ekranie), <1024 układ autorski. JSON-LD
  schema.org/EducationEvent (gdy podany termin: start/end, online, oferta, prowadzący).
- Treść pierwszego webinaru 1:1 z designu; placeholdery designu: prowadzący → „Piotr Małysz"
  (z nowszej wersji designu), termin → pusty („Termin wkrótce"), cena → bezpłatnie.
- Walidacja: sbs z renderem Figmy 1440 (zgodne), 1024, 402; hscroll czysty 360–2560; tsc czysty.

## 2026-10-15 (4) — zapis → Stripe Checkout → ekrany wyniku + webhook

- Server Action `zapiszNaKurs`: walidacja → `zgloszenia` (oczekuje) → Stripe Checkout Session
  (ui_mode hosted_page, locale pl, client_reference_id = id zgłoszenia, metadata, cena
  z `kurs.price` przez price_data albo opcjonalne `kurs.stripePriceId`, sesja 1 h) →
  `{status:"redirect", url}`; modal pokazuje „Przechodzimy do płatności…" i przekierowuje.
- Ekrany (brak designu → w estetyce formularza, `K2ResultScreen`, px, karta maks. 720):
  `/kursy/[slug]/dziekujemy?session_id=…` — stan z API Stripe: opłacone / w toku (płatność
  odroczona) / niedokończone / błąd (zły, cudzy lub wygasły link); `/kursy/[slug]/platnosc-przerwana`
  (cancel_url). noindex.
- Webhook `POST /api/stripe/webhook` (podpis STRIPE_WEBHOOK_SECRET, idempotentny): completed(paid)/
  async_succeeded → oplacone (+ payment_intent, kwota), async_failed/expired → porzucone
  (tylko z „oczekuje"), charge.refunded → zwrot. 500 przy błędzie bazy → Stripe ponawia.
- `src/lib/stripe.ts` (klient server-only, appUrl); usunięty stary szkic `/api/checkout`;
  `.env.example` + `STRIPE_INTEGRATION_TODO.md` przepisane pod nowy przepływ.
- Testy: ekrany błędu (brak / fałszywy session_id) i przerwania na 1440 i 402; webhook bez
  podpisu → 400; stary endpoint → 404; tsc czysty. NIE testowane end-to-end (wymaga zgody —
  zapis do Supabase — i STRIPE_WEBHOOK_SECRET ze `stripe listen`).

## 2026-10-15 (3) — kurs v2: formularz zapisu (modal / panel od dołu)

- Design: laptop `2034:2000` (modal 1080, podsumowanie | formularz), mobile `2037:1761`
  (panel od dołu, zwinięte podsumowanie „Co jest w cenie?"). `K2EnrollModal` (client):
  ≥1024 dwie kolumny, 768–1023 wąski modal 560 + kompaktowe podsumowanie, <768 panel od dołu.
  Rozmiary w PX (nie cqw) — na 1920/2560 modal zostaje 1080 (bez „plakatowości");
  max-height okna, przewija się kolumna formularza. Animacje k2-fade/k2-sheet (reduced-motion off).
- Otwieranie: delegacja kliknięć na `[data-enroll-open]` (`ENROLL_OPEN` w k2.ts: hero, pasek CTA,
  karta ceny — desktop i mobile, przyklejony pasek) + adres `#zapisz-sie`. Przycisk przy
  prowadzącym dalej przewija do ceny. Esc / X / klik w tło zamyka; blokada scrolla; pułapka Tab.
- Pola = tabela `zgloszenia`: imię, nazwisko, e-mail, telefon (opc.), faktura → NIP + firma,
  regulamin (wymagany), newsletter. Walidacja wspólna klient/serwer `src/lib/zapis.ts`
  (e-mail, NIP z sumą kontrolną, wymagane pola).
- Server Action `app/kursy/[slug]/actions.ts` (`zapiszNaKurs`): walidacja → insert do
  `zgloszenia` (status „oczekuje", kwota z ceny kursu) → stan „Dziękujemy". Bez SUPABASE_* →
  stan „Zapisy online ruszają lada dzień" (nic nie zapisuje). Stripe NIEaktywny (decyzja).
- Model: `KursV2Page.name` (nazwa zdaniem — podsumowanie, pasek, JSON-LD), `instructor.avatar`,
  `enroll.form {note, submitLabel, footnote}`; usunięte `enrollHref` (zastąpione formularzem).
- Testy (bez wysyłki — w .env.local jest SUPABASE_URL, realny zapis trafiłby do bazy):
  walidacja pustego/błędnego formularza (0 POST), NIP poprawny/niepoprawny, Esc, otwarcie
  z #zapisz-sie, układy 402/820/1024/1440/1920/2560. tsc czysty.

## 2026-10-15 (2) — kurs v2: wersja mobile (<768) + parametry mobilne

- Design mobile (402): hero `2056:1971`, „Co zyskasz" + przyklejony pasek `2056:2031`,
  prowadzący `2069:2015` — wdrożone 1:1 w `components/kurs-v2/K2Mobile.tsx` (flow px,
  treść max 520 px). Bez widoku mobile w Figmie → autorskie w tej samej estetyce: pasek CTA,
  PROGRAM (napis z białym obrysem, moduły, owal efektu jako zaokrąglona ramka), zapis (biała
  karta). Stopka = wspólna.
- Przyklejony pasek ceny `K2StickyBar` (client): pokazuje się po przewinięciu karty ceny hero,
  znika od sekcji zapisu w dół. Liczony scrollem (rAF) — IntersectionObserver nie łapał
  skoków przewijania (kotwice). Przetestowane 360/402/600.
- Parametry mobilne w `KursV2Page` (wszystkie opcjonalne, brak = tekst desktopu):
  `mobile.{kicker, lead, description, assurances, instructorPill, stickyName, stickyCtaLabel}`,
  `benefits.items[].{titleMobile, textMobile}`, `instructor.photoMobile`;
  `hero.extraStats` = `{icon, value, label}` (desktop „value label", mobile value nad label);
  `pluralWord` (moduły/lekcji bez liczby) do statystyk mobile.
- Zdjęcie prowadzącego mobile = eksport kadru z Figmy (`2069:2023`), inny niż desktop.
- Różnice z designem świadome: górny pasek logo/burger = wspólny MobileTopBar (+14 px);
  zapewnienie „Prowadzi praktyk z 6 latami w fintechu" (mobile) ≠ desktop „7 latami wdrożeń
  w firmach" — użyty tekst desktopu, do decyzji Patryka (pole `mobile.assurances` gotowe).
- Walidacja: tsc czysty; mobile sbs vs Figma (hero, korzyści, prowadzący zgodne); hscroll
  czysty 360/402/600; desktop bez zmian.

## 2026-10-15 — kurs v2 jako wielokrotnie używalny szablon (KursV2Template)

- `KursV2Template` (components/kurs-v2) przyjmuje jeden dokument `KursV2Page`; route
  `/kursy/[slug]` renderuje go dla kursów z `kursyV2`. Typ przebudowany pod CMS:
  `price {value, currency, note}` (jedno źródło: hero, karta zapisu, JSON-LD), `enrollHref`,
  `hero.image {src, alt, width?, height?, offsetX?, decorStar?}`, `hero.titleLines[]` (dowolna
  liczba, pigułka opcjonalna), `hero.extraStats`, narzędzia/tag dolny/owal efektu opcjonalne.
- Automatycznie: „N moduły / M lekcji" (polska odmiana, `plural`), numeracja modułów,
  tytuł karty zapisu, punkt „N moduły i M lekcji online", JSON-LD schema.org/Course (offer
  z ceną, prowadzący, sylabus) — SEO.
- Korzyści: zygzak dla dowolnej liczby kart (pierwsze 4 pozycje 1:1 z designu, dalej rytm
  ~352 px, strzałki między każdą parą).
- Grafika hero kotwiczona do dołu hero (styk z panelem) — działa dla dowolnej grafiki.
- Weryfikacja: kurs „Z rozmowy do oferty" po refaktorze identyczny (lewa kolumna hero 0/0 px,
  sekcje bez zmian; hero vs Figma 17.8% = celowo obniżony robot). Tymczasowy kurs testowy
  (3 linie tytułu bez pigułki, 5 korzyści, 2 moduły w tym 1 bez owalu, 1+3 lekcje, cena
  12 000 PLN, bez narzędzi i tagu dolnego, inna grafika bez gwiazdy) wyrenderował się
  poprawnie — USUNIĘTY po teście. tsc czysty.

## 2026-10-14 (2) — kurs „Z rozmowy do oferty w 60 minut" (szablon kurs v2), desktop

- Design: Figma `5ufIXE17KqmkvVrfSVzUFE`, frame `2009:1973` (1440×8186, auto-layout).
  Nowy route `/kursy/z-rozmowy-do-oferty` — szablon v2 obok starego (stare slugi bez zmian).
- Content: `src/content/kurs-v2.ts` + typ `KursV2Page` (getter `getKursV2Page`); komponenty
  `components/kurs-v2/` (K2Hero, K2Benefits [+pasek CTA], K2Program, K2Instructor, K2Enroll),
  helper `k2.ts` (c = px/14.4 cqw, fs = podłoga fontu). Layout flex jak w Figmie, wymiary
  w cqw → proporcjonalnie 768–2560 (cap workspace). Nav = SiteNav, stopka = StopkaSection
  (design ma własną uproszczoną stopkę — NIE wdrożona, do decyzji).
- Fonty: design używa **Audiowide** (numery modułów, MODUŁ, hasła, imię, owale, pigułka) —
  dodany przez next/font (`--font-audio`); HK Modular tam, gdzie w designie (przyciski,
  etykieta hero; notatka designera „Audiowide → zamień na HK Modular" tylko na przycisku hero).
- Pułapki znalezione: (1) Tailwind v4 `leading-normal` = 1.5, NIE CSS normal — Figma
  „leading-[normal]" → `leading-[normal]`; (2) preflight `img{max-width:100%}` ścieśniał
  robota hero (596 zamiast 635) → `max-w-none`; (3) Montserrat w Figmie minimalnie szerszy —
  szer. punktów programu 539 (zamiast 540) daje łamania 36/36 identyczne; (4) lh punktów 26px
  (1.625), nie 1.65; (5) zdjęcie prowadzącego = eksport kadru node'a 2023:1976 (crop z Figmy).
- Wysokości sekcji = design ±2px (827/1795/262/3227/1243/572). Diff 1440: nav 2.6% (render
  Figmy), hero 3.9%, korzyści 1.3%, CTA 1.3%, program 4.2%, prowadzący 6.1% (AA tekstu, wagi
  Montserrat Medium), zapis 2.3%. hscroll czysty 360–2560 (11 szerokości).
- Tablet 768–1023: te same komponenty z podłogami fontów; przycisk hero min-width, lead
  zawija się, owal „efekt modułu" rośnie z tekstem. Mobile <768: tylko top bar + stopka —
  czeka na osobny design (decyzja Patryka).
- Przyciski „zapisz się" → kotwica #zapis; przycisk w karcie ceny tymczasowo → /#kontakt
  (docelowo formularz zapisu + Stripe).
- `scripts`: narzędzia `design-refs/tools/k2-sbs.js`, `k2-sections.js` (NODE_PATH=./node_modules).
- **Poprawka Patryka (błąd designu):** robot hero ma DOTYKAĆ niebieskiego panelu „Co zyskasz"
  (w Figmie wisiał ~34px nad nim). Robot kotwiczony do dołu hero (bottom −24.5 = padding
  sekcji korzyści + 0.5px zakładki) — zweryfikowane 768–2560: styk 0.3–0.8px, hero dalej 827.
- **Skala zależna od wysokości okna (prośba Patryka, monitor 1920×1200):** płótno kursu v2
  ma max-width `min(--workspace, 100svh × 1440/827)` (`K2_MAX_W` w k2.ts, inline — zmienna
  w :root w globals.css była wycinana z arkusza). Całość skaluje się JEDNYM współczynnikiem
  (szerokość i wysokość), nav + hero mieszczą się w 1. ekranie: 1920×1080 → płótno 1881,
  1920×969 → 1687, 1440×780 → 1358, 2560×1300 → 2264; 1440×900 bez zmian (=design).
  Tła sekcji pełnej szerokości; tło programu: lewy pas do krawędzi okna + prawa krawędź
  wydłużona marginesem, żeby zaokrąglony róg leżał przy krawędzi okna (bez „schodka").
  1366×650: hero 655 (podłogi fontów), karta ceny w całości w 1. ekranie.
- **Prowadzący i program — dopasowanie do wysokości okna (prośba Patryka):** prowadzący:
  płótno ≤ 100svh×1440/1043, odstęp pionowy min(120, max(20, (100svh − panel)/2)) → cała
  sekcja = 1 ekran; program: płótno ≤ 100svh×1440/1170 → najwyższy moduł (02) w 1 ekranie.
  Podłogi fontów w tych sekcjach obniżone (punkty programu 11, teksty prowadzącego 11–12).
  Wynik: 1920×1080, 1920×969, 1440×900, 2560×1300 — obie sekcje OK; 1440×780 — moduły OK,
  prowadzący +7px; okna ≤730 wys. (np. 1366×650) — nie mieszczą się (tekst nie może maleć
  poniżej czytelności; brak 19–159px).

## 2026-10-14 — /manifest v2 z designu designera (desktop 1:1) + mobile/tablet

- Design: NOWY plik Figmy `5ufIXE17KqmkvVrfSVzUFE` („komp.ai-07.10.26-23-40"), frame
  MANIFEST `458:1640` (1510×5703 — płótno 1510, nie 1440!). Plik roboczy
  `XsorNfllBh0GzGUQraAmtS` NIE ma manifestu (stara kopia z lipca).
  Uwaga: designer wkleił do frame'u ZRZUTY naszej strony (nav y0–109, bela ze statem
  y1145–1609) — nav zostaje SiteNav (spójność podstron), bela odbudowana z pomiarów zrzutu.
- Desktop ≥1024 (`ManifestDesktop`, poster 1510 → c=px/15.1 cqw): hero (MANIFEST
  Montserrat 900 z limonkowym obrysem 10px paint-order, niebieski boks r100 z akapitami
  i markerami lime, NOWY robot `rob 1` z rawImages → mf-robot.webp 80 KB, limonkowa karta),
  bela 25–50% (count-up), sekcja lime (rounded-bl 245: elipsa „przyszłość", gwiazdy,
  wielka biała gwiazda, nagłówek + akapit, niebieski boks), zamknięcie (kicker HK +
  3 belki lime), kontakt = OnasKontakt z geometrią `MANIFEST_KONTAKT` (biała linia,
  nagłówek HK 28 pitch 49 bez scaleX, formularz w skali 1440/1510, gwiazdy z eksportu).
  Podłogi fontów (max(px, cqw)) dla laptopów 1024–1280.
- Gwiazdy/elipsa = eksporty SVG node'ów z wyciętym wypieczonym tłem (`design-refs/tools/mf-clean.js`
  zapisuje origin z translate prostokąta frame'u — pozycje 1:1, zweryfikowane overlayem).
- Diff vs render (1510): hero 2.94% · stat 2.25% · lime 1.65% · zamknięcie 1.93% · kontakt 1.62%
  (nav 4.46% — w designie zrzut innej szerokości). Interlinia nagłówka „Przyszłość należy…"
  zmierzona (pitch 60.7), Figma podaje 100.88% — błędnie.
- Mobile/tablet <1024 (`ManifestMobile`): brak widoku w Figmie → układ autorski
  w estetyce v2 (stack, kolumna max 720, robot zachodzi na boks, karta przykrywa cięcie,
  elipsa jako mini-poster cqw). Kontakt na <1024 = OnasKontaktMobile z capem 560px
  (na tablecie desktopowy formularz miał etykiety ~7px); pasek CTA dociągnięty gradientem.
- Współdzielone komponenty rozszerzone (zachowanie /o-nas bez zmian — domyślne wartości):
  OnasKontakt (`layout`, `lineClass`, `visibilityClass`, clip-path dołu), OnasKontaktMobile
  (`visibilityClass`, `capPx`), ContactFormDesktop (`scale`), RichSeg (`weight`, `trackEm`),
  Manrope +600. Typ `ManifestPage` przebudowany pod v2; treść wg designu
  („Twoim przewodnikiem", „Przyszłość należy do tych, którzy ją tworzą").
- Robot power-on — NOWE wideo dla nowego robota (ta sama sesja, druga część):
  Seedance 2.0 1080p 5 s BEZ audio (2 warianty, 60 kr) + Nano Banana Pro (2 kr) do
  przeniesienia robota na tło magenta (#FF00FF; robot nie ma magenty) = end_image.
  Tło wycięte lokalnie (`design-refs/tools/mf-key.js`: alfa z min(R,B)−G, odmieszanie
  koloru od magenty → bez różowej obwódki) do MP4 „packed alpha" (kolor | maska obok
  siebie, 1620×1080, 600 KB). Odtwarzacz `AlphaVideo` (WebGL składa RGBA na canvasie —
  działa też w Safari/iOS, gdzie WebM z alfą nie działa); `RobotVideo` = dopasowanie
  ramki wideo do bboxa robota z designu (skala zmierzona, różnica <1%). Fallback
  (reduced-motion / brak WebGL / błąd) = ostatnia klatka webp. Wariant B aktywny,
  wariant A + porównanie w `design-refs/manifest-v2/video/` (porownanie-A-B.mp4).
  Upload plików do Higgsfield z tego komputera NIE działa (Cloudflare odrzuca TLS do
  upload.higgsfield.ai) — obejście: `media_import_url` z publicznego URL assetu Figmy.
  Stary `RobotPowerOn.tsx` + stare mp4 nieużywane (do usunięcia po akceptacji).
- `scripts/shot.js`: fallback gdy dev server Next 16.2 nie osiąga networkidle.
- Walidacja: tsc czysty; zrzuty 402/375/768/1024/1510/2560; hscroll czysty na 360–2560
  (12 szerokości) dla /manifest, /o-nas i / (regresja współdzielonego kontaktu).
- Otwarte: review Patryka; nowe wideo power-on dla nowego robota (opcjonalnie);
  tablet 768–1023 na home i /o-nas ma ten sam problem małego formularza.

## 2026-10-08 — Stripe Checkout (hosted), szkielet

- Zależność `stripe` 23.0.0 w komp-ai; endpoint `POST /api/checkout`
  (`src/app/api/checkout/route.ts`) — tworzy Checkout Session z parametrami z Checkout Studio
  (`ui_mode: hosted_page`, `mode: payment`) i robi 303 redirect na `session.url`.
- `.env.local` z placeholderami `STRIPE_SECRET_KEY`, `DOMAIN` (poza gitem).
- Walidacja: `tsc --noEmit` czysty. Nie testowane end-to-end (brak kluczy i Price ID).
- Otwarte (szczegóły w STRIPE_INTEGRATION_TODO.md): Price ID per kurs, strona /success,
  podpięcie przycisków zakupu, webhook realizacji zamówień.
- Decyzja Patryka: checkout zostaje jako DRAFT (nieaktywny).
- Zaprojektowany flow formularza zapisu + płatności (ustalenia w TODO.md → „Odłożone”):
  1 formularz = 1 uczestnik, lista zgłoszeń w Supabase (panel, bez /admin), status tylko
  z webhooka, faktury/KSeF później, hosting Vercel, Stripe sandbox.
- Schemat bazy `komp-ai/supabase/migrations/0001_zgloszenia.sql` (tabela zgloszenia, RLS bez polityk) —
  NIE uruchomiony na żadnej bazie.
- Następna sesja: zależnie od Figmy — widok formularza (na razie bez obsługi bazy),
  a po założeniu Supabase backend (zapis, sesja Stripe, webhook, /success).
## 2026-09-17 — kurs „Z ROZMOWY DO OFERTY W 60 MINUT", CourseContent, mobile strony kursu

Branch `feat/zmiany-z-promptu` (NIECOMMITOWANE — czeka na review Patryka).

- **Nowy model treści kursu** `src/content/courses/` (typ `CourseContent` = przyszły
  schemat CMS-a; jeden plik na kurs; `getCourse(slug)`/`getCourseSlugs()`/`courseStats()`
  re-eksportowane z `content/index.ts`). Stary `content/kurs.ts` + typ `KursPage` usunięte
  (pola `dlaKogo`/`marqueeText`/`kontaktHeadingLines` do niezbudowanej sekcji DLA KOGO —
  w historii gita). Liczby na pasku hero liczone z danych (polska liczebność).
- **Nowy kurs** `z-rozmowy-do-oferty` (treść ostateczna od Patryka, 3 moduły / 9 lekcji).
  Stara treść → `agent-ai-w-twoim-biznesie` (fallback dla `bezpieczenstwo-aplikacji`,
  `prompt-engineering`, `tworzenie-tresci-z-ai`). 301 `/kursy/automatyzacja-pracy-z-ai` →
  `/kursy/z-rozmowy-do-oferty` (next.config, `statusCode: 301`).
- **Szablon kursu desktop → układ przepływowy** (hero lewa kolumna, panel CO ZYSKASZ,
  panel PROGRAM): odstępy przepisane z różnic `top` Figmy, stara treść renderuje się
  1:1 (pomiar DOM: H1 184/274/361, benefity ±4px, moduły/lekcje co do piksela; jedyna
  odchyłka: ostatnia lekcja modułu 2 o 18px wyżej — design miał tam pitch 197 zamiast 179).
  Linie H1 dopasowywane per linia do szerokości 527px (`shared/FitText`, reguła
  designera „każda linia równej szerokości"). Dymek podsumowania = CSS-elipsa + gwiazdy
  SVG (bake 330×140 nie mieści ~130 znaków). Kolumna lekcji 576px, `whitespace-nowrap`
  usunięte.
- **Wersja mobilna strony kursu** (nowa; brak projektu w Figmie — przepływ px jak
  /manifest): hero (top bar, H1 FitText, lead, meta, kadr robota jak desktop), panel
  CO ZYSKASZ, kicker + PROGRAM (stroke) bleed na panel, moduły w kolumnie z dymkiem
  POD lekcjami, closing + przycisk full-width, istniejąca stopka mobile.
- **Strona główna**: karta DNA #2 → „Z ROZMOWY / DO OFERTY / W 60 MINUT", nowe body,
  link do nowego sluga, cena 1500 PLN brutto; wszystkie ceny „netto" → „brutto"
  (KursySection renderuje dopisek z danych zamiast zahardcodowanego „netto");
  linie tytułu karty DNA desktop przez FitText (nowe linie 312px > slot 297px).
- Walidacje: tsc czysty, `next build` OK, eslint = 6 błędów identycznych z masterem
  (nie w zmienionych plikach), hscroll 375–2560 czysty (kurs nowy, kurs stary, home),
  zrzuty 390/768/1280/1440/1920, `curl -I` 301, diff home przed/po ograniczony do kart.
- Otwarte: „8 lekcji" z briefu vs 9 lekcji w danych (liczone z treści — pasek pokazuje 9);
  `cta.href: "#kontakt"` — na stronie kursu nie ma sekcji kontakt (jak dotąd; ewent. `/#kontakt`);
  pogrubienia w leadzie starego kursu spłaszczone (schemat `lead: string`);
  mobile kursu do review Patryka (decyzje projektowe własne).

## 2026-07-31 (podsumowanie sesji) — /manifest z wideo, roboty Higgsfield, przycisk stopki

- **Przycisk „na górę" w stopce** (commit „stopka"): ScrollTopButton w obu wariantach,
  natywny smooth scroll (bez konfliktu z lockiem HumanMachine), podskok co 3,5 s.
- **Nowy robot w sekcji Manifest na landingu** (commit „update robota na landingu"):
  wariant „visor" wygenerowany w Higgsfield (Nano Banana Pro, referencja = stary robot),
  4 propozycje w design-refs/robot-proposals/; podmiana glob-robot-f.png i m-glob-f.png
  z dopasowaniem bbox alfy. ⚠ Odstępstwo od Figmy (świadoma decyzja).
- **Wideo dłoni HUMAN/MACHINE 30% szybciej** (playbackRate 1.3, desktop + mobile).
- **Podstrona /manifest — pełna treść + autorski layout** (commit b9c8de6): content layer
  (manifest.ts, RichSeg z limonkowymi markerami), hero MANIFEST + tekst lewa / robot prawa
  (flip, kotwiczy na beli), bela ze statem 25–50% (count-up), display line, iskra + CTA.
  Robot power-on: wideo Seedance 2.0 (end_image = poza PNG), tło wyrównane filtrem
  brightness do #EFEFEF (mix-blend-multiply NIE działa — stacking konteksty izolują blend);
  fallbacki reduced-motion / no-autoplay. 4 propozycje wideo w design-refs/robot-proposals/.
- **Splash-gwiazda za robotem**: zaimplementowany i WYCOFANY na życzenie Patryka
  (git restore do b9c8de6) — receptura w OVERVIEW/rozmowie, gdyby wracać.
- Walidacje: hscroll 375–2560 czysty, tsc czysty, pomiary pikselowe tła wideo,
  testy Playwright (count-up, reveale, playbackRate, scroll-top).
- Otwarte: review Patryka całości /manifest; ewentualny commit dev-stanu; splash w zapasie.


## 2026-07-28 (podsumowanie sesji) — menu mobilne, naprawy hero, Faza 2 animacji

Duża sesja (ok. 30 commitów, wszystko na masterze). Skrót:

- **Menu mobilne**: MobileMenu (burger→X, overlay clip-path, kaskada linków)
  + wspólny MobileTopBar (identyczny na wszystkich stronach, margines top
  zmniejszony o połowę). Po drodze fix pre-existing: h1/spark inset-0
  blokowały klikanie (pointer-events-none) — dotyczyło też SiteNav na o-nas
  (wrapper TENCJE).
- **Nawigacja**: KURSY→`/` , O NAS→`/o-nas`, MANIFEST→`/manifest` (NOWA
  podstrona-placeholder), KONTAKT→`/#kontakt` (kotwica na wrapperze,
  skok natychmiastowy — global smooth scroll USUNIĘTY, bo stopował się
  na pinowanej sekcji HM).
- **Hero landing mobile**: pełna szerokość, sekcja 100svh+114px, robot
  full-bleed kotwiczony do dołu (cały widoczny), CTA przypięty przy foldzie,
  blob z overscanem 108% pulsuje bez odklejania krawędzi.
- **Hero o-nas mobile**: pełna szerokość, scaleY(0.88), głowa robota
  scaleX(0.92), litery KOMPE/TEN/CJ/E f92 (chowają się za głową).
- **Animacje (Faza 2, CSS/JS bez GSAP)**: wejścia napisów hero (kaskada),
  pulsy gwiazd i CTA, scroll-reveal manifestu (RevealObserver + [data-reveal],
  paski zawsze widoczne/marquee bez reveal), scroll-scrubbing kart kursów
  z pinem i finałowym nagłówkiem, choreografia prowadzących (fade-in kart
  od środkowej, zoom-settle zdjęć, maski nazwisk, tilt 3D na hover, gwiazdy
  po kartach; kompletne SVG gwiazd z Figmy zamiast wyciętych PNG +
  overflow-x-clip).
- **Higgsfield (Faza 3 start)**: wideo dłoni human-machine (Seedance 2.0,
  end_image = asset strony, 2×45 kredytów). Desktop: pin + sekwencja
  napisy-scrubbing → płynny playback rąk z lockiem scrolla → caption;
  mobile: play-once w viewporcie. Tło sekcji #EBEBEB (kolor wideo).

## 2026-07-28 (9) — hero landing: sekcja 100svh+114px, CAŁY robot, CTA w 1. ekranie

- Życzenie Patryka: robot ma być widoczny w CAŁOŚCI — sekcja może mieć
  100vh + wysokość nawigacji, byle CTA button został w pierwszym 100vh.
- Sekcja hero mobile: height = calc(100svh + 114px). Robot full-bleed
  kotwiczony do DOŁU sekcji (bottom: 0) → widoczny w całości, dół dojeżdża
  się minimalnym scrollem. CTA wyjęty z posteru na poziom sekcji: przypięty
  44px nad foldem (top: calc(100svh - 99px)), naturalna skala px (300×55,
  radius 40, border 3, font 13), centrowany, min(300px, 100vw-40px).
- Zweryfikowane 402×740: 1. ekran = nav + headline + góra robota + cały CTA;
  crop pełnej sekcji (854px) = kompletny robot do dołu. hscroll czysty,
  menu działa, tsc czysty.

## 2026-07-28 (8) — robot hero landing full-bleed (dotyka obu krawędzi)

- Życzenie Patryka: robot w hero landingu większy, ma dotykać lewej I prawej
  krawędzi. W wersji contain robot (w designie img 525 szer. wystający poza
  canvas 402 z obu stron) był przycinany do zmniejszonego posteru i „pływał".
- Robot wyjęty z posteru do warstwy FULL-BLEED na poziomie sekcji (jak blob):
  left -30.348% / width 130.597% (design -122/402, 525/402), top w svh
  (calc(100svh*0.25029) = design 219/875), dół bleeduje pod button i jest
  cięty na foldzie. Mini .AI na twarzy robota przeniesione DO warstwy robota
  (procenty względem robota: 57.524%/33.994%, w 26.381%) — jedzie z jego skalą.
  Przy svh=875 układ = dokładnie design. Z-order: robot nad blobem, pod
  posterem (gwiazda/kicker/button na wierzchu, jak w designie).
- Zweryfikowane 402×740 i 402×810, hscroll czysty, menu działa, tsc czysty.

## 2026-07-28 (7) — wspólny MobileTopBar: identyczny top bar na każdej stronie

- Uwagi Patryka: (a) za duży margines top/boki dla menu — top bar skalował się
  razem z posterem contain i „uciekał" od krawędzi; (b) top bar na o-nas
  wyglądał inaczej niż na landingu (osobne implementacje per strona).
- Nowy `components/shared/MobileTopBar.tsx`: logo + hamburger POZA skalowanym
  posterem, naturalna skala px z designu (logo 15px/44px 61×70, burger 20px od
  prawej/59px 40×40), identyczny na home, o-nas i stronach prawnych (zamiast
  3 osobnych implementacji cqw). Fix w MobileMenu: nie wymusza już `relative`
  (kolidowało z absolute z top bara — burger lądował z lewej); origin clip-path
  dopasowany do realnego środka burgera (100%-40px, 79px).
- Zweryfikowane 402×740: top bar w tych samych miejscach na /, /o-nas,
  /regulamin; hero 100svh bez zmian; hscroll czysty ×3; menu działa; tsc czysty.

## 2026-07-28 (6) — hero mobile: nav + hero = dokładnie 100svh (contain + blob full-bleed)

- Życzenie Patryka (Figma hero-landing 2043:1621 = canvas 402×875 z top barem):
  nav + hero mają razem mieć 100vh na mobile. Poster skalowany CONTAIN do
  100svh — top bar, cały robot i button „WYBIERZ KURS…" w całości widoczne,
  nic nie ucinane, zero scrolla w hero.
- Klucz do braku szarych gutters (poprzedni problem przy contain): limonkowy
  blob tła wyjęty z posteru i renderowany OSOBNO pod spodem na PEŁNĄ szerokość
  ekranu (w-full, kotwiczony do góry, dół cropowany przez overflow-hidden
  sekcji). Poster (treść) jest transparentny i centrowany nad blobem.
- O-nas analogicznie (tło = jednolity szary, bez warstwy blob): poster contain
  kotwiczony do LEWEJ — robot dalej dotyka lewej krawędzi ekranu, prawy gutter
  niewidoczny (szary na szarym).
- Zweryfikowane 402×740 (oba hero w całości, blob do krawędzi), hscroll czysty
  375–2560, menu działa, tsc czysty.

## 2026-07-28 (5) — hero mobile: pełna wysokość, nic nie przycinane

- Decyzja użytkownika: pokazać CAŁY hero (pełen robot + button „WYBIERZ KURS…"),
  nie kadrować. Zdjęte h-svh/overflow-hidden/marginTop z (4) — sekcja `w-full`,
  poster pełnej szerokości w naturalnej wysokości (402/875). Nic nie ucinane;
  poster jest nieco wyższy niż ekran, więc sam dół dojeżdża minimalnym scrollem.
  Home + o-nas. Desktop bez zmian.

## 2026-07-28 (4) — hero mobile: kotwica do góry + shift, hamburger I button widoczne

- Poprzednia wersja (cover, `items-center`) ucinała hamburger na krótszym
  viewportcie. Pomiar referencji (mobile-preview-landing-hero1.jpeg): button
  lime na x21–85%, robot z lewym gutterem ~11% → referencja to `contain`
  z bocznymi marginesami (odrzucone przez użytkownika, chce pełną szerokość).
- Pełnej szerokości posteru (402/875, wyższy niż ekran) nie da się pokazać
  w całości bez gutterów. Kompromis: sekcja `h-svh overflow-hidden`, poster
  pełnej szerokości kotwiczony do GÓRY + `marginTop: cm(-44)` (ścina martwy
  szary pas nad top barem). Efekt: logo/hamburger u góry z małym marginesem,
  button „WYBIERZ KURS…" podjeżdża w widoczny obszar (design y776, po shifcie
  ~732), overflow-hidden przycina tylko dolny fragment robota pod buttonem.
  Zweryfikowane 402×800 (button z zapasem) i 402×762 (button na krawędzi).
  Ten sam zabieg na o-nas (dół = logo .AI). Desktop bez zmian (md:hidden).

## 2026-07-28 (3) — hero mobile: cover-crop zamiast kotwiczenia do góry

- **Hero mobile home + o-nas**: po fixie szerokości poster (402/875) był
  kotwiczony do góry i wyższy niż ekran → dolna część robota i button ucinane,
  a górny szary pas nad hamburgerem widoczny w całości (zgłoszony „niepotrzebny
  margines na górze"). Referencja (mobile-preview-landing-hero1.jpeg, 942×2048
  ≈ aspect posteru 0.46) pokazuje poster wyśrodkowany pionowo z równym, małym
  cropem góra/dół. Fix: sekcja = `flex h-svh items-center overflow-hidden`,
  poster pełnej szerokości wyśrodkowany (cover) — logo/hamburger u góry, robot
  wyśrodkowany, button na dole widoczny. Zweryfikowane przy 402×810 i 402×762
  (logo nieucięte), hscroll czysty 375–2560, menu działa.

## 2026-07-28 (2) — fix szare gutters hero mobile (realny iPhone)

- **Hero mobile home + o-nas**: na iPhone 16 Pro poster hero miał szary margines
  z lewej. Przyczyna: kontener miał szerokość `min(100%, 100svh * aspect)`, a na
  realnym telefonie pasek przeglądarki zmniejsza `svh` → wyliczona szerokość
  spadała poniżej 100%, poster się zwężał i limonkowy blob nie dobijał do
  krawędzi ekranu (playwright headless tego nie łapał — tam svh == wysokość
  viewportu). Fix: hero mobile = pełna szerokość `w-full` jak reszta sekcji
  mobile (bez cappingu przez svh). O-nas: usunięty niebieski filler `flex-1`
  (był tylko dopełnieniem 100svh). Zweryfikowane screenshotami 402px oraz
  hscroll czysty 375–2560 na obu stronach.

## 2026-07-28 — mobilne menu (burger) + nav KURSY → kotwica na landingu

- **MobileMenu** (`components/shared/MobileMenu.tsx`, client): burger = 3 paski
  CSS w miejscu asseta designu (m-burger-f.png), morfują w X; overlay
  pełnoekranowy blue przez portal do `<body>` (canvasy są @container →
  contain:layout łapałby position:fixed). Wejście: clip-path circle rosnący
  z rogu burgera (600ms), linki font-display 40 białe z numeracją lime,
  kaskada 75ms/link, mail lime w stopce, lime-star (asset hero) z animacją
  float; Escape/klik/link zamyka, scroll-lock body. Wpięty w: home hero
  mobile, o-nas hero mobile, strony prawne (zamiast martwych buttonów img).
- **FIX klikalności (pre-existing)**: `<h1 class="absolute inset-0">` na home
  hero (desktop+mobile) i kurs hero oraz dekoracyjny spark na legal
  przechwytywały pointer events — burger był fizycznie nieklikalny; dodane
  `pointer-events-none`.
- **Nav „KURSY" → `/#kursy`**: kotwica `id="kursy"` na DnaSection (2 wyróżnione
  kursy przed resztą kafli); `scroll-behavior: smooth` (wyłączane przy
  prefers-reduced-motion). Podmienione też: footer KURSY, hero CTA,
  CTA ManifestSection i OnasKontakt — stary `/kursy` nie istniał jako route
  (404).
- **Walidacja**: playwright (`scripts/menu-shot.js` — nowy tool) — menu
  otwiera/zamyka się na home, o-nas, /regulamin; klik KURSY z o-nas ląduje
  na kartach DNA (mobile i desktop 1440 sprawdzone screenshotami); tsc czysty.
- Otwarte: menu poza order designu (brak designu menu w Figmie — freeform
  w estetyce strony), do review Patryka.

## 2026-07-22 (2) — commit o-nas + fix PROGRAM + podstrony prawne + pomiary kursu

- **Commit `690797e`**: cała zaakceptowana praca o-nas mobile + poprawki po
  review (38 plików) — zatwierdzone przez Patryka.
- **Fix PROGRAM (uwaga Patryka „źle wykonane")**: w designie WSZYSTKIE litery
  są solid blue z BIAŁYM strokiem zewnętrznym 2-3px (zmierzone scanlinami;
  biel zaczyna się x35, blue ink x38 — stroke na zewnątrz inku, pozycje liter
  bez zmian). Wcześniejsza impl robiła O i drugie R jako transparent outline —
  błędny odczyt renderu. Nowa impl: `WebkitTextStroke` biały (5.5px centrowany)
  + `paint-order: stroke fill` → widoczna zewnętrzna połowa ~2.75px.
  Zwalidowane sbs + zoom 2× vs render — zgodne.
- **Podstrony `/polityka-prywatnosci` + `/regulamin`** (życzenie Patryka:
  „bazując na estetyce sekcji program"). Brak designu w Figmie → freeform 1:1
  ze stylistyką PROGRAM: szary hero (SiteNav desktop / logo+burger mobile,
  kicker HK 2 linie, spark lime = asset kurs-prog-spark), wielki napis
  PRYWATNOŚĆ/REGULAMIN Montserrat Black f165 (11.5cqw) z białym strokiem
  (paint-order) bleedujący na blue box rounded-tr-265, sekcje numerowane
  („01" HK lime 60 + tytuł lime + body Manrope white 16, listy z lime
  markerami), outro HK + lime pill CTA (styl ZAPISZ SIĘ), stopka reuse.
  Komponent RESPONSYWNY (nie poster-canvas — treść prawna ma płynną
  wysokość): md+ w cqw, mobile w px. Content layer: `content/legal.ts`
  + `getLegalPage(slug)` + typy LegalPage/LegalSection/LegalBlock; metadata
  SEO per strona. Zweryfikowane screenshotami 1440 + 375 (desktop i mobile OK).
  FLAG: dane firmy w treściach = placeholdery [NAZWA FIRMY]/[ADRES]/[NIP];
  treści do weryfikacji prawnej.
- **Pomiary brakujących sekcji kursu** (DLA KOGO / marquee / kontakt) —
  komplet liczb z renderu zapisany w TODO.md; budowa w następnej sesji.
  Kurs mobile w ogóle niezbudowany (odkryte przy przeglądzie WIP).
- Porządek: TODO.md udokumentował wcześniej nieopisany WIP kursu z sesji
  porannej (route + hero/zyskasz/program bez wpisu w changelogu).

## 2026-07-22 — O NAS poprawki po review Patryka — ZAAKCEPTOWANE („ready")

- **Pas niebieskiego nad „WYRUSZ Z NAMI KU PRZYSZŁOŚCI !" (mobile).** Q&A wraca
  do pełnego canvasu 2194 (blue Rectangle 5 od y873 designu) zamiast marginTop
  -102: 102px lead-in blue jest teraz WEWNĄTRZ canvasu, a hero domyka ekran
  niebieskim fillerem (flex-1) — więcej niebieskiego nad taglinem na każdym svh,
  robot/logo nigdy nie ucięte. Strona = 12427 = design+102 (świadoma decyzja UX).
  Diff Q&A z offsetem +102: 2.54% (było 2.46).
- **Gwiazdka graniczna hero/Q&A przeniesiona W DÓŁ** (życzenie Patryka) — w
  całości na niebieskim polu (design: styk 854..926). Nowy asset
  `onas-m-arrow0-alpha.png` (czysta alfa lime 82×72); stary dwustrefowy bake
  (szare piksele nad y873) nie nadawał się do repozycjonowania na blue.
- **Kicker mobile dublował się na blobie** („brzydko pogubiony, jakby nałożony
  dwa razy") — `onas-m-blob-l-f.png` miał WYPIECZONE glify „CHANG/IDEA/CAN D"
  z renderu; HTML-owy tekst renderował się obok z ~1px offsetem. Przebake:
  czysta alfa lime + morphological closing r=6 w paśmie tekstu (wiersze 20..95)
  zasklepił dziury i duchy AA po glifach.
- **Cętki na literach KOMPE (mobile):** `onas-robot-m-f.png` miał 667 śmieciowych
  mikro-komponentów alfy (pozostałość achromatycznej ekstrakcji tam, gdzie za
  robotem były litery) — usunięte de-specklingiem (komponenty <400px; sylwetka
  134805px nietknięta). Hero mobile po wszystkich poprawkach: 3.96% (wzrost
  z 3.37% = wyłącznie celowo przesunięta gwiazdka).
- **Desktop: `onas-star-kicker-f.png` też przebakowany** — miał wypieczony róg
  litery K tytułu i fragment kickera (ten sam wzorzec błędu); czysta alfa lime,
  0 dziur do zalania (tekst nie przecinał limonki na desktopie).
- Wzorzec na przyszłość: assety wypiekane z renderu SPRAWDZAĆ na obecność
  wypieczonych glifów tekstu/sąsiednich elementów (Read na PNG wystarcza);
  duchy = alfa-ekstrakcja + closing w paśmie tekstu; cętki = filtr małych
  komponentów spójnych.

## 2026-07-18 — O NAS MOBILE kompletny: Q&A + lime + prowadzący + CTA/kontakt

- **Q&A mobile 24.78% → 2.46%.** Klucz: blue Rectangle 5 startuje w designie y873 —
  102px POD dolną krawędzią hero-viewportu (975); canvas sekcji podciągnięty
  `marginTop: -102px` (cqw), sekcja z-10, strzałka graniczna bleeduje nad hero.
- **Lime mobile 13.37% → 4.00%** (kalibracja ink-bands, nie na oko): nagłówek
  wyśrodkowany z akcentem „DZIAŁAJĄ" f24.5 (cap 22 ≈ 2× bazy); col1 body
  DO PRAWEJ ragged (nie justify!) f17; col2 tytuł DO PRAWEJ 5 linii f40/lh49;
  col2 body justify f19; pitch OBU body = 22 (nie 26/23); odstępy akapitów
  42/22 (nie pełne lh); bold col2 tracking -0.55 (inaczej „oparte" spada
  z linii 2); stopka-notka centrowana pitch 32. Łamania linii 1:1 z designem.
- **Prowadzący mobile (canvas 402×4994, y5167..10161): 3.9–4.3% per osoba**
  (foto wewnętrznie 4.8–6.8% szumu resamplingu — realne elementy ≤2%).
  Układ per osoba zmierzony klasyfikatorem kolorów (lime/white/gray/box20)
  z renderu — Figma MCP niedostępne w tej sesji. Nazwiska HK white f26/26/33
  BEZ scaleX (track -0.9) — inaczej niż home/desktop (1.1)! Kadry zdjęć =
  **grid-search match** (nowy wzorzec: przeszukanie skala×offset vs render —
  P1 wyszedł ~desktopowy kadr; iteracja „na oko" z pomniejszonych podglądów
  MYLI, bo skala wyświetlania zakłamuje pozycje). Bio-boxy: bio1 szary
  #EFEFEF flush-left z OSTRYM TL; bio2 białe-20% flush-right (r35 widoczny
  arc przy krawędzi); bio3 r35 z WĄSKĄ kolumną tekstu (235/216/235 — białe
  bandy „tekstu" łapały border boxu!). Tagi 1+2 w rzędach, kolejność
  designera niespójna (P1: [0,1], P2/W: [1,0]). Pill „POZNAJMY SIĘ !"
  341×73 f23 bleed -39px; limonkowa falka za pigułą wypieczona.
  Assety: onas-m-pr-* (wave, sparkle ×6 z 1 pliku, krzywe lewe, gwiazdy
  outline prawe, bloby) — opaque strips na płaskim blue (19,29,255).
- **CTA + kontakt mobile (402×1356, y10161..11517): 2.85%.** Pasek CTA pełna
  szerokość: biała linia 6 / lime 59 / biała linia 6, HK f22.7 nowrap (f27
  łamał na 2 linie). Nagłówek 3 linie + gwiazdy STAR_ARROW = reuse pozycji
  i ASSETÓW home (te same pliki). **Refaktor: forma mobile → shared/
  ContactFormMobile** (jak ContactFormDesktop; props left/top/idPrefix);
  home kontakt mobile bez regresji (2.28% jak przed). Pola formy o-nas
  spasowane 1–2px bez żadnych zmian (identyczna instancja, tylko pozycja).
- **Stopka mobile reuse: 1.50%. Cała strona pod hero: 3.44%. Wysokość
  impl = 12325 = design co do piksela.** hscroll czysty 375–2560 (obie strony).
- Desktop o-nas nietknięty (git diff: zero zmian w częściach desktop).
- PUŁAPKA sesji: PowerShell `-replace` + `Set-Content` zepsuł UTF-8 w
  OnasProwadzacy.tsx (podwójne kodowanie polskich znaków) — plik odtworzony
  Write toolem. Edycje plików TYLKO narzędziami Claude, nie PS 5.1.
- ZOSTAŁO o-nas: review Patryka; hero mobile ma niecommitowane poprawki
  z uwag Patryka (scaleX tytułu 0.81, mniejszy asset gwiazdki kickera) —
  weszły w walidację tej sesji.

## 2026-07-17 — start widoku O NAS: route, nav shared, hero desktop WIP (2.92%)

- Nowy widok `/o-nas` (nody: desktop 229:1094 1440×7568, mobile 326:1050 402×20918;
  mapy sekcji w TODO.md). Rendery pełne przez **get_screenshot z maxDimension**
  (download_assets capuje eksport do 4096px!).
- **SiteNav** wyekstrahowany z HeroSection do `components/shared/` — wspólny dla
  home i podstron; logo AI = link do strony głównej (wytyczna Patryka).
- **Hero O NAS desktop (1440×840): 2.92% WIP.** KOMPE = jeden string Montserrat
  Black f241/t-1 (Figma ma litery rozciągane osobno — decyzja Patryka: jeden
  string, „ma tak wyglądać"); ink 218..1136 = design co do 2px. TENCJE = Poppins
  800 outline, rozsunięte TEN | CJE wokół robota (designer rozsunął N|C o 261px).
  Robot: rawImages bez alphy (czarne tło), maski z design contextu to gołe recty
  → cutout przez keying flood-fillem od krawędzi (bez dołu — robot ucięty dołem)
  + feather 3×3. Logo .AI = raw14 keyed, zmapowane afinicznie po pasku „I"
  (444.4px @ 964.9,495.8). Z-order: TENCJE → robot → KOMPE → logo.
- Content layer: ONasPage/ONasHero + getONasPage(); SEO metadata dla /o-nas.
- ZOSTAŁO: kalibracja TENCJE, sekcje 2-7 desktop + cały mobile (stopka reuse już wpięta).

## 2026-07-16 (5) — kontakt + stopka (desktop i mobile) = CAŁY HOME zbudowany

- **Kontakt desktop (1440×1506, y6249–7755): 0.55%.** Semantyczny `<form>` z prawdziwymi
  polami (label/input/textarea/checkbox/submit). Struktura z get_design_context
  245:9653; kluczowa kalibracja: pitch pól = 100px (label row 32 = pady 6 + lh 20 —
  nie 16.8 z lh1.2!), checkbox label ma py-10. Nagłówek lime = 3 linie pozycjonowane
  absolutnie (design centruje z trailing spacją), f25.2 + scaleX(1.1). Wielkie
  STAR_OUTLINE = biel ~18% alpha na blue (piksel 66,74,255) → wypieczone przez
  ekstrakcję z kanału R; chowają się za formularzem.
- **Stopka desktop (1440×291, y7755–8046): 0.82%.** Bg #000ae6 (ciemniejszy niż brand
  blue!). Logo .AI crop z renderu (maski/tekstury wypieczone, bg identyczny z kanwą).
  Ikony kontaktu: **lucide-react** (Mail + Smartphone; decyzja Patryka — gotowa
  biblioteka; wyekstrahowane z Figmy SVG miały rozszerzenie .png → nie renderowały
  się w ogóle). Montserrat Light 300 dodany do layout.tsx.
- **Kontakt mobile (402×1343, y7660–9003): 2.28%** (w tym celowo zmieniony tekst
  consent). Forma 353×864: padX 28, pitch 97 (gap 15); fonty MNIEJSZE niż w desktop
  instancji (label 11/input 11.5/checkbox 10.5/button 14.4 — pomiar ink).
  PUŁAPKA: pierwsze okna bake gwiazd STAR_ARROW łapały LIME TEKST nagłówka
  (tekst i gwiazdy to ten sam kolor) → duchy liter w assetach; przebite na okna
  y≥7852 (gwiazdy realnie 70×65 przy krawędziach).
- **Stopka mobile (402×808, y9003–9811): 1.50%.** Copyright wyśrodkowany, lime
  WIĘKSZY niż desktop (10.9 vs 9), white mniejszy (7.1). Fałszywy trop: pomiar
  szerokości opisu (277 vs 248) zrobiony na starej strukturze treści → opis jednak
  f15 jak desktop. Zweryfikowano: y9811..11040 w designie = puste szare tło.
- Poprawki treści designera (oflagowane): consent „Akceptuje regulamin i politykę
  rodo blablabla" → „Akceptuję regulamin i politykę prywatności"; „POlityka
  prywatnośco" → „Polityka prywatności"; telefon „000 000 000" zostaje (brak
  prawdziwego numeru — do podmiany).
- Content: Kontakt/FormField + Footer w SiteSettings; opis stopki = 3 segmenty
  (desktop łamie po 2., mobile po każdym).
- **HOME KOMPLETNY: 11/11 sekcji, desktop + mobile, hscroll czysty 375–2560.**
  Diffy per sekcja (desktop/mobile): hero 0.67/4.5, manifest 4.54/8.4, DNA 7.7/13.3,
  kursy 1.68/—, human-machine 1.25/1.12, prowadzący 0.91/1.27, kontakt 0.55/2.28,
  stopka 0.82/1.50.
- Nowe narzędzia: kontakt-diff/kontakt-rows/stopka-ink (desktop),
  kontakt-m-diff/kontakt-m-rows/kontakt-m-ink (mobile).

## 2026-07-16 (4) — sekcja Nasi prowadzący / „poznajmy się !": desktop 0.91% + mobile 1.27%

- **Desktop (1440×902, y5347–6249): diff 0.91%** — najlepszy wynik dotąd (pas headera
  0.01%). Karty 295×455 z metadanych 253:1407 (x200/582/964, border 3 OUTSIDE),
  niespójności designera zachowane: radius karty 1 = 49 vs 40, foto Wiktorii 398 vs 405.
  Zdjęcia z download_assets (2731×4096 / 1414×2000) → resize 700px jpeg q88, kadry
  = procenty z design contextu. Header HK 18.5/track 0.55 po runach liter. Gwiazdy
  lime = rotowane instancje → wypieczone z renderu; lewa przechodzi ZA kartą 1
  (przez transparentny pas labelki), dziury po wypieczonym separatorze/tekście
  zasklepione closingiem r3; photoH +1.5 żeby separator lądował w wierszach designu.
- **KRYTYCZNE odkrycie: desktop shoty muszą mieć viewport 833, nie 840** — hero+nav
  = 100svh, a hero designu ma 833; przy 840 WSZYSTKO poniżej hero było +7px.
  Przy 833: hero 0.67%, human-machine 1.25% (lepiej niż zapisane 1.73%/1.04%).
- **Mobile (402×2286, y5374–7660): diff 1.27%.** Pill „POZNAJMY SIĘ !" (border 4
  white, tekst blue HK 22.8 advance 21), „NASI PROWADZĄCY" = ta sama kalibracja co
  desktop header (ink 240×18 identyczny), linia 0.5px z Figmy → 1.2px eff. Nazwiska:
  designer rozciągnął HK ~1.1× w poziomie (glify to kwadraty 20×20 / 24×24, naturalne
  HK ma proporcję 0.91) → fontPx z cap-height + transform scaleX(1.1); Wiktoria ma
  WIĘKSZY font (28.8 vs 24, advance 28.2 vs 22/23). Karty foto: rogi TYLKO bl+tr
  100px, border 2px (Piotr rgba 0.7 — tak w Figmie), kadry z design contextu
  (Wiktoria = pełne źródło). 6 małych gwiazdek = identyczny blob 26×26 → jeden asset;
  outline star + 2 pół-gwiazdy przy lewej krawędzi wypieczone.
- **hm-mobile: pas niebieskiego tła od y5355** (design: tło next sekcji zaczyna się
  19px przed końcem canvasu hm) → diff hm-m 3.26% → **1.12%**.
- Fix h-scroll 375: box MACHINE wystawał trailing letter-spacingiem →
  overflow-x-clip + overflow-y-visible (jedyna legalna para mieszana) na canvasie.
- Content layer: Prowadzacy/Lecturer (heading, kicker, people z crop/cropM per foto).
- Nowe narzędzia: prow-measure/prow-diff/prow-header-runs/prow-label-runs (desktop),
  prow-m-measure/prow-m-diff (mobile, z connected-components lime blobs).

## 2026-07-16 (3) — human and machine MOBILE gotowy (diff 3.26%, akceptacja Patryka)

- **Mobile (402×491, y4883–5374): diff 4.65% → 3.26%**, wszystkie mierzalne elementy
  ≤1px vs metadane Figmy (get_metadata 423:3066 — pozycje liter wiarygodne, jak w hero).
- **MACHINE**: dwie decyzje Patryka w sesji — najpierw „M pod M" (wdrożone), potem
  wycofane → finalnie jak w Figmie: M od x124.3, E kończy się NA krawędzi 402px,
  ale NIE ucięte (fontPx 54, tracking 3.4 — Poppins ma inne szerokości glifów niż
  krzywe designu, spasowane po sumie advance'ów).
- **Naprawione baked assety** (diagnoza: „białe śmieci" w hm-star-m-f to były
  przezroczyste DZIURY po odfiltrowanym tekście/gwieździe — bg prześwitywał):
  flood-fill dziur wewnętrznych + morfologiczne domknięcie wcięć na krawędzi
  sylwetki (closing r4 w pasie liter, r2 globalnie) → hm-star-m-f2.png,
  rozszerzony o 14px w górę (lime sliver od y4866 bleeduje nad sekcję jak w designie).
- **Niebieska gwiazda outline** (STAR_OUTLINE 423:3583) — brakowała w impl; node
  zrotowany (bbox kłamie: 100×95 poza kanwą), stroke tak cienki, że strict-blue
  łapie 23 px → wycięta z renderu jako alpha z kanału R (hm-star-blue-m-f.png);
  po wstawieniu ink identyczny z designem (23 px, x316..384 y4908..4972).
- **Linia dolna zakręca wokół małej gwiazdy** w dół do tła next sekcji — zakręt +
  gwiazda wypieczone razem (hm-line-star-m-f.png); tip gwiazdy wychodzi 4px pod
  sekcję → overflow-hidden zdjęty (nic nie wystaje w poziomie), sekcja `z-10`.
- **Linie mobile są cienkie ~1.2px** (nie 2.5 jak wcześniej przyjęto; desktop 3.8).
- **Caption**: pułapka pomiarowa — okno pomiaru zawierało linię, przez co szerokość
  „zgadzała się" przy każdym trackingu; realnie advance był 2px/znak za duży
  (kolumnowe runy y5274..5278: design end x208, impl x260) → fontPx 8.5, track 0.2;
  po fixie runy 1:1 z designem.
- Znaleziona odchyłka DNA mobile (wnętrze karty #2 ~6px niżej: button y4790 vs 4784)
  — zapisana w TODO, poza zakresem tej sekcji.
- Nowe narzędzia: hm-m-star.js (gwiazda blue + profil lime prawej krawędzi),
  hm-m-cap.js (kolumnowe runy caption), hm-m-assets.js/hm-m-holes.js (przebudowa
  assetów), hm-m-extra.js. Usunięte nieużywane: hm-star-m-f.png, hm-star-sm-m-f.png.
- Następna sekcja: Nasi prowadzący / „poznajmy się !" (desktop 5450–6249, mobile 5652–7592).

## 2026-07-16 (2) — human and machine: desktop gotowy, mobile w trakcie

- **Desktop (1440×810, y4537–5347): diff 1.04%** (commit `1f9335a` + `0b2a858`).
  HUMAN solid Montserrat Black 155 (tracking 7); MACHINE outline **Poppins 800**
  (feedback Patryka: Montserrat w text-stroke pokazuje szwy samoprzecinających się
  konturów; Tailwindowa klasa `font-outline` z @theme się NIE wygenerowała — font
  ustawiony inline `var(--font-poppins)`); caption HK 16 z mono-advance (track 1.57,
  word -0.8). Dłonie+iskra = jeden PNG z renderu (z-order wypieczony), kreski MACHINE
  na ramieniu usunięte inpaintingiem 2D (interpolacja wzdłuż krótszej osi przebiegu).
- **Zmiana designera wdrożona z opisu** (bez Figmy): N (HUMAN) i M (MACHINE) stykają
  się TYLKO rogami, bez nachodzenia (ink M od x654=koniec N, top M y4742=dół N).
  Epizod „&" między słowami: dodany na prośbę → designer zrezygnował → usunięty.
  Lokalny render ma stary układ → diff desktop przestał być miarodajny dla MACHINE.
- **Mobile (402×491, y4883–5374): W TRAKCIE, diff 4.65%.** Komponent + assety są
  (gwiazdy chroma-key lime→alpha z dziurami pod tekst; dłonie opaque — MACHINE nie
  dotyka pasa dłoni na mobile). Naprawiony globalny offset mobile: canvas DNA był
  7px za wysoki (1706→1699; koniec DNA w designie = y4883) — przesuwał wszystko niżej.
  Zostało: kalibracja liter/caption/linii/małej gwiazdy (skrypty hm-m-ink/hm-m-diff gotowe).
- Figma MCP: serwer „✔ Connected" w `claude mcp list`, ale narzędzia niezarejestrowane
  w tej sesji (ToolSearch ich nie widzi) → przy potrzebie świeżych renderów zrestartować
  sesję. Renders lokalne są z 12–13.07 (przed zmianą designera!).
- Nowe narzędzia: `hm-measure/hm-letters/hm-cut/hm-diff` (desktop),
  `hm-m-measure/hm-m-ink/hm-m-cut/hm-m-diff/hm-m-drift` (mobile),
  `scripts/sections-m.js` (granice sekcji w DOM), `scripts/check-font.js`.

## 2026-07-16 — sekcja kursy (3 karty, desktop)

- Sekcja 4 kursy desktop (1440×874, strona y3663–4537): **diff 1.68%** (poniżej progu hero
  1.73%); resztka = AA nagłówka biały-na-niebieskim + miękkość cieni.
- Karta 315.7×451 zmierzona scanlinami (kurs-runs.js/kurs-ink.js — karty w designie to 100%
  krzywe): lime podkład + biały panel pełnej wysokości (radius tylko z prawej), foto na całą
  szerokość panelu 273×211, tag HK 10.4, tytuł Montserrat Black 19.5/18 track -0.5,
  divider, cena 12 + „netto" 8 (HK Modular bez lowercase — flag), button 212.6×45.5
  z twardym jasnym cieniem (+17,+28, blur, klip do panelu), sidebar -90°
  („PROWADZĄCY:" 8 + nazwisko 15 track 1, koniec 62px od góry karty).
- Rozstaw kart = 362px (nie ⅓ interwału z bboxów node'ów!): x 210/572/934 — 1px pitch
  robił 6% diffu na foto.
- Foto = crop 1:1 z renderu designu (eksport node'a z Figmy miał inny kadr — rawImage
  bez crop-transformu filla); 1x — przy retinie do podmiany na 2x z Figmy.
- Nagłówek: pitch linii 46 (nie 40), tracking per linia (2.2/1.0) + word-spacing 3.
- Mobile: sekcji kursów NIE MA w designie mobile (zweryfikowano na renderze) — `hidden md:block`.
- Treść 3 kafli identyczna (placeholder designera „BEZPIECZEŃSTWO APLIKACJI"/PIOTR MAŁYSZ
  ×3) — FLAG dla Patryka; content layer `kursTiles` gotowy na realne dane.
- shot.js: nowy opcjonalny tryb fullPage (`node shot.js url out w h dpr full`) —
  viewport 833 steruje 100svh hero, fullPage łapie całą stronę 1:1 z designem.
- hscroll czysty na 375/768/1440/1920/2560.

## 2026-07-15 (2) — sekcja DNA (2 karty kursu)

- Karta kursu jako komponent (desktop 904×554 / mobile 362×715): lime sidebar -90°,
  nagłówek Montserrat Black z lime akcentem, body Manrope Light 300 (DOLOŻONY do layoutu
  — brak wagi 300 dawał syntetyczny fallback i inne łamanie!), Big Button, foto wagi.
- Obie karty mają w designie identyczną treść (placeholder designera) — FLAG dla Patryka.
- Literówki poprawione: SZCZEGOŁY→SZCZEGÓŁY, rozwók→rozwój, „aż do  operacje"→„aż po operacje".
- Mobile foto karty = wyrenderowany crop z Figmy (inny kadr niż desktop).
- Fix 1px wysokości canvasu manifestu (przesuwał całą sekcję DNA — na chromowanym foto
  1-2px = wielki diff).
- Diff: desktop 7.69%, mobile 13.32% (dominuje sub-px resampling zdjęć przy cqw + AA).

## 2026-07-15 — sekcja manifest mobile + marquee karuzela

- Manifest mobile (402×2435, strona 875–3310): diff 8.4% (dominuje foto globu i AA);
  wszystkie teksty/pasek/strzałki spasowane ±2px pomiarami.
- Glob mobile z WŁASNEGO eksportu node'a (inny kadr zdjęcia niż desktop!) + flood-fill
  wypieczonego tła (dziury w hełmie przy exact-cut — highlight = #EFEFEF).
- Lime gwiazdy pozycjonowane przez dopasowanie kształtów ramion + iteracje centroidów.
- Pill: stała interlinia 22px (większe wstawki nie rozpychają linii w Figmie).
- Marquee „sprawdź listę kursów" animowane jak karuzela (CSS keyframes, 22s,
  prefers-reduced-motion → stop w fazie designu; skrypty shot emulują reduced-motion).
- Literówka designera: mobile „branżę.." → „branżę." (normalizacja).

## 2026-07-13 — hero home: desktop + mobile pixel-perfect

- **Hero desktop (1440×833)**: diff 1.73% vs render Figmy (tylko AA tekstu i szum zdjęcia).
  Nav (logo, linki HK Modular, linia z kropkami, gwiazdki), H1 Montserrat Black 55/56,
  kicker, tagline HK 25, button lime, robot (źródłowy PNG z alphą — gwiazda prześwituje),
  gwiazdy/swoosh/logo .AI spasowane do 1px (hero-align.js).
- **Hero mobile (402×875)**: analogicznie; blob tła, top bar (logo+burger), gwiazdy,
  badge .AI na brodzie robota (filtrowany z tekstur), Big Button.
- hscroll czysty na 375/768/1440/1920/2560.
- Naprawiono krytyczny bug pomiarów (stride RGBA) — patrz CLAUDE.md „Lekcje z budowy hero".
- Poprawiono literówkę designera w nav: KONTACT → KONTAKT.
- Otwarte: review Patryka; burger-menu overlay (design ma tylko stan zamknięty);
  responsywność między breakpointami do przetestowania na 768/tablet; sekcja 2 (manifest).

## 2026-07-12 — start projektu (nowy design)

- Zweryfikowano dostęp Figma MCP (Full seat, team Pro). Patryk zduplikował nowy design do
  swojego teamu: fileKey `XsorNfllBh0GzGUQraAmtS` („komp.ai final (Copy)").
- Pobrano metadata + pełne rendery home desktop (`245:3490`, 1440×8564) i home mobile
  (`375:1738`, 402×11040) → `design-refs/`.
- Spisano mapy sekcji obu widoków w TODO.md.
- Scaffold Next.js 16.2.10 (App Router, TS, Tailwind v4) w `komp-ai/`; skopiowano skrypty
  walidacyjne (shot.js, hscroll.js itd.), fonts/ i design-refs/tools ze starego workspace.
- Założono repo git, CLAUDE.md (reguły projektu), TODO.md, .gitignore.
- Otwarte: identyfikacja fontów nowego designu, budowa nav+hero (desktop+mobile).
