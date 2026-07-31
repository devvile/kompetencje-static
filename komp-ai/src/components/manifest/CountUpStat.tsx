"use client";

/*
 * Animowany stat manifestu: "od 25 do 50%" — liczby nabijają się od 0 przy
 * wjeździe w viewport (raz). Przy prefers-reduced-motion od razu wartości
 * docelowe (bez animacji), SSR renderuje wartości docelowe (SEO/no-JS).
 */

import { useEffect, useRef, useState } from "react";

export default function CountUpStat({
  from,
  to,
  className,
  style,
}: {
  from: number;
  to: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [vals, setVals] = useState<[number, number]>([from, to]);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            io.disconnect();
            const t0 = performance.now();
            const dur = 1400;
            const tick = (t: number) => {
              const p = Math.min(1, (t - t0) / dur);
              const ease = 1 - Math.pow(1 - p, 3);
              setVals([Math.round(from * ease), Math.round(to * ease)]);
              if (p < 1) requestAnimationFrame(tick);
            };
            setVals([0, 0]);
            requestAnimationFrame(tick);
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [from, to]);

  return (
    <span ref={ref} className={className} style={style}>
      od {vals[0]} do {vals[1]}%
    </span>
  );
}
