import { NextResponse } from "next/server";
import { sendEmail, sendgridConfigured } from "@/lib/email";

// Contact form handler.
//
// If SendGrid env vars are configured, the message is emailed to the pharmacy.
// Otherwise it returns 501 so the browser falls back to opening the visitor's
// email app (mailto) — the form always works either way. See .env.example.

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { fullname, email, subject, message } = await req.json();

  if (!fullname || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (!sendgridConfigured()) {
    return NextResponse.json({ error: "not_configured" }, { status: 501 });
  }

  const ok = await sendEmail({
    replyTo: email,
    subject: `Customer Inquiry from ${fullname}: ${subject || "General"}`,
    text: `From: ${fullname} <${email}>\nTopic: ${subject}\n\n${message}`,
  });

  if (!ok) {
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
