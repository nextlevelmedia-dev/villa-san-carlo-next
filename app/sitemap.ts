import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { indexableRoutes } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return indexableRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
