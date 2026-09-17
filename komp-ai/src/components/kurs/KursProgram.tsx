/*
 * KURS — sekcje 3+4: intro PROGRAM (y1362–1833, canvas 1440×471) + moduły
 * (blue Rectangle 4 z dużym radiusem TYLKO top-right ~265 — pomiar krzywej
 * z renderu; PROGRAM bleeduje na box).
 * PROGRAM = litery pozycjonowane OSOBNO (kolumny ink z renderu: designer
 * rozciągał/rozstawiał litery ręcznie). WSZYSTKIE litery solid blue z BIAŁYM
 * strokiem zewnętrznym 2.5-3px (paint-order: stroke — biel pod fillem);
 * biały kontur trzyma czytelność tam, gdzie litery bleedują na blue box.
 * Kicker/outro HK Modular ~27 lh42 (ink z renderu; design context mówił 25/30
 * — render temu przeczy). Moduły: „01"/„02" HK 100 lime, MODUŁ HK 45,
 * tytuły lekcji Montserrat Bold 23 lime, itemy SemiBold 16 white lh1.61
 * z dyskami. Spark lime = bake alpha.
 *
 * MODUŁY = UKŁAD PRZEPŁYWOWY (od 2026-09-17): design miał 2 moduły / 5 lekcji
 * na sztywnych `top` w panelu o stałym aspect-ratio 1440/2032. Panel ma teraz
 * padding + pionową listę modułów o dowolnej liczbie lekcji; odstępy
 * przepisane z różnic `top` designu (lekcja co 179 = 20+38.8+5.2+4×25.76+12,
 * moduł: header 173 + odstęp 38 po ostatniej lekcji), więc przy treści
 * z Figmy pozycje = 1:1, a wysokość panelu wynika z treści (2032 przy starej
 * treści). Kolumna lekcji 576px (40cqw) — punkty ~90 znaków łamią się
 * i nie wchodzą pod dymek (x 1023).
 * Dymek podsumowania modułu: w designie bake (elipsa + gwiazdy, tekst
 * zinpaintowany) 330×140 / 400×215 — zastąpiony CSS-em o tym samym kształcie
 * (elipsa z białym konturem 2px + gwiazdy SVG, warianty jak w designie:
 * moduł nieparzysty = biała gwiazda prawy-dół, parzysty = lime prawy-góra
 * + biała lewy-dół), bo summary z CMS-a (~130 znaków) nie mieści się w bake'u;
 * elipsa rośnie w pion z treścią (padding 15% = prostokąt wpisany w elipsę).
 *
 * MOBILE (brak projektu — przepływ px): kicker + PROGRAM (stroke) bleedujący
 * na panel, moduły w jednej kolumnie, dymek POD lekcjami modułu.
 */
import type { CourseContent } from "@/content/courses";

type Module = CourseContent["modules"][number];
type Lesson = Module["lessons"][number];

const c = (px: number) => `${(px / 14.4).toFixed(4)}cqw`;
const HEADING = "PROGRAM";

const GI = {
  h: 471, // 1362..1833
  kicker: { left: 309, top: 132, fontPx: 25, lhPx: 42 }, // ink cap y1505/1547 (abs)
  spark: { x: 1072, y: 131, w: 126, h: 214 }, // abs (1072,1493)
  // PROGRAM: f166 (cap 119 = design); per-litera scaleX + left tak, by ink
  // trafił w kolumny designu (P38..155 R174..291 O307..448 G463..590
  // R610..727 A767..869 M914..1064); bearing zmierzony z impl i skalowany.
  // strokePx = pełna szerokość CSS text-stroke (centrowany); widoczna jest
  // zewnętrzna połowa ~2.75px = zmierzony biały kontur designu (2-3px)
  program: {
    top: 363, fontPx: 166, strokePx: 5.5,
    letters: [
      { x: 27.1, sx: 1.0935 },
      { x: 163.1, sx: 1.0935 },
      { x: 303.8, sx: 1.0602 },
      { x: 457.6, sx: 1.0855 },
      { x: 601.6, sx: 1.0541 },
      { x: 759.0, sx: 0.887 },
      { x: 903.1, sx: 1.087 },
    ],
  },
};

