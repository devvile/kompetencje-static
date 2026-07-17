/*
 * O NAS — sekcja 4: prowadzący ×3 (desktop y3140–5904, canvas 1440×2764,
 * bg brand-blue — „tekstura" 229:1102 spłaszcza się w renderze do czystego blue).
 * Pill „poznajmy się !" bleeduje 74px W GÓRĘ nad lime (design y3066). Zdjęcia:
 * te same źródła co home (kadr Patryka identyczny — crop z Lecturer.crop),
 * rogi bl+tr 100, bez bordera. Bio-boxy: bg #EFEFEF, border 1 blue, r33,
 * Montserrat Medium 12 justify (bio identyczne dla 3 osób = placeholder
 * designera). Tagi: border 1 white r26, Montserrat Regular 13. Nazwiska HK,
 * 3 różne rozmiary + scaleX(1.1) (wzór kwadratów designera). Gwiazdy/ikony/
 * bloby = rotowane wektory wypieczone z renderu.
 */
import type { Lecturer, ONasProwadzacy } from "@/content/types";

const c = (px: number) => `${(px / 14.4).toFixed(4)}cqw`;
const SCALE_X = 1.1;

type Pos = { x: number; y: number; w?: number; h?: number };

const G = {
  h: 2764, // y3140..5904
  pill: { x: 409, y: -74, w: 621, h: 114, borderPx: 4, fontPx: 26 },
  people: [
    {
      name: { x: 552, y: 197, fontPx: 38.4, trackPx: -3 }, // ink 555..1201 y3343 (cap 32)
      tags: [{ x: 144, y: 200, w: 168 }, { x: 330, y: 201, w: 104 }, { x: 244, y: 764, w: 234 }],
      tagH: 34,
      icons: [{ x: 471, y: 198 }, { x: 150, y: 761 }],
      stars: [{ x: 470, y: 243 }, { x: 197, y: 762 }],
      photo: { x: 146, y: 267, w: 338, h: 464 },
      crop: { w: '114.39%', h: '121.72%', left: '-12.52%', top: '-7.75%' },
      bios: [
        { x: 553, y: 288, w: 454, h: 125 },
        { x: 553, y: 453, w: 546, h: 194 },
        { x: 553, y: 686, w: 546, h: 113 },
      ],
      bigStar: { src: "/assets/onas-pr-star1-f.png", x: 1170, y: 210, w: 270, h: 330 },
      blob: { src: "/assets/onas-pr-blob1-f.png", x: 0, y: 715, w: 190, h: 430 },
      icAssets: ["onas-ic-p1", "onas-st-p1", "onas-ic-p2", "onas-st-p2"],
    },
    {
      name: { x: 559, y: 1071, fontPx: 57.6, trackPx: -5.2 }, // ink 563..1163 y4217 (cap 48)
      tags: [{ x: 145, y: 1078, w: 112 }, { x: 275, y: 1079, w: 163 }, { x: 244, y: 1642, w: 239 }],
      tagH: 35,
      icons: [{ x: 475, y: 1076 }, { x: 148, y: 1639 }],
      stars: [{ x: 474, y: 1122 }, { x: 195, y: 1640 }],
      photo: { x: 147, y: 1143, w: 336, h: 469 },
      crop: { w: '106%', h: '106%', left: '-4.26%', top: '-0.21%' },
      bios: [
        { x: 560, y: 1171, w: 457, h: 116 },
        { x: 560, y: 1319, w: 534, h: 214 },
        { x: 560, y: 1561, w: 534, h: 114 },
      ],
      bigStar: { src: "/assets/onas-pr-star2-f.png", x: 1240, y: 1040, w: 200, h: 340 },
      blob: { src: "/assets/onas-pr-blob2-f.png", x: 0, y: 1580, w: 185, h: 430 },
      icAssets: ["onas-ic-q1", "onas-st-q1", "onas-ic-q2", "onas-st-q2"],
    },
    {
      name: { x: 556, y: 1917, fontPx: 48, trackPx: -2 }, // ink 559..1293 y5064 (cap 48 z Ń)
      tags: [{ x: 145, y: 1932, w: 111 }, { x: 274, y: 1933, w: 162 }, { x: 244, y: 2493, w: 212 }],
      tagH: 34,
      icons: [{ x: 474, y: 1929 }, { x: 150, y: 2491 }],
      stars: [{ x: 473, y: 1975 }, { x: 198, y: 2491 }],
      photo: { x: 146, y: 1996, w: 336, h: 468 },
      crop: { w: '106%', h: '106%', left: '-3.12%', top: '-3.2%' },
      bios: [
        { x: 557, y: 2025, w: 456, h: 114 },
        { x: 557, y: 2173, w: 534, h: 213 },
        { x: 557, y: 2413, w: 534, h: 114 },
      ],
      bigStar: { src: "/assets/onas-pr-star3-f.png", x: 1240, y: 1915, w: 200, h: 340 },
      blob: null as null | { src: string; x: number; y: number; w: number; h: number },
      icAssets: ["onas-ic-w1", "onas-st-w1", "onas-ic-w2", "onas-st-w2"],
    },
  ],
  iconW: 41, iconH: 40, starW: 42, starH: 39,
  bioR: 33, bioPadX: 30, bioPadY: 16, bioFontPx: 12, bioLhPx: 15,
  tagFontPx: 13,
  photoR: 100,
};

