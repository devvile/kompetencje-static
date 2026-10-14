import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KursHero from "../../../components/kurs/KursHero";
import KursZyskasz from "../../../components/kurs/KursZyskasz";
import KursProgramModules, { KursProgramIntro } from "../../../components/kurs/KursProgram";
import StopkaSection from "../../../components/home/StopkaSection";
import KursV2Template from "../../../components/kurs-v2/KursV2Template";
import { getCourse, getCourseSlugs, getKursV2Page, getKursV2Slugs, getSiteSettings } from "../../../content";

/*
 * /kursy/[slug] — dwa szablony:
 *  1. KursV2Template (design UI/UX 2026-10) — kursy z content/kurs-v2.ts (pierwszeństwo),
 *  2. stary szablon (KursHero…) — kursy z content/courses (CourseContent).
 */

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const slugs = new Set([...(await getCourseSlugs()), ...(await getKursV2Slugs())]);
  return [...slugs].map((slug) => ({ slug }));
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
  const [v2, course, settings] = await Promise.all([getKursV2Page(slug), getCourse(slug), getSiteSettings()]);

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
