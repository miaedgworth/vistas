import type { Metadata } from "next";
import { Button, Callout, PageHeader, SectionLabel } from "@/components/ui";
import SeasonTabs from "@/components/SeasonTabs";
import SessionVideo from "@/components/SessionVideo";
import { pastSeasons, upcomingSeasons } from "@/data/events";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Events — Sundown Sessions",
  description:
    "Events at Vistas Beach Cafe on Vazon Bay. Sundown Sessions are our summer DJ and live-music evenings — see past line-ups, watch a session, and enquire about private bookings.",
  alternates: { canonical: "/events" },
};

export default function EventsPage() {
  const hasUpcoming = upcomingSeasons.length > 0;

  return (
    <>
      <PageHeader
        label="What's on at Vistas"
        title="Events"
        intro="Sundown Sessions are our summer DJ and live-music evenings — music into the evening while the sun drops over the bay."
      />

      {/* ------------------------------------------------ upcoming events */}
      <section className="mx-auto max-w-5xl px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16">
        <div className="text-center">
          <SectionLabel>What&rsquo;s coming up</SectionLabel>
          <h2 className="mt-4 text-3xl font-medium tracking-brand sm:text-4xl">
            Upcoming events
          </h2>
        </div>

        {hasUpcoming ? (
          <div className="mt-10">
            <SeasonTabs seasons={upcomingSeasons} />
          </div>
        ) : (
          <div className="mx-auto mt-10 max-w-2xl rounded-3xl bg-white/70 p-9 text-center ring-1 ring-teal/10 sm:p-11">
            <p className="text-lg leading-relaxed text-teal/85">
              That&rsquo;s the season done — the last Sundown Session has been and
              gone.
            </p>
            <p className="mt-4 text-base leading-relaxed text-teal/75">
              Next summer&rsquo;s dates usually land in the spring, and they go up
              on Facebook first. The cafe is open as normal in the meantime,
              8am&ndash;5pm every day.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href={site.facebook} variant="solid" external>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.5 2.9h-2.3v7A10 10 0 0 0 22 12Z" />
                </svg>
                Follow for announcements
              </Button>
              <Button href="/contact" variant="outline">
                Get in touch
              </Button>
            </div>
          </div>
        )}
      </section>

      {/* --------------------------------------------------- watch a session */}
      <section className="bg-white/60 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center">
            <SectionLabel>A taste of it</SectionLabel>
            <h2 className="mt-4 text-3xl font-medium tracking-brand sm:text-4xl">
              Watch a session
            </h2>
          </div>
          <div className="mt-10">
            <SessionVideo />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ past events */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-10 text-center">
          <SectionLabel>Previous seasons</SectionLabel>
          <h2 className="mt-4 text-3xl font-medium tracking-brand sm:text-4xl">
            Past events
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-teal/75">
            How the Sundown Sessions have run: music into the evening, food
            served until 7pm, a mobile beer bar, over-18s later on with ID, and
            the high tide time alongside each date.
          </p>
        </div>
        <SeasonTabs seasons={pastSeasons} />
      </section>

      {/* ------------------------------------------------ private bookings */}
      <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 sm:pb-24">
        <Callout title="Available for private bookings and events">
          <p>Planning something? Get in touch and we&rsquo;ll talk it through.</p>
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
