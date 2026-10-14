/*
 * /manifest v2 — DESKTOP (≥1024px: laptop, MacBook, desktop, 2K/4K).
 * Design: Figma 5ufIXE17KqmkvVrfSVzUFE, frame MANIFEST 458:1640 (1510×5703).
 * Poster-canvas: płótno 1510 szer. → 1cqw = 15.1px designu; całość skaluje się
 * proporcjonalnie do szerokości (cap --workspace). Fonty tekstów ciągłych mają
 * podłogę px (fs()), żeby na laptopie 1024–1280 nie spadały poniżej czytelności
 * — boksy mają zapas wysokości na dodatkowe zawinięcia.
 * Sekcje: A hero (0..1145, szare) · B bela ze statem (1145..1571, niebieska)
 * · C+D limonkowa „przyszłość" + niebieskie zamknięcie (1571..3880)
 * · kontakt = OnasKontakt (pill CTA na białej linii + formularz) · stopka.
 * Gwiazdy/elipsa = eksporty SVG node'ów (461:1705/1716/1717/1718/1736/1977/1988)
 * z wyciętym wypieczonym tłem; pozycje = origin eksportu (zgodne z renderem 1:1).
 */
import type { ManifestPage, NavLink } from "@/content/types";
import type { KontaktLayout } from "../onas/OnasKontakt";
import SiteNav from "../shared/SiteNav";
import CountUpStat from "./CountUpStat";
import ManifestRich from "./ManifestRich";
import RobotVideo from "./RobotVideo";

const c = (px: number) => `${(px / 15.1).toFixed(4)}cqw`;
/** rozmiar fontu z podłogą (px) dla wąskich laptopów */
const fs = (px: number, minPx: number) => `max(${minPx}px, ${c(px)})`;

type Box = { x: number; y: number; w: number; h: number };
const pos = (b: Box): React.CSSProperties => ({ left: c(b.x), top: c(b.y), width: c(b.w), height: c(b.h) });

/* A — hero, coords = frame */
const A = {
  h: 1145,
  starLime: { x: 39.1548, y: 40.8474, w: 268, h: 267 },
  title: { x: 284, y: 181, fontPx: 102, trackPx: 7.14, strokePx: 10 },
  box: { x: 159, y: 335, w: 1193, h: 517, r: 100 },
  boxText: { x: 291, y: 444, w: 622, fontPx: 24, gapPx: 31.5 },
  robot: { x: 865, y: 90, w: 551, h: 762 },
  card: { x: 360, y: 803, w: 734, h: 242, r: 40, borderPx: 4, padX: 101, fontPx: 22 },
};

/* B — bela ze statem, coords względem y=1145 */
const B = {
  h: 426,
  num: { x: 387, y: 66.5, fontPx: 62.5 },
  label: { x: 389, y: 141, w: 470, fontPx: 33, lhPx: 43.5 },
  sub: { x: 389, y: 326, fontPx: 17.3 },
};

/* C+D — coords względem y=1571 */
const C = {
  h: 2309,
  lime: { h: 1534, rBl: 245 },
  starWhite: { x: 625.771, y: 128.45, w: 885, h: 1032 },
  ellipse: { x: 130.016, y: 202.5, w: 736, h: 302 },
  gw1: { x: 133.03, y: 403.8, w: 133, h: 125 },
  gw2: { x: 703.717, y: 169, w: 183, h: 145 },
  word: { x: 228, y: 316.32, fontPx: 60 },
  tail: { x: 804, y: 563, w: 467, fontPx: 45 },
  heading: { x: 175, y: 792, w: 426, fontPx: 50, lh: 1.214 }, // pitch 60.7 zmierzony z renderu (Figma podaje 100.88%)
  body: { x: 175, y: 1091, w: 426, fontPx: 18 },
  starArrow: { x: 608.714, y: 951.91, w: 185, h: 173 },
  pride: { x: 820, y: 1156, w: 597, h: 233, r: 132 },
  prideText: { right: 1318, y: 1235, w: 409, fontPx: 20 },
  starSmall: { x: 728, y: 1698, w: 54, h: 52 },
  kicker: { cx: 754.5, y: 1796, fontPx: 25, lhPx: 70 },
  bars: [
    { x: 383, y: 1911, w: 744 },
    { x: 282, y: 1980, w: 938 },
    { x: 418, y: 2049, w: 674 },
  ],
  barH: 53,
  barFontPx: 40,
};

/* Kontakt (OnasKontakt) w geometrii designu manifestu: sekcja od y=3880
 * (biała linia 3883), canvas 1440 → przelicznik K = 1440/1510. Nagłówek jak
 * na home (HK 28, pitch 49, bez scaleX), formularz 674 szer. w skali 1510. */
