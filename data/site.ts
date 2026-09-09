/**
 * Fixed details that don't change from the admin area.
 *
 * Everything the owner can edit — hours, phone, email, address, Facebook —
 * lives in the database and is read through `lib/content.ts`. This file holds
 * only what's baked in at build time: the site's own URL, its name and
 * description for search engines, and the map coordinates.
 */
export const site = {
  name: "Vistas Beach Cafe",
  shortName: "Vistas",
  tagline: "The perfect place to watch Guernsey's stunning sunset.",
  description:
    "Beach cafe on Vazon Bay, Guernsey. Locally prepared food, coffee and cakes, indoor and outdoor seating, and a roof terrace with the best sunset views on the west coast. Open 8am–5pm every day, no bookings needed.",
  /** Drives canonical URLs, the sitemap and the OpenGraph image. */
  url: "https://vistas-rouge.vercel.app",
  geo: { lat: 49.4694, lng: -2.6169 },
} as const;
