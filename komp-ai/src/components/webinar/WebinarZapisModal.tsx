"use client";

/*
 * Formularz zapisu na bezpłatny webinar (okno). Otwiera go każdy link
 * „#zapisz-sie” na stronie webinaru (przyciski ZAPISZ SIĘ) oraz adres
 * z #zapisz-sie (np. z karty webinaru na stronie głównej).
 * Pola: imię, e-mail, zgoda na regulamin (obowiązkowa), newsletter (opcjonalnie).
 * Pola i checkboxy = te same komponenty co formularz kursu (K2EnrollModal).
 * Walidacja wspólna z serwerem (lib/zapisWebinar.ts); wysyłka = Server Action.
 */
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Check, Field } from "../kurs-v2/K2EnrollModal";
import {
  normalizeWebinarZapis,
  validateWebinarZapis,
  type WebinarZapisErrors,
  type WebinarZapisResult,
} from "@/lib/zapisWebinar";
import { zapiszNaWebinar } from "@/app/webinary/[slug]/actions";

export const WEBINAR_HASH = "zapisz-sie";

type View = "form" | WebinarZapisResult["status"];

export default function WebinarZapisModal({ slug, name, termin }: { slug: string; name: string; termin: string }) {
  const uid = useId();
  const id = (n: string) => `${uid}-${n}`;
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("form");
  const [mailSent, setMailSent] = useState(false);
  const [errors, setErrors] = useState<WebinarZapisErrors>({});
  const [pending, setPending] = useState(false);
  const [regulamin, setRegulamin] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    if (window.location.hash === `#${WEBINAR_HASH}`) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    returnFocus.current?.focus();
  }, []);

  /* otwieranie: klik w link #zapisz-sie (delegacja) + adres z #zapisz-sie */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>(`a[href="#${WEBINAR_HASH}"]`);
      if (!t) return;
      e.preventDefault();
      returnFocus.current = t;
      setView("form");
      setOpen(true);
    };
    const fromHash = () => {
      if (window.location.hash === `#${WEBINAR_HASH}`) setOpen(true);
    };
    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", fromHash);
    fromHash();
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", fromHash);
    };
  }, []);

  /* otwarte: blokada przewijania, Esc, fokus w oknie */
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const errs = validateWebinarZapis(normalizeWebinarZapis(fd));
    setErrors(errs);
    if (Object.keys(errs).length) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    setPending(true);
    try {
      const res = await zapiszNaWebinar(slug, fd);
      if (res.status === "invalid") setErrors(res.errors);
      else {
        if (res.status === "ok") setMailSent(res.mailSent);
        setView(res.status);
      }
    } catch {
      setView("error");
    } finally {
      setPending(false);
    }
  }

  if (!open) return null;

  const result: Record<Exclude<View, "form" | "invalid">, { title: string; text: string }> = {
    ok: {
      title: "JESTEŚ ZAPISANY!",
      text: mailSent
        ? `Potwierdzenie wysłaliśmy na Twój e-mail. Termin: ${termin}. Link do pokoju LiveWebinar dostaniesz przed startem.`
        : `Zapis przyjęty. Termin: ${termin}. Przed startem wyślemy Ci e-mail z linkiem do pokoju LiveWebinar.`,
    },
    duplicate: { title: "JUŻ JESTEŚ NA LIŚCIE", text: "Ten adres e-mail jest już zapisany na ten webinar. Do zobaczenia!" },
    unavailable: { title: "ZAPISY RUSZAJĄ WKRÓTCE", text: "Zapisy online jeszcze nie działają. Napisz do nas: patryk@kompetencje.ai – zapiszemy Cię ręcznie." },
    error: { title: "COŚ POSZŁO NIE TAK", text: "Nie udało się zapisać. Spróbuj ponownie za chwilę albo napisz do nas: patryk@kompetencje.ai." },
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center leading-[normal] md:items-center">
      <button type="button" aria-label="Zamknij" className="absolute inset-0 bg-[#06093a]/70 backdrop-blur-[2px]" onClick={close} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={id("title")}
        tabIndex={-1}
        className="relative max-h-[92svh] w-full overflow-y-auto rounded-t-[28px] bg-brand-blue px-5 pb-8 pt-6 outline-none md:w-[520px] md:rounded-[30px] md:px-10 md:py-9"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Zamknij"
          className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full border-2 border-solid border-white text-[20px] text-white"
        >
          ×
        </button>
        {view === "form" || view === "invalid" ? (
          <form noValidate onSubmit={onSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2 pr-12">
              <p className="font-audio text-[12px] tracking-[0.04em] text-brand-lime">BEZPŁATNY WEBINAR · {termin.toUpperCase()}</p>
              <h2 id={id("title")} className="font-display text-[24px] font-black leading-[1.15] text-white md:text-[26px]">
                {name}
              </h2>
            </div>
            <Field id={id("imie")} name="imie" label="IMIĘ" placeholder="Wpisz imię" autoComplete="given-name" error={errors.imie} />
            <Field id={id("email")} name="email" label="ADRES E-MAIL" type="email" placeholder="Wpisz adres e-mail" autoComplete="email" inputMode="email" error={errors.email} />
            <div className="flex flex-col gap-4">
              <Check id={id("regulamin")} name="regulamin" checked={regulamin} onChange={setRegulamin} error={errors.regulamin}>
                Akceptuję{" "}
                <a href="/regulamin" target="_blank" className="font-bold underline">regulamin</a> i{" "}
                <a href="/polityka-prywatnosci" target="_blank" className="font-bold underline">politykę prywatności</a>. *
              </Check>
              <Check id={id("newsletter")} name="newsletter" checked={newsletter} onChange={setNewsletter}>
                Chcę otrzymywać newsletter o nowych kursach i webinarach (opcjonalnie).
              </Check>
            </div>
            <button
              type="submit"
              disabled={pending}
              className="flex h-[57px] w-full items-center justify-center rounded-[28px] border-2 border-solid border-white bg-brand-lime font-modular text-[17px] text-brand-blue transition-transform hover:scale-[1.02] disabled:opacity-70"
            >
              {pending ? "ZAPISUJĘ…" : "ZAPISZ SIĘ ZA DARMO"}
            </button>
            <p className="text-center font-display text-[12px] font-medium text-white/80">Online, na żywo · LiveWebinar · wystarczy laptop</p>
          </form>
        ) : (
          <div role="status" className="flex flex-col items-start gap-4 pr-10">
            <h2 id={id("title")} className="font-modular text-[22px] text-brand-lime">{result[view].title}</h2>
            <p className="font-display text-[15px] leading-[1.55] text-white">{result[view].text}</p>
            <button type="button" onClick={close} className="mt-2 rounded-[26px] border-2 border-solid border-white bg-brand-lime px-6 py-3 font-modular text-[15px] text-brand-blue">
              ZAMKNIJ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
