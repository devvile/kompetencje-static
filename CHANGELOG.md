# CHANGELOG

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
