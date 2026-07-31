/*
 * MANIFEST — pełna treść (dostarczona przez Patryka 2026-07-31; brak designu
 * w Figmie — layout autorski, spójny z estetyką strony). Iteracja 2 (uwagi
 * Patryka): bez kickera, tekst PO LEWEJ / robot PO PRAWEJ i większy, bez lime
 * gwiazdy za robotem, tekst prezentowany "ładniej": duży lead + limonkowe
 * markery kluczowych fraz (RichSeg.strong), akapit 2 przy limonkowej linii.
 */
import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "../../components/shared/SiteNav";
import MobileTopBar from "../../components/shared/MobileTopBar";
import StopkaSection from "../../components/home/StopkaSection";
import CountUpStat from "../../components/manifest/CountUpStat";
import RobotPowerOn from "../../components/manifest/RobotPowerOn";
import { getManifestPage, getSiteSettings } from "../../content";
import type { RichSeg } from "../../content/types";

export async function generateMetadata(): Promise<Metadata> {
  const m = await getManifestPage();
  return {
    title: m.metaTitle,
    description: m.metaDescription,
    alternates: { canonical: "/manifest" },
  };
}

/** strong = limonkowy marker (box-decoration-clone dla łamanych linii) */
function Rich({ segs }: { segs: RichSeg[] }) {
  return (
    <>
      {segs.map((s, i) =>
        s.strong ? (
          <mark
            key={i}
            className="box-decoration-clone rounded-[6px] bg-brand-lime px-[0.22em] py-[0.06em] font-semibold text-brand-blue"
          >
            {s.text}
          </mark>
        ) : (
          <span key={i}>{s.text}</span>
        ),
      )}
    </>
  );
}

