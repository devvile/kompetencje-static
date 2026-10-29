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
// redesign 2026-10 (frame 2204:1684): karta wyższa 612, nowa kolumna prowadzącego
const CARD = { x: 159.33, y: 56, w: 1121.33, h: 612, r: 33 };
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
        <strong key={i} className="font-semibold" style={s.weight ? { fontWeight: s.weight } : undefined}>
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
  const href = `/webinary/${w.slug}#zapisz-sie`; // otwiera formularz zapisu
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
          src="/assets/webinar/w-ad-card-outline-v2.svg"
          alt=""
          aria-hidden
          className="pointer-events-none absolute max-w-none"
          style={{ left: c(CARD.x - 3), top: c(CARD.y - 3), width: c(1128), height: c(618) }}
        />

        {/* limonkowy pasek (kolumna x187, w29): nazwisko | PROWADZĄCY | cena — pionowo, od dołu do góry */}
        <p
          className="absolute whitespace-nowrap font-display font-black text-brand-blue"
          style={{ left: c(187), top: c(96), width: c(29), height: c(226), fontSize: fs(24, 14), lineHeight: "normal", writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          data-node-id="2204:1791"
        >
          {w.details.instructor.toUpperCase()}
        </p>
        <p
          className="absolute whitespace-nowrap font-modular text-brand-blue"
          style={{ left: c(187), top: c(337), width: c(29), height: c(98), fontSize: fs(10.63, 8), lineHeight: "normal", writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          data-node-id="2204:1792"
        >
          PROWADZĄCY
        </p>
        <p
          className="absolute whitespace-nowrap font-modular text-brand-blue"
          style={{ left: c(195.3), top: c(491), width: c(13), height: c(134.9), fontSize: fs(16.2, 11), lineHeight: 1, writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          data-node-id="2204:1793"
        >
          {formatWebinarPrice(w.details.price).toUpperCase()}
        </p>

        {/* pigułki nad nagłówkiem */}
        <ul className="absolute flex items-center" style={{ left: c(288.87), top: c(95.67), columnGap: c(10) }}>
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
        <h2 className="absolute font-display font-extrabold" style={{ left: c(286.66), top: c(152.86), fontSize: c(49.58), lineHeight: c(51.42) }}>
          {p.headingLines.map((l, i) => (
            <span key={l} className={`block whitespace-nowrap ${i === p.headingLines.length - 1 ? "text-brand-lime" : "text-white"}`}>
              {l}{" "}
              {i === 0 && p.headingSmall ? <span style={{ fontSize: c(20) }}>{p.headingSmall}</span> : null}
            </span>
          ))}
        </h2>

        {/* opis */}
        <p
          className="absolute text-justify font-display font-light text-white"
          style={{ left: c(289), top: c(333), width: c(440), fontSize: fs(13.5, 11.5), lineHeight: 19 / 13.5 }}
        >
          <Rich segs={p.description} />
        </p>

        {/* data · godziny · forma */}
        <ul className="absolute flex items-center" style={{ left: c(286.93), top: c(470.31), columnGap: c(8) }}>
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
          style={{ left: c(288.87), top: c(547.06), width: c(359.17), height: c(52.43), borderRadius: c(26.2), borderWidth: c(4), columnGap: c(11), fontSize: fs(18.4, 12) }}
        >
          {p.ctaLabel}
          <CtaArrow style={{ width: c(17.6), height: c(12.6) }} />
        </a>
        {p.ctaNote && (
          <p className="absolute whitespace-nowrap font-display font-medium text-[#cdd2ff]" style={{ left: c(308.2), top: c(614.1), fontSize: fs(10.63, 9) }}>
            {p.ctaNote}
          </p>
        )}

        {/* dekory */}
        {/* STAR_ARROW 2204:1870 (zrotowany) — wycięty z renderu, leży na granicy treści i panelu */}
        <img src="/assets/webinar/w-ad-star-main-v2-f.png" alt="" aria-hidden className="manifest-spark absolute max-w-none" style={{ left: c(739), top: c(190), width: c(125), height: c(71) }} />
        <img src="/assets/webinar/w-ad-star-cta.svg" alt="" aria-hidden className="absolute max-w-none" style={{ left: c(675.5), top: c(539.8), width: c(65.86), height: c(56.88) }} />
        <img src="/assets/webinar/w-ad-aigym.svg" alt="AI GYM" className="absolute max-w-none" style={{ left: c(851.9), top: c(97.7), width: c(145.09), height: c(55.89) }} />
        {p.expertise && (
          <p
            className="absolute flex items-center whitespace-nowrap border-solid border-[#969EFF] font-display font-semibold text-white"
            style={{ left: c(1016.15), top: c(572.37), height: c(30.93), borderRadius: c(15.47), borderWidth: c(1.2), padding: `0 ${c(15.5)}`, fontSize: fs(12.57, 10) }}
          >
            {p.expertise}
          </p>
        )}
      </div>
    </div>
  );
}

/* ======================= MOBILE / TABLET (<1024) =======================
 * Redesign 2026-10 (Figma 2245:1665 „Reklama webinaru (mobile)", 402 szer.):
 * lime tło z siatką, karta blue r30 = pionowy lime pasek 44 (nazwisko |
 * PROWADZĄCY | cena) + treść: zdjęcie 290×340, pigułki, nagłówek z KTÓRY,
 * opis, termin, CTA. Układ przepływowy; jednostki cqw względem 402. */

const m = (px: number) => `${(px / 4.02).toFixed(4)}cqw`;
const mfs = (px: number, minPx: number) => `max(${minPx}px, ${m(px)})`;

function Mobile({ w }: { w: WebinarPage }) {
  const p = w.promo!;
  const href = `/webinary/${w.slug}#zapisz-sie`; // otwiera formularz zapisu
  const chips = infoChips(w);
  return (
    <div className="relative w-full overflow-hidden leading-[normal] lg:hidden" data-node-id="2245:1665">
      <img src="/assets/webinar/w-ad-grid.svg" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-55" />
      {/* tablet: karta nie rośnie ponad 520px (cqw liczone od tego kontenera) */}
      <div className="@container relative mx-auto w-full max-w-[520px]">
      <div className="relative" style={{ padding: `${m(56)} ${m(16)} ${m(72)}` }}>
        <div className="flex overflow-hidden border-solid border-brand-blue bg-brand-blue" style={{ borderWidth: m(3), borderRadius: m(30) }}>
          {/* pasek boczny: nazwisko | PROWADZĄCY | cena — pionowo od dołu */}
          <div className="flex shrink-0 flex-col items-center bg-brand-lime" style={{ width: m(44), paddingTop: m(35), paddingBottom: m(35) }}>
            <div className="flex flex-col items-center" style={{ width: m(29), gap: m(85) }}>
              <div className="flex flex-col" style={{ gap: m(15) }}>
                <p className="whitespace-nowrap font-display font-black text-brand-blue" style={{ height: m(226), fontSize: m(24), writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
                  {w.details.instructor.toUpperCase()}
                </p>
                <p className="whitespace-nowrap font-modular text-brand-blue" style={{ height: m(98), fontSize: mfs(10.63, 8), writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
                  PROWADZĄCY
                </p>
              </div>
              <p className="whitespace-nowrap font-modular text-brand-blue" style={{ height: m(134.9), fontSize: mfs(16.2, 11), lineHeight: 1, writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
                {formatWebinarPrice(w.details.price).toUpperCase()}
              </p>
            </div>
          </div>

          {/* treść */}
          <div className="flex min-w-0 flex-1 flex-col items-start" style={{ gap: m(17), padding: `${m(22)} ${m(18)} ${m(40)}` }}>
            {/* zdjęcie z tłem HUMAN/MACHINE (ten sam panel co desktop, kadr od góry) */}
            <div className="relative shrink-0 overflow-hidden bg-[#06093a]" style={{ width: m(290), height: m(340), borderRadius: m(20) }}>
              <img src={p.image} alt={p.imageAlt} className="absolute inset-0 h-full w-full object-cover object-top" />
              <img src="/assets/webinar/w-ad-aigym.svg" alt="AI GYM" className="absolute max-w-none" style={{ left: m(12), top: m(12), width: m(101.5), height: "auto" }} />
              {p.expertise && (
                <p
                  className="absolute flex items-center justify-center whitespace-nowrap border-solid border-[#969EFF] font-display font-semibold text-white"
                  style={{ left: m(46), top: m(295.07), width: m(232), height: m(30.93), borderRadius: m(15.47), borderWidth: m(1.2), fontSize: mfs(12.57, 10) }}
                >
                  {p.expertise}
                </p>
              )}
            </div>

            {/* pigułki */}
            <ul className="flex flex-wrap items-center" style={{ width: m(290), columnGap: m(10), rowGap: m(8) }}>
              {p.chips.map((ch) => {
                const ic = ICON[ch.icon];
                const lime = ch.variant === "lime";
                return (
                  <li
                    key={ch.text}
                    className={`flex items-center whitespace-nowrap font-display ${lime ? "bg-brand-lime font-bold text-brand-blue" : "border-solid border-[#C8CDFF] font-semibold text-white"}`}
                    style={{ height: m(36.73), borderRadius: m(18.37), borderWidth: lime ? 0 : m(1.5), padding: `0 ${m(21)} 0 ${m(18)}`, columnGap: m(10), fontSize: mfs(12.57, 10) }}
                  >
                    <img src={ic.src} alt="" aria-hidden style={{ width: m(ic.w), height: m(ic.h) }} />
                    {ch.text}
                  </li>
                );
              })}
            </ul>

            {/* nagłówek */}
            <h2 className="font-display font-extrabold text-white" style={{ fontSize: m(31.14), lineHeight: m(34.06) }}>
              {p.headingLines.map((l, i) => (
                <span key={l} className={`block whitespace-nowrap ${i === p.headingLines.length - 1 ? "text-brand-lime" : ""}`} style={i === 0 ? { fontSize: m(33.4) } : undefined}>
                  {l}{" "}
                  {i === 0 && p.headingSmall ? <span style={{ fontSize: m(13.47) }}>{p.headingSmall}</span> : null}
                </span>
              ))}
            </h2>

            {/* opis */}
            <p className="text-justify font-display font-light text-white" style={{ width: m(276), fontSize: mfs(14, 12), lineHeight: 19 / 14 }}>
              <Rich segs={p.description} />
            </p>

            {/* data · godziny · forma */}
            <ul className="flex flex-wrap items-center" style={{ width: m(290), gap: m(8) }}>
              {chips.map((ch) => (
                <li
                  key={ch.text}
                  className="flex items-center whitespace-nowrap border-solid border-[#8C94FF] bg-[#000AE6] font-display font-semibold text-white"
                  style={{ height: m(40.6), borderRadius: m(20.3), borderWidth: m(1.5), padding: `0 ${m(16.4)}`, columnGap: m(8), fontSize: mfs(12.57, 10) }}
                >
                  <img src={ch.icon.src} alt="" aria-hidden style={{ width: m(ch.icon.w), height: m(ch.icon.h) }} />
                  {ch.text}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="flex w-full flex-col items-center" style={{ gap: m(12), paddingTop: m(6), paddingBottom: m(4) }}>
              <a
                href={href}
                className="flex items-center justify-center whitespace-nowrap border-solid border-white bg-brand-lime font-modular text-brand-blue"
                style={{ width: m(270), height: m(51.12), borderRadius: m(25.56), borderWidth: m(3), columnGap: m(9), fontSize: mfs(13.5, 11) }}
              >
                {p.ctaLabel}
                <CtaArrow style={{ width: m(15), height: m(11) }} />
              </a>
              {p.ctaNote && (
                <p className="whitespace-nowrap font-display font-medium text-[#cdd2ff]" style={{ fontSize: mfs(10.63, 9) }}>
                  {p.ctaNote}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

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
