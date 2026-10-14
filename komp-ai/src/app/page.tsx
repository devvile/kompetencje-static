import HeroSection from "../components/home/HeroSection";
import ManifestSection, { ManifestBar } from "../components/home/ManifestSection";
import WebinarPromo from "../components/webinar/WebinarPromo";
import DnaSection from "../components/home/DnaSection";
import KursySection from "../components/home/KursySection";
import HumanMachineSection from "../components/home/HumanMachineSection";
import ProwadzacySection from "../components/home/ProwadzacySection";
import KontaktSection from "../components/home/KontaktSection";
import StopkaSection from "../components/home/StopkaSection";
import { getHomePage, getSiteSettings, getWebinarPage } from "../content";

/** Sekcja 3 kart kursów (KursySection) — ukryta na życzenie Patryka (2026-10-15).
 *  Komponent i dane (homePage.kursTiles) zostają; włączenie = true. */
const SHOW_KURSY_TILES = false;

export default async function Home() {
  const [page, settings] = await Promise.all([
    getHomePage(),
    getSiteSettings(),
  ]);
  // webinary promowane na home (kolejność = kolejność kart)
  const webinars = (await Promise.all(page.webinarSlugs.map((s) => getWebinarPage(s)))).filter((w) => w !== null);

  return (
    <main className="w-full">
      <HeroSection hero={page.hero} nav={settings.nav} />
      <ManifestSection m={page.manifest} />
      <WebinarPromo webinars={webinars} />
      <ManifestBar m={page.manifest} />
      <DnaSection cards={page.dnaCards} m={page.manifest} />
      {SHOW_KURSY_TILES && <KursySection cards={page.kursTiles} />}
      <HumanMachineSection hm={page.humanMachine} />
      <ProwadzacySection p={page.prowadzacy} />
      <KontaktSection k={page.kontakt} />
      <StopkaSection f={settings.footer} />
    </main>
  );
}
