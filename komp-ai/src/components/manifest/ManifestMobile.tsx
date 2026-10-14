/*
 * /manifest v2 — MOBILE + TABLET (<1024px). Brak widoku mobile w Figmie —
 * układ autorski 1:1 w estetyce desktopu v2 (te same assety, kolory, fonty):
 * MANIFEST z limonkowym obrysem → niebieski boks z akapitami → robot
 * zachodzący na boks → limonkowa karta przykrywająca cięcie robota → bela
 * ze statem → limonkowa sekcja „przyszłość" (elipsa + gwiazdy jako mini
 * poster w cqw) → niebieskie zamknięcie z belkami. Treść płynie (flow),
 * kolumna max 720px wycentrowana na tabletach.
 */
import type { ManifestPage, NavLink } from "@/content/types";
import SiteNav from "../shared/SiteNav";
import MobileTopBar from "../shared/MobileTopBar";
import CountUpStat from "./CountUpStat";
import ManifestRich from "./ManifestRich";
import RobotVideo from "./RobotVideo";

/* elipsa „przyszłość": geometria względem bboxa eksportu elipsy (736×302) */
const E = { x: 130.016, y: 202.5, w: 736, h: 302 };
const pct = (v: number, of: number) => `${((v / of) * 100).toFixed(3)}%`;
const ELL = {
  gw1: { left: pct(133.03 - E.x, E.w), top: pct(403.8 - E.y, E.h), width: pct(133, E.w) },
  gw2: { left: pct(703.717 - E.x, E.w), top: pct(169 - E.y, E.h), width: pct(183, E.w) },
  word: { left: pct(228 - E.x, E.w), top: pct(316.32 - E.y, E.h), fontSize: `${((60 / E.w) * 100).toFixed(3)}cqw` },
};

