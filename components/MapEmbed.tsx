import { site, addressLine } from "@/data/site";

/** Google Map for the cafe. Used on the home page and the contact page. */
export default function MapEmbed({
  className = "h-[380px] sm:h-[450px]",
}: {
  className?: string;
}) {
  return (
    <iframe
      title={`Map showing ${site.name} at ${addressLine}`}
      src={site.mapsEmbed}
      width="600"
      height="450"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className={`w-full border-0 ${className}`}
    />
  );
}
