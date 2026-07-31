"use client";

/*
 * Stopka (desktop y7755–8046, canvas 1440×291, bg #000ae6 — CIEMNIEJSZY niż
 * brand blue; border-top 1 white). Struktura z get_design_context 245:9562:
 * content 1171 wyśrodkowany, lewa kolumna 298 (logo + opis Montserrat Light 15
 * + copyright HK 9/8), grid linków 746 (1fr:2fr:2fr, gap-x 100), kolumna
 * kontakt z ikonami SVG. Logo .AI = crop z renderu (tekstury/maski wypieczone,
 * bg identyczny z kanwą).
 */
import { useEffect, useState } from "react";
import { ArrowUp, Mail, Smartphone } from "lucide-react";
import type { Footer } from "@/content/types";

function ScrollTopButton({ style }: { style: React.CSSProperties }) {
  const handleClick = () => {
    // natywny smooth: przerywalny scrollem użytkownika; lock HumanMachine
    // nie koliduje (przy stopce faza sekwencji jest już "done")
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Wróć na górę strony"
      className="scroll-top-btn absolute flex items-center justify-center rounded-full border border-solid border-brand-lime text-brand-lime transition-colors hover:bg-brand-lime hover:text-[#000ae6]"
      style={style}
    >
      <ArrowUp aria-hidden style={{ width: "55%", height: "55%" }} strokeWidth={1.5} />
    </button>
  );
}

function ProtectedEmail({
  email,
  className,
  style,
}: {
  email: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [user, domain] = email.split("@");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (user && domain) {
      window.location.href = `mailto:${user}@${domain}`;
    }
  };

  return (
    <a
      href={mounted && user && domain ? `mailto:${user}@${domain}` : "#"}
      onClick={handleClick}
      className={className}
      style={style}
    >
      {mounted ? email : `${user || "patryk"} [at] ${domain || "kompetencje.ai"}`}
    </a>
  );
}

function ProtectedPhone({
  phone,
  className,
  style,
}: {
  phone: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const rawDigits = phone.replace(/\D/g, "");
  // Ochrona antyspamowa: zamiana cyfr '1' na 'l' w surowym kodzie HTML (SSR) dla scraperów
  const obfuscatedPhone = phone.replace(/1/g, "l");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (rawDigits) {
      window.location.href = `tel:${rawDigits}`;
    }
  };

  return (
    <a
      href={mounted && rawDigits ? `tel:${rawDigits}` : "#"}
      onClick={handleClick}
      className={className}
      style={style}
    >
      {mounted ? phone : obfuscatedPhone}
    </a>
  );
}

const c = (px: number) => `${(px / 14.4).toFixed(4)}cqw`;

const G = {
  h: 291,
  logo: { left: 130, top: 44, w: 70, h: 78 }, // crop @ (130,7799)
  contentX: 135, // 1171 wyśrodkowane w 1441
  descTop: 118, // pozycja pionowa opisu (kalibracja vs render: ink 7880)
  descFontPx: 15,
  descLh: 23.68, // 15 × 1.579
  copyTop: 221, // ink lime 7979
  gridX: 552, // 135 + 298 + 119
  col1X: 552,
  col2X: 761,
  col3X: 1079,
  linksTop: 85, // pierwszy wiersz linków (ink y7845; impl przy 88 był +3)
  linkFontPx: 12,
  linkGap1: 37, // odstęp wierszy kolumny 1 (gap 18 + lh 19)
  linkGap2: 33, // kolumna 2 (gap 14 + lh 19)
  contactFontPx: 14,
};

/* mobile: canvas 402 szer. (1cqw = 4.02px) */
const cm = (px: number) => `${(px / 4.02).toFixed(4)}cqw`;

/* MOBILE — canvas 402×808 (y9003..9811; niżej w designie tylko puste szare tło).
 * Pozycje z get_metadata 423:3275: logo (52,64), opis 3 linie, linki jedna
 * kolumna (odstępy jak desktop), copyright wyśrodkowany y727. */
