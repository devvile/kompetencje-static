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

* **2026-07-31:**
  1. **Aktualizacja danych kontaktowych i ochrona anty-spamowa:**
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
