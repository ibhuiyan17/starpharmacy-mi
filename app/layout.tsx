import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <main className="flex-grow">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
