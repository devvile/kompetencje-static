"use client";

/*
 * Globalny scroll-reveal: dodaje .reveal-ready na <html> (dopiero wtedy CSS
 * chowa elementy [data-reveal] — bez JS treść w pełni widoczna) i odsłania
 * elementy klasą .is-in przy wejściu w viewport (raz). Przy
 * prefers-reduced-motion nic nie robi. Montowany raz w layout.tsx.
 */

import { useEffect } from "react";

export default function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.classList.add("reveal-ready");
    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -4% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
