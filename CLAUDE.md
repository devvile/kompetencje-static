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

- Windows 11, PowerShell 5.1 (brak `&&`) + Git Bash. Zombie dev-server na :3000 → najpierw ubić
  stary proces, potem debugować.
- Playwright MCP + Chromium w `AppData\Local\ms-playwright`.

## Git

- Repo lokalne w tym folderze (osobne od przypadkowego repo w C:/Users/DOM — nie ruszać tamtego).
- Publikacja na GitHub (devvile/...) — ustalić z użytkownikiem, czy używamy starego repo
  (workflow „publish" z HANDOFF §5 — nigdy force-push) czy nowego.
