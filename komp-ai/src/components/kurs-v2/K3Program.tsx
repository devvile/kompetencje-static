/*
 * K3Program — PROGRAM w układzie kursu v3 (Figma 2155:2132, 1440×3047).
 * Nagłówek „PROGRAM" i niebieskie tło (róg górny-prawy r260) jak w K2Program.
 * Moduł (2155:2134): numer Black 120 lime + „MODUŁ" (HK) + tytuł ExtraBold 36,
 * linia 35% bieli, pigułka „N LEKCJE"; lekcje = białe karty (r28, p30, cień),
 * 3 lekcje → 3 kolumny 384, 2/4 lekcje → 2 kolumny 588 (gap 24, wiersze
 * równej wysokości); pasek „EFEKT MODUŁU" lime (r28, px34 py26).
 * Odstęp między modułami 110, padding tła 220 / 140 (moduły są dziećmi „Tła programu").
 */
import type { KursV2Page } from "@/content/types";
import { c, fs, K2_MAX_W, modNum, plural } from "./k2";

export default function K3Program({ program }: { program: KursV2Page["program"] }) {
  return (
    <section className="relative w-full overflow-x-clip bg-page leading-[normal]" data-node-id="2155:2132">
      <div className="@container relative mx-auto w-full" style={{ maxWidth: K2_MAX_W, paddingTop: c(64) }}>
        <h2
          className="absolute z-10 whitespace-nowrap font-display font-black leading-none text-brand-blue"
          style={{ left: c(34), top: 0, fontSize: c(160), letterSpacing: c(6), WebkitTextStroke: `${c(6)} white`, paintOrder: "stroke fill" }}
          data-reveal=""
        >
          {program.heading}
        </h2>
        {/* tło do lewej krawędzi okna; prawy róg zaokrąglony przy krawędzi okna */}
        <div className="absolute bg-brand-blue" style={{ left: "calc(50% - 50vw)", right: "50%", top: c(64), bottom: 0 }} aria-hidden />
        <div
          className="relative flex flex-col bg-brand-blue"
          style={{ marginRight: "min(0px, calc((100% - 100vw) / 2))", borderTopRightRadius: c(260), rowGap: c(110), padding: `${c(220)} ${c(120)} ${c(140)}` }}
        >
          {program.modules.map((m, mi) => {
            const cols = m.lessons.length % 3 === 0 ? 3 : 2;
            return (
              <article key={m.title} className="flex flex-col" style={{ rowGap: c(36) }}>
                <header className="flex items-center" style={{ columnGap: c(28) }}>
                  <span className="shrink-0 font-display font-black text-brand-lime" style={{ fontSize: c(120), lineHeight: 0.9 }} data-reveal="">
                    {modNum(mi)}
                  </span>
                  <div className="flex shrink-0 flex-col items-start" style={{ rowGap: c(8) }}>
                    <span className="font-modular text-brand-lime" style={{ fontSize: c(22), lineHeight: 0.8 }}>MODUŁ</span>
                    <h3 className="whitespace-nowrap font-display font-extrabold text-white" style={{ fontSize: c(36) }}>
                      {m.title}
                    </h3>
                  </div>
                  <span className="min-w-px flex-1 bg-white/35" style={{ height: c(2) }} aria-hidden />
                  <span className="shrink-0 whitespace-nowrap border-solid border-white font-modular text-white" style={{ padding: `${c(10)} ${c(20)}`, borderWidth: c(1.5), borderRadius: c(30), fontSize: fs(15, 11), lineHeight: 1 }}>
                    {plural(m.lessons.length, "lekcja", "lekcje", "lekcji").toUpperCase()}
                  </span>
                </header>
                <ul className="grid items-stretch" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: c(24) }}>
                  {m.lessons.map((l, li) => (
                    <li
                      key={l.title}
                      className="flex flex-col items-start bg-white"
                      style={{ rowGap: c(18), padding: c(30), borderRadius: c(28), boxShadow: `0 ${c(14)} ${c(30)} rgba(0,0,64,0.18)` }}
                      data-reveal=""
                    >
                      <span className="whitespace-nowrap bg-brand-blue font-display font-bold text-brand-lime" style={{ padding: `${c(6)} ${c(12)}`, borderRadius: c(30), fontSize: fs(12, 10) }}>
                        LEKCJA {mi + 1}.{li + 1}
                      </span>
                      <h4 className="font-display font-extrabold text-brand-blue" style={{ fontSize: fs(22, 16), lineHeight: 1.25 }}>
                        {l.title}
                      </h4>
                      <span className="block w-full bg-[rgba(19,29,255,0.15)]" style={{ height: c(1.5) }} aria-hidden />
                      <ul className="flex w-full flex-col" style={{ rowGap: c(12) }}>
                        {l.items.map((it) => (
                          <li key={it} className="flex items-start" style={{ columnGap: c(12) }}>
                            <img src="/assets/kurs3/k3-check.svg" alt="" aria-hidden className="shrink-0" style={{ width: c(22), height: c(22) }} />
                            <span className="min-w-0 flex-1 font-display font-medium text-[#0a1150]" style={{ fontSize: fs(15, 12), lineHeight: 23 / 15 /* Figma: punkt 2 linie = 46 */ }}>
                              {it}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
                {m.effect && (
                  <div className="flex items-center bg-brand-lime" style={{ columnGap: c(24), padding: `${c(26)} ${c(34)}`, borderRadius: c(28) }} data-reveal="">
                    <img src="/assets/kurs3/k3-star-effect.svg" alt="" aria-hidden className="shrink-0" style={{ width: c(40), height: c(40) }} />
                    <span className="shrink-0 whitespace-nowrap border-solid border-brand-blue font-modular text-brand-blue" style={{ padding: `${c(8)} ${c(16)}`, borderWidth: c(1.5), borderRadius: c(30), fontSize: fs(13, 10), lineHeight: 1 }}>
                      EFEKT MODUŁU
                    </span>
                    <p className="min-w-0 flex-1 font-display font-bold text-brand-blue" style={{ fontSize: fs(19, 14), lineHeight: 1.4 }}>
                      {m.effect}
                    </p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
