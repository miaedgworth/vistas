import Image from "next/image";
import Link from "next/link";
import MapEmbed from "@/components/MapEmbed";
import { Button, SectionLabel } from "@/components/ui";
import {
  getContent,
  getPhotos,
  getSettings,
  mapsLink,
  telHref,
} from "@/lib/content";

export default async function HomePage() {
  const [t, settings, hero, strip] = await Promise.all([
    getContent(),
    getSettings(),
    getPhotos("hero"),
    getPhotos("strip"),
  ]);

  const heroImage = hero[0];
  const cards = [1, 2, 3].map((n) => ({
    title: t[`home.card${n}.title`],
    body: t[`home.card${n}.body`],
  }));
  const steps = [1, 2, 3].map((n) => ({
    n: `0${n}`,
    title: t[`home.clean.step${n}.title`],
    body: t[`home.clean.step${n}.body`],
  }));

  return (
    <>
      {/* ---------------------------------------------------------- hero */}
      <section className="relative isolate flex min-h-[80svh] items-end justify-center overflow-hidden sm:min-h-[88svh]">
        {heroImage && (
          <Image
            src={heroImage.url}
            alt={heroImage.alt}
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover"
          />
        )}
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
            {t["home.hero.subhead"]}
          </p>
          <div className="mt-9 flex justify-center">
            <Button href="/contact" variant="solid">
              {t["home.hero.cta"]}
            </Button>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- three quick cards */}
      <section className="relative z-10 mx-auto -mt-12 max-w-6xl px-4 sm:px-6">
        <ul className="grid gap-5 sm:grid-cols-3">
          {cards.map((card) => (
            <li
              key={card.title}
              className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-teal/10"
            >
              <h2 className="text-lg font-medium tracking-brand">{card.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-teal/75">{card.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ------------------------------------------------------------ intro */}
      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-24">
        <SectionLabel>{t["home.intro.label"]}</SectionLabel>
        <h2 className="mt-4 text-3xl font-medium tracking-brand sm:text-4xl">
          {t["home.intro.heading"]}
        </h2>
        <p className="mt-6 text-base leading-relaxed text-teal/80 sm:text-lg">
          {t["home.intro.body"]}
        </p>
        <p className="mt-6 rounded-2xl bg-cream/60 px-6 py-5 text-lg font-medium tracking-brand">
          {t["home.intro.note"]}
        </p>
      </section>

      {/* ----------------------------------------------------- photo strip */}
      <section className="bg-white/60 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <SectionLabel>{t["home.strip.label"]}</SectionLabel>
            <h2 className="mt-4 text-3xl font-medium tracking-brand sm:text-4xl">
              {t["home.strip.heading"]}
            </h2>
          </div>
          <ul className="mt-12 grid gap-5 sm:grid-cols-3">
            {strip.map((photo) => (
              <li
                key={photo.id}
                className="overflow-hidden rounded-2xl bg-sand shadow-sm ring-1 ring-teal/10"
              >
                <Image
                  src={photo.url}
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
            <SectionLabel>{t["home.clean.label"]}</SectionLabel>
            <h2 className="mt-4 text-3xl font-medium tracking-brand sm:text-4xl">
              {t["home.clean.heading"]}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-teal/80 sm:text-lg">
              {t["home.clean.intro"]}
            </p>
          </div>

          <ol className="mx-auto mt-14 grid max-w-5xl gap-8 sm:grid-cols-3 sm:gap-10">
            {steps.map((step) => (
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
            {settings.addressStreet}, {settings.addressRegion}{" "}
            {settings.addressPostcode}
          </h2>
          <p className="text-white/80">
            Open {settings.hoursLabel}. {t["home.findus.note"]}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/contact" variant="light">
              Directions &amp; contact
            </Button>
            <Link
              href={telHref(settings.phone)}
              className="inline-flex items-center justify-center rounded-full border-2 border-white/50 px-7 py-3.5 text-xs font-semibold uppercase tracking-brand hover:bg-white/10"
            >
              {settings.phone}
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-5xl">
          <div className="overflow-hidden rounded-3xl ring-1 ring-white/20">
            <MapEmbed settings={settings} className="h-[320px] sm:h-[420px]" />
          </div>
          <p className="mt-4 text-center text-sm">
            <a
              href={mapsLink(settings)}
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
