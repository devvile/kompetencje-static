import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KursHero from "../../../components/kurs/KursHero";
import KursZyskasz from "../../../components/kurs/KursZyskasz";
import KursProgramModules, { KursProgramIntro } from "../../../components/kurs/KursProgram";
import StopkaSection from "../../../components/home/StopkaSection";
import KursV2Template from "../../../components/kurs-v2/KursV2Template";
import OnasKontakt, { OnasKontaktMobile, type KontaktLayout } from "../../../components/onas/OnasKontakt";
import { getCourse, getCourseSlugs, getHomePage, getKursV2Page, getKursV2Slugs, getSiteSettings, isPlaceholderCourse } from "../../../content";
import { ogFor } from "../../../lib/seo";

/*
 * /kursy/[slug] — dwa szablony:
 *  1. KursV2Template (design UI/UX 2026-10) — kursy z content/kurs-v2.ts (pierwszeństwo),
 *  2. stary szablon (KursHero…) — kursy z content/courses (CourseContent).
 */

type Params = Promise<{ slug: string }>;

/* kurs v3 (Figma 2152:2004): pasek POZNAJ NASZE KURSY + formularz jak na podstronach;
   sekcja od y8883, pigułka y81 na linii, nagłówek 2 linie, forma x384 y471 */
const KURS_KONTAKT: KontaktLayout = {
  h: 1471,
  line: { y: 136.5, hPx: 6 },
  cta: { x: 360, y: 81, w: 722, h: 117, borderPx: 6, fontPx: 35 },
  heading: { top: 345, fontPx: 22.3, trackPx: 0.1, lhPx: 26, scaleX: 1.1 },
  form: { left: 384, top: 471, scale: 1 },
  starL: { src: "/assets/onas-kt-star-l-f.png", x: 25, y: 539, w: 360, h: 386 },
  starR: { src: "/assets/onas-kt-star-r-f.png", x: 1055, y: 871, w: 340, h: 515 },
};

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
      openGraph: ogFor(`/kursy/${slug}`, `${v2.metaTitle} | Kompetencje.ai`, v2.metaDescription),
    };
  }
  const course = await getCourse(slug);
  if (!course) return {};
  return {
    // metaTitle z danych zawiera już „| Kompetencje.ai" — bez szablonu layoutu
    title: { absolute: course.metaTitle },
    description: course.metaDescription,
    alternates: { canonical: `/kursy/${slug}` },
    openGraph: ogFor(`/kursy/${slug}`, course.metaTitle, course.metaDescription),
    // treść zastępcza (kopia innego kursu) — poza indeksem do czasu własnej treści
    robots: isPlaceholderCourse(slug) ? { index: false, follow: true } : undefined,
  };
}

export default async function KursPage({ params }: { params: Params }) {
  const { slug } = await params;
  const [v2, course, settings, home] = await Promise.all([getKursV2Page(slug), getCourse(slug), getSiteSettings(), getHomePage()]);

  /* szablon v2 (design UI/UX 2026-10) — KursV2Template z danych kursu
     (desktop/laptop/tablet + mobile) */
  if (v2) {
    return (
      <main className="w-full">
        <KursV2Template kurs={v2} nav={settings.nav} />
        {v2.layout === "v3" && (
          <>
            <OnasKontakt k={{ ...home.kontakt, headingLines: ["MASZ PYTANIE O KURS?", "NAPISZ DO NAS"] }} ctaLabel="POZNAJ NASZE KURSY" lineClass="bg-white" layout={KURS_KONTAKT} />
            <OnasKontaktMobile k={{ ...home.kontakt, headingLines: ["MASZ PYTANIE O KURS?", "NAPISZ DO NAS"] }} ctaLabel="POZNAJ NASZE KURSY" />
          </>
        )}
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
