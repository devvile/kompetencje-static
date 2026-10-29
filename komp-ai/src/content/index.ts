import { homePage, siteSettings } from "./home";
import { kursyV2 } from "./kurs-v2";
import { legalPages } from "./legal";
import { manifestPage } from "./manifest";
import { oNasPage } from "./onas";
import { webinary } from "./webinary";
import type { HomePage, KursV2Page, LegalPage, ManifestPage, ONasPage, SiteSettings, WebinarPage } from "./types";

// kursy (stary szablon): jeden plik na kurs w ./courses (przyszły schemat CMS-a)
export { getCourse, getCourseSlugs, courseStats, isPlaceholderCourse } from "./courses";
export type { CourseContent } from "./courses";

export async function getManifestPage(): Promise<ManifestPage> {
  return manifestPage;
}

export async function getHomePage(): Promise<HomePage> {
  return homePage;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return siteSettings;
}

export async function getONasPage(): Promise<ONasPage> {
  return oNasPage;
}

/** kurs w szablonie v2 (design UI/UX 2026-10); null → stary szablon (./courses) / 404 */
export async function getKursV2Page(slug: string): Promise<KursV2Page | null> {
  return kursyV2[slug] ?? null;
}

export async function getKursV2Slugs(): Promise<string[]> {
  return Object.keys(kursyV2);
}

export async function getLegalPage(slug: string): Promise<LegalPage | null> {
  return legalPages[slug] ?? null;
}

/** webinar (szablon WebinarTemplate); null → 404 */
export async function getWebinarPage(slug: string): Promise<WebinarPage | null> {
  return webinary[slug] ?? null;
}

export async function getWebinarSlugs(): Promise<string[]> {
  return Object.keys(webinary);
}
