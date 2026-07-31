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
  const wrapRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const humanRef = useRef<HTMLSpanElement | null>(null);
  const machineRef = useRef<HTMLSpanElement | null>(null);
  const captionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const sticky = stickyRef.current;
    const video = videoRef.current;
    const human = humanRef.current;
    const machine = machineRef.current;
    const caption = captionRef.current;
    if (!wrap || !sticky || !video || !human || !machine || !caption) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let extra = 0;
    // Sekwencja (uwaga Patryka: seek scrollem klatkował na 2 komputerach):
    // 1) napisy = scroll-scrubbing (0..70% pinu), wideo stoi na 1. klatce;
    // 2) po domknięciu napisów: ZWYKŁE odtwarzanie wideo (płynne), ekran
    //    ZAMROŻONY (scroll przypięty do lockY);
    // 3) po końcu wideo: fade-in captionu i odblokowanie scrolla.
    let phase: "idle" | "playing" | "done" = "idle";
    let lockY = 0;
    video.playbackRate = 1.3; // życzenie Patryka: złączenie dłoni ~30% szybciej
    caption.style.opacity = "0";
    caption.style.transform = "translateY(18px)";
    caption.style.transition = "opacity 0.35s ease, transform 0.35s ease";
    const finishCaption = () => {
      caption.style.opacity = "1";
      caption.style.transform = "translateY(0)";
    };
    const jumpToEnd = () => {
      phase = "done";
      if (video.duration) video.currentTime = video.duration * 0.999;
      finishCaption();
    };
    const setSizes = () => {
      const vh = window.innerHeight;
      if (reduce) {
        extra = 0;
        wrap.style.height = "";
        sticky.style.top = "0px";
        return;
      }
      extra = Math.round(vh * 1.0);
      wrap.style.height = `${sticky.offsetHeight + extra}px`;
      // sekcja wyższa niż viewport → pin dołem (caption musi być widoczny)
      sticky.style.top = `${Math.min(0, vh - sticky.offsetHeight)}px`;
    };
    const apply = () => {
      raf = 0;
      if (reduce || extra === 0) {
        human.style.transform = "translateX(0)";
        machine.style.transform = "translateX(0)";
        jumpToEnd();
        return;
      }
      const raw = Math.min(1, Math.max(0, -wrap.getBoundingClientRect().top / extra));
      const textP = Math.min(1, raw / 0.7);
      human.style.transform = `translateX(${(-(1 - textP) * 115).toFixed(2)}%)`;
      machine.style.transform = `translateX(${((1 - textP) * 115).toFixed(2)}%)`;
      if (phase === "idle") {
        if (raw >= 0.97) {
          // wskok głęboko (np. kotwica) — bez sekwencji, od razu finał
          jumpToEnd();
        } else if (raw >= 0.7) {
          phase = "playing";
          lockY = window.scrollY;
          video.play().catch(() => jumpToEnd());
        }
      }
    };
    // caption NATYCHMIAST gdy ruch rąk się kończy (klip ma statyczną końcówkę
    // — czekanie na 'ended' trwało za długo): odpalamy ~0.9s przed końcem
    let captionShown = false;
    const onTimeUpdate = () => {
      if (!captionShown && video.duration && video.currentTime >= video.duration - 0.9) {
        captionShown = true;
        finishCaption();
        setTimeout(() => {
          phase = "done";
        }, 250);
      }
    };
    const onEnded = () => {
      // fallback gdyby timeupdate nie zdążył
      if (!captionShown) {
        captionShown = true;
        finishCaption();
        phase = "done";
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onScroll = () => {
      if (phase === "playing") {
        // duży skok (nawigacja kotwicą, np. nav KONTAKT) — zwolnij lock
        if (Math.abs(window.scrollY - lockY) > window.innerHeight) {
          video.pause();
          jumpToEnd();
          return;
        }
        // zamrożony ekran na czas odtwarzania
        window.scrollTo(0, lockY);
        return;
      }
      schedule();
    };
    const onResize = () => {
      setSizes();
      schedule();
    };
    setSizes();
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);
    video.addEventListener("loadedmetadata", schedule);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    schedule();
    return () => {
      if (raf) cancelAnimationFrame(raf);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("loadedmetadata", schedule);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    // wrapper wyższy o "extra" (JS) — sticky w środku pinuje sekcję na czas
    // choreografii; po jej końcu wrapper się kończy i strona scrolluje dalej
    <section ref={wrapRef} className="relative hidden w-full bg-[#ebebeb] md:block">
      <div ref={stickyRef} className="sticky top-0">
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
          {/* podpis z liniami — OSTATNI element choreografii (fade-in po
              złączeniu rąk, sterowany progressem w JS) */}
          <div ref={captionRef} className="absolute inset-0" style={{ opacity: 1 }}>
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
      </div>
      </div>
    </section>
  );
}
