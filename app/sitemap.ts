import type { MetadataRoute } from "next";

import { site } from "@/data/site";

// Route handlers must be static for `output: export`.
export const dynamic = "force-static";

const routes = ["", "/about", "/events", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/events" ? "monthly" : "yearly",
    priority: route === "" ? 1 : 0.8,
  }));
}
