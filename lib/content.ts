import { hasDatabase, sql } from "@/lib/db";
import { defaultContent } from "@/data/defaults";
import type { Season } from "@/data/events";

export type SiteSettings = {
  phone: string;
  email: string;
  hoursLabel: string;
  hoursOpens: string;
  hoursCloses: string;
  addressStreet: string;
  addressLocality: string;
  addressRegion: string;
  addressPostcode: string;
  facebook: string;
  videoCredit: string;
};

export type Photo = {
  id: number;
  slot: string;
  url: string;
  alt: string;
  sortOrder: number;
};

/** Every editable text block, keyed by `page.section.field`. */
export type ContentMap = Record<string, string>;

/**
 * Run a query, but never let a database problem take the site down — an
 * unreachable or unconfigured database falls back to the built-in content.
 */
async function safely<T>(read: () => Promise<T>, fallback: T): Promise<T> {
  if (!hasDatabase) return fallback;
  try {
    return await read();
  } catch (error) {
    console.error("Content read failed, using built-in defaults:", error);
    return fallback;
  }
}

export async function getSettings(): Promise<SiteSettings> {
  return safely(async () => {
    const rows = (await sql`
      select value from settings where key = 'site'
    `) as { value: SiteSettings }[];
    // Merge over the defaults so a partial row still renders a full site.
    return { ...defaultContent.settings, ...(rows[0]?.value ?? {}) };
  }, defaultContent.settings);
}

export async function getContent(): Promise<ContentMap> {
  return safely(async () => {
    const rows = (await sql`select key, value from content`) as {
      key: string;
      value: string;
    }[];
    const stored = Object.fromEntries(rows.map((r) => [r.key, r.value]));
    return { ...defaultContent.text, ...stored };
  }, defaultContent.text);
}

export async function getPhotos(slot: string): Promise<Photo[]> {
  const fallback = (defaultContent.photos[slot] ?? []).map((p, i) => ({
    id: -(i + 1),
    slot,
    ...p,
    sortOrder: i,
  }));

  return safely(async () => {
    const rows = (await sql`
      select id, slot, url, alt, sort_order
      from photos
      where slot = ${slot}
      order by sort_order, id
    `) as {
      id: number;
      slot: string;
      url: string;
      alt: string;
      sort_order: number;
    }[];

    if (rows.length === 0) return fallback;
    return rows.map((r) => ({
      id: r.id,
      slot: r.slot,
      url: r.url,
      alt: r.alt,
      sortOrder: r.sort_order,
    }));
  }, fallback);
}

export async function getSeasons(): Promise<Season[]> {
  return safely(async () => {
    const seasonRows = (await sql`
      select id, year, label, status, details, sort_order
      from seasons order by sort_order, year desc
    `) as {
      id: number;
      year: number;
      label: string;
      status: "upcoming" | "past";
      details: string[];
      sort_order: number;
    }[];

    if (seasonRows.length === 0) return defaultContent.seasons;

    const dateRows = (await sql`
      select season_id, date_label, kind, event_name, acts, genre, high_tide, time_label
      from season_dates order by season_id, sort_order, id
    `) as {
      season_id: number;
      date_label: string;
      kind: "DJs" | "Musicians";
      event_name: string | null;
      acts: string;
      genre: string | null;
      high_tide: string | null;
      time_label: string | null;
    }[];

    return seasonRows.map((s) => ({
      year: s.year,
      label: s.label,
      status: s.status,
      details: s.details ?? [],
      dates: dateRows
        .filter((d) => d.season_id === s.id)
        .map((d) => ({
          date: d.date_label,
          type: d.kind,
          event: d.event_name ?? undefined,
          acts: d.acts,
          genre: d.genre ?? undefined,
          highTide: d.high_tide ?? "",
          time: d.time_label ?? undefined,
        })),
    }));
  }, defaultContent.seasons);
}

/** Address as one line, for the map title and the sr-only footer line. */
export function addressLine(s: SiteSettings): string {
  return `${s.addressStreet}, ${s.addressRegion} ${s.addressPostcode}`;
}

export function telHref(phone: string): string {
  return `tel:+44${phone.replace(/\s/g, "").replace(/^0/, "")}`;
}

export function mapsEmbed(s: SiteSettings): string {
  const q = encodeURIComponent(
    `Vistas Beach Cafe, ${s.addressStreet}, ${s.addressRegion} ${s.addressPostcode}`,
  );
  return `https://www.google.com/maps?q=${q}&output=embed`;
}

export function mapsLink(s: SiteSettings): string {
  const q = encodeURIComponent(
    `Vistas Beach Cafe ${s.addressStreet} ${s.addressRegion} ${s.addressPostcode}`,
  );
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}
