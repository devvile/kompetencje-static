# TODO — kompetencje.ai (nowy design)

> Źródło prawdy o otwartej pracy. Aktualizować na bieżąco.

## Plan ogólny (kolejność uzgodniona z Patrykiem)

1. **Faza 1: pixel-perfect** — wszystkie widoki, desktop + mobile, widok po widoku (home → kolejne).
2. **Faza 2: animacje** — GSAP (ScrollTrigger) + Three.js; wersja pixel-perfect = referencja.
3. **Faza 3: assety Higgsfield** — hero-animacje generowane per strona.
4. Całość zoptymalizowana pod SEO (sprzedaż kursów AI, keyword „kompetencje.ai").

## Mapa sekcji — HOME DESKTOP (node 245:3490, 1440×8564)

| # | Sekcja | y-zakres | Kluczowe node'y |
|---|--------|----------|-----------------|
| 1 | Nav (Menu) | 14–99 | instance `407:2807` (1249×85) |
| 2 | Hero z robotem | 0–~833 | robot `401:2568` (646×807), H1 `401:2579` „ZDOBĄDŹ Z NAMI KOMPETENCJE AI", `401:2580` „WYKORZYSTAJ DZIŚ SWOJĄ SZANSE", `401:2581` „i wyrusz z nami ku przyszłości !", button `401:2582` „WYBIERZ KURS DLA SIEBIE", grupa `401:2584`, gwiazdy `401:2610`, `401:2611`, strzałka `401:2612` |
| 3 | Manifest „NIE CHODZI O TO," | 833–2161 | tło `245:4366` (1440×1328), gwiazdka `407:2854`, glob `245:4367`, teksty `245:4395`, `407:2853`, `245:4382`, `407:2863`, strzałka `407:2865`, `412:2909`, polygon `407:2874` |
| 4 | Pasek „TY DECYDUJESZ" + marquee | 1963–2161 | `245:4380`, `245:4381`, `245:4383`, `245:4396`, marquee `245:4580` |
| 5 | Blok DNA #1 | ~2258–2818 | dna img `421:3001`, karta `412:2961` (Frame 108, 904×554) |
| 6 | Blok DNA #2 | ~2937–3491 | dna img `421:3003`, `421:3005`, karta `421:3006` (Frame 109), gwiazdy `423:3036`, `423:3027` |
| 7 | Kursy (3 karty) | 3663–4469 | tło `245:8087` (1440×806), frame `245:8089`, karty `245:8239`, `245:8597`, `245:8991` |
| 8 | Human and machine | 4537–5347 | frame `245:9699` |
| 9 | Nasi prowadzący (3 osoby) | 5450–6249 | tło `250:9703`, nagłówek `250:9702`, karty `253:1407` (Frame 60/63/64), cliparty `250:9714`, `250:9724` |
| 10 | Kontakt + formularz | 6249–7755 | tło `245:9696` (1440×1506), frame `245:9649`, form `245:9653` (674×864), 2× STAR_OUTLINE |
| 11 | Stopka | 7755–8046 | instance `245:9562` (1441×291) |

## Mapa sekcji — HOME MOBILE (node 375:1738, 402×11040)

| # | Sekcja | y-zakres | Kluczowe node'y |
|---|--------|----------|-----------------|
| 1 | Top bar (logo + burger) | 44–114 | `375:1739`, Menu `375:1749` |
| 2 | Hero | ~114–875 | teksty `397:1837`/`375:1764`/`375:1765`, robot `375:1763` (525×656, x=-122 bleed), Big Button `401:1838` (y776) |
| 3 | „i wyrusz z nami…" + Group 9 | 1072–1509 | `432:1536`, `432:1537`, strzałka `432:1538`; TLO `375:1793` (y875–3087) |
| 4 | Manifest „NIE CHODZI O TO," | 1526–2608 | `375:1794`, `375:1807`, glob `375:1795`, `375:1808`, `375:1818`, gwiazdki `375:1809`/`375:1833` |
| 5 | Frame 78 + Big Button | 2650–2994 | `375:1820`, `375:1842`, strzałki `375:1823`/`375:1845` |
| 6 | Pasek „TY DECYDUJESZ" | 3060–3266 | `375:1861`, `375:1854`, `375:1862`, `375:1864` |
| 7 | Blok DNA #1 i #2 | 3313–4883 | Frame 108 `412:2925` (362×715), Frame 109 `423:3041`, dna img `423:3059`/`423:3060` |
| 8 | Human and machine | 4744–5335 | `423:3066` |
| 9 | Nasi prowadzący | 5652–7592 | nagłówek `423:3420`, „poznajmy się !" `423:3448`, karty: PATRYK CZEMIEROWSKI `423:3480`/`423:3461`, PIOTR MAŁYSZ `423:3507`/`423:3508`, WIKTORIA SŁAWIŃSKA `423:3550`/`423:3531`; tło `423:3362` (y5355–9003) |
| 10 | Kontakt + form | 7720–8820 | `423:3363`, form `423:3366` (353×864) |
| 11 | Stopka | 9003–9811 | `423:3275` (402×808) |

UWAGA: mobile frame ma 11040 wys., stopka kończy się ~9811 — sprawdzić co jest w 9811–11040 (crop z renderu).
ZWERYFIKOWANO (2026-07-16): mobile NIE MA sekcji kursów (3 kart) — render 4600–5800 pokazuje DNA → HUMAN/MACHINE → POZNAJMY SIĘ. Sekcja kursy = `hidden md:block`.

## Mapa sekcji — O NAS DESKTOP (node 229:1094, 1440×7568) — START 2026-07-16

| # | Sekcja | y-zakres | Kluczowe node'y |
|---|--------|----------|-----------------|
| 1 | Nav + hero KOMPETENCJE | 0–840 | Menu `401:2237` (reuse), kicker dots (81,135), KOMPE grupy `401:2408-2424` (y243–415), TENCJE `401:2238` (133,425 1080×308), robot `401:2280` (435,185 421×655), logo .AI `401:2428` (966,492), badge pion prawa krawędź, STAR_OUTLINE `407:2847` |
| 2 | Q&A 4 bloki | 800–1996 | pigułki `229:1867/1869/1871/1873`, recty `229:1839-1842`, teksty `229:1857-1860`, 3× STAR_ARROW `229:1906-1908` |
| 3 | Lime „szkolenia które działają" | 1931–3140 | Rectangle 9, header `229:1861` (2167), linie `229:1930-1935` (grid 2120/2237/2717/2909 + pion x695), teksty `229:1862-1866`, strzałki `229:1936/1945` |
| 4 | Prowadzący ×3 | 3140–5904 | TEKSTURA tła `229:1102` (4428px!), pill poznajmy `229:1875` (409,3066), PATRYK y3331 / PIOTR y4199 / WIKTORIA y5059, foto recty `229:2150-2152` (336×464-469), tagi + ikony, STAR_OUTLINE'y, bloby lewe `229:2108/2129` |
| 5 | CTA POZNAJ NASZE KURSY | 5846–5963 | pill `245:3883`, linia Rectangle 14 (0,5904) |
| 6 | Kontakt | 6080–7277 | header `229:2294` (centr.), form `234:2367` (384,6277) — REUSE stylów z home |
| 7 | Stopka | 7277–7568 | `245:3972` — REUSE komponentu |

**UWAGA hero (wytyczna Patryka 2026-07-16):** „TENCJE" = outline Poppins (jak MACHINE);
„KOMPE" w Figmie jest po literze (scaleX per litera) — implementować jako JEDEN string,
ma po prostu tak wyglądać.

## Mapa sekcji — O NAS MOBILE (node 326:1050, 402×20918; treść do ~12325, niżej pusto)

| # | Sekcja | y-zakres | Kluczowe node'y |
|---|--------|----------|-----------------|
| 1 | Top bar + hero | 0–975 | logo+burger `326:1301`, kicker `375:1753` (29,143), KOMPETENCJE `432:1658` (117,238), robot `432:1646`, logo `432:1610`, STAR_ARROW `330:1601` (189,787) |
| 2 | „wyrusz z nami ku przyszłości !" | 975–1411 | `329:1325`, Group 9 `329:1421` |
| 3 | Q&A 4 bloki | 1402–2948 | `329:1479/1492/1504` + `330:1544`, STAR_ARROWs, tło Rectangle 5 (0,873,402×2194) |
| 4 | Lime | 3053–5310 | Rectangle 5 (0,3053,402×2257), header `330:1620`, linie `337:1624/1626/1643`, Group 10/11 (strzałki+linie), Group 12/13 |
| 5 | Prowadzący | 5128–10161 | Rectangle 6 (0,5167,402×7158), pill `337:1639` (31,5128), PATRYK 5257 / PIOTR 6910 / WIKTORIA 8553 |
| 6 | CTA + kontakt | 10161–11517 | `341:1860`, header `341:1862`, form `341:1863` (27,10516), STAR_ARROWs |
| 7 | Stopka | 11517–12325 | `341:2111+` — REUSE |

Rendery: `design-refs/onas-desktop-full.png` (1440×7568), `onas-mobile-full.png` (402×20918)
— przez get_screenshot z maxDimension (download_assets capuje do 4096!). Surowe obrazy
w `design-refs/onas-raw/` (zdjęcia prowadzących te same co home; robot 354×500;
tekstury 2624×1630; maski logo).

## Otwarte zadania

- [x] Duplikat Figmy w teamie Pro (fileKey `XsorNfllBh0GzGUQraAmtS`)
- [x] get_metadata home desktop + mobile; pełne rendery w `design-refs/`
- [x] Scaffold Next.js 16 w `komp-ai/` + skrypty walidacyjne
- [x] Fonty designu: Montserrat Black/Regular (nagłówki), HK Modular Bold (nav/przyciski/techno), Manrope (body) — do potwierdzenia przez Patryka przy review
- [x] Nav + hero desktop (diff 1.73%) i mobile (~4.5%, szum foto) — CZEKA NA REVIEW Patryka
- [x] Sekcja 2 manifest + pasek TY DECYDUJESZ, desktop (4.54%) + mobile (8.4%, foto) — marquee animowane CSS
- [x] Sekcja 3: bloki DNA — desktop 7.7% / mobile 13.3% (sub-px resampling foto); karta = komponent, treść x2 z content layer
- [x] Sekcja 4: kursy (3 karty, desktop y3663–4469) — diff 1.68% (AA nagłówka); mobile NIE MA tej sekcji w designie (zweryfikowano na renderze: DNA → human/machine → prowadzący)
- [x] Sekcja 5: Human and machine DESKTOP — diff 1.04% + zmiana designera wdrożona z opisu
      Patryka (N i M stykają się rogami bez nachodzenia; „&" dodany i WYCOFANY — designer
      zrezygnował). MACHINE = Poppins 800 outline (Montserrat w text-stroke pokazuje szwy).
      UWAGA: lokalny render Figmy ma STARY układ liter — diff nie jest miarodajny dla MACHINE.
- [x] Sekcja 5 MOBILE — GOTOWA, diff 3.26%, ZAAKCEPTOWANA przez Patryka („jest ok").
      Litery HUMAN/MACHINE/caption spasowane ≤1px z metadanych Figmy (423:3066);
      MACHINE: tracking zawężony tak, by E kończyło się NA krawędzi 402px bez ucięcia
      (decyzja Patryka; próba „M pod M" wdrożona i WYCOFANA na jego prośbę).
      Nowe assety: hm-star-m-f2 (lime + bleed 17px nad sekcję, dziury/wcięcia po
      starym tekście zasklepione), hm-star-blue-m-f (niebieska gwiazda outline —
      STAR_OUTLINE 423:3583 zrotowana, wycięta z renderu alpha z kanału R),
      hm-line-star-m-f (zakręt linii dolnej wokół małej gwiazdy + gwiazda, tip 4px
      pod sekcją — sekcja bez overflow-hidden, z-10). Linie mobile cienkie 1.2px.
- [x] Mała gwiazda outline na granicy human-machine/prowadzący — wypieczona razem
      z zakrętem linii (hm-line-star-m-f), tip bleeduje pod sekcję.
- [x] Sekcja 6: Nasi prowadzący / „poznajmy się !" — desktop 0.91% + mobile 1.27%
      (2026-07-16). Desktop: karty 1:1 z metadanych (radius 49/40/40 i foto 405/405/398
      — niespójności designera zachowane), zdjęcia z rawImages + kadry %, gwiazdy
      wypieczone (lewa ZA kartą, dziury zasklepione closingiem). Mobile: pill
      „POZNAJMY SIĘ !", teksty HK rozciągnięte scaleX(1.1) (glify-kwadraty w designie),
      6 małych gwiazdek = 1 asset, foto rogi TYLKO bl+tr 100px, border Piotra 70% alpha.
      WAŻNE: desktop shoty MUSZĄ być viewport 833 (nie 840) — hero=100svh; przy 840
      wszystko poniżej hero było +7px (hero 0.67%, hm 1.25% przy 833).
      hm-mobile: dodany pas niebieskiego tła (design blue od y5355) → diff 1.12%.
- [x] Sekcja 7: Kontakt + formularz — desktop 0.55% + mobile 2.28% (2026-07-16).
      Semantyczny <form> (label/input/textarea/checkbox/button); struktura z design
      contextu (pitch pól 100 desktop / 97 mobile — label lh 20!); wielkie białe
      STAR_OUTLINE (18% alpha) wypieczone; mobile: fonty formy mniejsze niż desktop
      (label 11, input 11.5, button 14.4). Poprawione placeholdery designera:
      consent „rodo blablabla" → „Akceptuję regulamin i politykę prywatności";
      telefon „000 000 000" ZOSTAJE do podmiany przez Patryka.
- [x] Stopka — desktop 0.82% + mobile 1.50% (2026-07-16). Bg #000ae6 (ciemniejszy
      niż brand blue), logo .AI = crop z renderu, ikony mail/telefon = lucide-react
      (Mail + Smartphone, decyzja Patryka: gotowa biblioteka zamiast SVG z Figmy),
      linki semantyczne (nav/a), literówka „POlityka prywatnośco" poprawiona.
      Mobile: copyright większy lime (10.9) + mniejszy white (7.1), wyśrodkowany.
- [x] **CAŁY HOME zbudowany: 11/11 sekcji desktop + mobile.** Zweryfikowano:
      poniżej stopki mobile (y9811..11040) w designie jest tylko puste szare tło.
- [ ] Review Patryka całości home (desktop + mobile) → poprawki.
- [ ] Formularz: podpiąć wysyłkę (action/endpoint) — na razie action="#".
- [ ] **O NAS (w budowie od 2026-07-16)**: route /o-nas + SEO metadata + SiteNav
      wyekstrahowany do shared (logo → link do home, wytyczna Patryka).
      Hero desktop 2.68% (hero+nav = 100svh, wytyczna Patryka; KOMPE 1:1, TENCJE
      stroke 3.5 track 23). Q&A desktop 1.12% (recty z sondą naroży r60, piguły
      border 4 white HK 18, teksty Montserrat Medium 18, lh per blok 22/24;
      origin canvasu = y840 = koniec hero, pill 1 bleeduje 39px w górę).
      Lime desktop 1.72% (grid linii 1px -1px vs metadane, pion x695 przez całą
      sekcję + bleed 190px; body = 2 akapity Regular+SemiBold f18 justify z
      odstępami; nagłówek HK 15/18 akcent; NOWOCZESNE HK 16 lh35).
      ZOSTAŁO desktop: prowadzący (TEKSTURA 4428px!), CTA, kontakt reuse; potem
      cały mobile (mapa w tabelach wyżej).
- [ ] Content layer (mock Sanity) od pierwszej sekcji
- [ ] SEO: metadata API, OG, semantyka, keyword „kompetencje.ai"
- [ ] Pozostałe widoki (podstrony) — Patryk dostarczy linki po zakończeniu home
- [ ] Faza 2: GSAP + Three.js (po akceptacji pixel-perfect)
- [ ] Faza 3: Higgsfield hero-assety
- [ ] Ustalić repo do publikacji (stare devvile/kompetencje-strona-nowa vs nowe)

## Znalezione problemy w designie (do zgłoszenia)

- Stopka mobile: „POlityka prywatnośco" (literówka), telefon „000 000 000" (placeholder) — poprawiam w kodzie.

## Znane drobne odchyłki impl (nie blokują)

- DNA mobile, karta #2: wnętrze karty ~6px niżej niż w designie (button ZOBACZ
  SZCZEGÓŁY: impl y4790 vs design y4784) — do domknięcia przy następnym przejściu
  po sekcji DNA.
