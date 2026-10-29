/*
 * /webinary/[slug] — strona szczegółów webinaru (WebinarTemplate).
 * Na razie bez linków w serwisie; `published: false` → noindex.
 */
import type { Metadata } from "next";
import { ogFor } from "../../../lib/seo";
import { notFound } from "next/navigation";
import StopkaSection from "../../../components/home/StopkaSection";
import WebinarTemplate from "../../../components/webinar/WebinarTemplate";
import { getSiteSettings, getWebinarPage, getWebinarSlugs } from "../../../content";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const slugs = await getWebinarSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const w = await getWebinarPage(slug);
  if (!w) return {};
  return {
    title: w.metaTitle,
    description: w.metaDescription,
    alternates: { canonical: `/webinary/${slug}` },
    openGraph: ogFor(`/webinary/${slug}`, `${w.metaTitle} | Kompetencje.ai`, w.metaDescription),
    robots: w.published ? undefined : { index: false, follow: false },
  };
}

export default async function WebinarPageRoute({ params }: { params: Params }) {
  const { slug } = await params;
  const [w, settings] = await Promise.all([getWebinarPage(slug), getSiteSettings()]);
  if (!w) notFound();

  return (
    <main className="w-full">
      <WebinarTemplate webinar={w} nav={settings.nav} />
      <StopkaSection f={settings.footer} />
    </main>
  );
}
