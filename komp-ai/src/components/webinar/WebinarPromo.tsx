/*
 * Karta reklamy webinaru na stronie głównej (design: Figma 5ufIXE17KqmkvVrfSVzUFE,
 * frame 2085:1762 „REKLAMA WEBINARU – V5", 1440×720, z Illustratora).
 * Dane: WebinarPage.promo + details (prowadzący, cena, data, godziny) — karta
 * aktualizuje się sama po wpisaniu terminu. CTA → /webinary/[slug].
 *  ≥1024: poster 1440×720 (cqw, pozycje 1:1 z designu), drobne fonty z podłogą.
 *  <1024: układ pionowy (zdjęcie → pasek prowadzącego → treść) — autorski.
 * Teksty = HTML (nie krzywe z Illustratora); grafiki: tło z siatką, panel ze
 * zdjęciem (eksport 2085:1829), plakietka AI GYM, gwiazdy, ikony pigułek.
 */
import type { RichSeg, WebinarPage } from "@/content/types";
import { formatDate, formatTimeRange, formatWebinarPrice } from "@/lib/webinar";

const c = (px: number) => `${(px / 14.4).toFixed(4)}cqw`;
const fs = (px: number, minPx: number) => `max(${minPx}px, ${c(px)})`;

/* współrzędne = px designu (frame 1440×720) */
const CARD = { x: 159.33, y: 70, w: 1121.33, h: 560.67, r: 33 };
const BAR_W = 81.2;
const BLUE_W = 556.8;

const ICON = {
  star: { src: "/assets/webinar/w-ic-star.svg", w: 16.16, h: 16.16 },
  arrow: { src: "/assets/webinar/w-ic-arrow.svg", w: 18.36, h: 13.83 },
  cal: { src: "/assets/webinar/w-ic-cal.svg", w: 17.27, h: 17.27 },
  clock: { src: "/assets/webinar/w-ic-clock.svg", w: 17.27, h: 17.27 },
  screen: { src: "/assets/webinar/w-ic-screen.svg", w: 17.27, h: 16.65 },
} as const;

const Rich = ({ segs }: { segs: RichSeg[] }) => (
  <>
    {segs.map((s, i) =>
      s.strong ? (
        <strong key={i} className="font-semibold">
          {s.text}
        </strong>
      ) : (
        <span key={i}>{s.text}</span>
      ),
    )}
  </>
);

function infoChips(w: WebinarPage) {
  const p = w.promo!;
  const date = formatDate(w.details.start);
  const time = formatTimeRange(w.details.start, w.details.durationMin);
  return [
    ...(date ? [{ icon: ICON.cal, text: date }] : [{ icon: ICON.cal, text: "Termin wkrótce" }]),
    ...(time ? [{ icon: ICON.clock, text: time }] : []),
    { icon: ICON.screen, text: p.formatChip },
  ];
}

