// =====================================================================
// Prescription-transfer INTAKE PIPELINE
//
// Goal: be ready for full automation later WITHOUT a rewrite. Each way of
// delivering a transfer request to the pharmacy is a "channel". Today only
// the email channel is configured; webhook and RxQ-bridge channels turn on
// the moment the matching env vars are set — no code change required.
//
// ⚖️  HIPAA / LEGAL GUARDRAILS (read before enabling automation):
//   • This form only ever collects NON-protected contact info (name, phone,
//     which pharmacy they're leaving, consent-to-call). No medical records.
//   • NEVER point a channel directly at the live RxQ terminal/database.
//     Writing straight into the pharmacy system from public web code is a
//     major HIPAA liability (one bug = full patient-data breach).
//   • The supported automation path is the WEBHOOK channel → a
//     BAA-covered, HIPAA-certified integration partner (e.g. a Liberty
//     Software integration partner / certified workflow platform) that
//     drops the request into a "Pending Approvals" queue for staff to
//     verify. The RxQ channel below is intentionally a thin relay to such
//     a certified bridge endpoint — it is OFF unless explicitly enabled.
// =====================================================================

import { createHmac } from "node:crypto";
import { sendEmail, sendgridConfigured } from "./email";

export const runtime = "nodejs";

export type TransferRequest = {
  fullname: string;
  phone: string;
  dob?: string;
  currentpharmacy?: string;
  notes?: string;
  consent?: string;
};

export type ChannelResult = {
  channel: string;
  ok: boolean;
  detail?: string;
};

function asPlainText(req: TransferRequest): string {
  return (
    `New prescription transfer request from the website:\n\n` +
    `Name: ${req.fullname}\n` +
    `Phone: ${req.phone}\n` +
    `Date of birth: ${req.dob || "(not provided)"}\n` +
    `Leaving pharmacy: ${req.currentpharmacy || "(not provided)"}\n` +
    `Notes: ${req.notes || "(none)"}\n` +
    `Consent to be called: ${req.consent || "no"}\n`
  );
}

// ---- Channel: email (active today) ----
const emailChannel = {
  name: "email",
  configured: () => sendgridConfigured(),
  async send(req: TransferRequest): Promise<ChannelResult> {
    const ok = await sendEmail({
      subject: `New transfer request: ${req.fullname}`,
      text: asPlainText(req),
    });
    return { channel: "email", ok };
  },
};

// ---- Channel: webhook (recommended automation path; off until configured) ----
// Set INTAKE_WEBHOOK_URL to a HIPAA-compliant automation endpoint. Optionally
// set INTAKE_WEBHOOK_SECRET to have us sign the payload (X-Signature header,
// HMAC-SHA256) so the receiver can verify authenticity.
const webhookChannel = {
  name: "webhook",
  configured: () => !!process.env.INTAKE_WEBHOOK_URL,
  async send(req: TransferRequest): Promise<ChannelResult> {
    const url = process.env.INTAKE_WEBHOOK_URL!;
    const secret = process.env.INTAKE_WEBHOOK_SECRET;
    const body = JSON.stringify({
      type: "prescription_transfer_request",
      source: "starpharmacy-website",
      submittedAt: new Date().toISOString(),
      data: req,
    });
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (secret) {
      headers["X-Signature"] =
        "sha256=" + createHmac("sha256", secret).update(body).digest("hex");
    }
    try {
      const res = await fetch(url, { method: "POST", headers, body });
      return { channel: "webhook", ok: res.ok, detail: `HTTP ${res.status}` };
    } catch (e) {
      return { channel: "webhook", ok: false, detail: String(e) };
    }
  },
};

// ---- Channel: RxQ bridge (DISABLED by default — requires legal sign-off) ----
// Only enable once a BAA + certified integration is in place. INTAKE_RXQ_ENDPOINT
// must be a certified bridge that lands requests in a Pending Approvals queue —
// NOT the raw RxQ terminal. RXQ_API_KEY is sent as a server-side secret only.
const rxqBridgeChannel = {
  name: "rxq-bridge",
  configured: () =>
    process.env.INTAKE_RXQ_ENABLED === "true" &&
    !!process.env.INTAKE_RXQ_ENDPOINT &&
    !!process.env.RXQ_API_KEY,
  async send(req: TransferRequest): Promise<ChannelResult> {
    const url = process.env.INTAKE_RXQ_ENDPOINT!;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RXQ_API_KEY}`,
        },
        body: JSON.stringify({ queue: "pending_approvals", request: req }),
      });
      return { channel: "rxq-bridge", ok: res.ok, detail: `HTTP ${res.status}` };
    } catch (e) {
      return { channel: "rxq-bridge", ok: false, detail: String(e) };
    }
  },
};

const CHANNELS = [emailChannel, webhookChannel, rxqBridgeChannel];

export type DispatchResult = {
  anyConfigured: boolean;
  delivered: boolean; // reached the pharmacy via at least one channel
  results: ChannelResult[];
};

/**
 * Send a transfer request through every configured channel.
 * - anyConfigured=false → caller should return 501 (client uses mailto).
 * - delivered=true if at least one channel succeeded.
 */
export async function dispatchTransfer(
  req: TransferRequest
): Promise<DispatchResult> {
  const active = CHANNELS.filter((c) => c.configured());
  if (active.length === 0) {
    return { anyConfigured: false, delivered: false, results: [] };
  }

  const results = await Promise.all(active.map((c) => c.send(req)));
  results.filter((r) => !r.ok).forEach((r) =>
    console.error(`[intake] channel "${r.channel}" failed: ${r.detail ?? ""}`)
  );

  return {
    anyConfigured: true,
    delivered: results.some((r) => r.ok),
    results,
  };
}
