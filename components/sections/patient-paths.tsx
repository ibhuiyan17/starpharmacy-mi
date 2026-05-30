import Link from "next/link";
import { ArrowRight, LogIn, Repeat, UserPlus, Phone } from "lucide-react";
import { site } from "@/lib/site";
import Reveal from "@/components/reveal";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function PatientPaths() {
  return (
    <section id="get-started" className="mx-auto max-w-6xl px-4 py-16 md:py-24 scroll-mt-24">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">
          Get started
        </p>
        <h2 className="mt-2 text-3xl md:text-4xl">Two easy ways in</h2>
        <p className="mt-4 text-text-body">
          Already a patient, or switching from another pharmacy? Pick your path.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {/* New patients / switchers */}
        <Reveal>
          <Card className="surface-card relative h-full overflow-hidden rounded-3xl border-0">
            <span className="absolute right-5 top-5 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
              Most popular
            </span>
            <CardHeader>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-teal text-white shadow-lg shadow-brand/30">
                <UserPlus className="h-7 w-7" />
              </span>
              <CardTitle className="mt-4 text-2xl">New here? Switch to us</CardTitle>
              <CardDescription className="text-base text-text-body">
                Leaving CVS, Walgreens, or another pharmacy? We do the work. Just
                tell us your name and who you&apos;re leaving — we call your old
                store, transfer everything, and text you when it&apos;s ready.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-text-body">
                <li>• Takes about 60 seconds</li>
                <li>• No app to download</li>
                <li>• We handle the old pharmacy for you</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/transfer" className="btn-brand w-full">
                Switch in 60 Seconds <ArrowRight className="h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>
        </Reveal>

        {/* Existing patients */}
        <Reveal delay={0.1}>
          <Card className="surface-card h-full overflow-hidden rounded-3xl border-0">
            <CardHeader>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                <Repeat className="h-7 w-7" />
              </span>
              <CardTitle className="mt-4 text-2xl">
                Already a patient? Refill online
              </CardTitle>
              <CardDescription className="text-base text-text-body">
                Manage refills, track deliveries, and handle your family&apos;s
                prescriptions through our secure online portal — or just call us,
                whatever&apos;s easiest for you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-text-body">
                <li>• Secure refills &amp; order tracking</li>
                <li>• Manage the whole family in one place</li>
                <li>• Or call — we keep your info on file</li>
              </ul>
            </CardContent>
            <CardFooter className="flex-col gap-3 sm:flex-row">
              <a
                href={site.rx365PortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost w-full sm:flex-1"
              >
                <LogIn className="h-4 w-4" /> Refill &amp; Manage Online
              </a>
              <a href={`tel:${site.phone}`} className="btn-ghost w-full sm:w-auto">
                <Phone className="h-4 w-4" /> Call
              </a>
            </CardFooter>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
