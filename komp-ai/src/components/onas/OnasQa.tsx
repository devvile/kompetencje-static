/*
 * O NAS — sekcja 2: Q&A 4 bloki (desktop y800–1931, canvas 1440×1131).
 * Niebieskie recty naprzemiennie od lewej/prawej krawędzi, promień 60 tylko na
 * "wolnych" rogach (sonda naroży: R5 tylko BR; R6 TL+BL; R7 TR+BR; R8 wszystkie).
 * Pigułki: lime, border 4 white, radius-full, HK 18 blue (design context 229:1867).
 * Teksty: Montserrat Medium 18, lh ~22 (design context 229:1857); blok 2
 * wyrównany do prawej. R8 bleeduje 65px w sekcję lime (canvas kończy się na
 * 1931 = start lime) → sekcja z-10, bez pionowego clipa.
 * 3 gwiazdy-strzałki lime = rotowane instancje wypieczone z renderu.
 */
import type { ONasPage, ONasQaItem } from "@/content/types";

const c = (px: number) => `${(px / 14.4).toFixed(4)}cqw`;
/* mobile: canvas 402 szer. (1cqw = 4.02px) */
const cm = (px: number) => `${(px / 4.02).toFixed(4)}cqw`;

/* MOBILE — canvas 402×2194 (y873..3067, bg blue Rectangle 5). Zawiera:
 * gwiazdkę graniczną (na niebieskim), tagline „WYRUSZ Z NAMI…", Group 9
 * (asset 1:1 z home), 4 piguły lime docięte do krawędzi + teksty white
 * mixed-bold (inne treści niż desktop), 3 strzałki lime. */
/* Canvas zaczyna się na KOŃCU hero (100svh), a hero domyka niebieski filler
 * (flex-1) — więc canvas ma WŁASNY pas blue 873..975 designu jako lead-in
 * nad taglinem (współrzędne = design − 873). Na urządzeniach z wyższym svh
 * filler + lead-in dają więcej niebieskiego nad „WYRUSZ…" (życzenie Patryka),
 * a blue nigdy nie zachodzi na robota/logo. Strona jest przez to ~102px
 * dłuższa od designu przy referencyjnym viewporcie — świadoma decyzja UX. */
const GMOB = {
  h: 2194, // 873..3067
  // gwiazdka graniczna PRZENIESIONA W DÓŁ (życzenie Patryka) — w całości na
  // niebieskim polu (design miał ją na styku 854..926); czysta alfa lime
  arrow0: { x: 86, y: 8, w: 82, h: 72 },
  tagline: { left: 42, top: 102, fontPx: 20, lhPx: 28, trackPx: 0.5 }, // node (42,975)
  group9: { x: 60, y: 202, w: 287, h: 336 },
  pills: [
    { x: 0, y: 529, w: 282, h: 68, side: "left" as const }, // (0,1402)
    { x: 107, y: 944, w: 295, h: 74, side: "right" as const }, // (107,1817)
    { x: -1, y: 1372, w: 391, h: 74, side: "left" as const }, // (-1,2245)
    { x: -63, y: 1831, w: 528, h: 74, side: "full" as const }, // (-63,2704)
  ],
  pillBorderPx: 4,
  pillFontPx: 18,
  texts: [
    { x: 38, y: 643, w: 344 }, // (38,1516)
    { x: 33, y: 1067, w: 341 }, // (33,1940)
    { x: 38, y: 1499, w: 300 }, // (38,2372)
    { x: 45, y: 1956, w: 313 }, // (45,2829)
  ],
  textFontPx: 15,
  textLhPx: 21,
  arrows: [
    { src: "/assets/onas-m-arrow1-f.png", x: 202, y: 807, w: 85, h: 70 },
    { src: "/assets/onas-m-arrow2-f.png", x: 139, y: 1224, w: 86, h: 77 },
    { src: "/assets/onas-m-arrow3-f.png", x: 168, y: 1661, w: 82, h: 83 },
  ],
};

