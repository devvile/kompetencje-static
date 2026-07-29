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
    const observeAll = () =>
      document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => io.observe(el));
    observeAll();
    // treść strony może dojechać po commit (streaming/suspense) — krótka
    // siatka bezpieczeństwa na spóźnione elementy
    const t = setTimeout(observeAll, 300);
    return () => {
      clearTimeout(t);
      io.disconnect();
    };
  }, [pathname]);
  return null;
}
