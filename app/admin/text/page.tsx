import { requireLogin } from "@/lib/auth";
import { getContent } from "@/lib/content";
import { defaultContent } from "@/data/defaults";
import { resetText, saveText } from "@/app/admin/actions";
import { AdminPage, SaveButton, inputClass } from "@/components/admin/Field";

export const dynamic = "force-dynamic";

/** Editable blocks, grouped the way the pages read. */
const groups: { title: string; keys: [string, string][] }[] = [
  {
    title: "Home — hero & cards",
    keys: [
      ["home.hero.subhead", "Line under the logo"],
      ["home.hero.cta", "Button label"],
      ["home.card1.title", "Card 1 title"],
      ["home.card1.body", "Card 1 text"],
      ["home.card2.title", "Card 2 title"],
      ["home.card2.body", "Card 2 text"],
      ["home.card3.title", "Card 3 title"],
      ["home.card3.body", "Card 3 text"],
    ],
  },
  {
    title: "Home — introduction",
    keys: [
      ["home.intro.label", "Small label above"],
      ["home.intro.heading", "Heading"],
      ["home.intro.body", "Paragraph"],
      ["home.intro.note", "Highlighted note"],
      ["home.strip.label", "Photo strip label"],
      ["home.strip.heading", "Photo strip heading"],
      ["home.findus.note", "Line under the address"],
    ],
  },
  {
    title: "Home — Clean for Ice Cream",
    keys: [
      ["home.clean.label", "Small label above"],
      ["home.clean.heading", "Heading"],
      ["home.clean.intro", "Introduction"],
      ["home.clean.step1.title", "Step 1 title"],
      ["home.clean.step1.body", "Step 1 text"],
      ["home.clean.step2.title", "Step 2 title"],
      ["home.clean.step2.body", "Step 2 text"],
      ["home.clean.step3.title", "Step 3 title"],
      ["home.clean.step3.body", "Step 3 text"],
    ],
  },
  {
    title: "About",
    keys: [
      ["about.label", "Small label above"],
      ["about.title", "Page heading"],
      ["about.intro", "Introduction"],
      ["about.cafe.label", "Section label"],
      ["about.cafe.heading", "Section heading"],
      ["about.cafe.p1", "First paragraph"],
      ["about.cafe.p2", "Second paragraph"],
      ["about.cafe.p3", "Third paragraph"],
      ["about.feature1.title", "Feature 1 title"],
      ["about.feature1.body", "Feature 1 text"],
      ["about.feature2.title", "Feature 2 title"],
      ["about.feature2.body", "Feature 2 text"],
      ["about.feature3.title", "Feature 3 title"],
      ["about.feature3.body", "Feature 3 text"],
      ["about.merch.title", "Merch box title"],
      ["about.merch.body", "Merch box text"],
      ["about.closing.note", "Closing note"],
    ],
  },
  {
    title: "Events",
    keys: [
      ["events.label", "Small label above"],
      ["events.title", "Page heading"],
      ["events.intro", "Introduction"],
      ["events.upcoming.label", "Upcoming label"],
      ["events.upcoming.heading", "Upcoming heading"],
      ["events.empty.p1", "Between seasons — first line"],
      ["events.empty.p2", "Between seasons — second line"],
      ["events.video.label", "Video label"],
      ["events.video.heading", "Video heading"],
      ["events.past.label", "Past events label"],
      ["events.past.heading", "Past events heading"],
      ["events.past.intro", "Past events introduction"],
      ["events.bookings.title", "Private bookings title"],
      ["events.bookings.body", "Private bookings text"],
    ],
  },
  {
    title: "Contact",
    keys: [
      ["contact.label", "Small label above"],
      ["contact.title", "Page heading"],
      ["contact.intro", "Introduction"],
      ["contact.noreservations.title", "No reservations title"],
      ["contact.noreservations.body", "No reservations text"],
      ["contact.private.title", "Private events title"],
    ],
  },
];

export default async function TextPage() {
  await requireLogin();
  const content = await getContent();

  return (
    <AdminPage
      title="Text"
      intro="Change any wording on the site. Anything you haven't edited shows its original text; use Reset to put a block back."
    >
      <form action={saveText} className="space-y-10">
        {groups.map((group) => (
          <section key={group.title} className="rounded-2xl bg-white p-7 ring-1 ring-teal/10">
            <h2 className="text-lg font-medium tracking-brand">{group.title}</h2>
            <div className="mt-6 space-y-5">
              {group.keys.map(([key, label]) => {
                const value = content[key] ?? "";
                const isDefault = value === defaultContent.text[key];
                const long = value.length > 90;
                return (
                  <div key={key}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="text-xs font-semibold uppercase tracking-brand text-oak">
                        {label}
                      </span>
                      {!isDefault && (
                        <span className="text-xs text-ray">edited</span>
                      )}
                    </div>
                    {long ? (
                      <textarea
                        name={`text:${key}`}
                        defaultValue={value}
                        rows={4}
                        className={`mt-2 ${inputClass}`}
                      />
                    ) : (
                      <input
                        name={`text:${key}`}
                        defaultValue={value}
                        className={`mt-2 ${inputClass}`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
        <div className="sticky bottom-4 rounded-full bg-sand/95 p-2 backdrop-blur">
          <SaveButton>Save all text</SaveButton>
        </div>
      </form>

      <details className="rounded-2xl bg-white p-7 ring-1 ring-teal/10">
        <summary className="cursor-pointer text-lg font-medium tracking-brand">
          Reset a block to its original wording
        </summary>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
          {groups.flatMap((g) =>
            g.keys
              .filter(([key]) => content[key] !== defaultContent.text[key])
              .map(([key, label]) => (
                <li key={key}>
                  <form action={resetText} className="flex items-center gap-3">
                    <input type="hidden" name="key" value={key} />
                    <button
                      type="submit"
                      className="text-sm underline underline-offset-4 hover:text-ray"
                    >
                      Reset “{label}”
                    </button>
                  </form>
                </li>
              )),
          )}
        </ul>
        <p className="mt-4 text-sm text-teal/60">
          Only blocks you've changed appear here.
        </p>
      </details>
    </AdminPage>
  );
}
