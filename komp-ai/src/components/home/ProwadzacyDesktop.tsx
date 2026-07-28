"use client";

/*
 * NASI PROWADZĄCY — desktop z choreografią awwwards-style (życzenie Patryka):
 * wejście w viewport → nagłówek fade-up + linia rysuje się od lewej, karty
 * FADE-IN (środkowa pierwsza: delaye 0.22/0/0.34s) ze zdjęciem „osiadającym"
 * z zoomu 1.32→1, nazwiska wyjeżdżają spod maski.
 * Hover: magnetyczny tilt 3D karty (rotate wg pozycji kursora) + zbliżenie
 * zdjęcia. Style stanów w globals.css (.prow-*); geometria 1:1 z wersji
 * statycznej (ProwadzacySection).
 */

import { useEffect, useRef } from "react";
import type { Prowadzacy } from "@/content/types";

const c = (px: number) => `${(px / 14.4).toFixed(4)}cqw`;

/* px designu, origin = góra sekcji y5347 */
const G = {
  h: 902,
  bgTop: 103,
  header: { left: 202, top: 272.7, fontPx: 18.5, trackPx: 0.55 },
  line: { x: 487, top: 280.2, w: 158, h: 1.4 },
  starR: { left: 1155, top: 228, w: 285, h: 266 },
  starL: { left: 14, top: 643, w: 346, h: 296 },
  cardY: 383,
  cards: [
    { x: 200, r: 49, photoH: 406.5 },
    { x: 582, r: 40, photoH: 406.5 },
    { x: 964, r: 40, photoH: 399.5 },
  ],
  cardW: 295,
  cardH: 455,
  borderPx: 3,
  sepPx: 2,
  labelGap: 14,
  labelFontPx: 14,
};

export default function ProwadzacyDesktop({ p }: { p: Prowadzacy }) {
  const secRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hoverRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* reveal: jedna klasa .is-in na sekcji, kaskadę robi CSS (--prow-d) */
  useEffect(() => {
    const sec = secRef.current;
    if (!sec) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            sec.classList.add("is-in");
            io.disconnect();
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(sec);
    return () => io.disconnect();
  }, []);

  /* magnetyczny tilt 3D na hover */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cleanups: (() => void)[] = [];
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const hover = hoverRefs.current[i];
      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const dx = (e.clientX - r.left) / r.width - 0.5;
        const dy = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${(dx * 7).toFixed(2)}deg) rotateX(${(-dy * 7).toFixed(2)}deg) translateY(-6px)`;
        if (hover) hover.style.transform = "scale(1.06)";
      };
      const onLeave = () => {
        card.style.transform = "";
        if (hover) hover.style.transform = "";
      };
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      });
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section className="relative z-10 hidden w-full md:block">
      <div className="@container mx-auto w-full max-w-(--workspace)">
        <div ref={secRef} className="prow-sec relative bg-page" style={{ aspectRatio: `1440/${G.h}` }} data-node-id="250:9703">
          {/* niebieskie tło */}
          <div className="absolute inset-x-0 bottom-0 bg-brand-blue" style={{ top: c(G.bgTop) }} />
          {/* gwiazdy lime — za kartami, z dryfem */}
          <img
            src="/assets/prow-star-r-f.png" alt="" aria-hidden className="hero-star-a absolute"
            style={{ left: c(G.starR.left), top: c(G.starR.top), width: c(G.starR.w), height: c(G.starR.h) }}
            data-node-id="250:9714"
          />
          <img
            src="/assets/prow-star-l-f.png" alt="" aria-hidden className="hero-star-c absolute"
            style={{ left: c(G.starL.left), top: c(G.starL.top), width: c(G.starL.w), height: c(G.starL.h) }}
            data-node-id="250:9724"
          />
          {/* nagłówek + linia (intro choreografii) */}
          <h2
            className="prow-head absolute whitespace-nowrap font-modular text-white"
            style={{
              left: c(G.header.left), top: c(G.header.top), fontSize: c(G.header.fontPx),
              letterSpacing: c(G.header.trackPx), lineHeight: 1,
            }}
            data-node-id="250:9702"
          >
            {p.heading}
          </h2>
          <div className="prow-line absolute bg-white" style={{ left: c(G.line.x), top: c(G.line.top), width: c(G.line.w), height: c(G.line.h) }} />
          {/* karty prowadzących — wipe od dołu + tilt na hover */}
          {p.people.map((person, i) => {
            const card = G.cards[i];
            return (
              <div
                key={person.name}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="prow-card absolute flex flex-col items-center border-solid border-white"
                style={{
                  left: c(card.x - G.borderPx), top: c(G.cardY - G.borderPx),
                  width: c(G.cardW + 2 * G.borderPx), height: c(G.cardH + 2 * G.borderPx),
                  borderWidth: c(G.borderPx), borderRadius: c(card.r + G.borderPx),
                  // środkowa karta pojawia się PIERWSZA (życzenie Patryka)
                  ["--prow-d" as never]: `${[0.22, 0, 0.34][i]}s`,
                }}
                data-node-id="253:1407"
              >
                <div
                  className="relative w-full overflow-hidden border-white"
                  style={{
                    height: c(card.photoH),
                    borderBottomWidth: c(G.sepPx), borderBottomStyle: "solid",
                    borderTopLeftRadius: c(card.r), borderTopRightRadius: c(card.r),
                  }}
                >
                  {/* warstwa hover-zoom (JS) — osobno od reveal-zoomu na img */}
                  <div
                    ref={(el) => {
                      hoverRefs.current[i] = el;
                    }}
                    className="prow-hover absolute inset-0"
                  >
                    <img
                      src={person.photo} alt={person.name} className="prow-zoom absolute max-w-none"
                      style={{ width: person.crop.w, height: person.crop.h, left: person.crop.left, top: person.crop.top }}
                    />
                  </div>
                </div>
                <h3
                  className="prow-name-mask w-full text-center font-modular text-white"
                  style={{ marginTop: c(G.labelGap), fontSize: c(G.labelFontPx), lineHeight: `${(20 / 14.4).toFixed(4)}cqw` }}
                >
                  <span className="prow-name">{person.name}</span>
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
