import type { ReactNode } from "react";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-brand text-oak">
        {label}
      </span>
      {hint && <span className="mt-1 block text-xs text-teal/60">{hint}</span>}
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

export const inputClass =
  "w-full rounded-xl border-2 border-teal/20 bg-white px-4 py-2.5 text-base focus:border-teal focus:outline-none";

export function SaveButton({ children = "Save" }: { children?: ReactNode }) {
  return (
    <button
      type="submit"
      className="rounded-full bg-teal px-7 py-3 text-xs font-semibold uppercase tracking-brand text-white hover:bg-teal-deep"
    >
      {children}
    </button>
  );
}

export function AdminPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-medium tracking-brand sm:text-4xl">{title}</h1>
      {intro && <p className="mt-3 max-w-2xl text-teal/75">{intro}</p>}
      <div className="mt-10 space-y-10">{children}</div>
    </div>
  );
}
