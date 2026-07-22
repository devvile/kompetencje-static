/*
 * Współdzielony formularz kontaktowy MOBILE (353×864) — instancja z home
 * (423:3366) i o-nas (341:1863) jest identyczna, różni się tylko pozycją.
 * Wymiary/fonty = pomiar ink z budowy home (label 11 / input 11.5 /
 * checkbox 10.5 / button 14.4; pitch pól 97 = label 32 + input 50 + gap 15).
 * Pozycja (left/top) w px designu 402 — przeliczana na cqw u rodzica
 * (kontener @container musi być piętro wyżej).
 */
import type { Kontakt } from "@/content/types";

const cm = (px: number) => `${(px / 4.02).toFixed(4)}cqw`;

const F = {
  w: 353, h: 864, r: 42, borderPx: 2, padT: 47, padB: 63, padX: 28,
  label: { fontPx: 11, trackPx: 0.5, padX: 24, padY: 6, lhPx: 20 },
  input: { h: 50, r: 20, borderPx: 1, padX: 24, fontPx: 11.5 },
  textarea: { h: 186, r: 30, padY: 16 },
  gapFields: 15,
  gapGroups: 15,
  gapMsg: 12,
  gapButton: 30,
  checkbox: { size: 21, r: 6, gap: 9, fontPx: 10.5 },
  button: { w: 268, h: 55, r: 30, borderPx: 3, fontPx: 14.4, trackPx: 0.68 },
};

export default function ContactFormMobile({ k, left, top, idPrefix = "kontakt-m" }: { k: Kontakt; left: number; top: number; idPrefix?: string }) {
  const fields = k.fields.filter((f) => f.kind !== "textarea");
  const message = k.fields.find((f) => f.kind === "textarea");
  return (
    <form
      action="#"
      className="absolute flex flex-col items-center border-solid border-white bg-brand-blue"
      style={{
        left: cm(left), top: cm(top), width: cm(F.w), height: cm(F.h),
        borderWidth: cm(F.borderPx), borderRadius: cm(F.r),
        paddingTop: cm(F.padT), paddingBottom: cm(F.padB),
        paddingLeft: cm(F.padX), paddingRight: cm(F.padX),
        rowGap: cm(F.gapButton),
      }}
    >
      <div className="flex w-full flex-col" style={{ rowGap: cm(F.gapGroups) }}>
        <div className="flex w-full flex-col" style={{ rowGap: cm(F.gapFields) }}>
          {fields.map((f) => (
            <div key={f.id} className="flex w-full flex-col items-start">
              <label
                htmlFor={`${idPrefix}-${f.id}`}
                className="font-modular text-white"
                style={{ padding: `${cm(F.label.padY)} ${cm(F.label.padX)}`, fontSize: cm(F.label.fontPx), letterSpacing: cm(F.label.trackPx), lineHeight: `${(F.label.lhPx / 4.02).toFixed(4)}cqw` }}
              >
                {f.label}
              </label>
              <input
                id={`${idPrefix}-${f.id}`} name={f.id} type={f.kind}
                placeholder={f.placeholder}
                className="w-full border-solid border-white bg-transparent font-display font-medium text-white placeholder:text-[#cacaca]"
                style={{
                  height: cm(F.input.h), borderWidth: cm(F.input.borderPx), borderRadius: cm(F.input.r),
                  paddingLeft: cm(F.input.padX), paddingRight: cm(F.input.padX), fontSize: cm(F.input.fontPx),
                }}
              />
            </div>
          ))}
        </div>
        <div className="flex w-full flex-col items-center" style={{ rowGap: cm(F.gapMsg) }}>
          {message && (
            <div className="flex w-full flex-col items-start">
              <label
                htmlFor={`${idPrefix}-wiadomosc`}
                className="font-modular text-white"
                style={{ padding: `${cm(F.label.padY)} ${cm(F.label.padX)}`, fontSize: cm(F.label.fontPx), letterSpacing: cm(F.label.trackPx), lineHeight: `${(F.label.lhPx / 4.02).toFixed(4)}cqw` }}
              >
                {message.label}
              </label>
              <textarea
                id={`${idPrefix}-wiadomosc`} name={message.id}
                placeholder={message.placeholder}
                className="w-full resize-none border-solid border-white bg-transparent font-display font-medium text-white placeholder:text-[#cacaca]"
                style={{
                  height: cm(F.textarea.h), borderWidth: cm(F.input.borderPx), borderRadius: cm(F.textarea.r),
                  padding: `${cm(F.textarea.padY)} ${cm(F.input.padX)}`, fontSize: cm(F.input.fontPx),
                }}
              />
            </div>
          )}
          <div className="flex w-full items-center" style={{ columnGap: cm(F.checkbox.gap), paddingLeft: cm(F.label.padX), paddingRight: cm(F.label.padX) }}>
            <input
              id={`${idPrefix}-zgoda`} name="zgoda" type="checkbox"
              className="shrink-0 appearance-none border-solid border-white bg-[#0b11a3] checked:bg-brand-lime"
              style={{ width: cm(F.checkbox.size), height: cm(F.checkbox.size), borderWidth: cm(F.input.borderPx), borderRadius: cm(F.checkbox.r) }}
            />
            <label htmlFor={`${idPrefix}-zgoda`} className="font-display text-white" style={{ fontSize: cm(F.checkbox.fontPx), lineHeight: 1.3, padding: `${cm(10)} ${cm(4)}` }}>
              {k.consentLabel}
            </label>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="flex shrink-0 items-center justify-center border-solid border-white bg-brand-lime font-modular text-brand-blue"
        style={{
          width: cm(F.button.w), height: cm(F.button.h), borderWidth: cm(F.button.borderPx),
          borderRadius: cm(F.button.r), fontSize: cm(F.button.fontPx), letterSpacing: cm(F.button.trackPx),
        }}
      >
        {k.submitLabel}
      </button>
    </form>
  );
}
