import { neon } from "@neondatabase/serverless";
import { Pool } from "pg";

const url = process.env.DATABASE_URL;

/**
 * Whether the site has a database configured.
 *
 * The public pages fall back to their built-in content when it doesn't, so a
 * missing DATABASE_URL degrades to the original static content rather than
 * breaking the build. Only the admin area strictly requires it.
 */
export const hasDatabase = Boolean(url);

type Sql = (
  strings: TemplateStringsArray,
  ...values: unknown[]
) => Promise<Record<string, unknown>[]>;

/**
 * Neon's HTTP driver in production — no connection to set up per request,
 * which suits serverless. Anything else (a local Postgres for development)
 * goes over TCP through `pg`, behind the same tagged-template interface.
 */
function makeClient(connectionString: string): Sql {
  const isNeonHttp = /\.neon\.tech/.test(connectionString);

  if (isNeonHttp) {
    return neon(connectionString) as unknown as Sql;
  }

  const pool = new Pool({ connectionString, max: 3 });
  return async (strings, ...values) => {
    // Rebuild the template as a parameterised query: $1, $2, … so values are
    // never interpolated into SQL.
    const text = strings.reduce(
      (acc, part, i) => acc + part + (i < values.length ? `$${i + 1}` : ""),
      "",
    );
    const result = await pool.query(text, values);
    return result.rows;
  };
}

const client = url ? makeClient(url) : null;

export const sql: Sql = (strings, ...values) => {
  if (!client) return Promise.reject(new Error("DATABASE_URL is not set."));
  return client(strings, ...values);
};
