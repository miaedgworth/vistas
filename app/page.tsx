import Image from "next/image";
import Link from "next/link";
import MapEmbed from "@/components/MapEmbed";
import { Button, Callout, SectionLabel } from "@/components/ui";
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

      {/* --------------------------------------------------------- teasers */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div>
          {/* Sundown Sessions */}
          <article className="bg-sunset relative overflow-hidden rounded-3xl p-9 text-white sm:p-12">
            <SectionLabel tone="light">Summer evenings</SectionLabel>
            <h2 className="mt-4 text-3xl font-medium tracking-brand sm:text-4xl">
              Sundown Sessions
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90">
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

        </div>
      </section>

      {/* --------------------------------------------- clean for ice cream */}
      <section
        id="clean-for-ice-cream"
        className="scroll-mt-20 bg-white/60 py-20 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            <div className="overflow-hidden rounded-3xl shadow-sm ring-1 ring-teal/10">
              <Image
                src="/images/beach-clean.svg"
                alt="A family beach clean at Vazon: an adult holding a beach-clean bag, a child with a litter picker, and an ice cream in the foreground"
                width={800}
                height={600}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="w-full object-cover"
              />
            </div>

            <div>
              <SectionLabel>Our beach project</SectionLabel>
              <h2 className="mt-4 text-3xl font-medium tracking-brand sm:text-4xl">
                Clean for Ice Cream
              </h2>
              <p className="mt-4 text-base leading-relaxed text-teal/80">
                Fill a bag with litter from Vazon beach, bring it back to the
                cafe, and swap it for a free ice cream.
              </p>
              <ol className="mt-8 space-y-7">
                {beachCleanSteps.map((step) => (
                  <li key={step.n} className="flex gap-5">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage/40 text-sm font-semibold tracking-brand text-teal"
                    >
                      {step.n}
                    </span>
                    <div>
                      <h3 className="text-lg font-medium tracking-brand">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-base leading-relaxed text-teal/80">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-3xl">
            <Callout title="Keeping Vazon the way we found it">
              <p>
                Vazon is a working beach — surfers, swimmers, dog walkers,
                families and a lot of weather. Whatever washes up tends to stay
                up unless somebody picks it up. Clean for Ice Cream is our small
                way of making that somebody a bit more likely, and it turns out
                kids are very good at it.
              </p>
              <p className="mt-4">
                Bring the family, take half an hour, and have an ice cream on us.
              </p>
            </Callout>
          </div>
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
