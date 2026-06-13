# Transfer Automation Roadmap

The site is built so that prescription-transfer requests can become **fully
automated later without a code rewrite** — you just set environment variables
as each legal/technical piece falls into place. This keeps everything as
hands-off as the law allows.

## How it works

`lib/intake.ts` defines an **intake pipeline** with independent *channels*.
When a transfer request is submitted, the pipeline sends it through **every
channel that is currently configured**. Adding automation = adding env vars.

| Stage | Channel | Turns on when | Manual work left |
|------|---------|---------------|------------------|
| **Today** | `email` | `SENDGRID_*` set | Staff read the email, call the patient, enter into RxQ |
| **Step 2** | `webhook` | `INTAKE_WEBHOOK_URL` set | Request auto-lands in a Pending Approvals queue; staff click "Verify" |
| **Step 3** | `rxq-bridge` | `INTAKE_RXQ_ENABLED=true` + endpoint + key | Near-zero — certified bridge populates the profile; staff confirm |

With nothing configured, the form still works — it opens the visitor's email
app (mailto), so a lead is never lost.

## ⚖️ The legal guardrails (important)

This is healthcare, so automation has hard limits. The build enforces them:

1. **The form only collects non-PHI** — name, phone, which pharmacy they're
   leaving, and consent-to-be-called. No medications, no diagnoses, no records.
2. **Never write directly to the live RxQ terminal/database from web code.**
   A single validation bug or leak would expose the entire patient database —
   a serious HIPAA breach. The `rxq-bridge` channel is therefore a thin relay
   to a **certified integration endpoint**, not RxQ itself, and is **off by
   default**.
3. **The supported automation path is the `webhook` channel** → a
   **BAA-covered, HIPAA-certified** automation/integration platform (e.g. a
   Liberty Software integration partner or a certified healthcare workflow
   tool) that drops requests into a **Pending Approvals queue**. A human still
   clicks "Verify" before anything touches a patient record — which is exactly
   the legal division of labor.
4. **Secrets stay server-side.** `RXQ_API_KEY` and webhook secrets are read
   only in API routes (`lib/intake.ts`), never shipped to the browser.

## To enable automation later

1. **Get a BAA** with whatever platform will receive the data, and confirm the
   workflow lands in a Pending Approvals queue (no auto-write to records).
2. Set `INTAKE_WEBHOOK_URL` (and `INTAKE_WEBHOOK_SECRET` to sign payloads).
   Deploy. Transfers now auto-flow into the queue — no code change.
3. (Optional, later) If Liberty provides a certified bridge that accepts the
   RxQ API key, set `INTAKE_RXQ_ENABLED=true`, `INTAKE_RXQ_ENDPOINT`, and
   `RXQ_API_KEY`. Generate the key on the store computer:
   `System > Settings > Utilities > API Keys > Add New Key`.

No part of the website code needs to change for any of these steps — only the
environment configuration on the host (e.g. Vercel project settings).
