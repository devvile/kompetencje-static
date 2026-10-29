/*
 * KURS v2 — wersja MOBILE (<768). Design 402 szer. (Figma 5ufIXE17KqmkvVrfSVzUFE):
 * hero 2056:1971, „Co zyskasz" + przyklejony pasek 2056:2031, prowadzący
 * 2069:2015 — 1:1. Pasek CTA, PROGRAM i zapis nie mają widoku mobile →
 * autorskie wersje w tej samej estetyce (karty, kolory, fonty z desktopu).
 * Flow w px (projekt 402), treść max 520 px wyśrodkowana na większych
 * telefonach. Teksty mobilne z `kurs.mobile` / `titleMobile`/`textMobile`
 * (brak → tekst desktopowy).
 */
import { MAudience3, MBento3, MFaq3, MProgram3 } from "./K3Mobile";
import type { KursV2Page, NavLink, RichSeg } from "@/content/types";
import MobileTopBar from "../shared/MobileTopBar";
import K2StickyBar from "./K2StickyBar";
import {
  ENROLL_ID,
  formatPrice,
  kursCounts,
  kursTitle,
  modNum,
  ENROLL_OPEN,
} from "./k2";

const PRICE_CARD_ID = "k2-cena-m";

const Rich = ({ segs }: { segs: RichSeg[] }) => (
  <>
    {segs.map((s, i) =>
      s.strong ? (
        <strong key={i} className="font-bold">
          {s.text}
        </strong>
      ) : (
        <span key={i}>{s.text}</span>
      ),
    )}
  </>
);

