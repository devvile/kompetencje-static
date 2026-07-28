import Image from "next/image";
import Link from "next/link";
import type { HomeHero, NavLink } from "../../content/types";
import SiteNav from "../shared/SiteNav";
import MobileMenu from "../shared/MobileMenu";

/*
 * Hero + nav = dokładnie 100svh, poster-canvas 1440×833 (desktop).
 * Wymiary w cqw względem szerokości canvasa (1cqw = 14.4px przy 1440);
 * kontener @container jest piętro wyżej niż elementy używające cqw.
 *
 * Geometria = metadane Figmy zweryfikowane pomiarami pikselowymi renderu
 * (design-refs/tools/hero-align.js); eksporty PNG node'ów mają wtopione tło
 * strony, stąd robot ze źródłowego PNG (alpha) a .AI z filtrowanego PNG.
 */

// px projektu (canvas 1440) → cqw
const c = (px: number) => `${(px / 14.4).toFixed(4)}cqw`;

/*
 * Geometria hero zmierzona z renderu designu (px na canvasie 1440×833).
 * caps = górna krawędź wersalików w renderze designu.
 */
const G = {
  // eksport robota jest przycięty do strony (x0..637, y26..833); PNG 2x = 1274×1614
  robot: { left: -9, top: 26, w: 646, h: 807 },
  // PNG 2x eksporty — naturalny rozmiar 1x (w=png/2), pozycje dostrajane korelacją vs render
  starRobot: { left: 0, top: 129, w: 259, h: 251.5 }, // ZA robotem (pozycja z renderu)
  limeStarTR: { left: 1020.3, top: 173.5, w: 340.5, h: 323 },
  starTRsmall: { left: 1235, top: 195.6, w: 110.5, h: 105 },
  swoosh: { left: 584, top: 438, w: 303.5, h: 304.5 },
  aiLogo: { left: 1003.93, top: 444.89, w: 436.5, h: 369.5 },
  h1: {
    left: 621,
    line1: { top: 224.6, fontPx: 55, scaleY: 1, leading: 0.923 },
    line2: { top: 287.4, fontPx: 56, scaleY: 1, leading: 1.125 },
  },
  kicker: { left: 621, top: 360, fontPx: 18 },
  tagline: { right: 1440 - 1140, top: 522, fontPx: 25, lineHeightPx: 35, width: 401 },
  button: { left: 126, top: 728, w: 439, h: 74, radiusPx: 75, borderPx: 4, fontPx: 18 },
};

