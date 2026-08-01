"use client";

/*
 * FitRow: wiersz flex, który SKALUJE swoją zawartość (transform: scale,
 * origin przy prawej krawędzi — treść jest justify-end), gdy suma szerokości
 * dzieci przekracza dostępne miejsce między paddingami. Użycie: lime sidebar
 * kart DNA — długie nazwisko prowadzącego (np. PATRYK CZEMIEROWSKI) wypychało
 * cenę poza pasek (zawartość 549px vs slot 437px). Generyczne — treści z
 * przyszłego CMS nie rozsadzą paska. SSR renderuje nieprzeskalowane
 * (bez JS ewentualny overflow jak dotąd), klient dopasowuje przed paintem
 * (useLayoutEffect) i pilnuje resize'ów (ResizeObserver — cqw zmienia się
 * z szerokością okna).
 */

import { useLayoutEffect, useRef } from "react";

export default function FitRow({
  className,
  style,
  innerGap,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  /** gap między dziećmi (na wewnętrznym wrapperze — skaluje się razem z nimi) */
  innerGap?: string;
  children: React.ReactNode;
}) {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    const apply = () => {
      const cs = getComputedStyle(outer);
      const avail =
        outer.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      inner.style.transform = "";
      const need = inner.offsetWidth;
      if (need > avail && need > 0) {
        inner.style.transformOrigin = "right center";
        inner.style.transform = `scale(${(avail / need).toFixed(4)})`;
      }
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(outer);
    ro.observe(inner);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={outerRef} className={className} style={style}>
      <div ref={innerRef} className="flex items-center" style={{ gap: innerGap }}>
        {children}
      </div>
    </div>
  );
}
