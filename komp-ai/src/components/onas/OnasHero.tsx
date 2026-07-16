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

const c = (px: number) => `${(px / 14.4).toFixed(4)}cqw`;

const G = {
  h: 840,
  kicker: { left: 80, top: 130, fontPx: 18.3, trackPx: 0.3, lhPx: 25.7 }, // ink 81..300 × 135..203
  starKicker: { left: 140, top: 176, w: 140, h: 139 },
  starTR: { left: 1240, top: 180, w: 160, h: 150 },
  kompe: { left: 204, top: 208, fontPx: 241, trackPx: -1 }, // ink cel 218..1138 × 243..418
  tencje: { fontPx: 247, strokePx: 5.5, trackPx: 12, top: 458.6, leftL: 132, leftR: 728 }, // cap cel y487..672
  robot: { left: 434.7, top: 184.7, w: 420.8, h: 655.2 },
  aiLogo: { left: 964.9, top: 495.8, w: 444.4, h: 444.4 },
};

export default function OnasHero({ hero, nav }: { hero: ONasHero; nav: NavLink[] }) {
  return (
    <section className="relative hidden w-full md:block">
      <div className="@container mx-auto w-full max-w-(--workspace)">
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
  );
}
