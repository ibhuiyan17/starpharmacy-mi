import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
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
    "pharmacy Warren MI",
    "free prescription delivery",
    "medication therapy management",
    "prescription transfer",
    "Warren Michigan pharmacy",
    "halal vitamins",
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
  areaServed: site.deliveryZips.map((z) => ({
    "@type": "PostalCodeArea",
    postalCode: z,
  })),
  sameAs: [site.facebook],
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
