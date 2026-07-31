"use client";

/*
 * Power-on robota na /manifest (Higgsfield, Seedance 2.0): robot budzi się
 * (wizjer rozświetla się, głowa unosi) i kończy DOKŁADNIE w pozie assetu
 * manifest-robot-f.png (end_image generacji) — stopklatka po odtworzeniu
 * pokrywa się z fallbackowym PNG. Wideo ma wypieczone białe tło — na jasnej
 * sekcji usuwa je mix-blend-multiply (biały ×  tło = tło). Odtwarza się RAZ
 * przy wejściu w viewport; poster = finałowa poza (przed startem i gdy
 * autoplay zablokowany). prefers-reduced-motion → statyczny PNG.
 * Lustrzane odbicie robi rodzic (scaleX(-1) na wrapperze w page.tsx).
 * Tło wideo (~#FAFAFA) ≠ tło strony (#EFEFEF). mix-blend-multiply NIE działa
 * tutaj: przodkowie (flip transform, float animation, z-index) tworzą stacking
 * konteksty izolujące blend od tła strony (zmierzono: kadr zostawał biały).
 * Zamiast blendu: brightness(239/250.5) ściemnia całe wideo tak, że jego
 * jednolite tło = dokładnie kolor strony (robot ciemnieje o ~4.6% — spójnie
 * w posterze i wideo, bo filtr siedzi na elemencie <video>).
 */

import { useEffect, useRef, useState } from "react";

export default function RobotPowerOn({
  videoSrc,
  posterSrc,
  fallbackSrc,
  alt,
  videoStyle,
}: {
  videoSrc: string;
  posterSrc: string;
  fallbackSrc: string;
  alt: string;
  videoStyle: React.CSSProperties;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const played = useRef(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduce(true);
      return;
    }
    const video = ref.current;
    if (!video) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !played.current) {
            played.current = true;
            video.play().catch(() => {
              /* autoplay zablokowany → zostaje poster (finałowa poza) */
            });
            io.disconnect();
          }
        }
      },
      { threshold: 0.35 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  if (reduce) {
    return <img src={fallbackSrc} alt={alt} className="h-full w-full" />;
  }

  return (
    <video
      ref={ref}
      src={videoSrc}
      poster={posterSrc}
      muted
      playsInline
      preload="auto"
      aria-label={alt}
      className="absolute max-w-none"
      style={{ ...videoStyle, filter: "brightness(0.954)" }}
    />
  );
}
