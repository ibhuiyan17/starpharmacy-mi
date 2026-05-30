"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { MapPin, CheckCircle2, Phone, ArrowRight, Search } from "lucide-react";
import { site, serviceAreaPages } from "@/lib/site";
import { Input } from "@/components/ui/input";
import Reveal from "@/components/reveal";

type Result = "in" | "out" | null;

// Flat ZIP → city list for the autocomplete suggestions.
const ALL_ZIPS = serviceAreaPages.flatMap((a) =>
  a.zips.map((zip) => ({ zip, city: a.city }))
);

export default function DeliveryChecker() {
  const [zip, setZip] = useState("");
  const [result, setResult] = useState<Result>(null);
  const [focused, setFocused] = useState(false);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const suggestions =
    zip.length >= 1 && !result
      ? ALL_ZIPS.filter((z) => z.zip.startsWith(zip)).slice(0, 6)
      : [];
  const showSuggestions = focused && suggestions.length > 0;

  function evaluate(value: string) {
    const clean = value.trim().slice(0, 5);
    if (clean.length !== 5) return;
    setResult(site.deliveryZips.includes(clean) ? "in" : "out");
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    evaluate(zip);
  }

  function pick(value: string) {
    setZip(value);
    setFocused(false);
    evaluate(value);
  }

  return (
    <section className="border-y border-border bg-white/55 backdrop-blur-sm scroll-mt-24">
      <div className="mx-auto max-w-3xl px-4 py-16 md:py-20 text-center">
        <Reveal>
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
            <MapPin className="h-7 w-7" />
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl">Do we deliver to you?</h2>
          <p className="mt-3 text-text-body">
            Enter your ZIP code to check if you&apos;re in our free same-day
            delivery zone.
          </p>

          <form
            onSubmit={onSubmit}
            className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row"
            autoComplete="off"
          >
            <div className="relative flex-1">
              <Input
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={5}
                autoComplete="postal-code"
                value={zip}
                onFocus={() => {
                  if (blurTimer.current) clearTimeout(blurTimer.current);
                  setFocused(true);
                }}
                onBlur={() => {
                  // delay so a suggestion click registers before closing
                  blurTimer.current = setTimeout(() => setFocused(false), 120);
                }}
                onChange={(e) => {
                  setZip(e.target.value.replace(/\D/g, ""));
                  setResult(null);
                  setFocused(true);
                }}
                placeholder="Enter ZIP code"
                className="h-12 rounded-full bg-white px-5 text-center text-lg sm:text-left"
                aria-label="ZIP code"
                aria-autocomplete="list"
                aria-expanded={showSuggestions}
                role="combobox"
              />

              {showSuggestions && (
                <ul className="absolute left-0 right-0 top-14 z-20 overflow-hidden rounded-2xl border border-border bg-white py-1 text-left shadow-xl">
                  {suggestions.map((s) => (
                    <li key={s.zip}>
                      <button
                        type="button"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          pick(s.zip);
                        }}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-brand/5"
                      >
                        <MapPin className="h-4 w-4 shrink-0 text-brand" />
                        <span className="font-medium text-text-header">{s.zip}</span>
                        <span className="text-sm text-text-muted">{s.city}, MI</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button type="submit" className="btn-brand h-12 shrink-0">
              <Search className="h-4 w-4" /> Check
            </button>
          </form>

          {result === "in" && (
            <div className="mx-auto mt-6 max-w-md rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-left">
              <p className="flex items-center gap-2 font-bold text-emerald-700">
                <CheckCircle2 className="h-5 w-5" /> Great news — you&apos;re in our
                delivery zone!
              </p>
              <p className="mt-1.5 text-sm text-emerald-800/80">
                We offer free same-day delivery to {zip}. Switch in 60 seconds and
                we&apos;ll bring your prescriptions to your door — or pick up in
                store, your choice.
              </p>
              <Link href="/transfer" className="btn-brand mt-4 w-full">
                Transfer Prescriptions in 60 Seconds <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}

          {result === "out" && (
            <div className="mx-auto mt-6 max-w-md rounded-2xl border border-border bg-white p-5 text-left">
              <p className="font-bold text-text-header">
                We may still be able to help!
              </p>
              <p className="mt-1.5 text-sm text-text-body">
                {zip} is just outside our listed delivery area, but our zone is
                growing — and you&apos;re always welcome to walk in. Give us a call
                and we&apos;ll see what we can do.
              </p>
              <a href={`tel:${site.phone}`} className="btn-ghost mt-4 w-full">
                <Phone className="h-4 w-4" /> Call {site.phone}
              </a>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
