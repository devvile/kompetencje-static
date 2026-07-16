/*
 * Sekcja 5: HUMAN and MACHINE (desktop 1440×810, strona y4537–5347).
 * Napisy w designie to krzywe — tu prawdziwe fonty (SEO): HUMAN solid Montserrat
 * Black, MACHINE outline (text-stroke). Dłonie = jeden obraz z renderu
 * (robot + iskra + dłoń człowieka — z-order wypieczony; kreski MACHINE
 * usunięte inpaintingiem, prawdziwy napis idzie NAD zdjęciem jak w designie).
 * Iskra do wydzielenia z warstwy przy animacjach (Faza 2).
 */

export interface HumanMachineContent {
  titleTop: string; // HUMAN
  titleBottom: string; // MACHINE
  caption: string; // THE FUTURE OF COLLABORATION
}

const c = (px: number) => `${(px / 14.4).toFixed(4)}cqw`;

/* pomiary z renderu (px designu, origin = góra sekcji y4537):
 * HUMAN ink x0..653, cap y94..205 (h111); MACHINE ink M x642, cap y193..303;
 * dłonie y265..689 (1440×424); linie y750.4 h3.8: x37..481.7 i x958.6..1402.3;
 * napis ink x523..915, y743..755 (cap 13.3) */
const G = {
  // top = CSS top (empirycznie: ink-offset Montserrat Black ≈ 0.156em przy lh 1)
  human: { left: -9, top: 69.8, fontPx: 155, trackPx: 7 },
  machine: { left: 635, top: 173, fontPx: 150, strokePx: 3.5, trackPx: 13 },
  // "&" w przerwie między N (koniec x653, dół y205) a górą M (y190) — poza designem
  amp: { left: 668, top: 118, fontPx: 60 },
  hands: { top: 265, w: 1440, h: 424 },
  lineY: 750.4, lineH: 3.83,
  lineL: { x: 37, w: 444.7 },
  lineR: { x: 958.6, w: 443.7 },
  caption: { left: 522, top: 742, fontPx: 16, trackPx: 1.57, wordPx: -0.8 },
};

export default function HumanMachineSection({ hm }: { hm: HumanMachineContent }) {
  return (
    <section className="relative hidden w-full md:block">
      <div className="@container mx-auto w-full max-w-(--workspace)">
        <div className="relative aspect-[1440/810] overflow-hidden bg-page" data-node-id="245:9699">
          {/* dłonie (robot + iskra + człowiek) — POD napisami (MACHINE nachodzi na ramię) */}
          <img
            src="/assets/hm-hands.png"
            alt="Dłoń robota i dłoń człowieka stykające się palcami"
            className="absolute left-0"
            style={{ top: c(G.hands.top), width: c(G.hands.w), height: c(G.hands.h) }}
            data-node-id="245:9356"
          />
          {/* HUMAN — solid */}
          <h2
            className="absolute whitespace-nowrap font-display font-black text-brand-blue"
            style={{
              left: c(G.human.left), top: c(G.human.top),
              fontSize: c(G.human.fontPx), lineHeight: 1, letterSpacing: c(G.human.trackPx),
            }}
            data-node-id="245:9368"
          >
            {/* HUMAN nad konturem MACHINE (z-index) — jak w designie N przykrywa róg M */}
            <span className="relative z-[2]">{hm.titleTop}</span>
            {/* MACHINE — outline; Poppins, bo kontury Montserrat mają
                samoprzecinające się ścieżki i stroke pokazuje szwy glifów */}
            <span
              className="absolute z-[1] whitespace-nowrap font-extrabold text-transparent"
              style={{
                left: c(G.machine.left - G.human.left),
                top: c(G.machine.top - G.human.top),
                fontFamily: "var(--font-poppins)",
                fontSize: c(G.machine.fontPx), lineHeight: 1, letterSpacing: c(G.machine.trackPx),
                WebkitTextStroke: `${c(G.machine.strokePx)} var(--color-brand-blue)`,
              }}
            >
              {hm.titleBottom}
            </span>
            {/* "&" między słowami — życzenie Patryka (brak w oryginalnym designie) */}
            <span
              className="absolute z-[2] font-display font-black text-brand-blue"
              style={{
                left: c(G.amp.left - G.human.left), top: c(G.amp.top - G.human.top),
                fontSize: c(G.amp.fontPx), lineHeight: 1,
              }}
            >
              &amp;
            </span>
          </h2>
          {/* podpis z liniami */}
          <div className="absolute bg-brand-blue" style={{ left: c(G.lineL.x), top: c(G.lineY), width: c(G.lineL.w), height: c(G.lineH) }} />
          <div className="absolute bg-brand-blue" style={{ left: c(G.lineR.x), top: c(G.lineY), width: c(G.lineR.w), height: c(G.lineH) }} />
          <p
            className="absolute whitespace-nowrap font-modular text-brand-blue"
            style={{
              left: c(G.caption.left), top: c(G.caption.top), fontSize: c(G.caption.fontPx),
              letterSpacing: c(G.caption.trackPx), wordSpacing: c(G.caption.wordPx), lineHeight: 1,
            }}
            data-node-id="245:9458"
          >
            {hm.caption}
          </p>
        </div>
      </div>
    </section>
  );
}
