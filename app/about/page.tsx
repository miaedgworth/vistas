import type { Metadata } from "next";
import Image from "next/image";
import { Button, Callout, PageHeader, SectionLabel } from "@/components/ui";
import { getContent, getPhotos, getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "About the cafe",
  description:
    "Vistas is a beach cafe on Vazon Bay, on Guernsey's west coast. Indoor dining, outdoor seating and a roof terrace, serving locally prepared food, coffee and cakes. Open 8am–5pm every day, walk-ins only.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const [t, settings, aboutPhotos, merchPhotos] = await Promise.all([
    getContent(),
    getSettings(),
    getPhotos("about"),
    getPhotos("merch"),
  ]);

  const photo = aboutPhotos[0];
  const merch = merchPhotos[0];
  const features = [1, 2, 3].map((n) => ({
    title: t[`about.feature${n}.title`],
    body: t[`about.feature${n}.body`],
  }));

  return (
    <>
      <PageHeader
        label={t["about.label"]}
        title={t["about.title"]}
        intro={t["about.intro"]}
      />

      <section className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-16">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <SectionLabel>{t["about.cafe.label"]}</SectionLabel>
            <h2 className="mt-4 text-3xl font-medium tracking-brand sm:text-4xl">
              {t["about.cafe.heading"]}
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-teal/85 sm:text-lg">
              <p>{t["about.cafe.p1"]}</p>
              <p>{t["about.cafe.p2"]}</p>
              <p>{t["about.cafe.p3"]}</p>
            </div>
          </div>

          {photo && (
            <div className="overflow-hidden rounded-3xl shadow-sm ring-1 ring-teal/10">
              <Image
                src={photo.url}
                alt={photo.alt}
                width={900}
                height={1113}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="w-full object-cover"
              />
            </div>
          )}
        </div>
      </section>

      <section className="bg-white/60 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ul className="grid gap-5 sm:grid-cols-3">
            {features.map((item) => (
              <li key={item.title} className="rounded-2xl bg-sand p-7 ring-1 ring-teal/10">
                <h3 className="text-lg font-medium tracking-brand">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-teal/75">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <Callout title={t["about.merch.title"]}>
          <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
            <p>{t["about.merch.body"]}</p>
            {merch && (
              <Image
                src={merch.url}
                alt={merch.alt}
                width={800}
                height={993}
                sizes="(min-width: 640px) 15rem, 100vw"
                className="w-full rounded-xl object-cover sm:w-60"
              />
            )}
          </div>
        </Callout>

        <div className="mt-12 rounded-2xl bg-teal px-7 py-9 text-center text-white sm:px-10">
          <p className="text-xl font-medium tracking-brand sm:text-2xl">
            Open {settings.hoursLabel}
          </p>
          <p className="mt-3 text-white/80">{t["about.closing.note"]}</p>
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
