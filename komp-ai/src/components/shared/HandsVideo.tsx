"use client";

/*
 * Wideo dłoni human-machine (Higgsfield, Seedance 2.0): dłonie startują daleko
 * od siebie i schodzą się do dotyku — ostatnia klatka = dokładnie statyczny
 * asset ze strony (end_image + symetryczny padding do 21:9, ścinany przez
 * object-cover). Odtwarza się RAZ gdy sekcja wjedzie w viewport i zamiera na
 * ostatniej klatce. prefers-reduced-motion / brak autoplay → poster (statyczny
 * obrazek jak dotychczas).
 */

import { useEffect, useRef } from "react";

export default function HandsVideo({
  src,
  poster,
  label,
  className,
  style,
}: {
  src: string;
  poster: string;
  label: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const played = useRef(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !played.current) {
            played.current = true;
            video.play().catch(() => {
              /* autoplay zablokowany → zostaje poster */
            });
            io.disconnect();
          }
        }
      },
      { threshold: 0.45 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      playsInline
      preload="metadata"
      aria-label={label}
      className={`object-cover ${className ?? ""}`}
      style={style}
    />
  );
}
