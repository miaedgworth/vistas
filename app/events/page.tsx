import type { Metadata } from "next";
import { Button, Callout, PageHeader, SectionLabel } from "@/components/ui";
import SeasonTabs from "@/components/SeasonTabs";
import { seasons } from "@/data/events";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Sundown Sessions — Events",
  description:
    "Sundown Sessions at Vistas Beach Cafe: summer DJ and live-music evenings on Vazon Bay. Food until 7pm, mobile beer bar, over-18s later in the evening. See the full lineup and high tide times.",
  alternates: { canonical: "/events" },
};

export default function EventsPage() {
  return (
    <>
      <PageHeader
        label="Summer evenings at Vistas"
        title="Sundown Sessions"
        intro="Our summer DJ and live-music evenings at the cafe — music playing into the evening while the sun drops over the bay."
      />

      {/* ------------------------------------------------------ the details */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="space-y-5 text-base leading-relaxed text-teal/85 sm:text-lg">
          <p>
            Music runs into the evening and food is served until 7pm, with a
            satellite / mobile beer bar on site. Later in the evening the sessions
            are <strong className="font-medium text-teal">over-18s only</strong>{" "}
            and ID is required.
          </p>
          <p>
            Capacity is limited and we can&rsquo;t hold spaces, so the advice is
            always the same:{" "}
            <strong className="font-medium text-teal">turn up early</strong>. Each
            date below shows that evening&rsquo;s high tide time, so you know what
            the beach will be doing.
          </p>
        </div>

        <div className="mt-10">
          <Button href={site.facebookVideo} variant="solid" external>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.5 2.9h-2.3v7A10 10 0 0 0 22 12Z" />
            </svg>
            Watch a session on Facebook
          </Button>
        </div>
      </section>

      {/* --------------------------------------------------------- lineups */}
      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 sm:pb-20">
        <div className="mb-10 text-center">
          <SectionLabel>The lineup</SectionLabel>
          <h2 className="mt-4 text-3xl font-medium tracking-brand sm:text-4xl">
            Dates &amp; acts
          </h2>
        </div>
        <SeasonTabs seasons={seasons} />
      </section>

      {/* ------------------------------------------------ private bookings */}
      <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 sm:pb-24">
        <Callout title="Available for private bookings and events">
          <p>
            Planning something? Get in touch and we&rsquo;ll talk it through.
          </p>
          <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-medium">
            <a
              href={`mailto:${site.email}`}
              className="underline decoration-oak underline-offset-4 hover:text-ray"
            >
              {site.email}
            </a>
            <a
              href={site.phoneHref}
              className="underline decoration-oak underline-offset-4 hover:text-ray"
            >
              {site.phone}
            </a>
          </p>
        </Callout>
      </section>
    </>
  );
}
