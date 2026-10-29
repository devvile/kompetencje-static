import type { DnaCard, HomeManifest, RichSeg } from "../../content/types";
import FitRow from "./FitRow";
import FitText from "../shared/FitText";
import { nbspOrphans } from "../../lib/typo";

/*
 * Sekcja 3: bloki DNA — 2 karty kursu na szarym tle z chromowanymi helisami.
 * Desktop: canvas 1440×1502 (strona y2161–3663).
 * Mobile: canvas 402×1706 (strona y3184–4890); zawiera też ogon paska
 * TY DECYDUJESZ ("JAK BARDZO...", strzałka), bo leży na szarym tle z helisą.
 */

const c = (px: number) => `${(px / 14.4).toFixed(4)}cqw`;
const cm = (px: number) => `${(px / 4.02).toFixed(4)}cqw`;

function Rich({ segs, scale, strongClass }: { segs: RichSeg[]; scale: (px: number) => string; strongClass: string }) {
  return (
    <>
      {segs.map((s, i) => (
        <span key={i}>
          <span className={s.strong ? strongClass : undefined} style={s.fontPx ? { fontSize: scale(s.fontPx) } : undefined}>
            {nbspOrphans(s.text)}
          </span>
          {s.break ? <br /> : null}
        </span>
      ))}
    </>
  );
}

/* ---------- karta desktop v2 (redesign 2026-10, Figma 2315:3152 / 421:3006) ----------
 * h 542; panel: tekst | szary panel grafiki (w948); robot: grafika | tekst (w932). */
const V2 = {
  panel: { w: 948, colLeft: 84, colW: 413, titlePx: 42, bodyW: 327, ctaTop: 206, cursor: { left: 290, top: 238.5 } },
  robot: { w: 932, colLeft: 512, colW: 392, titlePx: 40, bodyW: 313, ctaTop: 189, cursor: { left: 284, top: 220.5 } },
} as const;

