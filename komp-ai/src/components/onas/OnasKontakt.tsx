/*
 * O NAS — sekcja 5+6: CTA „POZNAJ NASZE KURSY" + kontakt (desktop y5904–7277,
 * canvas 1440×1373, bg blue). Elementy jak na home (formularz = współdzielony
 * ContactFormDesktop — potwierdzone przez Patryka: form i stopka te same);
 * inne pozycje: lime linia y5907 (h6), pill CTA (360,5846 — bleed 58px w górę
 * nad sekcję prowadzących), nagłówek 3 linie lime wycentrowany (ink 6090–6187),
 * form (384,6277), 2 STAR_OUTLINE (biel 18%) wypieczone z renderu o-nas.
 */
import type { Kontakt } from "@/content/types";
import ContactFormDesktop from "../shared/ContactFormDesktop";
import ContactFormMobile from "../shared/ContactFormMobile";

const c = (px: number) => `${(px / 14.4).toFixed(4)}cqw`;
const SCALE_X = 1.1;

export type KontaktLayout = {
  h: number;
  line: { y: number; hPx: number };
  cta: { x: number; y: number; w: number; h: number; borderPx: number; fontPx: number };
  heading: { top: number; fontPx: number; trackPx: number; lhPx: number; scaleX: number };
  /** left/top w jednostkach formularza (× scale → canvas 1440) */
  form: { left: number; top: number; scale: number };
  starL: { src: string; x: number; y: number; w: number; h: number };
  starR: { src: string; x: number; y: number; w: number; h: number };
};

const G: KontaktLayout = {
  h: 1373, // y5904..7277
  line: { y: 3, hPx: 6 }, // lime Rectangle 14 @5907
  cta: { x: 360, y: -58, w: 722, h: 117, borderPx: 5, fontPx: 42 },
  heading: { top: 182, fontPx: 22.3, trackPx: 0.1, lhPx: 35, scaleX: SCALE_X }, // ink 6090..6187
  form: { left: 384, top: 373, scale: 1 },
  starL: { src: "/assets/onas-kt-star-l-f.png", x: 25, y: 441, w: 360, h: 386 },
  starR: { src: "/assets/onas-kt-star-r-f.png", x: 1055, y: 773, w: 340, h: 515 },
};

/* mobile: canvas 402 szer. (1cqw = 4.02px) */
const cm = (px: number) => `${(px / 4.02).toFixed(4)}cqw`;

/* MOBILE — canvas 402×1356 (y10161..11517, bg blue; potem stopka). Na górze
 * pełnowidthowy pasek CTA: biała linia 6 / lime 59 / biała linia 6, tekst HK
 * blue. Nagłówek = 3 linie lime jak home-kontakt-mobile (inne topy); gwiazdy
 * STAR_ARROW = REUSE assetów home (kontakt-star-l/r-m-f); forma shared. */
const GMOB = {
  h: 1356,
  band: { h: 71, lineHPx: 6, fontPx: 22.7 }, // biały pasek 0..6, lime 6..64, biały 64..70; ink tekstu 38..365
  heading: { fontPx: 15.9, trackPx: 0.3, lines: [{ left: 105, top: 138 }, { left: 46, top: 174 }, { left: 74, top: 210 }] },
  starL: { left: 0, top: 251, w: 72, h: 69 },
  starR: { left: 330, top: 251, w: 72, h: 69 },
  form: { left: 27, top: 355 },
};

/** visibilityClass: do kiedy wariant mobile jest widoczny (o-nas: <md;
 *  /manifest: <lg). capPx: na tablecie poster nie rośnie ponad capPx —
 *  pasek CTA dociągnięty do krawędzi gradientem tła sekcji (te same
 *  proporcje: biel 0..6 / lime 6..65 / biel 65..71 z 402). */
