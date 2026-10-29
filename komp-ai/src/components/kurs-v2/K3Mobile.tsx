/*
 * K3Mobile — sekcje kursu v3 na telefonie (<768; Figma 2139:1991, 402 szer.):
 * bento „Co zyskasz" (2162:2132), PROGRAM (2161:3286), „Dla kogo" (2180:2202),
 * FAQ (2162:2415). Układ przepływowy w px (treść 362 = ekran − 2×20, max 520
 * jak reszta K2Mobile). Ilustracje kafli = te same komponenty co desktop
 * (K3Benefits / BentoArt), wycinek obszaru grafiki przeskalowany do szerokości
 * kafla (ArtCrop) — ostre wektorowo na retinie, jedno źródło prawdy.
 */
import type { KursV2Page, KursV3BentoArt } from "@/content/types";
import { BentoArt } from "./K3Benefits";
import { modNum, plural } from "./k2";

const TILE_BG = ["#131dff", "#d6ff3f", "#ffffff", "#06093a"] as const;
const TILE_DARK = [true, false, false, true];

/* domyślne wycinki grafiki (px kafla desktop) dla rodzajów ilustracji */
const CROP: Record<KursV3BentoArt["kind"], { x: number; y: number; w: number; h: number }> = {
  "oferta-mock": { x: 380, y: 56, w: 330, h: 400 },
  "grafiki-trio": { x: 12.34, y: 19.12, w: 448.6, h: 210 },
  slajdy: { x: 28.5, y: 12.5, w: 410, h: 200 },
  "wycena-chart": { x: 400, y: 50, w: 290, h: 410 },
  image: { x: 0, y: 0, w: 464, h: 230 },
};

