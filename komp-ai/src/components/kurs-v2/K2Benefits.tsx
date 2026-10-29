/*
 * KURS v2 — „Co zyskasz na kursie?" (node 2010:1974, design y827..2622) +
 * pasek CTA „Gotowy…" (2010:1999, y2622..2884).
 * Panel blue r96, karty na przemian (lewo/prawo) w polu 1088×1432 z lime
 * strzałkami między nimi (eksporty SVG instancji STAR_ARROW 2060:1999/2008/
 * 2017 z wyciętym tłem — rotacje wypieczone). Karty mają min-height zamiast
 * sztywnej wysokości (podłogi fontów na laptopach).
 */
import type { KursV2Page } from "@/content/types";
import { c, fs, ENROLL_ID, K2_MAX_W, ENROLL_OPEN } from "./k2";

/* Zygzak kart dla DOWOLNEJ liczby korzyści: pierwsze 4 pozycje 1:1 z designu
 * (pole 1088 szer., karta 620×292), kolejne kontynuują rytm (krok ~352,
 * lewo/prawo); strzałka lime między każdą parą kart (lewa→prawa: arrow1/3,
 * prawa→lewa: arrow2). Wysokość pola = ostatnia karta + 292 + 102 (design). */
const DESIGN_CARDS = [
  { x: 0, y: 0 },
  { x: 484, y: 331 },
  { x: 0, y: 683 },
  { x: 453, y: 1038 },
];
const DESIGN_ARROWS = [
  { src: "/assets/kurs2/k2-arrow1.svg", x: 655, y: 124 },
  { src: "/assets/kurs2/k2-arrow2.svg", x: 253, y: 474 },
  { src: "/assets/kurs2/k2-arrow3.svg", x: 694, y: 829 },
];
const CARD_H = 292;

function zigzag(n: number) {
  const cards = Array.from({ length: n }, (_, i) =>
    i < DESIGN_CARDS.length
      ? DESIGN_CARDS[i]
      : { x: i % 2 ? 468 : 0, y: 1038 + (i - 3) * 352 },
  );
  const arrows = cards
    .slice(0, -1)
    .map((card, i) =>
      i < DESIGN_ARROWS.length
        ? DESIGN_ARROWS[i]
        : i % 2
          ? { src: "/assets/kurs2/k2-arrow2.svg", x: 253, y: card.y + 143 }
          : { src: "/assets/kurs2/k2-arrow3.svg", x: 694, y: card.y + 146 },
    );
  const height = n ? cards[n - 1].y + CARD_H + 102 : 0;
  return { cards, arrows, height };
}

export default function K2Benefits({
  benefits,
  ctaBand,
}: {
  benefits: KursV2Page["benefits"];
  ctaBand: KursV2Page["ctaBand"];
}) {
  const { cards, arrows, height } = zigzag(benefits.items.length);
  return (
    <>
      <section className="w-full bg-page leading-[normal]">
        <div
          className="@container mx-auto w-full"
          style={{ maxWidth: K2_MAX_W }}
        >
          <div style={{ padding: `${c(24)} ${c(80)} 0` }}>
            <div
              className="flex flex-col items-start overflow-hidden bg-brand-blue"
              style={{
                rowGap: c(72),
                padding: `${c(112)} ${c(96)} ${c(96)}`,
                borderRadius: c(96),
              }}
              data-node-id="2010:1975"
            >
              <h2
                className="font-display font-black leading-[1.05] text-white"
                style={{ fontSize: c(56) }}
                data-reveal=""
              >
                {benefits.heading}
              </h2>
              <div className="relative w-full" style={{ height: c(height) }}>
                {arrows.map((a, i) => (
                  <img
                    key={i}
                    src={a.src}
                    alt=""
                    aria-hidden
                    className="absolute"
                    style={{
                      left: c(a.x),
                      top: c(a.y),
                      width: c(201),
                      height: c(190),
                    }}
                  />
                ))}
                <ul className="contents">
                  {benefits.items.map((b, i) => (
                    <li
                      key={b.title}
                      className="absolute flex flex-col items-start border border-solid border-[rgba(140,148,255,0.6)] bg-[#000ae6]"
                      style={{
                        left: c(cards[i].x),
                        top: c(cards[i].y),
                        width: c(620),
                        minHeight: c(CARD_H),
                        rowGap: c(16),
                        padding: `${c(40)} ${c(44)}`,
                        borderRadius: c(40),
                      }}
                      data-reveal=""
                    >
                      <img
                        src="/assets/kurs2/k2-star-zysk.svg"
                        alt=""
                        aria-hidden
                        style={{ width: c(40), height: c(40) }}
                      />
                      <h3
                        className="font-display font-extrabold leading-[1.25] text-white"
                        style={{ fontSize: fs(24, 16) }}
                      >
                        {b.title}
                      </h3>
                      <p
                        className="font-display leading-[1.55] text-white/88"
                        style={{ fontSize: fs(17, 13) }}
                      >
                        {b.text}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <K2CtaBand ctaBand={ctaBand} />
    </>
  );
}

/** pasek „Gotowy…" + ZAPISZ SIĘ (2010:1999 / v3 2136:2561 — ten sam układ) */
export function K2CtaBand({ ctaBand, cursor = false }: { ctaBand: KursV2Page["ctaBand"]; cursor?: boolean }) {
  return (
    <>
      <section className="w-full bg-page leading-[normal]">
        <div
          className="@container mx-auto w-full"
          style={{ maxWidth: K2_MAX_W }}
        >
          <div
            className="flex items-center justify-between"
            style={{ padding: ctaBand.variant === "modular" ? `${c(73)} ${c(178)} ${c(88)} ${c(178)}` : `${c(88)} ${c(120)}` }}
            data-node-id="2010:1999"
          >
            <p
              className={`leading-[1.3] text-brand-blue ${ctaBand.variant === "modular" ? "font-modular uppercase" : "font-audio"}`}
              style={ctaBand.variant === "modular" ? { width: c(537), fontSize: c(24) } : { width: c(640), fontSize: c(30) }}
              data-reveal=""
            >
              {ctaBand.text}
            </p>
            <a
              {...ENROLL_OPEN}
              className="relative flex shrink-0 items-center justify-center border-solid border-white bg-brand-lime font-modular text-brand-blue transition-transform hover:scale-[1.04]"
              style={{
                width: c(399),
                height: c(86),
                borderWidth: c(3),
                borderRadius: c(40),
                fontSize: c(24),
                letterSpacing: c(0.96),
              }}
            >
              {ctaBand.ctaLabel}
              {/* kursor przy CTA (v3, 2150:2004: bbox 40.2×50.9 → svg ×1.25, obrót −14.69°) */}
              {cursor && (
                <img
                  src="/assets/kursor.svg"
                  alt=""
                  aria-hidden
                  className="pointer-events-none absolute max-w-none"
                  style={{ left: c(385 + (40.235 - 29.855) / 2), top: c(36.12 + (50.889 - 44.782) / 2), width: c(29.855), height: c(44.782), transform: "rotate(-14.69deg)" }}
                />
              )}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
