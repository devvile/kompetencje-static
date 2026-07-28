/*
 * MANIFEST — placeholder podstrony (design w Figmie jeszcze nie istnieje).
 * Estetyka spójna ze stroną: szary hero z nav (SiteNav desktop / MobileTopBar
 * mobile), wielki napis display blue z białym strokiem (wzór stron prawnych),
 * kicker HK, lime pill CTA na landing, stopka reuse. Do podmiany na docelowy
 * design, gdy Patryk dostarczy widok.
 */
import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "../../components/shared/SiteNav";
import MobileTopBar from "../../components/shared/MobileTopBar";
import StopkaSection from "../../components/home/StopkaSection";
import { getSiteSettings } from "../../content";

export const metadata: Metadata = {
  title: "Manifest — nasze podejście do kompetencji AI",
  description:
    "Manifest kompetencje.ai — dlaczego uczymy AI przez praktykę i jak pomagamy budować kompetencje przyszłości. Pełna treść już wkrótce.",
  alternates: { canonical: "/manifest" },
};

export default async function ManifestPage() {
  const settings = await getSiteSettings();

  return (
    <main className="w-full">
      <section className="relative w-full overflow-x-clip bg-page">
        <div className="@container relative mx-auto w-full max-w-(--workspace) pt-[130px] md:pt-[11.1111cqw]">
          <div className="hidden md:block">
            <SiteNav nav={settings.nav} />
          </div>
          <MobileTopBar nav={settings.nav} />
          {/* kicker HK */}
          <p className="ml-[24px] font-modular text-[13px] leading-[24px] text-brand-blue md:ml-[21.4583cqw] md:text-[1.7361cqw] md:leading-[2.9166cqw]">
            <span className="block">NIE CHODZI O NARZĘDZIA —</span>
            <span className="block">CHODZI O SPOSÓB MYŚLENIA</span>
          </p>
          {/* wielki napis: solid blue + biały stroke (wzór stron prawnych) */}
          <h1
            className="mt-[16px] whitespace-nowrap font-display font-black leading-none text-brand-blue md:mt-[1.4cqw]"
            style={{
              fontSize: "clamp(48px, 11.5cqw, 166px)",
              WebkitTextStroke: "0.035em white" as never,
              paintOrder: "stroke fill",
              marginLeft: "clamp(16px, 5.9cqw, 85px)",
            }}
          >
            MANIFEST
          </h1>
          {/* placeholder treści */}
          <div className="mx-auto flex max-w-[640px] flex-col items-center gap-[28px] px-[24px] pb-[110px] pt-[48px] text-center md:pb-[9cqw] md:pt-[4cqw]">
            <p className="font-body text-[15px] font-light leading-[1.5] text-brand-blue md:text-[1.25cqw]">
              Pracujemy nad pełną treścią naszego manifestu — o tym, czy AI
              zmieni Twoją branżę, nie decyduje technologia, tylko to, czy
              jesteś na to gotowy. Wróć tu wkrótce.
            </p>
            <Link
              href="/"
              className="flex items-center justify-center rounded-full border-[3px] border-solid border-white bg-brand-lime px-[36px] py-[16px] font-modular text-[13px] tracking-[0.04em] text-brand-blue md:text-[1.1cqw]"
            >
              WRÓĆ NA STRONĘ GŁÓWNĄ
            </Link>
          </div>
        </div>
      </section>
      <StopkaSection f={settings.footer} />
    </main>
  );
}
