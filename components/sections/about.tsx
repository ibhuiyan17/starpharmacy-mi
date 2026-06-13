import Image from "next/image";
import { HeartPulse, BadgePercent, FlaskConical, PackageOpen } from "lucide-react";
import Reveal from "@/components/reveal";

const OFFERS = [
  {
    icon: HeartPulse,
    title: "MTM Services",
    body: "We're certified to provide distinct medication therapy management for patients with hypertension, high cholesterol, asthma, diabetes, congestive heart failure (CHF), and allergies — ensuring the best therapeutic outcomes.",
  },
  {
    icon: FlaskConical,
    title: "Custom Compounding",
    body: "We compound custom medications right here — mixing and preparing prescriptions to your doctor's exact specifications when a standard, off-the-shelf option isn't the right fit (special doses, forms, or flavors).",
  },
  {
    icon: BadgePercent,
    title: "Deals & Offers",
    body: "Competitive community prices — we'll match and beat any competitor price. New or transferred prescriptions are eligible for special offers, and we provide flu shots, immunizations, and free health screenings.",
  },
  {
    icon: PackageOpen,
    title: "Special Items",
    body: "We carry items not commonly stocked by in-person pharmacies, such as halal vitamins and veterinary medicine, all at low cost.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="border-y border-border bg-white/55 backdrop-blur-sm scroll-mt-24"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="glass-card overflow-hidden rounded-3xl p-2">
              <Image
                src="/images/IMG_1575.jpg"
                alt="Star Pharmacy shelves"
                width={900}
                height={1100}
                className="h-[420px] w-full rounded-2xl object-cover"
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand">
                What we offer
              </p>
              <h2 className="mt-2 text-3xl md:text-4xl">
                More than a pharmacy — a partner in your care
              </h2>
            </Reveal>

            <div className="mt-8 space-y-6">
              {OFFERS.map((o, i) => (
                <Reveal key={o.title} delay={i * 0.08}>
                  <div className="flex gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                      <o.icon className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-text-header">
                        {o.title}
                      </h3>
                      <p className="mt-1.5 text-text-body">{o.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
