import Link from "next/link";
import type { HomeManifest, RichSeg } from "../../content/types";
import { nbspOrphans } from "../../lib/typo";

/*
 * Sekcja 2: manifest "NIE CHODZI O TO," + (osobno: ManifestBar) pasek TY DECYDUJESZ + marquee.
 * Desktop: canvas 1440×1328 (strona y833–2161). Współrzędne = px designu - 833.
 * Wzorzec poster-canvas jak w HeroSection (@container + cqw).
 */

const c = (px: number) => `${(px / 14.4).toFixed(4)}cqw`;

// redesign 2026-10 (Figma 5ufIXE17KqmkvVrfSVzUFE, frame 2240:1628 „Sekcja 2 – nowa wersja")
const G = {
  lineA: { left: 113, top: 54, w: 220, fontPx: 40 }, // HK Modular, białe, łamie się na 3 linie
  lineB: { left: 113, top: 241, fontPx: 24 }, // Montserrat Light
  rule: { left: 524, top: 255, w: 789, h: 2 }, // biała linia 80% między gwiazdkami
  ruleStarWhite: { left: 516, top: 248.5, size: 16 },
  ruleStarLime: { left: 1298, top: 241.5, size: 30 },
  lineC: { right: 1440 - 1321, top: 339, w: 470, fontPx: 44 }, // Montserrat Black, 3 linie
  text: { left: 857, top: 565, w: 470, fontPx: 19, gap: 26, barW: 4, barGap: 20 },
  robot: { left: 34, top: 375, w: 679, h: 755 },
  starLime: { left: 632, top: 339, w: 100, h: 60 }, // wycięte z renderu (rotacja)
  starOutline: { left: 224, top: 384, w: 73, h: 68 },
  pill: { left: 709, top: 830, w: 680, h: 206, radiusPx: 40, borderPx: 3, padX: 58, fontPx: 17 },
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

/** segmenty bez zmian rozmiaru; strong → podana klasa (np. pogrubienie w lime) */
function RichStrong({ segs, strongClass }: { segs: RichSeg[]; strongClass: string }) {
  return (
    <>
      {segs.map((s, i) => (
        <span key={i} className={s.strong ? strongClass : undefined}>
          {nbspOrphans(s.text)}
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
    // tło do krawędzi ekranu (ultra wide: treść ma cap --workspace)
    <section className="relative w-full bg-brand-blue">
      <div className="@container mx-auto w-full max-w-(--workspace)">
        {/* górna część posteru (0..1130); pasek TY DECYDUJESZ + marquee = ManifestBarDesktop */}
        <div className="relative aspect-[1440/1130] overflow-hidden bg-brand-blue" data-node-id="2240:1628">
          {/* NIE CHODZI O TO, */}
          <h2
            className="absolute font-modular font-normal text-white"
            style={{ left: c(G.lineA.left), top: c(G.lineA.top), width: c(G.lineA.w), fontSize: c(G.lineA.fontPx), lineHeight: "normal" }}
            data-reveal=""
            data-node-id="2240:1654"
          >
            {m.lineA}
          </h2>
          {/* CZY AI ZMIENI TWOJĄ BRANŻĘ. + linia z gwiazdkami */}
          <p
            className="absolute whitespace-nowrap font-display font-light text-white"
            style={{ left: c(G.lineB.left), top: c(G.lineB.top), fontSize: c(G.lineB.fontPx), lineHeight: "normal", transitionDelay: "0.12s" }}
            data-reveal=""
            data-node-id="2240:1655"
          >
            {m.lineB}
          </p>
          <div className="absolute" style={{ left: 0, top: 0, width: "100%", height: "100%", transitionDelay: "0.18s" }} data-reveal="">
            <div className="absolute bg-white opacity-80" style={{ left: c(G.rule.left), top: c(G.rule.top), width: c(G.rule.w), height: c(G.rule.h) }} data-node-id="2240:1656" />
            <img src="/assets/gwiazdka4-white.svg" alt="" className="absolute" style={{ left: c(G.ruleStarWhite.left), top: c(G.ruleStarWhite.top), width: c(G.ruleStarWhite.size), height: c(G.ruleStarWhite.size) }} />
            <img src="/assets/gwiazdka4-lime.svg" alt="" className="absolute" style={{ left: c(G.ruleStarLime.left), top: c(G.ruleStarLime.top), width: c(G.ruleStarLime.size), height: c(G.ruleStarLime.size) }} />
          </div>
          {/* robot z hologramami (PNG z alfą) */}
          <img
            src="/assets/manifest-robot-v2.webp"
            alt="Robot AI z hologramami danych na dłoni"
            className="absolute max-w-none"
            style={{ left: c(G.robot.left), top: c(G.robot.top), width: c(G.robot.w), height: c(G.robot.h), transitionDelay: "0.1s" }}
            data-reveal=""
            data-node-id="2240:1652"
          />
          {/* gwiazdki dekoracyjne nad robotem */}
          <img src="/assets/manifest-v2-star-outline-f.png" alt="" className="absolute" style={{ left: c(G.starOutline.left), top: c(G.starOutline.top), width: c(G.starOutline.w), height: c(G.starOutline.h), transitionDelay: "0.25s" }} data-reveal="" data-node-id="2240:1659" />
          <img src="/assets/manifest-v2-star-lime-f.png" alt="" className="absolute" style={{ left: c(G.starLime.left), top: c(G.starLime.top), width: c(G.starLime.w), height: c(G.starLime.h), transitionDelay: "0.3s" }} data-reveal="" data-node-id="2240:1649" />
          {/* CHODZI O TO, / CZY JESTEŚ NA TO / GOTOWY. (łamanie naturalne w szer. 470) */}
          <p
            className="absolute font-display font-black text-white"
            style={{ right: c(G.lineC.right), top: c(G.lineC.top), width: c(G.lineC.w), fontSize: c(G.lineC.fontPx), lineHeight: "normal", textAlign: "right" as const, transitionDelay: "0.22s" }}
            data-reveal=""
            data-node-id="2240:1642"
          >
            {m.lineC[0]}
            <br />
            {m.lineC[1]}
          </p>
          {/* akapit: wstęp + wniosek z limonkową kreską */}
          <div
            className="absolute flex flex-col font-display font-medium text-white"
            style={{ left: c(G.text.left), top: c(G.text.top), width: c(G.text.w), gap: c(G.text.gap), fontSize: c(G.text.fontPx), lineHeight: 1.5, transitionDelay: "0.3s" }}
            data-reveal=""
            data-node-id="2240:1644"
          >
            <p style={{ textAlign: "justify" as const }}>
              <RichStrong segs={m.paragraph} strongClass="font-bold" />
            </p>
            <div className="flex items-start" style={{ gap: c(G.text.barGap) }}>
              <div className="shrink-0 self-stretch bg-brand-lime" style={{ width: c(G.text.barW), borderRadius: c(2) }} />
              <p className="flex-1" style={{ textAlign: "justify" as const }}>
                <RichStrong segs={m.conclusion} strongClass="font-bold text-brand-lime" />
              </p>
            </div>
          </div>
          {/* limonkowy pill z tekstem */}
          <div
            className="absolute flex items-center justify-center border-solid border-white bg-brand-lime"
            style={{
              left: c(G.pill.left), top: c(G.pill.top), width: c(G.pill.w), height: c(G.pill.h),
              borderRadius: c(G.pill.radiusPx), borderWidth: c(G.pill.borderPx),
              paddingLeft: c(G.pill.padX), paddingRight: c(G.pill.padX), transitionDelay: "0.4s",
            }}
            data-reveal=""
            data-node-id="2240:1650"
          >
            <p
              className="font-body text-brand-blue"
              style={{ fontSize: c(G.pill.fontPx), lineHeight: 1.44, textAlign: "justify" as const }}
            >
              <Rich segs={m.pill} baseFontPx={G.pill.fontPx} scale={c} />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* pasek TY DECYDUJESZ + marquee (design y1963..2161 = canvas 1130..1328) —
   osobny poster, żeby między manifest a pasek dało się wstawić sekcję
   (reklama webinaru na home). Wygląd 1:1 jak w jednym posterze. */
function ManifestBarDesktop({ m }: { m: HomeManifest }) {
  return (
    // pasy lime (144) + biały (54) przedłużone do krawędzi ekranu
    <section className="relative w-full" style={{ background: `linear-gradient(to bottom, var(--color-brand-lime) 0 ${(G.limeBar.h / 198) * 100}%, #fff ${(G.limeBar.h / 198) * 100}% 100%)` }}>
      <div className="@container mx-auto w-full max-w-(--workspace)">
        <div className="relative aspect-[1440/198] overflow-hidden bg-brand-blue">
          {/* pasek lime ZAWSZE widoczny (uwaga Patryka) — reveal tylko napisy;
              TY DECYDUJESZ: reveal na spanie (p ma -translate-x-full) */}
          <div
            className="absolute inset-x-0 bg-brand-lime"
            style={{ top: 0, height: c(G.limeBar.h) }}
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
          {/* biały pasek z marquee — BEZ animacji pojawiania (uwaga Patryka):
              widoczny od razu, po prostu przewija się w lewo */}
          <div
            className="absolute inset-x-0 bg-white"
            style={{ top: c(G.whiteBar.top - G.limeBar.top), height: c(G.whiteBar.h) }}
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

/* ---------- MOBILE (canvas 402×2435, strona y875–3310; 1cqw = 4.02px) ---------- */

const cm = (px: number) => `${(px / 4.02).toFixed(4)}cqw`;

// redesign 2026-10 (Figma 375:1738, węzły 2244:*): od y1520 strony nowy układ —
// lineB pod lineA + linia z gwiazdkami, robot z hologramami (ten sam PNG co desktop)
// z gradientem w tło, lineC 3 linie, akapit + wniosek z lime kreską, pill, CTA z linią.
const GM = {
  blueBg: { h: 2213 }, // TLO: strona 875–3088
  arrowTop: { left: 237.85, top: -7, w: 226.5, h: 226.5 },
  tagline: { left: 43, top: 197, w: 271, fontPx: 20 },
  group9: { left: 72, top: 298, w: 287, h: 336 },
  lineA: { left: 24, top: 655, w: 175, fontPx: 28, leading: 1.483 },
  lineB: { left: 24, top: 809, fontPx: 16 }, // Montserrat Light, wersaliki
  rule: { left: 36, top: 849, w: 330, h: 1.5 },
  ruleStarWhite: { left: 24, top: 843, size: 14 },
  ruleStarLime: { left: 366, top: 838, size: 24 },
  starOutline: { left: 115, top: 898, w: 39, h: 37 }, // „gwiazdka w gwiazdce" wycięta z renderu
  robot: { left: 11, top: 890, w: 380, h: 423 },
  fade: { top: 1145, h: 170 }, // gradient przezroczysty → blue (przejście robota w tło)
  arrow: { left: 58, top: 1295, w: 32, h: 45 }, // STAR_ARROW 375:1823 wycięty z renderu
  lineC: { right: 402 - 378, top: 1335, w: 354, fontPx: 34 },
  text: { left: 24, top: 1520, w: 354, fontPx: 17, gap: 22, barGap: 16 },
  // pill mobile v2 (375:1820): obrys 2px BLUE, px35, wszystkie segmenty 17px, lh 1.313
  pill: { left: 16, top: 1790, w: 377, h: 195, radiusPx: 40, borderPx: 2, padX: 35, fontPx: 17 },
  ctaLine: { top: 2072, h: 1 },
  button: { left: 44, top: 2042, w: 315, h: 57, radiusPx: 40, borderPx: 3, fontPx: 16, trackPx: 0.64 },
  aiToTag: { left: 35, top: 2185, fontPx: 12, leading: 1.483 },
  limeBar: { top: 2214, h: 95 }, // strona 3089–3184
  tyDecy: { rightEdge: 367.5, top: 2240.5, fontPx: 35, trackPx: 2.1 },
  blueStrip: { top: 2310, h: 2 },
  // szary pas z „JAK BARDZO…" + biały pasek haseł (2256:2820) — redesign 2026-10
  jakBardzo: { right: 402 - 367, top: 2333, w: 209, fontPx: 12 },
  whiteBar: { top: 2391, h: 40 },
  marquee: { top: 2395, h: 33, fontPx: 14, gapPx: 30, starW: 31, starH: 33 },
};

function ManifestMobile({ m }: { m: HomeManifest }) {
  return (
    <section className="relative w-full md:hidden">
      <div className="@container mx-auto w-full">
        {/* górna część (0..2150); „AI TO NARZĘDZIE" + pasek TY DECYDUJESZ + hasła = ManifestBarMobile */}
        <div className="relative aspect-[402/2150] overflow-hidden bg-page">
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
          {/* NIE CHODZI O TO, */}
          <h2 className="absolute font-modular font-normal text-white" style={{ left: cm(GM.lineA.left), top: cm(GM.lineA.top), width: cm(GM.lineA.w), fontSize: cm(GM.lineA.fontPx), lineHeight: GM.lineA.leading }} data-reveal="" data-node-id="375:1794">
            {m.lineA}
          </h2>
          {/* CZY AI ZMIENI TWOJĄ BRANŻĘ. + linia z gwiazdkami */}
          <p className="absolute whitespace-nowrap font-display font-light text-white" style={{ left: cm(GM.lineB.left), top: cm(GM.lineB.top), fontSize: cm(GM.lineB.fontPx), lineHeight: "normal", transitionDelay: "0.12s" }} data-reveal="" data-node-id="375:1807">
            {m.lineB}
          </p>
          <div className="absolute inset-0" style={{ transitionDelay: "0.18s" }} data-reveal="">
            <div className="absolute bg-white opacity-80" style={{ left: cm(GM.rule.left), top: cm(GM.rule.top), width: cm(GM.rule.w), height: `max(1px, ${cm(GM.rule.h)})` }} data-node-id="2244:1628" />
            <img src="/assets/gwiazdka4-white.svg" alt="" className="absolute" style={{ left: cm(GM.ruleStarWhite.left), top: cm(GM.ruleStarWhite.top), width: cm(GM.ruleStarWhite.size), height: cm(GM.ruleStarWhite.size) }} />
            <img src="/assets/gwiazdka4-lime.svg" alt="" className="absolute" style={{ left: cm(GM.ruleStarLime.left), top: cm(GM.ruleStarLime.top), width: cm(GM.ruleStarLime.size), height: cm(GM.ruleStarLime.size) }} />
          </div>
          {/* robot z hologramami + przejście w tło */}
          <img src="/assets/manifest-robot-v2.webp" alt="Robot AI z hologramami danych na dłoni" className="absolute max-w-none" style={{ left: cm(GM.robot.left), top: cm(GM.robot.top), width: cm(GM.robot.w), height: cm(GM.robot.h), transitionDelay: "0.15s" }} data-reveal="" data-node-id="2244:2666" />
          <div className="absolute inset-x-0 bg-gradient-to-b from-[rgba(19,29,255,0)] to-brand-blue" style={{ top: cm(GM.fade.top), height: cm(GM.fade.h) }} data-node-id="2244:2688" />
          <img src="/assets/m-manifest-v2-star-outline-f.png" alt="" className="absolute" style={{ left: cm(GM.starOutline.left), top: cm(GM.starOutline.top), width: cm(GM.starOutline.w), height: cm(GM.starOutline.h), transitionDelay: "0.25s" }} data-reveal="" data-node-id="2244:2667" />
          <img src="/assets/m-manifest-v2-arrow-f.png" alt="" className="absolute" style={{ left: cm(GM.arrow.left), top: cm(GM.arrow.top), width: cm(GM.arrow.w), height: cm(GM.arrow.h), transitionDelay: "0.3s" }} data-reveal="" data-node-id="375:1823" />
          {/* CHODZI O TO, / CZY JESTEŚ NA TO / GOTOWY. */}
          <p className="absolute font-display font-black text-white" style={{ right: cm(GM.lineC.right), top: cm(GM.lineC.top), width: cm(GM.lineC.w), fontSize: cm(GM.lineC.fontPx), lineHeight: "normal", textAlign: "right" as const, transitionDelay: "0.2s" }} data-reveal="" data-node-id="375:1808">
            {m.lineC[0]}
            <br />
            {m.lineC[1]}
          </p>
          {/* akapit: wstęp + wniosek z limonkową kreską */}
          <div className="absolute flex flex-col font-display font-medium text-white" style={{ left: cm(GM.text.left), top: cm(GM.text.top), width: cm(GM.text.w), gap: cm(GM.text.gap), fontSize: cm(GM.text.fontPx), lineHeight: 1.5, transitionDelay: "0.28s" }} data-reveal="" data-node-id="2244:1633">
            <p>
              <RichStrong segs={m.paragraph} strongClass="font-bold" />
            </p>
            <div className="flex items-start" style={{ gap: cm(GM.text.barGap) }}>
              <div className="shrink-0 self-stretch bg-brand-lime" style={{ width: cm(4), borderRadius: cm(2) }} />
              <p className="flex-1">
                <RichStrong segs={m.conclusion} strongClass="font-bold text-brand-lime" />
              </p>
            </div>
          </div>
          {/* pill */}
          <div
            className="absolute flex items-center justify-center border-solid border-brand-blue bg-brand-lime"
            style={{ left: cm(GM.pill.left), top: cm(GM.pill.top), width: cm(GM.pill.w), height: cm(GM.pill.h), borderRadius: cm(GM.pill.radiusPx), borderWidth: cm(GM.pill.borderPx), paddingLeft: cm(GM.pill.padX), paddingRight: cm(GM.pill.padX), transitionDelay: "0.35s" }} data-reveal=""
            data-node-id="375:1820"
          >
            <p className="font-body text-brand-blue" style={{ fontSize: cm(GM.pill.fontPx), lineHeight: 1.313, textAlign: "justify" as const }}>
              <Rich segs={m.pill.map((s) => ({ ...s, fontPx: undefined }))} baseFontPx={GM.pill.fontPx} scale={cm} />
            </p>
          </div>
          {/* CTA na białej linii przez całą szerokość (Group 22) */}
          <div className="absolute inset-x-0 bg-white" style={{ top: cm(GM.ctaLine.top), height: `max(1px, ${cm(GM.ctaLine.h)})` }} data-node-id="2251:8710" />
          <Link
            href="/#kursy"
            className="absolute flex items-center justify-center whitespace-nowrap border-solid border-white bg-brand-lime font-modular text-brand-blue"
            style={{ left: cm(GM.button.left), top: cm(GM.button.top), width: cm(GM.button.w), height: cm(GM.button.h), borderRadius: cm(GM.button.radiusPx), borderWidth: cm(GM.button.borderPx), fontSize: cm(GM.button.fontPx), letterSpacing: cm(GM.button.trackPx), transitionDelay: "0.4s" }} data-reveal=""
            data-node-id="375:1842"
          >
            {m.mobileCtaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}

/* dolna część mobile (canvas 2150..2431): „AI TO NARZĘDZIE" + pasek TY DECYDUJESZ
   + szary pas „JAK BARDZO…" + biały pasek haseł (marquee) */
const MB = 2150;
function ManifestBarMobile({ m }: { m: HomeManifest }) {
  return (
    <section className="relative w-full md:hidden">
      <div className="@container mx-auto w-full">
        <div className="relative aspect-[402/281] overflow-hidden bg-page">
          <div className="absolute inset-x-0 top-0 bg-brand-blue" style={{ height: cm(GM.blueBg.h - MB) }} />
          {/* AI TO NARZĘDZIE */}
          <p className="absolute whitespace-nowrap font-modular text-white" style={{ left: cm(GM.aiToTag.left), top: cm(GM.aiToTag.top - MB), fontSize: cm(GM.aiToTag.fontPx), lineHeight: GM.aiToTag.leading, transitionDelay: "0.1s" }} data-reveal="" data-node-id="375:1861">
            {m.bar.left.toUpperCase().replace(".", "")}
          </p>
          {/* pasek lime z TY DECYDUJESZ */}
          {/* pasek ZAWSZE widoczny — reveal tylko napis (span, bo p ma translate) */}
          <div className="absolute inset-x-0 bg-brand-lime" style={{ top: cm(GM.limeBar.top - MB), height: cm(GM.limeBar.h) }} data-node-id="375:1854">
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
          <div className="absolute inset-x-0 bg-brand-blue" style={{ top: cm(GM.blueStrip.top - MB), height: `max(1px, ${cm(GM.blueStrip.h)})` }} />
          {/* JAK BARDZO ZMIENI TWOJĄ PRACĘ */}
          <p className="absolute font-modular text-black" style={{ right: cm(GM.jakBardzo.right), top: cm(GM.jakBardzo.top - MB), width: cm(GM.jakBardzo.w), fontSize: cm(GM.jakBardzo.fontPx), lineHeight: 1.483, textAlign: "right" as const }} data-node-id="375:1864">
            {m.bar.right.toUpperCase()}
          </p>
          {/* biały pasek haseł (marquee) */}
          <div className="absolute inset-x-0 bg-white" style={{ top: cm(GM.whiteBar.top - MB), height: cm(GM.whiteBar.h) }} data-node-id="2256:2820">
            <div className="absolute inset-x-0" style={{ top: cm(GM.marquee.top - GM.whiteBar.top), height: cm(GM.marquee.h) }}>
              <MarqueeRow text={m.marqueeText} scale={cm} fontPx={GM.marquee.fontPx} gapPx={GM.marquee.gapPx} starW={GM.marquee.starW} starH={GM.marquee.starH} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** pasek TY DECYDUJESZ + marquee (desktop) / „AI TO NARZĘDZIE" + pasek (mobile) —
 *  renderowany osobno po ManifestSection (miejsce na sekcje pomiędzy) */
export function ManifestBar({ m }: { m: HomeManifest }) {
  return (
    <>
      <div className="hidden md:block">
        <ManifestBarDesktop m={m} />
      </div>
      <ManifestBarMobile m={m} />
    </>
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
