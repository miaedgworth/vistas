import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="bg-sunset px-4 py-28 text-center text-white sm:px-6">
      <div className="mx-auto max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-brand text-cream">
          404
        </p>
        <h1 className="mt-4 text-4xl font-medium tracking-brand">
          That page has drifted off
        </h1>
        <p className="mt-5 text-white/85">
          Let&rsquo;s get you back to the bay.
        </p>
        <div className="mt-9">
          <Button href="/" variant="light">
            Back to home
          </Button>
        </div>
      </div>
    </section>
  );
}
