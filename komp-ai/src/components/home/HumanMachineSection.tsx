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
/* mobile: canvas 402 szer. (1cqw = 4.02px) */
const m = (px: number) => `${(px / 4.02).toFixed(4)}cqw`;

/* pomiary z renderu (px designu, origin = góra sekcji y4537):
 * HUMAN ink x0..653, cap y94..205 (h111); MACHINE ink M x642, cap y193..303;
 * dłonie y265..689 (1440×424); linie y750.4 h3.8: x37..481.7 i x958.6..1402.3;
 * napis ink x523..915, y743..755 (cap 13.3) */
const G = {
  // top = CSS top (empirycznie: ink-offset Montserrat Black ≈ 0.156em przy lh 1)
  human: { left: -9, top: 69.8, fontPx: 155, trackPx: 7 },
  // zmiana designera: N i M mają się tylko stykać rogami (bez nachodzenia) —
  // ink M zaczyna się na x654 = koniec N, top inku M = 4742 = dół N
  machine: { left: 647, top: 185.5, fontPx: 150, strokePx: 3.5, trackPx: 13 },
  hands: { top: 265, w: 1440, h: 424 },
  lineY: 750.4, lineH: 3.83,
  lineL: { x: 37, w: 444.7 },
  lineR: { x: 958.6, w: 443.7 },
  caption: { left: 522, top: 742, fontPx: 16, trackPx: 1.57, wordPx: -0.8 },
};

/* MOBILE — pozycje z metadanych Figmy (node 423:3066, px designu 402, origin =
 * y4883 strony): litery HUMAN x-0.5/50.2/101.3/157.8/214.6 (h43-44, y4981);
 * litery MACHINE x124.3..401.5 (h39.8, y5044.8) — jak w Figmie (decyzja Patryka
 * 2026-07-16 po próbie wyrównania M pod M): E kończy się NA krawędzi ekranu,
 * ale nie jest ucięte — tracking zawężony vs Poppins default, żeby E zmieściło się
 * w 402px (w impl przed korektą wystawało poza viewport i było ucinane).
 * Gwiazda lime bleeduje 17px NAD sekcję (sliver od y4866 przy prawej krawędzi),
 * niebieska gwiazda outline (STAR_OUTLINE 423:3583, zrotowana — bbox kłamie)
 * wycięta z renderu: ink x316..384 y4908..4972. Dłonie y213..380 (402×167);
 * caption y5277.4 (Group 8 x15.14); gwiazda mała x130..172 × 5327..5378
 * (tip wychodzi 4px pod sekcję → bez overflow-hidden, sekcja z z-10). */
const GM = {
  h: 491, // 4883..5374 (pełny niebieski next sekcji)
  starBig: { left: 185, top: -17, w: 217, h: 230 },
  starBlue: { left: 312, top: 21, w: 79, h: 73 },
  human: { left: -4.5, top: 88.4, fontPx: 61.5, trackPx: 2.3 },
  machine: { left: 122, top: 155.2, fontPx: 54, strokePx: 1.5, trackPx: 3.4 },
  hands: { top: 213, w: 402, h: 167 },
  caption: { left: 14, top: 393.5, fontPx: 8.5, trackPx: 0.2, wordPx: -0.3 },
  // linie w mobile są cienkie (~1.2px, nie 2.5 jak wcześniej; desktop ma 3.8)
  lineR: { x: 188, top: 396.4, w: 214, h: 1.2 },
  lineB: { x: 0, top: 443.9, w: 125, h: 1.2 },
  // linia dolna zakręca w dół wokół małej gwiazdy do tła next sekcji —
  // krzywa + gwiazda wypieczone razem z renderu (hm-line-star-m-f.png)
  lineStar: { left: 115, top: 435, w: 106, h: 62 },
};

