import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Phone,
  Truck,
  RefreshCw,
  Users,
  MapPin,
} from "lucide-react";
import { site, serviceAreaPages } from "@/lib/site";
import HowItWorks from "@/components/sections/how-it-works";
import Reveal from "@/components/reveal";

type Params = { city: string };

export function generateStaticParams() {
  return serviceAreaPages.map((p) => ({ city: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { city } = await params;
  const area = serviceAreaPages.find((p) => p.slug === city);
  if (!area) return {};
  const title = `Free Prescription Delivery in ${area.city}, MI`;
  return {
    title,
    description: `Star Pharmacy delivers prescriptions free to ${area.city}, MI (${area.zips.join(", ")}). Switch from CVS or Walgreens in 60 seconds — same-day delivery, automatic refills, family accounts.`,
    alternates: { canonical: `/delivery/${area.slug}` },
    openGraph: {
      title: `${title} | ${site.name}`,
      description: `Free same-day prescription delivery to ${area.city}, MI from Star Pharmacy.`,
      url: `${site.url}/delivery/${area.slug}`,
      type: "website",
    },
  };
}

const PROMISES = [
  { icon: Truck, label: "Free same-day delivery" },
  { icon: RefreshCw, label: "Automated monthly refills" },
  { icon: Users, label: "Manage family prescriptions" },
];

export default async function CityPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { city } = await params;
  const area = serviceAreaPages.find((p) => p.slug === city);
  if (!area) notFound();

  const nearby = serviceAreaPages
    .filter((p) => p.county === area.county && p.slug !== area.slug)
    .slice(0, 8);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Pharmacy",
    name: `${site.name} — Delivery to ${area.city}, MI`,
    url: `${site.url}/delivery/${area.slug}`,
    telephone: site.phone,
    image: `${site.url}/images/logo.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line1,
      addressLocality: "Warren",
      addressRegion: "MI",
      postalCode: "48091",
      addressCountry: "US",
    },
    areaServed: {
      "@type": "City",
      name: `${area.city}, MI`,
      ...(area.zips.length
        ? { containsPlace: area.zips.map((z) => ({ "@type": "PostalCodeArea", postalCode: z })) }
        : {}),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 pt-10 pb-12 md:pt-14">
        <Link
          href="/#areas"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-text-muted hover:text-brand"
        >
          <ArrowLeft className="h-4 w-4" /> All delivery areas
        </Link>

        <Reveal className="mt-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-3.5 py-1.5 text-sm font-medium text-brand-dark">
            <MapPin className="h-4 w-4 text-brand" /> {area.county} County, MI
          </p>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold leading-[1.07]">
            Free prescription delivery in{" "}
            <span className="text-gradient">{area.city}, MI</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-text-body">
            Skip the lines at CVS and Walgreens. Star Pharmacy transfers all your
            prescriptions, calls your current pharmacy, sets up your refills, and
            brings everything right to your door in {area.city} —{" "}
            <strong className="text-text-header">100% free</strong>, same-day, by
            our own trusted local drivers. Prefer the counter? You&apos;re always
            welcome to walk in and pick up instead.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/transfer" className="btn-brand">
              Switch in 60 Seconds <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={`tel:${site.phone}`} className="btn-ghost">
              <Phone className="h-4 w-4" /> {site.phone}
            </a>
          </div>

          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
            {PROMISES.map((p) => (
              <li
                key={p.label}
                className="inline-flex items-center gap-2 text-sm font-medium text-text-body"
              >
                <p.icon className="h-4 w-4 text-brand" />
                {p.label}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* ZIPs served */}
        <Reveal className="mt-10">
          <div className="surface-card rounded-2xl p-6">
            <h2 className="text-lg font-bold text-text-header">
              ZIP codes we deliver to in {area.city}
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {area.zips.map((z) => (
                <span
                  key={z}
                  className="rounded-full bg-brand/10 px-3 py-1 text-sm font-medium text-brand"
                >
                  {z}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <HowItWorks />

      {/* Nearby communities (internal links) */}
      {nearby.length > 0 && (
        <section className="border-t border-border bg-white/55 backdrop-blur-sm">
          <div className="mx-auto max-w-5xl px-4 py-14">
            <Reveal>
              <h2 className="text-2xl font-bold text-text-header">
                We also deliver near {area.city}
              </h2>
              <p className="mt-2 text-text-body">
                Free same-day delivery across {area.county} County and beyond.
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {nearby.map((n) => (
                  <Link
                    key={n.slug}
                    href={`/delivery/${n.slug}`}
                    className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-text-body transition hover:border-brand hover:text-brand"
                  >
                    {n.city}
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="surface-card flex flex-col items-center gap-4 rounded-3xl p-8 text-center md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-text-header">
            Ready for free delivery in {area.city}?
          </h2>
          <p className="max-w-xl text-text-body">
            Switching takes about 60 seconds. Tell us your name and current
            pharmacy — we handle the rest.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/transfer" className="btn-brand">
              Switch in 60 Seconds <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={`tel:${site.phone}`} className="btn-ghost">
              <Phone className="h-4 w-4" /> Call {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