function CardDesktopV2({ card, art }: { card: DnaCard; art: NonNullable<DnaCard["art"]> }) {
  const L = V2[art.kind];
  return (
    <div
      className="relative bg-brand-blue"
      style={{ width: c(L.w), height: c(542), borderRadius: c(40), filter: "drop-shadow(0.3472cqw 0.4167cqw 0.5208cqw rgba(0,24,84,0.3))" }}
    >
      {/* sidebar: obrócony lime pasek */}
      <div className="absolute inset-y-0 left-0 flex items-center justify-center" style={{ width: c(84) }}>
        <div className="-rotate-90">
          <FitRow
            className="flex items-center justify-end bg-brand-lime text-brand-blue"
            style={{ width: c(542), height: c(84), paddingLeft: c(40), paddingRight: c(40), borderTopLeftRadius: c(40), borderTopRightRadius: c(40) }}
            innerGap={c(29)}
          >
            <p className="whitespace-nowrap font-modular" style={{ fontSize: c(12), lineHeight: 1.11 }}>{card.price}</p>
            <div className="flex items-center" style={{ gap: c(13) }}>
              <p className="whitespace-nowrap font-modular" style={{ fontSize: c(12), lineHeight: 1.483 }}>{card.leadLabel}</p>
              <p className="whitespace-nowrap font-display font-black" style={{ fontSize: c(15), lineHeight: 1.483 }}>{card.leadName}</p>
            </div>
          </FitRow>
        </div>
      </div>

      {/* grafika */}
      {art.kind === "panel" ? (
        <div className="absolute top-0 overflow-hidden bg-page" style={{ left: c(497), width: c(451), height: c(542), borderTopRightRadius: c(40), borderBottomRightRadius: c(40) }}>
          <img src={art.src} alt="" className="h-full w-full" data-node-id="2317:3152" />
        </div>
      ) : (
        <div className="absolute" style={{ left: c(84), top: c(-14), width: c(442), height: c(557) }} data-node-id="2184:2303">
          <img src={art.src} alt="" className="absolute max-w-none object-contain" style={{ left: 0, top: c(17), width: c(442), height: c(540) }} />
          {/* gwiazdki: Figma rotate 22.14° / 67.84° wokół środków ramek 148.29 / 38.21 */}
          <img src="/assets/gwiazdka-curved-lime.svg" alt="" className="absolute max-w-none" style={{ left: c(32.18 + (148.289 - 113.791) / 2), top: c(90.18 + (148.289 - 113.791) / 2), width: c(113.791), height: c(113.791), transform: "rotate(22.14deg)" }} />
          <img src="/assets/gwiazdka-curved-lime.svg" alt="" className="absolute max-w-none" style={{ left: c(60 + (38.212 - 29.32) / 2), top: c(81 + (38.212 - 29.32) / 2), width: c(29.32), height: c(29.32), transform: "rotate(67.84deg)" }} />
        </div>
      )}

      {/* kolumna tekstu (h554 wyśrodkowana na 542 — jak w designie) */}
      <div
        className="absolute flex flex-col justify-center"
        style={{ left: c(L.colLeft), top: c(-6), width: c(L.colW), height: c(554), paddingTop: c(65), paddingBottom: c(40), paddingLeft: c(26) }}
      >
        <div className="flex flex-col items-start" style={{ gap: c(23), paddingLeft: c(11), paddingRight: c(11) }}>
          <div className="flex flex-col items-start" style={{ gap: c(16) }}>
            <h3 className="whitespace-nowrap font-display font-black text-white" style={{ fontSize: c(L.titlePx), lineHeight: 1.03 }}>
              {card.titleLines[0]}
              <br />
              {card.titleLines[1]}
              <br />
              <span className="text-brand-lime">{card.titleLines[2]}</span>
            </h3>
            {card.pill && (
              <p
                className="flex items-center whitespace-nowrap border-solid border-brand-lime font-display"
                style={{ gap: c(8), paddingLeft: c(16), paddingRight: c(18), paddingTop: c(9), paddingBottom: c(9), borderWidth: c(1.5), borderRadius: c(24), lineHeight: "normal" }}
              >
                <span className="font-bold text-brand-lime" style={{ fontSize: c(13) }} aria-hidden>✦</span>
                <span className="font-semibold text-white" style={{ fontSize: c(14) }}>{card.pill}</span>
              </p>
            )}
          </div>
          <div className="relative" style={{ width: c(L.bodyW), height: c(282) }}>
            <p className="absolute inset-x-0 top-0 font-body font-light text-white" style={{ fontSize: c(15), lineHeight: 1.11, textAlign: "justify" as const }}>
              <Rich segs={card.body} scale={c} strongClass="font-semibold" />
            </p>
            <a
              href={card.ctaHref}
              className="absolute inset-x-0 flex items-center justify-center border-solid border-white bg-brand-lime font-modular text-brand-blue"
              style={{ top: c(L.ctaTop), height: c(55), borderRadius: c(40), borderWidth: c(3), fontSize: c(14), letterSpacing: c(0.56) }}
            >
              {card.ctaLabel}
            </a>
            {/* kursor przy przycisku (Big Button z designu) */}
            <img
              src="/assets/kursor.svg"
              alt=""
              aria-hidden
              className="pointer-events-none absolute max-w-none"
              style={{ left: c(L.cursor.left + (32.188 - 23.884) / 2), top: c(L.cursor.top + (40.711 - 35.826) / 2), width: c(23.884), height: c(35.826), transform: "rotate(-14.69deg)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- karta desktop 904×554 (stary układ — gdy karta nie ma `art`) ---------- */
function CardDesktop({ card }: { card: DnaCard }) {
  if (card.art) return <CardDesktopV2 card={card} art={card.art} />;
  return (
    <div
      className="relative flex items-center justify-between bg-brand-blue"
      style={{
        width: c(904),
        height: c(554),
        borderRadius: c(40),
        filter: "drop-shadow(0.3472cqw 0.4167cqw 0.5208cqw rgba(0,24,84,0.3))",
      }}
    >
      {/* sidebar: obrocony lime pasek */}
      <div className="flex h-full shrink-0 items-center justify-center" style={{ width: c(84) }}>
        <div className="-rotate-90">
          <FitRow
            className="flex items-center justify-end bg-brand-lime text-brand-blue"
            style={{ width: c(557), height: c(84), paddingLeft: c(60), paddingRight: c(60), borderTopLeftRadius: c(40), borderTopRightRadius: c(40) }}
            innerGap={c(55)}
          >
            <p className="whitespace-nowrap font-modular" style={{ fontSize: c(12), lineHeight: 1.11 }}>{card.price}</p>
            <div className="flex items-center" style={{ gap: c(13) }}>
              <p className="whitespace-nowrap font-modular" style={{ fontSize: c(12), lineHeight: 1.483 }}>{card.leadLabel}</p>
              <p className="whitespace-nowrap font-display font-black" style={{ fontSize: c(18), lineHeight: 1.483 }}>{card.leadName}</p>
            </div>
          </FitRow>
        </div>
      </div>
      {/* środek */}
      <div className="flex h-full shrink-0 flex-col items-center" style={{ width: c(364), gap: c(37), paddingTop: c(46) }}>
        {/* linie tytułu: FitText zmniejsza stopień linii szerszej niż slot
            297px (np. „Z ROZMOWY" 312px @45) — CMS-proof, krótkie linie
            renderują się 1:1 jak dotąd */}
        <h3 className="font-display font-black text-white" style={{ width: c(297), fontSize: c(45), lineHeight: 1.03 }}>
          <FitText>{card.titleLines[0]}</FitText>
          <FitText>{card.titleLines[1]}</FitText>
          <FitText className="text-brand-lime">{card.titleLines[2]}</FitText>
        </h3>
        <div className="relative" style={{ width: c(292), height: c(308) }}>
          <p className="absolute inset-x-0 top-0 font-body font-light text-white" style={{ fontSize: c(15), lineHeight: 1.11, textAlign: "justify" as const }}>
            <Rich segs={card.body} scale={c} strongClass="font-semibold" />
          </p>
          <a
            href={card.ctaHref}
            className="absolute inset-x-0 flex items-center justify-center border-solid border-white bg-brand-lime font-modular text-brand-blue"
            style={{ top: c(212), height: c(55), borderRadius: c(40), borderWidth: c(3), fontSize: c(14), letterSpacing: c(0.56) }}
          >
            {card.ctaLabel}
          </a>
        </div>
      </div>
      {/* zdjęcie */}
      <div className="h-full shrink-0 overflow-hidden" style={{ width: c(415), borderTopRightRadius: c(40), borderBottomRightRadius: c(40) }}>
        <img src={card.photo} alt="" className="h-full w-full" style={{ objectFit: "fill" }} />
      </div>
    </div>
  );
}

/* pigułka „✦ tekst" (Figma Pigułka 2208:1786, mobile: Montserrat SemiBold 11) */
function PillMobile({ text }: { text: string }) {
  return (
    <p
      className="flex items-center whitespace-nowrap border-solid border-brand-lime font-display font-semibold"
      style={{ gap: cm(8), paddingLeft: cm(16), paddingRight: cm(18), paddingTop: cm(9), paddingBottom: cm(9), borderWidth: cm(1.5), borderRadius: cm(999), fontSize: cm(11), lineHeight: 1.2 }}
    >
      <span className="text-brand-lime" aria-hidden>✦</span>
      <span className="text-white">{text}</span>
    </p>
  );
}

/* ---------- karta mobile v2 z robotem (Figma 2256:3821, 362×841) ---------- */
function CardMobileRobot({ card, src }: { card: DnaCard; src: string }) {
  return (
    <div
      className="relative flex items-center bg-brand-blue"
      style={{ width: cm(362), height: cm(841), borderRadius: cm(40), filter: "drop-shadow(1.2438cqw 0.995cqw 1.8657cqw rgba(0,3,76,0.2))" }}
    >
      <div className="flex h-full shrink-0 items-center justify-center" style={{ width: cm(46) }}>
        <div className="-rotate-90">
          <FitRow
            className="flex items-center justify-end bg-brand-lime text-brand-blue"
            style={{ width: cm(841), height: cm(46), paddingLeft: cm(60), paddingRight: cm(60), borderTopLeftRadius: cm(40), borderTopRightRadius: cm(40) }}
            innerGap={cm(87)}
          >
            <p className="whitespace-nowrap font-modular" style={{ fontSize: cm(12), lineHeight: 1.11 }}>{card.price}</p>
            <div className="flex items-center" style={{ gap: cm(13) }}>
              <p className="whitespace-nowrap font-modular" style={{ fontSize: cm(12), lineHeight: 1.483 }}>{card.leadLabel}</p>
              <p className="whitespace-nowrap font-display font-black" style={{ fontSize: cm(18), lineHeight: 1.483 }}>{card.leadName}</p>
            </div>
          </FitRow>
        </div>
      </div>
      <div className="flex flex-col items-center" style={{ width: cm(316), gap: cm(27) }}>
        <div className="flex w-full flex-col items-start">
          <div className="flex w-full flex-col items-center" style={{ gap: cm(12), marginBottom: cm(-5) }}>
            <h3 className="font-display font-black text-white" style={{ width: cm(262), fontSize: cm(28), lineHeight: 1.03, textAlign: "right" as const }}>
              {card.titleLines[0]}
              <br />
              {card.titleLines[1]}
              <br />
              <span className="text-brand-lime">{card.titleLines[2]}</span>
            </h3>
            {card.pill && (
              <div className="flex w-full justify-end" style={{ paddingRight: cm(27) }}>
                <PillMobile text={card.pill} />
              </div>
            )}
          </div>
          {/* grafika robota + 2 limonkowe gwiazdki (2263:2750 / 2263:2752, obrót jak desktop;
              pozycje względem karty − sidebar 46 / − top boxu grafiki ≈161.5 z renderu) */}
          <div className="relative" style={{ width: cm(316), height: cm(343.08) }}>
            <img src={src} alt="" className="absolute inset-0 h-full w-full object-contain" />
            <img src="/assets/gwiazdka-curved-lime.svg" alt="" className="absolute max-w-none" style={{ left: cm(108.25 - 46 + (94.213 - 72.29) / 2), top: cm(206.83 - 161.5 + (94.213 - 72.29) / 2), width: cm(72.29), height: cm(72.29), transform: "rotate(22.14deg)" }} />
            <img src="/assets/gwiazdka-curved-lime.svg" alt="" className="absolute max-w-none" style={{ left: cm(115.93 - 46 + (24.277 - 18.63) / 2), top: cm(201 - 161.5 + (24.277 - 18.63) / 2), width: cm(18.63), height: cm(18.63), transform: "rotate(67.84deg)" }} />
          </div>
        </div>
        <p className="font-body font-light text-white" style={{ width: cm(262), fontSize: cm(15), lineHeight: 1.11, textAlign: "justify" as const }}>
          <Rich segs={card.body} scale={cm} strongClass="font-semibold" />
        </p>
        <a
          href={card.ctaHref}
          className="flex items-center justify-center border-solid border-white bg-brand-lime font-modular text-brand-blue"
          style={{ width: cm(262), height: cm(55), borderRadius: cm(40), borderWidth: cm(3), fontSize: cm(14), letterSpacing: cm(0.56) }}
        >
          {card.ctaLabel}
        </a>
      </div>
    </div>
  );
}

/* ---------- karta mobile 362×715 ---------- */
function CardMobile({ card }: { card: DnaCard }) {
  if (card.art?.kind === "robot") return <CardMobileRobot card={card} src={card.art.src} />;
  return (
    <div
      className="relative flex items-start bg-brand-blue"
      style={{ width: cm(362), height: cm(715), borderRadius: cm(40), filter: "drop-shadow(1.2438cqw 0.995cqw 1.8657cqw rgba(0,3,76,0.2))" }}
    >
      {/* sidebar */}
      <div className="flex h-full shrink-0 items-center justify-center" style={{ width: cm(46) }}>
        <div className="-rotate-90">
          <FitRow
            className="flex items-center justify-end bg-brand-lime text-brand-blue"
            style={{ width: cm(715), height: cm(46), paddingLeft: cm(60), paddingRight: cm(60), borderTopLeftRadius: cm(40), borderTopRightRadius: cm(40) }}
            innerGap={cm(179)}
          >
            <p className="whitespace-nowrap font-modular" style={{ fontSize: cm(12), lineHeight: 1.11 }}>{card.price}</p>
            <div className="flex items-center" style={{ gap: cm(13) }}>
              <p className="whitespace-nowrap font-modular" style={{ fontSize: cm(12), lineHeight: 1.483 }}>{card.leadLabel}</p>
              <p className="whitespace-nowrap font-display font-black" style={{ fontSize: cm(18), lineHeight: 1.483 }}>{card.leadName}</p>
            </div>
          </FitRow>
        </div>
      </div>
      {/* treść */}
      <div
        className="flex flex-col items-center"
        style={card.pill ? { width: cm(316), gap: cm(20), alignSelf: "center" } : { width: cm(316), gap: cm(28), paddingTop: cm(47) }}
      >
        <h3 className="font-display font-black text-white" style={{ width: cm(262), fontSize: cm(28), lineHeight: 1.03, textAlign: "right" as const }}>
          {card.titleLines[0]}
          <br />
          {card.titleLines[1]}
          <br />
          <span className="text-brand-lime">{card.titleLines[2]}</span>
        </h3>
        {card.pill && (
          <div className="flex w-full justify-end" style={{ paddingRight: cm(27) }}>
            <PillMobile text={card.pill} />
          </div>
        )}
        <div className="relative overflow-hidden" style={{ width: cm(316), height: cm(210.3), borderRadius: cm(20) }}>
          <img src={card.photoM} alt="" className="h-full w-full object-cover" />
        </div>
        <p className="font-body font-light text-white" style={{ width: cm(262), fontSize: cm(15), lineHeight: 1.16, textAlign: "justify" as const }}>
          <Rich segs={card.body} scale={cm} strongClass="font-semibold" />
        </p>
        <a
          href={card.ctaHref}
          className="flex items-center justify-center border-solid border-white bg-brand-lime font-modular text-brand-blue"
          style={{ width: cm(262), height: cm(55), borderRadius: cm(40), borderWidth: cm(3), fontSize: cm(14), letterSpacing: cm(0.56) }}
        >
          {card.ctaLabel}
        </a>
      </div>
    </div>
  );
}

/* ---------- desktop ---------- */
const G = {
  // redesign 2026-10: canvas = strona y2881..4383; helisy 1 i 3 = nowe eksporty 2x
  // (tło #efefef wypieczone = tło sekcji), pozycje z dopasowania do renderu
  dna1: { left: 0, top: 89, w: 556.5, h: 467 },
  dna2: { left: 1019.5, top: 253.8, w: 420.5, h: 490 },
  dna3: { left: 0, top: 973, w: 547.5, h: 559.5 },
  card1: { left: 185, top: 88 }, // redesign 2026-10: strona y2969 - 2881
  card2: { left: 425, top: 788 },
  arrow: { left: 214, top: 745, w: 106, h: 174 }, // STAR_ARROW 423:3027 wycięty z renderu
};

function DnaDesktop({ cards }: { cards: DnaCard[] }) {
  return (
    <section className="relative w-full">
      <div className="@container mx-auto w-full max-w-(--workspace)">
        <div className="relative aspect-[1440/1502] overflow-hidden bg-page">
          <img src="/assets/dna1-v2.webp" alt="" className="absolute max-w-none" style={{ left: c(G.dna1.left), top: c(G.dna1.top), width: c(G.dna1.w), height: c(G.dna1.h) }} data-node-id="421:3001" />
          <img src="/assets/dna2-f.png" alt="" className="absolute max-w-none" style={{ left: c(G.dna2.left), top: c(G.dna2.top), width: c(G.dna2.w), height: c(G.dna2.h) }} data-node-id="421:3003" />
          <img src="/assets/dna3-v2.webp" alt="" className="absolute max-w-none" style={{ left: c(G.dna3.left), top: c(G.dna3.top), width: c(G.dna3.w), height: c(G.dna3.h) }} data-node-id="421:3005" />
          <img src="/assets/dna-arrow-v2-f.png" alt="" className="absolute" style={{ left: c(G.arrow.left), top: c(G.arrow.top), width: c(G.arrow.w), height: c(G.arrow.h) }} data-node-id="423:3027" />
          <div className="absolute" style={{ left: c(G.card1.left), top: c(G.card1.top) }} data-node-id="412:2961">
            <CardDesktop card={cards[0]} />
          </div>
          <div className="absolute" style={{ left: c(G.card2.left), top: c(G.card2.top) }} data-node-id="421:3006">
            <CardDesktop card={cards[1]} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- mobile ---------- */
/* redesign 2026-10: canvas = od końca karty webinaru (strona y4530) do kafli
 * „NIE CZEKAJ" (y6310, ukryte) → 402×1780. JAK BARDZO + pasek haseł są teraz
 * w ManifestBarMobile. Dekoracje trzymają stary układ względem karty 2. */
const GMD = {
  h: 1780,
  card1: { left: 20, top: 69.08 },
  dna1: { left: 185.5, top: 677.5, w: 216.5, h: 268.5 }, // 423:3059
  dna3: { left: 0, top: 744, w: 110, h: 237 }, // 423:3060 — nowy eksport 2x
  star: { left: 226, top: 812, w: 36, h: 34 }, // dopasowane do renderu
  arrow: { left: 289.4, top: 833.9, w: 121, h: 116 },
  card2: { left: 20, top: 924 },
};

function DnaMobile({ cards }: { cards: DnaCard[] }) {
  return (
    <section className="relative w-full md:hidden">
      <div className="@container mx-auto w-full">
        <div className="relative overflow-hidden bg-page" style={{ aspectRatio: `402/${GMD.h}` }}>
          <img src="/assets/m-dna1-f.png" alt="" className="absolute max-w-none" style={{ left: cm(GMD.dna1.left), top: cm(GMD.dna1.top), width: cm(GMD.dna1.w), height: cm(GMD.dna1.h) }} data-node-id="423:3059" />
          <img src="/assets/m-dna3-v2.webp" alt="" className="absolute max-w-none" style={{ left: cm(GMD.dna3.left), top: cm(GMD.dna3.top), width: cm(GMD.dna3.w), height: cm(GMD.dna3.h) }} data-node-id="423:3060" />
          <div className="absolute" style={{ left: cm(GMD.card1.left), top: cm(GMD.card1.top) }} data-node-id="412:2925">
            <CardMobile card={cards[0]} />
          </div>
          <img src="/assets/m-dna-star-f.png" alt="" className="absolute" style={{ left: cm(GMD.star.left), top: cm(GMD.star.top), width: cm(GMD.star.w), height: cm(GMD.star.h) }} data-node-id="423:3061" />
          <img src="/assets/m-dna-arrow-f.png" alt="" className="absolute" style={{ left: cm(GMD.arrow.left), top: cm(GMD.arrow.top), width: cm(GMD.arrow.w), height: cm(GMD.arrow.h) }} data-node-id="381:1882" />
          <div className="absolute" style={{ left: cm(GMD.card2.left), top: cm(GMD.card2.top) }} data-node-id="2256:3821">
            <CardMobile card={cards[1]} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function DnaSection({ cards, m }: { cards: DnaCard[]; m: HomeManifest }) {
  return (
    // kotwica nav "KURSY" (/#kursy): landing wyrównany do 2 wyróżnionych kursów
    <div id="kursy">
      <div className="hidden md:block">
        <DnaDesktop cards={cards} />
      </div>
      <DnaMobile cards={cards} />
    </div>
  );
}