export default function ManifestMobile({ m, nav }: { m: ManifestPage; nav: NavLink[] }) {
  return (
    <div className="lg:hidden">
      {/* HERO */}
      <section className="relative w-full overflow-x-clip bg-page">
        <div className="@container relative mx-auto w-full max-w-(--workspace) pt-[150px] md:pt-[11.1111cqw]">
          <div className="hidden md:block">
            <SiteNav nav={nav} />
          </div>
          <MobileTopBar nav={nav} />
        </div>
        <div className="relative mx-auto max-w-[720px] px-[18px] pb-[56px] md:px-[40px] md:pb-[80px]">
          <img
            src="/assets/manifest/mf-star-lime.svg"
            alt=""
            aria-hidden
            className="manifest-spark absolute left-[0px] top-[-62px] w-[72px] md:left-[4px] md:top-[-40px] md:w-[140px]"
          />
          <h1
            className="relative text-center font-display font-black leading-none text-brand-blue"
            style={{
              fontSize: "clamp(42px, 13.6vw, 104px)",
              letterSpacing: "0.07em",
              WebkitTextStroke: "0.1em var(--color-brand-lime)",
              paintOrder: "stroke fill",
            }}
            data-reveal=""
          >
            {m.heading}
          </h1>

          <div
            className="relative z-[1] mt-[30px] flex flex-col gap-[22px] rounded-[40px] bg-brand-blue px-[24px] pb-[96px] pt-[38px] font-body text-[17px] leading-[1.45] text-white md:mt-[44px] md:gap-[28px] md:rounded-[64px] md:px-[56px] md:pb-[130px] md:pt-[56px] md:text-justify md:text-[20px]"
            data-reveal=""
          >
            {m.intro.map((p, i) => (
              <p key={i}>
                <ManifestRich segs={p} basePx={24} />
              </p>
            ))}
          </div>

          {/* robot zachodzi na dół boksu; cięcie u dołu przykrywa karta, ucięte
              prawe ramię (tak w assecie) dosunięte do krawędzi ekranu na mobile */}
          <RobotVideo
            className="relative z-[2] ml-auto mr-[-18px] mt-[-80px] block w-[min(78%,400px)] md:mx-auto md:mt-[-110px]"
            style={{ aspectRatio: "990/1370" }}
          />

          <div
            className="relative z-[3] mt-[-64px] rounded-[30px] border-[4px] border-solid border-brand-blue bg-brand-lime px-[22px] py-[26px] md:mx-[40px] md:mt-[-90px] md:rounded-[40px] md:px-[48px] md:py-[34px]"
            data-reveal=""
          >
            <p className="font-body text-[16px] leading-[1.5] text-brand-blue md:text-justify md:text-[19px]">
              <ManifestRich segs={m.lead} basePx={22} />
            </p>
          </div>
        </div>
      </section>

      {/* BELA ZE STATEM */}
      <section className="w-full bg-brand-blue">
        <div className="mx-auto flex max-w-[720px] flex-col items-start gap-[12px] px-[24px] py-[56px] md:px-[40px] md:py-[72px]">
          <CountUpStat
            from={m.stat.from}
            to={m.stat.to}
            className="whitespace-nowrap font-modular leading-none text-brand-lime"
            style={{ fontSize: "clamp(28px, 9.4vw, 66px)" }}
          />
          <p className="max-w-[470px] font-display text-[22px] font-semibold leading-[1.3] text-white md:text-[30px]" data-reveal="">
            {m.stat.label}
          </p>
          <p className="font-body text-[13px] font-light italic text-white/85 md:text-[15px]" data-reveal="">
            {m.stat.sub}
          </p>
        </div>
      </section>

      {/* PRZYSZŁOŚĆ (lime, róg dolny-lewy zaokrąglony na tle blue) */}
      <section className="w-full overflow-x-clip bg-brand-blue">
        <div className="relative overflow-hidden rounded-bl-[96px] bg-brand-lime pb-[72px] pt-[64px] md:rounded-bl-[160px] md:pb-[96px]">
          <img
            src="/assets/manifest/mf-star-white-big.svg"
            alt=""
            aria-hidden
            className="absolute right-0 top-[150px] w-[78%] max-w-[560px] md:top-[120px] md:w-[62%]"
          />
          <div className="relative mx-auto max-w-[720px] px-[18px] md:px-[40px]">
            <h2 data-reveal="">
              <span className="@container relative block w-[min(100%,520px)]" style={{ aspectRatio: `${E.w}/${E.h}` }}>
                <img src="/assets/manifest/mf-ellipse.svg" alt="" aria-hidden className="absolute inset-0 h-full w-full" />
                <span
                  className="absolute whitespace-nowrap font-modular leading-[1.403] text-brand-blue"
                  style={ELL.word}
                >
                  {m.future.word}
                </span>
                <img src="/assets/manifest/mf-gw1.svg" alt="" aria-hidden className="manifest-spark absolute" style={ELL.gw1} />
                <img
                  src="/assets/manifest/mf-gw2.svg"
                  alt=""
                  aria-hidden
                  className="manifest-spark absolute"
                  style={{ ...ELL.gw2, animationDelay: "-1.4s" }}
                />
              </span>
              <span className="mt-[18px] block text-right font-modular text-[clamp(26px,7.4vw,42px)] leading-[1.3] text-brand-blue">
                {" "}
                {m.future.tail}
              </span>
            </h2>

            <h3
              className="mt-[64px] max-w-[420px] font-display text-[36px] font-extrabold leading-[1.02] text-brand-blue md:mt-[90px] md:text-[48px]"
              data-reveal=""
            >
              {m.futureHeading}
            </h3>
            <p className="mt-[24px] max-w-[520px] font-body text-[16px] font-light leading-[1.6] text-brand-blue md:text-[18px]" data-reveal="">
              {m.futureBody}
            </p>
            <img
              src="/assets/manifest/mf-star-arrow-blue.svg"
              alt=""
              aria-hidden
              className="ml-[8%] mt-[20px] w-[104px] md:w-[140px]"
            />
            <div
              className="ml-auto mt-[12px] w-[min(100%,500px)] rounded-bl-[72px] rounded-tr-[72px] bg-brand-blue px-[28px] py-[40px] md:rounded-bl-[110px] md:rounded-tr-[110px] md:px-[56px] md:py-[56px]"
              data-reveal=""
            >
              <p className="text-right font-display text-[17px] leading-[1.35] text-white md:text-[20px]">
                <ManifestRich segs={m.pride} basePx={20} />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ZAMKNIĘCIE (blue); dół zostawia miejsce na pill CTA kontaktu (md) */}
      <section className="w-full bg-brand-blue">
        <div className="mx-auto flex max-w-[720px] flex-col items-center px-[18px] pb-[64px] pt-[64px] text-center md:pb-[110px] md:pt-[80px]">
          <img src="/assets/manifest/mf-star-small.svg" alt="" aria-hidden className="manifest-spark w-[40px]" />
          <p className="mt-[18px] font-modular text-[clamp(14px,3.9vw,22px)] leading-[1.4] text-brand-lime" data-reveal="">
            {m.closingKicker}
          </p>
          <p
            className="mt-[26px] font-display text-[clamp(20px,5.6vw,27px)] font-extrabold uppercase leading-[2.05] text-brand-blue"
            data-reveal=""
          >
            {m.closingLines.map((line, i) => (
              <span key={line}>
                <span className="box-decoration-clone bg-brand-lime px-[0.45em] py-[0.18em]">{line}</span>
                {i < m.closingLines.length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>
      </section>
    </div>
  );
}
