import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { indexableRoutes } from "@/lib/routes";
import { apartments, unitHref } from "@/lib/stays";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...indexableRoutes.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...apartments.map((unit) => ({
      url: absoluteUrl(unitHref(unit)),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
