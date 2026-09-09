import type { Metadata } from "next";
import Image from "next/image";
import { Button, Callout, PageHeader, SectionLabel } from "@/components/ui";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About the cafe",
  description:
    "Vistas is a beach cafe on Vazon Bay, on Guernsey's west coast. Indoor dining, outdoor seating and a roof terrace, serving locally prepared food, coffee and cakes. Open 8am–5pm every day, walk-ins only.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="About"
        title="A beach cafe on Vazon Bay"
        intro="Right on the sand on Guernsey's west coast, open every day of the year from 8am until 5pm."
      />

      <section className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-16">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <SectionLabel>The cafe</SectionLabel>
            <h2 className="mt-4 text-3xl font-medium tracking-brand sm:text-4xl">
              Somewhere to settle in
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-teal/85 sm:text-lg">
              <p>
                Vistas sits on Vazon Bay, on the west coast of Guernsey — the side
                of the island the sun sets over. There&rsquo;s indoor dining for
                when the weather turns, outdoor seating for when it doesn&rsquo;t,
                and a roof terrace above it all with a view straight across the
                bay.
              </p>
              <p>
                The food is prepared locally, and the coffee and cakes are the
                reason plenty of people come in the first place. Breakfast from
                8am, lunch through the middle of the day, and cake whenever you
                like.
              </p>
              <p>
                We don&rsquo;t take reservations. It&rsquo;s walk-ins only, every
                day — find a table, order at the counter, stay as long as you want.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl shadow-sm ring-1 ring-teal/10">
            <Image
              src="/photos/golden-hour-seating.jpg"
              alt="Rattan chairs and timber slat walls inside Vistas, lit by low golden-hour sun"
              width={900}
              height={1113}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-white/60 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ul className="grid gap-5 sm:grid-cols-3">
            {[
              {
                title: "Indoor dining",
                body: "Timber, rattan and warm light — comfortable whatever the weather is doing outside.",
              },
              {
                title: "Outdoor seating",
                body: "Tables in the sea air, a few steps from the sand at Vazon.",
              },
              {
                title: "Roof terrace",
                body: "Up the stairs for the widest view of the bay, and the best sunset on the island.",
              },
            ].map((item) => (
              <li
                key={item.title}
                className="rounded-2xl bg-sand p-7 ring-1 ring-teal/10"
              >
                <h3 className="text-lg font-medium tracking-brand">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-teal/75">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <Callout title="Vistas merch & gift cards">
          <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
            <p>
              Reusable cups, keyrings and gift cards are available in the cafe —
              worth a look on your way past the counter, and an easy present for
              anyone who loves this stretch of coast.
            </p>
            <Image
              src="/photos/merch.jpg"
              alt="Vistas reusable cups, gift cards and a keyring on a timber table"
              width={800}
              height={993}
              sizes="(min-width: 640px) 15rem, 100vw"
              className="w-full rounded-xl object-cover sm:w-60"
            />
          </div>
        </Callout>

        <div className="mt-12 rounded-2xl bg-teal px-7 py-9 text-center text-white sm:px-10">
          <p className="text-xl font-medium tracking-brand sm:text-2xl">
            Open {site.hours.label}
          </p>
          <p className="mt-3 text-white/80">
            No reservations — just turn up.
          </p>
          <div className="mt-7 flex justify-center">
            <Button href="/contact" variant="light">
              Find us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
