/*
 * Sekcja 7: Kontakt + formularz (desktop y6249–7755, canvas 1440×1506, tło blue).
 * Frame „kontact" 245:9649: nagłówek 3 linie lime (teksty-kwadraty designera →
 * HK + scaleX(1.1) jak w poznajmy-się), form 245:9653 (674×864) — struktura
 * i wymiary z get_design_context (gap 30/17/18/12, pola h50 r20, textarea h186
 * r30, checkbox 21 r6 bg #0b11a3, button 268×55 lime r30 border 3).
 * 2 wielkie STAR_OUTLINE (zrotowane, biel ~18% alpha na blue) → wypieczone
 * z renderu (kontakt-star-l/r-f), chowają się za formularzem.
 * Placeholdery designera poprawione w content: „rodo blablabla" → sensowny
 * consent; telefon „000 000 000" zostaje do podmiany przez Patryka.
 */
import type { Kontakt } from "@/content/types";
import ContactFormDesktop from "../shared/ContactFormDesktop";

const c = (px: number) => `${(px / 14.4).toFixed(4)}cqw`;

const G = {
  h: 1506,
  starL: { left: 0, top: 101, w: 391, h: 750 },
  starR: { left: 1065, top: 791, w: 315, h: 520 },
  // nagłówek: pozycje ink per linia (design centruje z trailing spacją w L2 —
  // pewniej pozycjonować linie absolutnie)
  heading: { fontPx: 25.2, trackPx: 0.1, lines: [{ left: 583, top: 185 }, { left: 490, top: 234 }, { left: 533, top: 283 }] },
  form: { left: 390.9, top: 394.9, w: 674, h: 864, r: 42, borderPx: 2, padT: 48, padB: 63, padX: 93 },
  // lh 20: pitch pól w designie = 100px (label row 32 = 6+20+6, input 50, gap 18)
  label: { fontPx: 14, padX: 24, padY: 6, lhPx: 20 },
  input: { h: 50, r: 20, borderPx: 1, padX: 24, fontPx: 14 },
  textarea: { h: 186, r: 30, padY: 16 },
  gapFields: 18,
  gapGroups: 17,
  gapMsg: 12,
  gapButton: 30,
  checkbox: { size: 21, r: 6, gap: 9, rowW: 497, fontPx: 14 },
  button: { w: 268, h: 55, r: 30, borderPx: 3, fontPx: 17, trackPx: 0.68 },
};

const SCALE_X = 1.1;

/* mobile: canvas 402 szer. (1cqw = 4.02px) */
const cm = (px: number) => `${(px / 4.02).toFixed(4)}cqw`;

/* MOBILE — canvas 402×1343 (y7660..9003, tło blue do stopki). Form 423:3366
 * (25, 296) 353×864: padX 28 (inner krawędzie x55/x347 w renderze), pitch pól
 * 97 (label 32 + input 50 + gap 15), gwiazdy = STAR_ARROW zrotowane → wypieczone.
 * Nagłówek: 3 linie lime f16.8 + scaleX(1.1) (cap 14, kwadraty jak wszędzie). */
const GM = {
  h: 1343,
  heading: { fontPx: 15.9, trackPx: 0.3, lines: [{ left: 99, top: 80.8 }, { left: 40, top: 116.8 }, { left: 67, top: 152.8 }] },
  starL: { left: 0, top: 192, w: 72, h: 69 },
  starR: { left: 330, top: 192, w: 72, h: 69 },
  form: { left: 25, top: 296, w: 353, h: 864, r: 42, borderPx: 2, padT: 47, padB: 63, padX: 28 },
  gapFields: 15,
  gapGroups: 15,
  // fonty w mobilnej instancji formy są MNIEJSZE niż w desktopowej (pomiar ink):
  labelFontPx: 11, labelTrackPx: 0.5,
  inputFontPx: 11.5,
  checkboxFontPx: 10.5,
  buttonFontPx: 14.4,
};

