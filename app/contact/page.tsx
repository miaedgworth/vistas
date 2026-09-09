import type { Metadata } from "next";
import { Callout, PageHeader, SectionLabel } from "@/components/ui";
import MapEmbed from "@/components/MapEmbed";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact & find us",
  description:
    "Vistas Beach Cafe, Vazon Rd, Guernsey GY5 7BF. Open 8am–5pm every day. Call 01481 252513 or email vistasgsy@gmail.com. No reservations — private event enquiries welcome.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        label="Contact"
        title="Find us at Vazon"
        intro="On the beach on Guernsey's west coast, open every day from 8am until 5pm."
      />

      <section className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-16">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Details */}
          <div>
            <SectionLabel>Details</SectionLabel>
            <h2 className="mt-4 text-3xl font-medium tracking-brand sm:text-4xl">
              Vistas Beach Cafe
            </h2>

            <dl className="mt-8 space-y-6 text-base">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-brand text-oak">
                  Address
                </dt>
                <dd className="mt-1.5">
                  <address className="not-italic leading-relaxed text-teal/85">
                    {site.address.street}
                    <br />
                    {site.address.region} {site.address.postcode}
                  </address>
                </dd>
              </div>

              <div>
                <dt className="text-xs font-semibold uppercase tracking-brand text-oak">
                  Phone
                </dt>
                <dd className="mt-1.5">
                  <a
                    href={site.phoneHref}
                    className="font-medium underline decoration-oak underline-offset-4 hover:text-ray"
                  >
                    {site.phone}
                  </a>
                </dd>
              </div>

              <div>
                <dt className="text-xs font-semibold uppercase tracking-brand text-oak">
                  Email
                </dt>
                <dd className="mt-1.5">
                  <a
                    href={`mailto:${site.email}`}
                    className="font-medium underline decoration-oak underline-offset-4 hover:text-ray"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>

              <div>
                <dt className="text-xs font-semibold uppercase tracking-brand text-oak">
                  Facebook
                </dt>
                <dd className="mt-1.5">
                  <a
                    href={site.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-medium underline decoration-oak underline-offset-4 hover:text-ray"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.5 2.9h-2.3v7A10 10 0 0 0 22 12Z" />
                    </svg>
                    Vistas Beach Cafe
                  </a>
                </dd>
              </div>

              <div>
                <dt className="text-xs font-semibold uppercase tracking-brand text-oak">
                  Opening hours
                </dt>
                <dd className="mt-1.5 text-teal/85">{site.hours.label}</dd>
              </div>
            </dl>
          </div>

          {/* Map */}
          <div>
            <div className="overflow-hidden rounded-3xl shadow-sm ring-1 ring-teal/10">
              <MapEmbed />
            </div>
            <p className="mt-4 text-sm">
              <a
                href={site.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-oak underline-offset-4 hover:text-ray"
              >
                Open in Google Maps
              </a>
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <Callout title="No reservations">
            <p>
              We don&rsquo;t take bookings for tables — it&rsquo;s walk-ins only,
              every day. Just turn up and find a spot.
            </p>
          </Callout>

          <Callout title="Private events">
            <p>
              Private bookings and events are very welcome. Email{" "}
              <a
                href={`mailto:${site.email}`}
                className="font-medium underline decoration-oak underline-offset-4 hover:text-ray"
              >
                {site.email}
              </a>{" "}
              or call{" "}
              <a
                href={site.phoneHref}
                className="font-medium underline decoration-oak underline-offset-4 hover:text-ray"
              >
                {site.phone}
              </a>
              .
            </p>
          </Callout>
        </div>
      </section>
    </>
  );
}
