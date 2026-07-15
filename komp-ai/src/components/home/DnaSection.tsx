import type { DnaCard, HomeManifest, RichSeg } from "../../content/types";

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
            {s.text}
          </span>
          {s.break ? <br /> : null}
        </span>
      ))}
    </>
  );
}

/* ---------- karta desktop 904×554 ---------- */
function CardDesktop({ card }: { card: DnaCard }) {
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
          <div
            className="flex items-center justify-end bg-brand-lime text-brand-blue"
            style={{ width: c(557), height: c(84), gap: c(55), paddingLeft: c(60), paddingRight: c(60), borderTopLeftRadius: c(40), borderTopRightRadius: c(40) }}
          >
            <p className="whitespace-nowrap font-modular" style={{ fontSize: c(12), lineHeight: 1.11 }}>{card.price}</p>
            <div className="flex items-center" style={{ gap: c(13) }}>
              <p className="whitespace-nowrap font-modular" style={{ fontSize: c(12), lineHeight: 1.483 }}>{card.leadLabel}</p>
              <p className="whitespace-nowrap font-display font-black" style={{ fontSize: c(18), lineHeight: 1.483 }}>{card.leadName}</p>
            </div>
          </div>
        </div>
      </div>
      {/* środek */}
      <div className="flex h-full shrink-0 flex-col items-center" style={{ width: c(364), gap: c(37), paddingTop: c(46) }}>
        <h3 className="font-display font-black text-white" style={{ width: c(297), fontSize: c(45), lineHeight: 1.03 }}>
          {card.titleLines[0]}
          <br />
          {card.titleLines[1]}
          <br />
          <span className="text-brand-lime">{card.titleLines[2]}</span>
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
        <img src="/assets/card-waga-src.png" alt="" className="h-full w-full" style={{ objectFit: "fill" }} />
      </div>
    </div>
  );
}

