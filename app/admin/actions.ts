"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import {
  LOCKOUT_MINUTES,
  endSession,
  recordAttempt,
  requireLogin,
  startSession,
  tooManyAttempts,
  verifyPassword,
} from "@/lib/auth";
import { hasDatabase, sql } from "@/lib/db";

/** Refresh every public page that reads from the database. */
function revalidateSite() {
  for (const path of ["/", "/about", "/events", "/contact"]) {
    revalidatePath(path);
  }
}

async function clientIp(): Promise<string> {
  const h = await headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    h.get("x-real-ip") ??
    "unknown"
  );
}

export async function login(_prev: string | null, formData: FormData) {
  const password = String(formData.get("password") ?? "");

  if (!hasDatabase) {
    return "The database isn't connected yet, so the admin area can't run. Set DATABASE_URL in Vercel.";
  }

  const ip = await clientIp();

  if (await tooManyAttempts(ip)) {
    return `Too many attempts. Try again in ${LOCKOUT_MINUTES} minutes.`;
  }

  const stored = process.env.ADMIN_PASSWORD_HASH;
  if (!stored) return "No admin password is configured on the server.";

  if (!(await verifyPassword(password, stored))) {
    await recordAttempt(ip, false);
    return "That password isn't right.";
  }

  await recordAttempt(ip, true);
  await startSession();
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin/login");
}

// ------------------------------------------------------------------ text
export async function saveText(formData: FormData) {
  await requireLogin();
  const entries = [...formData.entries()].filter(([k]) => k.startsWith("text:"));

  for (const [field, raw] of entries) {
    const key = field.slice(5);
    const value = String(raw);
    await sql`
      insert into content (key, value) values (${key}, ${value})
      on conflict (key) do update set value = excluded.value, updated_at = now()
    `;
  }
  revalidateSite();
}

/** Drop an override so the block returns to its default wording. */
export async function resetText(formData: FormData) {
  await requireLogin();
  const key = String(formData.get("key") ?? "");
  await sql`delete from content where key = ${key}`;
  revalidateSite();
}

// -------------------------------------------------------------- settings
export async function saveSettings(formData: FormData) {
  await requireLogin();
  const value = {
    phone: String(formData.get("phone") ?? ""),
    email: String(formData.get("email") ?? ""),
    hoursLabel: String(formData.get("hoursLabel") ?? ""),
    hoursOpens: String(formData.get("hoursOpens") ?? ""),
    hoursCloses: String(formData.get("hoursCloses") ?? ""),
    addressStreet: String(formData.get("addressStreet") ?? ""),
    addressLocality: String(formData.get("addressLocality") ?? ""),
    addressRegion: String(formData.get("addressRegion") ?? ""),
    addressPostcode: String(formData.get("addressPostcode") ?? ""),
    facebook: String(formData.get("facebook") ?? ""),
    videoCredit: String(formData.get("videoCredit") ?? ""),
  };
  await sql`
    insert into settings (key, value) values ('site', ${JSON.stringify(value)}::jsonb)
    on conflict (key) do update set value = excluded.value, updated_at = now()
  `;
  revalidateSite();
}

// ---------------------------------------------------------------- events
export async function createSeason(formData: FormData) {
  await requireLogin();
  const year = Number(formData.get("year") ?? new Date().getFullYear());
  const label = String(formData.get("label") ?? `${year} Season`);
  const details = String(formData.get("details") ?? "")
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);

  await sql`
    insert into seasons (year, label, status, details, sort_order)
    values (${year}, ${label}, 'upcoming', ${JSON.stringify(details)}::jsonb, ${-year})
  `;
  revalidateSite();
}

export async function updateSeason(formData: FormData) {
  await requireLogin();
  const id = Number(formData.get("id"));
  const label = String(formData.get("label") ?? "");
  const status = String(formData.get("status") ?? "upcoming");
  const details = String(formData.get("details") ?? "")
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);

  await sql`
    update seasons
    set label = ${label},
        status = ${status === "past" ? "past" : "upcoming"},
        details = ${JSON.stringify(details)}::jsonb,
        updated_at = now()
    where id = ${id}
  `;
  revalidateSite();
}

export async function deleteSeason(formData: FormData) {
  await requireLogin();
  await sql`delete from seasons where id = ${Number(formData.get("id"))}`;
  revalidateSite();
}

export async function createDate(formData: FormData) {
  await requireLogin();
  const seasonId = Number(formData.get("seasonId"));
  const rows = (await sql`
    select coalesce(max(sort_order), -1) + 1 as next from season_dates where season_id = ${seasonId}
  `) as { next: number }[];

  await sql`
    insert into season_dates
      (season_id, date_label, kind, event_name, acts, genre, high_tide, time_label, sort_order)
    values (
      ${seasonId},
      ${String(formData.get("date") ?? "")},
      ${String(formData.get("kind") ?? "DJs") === "Musicians" ? "Musicians" : "DJs"},
      ${String(formData.get("event") ?? "") || null},
      ${String(formData.get("acts") ?? "")},
      ${String(formData.get("genre") ?? "") || null},
      ${String(formData.get("highTide") ?? "") || null},
      ${String(formData.get("time") ?? "") || null},
      ${rows[0]?.next ?? 0}
    )
  `;
  revalidateSite();
}

