import { requireLogin } from "@/lib/auth";
import { sql } from "@/lib/db";
import { defaultContent } from "@/data/defaults";
import {
  createDate,
  createSeason,
  deleteDate,
  deleteSeason,
  updateDate,
  updateSeason,
} from "@/app/admin/actions";
import { AdminPage, Field, SaveButton, inputClass } from "@/components/admin/Field";

export const dynamic = "force-dynamic";

type SeasonRow = {
  id: number;
  year: number;
  label: string;
  status: "upcoming" | "past";
  details: string[];
};

type DateRow = {
  id: number;
  season_id: number;
  date_label: string;
  kind: string;
  event_name: string | null;
  acts: string;
  genre: string | null;
  high_tide: string | null;
  time_label: string | null;
};

async function seedFromDefaults() {
  "use server";
  await requireLogin();
  for (const [i, season] of defaultContent.seasons.entries()) {
    const inserted = (await sql`
      insert into seasons (year, label, status, details, sort_order)
      values (${season.year}, ${season.label}, ${season.status},
              ${JSON.stringify(season.details)}::jsonb, ${i})
      returning id
    `) as { id: number }[];

    for (const [j, d] of season.dates.entries()) {
      await sql`
        insert into season_dates
          (season_id, date_label, kind, event_name, acts, genre, high_tide, time_label, sort_order)
        values (${inserted[0].id}, ${d.date}, ${d.type}, ${d.event ?? null},
                ${d.acts}, ${d.genre ?? null}, ${d.highTide}, ${d.time ?? null}, ${j})
      `;
    }
  }
}