const GM = {
  radius: 265, // tylko top-right
  panelTop: 129, // „01" designu: y129 od góry panelu
  panelBottom: 291, // 2032 - (1655 + 86) pod przyciskiem
  // MODUŁ: design-context mówi f45, ale ink designu = nasz HK f27.7 (empiria)
  header: {
    numX: 192, numFontPx: 100, numLh: 1.688,
    colX: 384, colW: 618,
    padTop: 38, // MODUŁ y167 = 129 + 38
    modulFontPx: 27.7, modulLhPx: 40,
    titleGap: 12, titleFontPx: 23, titleLhPx: 38.8, // tytuł y219 = 167 + 40 + 12
    padBottom: 44, // pierwsza gwiazdka y302 = 219 + 38.8 + 44
  },
  moduleGap: 38, // „02" y698 = ostatnia lekcja (481+64+4×25.76+12=660) + 38
  lesson: {
    x: 296, starW: 74, starH: 78, // gwiazdka x296
    titleDx: 112, titleTop: 20, titleFontPx: 23, titleLhPx: 38.8, // tytuł x408, y+20
    itemsDx: 109, itemsGap: 5.2, itemsFontPx: 16, itemsLhPx: 25.76, itemsW: 576, // itemy x405, y+64
    padBottom: 12,
    bulletIndent: 24,
  },
  bubble: { x: 1023, dy: 57, w: 390, minH: 140, borderPx: 2.2, fontPx: 11.7, lhPx: 23.6, padX: 58, padY: 24, starPx: 60 },
  outro: { gap: 140, left: 352, w: 736, fontPx: 25, lhPx: 42 }, // y1566 = 1414 (koniec itemów) + 12 + 140
  button: { gap: 47, x: 520, w: 399, h: 86, borderPx: 2.5, fontPx: 25 }, // y1655 = 1566 + 42 + 47
};

/* ---------- elementy wspólne ---------- */

/** czteroramienna gwiazda jak w bake'ach dymków */
function Star4({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={className} style={style} fill="currentColor">
      <path d="M50 0C54 32 68 46 100 50C68 54 54 68 50 100C46 68 32 54 0 50C32 46 46 32 50 0Z" />
    </svg>
  );
}

/** dymek podsumowania modułu: elipsa z białym konturem + gwiazdy (wariant per moduł) */
function Bubble({ text, variant, s, className, style }: {
  text: string;
  variant: "a" | "b";
  /** skalowanie px designu → jednostka (cqw na desktopie, px na mobile) */
  s: (px: number) => string;
  /** pozycjonowanie (absolute/relative) podaje wywołujący */
  className?: string;
  style?: React.CSSProperties;
}) {
  const b = GM.bubble;
  return (
    <div className={className} style={style}>
      <div
        className="flex items-center border-solid border-white"
        style={{
          minHeight: s(b.minH), borderWidth: s(b.borderPx), borderRadius: "50%",
          padding: `${s(b.padY)} ${s(b.padX)}`,
        }}
      >
        <p className="font-modular text-white" style={{ fontSize: s(b.fontPx), lineHeight: `${s(b.lhPx)}` }}>
          {text}
        </p>
      </div>
      {variant === "a" ? (
        <Star4 className="absolute text-white" style={{ right: s(-14), bottom: s(-8), width: s(b.starPx), height: s(b.starPx) }} />
      ) : (
        <>
          <Star4 className="absolute text-brand-lime" style={{ right: s(-6), top: s(-30), width: s(b.starPx * 1.15), height: s(b.starPx * 1.15) }} />
          <Star4 className="absolute text-white" style={{ left: s(-18), bottom: s(-14), width: s(b.starPx * 0.85), height: s(b.starPx * 0.85) }} />
        </>
      )}
    </div>
  );
}

/* ---------- desktop: intro ---------- */

