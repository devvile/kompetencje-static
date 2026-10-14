/*
 * KURS — sekcja 2: „CO ZYSKASZ NA KURSIE?".
 *
 * DESKTOP (y791–1362, canvas 1440×571). Navy box = brand blue #131dff,
 * radius 91, inset x83, 1274×571 (node 245:2988). Nagłówek Montserrat Black 85
 * white lh1.19 (łamany na 4 linie, w519). 4 benefity: gwiazdka lime (bake
 * opaque na płaskim blue) + tytuł Black 20 white tracking 3.8 + (opcjonalnie)
 * tekst Manrope 15 white. W designie były tylko 4 jednolinijkowe placeholdery
 * na sztywnych `top` 120/210/306/402 — teraz wiersze są PRZEPŁYWEM o min.
 * wysokości 94 (odchyłka od designu ≤4px), a wysokość boxu wynika z treści
 * (min. 571 = design). Kolumna tekstu poszerzona z 309 do 390px (tytuły
 * z CMS-a ~35–40 znaków łamią się na 2 linie; 390 mieści się w boxie
 * z zapasem 53px przed krawędzią).
 *
 * MOBILE (brak projektu — przepływ px): niebieski panel radius 40, nagłówek
 * Black 34, wiersze gwiazdka + tytuł + tekst.
 */
import type { CourseContent } from "@/content/courses";

const c = (px: number) => `${(px / 14.4).toFixed(4)}cqw`;

const G = {
  minH: 571,
  box: { x: 83, w: 1274, r: 91 },
  heading: { left: 162, top: 76, w: 519, fontPx: 85, lhPx: 101.15 }, // w boxie (canvas 245 = 83 + 162)
  rows: { top: 120, left: 831, minH: 94, w: 390, rowPad: 22, bottomPad: 60 }, // canvas x 914 = 83 + 831; rowPad = odstęp między wierszami przy długiej treści (przy 1-linijkowych placeholderach rządzi minH)
  star: { left: 726, dy: -2, w: 58, h: 54 }, // canvas x 809 (bake z marginesem 2px: 811-2)
  title: { fontPx: 20, lhPx: 23.8, trackPx: 3.8 },
  text: { fontPx: 15, lh: 1.4, gapPx: 8 },
};

const HEADING = "CO ZYSKASZ NA KURSIE?";

function ZyskaszDesktop({ benefits }: { benefits: CourseContent["benefits"] }) {
  return (
    <section className="relative hidden w-full overflow-x-clip md:block">
      <div className="@container mx-auto w-full max-w-(--workspace)">
        <div className="relative bg-page">
          <div
            className="relative bg-brand-blue"
            style={{
              marginLeft: c(G.box.x), width: c(G.box.w), minHeight: c(G.minH), borderRadius: c(G.box.r),
              paddingTop: c(G.rows.top), paddingLeft: c(G.rows.left), paddingBottom: c(G.rows.bottomPad),
            }}
            data-node-id="245:2988"
          >
            <h2
              className="absolute font-display font-black text-white"
              style={{
                left: c(G.heading.left), top: c(G.heading.top), width: c(G.heading.w),
                fontSize: c(G.heading.fontPx), lineHeight: `${(G.heading.lhPx / 14.4).toFixed(4)}cqw`,
              }}
              data-node-id="245:2989"
            >
              {HEADING}
            </h2>
            <ul className="flex flex-col">
              {benefits.map((b, i) => (
                <li key={i} className="relative" style={{ minHeight: c(G.rows.minH), width: c(G.rows.w), paddingBottom: c(G.rows.rowPad) }}>
                  <img
                    src="/assets/kurs-zysk-star-f.png" alt="" aria-hidden className="absolute"
                    style={{ left: c(G.star.left - G.rows.left), top: c(G.star.dy), width: c(G.star.w), height: c(G.star.h) }}
                  />
                  <p
                    className="font-display font-black text-white"
                    style={{
                      fontSize: c(G.title.fontPx), lineHeight: `${(G.title.lhPx / 14.4).toFixed(4)}cqw`,
                      letterSpacing: c(G.title.trackPx),
                    }}
                  >
                    {b.title}
                  </p>
                  {b.text ? (
                    <p
                      className="font-body text-white"
                      style={{ marginTop: c(G.text.gapPx), fontSize: c(G.text.fontPx), lineHeight: G.text.lh }}
                    >
                      {b.text}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function ZyskaszMobile({ benefits }: { benefits: CourseContent["benefits"] }) {
  return (
    <section className="relative w-full overflow-x-clip bg-page px-[16px] pt-[32px] md:hidden">
      <div className="rounded-[40px] bg-brand-blue px-[24px] pb-[36px] pt-[32px]" data-node-id="245:2988">
        <h2 className="font-display text-[34px] font-black leading-[1.1] text-white">{HEADING}</h2>
        <ul className="mt-[28px] flex flex-col gap-[22px]">
          {benefits.map((b, i) => (
            <li key={i} className="flex items-start gap-[14px]">
              <img src="/assets/kurs-zysk-star-f.png" alt="" aria-hidden className="mt-[-2px] h-[26px] w-[28px] shrink-0" />
              <div>
                <p className="font-display text-[14px] font-black leading-[1.3] tracking-[0.12em] text-white">{b.title}</p>
                {b.text ? <p className="mt-[6px] font-body text-[14px] leading-[1.5] text-white">{b.text}</p> : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function KursZyskasz({ course }: { course: CourseContent }) {
  return (
    <>
      <ZyskaszDesktop benefits={course.benefits} />
      <ZyskaszMobile benefits={course.benefits} />
    </>
  );
}
