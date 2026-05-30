import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { FacebookIcon } from "@/components/icons";
import { site } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-brand-dark text-white/80">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src="/images/logo.jpg"
                alt="Star Pharmacy logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-lg font-extrabold text-white">
                Star Pharmacy
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-white/70">{site.tagline}</p>
          </div>

          <div className="space-y-2.5 text-sm">
            <p className="font-semibold text-white">Contact</p>
            <a href={site.address.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white">
              <MapPin className="h-4 w-4" /> {site.address.line1}, {site.address.line2}
            </a>
            <a href={`tel:${site.phone}`} className="flex items-center gap-2 hover:text-white">
              <Phone className="h-4 w-4" /> {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-white">
              <Mail className="h-4 w-4" /> {site.email}
            </a>
            <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white">
              <FacebookIcon className="h-4 w-4" /> Follow us on Facebook
            </a>
          </div>

          <div className="text-sm">
            <p className="font-semibold text-white">Quick links</p>
            <ul className="mt-2.5 space-y-2">
              <li><a href="/transfer" className="hover:text-white">Switch / Transfer</a></li>
              <li><a href="/#how" className="hover:text-white">How It Works</a></li>
              <li><a href="/#services" className="hover:text-white">Services</a></li>
              <li><a href="/#areas" className="hover:text-white">Areas We Serve</a></li>
              <li><a href="/faq" className="hover:text-white">FAQ</a></li>
              <li><a href="/#contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/60">
          © {new Date().getFullYear()} Star Pharmacy — All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
