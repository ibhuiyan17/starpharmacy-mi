import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { site, serviceCities } from "@/lib/site";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { cn } from "@/lib/utils";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Pharmacy in Warren, MI`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Star Pharmacy",
    "pharmacy near me",
    "free prescription delivery",
    "free prescription delivery near me",
    "pharmacy that delivers",
    "transfer prescription from CVS",
    "transfer prescription from Walgreens",
    "automatic prescription refills",
    "medication therapy management",
    "MTM pharmacy",
    "halal vitamins",
    "local pharmacy Macomb County",
    "local pharmacy Oakland County",
    // Per-city long-tail terms for local SEO
    ...serviceCities.map((c) => `pharmacy in ${c} MI`),
    ...serviceCities.map((c) => `prescription delivery ${c} MI`),
  ],
  openGraph: {
    title: `${site.name} | Pharmacy in Warren, MI`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
    locale: "en_US",
  },
  icons: { icon: "/images/logo.jpg" },
};

// LocalBusiness / Pharmacy structured data — helps Google show the
// business in local "pharmacy near me" results, maps, and rich snippets.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Pharmacy",
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: site.phone,
  faxNumber: site.fax,
  email: site.email,
  image: `${site.url}/images/logo.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.line1,
    addressLocality: "Warren",
    addressRegion: "MI",
    postalCode: "48091",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.address.lat,
    longitude: site.address.lng,
  },
  areaServed: serviceCities.map((c) => ({
    "@type": "City",
    name: `${c}, MI`,
  })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Pharmacy Services",
    itemListElement: [
      "Free same-day prescription delivery",
      "Prescription transfers",
      "Automatic monthly refills (Med-Sync)",
      "Medication therapy management",
      "Pharmacist consultations",
    ].map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s },
    })),
  },
  sameAs: [site.facebook],
  // Only emit a rating snippet once a real review count is configured.
  ...(site.rating.count > 0
    ? {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: site.rating.value,
          reviewCount: site.rating.count,
          bestRating: 5,
        },
      }
    : {}),
  openingHoursSpecification: site.hours
    .filter((h) => h.open !== null)
    .map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${h.day}`,
      opens: `${String(h.open).padStart(2, "0")}:00`,
      closes: `${String(h.close).padStart(2, "0")}:00`,
    })),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn("h-full", inter.variable, "font-sans")}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteHeader />
        <main className="flex-grow">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
