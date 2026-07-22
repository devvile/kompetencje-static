import { homePage, siteSettings } from "./home";
import { kursy } from "./kurs";
import { legalPages } from "./legal";
import { oNasPage } from "./onas";
import type { HomePage, KursPage, LegalPage, ONasPage, SiteSettings } from "./types";

export async function getHomePage(): Promise<HomePage> {
  return homePage;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return siteSettings;
}

export async function getONasPage(): Promise<ONasPage> {
  return oNasPage;
}

export async function getKursPage(slug: string): Promise<KursPage | null> {
  return kursy[slug] ?? null;
}

export async function getKursSlugs(): Promise<string[]> {
  return Object.keys(kursy);
}

export async function getLegalPage(slug: string): Promise<LegalPage | null> {
  return legalPages[slug] ?? null;
}
