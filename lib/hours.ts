"use client";

import { useEffect, useState } from "react";
import { site } from "./site";

export type OpenStatus = {
  isOpen: boolean;
  todayIndex: number;
  todayLabel: string;
  message: string;
};

function compute(now: Date): OpenStatus {
  const todayIndex = now.getDay();
  const today = site.hours[todayIndex];
  const hour = now.getHours() + now.getMinutes() / 60;

  const isOpen =
    today.open !== null &&
    today.close !== null &&
    hour >= today.open &&
    hour < today.close;

  const message = isOpen
    ? `Open now · until ${formatHour(today.close as number)}`
    : today.open === null
      ? "Closed today"
      : hour < (today.open as number)
        ? `Opens at ${formatHour(today.open as number)}`
        : "Closed now";

  return { isOpen, todayIndex, todayLabel: today.day, message };
}

function formatHour(h: number): string {
  const suffix = h >= 12 ? "pm" : "am";
  const display = ((h + 11) % 12) + 1;
  return `${display}${suffix}`;
}

/** Live open/closed status, refreshed every minute. SSR-safe. */
export function useOpenStatus(): OpenStatus | null {
  const [status, setStatus] = useState<OpenStatus | null>(null);

  useEffect(() => {
    const update = () => setStatus(compute(new Date()));
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return status;
}
