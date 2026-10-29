/*
 * K3Benefits — „CO ZYSKASZ NA KURSIE?" w układzie bento (redesign kursu v3,
 * Figma 5ufIXE17KqmkvVrfSVzUFE / 2148:2028, canvas 1440×1560) + ukośny pasek
 * haseł (marquee). Kafle: [szeroki blue | wąski lime] / [wąski biały | szeroki
 * granat] — kolory i układ wynikają z pozycji, treść (numer, tytuł, opis)
 * z danych kursu, ilustracja = `art` z rejestru BENTO_ART (HTML/CSS, ostre na
 * retinie; zdjęcia jako webp 2×). Pozycje w px designu → cqw (c()).
 */
import type { KursV2Page, KursV3BentoArt } from "@/content/types";
import { c, fs, K2_MAX_W } from "./k2";

const TILE = [
  { left: 120, top: 370, w: 720, bg: "#131dff", wide: true, dark: true, num: "lime" },
  { left: 856, top: 370, w: 464, bg: "#d6ff3f", wide: false, dark: false, num: "blue" },
  { left: 120, top: 866, w: 464, bg: "#ffffff", wide: false, dark: false, num: "blue" },
  { left: 600, top: 866, w: 720, bg: "#06093a", wide: true, dark: true, num: "lime" },
] as const;
const TILE_H = 480;

/* ---------- ilustracje kafli (rejestr) ---------- */

function Pill({ text, x, y, tone }: { text: string; x: number; y: number; tone: "lime" | "white" | "blue" | "outline-blue" | "outline-white" }) {
  const cls = {
    lime: "bg-brand-lime text-brand-blue",
    white: "bg-white text-brand-blue",
    blue: "bg-brand-blue text-white",
    "outline-blue": "border-solid border-brand-blue text-brand-blue",
    "outline-white": "border-solid border-white text-white",
  }[tone];
  return (
    <span
      className={`absolute whitespace-nowrap font-display font-semibold ${cls}`}
      style={{ left: c(x), top: c(y), padding: `${c(7)} ${c(14)}`, borderRadius: c(30), borderWidth: tone.startsWith("outline") ? c(1.5) : 0, fontSize: fs(12, 10), lineHeight: "normal" }}
    >
      {text}
    </span>
  );
}

function ArtOfertaMock() {
  // 2148:2046 (makieta oferty obrócona 5°) + pigułki PDF/PPTX + odznaka „60 MIN"
  const bar = (top: number, w: number, a = 0.15, left = 22, h = 8) => (
    <span className="absolute block" style={{ left: c(left), top: c(top), width: c(w), height: c(h), borderRadius: c(4), background: `rgba(19,29,255,${a})` }} />
  );
  return (
    <>
      <div
        className="absolute overflow-hidden bg-white"
        style={{ left: c(392.98 + (276.067 - 250) / 2), top: c(96 + (330.609 - 310) / 2), width: c(250), height: c(310), borderRadius: c(20), transform: "rotate(5deg)", boxShadow: `0 ${c(20)} ${c(40)} rgba(0,0,77,0.35)` }}
      >
        <span className="absolute inset-x-0 top-0 block bg-[#06093a]" style={{ height: c(64) }} />
        <span className="absolute font-modular text-brand-lime" style={{ left: c(22), top: c(22), fontSize: c(15), lineHeight: 1 }}>OFERTA</span>
        {bar(90, 170)}
        {bar(108, 200)}
        {bar(126, 140)}
        <span className="absolute block" style={{ left: c(22), top: c(154), width: c(206), height: c(70), borderRadius: c(12), background: "rgba(19,29,255,0.08)" }} />
        {bar(168, 120, 0.25, 34, 7)}
        {bar(186, 90, 0.25, 34, 7)}
        {bar(204, 140, 0.25, 34, 7)}
        {bar(240, 96)}
        <span className="absolute block bg-brand-lime" style={{ left: c(148), top: c(232), width: c(80), height: c(26), borderRadius: c(13) }} />
      </div>
      <Pill text="PDF" x={430} y={418} tone="lime" />
      <Pill text="PPTX" x={497} y={418} tone="white" />
      <div
        className="absolute flex flex-col items-center justify-center border-solid border-brand-blue bg-brand-lime text-brand-blue"
        style={{ left: c(592), top: c(64), width: c(112), height: c(112), borderRadius: c(56), borderWidth: c(3) }}
      >
        <span className="font-display font-black" style={{ fontSize: c(38), lineHeight: 1 }}>60</span>
        <span className="font-modular" style={{ fontSize: c(13), lineHeight: 1, marginTop: c(4) }}>MIN</span>
      </div>
    </>
  );
}

