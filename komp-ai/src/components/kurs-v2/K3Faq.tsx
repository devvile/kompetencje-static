/*
 * K3Faq — „NAJCZĘSTSZE PYTANIA" (kurs v3, Figma 2159:2143, 1440×780).
 * Lewa kolumna 376 (pigułka ✦ FAQ, nagłówek HK lime 2 linie, lead), prawa:
 * akordeon <details> (bez JS, dostępny). Otwarte: białe tło, pytanie blue,
 * ikona „−"; zamknięte: biel 8% + obrys 25%, ikona „+". Pierwsze otwarte.
 */
import type { KursV2Page } from "@/content/types";
import { c, fs, K2_MAX_W } from "./k2";

export default function K3Faq({ faq }: { faq: NonNullable<KursV2Page["faq"]> }) {
  return (
    <section className="w-full bg-brand-blue leading-[normal]" data-node-id="2159:2143">
      <div className="@container mx-auto w-full" style={{ maxWidth: K2_MAX_W }}>
        <div className="flex items-start" style={{ columnGap: c(64), padding: `${c(40)} ${c(120)} ${c(110)}` }}>
          <div className="flex shrink-0 flex-col items-start" style={{ width: c(376), rowGap: c(20) }}>
            <span className="whitespace-pre bg-brand-lime font-display font-bold text-brand-blue" style={{ padding: `${c(7)} ${c(16)}`, borderRadius: c(30), fontSize: fs(13, 11) }}>
              {"✦  FAQ"}
            </span>
            <h2 className="font-modular text-brand-lime" style={{ fontSize: c(38.2), lineHeight: 1 }} data-reveal="">
              {faq.heading[0]}
              <br />
              {faq.heading[1]}
            </h2>
            <p className="font-display font-medium text-white/85" style={{ fontSize: fs(16, 13), lineHeight: 1.5 }}>
              {faq.lead}
            </p>
          </div>
          <div className="flex min-w-0 flex-1 flex-col" style={{ rowGap: c(14) }}>
            {faq.items.map((it, i) => (
              <details
                key={it.q}
                open={i === 0}
                className="group border-solid border-white/25 bg-white/8 open:border-white open:bg-white"
                style={{ borderRadius: c(24), borderWidth: c(1) }}
              >
                <summary
                  className="flex cursor-pointer list-none items-center font-display font-bold text-white group-open:text-brand-blue [&::-webkit-details-marker]:hidden"
                  style={{ columnGap: c(20), padding: `${c(22)} ${c(30)}`, fontSize: fs(19, 15) }}
                >
                  <span className="min-w-0 flex-1">{it.q}</span>
                  <img src="/assets/kurs3/k3-faq-plus.svg" alt="" aria-hidden className="shrink-0 group-open:hidden" style={{ width: c(36), height: c(36) }} />
                  <img src="/assets/kurs3/k3-faq-minus.svg" alt="" aria-hidden className="hidden shrink-0 group-open:block" style={{ width: c(36), height: c(36) }} />
                </summary>
                <p className="font-display font-medium text-[#0a1150]" style={{ padding: `0 ${c(30)} ${c(26)}`, marginTop: c(-10), fontSize: fs(16, 13), lineHeight: 1.55 }}>
                  {it.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.items.map((it) => ({ "@type": "Question", name: it.q, acceptedAnswer: { "@type": "Answer", text: it.a } })),
          }).replace(/</g, "\u003c"),
        }}
      />
    </section>
  );
}
