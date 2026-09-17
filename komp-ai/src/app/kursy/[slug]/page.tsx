import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KursHero from "../../../components/kurs/KursHero";
import KursZyskasz from "../../../components/kurs/KursZyskasz";
import KursProgramModules, { KursProgramIntro } from "../../../components/kurs/KursProgram";
import StopkaSection from "../../../components/home/StopkaSection";
import { getCourse, getCourseSlugs, getSiteSettings } from "../../../content";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const slugs = await getCourseSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourse(slug);
  if (!course) return {};
  return {
    // metaTitle z danych zawiera już „| Kompetencje.ai" — bez szablonu layoutu
    title: { absolute: course.metaTitle },
    description: course.metaDescription,
    alternates: { canonical: `/kursy/${slug}` },
    openGraph: {
      title: course.metaTitle,
      description: course.metaDescription,
    },
  };
}

export default async function KursPage({ params }: { params: Params }) {
  const { slug } = await params;
  const [course, settings] = await Promise.all([getCourse(slug), getSiteSettings()]);
  if (!course) notFound();

  return (
    <main className="w-full">
      <KursHero course={course} nav={settings.nav} />
      <KursZyskasz course={course} />
      <KursProgramIntro course={course} />
      <KursProgramModules course={course} />
      <StopkaSection f={settings.footer} />
    </main>
  );
}
