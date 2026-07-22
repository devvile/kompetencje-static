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

/* mobile: canvas 402 szer. (1cqw = 4.02px) */
const cm = (px: number) => `${(px / 4.02).toFixed(4)}cqw`;

/* MOBILE — canvas 402×4994 (y5167..10161, blue Rectangle 6). Pill bleeduje 39px
 * W GÓRĘ nad lime; limonkowa falka za pigułą (prawy róg) wypieczona. Układ per
 * osoba: nazwisko HK white → foto (rogi bl+tr 100) z 2 lime sparkle na rogach →
 * tag szeroki + rząd 2 tagów → bio1 szary (flush left, TL ostry) → bio2 (białe
 * 20%, flush right) → bio3 (r35); dekoracje (krzywe lewe, gwiazdy outline
 * prawe, bloby lime) wypieczone opaque na płaskim blue. Pozycje = pomiar
 * ink-bands z renderu (Figma MCP niedostępne w tej sesji); kadry foto =
 * grid-search match do renderu. */
const GM = {
  h: 4994,
  pill: { x: 31, y: -39, w: 341, h: 73, borderPx: 5, fontPx: 23 },
  wave: { x: 336, y: 0, w: 66, h: 48 },
  bioFontPx: 12.5, bio3FontPx: 12.5, bioLhPx: 15, bioR: 35, tagFontPx: 12, tagBorderPx: 1.5,
  starW: 32, starH: 23,
  people: [
    {
      name: { x: 68, y: 91, fontPx: 26, lhPx: 35, trackPx: -0.9 }, // cap 19, 2 linie
      photo: { x: 63, y: 186, w: 273, h: 370 },
      crop: { w: "114.3%", h: "124.3%", left: "-11.7%", top: "-8.6%" }, // grid-search match
      stars: [{ x: 302, y: 181 }, { x: 65, y: 541 }],
      tagRow1: { x: 67, y: 592, w: 265, h: 35, idx: 2 },
      tagRow2: [{ x: 67, y: 644, w: 157, h: 34, idx: 0 }, { x: 237, y: 644, w: 94, h: 34, idx: 1 }],
      bio1: { box: { x: 0, y: 715, w: 343, h: 175 }, text: { x: 29, y: 744, w: 284 } },
      bio2: { box: { x: 78, y: 938, w: 324, h: 359 }, text: { x: 108, y: 968, w: 266 } },
      bio3: { box: { x: 27, y: 1359, w: 297, h: 207 }, text: { x: 37, y: 1388, w: 235 } },
      decos: [
        { src: "/assets/onas-m-pr-l1-f.png", x: 0, y: 933, w: 25, h: 655 },
        { src: "/assets/onas-m-pr-r1-f.png", x: 330, y: 1353, w: 72, h: 220 },
        { src: "/assets/onas-m-pr-blob1-f.png", x: 0, y: 1623, w: 105, h: 65 },
      ],
    },
    {
      name: { x: 68, y: 1744, fontPx: 26, lhPx: 35, trackPx: -0.9 }, // 1 linia
      photo: { x: 66, y: 1804, w: 273, h: 374 },
      crop: { w: "103.7%", h: "104.8%", left: "-4.4%", top: "0%" }, // grid-search match
      stars: [{ x: 305, y: 1800 }, { x: 68, y: 2163 }],
      tagRow1: { x: 66, y: 2210, w: 268, h: 35, idx: 2 },
      tagRow2: [{ x: 66, y: 2262, w: 149, h: 34, idx: 1 }, { x: 234, y: 2262, w: 100, h: 34, idx: 0 }],
      bio1: { box: { x: 0, y: 2333, w: 337, h: 175 }, text: { x: 23, y: 2362, w: 284 } },
      bio2: { box: { x: 90, y: 2556, w: 312, h: 357 }, text: { x: 119, y: 2585, w: 255 } },
      bio3: { box: { x: 28, y: 2986, w: 274, h: 207 }, text: { x: 33, y: 3015, w: 216 } },
      decos: [
        { src: "/assets/onas-m-pr-l2a-f.png", x: 0, y: 2918, w: 96, h: 67 },
        { src: "/assets/onas-m-pr-l2b-f.png", x: 0, y: 2985, w: 25, h: 214 },
        { src: "/assets/onas-m-pr-r2-f.png", x: 306, y: 2983, w: 96, h: 200 },
        { src: "/assets/onas-m-pr-blob2-f.png", x: 0, y: 3269, w: 105, h: 66 },
      ],
    },
    {
      name: { x: 69, y: 3386, fontPx: 33, lhPx: 41, trackPx: -0.9 }, // cap 24, 2 linie
      photo: { x: 63, y: 3500, w: 273, h: 372 },
      crop: { w: "100.7%", h: "100.5%", left: "0%", top: "-1.1%" }, // grid-search match
      stars: [{ x: 302, y: 3495 }, { x: 65, y: 3857 }],
      tagRow1: { x: 67, y: 3908, w: 265, h: 34, idx: 2 },
      tagRow2: [{ x: 67, y: 3960, w: 149, h: 34, idx: 1 }, { x: 233, y: 3960, w: 98, h: 34, idx: 0 }],
      bio1: { box: { x: 0, y: 4026, w: 343, h: 175 }, text: { x: 29, y: 4055, w: 284 } },
      bio2: { box: { x: 78, y: 4254, w: 324, h: 359 }, text: { x: 108, y: 4284, w: 266 } },
      bio3: { box: { x: 28, y: 4675, w: 292, h: 207 }, text: { x: 32, y: 4704, w: 235 } },
      decos: [
        { src: "/assets/onas-m-pr-l3-f.png", x: 0, y: 4678, w: 25, h: 210 },
        { src: "/assets/onas-m-pr-r3-f.png", x: 323, y: 4678, w: 79, h: 215 },
      ],
    },
  ],
};

