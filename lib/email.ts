// Shared SendGrid email helper used by the contact and transfer intake.
// Kept tiny and dependency-free (calls the SendGrid REST API directly).

export type EmailMsg = {
  subject: string;
  text: string;
  replyTo?: string;
};

export function sendgridConfigured(): boolean {
  return !!(
    process.env.SENDGRID_API_KEY &&
    process.env.SENDGRID_TO &&
    process.env.SENDGRID_FROM
  );
}

/** Returns true on success, false if not configured or the send failed. */
export async function sendEmail(msg: EmailMsg): Promise<boolean> {
  const apiKey = process.env.SENDGRID_API_KEY;
  const to = process.env.SENDGRID_TO;
  const from = process.env.SENDGRID_FROM;
  if (!apiKey || !to || !from) return false;

  try {
    const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: to }] }],
        from: { email: from, name: "Star Pharmacy Website" },
        ...(msg.replyTo ? { reply_to: { email: msg.replyTo } } : {}),
        subject: msg.subject,
        content: [{ type: "text/plain", value: msg.text }],
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
