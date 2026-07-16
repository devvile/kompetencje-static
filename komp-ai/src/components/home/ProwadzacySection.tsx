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
/* mobile: canvas 402 szer. (1cqw = 4.02px) */
const m = (px: number) => `${(px / 4.02).toFixed(4)}cqw`;

/* MOBILE — canvas 402×2286 (strona y5374..7660, tło blue od 5355 = pas w human-machine).
 * Pozycje z get_metadata (pill 423:3448, nagłówek 423:3420, teksty/recty kart);
 * gwiazdy = zrotowane instancje wypieczone z renderu; 6 małych gwiazdek to ten sam
 * asset (blob 26×26 identyczny n=177 w renderze). Karty: rogi TYLKO bl+tr 100px,
 * border 2px white (Piotr 70% alpha — tak w Figmie). Advance HK mono: CZEMIEROWSKI
 * co 22px, PIOTR MAŁYSZ co 23px (tracking per blok). */
/* Teksty HK w tej sekcji designer rozciągnął w poziomie ~1.1× (glify 20×20 i 24×24
 * to kwadraty; naturalne HK ma ink/cap 0.91) → fontPx z cap-height + scaleX(1.1). */
const SCALE_X = 1.1;
const GMOB = {
  h: 2286,
  pill: { left: 31, top: 138, w: 342, h: 74, borderPx: 4 },
  pillText: { left: 72, top: 164.4, fontPx: 22.8, trackPx: -0.8, wordPx: 0 }, // ink cel x73..329 y5540..5563, advance 21
  line: { x: 0, top: 290.2, w: 86, h: 1.2 },
  heading: { left: 111, top: 282.7, fontPx: 18.5, trackPx: 0.45 }, // ink x112..351 y5658..5675 (jak desktop)
  starOut: { left: 226, top: 15, w: 66, h: 72 },
  starHalf1: { left: 0, top: 975, w: 70, h: 47 },
  starHalf2: { left: 0, top: 1622, w: 73, h: 51 },
  starSm: { w: 30, h: 30, at: [[302, 512], [65, 872], [307, 1150], [70, 1513], [304, 1844], [67, 2204]] },
  names: [
    { left: 65, top: 426.2, fontPx: 24, trackPx: -1.2, lhPx: 35 }, // ink 66..327 y5806, advance 22
    { left: 67, top: 1098.2, fontPx: 24, trackPx: -0.3, lhPx: 36 }, // ink 68..328 y6478, advance 23
    { left: 68, top: 1735.2, fontPx: 28.8, trackPx: 0.1, lhPx: 41 }, // ink 69..318 y7118, advance 28.2
  ],
  photos: [
    { left: 65, top: 520, w: 268, h: 368, borderAlpha: 1 }, // y5894
    { left: 67, top: 1157, w: 268, h: 368, borderAlpha: 0.7 }, // y6531
    { left: 67, top: 1850, w: 264, h: 368, borderAlpha: 1 }, // y7224
  ],
  photoR: 100, // rogi bl + tr
  photoBorderPx: 2,
};

function ProwadzacyMobile({ p }: { p: Prowadzacy }) {
  return (
    <section className="relative w-full md:hidden">
      <div className="@container mx-auto w-full max-w-(--workspace)">
        <div className="relative overflow-x-clip bg-brand-blue" style={{ aspectRatio: `402/${GMOB.h}` }} data-node-id="423:3362">
          {/* pill „poznajmy się !" */}
          <div
            className="absolute rounded-full border-solid border-white bg-brand-lime"
            style={{
              left: m(GMOB.pill.left), top: m(GMOB.pill.top), width: m(GMOB.pill.w), height: m(GMOB.pill.h),
              borderWidth: m(GMOB.pill.borderPx),
            }}
            data-node-id="423:3448"
          />
          <p
            className="absolute origin-top-left whitespace-nowrap font-modular text-brand-blue"
            style={{
              left: m(GMOB.pillText.left), top: m(GMOB.pillText.top), fontSize: m(GMOB.pillText.fontPx),
              letterSpacing: m(GMOB.pillText.trackPx), wordSpacing: m(GMOB.pillText.wordPx), lineHeight: 1,
              transform: `scaleX(${SCALE_X})`,
            }}
          >
            {p.kicker}
          </p>
          {/* linia + nagłówek */}
          <div className="absolute bg-white" style={{ left: m(GMOB.line.x), top: m(GMOB.line.top), width: m(GMOB.line.w), height: m(GMOB.line.h) }} />
          <h2
            className="absolute whitespace-nowrap font-modular text-white"
            style={{
              left: m(GMOB.heading.left), top: m(GMOB.heading.top), fontSize: m(GMOB.heading.fontPx),
              letterSpacing: m(GMOB.heading.trackPx), lineHeight: 1,
            }}
            data-node-id="423:3420"
          >
            {p.heading}
          </h2>
          {/* gwiazdy tła */}
          <img src="/assets/prow-star-out-m-f.png" alt="" aria-hidden className="absolute"
            style={{ left: m(GMOB.starOut.left), top: m(GMOB.starOut.top), width: m(GMOB.starOut.w), height: m(GMOB.starOut.h) }} />
          <img src="/assets/prow-star-half1-m-f.png" alt="" aria-hidden className="absolute"
            style={{ left: m(GMOB.starHalf1.left), top: m(GMOB.starHalf1.top), width: m(GMOB.starHalf1.w), height: m(GMOB.starHalf1.h) }} />
          <img src="/assets/prow-star-half2-m-f.png" alt="" aria-hidden className="absolute"
            style={{ left: m(GMOB.starHalf2.left), top: m(GMOB.starHalf2.top), width: m(GMOB.starHalf2.w), height: m(GMOB.starHalf2.h) }} />
          {GMOB.starSm.at.map(([x, y]) => (
            <img key={`${x}-${y}`} src="/assets/prow-star-sm-m-f.png" alt="" aria-hidden className="absolute"
              style={{ left: m(x), top: m(y), width: m(GMOB.starSm.w), height: m(GMOB.starSm.h) }} />
          ))}
          {/* nazwiska + zdjęcia */}
          {p.people.map((person, i) => {
            const nm = GMOB.names[i], ph = GMOB.photos[i];
            return (
              <div key={person.name}>
                <h3
                  className="absolute origin-top-left whitespace-nowrap font-modular text-white"
                  style={{
                    left: m(nm.left), top: m(nm.top), fontSize: m(nm.fontPx),
                    letterSpacing: m(nm.trackPx), lineHeight: `${(nm.lhPx / 4.02).toFixed(4)}cqw`,
                    transform: `scaleX(${SCALE_X})`,
                  }}
                >
                  {person.nameLines.map((l) => (
                    <span key={l} className="block">{l}</span>
                  ))}
                </h3>
                <div
                  className="absolute overflow-hidden border-solid"
                  style={{
                    left: m(ph.left), top: m(ph.top), width: m(ph.w), height: m(ph.h),
                    borderWidth: m(GMOB.photoBorderPx), borderColor: `rgba(255,255,255,${ph.borderAlpha})`,
                    borderBottomLeftRadius: m(GMOB.photoR), borderTopRightRadius: m(GMOB.photoR),
                  }}
                >
                  <img
                    src={person.photo} alt={person.name} className="absolute max-w-none"
                    style={{ width: person.cropM.w, height: person.cropM.h, left: person.cropM.left, top: person.cropM.top }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

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
    <>
    <ProwadzacyMobile p={p} />
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
    </>
  );
}
