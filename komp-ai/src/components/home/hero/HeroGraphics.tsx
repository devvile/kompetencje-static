import Image from "next/image";

const c = (px: number) => `${(px / 14.4).toFixed(4)}cqw`;
const cm = (px: number) => `${(px / 4.02).toFixed(4)}cqw`;

/* Desktop geometry for graphics */
const G = {
  robot: { left: -9, top: 26, w: 646, h: 807 },
  starRobot: { left: 0, top: 129, w: 259, h: 251.5 },
  limeStarTR: { left: 1020.3, top: 173.5, w: 340.5, h: 323 },
  starTRsmall: { left: 1235, top: 195.6, w: 110.5, h: 105 },
  swoosh: { left: 584, top: 438, w: 303.5, h: 304.5 },
  aiLogo: { left: 1003.93, top: 444.89, w: 436.5, h: 369.5 },
};

export function DesktopHeroGraphics() {
  return (
    <>
      {/* gwiazda outline ZA robotem */}
      <img
        src="/assets/star-outline-f.png"
        alt=""
        className="hero-star-big absolute"
        style={{ left: c(G.starRobot.left), top: c(G.starRobot.top), width: c(G.starRobot.w), height: c(G.starRobot.h) }}
        data-node-id="401:2610"
      />
      {/* limonkowa gwiazda przy prawej krawędzi */}
      <img
        src="/assets/lime-star-f.png"
        alt=""
        className="hero-star-pulse absolute"
        style={{ left: c(G.limeStarTR.left), top: c(G.limeStarTR.top), width: c(G.limeStarTR.w), height: c(G.limeStarTR.h) }}
        data-node-id="401:2570"
      />
      {/* mała gwiazda outline w prawym górnym rogu */}
      <img
        src="/assets/star-outline-sm-f.png"
        alt=""
        className="hero-star-big-b absolute"
        style={{ left: c(G.starTRsmall.left), top: c(G.starTRsmall.top), width: c(G.starTRsmall.w), height: c(G.starTRsmall.h) }}
        data-node-id="401:2611"
      />
      {/* robot */}
      <Image
        src="/assets/robot-hero-alpha-2x.png"
        alt="Robot AI — kompetencje przyszłości"
        width={1292}
        height={1614}
        priority
        className="absolute"
        style={{ left: c(G.robot.left), top: c(G.robot.top), width: c(G.robot.w), height: c(G.robot.h) }}
        data-node-id="401:2568"
      />
      {/* limonkowy swoosh (STAR_ARROW) */}
      <img
        src="/assets/star-arrow-f.png"
        alt=""
        className="absolute"
        style={{ left: c(G.swoosh.left), top: c(G.swoosh.top), width: c(G.swoosh.w), height: c(G.swoosh.h) }}
        data-node-id="401:2612"
      />
      {/* duże .AI z pionowym KOMPETENCJE */}
      <img
        src="/assets/ai-logo-filtered.png"
        alt=""
        className="hero-text hero-text-d5 absolute"
        style={{ left: c(G.aiLogo.left), top: c(G.aiLogo.top), width: c(G.aiLogo.w), height: c(G.aiLogo.h) }}
        data-node-id="401:2584"
      />
    </>
  );
}

const GM = {
  blob: { left: 0, top: 0, w: 402, h: 1143.5 },
  starOutline: { left: 119.7, top: 213.2, w: 143, h: 140.5 },
  starSm: { left: 195.3, top: 91.5, w: 32.5, h: 30.5 },
  robot: { left: -122, top: 219, w: 525, h: 656 },
  miniGroup: { left: 180, top: 442, w: 138.5, h: 123 },
};

export function MobileHeroGraphics() {
  return (
    <>
      <img
        src="/assets/m-hero-blob-f.png"
        alt=""
        className="absolute"
        style={{ left: cm(GM.blob.left), top: cm(GM.blob.top), width: cm(GM.blob.w), height: cm(GM.blob.h) }}
        data-node-id="423:3276"
      />
      <img
        src="/assets/m-star-outline-f.png"
        alt=""
        className="hero-star-big absolute"
        style={{ left: cm(GM.starOutline.left), top: cm(GM.starOutline.top), width: cm(GM.starOutline.w), height: cm(GM.starOutline.h) }}
        data-node-id="423:3297"
      />
      <img
        src="/assets/m-star-sm-f.png"
        alt=""
        className="hero-star-pulse absolute"
        style={{ left: cm(GM.starSm.left), top: cm(GM.starSm.top), width: cm(GM.starSm.w), height: cm(GM.starSm.h) }}
        data-node-id="423:3298"
      />
      <Image
        src="/assets/m-robot-f-2x.png"
        alt="Robot AI"
        width={1050}
        height={1312}
        priority
        className="absolute"
        style={{ left: cm(GM.robot.left), top: cm(GM.robot.top), width: cm(GM.robot.w), height: cm(GM.robot.h) }}
        data-node-id="423:3296"
      />
      <img
        src="/assets/m-mini-group-f.png"
        alt=""
        className="absolute"
        style={{ left: cm(GM.miniGroup.left), top: cm(GM.miniGroup.top), width: cm(GM.miniGroup.w), height: cm(GM.miniGroup.h) }}
        data-node-id="423:3300"
      />
    </>
  );
}
