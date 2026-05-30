import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Phone } from "lucide-react";
import { site } from "@/lib/site";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers about free prescription delivery, switching from CVS/Walgreens, automatic refills, insurance, and family prescription management at Star Pharmacy in Warren, MI.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 md:py-16">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-text-muted hover:text-brand"
      >
        <ArrowLeft className="h-4 w-4" /> Back home
      </Link>

      <div className="mt-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">
          Questions?
        </p>
        <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold">
          Frequently asked questions
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-text-body">
          Everything you need to know about delivery, transfers, and refills.
        </p>
      </div>

      <div className="surface-card mt-10 rounded-2xl p-2 sm:p-4">
        <Accordion>
          {site.faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`}>
              <AccordionTrigger className="px-3 text-left text-base font-semibold text-text-header sm:text-lg">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="px-3 text-text-body">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mt-10 surface-card flex flex-col items-center gap-4 rounded-2xl p-7 text-center">
        <h2 className="text-2xl font-bold text-text-header">Still have questions?</h2>
        <p className="text-text-body">We&apos;re happy to help — give us a call or switch today.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/transfer" className="btn-brand">
            Switch in 60 Seconds <ArrowRight className="h-4 w-4" />
          </Link>
          <a href={`tel:${site.phone}`} className="btn-ghost">
            <Phone className="h-4 w-4" /> {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
