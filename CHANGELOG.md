# CHANGELOG

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
