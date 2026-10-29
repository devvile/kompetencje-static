import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

// Obrazek udostępniania (LinkedIn, Messenger, Slack…) — wspólny dla całego serwisu.
// Kolory = brand (globals.css), napis = HK Modular jak nav/przyciski.
export const alt = "Kompetencje.ai — kursy AI, które dają realne kompetencje";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const modular = await readFile(path.join(process.cwd(), "src/fonts/modular.woff"));
  const logo = await readFile(path.join(process.cwd(), "public/assets/ai-logo-filtered.png"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#131dff",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontFamily: "Modular", fontSize: 34, color: "#d6ff3f", letterSpacing: 2 }}>
            KURSY AI ONLINE
          </div>
          {/* logo jest niebieskie na jasnym — kafel w kolorze tła strony */}
          <div style={{ display: "flex", padding: 14, borderRadius: 28, background: "#efefef" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`data:image/png;base64,${logo.toString("base64")}`} width={113} height={96} alt="" />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontFamily: "Modular", fontSize: 88, lineHeight: 1, color: "#d6ff3f" }}>
            KOMPETENCJE.AI
          </div>
          <div style={{ display: "flex", marginTop: 32, fontSize: 40, lineHeight: 1.25, maxWidth: 900 }}>
            Kursy AI, które dają realne kompetencje przyszłości.
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Modular", data: modular, style: "normal", weight: 700 }] },
  );
}
