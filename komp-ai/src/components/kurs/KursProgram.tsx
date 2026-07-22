/*
 * KURS — sekcje 3+4: intro PROGRAM (y1362–1833, canvas 1440×471) + moduły
 * (y1833–3865, canvas 1440×2032, blue Rectangle 4 z dużym radiusem TYLKO
 * top-right ~265 — pomiar krzywej z renderu; PROGRAM bleeduje na box).
 * PROGRAM = litery pozycjonowane OSOBNO (kolumny ink z renderu: designer
 * rozciągał/rozstawiał litery ręcznie). WSZYSTKIE litery solid blue z BIAŁYM
 * strokiem zewnętrznym 2.5-3px (paint-order: stroke — biel pod fillem);
 * biały kontur trzyma czytelność tam, gdzie litery bleedują na blue box.
 * (Wcześniejsze "O i R2 jako outline" było błędnym odczytem renderu.)
 * Kicker/outro HK Modular ~27 lh42 (ink z renderu; design context mówił 25/30
 * — render temu przeczy). Moduły: „01"/„02" HK 100 lime, MODUŁ HK 45,
 * tytuły lekcji Montserrat Bold 23 lime, itemy SemiBold 16 white lh1.61
 * z dyskami. Dymki = bake opaque (elipsa+gwiazdy, tekst zinpaintowany na blue)
 * + prawdziwy tekst HK 14 white na wierzchu. Spark lime = bake alpha.
 */
import type { KursPage } from "@/content/types";

const c = (px: number) => `${(px / 14.4).toFixed(4)}cqw`;

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
  h: 2032, // 1833..3865
  radius: 265, // tylko top-right
  // MODUŁ: design-context mówi f45, ale ink designu = nasz HK f27.7 (empiria)
  mod1: {
    num: { x: 192, y: 129, fontPx: 100 },
    modul: { x: 384, y: 167, fontPx: 27.7, lhPx: 40 },
    title: { x: 384, y: 219, w: 618, fontPx: 23, lhPx: 38.8 },
  },
  mod2: {
    num: { x: 190, y: 698, fontPx: 100 },
    modul: { x: 382, y: 736, fontPx: 27.7, lhPx: 40 },
    title: { x: 382, y: 789, w: 618, fontPx: 23, lhPx: 38.8 },
  },
  // lekcje: [gwiazdka y, tytuł y, itemy y] (x stałe: star 296, title 408, items 401)
  lessons1: [
    { star: 302, title: 322, items: 366 },
    { star: 481, title: 501, items: 545 },
  ],
  lessons2: [
    { star: 871, title: 891, items: 935 },
    { star: 1050, title: 1070, items: 1114 },
    { star: 1247, title: 1267, items: 1311 },
  ],
  starX: 296, starW: 74, starH: 78,
  titleX: 408, titleFontPx: 23,
  itemsX: 405, itemsFontPx: 16, itemsLhPx: 25.76,
  bubble1: { img: { x: 1023, y: 359, w: 330, h: 140 }, text: { x: 1074, y: 396, w: 197 } },
  bubble2: { img: { x: 1040, y: 952, w: 400, h: 215 }, text: { x: 1070, y: 1040, w: 229 } },
  bubbleFontPx: 11.7, bubbleLhPx: 23.6,
  outro: { left: 352, top: 1566, w: 736, fontPx: 25, lhPx: 42 },
  button: { x: 520, y: 1655, w: 399, h: 86, borderPx: 2.5, fontPx: 25 },
};

export function KursProgramIntro({ program }: { program: KursPage["program"] }) {
  return (
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
            <span className="block">gotowy do wejścia</span>
            <span className="block">na następny poziom wtajemniczenia ?</span>
          </p>
          {/* spark lime przy prawej krawędzi */}
          <img src="/assets/kurs-prog-spark-f.png" alt="" aria-hidden className="absolute"
            style={{ left: c(GI.spark.x), top: c(GI.spark.y), width: c(GI.spark.w), height: c(GI.spark.h) }} />
          {/* PROGRAM — litery osobno, część outline; bleed na blue box sekcji 4 */}
          <h2 aria-label={program.heading} className="absolute inset-x-0 font-display font-black" data-node-id="245:3009">
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
                {program.heading[i]}
              </span>
            ))}
          </h2>
        </div>
      </div>
    </section>
  );
}

function Lesson({ g, lesson }: { g: { star: number; title: number; items: number }; lesson: KursPage["program"]["modules"][0]["lessons"][0] }) {
  return (
    <div>
      <img src="/assets/kurs-lesson-star-f.png" alt="" aria-hidden className="absolute"
        style={{ left: c(GM.starX), top: c(g.star), width: c(GM.starW), height: c(GM.starH) }} />
      <h4
        className="absolute whitespace-nowrap font-display font-bold text-brand-lime"
        style={{ left: c(GM.titleX), top: c(g.title), fontSize: c(GM.titleFontPx), lineHeight: `${(38.8 / 14.4).toFixed(4)}cqw` }}
      >
        {lesson.title}
      </h4>
      <ul
        className="absolute list-disc font-display font-semibold text-white"
        style={{
          left: c(GM.itemsX), top: c(g.items),
          fontSize: c(GM.itemsFontPx), lineHeight: `${(GM.itemsLhPx / 14.4).toFixed(4)}cqw`,
        }}
      >
        {lesson.items.map((it) => (
          <li key={it} className="whitespace-nowrap" style={{ marginInlineStart: c(24) }}>{it}</li>
        ))}
      </ul>
    </div>
  );
}

