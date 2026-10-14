/*
 * KURS v2 — ekrany po płatności (brak designu → w estetyce formularza zapisu):
 *  success  — płatność przyjęta (Stripe: payment_status = paid)
 *  pending  — płatność odroczona/w toku (np. przelew) — potwierdzi webhook
 *  cancel   — klient wrócił ze Stripe bez płacenia (cancel_url / sesja otwarta)
 *  error    — zły/wygasły link, błąd połączenia ze Stripe
 * Rozmiary w px (karta maks. 720) — nie skaluje się „plakatowo".
 */
import Link from "next/link";
import type { NavLink } from "@/content/types";
import SiteNav from "../shared/SiteNav";
import MobileTopBar from "../shared/MobileTopBar";
import { K2_MAX_W, c } from "./k2";

export type ResultVariant = "success" | "pending" | "cancel" | "error";

const ICON: Record<ResultVariant, { glyph: string; bg: string; fg: string }> = {
  success: { glyph: "✓", bg: "bg-brand-lime", fg: "text-brand-blue" },
  pending: { glyph: "⏳", bg: "bg-white", fg: "text-brand-blue" },
  cancel: { glyph: "↺", bg: "bg-white", fg: "text-brand-blue" },
  error: { glyph: "!", bg: "bg-[#ffc2c2]", fg: "text-brand-blue" },
};

export interface ResultAction {
  label: string;
  href: string;
  primary?: boolean;
}

export default function K2ResultScreen({
  nav,
  variant,
  kicker,
  title,
  text,
  details,
  actions,
  note,
}: {
  nav: NavLink[];
  variant: ResultVariant;
  kicker: string;
  title: string;
  text: React.ReactNode;
  /** podsumowanie (kurs, e-mail, kwota…) */
  details?: { label: string; value: string }[];
  actions: ResultAction[];
  note?: React.ReactNode;
}) {
  const ic = ICON[variant];
  return (
    <section className="relative w-full flex-1 overflow-x-clip bg-page leading-[normal]">
      <div
        className="@container relative mx-auto hidden w-full md:block"
        style={{ maxWidth: K2_MAX_W }}
      >
        <div className="relative" style={{ height: c(100) }}>
          <SiteNav nav={nav} />
        </div>
      </div>
      <div className="relative h-[92px] md:hidden">
        <MobileTopBar nav={nav} />
      </div>

      <div className="mx-auto flex w-full max-w-[760px] flex-col items-center px-4 pb-20 pt-6 md:pb-28 md:pt-10">
        <div className="relative w-full overflow-hidden rounded-[32px] bg-brand-blue px-6 py-9 text-white shadow-[0_30px_80px_rgba(19,29,255,0.25)] md:rounded-[36px] md:px-12 md:py-12">
          <img
            src="/assets/kurs2/k2-poswiata.svg"
            alt=""
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-28 h-[320px] w-[320px]"
          />
          <div className="relative flex flex-col items-start gap-5">
            <div className="flex items-center gap-4">
              <span
                className={`flex h-14 w-14 items-center justify-center rounded-full text-[26px] font-black ${ic.bg} ${ic.fg}`}
                aria-hidden
              >
                {ic.glyph}
              </span>
              <span className="rounded-[20px] border-[1.5px] border-solid border-white/70 px-4 py-2 font-audio text-[12px] text-white">
                {kicker}
              </span>
            </div>
            <h1 className="font-display text-[28px] font-extrabold leading-[1.15] md:text-[36px]">
              {title}
            </h1>
            <div className="font-display text-[15px] leading-[1.6] text-white/90 md:text-[16px]">
              {text}
            </div>

            {details && details.length > 0 && (
              <dl className="grid w-full gap-x-6 gap-y-3 rounded-[22px] bg-white p-5 text-brand-blue sm:grid-cols-[auto_1fr] md:p-6">
                {details.map((d) => (
                  <div key={d.label} className="contents">
                    <dt className="font-audio text-[12px] leading-[1.6]">
                      {d.label}
                    </dt>
                    <dd className="font-display text-[15px] font-bold leading-[1.4] break-words">
                      {d.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            <div className="flex w-full flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap">
              {actions.map((a) =>
                a.primary ? (
                  <Link
                    key={a.href + a.label}
                    href={a.href}
                    className="flex h-[57px] items-center justify-center rounded-[26.5px] border-2 border-solid border-white bg-brand-lime px-8 font-modular text-[16px] text-brand-blue transition-transform hover:scale-[1.02]"
                  >
                    {a.label}
                  </Link>
                ) : (
                  <Link
                    key={a.href + a.label}
                    href={a.href}
                    className="flex h-[57px] items-center justify-center rounded-[26.5px] border-2 border-solid border-white/70 px-8 font-modular text-[15px] text-white transition-colors hover:bg-white/10"
                  >
                    {a.label}
                  </Link>
                ),
              )}
            </div>
            {note && (
              <div className="font-display text-[13px] leading-[1.5] text-white/75">
                {note}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
