import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL!;

  return [
    {
      url: baseUrl,
      lastModified: new Date("2026-11-04"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}

