"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Menu, X, MapPin } from "lucide-react";
import { site } from "@/lib/site";
import { useOpenStatus } from "@/lib/hours";

const NAV = [
  { href: "/#how", label: "How It Works" },
  { href: "/#services", label: "Services" },
  { href: "/#team", label: "Our Team" },
  { href: "/faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const status = useOpenStatus();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-md border-b border-border shadow-[0_8px_24px_-16px_rgba(15,60,90,0.4)]"
          : "bg-white/40 backdrop-blur-sm"
      }`}
    >
      {/* Utility bar */}
      <div className="hidden md:block bg-brand-dark/95 text-white/90 text-sm">
        <div className="mx-auto max-w-6xl px-4 py-1.5 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {site.address.line1}, {site.address.line2}
          </span>
          <div className="flex items-center gap-4">
            {status && (
              <span className="inline-flex items-center gap-1.5">
                <span
                  className={`h-2 w-2 rounded-full ${
                    status.isOpen ? "bg-emerald-400" : "bg-rose-400"
                  } ${status.isOpen ? "animate-pulse" : ""}`}
                />
                {status.message}
              </span>
            )}
            <a href={`tel:${site.phone}`} className="hover:text-white">
              {site.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/images/logo.jpg"
              alt="Star Pharmacy logo"
              width={40}
              height={40}
              className="rounded-full ring-1 ring-border"
            />
            <span className="text-lg font-extrabold text-text-header tracking-tight">
              Star <span className="text-gradient">Pharmacy</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="px-3 py-2 text-sm font-medium text-text-body hover:text-brand transition-colors"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/transfer" className="btn-brand !px-4 !py-2 text-sm">
              <span>Switch in 60s</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden p-2 text-text-header"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="lg:hidden border-t border-border bg-white/95 backdrop-blur-md">
          <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-base font-medium text-text-body hover:text-brand"
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/transfer"
              onClick={() => setOpen(false)}
              className="btn-brand mt-3"
            >
              Switch in 60 Seconds
            </Link>
            {status && (
              <span className="mt-3 text-sm text-text-muted">{status.message}</span>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