export function KursProgramIntro({ course }: { course: CourseContent }) {
  return (
    <>
      <section className="relative z-10 hidden w-full overflow-x-clip md:block">
        <div className="@container mx-auto w-full max-w-(--workspace)">
          <div className="relative bg-page" style={{ aspectRatio: `1440/${GI.h}` }}>
            {/* kicker HK 2 linie */}
            <p
              className="absolute font-modular text-brand-blue"
              style={{
                left: c(GI.kicker.left), top: c(GI.kicker.top),
                fontSize: c(GI.kicker.fontPx), lineHeight: `${(GI.kicker.lhPx / 14.4).toFixed(4)}cqw`,
              }}
              data-node-id="245:3010"
            >
              <span className="block">{course.teaser[0]}</span>
              <span className="block">{course.teaser[1]}</span>
            </p>
            {/* spark lime przy prawej krawędzi */}
            <img src="/assets/kurs-prog-spark-f.png" alt="" aria-hidden className="absolute"
              style={{ left: c(GI.spark.x), top: c(GI.spark.y), width: c(GI.spark.w), height: c(GI.spark.h) }} />
            {/* PROGRAM — litery osobno; bleed na blue box sekcji 4 */}
            <h2 aria-label={HEADING} className="absolute inset-x-0 font-display font-black" data-node-id="245:3009">
              {GI.program.letters.map((l, i) => (
                <span
                  key={i}
                  aria-hidden
                  className="absolute block origin-top-left text-brand-blue"
                  style={{
                    left: c(l.x), top: c(GI.program.top),
                    fontSize: c(GI.program.fontPx), lineHeight: 1,
                    transform: `scaleX(${l.sx})`,
                    WebkitTextStroke: `${c(GI.program.strokePx)} #fff`,
                    paintOrder: "stroke fill",
                  }}
                >
                  {HEADING[i]}
                </span>
              ))}
            </h2>
          </div>
        </div>
      </section>
      {/* mobile: kicker + spark + PROGRAM bleedujący na panel */}
      <section className="relative z-10 w-full overflow-x-clip bg-page px-[20px] pt-[44px] md:hidden">
        <div className="relative">
          <p className="font-modular text-[14px] leading-[1.6] text-brand-blue" data-node-id="245:3010">
            <span className="block">{course.teaser[0]}</span>
            <span className="block">{course.teaser[1]}</span>
          </p>
          <img src="/assets/kurs-prog-spark-f.png" alt="" aria-hidden className="absolute right-0 top-[-8px] h-[92px] w-[54px]" />
        </div>
        <h2
          aria-label={HEADING}
          className="mb-[-0.42em] mt-[28px] font-display font-black leading-none text-brand-blue"
          style={{ fontSize: "clamp(44px, 15.5vw, 70px)", WebkitTextStroke: "0.03em #fff", paintOrder: "stroke fill" }}
          data-node-id="245:3009"
        >
          {HEADING}
        </h2>
      </section>
    </>
  );
}

/* ---------- desktop: moduły (przepływ) ---------- */

function LessonDesktop({ lesson, bubble }: { lesson: Lesson; bubble?: { text: string; variant: "a" | "b" } }) {
  const L = GM.lesson;
  return (
    <li className="relative" style={{ paddingTop: c(L.titleTop), paddingBottom: c(L.padBottom), paddingLeft: c(L.titleDx) }}>
      <img src="/assets/kurs-lesson-star-f.png" alt="" aria-hidden className="absolute left-0 top-0"
        style={{ width: c(L.starW), height: c(L.starH) }} />
      <h4
        className="font-display font-bold text-brand-lime"
        style={{ fontSize: c(L.titleFontPx), lineHeight: `${(L.titleLhPx / 14.4).toFixed(4)}cqw` }}
      >
        {lesson.title}
      </h4>
      <ul
        className="list-disc font-display font-semibold text-white"
        style={{
          marginTop: c(L.itemsGap), marginLeft: c(L.itemsDx - L.titleDx), width: c(L.itemsW),
          fontSize: c(L.itemsFontPx), lineHeight: `${(L.itemsLhPx / 14.4).toFixed(4)}cqw`,
        }}
      >
        {lesson.bullets.map((it) => (
          <li key={it} style={{ marginInlineStart: c(L.bulletIndent) }}>{it}</li>
        ))}
      </ul>
      {bubble ? (
        <Bubble
          text={bubble.text}
          variant={bubble.variant}
          s={c}
          className="absolute"
          style={{ left: c(GM.bubble.x - L.x), top: c(GM.bubble.dy), width: c(GM.bubble.w) }}
        />
      ) : null}
    </li>
  );
}

function ModuleDesktop({ m, index }: { m: Module; index: number }) {
  const H = GM.header;
  const variant = index % 2 === 0 ? "a" : "b";
  return (
    <li style={{ marginTop: index > 0 ? c(GM.moduleGap) : 0 }}>
      <div className="relative" style={{ paddingLeft: c(H.colX), paddingTop: c(H.padTop), paddingBottom: c(H.padBottom) }}>
        <span
          className="absolute top-0 font-modular text-brand-lime"
          style={{ left: c(H.numX), fontSize: c(H.numFontPx), lineHeight: H.numLh }}
        >
          {m.number}
        </span>
        <h3 className="font-modular text-brand-lime" style={{ fontSize: c(H.modulFontPx), lineHeight: `${(H.modulLhPx / 14.4).toFixed(4)}cqw` }}>
          MODUŁ
        </h3>
        <p
          className="font-display font-bold text-brand-lime"
          style={{ marginTop: c(H.titleGap), width: c(H.colW), fontSize: c(H.titleFontPx), lineHeight: `${(H.titleLhPx / 14.4).toFixed(4)}cqw` }}
        >
          {m.title}
        </p>
      </div>
      <ul className="flex flex-col" style={{ paddingLeft: c(GM.lesson.x) }}>
        {m.lessons.map((lesson, i) => (
          <LessonDesktop key={i} lesson={lesson} bubble={i === 0 ? { text: m.summary, variant } : undefined} />
        ))}
      </ul>
    </li>
  );
}

