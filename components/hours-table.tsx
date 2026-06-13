"use client";

import { Clock } from "lucide-react";
import { site } from "@/lib/site";
import { useOpenStatus } from "@/lib/hours";

export default function HoursTable() {
  const status = useOpenStatus();

  return (
    <div className="surface-card rounded-2xl p-6 sm:p-7">
      <div className="flex items-center justify-between">
        <h3 className="inline-flex items-center gap-2 text-xl font-bold text-text-header">
          <Clock className="h-5 w-5 text-brand" /> Hours
        </h3>
        {status && (
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold ${
              status.isOpen
                ? "bg-emerald-50 text-emerald-700"
                : "bg-rose-50 text-rose-600"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                status.isOpen ? "bg-emerald-500 animate-pulse" : "bg-rose-400"
              }`}
            />
            {status.isOpen ? "Open now" : "Closed"}
          </span>
        )}
      </div>

      <ul className="mt-4 divide-y divide-border">
        {site.hours.map((h, i) => {
          const isToday = status?.todayIndex === i;
          return (
            <li
              key={h.day}
              className={`flex items-center justify-between rounded-lg px-2 py-2.5 ${
                isToday ? "bg-brand/5 font-semibold text-text-header" : "text-text-body"
              }`}
            >
              <span className="flex items-center gap-2">
                {h.day}
                {isToday && (
                  <span className="rounded-full bg-brand/10 px-2 py-0.5 text-xs font-semibold text-brand">
                    Today
                  </span>
                )}
              </span>
              <span className={h.open === null ? "text-text-muted" : ""}>
                {h.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
