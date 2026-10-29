/*
 * /webinary/[slug] — strona szczegółów webinaru (WebinarTemplate).
 * Na razie bez linków w serwisie; `published: false` → noindex.
 */
import type { Metadata } from "next";
import { ogFor } from "../../../lib/seo";
import { notFound } from "next/navigation";
import StopkaSection from "../../../components/home/StopkaSection";
import WebinarTemplate from "../../../components/webinar/WebinarTemplate";
import OnasKontakt, { OnasKontaktMobile, type KontaktLayout } from "../../../components/onas/OnasKontakt";
import { getHomePage, getSiteSettings, getWebinarPage, getWebinarSlugs } from "../../../content";

type Params = Promise<{ slug: string }>;

/* kontakt jak na podstronach (Figma 2120:1918): pigułka y81 na białej linii, nagłówek
   3 linie od y274, formularz x384 y471, stopka od y1471 */
const WEBINAR_KONTAKT: KontaktLayout = {
  h: 1471,
  line: { y: 139, hPx: 6 },
  cta: { x: 360, y: 81, w: 722, h: 117, borderPx: 6, fontPx: 35 },
  heading: { top: 290, fontPx: 22.3, trackPx: 0.1, lhPx: 35, scaleX: 1.1 },
  form: { left: 384, top: 471, scale: 1 },
  starL: { src: "/assets/onas-kt-star-l-f.png", x: 25, y: 539, w: 360, h: 386 },
  starR: { src: "/assets/onas-kt-star-r-f.png", x: 1055, y: 871, w: 340, h: 515 },
};

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
  const [w, settings, home] = await Promise.all([getWebinarPage(slug), getSiteSettings(), getHomePage()]);
  if (!w) notFound();

  return (
    <main className="w-full">
      <WebinarTemplate webinar={w} nav={settings.nav} />
      {/* kontakt (v2) — kotwica #kontakt dla przycisków zapisu */}
      <OnasKontakt k={home.kontakt} ctaLabel="POZNAJ NASZE KURSY" lineClass="bg-white" layout={WEBINAR_KONTAKT} />
      <OnasKontaktMobile k={home.kontakt} ctaLabel="POZNAJ NASZE KURSY" />
      <StopkaSection f={settings.footer} />
    </main>
  );
}
