import Image from "next/image";
import Link from "next/link";
import type { HomeHero, NavLink } from "../../content/types";

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

function NavDesktop({ nav }: { nav: NavLink[] }) {
  return (
    <header
      className="absolute"
      style={{ left: c(92), top: c(14), width: c(1249.47), height: c(84.86) }}
      data-node-id="407:2807"
    >
      {/* logo AI + pionowe "kompetencje" */}
      <Link href="/" className="absolute left-0 top-0 h-full w-[6.72%]">
        <img src="/assets/logo-ai.svg" alt="Kompetencje.ai" className="h-full w-full" />
      </Link>
      {/* sparkle outline przy logo */}
      <img
        src="/assets/star-outline.svg"
        alt=""
        className="absolute left-[5.87%] top-[37.55%] h-[29.44%] w-[2%]"
      />
      {/* linia z kropkami na końcach */}
      <div className="absolute left-[9.19%] top-[48.99%] aspect-square w-[0.48%] rounded-full bg-brand-blue" />
      <div
        className="absolute left-[9.75%] right-[6.6%] top-[52.53%] bg-brand-blue"
        style={{ height: "max(1px, 0.035cqw)" }}
      />
      <div className="absolute left-[93.13%] top-[48.99%] aspect-square w-[0.48%] rounded-full bg-brand-blue" />
      {/* linki */}
      <nav
        className="absolute left-[33.45%] top-[23.57%] flex items-center font-modular leading-[1.03] text-brand-blue"
        style={{ gap: c(85), fontSize: c(10) }}
      >
        {nav.map((link) => (
          <Link key={link.href} href={link.href} className="whitespace-nowrap">
            {link.label}
          </Link>
        ))}
      </nav>
      {/* gwiazdki po prawej */}
      <img
        src="/assets/star-outline.svg"
        alt=""
        className="absolute left-[94.91%] top-[35.17%] h-[29.94%] w-[2.03%]"
      />
      <img
        src="/assets/star-solid.svg"
        alt=""
        className="absolute left-[98%] top-[35.17%] h-[29.95%] w-[2.03%]"
      />
    </header>
  );
}

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
            src="/assets/star-outline-trim.png"
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
            src="/assets/lime-star-trim.png"
            alt=""
            className="absolute"
            style={{ left: c(G.limeStarTR.left), top: c(G.limeStarTR.top), width: c(G.limeStarTR.w), height: c(G.limeStarTR.h) }}
            data-node-id="401:2570"
          />
          {/* mała gwiazda outline w prawym górnym rogu */}
          <img
            src="/assets/star-outline-sm-trim.png"
            alt=""
            className="absolute"
            style={{ left: c(G.starTRsmall.left), top: c(G.starTRsmall.top), width: c(G.starTRsmall.w), height: c(G.starTRsmall.h) }}
            data-node-id="401:2611"
          />
          {/* limonkowy swoosh (STAR_ARROW) */}
          <img
            src="/assets/star-arrow-trim.png"
            alt=""
            className="absolute"
            style={{ left: c(G.swoosh.left), top: c(G.swoosh.top), width: c(G.swoosh.w), height: c(G.swoosh.h) }}
            data-node-id="401:2612"
          />
          {/* H1 — linie pozycjonowane osobno; pionowy stretch liter jak w designie */}
          <h1 className="absolute inset-0 font-display font-black text-brand-blue" data-node-id="401:2579">
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
          <NavDesktop nav={nav} />
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
  return <HeroDesktop hero={hero} nav={nav} />;
}
