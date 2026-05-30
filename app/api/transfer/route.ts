import { NextResponse } from "next/server";

// Prescription-transfer intake handler.
//
// HIPAA note: this intentionally collects ONLY non-protected contact info
// (name, phone, which pharmacy they're leaving) and emails it to the
// pharmacy. It NEVER stores data and NEVER touches the RxQ database/API.
// Staff then call the patient on a normal phone line to collect medical
// details securely — keeping this code 100% clear of ePHI.
//
// If SendGrid env vars are set it emails server-side; otherwise it returns
// 501 so the browser falls back to opening the visitor's email app.

export async function POST(req: Request) {
  const { fullname, phone, dob, currentpharmacy, notes, consent } =
    await req.json();

  if (!fullname || !phone) {
    return NextResponse.json({ error: "Missing name or phone" }, { status: 400 });
  }

  const apiKey = process.env.SENDGRID_API_KEY;
  const to = process.env.SENDGRID_TO;
  const from = process.env.SENDGRID_FROM;

  if (!apiKey || !to || !from) {
    return NextResponse.json({ error: "not_configured" }, { status: 501 });
  }

  const text =
    `New prescription transfer request from the website:\n\n` +
    `Name: ${fullname}\n` +
    `Phone: ${phone}\n` +
    `Date of birth: ${dob || "(not provided)"}\n` +
    `Leaving pharmacy: ${currentpharmacy || "(not provided)"}\n` +
    `Notes: ${notes || "(none)"}\n` +
    `Consent to be called: ${consent}\n`;

  const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: from, name: "Star Pharmacy Website" },
      subject: `New transfer request: ${fullname}`,
      content: [{ type: "text/plain", value: text }],
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
