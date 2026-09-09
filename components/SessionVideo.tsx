/**
 * Drone footage of a Sundown Session.
 *
 * Autoplays muted — browsers only permit autoplay without sound — and loops.
 * Controls are left on so viewers can unmute, and `playsInline` stops iOS
 * taking the video fullscreen the moment it starts. The poster frame shows
 * while the file loads.
 */
export default function SessionVideo({ credit }: { credit: string }) {
  return (
    <figure className="m-0">
      <div className="overflow-hidden rounded-3xl bg-teal/5 shadow-sm ring-1 ring-teal/10">
        <video
          className="h-auto w-full"
          poster="/video/sundown-session-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="metadata"
          width={1272}
          height={720}
          aria-label="Drone footage of a Sundown Session at Vistas Beach Cafe, looking down on a busy roof terrace at sunset"
        >
          {/* VP9 first: ~30% smaller for browsers that take it. Safari and
              anything else falls through to H.264. */}
          <source src="/video/sundown-session.webm" type="video/webm" />
          <source src="/video/sundown-session.mp4" type="video/mp4" />
          Your browser can&rsquo;t play this video.
        </video>
      </div>
      {credit && (
        <figcaption className="mt-4 text-center text-xs text-teal/60">
          Video by {credit}
        </figcaption>
      )}
    </figure>
  );
}
