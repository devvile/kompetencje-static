import "server-only";

/*
 * Wysyłka maili przez Resend (REST API — bez dodatkowej paczki).
 * Bez RESEND_API_KEY / MAIL_FROM nic nie wysyła (zwraca { sent: false }) —
 * zapisy działają dalej, mail dojdzie po skonfigurowaniu (zob. .env.example).
 */
export interface Mail {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

export function mailConfigured() {
  return !!process.env.RESEND_API_KEY && !!process.env.MAIL_FROM;
}

export async function sendMail(m: Mail): Promise<{ sent: boolean }> {
  if (!mailConfigured()) {
    console.warn("[mail] brak RESEND_API_KEY / MAIL_FROM — pominięto:", m.subject);
    return { sent: false };
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.MAIL_FROM,
        to: [m.to],
        subject: m.subject,
        html: m.html,
        text: m.text,
        reply_to: m.replyTo ?? process.env.MAIL_REPLY_TO ?? undefined,
      }),
    });
    if (!res.ok) {
      console.error("[mail] Resend", res.status, await res.text().catch(() => ""));
      return { sent: false };
    }
    return { sent: true };
  } catch (e) {
    console.error("[mail] błąd wysyłki", e);
    return { sent: false };
  }
}

/** ucieczka HTML dla danych z formularza wstawianych do treści maila */
export const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
