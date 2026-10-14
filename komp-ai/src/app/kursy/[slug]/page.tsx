import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KursHero from "../../../components/kurs/KursHero";
import KursZyskasz from "../../../components/kurs/KursZyskasz";
import KursProgramModules, { KursProgramIntro } from "../../../components/kurs/KursProgram";
import StopkaSection from "../../../components/home/StopkaSection";
import KursV2Template from "../../../components/kurs-v2/KursV2Template";
import { getKursPage, getKursSlugs, getKursV2Page, getSiteSettings } from "../../../content";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const slugs = await getKursSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const v2 = await getKursV2Page(slug);
  if (v2) {
    return {
      title: v2.metaTitle,
      description: v2.metaDescription,
      alternates: { canonical: `/kursy/${slug}` },
      openGraph: { title: `${v2.metaTitle} | Kompetencje.ai`, description: v2.metaDescription },
    };
  }
  const kurs = await getKursPage(slug);
  if (!kurs) return {};
  const title = `${kurs.hero.titleLines.join(" ")} ${kurs.hero.titleAccent}`;
  return {
    title: `${title} — kurs AI online`,
    description:
      "Kurs online kompetencje.ai: wdrażanie AI w biznesie krok po kroku — automatyzacja procesów, Microsoft 365 Copilot, praktyczne moduły i lekcje.",
    alternates: { canonical: `/kursy/${slug}` },
    openGraph: {
      title: `${title} | Kompetencje.ai`,
      description:
        "Dowiedz się, jak wdrożyć AI do codziennej pracy i realnie wspierać rozwój Twojego biznesu.",
    },
  };
}

export default async function KursPage({ params }: { params: Params }) {
  const { slug } = await params;
  const [v2, kurs, settings] = await Promise.all([getKursV2Page(slug), getKursPage(slug), getSiteSettings()]);

  /* szablon v2 (design UI/UX 2026-10) — KursV2Template z danych kursu
     (desktop/laptop/tablet + mobile) */
  if (v2) {
    return (
      <main className="w-full">
        <KursV2Template kurs={v2} nav={settings.nav} />
        <StopkaSection f={settings.footer} />
      </main>
    );
  }

  if (!kurs) notFound();

  return (
    <main className="w-full">
      <KursHero hero={kurs.hero} nav={settings.nav} />
      <KursZyskasz zyskasz={kurs.zyskasz} />
      <KursProgramIntro program={kurs.program} />
      <KursProgramModules program={kurs.program} />
      <StopkaSection f={settings.footer} />
    </main>
  );
}
