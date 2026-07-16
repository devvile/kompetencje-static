import { homePage, siteSettings } from "./home";
import { oNasPage } from "./onas";
import type { HomePage, ONasPage, SiteSettings } from "./types";

export async function getHomePage(): Promise<HomePage> {
  return homePage;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return siteSettings;
}

export async function getONasPage(): Promise<ONasPage> {
  return oNasPage;
}
