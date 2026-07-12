# HANDOFF — instrukcje dla agenta budującego stronę od nowa (Figma → Next.js)

> Spisane 2026-07-12 przez poprzedniego agenta, po zbudowaniu pełnej wersji pixel-perfect
> (home + O Nas + Kurs, desktop + mobile) widocznej na **https://kompetencje.ai**.
> Design uległ zmianie — budujesz od nowa z nowej Figmy, ale poniższe lekcje kosztowały
> tygodnie pracy i nadal obowiązują.

---

## 1. Zanim ruszysz — sprawy krytyczne

### 1a. Figma MCP: limity idą za PLIKIEM, nie za kontem
- Limity API liczą się według teamu, w którym leży **plik**, a nie konto wołającego.
- Oryginalny plik designera (`E89cL9RG0oh3mXDZOMtiaF`) leży w jego teamie **Starter → 6 wywołań/MIESIĄC. NIGDY go nie wołaj.**

- **Skoro design się zmienił, dotychczasowa kopia `iPLmSEowDDjnbWysJoLFXM` jest NIEAKTUALNA.**
  Pierwszy krok: poproś użytkownika o świeżą duplikację zmienionego pliku do jego teamu Pro
  i o nowy fileKey. Zweryfikuj dostęp przez `whoami` + `get_metadata`, zanim zaplanujesz pracę.
  (Tak już było raz: mobile dorysowano po pierwszej duplikacji i trzeba było duplikować ponownie.)

### 1b. Oszczędzaj wywołania — workflow, który działał
1. `get_metadata` na głównym frame strony → mapa sekcji z node ID i wymiarami (zapisz do TODO).
2. **Jeden** pełny render strony przez `get_screenshot` → zapisz do `design-refs/` w pełnej rozdzielczości.
3. Do walidacji sekcji **wycinaj cropy lokalnie** z tego renderu (sharp/skrypt), zamiast pobierać nowe screenshoty.
4. `get_design_context` wołaj per sekcja, dopiero gdy ją budujesz.
5. `download_assets` na obrazy/SVG (roboty, gwiazdki, zdjęcia) — raz, w 2x/SVG.

### 1c. Stan repo i co jest referencją
- Branch `master` + tag `checkpoint-pre-animations` = skończona, zwalidowana wersja pixel-perfect starego designu. **Nie ruszać** — to rollback i referencja.
- Live: **https://kompetencje.ai** — stary design, ale pokazuje jakość wykończenia, do której celujemy.
- `design-refs/` zawiera renedery i cropy STAREGO designu — przydatne tylko porównawczo; nowe renedery zapisuj obok, nie nadpisuj bez potrzeby.
- Działająca appka: `komp-ai/` (Next.js 16, App Router, TS, Tailwind v4). **Zdecyduj z użytkownikiem**, czy stawiasz nowy projekt, czy przebudowujesz `komp-ai/` — dużo infrastruktury (fonty, content layer, skrypty walidacyjne) jest reużywalne nawet przy nowym designie.

---

## 2. Pułapki w TYM konkretnym pliku Figma (designer robi to notorycznie)

