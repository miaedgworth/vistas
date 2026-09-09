import "server-only";
import { createHmac, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cookies } from "next/headers";
import { sql } from "@/lib/db";

const scryptAsync = promisify(scrypt) as (
  password: string,
  salt: Buffer,
  keylen: number,
  options: { N: number; r: number; p: number },
) => Promise<Buffer>;

const SCRYPT = { N: 16384, r: 8, p: 1 };
const COOKIE = "vistas_session";
const SESSION_HOURS = 12;

/** Attempts allowed per IP within the window before we start refusing. */
const MAX_ATTEMPTS = 8;
const WINDOW_MINUTES = 15;

/**
 * Format: `scrypt:<salt hex>:<key hex>`.
 *
 * Colons, not `$` — dotenv expands `$name` when loading .env files, which
 * silently truncates a `$`-separated hash to its first segment.
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const key = await scryptAsync(password, salt, 64, SCRYPT);
  return `scrypt:${salt.toString("hex")}:${key.toString("hex")}`;
}

export async function verifyPassword(
  password: string,
  stored: string,
): Promise<boolean> {
  const [scheme, saltHex, keyHex] = stored.split(":");
  if (scheme !== "scrypt" || !saltHex || !keyHex) return false;

  const expected = Buffer.from(keyHex, "hex");
  const actual = await scryptAsync(
    password,
    Buffer.from(saltHex, "hex"),
    expected.length,
    SCRYPT,
  );
  // Constant-time: a plain === would leak how much of the hash matched.
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

function secret(): string {
  const value = process.env.SESSION_SECRET;
  if (!value) throw new Error("SESSION_SECRET is not set.");
  return value;
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

/** Token is `<expiry ms>.<random>.<hmac>` — stateless, so no session table. */
function createToken(): string {
  const payload = `${Date.now() + SESSION_HOURS * 3600_000}.${randomBytes(16).toString("base64url")}`;
  return `${payload}.${sign(payload)}`;
}

function tokenIsValid(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [expiry, nonce, mac] = parts;
  const expectedMac = Buffer.from(sign(`${expiry}.${nonce}`));
  const givenMac = Buffer.from(mac);
  if (expectedMac.length !== givenMac.length) return false;
  if (!timingSafeEqual(expectedMac, givenMac)) return false;

  return Number(expiry) > Date.now();
}

export async function startSession(): Promise<void> {
  const store = await cookies();
  store.set(COOKIE, createToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_HOURS * 3600,
  });
}

export async function endSession(): Promise<void> {
  (await cookies()).delete(COOKIE);
}

export async function isLoggedIn(): Promise<boolean> {
  return tokenIsValid((await cookies()).get(COOKIE)?.value);
}

/**
 * Guard for every admin page and action. Middleware alone is not enough —
 * server actions are reachable directly, so each one re-checks.
 */
export async function requireLogin(): Promise<void> {
  if (!(await isLoggedIn())) throw new Error("Not signed in.");
}

export async function tooManyAttempts(ip: string): Promise<boolean> {
  const rows = (await sql`
    select count(*)::int as failures
    from login_attempts
    where ip = ${ip}
      and succeeded = false
      and attempted_at > now() - (${WINDOW_MINUTES} || ' minutes')::interval
  `) as { failures: number }[];
  return (rows[0]?.failures ?? 0) >= MAX_ATTEMPTS;
}

export async function recordAttempt(ip: string, succeeded: boolean) {
  await sql`insert into login_attempts (ip, succeeded) values (${ip}, ${succeeded})`;
  // Opportunistic cleanup so the table can't grow without bound.
  await sql`delete from login_attempts where attempted_at < now() - interval '1 day'`;
}

export const LOCKOUT_MINUTES = WINDOW_MINUTES;
