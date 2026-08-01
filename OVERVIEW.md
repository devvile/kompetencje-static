# OVERVIEW.md — Dokumentacja i Stan Projektu Kompetencje.ai

> **Ważne dla Agentów AI:** 
> 1. Każda nowa sesja pracy z projektem **MUSI** rozpoczynać się od przeczytania tego pliku (`OVERVIEW.md`).
> 2. Po wykonaniu każdej istotnej operacji, modyfikacji kodu lub zmianie struktury, agent **MUSI** zaktualizować ten plik.

---

## 1. O Projekcie

**Kompetencje.ai** to nowoczesna platforma edukacyjna oferująca szkolenia i kursy z zakresu wykorzystania sztucznej inteligencji w biznesie, automatyzacji i codziennej pracy. Projekt został stworzony z dbałością o najwyższą jakość wizualną (pixel-perfect według projektu Figma) oraz z myślą o przyszłej integracji z bezszwowym CMS (Sanity).

---

## 2. Stack Technologiczny

* **Framework:** Next.js (App Router, React 19)
* **Język:** TypeScript
* **Stylizowanie:** Tailwind CSS v4 + Vanilla CSS + Container Query Units (`cqw`)
* **Ikony:** Lucide React (`lucide-react`)
* **Typografia:** 
  * `HK Modular` (lokalne fonty WOFF2 — nagłówki wersalikami)
  * `Montserrat` (Google Font — opisy i podtytuły)
  * `Manrope` (Google Font)
  * `Poppins` (Google Font — teksturiesze outline)
* **Warstwa Danych:** Mock CMS Layer (`src/content/`) przygotowany pod Sanity GROQ

---

## 3. Struktura Katalogów Projektu

```text
kompetencje-ostateczna/
├── AGENTS.md                  # Zasady pracy agentów AI w projekcie
├── OVERVIEW.md                # Niniejsza główna dokumentacja stanu projektu
├── TODO.md                    # Lista zadań i backlogu
├── CHANGELOG.md               # Dziennik zmian
├── CLAUDE.md / HANDOFF...     # Dokumentacja pomocnicza i instrukcje przekazania
├── design-refs/               # Referencje wizualne z Figmy
└── komp-ai/                   # Główna aplikacja Next.js
    ├── AGENTS.md              # Zasady agentów dla aplikacji Next.js
    ├── OVERVIEW.md            # Kopia dokumentacji stanu aplikacji
    ├── public/                # Assety statyczne (obrazy, wideo, logo)
    └── src/
        ├── app/               # Ścieżki Next.js App Router
        │   ├── page.tsx       # Landing page (Strona Główna)
        │   ├── o-nas/         # Podstrona O Nas
        │   ├── kursy/[slug]/  # Podstrona szczegółów kursu
        │   ├── manifest/      # Podstrona Manifestu
        │   ├── polityka-prywatnosci/ # Strona prawna
        │   └── regulamin/     # Strona prawna
        ├── components/        # Komponenty React
        │   ├── home/          # Sekcje strony głównej (Hero, Manifest, DNA, Kursy, HumanMachine, Prowadzacy, Kontakt, Stopka)
        │   ├── onas/          # Sekcje podstrony O Nas
        │   ├── kurs/          # Sekcje podstrony kursu
        │   ├── legal/         # Komponenty stron prawnych
        │   └── shared/        # Komponenty nawigacji, formularzy i animacji (MobileMenu, SiteNav, ProtectedEmail, etc.)
        ├── content/           # Abstrakcja warstwy treści (home.ts, onas.ts, kurs.ts, legal.ts, types.ts, index.ts)
        └── fonts/             # Pliki czcionek (modular.woff2)
```

---

## 4. Kluczowe Konfiguracje i Dane Kontaktowe

* **E-mail kontaktowy:** `patryk@kompetencje.ai` *(zabezpieczony komponentem `ProtectedEmail` przed botami spamującymi)*
* **Telefon kontaktowy:** `513 301 081` *(zabezpieczony komponentem `ProtectedPhone` z podmianą `1` -> `l` w kodzie SSR)*
* **Główne Kolory Brandu:**
  * Brand Blue: `#000ae6` (stopka), `#000cff` / `#000ae6`
  * Brand Lime: `#c8ff00`
  * Background: `#0a0b10` / Dark Theme

---

## 5. Ostatnie Zmiany w Projekcie

