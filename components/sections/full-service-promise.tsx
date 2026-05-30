import Link from "next/link";
import {
  ArrowRightLeft,
  PhoneCall,
  RefreshCw,
  Truck,
  Store,
  ArrowRight,
} from "lucide-react";
import { site } from "@/lib/site";
import Reveal from "@/components/reveal";

const STEPS = [
  { icon: ArrowRightLeft, label: "We transfer your prescriptions" },
  { icon: PhoneCall, label: "We call your old pharmacy" },
  { icon: RefreshCw, label: "We set up your refills (Med-Sync)" },
  { icon: Truck, label: "We deliver free — or you pick up" },
];

export default function FullServicePromise() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand to-teal">
      <div className="mx-auto max-w-5xl px-4 py-16 md:py-20 text-center">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wider text-white/80">
            We handle everything
          </p>
          <h2 className="mx-auto mt-3 max-w-3xl text-2xl font-bold leading-snug text-white md:text-4xl">
            “We&apos;ll transfer all your prescriptions, call your old pharmacy,
            set up your refills, and deliver to your door — for free.”
          </h2>

          <ul className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4">
            {STEPS.map((s) => (
              <li key={s.label} className="flex flex-col items-center gap-3">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-sm">
                  <s.icon className="h-7 w-7" />
                </span>
                <span className="text-sm font-medium text-white/90">{s.label}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col items-center gap-3">
            <Link
              href="/transfer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-brand-dark shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Switch in 60 Seconds <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="inline-flex items-center gap-2 text-sm text-white/85">
              <Store className="h-4 w-4" />
              Not into delivery? You&apos;re always welcome to walk in — call{" "}
              <a href={`tel:${site.phone}`} className="font-semibold underline">
                {site.phone}
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