- **Tekst zamieniony na krzywe (outline)**: nagłówki hero i część napisów to wektory, nie tekst. W kodzie renderuj **prawdziwym fontem** — trzeba zidentyfikować krój (poprzednio: Poppins/Roboto/Iceberg/HK Modular/Montserrat; HK Modular dostarczony plikami w `fonts/modular.woff(2)`).
- **Ręcznie rozciągane litery**: designer potrafi ustawić i rozciągnąć KAŻDĄ literę osobno (hero „KOMPE": scaleX 1.0–1.25 per litera; nagłówki kart: scaleX 0.6–1.14). Wykrywa się to pomiarem „ink bbox" liter na renderze i odtwarza przez `transform: scaleX()` na spanach.
- **Obrócone elementy mają BŁĘDNE współrzędne w metadanych**: bounding-boxy w Figmie są sprzed rotacji — gwiazdki/strzałki potrafią „siedzieć" ~450px od widocznej pozycji. Prawdziwe środki mierz z **wyrenderowanego** obrazu (detekcja pikseli — gotowy skrypt `design-refs/tools/find-stars.js`).
- **Screenshot frame'a ≠ screenshot z tłem**: render samego frame'a może wykluczyć siblinga z tłem — raz przez to pomyliliśmy szare tło strony z niebieskim tłem sekcji. Sprawdzaj fill node'a tła, nie kolor z renderu.
- **Placeholdery i literówki w designie**: poprzednio: „KONTACT", „POlityka prywatnośco", zgoda RODO kończąca się „blablabla", telefon „000 000 000", identyczne bio w zespole, powtórzone lekcje w module 2. **Nie kopiuj literówek — poprawiaj i flaguj użytkownikowi.**
- **Iceberg (font nawigacji) nie ma polskich znaków** (brak latin-ext) — diakrytyki spadają na fallback. Etykiety nav trzymaj ASCII albo zaakceptuj fallback świadomie.

---

## 3. Sprawdzone wzorce techniczne (nie wymyślaj koła od nowa)

### Wzorzec „poster-canvas" (rdzeń całej strony)
- Każda sekcja: **zewnętrzny wrapper z `@container`** + wewnętrzny element z `aspect-[W/H]` z designu; wszystkie wymiary w **`cqw`** (przy 1440: 1cqw = 14.4px; przy mobile 402: 1cqw = 4.02px).
- **Uwaga**: `cqw` na samym elemencie z `container-type` po cichu spada do viewportu — element nie może odpytywać sam siebie. Kontener zawsze piętro wyżej.
- **Globalny cap `--workspace: 2400px`** w globals.css; każdy wrapper sekcji `max-w-(--workspace)`. Zawartość skaluje się proporcjonalnie do 2400px, potem rosną marginesy (ultrawide „w ramce").
- **`overflow-x-clip` na root strony** — dekoracje wychodzące poza krawędź (gwiazdy „bleed") nie mogą robić poziomego scrolla. Gdy bleed ma przechodzić między sekcjami tego samego koloru: `clip-path: inset(0 0 -150px 0)` zamiast `overflow-hidden` + odpowiedni z-index.
- Mobile: warianty per komponent (`md:hidden` / `hidden md:block`), ten sam wzorzec @container.
- Hero + nav = dokładnie `100svh` (flex column, hero `flex-1`, poster **contained**, nie cropowany).

### Content layer (mock Sanity)
- Sanity jest **zamockowane**: typowany content w `src/content/` (`types.ts` odwzorowuje przyszłe schematy z `_type`, dane w plikach per strona, asynchroniczne gettery `getHomePage()` itd.). Komponenty używają WYŁĄCZNIE getterów. Podpięcie prawdziwego Sanity = podmiana ciał getterów na GROQ — utrzymaj ten wzorzec.
- Teksty niepewne oznaczaj `TODO(figma)` w contencie.

### Walidacja (skrypty istnieją w `komp-ai/scripts/` i `design-refs/tools/`)
- **`scripts/shot.js`** — screenshot czekający na `document.fonts.ready`. **Gołe `npx playwright screenshot` łapie fonty fallbackowe** — nie używaj.
- `scripts/shot-el.js` (per element), `scripts/shot-page.js` (cała strona, scrolluje dla lazy images), `scripts/hscroll.js` (test poziomego scrolla — odpalaj po KAŻDEJ sekcji na 375/768/1440/1920/2560).
- Diff kanałowy vs render designu w `design-refs/tools/` — realistyczne progi: tekst/layout ~2–3% diff, sekcje z fotografiami 7–16% (szum zdjęć). Heatmapa mówi więcej niż liczba.
- Playwright MCP jest skonfigurowany; Chromium w `AppData\Local\ms-playwright`.

### Fonty
- Role w layout.tsx: `font-display` (Poppins), `font-body` (Roboto), `font-nav` (Iceberg), `font-button` (HK Modular — lokalny), `font-form` (Montserrat). Nowy design może to zmienić — ale wzorzec „font per rola przez zmienne CSS" zostaw.
- Uwaga: użytkownik już raz kazał podmienić fonty designu (Montserrat→Poppins na nagłówkach O Nas, Open Sauce→Roboto). **Przy nowym designie potwierdź mapowanie fontów z użytkownikiem, zanim wdrożysz.**

---

## 4. Proces pracy z użytkownikiem (tak to działało i działa dobrze)

- **Sekcja po sekcji, od góry**: zbuduj → zwaliduj vs crop designu → pokaż → użytkownik review'uje → poprawki → dopiero następna. Użytkownik daje konkretny feedback (z-order, rotacje, kolory) i oczekuje szybkich iteracji.
- **TODO.md = źródło prawdy** o otwartej pracy (czytaj na starcie sesji, aktualizuj na bieżąco). Osobne TODO per strona sprawdziły się (`TODO-o-nas.md`, `TODO-kurs.md`).
- **CHANGELOG.md** — jeden datowany wpis na koniec KAŻDEJ sesji: co zrobione, co zwalidowane, co otwarte. To obowiązkowa reguła projektu (CLAUDE.md).
- Decyzje projektowe, które podjął użytkownik i raczej obowiązują dalej: ultrawide = framed canvas (cap 2400), brak per-pixel walidacji na branchu `immersive` (ale nowa budowa od zera może wrócić do pixel-perfect — **dopytaj**), responsywność między breakpointami designu należy do nas.

---

## 5. Git / publikacja — NIE SIŁUJ SIĘ Z REMOTE

- Repo na GitHubie (`devvile/kompetencje-strona-nowa`) ma **osobną, spłaszczoną historię** (appka w root repo, bez `design-refs/`) — **brak wspólnego ancestora** z tym workspace. Zwykły push będzie odrzucony jako non-fast-forward. **Nigdy nie force-pushuj** (opublikowałbyś ciężkie design-refs i zepsuł layout).
- Publikacja = workflow „publish": branch `publish` śledzi `origin/master` → `git worktree add` → skopiuj zawartość `komp-ai/` (src, public, scripts, configi root; POMIŃ CLAUDE.md/.gitignore — remote ma własne) → `core.autocrlf=true` → commit → push na `origin/main` **i** `origin/master`. Szczegóły w CHANGELOG wpis 2026-07-07.
- `.gitignore` lokalnie wyklucza pełne rendery Figmy i `design-refs/tools` — utrzymuj to, pliki są ogromne.

## 6. Środowisko (Windows!)

- Windows 11, shell PowerShell 5.1 (brak `&&`) + Git Bash. Ścieżki i CRLF potrafią gryźć — stąd `core.autocrlf` w publish workflow.
- Dev serwer lubi zostawać jako zombie na :3000 (wtedy 404 na wszystko) — jak dev server dziwnie odpowiada, najpierw sprawdź/ubij stary proces, dopiero potem debuguj kod.
- Ustawienia projektu: acceptEdits włączone w `.claude/settings.local.json`.

## 7. Otwarte sprawy odziedziczone (do zweryfikowania z nowym designem)

- Home page mobile nigdy nie został dostarczony w starym designie — sprawdź, czy nowy design go ma.
- Burger-menu: designer dał tylko stan zamknięty; overlay był naszym projektem.
- Brak backendu formularza kontaktowego (form jest prezentacyjny) i brak prawdziwego Sanity.
- Robot hero miał tylko 1.18x asset — na retina proś designera o eksporty 2x.
- Na branchu `immersive` zaczęła się faza animacji (GSAP/Three.js/Higgsfield approved, nic jeszcze nie zbudowano poza notatką `HIGGSFIELD-HERO-VIDEO.md`) — ustal z użytkownikiem, czy nowa budowa ma być od razu animowana, czy najpierw statyczna.

---

**TL;DR dla Ciebie, agencie:** (1) poproś o świeżą duplikację pliku do teamu Pro i nowy fileKey, (2) get_metadata → jeden pełny render → buduj sekcja po sekcji wzorcem @container+cqw+workspace-cap, (3) waliduj shot.js + hscroll.js po każdej sekcji, (4) nie ufaj współrzędnym obróconych node'ów ani screenshotom bez tła, renderuj outline'owany tekst prawdziwym fontem, (5) prowadź TODO.md i CHANGELOG.md, (6) publikuj tylko workflow'em „publish", nigdy force-push.