* **2026-08-01:**
  1. **Zróżnicowanie kart kursów (landing) — ⚠ treść marketingowa robocza, do akceptacji klienta:**
     * Karty były komponentami, ale grafika i prowadzący byli zahardcodowani — teraz w propsach/content layer: `DnaCard` + `photo`/`photoM`, `KursTile` + `photo`/`leadLabel`/`leadName` (sidebar kafla z propsów).
     * `dnaCards`: #1 AGENT AI W TWOIM BIZNESIE (Piotr Małysz, 1500 PLN, waga — bez zmian), #2 PRACUJ MĄDRZEJ Z AI / automatyzacja (Patryk Czemierowski, 1800 PLN, nowe body). UWAGA: „AUTOMATYZACJA" NIE mieści się w kolumnie tytułu karty (437px @45px vs slot 297px) — stąd krótki tytuł marketingowy.
     * `kursTiles`: BEZPIECZEŃSTWO APLIKACJI (Piotr Małysz, 1500), TWORZENIE TREŚCI Z AI (Wiktoria Sławińska, 1200), PROMPT ENGINEERING (Patryk Czemierowski, 990). Nowe slugi w `kurs.ts` aliasują mock kursAgentAi (brak 404; dedykowane podstrony do dostarczenia).
     * Grafiki Higgsfield (nano banana, styl-referencja = card-waga-src.png; chrom+szkło, granatowa monochromatyka): `card-automatyzacja-src.png` + `m-card-automatyzacja-r.png` (ramię robota z trybikami), `kurs-bezpieczenstwo.png` (kłódka), `kurs-tresci.png` (pióro z hologramami), `kurs-prompt.png` (dymek czatu). Crop do wymiarów slotów (546×422 kafle @2x, 830×1108 / 632×420 DNA).
     * Walidacja: screenshoty desktop/mobile obu sekcji, hscroll 375–2560 czysty, tsc czysty.
     * Fix: cena nie mieściła się na lime sidebarze karty DNA #2 (zawartość 549px vs slot 437px — długie nazwisko; karta #1 też przelewała o 18px). Nowy `components/home/FitRow.tsx` (klient): mierzy zawartość wiersza i skaluje ją `transform: scale` (origin right, ResizeObserver na resize/cqw), użyty w sidebarach kart DNA desktop+mobile. Karta #1 skala 0.96 (niezauważalne), #2 skala 0.80 — wszystko na pasku. Generyczne — długie treści z przyszłego CMS nie rozsadzą paska.

