"use server";

/*
 * Server Action: zapis na bezpłatny webinar.
 *  1. walidacja (lib/zapisWebinar.ts — te same reguły co w przeglądarce),
 *  2. wiersz w `webinar_zapisy` (unikalny e-mail na webinar → „duplicate"),
 *  3. mail z potwierdzeniem (Resend; bez klucza — pominięty, zapis i tak przyjęty).
 * Bez SUPABASE_* → „unavailable" (nic nie zapisuje).
 */
import { getWebinarPage } from "@/content";
import { formatStart } from "@/lib/webinar";
import { SITE_URL } from "@/lib/seo";
import {
  normalizeWebinarZapis,
  validateWebinarZapis,
  type WebinarZapisResult,
} from "@/lib/zapisWebinar";

export async function zapiszNaWebinar(slug: string, fd: FormData): Promise<WebinarZapisResult> {
  const w = await getWebinarPage(slug);
  if (!w) return { status: "error" };

  const v = normalizeWebinarZapis(fd);
  const errors = validateWebinarZapis(v);
  if (Object.keys(errors).length) return { status: "invalid", errors };

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SECRET_KEY) return { status: "unavailable" };

  let id: string;
  try {
    const { supabaseAdmin } = await import("@/lib/supabase");
    const { data, error } = await supabaseAdmin()
      .from("webinar_zapisy")
      .insert({
        webinar_slug: slug,
        webinar_start: w.details.start ?? null,
        imie: v.imie,
        email: v.email,
        zgoda_regulamin_at: new Date().toISOString(),
        zgoda_marketing: v.newsletter,
      })
      .select("id")
      .single();
    if (error?.code === "23505") return { status: "duplicate" }; // unique (webinar_slug, email)
    if (error || !data) return { status: "error" };
    id = data.id as string;
  } catch {
    return { status: "error" };
  }

  // potwierdzenie (nie blokuje zapisu, gdy mail się nie uda)
  const { sendMail, esc } = await import("@/lib/mail");
  const termin = formatStart(w.details.start);
  const pageUrl = `${SITE_URL}/webinary/${slug}`;
  const join = w.details.joinUrl;
  const { sent } = await sendMail({
    to: v.email,
    subject: `Jesteś zapisany(-a): ${w.name}`,
    text: [
      `Cześć ${v.imie}!`,
      ``,
      `Dziękujemy za zapis na bezpłatny webinar „${w.name}”.`,
      `Termin: ${termin}`,
      `Forma: ${w.details.format} (LiveWebinar)`,
      join ? `Link do pokoju: ${join}` : `Link do pokoju wyślemy przed startem webinaru.`,
      ``,
      `Szczegóły: ${pageUrl}`,
      `Regulamin: ${SITE_URL}/regulamin · Polityka prywatności: ${SITE_URL}/polityka-prywatnosci`,
      ``,
      `Zespół kompetencje.ai`,
    ].join("\n"),
    html: `<p>Cześć ${esc(v.imie)}!</p>
<p>Dziękujemy za zapis na bezpłatny webinar <strong>„${esc(w.name)}”</strong>.</p>
<p><strong>Termin:</strong> ${esc(termin)}<br/><strong>Forma:</strong> ${esc(w.details.format)} (LiveWebinar)</p>
<p>${join ? `<a href="${esc(join)}">Wejdź do pokoju webinaru</a>` : "Link do pokoju wyślemy przed startem webinaru."}</p>
<p><a href="${pageUrl}">Szczegóły webinaru</a> · <a href="${SITE_URL}/regulamin">Regulamin</a> · <a href="${SITE_URL}/polityka-prywatnosci">Polityka prywatności</a></p>
<p>Zespół kompetencje.ai</p>`,
  });
  if (sent) {
    try {
      const { supabaseAdmin } = await import("@/lib/supabase");
      await supabaseAdmin().from("webinar_zapisy").update({ mail_potwierdzenie_at: new Date().toISOString() }).eq("id", id);
    } catch {
      /* brak znacznika nie unieważnia zapisu */
    }
  }
  return { status: "ok", mailSent: sent };
}
