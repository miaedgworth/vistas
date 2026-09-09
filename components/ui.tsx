import Link from "next/link";
import type { ReactNode } from "react";

/** Small uppercase label that sits above a section heading. */
export function SectionLabel({
  children,
  tone = "teal",
}: {
  children: ReactNode;
  tone?: "teal" | "light";
}) {
  return (
    <p
      className={`text-xs font-semibold uppercase tracking-brand ${
        tone === "light" ? "text-cream" : "text-oak"
      }`}
    >
      {children}
    </p>
  );
}

/**
 * Page title. Sits on the page background with no banner behind it — the
 * heading still carries the page's h1 for search engines and screen readers.
 */
export function PageHeader({
  label,
  title,
  intro,
}: {
  label: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="mx-auto max-w-3xl px-4 pt-14 text-center sm:px-6 sm:pt-20">
      <SectionLabel>{label}</SectionLabel>
      <h1 className="mt-4 text-4xl font-medium tracking-brand sm:text-5xl">
        {title}
      </h1>
      {intro && (
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-teal/80 sm:text-lg">
          {intro}
        </p>
      )}
    </header>
  );
}

export function Button({
  href,
  children,
  variant = "solid",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "light";
  external?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-xs font-semibold uppercase tracking-brand transition-colors";
  const styles = {
    solid: "bg-ray text-white hover:bg-gold",
    outline: "border-2 border-teal text-teal hover:bg-teal hover:text-white",
    light: "bg-white text-teal hover:bg-cream",
  }[variant];

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${styles}`}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}

/** Warm callout panel used for the private-bookings and beach-clean notes. */
export function Callout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border-2 border-oak/40 bg-cream/50 p-7 sm:p-9">
      <h3 className="text-xl font-medium tracking-brand sm:text-2xl">{title}</h3>
      <div className="mt-3 text-base leading-relaxed text-teal/85">{children}</div>
    </div>
  );
}