function HumanMachineMobile({ hm }: { hm: HumanMachineContent }) {
  return (
    <section className="relative z-10 w-full md:hidden">
      <div className="@container mx-auto w-full max-w-(--workspace)">
        {/* overflow-x-clip: box MACHINE wystaje trailing-letter-spacingiem poza
            402px (h-scroll); pionowo visible — bleedy gwiazd (17px góra, 4px dół) */}
        <div
          className="relative overflow-x-clip overflow-y-visible bg-page"
          style={{ aspectRatio: `402/${GM.h}` }}
          data-node-id="423:3066"
        >
          {/* niebieskie tło next sekcji zaczyna się w designie już na y5355 (canvas 472) —
              pas na dole POD gwiazdą małą i zakrętem linii */}
          <div className="absolute inset-x-0 bottom-0 bg-brand-blue" style={{ top: m(472) }} />
          {/* duża gwiazda lime — za tekstami; bleeduje 17px nad sekcję (jak w designie) */}
          <img
            src="/assets/hm-star-m-f2.png" alt="" aria-hidden className="absolute"
            style={{ left: m(GM.starBig.left), top: m(GM.starBig.top), width: m(GM.starBig.w), height: m(GM.starBig.h) }}
          />
          {/* niebieska gwiazda outline (STAR_OUTLINE, zrotowana) — nad limonką */}
          <img
            src="/assets/hm-star-blue-m-f.png" alt="" aria-hidden className="absolute"
            style={{ left: m(GM.starBlue.left), top: m(GM.starBlue.top), width: m(GM.starBlue.w), height: m(GM.starBlue.h) }}
            data-node-id="423:3583"
          />
          <h2
            className="absolute whitespace-nowrap font-display font-black text-brand-blue"
            style={{ left: m(GM.human.left), top: m(GM.human.top), fontSize: m(GM.human.fontPx), lineHeight: 1, letterSpacing: m(GM.human.trackPx) }}
          >
            <span className="relative z-[2]">{hm.titleTop}</span>
            <span
              className="absolute z-[1] whitespace-nowrap font-extrabold text-transparent"
              style={{
                left: m(GM.machine.left - GM.human.left), top: m(GM.machine.top - GM.human.top),
                fontFamily: "var(--font-poppins)",
                fontSize: m(GM.machine.fontPx), lineHeight: 1, letterSpacing: m(GM.machine.trackPx),
                WebkitTextStroke: `${m(GM.machine.strokePx)} var(--color-brand-blue)`,
              }}
            >
              {hm.titleBottom}
            </span>
          </h2>
          {/* dłonie (iskra i ramię gwiazdy wypieczone w cropie) */}
          <img
            src="/assets/hm-hands-m.png"
            alt="Dłoń robota i dłoń człowieka stykające się palcami"
            className="absolute left-0"
            style={{ top: m(GM.hands.top), width: m(GM.hands.w), height: m(GM.hands.h) }}
          />
          <p
            className="absolute whitespace-nowrap font-modular text-brand-blue"
            style={{
              left: m(GM.caption.left), top: m(GM.caption.top), fontSize: m(GM.caption.fontPx),
              letterSpacing: m(GM.caption.trackPx), wordSpacing: m(GM.caption.wordPx), lineHeight: 1,
            }}
          >
            {hm.caption}
          </p>
          <div className="absolute bg-brand-blue" style={{ left: m(GM.lineR.x), top: m(GM.lineR.top), width: m(GM.lineR.w), height: m(GM.lineR.h) }} />
          <div className="absolute bg-brand-blue" style={{ left: m(GM.lineB.x), top: m(GM.lineB.top), width: m(GM.lineB.w), height: m(GM.lineB.h) }} />
          {/* zakręt linii + mała gwiazda (tip wychodzi 4px pod sekcję) */}
          <img
            src="/assets/hm-line-star-m-f.png" alt="" aria-hidden className="absolute"
            style={{ left: m(GM.lineStar.left), top: m(GM.lineStar.top), width: m(GM.lineStar.w), height: m(GM.lineStar.h) }}
          />
        </div>
      </div>
    </section>
  );
}

export default function HumanMachineSection({ hm }: { hm: HumanMachineContent }) {
  return (
    <>
    <HumanMachineMobile hm={hm} />
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
    </>
  );
}
