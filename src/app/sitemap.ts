import type { MetadataRoute } from "next";
import { getVehicleSlugs } from "@/data/vehicles";
import { getSiteUrl } from "@/lib/config";

/**
 * Sitemap entries are only generated when NEXT_PUBLIC_SITE_URL is configured,
 * so the project never advertises a domain it does not own.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  if (!baseUrl) return [];

  const staticRoutes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/inventory", priority: 0.9, changeFrequency: "weekly" },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
    { path: "/compare", priority: 0.4, changeFrequency: "monthly" },
  ];

  const vehicleRoutes = getVehicleSlugs().map((slug) => ({
    url: `${baseUrl}/inventory/${slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route.path}`,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...vehicleRoutes,
  ];
}
