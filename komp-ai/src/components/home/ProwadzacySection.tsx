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
import ProwadzacyDesktop from "./ProwadzacyDesktop";

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
            data-reveal=""
            data-node-id="423:3448"
          />
          {/* uwaga: tekst pilla BEZ data-reveal (ma inline scaleX) — animuje
              się tylko tło pilla pod spodem */}
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
              letterSpacing: m(GMOB.heading.trackPx), lineHeight: 1, transitionDelay: "0.12s",
            }}
            data-reveal=""
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
                  className="reveal-wipe absolute overflow-hidden border-solid"
                  style={{
                    left: m(ph.left), top: m(ph.top), width: m(ph.w), height: m(ph.h),
                    borderWidth: m(GMOB.photoBorderPx), borderColor: `rgba(255,255,255,${ph.borderAlpha})`,
                    borderBottomLeftRadius: m(GMOB.photoR), borderTopRightRadius: m(GMOB.photoR),
                  }}
                  data-reveal=""
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

export default function ProwadzacySection({ p }: { p: Prowadzacy }) {
  return (
    <>
    <ProwadzacyMobile p={p} />
    {/* desktop = choreografia awwwards (wipe kart + tilt) — ProwadzacyDesktop;
        stała geometria G została tam przeniesiona 1:1 */}
    <ProwadzacyDesktop p={p} />
    </>
  );
}
