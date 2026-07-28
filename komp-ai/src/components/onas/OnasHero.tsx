/*
 * O NAS — hero desktop (canvas 1440×840, y0–840 strony; node 229:1094 dzieci).
 * Z-order: TENCJE (outline, ZA robotem) → robot (cutout z raw foto, keying
 * czarnego tła) → KOMPE (solid, NAD robotem) → logo .AI (raw14 keyed).
 * KOMPE = JEDEN string (Figma ma litery rozciągane osobno — decyzja Patryka);
 * TENCJE = Poppins 800 outline (jak MACHINE), rozsunięte TEN | CJE wokół robota.
 * Pozycje: ink z renderu (KOMPE 218..1138 × 243..418; TEN od x133, CJE od x731,
 * cap y487..672); logo .AI zmapowane po pasku „I" (raw14 → 444.4px @ 964.9,495.8).
 */
import type { NavLink, ONasHero } from "@/content/types";
import SiteNav from "../shared/SiteNav";
import MobileTopBar from "../shared/MobileTopBar";

const c = (px: number) => `${(px / 14.4).toFixed(4)}cqw`;

const G = {
  h: 840,
  kicker: { left: 80, top: 130, fontPx: 18.3, trackPx: 0.3, lhPx: 25.7 }, // ink 81..300 × 135..203
  starKicker: { left: 140, top: 176, w: 140, h: 139 },
  starTR: { left: 1240, top: 180, w: 160, h: 150 },
  kompe: { left: 204, top: 208, fontPx: 241, trackPx: -1 }, // ink cel 218..1138 × 243..418
  tencje: { fontPx: 247, strokePx: 3.5, trackPx: 23, top: 458.6, leftL: 132, leftR: 706 }, // cap cel y487..672, stroke designu 3px
  robot: { left: 434.7, top: 184.7, w: 420.8, h: 655.2 },
  aiLogo: { left: 964.9, top: 495.8, w: 444.4, h: 444.4 },
};

/* mobile: canvas 402 szer. (1cqw = 4.02px) */
const cm = (px: number) => `${(px / 4.02).toFixed(4)}cqw`;

/* MOBILE — canvas 402×873 (node 326:1050, y0..873 = start niebieskiego tła
 * sekcji 2), hero+topbar = 100svh. KOMPETENCJE = 4 linie SOLID blue (tak ma
 * Figma mobile — bez outline), wyrównane do prawej x373, NAD robotem. Robot
 * bleeduje z lewej (-175). Logo .AI mobile = wariant z paskiem-ramką (bake
 * blue-only z renderu, duchy robota wyczyszczone). */
const GMOB = {
  h: 873,
  topBar: { logo: { x: 15, y: 43, w: 60.74, h: 70 }, burger: { x: 342, y: 58, w: 40, h: 40 } },
  kicker: { left: 29, top: 146, fontPx: 14, trackPx: 0.3, lhPx: 24 }, // ink 30..194 × 150..208
  stars: { x: 203, y: 93, w: 125, h: 142 },
  // robot WYPIECZONY z renderu (achromatyczna ekstrakcja) — sylwetka 1:1 z Figmą
  // (szeroka głowa, podbródek przy wierzchołku A logo; transform Figmy nieodtwarzalny)
  robot: { x: 0, y: 113, w: 320, h: 760 },
  blobL: { x: 0, y: 123, w: 86, h: 166 },
  // litery designu ściśnięte poziomo ~0.73 (origin top-right: prawa krawędź x373
  // zostaje, lewy margines rośnie — uwaga Patryka o marginesie z lewej)
  // f80/scaleX0.81: cap designu ~57 przy lh81 — mniejszy font + łagodniejszy
  // ścisk (uwaga Patryka: 0.73 był „too tight")
  title: { right: 25, top: 244, fontPx: 80, lhPx: 81, trackPx: 0, scaleX: 0.81 },
  logo: { x: 55, y: 650, w: 347, h: 222 },
};

