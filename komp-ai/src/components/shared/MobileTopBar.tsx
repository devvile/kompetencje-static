/*
 * Wspólny mobilny top bar (logo + hamburger) — IDENTYCZNE położenie na
 * wszystkich stronach (życzenie Patryka). Naturalna skala w px (NIE skaluje
 * się z posterami contain): logo 15px od lewej / 44px od góry (61×70),
 * burger 20px od prawej / 59px od góry (40×40) — wartości z designu 402.
 * Rodzic musi być position: relative (top bar jest absolute na jego górze).
 */
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import type { NavLink } from "@/content/types";

export default function MobileTopBar({ nav }: { nav: NavLink[] }) {
  return (
    <header className="absolute inset-x-0 top-0 z-10 md:hidden" data-node-id="375:1739">
      <Link href="/" className="absolute left-[15px] top-[44px] h-[70px] w-[61px]">
        <img src="/assets/m-logo-f.png" alt="Kompetencje.ai" className="h-full w-full" />
      </Link>
      <MobileMenu nav={nav} className="absolute right-[20px] top-[59px] h-[40px] w-[40px]" />
    </header>
  );
}
