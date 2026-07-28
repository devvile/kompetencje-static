/*
 * KURS — hero desktop (canvas 1440×791, y0–791; node 245:2627 dzieci).
 * Tytuł 3 linie Montserrat Black: „AGENT AI" 102 / „W TWOIM" 96 (blue) /
 * „BIZNESIE" ~104 (lime) — ink z renderu: cap 197..272 / 288..358 / 375..452,
 * left 122 (node x116 + bearing). Opis Manrope 16 lh1.31 mixed-bold (517 szer.).
 * Meta: Montserrat Black 20 („Kurs online" | „4 moduły" / „16 lekcji" do prawej).
 * Gwiazda lime (bake alpha z renderu, 670,88 432×592) ZA zdjęciem; zdjęcie =
 * cutout robota (raw foto + maska z Figmy, kurs-robot-cut.png 1200×900) w klipie
 * (659,193.2 633.6×600.2), img 1323.2×1028.1 @ (-408,-255.9) — transform 1:1
 * z metadanych mask-grupy. Z-order: teksty | gwiazda | zdjęcie(robot).
 */
import type { KursHeroData, NavLink } from "@/content/types";
import SiteNav from "../shared/SiteNav";

const c = (px: number) => `${(px / 14.4).toFixed(4)}cqw`;

const G = {
  h: 791,
  line1: { left: 116, top: 184, fontPx: 102 }, // ink cel y198..270
  line2: { left: 116, top: 274, fontPx: 96 }, // ink cel y288..356
  accent: { left: 116, top: 361, fontPx: 106 }, // ink cel y376..452 (szer. 516)
  desc: { left: 116, top: 503, w: 517, fontPx: 16, lhPx: 20.96 },
  meta: { left: 116, top: 667, w: 510, fontPx: 20, lhPx: 23.8, gapPx: 4 },
  star: { x: 670, y: 88, w: 432, h: 592 },
  photo: {
    clip: { x: 659, y: 193.2, w: 633.6, h: 600.2 },
    img: { x: -408, y: -255.9, w: 1323.2, h: 1028.1 },
  },
};

export default function KursHero({ hero, nav }: { hero: KursHeroData; nav: NavLink[] }) {
  return (
    <section className="relative hidden w-full overflow-x-clip md:block">
      <div className="@container mx-auto w-full max-w-(--workspace)">
        <div className="relative bg-page" style={{ aspectRatio: `1440/${G.h}` }} data-node-id="245:2627">
          <SiteNav nav={nav} />
          {/* gwiazda lime ZA zdjęciem */}
          <img src="/assets/kurs-hero-star-f.png" alt="" aria-hidden className="absolute"
            style={{ left: c(G.star.x), top: c(G.star.y), width: c(G.star.w), height: c(G.star.h) }} />
          {/* zdjęcie robota — cutout w klipie (transform z metadanych Figmy) */}
          <div
            className="absolute overflow-hidden"
            style={{
              left: c(G.photo.clip.x), top: c(G.photo.clip.y),
              width: c(G.photo.clip.w), height: c(G.photo.clip.h),
            }}
            data-node-id="245:2972"
          >
            <img
              src="/assets/kurs-robot-cut.png"
              alt="Robot AI wspinający się na skałę — kurs Agent AI w Twoim biznesie"
              className="absolute max-w-none"
              style={{
                left: `${((G.photo.img.x / G.photo.clip.w) * 100).toFixed(3)}%`,
                top: `${((G.photo.img.y / G.photo.clip.h) * 100).toFixed(3)}%`,
                width: `${((G.photo.img.w / G.photo.clip.w) * 100).toFixed(3)}%`,
                height: `${((G.photo.img.h / G.photo.clip.h) * 100).toFixed(3)}%`,
              }}
            />
          </div>
          {/* tytuł: 2 linie blue + akcent lime */}
          <h1 className="pointer-events-none absolute inset-0 font-display font-black">
            {[
              { t: hero.titleLines[0], g: G.line1, cls: "text-brand-blue" },
              { t: hero.titleLines[1], g: G.line2, cls: "text-brand-blue" },
              { t: hero.titleAccent, g: G.accent, cls: "text-brand-lime" },
            ].map(({ t, g, cls }) => (
              <span
                key={t}
                className={`absolute block whitespace-nowrap ${cls}`}
                style={{ left: c(g.left), top: c(g.top), fontSize: c(g.fontPx), lineHeight: 1 }}
              >
                {t}
              </span>
            ))}
          </h1>
          {/* opis mixed-bold */}
          <p
            className="absolute font-body text-brand-blue"
            style={{
              left: c(G.desc.left), top: c(G.desc.top), width: c(G.desc.w),
              fontSize: c(G.desc.fontPx), lineHeight: `${(G.desc.lhPx / 14.4).toFixed(4)}cqw`,
            }}
          >
            {hero.description.map((s, i) => (
              <span key={i} className={s.strong ? "font-bold" : "font-normal"}>{s.text}</span>
            ))}
          </p>
          {/* meta kursu */}
          <div
            className="absolute flex flex-col font-display font-black text-brand-blue"
            style={{
              left: c(G.meta.left), top: c(G.meta.top), width: c(G.meta.w),
              fontSize: c(G.meta.fontPx), lineHeight: `${(G.meta.lhPx / 14.4).toFixed(4)}cqw`,
              gap: c(G.meta.gapPx),
            }}
          >
            <div className="flex items-center justify-between">
              <span>{hero.metaFormat}</span>
              <span>{hero.metaModules}</span>
            </div>
            <span className="text-right">{hero.metaLessons}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
