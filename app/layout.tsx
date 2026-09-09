import type { Metadata } from "next";
import { Jost, Montserrat } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site, addressLine } from "@/data/site";
import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Vazon, Guernsey`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Vistas Beach Cafe",
    "Vazon Bay",
    "Guernsey beach cafe",
    "Guernsey sunset",
    "Sundown Sessions",
    "cafe Castel Guernsey",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: site.name,
    title: `${site.name} | Vazon, Guernsey`,
    description: site.description,
    url: site.url,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Vazon, Guernsey`,
    description: site.description,
    images: ["/og.png"],
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

/** LocalBusiness / CafeOrCoffeeShop structured data for rich results. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: `+44 ${site.phone.replace(/^0/, "").replace(/\s/g, "")}`,
  email: site.email,
  image: `${site.url}/og.png`,
  logo: `${site.url}/brand/logo-badge-colour.png`,
  priceRange: "££",
  servesCuisine: ["Coffee", "Cafe", "Cakes"],
  sameAs: [site.facebook],
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postcode,
    addressCountry: site.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.geo.lat,
    longitude: site.geo.lng,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: site.hours.opens,
      closes: site.hours.closes,
    },
  ],
  hasMap: site.mapsLink,
  publicAccess: true,
  smokingAllowed: false,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${jost.variable} ${montserrat.variable}`}>
      <body className="flex min-h-screen flex-col bg-sand text-teal antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-teal focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          // Structured data is a static, locally-authored object.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <span className="sr-only">{addressLine}</span>
      </body>
    </html>
  );
}
