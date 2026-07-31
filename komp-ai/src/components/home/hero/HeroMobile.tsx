import Link from "next/link";
import type { HomeHero, NavLink } from "@/content/types";
import MobileTopBar from "@/components/shared/MobileTopBar";
import { MobileHeroGraphics } from "./HeroGraphics";

const cm = (px: number) => `${(px / 4.02).toFixed(4)}cqw`;

const GM = {
  blob: { left: 0, top: 0, w: 402, h: 1143.5 },
  logo: { left: 15, top: 44, w: 60.74, h: 70 },
  burger: { left: 342, top: 59, w: 40, h: 40 },
  h1a: { top: 141, fontPx: 30, leading: 1.16 },
  h1b: { top: 181, fontPx: 28, leading: 1.16 },
  kicker: { right: 402 - 341, top: 235, w: 181, fontPx: 14 },
  button: { left: 51, top: 776, w: 300, h: 55, radiusPx: 40, borderPx: 3, fontPx: 13, trackPx: 0.52 },
};

export default function HeroMobile({ hero, nav }: { hero: HomeHero; nav: NavLink[] }) {
  return (
    <section className="relative flex h-svh items-center justify-center md:hidden">
      <div
        className="@container mx-auto w-full"
        style={{
          width: "min(100%, var(--workspace), calc(100svh * (402 / 875)))",
        }}
      >
        <div className="relative aspect-[402/875] overflow-hidden bg-page" data-node-id="423:3274">
          <MobileHeroGraphics />

          <MobileTopBar
            nav={nav}
            logoStyle={{ left: cm(GM.logo.left), top: cm(GM.logo.top), width: cm(GM.logo.w), height: cm(GM.logo.h) }}
            burgerStyle={{ left: cm(GM.burger.left), top: cm(GM.burger.top), width: cm(GM.burger.w), height: cm(GM.burger.h) }}
          />

          {/* H1 line A (Montserrat Black, center) */}
          <h1
            className="hero-text hero-text-d1 absolute inset-x-0 text-center font-display font-black text-brand-blue"
            style={{ top: cm(GM.h1a.top), fontSize: cm(GM.h1a.fontPx), lineHeight: GM.h1a.leading }}
            data-node-id="423:3294"
          >
            {hero.headlineLine1}
          </h1>

          {/* H1 line B (HK Modular, center) */}
          <p
            className="hero-text hero-text-d2 absolute inset-x-0 text-center font-modular text-brand-blue"
            style={{ top: cm(GM.h1b.top), fontSize: cm(GM.h1b.fontPx), lineHeight: GM.h1b.leading }}
            data-node-id="423:3295"
          >
            {hero.headlineLine2}
          </p>

          {/* kicker */}
          <p
            className="hero-text hero-text-d3 absolute text-right font-display text-brand-blue"
            style={{
              right: cm(GM.kicker.right),
              top: cm(GM.kicker.top),
              width: cm(GM.kicker.w),
              fontSize: cm(GM.kicker.fontPx),
              lineHeight: 1.15,
            }}
            data-node-id="423:3299"
          >
            {hero.kicker}
          </p>

          {/* CTA button */}
          <Link
            href={hero.ctaHref}
            className="hero-cta absolute flex items-center justify-center border-solid border-white bg-brand-lime font-modular text-brand-blue"
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
            data-node-id="423:3301"
          >
            {hero.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
