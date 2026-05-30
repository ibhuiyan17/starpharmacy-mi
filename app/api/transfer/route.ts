import { NextResponse } from "next/server";
import { dispatchTransfer } from "@/lib/intake";

// Prescription-transfer intake endpoint.
//
// Delegates to the pluggable intake pipeline in lib/intake.ts. Today that's
// email; webhook / RxQ-bridge automation channels switch on via env vars
// with NO code change here. See lib/intake.ts for the HIPAA guardrails and
// docs/AUTOMATION.md for the roadmap to full automation.

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { fullname, phone, dob, currentpharmacy, notes, consent } =
    await req.json();

  if (!fullname || !phone) {
    return NextResponse.json({ error: "Missing name or phone" }, { status: 400 });
  }

  const { anyConfigured, delivered, results } = await dispatchTransfer({
    fullname,
    phone,
    dob,
    currentpharmacy,
    notes,
    consent,
  });

  // No channel configured yet → let the browser fall back to mailto.
  if (!anyConfigured) {
    return NextResponse.json({ error: "not_configured" }, { status: 501 });
  }
  if (!delivered) {
    return NextResponse.json({ error: "send_failed", results }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
