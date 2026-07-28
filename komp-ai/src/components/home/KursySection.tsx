"use client";

/*
 * Sekcja 4: kursy — 3 karty na niebieskim tle (TYLKO desktop; mobile odłożone).
 * Scroll-scrubbing kart (życzenie Patryka): lewa wjeżdża zza LEWEGO marginesu,
 * środkowa od DOŁU, prawa zza PRAWEGO marginesu — progress = scroll, z lekkim
 * staggerem; overflow-hidden sekcji przycina karty poza kadrem.
 * Canvas 1440×874 (strona y3663–4537), niebieskie tło h806.
 * Karty w designie są w 100% zamienione na krzywe (zero tekstów!) — treść
 * odtworzona prawdziwymi fontami z pomiarów renderu (SEO: prawdziwe nagłówki).
 *
 * Geometria karty zmierzona scanlinami z renderu (design-refs/tools/kurs-runs.js,
 * kurs-ink.js): karta 315.7×451 (lime x210..525, y3879..4330 na stronie), biały
 * panel x43..316 pełnej wysokości (zaokrąglony tylko z prawej), foto na całą
 * szerokość panelu 273×211, button 210×45.5 z twardym jasnym cieniem (+14,+28)
 * przyciętym do panelu.
 */

import { useEffect, useRef } from "react";

export interface KursCard {
  tag: string;
  title: [string, string];
  price: string;
  ctaLabel: string;
  ctaHref: string;
}

const c = (px: number) => `${(px / 14.4).toFixed(4)}cqw`;

/* geometria karty — px designu, origin = lewy-górny róg lime (strona 210,3879) */
const K = {
  w: 315.7, h: 451,
  lime: { w: 120, r: 45 }, // widoczny pas 0..43, reszta pod panelem
  panel: { left: 43, w: 273, r: 45 }, // zaokrąglenie tylko z prawej
  sidebar: { w: 43, textLen: 441, endPad: 62 }, // ink: MAŁYSZ kończy 64px od góry karty (y3948)
  tag: { left: 55, top: 35.5, fontPx: 10.4, trackPx: 1.75 }, // ink y36..44, x55..181
  photo: { left: 43, top: 64, w: 273, h: 211 }, // pełna szerokość panelu
  title: { left: 54.7, top: 289.8, fontPx: 19.5, lineHeightPx: 18, trackPx: -0.5 }, // cap-top L1 = 291 (4170)
  divider: { left: 55, top: 335, w: 214 },
  price: { left: 56, top: 348.5, fontPx: 12, nettoPx: 8 }, // ink y350..359; "netto" mniejsze (brak lowercase w HK Modular)
  button: { left: 56.2, top: 378, w: 212.6, h: 45.5, r: 23, borderPx: 2.5, fontPx: 13, trackPx: 0.5 },
  btnShadow: { dx: 17, dy: 28, blur: 4, color: "#dcdce6" }, // miękki cień, klip do panelu
};

