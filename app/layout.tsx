import type { Metadata } from "next";
import { Jost, Montserrat } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site } from "@/data/site";
import { addressLine, getSettings, mapsLink, telHref } from "@/lib/content";
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
  icons: { icon: "/icon.png", apple: "/apple-icon.png" },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSettings();

  /** LocalBusiness / CafeOrCoffeeShop structured data, built from live settings. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: telHref(settings.phone).replace("tel:", ""),
    email: settings.email,
    image: `${site.url}/og.png`,
    logo: `${site.url}/brand/logo-badge-colour.png`,
    priceRange: "££",
    servesCuisine: ["Coffee", "Cafe", "Cakes"],
    sameAs: [settings.facebook],
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.addressStreet,
      addressLocality: settings.addressLocality,
      addressRegion: settings.addressRegion,
      postalCode: settings.addressPostcode,
      addressCountry: "GG",
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
        opens: settings.hoursOpens,
        closes: settings.hoursCloses,
      },
    ],
    hasMap: mapsLink(settings),
    publicAccess: true,
    smokingAllowed: false,
  };

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
        <Footer settings={settings} />
        <script
          type="application/ld+json"
          // Structured data is a locally-authored object, not user HTML.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <span className="sr-only">{addressLine(settings)}</span>
      </body>
    </html>
  );
}
