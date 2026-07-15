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

## Otwarte zadania

- [x] Duplikat Figmy w teamie Pro (fileKey `XsorNfllBh0GzGUQraAmtS`)
- [x] get_metadata home desktop + mobile; pełne rendery w `design-refs/`
- [x] Scaffold Next.js 16 w `komp-ai/` + skrypty walidacyjne
- [x] Fonty designu: Montserrat Black/Regular (nagłówki), HK Modular Bold (nav/przyciski/techno), Manrope (body) — do potwierdzenia przez Patryka przy review
- [x] Nav + hero desktop (diff 1.73%) i mobile (~4.5%, szum foto) — CZEKA NA REVIEW Patryka
- [x] Sekcja 2 manifest + pasek TY DECYDUJESZ, desktop (4.54%) + mobile (8.4%, foto) — marquee animowane CSS
- [x] Sekcja 3: bloki DNA — desktop 7.7% / mobile 13.3% (sub-px resampling foto); karta = komponent, treść x2 z content layer
- [x] Sekcja 4: kursy (3 karty, desktop y3663–4469) — diff 1.68% (AA nagłówka); mobile NIE MA tej sekcji w designie (zweryfikowano na renderze: DNA → human/machine → prowadzący)
- [ ] Sekcja 5: Human and machine (desktop y4537–5347, frame `245:9699`) — NASTĘPNA
- [ ] Kolejne sekcje wg tabel powyżej, jedna po drugiej
- [ ] Content layer (mock Sanity) od pierwszej sekcji
- [ ] SEO: metadata API, OG, semantyka, keyword „kompetencje.ai"
- [ ] Pozostałe widoki (podstrony) — Patryk dostarczy linki po zakończeniu home
- [ ] Faza 2: GSAP + Three.js (po akceptacji pixel-perfect)
- [ ] Faza 3: Higgsfield hero-assety
- [ ] Ustalić repo do publikacji (stare devvile/kompetencje-strona-nowa vs nowe)

## Znalezione problemy w designie (do zgłoszenia)

- Stopka mobile: „POlityka prywatnośco" (literówka), telefon „000 000 000" (placeholder) — poprawiam w kodzie.
