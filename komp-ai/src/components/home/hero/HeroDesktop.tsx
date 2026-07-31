import Link from "next/link";
import type { HomeHero, NavLink } from "@/content/types";
import SiteNav from "@/components/shared/SiteNav";
import { DesktopHeroGraphics } from "./HeroGraphics";

const c = (px: number) => `${(px / 14.4).toFixed(4)}cqw`;

const G = {
  h1: {
    left: 621,
    line1: { top: 224.6, fontPx: 55, scaleY: 1, leading: 0.923 },
    line2: { top: 287.4, fontPx: 56, scaleY: 1, leading: 1.125 },
  },
  kicker: { left: 621, top: 360, fontPx: 18 },
  tagline: { right: 1440 - 1140, top: 522, fontPx: 25, lineHeightPx: 35, width: 401 },
  button: { left: 126, top: 728, w: 439, h: 74, radiusPx: 75, borderPx: 4, fontPx: 18 },
};

export default function HeroDesktop({ hero, nav }: { hero: HomeHero; nav: NavLink[] }) {
  return (
    <section className="relative flex h-svh items-center justify-center">
      <div
        className="@container mx-auto w-full"
        style={{
          width: "min(100%, var(--workspace), calc(100svh * (1440 / 833)))",
        }}
      >
        <div className="relative aspect-[1440/833] overflow-hidden bg-page">
          <DesktopHeroGraphics />

          {/* H1 */}
          <h1 className="pointer-events-none absolute inset-0 font-display font-black text-brand-blue" data-node-id="401:2579">
            <span
              className="hero-text hero-text-d1 absolute block origin-top-left whitespace-nowrap"
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
              className="hero-text hero-text-d2 absolute block origin-top-left whitespace-nowrap"
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
            className="hero-text hero-text-d3 absolute whitespace-nowrap font-display font-normal text-brand-blue"
            style={{ left: c(G.kicker.left), top: c(G.kicker.top), fontSize: c(G.kicker.fontPx), lineHeight: 1 }}
            data-node-id="401:2580"
          >
            {hero.kicker}
          </p>

          {/* tagline HK Modular */}
          <p
            className="hero-text hero-text-d4 absolute font-modular text-brand-blue"
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
            className="hero-cta absolute flex items-center justify-center border-solid border-white bg-brand-lime font-modular text-brand-blue"
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

          <SiteNav nav={nav} />
        </div>
      </div>
    </section>
  );
}
