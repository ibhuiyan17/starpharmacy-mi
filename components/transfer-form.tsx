"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { site } from "@/lib/site";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

type State = "idle" | "sending" | "sent" | "error";

export default function TransferForm() {
  const [state, setState] = useState<State>("idle");
  const [consent, setConsent] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    data.consent = consent ? "yes" : "no";
    setState("sending");

    try {
      const res = await fetch("/api/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setState("sent");
        form.reset();
        setConsent(false);
        return;
      }
      if (res.status === 501) {
        openMailto(data);
        setState("sent");
        form.reset();
        setConsent(false);
        return;
      }
      setState("error");
    } catch {
      openMailto(data);
      setState("error");
    }
  }

  function openMailto(d: Record<string, string>) {
    const subject = encodeURIComponent(`New transfer request: ${d.fullname || ""}`);
    const body = encodeURIComponent(
      `New prescription transfer request from the website:\n\n` +
        `Name: ${d.fullname}\n` +
        `Phone: ${d.phone}\n` +
        `Date of birth: ${d.dob || "(not provided)"}\n` +
        `Leaving pharmacy: ${d.currentpharmacy || "(not provided)"}\n` +
        `Notes: ${d.notes || "(none)"}\n` +
        `Consent to be called: ${d.consent}\n`
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  }

  if (state === "sent") {
    return (
      <div className="surface-card flex flex-col items-center rounded-2xl p-8 text-center">
        <CheckCircle2 className="h-14 w-14 text-green" />
        <h2 className="mt-4 text-2xl font-bold text-text-header">
          You&apos;re all set!
        </h2>
        <p className="mt-2 max-w-md text-text-body">
          We&apos;ve received your request. A member of our team will call you
          shortly to confirm the details and transfer your prescriptions — you
          don&apos;t have to do anything else.
        </p>
        <p className="mt-2 text-sm text-text-muted">
          Need us sooner? Call {site.phone}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="surface-card rounded-2xl p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="fullname">Full name *</Label>
          <Input id="fullname" name="fullname" required className="mt-1.5 h-11 bg-white" placeholder="Jane Doe" />
        </div>
        <div>
          <Label htmlFor="phone">Phone number *</Label>
          <Input id="phone" name="phone" type="tel" required className="mt-1.5 h-11 bg-white" placeholder="(586) 555-0123" />
        </div>
        <div>
          <Label htmlFor="dob">Date of birth</Label>
          <Input id="dob" name="dob" type="date" className="mt-1.5 h-11 bg-white" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="currentpharmacy">What pharmacy are you leaving?</Label>
          <Input id="currentpharmacy" name="currentpharmacy" className="mt-1.5 h-11 bg-white" placeholder="e.g. CVS on 12 Mile Rd" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="notes">Anything else we should know? (optional)</Label>
          <Textarea id="notes" name="notes" rows={3} className="mt-1.5 bg-white" placeholder="Medication names, preferred delivery time, etc." />
        </div>
      </div>

      <label className="mt-5 flex items-start gap-3 rounded-xl bg-brand/5 p-4 text-sm text-text-body">
        <Checkbox
          checked={consent}
          onCheckedChange={(v) => setConsent(v === true)}
          className="mt-0.5"
        />
        <span>
          Please call me to transfer my prescriptions. I understand a pharmacy
          team member will contact me by phone to securely collect my medication
          details.
        </span>
      </label>

      {state === "error" && (
        <p className="mt-3 text-sm text-rose-600">
          Something went wrong — your email app should open as a backup, or just
          call us at {site.phone}.
        </p>
      )}

      <button
        type="submit"
        disabled={state === "sending" || !consent}
        className="btn-brand mt-6 w-full disabled:opacity-60"
      >
        {state === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            Submit Transfer Request <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      <p className="mt-4 flex items-center justify-center gap-2 text-xs text-text-muted">
        <ShieldCheck className="h-4 w-4 text-green" />
        We never store medical records online. We only use this to call you.
      </p>
    </form>
  );
}
