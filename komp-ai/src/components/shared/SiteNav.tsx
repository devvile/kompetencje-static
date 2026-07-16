/*
 * Nawigacja desktop (instancja „Menu" 407:2807 z Figmy) — wspólna dla home
 * i podstron. Wyekstrahowana z HeroSection przy budowie /o-nas.
 * Rodzic musi być @container (pozycje w cqw canvasu 1440).
 */
import Link from "next/link";
import type { NavLink } from "@/content/types";

const c = (px: number) => `${(px / 14.4).toFixed(4)}cqw`;

export default function SiteNav({ nav }: { nav: NavLink[] }) {
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
