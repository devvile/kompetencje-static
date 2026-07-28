"use client";

/*
 * HUMAN and MACHINE — desktop ze scroll-scrubbingiem (życzenie Patryka):
 * wideo dłoni (Higgsfield) NIE odtwarza się samo — currentTime jest napędzany
 * scrollem: p=0 gdy góra sekcji na dolnej krawędzi viewportu (pierwsza klatka,
 * dłonie daleko od siebie), p=1 gdy sekcja w pełni widoczna (ostatnia klatka =
 * statyczny asset). Napisy HUMAN (z lewej) i MACHINE (z prawej) wjeżdżają
 * z poza ekranu tym samym progressem i na p=1 stoją dokładnie na designowych
 * pozycjach. prefers-reduced-motion: od razu stan końcowy, bez scrubbingu.
 * Geometria 1:1 z poprzedniej wersji statycznej (HumanMachineSection).
 */

import { useEffect, useRef } from "react";
import type { HumanMachineContent } from "./HumanMachineSection";

const c = (px: number) => `${(px / 14.4).toFixed(4)}cqw`;

const G = {
  human: { left: -9, top: 69.8, fontPx: 155, trackPx: 7 },
  machine: { left: 647, top: 185.5, fontPx: 150, strokePx: 3.5, trackPx: 13 },
  hands: { top: 265, w: 1440, h: 424 },
  lineY: 750.4, lineH: 3.83,
  lineL: { x: 37, w: 444.7 },
  lineR: { x: 958.6, w: 443.7 },
  caption: { left: 522, top: 742, fontPx: 16, trackPx: 1.57, wordPx: -0.8 },
};

export default function HumanMachineDesktop({ hm }: { hm: HumanMachineContent }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const humanRef = useRef<HTMLSpanElement | null>(null);
  const machineRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const sec = sectionRef.current;
    const video = videoRef.current;
    const human = humanRef.current;
    const machine = machineRef.current;
    if (!sec || !video || !human || !machine) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const apply = () => {
      raf = 0;
      // progress od PASA DŁONI; zakres = ~0.9 wysokości viewportu (długa droga
      // scrolla). Sekwencja (życzenie Patryka): najpierw domykają się NAPISY
      // (0..40% zakresu), RĘCE ruszają od 30% i łączą się POWOLI dopiero pod
      // koniec (30..100%, easing ^1.5 — klip ma większość ruchu na początku).
      const r = video.getBoundingClientRect();
      const vh = window.innerHeight;
      const range = Math.min(r.height * 2.2, vh * 0.9);
      const raw = reduce ? 1 : Math.min(1, Math.max(0, (vh - r.top) / range));
      const textP = Math.min(1, raw / 0.4);
      const videoP = Math.pow(Math.min(1, Math.max(0, (raw - 0.3) / 0.7)), 1.5);
      human.style.transform = `translateX(${(-(1 - textP) * 115).toFixed(2)}%)`;
      machine.style.transform = `translateX(${((1 - textP) * 115).toFixed(2)}%)`;
      if (video.duration) video.currentTime = videoP * video.duration * 0.999;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    video.addEventListener("loadedmetadata", schedule);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      if (raf) cancelAnimationFrame(raf);
      video.removeEventListener("loadedmetadata", schedule);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative hidden w-full md:block">
      <div className="@container mx-auto w-full max-w-(--workspace)">
        {/* tło #EBEBEB = tło wygenerowanego wideo (strona ma #EFEFEF) */}
        <div className="relative aspect-[1440/810] overflow-hidden bg-[#ebebeb]" data-node-id="245:9699">
          {/* dłonie — wideo scrubowane scrollem (bez postera: przed dojechaniem
              widoczna PIERWSZA klatka — dłonie daleko od siebie); object-cover
              ścina symetryczny padding 21:9 */}
          <video
            ref={videoRef}
            src="/assets/hm-hands-video.mp4"
            muted
            playsInline
            preload="auto"
            aria-label="Dłoń robota i dłoń człowieka zbliżają się do siebie w rytmie przewijania"
            className="absolute left-0 object-cover"
            style={{ top: c(G.hands.top), width: c(G.hands.w), height: c(G.hands.h) }}
          />
          {/* HUMAN — solid; wjeżdża z lewej razem ze scrollem */}
          <h2
            className="absolute whitespace-nowrap font-display font-black text-brand-blue"
            style={{
              left: c(G.human.left), top: c(G.human.top),
              fontSize: c(G.human.fontPx), lineHeight: 1, letterSpacing: c(G.human.trackPx),
            }}
            data-node-id="245:9368"
          >
            {/* HUMAN nad konturem MACHINE (z-index) — jak w designie N przykrywa róg M */}
            <span ref={humanRef} className="relative z-[2] inline-block will-change-transform">
              {hm.titleTop}
            </span>
            {/* MACHINE — outline; wjeżdża z prawej. Poppins, bo kontury
                Montserrat mają samoprzecinające się ścieżki (szwy glifów) */}
            <span
              ref={machineRef}
              className="absolute z-[1] whitespace-nowrap font-extrabold text-transparent will-change-transform"
              style={{
                left: c(G.machine.left - G.human.left),
                top: c(G.machine.top - G.human.top),
                fontFamily: "var(--font-poppins)",
                fontSize: c(G.machine.fontPx), lineHeight: 1, letterSpacing: c(G.machine.trackPx),
                WebkitTextStroke: `${c(G.machine.strokePx)} var(--color-brand-blue)`,
              }}
            >
              {hm.titleBottom}
            </span>
          </h2>
          {/* podpis z liniami */}
          <div className="absolute bg-brand-blue" style={{ left: c(G.lineL.x), top: c(G.lineY), width: c(G.lineL.w), height: c(G.lineH) }} />
          <div className="absolute bg-brand-blue" style={{ left: c(G.lineR.x), top: c(G.lineY), width: c(G.lineR.w), height: c(G.lineH) }} />
          <p
            className="absolute whitespace-nowrap font-modular text-brand-blue"
            style={{
              left: c(G.caption.left), top: c(G.caption.top), fontSize: c(G.caption.fontPx),
              letterSpacing: c(G.caption.trackPx), wordSpacing: c(G.caption.wordPx), lineHeight: 1,
            }}
            data-node-id="245:9458"
          >
            {hm.caption}
          </p>
        </div>
      </div>
    </section>
  );
}
