import { homePage, siteSettings } from "./home";
import type { HomePage, SiteSettings } from "./types";

export async function getHomePage(): Promise<HomePage> {
  return homePage;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return siteSettings;
}
