/*
 * KursV2Template — wielokrotnie używalny szablon strony kursu (design UI/UX
 * 2026-10). Przyjmuje JEDEN dokument KursV2Page (src/content/kurs-v2.ts —
 * docelowo Sanity) i składa: nav+hero → korzyści + pasek CTA → program →
 * prowadzący → zapis z ceną. Wszystko, co zależy od kursu (grafika hero,
 * zdjęcie i opis prowadzącego, cena, moduły/lekcje, korzyści, teksty), idzie
 * z danych; liczby modułów i lekcji oraz numeracja liczą się same.
 * Dodatkowo JSON-LD schema.org/Course (nazwa, opis, cena, prowadzący) — SEO.
 * Desktop/tablet ≥768: K2Hero…K2Enroll; mobile <768: K2Mobile (design 402 +
 * autorskie sekcje bez widoku mobile) z przyklejonym paskiem ceny.
 * Formularz zapisu: K2EnrollModal (modal ≥768 / panel od dołu na mobile).
 * Stopka = wspólny komponent strony (podaje route).
 */
import { SITE_URL } from "@/lib/seo";
import type { KursV2Page, NavLink } from "@/content/types";
import K2Hero from "./K2Hero";
import K2Benefits, { K2CtaBand } from "./K2Benefits";
import K3Benefits from "./K3Benefits";
import K3Program from "./K3Program";
import K3Audience from "./K3Audience";
import K3Faq from "./K3Faq";
import K2Program from "./K2Program";
import K2Instructor from "./K2Instructor";
import K2Enroll from "./K2Enroll";
import K2Mobile from "./K2Mobile";
import K2EnrollModal, { type EnrollSummary } from "./K2EnrollModal";
import { formatPrice, kursCounts } from "./k2";

const SITE = SITE_URL;

function courseJsonLd(k: KursV2Page) {
  const counts = kursCounts(k);
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: k.name,
    description: k.metaDescription,
    url: `${SITE}/kursy/${k.slug}`,
    inLanguage: "pl",
    provider: { "@type": "Organization", name: "Kompetencje.ai", sameAs: SITE },
    instructor: { "@type": "Person", name: k.instructor.name },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      instructor: { "@type": "Person", name: k.instructor.name },
    },
    offers: {
      "@type": "Offer",
      price: k.price.value,
      priceCurrency: k.price.currency,
      availability: "https://schema.org/InStock",
      url: `${SITE}/kursy/${k.slug}`,
      category: "Paid",
    },
    syllabusSections: k.program.modules.map((m) => ({
      "@type": "Syllabus",
      name: m.title,
      description: m.lessons.map((l) => l.title).join(" · "),
    })),
    teaches: k.benefits.items.map((b) => b.title),
    educationalLevel: "Beginner",
    about: `${counts.modulesLabel}, ${counts.lessonsLabel}`,
  };
}

function enrollSummary(k: KursV2Page): EnrollSummary {
  const counts = kursCounts(k);
  return {
    slug: k.slug,
    titleLines: k.hero.titleLines,
    titleAccent: k.hero.titleAccent,
    name: k.name,
    kicker: k.mobile?.kicker ?? k.hero.kicker,
    included: [`${counts.modulesLabel} i ${counts.lessonsLabel} online`, ...k.enroll.included],
    price: formatPrice(k.price),
    priceNote: k.price.note,
    // „PATRYK CZEMIEROWSKI" → „Patryk Czemierowski"
    instructorName: k.instructor.name.toLowerCase().replace(/(^|\s)\S/g, (m) => m.toUpperCase()),
    avatar: k.instructor.avatar ?? k.instructor.photo,
    note: k.enroll.form?.note,
    submitLabel: k.enroll.form?.submitLabel ?? "PRZEJDŹ DO PŁATNOŚCI",
    footnote: k.enroll.form?.footnote,
    start: k.hero.startDate,
  };
}

export default function KursV2Template({
  kurs,
  nav,
}: {
  kurs: KursV2Page;
  nav: NavLink[];
}) {
  return (
    <>
      <script
        type="application/ld+json"
        // JSON.stringify pomija pola undefined; < escapowane, żeby treść nie zamknęła tagu
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseJsonLd(kurs)).replace(/</g, "\\u003c"),
        }}
      />
      <div className="hidden md:block">
        <K2Hero k={kurs} nav={nav} />
        {kurs.benefits.bento ? (
          <>
            <K3Benefits benefits={kurs.benefits} />
            <K2CtaBand ctaBand={kurs.ctaBand} cursor />
          </>
        ) : (
          <K2Benefits benefits={kurs.benefits} ctaBand={kurs.ctaBand} />
        )}
        {kurs.layout === "v3" ? <K3Program program={kurs.program} /> : <K2Program program={kurs.program} />}
        {kurs.audience && <K3Audience a={kurs.audience} />}
        <K2Instructor p={kurs.instructor} />
        <K2Enroll k={kurs} />
        {kurs.faq && <K3Faq faq={kurs.faq} />}
      </div>
      <K2Mobile k={kurs} nav={nav} />
      {/* formularz zapisu: otwierany przyciskami [data-enroll-open] i #zapisz-sie */}
      <K2EnrollModal s={enrollSummary(kurs)} />
    </>
  );
}
