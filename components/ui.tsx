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

export function PageHeader({
  label,
  title,
  intro,
  variant = "gradient",
}: {
  label: string;
  title: string;
  intro?: string;
  /** "plain" opens the page on the warm sand background instead of the sunset */
  variant?: "gradient" | "plain";
}) {
  const plain = variant === "plain";

  return (
    <header
      className={`relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 ${
        plain ? "border-b border-oak/25 bg-cream/40 text-teal" : "bg-sunset text-white"
      }`}
    >
      {!plain && (
        <div
          aria-hidden="true"
          className="bg-sunset-glow pointer-events-none absolute inset-x-0 bottom-0 h-24"
        />
      )}
      <div className="relative mx-auto max-w-3xl text-center">
        <SectionLabel tone={plain ? "teal" : "light"}>{label}</SectionLabel>
        <h1 className="mt-4 text-4xl font-medium tracking-brand sm:text-5xl">
          {title}
        </h1>
        {intro && (
          <p
            className={`mx-auto mt-6 max-w-2xl text-base leading-relaxed sm:text-lg ${
              plain ? "text-teal/80" : "text-white/90"
            }`}
          >
            {intro}
          </p>
        )}
      </div>
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