* **2026-07-31:**
  0. **Nowy robot w sekcji Manifest (⚠ ODSTĘPSTWO OD FIGMY — świadoma decyzja Patryka):**
     * Wygenerowano w Higgsfield (Nano Banana Pro, referencja = stary robot) 4 propozycje; wybrano wariant 4 „visor" (biały android z ciemną szklaną szybą i granatową mechaniką, styl nawiązuje do robota hero). Propozycje w `design-refs/robot-proposals/`.
     * Tło usunięte (Higgsfield remove_background), cutout dopasowany do geometrii starych assetów przez wyrównanie bbox alfy (desktop: wysokość + centrowanie, mobile: wysokość + prawa krawędź + dół). Nadpisano `glob-robot-f.png` (1308×1310) i `m-glob-f.png` (804×910) — stare wersje w historii gita. Layout niezmieniony, zwalidowano screenshotami 1440/402.
  0a2. **Podstrona /manifest — pełna treść + nowy layout (⚠ BEZ pokrycia w Figmie — layout autorski):**
     * Treść manifestu (4 akapity od Patryka) w warstwie contentu: `src/content/manifest.ts` + typ `ManifestPage` w `types.ts` + getter `getManifestPage()` w `index.ts`. Zdanie o 25–50% wydzielone do statu, zamknięcie o iskrze do `closingLine` — całość treści zachowana.
     * Layout: hero (kicker + MANIFEST stroke) → split robot+akapity 1-2 → niebieska bela ze statem „od 25 do 50%" (count-up przy wjeździe, `components/manifest/CountUpStat.tsx`) → display „PRZYSZŁOŚĆ NALEŻY DO ODWAŻNYCH" + akapity 3-4 → iskra + CTA „POZNAJ NASZE KURSY" (/#kursy) → stopka. Scroll-reveale przez istniejący RevealObserver (data-reveal), animacje `manifest-float` (robot) i `manifest-spark` (iskra) w globals.css, wszystkie wyłączane przy reduced-motion.
     * Robot: `public/assets/manifest-robot-f.png` (617×1118, alpha) — Higgsfield Nano Banana Pro, referencja = robot „visor" z sekcji Manifesto (spójny charakter), poza „patrzy w przyszłość", tło zdjęte remove_background, trim.
     * Walidacja: hscroll ok na 375/768/1440/1920/2560, count-up i reveale potwierdzone Playwrightem, `tsc --noEmit` czysty.
     * Iteracja 2 (uwagi Patryka): kicker usunięty, tekst PO LEWEJ / robot PO PRAWEJ (większy, max 560px, dosunięty dołem do niebieskiej beli), bez lime gwiazdy za robotem; typografia: akapit 1 = duży lead (font-display), kluczowe frazy w limonkowych markerach (`RichSeg.strong` → `<mark>` z box-decoration-clone), akapit 2 przy limonkowej linii. `paragraphsTop/Bottom` w content layer zmienione na `RichSeg[][]`.
     * Iteracja 4 (wideo power-on robota, desktop): `components/manifest/RobotPowerOn.tsx` + assety `manifest-robot-poweron.mp4` (Seedance 2.0, 6 s, end_image = poza z PNG; 4 propozycje w `design-refs/robot-proposals/wideo-*.mp4`, wybrano power-on) i `manifest-robot-poster.jpg`. Wideo odtwarza się RAZ przy wejściu w viewport i zamiera w pozie identycznej z PNG; flip scaleX(-1) na wrapperze obejmuje wideo i fallback. Reduced-motion/brak autoplay → statyczny PNG/poster. WAŻNE: mix-blend-multiply NIE działa w tej strukturze (stacking konteksty transform/animation/z-index izolują blend) — tło wideo (~#FAFAFA ≠ #EFEFEF strony) zrównane filtrem `brightness(0.954)`; zweryfikowano pomiarem pikseli (rogi kadru = 239 = tło strony).
     * Iteracja 3 (kompozycja hero desktop): robot ABSOLUTNY po prawej (bottom-0 → kotwiczy na beli, h 42cqw, right 4cqw), odbity `scaleX(-1)` (patrzy w LEWO na tytuł/tekst; flip na img WEWNĄTRZ wrappera z manifest-float — animacja transform nadpisałaby scaleX na tym samym elemencie), głową sięga MANIFESTU (h1 z-10 nad robotem). Tekst lewa kolumna max-w 54cqw pod tytułem. Mobile bez zmian (osobny img md:hidden).
  0b. **Wideo dłoni HUMAN/MACHINE odtwarzane 30% szybciej:** `playbackRate = 1.3` w `HumanMachineDesktop.tsx` (sekwencja z lockiem) i `HandsVideo.tsx` (mobile). Zweryfikowano Playwrightem: desktop gra 1.3×, domyka sekwencję i odblokowuje scroll; mobile gra 1.3×.
  1. **Przycisk „powrót na górę" w stopce (`StopkaSection.tsx`):**
     * Komponent `ScrollTopButton` (okrągły, lime outline, `ArrowUp` z lucide) w obu wariantach stopki: desktop prawy-dolny róg (right 130 / top 214 canvas 1440), mobile prawa strona obok bloku kontakt (right 47 / top 612 canvas 402 — niżej kolidował z copyrightem).
     * Scroll: natywny `window.scrollTo({ behavior: "smooth" })` — przerywalny scrollem użytkownika, respektuje `prefers-reduced-motion` (wtedy skok natychmiastowy). Zweryfikowano brak konfliktu z lockiem scrolla sekcji HumanMachine (przy stopce faza sekwencji jest zawsze `done`; test Playwright: klik przy 8767px → płynny zjazd do 0).
     * Animacja przyciągająca uwagę: keyframes `scroll-top-hop` w `globals.css` (konwencja jak `hero-cta-pulse`) — podwójny podskok (translateY w %, skaluje się z cqw) co 3,5 s; wyłączona przy `prefers-reduced-motion`.
  2. **Aktualizacja danych kontaktowych i ochrona anty-spamowa:**
     * Zmieniono adres e-mail na `patryk@kompetencje.ai`.
     * Zmieniono numer telefonu na `513 301 081`.
     * Stworzono i wdrożono komponenty `ProtectedEmail` i `ProtectedPhone` w `StopkaSection.tsx` i `MobileMenu.tsx` chroniące przed scraperami (odwzorowanie `1` -> `l` w HTML oraz dynamiczny rozruch `mailto:`/`tel:` w JS po stronie klienta).
  2. **Audyt Architektury i Kodu:**
     * Przeprowadzono audyt organizacji kodu i stworzono raport `code_organization_audit.md`.
  3. **Wdrożenie Standardu OVERVIEW.md i AGENTS.md:**
     * Utworzono plik `OVERVIEW.md` oraz ustalono żelazną zasadę w `AGENTS.md` dotyczącą odczytu i aktualizacji tego pliku przez Agenty AI przy każdej sesji i operacji.

---

## 6. Protokół Prac dla Agentów AI (Agent Rules)

1. **Na początku sesji:** Odczytaj `OVERVIEW.md`, aby poznać aktualny stan projektu, architekturę i ostatnie modyfikacje.
2. **W trakcie pracy:** Zachowaj estetykę pixel-perfect, typowanie TypeScript oraz strukturę warstwy `src/content/`.
3. **Po zakończeniu operacji:** Zaktualizuj sekcję *Ostatnie Zmiany w Projekcie* oraz ewentualne modyfikacje strukturalne w pliku `OVERVIEW.md`.
