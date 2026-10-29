"use client";

/*
 * KURS v2 — formularz zapisu (design: laptop 2034:2000 modal 1080×724,
 * mobile 2037:1761 panel od dołu). Otwiera go każdy element z
 * [data-enroll-open] (przyciski „zapisz się") oraz adres z #zapisz-sie.
 * Rozmiary w PX (nie cqw) — na dużych ekranach modal NIE rośnie (maks. 1080),
 * na niskich oknach przewija się kolumna formularza.
 *  ≥1024: dwie kolumny (podsumowanie | formularz)
 *  768–1023: wąski modal 560 z kompaktowym podsumowaniem
 *  <768: panel od dołu (uchwyt, zwinięte podsumowanie „Co jest w cenie?")
 * Walidacja wspólna z serwerem (lib/zapis.ts); wysyłka = Server Action.
 */
import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  normalizeZapis,
  validateZapis,
  type ZapisErrors,
  type ZapisResult,
} from "@/lib/zapis";
import { zapiszNaKurs } from "@/app/kursy/[slug]/actions";
import { wymagaZgodyNaStart, ZGODA_START_KROTKO, ZGODA_START_TRESC } from "@/lib/zgodaStart";

export interface EnrollSummary {
  slug: string;
  titleLines: string[];
  titleAccent: string;
  name: string;
  kicker: string;
  included: string[];
  price: string;
  priceNote: string;
  instructorName: string;
  avatar: string;
  note?: string;
  submitLabel: string;
  footnote?: string;
  /** data startu kursu (ISO) — od niej zależy zgoda na start przed upływem 14 dni */
  start?: string;
}

export const ENROLL_HASH = "zapisz-sie";

type View = "form" | ZapisResult["status"];

function Field({
  id,
  name,
  label,
  optional,
  type = "text",
  placeholder,
  autoComplete,
  inputMode,
  error,
}: {
  id: string;
  name: string;
  label: string;
  optional?: boolean;
  type?: string;
  placeholder: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  error?: string;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-[7px] md:gap-2">
      <label htmlFor={id} className="flex items-center gap-[6px] md:gap-2">
        <span className="font-audio text-[12px] text-white md:text-[13px]">
          {label}
        </span>
        {optional && (
          <span className="font-display text-[11px] font-medium text-white/65 md:text-[12px]">
            (opcjonalnie)
          </span>
        )}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className={`w-full rounded-[22px] border border-solid bg-transparent px-5 py-[14px] font-display text-[15px] text-white outline-none transition-colors placeholder:text-[#cacaca] focus:border-brand-lime focus:shadow-[0_0_0_1px_var(--color-brand-lime)] md:rounded-[20px] md:px-[22px] md:py-[13px] md:text-[14px] ${
          error ? "border-[#ff9b9b]" : "border-white"
        }`}
      />
      {error && (
        <p
          id={`${id}-err`}
          className="font-display text-[12px] font-medium text-[#ffc2c2]"
        >
          {error}
        </p>
      )}
    </div>
  );
}

function Check({
  id,
  name,
  children,
  checked,
  onChange,
  error,
  extra,
}: {
  id: string;
  name: string;
  children: React.ReactNode;
  checked: boolean;
  onChange: (v: boolean) => void;
  error?: string;
  /** treść pod etykietą, POZA <label> (klik nie przełącza checkboxa) */
  extra?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className={`flex cursor-pointer items-start gap-3 ${extra ? "" : "md:items-center"}`}
      >
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={!!error}
          className="peer sr-only"
        />
        <img
          src={
            checked
              ? "/assets/kurs2/k2-cb-on.svg"
              : "/assets/kurs2/k2-cb-off.svg"
          }
          alt=""
          aria-hidden
          className="h-6 w-6 shrink-0 rounded-[6px] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-lime md:h-[22px] md:w-[22px]"
        />
        <span className="font-display text-[13px] font-medium leading-[1.5] text-white md:leading-[1.45]">
          {children}
        </span>
      </label>
      {extra}
      {error && (
        <p className="pl-9 font-display text-[12px] font-medium text-[#ffc2c2]">
          {error}
        </p>
      )}
    </div>
  );
}