/* ---------------- HERO (2056:1971) ---------------- */
function MHero({ k, nav }: { k: KursV2Page; nav: NavLink[] }) {
  const { hero } = k;
  const m = k.mobile ?? {};
  const counts = kursCounts(k);
  const stats = [
    { value: String(counts.modules), label: counts.modulesWord },
    { value: String(counts.lessons), label: counts.lessonsWord },
    ...(hero.extraStats ?? []).map((x) => ({ value: x.value, label: x.label })),
  ];
  return (
    <section className="relative w-full overflow-x-clip bg-page leading-[normal]">
      <div className="relative h-[92px]">
        <MobileTopBar nav={nav} />
      </div>
      <div
        className="mx-auto flex max-w-[520px] flex-col items-start gap-4 px-5 pb-7 pt-3"
        data-node-id="2056:1984"
      >
        <p className="flex items-center gap-[10px] text-brand-blue">
          <span className="font-display text-[24px] font-light">
            {hero.number}
          </span>
          <span className="block h-[1.5px] w-12 bg-brand-blue" aria-hidden />
          <span className="font-audio text-[12px]">
            {m.kicker ?? hero.kicker}
          </span>
        </p>
        <h1 className="flex flex-col items-start gap-[2px] font-display text-[40px] font-black leading-none text-brand-blue">
          {hero.titleLines.map((l, i) => (
            <span key={i} className="whitespace-nowrap">
              {l}{" "}
            </span>
          ))}
          <span className="whitespace-nowrap bg-brand-lime px-[10px]">
            {hero.titleAccent}
          </span>
        </h1>
        {hero.titlePill && (
          <p className="flex items-center gap-[6px] whitespace-nowrap rounded-[20px] border-[1.5px] border-solid border-brand-blue py-[7px] pl-[14px] pr-4 text-brand-blue">
            <span className="font-display text-[12px] font-bold" aria-hidden>
              ✦
            </span>
            <span className="font-display text-[13px] font-semibold">
              {hero.titlePill}
            </span>
          </p>
        )}
        {/* grafika 362×400: gwiazda 230×218 @20,20; grafika 320×400 @21,0 */}
        <div className="relative w-full" style={{ aspectRatio: "362/400" }}>
          {hero.image.decorStar !== false && (
            <img
              src="/assets/kurs2/k2-hero-star.webp"
              alt=""
              aria-hidden
              className="manifest-spark absolute object-contain"
              style={{
                left: "5.52%",
                top: "5%",
                width: "63.54%",
                height: "54.5%",
              }}
            />
          )}
          <img
            src={hero.image.src}
            alt={hero.image.alt}
            className="absolute max-w-none object-contain"
            style={{ left: "5.8%", top: 0, width: "88.4%", height: "100%" }}
          />
        </div>
        <p className="font-display text-[19px] font-bold leading-[1.3] text-brand-blue">
          {m.lead ?? hero.lead}
        </p>
        <p className="font-display text-[15px] leading-[1.55] text-brand-blue opacity-85">
          <Rich segs={m.description ?? hero.description} />
        </p>
        <ul className="flex w-full items-start justify-between rounded-[18px] border border-solid border-[rgba(19,29,255,0.3)] bg-white/60 p-3">
          {stats.map((s) => (
            <li
              key={s.label}
              className="flex min-w-0 flex-1 flex-col items-center gap-[2px] whitespace-nowrap"
            >
              <span className="font-display text-[18px] font-extrabold text-brand-blue">
                {s.value}
              </span>
              <span className="font-display text-[12px] font-medium text-[rgba(19,29,255,0.8)]">
                {s.label}
              </span>
            </li>
          ))}
        </ul>
        {k.layout === "v3" && (
          <p className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-2xl bg-brand-lime">
              <img src="/assets/kurs2/k2-ic-start.svg" alt="" aria-hidden className="size-[18px]" />
            </span>
            <span className="font-display text-[15px] font-bold text-brand-blue">
              Start: {hero.startDate ? new Date(hero.startDate).toLocaleDateString("pl-PL", { day: "2-digit", month: "2-digit", year: "numeric" }) : "wkrótce"}
            </span>
          </p>
        )}
        <div
          id={PRICE_CARD_ID}
          className="flex w-full flex-col items-start gap-[14px] rounded-[24px] p-5"
          style={{
            backgroundImage:
              "linear-gradient(144.68deg, #131dff 14.286%, #000ae6 85.714%)",
          }}
          data-node-id="2056:2012"
        >
          <p className="flex items-baseline gap-x-[10px] whitespace-nowrap">
            <span className="whitespace-nowrap font-display text-[30px] font-black text-brand-lime">
              {formatPrice(k.price)}
            </span>
            <span className="font-display text-[12px] font-medium text-white/85">
              {k.price.note}
            </span>
          </p>
          <a
            {...ENROLL_OPEN}
            className="flex h-[70.52px] w-full items-center justify-center whitespace-nowrap rounded-[32.8px] border-[2.46px] border-solid border-white bg-brand-lime font-modular text-[16px] text-brand-blue"
            style={{ filter: "drop-shadow(0 0 14px rgba(214,255,63,0.55))" }}
          >
            {hero.ctaLabel}
          </a>
          {hero.tools && hero.tools.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {hero.toolsLabel && (
                <span className="font-display text-[12px] font-medium text-white/80">
                  {hero.toolsLabel}
                </span>
              )}
              {hero.tools.map((t) => (
                <span
                  key={t}
                  className="whitespace-nowrap rounded-[14px] border border-solid border-white/45 bg-white/12 px-[10px] py-[5px] font-display text-[12px] font-semibold text-white"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
          <ul className="flex flex-col gap-2 text-[13px]">
            {(m.assurances ?? hero.assurances).map((a) => (
              <li key={a.text} className="flex items-start gap-2">
                <span
                  className="font-display font-bold text-brand-lime"
                  aria-hidden
                >
                  {a.icon === "check" ? "✓" : "✦"}
                </span>
                <span className="font-display font-semibold text-white">
                  {a.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CO ZYSKASZ (2056:2066) ---------------- */
function MBenefits({ b }: { b: KursV2Page["benefits"] }) {
  return (
    <section className="w-full bg-page px-2 pt-6 leading-[normal]">
      <div
        className="mx-auto flex max-w-[536px] flex-col gap-[14px] rounded-[28px] bg-brand-blue px-5 pb-8 pt-8"
        data-node-id="2056:2066"
      >
        <h2 className="font-display text-[28px] font-black text-white">
          {b.heading}
        </h2>
        <ul className="flex flex-col gap-[14px]">
          {b.items.map((it) => (
            <li
              key={it.title}
              className="flex flex-col items-start gap-[6px] rounded-[18px] border border-solid border-[rgba(140,148,255,0.6)] bg-[#000ae6] px-[18px] py-4"
            >
              <img
                src="/assets/kurs2/k2-star-m.svg"
                alt=""
                aria-hidden
                className="h-[22px] w-[22px]"
              />
              <h3 className="font-display text-[17px] font-extrabold leading-[1.4] text-white">
                {it.titleMobile ?? it.title}
              </h3>
              <p className="font-display text-[14px] leading-[1.4] text-white/85">
                {it.textMobile ?? it.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- PASEK CTA (autorski) ---------------- */
function MCtaBand({ cta }: { cta: KursV2Page["ctaBand"] }) {
  return (
    <section className="w-full bg-page leading-[normal]">
      <div className="mx-auto flex max-w-[520px] flex-col items-start gap-5 px-5 py-12">
        <p className="font-audio text-[22px] leading-[1.3] text-brand-blue">
          {cta.text}
        </p>
        <a
          {...ENROLL_OPEN}
          className="flex h-16 w-full items-center justify-center rounded-[40px] border-[3px] border-solid border-white bg-brand-lime font-modular text-[20px] tracking-[0.04em] text-brand-blue"
        >
          {cta.ctaLabel}
        </a>
      </div>
    </section>
  );
}

/* ---------------- PROGRAM (autorski, z elementów desktopu) ---------------- */
function MProgram({ p }: { p: KursV2Page["program"] }) {
  return (
    <section className="relative w-full overflow-x-clip bg-page pt-9 leading-[normal]">
      <h2
        className="absolute left-3 top-0 z-10 whitespace-nowrap font-display font-black leading-none text-brand-blue"
        style={{
          fontSize: "clamp(46px, 15vw, 96px)",
          letterSpacing: "0.03em",
          WebkitTextStroke: "6px white",
          paintOrder: "stroke fill",
        }}
      >
        {p.heading}
      </h2>
      <div className="rounded-tr-[120px] bg-brand-blue px-5 pb-14 pt-[clamp(56px,14vw,96px)]">
        <div className="mx-auto flex max-w-[520px] flex-col gap-12">
          {p.modules.map((m, mi) => (
            <article key={m.title} className="flex flex-col">
              <header className="flex items-center gap-3 text-brand-lime">
                <span
                  className="font-audio text-[56px] leading-none"
                  aria-hidden
                >
                  {modNum(mi)}
                </span>
                <div className="flex min-w-0 flex-col gap-1">
                  <span className="font-audio text-[16px]">
                    MODUŁ<span className="sr-only"> {modNum(mi)}</span>
                  </span>
                  <h3 className="font-display text-[15px] font-bold uppercase leading-[1.3]">
                    {m.title}
                  </h3>
                </div>
              </header>
              <ul className="mt-7 flex flex-col gap-6">
                {m.lessons.map((l) => (
                  <li key={l.title} className="flex items-start gap-[14px]">
                    <img
                      src="/assets/kurs2/k2-lesson-star.png"
                      alt=""
                      aria-hidden
                      className="mt-[2px] h-9 w-[34px] shrink-0 object-contain"
                    />
                    <div className="flex min-w-0 flex-col gap-2">
                      <h4 className="font-display text-[18px] font-bold leading-[1.3] text-brand-lime">
                        {l.title}
                      </h4>
                      <ul className="flex flex-col font-display text-[14px] leading-[1.55] text-white">
                        {l.items.map((it) => (
                          <li key={it} className="flex items-start gap-2 pl-1">
                            <span className="font-bold" aria-hidden>
                              •
                            </span>
                            <span className="font-semibold">{it}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
              {m.effect && (
                <aside className="relative mt-7 rounded-[32px] border-[1.5px] border-solid border-white px-5 py-4">
                  <p className="font-audio text-[11px] uppercase leading-[1.9] text-white">
                    {m.effect}
                  </p>
                  <img
                    src="/assets/kurs2/k2-star-owal.svg"
                    alt=""
                    aria-hidden
                    className="manifest-spark absolute -bottom-3 -right-2 h-9 w-9"
                  />
                </aside>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PROWADZĄCY (2069:2016) ---------------- */
function MInstructor({ k }: { k: KursV2Page }) {
  const p = k.instructor;
  const tags = [...p.tagsTop, ...(p.tagBottom ? [p.tagBottom] : [])];
  return (
    <section className="w-full bg-brand-lime px-4 py-14 leading-[normal]">
      <div
        className="mx-auto flex max-w-[520px] flex-col items-start gap-6 rounded-[48px] bg-brand-blue px-6 py-10"
        data-node-id="2069:2016"
      >
        <p className="whitespace-nowrap rounded-[75px] border-[3px] border-solid border-white bg-brand-lime px-[22px] py-[10px] font-audio text-[14px] text-brand-blue">
          {k.mobile?.instructorPill ?? p.pill}
        </p>
        <h2 className="flex w-full items-end gap-[6px]">
          <span className="min-w-0 flex-1 font-audio text-[26px] leading-none text-white">
            {p.name}
          </span>
          <span
            className="block h-1 w-[18px] shrink-0 bg-brand-lime"
            aria-hidden
          />
        </h2>
        <div
          className="relative w-[min(100%,306px)] overflow-hidden border-[3.825px] border-solid border-brand-lime bg-[#06093a]"
          style={{
            aspectRatio: "306/382.5",
            borderRadius: "12.24px 107.1px 12.24px 107.1px",
          }}
        >
          <img
            src={p.photoMobile ?? p.photo}
            alt={p.photoAlt}
            className="absolute max-w-none object-cover"
            style={{
              left: "-3.825px",
              top: "-3.825px",
              width: "calc(100% + 7.65px)",
              height: "calc(100% + 7.65px)",
            }}
          />
        </div>
        <ul className="flex w-full flex-wrap gap-2">
          {tags.map((t) => (
            <li
              key={t}
              className="whitespace-nowrap rounded-[20px] border-[1.2px] border-solid border-white px-5 py-[9px] font-display text-[14px] font-medium text-white"
            >
              {t}
            </li>
          ))}
        </ul>
        <div className="flex w-full flex-col gap-3">
          <p className="flex items-start gap-[10px] font-display text-[15px] font-semibold text-brand-lime">
            <img
              src="/assets/kurs2/k2-dot.svg"
              alt=""
              aria-hidden
              className="mt-1 h-[10px] w-[10px]"
            />
            {p.role}
          </p>
          <p className="font-display text-[17px] leading-[1.6] text-white/92">
            <Rich segs={p.bio} />
          </p>
        </div>
        <div className="flex w-full flex-col gap-[14px]">
          <span className="block h-[5px] w-[26px] bg-brand-lime" aria-hidden />
          <dl className="flex w-full flex-col gap-4 border-y border-solid border-white/35 py-5">
            {p.stats.map((s, i) => (
              <div
                key={s.value}
                className={`flex flex-col gap-2 pr-3 ${i > 0 ? "border-t border-solid border-white/25 pt-4" : ""}`}
              >
                <dt className="font-display text-[30px] font-black leading-[1.1] text-brand-lime">
                  {s.value}
                </dt>
                <dd className="font-display text-[14px] font-medium leading-[1.45] text-white">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative flex w-full flex-col gap-[22px]">
          <p className="flex items-center gap-3">
            <span className="whitespace-nowrap font-display text-[13px] font-extrabold text-brand-lime">
              {p.pathHeading}
            </span>
            <span className="block h-px flex-1 bg-white/35" aria-hidden />
          </p>
          <ol className="relative flex flex-col gap-[22px]">
            {p.steps.map((s, i) => (
              <li
                key={s.title}
                className="relative flex items-start gap-[18px]"
              >
                {/* świecąca linia: od dołu kafelka do następnego kafelka (bez ostatniego) */}
                {i < p.steps.length - 1 && (
                  <span
                    className="absolute left-[25px] top-[52px] bottom-[-22px] w-[2px]"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(214,255,63,0.9), rgba(214,255,63,0.4))",
                      boxShadow: "0 0 8px rgba(214,255,63,0.6)",
                    }}
                    aria-hidden
                  />
                )}
                <span
                  className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[16px] border border-solid border-white/50 font-display text-[18px] font-black text-brand-lime"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(255,255,255,0.22), rgba(255,255,255,0.06)), #131dff",
                    filter: "drop-shadow(0 0 9px rgba(214,255,63,0.35))",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-1 pt-[2px]">
                  <span className="font-display text-[17px] font-bold leading-[1.3] text-white">
                    {s.title}
                  </span>
                  <span className="font-display text-[14px] leading-[1.55] text-white/85">
                    {s.text}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
        <a
          href={`#${ENROLL_ID}-m`}
          className="flex w-full items-center justify-center gap-[10px] whitespace-nowrap rounded-[75px] bg-brand-lime px-7 py-[15px] font-display text-[15px] font-extrabold text-brand-blue"
        >
          {p.ctaLabel}
          <span aria-hidden>↓</span>
        </a>
      </div>
    </section>
  );
}

/* ---------------- ZAPIS (autorski, z karty desktopu) ---------------- */
function MEnroll({ k }: { k: KursV2Page }) {
  const e = k.enroll;
  const counts = kursCounts(k);
  const included = [
    `${counts.modulesLabel} i ${counts.lessonsLabel} online`,
    ...e.included,
  ];
  return (
    <section
      id={`${ENROLL_ID}-m`}
      className="w-full bg-brand-blue px-4 py-14 leading-[normal]"
    >
      <div className="mx-auto flex max-w-[520px] flex-col items-center gap-7">
        <h2 className={`text-center leading-[1.3] text-white ${k.layout === "v3" ? "font-modular text-[24px] uppercase" : "font-audio text-[22px]"}`}>
          {e.heading}
        </h2>
        <div className="flex w-full flex-col gap-5 rounded-[28px] bg-white p-6">
          <h3 className="font-display text-[18px] font-extrabold leading-[1.25] text-brand-blue">
            {e.cardTitle ?? kursTitle(k)}
          </h3>
          <ul className="flex flex-col gap-3">
            {included.map((it) => (
              <li key={it} className="flex items-start gap-[10px]">
                <img
                  src="/assets/kurs2/k2-ic-check.svg"
                  alt=""
                  aria-hidden
                  className="mt-[1px] h-[22px] w-[22px] shrink-0"
                />
                <span className="font-display text-[15px] font-semibold leading-[1.4] text-brand-blue">
                  {it}
                </span>
              </li>
            ))}
          </ul>
          <span
            className="block h-px w-full bg-[rgba(19,29,255,0.15)]"
            aria-hidden
          />
          <div className="flex flex-col items-center gap-2">
            <p className="whitespace-nowrap font-display text-[44px] font-black leading-none text-brand-blue">
              {formatPrice(k.price)}
            </p>
            <p className="font-display text-[13px] font-medium text-brand-blue">
              {k.price.note}
            </p>
            {k.layout === "v3" && (
              <p className="text-center font-display text-[13px] font-semibold text-brand-blue">
                Start kursu: {k.hero.startDate ? new Date(k.hero.startDate).toLocaleDateString("pl-PL", { day: "2-digit", month: "2-digit", year: "numeric" }) : "wkrótce"}
              </p>
            )}
          </div>
          <a
            {...ENROLL_OPEN}
            className="flex h-16 w-full items-center justify-center rounded-[40px] border-[3px] border-solid border-white bg-brand-lime font-modular text-[20px] tracking-[0.04em] text-brand-blue shadow-[0_0_0_1px_rgba(19,29,255,0.08)]"
          >
            {e.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}

export default function K2Mobile({
  k,
  nav,
}: {
  k: KursV2Page;
  nav: NavLink[];
}) {
  return (
    <div className="md:hidden">
      <MHero k={k} nav={nav} />
      {k.benefits.bento ? <MBento3 benefits={k.benefits} /> : <MBenefits b={k.benefits} />}
      <MCtaBand cta={k.ctaBand} />
      {k.layout === "v3" ? <MProgram3 p={k.program} /> : <MProgram p={k.program} />}
      {k.audience && <MAudience3 a={k.audience} />}
      <MInstructor k={k} />
      <MEnroll k={k} />
      {k.faq && <MFaq3 faq={k.faq} />}
      <K2StickyBar
        price={formatPrice(k.price)}
        name={k.mobile?.stickyName ?? k.name}
        ctaLabel={k.mobile?.stickyCtaLabel ?? k.hero.ctaLabel}
        watchId={PRICE_CARD_ID}
      />
    </div>
  );
}