function OnasHeroMobile({ hero, nav }: { hero: ONasHero; nav: NavLink[] }) {
  const lines = ["KOMPE", "TEN", "CJ", "E"];
  return (
    // poster PEŁNEJ SZEROKOŚCI w naturalnych proporcjach (402/873) — treść
    // rozciągnięta na całą szerokość ekranu (uwaga Patryka: contain zostawiał
    // pusty prawy pas). Sekcja ≈ 100svh + nav (jak landing), dół (logo .AI)
    // dojeżdża się minimalnym scrollem. Nav = wspólny MobileTopBar, bez zmian.
    <section className="relative w-full bg-page md:hidden">
      <MobileTopBar nav={nav} />
      <div className="@container relative mx-auto w-full">
        <div className="relative overflow-x-clip bg-page" style={{ aspectRatio: `402/${GMOB.h}` }} data-node-id="326:1050">
          {/* KOMPETENCJE — 4 linie solid, ZA robotem (głowa nachodzi na litery) */}
          <h1
            className="absolute origin-top-right text-right font-display font-black text-brand-blue"
            style={{
              right: cm(GMOB.title.right), top: cm(GMOB.title.top), fontSize: cm(GMOB.title.fontPx),
              lineHeight: `${(GMOB.title.lhPx / 4.02).toFixed(4)}cqw`, letterSpacing: cm(GMOB.title.trackPx),
              transform: `scaleX(${GMOB.title.scaleX})`,
            }}
          >
            {lines.map((l) => (
              <span key={l} className="block">{l}</span>
            ))}
          </h1>
          {/* robot — NAD literami (z-order designu) */}
          <img
            src="/assets/onas-robot-m-f.png"
            alt="Chromowana głowa robota — sztuczna inteligencja"
            className="absolute"
            style={{ left: cm(GMOB.robot.x), top: cm(GMOB.robot.y), width: cm(GMOB.robot.w), height: cm(GMOB.robot.h) }}
          />
          {/* lime kształt przy lewej krawędzi */}
          <img src="/assets/onas-m-blob-l-f.png" alt="" aria-hidden className="absolute"
            style={{ left: cm(GMOB.blobL.x), top: cm(GMOB.blobL.y), width: cm(GMOB.blobL.w), height: cm(GMOB.blobL.h) }} />
          {/* gwiazdki przy kickerze */}
          <img src="/assets/onas-m-stars-kicker-f.png" alt="" aria-hidden className="absolute"
            style={{ left: cm(GMOB.stars.x), top: cm(GMOB.stars.y), width: cm(GMOB.stars.w), height: cm(GMOB.stars.h) }} />
          {/* kicker */}
          <p
            className="absolute font-modular text-brand-blue"
            style={{
              left: cm(GMOB.kicker.left), top: cm(GMOB.kicker.top), fontSize: cm(GMOB.kicker.fontPx),
              letterSpacing: cm(GMOB.kicker.trackPx), lineHeight: `${(GMOB.kicker.lhPx / 4.02).toFixed(4)}cqw`,
            }}
          >
            {hero.kickerLines.map((l) => (
              <span key={l} className="block">{l}</span>
            ))}
          </p>
          {/* logo .AI mobile */}
          <img src="/assets/onas-m-logo-f.png" alt="" aria-hidden className="absolute"
            style={{ left: cm(GMOB.logo.x), top: cm(GMOB.logo.y), width: cm(GMOB.logo.w), height: cm(GMOB.logo.h) }} />
        </div>
      </div>
    </section>
  );
}

export default function OnasHero({ hero, nav }: { hero: ONasHero; nav: NavLink[] }) {
  return (
    <>
    <OnasHeroMobile hero={hero} nav={nav} />
    {/* hero + nav = dokładnie 100svh (wytyczna Patryka — jak na home) */}
    <section className="relative hidden h-svh w-full md:flex md:items-center md:justify-center">
      <div
        className="@container mx-auto w-full"
        style={{ width: `min(100%, var(--workspace), calc(100svh * (1440 / ${G.h})))` }}
      >
        <div className="relative bg-page" style={{ aspectRatio: `1440/${G.h}` }} data-node-id="229:1094">
          <SiteNav nav={nav} />
          {/* gwiazdka lime za kickerem */}
          <img src="/assets/onas-star-kicker-f.png" alt="" aria-hidden className="absolute"
            style={{ left: c(G.starKicker.left), top: c(G.starKicker.top), width: c(G.starKicker.w), height: c(G.starKicker.h) }} />
          {/* kicker */}
          <p
            className="absolute font-modular text-brand-blue"
            style={{
              left: c(G.kicker.left), top: c(G.kicker.top), fontSize: c(G.kicker.fontPx),
              letterSpacing: c(G.kicker.trackPx), lineHeight: `${(G.kicker.lhPx / 14.4).toFixed(4)}cqw`,
            }}
          >
            {hero.kickerLines.map((l) => (
              <span key={l} className="block">{l}</span>
            ))}
          </p>
          {/* gwiazda outline top-right */}
          <img src="/assets/onas-star-tr-f.png" alt="" aria-hidden className="absolute"
            style={{ left: c(G.starTR.left), top: c(G.starTR.top), width: c(G.starTR.w), height: c(G.starTR.h) }} />
          {/* TENCJE — outline ZA robotem, rozsunięte */}
          <div aria-hidden className="absolute inset-0">
            {[{ t: hero.titleOutlineLeft, left: G.tencje.leftL }, { t: hero.titleOutlineRight, left: G.tencje.leftR }].map(({ t, left }) => (
              <span
                key={t}
                className="absolute whitespace-nowrap font-extrabold text-transparent"
                style={{
                  left: c(left), top: c(G.tencje.top),
                  fontFamily: "var(--font-poppins)",
                  fontSize: c(G.tencje.fontPx), lineHeight: 1, letterSpacing: c(G.tencje.trackPx),
                  WebkitTextStroke: `${c(G.tencje.strokePx)} var(--color-brand-blue)`,
                }}
              >
                {t}
              </span>
            ))}
          </div>
          {/* robot */}
          <img
            src="/assets/onas-robot-2x.png"
            alt="Chromowana głowa robota — sztuczna inteligencja"
            className="absolute"
            style={{ left: c(G.robot.left), top: c(G.robot.top), width: c(G.robot.w), height: c(G.robot.h) }}
            data-node-id="401:2280"
          />
          {/* KOMPE — solid NAD robotem; h1 sematycznie obejmuje całość */}
          <h1
            className="absolute whitespace-nowrap font-display font-black text-brand-blue"
            style={{
              left: c(G.kompe.left), top: c(G.kompe.top),
              fontSize: c(G.kompe.fontPx), lineHeight: 1, letterSpacing: c(G.kompe.trackPx),
            }}
          >
            {hero.titleSolid}
            <span className="sr-only">{hero.titleOutlineLeft}{hero.titleOutlineRight}</span>
          </h1>
          {/* logo .AI */}
          <img
            src="/assets/onas-ai-logo.png" alt="" aria-hidden className="absolute"
            style={{ left: c(G.aiLogo.left), top: c(G.aiLogo.top), width: c(G.aiLogo.w), height: c(G.aiLogo.h) }}
            data-node-id="401:2428"
          />
        </div>
      </div>
    </section>
    </>
  );
}
