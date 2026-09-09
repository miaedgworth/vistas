#!/usr/bin/env node
/**
 * Turn a password into the hash that ADMIN_PASSWORD_HASH expects.
 *
 *   node scripts/set-password.mjs 'your new password'
 *
 * Paste the printed line into Vercel → Settings → Environment Variables,
 * then redeploy. The password itself is never stored anywhere.
 */
import { randomBytes, scrypt } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt);
const password = process.argv[2];

if (!password) {
  console.error("Usage: node scripts/set-password.mjs 'your new password'");
  process.exit(1);
}
if (password.length < 12) {
  console.error("Please choose at least 12 characters.");
  process.exit(1);
}

const salt = randomBytes(16);
const key = await scryptAsync(password, salt, 64, { N: 16384, r: 8, p: 1 });

console.log("\nSet this in Vercel as ADMIN_PASSWORD_HASH:\n");
console.log(`scrypt:${salt.toString("hex")}:${key.toString("hex")}\n`);
