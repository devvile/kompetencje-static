/*
 * O NAS — sekcja 3: lime „Prowadzimy szkolenia, które naprawdę działają"
 * (desktop y1931–3140, canvas 1440×1209, bg lime). Grid cienkich linii 1px:
 * poziome y2120 (full), y2237 (x695+), y2717 (do x695), y2909 (0..541 i 789+);
 * pion x695 przez CAŁĄ sekcję + bleed 190px w teksturę prowadzących (render).
 * Nagłówek HK 15 z akcentem „działają" 18 (design context); tytuły kolumn
 * Montserrat ExtraBold 50 lh61 (col2 do prawej); body Montserrat Medium 15
 * justify; stopka-notka HK 16. Strzałki = rotowane wektory wypieczone
 * (bez wierszy linii poziomej — tę rysuje CSS).
 */
import type { ONasLime } from "@/content/types";

const c = (px: number) => `${(px / 14.4).toFixed(4)}cqw`;

const G = {
  h: 1209, // y1931..3140
  lines: [
    { x: 0, y: 188, w: 1440 }, // y2119
    { x: 695, y: 305, w: 745 }, // y2236
    { x: 0, y: 785, w: 695 }, // y2716
    { x: 0, y: 977, w: 541 }, // y2908 lewa
    { x: 789, y: 977, w: 651 }, // y2908 prawa
  ],
  lineH: 1.2,
  vline: { x: 694.4, y: 0, h: 1399 }, // pion x695, bleed 190px pod sekcję
  header: { left: 752, top: 236, fontPx: 15, accentPx: 18 }, // ink 753..1333 y2172
  col1Title: { left: 190, top: 256, w: 241, fontPx: 50, lhPx: 61 },
  col1Body: { left: 194, top: 473, w: 401, fontPx: 18, lhPx: 22 },
  col2Title: { left: 740, top: 385, w: 505, fontPx: 50, lhPx: 61 },
  col2Body: { left: 796, top: 684, w: 449, fontPx: 18, lhPx: 22 },
  foot: { left: 136, top: 851, w: 551, fontPx: 16, lhPx: 35 },
  arrows: { x: 556, y: 925, w: 392, h: 152 },
};

/* mobile: canvas 402 szer. (1cqw = 4.02px) */
const cm = (px: number) => `${(px / 4.02).toFixed(4)}cqw`;

/* MOBILE — canvas 402×2100 (lime widoczne y3067..5167; Rectangle 5 zaczyna 3053
 * pod blue Q&A). Treści = te same co desktop (reuse ONasLime); łamania z szerokości.
 * Linie poziome x75..402; grupy strzałka+linia wypieczone w całości. */
const GMOB = {
  h: 2100, // 3067..5167
  lines: [{ y: 186 }, { y: 866 }, { y: 1719 }], // y3253/3933/4786, x75..402
  lineX: 75,
  header: { left: 33, top: 65, w: 345, fontPx: 15, accentPx: 24.5, lhPx: 26 }, // ink y3138; akcent „DZIAŁAJĄ" cap 22
  col1Title: { left: 57, top: 222, w: 241, fontPx: 50, lhPx: 61 }, // ink 58 y3296
  col1Body: { left: 79, top: 533, w: 270, fontPx: 17, lhPx: 22, pGap: 42 }, // centra linii pitch 22 (pomiar), ragged DO PRAWEJ
  col2Title: { left: 25, top: 925, w: 340, fontPx: 40, lhPx: 49 }, // ink ..360 y3999, DO PRAWEJ, 5 linii
  col2Body: { left: 48, top: 1316, w: 243, fontPx: 19, lhPx: 22, pGap: 22 }, // centra pitch 22, justify 8 linii (łamanie po „firmy")
  foot: { left: 63, top: 1752, w: 285, fontPx: 16, lhPx: 32 }, // ink 65..337 y4829 pitch 32, wyśrodkowany
  groups: [
    { src: "/assets/onas-m-lg10-f.png", x: 0, y: 428, w: 255, h: 85 },
    { src: "/assets/onas-m-lg11-f.png", x: 140, y: 1201, w: 262, h: 85 },
    { src: "/assets/onas-m-lg12-f.png", x: 0, y: 1903, w: 260, h: 120 },
    { src: "/assets/onas-m-lg13-f.png", x: 142, y: 1916, w: 260, h: 108 },
  ],
};

