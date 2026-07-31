import Link from "next/link";
import type { HomeManifest } from "@/content/types";
import RichText from "@/components/ui/RichText";
import { MobileManifestGraphics } from "./ManifestGraphics";

const cm = (px: number) => `${(px / 4.02).toFixed(4)}cqw`;

const GM = {
  h: 1146.5,
  lineA: { left: 45, top: 40, w: 200, fontPx: 27 },
  lineB: { right: 402 - 364, top: 122, w: 320, fontPx: 17 },
  lineC: { right: 402 - 364, top: 176, fontPx: 19 },
  para: { left: 24, top: 310, w: 345, fontPx: 12.5 },
  pill: { left: 24, top: 512, w: 353, h: 180, radiusPx: 30, borderPx: 2, padX: 28, padY: 20, fontPx: 11.5 },
  bar: { top: 730, h: 120 },
  barCenter: { top: 10, fontPx: 32 },
  barSub: { top: 56, fontPx: 11 },
  ctaBox: { top: 850, h: 296.5 },
  tagline: { top: 40, fontPx: 15 },
  button: { top: 115, w: 300, h: 55, radiusPx: 40, borderPx: 3, fontPx: 14 },
};

export default function ManifestMobile({ m }: { m: HomeManifest }) {
  return (
    <section className="relative w-full md:hidden">
      <div className="@container mx-auto w-full max-w-(--workspace)">
        <div className="relative overflow-hidden bg-brand-blue" style={{ aspectRatio: `402/${GM.h}` }} data-node-id="423:3303">
          <MobileManifestGraphics />

          <h2
            className="absolute font-modular font-normal text-white"
            style={{ left: cm(GM.lineA.left), top: cm(GM.lineA.top), width: cm(GM.lineA.w), fontSize: cm(GM.lineA.fontPx), lineHeight: "normal" }}
            data-reveal=""
          >
            {m.lineA}
          </h2>

          <p
            className="absolute font-display font-medium text-white"
            style={{ right: cm(GM.lineB.right), top: cm(GM.lineB.top), width: cm(GM.lineB.w), fontSize: cm(GM.lineB.fontPx), lineHeight: "normal", textAlign: "right" as const }}
            data-reveal=""
          >
            {m.lineB}
          </p>

          <p
            className="absolute font-display font-black text-white"
            style={{ right: cm(GM.lineC.right), top: cm(GM.lineC.top), fontSize: cm(GM.lineC.fontPx), lineHeight: "normal", textAlign: "right" as const }}
            data-reveal=""
          >
            {m.lineC[0]}
            <br />
            {m.lineC[1]}
          </p>

          <p
            className="absolute font-body text-white"
            style={{ left: cm(GM.para.left), top: cm(GM.para.top), width: cm(GM.para.w), fontSize: cm(GM.para.fontPx), lineHeight: 1.35, textAlign: "justify" as const }}
            data-reveal=""
          >
            <RichText segs={m.paragraph} baseFontPx={GM.para.fontPx} scale={cm} />
          </p>

          <div
            className="absolute flex items-center justify-center border-solid border-white bg-brand-lime"
            style={{
              left: cm(GM.pill.left), top: cm(GM.pill.top), width: cm(GM.pill.w), height: cm(GM.pill.h),
              borderRadius: cm(GM.pill.radiusPx), borderWidth: cm(GM.pill.borderPx),
              paddingLeft: cm(GM.pill.padX), paddingRight: cm(GM.pill.padX),
            }}
            data-reveal=""
          >
            <p className="font-body text-brand-blue" style={{ fontSize: cm(GM.pill.fontPx), lineHeight: 1.4, textAlign: "justify" as const }}>
              <RichText segs={m.pill} baseFontPx={GM.pill.fontPx} scale={cm} />
            </p>
          </div>

          <div className="absolute inset-x-0 bg-brand-lime text-center" style={{ top: cm(GM.bar.top), height: cm(GM.bar.h) }}>
            <p className="font-display font-black text-brand-blue" style={{ marginTop: cm(GM.barCenter.top), fontSize: cm(GM.barCenter.fontPx) }}>
              {m.bar.center}
            </p>
            <p className="font-modular text-black" style={{ marginTop: cm(4), fontSize: cm(GM.barSub.fontPx) }}>
              {m.bar.left} {m.bar.right}
            </p>
          </div>

          <div className="absolute inset-x-0 flex flex-col items-center bg-brand-blue text-center" style={{ top: cm(GM.ctaBox.top), height: cm(GM.ctaBox.h) }}>
            <p className="font-modular text-white" style={{ marginTop: cm(GM.tagline.top), fontSize: cm(GM.tagline.fontPx) }}>
              {m.mobileTagline}
            </p>
            <Link
              href="/#kursy"
              className="flex items-center justify-center border-solid border-white bg-brand-lime font-modular text-brand-blue"
              style={{
                marginTop: cm(30),
                width: cm(GM.button.w), height: cm(GM.button.h),
                borderRadius: cm(GM.button.radiusPx), borderWidth: cm(GM.button.borderPx),
                fontSize: cm(GM.button.fontPx),
              }}
            >
              {m.mobileCtaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
