/*
 * KURS v2 — nav + hero (design y0..827: Menu 100 + Hero 727, node 2009:1983).
 * Lewa kolumna 660: etykieta „02 —— KURS ONLINE NA ŻYWO", tytuł Montserrat
 * Black 56 z pigułką i limonkowym wyróżnieniem, lead, opis, pasek statystyk
 * (szkło), karta ceny (gradient + poświata). Prawa: grafika kursu (z danych,
 * hero.image) + opcjonalna limonkowa gwiazda za nią.
 * Statystyki „N moduły / M lekcji" i cena liczone z danych kursu.
 */
import type { KursV2Icon, KursV2Page, NavLink } from "@/content/types";
import SiteNav from "../shared/SiteNav";
import {
  c,
  fs,
  ENROLL_ID,
  K2_MAX_W,
  formatPrice,
  kursCounts,
  ENROLL_OPEN,
} from "./k2";

/* Poprawka Patryka (błąd designu): grafika ma DOTYKAĆ niebieskiego panelu
 * „Co zyskasz" — w Figmie stopy robota kończą się ~34px nad nim. Grafika
 * kotwiczona do DOŁU hero: panel zaczyna się 24px pod hero (padding sekcji
 * korzyści), więc bottom = -24.5 (0.5px zakładki, bez szczeliny AA).
 * Kolumna grafiki zaczyna się na x = 120 + 660 + 24 = 804; domyślne pudełko
 * = robot z designu (635×775, offsetX −39). */
const ART = { colX: 804, bottom: -24.5, w: 635, h: 775, offsetX: -39 };

const ICON: Record<KursV2Icon, string> = {
  moduly: "/assets/kurs2/k2-ic-moduly.svg",
  lekcje: "/assets/kurs2/k2-ic-lekcje.svg",
  czas: "/assets/kurs2/k2-ic-czas.svg",
};

