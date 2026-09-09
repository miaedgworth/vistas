"use client";

import { useActionState } from "react";
import { login } from "@/app/admin/actions";

export default function LoginPage() {
  const [error, formAction, pending] = useActionState(login, null);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-16 sm:px-6">
      <div className="w-full">
        <h1 className="text-3xl font-medium tracking-brand">Vistas admin</h1>
        <p className="mt-3 text-teal/75">Sign in to update the website.</p>

        <form action={formAction} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold uppercase tracking-brand text-oak"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              autoComplete="current-password"
              className="mt-2 w-full rounded-xl border-2 border-teal/20 bg-white px-4 py-3 text-base focus:border-teal focus:outline-none"
            />
          </div>

          {error && (
            <p role="alert" className="rounded-xl bg-ray/15 px-4 py-3 text-sm text-teal">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full bg-teal px-7 py-3.5 text-xs font-semibold uppercase tracking-brand text-white disabled:opacity-60"
          >
            {pending ? "Checking…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
