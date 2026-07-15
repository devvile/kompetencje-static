import type { HomeManifest, RichSeg } from "../../content/types";

/*
 * Sekcja 2: manifest "NIE CHODZI O TO," + pasek TY DECYDUJESZ + marquee.
 * Desktop: canvas 1440×1328 (strona y833–2161). Współrzędne = px designu - 833.
 * Wzorzec poster-canvas jak w HeroSection (@container + cqw).
 */

const c = (px: number) => `${(px / 14.4).toFixed(4)}cqw`;

const G = {
  glob: { left: 83, top: 231.2, w: 654, h: 654.8 },
  limeStar: { left: -6.2, top: 155.8, w: 688.5, h: 1048.5 }, // zmierzone z renderu (bbox rotacji kłamie)
  lineA: { left: 208, top: 72, w: 220, fontPx: 40 }, // HK Modular, białe, łamie się na 3 linie
  lineB: { right: 1440 - 905, top: 201, w: 515, fontPx: 28 }, // Montserrat Medium
  lineC: { right: 1440 - 1311, top: 307, fontPx: 35 }, // Montserrat Black, 2 linie
  para: { left: 809, top: 448, w: 498, fontPx: 18 },
  sparkle: { left: 750, top: 629.8, w: 89.4, h: 87.4 },
  arrowWhite: { left: 1339.9, top: 627.4, w: 184.9, h: 188.1 },
  polygon: { left: 250.5, top: 861.7, w: 302.7, h: 212.3 },
  pill: { left: 673, top: 795, w: 667, h: 202, radiusPx: 40, borderPx: 3, padX: 58, padY: 20, fontPx: 17 },
  limeBar: { top: 1130, h: 144 },
  barLeft: { left: 84, top: 1194, fontPx: 20 },
  barCenter: { rightEdge: 888, top: 1168, fontPx: 60 },
  barRight: { left: 917.94, top: 1194, fontPx: 20 },
  whiteBar: { top: 1274, h: 54 },
  marquee: { top: 1285, h: 33, fontPx: 14, gapPx: 30, starW: 31, starH: 33 },
};

function Rich({ segs, baseFontPx, scale }: { segs: RichSeg[]; baseFontPx: number; scale: (px: number) => string }) {
  return (
    <>
      {segs.map((s, i) => (
        <span key={i}>
          <span
            className={s.strong ? "font-extrabold" : undefined}
            style={s.fontPx ? { fontSize: scale(s.fontPx) } : undefined}
          >
            {s.text}
          </span>
          {s.break ? <br /> : null}
        </span>
      ))}
    </>
  );
}

function MarqueeRow({ text, scale, fontPx, gapPx, starW, starH }: {
  text: string; scale: (px: number) => string; fontPx: number; gapPx: number; starW: number; starH: number;
}) {
  return (
    <div
      className="absolute flex h-full items-center overflow-visible font-modular text-black" 
      style={{ left: scale(-58), gap: scale(gapPx), fontSize: scale(fontPx), lineHeight: 1.313 }}
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex shrink-0 items-center" style={{ gap: scale(gapPx) }}>
          <span className="whitespace-nowrap">{text}</span>
          <img
            src="/assets/gwiazdka-lime.png"
            alt=""
            style={{ width: scale(starW), height: scale(starH) }}
          />
        </div>
      ))}
    </div>
  );
}