export default async function EventsAdmin() {
  await requireLogin();

  const seasons = (await sql`
    select id, year, label, status, details from seasons order by sort_order, year desc
  `) as SeasonRow[];
  const dates = (await sql`
    select id, season_id, date_label, kind, event_name, acts, genre, high_tide, time_label
    from season_dates order by season_id, sort_order, id
  `) as DateRow[];

  return (
    <AdminPage
      title="Events"
      intro="A season marked Upcoming shows in full at the top of the Events page. Mark it Past when it's over and it moves down automatically."
    >
      {seasons.length === 0 && (
        <div className="rounded-2xl border-2 border-oak/30 bg-cream/50 p-7">
          <h2 className="text-lg font-medium tracking-brand">
            Nothing in the database yet
          </h2>
          <p className="mt-2 text-teal/75">
            The site is showing the 2026 and 2025 line-ups from its built-in
            copy. Import them here so you can edit them.
          </p>
          <form action={seedFromDefaults} className="mt-5">
            <SaveButton>Import the existing line-ups</SaveButton>
          </form>
        </div>
      )}

      {seasons.map((season) => (
        <section key={season.id} className="rounded-2xl bg-white p-7 ring-1 ring-teal/10">
          <form action={updateSeason} className="space-y-5">
            <input type="hidden" name="id" value={season.id} />
            <div className="grid gap-5 sm:grid-cols-[1fr_10rem]">
              <Field label="Season name">
                <input name="label" defaultValue={season.label} className={inputClass} />
              </Field>
              <Field label="Status">
                <select name="status" defaultValue={season.status} className={inputClass}>
                  <option value="upcoming">Upcoming</option>
                  <option value="past">Past</option>
                </select>
              </Field>
            </div>
            <Field
              label="Details strip"
              hint="Separate each item with a | — e.g. Live music | Food until 7pm | ID required"
            >
              <input
                name="details"
                defaultValue={(season.details ?? []).join(" | ")}
                className={inputClass}
              />
            </Field>
            <SaveButton>Save season</SaveButton>
          </form>

          <h3 className="mt-9 text-sm font-semibold uppercase tracking-brand text-oak">
            Dates
          </h3>
          <ul className="mt-4 space-y-4">
            {dates
              .filter((d) => d.season_id === season.id)
              .map((d) => (
                <li key={d.id} className="rounded-xl bg-sand/60 p-5">
                  <form action={updateDate} className="grid gap-4 sm:grid-cols-2">
                    <input type="hidden" name="id" value={d.id} />
                    <Field label="Date" hint="As printed, e.g. Fri 5 Jun">
                      <input name="date" defaultValue={d.date_label} className={inputClass} />
                    </Field>
                    <Field label="Type">
                      <select name="kind" defaultValue={d.kind} className={inputClass}>
                        <option>DJs</option>
                        <option>Musicians</option>
                      </select>
                    </Field>
                    <Field label="Event name" hint="Optional">
                      <input name="event" defaultValue={d.event_name ?? ""} className={inputClass} />
                    </Field>
                    <Field label="Acts">
                      <input name="acts" defaultValue={d.acts} className={inputClass} />
                    </Field>
                    <Field label="Genre" hint="Optional">
                      <input name="genre" defaultValue={d.genre ?? ""} className={inputClass} />
                    </Field>
                    <Field label="High tide">
                      <input name="highTide" defaultValue={d.high_tide ?? ""} className={inputClass} />
                    </Field>
                    <Field label="Set times" hint="Only if different from the season default">
                      <input name="time" defaultValue={d.time_label ?? ""} className={inputClass} />
                    </Field>
                    <div className="flex items-end gap-3">
                      <SaveButton>Save date</SaveButton>
                    </div>
                  </form>
                  <form action={deleteDate} className="mt-3">
                    <input type="hidden" name="id" value={d.id} />
                    <button
                      type="submit"
                      className="text-sm text-teal/60 underline underline-offset-4 hover:text-ray"
                    >
                      Remove this date
                    </button>
                  </form>
                </li>
              ))}
          </ul>

          <form action={createDate} className="mt-6 grid gap-4 rounded-xl border-2 border-dashed border-teal/20 p-5 sm:grid-cols-2">
            <input type="hidden" name="seasonId" value={season.id} />
            <Field label="Date">
              <input name="date" placeholder="Fri 5 Jun" required className={inputClass} />
            </Field>
            <Field label="Type">
              <select name="kind" className={inputClass}>
                <option>DJs</option>
                <option>Musicians</option>
              </select>
            </Field>
            <Field label="Event name">
              <input name="event" placeholder="Sunset Sessions" className={inputClass} />
            </Field>
            <Field label="Acts">
              <input name="acts" placeholder="Kieran Higgs & Jimbo Jones" className={inputClass} />
            </Field>
            <Field label="Genre">
              <input name="genre" placeholder="Balearic beats" className={inputClass} />
            </Field>
            <Field label="High tide">
              <input name="highTide" placeholder="9pm" className={inputClass} />
            </Field>
            <div className="sm:col-span-2">
              <SaveButton>Add date</SaveButton>
            </div>
          </form>

          <form action={deleteSeason} className="mt-6 border-t border-teal/10 pt-5">
            <input type="hidden" name="id" value={season.id} />
            <button
              type="submit"
              className="text-sm text-teal/60 underline underline-offset-4 hover:text-ray"
            >
              Delete the whole {season.label} season
            </button>
          </form>
        </section>
      ))}

      <form action={createSeason} className="rounded-2xl border-2 border-dashed border-teal/25 p-7">
        <h2 className="text-lg font-medium tracking-brand">Add a season</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          <Field label="Year">
            <input
              name="year"
              type="number"
              defaultValue={new Date().getFullYear() + 1}
              className={inputClass}
            />
          </Field>
          <Field label="Season name">
            <input
              name="label"
              placeholder={`${new Date().getFullYear() + 1} Season`}
              className={inputClass}
            />
          </Field>
          <Field label="Details strip" hint="Separate with |">
            <input
              name="details"
              placeholder="Live music | Food until 7pm | ID required"
              className={inputClass}
            />
          </Field>
        </div>
        <div className="mt-5">
          <SaveButton>Add season</SaveButton>
        </div>
      </form>
    </AdminPage>
  );
}