export default function OnasProwadzacySec({ p, people }: { p: ONasProwadzacy; people: Lecturer[] }) {
  return (
    <section className="relative z-10 hidden w-full overflow-x-clip md:block">
      <div className="@container mx-auto w-full max-w-(--workspace)">
        <div className="relative bg-brand-blue" style={{ aspectRatio: `1440/${G.h}` }} data-node-id="229:1102">
          {/* pill „poznajmy się !" — bleed nad lime */}
          <div
            className="absolute flex items-center justify-center rounded-full border-solid border-white bg-brand-lime font-modular text-brand-blue"
            style={{
              left: c(G.pill.x), top: c(G.pill.y), width: c(G.pill.w), height: c(G.pill.h),
              borderWidth: c(G.pill.borderPx), fontSize: c(G.pill.fontPx), lineHeight: 1,
            }}
            data-node-id="229:1875"
          >
            {p.pill}
          </div>
          {G.people.map((gp, i) => {
            const person = people[i];
            return (
              <div key={person.name}>
                <h3
                  className="absolute origin-top-left whitespace-nowrap font-modular text-white"
                  style={{
                    left: c(gp.name.x), top: c(gp.name.y), fontSize: c(gp.name.fontPx),
                    letterSpacing: c(gp.name.trackPx), lineHeight: 1, transform: `scaleX(${SCALE_X})`,
                  }}
                >
                  {person.name}
                </h3>
                {p.tags[i].map((tag, j) => (
                  <span
                    key={tag}
                    className="absolute flex items-center justify-center whitespace-nowrap rounded-full border border-solid border-white font-display font-normal text-white"
                    style={{
                      left: c(gp.tags[j].x), top: c(gp.tags[j].y), width: c(gp.tags[j].w), height: c(gp.tagH),
                      fontSize: c(G.tagFontPx), lineHeight: 1,
                    }}
                  >
                    {tag}
                  </span>
                ))}
                {gp.icons.map((ic, j) => (
                  <img key={j} src={`/assets/${gp.icAssets[j * 2]}.png`} alt="" aria-hidden className="absolute"
                    style={{ left: c(ic.x), top: c(ic.y), width: c(G.iconW), height: c(G.iconH) }} />
                ))}
                {gp.stars.map((st, j) => (
                  <img key={j} src={`/assets/${gp.icAssets[j * 2 + 1]}.png`} alt="" aria-hidden className="absolute"
                    style={{ left: c(st.x), top: c(st.y), width: c(G.starW), height: c(G.starH) }} />
                ))}
                <div
                  className="absolute overflow-hidden"
                  style={{
                    left: c(gp.photo.x), top: c(gp.photo.y), width: c(gp.photo.w), height: c(gp.photo.h),
                    borderBottomLeftRadius: c(G.photoR), borderTopRightRadius: c(G.photoR),
                  }}
                >
                  <img src={person.photo} alt={person.name} className="absolute max-w-none"
                    style={{ width: gp.crop.w, height: gp.crop.h, left: gp.crop.left, top: gp.crop.top }} />
                </div>
                {/* bio 1: szary box, tekst blue; bio 2-3: rgba(255,255,255,0.2), tekst white */}
                <div
                  className="absolute flex items-center border border-solid border-brand-blue bg-page text-justify font-display font-medium text-brand-blue"
                  style={{
                    left: c(gp.bios[0].x), top: c(gp.bios[0].y), width: c(gp.bios[0].w), height: c(gp.bios[0].h),
                    borderRadius: c(G.bioR), padding: `${c(G.bioPadY)} ${c(G.bioPadX)}`,
                    fontSize: c(G.bioFontPx), lineHeight: `${(G.bioLhPx / 14.4).toFixed(4)}cqw`,
                  }}
                >
                  <p>{p.bio.intro}</p>
                </div>
                <div
                  className="absolute flex flex-col justify-center border border-solid border-white text-justify font-display font-medium text-white"
                  style={{
                    left: c(gp.bios[1].x), top: c(gp.bios[1].y), width: c(gp.bios[1].w), height: c(gp.bios[1].h),
                    borderRadius: c(G.bioR), padding: `${c(30)} ${c(30)}`, backgroundColor: "rgba(255,255,255,0.2)",
                    fontSize: c(G.bioFontPx), lineHeight: `${(G.bioLhPx / 14.4).toFixed(4)}cqw`,
                  }}
                >
                  <p>{p.bio.mainP1}</p>
                  <p style={{ marginTop: c(G.bioLhPx) }}>{p.bio.mainP2}</p>
                </div>
                <div
                  className="absolute flex items-center border border-solid border-white text-justify font-display font-medium text-white"
                  style={{
                    left: c(gp.bios[2].x), top: c(gp.bios[2].y), width: c(gp.bios[2].w), height: c(gp.bios[2].h),
                    borderRadius: c(G.bioR), padding: `${c(G.bioPadY)} ${c(G.bioPadX)}`, backgroundColor: "rgba(255,255,255,0.2)",
                    fontSize: c(G.bioFontPx), lineHeight: `${(G.bioLhPx / 14.4).toFixed(4)}cqw`,
                  }}
                >
                  <p>{p.bio.extra}</p>
                </div>
                <img src={gp.bigStar.src} alt="" aria-hidden className="absolute"
                  style={{ left: c(gp.bigStar.x), top: c(gp.bigStar.y), width: c(gp.bigStar.w), height: c(gp.bigStar.h) }} />
                {gp.blob && (
                  <img src={gp.blob.src} alt="" aria-hidden className="absolute"
                    style={{ left: c(gp.blob.x), top: c(gp.blob.y), width: c(gp.blob.w), height: c(gp.blob.h) }} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