function ArtGrafikiTrio({ images, pill }: { images: string[]; pill: string }) {
  // 2148:2066–2068: trzy zdjęcia 150×170 (białe ramki 4px, obrót 8° / 0 / −8°)
  const photo = (src: string, x: number, y: number, rot: number) => (
    <span
      className="absolute block overflow-hidden border-solid border-white"
      style={{ left: c(x), top: c(y), width: c(150), height: c(170), borderWidth: c(4), borderRadius: c(20), transform: `rotate(${rot}deg)`, boxShadow: `0 ${c(10)} ${c(24)} rgba(0,0,77,0.25)` }}
    >
      <img src={src} alt="" className="h-full w-full object-cover" />
    </span>
  );
  return (
    <>
      {photo(images[0], 12.34 + (172.2 - 150) / 2, 40 + (189.222 - 170) / 2, 8)}
      {photo(images[1], 150, 24, 0)}
      {photo(images[2], 262 + (172.2 - 150) / 2, 19.12 + (189.222 - 170) / 2, -8)}
      <Pill text={pill} x={300} y={186} tone="blue" />
    </>
  );
}

function ArtSlajdy({ src, pills }: { src: string; pills: string[] }) {
  // 2148:2076 grafika (contain 404×200) + pigułki źródeł w rzędzie
  return (
    <>
      <img src={src} alt="" className="absolute max-w-none object-contain" style={{ left: c(28.5), top: c(12.5), width: c(404), height: c(200) }} />
      <span className="absolute flex" style={{ left: c(38.5), top: c(174.5), columnGap: c(8) }}>
        {pills.map((p) => (
          <span key={p} className="whitespace-nowrap border-solid border-brand-blue font-display font-semibold text-brand-blue" style={{ padding: `${c(7)} ${c(14)}`, borderRadius: c(30), borderWidth: c(1.5), fontSize: fs(12, 10), lineHeight: "normal" }}>
            {p}
          </span>
        ))}
      </span>
    </>
  );
}

function ArtWycenaChart({ bars, highlight, label, pills }: { bars: number[]; highlight: number; label: string; pills: string[] }) {
  // 2148:2093: panel 270×300, słupki 30 szer. co 46, oś na y249; wyróżniony słupek lime
  return (
    <>
      <div className="absolute overflow-hidden border-solid border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.06)]" style={{ left: c(410), top: c(110), width: c(270), height: c(300), borderRadius: c(24), borderWidth: c(1) }}>
        {bars.map((h, i) => (
          <span
            key={i}
            className="absolute block"
            style={{ left: c(25 + i * 46), top: c(249 - h), width: c(30), height: c(h), borderRadius: c(8), background: i === highlight ? "#d6ff3f" : "rgba(199,204,255,0.35)" }}
          />
        ))}
        <span className="absolute block bg-[rgba(255,255,255,0.3)]" style={{ left: c(19), top: c(249), width: c(230), height: c(2) }} />
        <span className="absolute whitespace-nowrap bg-brand-lime font-display font-semibold text-[#06093a]" style={{ left: c(25 + highlight * 46 + 15), top: c(13), transform: "translateX(-50%)", padding: `${c(7)} ${c(14)}`, borderRadius: c(30), fontSize: fs(12, 10), lineHeight: "normal" }}>
          {label}
        </span>
      </div>
      {pills.map((p, i) => (
        <Pill key={p} text={p} x={410 + i * 130} y={424} tone="outline-white" />
      ))}
      <img src="/assets/kurs3/k3-star-sm.svg" alt="" aria-hidden className="absolute" style={{ left: c(640), top: c(60), width: c(34), height: c(34) }} />
    </>
  );
}

export function BentoArt({ art }: { art: KursV3BentoArt }) {
  switch (art.kind) {
    case "oferta-mock":
      return <ArtOfertaMock />;
    case "grafiki-trio":
      return <ArtGrafikiTrio images={art.images} pill={art.pill} />;
    case "slajdy":
      return <ArtSlajdy src={art.src} pills={art.pills} />;
    case "wycena-chart":
      return <ArtWycenaChart bars={art.bars} highlight={art.highlight} label={art.label} pills={art.pills} />;
    case "image":
      return <img src={art.src} alt="" className="absolute max-w-none object-contain" style={{ left: c(art.x), top: c(art.y), width: c(art.w), height: c(art.h) }} />;
  }
}

/* ---------- sekcja ---------- */

