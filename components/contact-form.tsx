"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { site } from "@/lib/site";

type State = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [state, setState] = useState<State>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setState("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setState("sent");
        form.reset();
        return;
      }

      // Backend not configured (e.g. no SendGrid key) → guaranteed email fallback
      if (res.status === 501) {
        openMailto(data);
        setState("sent");
        form.reset();
        return;
      }
      setState("error");
    } catch {
      openMailto(data);
      setState("error");
    }
  }

  function openMailto(d: Record<string, string>) {
    const subject = encodeURIComponent(
      `Inquiry from ${d.fullname || "a customer"}: ${d.subject || "General"}`
    );
    const body = encodeURIComponent(
      `Name: ${d.fullname}\nEmail: ${d.email}\nSubject: ${d.subject}\n\n${d.message}`
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  }

  if (state === "sent") {
    return (
      <div className="surface-card flex flex-col items-center rounded-2xl p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-accent" />
        <h3 className="mt-3 text-xl font-bold text-text-header">Thank you!</h3>
        <p className="mt-1.5 text-text-body">
          Your message is on its way. We&apos;ll get back to you shortly.
        </p>
        <button onClick={() => setState("idle")} className="btn-ghost mt-5">
          Send another message
        </button>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-xl border border-border bg-white px-4 py-3 text-text-header outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

  return (
    <form onSubmit={onSubmit} className="surface-card rounded-2xl p-6 sm:p-7">
      <h3 className="text-xl font-bold text-text-header">Send us a message</h3>
      <p className="mt-1 text-sm text-text-muted">
        Questions about a prescription, transfer, or insurance? We&apos;re happy to help.
      </p>

      <div className="mt-5 space-y-4">
        <input name="fullname" required placeholder="Full name" className={inputCls} />
        <input
          name="email"
          type="email"
          required
          placeholder="Email address"
          className={inputCls}
        />
        <select name="subject" required defaultValue="" className={inputCls}>
          <option value="" disabled>
            Choose a topic…
          </option>
          <option value="Prescription">Prescription</option>
          <option value="Prescription transfer">Prescription transfer</option>
          <option value="Consultation">Consultation</option>
          <option value="Insurance">Insurance</option>
          <option value="Other">Other</option>
        </select>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="How can we help?"
          className={`${inputCls} resize-y`}
        />
      </div>

      {state === "error" && (
        <p className="mt-3 text-sm text-rose-600">
          Something went wrong — your email app should open as a backup, or call us at{" "}
          {site.phone}.
        </p>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className="btn-brand mt-5 w-full disabled:opacity-70"
      >
        {state === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> Send Message
          </>
        )}
      </button>
    </form>
  );
}