export function OnasQaMobile({ qaM }: { qaM: ONasPage["qaM"] }) {
  return (
    <section className="relative z-10 w-full overflow-x-clip md:hidden">
      <div className="@container mx-auto w-full max-w-(--workspace)">
        <div className="relative bg-brand-blue" style={{ aspectRatio: `402/${GMOB.h}` }} data-node-id="330:1619">
          <img src="/assets/onas-m-arrow0-alpha.png" alt="" aria-hidden className="absolute"
            style={{ left: cm(GMOB.arrow0.x), top: cm(GMOB.arrow0.y), width: cm(GMOB.arrow0.w), height: cm(GMOB.arrow0.h) }} />
          <h2
            className="absolute font-modular text-brand-lime"
            style={{
              left: cm(GMOB.tagline.left), top: cm(GMOB.tagline.top), fontSize: cm(GMOB.tagline.fontPx),
              letterSpacing: cm(GMOB.tagline.trackPx), lineHeight: `${(GMOB.tagline.lhPx / 4.02).toFixed(4)}cqw`,
            }}
          >
            {qaM.tagline.map((l) => (
              <span key={l} className="block">{l}</span>
            ))}
          </h2>
          <img src="/assets/m-group9-f.png" alt="" aria-hidden className="absolute"
            style={{ left: cm(GMOB.group9.x), top: cm(GMOB.group9.y), width: cm(GMOB.group9.w), height: cm(GMOB.group9.h) }} />
          {qaM.items.map((item, i) => {
            const pill = GMOB.pills[i], txt = GMOB.texts[i];
            const radius = pill.side === "left" ? `0 ${cm(50)} ${cm(50)} 0`
              : pill.side === "right" ? `${cm(50)} 0 0 ${cm(50)}` : cm(50);
            return (
              <div key={item.pill}>
                <h3
                  className="absolute flex items-center justify-center border-solid border-white bg-brand-lime font-modular text-brand-blue"
                  style={{
                    left: cm(pill.x), top: cm(pill.y), width: cm(pill.w), height: cm(pill.h),
                    borderWidth: cm(GMOB.pillBorderPx), borderRadius: radius,
                    fontSize: cm(GMOB.pillFontPx), lineHeight: 1,
                  }}
                >
                  {item.pill}
                </h3>
                <p
                  className="absolute font-display text-white"
                  style={{
                    left: cm(txt.x), top: cm(txt.y), width: cm(txt.w),
                    fontSize: cm(GMOB.textFontPx), lineHeight: `${(GMOB.textLhPx / 4.02).toFixed(4)}cqw`,
                    textAlign: item.align,
                  }}
                >
                  {item.segs.map((s, j) => (
                    <span key={j} className={s.strong ? "font-bold" : "font-normal"}>{s.text}</span>
                  ))}
                </p>
              </div>
            );
          })}
          {GMOB.arrows.map((a) => (
            <img key={a.src} src={a.src} alt="" aria-hidden className="absolute"
              style={{ left: cm(a.x), top: cm(a.y), width: cm(a.w), height: cm(a.h) }} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* origin canvasu = y840 strony (koniec hero=100svh); pill 1 (design y801)
 * bleeduje 39px W GÓRĘ nad hero → sekcja z-10, bez pionowego clipa */
const G = {
  h: 1091, // y840..1931
  rects: [
    { x: 0, y: 0, w: 780, h: 215, r: [0, 0, 60, 0] },
    { x: 798, y: 263, w: 642, h: 209, r: [60, 0, 0, 60] },
    { x: -58, y: 520, w: 782, h: 260, r: [0, 60, 60, 0] },
    { x: 131, y: 881, w: 1189, h: 275, r: [60, 60, 60, 60] },
  ],
  pills: [
    { x: 95, y: -39, w: 376 },
    { x: 1048, y: 207, w: 323 },
    { x: 102, y: 472, w: 469 },
    { x: 261, y: 981, w: 469 },
  ],
  pillH: 74,
  pillBorderPx: 4,
  pillFontPx: 18,
  // lh z metadanych: blok 1 = 88/4 linie = 22; bloki 2-4 = 24 (niespójność designera)
  texts: [
    { x: 280, y: 69, w: 344, align: "left" as const, lhPx: 22 },
    { x: 965, y: 324, w: 333, align: "right" as const, lhPx: 24 },
    { x: 174, y: 596, w: 361, align: "left" as const, lhPx: 24 },
    { x: 781, y: 959, w: 417, align: "left" as const, lhPx: 23.8 },
  ],
  textFontPx: 18,
  // gwiazdy-strzałki mają niebieski border (uwaga Patryka) — bake z pełnymi kolorami
  stars: [
    { src: "/assets/onas-qa-star1-f.png", x: 834, y: 90, w: 92, h: 82 },
    { src: "/assets/onas-qa-star2-f.png", x: 549, y: 326, w: 86, h: 82 },
    { src: "/assets/onas-qa-star3-f.png", x: 879, y: 680, w: 132, h: 133 },
  ],
};

export default function OnasQa({ items }: { items: ONasQaItem[] }) {
  return (
    <section className="relative z-10 hidden w-full overflow-x-clip md:block">
      <div className="@container mx-auto w-full max-w-(--workspace)">
        <div className="relative bg-page" style={{ aspectRatio: `1440/${G.h}` }}>
          {items.map((item, i) => {
            const rect = G.rects[i], pill = G.pills[i], txt = G.texts[i];
            return (
              <div key={item.pill}>
                <div
                  className="absolute bg-brand-blue"
                  style={{
                    left: c(rect.x), top: c(rect.y), width: c(rect.w), height: c(rect.h),
                    borderRadius: rect.r.map((r) => c(r)).join(" "),
                  }}
                />
                <p
                  className="absolute font-display font-medium text-white"
                  style={{
                    left: c(txt.x), top: c(txt.y), width: c(txt.w),
                    fontSize: c(G.textFontPx), lineHeight: `${(txt.lhPx / 14.4).toFixed(4)}cqw`,
                    textAlign: txt.align,
                  }}
                >
                  {item.text}
                </p>
                <h2
                  className="absolute flex items-center justify-center rounded-full border-solid border-white bg-brand-lime font-modular text-brand-blue"
                  style={{
                    left: c(pill.x), top: c(pill.y), width: c(pill.w), height: c(G.pillH),
                    borderWidth: c(G.pillBorderPx), fontSize: c(G.pillFontPx), lineHeight: 1,
                  }}
                >
                  {item.pill}
                </h2>
              </div>
            );
          })}
          {G.stars.map((s) => (
            <img key={s.src} src={s.src} alt="" aria-hidden className="absolute"
              style={{ left: c(s.x), top: c(s.y), width: c(s.w), height: c(s.h) }} />
          ))}
        </div>
      </div>
    </section>
  );
}
