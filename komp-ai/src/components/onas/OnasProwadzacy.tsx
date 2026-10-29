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
  // bio: Montserrat Medium 12, lh normal (Figma 341:1721/1723/1725) — wcześniej 12.5/15 wypychało tekst z ramek
  bioFontPx: 12, bioR: 33, tagFontPx: 12, tagBorderPx: 1.5,
  starW: 32, starH: 23,
  people: [
    {
      name: { x: 68, y: 91, fontPx: 26, lhPx: 35, trackPx: -0.9 }, // cap 19, 2 linie
      photo: { x: 63, y: 186, w: 273, h: 370 },
      crop: { w: "114.3%", h: "124.3%", left: "-11.7%", top: "-8.6%" }, // grid-search match
      stars: [{ x: 302, y: 181 }, { x: 65, y: 541 }],
      tagRow1: { x: 67, y: 592, w: 265, h: 35, idx: 2 },
      tagRow2: [{ x: 67, y: 644, w: 157, h: 34, idx: 0 }, { x: 237, y: 644, w: 94, h: 34, idx: 1 }],
      // ramki 1:1 z Figmy (Frame 20/21/22, origin sekcji y5167)
      bio1: { x: -1, y: 714, w: 345, h: 178 },
      bio2: { x: 77, y: 937, w: 325, h: 362 },
      bio3: { x: -16, y: 1358, w: 342, h: 210 },
      // gwiazdy STAR_OUTLINE (339:1716, 341:1727) — wektory POD szklanymi ramkami
      stars2: [
        { src: "/assets/onas-m-star-o1.svg", x: 0, y: 904, w: 296, h: 397 },
        { src: "/assets/onas-m-star-o2.svg", x: 137, y: 1286, w: 265, h: 343 },
      ],
      decos: [{ src: "/assets/onas-m-pr-blob1-f.png", x: 0, y: 1623, w: 105, h: 65 }],
    },
    {
      name: { x: 68, y: 1744, fontPx: 26, lhPx: 35, trackPx: -0.9 }, // 1 linia
      photo: { x: 66, y: 1804, w: 273, h: 374 },
      crop: { w: "103.7%", h: "104.8%", left: "-4.4%", top: "0%" }, // grid-search match
      stars: [{ x: 305, y: 1800 }, { x: 68, y: 2163 }],
      tagRow1: { x: 66, y: 2210, w: 268, h: 35, idx: 2 },
      tagRow2: [{ x: 66, y: 2262, w: 149, h: 34, idx: 1 }, { x: 234, y: 2262, w: 100, h: 34, idx: 0 }],
      bio1: { x: -7, y: 2332, w: 345, h: 178 },
      bio2: { x: 89, y: 2555, w: 313, h: 360 },
      bio3: { x: -20, y: 2985, w: 323, h: 210 },
      stars2: [{ src: "/assets/onas-m-star-o3.svg", x: 134, y: 2919, w: 268, h: 313 }],
      decos: [{ src: "/assets/onas-m-pr-blob2-f.png", x: 0, y: 3269, w: 105, h: 66 }],
    },
    {
      name: { x: 69, y: 3386, fontPx: 33, lhPx: 41, trackPx: -0.9 }, // cap 24, 2 linie
      photo: { x: 63, y: 3500, w: 273, h: 372 },
      crop: { w: "100.7%", h: "100.5%", left: "0%", top: "-1.1%" }, // grid-search match
      stars: [{ x: 302, y: 3495 }, { x: 65, y: 3857 }],
      tagRow1: { x: 67, y: 3908, w: 265, h: 34, idx: 2 },
      tagRow2: [{ x: 67, y: 3960, w: 149, h: 34, idx: 1 }, { x: 233, y: 3960, w: 98, h: 34, idx: 0 }],
      bio1: { x: -1, y: 4025, w: 345, h: 178 },
      bio2: { x: 77, y: 4253, w: 325, h: 362 },
      bio3: { x: -21, y: 4674, w: 342, h: 210 },
      stars2: [
        { src: "/assets/onas-m-star-o1.svg", x: 0, y: 4220, w: 296, h: 397 },
        { src: "/assets/onas-m-star-o2.svg", x: 131, y: 4602, w: 265, h: 343 },
      ],
      decos: [],
    },
  ],
};

export function OnasProwadzacyMobile({ p, people }: { p: ONasProwadzacy; people: Lecturer[] }) {
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
                {/* gwiazdy konturowe POD ramkami (szkło je rozmywa jak w Figmie) */}
                {gp.stars2.map((st) => (
                  <img key={st.src + st.y} src={st.src} alt="" aria-hidden className="absolute max-w-none"
                    style={{ left: cm(st.x), top: cm(st.y), width: cm(st.w), height: cm(st.h) }} />
                ))}
                {/* bio1: szara ramka z lewej krawędzi, obrys blue, zaokrąglona z prawej */}
                <p className="absolute flex items-center border border-solid border-brand-blue bg-page text-justify font-display font-medium text-brand-blue"
                  style={{
                    left: cm(gp.bio1.x), top: cm(gp.bio1.y), width: cm(gp.bio1.w), height: cm(gp.bio1.h),
                    padding: `${cm(16)} ${cm(30)}`, borderRadius: `0 ${cm(GM.bioR)} ${cm(GM.bioR)} 0`,
                    fontSize: cm(GM.bioFontPx), lineHeight: "normal",
                  }}>
                  {p.bio.intro}
                </p>
                {/* bio2: szkło (biel 20% + blur 25) do prawej krawędzi, zaokrąglone z lewej, obrys bez prawej */}
                <div className="absolute flex flex-col justify-center border-y border-l border-solid border-white text-justify font-display font-medium text-white backdrop-blur-[25px]"
                  style={{
                    left: cm(gp.bio2.x), top: cm(gp.bio2.y), width: cm(gp.bio2.w), height: cm(gp.bio2.h),
                    padding: `${cm(30)} ${cm(30)}`, borderRadius: `${cm(GM.bioR)} 0 0 ${cm(GM.bioR)}`,
                    backgroundColor: "rgba(255,255,255,0.2)", fontSize: cm(GM.bioFontPx), lineHeight: "normal",
                  }}>
                  <p>{p.bio.mainP1}</p>
                  <p style={{ marginTop: "1.219em" }}>{p.bio.mainP2}</p>
                </div>
                {/* bio3: szkło zaokrąglone ze wszystkich stron, px52 */}
                <p className="absolute flex items-center border border-solid border-white text-justify font-display font-medium text-white backdrop-blur-[25px]"
                  style={{
                    left: cm(gp.bio3.x), top: cm(gp.bio3.y), width: cm(gp.bio3.w), height: cm(gp.bio3.h),
                    padding: `${cm(30)} ${cm(52)}`, borderRadius: cm(GM.bioR),
                    backgroundColor: "rgba(245,245,245,0.2)", fontSize: cm(GM.bioFontPx), lineHeight: "normal",
                  }}>
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
