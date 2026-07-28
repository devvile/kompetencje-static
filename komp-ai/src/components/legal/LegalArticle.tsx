/*
 * Strony prawne (polityka prywatności / regulamin) — brak designu w Figmie;
 * estetyka 1:1 z sekcji PROGRAM widoku kursu (KursProgram):
 * szary bg-page z kickerem HK + spark lime, wielki napis Montserrat Black
 * blue z BIAŁYM strokiem zewnętrznym (paint-order: stroke) bleedujący na
 * blue box z dużym radiusem TYLKO top-right, w boxie numeracja lime HK
 * (jak "01"/"02" modułów) + tytuły lime, body białe Manrope, na końcu
 * outro HK + lime pill CTA (styl przycisku ZAPISZ SIĘ).
 * Jeden komponent responsywny (nie poster-canvas): treść prawna ma płynną
 * wysokość; skala md+ w cqw (1cqw = 14.4px designu 1440), mobile w px.
 */
import type { LegalPage, NavLink } from "@/content/types";
import SiteNav from "../shared/SiteNav";
import MobileTopBar from "../shared/MobileTopBar";

export default function LegalArticle({ page, nav }: { page: LegalPage; nav: NavLink[] }) {
  return (
    <article className="relative w-full overflow-x-clip">
      <div className="@container mx-auto w-full max-w-(--workspace)">
        {/* ===== hero: szary pas z nav, kickerem i wielkim napisem ===== */}
        <div className="relative bg-page pt-[130px] md:pt-[11.1111cqw]">
          <div className="hidden md:block">
            <SiteNav nav={nav} />
          </div>
          {/* top bar mobile — wspólny komponent, identyczne położenie jak
              na landingu i o-nas */}
          <MobileTopBar nav={nav} />
          {/* spark lime przy prawej krawędzi (asset sekcji PROGRAM) */}
          <img
            src="/assets/kurs-prog-spark-f.png"
            alt=""
            aria-hidden
            className="pointer-events-none absolute right-[8px] top-[172px] w-[64px] md:right-[16.8055cqw] md:top-[10.4166cqw] md:w-[8.75cqw]"
          />
          {/* kicker HK + data aktualizacji */}
          <div className="ml-[24px] md:ml-[21.4583cqw]">
            <p className="font-modular text-[13px] leading-[24px] text-brand-blue md:text-[1.7361cqw] md:leading-[2.9166cqw]">
              {page.kickerLines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </p>
            <p className="mt-[10px] font-body text-[11px] text-brand-blue/60 md:mt-[0.9722cqw] md:text-[0.9722cqw]">
              {page.updated}
            </p>
          </div>
          {/* wielki napis: solid blue + biały stroke zewnętrzny, bleed na blue box */}
          <h1 aria-label={page.pageTitle} className="relative z-10 block">
            <span
              aria-hidden
              className="-mb-[13px] ml-[16px] block whitespace-nowrap font-display font-black leading-none text-brand-blue [paint-order:stroke_fill] [-webkit-text-stroke:4px_#fff] md:-mb-[2.4306cqw] md:ml-[1.875cqw] md:mt-[2.7778cqw] md:text-[11.5cqw] md:[-webkit-text-stroke:0.3819cqw_#fff] mt-[24px] text-[40px]"
            >
              {page.heading}
            </span>
          </h1>
        </div>

        {/* ===== blue box z treścią (radius TYLKO top-right jak moduły) ===== */}
        <div className="relative bg-brand-blue rounded-tr-[70px] px-[24px] pb-[56px] pt-[44px] md:rounded-tr-[18.4028cqw] md:px-[13.3333cqw] md:pb-[7.6389cqw] md:pt-[6.25cqw]">
          <div className="space-y-[40px] md:space-y-[4.8611cqw]">
            {page.sections.map((s) => (
              <section key={s.num} className="grid grid-cols-[auto_1fr] gap-x-[18px] md:gap-x-[4.1667cqw]">
                <span
                  aria-hidden
                  className="font-modular text-[28px] leading-none text-brand-lime md:text-[4.1667cqw]"
                >
                  {s.num}
                </span>
                <div>
                  <h2 className="mb-[12px] font-display text-[16px] font-bold leading-snug text-brand-lime md:mb-[1.3889cqw] md:text-[1.5972cqw] md:leading-[1.6]">
                    {s.title}
                  </h2>
                  <div className="space-y-[10px] font-body text-[14px] leading-[1.65] text-white md:space-y-[0.9722cqw] md:text-[1.1111cqw]">
                    {s.blocks.map((b, i) =>
                      b.items ? (
                        <ul key={i} className="list-disc pl-[20px] marker:text-brand-lime md:pl-[1.6667cqw]">
                          {b.items.map((it) => (
                            <li key={it}>{it}</li>
                          ))}
                        </ul>
                      ) : (
                        <p key={i}>{b.text}</p>
                      ),
                    )}
                  </div>
                </div>
              </section>
            ))}
          </div>
          {/* outro + CTA (styl przycisku ZAPISZ SIĘ z sekcji PROGRAM) */}
          <p className="mt-[48px] text-center font-modular text-[16px] text-white md:mt-[6.25cqw] md:text-[1.7361cqw]">
            {page.outro}
          </p>
          <div className="mt-[20px] flex justify-center md:mt-[2.7778cqw]">
            <a
              href={page.ctaHref}
              className="inline-flex items-center justify-center rounded-full border-2 border-solid border-white bg-brand-lime px-[36px] py-[14px] font-modular text-[15px] leading-none text-brand-blue md:h-[5.9722cqw] md:w-[27.7083cqw] md:border-[0.1736cqw] md:px-0 md:py-0 md:text-[1.7361cqw]"
            >
              {page.ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