function KursCardBox({ card }: { card: KursCard }) {
  return (
    <div className="relative" style={{ width: c(K.w), height: c(K.h) }}>
      {/* warstwa kształtu (lime + biały panel) z miękkim cieniem karty */}
      <div
        className="absolute inset-0"
        style={{ filter: "drop-shadow(0.1389cqw 0.6944cqw 0.9722cqw rgba(0,24,84,0.4))" }}
      >
        <div
          className="absolute bg-brand-lime"
          style={{ left: 0, top: 0, width: c(K.lime.w), height: c(K.h), borderRadius: c(K.lime.r) }}
        />
        <div
          className="absolute overflow-hidden bg-page"
          style={{
            left: c(K.panel.left), top: 0, width: c(K.panel.w), height: c(K.h),
            borderRadius: `0 ${c(K.panel.r)} ${c(K.panel.r)} 0`,
          }}
        >
          {/* twardy cień buttona — pod buttonem, przycięty do panelu */}
          <div
            className="absolute"
            style={{
              left: c(K.button.left - K.panel.left + K.btnShadow.dx),
              top: c(K.button.top + K.btnShadow.dy),
              width: c(K.button.w), height: c(K.button.h),
              borderRadius: c(K.button.r), background: K.btnShadow.color,
              filter: `blur(${c(K.btnShadow.blur)})`,
            }}
          />
        </div>
      </div>
      {/* sidebar: pionowe podpisy na lime */}
      <div
        className="absolute flex items-center justify-center"
        style={{ left: 0, top: 0, width: c(K.sidebar.w), height: c(K.h) }}
      >
        <div className="-rotate-90">
          <div
            className="flex items-center whitespace-nowrap text-brand-blue"
            style={{ gap: c(8), width: c(K.sidebar.textLen), justifyContent: "flex-end", paddingRight: c(K.sidebar.endPad) }}
          >
            <span className="font-modular" style={{ fontSize: c(8), lineHeight: 1.2 }}>PROWADZĄCY:</span>
            <span className="font-display font-black" style={{ fontSize: c(15), lineHeight: 1.2, letterSpacing: c(1) }}>PIOTR MAŁYSZ</span>
          </div>
        </div>
      </div>
      {/* tag */}
      <p
        className="absolute whitespace-nowrap font-modular text-brand-blue"
        style={{ left: c(K.tag.left), top: c(K.tag.top), fontSize: c(K.tag.fontPx), letterSpacing: c(K.tag.trackPx), lineHeight: 1 }}
      >
        {card.tag}
      </p>
      {/* zdjęcie — pełna szerokość panelu */}
      <img
        src="/assets/kurs-photo.png"
        alt=""
        className="absolute"
        style={{ left: c(K.photo.left), top: c(K.photo.top), width: c(K.photo.w), height: c(K.photo.h) }}
      />
      {/* tytuł */}
      <h3
        className="absolute font-display font-black text-brand-blue"
        style={{ left: c(K.title.left), top: c(K.title.top), fontSize: c(K.title.fontPx), lineHeight: c(K.title.lineHeightPx), letterSpacing: c(K.title.trackPx) }}
      >
        {card.title[0]}
        <br />
        {card.title[1]}
      </h3>
      {/* linia */}
      <div className="absolute bg-brand-blue" style={{ left: c(K.divider.left), top: c(K.divider.top), width: c(K.divider.w), height: "max(1px, 0.07cqw)" }} />
      {/* cena — "netto" mniejszym stopniem (HK Modular nie ma prawdziwego lowercase) */}
      <p className="absolute whitespace-nowrap font-modular text-brand-blue" style={{ left: c(K.price.left), top: c(K.price.top), fontSize: c(K.price.fontPx), lineHeight: 1 }}>
        {card.price.replace(/\s*netto\s*$/i, "")}{" "}
        <span style={{ fontSize: c(K.price.nettoPx) }}>netto</span>
      </p>
      {/* CTA */}
      <a
        href={card.ctaHref}
        className="absolute flex items-center justify-center border-solid border-brand-blue bg-brand-lime font-modular text-brand-blue"
        style={{
          left: c(K.button.left), top: c(K.button.top), width: c(K.button.w), height: c(K.button.h),
          borderRadius: c(K.button.r), borderWidth: c(K.button.borderPx),
          fontSize: c(K.button.fontPx), letterSpacing: c(K.button.trackPx),
        }}
      >
        {card.ctaLabel}
      </a>
    </div>
  );
}

/* pozycje w sekcji (origin = góra niebieskiego tła, strona y3663) */
const G = {
  // ink: cap-top L1 y3748 (lok. 85), x169; pitch linii 46; tracking różny per linia
  header: { left: 166, line1Top: 75, fontPx: 32, lineHeightPx: 46, track1Px: 2.2, track2Px: 1.0, wordPx: 3 },
  cards: [
    { left: 210, top: 216 },
    { left: 572, top: 216 },
    { left: 934, top: 216 },
  ],
};

