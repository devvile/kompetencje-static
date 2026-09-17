/*
 * KURS — hero.
 *
 * DESKTOP (canvas 1440×791, y0–791; node 245:2627 dzieci).
 * Tytuł 3 linie Montserrat Black: 102 / 96 (blue) / ~106 (lime) — ink z renderu:
 * cap 197..272 / 288..358 / 375..452, left 122 (node x116 + bearing). Designer
 * dobierał stopień per linia tak, by KAŻDA linia miała ~526px szerokości —
 * FitText odtwarza tę regułę dla treści z CMS-a (linia szersza niż slot 527px
 * dostaje mniejszy stopień; krótsze linie renderują się 1:1 jak w Figmie).
 * Opis Manrope 16 lh1.31 (517 szer.), meta Montserrat Black 20 („Kurs online"
 * | „N moduły" / „N lekcji" do prawej — liczone z danych).
 * Lewa kolumna jest PRZEPŁYWEM (tytuł → opis → meta) z odstępami przepisanymi
 * z różnic `top` designu: przy treści z Figmy pozycje = 1:1, dłuższy lead
 * (7 linii zamiast 5) spycha meta niżej zamiast na niego nachodzić.
 * Gwiazda lime (bake alpha z renderu, 670,88 432×592) ZA zdjęciem; zdjęcie =
 * cutout robota (raw foto + maska z Figmy, kurs-robot-cut.png 1200×900) w klipie
 * (659,193.2 633.6×600.2), img 1323.2×1028.1 @ (-408,-255.9) — transform 1:1
 * z metadanych mask-grupy. Z-order: teksty | gwiazda | zdjęcie(robot).
 *
 * MOBILE (brak projektu w Figmie — układ przepływowy, px jak /manifest):
 * top bar wspólny, H1 3 linie (FitText do szerokości kolumny), lead, meta,
 * pod tekstem ten sam kadr robota z gwiazdą (procenty z geometrii desktopu).
 */
import type { NavLink } from "@/content/types";
import type { CourseContent } from "@/content/courses";
import { courseStats } from "@/content/courses";
import SiteNav from "../shared/SiteNav";
import MobileTopBar from "../shared/MobileTopBar";
import FitText from "../shared/FitText";

const c = (px: number) => `${(px / 14.4).toFixed(4)}cqw`;

const G = {
  h: 791,
  col: { left: 116, top: 184, titleW: 527 },
  // linie tytułu: stopień + odstęp od poprzedniej linii (design: top 184/274/361
  // przy lh 1 → 274 = 184+102-12, 361 = 274+96-9)
  lines: [
    { fontPx: 102, gapPx: 0 },
    { fontPx: 96, gapPx: -12 },
    { fontPx: 106, gapPx: -9 },
  ],
  desc: { gapPx: 36, w: 517, fontPx: 16, lhPx: 20.96 }, // top 503 = 361+106+36
  meta: { gapPx: 59, w: 510, fontPx: 20, lhPx: 23.8, rowGapPx: 4 }, // top 667 = 503+5×20.96+59
  star: { x: 670, y: 88, w: 432, h: 592 },
  photo: {
    clip: { x: 659, y: 193.2, w: 633.6, h: 600.2 },
    img: { x: -408, y: -255.9, w: 1323.2, h: 1028.1 },
  },
};

const pct = (v: number, base: number) => `${((v / base) * 100).toFixed(3)}%`;

/** kadr robota z gwiazdą — wspólny dla desktopu (klip w cqw) i mobile (%) */
function RobotFrame({ alt, className, style }: { alt: string; className?: string; style?: React.CSSProperties }) {
  const { clip, img } = G.photo;
  return (
    <div className={`relative ${className ?? ""}`} style={{ aspectRatio: `${clip.w}/${clip.h}`, ...style }}>
      {/* gwiazda lime ZA zdjęciem (pozycja względem klipu zdjęcia) */}
      <img
        src="/assets/kurs-hero-star-f.png"
        alt=""
        aria-hidden
        className="absolute max-w-none"
        style={{
          left: pct(G.star.x - clip.x, clip.w), top: pct(G.star.y - clip.y, clip.h),
          width: pct(G.star.w, clip.w), height: pct(G.star.h, clip.h),
        }}
      />
      <div className="absolute inset-0 overflow-hidden" data-node-id="245:2972">
        <img
          src="/assets/kurs-robot-cut.png"
          alt={alt}
          className="absolute max-w-none"
          style={{ left: pct(img.x, clip.w), top: pct(img.y, clip.h), width: pct(img.w, clip.w), height: pct(img.h, clip.h) }}
        />
      </div>
    </div>
  );
}

