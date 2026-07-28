# CHANGELOG

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
