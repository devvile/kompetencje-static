/*
 * /kursy/[slug]/platnosc-przerwana — powrót ze Stripe bez płacenia (cancel_url).
 * Zgłoszenie zostaje „oczekuje"; po wygaśnięciu sesji (1 h) webhook oznaczy je
 * jako „porzucone". Ponowna próba = nowy formularz (#zapisz-sie).
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StopkaSection from "../../../../components/home/StopkaSection";
import K2ResultScreen from "../../../../components/kurs-v2/K2ResultScreen";
import { getKursV2Page, getSiteSettings } from "../../../../content";

export const metadata: Metadata = {
  title: "Płatność przerwana",
  robots: { index: false, follow: false },
};

export default async function PlatnoscPrzerwanaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [kurs, settings] = await Promise.all([
    getKursV2Page(slug),
    getSiteSettings(),
  ]);
  if (!kurs) notFound();

  return (
    <main className="flex min-h-svh w-full flex-col">
      <K2ResultScreen
        nav={settings.nav}
        variant="cancel"
        kicker="PŁATNOŚĆ PRZERWANA"
        title="Płatność nie została dokończona"
        text={
          <p>
            Nie pobraliśmy żadnych środków. Jeśli coś poszło nie tak albo masz
            pytania o kurs „{kurs.name}”, możesz spróbować ponownie albo napisać
            do nas.
          </p>
        }
        actions={[
          {
            label: "SPRÓBUJ PONOWNIE",
            href: `/kursy/${slug}#zapisz-sie`,
            primary: true,
          },
          { label: "WRÓĆ DO KURSU", href: `/kursy/${slug}` },
        ]}
        note={
          <p>
            Wolisz zapłacić przelewem lub na fakturę z odroczonym terminem?
            Napisz do nas przez formularz kontaktowy.
          </p>
        }
      />
      <StopkaSection f={settings.footer} />
    </main>
  );
}