const GM = {
  h: 808,
  logo: { left: 47, top: 60, w: 70, h: 78 }, // ten sam crop co desktop (logo 58×67.8 z marginesem)
  x: 52,
  descTop: 153.5,
  descFontPx: 15, // jak desktop (wcześniejszy pomiar 277 był ze starej 2-linijkowej treści)
  descLhPx: 23.68,
  linksTop: 271,
  legalTop: 425, // 271 + 154
  contactTop: 550, // 271 + 279
  copyTop: 730,
  copyLimeFontPx: 10.9, // mobile copyright WIĘKSZY niż desktop 9 (ink w170 vs 139)
  copyWhiteFontPx: 7.1,
};

function StopkaMobile({ f }: { f: Footer }) {
  return (
    <footer className="relative w-full md:hidden">
      <div className="@container mx-auto w-full max-w-(--workspace)">
        <div className="relative" style={{ aspectRatio: `402/${GM.h}`, backgroundColor: "#000ae6" }} data-node-id="423:3275">
          <img
            src="/assets/footer-logo-f.png" alt="kompetencje.ai" className="absolute"
            style={{ left: cm(GM.logo.left), top: cm(GM.logo.top), width: cm(GM.logo.w), height: cm(GM.logo.h) }}
          />
          <p
            className="absolute font-display font-light text-white"
            style={{ left: cm(GM.x), top: cm(GM.descTop), width: cm(300), fontSize: cm(GM.descFontPx), lineHeight: `${(GM.descLhPx / 4.02).toFixed(4)}cqw` }}
          >
            {f.descriptionLines.map((l) => (
              <span key={l} className="block">{l}</span>
            ))}
          </p>
          <nav className="absolute" style={{ left: cm(GM.x), top: cm(GM.linksTop) }} aria-label="Stopka — nawigacja">
            {f.navLinks.map((l, i) => (
              <a
                key={l.label} href={l.href}
                className="absolute block whitespace-nowrap font-modular text-white"
                style={{ top: cm(i * 37), fontSize: cm(12), lineHeight: 1.579 }}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <nav className="absolute" style={{ left: cm(GM.x), top: cm(GM.legalTop) }} aria-label="Stopka — dokumenty">
            {f.legalLinks.map((l, i) => (
              <a
                key={l.label} href={l.href}
                className="absolute block whitespace-nowrap font-modular text-white"
                style={{ top: cm(i * 33), fontSize: cm(12), lineHeight: 1.579 }}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="absolute" style={{ left: cm(GM.x), top: cm(GM.contactTop) }}>
            <p className="whitespace-nowrap font-modular text-brand-lime" style={{ fontSize: cm(12), lineHeight: 1.579 }}>
              {f.contactHeading}
            </p>
            <div className="flex items-center" style={{ marginTop: cm(15), columnGap: cm(4) }}>
              <Mail aria-hidden className="shrink-0 text-brand-lime" style={{ width: cm(24), height: cm(24) }} strokeWidth={1.5} />
              <ProtectedEmail
                email={f.email}
                className="whitespace-nowrap font-display font-medium text-brand-lime hover:underline"
                style={{ fontSize: cm(14), lineHeight: 1.579 }}
              />
            </div>
            <div className="flex items-center" style={{ marginTop: cm(12), columnGap: cm(2) }}>
              <Smartphone aria-hidden className="shrink-0 text-brand-lime" style={{ width: cm(20), height: cm(20) }} strokeWidth={1.5} />
              <ProtectedPhone
                phone={f.phone}
                className="whitespace-nowrap font-display font-medium text-brand-lime hover:underline"
                style={{ fontSize: cm(14), lineHeight: 1.579 }}
              />
            </div>
          </div>
          <p className="absolute inset-x-0 flex items-baseline justify-center whitespace-nowrap font-modular" style={{ top: cm(GM.copyTop), lineHeight: 1.579 }}>
            <span className="text-brand-lime" style={{ fontSize: cm(GM.copyLimeFontPx) }}>{f.copyrightLime}</span>
            <span className="text-white" style={{ fontSize: cm(GM.copyWhiteFontPx), marginLeft: cm(12) }}>{f.copyrightWhite}</span>
          </p>
          <ScrollTopButton style={{ right: cm(47), top: cm(612), width: cm(44), height: cm(44) }} />
        </div>
      </div>
    </footer>
  );
}

export default function StopkaSection({ f }: { f: Footer }) {
  return (
    <>
    <StopkaMobile f={f} />
    <footer className="relative hidden w-full md:block">
      <div className="@container mx-auto w-full max-w-(--workspace)">
        <div
          className="relative border-t border-solid border-white"
          style={{ aspectRatio: `1440/${G.h}`, backgroundColor: "#000ae6" }}
          data-node-id="245:9562"
        >
          {/* logo .AI (crop z renderu) */}
          <img
            src="/assets/footer-logo-f.png" alt="kompetencje.ai"
            className="absolute"
            style={{ left: c(G.logo.left), top: c(G.logo.top), width: c(G.logo.w), height: c(G.logo.h) }}
          />
          {/* opis */}
          <p
            className="absolute font-display font-light text-white"
            style={{ left: c(G.contentX), top: c(G.descTop), width: c(300), fontSize: c(G.descFontPx), lineHeight: `${(G.descLh / 14.4).toFixed(4)}cqw` }}
          >
            {f.descriptionLines[0]} {f.descriptionLines[1]}
            <br />
            {f.descriptionLines[2]}
          </p>
          {/* copyright */}
          <p className="absolute whitespace-nowrap font-modular" style={{ left: c(G.contentX), top: c(G.copyTop), fontSize: c(9), lineHeight: 1.579 }}>
            <span className="text-brand-lime">{f.copyrightLime}</span>
            <span className="text-white" style={{ fontSize: c(8) }}> {f.copyrightWhite}</span>
          </p>
          {/* kolumna 1: nawigacja */}
          <nav className="absolute" style={{ left: c(G.col1X), top: c(G.linksTop) }} aria-label="Stopka — nawigacja">
            {f.navLinks.map((l, i) => (
              <a
                key={l.label} href={l.href}
                className="absolute block whitespace-nowrap font-modular text-white hover:text-brand-lime"
                style={{ top: c(i * G.linkGap1), fontSize: c(G.linkFontPx), lineHeight: 1.579 }}
              >
                {l.label}
              </a>
            ))}
          </nav>
          {/* kolumna 2: prawne */}
          <nav className="absolute" style={{ left: c(G.col2X), top: c(G.linksTop) }} aria-label="Stopka — dokumenty">
            {f.legalLinks.map((l, i) => (
              <a
                key={l.label} href={l.href}
                className="absolute block whitespace-nowrap font-modular text-white hover:text-brand-lime"
                style={{ top: c(i * G.linkGap2), fontSize: c(G.linkFontPx), lineHeight: 1.579 }}
              >
                {l.label}
              </a>
            ))}
          </nav>
          {/* kolumna 3: kontakt */}
          <div className="absolute" style={{ left: c(G.col3X), top: c(G.linksTop) }}>
            <p className="whitespace-nowrap font-modular text-brand-lime" style={{ fontSize: c(G.linkFontPx), lineHeight: 1.579 }}>
              {f.contactHeading}
            </p>
            <div className="flex items-center" style={{ marginTop: c(15), columnGap: c(4) }}>
              <Mail aria-hidden className="shrink-0 text-brand-lime" style={{ width: c(24), height: c(24) }} strokeWidth={1.5} />
              <ProtectedEmail
                email={f.email}
                className="whitespace-nowrap font-display font-medium text-brand-lime hover:underline"
                style={{ fontSize: c(G.contactFontPx), lineHeight: 1.579 }}
              />
            </div>
            <div className="flex items-center" style={{ marginTop: c(12), columnGap: c(2) }}>
              <Smartphone aria-hidden className="shrink-0 text-brand-lime" style={{ width: c(20), height: c(20) }} strokeWidth={1.5} />
              <ProtectedPhone
                phone={f.phone}
                className="whitespace-nowrap font-display font-medium text-brand-lime hover:underline"
                style={{ fontSize: c(G.contactFontPx), lineHeight: 1.579 }}
              />
            </div>
          </div>
          <ScrollTopButton style={{ right: c(130), top: c(214), width: c(44), height: c(44) }} />
        </div>
      </div>
    </footer>
    </>
  );
}
