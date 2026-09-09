import Image from "next/image";
import Link from "next/link";
import { Button, SectionLabel } from "@/components/ui";
import { site } from "@/data/site";
import { seasons } from "@/data/events";

const quickCards = [
  {
    title: "Open 8am–5pm daily",
    body: "Breakfast through to late afternoon, every day of the week.",
  },
  {
    title: "Dine in & outdoor seating",
    body: "Cosy inside, or out in the sea air with your feet almost in the sand.",
  },
  {
    title: "Roof terrace views",
    body: "The best seat on the west coast for watching the sun go down.",
  },
];

/* Photos live in /public/photos — swap these entries for your own files. */
const photos = [
  {
    src: "/photos/cake-counter.svg",
    alt: "The Vistas cake counter, with an almond slice, doughnuts and chocolate slices",
  },
  {
    src: "/images/cafe-interior.svg",
    alt: "Rattan chairs and timber slat walls inside Vistas, lit by golden-hour sun",
  },
  {
    src: "/photos/roof-terrace.svg",
    alt: "The Vistas roof terrace looking out over Vazon Bay at sunset",
  },
];

export default function HomePage() {
  const nextSeason = seasons[0];

  return (
    <>
      {/* ---------------------------------------------------------- hero */}
      <section className="relative isolate flex min-h-[78svh] items-center justify-center overflow-hidden sm:min-h-[86svh]">
        <Image
          src="/images/hero-vazon-sunset.svg"
          alt="Illustrated sunset over Vazon Bay, with the L'Erée headland, gulls and a paraglider"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div className="scrim-sunset absolute inset-0 -z-10" aria-hidden="true" />

        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <Image
            src="/brand/logo-badge-colour.png"
            alt=""
            width={1024}
            height={1024}
            priority
            className="mx-auto h-28 w-28 drop-shadow-lg sm:h-36 sm:w-36"
          />
          <h1 className="mt-8 text-3xl font-medium leading-tight tracking-brand text-white drop-shadow-md sm:text-5xl">
            The perfect place to watch Guernsey&rsquo;s stunning sunset.
          </h1>
          <p className="mt-6 text-base text-white/90 drop-shadow sm:text-lg">
            A beach cafe on Vazon Bay, right on the sand.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button href="/events" variant="solid">
              Sundown Sessions
            </Button>
            <Button href="/contact" variant="light">
              Find us
            </Button>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- three quick cards */}
      <section className="relative z-10 mx-auto -mt-12 max-w-6xl px-4 sm:px-6">
        <ul className="grid gap-5 sm:grid-cols-3">
          {quickCards.map((card) => (
            <li
              key={card.title}
              className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-teal/10"
            >
              <h2 className="text-lg font-medium tracking-brand">{card.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-teal/75">
                {card.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* ------------------------------------------------------------ intro */}
      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-24">
        <SectionLabel>On the beach at Vazon</SectionLabel>
        <h2 className="mt-4 text-3xl font-medium tracking-brand sm:text-4xl">
          Locally prepared food, coffee and cakes
        </h2>
        <p className="mt-6 text-base leading-relaxed text-teal/80 sm:text-lg">
          Vistas sits right on Vazon Bay on Guernsey&rsquo;s west coast. Everything
          is prepared locally — proper breakfasts, lunches, good coffee and a
          counter full of cakes. Eat inside, spread out on the outdoor seating, or
          take the stairs up to the roof terrace, where the view runs the whole way
          across the bay.
        </p>
        <p className="mt-6 rounded-2xl bg-cream/60 px-6 py-5 text-lg font-medium tracking-brand">
          No bookings needed — just turn up.
        </p>
      </section>

      {/* ----------------------------------------------------- photo strip */}
      <section className="bg-white/60 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <SectionLabel>A look inside</SectionLabel>
            <h2 className="mt-4 text-3xl font-medium tracking-brand sm:text-4xl">
              Golden hour, every day
            </h2>
          </div>
          <ul className="mt-12 grid gap-5 sm:grid-cols-3">
            {photos.map((photo) => (
              <li
                key={photo.src}
                className="overflow-hidden rounded-2xl bg-sand shadow-sm ring-1 ring-teal/10"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={640}
                  height={800}
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="aspect-4/5 w-full object-cover"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* --------------------------------------------------------- teasers */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Sundown Sessions */}
          <article className="bg-sunset relative overflow-hidden rounded-3xl p-9 text-white sm:p-11">
            <SectionLabel tone="light">Summer evenings</SectionLabel>
            <h2 className="mt-4 text-3xl font-medium tracking-brand sm:text-4xl">
              Sundown Sessions
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/90">
              DJs and live music at the cafe through the summer. Food served until
              7pm, a mobile beer bar, and the sun going down over the bay behind
              the decks. Limited capacity — turn up early.
            </p>
            <p className="mt-4 text-sm text-white/75">
              {nextSeason.dates.length} dates across the {nextSeason.year} season.
            </p>
            <div className="mt-8">
              <Button href="/events" variant="light">
                See the {nextSeason.year} lineup
              </Button>
            </div>
          </article>

          {/* Clean for Ice Cream */}
          <article className="relative overflow-hidden rounded-3xl bg-sage/25 p-9 ring-1 ring-teal/10 sm:p-11">
            <SectionLabel>Our beach project</SectionLabel>
            <h2 className="mt-4 text-3xl font-medium tracking-brand sm:text-4xl">
              Clean for Ice Cream
            </h2>
            <p className="mt-4 text-base leading-relaxed text-teal/80">
              Borrow a bag and a litter picker from the cafe, fill it along Vazon
              beach, and bring it back to swap for a free ice cream. A small thing
              that keeps the bay looking the way it should.
            </p>
            <div className="mt-8">
              <Button href="/beach-clean" variant="outline">
                How it works
              </Button>
            </div>
          </article>
        </div>
      </section>

      {/* ------------------------------------------------------ find us bar */}
      <section className="bg-teal px-4 py-16 text-white sm:px-6">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
          <h2 className="text-2xl font-medium tracking-brand sm:text-3xl">
            {site.address.street}, {site.address.region} {site.address.postcode}
          </h2>
          <p className="text-white/80">
            Open {site.hours.label}. Walk-ins only — no reservations.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/contact" variant="light">
              Directions & contact
            </Button>
            <Link
              href={site.phoneHref}
              className="inline-flex items-center justify-center rounded-full border-2 border-white/50 px-7 py-3.5 text-xs font-semibold uppercase tracking-brand hover:bg-white/10"
            >
              {site.phone}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
