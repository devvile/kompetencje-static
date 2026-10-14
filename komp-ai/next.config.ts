import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // badge dev-tools zaburza walidację pixel-perfect (screenshoty)
  devIndicators: false,
  turbopack: {
    // w katalogu domowym leży przypadkowy package-lock.json — bez tego Next zgaduje zły root
    root: path.join(__dirname),
  },
  async redirects() {
    return [
      // stary slug kursu (karta „PRACUJ MĄDRZEJ Z AI") → nowy kurs; 301 jawnie
      // (permanent: true dałoby 308)
      {
        source: "/kursy/automatyzacja-pracy-z-ai",
        destination: "/kursy/z-rozmowy-do-oferty",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
