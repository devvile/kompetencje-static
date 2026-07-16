/*
 * Sekcja 6: Nasi prowadzący / „poznajmy się !" (desktop y5347–6249, canvas 1440×902:
 * szary pas 103px + niebieskie tło od y5450). Pozycje kart z get_metadata (253:1407),
 * style kart z get_design_context; header/linia/gwiazdy zmierzone z renderu.
 * Gwiazdy lime = zrotowane instancje STAR (bbox kłamie) → wypieczone z renderu
 * (prow-star-r-f, prow-star-l-f); lewa przechodzi ZA kartą 1 i wystaje 37px pod
 * sekcję (kontakt też ma niebieskie tło) → bez overflow-hidden, sekcja z-10.
 * Niespójności designera zachowane celowo: karta 1 radius 49 (pozostałe 40),
 * zdjęcie Wiktorii 398 wys. (pozostałe 405).
 */
import type { Prowadzacy } from "@/content/types";

const c = (px: number) => `${(px / 14.4).toFixed(4)}cqw`;

/* px designu, origin = góra sekcji y5347 */
const G = {
  h: 902,
  bgTop: 103, // niebieskie tło od y5450
  header: { left: 202, top: 272.7, fontPx: 18.5, trackPx: 0.55 }, // ink target x203..442, y5621..5638
  line: { x: 487, top: 280.2, w: 158, h: 1.4 },
  starR: { left: 1155, top: 228, w: 285, h: 266 },
  starL: { left: 14, top: 643, w: 346, h: 296 }, // dół 939 → 37px pod canvasem
  cardY: 383, // y5730
  // photoH +1.5 vs Figma (405/398): separator ma lądować w wierszach 6134-6135
  // renderu (bez korekty CSS renderował go 2px za wysoko)
  cards: [
    { x: 200, r: 49, photoH: 406.5 },
    { x: 582, r: 40, photoH: 406.5 },
    { x: 964, r: 40, photoH: 399.5 },
  ],
  cardW: 295,
  cardH: 455,
  borderPx: 3, // stroke OUTSIDE w Figmie (zmierzone: outer box 301)
  sepPx: 2, // border-b pod zdjęciem
  labelGap: 14,
  labelFontPx: 14,
};

export default function ProwadzacySection({ p }: { p: Prowadzacy }) {
  return (
    <section className="relative z-10 hidden w-full md:block">
      <div className="@container mx-auto w-full max-w-(--workspace)">
        <div className="relative bg-page" style={{ aspectRatio: `1440/${G.h}` }} data-node-id="250:9703">
          {/* niebieskie tło */}
          <div className="absolute inset-x-0 bottom-0 bg-brand-blue" style={{ top: c(G.bgTop) }} />
          {/* gwiazdy lime — za kartami */}
          <img
            src="/assets/prow-star-r-f.png" alt="" aria-hidden className="absolute"
            style={{ left: c(G.starR.left), top: c(G.starR.top), width: c(G.starR.w), height: c(G.starR.h) }}
            data-node-id="250:9714"
          />
          <img
            src="/assets/prow-star-l-f.png" alt="" aria-hidden className="absolute"
            style={{ left: c(G.starL.left), top: c(G.starL.top), width: c(G.starL.w), height: c(G.starL.h) }}
            data-node-id="250:9724"
          />
          {/* nagłówek + linia */}
          <h2
            className="absolute whitespace-nowrap font-modular text-white"
            style={{
              left: c(G.header.left), top: c(G.header.top), fontSize: c(G.header.fontPx),
              letterSpacing: c(G.header.trackPx), lineHeight: 1,
            }}
            data-node-id="250:9702"
          >
            {p.heading}
          </h2>
          <div className="absolute bg-white" style={{ left: c(G.line.x), top: c(G.line.top), width: c(G.line.w), height: c(G.line.h) }} />
          {/* karty prowadzących */}
          {p.people.map((person, i) => {
            const card = G.cards[i];
            return (
              <div
                key={person.name}
                className="absolute flex flex-col items-center border-solid border-white"
                style={{
                  left: c(card.x - G.borderPx), top: c(G.cardY - G.borderPx),
                  width: c(G.cardW + 2 * G.borderPx), height: c(G.cardH + 2 * G.borderPx),
                  borderWidth: c(G.borderPx), borderRadius: c(card.r + G.borderPx),
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
                  <img
                    src={person.photo} alt={person.name} className="absolute max-w-none"
                    style={{ width: person.crop.w, height: person.crop.h, left: person.crop.left, top: person.crop.top }}
                  />
                </div>
                <h3
                  className="w-full text-center font-modular text-white"
                  style={{ marginTop: c(G.labelGap), fontSize: c(G.labelFontPx), lineHeight: `${(20 / 14.4).toFixed(4)}cqw` }}
                >
                  {person.name}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