export async function updateDate(formData: FormData) {
  await requireLogin();
  await sql`
    update season_dates set
      date_label = ${String(formData.get("date") ?? "")},
      kind = ${String(formData.get("kind") ?? "DJs") === "Musicians" ? "Musicians" : "DJs"},
      event_name = ${String(formData.get("event") ?? "") || null},
      acts = ${String(formData.get("acts") ?? "")},
      genre = ${String(formData.get("genre") ?? "") || null},
      high_tide = ${String(formData.get("highTide") ?? "") || null},
      time_label = ${String(formData.get("time") ?? "") || null}
    where id = ${Number(formData.get("id"))}
  `;
  revalidateSite();
}

export async function deleteDate(formData: FormData) {
  await requireLogin();
  await sql`delete from season_dates where id = ${Number(formData.get("id"))}`;
  revalidateSite();
}

// ---------------------------------------------------------------- photos
const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

/**
 * Uploads land in Postgres and are served by /media/[id]. That keeps image
 * hosting to the one credential the site already needs, rather than adding a
 * bucket with its own keys.
 */
export async function uploadPhoto(formData: FormData) {
  await requireLogin();

  const slot = String(formData.get("slot") ?? "strip");
  const alt = String(formData.get("alt") ?? "").trim();
  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    throw new Error("Choose an image to upload.");
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Images must be JPEG, PNG or WebP.");
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error("That image is larger than 8MB. Please shrink it first.");
  }
  if (!alt) {
    throw new Error("Please describe the photo so screen readers can read it.");
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const id = crypto.randomUUID();

  // decode(...,'hex') keeps this portable across the Neon HTTP driver and pg,
  // which disagree about how a Buffer parameter binds to bytea.
  await sql`
    insert into uploads (id, mime, bytes, size_bytes, original_name)
    values (${id}, ${file.type}, decode(${bytes.toString("hex")}, 'hex'),
            ${bytes.length}, ${file.name})
  `;

  const next = (await sql`
    select coalesce(max(sort_order), -1) + 1 as next from photos where slot = ${slot}
  `) as { next: number }[];

  await sql`
    insert into photos (slot, url, alt, sort_order)
    values (${slot}, ${`/media/${id}/`}, ${alt}, ${next[0]?.next ?? 0})
  `;
  revalidateSite();
}

export async function updatePhotoAlt(formData: FormData) {
  await requireLogin();
  await sql`
    update photos set alt = ${String(formData.get("alt") ?? "")}, updated_at = now()
    where id = ${Number(formData.get("id"))}
  `;
  revalidateSite();
}

export async function movePhoto(formData: FormData) {
  await requireLogin();
  const id = Number(formData.get("id"));
  const up = String(formData.get("direction")) === "up";

  const rows = (await sql`select slot, sort_order from photos where id = ${id}`) as {
    slot: string;
    sort_order: number;
  }[];
  const current = rows[0];
  if (!current) return;

  // Find the row immediately above or below, then swap the two sort orders.
  const neighbour = (up
    ? await sql`
        select id, sort_order from photos
        where slot = ${current.slot} and sort_order < ${current.sort_order}
        order by sort_order desc limit 1`
    : await sql`
        select id, sort_order from photos
        where slot = ${current.slot} and sort_order > ${current.sort_order}
        order by sort_order asc limit 1`) as {
    id: number;
    sort_order: number;
  }[];

  if (!neighbour[0]) return;
  await sql`update photos set sort_order = ${neighbour[0].sort_order} where id = ${id}`;
  await sql`update photos set sort_order = ${current.sort_order} where id = ${neighbour[0].id}`;
  revalidateSite();
}

export async function deletePhoto(formData: FormData) {
  await requireLogin();
  const id = Number(formData.get("id"));
  const rows = (await sql`select url from photos where id = ${id}`) as { url: string }[];

  await sql`delete from photos where id = ${id}`;
  // Clean up the stored bytes too, if this row owned an upload.
  const url = rows[0]?.url ?? "";
  if (url.startsWith("/media/")) {
    await sql`delete from uploads where id = ${url.slice(7).replace(/\/$/, "")}`;
  }
  revalidateSite();
}

/**
 * Copy the built-in defaults into the database for a slot, so the owner has
 * real rows to reorder and edit rather than an empty list.
 */
export async function adoptDefaults(formData: FormData) {
  await requireLogin();
  const slot = String(formData.get("slot") ?? "");
  const existing = (await sql`select count(*)::int as n from photos where slot = ${slot}`) as {
    n: number;
  }[];
  if ((existing[0]?.n ?? 0) > 0) return;

  const { defaultContent } = await import("@/data/defaults");
  const defaults = defaultContent.photos[slot] ?? [];
  for (const [i, photo] of defaults.entries()) {
    await sql`
      insert into photos (slot, url, alt, sort_order)
      values (${slot}, ${photo.url}, ${photo.alt}, ${i})
    `;
  }
  revalidateSite();
}
