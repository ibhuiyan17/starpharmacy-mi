import { Users, Truck, Star, ClipboardCheck } from "lucide-react";

const STATS = [
  { icon: Star, value: "12+ years", label: "Pharmacist experience" },
  { icon: Truck, value: "Free", label: "Daily prescription delivery" },
  { icon: ClipboardCheck, value: "10–15 min", label: "Typical prescription wait" },
  { icon: Users, value: "MTM", label: "Certified therapy management" },
];

export default function TrustStrip() {
  return (
    <section className="border-y border-border bg-white/60 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <s.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-bold text-text-header leading-tight">
                  {s.value}
                </p>
                <p className="text-xs text-text-muted leading-tight">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