function ModuleHeader({ g, num, title }: { g: typeof GM.mod1; num: string; title: string }) {
  return (
    <div>
      <span className="absolute font-modular text-brand-lime" style={{ left: c(g.num.x), top: c(g.num.y), fontSize: c(g.num.fontPx), lineHeight: `${((g.num.fontPx * 1.688) / 14.4).toFixed(4)}cqw` }}>
        {num}
      </span>
      <h3 className="absolute font-modular text-brand-lime" style={{ left: c(g.modul.x), top: c(g.modul.y), fontSize: c(g.modul.fontPx), lineHeight: `${(g.modul.lhPx / 14.4).toFixed(4)}cqw` }}>
        MODUŁ
      </h3>
      <p className="absolute font-display font-bold text-brand-lime" style={{ left: c(g.title.x), top: c(g.title.y), width: c(g.title.w), fontSize: c(g.title.fontPx), lineHeight: `${(g.title.lhPx / 14.4).toFixed(4)}cqw` }}>
        {title}
      </p>
    </div>
  );
}

export default function KursProgramModules({ program }: { program: KursPage["program"] }) {
  const [m1, m2] = program.modules;
  return (
    <section className="relative w-full overflow-x-clip md:block hidden">
      <div className="@container mx-auto w-full max-w-(--workspace)">
        <div className="relative bg-page" style={{ aspectRatio: `1440/${GM.h}` }}>
          <div
            className="absolute inset-0 bg-brand-blue"
            style={{ borderRadius: `0 ${c(GM.radius)} 0 0` }}
            data-node-id="245:3008"
          />
          <ModuleHeader g={GM.mod1} num={m1.num} title={m1.title} />
          {GM.lessons1.map((g, i) => (
            <Lesson key={i} g={g} lesson={m1.lessons[i]} />
          ))}
          {/* dymek 1 (bake: elipsa + gwiazdy; tekst prawdziwy) */}
          <img src="/assets/kurs-bubble1-f.png" alt="" aria-hidden className="absolute"
            style={{ left: c(GM.bubble1.img.x), top: c(GM.bubble1.img.y), width: c(GM.bubble1.img.w), height: c(GM.bubble1.img.h) }} />
          <p className="absolute font-modular text-white" style={{ left: c(GM.bubble1.text.x), top: c(GM.bubble1.text.y), width: c(GM.bubble1.text.w), fontSize: c(GM.bubbleFontPx), lineHeight: `${(GM.bubbleLhPx / 14.4).toFixed(4)}cqw` }}>
            {m1.bubble}
          </p>
          <ModuleHeader g={GM.mod2} num={m2.num} title={m2.title} />
          {GM.lessons2.map((g, i) => (
            <Lesson key={i} g={g} lesson={m2.lessons[i]} />
          ))}
          {/* dymek 2 */}
          <img src="/assets/kurs-bubble2-f.png" alt="" aria-hidden className="absolute"
            style={{ left: c(GM.bubble2.img.x), top: c(GM.bubble2.img.y), width: c(GM.bubble2.img.w), height: c(GM.bubble2.img.h) }} />
          <p className="absolute font-modular text-white" style={{ left: c(GM.bubble2.text.x), top: c(GM.bubble2.text.y), width: c(GM.bubble2.text.w), fontSize: c(GM.bubbleFontPx), lineHeight: `${(GM.bubbleLhPx / 14.4).toFixed(4)}cqw` }}>
            {m2.bubble}
          </p>
          {/* outro + CTA */}
          <p
            className="absolute text-center font-modular text-white"
            style={{
              left: c(GM.outro.left), top: c(GM.outro.top), width: c(GM.outro.w),
              fontSize: c(GM.outro.fontPx), lineHeight: `${(GM.outro.lhPx / 14.4).toFixed(4)}cqw`,
            }}
            data-node-id="245:3011"
          >
            {program.outro}
          </p>
          <a
            href="#kontakt"
            className="absolute flex items-center justify-center rounded-full border-solid border-white bg-brand-lime font-modular text-brand-blue"
            style={{
              left: c(GM.button.x), top: c(GM.button.y), width: c(GM.button.w), height: c(GM.button.h),
              borderWidth: c(GM.button.borderPx), fontSize: c(GM.button.fontPx), lineHeight: 1,
            }}
            data-node-id="245:3396"
          >
            {program.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
