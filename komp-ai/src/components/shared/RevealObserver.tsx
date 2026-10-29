"use client";

/*
 * Globalny scroll-reveal: dodaje .reveal-ready na <html> (dopiero wtedy CSS
 * chowa elementy [data-reveal] — bez JS treść w pełni widoczna) i odsłania
 * elementy klasą .is-in przy wejściu w viewport (raz). Przy
 * prefers-reduced-motion nic nie robi. Montowany raz w layout.tsx —
 * layout NIE remontuje się przy nawigacji klienckiej, więc obserwator
 * musi się przepiąć na świeży DOM przy każdej zmianie ścieżki (usePathname
 * jako dependency); bez tego po powrocie na stronę elementy [data-reveal]
 * zostawały ukryte na zawsze (bug: landing → kurs → landing).
 */

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.classList.add("reveal-ready");
    // .reveal-wipe startuje z clip-path: inset(101%) — Chrome liczy przecięcie
    // PO przycięciu (pusty prostokąt), więc obserwujemy zastępczo rodzica,
    // a .is-in dostaje element z klasą (bug: niewidoczne zdjęcia prowadzących)
    const proxied = new Map<Element, Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (proxied.get(e.target) ?? e.target).classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -4% 0px" },
    );
    const observeAll = () =>
      document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => {
        if (el.classList.contains("reveal-wipe")) {
          if ((el as HTMLElement).dataset.revealProxy) return; // już ma sentinel (drugie przejście po 300 ms)
          (el as HTMLElement).dataset.revealProxy = "1";
          // sentinel o rozmiarze elementu (rodzic bywa div o wysokości 0)
          const s = document.createElement("span");
          s.setAttribute("aria-hidden", "true");
          const cs = getComputedStyle(el as HTMLElement);
          Object.assign(s.style, { position: cs.position === "static" ? "relative" : cs.position, left: cs.left, top: cs.top, width: cs.width, height: cs.height, pointerEvents: "none", display: "block" });
          el.parentElement?.insertBefore(s, el);
          proxied.set(s, el);
          io.observe(s);
        } else {
          io.observe(el);
        }
      });
    observeAll();
    // treść strony może dojechać po commit (streaming/suspense) — krótka
    // siatka bezpieczeństwa na spóźnione elementy
    const t = setTimeout(observeAll, 300);
    return () => {
      clearTimeout(t);
      io.disconnect();
      proxied.forEach((el, s) => {
        s.remove();
        delete (el as HTMLElement).dataset.revealProxy;
      });
    };
  }, [pathname]);
  return null;
}