function ManifestDesktop({ m }: { m: HomeManifest }) {
  return (
    <section className="relative w-full">
      <div className="@container mx-auto w-full max-w-(--workspace)">
        <div className="relative aspect-[1440/1328] overflow-hidden bg-brand-blue">
          {/* wielka limonkowa gwiazda za robotem */}
          <img
            src="/assets/gwiazdka-lime-big-f.png"
            alt=""
            className="absolute max-w-none"
            style={{ left: c(G.limeStar.left), top: c(G.limeStar.top), width: c(G.limeStar.w), height: c(G.limeStar.h) }}
            data-node-id="407:2854"
          />
          {/* glob: robot z tabletem (okrągły clip) */}
          <img
            src="/assets/glob-robot-f.png"
            alt="Robot AI czytający z tabletu"
            className="absolute"
            style={{ left: c(G.glob.left), top: c(G.glob.top), width: c(G.glob.w), height: c(G.glob.h) }}
            data-node-id="245:4367"
          />
          {/* NIE CHODZI O TO, */}
          <h2
            className="absolute font-modular font-normal text-white"
            style={{ left: c(G.lineA.left), top: c(G.lineA.top), width: c(G.lineA.w), fontSize: c(G.lineA.fontPx), lineHeight: "normal" }}
            data-node-id="245:4395"
          >
            {m.lineA}
          </h2>
          {/* CZY AI ZMIENI TWOJĄ BRANŻĘ. */}
          <p
            className="absolute font-display font-medium text-white"
            style={{ right: c(G.lineB.right), top: c(G.lineB.top), width: c(G.lineB.w), fontSize: c(G.lineB.fontPx), lineHeight: "normal", textAlign: "right" as const }}
            data-node-id="407:2853"
          >
            {m.lineB}
          </p>
          {/* CHODZI O TO, / CZY JESTEŚ NA TO GOTOWY. */}
          <p
            className="absolute whitespace-nowrap font-display font-black text-white"
            style={{ right: c(G.lineC.right), top: c(G.lineC.top), fontSize: c(G.lineC.fontPx), lineHeight: "normal", textAlign: "right" as const }}
            data-node-id="245:4382"
          >
            {m.lineC[0]}
            <br />
            {m.lineC[1]}
          </p>
          {/* akapit */}
          <p
            className="absolute font-body text-white"
            style={{ left: c(G.para.left), top: c(G.para.top), width: c(G.para.w), fontSize: c(G.para.fontPx), lineHeight: 1.313, textAlign: "justify" as const }}
            data-node-id="245:4399"
          >
            <Rich segs={m.paragraph} baseFontPx={G.para.fontPx} scale={c} />
          </p>
          {/* biała gwiazdka */}
          <img
            src="/assets/gwiazdka.svg"
            alt=""
            className="absolute"
            style={{ left: c(G.sparkle.left), top: c(G.sparkle.top), width: c(G.sparkle.w), height: c(G.sparkle.h) }}
            data-node-id="412:2909"
          />
          {/* biała strzałka-gwiazda przy prawej krawędzi */}
          <img
            src="/assets/star-arrow-white.svg"
            alt=""
            className="absolute max-w-none"
            style={{ left: c(G.arrowWhite.left), top: c(G.arrowWhite.top), width: c(G.arrowWhite.w), height: c(G.arrowWhite.h) }}
            data-node-id="407:2865"
          />
          {/* polygon (kontur) */}
          <img
            src="/assets/polygon-manifest.svg"
            alt=""
            className="absolute"
            style={{ left: c(G.polygon.left), top: c(G.polygon.top), width: c(G.polygon.w), height: c(G.polygon.h) }}
            data-node-id="407:2874"
          />
          {/* limonkowy pill z tekstem */}
          <div
            className="absolute flex items-center justify-center border-solid border-white bg-brand-lime"
            style={{
              left: c(G.pill.left), top: c(G.pill.top), width: c(G.pill.w), height: c(G.pill.h),
              borderRadius: c(G.pill.radiusPx), borderWidth: c(G.pill.borderPx),
              paddingLeft: c(54), paddingRight: c(46),
            }}
            data-node-id="407:2863"
          >
            <p
              className="font-body text-brand-blue"
              style={{ fontSize: c(G.pill.fontPx), lineHeight: 1.44, textAlign: "justify" as const }}
            >
              <Rich segs={m.pill} baseFontPx={G.pill.fontPx} scale={c} />
            </p>
          </div>
          {/* pasek lime: ai to narzędzie / TY DECYDUJESZ / jak bardzo... */}
          <div
            className="absolute inset-x-0 bg-brand-lime"
            style={{ top: c(G.limeBar.top), height: c(G.limeBar.h) }}
            data-node-id="245:4380"
          >
            <p
              className="absolute whitespace-nowrap font-modular text-black"
              style={{ left: c(G.barLeft.left - 0), top: c(G.barLeft.top - G.limeBar.top), fontSize: c(G.barLeft.fontPx), lineHeight: "normal" }}
            >
              {m.bar.left}
            </p>
            <p
              className="absolute -translate-x-full whitespace-nowrap font-display font-black text-brand-blue"
              style={{ left: c(G.barCenter.rightEdge), top: c(G.barCenter.top - G.limeBar.top), fontSize: c(G.barCenter.fontPx), lineHeight: "normal" }}
              data-node-id="245:4384"
            >
              {m.bar.center}
            </p>
            <p
              className="absolute whitespace-nowrap font-modular text-black"
              style={{ left: c(G.barRight.left), top: c(G.barRight.top - G.limeBar.top), fontSize: c(G.barRight.fontPx), lineHeight: "normal" }}
            >
              {m.bar.right}
            </p>
          </div>
          {/* biały pasek z marquee */}
          <div
            className="absolute inset-x-0 bg-white"
            style={{ top: c(G.whiteBar.top), height: c(G.whiteBar.h) }}
            data-node-id="245:4381"
          >
            <div className="absolute inset-x-0" style={{ top: c(G.marquee.top - G.whiteBar.top), height: c(G.marquee.h) }} data-node-id="245:4580">
              <MarqueeRow
                text={m.marqueeText}
                scale={c}
                fontPx={G.marquee.fontPx}
                gapPx={G.marquee.gapPx}
                starW={G.marquee.starW}
                starH={G.marquee.starH}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ManifestSection({ m }: { m: HomeManifest }) {
  return (
    <div className="hidden md:block">
      <ManifestDesktop m={m} />
    </div>
  );
}
