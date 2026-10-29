import type { MetadataRoute } from "next";
import { SITE_URL, isIndexable } from "../lib/seo";

// API i ekrany po płatności (dziekujemy / platnosc-przerwana) — bez wartości dla
// wyszukiwarki, a URL zawiera session_id Stripe'a
const DISALLOW = ["/api/", "/kursy/*/dziekujemy", "/kursy/*/platnosc-przerwana"];

// Crawlery wyszukiwarek AI (ChatGPT, Claude, Perplexity, Gemini, Apple, Copilot) —
// jawnie wpuszczone: dla marki kursów AI cytowanie w odpowiedziach asystentów to
// realny kanał pozyskania. Bot pasujący do własnej grupy IGNORUJE grupę „*",
// więc każda grupa powtarza DISALLOW.
const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
];

export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      { userAgent: AI_BOTS, allow: "/", disallow: DISALLOW },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