export default function KursySection({ cards }: { cards: KursCard[] }) {
  const wrapRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLHeadingElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const sticky = stickyRef.current;
    const header = headerRef.current;
    if (!wrap || !sticky || !header) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let extra = 0;
    // PIN (życzenie Patryka: końcówka nie może „uciekać" scrollem): sekcja
    // przyklejona GÓRĄ (napis NIE CZEKAJ zawsze w kadrze); karty lądują do
    // ~78% extra, potem zawieszenie, a nagłówek pojawia się jako FINAŁ
    // dopiero gdy wszystkie karty są na miejscach.
    if (!reduce) {
      header.style.opacity = "0";
      header.style.transform = "translateY(16px)";
      header.style.transition = "opacity 0.45s ease, transform 0.45s ease";
    }
    const setSizes = () => {
      const vh = window.innerHeight;
      sticky.style.top = "0px";
      if (reduce) {
        extra = 0;
        wrap.style.height = "";
        return;
      }
      extra = Math.round(vh * 0.85);
      wrap.style.height = `${sticky.offsetHeight + extra}px`;
    };
    const apply = () => {
      raf = 0;
      const raw = reduce || extra === 0
        ? 1
        : Math.min(1, Math.max(0, -wrap.getBoundingClientRect().top / extra));
      const sub = (a: number, b: number) => Math.min(1, Math.max(0, (raw - a) / (b - a)));
      const t = [sub(0, 0.62), sub(0.06, 0.7), sub(0.12, 0.78)];
      const tr = [
        `translateX(${(-(1 - t[0]) * 175).toFixed(2)}%)`, // lewa zza lewego marginesu
        `translateY(${((1 - t[1]) * 160).toFixed(2)}%)`, // środkowa od dołu
        `translateX(${((1 - t[2]) * 175).toFixed(2)}%)`, // prawa zza prawego marginesu
      ];
      cardRefs.current.forEach((el, i) => {
        if (el) el.style.transform = tr[i];
      });
      // nagłówek = finał choreografii (po wylądowaniu wszystkich kart)
      if (!reduce) {
        const showHeader = raw >= 0.8;
        header.style.opacity = showHeader ? "1" : "0";
        header.style.transform = showHeader ? "translateY(0)" : "translateY(16px)";
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onResize = () => {
      setSizes();
      schedule();
    };
    setSizes();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    schedule();
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section ref={wrapRef} className="relative hidden w-full bg-page md:block">
      <div ref={stickyRef} className="sticky top-0">
      <div className="@container mx-auto w-full max-w-(--workspace)">
        <div className="relative aspect-[1440/874] overflow-hidden bg-page">
          {/* niebieskie tło sekcji (1440×806) */}
          <div className="absolute inset-x-0 top-0 bg-brand-blue" style={{ height: c(806) }} data-node-id="245:8087" />
          {/* nagłówek — w designie krzywe, tu prawdziwy HK Modular */}
          <h2
            ref={headerRef}
            className="absolute font-modular font-normal text-white"
            style={{ left: c(G.header.left), top: c(G.header.line1Top), fontSize: c(G.header.fontPx), lineHeight: c(G.header.lineHeightPx), wordSpacing: c(G.header.wordPx) }}
            data-node-id="245:8090"
          >
            <span style={{ letterSpacing: c(G.header.track1Px) }}>NIE CZEKAJ</span>
            <br />
            <span style={{ letterSpacing: c(G.header.track2Px) }}>WYBIERZ KURS I WYPRZEDŹ INNYCH.</span>
          </h2>
          {cards.map((card, i) => (
            <div
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="absolute will-change-transform"
              style={{ left: c(G.cards[i].left), top: c(G.cards[i].top) }}
            >
              <KursCardBox card={card} />
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
