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
  // karuzela: track = 2 identyczne połówki, animacja przesuwa o -50% i zapętla;
  // przy prefers-reduced-motion stoi w fazie zgodnej z designem (kotwica -58px)
  const half = (key: string) => (
    <div key={key} className="flex shrink-0 items-center" style={{ gap: scale(gapPx), paddingRight: scale(gapPx) }}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex shrink-0 items-center" style={{ gap: scale(gapPx) }}>
          <span className="whitespace-nowrap">{text}</span>
          <img src="/assets/gwiazdka-lime.png" alt="" style={{ width: scale(starW), height: scale(starH) }} />
        </div>
      ))}
    </div>
  );
  return (
    <div
      className="marquee-track absolute flex h-full items-center font-modular text-black"
      style={{ left: scale(-58), gap: 0, fontSize: scale(fontPx), lineHeight: 1.313 }}
      aria-hidden="false"
    >
      {half("a")}
      {half("b")}
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
            data-reveal=""
            data-node-id="407:2854"
          />
          {/* glob: robot z tabletem (okrągły clip) */}
          <img
            src="/assets/glob-robot-f.png"
            alt="Robot AI czytający z tabletu"
            className="absolute"
            style={{ left: c(G.glob.left), top: c(G.glob.top), width: c(G.glob.w), height: c(G.glob.h), transitionDelay: "0.1s" }}
            data-reveal=""
            data-node-id="245:4367"
          />
          {/* NIE CHODZI O TO, */}
          <h2
            className="absolute font-modular font-normal text-white"
            style={{ left: c(G.lineA.left), top: c(G.lineA.top), width: c(G.lineA.w), fontSize: c(G.lineA.fontPx), lineHeight: "normal" }}
            data-reveal=""
            data-node-id="245:4395"
          >
            {m.lineA}
          </h2>
          {/* CZY AI ZMIENI TWOJĄ BRANŻĘ. */}
          <p
            className="absolute font-display font-medium text-white"
            style={{ right: c(G.lineB.right), top: c(G.lineB.top), width: c(G.lineB.w), fontSize: c(G.lineB.fontPx), lineHeight: "normal", textAlign: "right" as const, transitionDelay: "0.12s" }}
            data-reveal=""
            data-node-id="407:2853"
          >
            {m.lineB}
          </p>
          {/* CHODZI O TO, / CZY JESTEŚ NA TO GOTOWY. */}
          <p
            className="absolute whitespace-nowrap font-display font-black text-white"
            style={{ right: c(G.lineC.right), top: c(G.lineC.top), fontSize: c(G.lineC.fontPx), lineHeight: "normal", textAlign: "right" as const, transitionDelay: "0.22s" }}
            data-reveal=""
            data-node-id="245:4382"
          >
            {m.lineC[0]}
            <br />
            {m.lineC[1]}
          </p>
          {/* akapit */}
          <p
            className="absolute font-body text-white"
            style={{ left: c(G.para.left), top: c(G.para.top), width: c(G.para.w), fontSize: c(G.para.fontPx), lineHeight: 1.313, textAlign: "justify" as const, transitionDelay: "0.3s" }}
            data-reveal=""
            data-node-id="245:4399"
          >
            <Rich segs={m.paragraph} baseFontPx={G.para.fontPx} scale={c} />
          </p>
          {/* biała gwiazdka */}
          <img
            src="/assets/gwiazdka.svg"
            alt=""
            className="absolute"
            style={{ left: c(G.sparkle.left), top: c(G.sparkle.top), width: c(G.sparkle.w), height: c(G.sparkle.h), transitionDelay: "0.35s" }}
            data-reveal=""
            data-node-id="412:2909"
          />
          {/* biała strzałka-gwiazda przy prawej krawędzi */}
          <img
            src="/assets/star-arrow-white.svg"
            alt=""
            className="absolute max-w-none"
            style={{ left: c(G.arrowWhite.left), top: c(G.arrowWhite.top), width: c(G.arrowWhite.w), height: c(G.arrowWhite.h), transitionDelay: "0.3s" }}
            data-reveal=""
            data-node-id="407:2865"
          />
          {/* polygon (kontur) */}
          <img
            src="/assets/polygon-manifest.svg"
            alt=""
            className="absolute"
            style={{ left: c(G.polygon.left), top: c(G.polygon.top), width: c(G.polygon.w), height: c(G.polygon.h), transitionDelay: "0.15s" }}
            data-reveal=""
            data-node-id="407:2874"
          />
          {/* limonkowy pill z tekstem */}
          <div
            className="absolute flex items-center justify-center border-solid border-white bg-brand-lime"
            style={{
              left: c(G.pill.left), top: c(G.pill.top), width: c(G.pill.w), height: c(G.pill.h),
              borderRadius: c(G.pill.radiusPx), borderWidth: c(G.pill.borderPx),
              paddingLeft: c(54), paddingRight: c(46), transitionDelay: "0.4s",
            }}
            data-reveal=""
            data-node-id="407:2863"
          >
            <p
              className="font-body text-brand-blue"
              style={{ fontSize: c(G.pill.fontPx), lineHeight: 1.44, textAlign: "justify" as const }}
            >
              <Rich segs={m.pill} baseFontPx={G.pill.fontPx} scale={c} />
            </p>
          </div>
          {/* pasek lime ZAWSZE widoczny (uwaga Patryka) — reveal tylko napisy;
              TY DECYDUJESZ: reveal na spanie (p ma -translate-x-full) */}
          <div
            className="absolute inset-x-0 bg-brand-lime"
            style={{ top: c(G.limeBar.top), height: c(G.limeBar.h) }}
            data-node-id="245:4380"
          >
            <p
              className="absolute whitespace-nowrap font-modular text-black"
              style={{ left: c(G.barLeft.left - 0), top: c(G.barLeft.top - G.limeBar.top), fontSize: c(G.barLeft.fontPx), lineHeight: "normal" }}
              data-reveal=""
            >
              {m.bar.left}
            </p>
            <p
              className="absolute -translate-x-full whitespace-nowrap font-display font-black text-brand-blue"
              style={{ left: c(G.barCenter.rightEdge), top: c(G.barCenter.top - G.limeBar.top), fontSize: c(G.barCenter.fontPx), lineHeight: "normal" }}
              data-node-id="245:4384"
            >
              <span className="inline-block" style={{ transitionDelay: "0.1s" }} data-reveal="">
                {m.bar.center}
              </span>
            </p>
            <p
              className="absolute whitespace-nowrap font-modular text-black"
              style={{ left: c(G.barRight.left), top: c(G.barRight.top - G.limeBar.top), fontSize: c(G.barRight.fontPx), lineHeight: "normal", transitionDelay: "0.15s" }}
              data-reveal=""
            >
              {m.bar.right}
            </p>
          </div>
          {/* biały pasek ZAWSZE widoczny — reveal tylko na treści marquee */}
          <div
            className="absolute inset-x-0 bg-white"
            style={{ top: c(G.whiteBar.top), height: c(G.whiteBar.h) }}
            data-node-id="245:4381"
          >
            <div className="absolute inset-x-0" style={{ top: c(G.marquee.top - G.whiteBar.top), height: c(G.marquee.h), transitionDelay: "0.2s" }} data-reveal="" data-node-id="245:4580">
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

/* ---------- MOBILE (canvas 402×2435, strona y875–3310; 1cqw = 4.02px) ---------- */

const cm = (px: number) => `${(px / 4.02).toFixed(4)}cqw`;

const GM = {
  blueBg: { h: 2213 }, // TLO: strona 875–3088
  arrowTop: { left: 237.85, top: -7, w: 226.5, h: 226.5 },
  tagline: { left: 43, top: 197, w: 271, fontPx: 20 },
  group9: { left: 72, top: 298, w: 287, h: 336 },
  // lime gwiazdy za globem — pozycje iterowane (bbox rotacji kłamie)
  limeStar2: { left: -65, top: 832, w: 402, h: 771.5 },
  limeStar1: { left: -1.8, top: 722, w: 365, h: 542.5 },
  lineA: { left: 98, top: 651, w: 175, fontPx: 28, leading: 1.483 },
  lineB: { right: 402 - 359, top: 749, w: 158, fontPx: 16, leading: 1.483 },
  glob: { left: 0, top: 799, w: 402, h: 455 }, // eksport przyciety do strony
  lineC: { right: 402 - 366, top: 1351, fontPx: 34 },
  para: { left: 29, top: 1508, w: 344, fontPx: 17, leading: 1.55 },
  pill: { left: 16, top: 1775, w: 377, h: 195, radiusPx: 40, borderPx: 3, padX: 33, fontPx: 15.3 },
  arrowMid: { left: 385.6, top: 1698.8, w: 145.5, h: 142.5 },
  arrowLow: { left: 26.5, top: 1982.6, w: 113, h: 114 },
  button: { left: 44, top: 2062, w: 315, h: 57, radiusPx: 40, borderPx: 3, fontPx: 13, trackPx: 0.52 },
  aiToTag: { left: 35, top: 2185, fontPx: 12, leading: 1.483 },
  limeBar: { top: 2214, h: 95 }, // strona 3089–3184
  tyDecy: { rightEdge: 367.5, top: 2240.5, fontPx: 35, trackPx: 2.1 },
  blueStrip: { top: 2310, h: 2 },
  jakBardzo: { right: 402 - 367, top: 2333, w: 209, fontPx: 12, leading: 1.483 },
  arrowBar: { left: 134.4, top: 2334.5, w: 71.5, h: 71.5 },
};

function ManifestMobile({ m }: { m: HomeManifest }) {
  return (
    <section className="relative w-full md:hidden">
      <div className="@container mx-auto w-full">
        <div className="relative aspect-[402/2309] overflow-hidden bg-page">
          {/* niebieskie tło TLO */}
          <div className="absolute inset-x-0 top-0 bg-brand-blue" style={{ height: cm(GM.blueBg.h) }} data-node-id="375:1793" />
          {/* strzałka na górze */}
          <img src="/assets/m-arrow-top-f.png" alt="" className="absolute" style={{ left: cm(GM.arrowTop.left), top: cm(GM.arrowTop.top), width: cm(GM.arrowTop.w), height: cm(GM.arrowTop.h) }} data-reveal="" data-node-id="432:1538" />
          {/* tagline lime */}
          <p className="absolute font-modular text-brand-lime" style={{ left: cm(GM.tagline.left), top: cm(GM.tagline.top), width: cm(GM.tagline.w), fontSize: cm(GM.tagline.fontPx), lineHeight: "normal" }} data-reveal="" data-node-id="432:1536">
            {m.mobileTagline}
          </p>
          {/* duże .AI na lime blobie */}
          <img src="/assets/m-group9-f.png" alt="" className="absolute" style={{ left: cm(GM.group9.left), top: cm(GM.group9.top), width: cm(GM.group9.w), height: cm(GM.group9.h), transitionDelay: "0.1s" }} data-reveal="" data-node-id="432:1537" />
          {/* lime gwiazdy za globem */}
          <img src="/assets/m-lime-star2-f.png" alt="" className="absolute max-w-none" style={{ left: cm(GM.limeStar2.left), top: cm(GM.limeStar2.top), width: cm(GM.limeStar2.w), height: cm(GM.limeStar2.h), transitionDelay: "0.1s" }} data-reveal="" data-node-id="375:1833" />
          <img src="/assets/m-lime-star1-f.png" alt="" className="absolute max-w-none" style={{ left: cm(GM.limeStar1.left), top: cm(GM.limeStar1.top), width: cm(GM.limeStar1.w), height: cm(GM.limeStar1.h), transitionDelay: "0.15s" }} data-reveal="" data-node-id="375:1809" />
          {/* NIE CHODZI O TO, */}
          <h2 className="absolute font-modular font-normal text-white" style={{ left: cm(GM.lineA.left), top: cm(GM.lineA.top), width: cm(GM.lineA.w), fontSize: cm(GM.lineA.fontPx), lineHeight: GM.lineA.leading }} data-reveal="" data-node-id="375:1794">
            {m.lineA}
          </h2>
          {/* czy AI zmieni Twoją branżę. */}
          <p className="absolute font-body font-normal text-white" style={{ right: cm(GM.lineB.right), top: cm(GM.lineB.top), width: cm(GM.lineB.w), fontSize: cm(GM.lineB.fontPx), lineHeight: GM.lineB.leading, textAlign: "right" as const, transitionDelay: "0.12s" }} data-reveal="" data-node-id="375:1807">
            {m.lineB.toLowerCase().replace("czy ai", "czy AI").replace("twoją", "Twoją")}
          </p>
          {/* glob z robotem */}
          <img src="/assets/m-glob-f.png" alt="Robot AI czytający z tabletu" className="absolute max-w-none" style={{ left: cm(GM.glob.left), top: cm(GM.glob.top), width: cm(GM.glob.w), height: cm(GM.glob.h), transitionDelay: "0.15s" }} data-reveal="" data-node-id="375:1795" />
          {/* CHODZI O TO, / CZY JESTEŚ NA TO GOTOWY. */}
          <p className="absolute font-display font-black text-white" style={{ right: cm(GM.lineC.right), top: cm(GM.lineC.top), width: cm(355), fontSize: cm(GM.lineC.fontPx), lineHeight: "normal", textAlign: "right" as const, transitionDelay: "0.2s" }} data-reveal="" data-node-id="375:1808">
            {m.lineC[0]}
            <br />
            {m.lineC[1]}
          </p>
          {/* akapit */}
          <p className="absolute font-body text-white" style={{ left: cm(GM.para.left), top: cm(GM.para.top), width: cm(GM.para.w), fontSize: cm(GM.para.fontPx), lineHeight: GM.para.leading, textAlign: "justify" as const, transitionDelay: "0.28s" }} data-reveal="" data-node-id="375:1818">
            <Rich segs={m.paragraph} baseFontPx={GM.para.fontPx} scale={cm} />
          </p>
          {/* pill */}
          <div
            className="absolute flex items-center justify-center border-solid border-white bg-brand-lime"
            style={{ left: cm(GM.pill.left), top: cm(GM.pill.top), width: cm(GM.pill.w), height: cm(GM.pill.h), borderRadius: cm(GM.pill.radiusPx), borderWidth: cm(GM.pill.borderPx), paddingLeft: cm(GM.pill.padX), paddingRight: cm(GM.pill.padX), transitionDelay: "0.35s" }} data-reveal=""
            data-node-id="375:1820"
          >
            <p className="font-body text-brand-blue" style={{ fontSize: cm(GM.pill.fontPx), lineHeight: cm(22), textAlign: "justify" as const }}>
              <Rich segs={m.pill.map((s) => (s.fontPx ? { ...s, fontPx: Math.round(s.fontPx * (GM.pill.fontPx / 17)) } : s))} baseFontPx={GM.pill.fontPx} scale={cm} />
            </p>
          </div>
          {/* strzałki */}
          <img src="/assets/m-arrow-mid-f.png" alt="" className="absolute max-w-none" style={{ left: cm(GM.arrowMid.left), top: cm(GM.arrowMid.top), width: cm(GM.arrowMid.w), height: cm(GM.arrowMid.h), transitionDelay: "0.3s" }} data-reveal="" data-node-id="375:1823" />
          <img src="/assets/m-arrow-low-f.png" alt="" className="absolute" style={{ left: cm(GM.arrowLow.left), top: cm(GM.arrowLow.top), width: cm(GM.arrowLow.w), height: cm(GM.arrowLow.h), transitionDelay: "0.3s" }} data-reveal="" data-node-id="375:1845" />
          {/* CTA */}
          <a
            href="/#kursy"
            className="absolute flex items-center justify-center border-solid border-white bg-brand-lime font-modular text-brand-blue"
            style={{ left: cm(GM.button.left), top: cm(GM.button.top), width: cm(GM.button.w), height: cm(GM.button.h), borderRadius: cm(GM.button.radiusPx), borderWidth: cm(GM.button.borderPx), fontSize: cm(GM.button.fontPx), letterSpacing: cm(GM.button.trackPx), transitionDelay: "0.4s" }} data-reveal=""
            data-node-id="375:1842"
          >
            {m.mobileCtaLabel}
          </a>
          {/* AI TO NARZĘDZIE */}
          <p className="absolute whitespace-nowrap font-modular text-white" style={{ left: cm(GM.aiToTag.left), top: cm(GM.aiToTag.top), fontSize: cm(GM.aiToTag.fontPx), lineHeight: GM.aiToTag.leading, transitionDelay: "0.1s" }} data-reveal="" data-node-id="375:1861">
            {m.bar.left.toUpperCase().replace(".", "")}
          </p>
          {/* pasek lime z TY DECYDUJESZ */}
          {/* pasek ZAWSZE widoczny — reveal tylko napis (span, bo p ma translate) */}
          <div className="absolute inset-x-0 bg-brand-lime" style={{ top: cm(GM.limeBar.top), height: cm(GM.limeBar.h) }} data-node-id="375:1854">
            <p
              className="absolute -translate-x-full whitespace-nowrap font-display font-black text-brand-blue"
              style={{ left: cm(GM.tyDecy.rightEdge), top: cm(GM.tyDecy.top - GM.limeBar.top), fontSize: cm(GM.tyDecy.fontPx), letterSpacing: cm(GM.tyDecy.trackPx), lineHeight: "normal" }}
              data-node-id="375:1863"
            >
              <span className="inline-block" style={{ transitionDelay: "0.1s" }} data-reveal="">
                {m.bar.center}
              </span>
            </p>
          </div>
          {/* cienki niebieski pas */}
          <div className="absolute inset-x-0 bg-brand-blue" style={{ top: cm(GM.blueStrip.top), height: `max(1px, ${cm(GM.blueStrip.h)})` }} />
        </div>
      </div>
    </section>
  );
}

export default function ManifestSection({ m }: { m: HomeManifest }) {
  return (
    <>
      <div className="hidden md:block">
        <ManifestDesktop m={m} />
      </div>
      <ManifestMobile m={m} />
    </>
  );
}