function HeroDesktop({ hero, nav }: { hero: HomeHero; nav: NavLink[] }) {
  return (
    <section className="relative flex h-svh items-center justify-center">
      <div
        className="@container mx-auto w-full"
        style={{
          width: "min(100%, var(--workspace), calc(100svh * (1440 / 833)))",
        }}
      >
        <div className="relative aspect-[1440/833] overflow-hidden bg-page">
          {/* gwiazda outline ZA robotem — tło zdjęcia robota ją przykrywa */}
          <img
            src="/assets/star-outline-f.png"
            alt=""
            className="absolute"
            style={{ left: c(G.starRobot.left), top: c(G.starRobot.top), width: c(G.starRobot.w), height: c(G.starRobot.h) }}
            data-node-id="401:2610"
          />
          {/* robot */}
          <Image
            src="/assets/robot-hero-alpha-2x.png"
            alt="Robot AI — kompetencje przyszłości"
            width={1292}
            height={1614}
            priority
            className="absolute"
            style={{ left: c(G.robot.left), top: c(G.robot.top), width: c(G.robot.w), height: c(G.robot.h) }}
            data-node-id="401:2568"
          />
          {/* limonkowa gwiazda przy prawej krawędzi */}
          <img
            src="/assets/lime-star-f.png"
            alt=""
            className="absolute"
            style={{ left: c(G.limeStarTR.left), top: c(G.limeStarTR.top), width: c(G.limeStarTR.w), height: c(G.limeStarTR.h) }}
            data-node-id="401:2570"
          />
          {/* mała gwiazda outline w prawym górnym rogu */}
          <img
            src="/assets/star-outline-sm-f.png"
            alt=""
            className="absolute"
            style={{ left: c(G.starTRsmall.left), top: c(G.starTRsmall.top), width: c(G.starTRsmall.w), height: c(G.starTRsmall.h) }}
            data-node-id="401:2611"
          />
          {/* limonkowy swoosh (STAR_ARROW) */}
          <img
            src="/assets/star-arrow-f.png"
            alt=""
            className="absolute"
            style={{ left: c(G.swoosh.left), top: c(G.swoosh.top), width: c(G.swoosh.w), height: c(G.swoosh.h) }}
            data-node-id="401:2612"
          />
          {/* H1 — linie pozycjonowane osobno; pionowy stretch liter jak w designie */}
          <h1 className="pointer-events-none absolute inset-0 font-display font-black text-brand-blue" data-node-id="401:2579">
            <span
              className="absolute block origin-top-left whitespace-nowrap"
              style={{
                left: c(G.h1.left),
                top: c(G.h1.line1.top),
                fontSize: c(G.h1.line1.fontPx),
                lineHeight: 1,
                transform: `scaleY(${G.h1.line1.scaleY})`,
              }}
            >
              {hero.headlineLine1}
            </span>
            <span
              className="absolute block origin-top-left whitespace-nowrap"
              style={{
                left: c(G.h1.left),
                top: c(G.h1.line2.top),
                fontSize: c(G.h1.line2.fontPx),
                lineHeight: 1,
                transform: `scaleY(${G.h1.line2.scaleY})`,
              }}
            >
              {hero.headlineLine2}
            </span>
          </h1>
          {/* kicker */}
          <p
            className="absolute whitespace-nowrap font-display font-normal text-brand-blue"
            style={{ left: c(G.kicker.left), top: c(G.kicker.top), fontSize: c(G.kicker.fontPx), lineHeight: 1 }}
            data-node-id="401:2580"
          >
            {hero.kicker}
          </p>
          {/* tagline HK Modular */}
          <p
            className="absolute font-modular text-brand-blue"
            style={{
              right: c(G.tagline.right),
              textAlign: "right" as const,
              top: c(G.tagline.top),
              width: c(G.tagline.width),
              fontSize: c(G.tagline.fontPx),
              lineHeight: c(G.tagline.lineHeightPx),
            }}
            data-node-id="401:2581"
          >
            {hero.tagline}
          </p>
          {/* CTA */}
          <Link
            href={hero.ctaHref}
            className="absolute flex items-center justify-center border-solid border-white bg-brand-lime font-modular text-brand-blue"
            style={{
              left: c(G.button.left),
              top: c(G.button.top),
              width: c(G.button.w),
              height: c(G.button.h),
              borderRadius: c(G.button.radiusPx),
              borderWidth: c(G.button.borderPx),
              fontSize: c(G.button.fontPx),
            }}
            data-node-id="401:2582"
          >
            {hero.ctaLabel}
          </Link>
          {/* duże .AI z pionowym KOMPETENCJE */}
          <img
            src="/assets/ai-logo-filtered.png"
            alt=""
            className="absolute"
            style={{ left: c(G.aiLogo.left), top: c(G.aiLogo.top), width: c(G.aiLogo.w), height: c(G.aiLogo.h) }}
            data-node-id="401:2584"
          />
          <SiteNav nav={nav} />
        </div>
      </div>
    </section>
  );
}

/* ---------- MOBILE (canvas 402×875, 1cqw = 4.02px) ---------- */

const cm = (px: number) => `${(px / 4.02).toFixed(4)}cqw`;

const GM = {
  blob: { left: 0, top: 0, w: 402, h: 1143.5 }, // limonkowy kształt tła, clipowany przez hero
  logo: { left: 15, top: 44, w: 60.74, h: 70 },
  burger: { left: 342, top: 59, w: 40, h: 40 },
  h1a: { top: 141, fontPx: 30, leading: 1.16 }, // Montserrat Black, center
  h1b: { top: 181, fontPx: 28, leading: 1.16 }, // HK Modular, center
  kicker: { right: 402 - 341, top: 235, w: 181, fontPx: 14 }, // 2 linie, right
  starOutline: { left: 119.7, top: 213.2, w: 143, h: 140.5 }, // ZA robotem
  starSm: { left: 195.3, top: 91.5, w: 32.5, h: 30.5 },
  robot: { left: -122, top: 219, w: 525, h: 656 },
  miniGroup: { left: 180, top: 442, w: 138.5, h: 123 },
  button: { left: 51, top: 776, w: 300, h: 55, radiusPx: 40, borderPx: 3, fontPx: 13, trackPx: 0.52 },
};

