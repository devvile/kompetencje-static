import HeroSection from "../components/home/HeroSection";
import ManifestSection from "../components/home/ManifestSection";
import DnaSection from "../components/home/DnaSection";
import { getHomePage, getSiteSettings } from "../content";

export default async function Home() {
  const [page, settings] = await Promise.all([
    getHomePage(),
    getSiteSettings(),
  ]);

  return (
    <main className="w-full">
      <HeroSection hero={page.hero} nav={settings.nav} />
      <ManifestSection m={page.manifest} />
      <DnaSection cards={page.dnaCards} m={page.manifest} />
    </main>
  );
}
