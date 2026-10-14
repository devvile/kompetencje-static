/*
 * KURS v2 — PROGRAM (node 2017:1976, design y2884..6112).
 * „PROGRAM" Montserrat Black 160 track 6, blue z BIAŁYM obrysem zewnętrznym 3
 * (text-stroke 6 + paint-order: stroke) — wystaje nad niebieskie tło (tło od
 * y64, róg górny-prawy r260). Moduły: numer + „MODUŁ" Audiowide (lime), tytuł
 * Montserrat Bold 23 uppercase; lekcje z gwiazdą (asset z designu), punkty
 * SemiBold 16 lh1.65 (szer. tekstu 539 zamiast 540: Montserrat w Figmie jest
 * minimalnie szerszy — 539 daje łamania identyczne z designem, 36/36);
 * po prawej owal „efekt modułu" (tekst Audiowide wyśrodkowany
 * w pionie — w designie top 40/51/63 = centrowanie) + biała gwiazdka.
 */
import type { KursV2Page } from "@/content/types";
import { c, fs, K2_MAX_W, modNum } from "./k2";

/* Audiowide — rozmiary 1:1 z designu */
const AW = { num: 112, modul: 28, effect: 11.7 };

/* Jeden moduł mieści się w ekranie (prośba Patryka): najwyższy moduł (02)
 * = 1122 px płótna 1440 + ~48 zapasu → szerokość płótna programu ≤ 100svh ×
 * 1440/1170 (skala jednym współczynnikiem; na niskich oknach program jest
 * proporcjonalnie mniejszy od reszty strony). */
const FIT_W = `min(${K2_MAX_W}, calc(100svh * 1440 / 1170))`;

export default function K2Program({
  program,
}: {
  program: KursV2Page["program"];
}) {
  return (
    <section className="relative w-full overflow-x-clip bg-page leading-[normal]">
      <div
        className="@container relative mx-auto w-full"
        style={{ maxWidth: FIT_W, paddingTop: c(64) }}
      >
        <h2
          className="absolute z-10 whitespace-nowrap font-display font-black leading-none text-brand-blue"
          style={{
            left: c(34),
            top: 0,
            fontSize: c(160),
            letterSpacing: c(6),
            WebkitTextStroke: `${c(6)} white`,
            paintOrder: "stroke fill",
          }}
          data-reveal=""
        >
          {program.heading}
        </h2>
        {/* gdy płótno jest węższe od okna (cap wysokością): z lewej niebieski
            pas do krawędzi okna; z prawej samo tło wydłużone marginesem, żeby
            zaokrąglony róg leżał przy krawędzi okna jak w designie */}
        <div
          className="absolute bg-brand-blue"
          style={{
            left: "calc(50% - 50vw)",
            right: "50%",
            top: c(64),
            bottom: 0,
          }}
          aria-hidden
        />
        <div
          className="relative flex flex-col bg-brand-blue"
          style={{
            marginRight: "min(0px, calc((100% - 100vw) / 2))",
            borderTopRightRadius: c(260),
            rowGap: c(96),
            padding: `${c(150)} ${c(26)} ${c(140)} ${c(196)}`,
          }}
          data-node-id="2017:1977"
        >
          {program.modules.map((m, mi) => (
            <article
              key={m.title}
              className="flex flex-col items-start"
              style={{ rowGap: c(56) }}
            >
              <header
                className="flex items-center whitespace-nowrap text-brand-lime"
                style={{ columnGap: c(22) }}
                data-reveal=""
              >
                <span
                  className="font-audio leading-none"
                  style={{ fontSize: c(AW.num) }}
                  aria-hidden
                >
                  {modNum(mi)}
                </span>
                <div className="flex flex-col" style={{ rowGap: c(14) }}>
                  <span
                    className="font-audio leading-[normal]"
                    style={{ fontSize: c(AW.modul) }}
                  >
                    MODUŁ<span className="sr-only"> {modNum(mi)}</span>
                  </span>
                  <h3
                    className="font-display font-bold uppercase leading-[normal]"
                    style={{ fontSize: c(23) }}
                  >
                    {m.title}
                  </h3>
                </div>
              </header>

              <div
                className="flex w-full items-start"
                style={{ columnGap: c(44) }}
              >
                <ul
                  className="flex shrink-0 flex-col"
                  style={{ rowGap: c(36), paddingLeft: c(104), width: c(774) }}
                >
                  {m.lessons.map((l) => (
                    <li
                      key={l.title}
                      className="flex items-start"
                      style={{ columnGap: c(40) }}
                      data-reveal=""
                    >
                      <img
                        src="/assets/kurs2/k2-lesson-star.png"
                        alt=""
                        aria-hidden
                        className="shrink-0 object-contain"
                        style={{ width: c(68), height: c(72) }}
                      />
                      <div
                        className="flex flex-col"
                        style={{
                          rowGap: c(12),
                          paddingTop: c(20),
                          width: c(562),
                        }}
                      >
                        <h4
                          className="font-display font-bold leading-[1.3] text-brand-lime"
                          style={{ fontSize: c(23) }}
                        >
                          {l.title}
                        </h4>
                        <ul
                          className="flex flex-col font-display leading-[1.625] text-white"
                          style={{ fontSize: fs(16, 11) }}
                        >
                          {l.items.map((it) => (
                            <li
                              key={it}
                              className="flex items-start"
                              style={{ columnGap: c(10), paddingLeft: c(6) }}
                            >
                              <span className="font-bold" aria-hidden>
                                •
                              </span>
                              <span
                                className="font-semibold"
                                style={{ maxWidth: c(539) }}
                              >
                                {it}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* owal (opcjonalny) rośnie z tekstem (podłoga fontu na tabletach);
                    svg owalu rozciąga się (preserveAspectRatio none), gwiazdka trzyma dół */}
                {m.effect && (
                  <aside
                    className="relative flex shrink-0 items-center"
                    style={{
                      width: c(392),
                      minHeight: c(194),
                      padding: `${c(28)} 0 ${c(28)} ${c(58)}`,
                    }}
                    data-reveal=""
                  >
                    <img
                      src="/assets/kurs2/k2-owal.svg"
                      alt=""
                      aria-hidden
                      className="absolute inset-0 h-full w-full max-w-none"
                    />
                    <p
                      className="relative font-audio uppercase text-white"
                      style={{
                        width: c(272),
                        fontSize: fs(AW.effect, 9),
                        lineHeight: 2,
                      }}
                    >
                      {m.effect}
                    </p>
                    <img
                      src="/assets/kurs2/k2-star-owal.svg"
                      alt=""
                      aria-hidden
                      className="manifest-spark absolute"
                      style={{
                        left: c(342),
                        bottom: c(14),
                        width: c(58),
                        height: c(58),
                      }}
                    />
                  </aside>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
