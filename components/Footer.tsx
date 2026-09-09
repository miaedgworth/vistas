import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-teal text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[auto_1fr_auto] md:gap-14">
        <div>
          <Image
            src="/brand/logo-square-white.png"
            alt="Vistas Beach Cafe"
            width={1024}
            height={1024}
            className="h-28 w-28"
          />
        </div>

        <div className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-xs font-semibold uppercase tracking-brand text-gold">
            Find us
          </h2>
          <address className="not-italic text-white/90">
            {site.address.street}
            <br />
            {site.address.region} {site.address.postcode}
          </address>
          <p>
            <a
              href={site.phoneHref}
              className="underline decoration-white/40 underline-offset-4 hover:decoration-gold"
            >
              {site.phone}
            </a>
          </p>
          <p>
            <a
              href={`mailto:${site.email}`}
              className="underline decoration-white/40 underline-offset-4 hover:decoration-gold"
            >
              {site.email}
            </a>
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <h2 className="text-xs font-semibold uppercase tracking-brand text-gold">
            Opening hours
          </h2>
          <p className="text-white/90">{site.hours.label}</p>
          <p className="text-white/70">No bookings needed.</p>
          <a
            href={site.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 pt-1 hover:text-gold"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.5 2.9h-2.3v7A10 10 0 0 0 22 12Z" />
            </svg>
            <span>Vistas Beach Cafe on Facebook</span>
          </a>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} Vistas Beach Cafe</p>
          <p>
            <Link href="/contact" className="hover:text-white">
              Private event enquiries welcome
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
