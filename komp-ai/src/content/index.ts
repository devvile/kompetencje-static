import { homePage, siteSettings } from "./home";
import { legalPages } from "./legal";
import { manifestPage } from "./manifest";
import { oNasPage } from "./onas";
import type { HomePage, LegalPage, ManifestPage, ONasPage, SiteSettings } from "./types";

// kursy: jeden plik na kurs w ./courses (przyszły schemat CMS-a)
export { getCourse, getCourseSlugs, courseStats } from "./courses";
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

export async function getLegalPage(slug: string): Promise<LegalPage | null> {
  return legalPages[slug] ?? null;
}
