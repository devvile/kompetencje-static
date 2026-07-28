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

const G = {
  h: 1373, // y5904..7277
  line: { y: 3, hPx: 6 }, // lime Rectangle 14 @5907
  cta: { x: 360, y: -58, w: 722, h: 117, borderPx: 5, fontPx: 42 },
  heading: { top: 182, fontPx: 22.3, trackPx: 0.1, lhPx: 35 }, // ink 6090..6187
  form: { left: 384, top: 373 },
  starL: { x: 25, y: 441, w: 360, h: 386 },
  starR: { x: 1055, y: 773, w: 340, h: 515 },
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

export function OnasKontaktMobile({ k, ctaLabel }: { k: Kontakt; ctaLabel: string }) {
  return (
    <section className="relative w-full md:hidden">
      <div className="@container mx-auto w-full max-w-(--workspace)">
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

export default function OnasKontakt({ k, ctaLabel }: { k: Kontakt; ctaLabel: string }) {
  return (
    // z-20: pill CTA bleeduje nad sekcję prowadzących (która ma z-10)
    <section id="kontakt" className="relative z-20 hidden w-full overflow-x-clip md:block">
      <div className="@container mx-auto w-full max-w-(--workspace)">
        <div className="relative bg-brand-blue" style={{ aspectRatio: `1440/${G.h}` }}>
          {/* lime linia pod CTA */}
          <div className="absolute inset-x-0 bg-brand-lime" style={{ top: c(G.line.y), height: c(G.line.hPx) }} />
          {/* gwiazdy za formularzem */}
          <img src="/assets/onas-kt-star-l-f.png" alt="" aria-hidden className="absolute"
            style={{ left: c(G.starL.x), top: c(G.starL.y), width: c(G.starL.w), height: c(G.starL.h) }} />
          <img src="/assets/onas-kt-star-r-f.png" alt="" aria-hidden className="absolute"
            style={{ left: c(G.starR.x), top: c(G.starR.y), width: c(G.starR.w), height: c(G.starR.h) }} />
          {/* CTA pill — bleed nad sekcję prowadzących */}
          <a
            href="/#kursy"
            className="absolute flex items-center justify-center rounded-full border-solid border-white bg-brand-lime font-modular text-brand-blue"
            style={{
              left: c(G.cta.x), top: c(G.cta.y), width: c(G.cta.w), height: c(G.cta.h),
              borderWidth: c(G.cta.borderPx), fontSize: c(G.cta.fontPx), lineHeight: 1,
            }}
            data-node-id="245:3883"
          >
            {ctaLabel}
          </a>
          {/* nagłówek 3 linie wycentrowany */}
          <h2
            className="absolute inset-x-0 text-center font-modular text-brand-lime"
            style={{
              top: c(G.heading.top), fontSize: c(G.heading.fontPx), letterSpacing: c(G.heading.trackPx),
              lineHeight: `${(G.heading.lhPx / 14.4).toFixed(4)}cqw`, transform: `scaleX(${SCALE_X})`,
            }}
            data-node-id="229:2294"
          >
            {k.headingLines.map((l) => (
              <span key={l} className="block">{l}</span>
            ))}
          </h2>
          <ContactFormDesktop k={k} left={G.form.left} top={G.form.top} />
        </div>
      </div>
    </section>
  );
}
