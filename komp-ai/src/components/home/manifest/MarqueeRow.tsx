interface MarqueeRowProps {
  text: string;
  scale: (px: number) => string;
  fontPx: number;
  gapPx: number;
  starW: number;
  starH: number;
}

export default function MarqueeRow({
  text,
  scale,
  fontPx,
  gapPx,
  starW,
  starH,
}: MarqueeRowProps) {
  const half = (key: string) => (
    <div key={key} className="flex shrink-0 items-center" style={{ gap: scale(gapPx), paddingRight: scale(gapPx) }}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex shrink-0 items-center" style={{ gap: scale(gapPx) }}>
          <span className="whitespace-nowrap">{text}</span>
          <img src="/assets/gwiazdka-lime.png" alt="" style={{ width: scale(starW), height: scale(starH) }} />
        </div>
      ))}
    </div>
  );

  return (
    <div
      className="marquee-track absolute flex h-full items-center font-modular text-black"
      style={{ left: scale(-58), gap: 0, fontSize: scale(fontPx), lineHeight: 1.313 }}
      aria-hidden="false"
    >
      {half("a")}
      {half("b")}
    </div>
  );
}
