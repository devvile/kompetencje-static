import type { Metadata } from "next";
import { Montserrat, Manrope } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "700", "800"],
});

const hkModular = localFont({
  variable: "--font-hk-modular",
  src: [{ path: "../fonts/modular.woff2" }],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kompetencje.ai"),
  title: {
    default: "Kompetencje.ai — zdobądź z nami kompetencje AI",
    template: "%s | Kompetencje.ai",
  },
  description:
    "Kursy AI, które dają realne kompetencje przyszłości. Zdobądź kompetencje AI z kompetencje.ai — bez zbędnej teorii, świadomie, efektywnie i na własnych zasadach.",
  keywords: [
    "kompetencje.ai",
    "kompetencje AI",
    "kursy AI",
    "szkolenia AI",
    "sztuczna inteligencja kurs",
  ],
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://kompetencje.ai",
    siteName: "Kompetencje.ai",
    title: "Kompetencje.ai — zdobądź z nami kompetencje AI",
    description:
      "Kursy AI, które dają realne kompetencje przyszłości. Wykorzystaj dziś swoją szansę i wyrusz z nami ku przyszłości.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${montserrat.variable} ${manrope.variable} ${hkModular.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-page">{children}</body>
    </html>
  );
}
