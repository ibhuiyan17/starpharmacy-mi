import { NextResponse } from "next/server";

// Contact form handler.
//
// If SendGrid env vars are configured, it sends the email server-side.
// Otherwise it returns 501 so the browser falls back to opening the
// visitor's email app (mailto) — the form always works either way.
//
// To enable server-side sending, set these env vars (e.g. in Vercel):
//   SENDGRID_API_KEY   — your SendGrid API key
//   SENDGRID_TO        — pharmacy inbox (e.g. starpharmacymi@gmail.com)
//   SENDGRID_FROM      — a SendGrid-verified sender address

export async function POST(req: Request) {
  const { fullname, email, subject, message } = await req.json();

  if (!fullname || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const apiKey = process.env.SENDGRID_API_KEY;
  const to = process.env.SENDGRID_TO;
  const from = process.env.SENDGRID_FROM;

  if (!apiKey || !to || !from) {
    // Not configured — tell the client to use the mailto fallback.
    return NextResponse.json({ error: "not_configured" }, { status: 501 });
  }

  const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: from, name: "Star Pharmacy Website" },
      reply_to: { email },
      subject: `Customer Inquiry from ${fullname}: ${subject || "General"}`,
      content: [
        {
          type: "text/plain",
          value: `From: ${fullname} <${email}>\nTopic: ${subject}\n\n${message}`,
        },
      ],
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
