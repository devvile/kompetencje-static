/*
 * KURS v2 — zapis: hasło + biała karta ceny (node 2012:1984, design
 * y7355..7925). Kotwica #zapis — cel wszystkich przycisków „zapisz się".
 * Cena, „N moduły i M lekcji online" i tytuł karty liczone z danych kursu;
 * przycisk otwiera formularz zapisu (K2EnrollModal).
 */
import type { KursV2Page } from "@/content/types";
import {
  c,
  fs,
  ENROLL_ID,
  K2_MAX_W,
  formatPrice,
  kursCounts,
  kursTitle,
  ENROLL_OPEN,
} from "./k2";

/* Audiowide — rozmiar 1:1 z designu */
const AW = { heading: 34 };

export default function K2Enroll({ k }: { k: KursV2Page }) {
  const e = k.enroll;
  const counts = kursCounts(k);
  const included = [
    `${counts.modulesLabel} i ${counts.lessonsLabel} online`,
    ...e.included,
  ];
  return (
    <section
      id={ENROLL_ID}
      className="w-full scroll-mt-0 bg-brand-blue leading-[normal]"
    >
      <div className="@container mx-auto w-full" style={{ maxWidth: K2_MAX_W }}>
        <div
          className="flex flex-col items-center"
          style={{ rowGap: c(48), padding: `${c(96)} ${c(120)}` }}
          data-node-id="2012:1984"
        >
          <h2
            className="whitespace-nowrap text-center font-audio text-white"
            style={{ fontSize: c(AW.heading) }}
            data-reveal=""
          >
            {e.heading}
          </h2>
          <div
            className="flex items-center bg-white"
            style={{
              width: c(1000),
              columnGap: c(56),
              padding: c(48),
              borderRadius: c(32),
            }}
            data-reveal=""
          >
            <div
              className="flex min-w-0 flex-1 flex-col items-start"
              style={{ rowGap: c(14) }}
            >
              <h3
                className="font-display font-extrabold leading-[1.25] text-brand-blue"
                style={{ fontSize: c(22) }}
              >
                {e.cardTitle ?? kursTitle(k)}
              </h3>
              <ul className="flex w-full flex-col" style={{ rowGap: c(14) }}>
                {included.map((it) => (
                  <li
                    key={it}
                    className="flex items-center"
                    style={{ columnGap: c(10) }}
                  >
                    <img
                      src="/assets/kurs2/k2-ic-check.svg"
                      alt=""
                      aria-hidden
                      className="shrink-0"
                      style={{ width: c(22), height: c(22) }}
                    />
                    <span
                      className="font-display font-semibold leading-[1.4] text-brand-blue"
                      style={{ fontSize: fs(17, 13) }}
                    >
                      {it}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="flex shrink-0 flex-col items-center"
              style={{ rowGap: c(16) }}
            >
              <p
                className="whitespace-nowrap font-display font-black leading-none text-brand-blue"
                style={{ fontSize: c(56) }}
              >
                {formatPrice(k.price)}
              </p>
              <p
                className="whitespace-nowrap font-display font-medium text-brand-blue"
                style={{ fontSize: fs(14, 12) }}
              >
                {k.price.note}
              </p>
              <a
                {...ENROLL_OPEN}
                className="flex items-center justify-center border-solid border-white bg-brand-lime font-modular text-brand-blue transition-transform hover:scale-[1.04]"
                style={{
                  width: c(399),
                  height: c(86),
                  borderWidth: c(3),
                  borderRadius: c(40),
                  fontSize: c(24),
                  letterSpacing: c(0.96),
                }}
              >
                {e.ctaLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
