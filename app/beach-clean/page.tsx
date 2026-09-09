import type { Metadata } from "next";
import Image from "next/image";
import { Button, Callout, PageHeader, SectionLabel } from "@/components/ui";

export const metadata: Metadata = {
  title: "Clean for Ice Cream — Beach Clean",
  description:
    "Clean for Ice Cream is the Vistas beach-clean project at Vazon. Collect a bag and litter picker from the cafe, pick litter along the beach, and swap your rubbish for a free ice cream.",
  alternates: { canonical: "/beach-clean" },
};

const steps = [
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

export default function BeachCleanPage() {
  return (
    <>
      <PageHeader
        label="Our beach project"
        title="Clean for Ice Cream"
        intro="Fill a bag with litter from Vazon beach, bring it back to the cafe, and swap it for a free ice cream."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div className="overflow-hidden rounded-3xl bg-white/60 shadow-sm ring-1 ring-teal/10">
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
            <SectionLabel>How it works</SectionLabel>
            <h2 className="mt-4 text-3xl font-medium tracking-brand sm:text-4xl">
              Three steps, one ice cream
            </h2>
            <ol className="mt-8 space-y-7">
              {steps.map((step) => (
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
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 sm:pb-24">
        <Callout title="Keeping Vazon the way we found it">
          <p>
            Vazon is a working beach — surfers, swimmers, dog walkers, families and
            a lot of weather. Whatever washes up tends to stay up unless somebody
            picks it up. Clean for Ice Cream is our small way of making that
            somebody a bit more likely, and it turns out kids are very good at it.
          </p>
          <p className="mt-4">
            Bring the family, take half an hour, and have an ice cream on us.
          </p>
        </Callout>

        <div className="mt-10 text-center">
          <Button href="/contact" variant="outline">
            Come and find us
          </Button>
        </div>
      </section>
    </>
  );
}
