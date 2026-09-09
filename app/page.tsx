import Image from "next/image";
import Link from "next/link";
import MapEmbed from "@/components/MapEmbed";
import { Button, SectionLabel } from "@/components/ui";
import { site } from "@/data/site";

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

const beachCleanSteps = [
  {
    n: "01",
    title: "Collect a bag",
    body: "Pop into the cafe and pick up a beach-clean bag and a litter picker. They're free to borrow — just ask at the counter.",
  },
  {
    n: "02",
    title: "Pick litter",
    body: "Head out along Vazon beach and fill it up. Anything you find counts, and the tideline is usually the best hunting ground.",
  },
  {
    n: "03",
    title: "Swap it for ice cream",
    body: "Bring your rubbish back to the cafe and we'll swap it for a free ice cream. That's the whole deal.",
  },
];

/* Photos live in /public/photos — swap these entries for your own files. */
const photos = [
  {
    src: "/photos/cake-counter.jpg",
    alt: "The cake counter at Vistas: an almond slice, chocolate slices and sugared doughnuts in the glass display",
  },
  {
    src: "/photos/golden-hour-seating.jpg",
    alt: "Rattan chairs and timber slat walls inside Vistas, lit by low golden-hour sun",
  },
  {
    src: "/photos/inside-the-cafe.jpg",
    alt: "Inside Vistas, looking past the rattan seating to the windows and the bay beyond",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------- hero */}
      <section className="relative isolate flex min-h-[80svh] items-end justify-center overflow-hidden sm:min-h-[88svh]">
        <Image
          src="/photos/hero-sunset.jpg"
          alt="Sunset over Vazon Bay from the Vistas roof terrace, with a busy crowd on the deck and the sea beyond"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        {/* Weighted to the foot of the frame: keeps the sky clear while giving
            the text the contrast it needs over a bright sunset. */}
        <div className="scrim-hero absolute inset-0 -z-10" aria-hidden="true" />

        <div className="mx-auto max-w-3xl px-4 pb-14 pt-24 text-center sm:px-6 sm:pb-20 sm:pt-32">
          {/* The wordmark carries the page's h1; its alt text is the heading. */}
          <h1>
            <Image
              src="/brand/logo-wordmark.png"
              alt="Vistas Beach Cafe, Vazon, Guernsey"
              width={900}
              height={221}
              priority
              className="mx-auto h-auto w-72 drop-shadow-lg sm:w-[26rem]"
            />
          </h1>
          <p className="mt-5 text-base text-white drop-shadow sm:text-lg">
            A beach cafe on Vazon Bay, right on the sand.
          </p>
          <div className="mt-9 flex justify-center">
            <Button href="/contact" variant="solid">
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
                  width={900}
                  height={1113}
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="aspect-4/5 w-full object-cover"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* --------------------------------------------- clean for ice cream */}
      <section
        id="clean-for-ice-cream"
        className="scroll-mt-20 bg-white/60 py-20 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>Our beach project</SectionLabel>
            <h2 className="mt-4 text-3xl font-medium tracking-brand sm:text-4xl">
              Clean for Ice Cream
            </h2>
            <p className="mt-5 text-base leading-relaxed text-teal/80 sm:text-lg">
              Fill a bag with litter from Vazon beach, bring it back to the cafe,
              and swap it for a free ice cream.
            </p>
          </div>

          <ol className="mx-auto mt-14 grid max-w-5xl gap-8 sm:grid-cols-3 sm:gap-10">
            {beachCleanSteps.map((step) => (
              <li key={step.n} className="text-center">
                <span
                  aria-hidden="true"
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage/40 text-base font-semibold tracking-brand text-teal"
                >
                  {step.n}
                </span>
                <h3 className="mt-5 text-lg font-medium tracking-brand">
                  {step.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-teal/80">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>

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

        <div className="mx-auto mt-12 max-w-5xl">
          <div className="overflow-hidden rounded-3xl ring-1 ring-white/20">
            <MapEmbed className="h-[320px] sm:h-[420px]" />
          </div>
          <p className="mt-4 text-center text-sm">
            <a
              href={site.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 underline decoration-white/40 underline-offset-4 hover:text-white"
            >
              Open in Google Maps
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