export function OnasKontaktMobile({
  k,
  ctaLabel,
  visibilityClass = "md:hidden",
  capPx,
}: {
  k: Kontakt;
  ctaLabel: string;
  visibilityClass?: string;
  capPx?: number;
}) {
  const u = capPx ? `(min(100vw, ${capPx}px) / 402)` : "";
  const bandBg = capPx
    ? `linear-gradient(to bottom, #fff 0, #fff calc(${u} * 6), var(--color-brand-lime) calc(${u} * 6), var(--color-brand-lime) calc(${u} * 65), #fff calc(${u} * 65), #fff calc(${u} * 71), var(--color-brand-blue) calc(${u} * 71))`
    : undefined;
  return (
    <section className={`relative w-full ${visibilityClass}`} style={bandBg ? { background: bandBg } : undefined}>
      <div className="@container mx-auto w-full max-w-(--workspace)" style={capPx ? { maxWidth: capPx } : undefined}>
        <div className="relative overflow-hidden bg-brand-blue" style={{ aspectRatio: `402/${GMOB.h}` }}>
          {/* pasek CTA — pełna szerokość, lime między białymi liniami */}
          <a
            href="/#kursy"
            className="absolute inset-x-0 top-0 flex items-center justify-center whitespace-nowrap border-solid border-white bg-brand-lime font-modular text-brand-blue"
            style={{
              height: cm(GMOB.band.h),
              borderTopWidth: cm(GMOB.band.lineHPx), borderBottomWidth: cm(GMOB.band.lineHPx),
              fontSize: cm(GMOB.band.fontPx), lineHeight: 1,
            }}
          >
            {ctaLabel}
          </a>
          <h2 className="absolute inset-0">
            {k.headingLines.map((line, i) => (
              <span
                key={line}
                className="absolute block origin-top-left whitespace-nowrap font-modular text-brand-lime"
                style={{
                  left: cm(GMOB.heading.lines[i].left), top: cm(GMOB.heading.lines[i].top),
                  fontSize: cm(GMOB.heading.fontPx), letterSpacing: cm(GMOB.heading.trackPx),
                  lineHeight: 1, transform: `scaleX(${SCALE_X})`,
                }}
              >
                {line}
              </span>
            ))}
          </h2>
          <img src="/assets/kontakt-star-l-m-f.png" alt="" aria-hidden className="absolute"
            style={{ left: cm(GMOB.starL.left), top: cm(GMOB.starL.top), width: cm(GMOB.starL.w), height: cm(GMOB.starL.h) }} />
          <img src="/assets/kontakt-star-r-m-f.png" alt="" aria-hidden className="absolute"
            style={{ left: cm(GMOB.starR.left), top: cm(GMOB.starR.top), width: cm(GMOB.starR.w), height: cm(GMOB.starR.h) }} />
          <ContactFormMobile k={k} left={GMOB.form.left} top={GMOB.form.top} idPrefix="onas-kontakt-m" />
        </div>
      </div>
    </section>
  );
}

/** lineClass: kolor linii pod pillem CTA (o-nas: lime; /manifest v2: biała) */
export default function OnasKontakt({
  k,
  ctaLabel,
  lineClass = "bg-brand-lime",
  layout = G,
  visibilityClass = "hidden md:block",
}: {
  k: Kontakt;
  ctaLabel: string;
  lineClass?: string;
  /** geometria sekcji (canvas 1440); domyślnie o-nas, /manifest ma własną */
  layout?: KontaktLayout;
  /** od kiedy widoczny wariant desktop (o-nas: md; /manifest: lg) */
  visibilityClass?: string;
}) {
  const L = layout;
  return (
    // z-20: pill CTA bleeduje nad sekcję prowadzących (która ma z-10)
    <section id="kontakt" className={`relative z-20 w-full overflow-x-clip ${visibilityClass}`}>
      <div className="@container mx-auto w-full max-w-(--workspace)">
        {/* clip: dół przycina gwiazdy (nie wchodzą na stopkę), góra wolna dla pilla CTA */}
        <div className="relative bg-brand-blue" style={{ aspectRatio: `1440/${L.h}`, clipPath: "inset(-12% 0 0 0)" }}>
          {/* linia pod CTA (lime; na /manifest biała) */}
          <div className={`absolute inset-x-0 ${lineClass}`} style={{ top: c(L.line.y), height: c(L.line.hPx) }} />
          {/* gwiazdy za formularzem */}
          <img src={L.starL.src} alt="" aria-hidden className="absolute"
            style={{ left: c(L.starL.x), top: c(L.starL.y), width: c(L.starL.w), height: c(L.starL.h) }} />
          <img src={L.starR.src} alt="" aria-hidden className="absolute"
            style={{ left: c(L.starR.x), top: c(L.starR.y), width: c(L.starR.w), height: c(L.starR.h) }} />
          {/* CTA pill — bleed nad sekcję prowadzących */}
          <a
            href="/#kursy"
            className="absolute flex items-center justify-center rounded-full border-solid border-white bg-brand-lime font-modular text-brand-blue"
            style={{
              left: c(L.cta.x), top: c(L.cta.y), width: c(L.cta.w), height: c(L.cta.h),
              borderWidth: c(L.cta.borderPx), fontSize: c(L.cta.fontPx), lineHeight: 1,
            }}
            data-node-id="245:3883"
          >
            {ctaLabel}
          </a>
          {/* nagłówek 3 linie wycentrowany */}
          <h2
            className="absolute inset-x-0 text-center font-modular text-brand-lime"
            style={{
              top: c(L.heading.top), fontSize: c(L.heading.fontPx), letterSpacing: c(L.heading.trackPx),
              lineHeight: `${(L.heading.lhPx / 14.4).toFixed(4)}cqw`, transform: `scaleX(${L.heading.scaleX})`,
            }}
            data-node-id="229:2294"
          >
            {k.headingLines.map((l) => (
              <span key={l} className="block">{l}</span>
            ))}
          </h2>
          <ContactFormDesktop k={k} left={L.form.left} top={L.form.top} scale={L.form.scale} />
        </div>
      </div>
    </section>
  );
}
