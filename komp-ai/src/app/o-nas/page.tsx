import type { Metadata } from "next";
import OnasHero from "../../components/onas/OnasHero";
import StopkaSection from "../../components/home/StopkaSection";
import { getONasPage, getSiteSettings } from "../../content";

export const metadata: Metadata = {
  title: "O nas — kim jesteśmy i jak uczymy kompetencji AI",
  description:
    "Poznaj zespół kompetencje.ai — nowoczesną firmę szkoleniową rozwijającą kompetencje AI wśród pracowników i organizacji w Polsce. Uczymy przez praktykę, na prawdziwych procesach biznesowych.",
  alternates: { canonical: "/o-nas" },
  openGraph: {
    title: "O nas | Kompetencje.ai",
    description:
      "Nowoczesna firma szkoleniowa specjalizująca się w rozwijaniu kompetencji AI. Prowadzimy szkolenia, które naprawdę działają.",
  },
};

export default async function ONasPage() {
  const [page, settings] = await Promise.all([getONasPage(), getSiteSettings()]);

  return (
    <main className="w-full">
      <OnasHero hero={page.hero} nav={settings.nav} />
      {/* kolejne sekcje: Q&A, lime, prowadzący, CTA, kontakt — w budowie */}
      <StopkaSection f={settings.footer} />
    </main>
  );
}
