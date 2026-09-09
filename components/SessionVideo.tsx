import { site } from "@/data/site";

/**
 * Facebook video of a Sundown Session, set to start on its own.
 *
 * Browsers only allow autoplay when the video is muted, so it starts muted —
 * viewers unmute with the player's own control. If Facebook declines to
 * autoplay (it makes its own call on data saver, reduced motion and mobile),
 * the player still loads and plays on tap, and the link underneath always
 * works.
 */
export default function SessionVideo() {
  // The plugin wants a bare post URL — the share link's tracking query
  // (?mibextid=...) trips it up.
  const href = site.facebookVideo.split("?")[0];

  const src =
    "https://www.facebook.com/plugins/video.php?" +
    new URLSearchParams({
      href,
      show_text: "false",
      autoplay: "true",
      mute: "1",
      width: "560",
    }).toString();

  return (
    <figure className="m-0">
      <div className="overflow-hidden rounded-3xl bg-teal/5 shadow-sm ring-1 ring-teal/10">
        <iframe
          title="Video of a Sundown Session at Vistas Beach Cafe"
          src={src}
          className="aspect-video w-full border-0"
          style={{ overflow: "hidden" }}
          scrolling="no"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        />
      </div>
      <figcaption className="mt-4 text-center text-sm text-teal/70">
        Starts muted —{" "}
        <a
          href={site.facebookVideo}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-oak underline-offset-4 hover:text-ray"
        >
          watch it on Facebook
        </a>{" "}
        for sound.
      </figcaption>
    </figure>
  );
}
