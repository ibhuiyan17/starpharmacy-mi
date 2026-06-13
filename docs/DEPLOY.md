# Star Pharmacy — Review & Go-Live Guide

This is the rebuilt Star Pharmacy site: a modern **Next.js + TypeScript +
Tailwind + shadcn/ui** app (the old static site is preserved in `legacy/`).

## What's in this update

- New, modern design (light "healthcare" theme) with a conversion funnel aimed
  at switching customers from CVS/Walgreens.
- Hero + a "we handle everything" promise; clear that **walk-in is welcome**,
  not delivery-only.
- `/transfer` 60-second switch form (HIPAA-safe: collects only name/phone/
  current pharmacy + consent, emails it, never stores PHI).
- Existing-patient **Refill Online** button → Rx365 portal.
- Free-delivery **ZIP checker** with autocomplete + **"Areas We Serve"**.
- **Per-city landing pages** (`/delivery/<city>`) for local SEO, sitemap,
  robots, Pharmacy structured data, and the real **4.7★ (47) Google reviews**.
- 60-second **explainer-video** slot (shows a placeholder until a video ID is
  added).
- Contact form, live hours/open badge, store map.

## Review it

Open a Pull Request from `ilham-main-branch` → `master` to see the full diff:
<https://github.com/ibhuiyan17/starpharmacy-mi/compare/master...ilham-main-branch>

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build check
```

## Deploy (go live)

This is a server-rendered Next.js app, so the **old Firebase static hosting
will not run it as-is**. Easiest path:

1. Go to <https://vercel.com>, "Add New Project", import this GitHub repo.
2. Set the production branch to `master` (after merging).
3. Add environment variables (Project → Settings → Environment Variables) —
   all optional; the forms fall back to opening the visitor's email app if
   unset. See `.env.example`:
   - `SENDGRID_API_KEY`, `SENDGRID_TO`, `SENDGRID_FROM` — to email contact /
     transfer requests to the pharmacy.
4. Deploy. Point the `starpharmacy-mi.com` domain at Vercel.

Netlify also supports Next.js if preferred.

## Go-live checklist (a few real values to confirm)

- [ ] **Rx365 portal link** — replace the placeholder in `lib/site.ts`
      (`rx365PortalUrl`) with the real link from your Liberty Software / Rx365
      operator. Powers the "Refill Online" buttons.
- [ ] **Delivery ZIPs** — confirm the list in `lib/site.ts` (`serviceAreas`)
      matches the real free-delivery radius (it's a wide net right now).
- [ ] **SendGrid** — add the keys above so form submissions email the pharmacy
      (otherwise they open the sender's email app as a fallback).
- [ ] (Optional) **Explainer video** — add a YouTube/Vimeo ID to
      `site.explainerVideo` in `lib/site.ts`.

Almost everything editable (phone, hours, address, reviews, service area,
FAQs) lives in **`lib/site.ts`**. See also `docs/AUTOMATION.md` for turning on
fully-automated transfer intake later (HIPAA-safe, config-only).
