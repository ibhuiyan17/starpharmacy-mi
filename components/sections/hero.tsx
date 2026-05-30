"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Truck, RefreshCw, Users, ArrowRight, LogIn } from "lucide-react";
import { site } from "@/lib/site";
import { useOpenStatus } from "@/lib/hours";

const PROMISES = [
  { icon: Truck, label: "Free same-day delivery" },
  { icon: RefreshCw, label: "Automated monthly refills" },
  { icon: Users, label: "Manage family prescriptions" },
];

export default function Hero() {
  const status = useOpenStatus();

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-3.5 py-1.5 text-sm font-medium text-brand-dark"
            >
              {status && (
                <span
                  className={`h-2 w-2 rounded-full ${
                    status.isOpen ? "bg-emerald-500 animate-pulse" : "bg-rose-400"
                  }`}
                />
              )}
              Trusted local pharmacy · Warren, MI
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05]"
            >
              Tired of waiting in line at{" "}
              <span className="text-gradient">CVS and Walgreens?</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-5 max-w-xl text-lg text-text-body"
            >
              Get your prescriptions delivered straight to your doorstep —{" "}
              <strong className="text-text-header">100% free</strong> — by our
              trusted local team. Same-day delivery, automatic monthly refills,
              and easy family account management.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link href="/transfer" className="btn-brand">
                Switch in 60 Seconds <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={site.rx365PortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <LogIn className="h-4 w-4" /> Refill Online
              </a>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="mt-8 flex flex-wrap gap-x-6 gap-y-3"
            >
              {PROMISES.map((p) => (
                <li
                  key={p.label}
                  className="inline-flex items-center gap-2 text-sm font-medium text-text-body"
                >
                  <p.icon className="h-4 w-4 text-brand" />
                  {p.label}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="glass-card overflow-hidden rounded-3xl p-2">
              <Image
                src="/images/IMG_1586.jpg"
                alt="Inside Star Pharmacy"
                width={1200}
                height={900}
                priority
                className="h-[300px] w-full rounded-2xl object-cover sm:h-[420px]"
              />
            </div>
            <div className="glass-card absolute -bottom-5 -left-3 hidden rounded-2xl px-5 py-4 sm:block">
              <p className="text-2xl font-extrabold text-gradient">100% Free</p>
              <p className="text-xs text-text-muted">same-day local delivery</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
