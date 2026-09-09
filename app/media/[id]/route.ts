import { sql } from "@/lib/db";

/**
 * Serves an uploaded image out of Postgres.
 *
 * Uploads are immutable — a replacement gets a fresh id — so this can be
 * cached hard. The CDN then serves it and the database is hit once.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const rows = (await sql`
    select mime, bytes, size_bytes from uploads where id = ${id}
  `) as { mime: string; bytes: Buffer | Uint8Array | string; size_bytes: number }[];

  const row = rows[0];
  if (!row) return new Response("Not found", { status: 404 });

  // pg hands back a Buffer; the Neon HTTP driver hands back a "\\x…" hex string.
  const body =
    typeof row.bytes === "string"
      ? Buffer.from((row.bytes as string).replace(/^\\x/, ""), "hex")
      : row.bytes instanceof Uint8Array
        ? row.bytes
        : new Uint8Array(row.bytes);

  return new Response(body as BodyInit, {
    headers: {
      "Content-Type": row.mime,
      "Content-Length": String(body.byteLength),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
