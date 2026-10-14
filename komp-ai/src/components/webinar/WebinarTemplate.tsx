/*
 * WebinarTemplate — wielokrotnie używalny szablon strony szczegółów webinaru.
 * Design: Figma 5ufIXE17KqmkvVrfSVzUFE, frame 2002:1803 (1440×3458, desktop).
 * Dane: jeden dokument WebinarPage (src/content/webinary.ts — docelowo Sanity).
 *  ≥1024: 1:1 z designem, wymiary w cqw płótna 1440 (proporcjonalnie), szerokość
 *         płótna ograniczona też wysokością okna (intro + CTA w 1. ekranie),
 *         drobne fonty z podłogą px.
 *  <1024: układ mobilny/tablet (brak widoku w Figmie — autorski, ta sama estetyka).
 * Termin z ISO formatuje się sam (pl-PL, Europe/Warsaw); cena 0 = „Bezpłatnie".
 * JSON-LD schema.org/EducationEvent (gdy podany termin) — SEO.
 */
import type { NavLink, RichSeg, WebinarPage } from "@/content/types";
import SiteNav from "../shared/SiteNav";
import MobileTopBar from "../shared/MobileTopBar";
import { formatStart, formatWebinarPrice } from "@/lib/webinar";

const c = (px: number) => `${(px / 14.4).toFixed(4)}cqw`;
const fs = (px: number, minPx: number) => `max(${minPx}px, ${c(px)})`;
/** nav (100) + intro (30 + 756) ≈ 900 px płótna 1440 mieści się w oknie */
const W_MAX = "min(var(--workspace), calc(100svh * 1440 / 900))";
const SITE = "https://kompetencje.ai";

/* ---------------- dane pochodne ---------------- */

function detailRows(w: WebinarPage) {
  const d = w.details;
  return [
    { label: "TERMIN", value: formatStart(d.start) },
    { label: "FORMAT", value: d.format },
    { label: "CZAS TRWANIA", value: d.duration },
    ...(d.tool ? [{ label: "NARZĘDZIE", value: d.tool }] : []),
    { label: d.priceLabel ?? "CENA", value: formatWebinarPrice(d.price) },
  ];
}

