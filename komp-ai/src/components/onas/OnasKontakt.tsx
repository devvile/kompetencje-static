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
            href="/kursy"
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
