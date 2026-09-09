/**
 * Single source of truth for business details.
 * Update hours, phone or address here and every page + the JSON-LD follows.
 */
export const site = {
  name: "Vistas Beach Cafe",
  shortName: "Vistas",
  tagline: "The perfect place to watch Guernsey's stunning sunset.",
  description:
    "Beach cafe on Vazon Bay, Guernsey. Locally prepared food, coffee and cakes, indoor and outdoor seating, and a roof terrace with the best sunset views on the west coast. Open 8am–5pm every day, no bookings needed.",
  url: "https://vistas.vercel.app",
  phone: "01481 252513",
  phoneHref: "tel:+441481252513",
  email: "vistasgsy@gmail.com",
  facebook: "https://www.facebook.com/people/Vistas-Beach-Cafe/61554066410905/",
  facebookVideo: "https://www.facebook.com/share/r/18SofFgS9s/?mibextid=wwXIfr",
  address: {
    street: "Vazon Rd",
    locality: "Castel",
    region: "Guernsey",
    postcode: "GY5 7BF",
    country: "GG",
  },
  geo: { lat: 49.4694, lng: -2.6169 },
  hours: { opens: "08:00", closes: "17:00", label: "8am–5pm, every day" },
  mapsEmbed:
    "https://www.google.com/maps?q=Vistas+Beach+Cafe,+Vazon+Rd,+Guernsey+GY5+7BF&output=embed",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=Vistas+Beach+Cafe+Vazon+Rd+Guernsey+GY5+7BF",
} as const;

export const addressLine = `${site.address.street}, ${site.address.region} ${site.address.postcode}`;
