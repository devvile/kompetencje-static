/*
 * /kursy/[slug]/dziekujemy?session_id=… — powrót ze Stripe Checkout (success_url).
 * Stan pokazujemy na podstawie sesji pobranej z API Stripe (wiarygodne od razu);
 * status zgłoszenia w BAZIE ustawia niezależnie webhook (/api/stripe/webhook).
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StopkaSection from "../../../../components/home/StopkaSection";
import K2ResultScreen from "../../../../components/kurs-v2/K2ResultScreen";
import { formatPrice } from "../../../../components/kurs-v2/k2";
import { getKursV2Page, getSiteSettings } from "../../../../content";

export const metadata: Metadata = {
  title: "Zapis na kurs — potwierdzenie",
  robots: { index: false, follow: false },
};

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ session_id?: string }>;
};

export default async function DziekujemyPage({ params, searchParams }: Props) {
  const [{ slug }, { session_id }] = await Promise.all([params, searchParams]);
  const [kurs, settings] = await Promise.all([
    getKursV2Page(slug),
    getSiteSettings(),
  ]);
  if (!kurs) notFound();

  const back = `/kursy/${slug}`;
  const retry = `/kursy/${slug}#zapisz-sie`;
  const contact = "/#kontakt";

  let screen: React.ReactNode;
  try {
    if (!session_id || !/^cs_[A-Za-z0-9_]+$/.test(session_id))
      throw new Error("brak sesji");
    const { stripe } = await import("@/lib/stripe");
    const s = await stripe().checkout.sessions.retrieve(session_id);
    if (s.metadata?.kurs_slug !== slug) throw new Error("sesja innego kursu");

    const email = s.customer_details?.email ?? s.customer_email ?? "";
    const paid =
      s.amount_total != null
        ? formatPrice({
            value: s.amount_total / 100,
            currency: (s.currency ?? kurs.price.currency).toUpperCase(),
            note: "",
          })
        : formatPrice(kurs.price);
    const details = [
      { label: "KURS", value: kurs.name },
      ...(email ? [{ label: "E-MAIL", value: email }] : []),
      { label: "KWOTA", value: paid },
    ];

    if (s.payment_status === "paid") {
      screen = (
        <K2ResultScreen
          nav={settings.nav}
          variant="success"
          kicker="PŁATNOŚĆ PRZYJĘTA"
          title="Dziękujemy! Masz miejsce na kursie."
          text={
            <p>
              Potwierdzenie płatności otrzymasz na podany adres e-mail. Przed
              startem kursu dostaniesz od nas wiadomość z dostępem i instrukcją,
              jak się przygotować.
            </p>
          }
          details={details}
          actions={[
            { label: "WRÓĆ DO KURSU", href: back, primary: true },
            { label: "STRONA GŁÓWNA", href: "/" },
          ]}
          note={
            <p>
              Masz pytanie? Napisz do nas przez formularz kontaktowy —
              odpowiadamy w dni robocze.
            </p>
          }
        />
      );
    } else if (s.status === "complete") {
      // płatność odroczona (np. przelew) — potwierdzi ją webhook
      screen = (
        <K2ResultScreen
          nav={settings.nav}
          variant="pending"
          kicker="PŁATNOŚĆ W TOKU"
          title="Czekamy na potwierdzenie płatności"
          text={
            <p>
              Twoje zgłoszenie jest zapisane. Gdy bank potwierdzi płatność,
              wyślemy e-mail z potwierdzeniem zapisu — zwykle trwa to od kilku
              minut do jednego dnia roboczego.
            </p>
          }
          details={details}
          actions={[
            { label: "WRÓĆ DO KURSU", href: back, primary: true },
            { label: "KONTAKT", href: contact },
          ]}
        />
      );
    } else {
      // sesja otwarta lub wygasła — płatność nie doszła do skutku
      screen = (
        <K2ResultScreen
          nav={settings.nav}
          variant="cancel"
          kicker="PŁATNOŚĆ NIEDOKOŃCZONA"
          title="Płatność nie została dokończona"
          text={
            <p>
              Nie pobraliśmy żadnych środków. Możesz spróbować ponownie —
              wypełnienie formularza zajmie minutę.
            </p>
          }
          actions={[
            { label: "SPRÓBUJ PONOWNIE", href: retry, primary: true },
            { label: "WRÓĆ DO KURSU", href: back },
          ]}
        />
      );
    }
  } catch {
    screen = (
      <K2ResultScreen
        nav={settings.nav}
        variant="error"
        kicker="COŚ POSZŁO NIE TAK"
        title="Nie możemy potwierdzić płatności"
        text={
          <p>
            Link jest nieprawidłowy lub wygasł albo chwilowo nie mamy połączenia
            z systemem płatności. Jeśli płatność została pobrana, potwierdzenie
            dotrze na e-mail — nic nie musisz robić.
          </p>
        }
        actions={[
          { label: "WRÓĆ DO KURSU", href: back, primary: true },
          { label: "KONTAKT", href: contact },
        ]}
      />
    );
  }

  return (
    <main className="flex min-h-svh w-full flex-col">
      {screen}
      <StopkaSection f={settings.footer} />
    </main>
  );
}
