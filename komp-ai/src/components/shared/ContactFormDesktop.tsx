/*
 * Formularz kontaktowy desktop (instancja "Contact form" 674×864 z Figmy) —
 * współdzielony przez home i /o-nas (ten sam wygląd, inna pozycja w sekcji).
 * Geometria wewnętrzna jak w KontaktSection (pitch pól 100, label lh 20).
 */
import type { Kontakt } from "@/content/types";

const c = (px: number) => `${(px / 14.4).toFixed(4)}cqw`;

const G = {
  form: { w: 674, h: 864, r: 42, borderPx: 2, padT: 48, padB: 63, padX: 93 },
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

export default function ContactFormDesktop({ k, left, top }: { k: Kontakt; left: number; top: number }) {
  const fields = k.fields.filter((f) => f.kind !== "textarea");
  const message = k.fields.find((f) => f.kind === "textarea");
  return (
          <form
            action="#"
            className="absolute flex flex-col items-center border-solid border-white bg-brand-blue"
            style={{
              left: c(left), top: c(top), width: c(G.form.w), height: c(G.form.h),
              borderWidth: c(G.form.borderPx), borderRadius: c(G.form.r),
              paddingTop: c(G.form.padT), paddingBottom: c(G.form.padB),
              paddingLeft: c(G.form.padX), paddingRight: c(G.form.padX),
              rowGap: c(G.gapButton),
            }}
            data-node-id="245:9653"
          >
            <div className="flex w-full flex-col" style={{ rowGap: c(G.gapGroups) }}>
              <div className="flex w-full flex-col" style={{ rowGap: c(G.gapFields) }}>
                {fields.map((f) => (
                  <div key={f.id} className="flex w-full flex-col items-start">
                    <label
                      htmlFor={`kontakt-${f.id}`}
                      className="font-modular text-white"
                      style={{ padding: `${c(G.label.padY)} ${c(G.label.padX)}`, fontSize: c(G.label.fontPx), lineHeight: `${(G.label.lhPx / 14.4).toFixed(4)}cqw` }}
                    >
                      {f.label}
                    </label>
                    <input
                      id={`kontakt-${f.id}`} name={f.id} type={f.kind}
                      placeholder={f.placeholder}
                      className="w-full border-solid border-white bg-transparent font-display font-medium text-white placeholder:text-[#cacaca]"
                      style={{
                        height: c(G.input.h), borderWidth: c(G.input.borderPx), borderRadius: c(G.input.r),
                        paddingLeft: c(G.input.padX), paddingRight: c(G.input.padX), fontSize: c(G.input.fontPx),
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex w-full flex-col items-center" style={{ rowGap: c(G.gapMsg) }}>
                {message && (
                  <div className="flex w-full flex-col items-start">
                    <label
                      htmlFor="kontakt-wiadomosc"
                      className="font-modular text-white"
                      style={{ padding: `${c(G.label.padY)} ${c(G.label.padX)}`, fontSize: c(G.label.fontPx), lineHeight: `${(G.label.lhPx / 14.4).toFixed(4)}cqw` }}
                    >
                      {message.label}
                    </label>
                    <textarea
                      id="kontakt-wiadomosc" name={message.id}
                      placeholder={message.placeholder}
                      className="w-full resize-none border-solid border-white bg-transparent font-display font-medium text-white placeholder:text-[#cacaca]"
                      style={{
                        height: c(G.textarea.h), borderWidth: c(G.input.borderPx), borderRadius: c(G.textarea.r),
                        padding: `${c(G.textarea.padY)} ${c(G.input.padX)}`, fontSize: c(G.input.fontPx),
                      }}
                    />
                  </div>
                )}
                <div className="flex shrink-0 items-center" style={{ width: c(G.checkbox.rowW), columnGap: c(G.checkbox.gap), paddingLeft: c(G.label.padX), paddingRight: c(G.label.padX) }}>
                  <input
                    id="kontakt-zgoda" name="zgoda" type="checkbox"
                    className="shrink-0 appearance-none border-solid border-white bg-[#0b11a3] checked:bg-brand-lime"
                    style={{ width: c(G.checkbox.size), height: c(G.checkbox.size), borderWidth: c(G.input.borderPx), borderRadius: c(G.checkbox.r) }}
                  />
                  <label htmlFor="kontakt-zgoda" className="font-display text-white" style={{ fontSize: c(G.checkbox.fontPx), lineHeight: 1.3, padding: `${c(10)} ${c(4)}` }}>
                    {k.consentLabel}
                  </label>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="flex shrink-0 items-center justify-center border-solid border-white bg-brand-lime font-modular text-brand-blue"
              style={{
                width: c(G.button.w), height: c(G.button.h), borderWidth: c(G.button.borderPx),
                borderRadius: c(G.button.r), fontSize: c(G.button.fontPx), letterSpacing: c(G.button.trackPx),
              }}
            >
              {k.submitLabel}
            </button>
          </form>
  );
}