/** wycinek obszaru grafiki desktopowej przeskalowany do szerokości rodzica */
function ArtCrop({ art }: { art: KursV3BentoArt }) {
  const r = art.mobileCrop ?? (art.kind === "image" ? { x: art.x, y: art.y, w: art.w, h: art.h } : CROP[art.kind]);
  return (
    <div className="relative w-full" style={{ aspectRatio: `${r.w}/${r.h}` }}>
      {/* @container o szerokości 1440 jednostek designu w skali wycinka */}
      <div className="@container absolute left-0 top-0" style={{ width: `${(1440 / r.w) * 100}%` }}>
        <div className="absolute" style={{ left: `${(-r.x / 14.4).toFixed(4)}cqw`, top: `${(-r.y / 14.4).toFixed(4)}cqw` }}>
          <div className="relative" style={{ width: `${(720 / 14.4).toFixed(4)}cqw` }}>
            <BentoArt art={art} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function MBento3({ benefits }: { benefits: KursV2Page["benefits"] }) {
  const b3 = benefits.bento!;
  return (
    <section className="w-full overflow-hidden bg-page leading-[normal]" data-node-id="2162:2132">
      <div className="mx-auto max-w-[520px] px-5">
        <p className="inline-block whitespace-pre border-[1.5px] border-solid border-brand-blue bg-brand-lime px-3 py-1.5 font-display text-[12px] font-semibold text-brand-blue" style={{ borderRadius: 30 }}>
          {"✦  "}
          <span className="font-extrabold">{benefits.items.length}</span>
          {` ${b3.badge}`}
        </p>
        <h2 className="mt-3 font-display text-[42px] font-black leading-[1.1] text-brand-blue">
          {b3.headingLines[0]}
          <br />
          <span className="inline-block bg-brand-lime px-2">{b3.headingLines[1]}</span>
        </h2>
        <ul className="mt-11 flex flex-col gap-11">
          {benefits.items.slice(0, 4).map((it, i) => {
            const art = b3.tiles[i];
            const wide = i === 0 || i === 3;
            const dark = TILE_DARK[i];
            const text = (
              <div className="flex flex-col items-start gap-3.5">
                <span className={`rounded-[30px] border-2 border-solid px-3.5 py-1.5 font-display text-[18px] font-extrabold ${dark ? "border-brand-lime text-brand-lime" : "border-brand-blue text-brand-blue"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={`font-display text-[22px] font-extrabold ${dark ? "text-white" : "text-brand-blue"}`}>{it.title}</h3>
                <p className={`font-display text-[15px] leading-[1.5] ${dark ? "text-white/90" : "text-brand-blue"}`}>{it.text}</p>
              </div>
            );
            return (
              <li key={it.title} className="flex flex-col gap-3.5 overflow-hidden px-6 py-[26px]" style={{ background: TILE_BG[i], borderRadius: 28, boxShadow: "0 18px 40px rgba(18,28,255,0.12)" }}>
                {wide ? (
                  <>
                    {text}
                    <ArtCrop art={art} />
                  </>
                ) : (
                  <>
                    <ArtCrop art={art} />
                    {text}
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      {/* ukośny pasek haseł */}
      <div className="relative mt-[26px] h-[94px] overflow-hidden" aria-label={b3.marquee.join(", ")}>
        <div className="absolute left-[-67px] top-[24px] h-[46px] w-[802px] overflow-hidden bg-brand-lime" style={{ transform: "rotate(4deg)" }}>
          <div className="marquee-track absolute flex h-full items-center whitespace-nowrap font-modular text-[17px] text-brand-blue">
            {[0, 1].map((k) => (
              <span key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
                {b3.marquee.map((m) => (
                  <span key={m} className="flex items-center">
                    <span>{m}</span>
                    <span className="mx-3">✦</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function MProgram3({ p }: { p: KursV2Page["program"] }) {
  return (
    <section className="relative w-full overflow-x-clip bg-page leading-[normal]" data-node-id="2161:3286">
      <div className="relative mx-auto max-w-[520px]">
        <h2
          className="relative z-10 whitespace-nowrap px-[14px] font-display text-[62px] font-black leading-none text-brand-blue"
          style={{ WebkitTextStroke: "5px white", paintOrder: "stroke fill", letterSpacing: 2 }}
        >
          {p.heading}
        </h2>
        <div className="-mt-[28px] flex flex-col gap-14 rounded-tr-[110px] bg-brand-blue px-5 pb-16 pt-[86px]">
          {p.modules.map((m, mi) => (
            <article key={m.title} className="flex flex-col gap-[22px]">
              <header className="flex items-center gap-[14px]">
                <span className="shrink-0 font-display text-[64px] font-black leading-[0.9] text-brand-lime">{modNum(mi)}</span>
                <div className="flex flex-col items-start gap-1.5">
                  <span className="font-modular text-[17px] leading-none text-brand-lime">MODUŁ</span>
                  <h3 className="font-display text-[20px] font-bold leading-[1.2] text-white">{m.title}</h3>
                  <span className="rounded-[30px] border-[1.5px] border-solid border-white px-[13px] py-[7px] font-modular text-[12px] leading-none text-white">
                    {plural(m.lessons.length, "lekcja", "lekcje", "lekcji").toUpperCase()}
                  </span>
                </div>
              </header>
              <ul className="flex flex-col gap-4">
                {m.lessons.map((l, li) => (
                  <li key={l.title} className="flex flex-col items-start gap-3.5 bg-white px-5 pb-[22px] pt-[22px]" style={{ borderRadius: 24, boxShadow: "0 14px 30px rgba(0,0,64,0.18)" }}>
                    <span className="rounded-[30px] bg-brand-blue px-3 py-1.5 font-display text-[12px] font-bold text-brand-lime">
                      LEKCJA {mi + 1}.{li + 1}
                    </span>
                    <h4 className="font-display text-[20px] font-extrabold leading-[1.2] text-brand-blue">{l.title}</h4>
                    <span className="block h-[1.5px] w-full bg-[rgba(19,29,255,0.15)]" aria-hidden />
                    <ul className="flex w-full flex-col gap-3">
                      {l.items.map((t) => (
                        <li key={t} className="flex items-start gap-3">
                          <img src="/assets/kurs3/k3-check.svg" alt="" aria-hidden className="size-[22px] shrink-0" />
                          <span className="min-w-0 flex-1 font-display text-[14px] font-medium leading-[1.5] text-[#0a1150]">{t}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
              {m.effect && (
                <div className="flex flex-col items-start gap-3 bg-brand-lime px-5 py-5" style={{ borderRadius: 24 }}>
                  <div className="flex items-center gap-3">
                    <img src="/assets/kurs3/k3-star-effect.svg" alt="" aria-hidden className="size-[30px]" />
                    <span className="rounded-[30px] border-[1.5px] border-solid border-brand-blue px-3.5 py-[7px] font-modular text-[12px] leading-none text-brand-blue">EFEKT MODUŁU</span>
                  </div>
                  <p className="font-display text-[16px] font-bold leading-[1.4] text-brand-blue">{m.effect}</p>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MAudience3({ a }: { a: NonNullable<KursV2Page["audience"]> }) {
  return (
    <section className="w-full leading-[normal]" style={{ background: "linear-gradient(180deg, #131dff 0 60%, #d6ff3f 60% 100%)" }} data-node-id="2180:2202">
      <div className="mx-auto max-w-[520px] px-5">
        <div className="flex flex-col gap-9 border-[5px] border-solid border-brand-blue bg-brand-lime px-[34px] py-11" style={{ borderRadius: 60 }}>
          <h2 className="font-display text-[56px] font-black leading-[1.12] text-brand-blue">{a.heading}</h2>
          <ul className="flex flex-col gap-6">
            {a.items.map((it) => (
              <li key={it} className="flex items-center gap-5 font-display text-[18px] font-extrabold uppercase tracking-[2.3px] text-brand-blue">
                <img src="/assets/kurs3/k3-star-blue.svg" alt="" aria-hidden className="h-[24px] w-[26px] shrink-0" />
                {it}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function MFaq3({ faq }: { faq: NonNullable<KursV2Page["faq"]> }) {
  return (
    <section className="w-full bg-brand-blue leading-[normal]" data-node-id="2162:2415">
      <div className="mx-auto flex max-w-[520px] flex-col gap-7 px-5 pb-14 pt-10">
        <div className="flex flex-col items-start gap-3">
          <span className="whitespace-pre rounded-[30px] bg-brand-lime px-3.5 py-1.5 font-display text-[12px] font-bold text-brand-blue">{"✦  FAQ"}</span>
          <h2 className="font-modular text-[32px] leading-none text-brand-lime">
            {faq.heading[0]}
            <br />
            {faq.heading[1]}
          </h2>
          <p className="font-display text-[15px] font-medium leading-[1.5] text-white/85">{faq.lead}</p>
        </div>
        <div className="flex flex-col gap-3">
          {faq.items.map((it, i) => (
            <details key={it.q} open={i === 0} className="group rounded-[20px] border border-solid border-white/25 bg-white/8 open:border-white open:bg-white">
              <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-[18px] font-display text-[16px] font-bold text-white group-open:text-brand-blue [&::-webkit-details-marker]:hidden">
                <span className="min-w-0 flex-1">{it.q}</span>
                <img src="/assets/kurs3/k3-faq-plus.svg" alt="" aria-hidden className="size-[30px] shrink-0 group-open:hidden" />
                <img src="/assets/kurs3/k3-faq-minus.svg" alt="" aria-hidden className="hidden size-[30px] shrink-0 group-open:block" />
              </summary>
              <p className="-mt-1.5 px-5 pb-5 font-display text-[15px] font-medium leading-[1.55] text-[#0a1150]">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