function KontaktMobile({ k }: { k: Kontakt }) {
  const fields = k.fields.filter((f) => f.kind !== "textarea");
  const message = k.fields.find((f) => f.kind === "textarea");
  return (
    <section className="relative w-full md:hidden">
      <div className="@container mx-auto w-full max-w-(--workspace)">
        <div className="relative overflow-hidden bg-brand-blue" style={{ aspectRatio: `402/${GM.h}` }} data-node-id="423:3363">
          <h2 className="absolute inset-0">
            {k.headingLines.map((line, i) => (
              <span
                key={line}
                className="absolute block origin-top-left whitespace-nowrap font-modular text-brand-lime"
                style={{
                  left: cm(GM.heading.lines[i].left), top: cm(GM.heading.lines[i].top),
                  fontSize: cm(GM.heading.fontPx), letterSpacing: cm(GM.heading.trackPx),
                  lineHeight: 1, transform: `scaleX(${SCALE_X})`,
                }}
              >
                {line}
              </span>
            ))}
          </h2>
          <img src="/assets/kontakt-star-l-m-f.png" alt="" aria-hidden className="absolute"
            style={{ left: cm(GM.starL.left), top: cm(GM.starL.top), width: cm(GM.starL.w), height: cm(GM.starL.h) }} data-node-id="423:3368" />
          <img src="/assets/kontakt-star-r-m-f.png" alt="" aria-hidden className="absolute"
            style={{ left: cm(GM.starR.left), top: cm(GM.starR.top), width: cm(GM.starR.w), height: cm(GM.starR.h) }} data-node-id="423:3369" />
          <form
            action="#"
            className="absolute flex flex-col items-center border-solid border-white bg-brand-blue"
            style={{
              left: cm(GM.form.left), top: cm(GM.form.top), width: cm(GM.form.w), height: cm(GM.form.h),
              borderWidth: cm(GM.form.borderPx), borderRadius: cm(GM.form.r),
              paddingTop: cm(GM.form.padT), paddingBottom: cm(GM.form.padB),
              paddingLeft: cm(GM.form.padX), paddingRight: cm(GM.form.padX),
              rowGap: cm(G.gapButton),
            }}
            data-node-id="423:3366"
          >
            <div className="flex w-full flex-col" style={{ rowGap: cm(GM.gapGroups) }}>
              <div className="flex w-full flex-col" style={{ rowGap: cm(GM.gapFields) }}>
                {fields.map((f) => (
                  <div key={f.id} className="flex w-full flex-col items-start">
                    <label
                      htmlFor={`kontakt-m-${f.id}`}
                      className="font-modular text-white"
                      style={{ padding: `${cm(G.label.padY)} ${cm(G.label.padX)}`, fontSize: cm(GM.labelFontPx), letterSpacing: cm(GM.labelTrackPx), lineHeight: `${(G.label.lhPx / 4.02).toFixed(4)}cqw` }}
                    >
                      {f.label}
                    </label>
                    <input
                      id={`kontakt-m-${f.id}`} name={f.id} type={f.kind}
                      placeholder={f.placeholder}
                      className="w-full border-solid border-white bg-transparent font-display font-medium text-white placeholder:text-[#cacaca]"
                      style={{
                        height: cm(G.input.h), borderWidth: cm(G.input.borderPx), borderRadius: cm(G.input.r),
                        paddingLeft: cm(G.input.padX), paddingRight: cm(G.input.padX), fontSize: cm(GM.inputFontPx),
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex w-full flex-col items-center" style={{ rowGap: cm(G.gapMsg) }}>
                {message && (
                  <div className="flex w-full flex-col items-start">
                    <label
                      htmlFor="kontakt-m-wiadomosc"
                      className="font-modular text-white"
                      style={{ padding: `${cm(G.label.padY)} ${cm(G.label.padX)}`, fontSize: cm(GM.labelFontPx), letterSpacing: cm(GM.labelTrackPx), lineHeight: `${(G.label.lhPx / 4.02).toFixed(4)}cqw` }}
                    >
                      {message.label}
                    </label>
                    <textarea
                      id="kontakt-m-wiadomosc" name={message.id}
                      placeholder={message.placeholder}
                      className="w-full resize-none border-solid border-white bg-transparent font-display font-medium text-white placeholder:text-[#cacaca]"
                      style={{
                        height: cm(G.textarea.h), borderWidth: cm(G.input.borderPx), borderRadius: cm(G.textarea.r),
                        padding: `${cm(G.textarea.padY)} ${cm(G.input.padX)}`, fontSize: cm(GM.inputFontPx),
                      }}
                    />
                  </div>
                )}
                <div className="flex w-full items-center" style={{ columnGap: cm(G.checkbox.gap), paddingLeft: cm(G.label.padX), paddingRight: cm(G.label.padX) }}>
                  <input
                    id="kontakt-m-zgoda" name="zgoda" type="checkbox"
                    className="shrink-0 appearance-none border-solid border-white bg-[#0b11a3] checked:bg-brand-lime"
                    style={{ width: cm(G.checkbox.size), height: cm(G.checkbox.size), borderWidth: cm(G.input.borderPx), borderRadius: cm(G.checkbox.r) }}
                  />
                  <label htmlFor="kontakt-m-zgoda" className="font-display text-white" style={{ fontSize: cm(GM.checkboxFontPx), lineHeight: 1.3, padding: `${cm(10)} ${cm(4)}` }}>
                    {k.consentLabel}
                  </label>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="flex shrink-0 items-center justify-center border-solid border-white bg-brand-lime font-modular text-brand-blue"
              style={{
                width: cm(G.button.w), height: cm(G.button.h), borderWidth: cm(G.button.borderPx),
                borderRadius: cm(G.button.r), fontSize: cm(GM.buttonFontPx), letterSpacing: cm(G.button.trackPx),
              }}
            >
              {k.submitLabel}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function KontaktSection({ k }: { k: Kontakt }) {
  const fields = k.fields.filter((f) => f.kind !== "textarea");
  const message = k.fields.find((f) => f.kind === "textarea");
  return (
    <>
    <KontaktMobile k={k} />
    <section id="kontakt" className="relative hidden w-full md:block">
      <div className="@container mx-auto w-full max-w-(--workspace)">
        <div className="relative overflow-hidden bg-brand-blue" style={{ aspectRatio: `1440/${G.h}` }} data-node-id="245:9696">
          {/* gwiazdy outline (biel ~18%) — za formularzem */}
          <img src="/assets/kontakt-star-l-f.png" alt="" aria-hidden className="absolute"
            style={{ left: c(G.starL.left), top: c(G.starL.top), width: c(G.starL.w), height: c(G.starL.h) }} data-node-id="245:9651" />
          <img src="/assets/kontakt-star-r-f.png" alt="" aria-hidden className="absolute"
            style={{ left: c(G.starR.left), top: c(G.starR.top), width: c(G.starR.w), height: c(G.starR.h) }} data-node-id="245:9650" />
          {/* nagłówek 3 linie */}
          <h2 className="absolute inset-0" data-node-id="245:9652">
            {k.headingLines.map((line, i) => (
              <span
                key={line}
                className="absolute block origin-top-left whitespace-nowrap font-modular text-brand-lime"
                style={{
                  left: c(G.heading.lines[i].left), top: c(G.heading.lines[i].top),
                  fontSize: c(G.heading.fontPx), letterSpacing: c(G.heading.trackPx),
                  lineHeight: 1, transform: `scaleX(${SCALE_X})`,
                }}
              >
                {line}
              </span>
            ))}
          </h2>
          {/* formularz */}
          <ContactFormDesktop k={k} left={G.form.left} top={G.form.top} />
        </div>
      </div>
    </section>
    </>
  );
}