function HeroDesktop({ course, nav }: { course: CourseContent; nav: NavLink[] }) {
  const { hero } = course;
  const stats = courseStats(course);
  const robotAlt = `Robot AI wspinający się na skałę — kurs ${hero.titleLines.join(" ")}`;
  return (
    <section className="relative hidden w-full overflow-x-clip md:block">
      <div className="@container mx-auto w-full max-w-(--workspace)">
        <div className="relative bg-page" style={{ aspectRatio: `1440/${G.h}` }} data-node-id="245:2627">
          <SiteNav nav={nav} />
          {/* lewa kolumna: tytuł → opis → meta (przepływ) */}
          <div className="absolute flex flex-col" style={{ left: c(G.col.left), top: c(G.col.top) }}>
            <h1 className="pointer-events-none flex flex-col font-display font-black" style={{ width: c(G.col.titleW) }}>
              {hero.titleLines.map((t, i) => (
                <FitText
                  key={i}
                  className={i === 2 ? "text-brand-lime" : "text-brand-blue"}
                  style={{ fontSize: c(G.lines[i].fontPx), lineHeight: 1, marginTop: c(G.lines[i].gapPx) }}
                >
                  {t}
                </FitText>
              ))}
            </h1>
            <p
              className="font-body text-brand-blue"
              style={{
                marginTop: c(G.desc.gapPx), width: c(G.desc.w),
                fontSize: c(G.desc.fontPx), lineHeight: `${(G.desc.lhPx / 14.4).toFixed(4)}cqw`,
              }}
            >
              {hero.lead}
            </p>
            {/* meta kursu — liczby z danych */}
            <div
              className="flex flex-col font-display font-black text-brand-blue"
              style={{
                marginTop: c(G.meta.gapPx), width: c(G.meta.w),
                fontSize: c(G.meta.fontPx), lineHeight: `${(G.meta.lhPx / 14.4).toFixed(4)}cqw`,
                gap: c(G.meta.rowGapPx),
              }}
            >
              <div className="flex items-center justify-between">
                <span>{hero.format}</span>
                <span>{stats.modules}</span>
              </div>
              <span className="text-right">{stats.lessons}</span>
            </div>
          </div>
          {/* zdjęcie robota + gwiazda — klip w cqw, warstwa nad tekstem */}
          <RobotFrame
            alt={robotAlt}
            className="absolute"
            style={{ left: c(G.photo.clip.x), top: c(G.photo.clip.y), width: c(G.photo.clip.w) }}
          />
        </div>
      </div>
    </section>
  );
}

function HeroMobile({ course, nav }: { course: CourseContent; nav: NavLink[] }) {
  const { hero } = course;
  const stats = courseStats(course);
  const robotAlt = `Robot AI wspinający się na skałę — kurs ${hero.titleLines.join(" ")}`;
  return (
    <section className="relative w-full overflow-x-clip bg-page md:hidden" data-node-id="245:2627">
      <MobileTopBar nav={nav} />
      <div className="flex flex-col px-[20px] pt-[130px]">
        <h1 className="flex flex-col font-display font-black" style={{ fontSize: 50, lineHeight: 0.98 }}>
          {hero.titleLines.map((t, i) => (
            <FitText key={i} className={i === 2 ? "text-brand-lime" : "text-brand-blue"}>
              {t}
            </FitText>
          ))}
        </h1>
        <p className="mt-[20px] font-body text-[15px] leading-[1.5] text-brand-blue">{hero.lead}</p>
        <p className="mt-[22px] flex flex-wrap items-center gap-x-[10px] font-display text-[15px] font-black leading-[1.2] text-brand-blue">
          <span>{hero.format}</span>
          <span aria-hidden>·</span>
          <span>{stats.modules}</span>
          <span aria-hidden>·</span>
          <span>{stats.lessons}</span>
        </p>
      </div>
      {/* robot pod tekstem — ten sam kadr co desktop, na całą szerokość */}
      <RobotFrame alt={robotAlt} className="mt-[8px] w-full overflow-hidden" />
    </section>
  );
}

export default function KursHero({ course, nav }: { course: CourseContent; nav: NavLink[] }) {
  return (
    <>
      <HeroDesktop course={course} nav={nav} />
      <HeroMobile course={course} nav={nav} />
    </>
  );
}