function eventJsonLd(w: WebinarPage) {
  const d = w.details;
  if (!d.start) return null;
  const start = new Date(d.start);
  const end = new Date(start.getTime() + d.durationMin * 60_000);
  const url = `${SITE}/webinary/${w.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "EducationEvent",
    name: w.name,
    description: w.metaDescription,
    startDate: d.start,
    endDate: end.toISOString(),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    location: { "@type": "VirtualLocation", url },
    inLanguage: "pl",
    isAccessibleForFree: d.price.value === 0,
    organizer: { "@type": "Organization", name: "Kompetencje.ai", url: SITE },
    performer: { "@type": "Person", name: d.instructor },
    offers: {
      "@type": "Offer",
      price: d.price.value,
      priceCurrency: d.price.currency,
      availability: "https://schema.org/InStock",
      url,
    },
  };
}

const Rich = ({ segs }: { segs: RichSeg[] }) => (
  <>
    {segs.map((s, i) =>
      s.strong ? (
        <strong key={i} className="font-extrabold">
          {s.text}
        </strong>
      ) : (
        <span key={i}>{s.text}</span>
      ),
    )}
  </>
);

/* ======================= DESKTOP (≥1024) ======================= */

function BigButton({ href, label, className = "" }: { href: string; label: string; className?: string }) {
  return (
    <a
      href={href}
      className={`flex shrink-0 items-center justify-center border-solid border-white bg-brand-lime font-modular text-brand-blue transition-transform hover:scale-[1.04] ${className}`}
      style={{ width: c(399), height: c(86), borderWidth: c(3), borderRadius: c(40), fontSize: c(24), letterSpacing: c(0.96) }}
    >
      {label}
    </a>
  );
}

function Desktop({ w, nav }: { w: WebinarPage; nav: NavLink[] }) {
  const rows = detailRows(w);
  const plain = w.comparison?.plain;
  const agent = w.comparison?.agent;
  return (
    <div className="hidden w-full bg-page leading-[normal] lg:block">
      {/* NAV + INTRO + PORÓWNANIE */}
      <div className="@container relative mx-auto w-full" style={{ maxWidth: W_MAX }}>
        <div className="relative" style={{ height: c(100) }}>
          <SiteNav nav={nav} />
        </div>
        <img
          src="/assets/webinar/w-star-outline.svg"
          alt=""
          aria-hidden
          className="manifest-spark absolute"
          style={{ left: c(1250), top: c(60), width: c(130), height: c(130) }}
        />
        <div className="flex flex-col items-center" style={{ padding: `${c(30)} 0 ${c(100)}`, rowGap: c(100) }}>
          {/* INTRO (2002:1804) */}
          <section className="flex items-center" style={{ width: c(1200), columnGap: c(70) }}>
            <div className="flex shrink-0 flex-col items-start" style={{ width: c(650), rowGap: c(28) }}>
              <p
                className="flex items-center whitespace-pre border-solid border-brand-blue bg-brand-lime font-audio text-brand-blue"
                style={{ borderWidth: c(2), padding: `${c(11)} ${c(22)}`, borderRadius: c(30), columnGap: c(12), fontSize: fs(14, 11), letterSpacing: c(0.56) }}
                data-reveal=""
              >
                <img src="/assets/webinar/w-star-14.svg" alt="" aria-hidden style={{ width: c(14), height: c(14) }} />
                {w.badge}
              </p>
              <h1 className="flex flex-col items-start font-display font-black leading-[1.05] text-brand-blue" style={{ rowGap: c(8), fontSize: c(60) }}>
                {w.title.before.map((l) => (
                  <span key={l} className="whitespace-nowrap">
                    {l}{" "}
                  </span>
                ))}
                <span className="whitespace-nowrap bg-brand-lime" style={{ padding: `${c(2)} ${c(14)}` }}>
                  {w.title.accent}{" "}
                </span>
                {w.title.after.map((l) => (
                  <span key={l} className="whitespace-nowrap">
                    {l}
                  </span>
                ))}
              </h1>
              <p className="whitespace-nowrap font-audio text-brand-blue" style={{ fontSize: c(26), letterSpacing: c(0.78) }}>
                {w.tagline}
              </p>
              <div className="flex flex-col font-body leading-[1.55] text-brand-blue" style={{ width: c(600), fontSize: fs(18, 14), rowGap: "1.55em" }}>
                {w.description.map((p, i) => (
                  <p key={i}>
                    <Rich segs={p} />
                  </p>
                ))}
              </div>
              {w.boldNote && (
                <p className="font-body font-bold leading-[1.5] text-brand-blue" style={{ width: c(560), fontSize: fs(16, 13) }}>
                  {w.boldNote}
                </p>
              )}
              <div className="flex items-center" style={{ columnGap: c(26) }}>
                <BigButton href={w.register.href} label={w.register.label} />
                <p className="flex flex-col whitespace-nowrap font-body font-semibold leading-[1.5] text-brand-blue" style={{ fontSize: fs(14, 12) }}>
                  {w.register.note.map((l) => (
                    <span key={l}>{l}</span>
                  ))}
                </p>
              </div>
            </div>

            {/* karta „SZCZEGÓŁY" (2002:1821) */}
            <aside
              className="flex items-stretch overflow-hidden bg-brand-blue shadow-[0_10px_30px_rgba(0,0,0,0.22)]"
              style={{ borderRadius: c(30) }}
              data-reveal=""
              aria-label="Szczegóły webinaru"
            >
              <div className="relative shrink-0 bg-brand-lime" style={{ width: c(64) }}>
                <p
                  className="absolute left-1/2 whitespace-pre font-audio text-brand-blue"
                  style={{
                    bottom: c(46),
                    fontSize: fs(13, 10),
                    letterSpacing: c(0.39),
                    // czytane od dołu do góry jak w designie (tekst obrócony o −90°)
                    writingMode: "vertical-rl",
                    transform: "translateX(-50%) rotate(180deg)",
                  }}
                >
                  {`PROWADZĄCY   ${w.details.instructor.toUpperCase()}`}
                </p>
              </div>
              <div className="flex flex-col items-start" style={{ width: c(416), padding: `${c(46)} ${c(40)}`, rowGap: c(20) }}>
                <p className="font-audio text-brand-lime" style={{ fontSize: fs(14, 11), letterSpacing: c(0.84) }}>
                  SZCZEGÓŁY
                </p>
                <dl className="flex w-full flex-col" style={{ rowGap: c(20) }}>
                  {rows.map((r) => (
                    <div key={r.label} className="flex flex-col border-b border-solid border-white/25" style={{ rowGap: c(6), paddingBottom: c(16) }}>
                      <dt className="font-audio text-brand-lime" style={{ fontSize: fs(12, 10), letterSpacing: c(0.48) }}>
                        {r.label}
                      </dt>
                      <dd className="font-body font-semibold leading-[1.4] text-white" style={{ fontSize: fs(18, 14) }}>
                        {r.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                {w.details.note && (
                  <p className="font-body leading-[1.55] text-white/85" style={{ fontSize: fs(14, 12) }}>
                    {w.details.note}
                  </p>
                )}
              </div>
            </aside>
          </section>

          {/* PORÓWNANIE (2002:1842) */}
          {w.comparison && plain && agent && (
            <section className="flex flex-col" style={{ width: c(1200), rowGap: c(44) }}>
              <div className="flex items-end justify-between text-brand-blue">
                <h2 className="font-audio leading-[1.25]" style={{ fontSize: c(40) }}>
                  {w.comparison.heading.map((l) => (
                    <span key={l} className="block whitespace-nowrap">
                      {l}
                    </span>
                  ))}
                </h2>
                <p className="font-body leading-[1.55]" style={{ width: c(480), fontSize: fs(17, 13) }}>
                  {w.comparison.text}
                </p>
              </div>
              <div className="flex items-start" style={{ columnGap: c(24) }}>
                <div
                  className="flex flex-col items-start border-solid border-[rgba(19,29,255,0.25)] bg-white"
                  style={{ width: c(588), borderWidth: c(2), borderRadius: c(30), padding: `${c(44)} ${c(48)}`, rowGap: c(24) }}
                  data-reveal=""
                >
                  <p
                    className="border-solid border-brand-blue font-audio text-brand-blue"
                    style={{ borderWidth: c(1.5), padding: `${c(9)} ${c(20)}`, borderRadius: c(30), fontSize: fs(14, 11), letterSpacing: c(0.56) }}
                  >
                    {plain.label}
                  </p>
                  <ul className="flex flex-col" style={{ rowGap: c(24) }}>
                    {plain.items.map((it) => (
                      <li key={it} className="flex items-center" style={{ columnGap: c(16) }}>
                        <span className="font-body font-bold text-[rgba(19,29,255,0.35)]" style={{ fontSize: c(20) }} aria-hidden>
                          —
                        </span>
                        <span className="font-body font-semibold leading-[1.4] text-[rgba(19,29,255,0.6)]" style={{ fontSize: fs(19, 14) }}>
                          {it}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="w-full border-t border-solid border-[rgba(19,29,255,0.25)] font-body font-extrabold text-brand-blue" style={{ paddingTop: c(22), fontSize: fs(17, 13) }}>
                    {plain.effect}
                  </p>
                </div>
                <div
                  className="flex flex-col items-start bg-brand-blue"
                  style={{ width: c(588), borderRadius: c(30), padding: `${c(44)} ${c(48)}`, rowGap: c(24) }}
                  data-reveal=""
                >
                  <p className="bg-brand-lime font-audio text-brand-blue" style={{ padding: `${c(9)} ${c(20)}`, borderRadius: c(30), fontSize: fs(14, 11), letterSpacing: c(0.56) }}>
                    {agent.label}
                  </p>
                  <ul className="flex flex-col" style={{ rowGap: c(24) }}>
                    {agent.items.map((it) => (
                      <li key={it} className="flex items-center" style={{ columnGap: c(16) }}>
                        <img src="/assets/webinar/w-star-lime.svg" alt="" aria-hidden className="shrink-0" style={{ width: c(20), height: c(20) }} />
                        <span className="font-body font-semibold leading-[1.4] text-white" style={{ fontSize: fs(19, 14) }}>
                          {it}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="w-full border-t border-solid border-white/25 font-body font-extrabold text-brand-lime" style={{ paddingTop: c(22), fontSize: fs(17, 13) }}>
                    {agent.effect}
                  </p>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>

      {/* PRZEBIEG (2002:1885) — pas pełnej szerokości */}
      <section className="w-full bg-brand-blue">
        <div className="@container mx-auto w-full" style={{ maxWidth: W_MAX }}>
          <div className="flex flex-col items-center" style={{ padding: `${c(100)} 0 ${c(110)}`, rowGap: c(56) }}>
            <div className="flex items-end justify-between" style={{ width: c(1200) }}>
              <h2 className="whitespace-nowrap font-audio text-brand-lime" style={{ fontSize: c(40) }}>
                {w.agenda.heading}
              </h2>
              {w.agenda.subheading && (
                <p className="whitespace-nowrap font-body font-semibold text-white" style={{ fontSize: fs(18, 13) }}>
                  {w.agenda.subheading}
                </p>
              )}
            </div>
            <ol className="grid items-start" style={{ width: c(1200), columnGap: c(24), gridTemplateColumns: `repeat(${w.agenda.steps.length}, minmax(0, 1fr))` }}>
              {w.agenda.steps.map((s, i) => (
                <li key={s.title} className="flex flex-col items-start border-t-2 border-solid border-brand-lime" style={{ paddingTop: c(26), rowGap: c(14) }} data-reveal="">
                  <span className="font-audio text-brand-lime" style={{ fontSize: c(56) }} aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-audio text-brand-lime" style={{ fontSize: fs(12, 10), letterSpacing: c(0.48) }}>
                    {s.time}
                  </span>
                  <h3 className="font-body font-extrabold leading-[1.3] text-white" style={{ fontSize: fs(21, 15) }}>
                    {s.title}
                  </h3>
                  <p className="font-body leading-[1.55] text-white/85" style={{ fontSize: fs(15, 12) }}>
                    {s.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* KORZYŚCI + DLA KOGO + ZAMKNIĘCIE */}
      <div className="@container relative mx-auto w-full" style={{ maxWidth: W_MAX }}>
        <div className="flex flex-col items-center" style={{ padding: `${c(100)} 0 ${c(140)}`, rowGap: c(100) }}>
          <section className="flex items-start bg-brand-lime" style={{ width: c(1200), padding: c(70), columnGap: c(80), borderRadius: c(50) }}>
            <div className="flex shrink-0 flex-col items-start" style={{ width: c(560), rowGap: c(26) }}>
              <h2 className="font-display font-black leading-none text-brand-blue" style={{ fontSize: c(52) }}>
                {w.outcomes.heading.map((l) => (
                  <span key={l} className="block whitespace-nowrap">
                    {l}
                  </span>
                ))}
              </h2>
              <ul className="flex flex-col" style={{ rowGap: c(26) }}>
                {w.outcomes.items.map((it) => (
                  <li key={it} className="flex items-center" style={{ columnGap: c(16) }}>
                    <img src="/assets/webinar/w-star-blue.svg" alt="" aria-hidden className="shrink-0" style={{ width: c(22), height: c(22) }} />
                    <span className="font-body font-bold leading-[1.4] text-brand-blue" style={{ width: c(500), fontSize: fs(18, 13) }}>
                      {it}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-start" style={{ width: c(420), rowGap: c(24) }}>
              <h2 className="whitespace-nowrap font-display font-black leading-none text-brand-blue" style={{ fontSize: c(52) }}>
                {w.audience.heading}
              </h2>
              <ul className="flex flex-wrap" style={{ gap: c(10) }}>
                {w.audience.tags.map((t) => (
                  <li
                    key={t}
                    className="whitespace-nowrap border-solid border-brand-blue font-audio text-brand-blue"
                    style={{ borderWidth: c(1.5), padding: `${c(9)} ${c(16)}`, borderRadius: c(30), fontSize: fs(12, 10), letterSpacing: c(0.36) }}
                  >
                    {t}
                  </li>
                ))}
              </ul>
              <p className="font-body leading-[1.55] text-brand-blue" style={{ fontSize: fs(17, 13) }}>
                {w.audience.text}
              </p>
              {w.audience.safety && (
                <div className="flex w-full flex-col bg-brand-blue" style={{ padding: `${c(20)} ${c(24)} ${c(22)}`, borderRadius: c(20), rowGap: c(8) }}>
                  <p className="font-audio text-brand-lime" style={{ fontSize: fs(12, 10), letterSpacing: c(0.48) }}>
                    {w.audience.safety.label}
                  </p>
                  <p className="font-body font-semibold leading-[1.55] text-white" style={{ fontSize: fs(14, 12) }}>
                    {w.audience.safety.text}
                  </p>
                </div>
              )}
            </div>
          </section>

          <section className="relative flex w-full flex-col items-center" style={{ rowGap: c(36) }}>
            <img
              src="/assets/webinar/w-star-arrow.svg"
              alt=""
              aria-hidden
              className="absolute"
              style={{ left: c(60), top: c(44), width: c(150), height: c(158) }}
            />
            <p className="text-center font-audio leading-[1.45] text-brand-blue" style={{ width: c(1000), fontSize: c(30) }}>
              {w.closing.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </p>
            <BigButton href={w.register.href} label={w.closing.ctaLabel ?? w.register.label} />
          </section>
        </div>
      </div>
    </div>
  );
}

/* ======================= MOBILE / TABLET (<1024) ======================= */

function MButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="flex h-16 w-full items-center justify-center rounded-[40px] border-[3px] border-solid border-white bg-brand-lime font-modular text-[20px] tracking-[0.04em] text-brand-blue"
    >
      {label}
    </a>
  );
}

function Mobile({ w, nav }: { w: WebinarPage; nav: NavLink[] }) {
  const rows = detailRows(w);
  return (
    <div className="w-full bg-page leading-[normal] lg:hidden">
      <div className="relative h-[92px] md:h-[110px]">
        <MobileTopBar nav={nav} />
        <div className="@container relative mx-auto hidden h-full w-full md:block">
          <SiteNav nav={nav} />
        </div>
      </div>
      <div className="relative mx-auto flex max-w-[640px] flex-col gap-12 px-5 pb-14 pt-3">
        <img src="/assets/webinar/w-star-outline.svg" alt="" aria-hidden className="manifest-spark absolute right-3 top-[118px] h-14 w-14" />
        {/* intro */}
        <section className="flex flex-col items-start gap-5">
          <p className="flex items-center gap-[10px] whitespace-pre rounded-[30px] border-2 border-solid border-brand-blue bg-brand-lime px-4 py-[9px] font-audio text-[12px] tracking-[0.04em] text-brand-blue">
            <img src="/assets/webinar/w-star-14.svg" alt="" aria-hidden className="h-3 w-3" />
            {w.badge}
          </p>
          <h1 className="flex flex-col items-start gap-[6px] font-display text-[clamp(34px,10.5vw,56px)] font-black leading-[1.05] text-brand-blue">
            {w.title.before.map((l) => (
              <span key={l}>{l} </span>
            ))}
            <span className="bg-brand-lime px-[10px] py-[2px]">{w.title.accent} </span>
            {w.title.after.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </h1>
          <p className="font-audio text-[19px] tracking-[0.03em] text-brand-blue">{w.tagline}</p>
          <div className="flex flex-col gap-4 font-body text-[16px] leading-[1.55] text-brand-blue">
            {w.description.map((p, i) => (
              <p key={i}>
                <Rich segs={p} />
              </p>
            ))}
          </div>
          {w.boldNote && <p className="font-body text-[15px] font-bold leading-[1.5] text-brand-blue">{w.boldNote}</p>}
        </section>

        {/* karta szczegółów: pasek prowadzącego na górze (poziomo) */}
        <aside className="overflow-hidden rounded-[26px] bg-brand-blue shadow-[0_10px_30px_rgba(0,0,0,0.22)]" aria-label="Szczegóły webinaru">
          <p className="bg-brand-lime px-6 py-3 font-audio text-[12px] tracking-[0.03em] text-brand-blue">
            PROWADZĄCY&nbsp;&nbsp;&nbsp;{w.details.instructor.toUpperCase()}
          </p>
          <div className="flex flex-col gap-4 px-6 py-7">
            <p className="font-audio text-[13px] tracking-[0.06em] text-brand-lime">SZCZEGÓŁY</p>
            <dl className="flex flex-col gap-4">
              {rows.map((r) => (
                <div key={r.label} className="flex flex-col gap-[6px] border-b border-solid border-white/25 pb-4">
                  <dt className="font-audio text-[11px] tracking-[0.04em] text-brand-lime">{r.label}</dt>
                  <dd className="font-body text-[17px] font-semibold leading-[1.4] text-white">{r.value}</dd>
                </div>
              ))}
            </dl>
            {w.details.note && <p className="font-body text-[14px] leading-[1.55] text-white/85">{w.details.note}</p>}
          </div>
        </aside>

        <div className="flex flex-col items-center gap-3">
          <MButton href={w.register.href} label={w.register.label} />
          <p className="text-center font-body text-[13px] font-semibold leading-[1.5] text-brand-blue">{w.register.note.join(" ")}</p>
        </div>

        {/* porównanie */}
        {w.comparison && (
          <section className="flex flex-col gap-6">
            <h2 className="font-audio text-[26px] leading-[1.25] text-brand-blue">
              {w.comparison.heading.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </h2>
            <p className="font-body text-[15px] leading-[1.55] text-brand-blue">{w.comparison.text}</p>
            <div className="flex flex-col gap-[14px] rounded-[24px] border-2 border-solid border-[rgba(19,29,255,0.25)] bg-white px-6 py-7">
              <p className="self-start rounded-[30px] border-[1.5px] border-solid border-brand-blue px-4 py-2 font-audio text-[12px] text-brand-blue">
                {w.comparison.plain.label}
              </p>
              <ul className="flex flex-col gap-3">
                {w.comparison.plain.items.map((it) => (
                  <li key={it} className="flex items-start gap-3">
                    <span className="font-body text-[17px] font-bold text-[rgba(19,29,255,0.35)]" aria-hidden>
                      —
                    </span>
                    <span className="font-body text-[16px] font-semibold leading-[1.4] text-[rgba(19,29,255,0.6)]">{it}</span>
                  </li>
                ))}
              </ul>
              <p className="border-t border-solid border-[rgba(19,29,255,0.25)] pt-4 font-body text-[15px] font-extrabold text-brand-blue">
                {w.comparison.plain.effect}
              </p>
            </div>
            <div className="flex flex-col gap-[14px] rounded-[24px] bg-brand-blue px-6 py-7">
              <p className="self-start rounded-[30px] bg-brand-lime px-4 py-2 font-audio text-[12px] text-brand-blue">{w.comparison.agent.label}</p>
              <ul className="flex flex-col gap-3">
                {w.comparison.agent.items.map((it) => (
                  <li key={it} className="flex items-start gap-3">
                    <img src="/assets/webinar/w-star-lime.svg" alt="" aria-hidden className="mt-[3px] h-[18px] w-[18px] shrink-0" />
                    <span className="font-body text-[16px] font-semibold leading-[1.4] text-white">{it}</span>
                  </li>
                ))}
              </ul>
              <p className="border-t border-solid border-white/25 pt-4 font-body text-[15px] font-extrabold text-brand-lime">
                {w.comparison.agent.effect}
              </p>
            </div>
          </section>
        )}
      </div>

      {/* przebieg */}
      <section className="w-full bg-brand-blue">
        <div className="mx-auto flex max-w-[640px] flex-col gap-8 px-5 py-14">
          <div className="flex flex-col gap-2">
            <h2 className="font-audio text-[26px] leading-[1.25] text-brand-lime">{w.agenda.heading}</h2>
            {w.agenda.subheading && <p className="font-body text-[16px] font-semibold text-white">{w.agenda.subheading}</p>}
          </div>
          <ol className="grid gap-8 sm:grid-cols-2">
            {w.agenda.steps.map((s, i) => (
              <li key={s.title} className="flex flex-col items-start gap-2 border-t-2 border-solid border-brand-lime pt-5">
                <span className="font-audio text-[40px] leading-none text-brand-lime" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-audio text-[11px] tracking-[0.04em] text-brand-lime">{s.time}</span>
                <h3 className="font-body text-[19px] font-extrabold leading-[1.3] text-white">{s.title}</h3>
                <p className="font-body text-[14px] leading-[1.55] text-white/85">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="mx-auto flex max-w-[640px] flex-col gap-12 px-4 pb-16 pt-12">
        <section className="flex flex-col gap-10 rounded-[32px] bg-brand-lime px-6 py-9">
          <div className="flex flex-col gap-5">
            <h2 className="font-display text-[34px] font-black leading-none text-brand-blue">
              {w.outcomes.heading.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </h2>
            <ul className="flex flex-col gap-4">
              {w.outcomes.items.map((it) => (
                <li key={it} className="flex items-start gap-3">
                  <img src="/assets/webinar/w-star-blue.svg" alt="" aria-hidden className="mt-[2px] h-5 w-5 shrink-0" />
                  <span className="font-body text-[16px] font-bold leading-[1.4] text-brand-blue">{it}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="font-display text-[34px] font-black leading-none text-brand-blue">{w.audience.heading}</h2>
            <ul className="flex flex-wrap gap-2">
              {w.audience.tags.map((t) => (
                <li key={t} className="rounded-[30px] border-[1.5px] border-solid border-brand-blue px-[14px] py-2 font-audio text-[11px] text-brand-blue">
                  {t}
                </li>
              ))}
            </ul>
            <p className="font-body text-[16px] leading-[1.55] text-brand-blue">{w.audience.text}</p>
            {w.audience.safety && (
              <div className="flex flex-col gap-2 rounded-[20px] bg-brand-blue px-5 py-5">
                <p className="font-audio text-[11px] tracking-[0.04em] text-brand-lime">{w.audience.safety.label}</p>
                <p className="font-body text-[14px] font-semibold leading-[1.55] text-white">{w.audience.safety.text}</p>
              </div>
            )}
          </div>
        </section>
        <section className="relative flex flex-col items-center gap-7 px-1">
          <p className="text-center font-audio text-[19px] leading-[1.45] text-brand-blue">
            {w.closing.lines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </p>
          <MButton href={w.register.href} label={w.closing.ctaLabel ?? w.register.label} />
        </section>
      </div>
    </div>
  );
}

export default function WebinarTemplate({ webinar, nav }: { webinar: WebinarPage; nav: NavLink[] }) {
  const ld = eventJsonLd(webinar);
  return (
    <>
      {ld && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }}
        />
      )}
      <Desktop w={webinar} nav={nav} />
      <Mobile w={webinar} nav={nav} />
    </>
  );
}
