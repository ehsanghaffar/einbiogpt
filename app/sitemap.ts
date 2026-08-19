import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://bio.eindev.ir",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