/* ---------- mobile: moduły ---------- */

function ModuleMobile({ m, index }: { m: Module; index: number }) {
  const variant = index % 2 === 0 ? "a" : "b";
  const px = (v: number) => `${(v * 0.9).toFixed(2)}px`;
  return (
    <li className={index > 0 ? "mt-[44px]" : ""}>
      <div className="flex items-start gap-[16px]">
        <span className="font-modular text-[56px] leading-[1] text-brand-lime">{m.number}</span>
        <div className="pt-[6px]">
          <h3 className="font-modular text-[16px] leading-[1.4] text-brand-lime">MODUŁ</h3>
          <p className="mt-[4px] font-display text-[17px] font-bold leading-[1.3] text-brand-lime">{m.title}</p>
        </div>
      </div>
      <ul className="mt-[22px] flex flex-col gap-[20px]">
        {m.lessons.map((lesson, i) => (
          <li key={i} className="relative pl-[46px]">
            <img src="/assets/kurs-lesson-star-f.png" alt="" aria-hidden className="absolute left-0 top-[-4px] h-[36px] w-[34px]" />
            <h4 className="font-display text-[16px] font-bold leading-[1.35] text-brand-lime">{lesson.title}</h4>
            <ul className="mt-[6px] list-disc pl-[18px] font-display text-[14px] font-semibold leading-[1.6] text-white">
              {lesson.bullets.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      {/* dymek POD lekcjami (na mobile nie ma miejsca obok) */}
      <Bubble text={m.summary} variant={variant} s={px} className="relative mx-auto mt-[28px] w-[min(100%,340px)]" />
    </li>
  );
}

export default function KursProgramModules({ course }: { course: CourseContent }) {
  return (
    <>
      {/* desktop */}
      <section className="relative hidden w-full overflow-x-clip md:block">
        <div className="@container mx-auto w-full max-w-(--workspace)">
          <div
            className="relative bg-brand-blue"
            style={{ borderRadius: `0 ${c(GM.radius)} 0 0`, paddingTop: c(GM.panelTop), paddingBottom: c(GM.panelBottom) }}
            data-node-id="245:3008"
          >
            <ul className="flex flex-col">
              {course.modules.map((m, i) => (
                <ModuleDesktop key={i} m={m} index={i} />
              ))}
            </ul>
            {/* outro + CTA */}
            <p
              className="text-center font-modular text-white"
              style={{
                marginTop: c(GM.outro.gap), marginLeft: c(GM.outro.left), width: c(GM.outro.w),
                fontSize: c(GM.outro.fontPx), lineHeight: `${(GM.outro.lhPx / 14.4).toFixed(4)}cqw`,
              }}
              data-node-id="245:3011"
            >
              {course.closingLine}
            </p>
            <a
              href={course.cta.href}
              className="flex items-center justify-center rounded-full border-solid border-white bg-brand-lime font-modular text-brand-blue"
              style={{
                marginTop: c(GM.button.gap), marginLeft: c(GM.button.x), width: c(GM.button.w), height: c(GM.button.h),
                borderWidth: c(GM.button.borderPx), fontSize: c(GM.button.fontPx), lineHeight: 1,
              }}
              data-node-id="245:3396"
            >
              {course.cta.label}
            </a>
          </div>
        </div>
      </section>
      {/* mobile */}
      <section className="relative w-full overflow-x-clip md:hidden">
        <div className="rounded-tr-[90px] bg-brand-blue px-[20px] pb-[48px] pt-[64px]" data-node-id="245:3008">
          <ul className="flex flex-col">
            {course.modules.map((m, i) => (
              <ModuleMobile key={i} m={m} index={i} />
            ))}
          </ul>
          <p className="mt-[48px] text-center font-modular text-[14px] leading-[1.6] text-white" data-node-id="245:3011">
            {course.closingLine}
          </p>
          <a
            href={course.cta.href}
            className="mt-[22px] flex h-[55px] w-full items-center justify-center rounded-[40px] border-[3px] border-solid border-white bg-brand-lime font-modular text-[13px] tracking-[0.52px] text-brand-blue"
            data-node-id="245:3396"
          >
            {course.cta.label}
          </a>
        </div>
      </section>
    </>
  );
}
