/*
 * Renderer RichSeg dla /manifest (desktop i mobile):
 * - strong  → limonkowy marker (pas ~1.17em jak prostokąty w Figmie, łamie się
 *             z linią dzięki box-decoration-clone), tekst niebieski SemiBold,
 * - weight  → sama waga fontu, trackEm → rozstrzelenie,
 * - fontPx  → rozmiar względem basePx akapitu (em — skaluje się z akapitem).
 */
import type { RichSeg } from "@/content/types";

export default function ManifestRich({ segs, basePx }: { segs: RichSeg[]; basePx: number }) {
  return (
    <>
      {segs.map((s, i) => {
        const style: React.CSSProperties = {};
        if (s.fontPx) style.fontSize = `${(s.fontPx / basePx).toFixed(4)}em`;
        if (s.weight) style.fontWeight = s.weight;
        if (s.trackEm) style.letterSpacing = `${s.trackEm}em`;
        if (s.strong) {
          return (
            <mark
              key={i}
              className="box-decoration-clone font-semibold text-brand-blue"
              style={{
                ...style,
                background: "linear-gradient(var(--color-brand-lime), var(--color-brand-lime)) no-repeat 0 72% / 100% 1.17em",
                padding: "0 0.12em",
                margin: "0 -0.12em",
              }}
            >
              {s.text}
            </mark>
          );
        }
        return (
          <span key={i} style={style}>
            {s.text}
          </span>
        );
      })}
    </>
  );
}
