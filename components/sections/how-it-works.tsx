import { ClipboardSignature, RefreshCw, Home } from "lucide-react";
import Reveal from "@/components/reveal";

const STEPS = [
  {
    icon: ClipboardSignature,
    title: "Sign up online",
    body: "Click our secure transfer link and type your name and your old pharmacy's phone number. No complex app downloads required.",
  },
  {
    icon: RefreshCw,
    title: "We sync your pills",
    body: "Our pharmacists call your old store to get your records. We align all your monthly prescriptions to refill on one single day every month.",
  },
  {
    icon: Home,
    title: "Free delivery — or pick up",
    body: "Our local driver drops your secure package right to your porch, free. Prefer the counter? Walk in and pick up whenever it suits you.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-4 py-16 md:py-24 scroll-mt-24">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">
          Simple as 1-2-3
        </p>
        <h2 className="mt-2 text-3xl md:text-4xl">How it works</h2>
        <p className="mt-4 text-text-body">
          Switching pharmacies has never been this easy.
        </p>
      </Reveal>

      <div className="relative mt-12 grid gap-6 md:grid-cols-3">
        {/* connecting line on desktop */}
        <div className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent md:block" />
        {STEPS.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.1}>
            <div className="surface-card relative h-full rounded-2xl p-7 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-teal text-white shadow-lg shadow-brand/30">
                <s.icon className="h-8 w-8" />
              </div>
              <span className="mt-4 inline-block rounded-full bg-brand/10 px-3 py-0.5 text-xs font-bold uppercase tracking-wide text-brand">
                Step {i + 1}
              </span>
              <h3 className="mt-3 text-xl font-bold text-text-header">{s.title}</h3>
              <p className="mt-2 text-text-body">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
