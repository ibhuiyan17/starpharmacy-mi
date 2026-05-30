import Link from "next/link";
import { MapPin, Truck } from "lucide-react";
import { serviceAreaPages, site, type ServiceAreaPage } from "@/lib/site";
import Reveal from "@/components/reveal";

// Group the service-area pages by county for a tidy, crawlable layout.
const byCounty = serviceAreaPages.reduce<Record<string, ServiceAreaPage[]>>(
  (acc, a) => {
    (acc[a.county] ??= []).push(a);
    return acc;
  },
  {}
);

export default function AreasServed() {
  return (
    <section
      id="areas"
      className="border-y border-border bg-white/55 backdrop-blur-sm scroll-mt-24"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
            <Truck className="h-7 w-7" />
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl">Free delivery across Metro Detroit</h2>
          <p className="mt-4 text-text-body">
            Star Pharmacy offers free same-day prescription delivery to Warren and
            communities across Macomb, Oakland, and Wayne counties. If you&apos;re
            nearby, we&apos;ll bring your medications right to your door.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {Object.entries(byCounty).map(([county, areas], i) => (
            <Reveal key={county} delay={i * 0.08}>
              <div className="surface-card h-full rounded-2xl p-6">
                <h3 className="flex items-center gap-2 text-lg font-bold text-text-header">
                  <MapPin className="h-5 w-5 text-brand" />
                  {county} County
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {areas.map((a) => (
                    <li key={a.slug}>
                      <Link
                        href={`/delivery/${a.slug}`}
                        className="font-medium text-text-header hover:text-brand hover:underline"
                      >
                        {a.city}
                      </Link>
                      <span className="text-sm text-text-muted">
                        {" "}
                        — {a.zips.join(", ")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 text-center">
          <p className="text-sm text-text-muted">
            Don&apos;t see your ZIP code? Our delivery area is growing — call{" "}
            <a href={`tel:${site.phone}`} className="font-semibold text-brand hover:underline">
              {site.phone}
            </a>{" "}
            and we&apos;ll let you know.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
