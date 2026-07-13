import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // badge dev-tools zaburza walidację pixel-perfect (screenshoty)
  devIndicators: false,
  turbopack: {
    // w katalogu domowym leży przypadkowy package-lock.json — bez tego Next zgaduje zły root
    root: path.join(__dirname),
  },
};

export default nextConfig;