function CtaArrow({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 18 13" fill="none" aria-hidden className={className} style={style}>
      <path d="M1 6.5h15M10.5 1 16 6.5 10.5 12" stroke="#131DFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ======================= DESKTOP (≥1024) ======================= */

function Desktop({ w }: { w: WebinarPage }) {
  const p = w.promo!;
  const href = `/webinary/${w.slug}`;
  const chips = infoChips(w);
  return (
    <div className="@container relative mx-auto hidden w-full max-w-(--workspace) leading-[normal] lg:block">
      <div className="relative overflow-hidden" style={{ aspectRatio: "1440/720" }}>
        <img src="/assets/webinar/w-ad-grid.svg" alt="" aria-hidden className="absolute inset-0 h-full w-full" />

        {/* karta: limonkowy pasek | niebieska treść | panel ze zdjęciem */}
        <div
          className="absolute overflow-hidden bg-brand-lime"
          style={{ left: c(CARD.x), top: c(CARD.y), width: c(CARD.w), height: c(CARD.h), borderRadius: c(CARD.r) }}
        >
          <div className="absolute inset-y-0 bg-brand-blue" style={{ left: c(BAR_W), width: c(BLUE_W) }} />
          <img
            src={p.image}
            alt={p.imageAlt}
            className="absolute inset-y-0 h-full max-w-none object-cover"
            style={{ left: c(BAR_W + BLUE_W), width: c(CARD.w - BAR_W - BLUE_W) }}
          />
        </div>
        <img
          src="/assets/webinar/w-ad-card-outline.svg"
          alt=""
          aria-hidden
          className="pointer-events-none absolute max-w-none"
          style={{ left: c(CARD.x - 3), top: c(CARD.y - 3), width: c(1127.33), height: c(566.67) }}
        />

        {/* limonkowy pasek: prowadzący + cena (pionowo, od dołu do góry) */}
        <p
          className="absolute whitespace-nowrap font-display font-semibold text-brand-blue"
          style={{ left: c(196.7), top: c(169.6), width: c(22), height: c(233), writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          <span style={{ fontSize: fs(10.63, 8) }}>PROWADZĄCY</span>
          <span style={{ fontSize: fs(18.37, 12) }}>{`  ${w.details.instructor.toUpperCase()}`}</span>
        </p>
        <p
          className="absolute whitespace-nowrap font-modular text-brand-blue"
          style={{ left: c(193.9), top: c(457.5), width: c(13), height: c(134.9), fontSize: fs(16.2, 11), lineHeight: 1, writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          {formatWebinarPrice(w.details.price).toUpperCase()}
        </p>

        {/* pigułki nad nagłówkiem */}
        <ul className="absolute flex items-center" style={{ left: c(288.87), top: c(102.67), columnGap: c(9.67) }}>
          {p.chips.map((ch) => {
            const ic = ICON[ch.icon];
            const lime = ch.variant === "lime";
            return (
              <li
                key={ch.text}
                className={`flex items-center whitespace-nowrap font-display ${lime ? "bg-brand-lime font-bold text-brand-blue" : "border-solid border-[#C8CDFF] font-semibold text-white"}`}
                style={{
                  height: c(36.73),
                  borderRadius: c(18.37),
                  borderWidth: lime ? 0 : c(1.5),
                  padding: `0 ${c(21)} 0 ${c(21.3)}`,
                  columnGap: c(lime ? 11 : 11),
                  fontSize: fs(12.57, 10),
                }}
              >
                <img src={ic.src} alt="" aria-hidden style={{ width: c(ic.w), height: c(ic.h) }} />
                {ch.text}
              </li>
            );
          })}
        </ul>

        {/* nagłówek */}
        <h2 className="absolute font-display font-extrabold" style={{ left: c(286.66), top: c(156.87), fontSize: c(49.58), lineHeight: c(51.42) }}>
          {p.headingLines.map((l, i) => (
            <span key={l} className={`block whitespace-nowrap ${i === p.headingLines.length - 1 ? "text-brand-lime" : "text-white"}`}>
              {l}{" "}
            </span>
          ))}
        </h2>

        {/* opis */}
        <p
          className="absolute text-justify font-display font-light text-white"
          style={{ left: c(289), top: c(333), width: c(432), fontSize: fs(14.5, 11.5), lineHeight: 1.4 }}
        >
          <Rich segs={p.description} />
        </p>

        {/* data · godziny · forma */}
        <ul className="absolute flex items-center" style={{ left: c(286.93), top: c(453.31), columnGap: c(7.75) }}>
          {chips.map((ch) => (
            <li
              key={ch.text}
              className="flex items-center whitespace-nowrap border-solid border-[#8C94FF] bg-[#000AE6] font-display font-semibold text-white"
              style={{ height: c(40.6), borderRadius: c(20.3), borderWidth: c(1.5), padding: `0 ${c(16.4)}`, columnGap: c(8), fontSize: fs(12.57, 10) }}
            >
              <img src={ch.icon.src} alt="" aria-hidden style={{ width: c(ch.icon.w), height: c(ch.icon.h) }} />
              {ch.text}
            </li>
          ))}
        </ul>

        {/* CTA → strona szczegółów */}
        <a
          href={href}
          className="absolute flex items-center justify-center border-solid border-white bg-brand-lime font-modular text-brand-blue transition-transform hover:scale-[1.03]"
          style={{ left: c(288.87), top: c(520.04), width: c(359.17), height: c(52.43), borderRadius: c(26.2), borderWidth: c(4), columnGap: c(11), fontSize: fs(18.4, 12) }}
        >
          {p.ctaLabel}
          <CtaArrow style={{ width: c(17.6), height: c(12.6) }} />
        </a>
        {p.ctaNote && (
          <p className="absolute whitespace-nowrap font-display font-medium text-[#cdd2ff]" style={{ left: c(308.2), top: c(586.11), fontSize: fs(10.63, 9) }}>
            {p.ctaNote}
          </p>
        )}

        {/* dekory */}
        <img src="/assets/webinar/w-ad-star-main.svg" alt="" aria-hidden className="manifest-spark absolute max-w-none" style={{ left: c(753.76), top: c(200.6), width: c(77.24), height: c(94.78) }} />
        <img src="/assets/webinar/w-ad-star-cta.svg" alt="" aria-hidden className="absolute max-w-none" style={{ left: c(683.6), top: c(520.9), width: c(65.86), height: c(56.88) }} />
        <img src="/assets/webinar/w-ad-aigym.svg" alt="AI GYM" className="absolute max-w-none" style={{ left: c(821.97), top: c(97.73), width: c(145.09), height: c(55.89) }} />
        {p.expertise && (
          <p
            className="absolute flex items-center whitespace-nowrap border-solid border-[#969EFF] bg-[#06093A] font-display font-semibold text-white"
            style={{ left: c(1037.61), top: c(552.37), height: c(30.93), borderRadius: c(15.47), borderWidth: c(1.2), padding: `0 ${c(15.5)}`, fontSize: fs(12.57, 10) }}
          >
            {p.expertise}
          </p>
        )}
      </div>
    </div>
  );
}

/* ======================= MOBILE / TABLET (<1024) ======================= */

function Mobile({ w }: { w: WebinarPage }) {
  const p = w.promo!;
  const href = `/webinary/${w.slug}`;
  const chips = infoChips(w);
  return (
    <div className="relative overflow-hidden px-4 py-12 leading-[normal] lg:hidden">
      <img src="/assets/webinar/w-ad-grid.svg" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
      <article className="relative mx-auto max-w-[560px] overflow-hidden rounded-[28px] border-[4px] border-solid border-brand-blue bg-brand-blue">
        <div className="relative">
          <img src={p.image} alt={p.imageAlt} className="aspect-[483/430] w-full object-cover object-top" />
          <img src="/assets/webinar/w-ad-aigym.svg" alt="AI GYM" className="absolute left-4 top-4 w-[118px]" />
          {p.expertise && (
            <p className="absolute bottom-4 right-4 rounded-full border-[1.2px] border-solid border-[#969EFF] bg-[#06093A] px-3 py-[6px] font-display text-[12px] font-semibold text-white">
              {p.expertise}
            </p>
          )}
        </div>
        <p className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 bg-brand-lime px-5 py-3 text-brand-blue">
          <span className="font-display text-[15px] font-semibold">
            <span className="text-[10px]">PROWADZĄCY</span> {w.details.instructor.toUpperCase()}
          </span>
          <span className="font-modular text-[14px]">{formatWebinarPrice(w.details.price).toUpperCase()}</span>
        </p>
        <div className="flex flex-col gap-5 px-5 pb-7 pt-6">
          <ul className="flex flex-wrap gap-2">
            {p.chips.map((ch) => {
              const ic = ICON[ch.icon];
              const lime = ch.variant === "lime";
              return (
                <li
                  key={ch.text}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 font-display text-[12px] ${lime ? "bg-brand-lime font-bold text-brand-blue" : "border-[1.5px] border-solid border-[#C8CDFF] font-semibold text-white"}`}
                >
                  <img src={ic.src} alt="" aria-hidden className="h-[14px] w-auto" />
                  {ch.text}
                </li>
              );
            })}
          </ul>
          <h2 className="font-display text-[clamp(30px,8.6vw,44px)] font-extrabold leading-[1.04]">
            {p.headingLines.map((l, i) => (
              <span key={l} className={`block ${i === p.headingLines.length - 1 ? "text-brand-lime" : "text-white"}`}>
                {l}{" "}
              </span>
            ))}
          </h2>
          <p className="font-display text-[15px] font-light leading-[1.5] text-white">
            <Rich segs={p.description} />
          </p>
          <ul className="flex flex-wrap gap-2">
            {chips.map((ch) => (
              <li
                key={ch.text}
                className="flex items-center gap-2 rounded-full border-[1.5px] border-solid border-[#8C94FF] bg-[#000AE6] px-4 py-[9px] font-display text-[13px] font-semibold text-white"
              >
                <img src={ch.icon.src} alt="" aria-hidden className="h-4 w-4" />
                {ch.text}
              </li>
            ))}
          </ul>
          <a
            href={href}
            className="flex h-14 w-full items-center justify-center gap-3 rounded-full border-[4px] border-solid border-white bg-brand-lime font-modular text-[17px] text-brand-blue"
          >
            {p.ctaLabel}
            <CtaArrow className="h-[13px] w-[18px]" />
          </a>
          {p.ctaNote && <p className="text-center font-display text-[12px] font-medium text-[#cdd2ff]">{p.ctaNote}</p>}
        </div>
      </article>
    </div>
  );
}

/** sekcja z kartami webinarów (na razie 1); pomija webinary bez `promo` */
export default function WebinarPromo({ webinars }: { webinars: WebinarPage[] }) {
  const list = webinars.filter((w) => w.promo);
  if (!list.length) return null;
  return (
    <section className="w-full bg-brand-lime" aria-label="Webinary">
      {list.map((w) => (
        <div key={w.slug}>
          <Desktop w={w} />
          <Mobile w={w} />
        </div>
      ))}
    </section>
  );
}
