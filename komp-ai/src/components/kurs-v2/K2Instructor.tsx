/*
 * KURS v2 — prowadzący (node 2012:1975, design y6112..7355).
 * Tło lime, panel blue r96 (1280). Lewa kolumna (x104, 400): pigułka
 * „POZNAJMY SIĘ", tagi + gwiazdki, zdjęcie w kształcie z /o-nas (r 16/140,
 * ramka lime 5), tag dolny. Prawa (x592, 600): imię Audiowide + kursor, rola,
 * bio, statystyki, ścieżka „jak pracuje i uczy" 01–03 ze świecącą linią,
 * przycisk przewijający do ceny. Absolutne pozycje designu odtworzone flow
 * (marginesy = różnice top-ów), więc panel rośnie z treścią.
 */
import type { KursV2Page } from "@/content/types";
import { c, fs, ENROLL_ID, K2_MAX_W } from "./k2";

/* Audiowide — rozmiary 1:1 z designu */
const AW = { name: 44, pill: 14 };

const Tag = ({ label }: { label: string }) => (
  <span
    className="whitespace-nowrap border-solid border-white font-display font-medium text-white"
    style={{
      borderWidth: c(1.2),
      padding: `${c(9)} ${c(20)}`,
      borderRadius: c(20),
      fontSize: fs(14, 11),
    }}
  >
    {label}
  </span>
);

const Stars = () => (
  <span
    className="relative block shrink-0"
    style={{ width: c(36), height: c(30) }}
    aria-hidden
  >
    <img
      src="/assets/kurs2/k2-star-lime.svg"
      alt=""
      className="manifest-spark absolute"
      style={{ left: c(4), top: 0, width: c(30), height: c(30) }}
    />
    <img
      src="/assets/kurs2/k2-star-outline.svg"
      alt=""
      className="absolute"
      style={{ left: c(10), top: c(32), width: c(26), height: c(26) }}
    />
  </span>
);

/* Sekcja mieści się w jednym ekranie (prośba Patryka): panel 1003 + min.
 * odstęp 20 góra/dół = 1043 px płótna 1440 → szerokość płótna ≤ 100svh ×
 * 1440/1043 (skala jednym współczynnikiem). Odstęp pionowy rośnie do 120
 * z designu, gdy okno jest wyższe (panel wyśrodkowany w ekranie). */
const FIT_W = `min(${K2_MAX_W}, calc(100svh * 1440 / 1043))`;
const PAD_Y = `min(${c(120)}, max(${c(20)}, calc((100svh - ${c(1003)}) / 2)))`;

