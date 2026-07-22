import type { Metadata } from "next";
import StopkaSection from "../../components/home/StopkaSection";
import LegalArticle from "../../components/legal/LegalArticle";
import { getLegalPage, getSiteSettings } from "../../content";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegalPage("regulamin");
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: "/regulamin" },
    openGraph: { title: page.metaTitle, description: page.metaDescription },
  };
}

export default async function RegulaminPage() {
  const [page, settings] = await Promise.all([getLegalPage("regulamin"), getSiteSettings()]);
  return (
    <main className="w-full">
      <LegalArticle page={page!} nav={settings.nav} />
      <StopkaSection f={settings.footer} />
    </main>
  );
}
