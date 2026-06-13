import { MessagesSquare, Truck, FileText, Check } from "lucide-react";
import Reveal from "@/components/reveal";

const SERVICES = [
  {
    icon: MessagesSquare,
    title: "Consultation",
    body: "One-on-one or group consultations with our well-trained pharmacist. We'll sit down with you, address any concerns, and thoroughly review your current and previous medications.",
  },
  {
    icon: Truck,
    title: "Free Delivery",
    body: "Fast, free, same-day delivery on a daily basis. Simply request delivery when you order — it's convenient and there's no extra charge.",
  },
  {
    icon: FileText,
    title: "Key Services",
    list: [
      "Flu shots & immunizations",
      "We accept most insurance plans",
      "Easy prescription transfers",
      "Refill reminders for your medication",
      "Prescriptions ready in 10–15 minutes",
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-16 md:py-24 scroll-mt-24">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">
          How we help
        </p>
        <h2 className="mt-2 text-3xl md:text-4xl">
          Quality care that goes beyond the counter
        </h2>
        <p className="mt-4 text-text-body">
          We empower every patient to be in control of their pharmaceutical needs.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {SERVICES.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08}>
            <div className="surface-card h-full rounded-2xl p-7 transition-transform duration-300 hover:-translate-y-1.5">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-teal text-white shadow-lg shadow-brand/30">
                <s.icon className="h-7 w-7" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-text-header">{s.title}</h3>
              {s.body && <p className="mt-3 text-text-body">{s.body}</p>}
              {s.list && (
                <ul className="mt-4 space-y-2.5">
                  {s.list.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-text-body">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-green" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