export default function K2Instructor({ p }: { p: KursV2Page["instructor"] }) {
  return (
    <section className="w-full bg-brand-lime leading-[normal]">
      <div className="@container mx-auto w-full" style={{ maxWidth: FIT_W }}>
        <div style={{ padding: `${PAD_Y} ${c(80)}` }}>
          <div
            className="flex items-start bg-brand-blue"
            style={{
              borderRadius: c(96),
              padding: `${c(90)} ${c(88)} ${c(80)} ${c(104)}`,
              columnGap: c(88),
            }}
            data-node-id="2022:1976"
          >
            {/* lewa kolumna */}
            <div
              className="flex shrink-0 flex-col items-start"
              style={{ width: c(400) }}
            >
              <p
                className="whitespace-nowrap border-solid border-white bg-brand-lime font-audio text-brand-blue"
                style={{
                  borderWidth: c(3),
                  padding: `${c(10)} ${c(22)}`,
                  borderRadius: c(75),
                  fontSize: fs(AW.pill, 11),
                }}
              >
                {p.pill}
              </p>
              <div
                className="flex items-start"
                style={{ marginTop: c(18), columnGap: c(9) }}
              >
                {p.tagsTop.map((t) => (
                  <Tag key={t} label={t} />
                ))}
                <span style={{ marginTop: c(-2) }}>
                  <Stars />
                </span>
              </div>
              <div
                className="relative overflow-hidden border-solid border-brand-lime bg-[#06093a]"
                style={{
                  marginTop: c(26.6),
                  width: c(400),
                  height: c(646),
                  borderWidth: c(5),
                  borderRadius: `${c(16)} ${c(140)} ${c(16)} ${c(140)}`,
                }}
                data-reveal=""
              >
                {/* zdjęcie = eksport kadru z Figmy (2023:1976); jak w designie leży od
                    krawędzi ramki (-5) i chowa się pod nią */}
                <img
                  src={p.photo}
                  alt={p.photoAlt}
                  className="absolute max-w-none object-cover"
                  style={{
                    left: c(-5),
                    top: c(-5),
                    width: c(400),
                    height: c(646),
                  }}
                />
              </div>
              {p.tagBottom && (
                <div
                  className="flex items-center"
                  style={{
                    marginTop: c(24),
                    paddingLeft: c(20),
                    columnGap: c(22),
                  }}
                >
                  <span
                    className="relative block shrink-0"
                    style={{ width: c(62), height: c(30) }}
                    aria-hidden
                  >
                    <img
                      src="/assets/kurs2/k2-star-lime.svg"
                      alt=""
                      className="manifest-spark absolute"
                      style={{ left: 0, top: 0, width: c(30), height: c(30) }}
                    />
                    <img
                      src="/assets/kurs2/k2-star-outline.svg"
                      alt=""
                      className="absolute"
                      style={{
                        left: c(36),
                        top: c(3),
                        width: c(26),
                        height: c(26),
                      }}
                    />
                  </span>
                  <Tag label={p.tagBottom} />
                </div>
              )}
            </div>

            {/* prawa kolumna */}
            <div
              className="flex min-w-0 flex-col items-start"
              style={{ width: c(600), paddingTop: c(46) }}
            >
              <h2
                className="flex items-end whitespace-nowrap"
                style={{ columnGap: c(6) }}
                data-reveal=""
              >
                <span
                  className="font-audio leading-none text-white"
                  style={{ fontSize: c(AW.name) }}
                >
                  {p.name}
                </span>
                <span
                  className="block bg-brand-lime"
                  style={{ width: c(26), height: c(5) }}
                  aria-hidden
                />
              </h2>

              <div
                className="flex w-full flex-col items-start"
                style={{ marginTop: c(24), rowGap: c(30) }}
              >
                <div
                  className="flex flex-col items-start"
                  style={{ rowGap: c(12) }}
                >
                  <p
                    className="flex items-center font-display font-semibold text-brand-lime"
                    style={{ columnGap: c(10), fontSize: fs(17, 12) }}
                  >
                    <img
                      src="/assets/kurs2/k2-dot.svg"
                      alt=""
                      aria-hidden
                      style={{ width: c(10), height: c(10) }}
                    />
                    {p.role}
                  </p>
                  <p
                    className="font-display leading-[1.6] text-white/92"
                    style={{ fontSize: fs(17, 12) }}
                  >
                    {p.bio.map((s, i) =>
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

                <div
                  className="flex w-full flex-col items-start"
                  style={{ rowGap: c(14) }}
                >
                  <span
                    className="block bg-brand-lime"
                    style={{ width: c(26), height: c(5) }}
                    aria-hidden
                  />
                  <dl
                    className="flex w-full items-start border-y border-solid border-white/35"
                    style={{ padding: `${c(20)} 0` }}
                  >
                    {p.stats.map((s, i) => (
                      <div
                        key={s.value}
                        className={`flex flex-1 flex-col ${i > 0 ? "border-l border-solid border-white/35" : ""}`}
                        style={{
                          rowGap: c(8),
                          paddingRight: c(12),
                          paddingLeft: i > 0 ? c(24) : 0,
                        }}
                      >
                        <dt
                          className="font-display font-black leading-[1.1] text-brand-lime"
                          style={{ fontSize: c(30) }}
                        >
                          {s.value}
                        </dt>
                        <dd
                          className="font-display font-medium leading-[1.45] text-white"
                          style={{ fontSize: fs(14, 11) }}
                        >
                          {s.label}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div
                  className="relative flex w-full flex-col"
                  style={{ rowGap: c(22) }}
                >
                  <p className="flex items-center" style={{ columnGap: c(12) }}>
                    <span
                      className="whitespace-nowrap font-display font-extrabold text-brand-lime"
                      style={{ fontSize: fs(13, 10) }}
                    >
                      {p.pathHeading}
                    </span>
                    <span
                      className="block h-px flex-1 bg-white/35"
                      aria-hidden
                    />
                  </p>
                  <span
                    className="absolute"
                    style={{
                      left: c(25),
                      top: c(90),
                      width: c(2),
                      height: c(136),
                      background:
                        "linear-gradient(to bottom, rgba(214,255,63,0.9), rgba(214,255,63,0.25))",
                      boxShadow: "0 0 8px rgba(214,255,63,0.6)",
                    }}
                    aria-hidden
                  />
                  <ol className="flex flex-col" style={{ rowGap: c(22) }}>
                    {p.steps.map((s, i) => (
                      <li
                        key={s.title}
                        className="relative flex items-start"
                        style={{ columnGap: c(18) }}
                      >
                        <span
                          className="flex shrink-0 items-center justify-center border border-solid border-white/50 font-display font-black text-brand-lime"
                          style={{
                            width: c(52),
                            height: c(52),
                            borderRadius: c(16),
                            fontSize: c(18),
                            background:
                              "linear-gradient(to right, rgba(255,255,255,0.22), rgba(255,255,255,0.06))",
                            filter:
                              "drop-shadow(0 0 9px rgba(214,255,63,0.35))",
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className="flex flex-1 flex-col"
                          style={{ rowGap: c(4), paddingTop: c(2) }}
                        >
                          <span
                            className="font-display font-bold leading-[1.3] text-white"
                            style={{ fontSize: fs(17, 12) }}
                          >
                            {s.title}
                          </span>
                          <span
                            className="font-display leading-[1.55] text-white/85"
                            style={{ fontSize: fs(14, 11) }}
                          >
                            {s.text}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

                <a
                  href={`#${ENROLL_ID}`}
                  className="flex items-center whitespace-nowrap bg-brand-lime font-display font-extrabold text-brand-blue transition-transform hover:scale-[1.04]"
                  style={{
                    columnGap: c(10),
                    padding: `${c(15)} ${c(28)}`,
                    borderRadius: c(75),
                    fontSize: fs(15, 11),
                  }}
                >
                  {p.ctaLabel}
                  <span aria-hidden>↓</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