export default async function ManifestPage() {
  const [settings, m] = await Promise.all([getSiteSettings(), getManifestPage()]);

  return (
    <main className="w-full">
      {/* HERO: nav + wielki MANIFEST (bez kickera — decyzja Patryka) */}
      <section className="relative w-full overflow-x-clip bg-page">
        <div className="@container relative mx-auto w-full max-w-(--workspace) pt-[130px] md:pt-[11.1111cqw]">
          <div className="hidden md:block">
            <SiteNav nav={settings.nav} />
          </div>
          <MobileTopBar nav={settings.nav} />
          {/* DESKTOP: kompozycja warstwowa — robot absolutny po prawej,
              podniesiony (nachodzi na MANIFEST, h1 nad nim z białym strokiem),
              odbity w poziomie (patrzy w LEWO, na tytuł i tekst), dołem
              kotwiczy na niebieskiej beli. Mobile: stack jak dotąd. */}
          <div className="relative">
            {/* robot desktop: wideo power-on (Higgsfield), kończy w pozie
                PNG; flip na wrapperze odbija wideo i fallback identycznie.
                Wymiary wideo z bboxa robota w kadrze 896×1200 (robot =
                617×1118 przy (147,82), do dołu kadru): skala 42/1118 cqw/px */}
            <div
              className="manifest-float absolute bottom-0 right-[4cqw] z-[1] hidden md:block"
              style={{ height: "42cqw", width: "23.1789cqw" }}
              data-reveal=""
            >
              <div className="absolute inset-0" style={{ transform: "scaleX(-1)" }}>
                <RobotPowerOn
                  videoSrc="/assets/manifest-robot-poweron.mp4"
                  posterSrc="/assets/manifest-robot-poster.jpg"
                  fallbackSrc="/assets/manifest-robot-f.png"
                  alt="Robot AI budzi się i unosi wzrok ku przyszłości"
                  videoStyle={{
                    height: "45.0805cqw",
                    width: "33.6601cqw",
                    left: "-5.5224cqw",
                    bottom: 0,
                  }}
                />
              </div>
            </div>
            <h1
              className="relative z-10 whitespace-nowrap font-display font-black leading-none text-brand-blue"
              style={{
                fontSize: "clamp(48px, 11.5cqw, 166px)",
                WebkitTextStroke: "0.035em white" as never,
                paintOrder: "stroke fill",
                marginLeft: "clamp(16px, 5.9cqw, 85px)",
              }}
              data-reveal=""
            >
              {m.heading}
            </h1>
            {/* robot mobile (bez zmian) */}
            <img
              src="/assets/manifest-robot-f.png"
              alt="Robot AI patrzący w przyszłość"
              className="manifest-float mx-auto mt-[24px] w-[min(80vw,380px)] md:hidden"
              data-reveal=""
              style={{ transitionDelay: "0.1s" }}
            />
            {/* tekst: lewa kolumna, kończy się nad belą */}
            <div
              className="flex flex-col gap-[26px] px-[24px] pb-[48px] pt-[28px] md:max-w-[54cqw] md:gap-[2.2cqw] md:pb-[6cqw] md:pt-[3cqw]"
              style={{ marginLeft: "clamp(0px, 5.9cqw, 85px)" }}
            >
              {/* akapit 1 = LEAD: duży, display, markery lime */}
              <p
                className="font-display text-[19px] font-medium leading-[1.55] text-brand-blue md:text-[1.75cqw]"
                data-reveal=""
              >
                <Rich segs={m.paragraphsTop[0]} />
              </p>
              {/* akapit 2: mniejszy, przy limonkowej linii */}
              <p
                className="border-l-[4px] border-solid border-brand-lime pl-[18px] font-body text-[15px] font-light leading-[1.7] text-brand-blue md:pl-[1.5cqw] md:text-[1.28cqw]"
                data-reveal=""
                style={{ transitionDelay: "0.14s" }}
              >
                <Rich segs={m.paragraphsTop[1]} />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NIEBIESKA BELA: stat 25–50% z count-upem */}
      <section className="relative w-full overflow-x-clip bg-brand-blue">
        <div className="@container mx-auto w-full max-w-(--workspace)">
          <div className="mx-auto flex max-w-[1240px] flex-col items-start gap-[10px] px-[24px] py-[56px] md:gap-[0.8cqw] md:px-[3cqw] md:py-[5cqw]">
            <CountUpStat
              from={m.stat.from}
              to={m.stat.to}
              className="font-modular leading-none text-brand-lime"
              style={{ fontSize: "clamp(30px, 6.5cqw, 94px)", whiteSpace: "nowrap" }}
            />
            <p
              className="max-w-[720px] font-display text-[20px] font-semibold leading-[1.3] text-white md:text-[2.2cqw]"
              data-reveal=""
              style={{ transitionDelay: "0.1s" }}
            >
              {m.stat.label}
            </p>
            <p
              className="font-body text-[14px] font-light italic leading-[1.5] text-white/80 md:text-[1.15cqw]"
              data-reveal=""
              style={{ transitionDelay: "0.2s" }}
            >
              {m.stat.sub}
            </p>
          </div>
        </div>
      </section>

      {/* PRZYSZŁOŚĆ NALEŻY DO ODWAŻNYCH + akapity 3-4 */}
      <section className="relative w-full overflow-x-clip bg-page">
        <div className="@container mx-auto w-full max-w-(--workspace)">
          <div className="mx-auto max-w-[1240px] px-[24px] pb-[80px] pt-[64px] md:px-[3cqw] md:pb-[6cqw] md:pt-[5cqw]">
            <h2
              className="font-display font-black leading-[1.02] text-brand-blue"
              style={{
                fontSize: "clamp(34px, 6.4cqw, 92px)",
                WebkitTextStroke: "0.03em white" as never,
                paintOrder: "stroke fill",
              }}
              data-reveal=""
            >
              {m.displayLine[0]}
              <br />
              {m.displayLine[1]}
            </h2>
            <div className="mt-[32px] grid grid-cols-1 gap-[26px] md:mt-[3cqw] md:grid-cols-2 md:gap-[3cqw]">
              {m.paragraphsBottom.map((segs, i) => (
                <p
                  key={i}
                  className="font-body text-[15px] font-light leading-[1.7] text-brand-blue md:text-[1.28cqw]"
                  data-reveal=""
                  style={{ transitionDelay: `${0.1 + i * 0.12}s` }}
                >
                  <Rich segs={segs} />
                </p>
              ))}
            </div>

            {/* zamknięcie: iskra + CTA */}
            <div className="mx-auto mt-[64px] flex max-w-[760px] flex-col items-center gap-[26px] text-center md:mt-[5cqw] md:gap-[2cqw]">
              <img
                src="/assets/gwiazdka-lime.png"
                alt=""
                className="manifest-spark h-[36px] w-[34px] md:h-[3cqw] md:w-[2.85cqw]"
                data-reveal=""
              />
              <p
                className="font-display text-[19px] font-semibold leading-[1.45] text-brand-blue md:text-[1.8cqw]"
                data-reveal=""
                style={{ transitionDelay: "0.1s" }}
              >
                {m.closingLine}
              </p>
              <Link
                href={m.ctaHref}
                className="flex items-center justify-center rounded-full border-[3px] border-solid border-white bg-brand-lime px-[36px] py-[16px] font-modular text-[13px] tracking-[0.04em] text-brand-blue transition-transform hover:scale-[1.04] md:text-[1.1cqw]"
                data-reveal=""
                style={{ transitionDelay: "0.2s" }}
              >
                {m.ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <StopkaSection f={settings.footer} />
    </main>
  );
}
