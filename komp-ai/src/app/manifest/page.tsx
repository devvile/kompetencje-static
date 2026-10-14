/*
 * MANIFEST v2 — design UI/UX designera (Figma 5ufIXE17KqmkvVrfSVzUFE,
 * frame MANIFEST 458:1640, 2026-10). Desktop ≥1024 = poster 1:1 z designem
 * (ManifestDesktop), <1024 = układ mobile/tablet (ManifestMobile — brak
 * widoku mobile w Figmie). Kontakt = współdzielony z /o-nas (pill CTA na
 * białej linii + formularz), stopka wspólna.
 * Poprzednia wersja (autorski layout + wideo power-on robota) — git b9c8de6.
 */
import type { Metadata } from "next";
import StopkaSection from "../../components/home/StopkaSection";
import OnasKontakt, { OnasKontaktMobile } from "../../components/onas/OnasKontakt";
import ManifestDesktop, { MANIFEST_KONTAKT } from "../../components/manifest/ManifestDesktop";
import ManifestMobile from "../../components/manifest/ManifestMobile";
import { getHomePage, getManifestPage, getSiteSettings } from "../../content";

export async function generateMetadata(): Promise<Metadata> {
  const m = await getManifestPage();
  return {
    title: m.metaTitle,
    description: m.metaDescription,
    alternates: { canonical: "/manifest" },
  };
}

export default async function ManifestPage() {
  const [settings, m, home] = await Promise.all([getSiteSettings(), getManifestPage(), getHomePage()]);

  return (
    <main className="w-full">
      <ManifestDesktop m={m} nav={settings.nav} />
      <ManifestMobile m={m} nav={settings.nav} />
      <OnasKontakt k={home.kontakt} ctaLabel={m.ctaLabel} lineClass="bg-white" layout={MANIFEST_KONTAKT} visibilityClass="hidden lg:block" />
      <OnasKontaktMobile k={home.kontakt} ctaLabel={m.ctaLabel} visibilityClass="lg:hidden" capPx={560} />
      <StopkaSection f={settings.footer} />
    </main>
  );
}
