import type { MetadataRoute } from "next";
import { SITE_URL } from "../lib/seo";
import { getCourseSlugs, getKursV2Slugs, getWebinarPage, getWebinarSlugs, isPlaceholderCourse } from "../content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/o-nas`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/manifest`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/regulamin`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/polityka-prywatnosci`, changeFrequency: "yearly", priority: 0.2 },
  ];

  // kursy: bez slugów z treścią zastępczą (noindex do czasu dedykowanej treści)
  const courseSlugs = [...new Set([...(await getKursV2Slugs()), ...(await getCourseSlugs())])].filter(
    (s) => !isPlaceholderCourse(s),
  );
  for (const slug of courseSlugs) {
    pages.push({ url: `${SITE_URL}/kursy/${slug}`, changeFrequency: "weekly", priority: 0.9 });
  }

  // webinary: tylko opublikowane (pozostałe mają noindex)
  for (const slug of await getWebinarSlugs()) {
    const w = await getWebinarPage(slug);
    if (w?.published) pages.push({ url: `${SITE_URL}/webinary/${slug}`, changeFrequency: "weekly", priority: 0.8 });
  }

  return pages;
}
