import type { HomeManifest } from "@/content/types";
import RichText from "@/components/ui/RichText";
import { DesktopManifestGraphics } from "./ManifestGraphics";
import MarqueeRow from "./MarqueeRow";

const c = (px: number) => `${(px / 14.4).toFixed(4)}cqw`;

const G = {
  lineA: { left: 208, top: 72, w: 220, fontPx: 40 },
  lineB: { right: 1440 - 905, top: 201, w: 515, fontPx: 28 },
  lineC: { right: 1440 - 1311, top: 307, fontPx: 35 },
  para: { left: 809, top: 448, w: 498, fontPx: 18 },
  pill: { left: 673, top: 795, w: 667, h: 202, radiusPx: 40, borderPx: 3, fontPx: 17 },
  limeBar: { top: 1130, h: 144 },
  barLeft: { left: 84, top: 1194, fontPx: 20 },
  barCenter: { rightEdge: 888, top: 1168, fontPx: 60 },
  barRight: { left: 917.94, top: 1194, fontPx: 20 },
  whiteBar: { top: 1274, h: 54 },
  marquee: { top: 1285, h: 33, fontPx: 14, gapPx: 30, starW: 31, starH: 33 },
};

export default function ManifestDesktop({ m }: { m: HomeManifest }) {
  return (
    <section className="relative hidden w-full md:block">
      <div className="@container mx-auto w-full max-w-(--workspace)">
        <div className="relative aspect-[1440/1328] overflow-hidden bg-brand-blue">
          <DesktopManifestGraphics />

          {/* NIE CHODZI O TO, */}
          <h2
            className="absolute font-modular font-normal text-white"
            style={{ left: c(G.lineA.left), top: c(G.lineA.top), width: c(G.lineA.w), fontSize: c(G.lineA.fontPx), lineHeight: "normal" }}
            data-reveal=""
            data-node-id="245:4395"
          >
            {m.lineA}
          </h2>

          {/* CZY AI ZMIENI TWOJĄ BRANŻĘ. */}
          <p
            className="absolute font-display font-medium text-white"
            style={{ right: c(G.lineB.right), top: c(G.lineB.top), width: c(G.lineB.w), fontSize: c(G.lineB.fontPx), lineHeight: "normal", textAlign: "right" as const, transitionDelay: "0.12s" }}
            data-reveal=""
            data-node-id="407:2853"
          >
            {m.lineB}
          </p>

          {/* CHODZI O TO, / CZY JESTEŚ NA TO GOTOWY. */}
          <p
            className="absolute whitespace-nowrap font-display font-black text-white"
            style={{ right: c(G.lineC.right), top: c(G.lineC.top), fontSize: c(G.lineC.fontPx), lineHeight: "normal", textAlign: "right" as const, transitionDelay: "0.22s" }}
            data-reveal=""
            data-node-id="245:4382"
          >
            {m.lineC[0]}
            <br />
            {m.lineC[1]}
          </p>

          {/* akapit */}
          <p
            className="absolute font-body text-white"
            style={{ left: c(G.para.left), top: c(G.para.top), width: c(G.para.w), fontSize: c(G.para.fontPx), lineHeight: 1.313, textAlign: "justify" as const, transitionDelay: "0.3s" }}
            data-reveal=""
            data-node-id="245:4399"
          >
            <RichText segs={m.paragraph} baseFontPx={G.para.fontPx} scale={c} />
          </p>

          {/* limonkowy pill z tekstem */}
          <div
            className="absolute flex items-center justify-center border-solid border-white bg-brand-lime"
            style={{
              left: c(G.pill.left), top: c(G.pill.top), width: c(G.pill.w), height: c(G.pill.h),
              borderRadius: c(G.pill.radiusPx), borderWidth: c(G.pill.borderPx),
              paddingLeft: c(54), paddingRight: c(46), transitionDelay: "0.4s",
            }}
            data-reveal=""
            data-node-id="407:2863"
          >
            <p
              className="font-body text-brand-blue"
              style={{ fontSize: c(G.pill.fontPx), lineHeight: 1.44, textAlign: "justify" as const }}
            >
              <RichText segs={m.pill} baseFontPx={G.pill.fontPx} scale={c} />
            </p>
          </div>

          {/* pasek lime */}
          <div
            className="absolute inset-x-0 bg-brand-lime"
            style={{ top: c(G.limeBar.top), height: c(G.limeBar.h) }}
            data-node-id="245:4380"
          >
            <p
              className="absolute whitespace-nowrap font-modular text-black"
              style={{ left: c(G.barLeft.left - 0), top: c(G.barLeft.top - G.limeBar.top), fontSize: c(G.barLeft.fontPx), lineHeight: "normal" }}
              data-reveal=""
            >
              {m.bar.left}
            </p>
            <p
              className="absolute -translate-x-full whitespace-nowrap font-display font-black text-brand-blue"
              style={{ left: c(G.barCenter.rightEdge), top: c(G.barCenter.top - G.limeBar.top), fontSize: c(G.barCenter.fontPx), lineHeight: "normal" }}
              data-node-id="245:4384"
            >
              <span className="inline-block" style={{ transitionDelay: "0.1s" }} data-reveal="">
                {m.bar.center}
              </span>
            </p>
            <p
              className="absolute whitespace-nowrap font-modular text-black"
              style={{ left: c(G.barRight.left - 0), top: c(G.barRight.top - G.limeBar.top), fontSize: c(G.barRight.fontPx), lineHeight: "normal" }}
              data-reveal=""
            >
              {m.bar.right}
            </p>
          </div>

          {/* pasek biały z marquee */}
          <div
            className="absolute inset-x-0 overflow-hidden bg-white"
            style={{ top: c(G.whiteBar.top), height: c(G.whiteBar.h) }}
            data-node-id="245:4381"
          >
            <MarqueeRow
              text={m.marqueeText}
              scale={c}
              fontPx={G.marquee.fontPx}
              gapPx={G.marquee.gapPx}
              starW={G.marquee.starW}
              starH={G.marquee.starH}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