const K = 1440 / 1510;
export const MANIFEST_KONTAKT: KontaktLayout = {
  h: 1504 * K,
  line: { y: 3 * K, hPx: 6 * K },
  cta: { x: 395 * K, y: -55 * K, w: 722 * K, h: 117 * K, borderPx: 6 * K, fontPx: 35 * K },
  heading: { top: 198.86 * K, fontPx: 28 * K, trackPx: 0, lhPx: 49 * K, scaleX: 1 },
  form: { left: 423.86, top: 420.86, scale: K },
  starL: { src: "/assets/manifest/mf-kt-star-l.svg", x: 0, y: 151 * K, w: 909 * K, h: 1023 * K },
  starR: { src: "/assets/manifest/mf-kt-star-r.svg", x: 581.862 * K, y: 510.87 * K, w: 929 * K, h: 1021 * K },
};

export default function ManifestDesktop({ m, nav }: { m: ManifestPage; nav: NavLink[] }) {
  return (
    <div className="hidden lg:block">
      {/* A — HERO */}
      <section className="relative w-full overflow-x-clip bg-page">
        <div className="@container mx-auto w-full max-w-(--workspace)">
          <div className="relative" style={{ aspectRatio: `1510/${A.h}` }}>
            <SiteNav nav={nav} />
            <img
              src="/assets/manifest/mf-star-lime.svg"
              alt=""
              aria-hidden
              className="manifest-spark absolute"
              style={pos(A.starLime)}
            />
            <h1
              className="absolute z-[4] whitespace-nowrap font-display font-black leading-none text-brand-blue"
              style={{
                left: c(A.title.x),
                top: c(A.title.y),
                fontSize: c(A.title.fontPx),
                letterSpacing: c(A.title.trackPx),
                WebkitTextStroke: `${c(A.title.strokePx)} var(--color-brand-lime)`,
                paintOrder: "stroke fill",
              }}
              data-reveal=""
            >
              {m.heading}
            </h1>
            {/* niebieski boks z akapitami */}
            <div
              className="absolute z-[1] bg-brand-blue"
              style={{ ...pos(A.box), borderRadius: c(A.box.r) }}
              data-node-id="458:1645"
            />
            <div
              className="absolute z-[1] flex flex-col text-justify font-body text-white"
              style={{
                left: c(A.boxText.x),
                top: c(A.boxText.y),
                width: c(A.boxText.w),
                fontSize: c(A.boxText.fontPx),
                lineHeight: 1.313,
                rowGap: c(A.boxText.gapPx),
              }}
              data-reveal=""
            >
              {m.intro.map((p, i) => (
                <p key={i}>
                  <ManifestRich segs={p} basePx={A.boxText.fontPx} />
                </p>
              ))}
            </div>
            {/* robot — nad boksem, pod limonkową kartą; animacja power-on */}
            <RobotVideo className="absolute z-[2]" style={pos(A.robot)} />
            {/* limonkowa karta */}
            <div
              className="absolute z-[3] flex items-center border-solid border-brand-blue bg-brand-lime"
              style={{
                ...pos(A.card),
                borderRadius: c(A.card.r),
                borderWidth: c(A.card.borderPx),
                paddingLeft: c(A.card.padX),
                paddingRight: c(A.card.padX),
              }}
              data-reveal=""
              data-node-id="458:1664"
            >
              <p
                className="text-justify font-body text-brand-blue"
                style={{ fontSize: fs(A.card.fontPx, 14), lineHeight: 1.313 }}
              >
                <ManifestRich segs={m.lead} basePx={A.card.fontPx} />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* B — BELA ZE STATEM */}
      <section className="relative w-full overflow-x-clip bg-brand-blue">
        <div className="@container mx-auto w-full max-w-(--workspace)">
          <div className="relative" style={{ aspectRatio: `1510/${B.h}` }}>
            <p className="absolute" style={{ left: c(B.num.x), top: c(B.num.y) }}>
              <CountUpStat
                from={m.stat.from}
                to={m.stat.to}
                className="whitespace-nowrap font-modular leading-none text-brand-lime"
                style={{ fontSize: c(B.num.fontPx) }}
              />
            </p>
            <p
              className="absolute font-display font-semibold text-white"
              style={{
                left: c(B.label.x),
                top: c(B.label.y),
                width: c(B.label.w),
                fontSize: c(B.label.fontPx),
                lineHeight: c(B.label.lhPx),
              }}
              data-reveal=""
            >
              {m.stat.label}
            </p>
            <p
              className="absolute whitespace-nowrap font-body font-light italic text-white/85"
              style={{ left: c(B.sub.x), top: c(B.sub.y), fontSize: fs(B.sub.fontPx, 12) }}
              data-reveal=""
            >
              {m.stat.sub}
            </p>
          </div>
        </div>
      </section>

      {/* C+D — PRZYSZŁOŚĆ (lime) + ZAMKNIĘCIE (blue). Poza capem workspace
          boki: lime u góry, blue na dole (gradient w proporcji płótna). */}
      <section
        className="relative w-full overflow-x-clip"
        style={{
          background: `linear-gradient(to bottom, var(--color-brand-lime) ${((C.lime.h - C.lime.rBl) / C.h) * 100}%, var(--color-brand-blue) ${((C.lime.h - C.lime.rBl) / C.h) * 100}%)`,
        }}
      >
        <div className="@container mx-auto w-full max-w-(--workspace)">
          <div className="relative overflow-hidden bg-brand-blue" style={{ aspectRatio: `1510/${C.h}` }}>
            <div
              className="absolute inset-x-0 top-0 bg-brand-lime"
              style={{ height: c(C.lime.h), borderBottomLeftRadius: c(C.lime.rBl) }}
            />
            <img src="/assets/manifest/mf-star-white-big.svg" alt="" aria-hidden className="absolute" style={pos(C.starWhite)} />
            <img src="/assets/manifest/mf-ellipse.svg" alt="" aria-hidden className="absolute" style={pos(C.ellipse)} />
            <h2 className="absolute inset-0" data-reveal="">
              <span
                className="absolute whitespace-nowrap font-modular text-brand-blue"
                style={{ left: c(C.word.x), top: c(C.word.y), fontSize: c(C.word.fontPx), lineHeight: 1.403 }}
              >
                {m.future.word}
              </span>
              <span
                className="absolute font-modular text-brand-blue"
                style={{ left: c(C.tail.x), top: c(C.tail.y), width: c(C.tail.w), fontSize: c(C.tail.fontPx), lineHeight: 1.403 }}
              >
                {" "}
                {m.future.tail}
              </span>
            </h2>
            <img src="/assets/manifest/mf-gw1.svg" alt="" aria-hidden className="manifest-spark absolute" style={pos(C.gw1)} />
            <img src="/assets/manifest/mf-gw2.svg" alt="" aria-hidden className="manifest-spark absolute" style={{ ...pos(C.gw2), animationDelay: "-1.4s" }} />
            <h3
              className="absolute font-display font-extrabold text-brand-blue"
              style={{ left: c(C.heading.x), top: c(C.heading.y), width: c(C.heading.w), fontSize: c(C.heading.fontPx), lineHeight: C.heading.lh }}
              data-reveal=""
            >
              {m.futureHeading}
            </h3>
            <p
              className="absolute text-justify font-body font-light text-brand-blue"
              style={{ left: c(C.body.x), top: c(C.body.y), width: c(C.body.w), fontSize: fs(C.body.fontPx, 14), lineHeight: 1.5 }}
              data-reveal=""
            >
              {m.futureBody}
            </p>
            <img src="/assets/manifest/mf-star-arrow-blue.svg" alt="" aria-hidden className="absolute" style={pos(C.starArrow)} />
            <div
              className="absolute bg-brand-blue"
              style={{ ...pos(C.pride), borderBottomLeftRadius: c(C.pride.r), borderTopRightRadius: c(C.pride.r) }}
              data-reveal=""
            >
              <p
                className="absolute text-right font-display text-white"
                style={{
                  right: c(C.pride.x + C.pride.w - C.prideText.right),
                  top: c(C.prideText.y - C.pride.y),
                  width: c(C.prideText.w),
                  fontSize: fs(C.prideText.fontPx, 14),
                  lineHeight: 1.22,
                }}
              >
                <ManifestRich segs={m.pride} basePx={C.prideText.fontPx} />
              </p>
            </div>

            {/* ZAMKNIĘCIE */}
            <img src="/assets/manifest/mf-star-small.svg" alt="" aria-hidden className="manifest-spark absolute" style={pos(C.starSmall)} />
            <p
              className="absolute -translate-x-1/2 whitespace-nowrap text-center font-modular text-brand-lime"
              style={{ left: c(C.kicker.cx), top: c(C.kicker.y), fontSize: c(C.kicker.fontPx), lineHeight: c(C.kicker.lhPx) }}
              data-reveal=""
            >
              {m.closingKicker}
            </p>
            <p className="absolute inset-0">
              {m.closingLines.map((line, i) => (
                <span
                  key={line}
                  className="absolute flex items-center justify-center whitespace-nowrap bg-brand-lime font-display font-extrabold uppercase text-brand-blue"
                  style={{
                    left: c(C.bars[i].x),
                    top: c(C.bars[i].y),
                    width: c(C.bars[i].w),
                    height: c(C.barH),
                    fontSize: c(C.barFontPx),
                    lineHeight: 1,
                  }}
                  data-reveal=""
                >
                  {line}
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
