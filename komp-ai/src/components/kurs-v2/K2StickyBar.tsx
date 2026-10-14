"use client";

/*
 * KURS v2 — MOBILE: przyklejony dolny pasek „cena + ZAPISUJĘ SIĘ" (design
 * 2056:2057, 370×72). Pojawia się po przewinięciu poza kartę ceny w hero,
 * znika, gdy na ekranie jest sekcja zapisu (#zapis) — żeby nie dublować CTA.
 */
import { useEffect, useState } from "react";
import { ENROLL_ID, ENROLL_OPEN } from "./k2";

export default function K2StickyBar({
  price,
  name,
  ctaLabel,
  watchId,
}: {
  price: string;
  name: string;
  ctaLabel: string;
  /** id elementu (karta ceny w hero mobile), po którego zniknięciu pasek się pokazuje */
  watchId: string;
}) {
  const [pastHero, setPastHero] = useState(false);
  const [atEnroll, setAtEnroll] = useState(false);

  useEffect(() => {
    // scroll (rAF) zamiast IntersectionObserver: obserwator nie zgłasza zmiany,
    // gdy przewinięcie „przeskoczy" kartę ceny (kotwica, szybki flick)
    let raf = 0;
    const check = () => {
      raf = 0;
      const hero = document.getElementById(watchId);
      const enroll = document.getElementById(`${ENROLL_ID}-m`);
      setPastHero(!!hero && hero.getBoundingClientRect().bottom < 0);
      if (enroll) {
        const r = enroll.getBoundingClientRect();
        // od sekcji zapisu w dół (zapis + stopka) pasek jest zbędny
        setAtEnroll(r.top < window.innerHeight);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [watchId]);

  const show = pastHero && !atEnroll;
  return (
    <div
      className={`fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 transition-all duration-300 md:hidden ${
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-6 opacity-0"
      }`}
      aria-hidden={!show}
    >
      <div
        className="flex h-[72px] w-full max-w-[370px] items-center justify-between rounded-[22px] border border-solid border-white/35 bg-[#06093a] py-3 pl-[18px] pr-3 leading-[normal] shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
        data-node-id="2056:2057"
      >
        <p className="flex min-w-0 flex-col whitespace-nowrap">
          <span className="font-display text-[20px] font-black text-brand-lime">
            {price}
          </span>
          <span className="truncate font-display text-[11px] font-medium text-white/85">
            {name}
          </span>
        </p>
        <a
          {...ENROLL_OPEN}
          tabIndex={show ? 0 : -1}
          className="shrink-0 whitespace-nowrap rounded-[24px] bg-brand-lime px-[18px] py-3 font-audio text-[14px] text-brand-blue shadow-[0_0_18px_rgba(214,255,63,0.5)]"
        >
          {ctaLabel}
        </a>
      </div>
    </div>
  );
}