export default function K3Benefits({ benefits }: { benefits: KursV2Page["benefits"] }) {
  const b3 = benefits.bento!;
  const [h1, h2] = b3.headingLines;
  return (
    <section className="w-full overflow-hidden bg-page leading-[normal]" data-node-id="2148:2028">
      <div className="@container mx-auto w-full" style={{ maxWidth: K2_MAX_W }}>
        <div className="relative" style={{ aspectRatio: "1440/1560" }}>
          {/* dekor: szklany dymek → oferta (obrót 13.54°) */}
          {b3.decor && b3.decorBox && (
            <img src={b3.decor} alt="" aria-hidden className="pointer-events-none absolute max-w-none" style={{ left: c(b3.decorBox.x), top: c(b3.decorBox.y), width: c(b3.decorBox.w), height: c(b3.decorBox.h) }} />
          )}
          {b3.decor && !b3.decorBox && (
            <div className="pointer-events-none absolute overflow-hidden" style={{ left: c(738.83 + (855.895 - 781.199) / 2), top: c(-144.21 + (583.232 - 411.765) / 2), width: c(781.199), height: c(411.765), transform: "rotate(13.54deg)" }}>
              <img src={b3.decor} alt="" className="absolute max-w-none" style={{ left: "6.29%", top: 0, width: "101.34%", height: "218.29%" }} />
            </div>
          )}
          <img src="/assets/kurs3/k3-star-lime-90.svg" alt="" aria-hidden className="absolute" style={{ left: c(1164.22 + 2.78), top: c(213.22 + 2.78), width: c(90), height: c(90), transform: "rotate(3.66deg)" }} />
          <img src="/assets/kurs3/k3-star-lime-70.svg" alt="" aria-hidden className="absolute" style={{ left: c(60), top: c(1210), width: c(70), height: c(70) }} />

          {/* nagłówek */}
          <p className="absolute whitespace-pre border-solid border-brand-blue bg-brand-lime font-display font-semibold text-brand-blue" style={{ left: c(120), top: c(100), padding: `${c(7)} ${c(14)}`, borderWidth: c(1.5), borderRadius: c(30), fontSize: fs(13, 11) }} data-reveal="">
            {"✦  "}
            <span className="font-extrabold">{benefits.items.length}</span>
            {` ${b3.badge}`}
          </p>
          <h2 className="font-display font-black text-brand-blue" style={{ fontSize: c(72), lineHeight: "normal" }} data-reveal="">
            <span className="absolute whitespace-nowrap" style={{ left: c(120), top: c(150) }}>{h1}</span>
            <span className="absolute block bg-brand-lime" style={{ left: c(120), top: c(239), width: c(499), height: c(84) }} aria-hidden />
            <span className="absolute whitespace-nowrap" style={{ left: c(136), top: c(236) }}>{h2}</span>
          </h2>
          <img src="/assets/kurs3/k3-star-arrow-f.png" alt="" aria-hidden className="absolute" style={{ left: c(659), top: c(233), width: c(50), height: c(87) }} />

          {/* kafle */}
          {benefits.items.slice(0, 4).map((it, i) => {
            const t = TILE[i];
            const art = b3.tiles[i];
            const contentTop = t.wide ? 44 : (art.contentTop ?? 236);
            const left = t.wide ? 44 : 40;
            return (
              <div
                key={it.title}
                className="absolute overflow-hidden"
                style={{ left: c(t.left), top: c(t.top), width: c(t.w), height: c(TILE_H), borderRadius: c(36), background: t.bg, boxShadow: `0 ${c(18)} ${c(40)} rgba(18,28,255,0.12)` }}
                data-reveal=""
              >
                <BentoArt art={art} />
                <div className="absolute flex flex-col items-start" style={{ left: c(left), top: c(contentTop), width: c(t.wide ? 350 : 384) }}>
                  <span
                    className={`border-solid font-display font-extrabold ${t.num === "lime" ? "border-brand-lime text-brand-lime" : "border-brand-blue text-brand-blue"}`}
                    style={{ padding: `${c(6)} ${c(14)}`, borderWidth: c(2), borderRadius: c(30), fontSize: c(18), lineHeight: "normal" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className={`font-display font-extrabold ${t.dark ? "text-white" : "text-brand-blue"}`}
                    style={{ marginTop: c(t.wide ? 29 : 17), fontSize: c(t.wide ? (art.titlePx ?? 30) : 26), lineHeight: "normal" }}
                  >
                    {it.title}
                  </h3>
                  <p
                    className={`font-display ${t.dark ? "text-white/90" : "text-brand-blue"}`}
                    style={{ marginTop: c(16), width: c(t.wide ? 320 : 384), fontSize: fs(t.wide ? 16 : 15, 12), lineHeight: t.wide ? 1.55 : 1.5 }}
                  >
                    {it.text}
                  </p>
                </div>
              </div>
            );
          })}

          {/* ukośny pasek haseł (obrót 2°) */}
          <div className="absolute overflow-hidden bg-brand-lime" style={{ left: c(-82.23 + 0.63), top: c(1430 + (119.8 - 64) / 2), width: c(1600), height: c(64), transform: "rotate(2deg)" }} aria-label={b3.marquee.join(", ")}>
            <div className="marquee-track absolute flex h-full items-center whitespace-nowrap font-modular text-brand-blue" style={{ left: c(40), fontSize: c(22) }}>
              {[0, 1].map((k) => (
                <span key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
                  {b3.marquee.map((m) => (
                    <span key={m} className="flex items-center">
                      <span>{m}</span>
                      <span style={{ margin: `0 ${c(18)}` }}>✦</span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
