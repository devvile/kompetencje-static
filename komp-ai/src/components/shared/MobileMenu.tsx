"use client";

/*
 * Mobilne menu: burger + pełnoekranowy overlay. Burger = 3 paski CSS
 * odtwarzające asset designu (m-burger-f.png: 3 niebieskie linie), morfujące
 * w X; pozycję/rozmiar przycisku podaje rodzic (className/style w cqw canvasu).
 * Overlay przez portal do <body> — canvasy sekcji są @container
 * (contain: layout), co przechwytywałoby position: fixed. Wejście: clip-path
 * circle rosnący z rogu burgera + kaskada linków; wyjście = odwrotnie.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import type { NavLink } from "@/content/types";

const EXIT_MS = 550;

export default function MobileMenu({
  nav,
  className,
  style,
}: {
  nav: NavLink[];
  className?: string;
  style?: React.CSSProperties;
}) {
  const [mounted, setMounted] = useState(false); // overlay w DOM
  const [open, setOpen] = useState(false); // stan animacji (klatkę po montażu)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMounted(true);
    // podwójny rAF: overlay musi dostać klatkę w stanie zamkniętym,
    // żeby transition clip-path w ogóle wystartował
    requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)));
  }, []);

  const hide = useCallback(() => {
    setOpen(false);
    closeTimer.current = setTimeout(() => setMounted(false), EXIT_MS);
  }, []);

  // blokada scrolla pod overlayem + Escape
  useEffect(() => {
    if (!mounted) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") hide();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [mounted, hide]);

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  /* clip-path rośnie ze środka burgera (MobileTopBar: 20px od prawej + 20px
     do środka przycisku, top 59px + 20px) */
  const origin = "calc(100% - 40px) 79px";

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Zamknij menu" : "Otwórz menu"}
        aria-expanded={open}
        onClick={open ? hide : show}
        // rodzic podaje pozycjonowanie (absolute + offsety); fallback relative
        // tylko gdy nie podał — paski w środku są absolute
        className={className ?? "relative"}
        style={style}
      >
        {/* 3 paski jak w assecie designu; morf w X */}
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="absolute left-[10%] right-[10%] rounded-full bg-brand-blue transition-all duration-300 ease-in-out"
            style={{
              height: "max(2px, 5%)",
              top: open ? "50%" : ["30%", "50%", "70%"][i],
              transform: `translateY(-50%) rotate(${open ? [45, 0, -45][i] : 0}deg)`,
              opacity: open && i === 1 ? 0 : 1,
            }}
          />
        ))}
      </button>
      {mounted &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[9999] flex flex-col bg-brand-blue"
            style={{
              clipPath: open ? `circle(150% at ${origin})` : `circle(0px at ${origin})`,
              transition: `clip-path ${open ? 600 : EXIT_MS}ms cubic-bezier(0.77, 0, 0.18, 1)`,
            }}
          >
            {/* pasek górny: marka + zamknięcie */}
            <div className="flex items-center justify-between px-[24px] pt-[52px]">
              <Link
                href="/"
                onClick={hide}
                className="font-modular text-[13px] tracking-[0.08em] text-white"
              >
                KOMPETENCJE.AI
              </Link>
              <button
                type="button"
                aria-label="Zamknij menu"
                onClick={hide}
                className="relative h-[40px] w-[40px]"
              >
                {[45, -45].map((deg) => (
                  <span
                    key={deg}
                    className="absolute left-[8%] right-[8%] top-1/2 rounded-full bg-white transition-transform duration-300"
                    style={{
                      height: "2px",
                      transform: `translateY(-50%) rotate(${open ? deg : 0}deg)`,
                    }}
                  />
                ))}
              </button>
            </div>
            {/* linki — kaskadowe wejście */}
            <nav className="flex flex-1 flex-col justify-center gap-[26px] px-[24px]">
              {nav.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={hide}
                  className="group flex items-baseline gap-[14px]"
                  style={{
                    opacity: open ? 1 : 0,
                    transform: open ? "translateY(0)" : "translateY(28px)",
                    transition: `opacity 450ms ease, transform 450ms cubic-bezier(0.22, 1, 0.36, 1)`,
                    transitionDelay: open ? `${180 + i * 75}ms` : "0ms",
                  }}
                >
                  <span className="font-modular text-[12px] text-brand-lime">
                    0{i + 1}
                  </span>
                  <span className="font-display text-[40px] font-black leading-none text-white transition-colors duration-200 group-hover:text-brand-lime group-active:text-brand-lime">
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>
            {/* stopka overlaya: mail */}
            <div
              className="px-[24px] pb-[40px]"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 450ms ease, transform 450ms ease",
                transitionDelay: open ? `${180 + nav.length * 75}ms` : "0ms",
              }}
            >
              <a
                href="mailto:kontakt@kompetencje.ai"
                className="font-modular text-[12px] tracking-[0.06em] text-brand-lime"
              >
                KONTAKT@KOMPETENCJE.AI
              </a>
            </div>
            {/* dekoracyjna limonkowa gwiazda (asset hero) */}
            <img
              src="/assets/lime-star-f.png"
              alt=""
              aria-hidden
              className="menu-star-float pointer-events-none absolute -right-[70px] bottom-[64px] w-[210px] opacity-90"
              style={{
                transition: "opacity 600ms ease 300ms",
                opacity: open ? 0.9 : 0,
              }}
            />
          </div>,
          document.body,
        )}
    </>
  );
}
