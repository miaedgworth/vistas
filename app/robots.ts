import type { MetadataRoute } from "next";

import { site } from "@/data/site";

// Route handlers must be static for `output: export`.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
