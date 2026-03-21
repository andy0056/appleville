import type { MetadataRoute } from "next";
import { guides } from "@/lib/guides";
import { towns } from "@/lib/towns";

const baseUrl = "https://appleville.help";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), priority: 1 },
    { url: `${baseUrl}/quiz`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/towns`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/compare`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/guides`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/how-it-works`, lastModified: new Date(), priority: 0.6 },
    { url: `${baseUrl}/about`, lastModified: new Date(), priority: 0.5 },
  ];

  const townPages = towns.map((town) => ({
    url: `${baseUrl}/towns/${town.slug}`,
    lastModified: new Date(),
    priority: 0.7,
  }));

  const guidePages = guides.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: new Date(),
    priority: 0.7,
  }));

  return [...staticPages, ...townPages, ...guidePages];
}
