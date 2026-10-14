/*
 * Robot /manifest v2 z animacją power-on (Higgsfield Seedance 2.0, tło
 * magenta wycięte → packed-alpha MP4, patrz AlphaVideo). Wrapper = slot
 * robota z designu (proporcje 990×1370 assetu mf-robot.webp); ramka wideo
 * dopasowana do bboxa alfy robota z designu (skala 1.273 px assetu / px
 * wideo, zmierzone na ostatniej klatce — design-refs/manifest-v2/video).
 */
import AlphaVideo from "./AlphaVideo";

const FRAME: React.CSSProperties = {
  left: "-0.82%",
  top: "-0.34%",
  width: "104.14%",
  height: "100.34%",
};

export default function RobotVideo({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={className} style={style} data-reveal="">
      <AlphaVideo
        src="/assets/manifest/mf-robot-poweron.mp4"
        fallbackSrc="/assets/manifest/mf-robot-poweron-last.webp"
        alt="Robot AI budzi się — symbol nowej ery, w której kreatywność spotyka się z technologią"
        className="absolute"
        style={FRAME}
      />
    </div>
  );
}
