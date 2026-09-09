import type { Metadata } from "next";
import Link from "next/link";
import { isLoggedIn } from "@/lib/auth";
import { logout } from "@/app/admin/actions";

export const metadata: Metadata = {
  title: "Admin",
  // Keep the admin area out of search results entirely.
  robots: { index: false, follow: false, nocache: true },
};

const tabs = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/photos", label: "Photos" },
  { href: "/admin/text", label: "Text" },
  { href: "/admin/details", label: "Hours & contact" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const signedIn = await isLoggedIn();

  return (
    <div className="min-h-screen bg-sand">
      {signedIn && (
        <div className="border-b border-teal/15 bg-white">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-4 sm:px-6">
            <span className="text-xs font-semibold uppercase tracking-brand text-oak">
              Vistas admin
            </span>
            <nav aria-label="Admin sections" className="flex flex-wrap gap-x-5 gap-y-2">
              {tabs.map((tab) => (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className="text-sm font-medium hover:text-ray"
                >
                  {tab.label}
                </Link>
              ))}
            </nav>
            <div className="ml-auto flex items-center gap-4">
              <Link href="/" className="text-sm text-teal/70 hover:text-ray">
                View site
              </Link>
              <form action={logout}>
                <button
                  type="submit"
                  className="text-sm font-medium text-teal/70 hover:text-ray"
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
