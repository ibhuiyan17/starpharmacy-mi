"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, ArrowRight, Truck, ShieldCheck, Clock } from "lucide-react";
import { site } from "@/lib/site";
import { useOpenStatus } from "@/lib/hours";

const BADGES = [
  { icon: Truck, label: "Free daily delivery" },
  { icon: ShieldCheck, label: "Most insurance accepted" },
  { icon: Clock, label: "Ready in 10–15 min" },
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
              {status ? status.message : "Warren, Michigan"}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05]"
            >
              Your friendly{" "}
              <span className="text-gradient">neighborhood pharmacy</span> in
              Warren, MI
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-5 max-w-xl text-lg text-text-body"
            >
              We go beyond filling prescriptions. Free delivery, easy transfers,
              one-on-one consultations, and personalized care that puts you in
              control of your health.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a href="#contact" className="btn-brand">
                Transfer / Contact Us <ArrowRight className="h-4 w-4" />
              </a>
              <a href={`tel:${site.phone}`} className="btn-ghost">
                <Phone className="h-4 w-4" /> {site.phone}
              </a>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="mt-8 flex flex-wrap gap-x-6 gap-y-3"
            >
              {BADGES.map((b) => (
                <li
                  key={b.label}
                  className="inline-flex items-center gap-2 text-sm font-medium text-text-body"
                >
                  <b.icon className="h-4 w-4 text-brand" />
                  {b.label}
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
            {/* Floating stat card */}
            <div className="glass-card absolute -bottom-5 -left-3 hidden rounded-2xl px-5 py-4 sm:block">
              <p className="text-2xl font-extrabold text-gradient">12+ yrs</p>
              <p className="text-xs text-text-muted">trusted pharmacist care</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
