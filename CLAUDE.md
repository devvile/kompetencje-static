# Projekt: kompetencje.ai — nowy design (Figma → Next.js)

Strona sprzedażowa kursów AI (kompetencje.ai). Budowa pixel-perfect z NOWEGO designu Figma,
desktop + mobile, widok po widoku. Po zakończeniu wersji statycznej: animacje GSAP/Three.js
oraz hero-animacje generowane w Higgsfield (wersja pixel-perfect = referencja dla animacji).

**NIE sugerować się starym designem/projektem** (`Documents/claude1`) — stamtąd bierzemy tylko
infrastrukturę techniczną (skrypty walidacyjne, wzorce CSS, workflow). Layout, content, fonty,
kolory — wyłącznie z nowego pliku Figma.

## SEO

Strona ma być zoptymalizowana pod sprzedaż kursów AI, słowo kluczowe: **kompetencje.ai** /
„kompetencje AI". Metadane, semantyczny HTML (h1-h6, landmarki), OG tags, sensowne titles
per podstrona.

## Figma (stan 2026-07-12)

- Plik roboczy: **`XsorNfllBh0GzGUQraAmtS`** („komp.ai final (Copy)") — duplikat w teamie Pro
  Patryka → 200 wywołań MCP/dzień, 10/min.
- **NIGDY nie wołać** oryginału `E89cL9RG0oh3mXDZOMtiaF` (team Starter designera, 6 wywołań/mies).
- Stare kopie (`iPLmSEowDDjnbWysJoLFXM`, `r5JldYverS71ArswR7Lj7a`) — nieaktualne, nie używać.
- Node-idy są identyczne między oryginałem a duplikatem.
- Kluczowe node'y: home desktop `245:3490` („Strona główna", 1440×8564),
  home mobile `375:1738` („Strona_glowna_mobile", 402×11040).
- Workflow oszczędzania wywołań: get_metadata raz per strona → jeden pełny render do
  `design-refs/` → cropy lokalnie (sharp/node) → get_design_context tylko per budowaną sekcję →
  download_assets raz per asset.

## Struktura workspace

- `komp-ai/` — appka Next.js 16 (App Router, TS, Tailwind v4). Dev: `npm run dev` w komp-ai/.
- `design-refs/` — pełne rendery i metadata z Figmy + `tools/` (cropy, diffy, detekcja gwiazdek).
  Pełne rendery i tools są w .gitignore (duże pliki).
- `fonts/` — lokalne pliki fontów (modular.woff/woff2 ze starego projektu — użyć TYLKO jeśli
  nowy design faktycznie używa HK Modular; potwierdzić mapowanie fontów z użytkownikiem).
- `HANDOFF-NOWY-AGENT.md` — lekcje poprzedniego agenta (pułapki Figmy, wzorce, publish workflow).

## Reguły każdej sesji

- **TODO.md** = źródło prawdy o otwartej pracy. Czytaj na starcie, aktualizuj na bieżąco.
- **CHANGELOG.md** = jeden datowany wpis na koniec każdej sesji: co zrobione, co zwalidowane,
  co otwarte.
- Proces: sekcja po sekcji od góry → build → walidacja vs crop designu → pokaż użytkownikowi →
  poprawki → następna sekcja.
- Walidacja: `komp-ai/scripts/shot.js` (czeka na fonty; NIE używać gołego playwright screenshot),
  `hscroll.js` po każdej sekcji na 375/768/1440/1920/2560.

## Sprawdzone wzorce (z poprzedniej budowy — techniczne, nie designowe)

- **Poster-canvas**: sekcja = zewnętrzny wrapper `@container` + wewnętrzny `aspect-[W/H]`,
  wymiary w `cqw` (1440: 1cqw=14.4px; mobile 402: 1cqw=4.02px). Kontener zawsze piętro wyżej
  niż element używający cqw.
- Globalny cap `--workspace: 2400px`, wrappery `max-w-(--workspace)`; `overflow-x-clip` na root.
  Bleed między sekcjami: `clip-path: inset(0 0 -150px 0)` zamiast overflow-hidden.
- Mobile: warianty per komponent (`md:hidden` / `hidden md:block`).
- Hero + nav = dokładnie `100svh` (flex column, hero flex-1, poster contained).
- Content layer: mock Sanity — typowany content w `src/content/`, komponenty używają WYŁĄCZNIE
  async getterów (`getHomePage()`); podpięcie Sanity później = podmiana ciał getterów na GROQ.
- Fonty: rola per zmienna CSS (`font-display`, `font-body`, `font-nav`, ...) w layout.tsx.

## Lekcje z budowy hero (2026-07-13) — WAŻNE dla kolejnych sekcji

- **Render z get_screenshot ma kanał ALPHA (RGBA)** — każdy skrypt pomiarowy MUSI czytać
  przez `sharp(...).removeAlpha()` i stride `info.channels`, inaczej kanały się „obracają"
  co piksel i pomiary to śmieci (raz zdiagnozowano to błędnie jako dithering + skalowanie warstw).
- **Metadane/design-context Figmy są WIARYGODNE** dla pozycji/fontów (poza rotowanymi node'ami)
  — po naprawie stride design zgadzał się z metadanymi ~1:1.
- **Eksporty PNG/SVG node'ów wypiekają tło strony** (#EFEFEF) — obiekty z przezroczystością
  (robot-cutout) brać z **rawImages** (źródłowy PNG z alphą), nie z eksportu node'a.
- **Tekstury blend-mode (multiply, białe) spłaszczają się przy eksporcie do mlecznych nakładek**
  — grupy z teksturami (np. logo .AI) filtrować po kolorach (zostawić niebieski/limonkę/białe
  litery w niebieskim sąsiedztwie): wzór w commit „home hero mobile".
- **Kolejność w XML z get_metadata ≠ z-order** — o tym, co jest nad czym, decyduje render
  (desktop: gwiazda ZA robotem; mobile: gwiazda i kicker NAD robotem).
- **Rotowane node'y**: bbox z metadanych kłamie — pozycję mierzyć diff-centroidami
  (`design-refs/tools/hero-align.js`) i iterować: shot → pomiar → korekta (zbiega w 2-3 iteracje).
- Workflow walidacji: `node scripts/shot.js` → `node ../design-refs/tools/hero-align.js` →
  poprawki w obiekcie G/GM komponentu (wartości w px designu, helper c()/cm() → cqw).
- Osiągnięte progi diff: hero desktop 1.73%, hero mobile ~4.5% (szum resamplingu zdjęcia robota
  + AA tekstu; realne elementy spasowane do 1-3px).

## Pułapki designera (obowiązują też w nowym pliku)

- Tekst bywa outline'owany do krzywych → renderować prawdziwym fontem (zidentyfikować krój).
- Ręcznie rozciągane litery (scaleX per litera) → mierzyć ink-bbox z renderu, odtwarzać
  `transform: scaleX()` na spanach.
- Obrócone node'y mają błędne bboxy w metadata → prawdziwe pozycje mierzyć z renderu
  (`design-refs/tools/find-stars.js`).
- Screenshot frame'a może nie zawierać tła-siblinga → kolor tła czytać z fill node'a.
- Literówki/placeholdery w designie (np. „POlityka prywatnośco", telefon „000 000 000") —
  poprawiać w kodzie i flagować użytkownikowi, nie kopiować.

## Środowisko

- Windows 11, PowerShell 5.1 (brak `&&`) + Git Bash. Porty typu :3000 bywają zajęte przez
  zombie-procesy node. **Przed każdą walidacją/screenshotem: pozabijać wszystkie stare procesy
  node/dev-servery, potem wystartować świeży dev server** — dopiero wtedy porównywać.
- Playwright MCP + Chromium w `AppData\Local\ms-playwright`.

## Git

- Repo lokalne w tym folderze (osobne od przypadkowego repo w C:/Users/DOM — nie ruszać tamtego).
- Publikacja na GitHub (devvile/...) — ustalić z użytkownikiem, czy używamy starego repo
  (workflow „publish" z HANDOFF §5 — nigdy force-push) czy nowego.
