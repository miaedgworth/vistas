import Link from "next/link";
import { requireLogin } from "@/lib/auth";
import { getPhotos, getSeasons } from "@/lib/content";

export const dynamic = "force-dynamic";

const cards = [
  {
    href: "/admin/events",
    title: "Events",
    body: "Add next season, edit line-ups, and move a season between upcoming and past.",
  },
  {
    href: "/admin/photos",
    title: "Photos",
    body: "Upload new pictures, reorder the home page strip, and edit the descriptions.",
  },
  {
    href: "/admin/text",
    title: "Text",
    body: "Change any wording on the site, and reset a block back to the original.",
  },
  {
    href: "/admin/details",
    title: "Hours & contact",
    body: "Opening hours, phone, email and address — these also update Google.",
  },
];

export default async function AdminHome() {
  await requireLogin();

  const [seasons, strip] = await Promise.all([
    getSeasons(),
    getPhotos("strip"),
  ]);
  const upcoming = seasons.filter((s) => s.status === "upcoming");

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-medium tracking-brand sm:text-4xl">
        What would you like to change?
      </h1>

      <dl className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 ring-1 ring-teal/10">
          <dt className="text-xs font-semibold uppercase tracking-brand text-oak">
            Upcoming seasons
          </dt>
          <dd className="mt-1 text-2xl font-medium">{upcoming.length}</dd>
        </div>
        <div className="rounded-2xl bg-white p-5 ring-1 ring-teal/10">
          <dt className="text-xs font-semibold uppercase tracking-brand text-oak">
            Seasons in total
          </dt>
          <dd className="mt-1 text-2xl font-medium">{seasons.length}</dd>
        </div>
        <div className="rounded-2xl bg-white p-5 ring-1 ring-teal/10">
          <dt className="text-xs font-semibold uppercase tracking-brand text-oak">
            Photos in the strip
          </dt>
          <dd className="mt-1 text-2xl font-medium">{strip.length}</dd>
        </div>
      </dl>

      {upcoming.length === 0 && (
        <p className="mt-8 rounded-2xl border-2 border-oak/30 bg-cream/50 px-6 py-5">
          Nothing is marked as upcoming, so the Events page is showing the
          between-seasons message.{" "}
          <Link href="/admin/events" className="font-medium underline underline-offset-4">
            Add next season
          </Link>{" "}
          when the dates are settled.
        </p>
      )}

      <ul className="mt-8 grid gap-5 sm:grid-cols-2">
        {cards.map((card) => (
          <li key={card.href}>
            <Link
              href={card.href}
              className="block h-full rounded-2xl bg-white p-7 ring-1 ring-teal/10 transition-shadow hover:shadow-md"
            >
              <h2 className="text-lg font-medium tracking-brand">{card.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-teal/75">{card.body}</p>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-sm text-teal/60">
        Changes appear on the site within a few seconds of saving.
      </p>
    </div>
  );
}
