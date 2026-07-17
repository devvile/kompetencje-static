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
import type { ONasQaItem } from "@/content/types";

const c = (px: number) => `${(px / 14.4).toFixed(4)}cqw`;

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
