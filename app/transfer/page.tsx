import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Truck, Clock, ShieldCheck } from "lucide-react";
import { site } from "@/lib/site";
import TransferForm from "@/components/transfer-form";

export const metadata: Metadata = {
  title: "Transfer Your Prescriptions in 60 Seconds",
  description:
    "Switch to Star Pharmacy in Warren, MI. Tell us your name and current pharmacy — we handle the transfer and deliver to your door for free. No app, no waiting in line.",
  alternates: { canonical: "/transfer" },
};

const PERKS = [
  { icon: Clock, text: "Takes about 60 seconds" },
  { icon: Truck, text: "Free same-day home delivery" },
  { icon: ShieldCheck, text: "We call your old pharmacy for you" },
];

export default function TransferPage() {
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
          Switch to us
        </p>
        <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold">
          Transfer in <span className="text-gradient">60 seconds</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-text-body">
          Leaving CVS, Walgreens, or another pharmacy? Just fill this out. Our
          team calls your old store, moves everything over, and delivers your
          medications free — you never wait in line again.
        </p>

        <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
          {PERKS.map((p) => (
            <li
              key={p.text}
              className="inline-flex items-center gap-2 text-sm font-medium text-text-body"
            >
              <p.icon className="h-4 w-4 text-brand" />
              {p.text}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10">
        <TransferForm />
      </div>

      <p className="mt-6 text-center text-sm text-text-muted">
        Already a patient and just need a refill?{" "}
        <a
          href={site.rx365PortalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-brand hover:underline"
        >
          Refill online here
        </a>
        .
      </p>
    </section>
  );
}
