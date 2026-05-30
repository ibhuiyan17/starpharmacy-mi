import { MapPin, Phone, Printer, Mail, Navigation } from "lucide-react";
import { FacebookIcon } from "@/components/icons";
import { site } from "@/lib/site";
import Reveal from "@/components/reveal";
import ContactForm from "@/components/contact-form";
import HoursTable from "@/components/hours-table";

const DETAILS = [
  {
    icon: MapPin,
    label: "Address",
    value: `${site.address.line1}, ${site.address.line2}`,
    href: site.address.mapsUrl,
  },
  { icon: Phone, label: "Phone", value: site.phone, href: `tel:${site.phone}` },
  { icon: Printer, label: "Fax", value: site.fax },
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="border-t border-border bg-white/55 backdrop-blur-sm scroll-mt-24"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">
            Get in touch
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl">We&apos;d love to hear from you</h2>
          <p className="mt-4 text-text-body">
            Please don&apos;t hesitate to ask any questions you have.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.08}>
            <HoursTable />
          </Reveal>

          <Reveal delay={0.16}>
            <div className="surface-card rounded-2xl p-6 sm:p-7">
              <h3 className="text-xl font-bold text-text-header">Visit us</h3>
              <ul className="mt-4 space-y-4">
                {DETAILS.map((d) => (
                  <li key={d.label} className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                      <d.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                        {d.label}
                      </p>
                      {d.href ? (
                        <a
                          href={d.href}
                          target={d.href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="font-medium text-text-header hover:text-brand"
                        >
                          {d.value}
                        </a>
                      ) : (
                        <p className="font-medium text-text-header">{d.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={site.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-brand !px-4 !py-2.5 text-sm"
                >
                  <Navigation className="h-4 w-4" /> Get Directions
                </a>
                <a
                  href={site.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost !px-4 !py-2.5 text-sm"
                >
                  <FacebookIcon className="h-4 w-4" /> Facebook
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Map */}
        <Reveal delay={0.1} className="mt-6">
          <div className="surface-card overflow-hidden rounded-2xl p-2">
            <iframe
              title="Star Pharmacy location"
              src={site.address.embedUrl}
              className="h-[360px] w-full rounded-xl"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
