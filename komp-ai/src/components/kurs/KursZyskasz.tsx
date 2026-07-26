/*
 * KURS — sekcja 2: „CO ZYSKASZ NA KURSIE?" (desktop y791–1362, canvas 1440×571).
 * Navy box = brand blue #131dff, radius 91, inset x83, 1274×571 (node 245:2988).
 * Nagłówek Montserrat Black 85 white lh1.19 (łamany na 4 linie, w519).
 * 4 benefity: gwiazdka lime (bake opaque na płaskim blue) + tekst Black 20
 * white tracking 3.8 (w309 → łamie się na 2 linie).
 */
import type { KursPage } from "@/content/types";

const c = (px: number) => `${(px / 14.4).toFixed(4)}cqw`;

const G = {
  h: 571,
  box: { x: 83, w: 1274, r: 91 },
  heading: { left: 245, top: 76, w: 519, fontPx: 85, lhPx: 101.15 }, // frame x83 + 162
  stars: [119.9, 214.6, 308.8, 403.1], // y w boxie; x = 83+728
  starX: 809, // canvas x (bake z marginesem 2px: 811-2)
  starW: 58,
  starH: 54,
  text: { left: 914, tops: [120, 210, 306, 402], w: 309, fontPx: 20, lhPx: 23.8, trackPx: 3.8 }, // 83+831
};

export default function KursZyskasz({ zyskasz }: { zyskasz: KursPage["zyskasz"] }) {
  return (
    <section className="relative hidden w-full overflow-x-clip md:block">
      <div className="@container mx-auto w-full max-w-(--workspace)">
        <div className="relative bg-page" style={{ aspectRatio: `1440/${G.h}` }}>
          <div
            className="absolute inset-y-0 bg-brand-blue"
            style={{ left: c(G.box.x), width: c(G.box.w), borderRadius: c(G.box.r) }}
            data-node-id="245:2988"
          />
          <h2
            className="absolute font-display font-black text-white"
            style={{
              left: c(G.heading.left), top: c(G.heading.top), width: c(G.heading.w),
              fontSize: c(G.heading.fontPx), lineHeight: `${(G.heading.lhPx / 14.4).toFixed(4)}cqw`,
            }}
            data-node-id="245:2989"
          >
            {zyskasz.headingLines.join(" ")}
          </h2>
          {zyskasz.benefits.map((b, i) => (
            <div key={i}>
              <img src="/assets/kurs-zysk-star-f.png" alt="" aria-hidden className="absolute"
                style={{ left: c(G.starX), top: c(G.stars[i] - 2), width: c(G.starW), height: c(G.starH) }} />
              <p
                className="absolute font-display font-black text-white"
                style={{
                  left: c(G.text.left), top: c(G.text.tops[i]), width: c(G.text.w),
                  fontSize: c(G.text.fontPx), lineHeight: `${(G.text.lhPx / 14.4).toFixed(4)}cqw`,
                  letterSpacing: c(G.text.trackPx),
                }}
              >
                {b}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