function HeroMobile({ hero, nav }: { hero: HomeHero; nav: NavLink[] }) {
  return (
    // hero = 100svh, poster PEŁNEJ SZEROKOŚCI wyśrodkowany pionowo i przycięty
    // (cover): poster 402/875 jest wyższy niż ekran telefonu → równy crop
    // góra/dół (logo zostaje u góry, robot+button na dole widoczne). Wcześniej
    // kotwiczony do góry → dolna część robota i button ucinane, a górny szary
    // pas nad hamburgerem w całości widoczny („niepotrzebny margines").
    <section className="relative flex h-svh items-center overflow-hidden md:hidden">
      <div className="@container mx-auto w-full">
        <div className="relative aspect-[402/875] overflow-hidden bg-page">
          {/* limonkowy blob tła */}
          <img
            src="/assets/m-bg-blob-f.png"
            alt=""
            className="absolute"
            style={{ left: cm(GM.blob.left), top: cm(GM.blob.top), width: cm(GM.blob.w), height: cm(GM.blob.h) }}
            data-node-id="375:1754"
          />
          {/* top bar: logo + burger */}
          <header className="absolute inset-x-0 top-0" data-node-id="375:1739">
            <Link
              href="/"
              className="absolute"
              style={{ left: cm(GM.logo.left), top: cm(GM.logo.top), width: cm(GM.logo.w), height: cm(GM.logo.h) }}
            >
              <img src="/assets/m-logo-f.png" alt="Kompetencje.ai" className="h-full w-full" />
            </Link>
            <MobileMenu
              nav={nav}
              className="absolute"
              style={{ left: cm(GM.burger.left), top: cm(GM.burger.top), width: cm(GM.burger.w), height: cm(GM.burger.h) }}
            />
          </header>
          {/* mała gwiazdka nad headline */}
          <img
            src="/assets/m-star-sm-filtered.png"
            alt=""
            className="absolute"
            style={{ left: cm(GM.starSm.left), top: cm(GM.starSm.top), width: cm(GM.starSm.w), height: cm(GM.starSm.h) }}
            data-node-id="432:1659"
          />
          {/* H1 */}
          {/* pointer-events-none: inset-0 przykrywał burger i blokował klik */}
          <h1 className="pointer-events-none absolute inset-0 text-brand-blue" data-node-id="397:1837">
            <span
              className="absolute block w-full text-center font-display font-black"
              style={{ top: cm(GM.h1a.top), fontSize: cm(GM.h1a.fontPx), lineHeight: GM.h1a.leading }}
            >
              {hero.headlineLine1}
            </span>
            <span
              className="absolute block w-full text-center font-modular"
              style={{ top: cm(GM.h1b.top), fontSize: cm(GM.h1b.fontPx), lineHeight: GM.h1b.leading }}
              data-node-id="375:1764"
            >
              {hero.headlineLine2}
            </span>
          </h1>
          {/* robot */}
          <Image
            src="/assets/robot-hero-m-2x.png"
            alt="Robot AI — kompetencje przyszłości"
            width={1050}
            height={1312}
            priority
            className="absolute max-w-none"
            style={{ left: cm(GM.robot.left), top: cm(GM.robot.top), width: cm(GM.robot.w), height: cm(GM.robot.h) }}
            data-node-id="375:1763"
          />
          {/* gwiazda outline NAD robotem (mobile) */}
          <img
            src="/assets/m-star-outline-filtered.png"
            alt=""
            className="absolute"
            style={{ left: cm(GM.starOutline.left), top: cm(GM.starOutline.top), width: cm(GM.starOutline.w), height: cm(GM.starOutline.h) }}
            data-node-id="432:1664"
          />
          {/* kicker (2 linie, do prawej) */}
          <p
            className="absolute font-display font-normal text-brand-blue"
            style={{
              right: cm(GM.kicker.right),
              top: cm(GM.kicker.top),
              width: cm(GM.kicker.w),
              fontSize: cm(GM.kicker.fontPx),
              lineHeight: cm(17),
              textAlign: "right" as const,
            }}
            data-node-id="375:1765"
          >
            {hero.kicker}
          </p>
          {/* mini grupa .AI na robocie */}
          <img
            src="/assets/m-mini-group-filtered.png"
            alt=""
            className="absolute"
            style={{ left: cm(GM.miniGroup.left), top: cm(GM.miniGroup.top), width: cm(GM.miniGroup.w), height: cm(GM.miniGroup.h) }}
            data-node-id="375:1767"
          />
          {/* CTA */}
          <Link
            href={hero.ctaHref}
            className="absolute flex items-center justify-center border-solid border-white bg-brand-lime font-modular text-brand-blue"
            style={{
              left: cm(GM.button.left),
              top: cm(GM.button.top),
              width: cm(GM.button.w),
              height: cm(GM.button.h),
              borderRadius: cm(GM.button.radiusPx),
              borderWidth: cm(GM.button.borderPx),
              fontSize: cm(GM.button.fontPx),
              letterSpacing: cm(GM.button.trackPx),
            }}
            data-node-id="401:1838"
          >
            {hero.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function HeroSection({
  hero,
  nav,
}: {
  hero: HomeHero;
  nav: NavLink[];
}) {
  return (
    <>
      <div className="hidden md:block">
        <HeroDesktop hero={hero} nav={nav} />
      </div>
      <HeroMobile hero={hero} nav={nav} />
    </>
  );
}
