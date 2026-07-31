const c = (px: number) => `${(px / 14.4).toFixed(4)}cqw`;
const cm = (px: number) => `${(px / 4.02).toFixed(4)}cqw`;

const G = {
  glob: { left: 83, top: 231.2, w: 654, h: 654.8 },
  limeStar: { left: -6.2, top: 155.8, w: 688.5, h: 1048.5 },
  sparkle: { left: 750, top: 629.8, w: 89.4, h: 87.4 },
  arrowWhite: { left: 1339.9, top: 627.4, w: 184.9, h: 188.1 },
  polygon: { left: 250.5, top: 861.7, w: 302.7, h: 212.3 },
};

export function DesktopManifestGraphics() {
  return (
    <>
      {/* wielka limonkowa gwiazda za robotem */}
      <img
        src="/assets/gwiazdka-lime-big-f.png"
        alt=""
        className="absolute max-w-none"
        style={{ left: c(G.limeStar.left), top: c(G.limeStar.top), width: c(G.limeStar.w), height: c(G.limeStar.h) }}
        data-reveal=""
        data-node-id="407:2854"
      />
      {/* glob: robot z tabletem (okrągły clip) */}
      <img
        src="/assets/glob-robot-f.png"
        alt="Robot AI czytający z tabletu"
        className="absolute"
        style={{ left: c(G.glob.left), top: c(G.glob.top), width: c(G.glob.w), height: c(G.glob.h), transitionDelay: "0.1s" }}
        data-reveal=""
        data-node-id="245:4367"
      />
      {/* biała gwiazdka */}
      <img
        src="/assets/gwiazdka.svg"
        alt=""
        className="absolute"
        style={{ left: c(G.sparkle.left), top: c(G.sparkle.top), width: c(G.sparkle.w), height: c(G.sparkle.h), transitionDelay: "0.35s" }}
        data-reveal=""
        data-node-id="412:2909"
      />
      {/* biała strzałka-gwiazda przy prawej krawędzi */}
      <img
        src="/assets/star-arrow-white.svg"
        alt=""
        className="absolute max-w-none"
        style={{ left: c(G.arrowWhite.left), top: c(G.arrowWhite.top), width: c(G.arrowWhite.w), height: c(G.arrowWhite.h), transitionDelay: "0.3s" }}
        data-reveal=""
        data-node-id="407:2865"
      />
      {/* polygon (kontur) */}
      <img
        src="/assets/polygon-manifest.svg"
        alt=""
        className="absolute"
        style={{ left: c(G.polygon.left), top: c(G.polygon.top), width: c(G.polygon.w), height: c(G.polygon.h), transitionDelay: "0.15s" }}
        data-reveal=""
        data-node-id="407:2874"
      />
    </>
  );
}

const GM = {
  limeStar: { left: -142, top: 154, w: 462.5, h: 704.5 },
  glob: { left: -39, top: 181, w: 439, h: 439 },
  sparkle: { left: 45, top: 436, w: 60, h: 58.7 },
  polygon: { left: 247, top: 574, w: 203, h: 142 },
};

export function MobileManifestGraphics() {
  return (
    <>
      <img
        src="/assets/gwiazdka-lime-big-f.png"
        alt=""
        className="absolute max-w-none"
        style={{ left: cm(GM.limeStar.left), top: cm(GM.limeStar.top), width: cm(GM.limeStar.w), height: cm(GM.limeStar.h) }}
        data-reveal=""
      />
      <img
        src="/assets/glob-robot-f.png"
        alt="Robot AI"
        className="absolute"
        style={{ left: cm(GM.glob.left), top: cm(GM.glob.top), width: cm(GM.glob.w), height: cm(GM.glob.h) }}
        data-reveal=""
      />
      <img
        src="/assets/gwiazdka.svg"
        alt=""
        className="absolute"
        style={{ left: cm(GM.sparkle.left), top: cm(GM.sparkle.top), width: cm(GM.sparkle.w), height: cm(GM.sparkle.h) }}
        data-reveal=""
      />
      <img
        src="/assets/polygon-manifest.svg"
        alt=""
        className="absolute"
        style={{ left: cm(GM.polygon.left), top: cm(GM.polygon.top), width: cm(GM.polygon.w), height: cm(GM.polygon.h) }}
        data-reveal=""
      />
    </>
  );
}
