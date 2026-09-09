import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The site is no longer a static export: the admin area writes to Postgres
  // and the public pages read from it, so pages render on the server and are
  // revalidated when content is saved.
  trailingSlash: true,
};

export default nextConfig;