export function OnasLimeMobile({ lime }: { lime: ONasLime }) {
  return (
    <section className="relative w-full overflow-x-clip md:hidden">
      <div className="@container mx-auto w-full max-w-(--workspace)">
        <div className="relative bg-brand-lime" style={{ aspectRatio: `402/${GMOB.h}` }}>
          {GMOB.lines.map((l) => (
            <div key={l.y} className="absolute bg-brand-blue"
              style={{ left: cm(GMOB.lineX), top: cm(l.y), right: 0, height: cm(1.2) }} />
          ))}
          <h2
            className="absolute text-center font-modular text-brand-blue"
            style={{ left: cm(GMOB.header.left), top: cm(GMOB.header.top), width: cm(GMOB.header.w), fontSize: cm(GMOB.header.fontPx), lineHeight: `${(GMOB.header.lhPx / 4.02).toFixed(4)}cqw` }}
          >
            {lime.headerSegs[0]}
            <span style={{ fontSize: cm(GMOB.header.accentPx) }}>{lime.headerSegs[1]}</span>
            {lime.headerSegs[2]}
          </h2>
          <h3
            className="absolute font-display font-extrabold text-brand-blue"
            style={{ left: cm(GMOB.col1Title.left), top: cm(GMOB.col1Title.top), width: cm(GMOB.col1Title.w), fontSize: cm(GMOB.col1Title.fontPx), lineHeight: `${(GMOB.col1Title.lhPx / 4.02).toFixed(4)}cqw` }}
          >
            {lime.col1Title}
          </h3>
          <div
            className="absolute text-right font-display text-brand-blue"
            style={{ left: cm(GMOB.col1Body.left), top: cm(GMOB.col1Body.top), width: cm(GMOB.col1Body.w), fontSize: cm(GMOB.col1Body.fontPx), lineHeight: `${(GMOB.col1Body.lhPx / 4.02).toFixed(4)}cqw` }}
          >
            <p className="font-normal">{lime.col1BodyP1}</p>
            <p className="font-semibold" style={{ marginTop: cm(GMOB.col1Body.pGap) }}>{lime.col1BodyP2}</p>
          </div>
          <h3
            className="absolute text-right font-display font-extrabold text-brand-blue"
            style={{ left: cm(GMOB.col2Title.left), top: cm(GMOB.col2Title.top), width: cm(GMOB.col2Title.w), fontSize: cm(GMOB.col2Title.fontPx), lineHeight: `${(GMOB.col2Title.lhPx / 4.02).toFixed(4)}cqw` }}
          >
            {["Zależy nam na","czymś więcej","niż","przekazanie","wiedzy"].map((l)=>(<span key={l} className="block">{l}</span>))}
          </h3>
          <div
            className="absolute text-justify font-display text-brand-blue"
            style={{ left: cm(GMOB.col2Body.left), top: cm(GMOB.col2Body.top), width: cm(GMOB.col2Body.w), fontSize: cm(GMOB.col2Body.fontPx), lineHeight: `${(GMOB.col2Body.lhPx / 4.02).toFixed(4)}cqw` }}
          >
            <p className="font-normal">{lime.col2BodyP1}</p>
            {/* tracking -0.55: semibold w impl odrobinę szerszy niż w designie —
              * bez tego „oparte" spada z linii 2 */}
            <p className="font-semibold" style={{ marginTop: cm(GMOB.col2Body.pGap), letterSpacing: cm(-0.55) }}>{lime.col2BodyP2}</p>
          </div>
          <p
            className="absolute text-center font-modular text-brand-blue"
            style={{ left: cm(GMOB.foot.left), top: cm(GMOB.foot.top), width: cm(GMOB.foot.w), fontSize: cm(GMOB.foot.fontPx), lineHeight: `${(GMOB.foot.lhPx / 4.02).toFixed(4)}cqw` }}
          >
            {["Nowoczesne podejście","dostosowane","do potrzeb polskiego","rynku."].map((l)=>(<span key={l} className="block">{l}</span>))}
          </p>
          {GMOB.groups.map((g) => (
            <img key={g.src} src={g.src} alt="" aria-hidden className="absolute"
              style={{ left: cm(g.x), top: cm(g.y), width: cm(g.w), height: cm(g.h) }} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function OnasLime({ lime }: { lime: ONasLime }) {
  return (
    <section className="relative hidden w-full overflow-x-clip md:block">
      <div className="@container mx-auto w-full max-w-(--workspace)">
        <div className="relative bg-brand-lime" style={{ aspectRatio: `1440/${G.h}` }} data-node-id="229:1095">
          {/* linie */}
          {G.lines.map((l) => (
            <div key={`${l.x}-${l.y}`} className="absolute bg-brand-blue"
              style={{ left: c(l.x), top: c(l.y), width: c(l.w), height: c(G.lineH) }} />
          ))}
          <div className="absolute bg-brand-blue"
            style={{ left: c(G.vline.x), top: c(G.vline.y), width: c(G.lineH), height: c(G.vline.h) }} />
          {/* nagłówek HK z akcentem */}
          <h2
            className="absolute whitespace-nowrap font-modular text-brand-blue"
            style={{ left: c(G.header.left), top: c(G.header.top), fontSize: c(G.header.fontPx), lineHeight: 1.4 }}
            data-node-id="229:1861"
          >
            {lime.headerSegs[0]}
            <span style={{ fontSize: c(G.header.accentPx) }}>{lime.headerSegs[1]}</span>
            {lime.headerSegs[2]}
          </h2>
          {/* kolumna 1 */}
          <h3
            className="absolute font-display font-extrabold text-brand-blue"
            style={{ left: c(G.col1Title.left), top: c(G.col1Title.top), width: c(G.col1Title.w), fontSize: c(G.col1Title.fontPx), lineHeight: `${(G.col1Title.lhPx / 14.4).toFixed(4)}cqw` }}
          >
            {lime.col1Title}
          </h3>
          <div
            className="absolute text-justify font-display text-brand-blue"
            style={{ left: c(G.col1Body.left), top: c(G.col1Body.top), width: c(G.col1Body.w), fontSize: c(G.col1Body.fontPx), lineHeight: `${(G.col1Body.lhPx / 14.4).toFixed(4)}cqw` }}
          >
            <p className="font-normal">{lime.col1BodyP1}</p>
            <p className="font-semibold" style={{ marginTop: c(2 * G.col1Body.lhPx) }}>{lime.col1BodyP2}</p>
          </div>
          {/* kolumna 2 */}
          <h3
            className="absolute text-right font-display font-extrabold text-brand-blue"
            style={{ left: c(G.col2Title.left), top: c(G.col2Title.top), width: c(G.col2Title.w), fontSize: c(G.col2Title.fontPx), lineHeight: `${(G.col2Title.lhPx / 14.4).toFixed(4)}cqw` }}
          >
            {lime.col2Title}
          </h3>
          <div
            className="absolute text-justify font-display text-brand-blue"
            style={{ left: c(G.col2Body.left), top: c(G.col2Body.top), width: c(G.col2Body.w), fontSize: c(G.col2Body.fontPx), lineHeight: `${(G.col2Body.lhPx / 14.4).toFixed(4)}cqw` }}
          >
            <p className="font-normal">{lime.col2BodyP1}</p>
            <p className="font-semibold" style={{ marginTop: c(G.col2Body.lhPx) }}>{lime.col2BodyP2}</p>
          </div>
          {/* notka HK na dole */}
          <p
            className="absolute font-modular text-brand-blue"
            style={{ left: c(G.foot.left), top: c(G.foot.top), width: c(G.foot.w), fontSize: c(G.foot.fontPx), lineHeight: `${(G.foot.lhPx / 14.4).toFixed(4)}cqw` }}
          >
            <span className="block">{lime.footNote[0]}</span>
            <span className="block">{lime.footNote[1]}</span>
          </p>
          {/* strzałki przecinające linie */}
          <img src="/assets/onas-lime-arrows-f.png" alt="" aria-hidden className="absolute"
            style={{ left: c(G.arrows.x), top: c(G.arrows.y), width: c(G.arrows.w), height: c(G.arrows.h) }} />
        </div>
      </div>
    </section>
  );
}