/* ---------- karta mobile 362×715 ---------- */
function CardMobile({ card }: { card: DnaCard }) {
  return (
    <div
      className="relative flex items-start bg-brand-blue"
      style={{ width: cm(362), height: cm(715), borderRadius: cm(40), filter: "drop-shadow(1.2438cqw 0.995cqw 1.8657cqw rgba(0,3,76,0.2))" }}
    >
      {/* sidebar */}
      <div className="flex h-full shrink-0 items-center justify-center" style={{ width: cm(46) }}>
        <div className="-rotate-90">
          <div
            className="flex items-center justify-end bg-brand-lime text-brand-blue"
            style={{ width: cm(715), height: cm(46), gap: cm(179), paddingLeft: cm(60), paddingRight: cm(60), borderTopLeftRadius: cm(40), borderTopRightRadius: cm(40) }}
          >
            <p className="whitespace-nowrap font-modular" style={{ fontSize: cm(12), lineHeight: 1.11 }}>{card.price}</p>
            <div className="flex items-center" style={{ gap: cm(13) }}>
              <p className="whitespace-nowrap font-modular" style={{ fontSize: cm(12), lineHeight: 1.483 }}>{card.leadLabel}</p>
              <p className="whitespace-nowrap font-display font-black" style={{ fontSize: cm(18), lineHeight: 1.483 }}>{card.leadName}</p>
            </div>
          </div>
        </div>
      </div>
      {/* treść */}
      <div className="flex flex-col items-center" style={{ width: cm(316), gap: cm(28), paddingTop: cm(47) }}>
        <h3 className="font-display font-black text-white" style={{ width: cm(262), fontSize: cm(28), lineHeight: 1.03, textAlign: "right" as const }}>
          {card.titleLines[0]}
          <br />
          {card.titleLines[1]}
          <br />
          <span className="text-brand-lime">{card.titleLines[2]}</span>
        </h3>
        <div className="relative overflow-hidden" style={{ width: cm(316), height: cm(210.3), borderRadius: cm(20) }}>
          <img src="/assets/m-card-photo-r.png" alt="" className="h-full w-full" />
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
  dna1: { left: 0, top: 97.1, w: 582.5, h: 467 }, // strona 2258.1 → -2161
  dna2: { left: 1019.5, top: 253.8, w: 420.5, h: 490 },
  dna3: { left: -22.1, top: 984.3, w: 547.5, h: 559.5 },
  card1: { left: 239, top: 103 },
  card2: { left: 425, top: 776 },
  star: { left: 216.2, top: 648.2, w: 140, h: 133 },
  arrow: { left: 102.7, top: 656, w: 345, h: 358 },
};

function DnaDesktop({ cards }: { cards: DnaCard[] }) {
  return (
    <section className="relative w-full">
      <div className="@container mx-auto w-full max-w-(--workspace)">
        <div className="relative aspect-[1440/1502] overflow-hidden bg-page">
          <img src="/assets/dna-export-f.png" alt="" className="absolute max-w-none" style={{ left: c(G.dna1.left), top: c(G.dna1.top), width: c(G.dna1.w), height: c(G.dna1.h) }} data-node-id="421:3001" />
          <img src="/assets/dna2-f.png" alt="" className="absolute max-w-none" style={{ left: c(G.dna2.left), top: c(G.dna2.top), width: c(G.dna2.w), height: c(G.dna2.h) }} data-node-id="421:3003" />
          <img src="/assets/dna3-f.png" alt="" className="absolute max-w-none" style={{ left: c(G.dna3.left), top: c(G.dna3.top), width: c(G.dna3.w), height: c(G.dna3.h) }} data-node-id="421:3005" />
          <img src="/assets/dna-arrow-f.png" alt="" className="absolute" style={{ left: c(G.arrow.left), top: c(G.arrow.top), width: c(G.arrow.w), height: c(G.arrow.h) }} data-node-id="423:3027" />
          <img src="/assets/dna-star-outline-f.png" alt="" className="absolute" style={{ left: c(G.star.left), top: c(G.star.top), width: c(G.star.w), height: c(G.star.h) }} data-node-id="423:3036" />
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
const GMD = {
  blueStrip: { top: 1, h: 2 }, // strona 3185-3186
  dna2: { left: 16.2, top: -1, w: 181.5, h: 237 },
  jakBardzo: { right: 402 - 367, top: 27, w: 209, fontPx: 12 },
  arrowBar: { left: 134.4, top: 25.5, w: 71.5, h: 71.5 },
  card1: { left: 20, top: 129 },
  dna1: { left: 185.5, top: 737.5, w: 216.5, h: 268.5 }, // strona 3921.5
  star: { left: 235, top: 877, w: 36, h: 34 },
  arrow: { left: 289.4, top: 893.9, w: 121, h: 116 },
  card2: { left: 20, top: 984 },
};

function DnaMobile({ cards, m }: { cards: DnaCard[]; m: HomeManifest }) {
  return (
    <section className="relative w-full md:hidden">
      <div className="@container mx-auto w-full">
        <div className="relative aspect-[402/1706] overflow-hidden bg-page">
          <img src="/assets/m-dna2-f.png" alt="" className="absolute max-w-none" style={{ left: cm(GMD.dna2.left), top: cm(GMD.dna2.top), width: cm(GMD.dna2.w), height: cm(GMD.dna2.h) }} data-node-id="423:3060" />
          <div className="absolute inset-x-0 bg-brand-blue" style={{ top: cm(GMD.blueStrip.top), height: `max(1px, ${cm(GMD.blueStrip.h)})` }} />
          <p className="absolute font-modular text-black" style={{ right: cm(GMD.jakBardzo.right), top: cm(GMD.jakBardzo.top), width: cm(GMD.jakBardzo.w), fontSize: cm(GMD.jakBardzo.fontPx), lineHeight: 1.483, textAlign: "right" as const }} data-node-id="375:1864">
            {m.bar.right.toUpperCase()}
          </p>
          <img src="/assets/m-arrow-bar-f.png" alt="" className="absolute" style={{ left: cm(GMD.arrowBar.left), top: cm(GMD.arrowBar.top), width: cm(GMD.arrowBar.w), height: cm(GMD.arrowBar.h) }} data-node-id="423:3574" />
          <img src="/assets/m-dna1-f.png" alt="" className="absolute max-w-none" style={{ left: cm(GMD.dna1.left), top: cm(GMD.dna1.top), width: cm(GMD.dna1.w), height: cm(GMD.dna1.h) }} data-node-id="423:3059" />
          <div className="absolute" style={{ left: cm(GMD.card1.left), top: cm(GMD.card1.top) }} data-node-id="412:2925">
            <CardMobile card={cards[0]} />
          </div>
          <img src="/assets/m-dna-star-f.png" alt="" className="absolute" style={{ left: cm(GMD.star.left), top: cm(GMD.star.top), width: cm(GMD.star.w), height: cm(GMD.star.h) }} data-node-id="423:3061" />
          <img src="/assets/m-dna-arrow-f.png" alt="" className="absolute" style={{ left: cm(GMD.arrow.left), top: cm(GMD.arrow.top), width: cm(GMD.arrow.w), height: cm(GMD.arrow.h) }} data-node-id="381:1882" />
          <div className="absolute" style={{ left: cm(GMD.card2.left), top: cm(GMD.card2.top) }} data-node-id="423:3041">
            <CardMobile card={cards[1]} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function DnaSection({ cards, m }: { cards: DnaCard[]; m: HomeManifest }) {
  return (
    <>
      <div className="hidden md:block">
        <DnaDesktop cards={cards} />
      </div>
      <DnaMobile cards={cards} m={m} />
    </>
  );
}
