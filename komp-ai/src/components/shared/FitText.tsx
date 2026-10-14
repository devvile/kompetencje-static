"use client";

/*
 * FitText: jedna linia tekstu, która ZMNIEJSZA font-size (nigdy nie powiększa),
 * gdy naturalna szerokość przekracza szerokość wrappera. Uzupełnienie FitRow
 * (tam: transform scale na wierszu) dla nagłówków z CMS-a: linie H1 kursu
 * (designer dobierał stopień pisma per linia tak, by wszystkie 3 miały tę
 * samą szerokość ~526px) i linie tytułu karty DNA (slot 297px).
 *
 * Mechanika: stosunek szerokości mierzony RAZ po załadowaniu fontów i zapisany
 * jako font-size w % rodzica — rodzic ma stopień w cqw, więc skala jedzie
 * z szerokością okna bez ResizeObservera. Wrapper jest flex (brak strutu
 * linii rodzica) — wysokość linii kurczy się razem z fontem. SSR renderuje
 * nieprzeskalowane (bez JS ewentualny overflow), klient dopasowuje przed
 * paintem (useLayoutEffect) i ponownie po document.fonts.ready.
 */

import { useLayoutEffect, useRef } from "react";

export default function FitText({
  className,
  style,
  children,
}: {
  className?: string;
  /** stopień pisma i szerokość slotu (np. w cqw) — na wrapperze */
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const outerRef = useRef<HTMLSpanElement | null>(null);
  const innerRef = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    let cancelled = false;
    const apply = () => {
      if (cancelled) return;
      inner.style.fontSize = "";
      const avail = outer.clientWidth;
      const need = inner.scrollWidth;
      if (need > avail && need > 0 && avail > 0) {
        inner.style.fontSize = `${((avail / need) * 100).toFixed(2)}%`;
      }
    };
    apply();
    document.fonts?.ready.then(apply);
    return () => {
      cancelled = true;
    };
  }, [children]);

  return (
    <span ref={outerRef} className={className} style={{ display: "flex", ...style }}>
      <span ref={innerRef} className="block whitespace-nowrap">
        {children}
      </span>
    </span>
  );
}