export function OnasProwadzacyMobile({ p, people }: { p: ONasProwadzacy; people: Lecturer[] }) {
  const bioLh = `${(GM.bioLhPx / 4.02).toFixed(4)}cqw`;
  return (
    <section className="relative z-10 w-full overflow-x-clip md:hidden">
      <div className="@container mx-auto w-full max-w-(--workspace)">
        <div className="relative bg-brand-blue" style={{ aspectRatio: `402/${GM.h}` }} data-node-id="326:1050-prowadzacy">
          <img src="/assets/onas-m-pr-wave-f.png" alt="" aria-hidden className="absolute"
            style={{ left: cm(GM.wave.x), top: cm(GM.wave.y), width: cm(GM.wave.w), height: cm(GM.wave.h) }} />
          <div
            className="absolute flex items-center justify-center rounded-full border-solid border-white bg-brand-lime font-modular text-brand-blue"
            style={{
              left: cm(GM.pill.x), top: cm(GM.pill.y), width: cm(GM.pill.w), height: cm(GM.pill.h),
              borderWidth: cm(GM.pill.borderPx), fontSize: cm(GM.pill.fontPx), lineHeight: 1,
            }}
            data-node-id="337:1639"
          >
            {p.pill}
          </div>
          {GM.people.map((gp, i) => {
            const person = people[i];
            const nameLines = person.name.split(" ");
            return (
              <div key={person.name}>
                <h3
                  className="absolute origin-top-left whitespace-nowrap font-modular text-white"
                  style={{
                    left: cm(gp.name.x), top: cm(gp.name.y), fontSize: cm(gp.name.fontPx),
                    letterSpacing: cm(gp.name.trackPx),
                    lineHeight: `${(gp.name.lhPx / 4.02).toFixed(4)}cqw`,
                  }}
                >
                  {i === 1 ? person.name : nameLines.map((l) => <span key={l} className="block">{l}</span>)}
                </h3>
                <div
                  className="absolute overflow-hidden"
                  style={{
                    left: cm(gp.photo.x), top: cm(gp.photo.y), width: cm(gp.photo.w), height: cm(gp.photo.h),
                    borderBottomLeftRadius: cm(100), borderTopRightRadius: cm(100),
                  }}
                >
                  <img src={person.photo} alt={person.name} className="absolute max-w-none"
                    style={{ width: gp.crop.w, height: gp.crop.h, left: gp.crop.left, top: gp.crop.top }} />
                </div>
                {gp.stars.map((st, j) => (
                  <img key={j} src="/assets/onas-m-pr-star-f.png" alt="" aria-hidden className="absolute"
                    style={{ left: cm(st.x), top: cm(st.y), width: cm(GM.starW), height: cm(GM.starH) }} />
                ))}
                {[gp.tagRow1, ...gp.tagRow2].map((tg) => (
                  <span
                    key={tg.idx}
                    className="absolute flex items-center justify-center whitespace-nowrap rounded-full border-solid border-white font-display font-normal text-white"
                    style={{
                      left: cm(tg.x), top: cm(tg.y), width: cm(tg.w), height: cm(tg.h),
                      borderWidth: cm(GM.tagBorderPx), fontSize: cm(GM.tagFontPx), lineHeight: 1,
                    }}
                  >
                    {p.tags[i][tg.idx]}
                  </span>
                ))}
                {/* bio1: szary box flush left (TL ostry, reszta zaokrąglona), tekst blue */}
                <div className="absolute bg-page"
                  style={{
                    left: cm(gp.bio1.box.x), top: cm(gp.bio1.box.y), width: cm(gp.bio1.box.w), height: cm(gp.bio1.box.h),
                    borderRadius: `0 ${cm(GM.bioR)} ${cm(GM.bioR)} ${cm(GM.bioR)}`,
                  }} />
                <p className="absolute text-justify font-display font-medium text-brand-blue"
                  style={{ left: cm(gp.bio1.text.x), top: cm(gp.bio1.text.y), width: cm(gp.bio1.text.w), fontSize: cm(GM.bioFontPx), lineHeight: bioLh }}>
                  {p.bio.intro}
                </p>
                {/* bio2: białe 20%, flush right (bleed do krawędzi), r35 */}
                <div className="absolute border border-solid border-white"
                  style={{
                    left: cm(gp.bio2.box.x), top: cm(gp.bio2.box.y), width: cm(gp.bio2.box.w), height: cm(gp.bio2.box.h),
                    borderRadius: cm(GM.bioR), backgroundColor: "rgba(255,255,255,0.2)",
                  }} />
                <div className="absolute text-justify font-display font-medium text-white"
                  style={{ left: cm(gp.bio2.text.x), top: cm(gp.bio2.text.y), width: cm(gp.bio2.text.w), fontSize: cm(GM.bioFontPx), lineHeight: bioLh }}>
                  <p>{p.bio.mainP1}</p>
                  <p style={{ marginTop: cm(13.5) }}>{p.bio.mainP2}</p>
                </div>
                {/* bio3: białe 20%, r35 */}
                <div className="absolute border border-solid border-white"
                  style={{
                    left: cm(gp.bio3.box.x), top: cm(gp.bio3.box.y), width: cm(gp.bio3.box.w), height: cm(gp.bio3.box.h),
                    borderRadius: cm(GM.bioR), backgroundColor: "rgba(255,255,255,0.2)",
                  }} />
                <p className="absolute text-justify font-display font-medium text-white"
                  style={{ left: cm(gp.bio3.text.x), top: cm(gp.bio3.text.y), width: cm(gp.bio3.text.w), fontSize: cm(GM.bio3FontPx), lineHeight: bioLh }}>
                  {p.bio.extra}
                </p>
                {gp.decos.map((d) => (
                  <img key={d.src} src={d.src} alt="" aria-hidden className="absolute"
                    style={{ left: cm(d.x), top: cm(d.y), width: cm(d.w), height: cm(d.h) }} />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

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
