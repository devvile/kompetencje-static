/*
 * K3Audience — „DLA KOGO JEST KURS" (kurs v3, Figma 2172:2164, 1440×568).
 * Tło: blue do 70.158% wysokości, dalej lime; karta lime 1174×557, obrys 7 blue,
 * r91. Nagłówek Black 80 lh1.19 w kolumnie 408 (łamie się na 4 linie); lista
 * ExtraBold 26 uppercase track 3.38, odstęp wierszy 63; gwiazdki blue 36×34.
 */
import type { KursV2Page } from "@/content/types";
import { c, fs, K2_MAX_W } from "./k2";

export default function K3Audience({ a }: { a: NonNullable<KursV2Page["audience"]> }) {
  return (
    <section
      className="w-full leading-[normal]"
      style={{ background: "linear-gradient(180deg, #131dff 0%, #131dff 70.158%, #d6ff3f 70.158%, #d6ff3f 100%)" }}
      data-node-id="2172:2164"
    >
      <div className="@container mx-auto w-full" style={{ maxWidth: K2_MAX_W }}>
        <div className="flex justify-center" style={{ paddingBottom: c(11) }}>
          <div
            className="relative border-solid border-brand-blue bg-brand-lime"
            style={{ width: c(1174), height: c(557), borderWidth: c(7), borderRadius: c(91) }}
          >
            <h2 className="absolute font-display font-black text-brand-blue" style={{ left: c(176.5 - 7), top: c(90.5 - 7), width: c(408), fontSize: c(80), lineHeight: 1.19 }} data-reveal="">
              {a.heading}
            </h2>
            <div className="absolute flex items-end" style={{ left: c(609.05 - 7), top: c(115.52 - 7), columnGap: c(46) }}>
              <div className="flex flex-col" style={{ width: c(36.32), rowGap: c(60) }} aria-hidden>
                {a.items.map((it) => (
                  <img key={it} src="/assets/kurs3/k3-star-blue.svg" alt="" style={{ width: c(36.32), height: c(34.1) }} />
                ))}
              </div>
              <ul className="flex flex-col font-display font-extrabold uppercase text-brand-blue" style={{ width: c(361), rowGap: c(63), fontSize: fs(26, 16), lineHeight: 1.19, letterSpacing: c(3.38) }}>
                {a.items.map((it) => (
                  <li key={it} data-reveal="">{it}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
