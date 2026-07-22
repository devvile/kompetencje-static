import type { Metadata } from "next";
import OnasHero from "../../components/onas/OnasHero";
import OnasQa, { OnasQaMobile } from "../../components/onas/OnasQa";
import OnasLime, { OnasLimeMobile } from "../../components/onas/OnasLime";
import OnasProwadzacySec, { OnasProwadzacyMobile } from "../../components/onas/OnasProwadzacy";
import OnasKontakt, { OnasKontaktMobile } from "../../components/onas/OnasKontakt";
import StopkaSection from "../../components/home/StopkaSection";
import { getHomePage, getONasPage, getSiteSettings } from "../../content";

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
  const [page, settings, home] = await Promise.all([
    getONasPage(),
    getSiteSettings(),
    getHomePage(),
  ]);

  return (
    <main className="w-full">
      <OnasHero hero={page.hero} nav={settings.nav} />
      <OnasQa items={page.qa} />
      <OnasQaMobile qaM={page.qaM} />
      <OnasLime lime={page.lime} />
      <OnasLimeMobile lime={page.lime} />
      <OnasProwadzacySec p={page.prowadzacy} people={home.prowadzacy.people} />
      <OnasProwadzacyMobile p={page.prowadzacy} people={home.prowadzacy.people} />
      <OnasKontakt k={home.kontakt} ctaLabel="POZNAJ NASZE KURSY" />
      <OnasKontaktMobile k={home.kontakt} ctaLabel="POZNAJ NASZE KURSY" />
      <StopkaSection f={settings.footer} />
    </main>
  );
}
