import type { RichSeg } from "@/content/types";

interface RichTextProps {
  segs: RichSeg[];
  baseFontPx?: number;
  scale?: (px: number) => string;
  className?: string;
}

/**
 * Reużywalny komponent do renderowania sformatowanych fragmentów tekstu (RichSeg[])
 * z obsługą dopasowanej wagi, twardych łamań linii oraz opcjonalnego skalowania czcionki.
 */
export default function RichText({ segs, scale, className }: RichTextProps) {
  return (
    <span className={className}>
      {segs.map((s, i) => (
        <span key={i}>
          <span
            className={s.strong ? "font-extrabold" : undefined}
            style={s.fontPx && scale ? { fontSize: scale(s.fontPx) } : undefined}
          >
            {s.text}
          </span>
          {s.break ? <br /> : null}
        </span>
      ))}
    </span>
  );
}
