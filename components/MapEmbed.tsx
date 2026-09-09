import { addressLine, mapsEmbed, type SiteSettings } from "@/lib/content";

/** Google Map for the cafe. Used on the home page and the contact page. */
export default function MapEmbed({
  settings,
  className = "h-[380px] sm:h-[450px]",
}: {
  settings: SiteSettings;
  className?: string;
}) {
  return (
    <iframe
      title={`Map showing Vistas Beach Cafe at ${addressLine(settings)}`}
      src={mapsEmbed(settings)}
      width="600"
      height="450"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className={`w-full border-0 ${className}`}
    />
  );
}
