import type { MetadataRoute } from "next";
import { site, serviceAreaPages } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/transfer", priority: 0.9 },
    { path: "/faq", priority: 0.7 },
    // Per-city delivery landing pages
    ...serviceAreaPages.map((p) => ({
      path: `/delivery/${p.slug}`,
      priority: 0.8,
    })),
  ];

  return routes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: r.priority,
  }));
}
