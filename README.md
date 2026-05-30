# Star Pharmacy — Website

Marketing site for **Star Pharmacy** in Warren, MI. Rebuilt as a modern
[Next.js](https://nextjs.org) app (App Router, TypeScript, Tailwind CSS v4,
framer-motion) with a clean, trustworthy healthcare design.

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

```bash
npm run build   # production build
npm run start   # serve the production build
```

## Editing content

Almost everything a non-developer needs to change lives in **`lib/site.ts`**:
phone, fax, email, address, Google Maps link, Facebook, and the weekly hours
(the "Open now / Closed" badge updates automatically from these hours).

Section copy lives in the matching files under `components/sections/`
(`hero`, `services`, `about`, `team`, `contact`). Photos live in
`public/images/`.

## Contact form

The contact form (`components/contact-form.tsx`) posts to `/api/contact`.

- If SendGrid env vars are set (see `.env.example`), the email is sent
  server-side to the pharmacy inbox.
- If they are **not** set, the form gracefully falls back to opening the
  visitor's email app pre-filled — so it always works.

## Deploying

This is a server-rendered Next.js app, so the simplest host is **Vercel**
(import the GitHub repo, set the `SENDGRID_*` env vars, deploy). Netlify also
supports Next.js. Note: the previous static Firebase Hosting setup will not
serve this app as-is — see your hosting provider's Next.js guide.

## Notes

- The old static site is preserved in `legacy/` for reference.
- The previous SendGrid Firebase function lives in `functions/` (no longer
  used by the site, kept for reference).