function Summary({ s }: { s: EnrollSummary }) {
  return (
    <div
      className="flex min-w-0 flex-1 flex-col items-start gap-[22px] overflow-y-auto py-12 pl-12 pr-11"
      data-node-id="2034:2001"
    >
      <p className="flex items-center gap-2 whitespace-nowrap rounded-[20px] border-[1.5px] border-solid border-brand-blue px-4 py-2 text-[12px] text-brand-blue">
        <span className="font-display font-bold" aria-hidden>
          ✦
        </span>
        <span className="font-audio">ZAPISUJESZ SIĘ NA KURS</span>
      </p>
      <p className="flex flex-col items-start gap-[2px] font-display text-[38px] font-black leading-none text-brand-blue">
        {s.titleLines.map((l, i) => (
          <span key={i} className="whitespace-nowrap">
            {l}{" "}
          </span>
        ))}
        <span className="whitespace-nowrap bg-brand-lime px-[10px]">
          {s.titleAccent}
        </span>
      </p>
      <div className="flex w-full flex-col gap-[10px]">
        <p className="font-audio text-[12px] text-brand-blue">W CENIE</p>
        <ul className="flex flex-col gap-[10px]">
          {s.included.map((it) => (
            <li key={it} className="flex items-start gap-[10px]">
              <img
                src="/assets/kurs2/k2-ic-check-sm.svg"
                alt=""
                aria-hidden
                className="h-5 w-5 shrink-0"
              />
              <span className="font-display text-[15px] font-semibold leading-[1.4] text-brand-blue">
                {it}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex w-full items-center justify-between gap-4 rounded-[22px] bg-brand-blue p-[22px]">
        <p className="flex flex-col gap-1">
          <span className="font-audio text-[12px] text-brand-lime">
            DO ZAPŁATY
          </span>
          <span className="font-display text-[13px] font-medium text-white/85">
            {s.priceNote}
          </span>
        </p>
        <p className="whitespace-nowrap font-display text-[32px] font-black leading-none text-brand-lime">
          {s.price}
        </p>
      </div>
      {s.note && (
        <p className="w-full rounded-[16px] bg-[rgba(214,255,63,0.35)] px-4 py-3 font-display text-[13px] font-semibold text-brand-blue">
          {s.note}
        </p>
      )}
      <div className="flex items-center gap-3">
        <img
          src={s.avatar}
          alt=""
          aria-hidden
          className="h-11 w-11 rounded-full object-cover"
        />
        <p className="flex flex-col gap-[2px] text-brand-blue">
          <span className="font-audio text-[11px]">PROWADZI</span>
          <span className="font-display text-[15px] font-extrabold">
            {s.instructorName}
          </span>
        </p>
      </div>
    </div>
  );
}

function CompactSummary({ s }: { s: EnrollSummary }) {
  const [open, setOpen] = useState(false);
  const short = s.priceNote.split(/[,·]/)[0].trim();
  return (
    <div
      className="flex w-full flex-col gap-[10px] rounded-[18px] bg-white px-4 py-[14px] text-brand-blue"
      data-node-id="2037:1772"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="flex min-w-0 flex-1 flex-col gap-[2px]">
          <span className="font-audio text-[10px]">{s.kicker}</span>
          <span className="font-display text-[14px] font-extrabold leading-[1.25]">
            {s.name}
          </span>
        </p>
        <p className="flex shrink-0 flex-col items-end whitespace-nowrap">
          <span className="font-display text-[20px] font-black">{s.price}</span>
          <span className="font-display text-[11px] font-medium text-[rgba(19,29,255,0.8)]">
            {short}
          </span>
        </p>
      </div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-center gap-[6px] self-start font-display text-[13px] font-bold"
      >
        <span className="underline">Co jest w cenie?</span>
        <span
          aria-hidden
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>
      {open && (
        <ul className="flex flex-col gap-2 pb-1">
          {s.included.map((it) => (
            <li key={it} className="flex items-start gap-2">
              <img
                src="/assets/kurs2/k2-ic-check-sm.svg"
                alt=""
                aria-hidden
                className="mt-[1px] h-[18px] w-[18px] shrink-0"
              />
              <span className="font-display text-[13px] font-semibold leading-[1.4]">
                {it}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function K2EnrollModal({ s }: { s: EnrollSummary }) {
  const uid = useId();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("form");
  const [errors, setErrors] = useState<ZapisErrors>({});
  const [pending, setPending] = useState(false);
  const [faktura, setFaktura] = useState(false);
  const [regulamin, setRegulamin] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [zgodaNaStart, setZgodaNaStart] = useState(false);
  // reguła liczona przy otwarciu formularza (czas klienta); serwer sprawdza ją ponownie
  const [zgodaWymagana, setZgodaWymagana] = useState(true);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    if (window.location.hash === `#${ENROLL_HASH}`) {
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    }
    returnFocus.current?.focus();
  }, []);

  /* otwieranie: klik w [data-enroll-open] (delegacja) + #zapisz-sie w adresie */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-enroll-open]",
      );
      if (!t) return;
      e.preventDefault();
      returnFocus.current = t;
      setView("form");
      setZgodaWymagana(wymagaZgodyNaStart(s.start));
      setOpen(true);
    };
    const fromHash = () => {
      if (window.location.hash === `#${ENROLL_HASH}`) {
        setZgodaWymagana(wymagaZgodyNaStart(s.start));
        setOpen(true);
      }
    };
    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", fromHash);
    fromHash();
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", fromHash);
    };
  }, []);

  /* otwarty: blokada przewijania strony, Esc, fokus w oknie (pułapka Tab) */
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    const dlg = dialogRef.current;
    dlg?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key !== "Tab" || !dlg) return;
      const f = dlg.querySelectorAll<HTMLElement>(
        "a[href], button, input, [tabindex]:not([tabindex='-1'])",
      );
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
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
    const errs = validateZapis(normalizeZapis(fd), s.start);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const firstKey = Object.keys(errs)[0];
      e.currentTarget
        .querySelector<HTMLElement>(`[name="${firstKey}"]`)
        ?.focus();
      return;
    }
    setPending(true);
    try {
      const res = await zapiszNaKurs(s.slug, fd);
      if (res.status === "invalid") {
        setErrors(res.errors);
        // serwer uznał, że zgoda jest potrzebna (np. próg minął przy otwartym formularzu) → pokaż pole
        if (res.errors.zgodaNaStart) setZgodaWymagana(true);
      }
      else if (res.status === "redirect") {
        setView("redirect");
        window.location.assign(res.url); // strona płatności Stripe
        return; // przycisk zostaje w stanie „wysyłanie" do przejścia
      } else setView(res.status);
    } catch {
      setView("error");
    } finally {
      setPending(false);
    }
  }

  if (!open) return null;

  const id = (n: string) => `${uid}-${n}`;
  const titleId = id("title");

  return (
    <div className="fixed inset-0 z-[60] leading-[normal]">
      {/* przyciemnienie strony */}
      <div
        className="k2-fade absolute inset-0 bg-[rgba(6,9,58,0.62)] backdrop-blur-[3px]"
        onClick={close}
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-0 flex items-end justify-center md:items-center md:p-6">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          className="k2-sheet pointer-events-auto flex max-h-[92svh] w-full flex-col overflow-hidden rounded-t-[28px] bg-brand-blue shadow-[0_30px_80px_rgba(0,0,0,0.35)] outline-none md:max-h-[min(calc(100svh-48px),860px)] md:w-[min(560px,100%)] md:rounded-[36px] lg:w-[min(1080px,100%)] lg:flex-row lg:bg-white"
          data-node-id="2034:2000"
        >
          {/* LEWA: podsumowanie (≥1024) */}
          <div className="hidden min-h-0 lg:flex lg:w-[520px] lg:shrink-0">
            <Summary s={s} />
          </div>

          {/* PRAWA / całość na mobile: formularz */}
          <div
            className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-brand-blue lg:w-[560px] lg:flex-none"
            data-node-id="2034:2037"
          >
            <div className="flex flex-col items-center gap-[26px] px-5 pb-7 pt-[14px] md:items-stretch md:gap-4 md:px-11 md:pb-0 md:pt-11">
              <span
                className="block h-[5px] w-11 rounded-[3px] bg-white/50 md:hidden"
                aria-hidden
              />
              <div className="flex w-full items-center justify-between gap-4 md:items-start">
                <div className="flex flex-col gap-1 md:gap-[6px]">
                  <h2
                    id={titleId}
                    className="font-display text-[22px] font-extrabold text-white md:text-[28px]"
                  >
                    TWOJE DANE
                  </h2>
                  <p className="font-display text-[13px] font-medium text-white/80 md:text-[14px]">
                    Zajmie Ci to minutę.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Zamknij formularz"
                  className="shrink-0 rounded-full transition-transform hover:scale-105"
                >
                  <img
                    src="/assets/kurs2/k2-close.svg"
                    alt=""
                    aria-hidden
                    className="h-9 w-9 md:h-10 md:w-10"
                  />
                </button>
              </div>
            </div>

            <div className="px-4 md:px-11 md:pt-4 lg:hidden">
              <CompactSummary s={s} />
            </div>

            {view === "form" ? (
              <form
                noValidate
                onSubmit={onSubmit}
                className="flex flex-col gap-[14px] px-5 pb-10 pt-5 md:gap-4 md:px-11 md:pt-4"
                aria-busy={pending}
              >
                <div className="grid gap-[14px] md:grid-cols-2 md:gap-3">
                  <Field
                    id={id("imie")}
                    name="imie"
                    label="IMIĘ"
                    placeholder="Wpisz imię"
                    autoComplete="given-name"
                    error={errors.imie}
                  />
                  <Field
                    id={id("nazwisko")}
                    name="nazwisko"
                    label="NAZWISKO"
                    placeholder="Wpisz nazwisko"
                    autoComplete="family-name"
                    error={errors.nazwisko}
                  />
                </div>
                <Field
                  id={id("email")}
                  name="email"
                  type="email"
                  label="ADRES E-MAIL"
                  placeholder="Wpisz swój adres e-mail"
                  autoComplete="email"
                  inputMode="email"
                  error={errors.email}
                />
                <Field
                  id={id("telefon")}
                  name="telefon"
                  type="tel"
                  label="NUMER TELEFONU"
                  optional
                  placeholder="000 000 000"
                  autoComplete="tel"
                  inputMode="tel"
                  error={errors.telefon}
                />
                <Check
                  id={id("faktura")}
                  name="faktura"
                  checked={faktura}
                  onChange={setFaktura}
                >
                  Potrzebuję faktury na firmę
                </Check>
                {faktura && (
                  <div className="grid gap-[14px] md:grid-cols-2 md:gap-3">
                    <Field
                      id={id("nip")}
                      name="nip"
                      label="NIP"
                      placeholder="000-000-00-00"
                      inputMode="numeric"
                      error={errors.nip}
                    />
                    <Field
                      id={id("firma")}
                      name="firma"
                      label="NAZWA FIRMY"
                      placeholder="Wpisz nazwę firmy"
                      autoComplete="organization"
                      error={errors.firma}
                    />
                  </div>
                )}
                <div className="flex flex-col gap-4 pt-2 md:pt-0">
                  <Check
                    id={id("regulamin")}
                    name="regulamin"
                    checked={regulamin}
                    onChange={setRegulamin}
                    error={errors.regulamin}
                  >
                    Akceptuję{" "}
                    <a
                      href="/regulamin"
                      target="_blank"
                      className="font-bold underline"
                    >
                      regulamin
                    </a>{" "}
                    i{" "}
                    <a
                      href="/polityka-prywatnosci"
                      target="_blank"
                      className="font-bold underline"
                    >
                      politykę prywatności
                    </a>
                    . *
                  </Check>
                  <Check
                    id={id("newsletter")}
                    name="newsletter"
                    checked={newsletter}
                    onChange={setNewsletter}
                  >
                    Chcę otrzymywać newsletter o nowych kursach i webinarach
                    (opcjonalnie).
                  </Check>
                  {zgodaWymagana && (
                    <Check
                      id={id("zgodaNaStart")}
                      name="zgodaNaStart"
                      checked={zgodaNaStart}
                      onChange={setZgodaNaStart}
                      error={errors.zgodaNaStart}
                      extra={
                        <details className="group pl-9">
                          <summary className="cursor-pointer list-none font-display text-[11px] font-semibold text-white/70 underline underline-offset-2 [&::-webkit-details-marker]:hidden">
                            <span className="group-open:hidden">Pełna treść zgody</span>
                            <span className="hidden group-open:inline">Zwiń</span>
                          </summary>
                          <p className="mt-1 font-display text-[11px] leading-[1.45] text-white/70">{ZGODA_START_TRESC}</p>
                        </details>
                      }
                    >
                      {ZGODA_START_KROTKO} *
                    </Check>
                  )}
                </div>
                <div className="flex flex-col items-center gap-2 pt-[6px] md:pt-0">
                  <button
                    type="submit"
                    disabled={pending}
                    className="flex h-[57px] w-full items-center justify-center rounded-[26.5px] border-2 border-solid border-white bg-brand-lime font-modular text-[17px] text-brand-blue transition-transform hover:scale-[1.02] disabled:opacity-70 md:w-[341px]"
                  >
                    {pending ? "WYSYŁANIE…" : s.submitLabel}
                  </button>
                  {s.footnote && (
                    <p className="text-center font-display text-[12px] font-medium leading-[1.5] text-white/85 md:text-[13px]">
                      {s.footnote}
                    </p>
                  )}
                </div>
                {s.note && (
                  <p className="mt-5 rounded-[14px] bg-brand-lime px-[14px] py-[10px] font-display text-[12px] font-semibold leading-[1.4] text-brand-blue lg:hidden">
                    {s.note}
                  </p>
                )}
              </form>
            ) : (
              <div
                className="flex flex-col items-start gap-4 px-5 pb-12 pt-6 md:px-11"
                role="status"
              >
                {view === "redirect" && (
                  <>
                    <p className="font-display text-[24px] font-extrabold text-brand-lime">Przechodzimy do płatności…</p>
                    <p className="font-display text-[15px] leading-[1.55] text-white">
                      Za chwilę otworzy się bezpieczna strona płatności Stripe. Nie zamykaj tego okna.
                    </p>
                    <span className="mt-1 block h-1 w-40 overflow-hidden rounded-full bg-white/20" aria-hidden>
                      <span className="k2-progress block h-full w-1/3 rounded-full bg-brand-lime" />
                    </span>
                  </>
                )}
                {view === "ok" && (
                  <>
                    <p className="font-display text-[24px] font-extrabold text-brand-lime">
                      Dziękujemy!
                    </p>
                    <p className="font-display text-[15px] leading-[1.55] text-white">
                      Zgłoszenie na kurs „{s.name}” zostało przyjęte. Odezwiemy
                      się na podany adres e-mail z dalszymi krokami.
                    </p>
                  </>
                )}
                {view === "unavailable" && (
                  <>
                    <p className="font-display text-[24px] font-extrabold text-brand-lime">
                      Zapisy online ruszają lada dzień
                    </p>
                    <p className="font-display text-[15px] leading-[1.55] text-white">
                      Twoje dane nie zostały jeszcze zapisane. Napisz do nas
                      przez formularz kontaktowy — zarezerwujemy Ci miejsce na
                      kursie „{s.name}”.
                    </p>
                    <a
                      href="/#kontakt"
                      className="rounded-[26px] border-2 border-solid border-white bg-brand-lime px-6 py-3 font-modular text-[15px] text-brand-blue"
                    >
                      NAPISZ DO NAS
                    </a>
                  </>
                )}
                {view === "error" && (
                  <>
                    <p className="font-display text-[24px] font-extrabold text-brand-lime">
                      Coś poszło nie tak
                    </p>
                    <p className="font-display text-[15px] leading-[1.55] text-white">
                      Nie udało się wysłać zgłoszenia. Spróbuj ponownie za
                      chwilę.
                    </p>
                    <button
                      type="button"
                      onClick={() => setView("form")}
                      className="font-display text-[14px] font-bold text-white underline"
                    >
                      Wróć do formularza
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