export default function K2Hero({ k, nav }: { k: KursV2Page; nav: NavLink[] }) {
  const { hero } = k;
  const counts = kursCounts(k);
  const stats: { icon: KursV2Icon; label: string }[] = [
    { icon: "moduly", label: counts.modulesLabel },
    { icon: "lekcje", label: counts.lessonsLabel },
    ...(hero.extraStats ?? []).map((x) => ({
      icon: x.icon,
      label: `${x.value} ${x.label}`,
    })),
  ];
  const img = hero.image;
  const art = {
    left: ART.colX + (img.offsetX ?? ART.offsetX),
    w: img.width ?? ART.w,
    h: img.height ?? ART.h,
  };
  const lastLine = hero.titleLines.length - 1;
  return (
    <section className="relative w-full overflow-x-clip bg-page leading-[normal]">
      <div
        className="@container relative mx-auto w-full"
        style={{ maxWidth: K2_MAX_W }}
      >
        {/* nav: frame Menu 1440×100 */}
        <div className="relative" style={{ height: c(100) }}>
          <SiteNav nav={nav} />
        </div>

        <div
          className="relative flex items-center"
          // v3 (2136:2435): treść 9.5 od góry, hero 754 → dół 1.5
          style={{ gap: c(24), padding: k.layout === "v3" ? `${c(hero.pad?.[0] ?? 9.5)} ${c(40)} ${c(hero.pad?.[1] ?? 1.5)} ${c(120)}` : `${c(8)} ${c(40)} ${c(24)} ${c(120)}` }}
          data-node-id="2009:1983"
        >
          {/* dekor: limonkowa gwiazda za grafiką (695,75 względem hero) */}
          {/* v3 „circles" (2301:4008): koła 700/520/340 + poświata, ukośne paski, kropki, niebieska gwiazdka */}
          {hero.backdrop === "circles" && (
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <img src="/assets/kurs3/k3-hero-glow.svg" alt="" className="absolute" style={{ left: c(910), top: c(152), width: c(340), height: c(340) }} />
              <img src="/assets/kurs3/k3-hero-ring170.svg" alt="" className="absolute" style={{ left: c(910), top: c(152), width: c(340), height: c(340) }} />
              <img src="/assets/kurs3/k3-hero-ring260.svg" alt="" className="absolute" style={{ left: c(820), top: c(62), width: c(520), height: c(520) }} />
              <img src="/assets/kurs3/k3-hero-ring350.svg" alt="" className="absolute max-w-none" style={{ left: c(730), top: c(-28), width: c(700), height: c(700) }} />
              {[
                { x: 1180, y: 2, w: 260, h: 300 },
                { x: 780, y: 502, w: 240, h: 220 },
              ].map((b) => (
                <span
                  key={b.x}
                  className="absolute block"
                  style={{
                    left: c(b.x), top: c(b.y), width: c(b.w), height: c(b.h),
                    // linie 2px co 60px (poziomo) pod kątem 35°, blue 16%
                    backgroundImage: `repeating-linear-gradient(125deg, transparent 0 ${c(48.1)}, rgba(19,29,255,0.16) ${c(48.1)} ${c(49.15)})`,
                  }}
                />
              ))}
              <img src="/assets/kurs3/k3-dot8.svg" alt="" className="absolute" style={{ left: c(1330), top: c(142), width: c(8), height: c(8) }} />
              <img src="/assets/kurs3/k3-dot6.svg" alt="" className="absolute" style={{ left: c(750), top: c(442), width: c(6), height: c(6) }} />
              <img src="/assets/kurs3/k3-dot5.svg" alt="" className="absolute" style={{ left: c(1410), top: c(382), width: c(5), height: c(5) }} />
              <img src="/assets/kurs3/k3-hero-star-blue-f.png" alt="" className="absolute" style={{ left: c(929), top: c(24), width: c(69), height: c(65) }} />
            </div>
          )}
          {img.decorStar !== false && (
            <img
              src="/assets/kurs2/k2-hero-star.webp"
              alt=""
              aria-hidden
              className="manifest-spark pointer-events-none absolute object-contain"
              style={{
                left: c(695),
                top: c(75),
                width: c(330),
                height: c(313),
              }}
            />
          )}

          {/* treść */}
          <div
            className="relative flex shrink-0 flex-col items-start"
            style={{ width: c(660), rowGap: c(22) }}
          >
            <div
              className="flex w-full flex-col items-start"
              style={{ rowGap: c(14) }}
            >
              <p
                className="flex items-center text-brand-blue"
                style={{ columnGap: c(14) }}
                data-reveal=""
              >
                <span
                  className="font-display font-light leading-none"
                  style={{ fontSize: c(30) }}
                >
                  {hero.number}
                </span>
                <span
                  className="block bg-brand-blue"
                  style={{ width: c(72), height: c(1.5) }}
                />
                <span
                  className="font-modular leading-none"
                  style={{ fontSize: fs(13, 11) }}
                >
                  {hero.kicker}
                </span>
              </p>

              <h1
                className="flex flex-col items-start font-display font-black leading-none text-brand-blue"
                style={{ fontSize: c(56) }}
              >
                {hero.titleLines.map((line, i) =>
                  i < lastLine || !hero.titlePill ? (
                    <span key={i} className="whitespace-nowrap">
                      {line}{" "}
                    </span>
                  ) : (
                    <span
                      key={i}
                      className="flex items-center whitespace-nowrap"
                      style={{ columnGap: c(18) }}
                    >
                      {line}{" "}
                      <span
                        className="flex items-center border-solid border-brand-blue leading-[normal]"
                        style={{
                          borderWidth: c(1.5),
                          borderRadius: c(24),
                          columnGap: c(8),
                          padding: `${c(9)} ${c(18)} ${c(9)} ${c(16)}`,
                        }}
                      >
                        <span
                          className="font-bold"
                          style={{ fontSize: fs(13, 11) }}
                          aria-hidden
                        >
                          ✦
                        </span>
                        <span
                          className="font-semibold"
                          style={{ fontSize: fs(14, 12) }}
                        >
                          {hero.titlePill}
                        </span>
                      </span>
                    </span>
                  ),
                )}
                <span
                  className="whitespace-nowrap bg-brand-lime"
                  style={{ padding: `0 ${c(12)}` }}
                >
                  {hero.titleAccent}
                </span>
              </h1>

              <p
                className="font-display font-bold leading-[1.3] text-brand-blue"
                style={{ fontSize: c(21) }}
              >
                {hero.lead}
              </p>
              <p
                className="font-display leading-[1.5] text-brand-blue opacity-85"
                style={{ width: c(560), fontSize: fs(16, 13) }}
              >
                {hero.description.map((s, i) =>
                  s.strong ? (
                    <strong key={i} className="font-bold">
                      {s.text}
                    </strong>
                  ) : (
                    <span key={i}>{s.text}</span>
                  ),
                )}
              </p>
            </div>

            {/* pasek statystyk (szkło) */}
            <ul
              className="flex items-center border border-solid border-[rgba(19,29,255,0.3)] bg-white/60 backdrop-blur-[5px]"
              style={{
                columnGap: c(18),
                padding: `${c(14)} ${c(20)}`,
                borderRadius: c(20),
              }}
            >
              {stats.map((s, i) => (
                <li
                  key={s.label}
                  className="flex items-center"
                  style={{ columnGap: c(18) }}
                >
                  {i > 0 && (
                    <span
                      className="block w-px bg-[rgba(19,29,255,0.25)]"
                      style={{ height: c(28) }}
                      aria-hidden
                    />
                  )}
                  <span
                    className="flex items-center"
                    style={{ columnGap: c(10) }}
                  >
                    <span
                      className="flex items-center justify-center bg-brand-lime"
                      style={{
                        width: c(32),
                        height: c(32),
                        borderRadius: c(16),
                      }}
                    >
                      <img
                        src={ICON[s.icon]}
                        alt=""
                        aria-hidden
                        style={{ width: c(18), height: c(18) }}
                      />
                    </span>
                    <span
                      className="whitespace-nowrap font-display font-bold text-brand-blue"
                      style={{ fontSize: fs(15, 12) }}
                    >
                      {s.label}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            {/* start kursu (v3, 2159:2133) */}
            <p className="flex items-center" style={{ columnGap: c(10) }} data-node-id="2159:2133">
              <span className="flex items-center justify-center bg-brand-lime" style={{ width: c(32), height: c(32), borderRadius: c(16) }}>
                <img src="/assets/kurs2/k2-ic-start.svg" alt="" aria-hidden style={{ width: c(18), height: c(18) }} />
              </span>
              <span className="whitespace-nowrap font-display font-bold text-brand-blue" style={{ fontSize: fs(15, 12) }}>
                Start: {hero.startDate ? new Date(hero.startDate).toLocaleDateString("pl-PL", { day: "2-digit", month: "2-digit", year: "numeric" }) : "wkrótce"}
              </span>
            </p>

            {/* karta ceny i zapisu */}
            <div
              className="relative flex w-full flex-col items-start overflow-hidden"
              style={{
                rowGap: c(14),
                padding: `${c(20)} ${c(24)} ${c(20)} ${c(32)}`,
                borderRadius: c(28),
                backgroundImage:
                  "linear-gradient(161.88deg, #131dff 14.286%, #000ae6 85.714%)",
              }}
              data-node-id="2047:1973"
            >
              <img
                src="/assets/kurs2/k2-poswiata.svg"
                alt=""
                aria-hidden
                className="pointer-events-none absolute"
                style={{
                  left: c(440),
                  top: c(-150),
                  width: c(320),
                  height: c(320),
                }}
              />
              <div
                className="relative flex w-full flex-wrap items-center justify-between"
                style={{ minHeight: c(59), gap: c(12) }}
              >
                <p className="flex flex-col whitespace-nowrap">
                  <span
                    className="font-display font-black leading-[1.05] text-brand-lime"
                    style={{ fontSize: c(30) }}
                  >
                    {formatPrice(k.price)}
                  </span>
                  <span
                    className="font-display font-medium text-white"
                    style={{ fontSize: fs(13, 11) }}
                  >
                    {k.price.note}
                  </span>
                </p>
                <a
                  {...ENROLL_OPEN}
                  className="flex shrink-0 items-center justify-center whitespace-nowrap border-solid border-white bg-brand-lime font-modular text-brand-blue transition-transform hover:scale-[1.04]"
                  style={{
                    minWidth: c(280),
                    height: c(52),
                    padding: `0 ${c(20)}`,
                    borderWidth: c(2.46),
                    borderRadius: c(32.8),
                    fontSize: fs(14, 11),
                    filter: "drop-shadow(0 0 14px rgba(214,255,63,0.55))",
                  }}
                >
                  {hero.ctaLabel}
                </a>
              </div>
              {hero.tools && hero.tools.length > 0 && (
                <div
                  className="relative flex flex-wrap items-center"
                  style={{ gap: c(8) }}
                >
                  {hero.toolsLabel && (
                    <span
                      className="whitespace-nowrap font-display font-medium text-white/80"
                      style={{ fontSize: fs(13, 11) }}
                    >
                      {hero.toolsLabel}
                    </span>
                  )}
                  {hero.tools.map((t) => (
                    <span
                      key={t}
                      className="whitespace-nowrap border border-solid border-white/45 bg-white/12 font-display font-semibold text-white"
                      style={{
                        padding: `${c(6)} ${c(12)}`,
                        borderRadius: c(16),
                        fontSize: fs(13, 11),
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
              {hero.toolsNote && (
                <p className="relative font-display font-medium text-white/70" style={{ fontSize: fs(12, 10), marginTop: c(-6) }}>
                  {hero.toolsNote}
                </p>
              )}
              <span
                className="relative block h-px w-full bg-white/25"
                aria-hidden
              />
              <ul
                className="relative flex w-full flex-wrap items-start"
                style={{ gap: `${c(8)} ${c(20)}` }}
              >
                {hero.assurances.map((a) => (
                  <li
                    key={a.text}
                    className="flex items-center"
                    style={{ columnGap: c(8) }}
                  >
                    <img
                      src={
                        a.icon === "check"
                          ? "/assets/kurs2/k2-ic-check-lime.svg"
                          : "/assets/kurs2/k2-star-sm.svg"
                      }
                      alt=""
                      aria-hidden
                      style={{ width: c(18), height: c(18) }}
                    />
                    <span
                      className="whitespace-nowrap font-display font-semibold text-white"
                      style={{ fontSize: fs(13, 11) }}
                    >
                      {a.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* grafika: miejsce kolumny z designu (596×658); grafika kursu
              kotwiczona do dołu hero (patrz ART) */}
          <div
            className="relative shrink-0"
            style={{ width: c(596), height: c(658) }}
            aria-hidden
          />
          <img
            src={img.src}
            alt={img.alt}
            className="absolute max-w-none object-contain object-bottom"
            style={{
              left: c(art.left),
              // v3 (2136:2525): robot top −74.5 w kolumnie y52 → dół 1.5 nad dołem hero
              bottom: c(k.layout === "v3" ? (img.bottom ?? 1.5) : ART.bottom),
              width: c(art.w),
              height: c(art.h),
            }}
            data-reveal=""
          />
        </div>
      </div>
    </section>
  );
}
