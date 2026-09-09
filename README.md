# Vistas Beach Cafe

Website for **Vistas Beach Cafe**, a beach cafe on Vazon Bay, Guernsey.

Built with **Next.js (App Router)** + **Tailwind CSS v4**, statically exported
(`output: "export"`) so every page is plain HTML — fast on a phone with one bar
of signal on the beach.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static site written to ./out
```

## Pages

| Route | What's on it |
|---|---|
| `/` | Photo hero with the wordmark, opening-hours cards, intro, photo strip, Clean for Ice Cream, address + map |
| `/about` | The cafe, seating, merch & gift cards |
| `/events` | Upcoming events, an autoplaying session video, past seasons as tabbed line-ups, private bookings |
| `/contact` | Address, phone, email, Facebook, Google Map, opening hours |

---

## Updating the site

Almost everything you'll want to change lives in two files.

### Events — `data/events.ts`

Line-ups are data, not markup. **Adding next year's season:**

1. Copy an existing season object in the `seasons` array.
2. Change `year`, `label`, `details` (the strip of text across the top of the
   poster) and `dates`.
3. Set `status: "upcoming"` and put the new season **first** in the array.

The Events page shows every season marked `"upcoming"` in full at the top, and
files everything marked `"past"` under **Past events**. When a season finishes,
change its `status` to `"past"` — that single edit is all it takes, and the
page swaps to the "next summer's dates land in the spring" message on its own
once nothing is upcoming. No component changes needed.

Each date looks like this — `event`, `genre` and `time` are optional:

```ts
{
  date: "Fri 5 Jun",          // as printed on the poster
  type: "DJs",                // "DJs" or "Musicians"
  event: "Sunset Sessions",   // optional event name
  acts: "Kieran Higgs, Jimbo Jones + Colin Falla",
  genre: "Balearic beats",    // optional
  highTide: "10pm",           // high tide that evening
  time: "2–6pm",              // optional, only if it differs from the season default
}
```

### Hours, phone, address — `data/site.ts`

One file drives the nav, footer, contact page, and the `CafeOrCoffeeShop`
structured data Google reads. Change `hours`, `phone`, `email` or `address`
here and every page follows.

> **Note:** `site.url` is used for canonical URLs, the sitemap and the
> OpenGraph image. Update it if the site moves to a custom domain
> (e.g. `https://vistasbeachcafe.gg`).

### Photos — `public/photos/`

The photo strip on the home page is the `photos` array near the top of
`app/page.tsx`. Drop your images into `public/photos/` and point the entries at
them:

```ts
const photos = [
  { src: "/photos/cake-counter.jpg", alt: "The cake counter, with an almond slice and doughnuts" },
  ...
];
```

Currently in `public/photos/`:

| File | Where |
|---|---|
| `hero-sunset.jpg` | Home page hero |
| `cake-counter.jpg`, `golden-hour-seating.jpg`, `inside-the-cafe.jpg` | Home photo strip |
| `golden-hour-seating.jpg` | About page |
| `merch.jpg` | About page, gift-cards callout |

Strip photos are resized to 900px wide at quality 78 — plenty for the 4:5
frames and small enough to load quickly on mobile data.

The hero shows the wordmark rather than a text heading — the `<h1>` wraps
`logo-wordmark.png` and its `alt` text is what search engines and screen
readers read, so keep that alt accurate if you swap the file.

**Replacing the hero:** drop a new landscape photo in as
`public/photos/hero-sunset.jpg`. The hero text sits over the bottom of the
image behind a scrim (`.scrim-hero` in `app/globals.css`), which is weighted to
the foot of the frame so the sky stays vivid. If a new photo is dark at the
bottom or busy behind the text, adjust those gradient stops.

Images are shown in a 4:5 (portrait) frame and cropped to fill, so portrait
photos work best. **Always write a real `alt` description** — it's what screen
readers and search engines read.

### Brand assets — `public/brand/`

| File | Where it's used |
|---|---|
| `logo-wordmark.png` | Nav bar |
| `logo-square-white.png` | Footer |
| `logo-badge-colour.png` | Hero mark, favicon, OG image |

Replacing any of these is a straight file swap — same filename, same place.

All three are derived from the artwork supplied for this build. The badge is
cut out of its white backdrop with a circular alpha mask; the wordmark and
footer mark are keyed off their teal backdrop and stored as greyscale + alpha
PNGs, which keeps the thin line art smooth at nav size. If you have the
original vector files, use those instead — they'll be sharper again.

---

## The session video

`components/SessionVideo.tsx` embeds the Facebook video via Facebook's video
plugin with `autoplay=true`. Browsers only permit autoplay when a video is
muted, so it starts muted and viewers unmute with the player's own control;
Facebook also makes its own call on whether to autoplay (data saver, reduced
motion, some mobile browsers). If it declines, the player still loads and plays
on tap, and the link underneath always works.

The video URL is `facebookVideo` in `data/site.ts`. The component strips the
query string before handing it to the plugin, since share links carry tracking
parameters the plugin chokes on. If the embed ever shows an error, replace it
with the **canonical** post URL — the plugin is happier with
`facebook.com/<page>/videos/<id>` than with a `/share/r/` link.

## Artwork

The site now runs on photography throughout — the illustrated hero and
beach-clean graphics have been retired.

`design/brand-src/` holds the SVG marks drawn before the real logo files
arrived. Nothing in the site uses them; they're kept only as a fallback.

## Colours & type

Defined once as Tailwind theme tokens in `app/globals.css`:

| Token | Hex | Use |
|---|---|---|
| `teal` | `#2A4E5A` | Primary text, nav, footer |
| `ray` / `gold` / `cream` | `#F58A3C` / `#E8A33D` / `#F5DEB8` | Sun and accents |
| `sea` / `sage` | `#8FB3DA` / `#8FC1A7` | Waves |
| `sand` / `oak` | `#F6EFE4` / `#C9A06A` | Content backgrounds, timber |
| `dusk-blue` → `dusk-purple` → `dusk-rose` | `#1E3A8A` → `#5B3FA0` → `#9C4675` | Sunset gradient (`.bg-sunset`) |

> **On the gradient:** the poster pink `#E9A6C6` is too light to carry white
> text (about 2:1 contrast — well under the 4.5:1 needed). Gradients that hold
> text end on `dusk-rose` `#9C4675` instead, which gives 5.9:1. The lighter
> pink is still used as a decorative, text-free glow via `.bg-sunset-glow`.

Type is **Jost** for headings (wide-tracked, matching the VISTAS wordmark) and
**Montserrat** for body, both self-hosted at build time by `next/font`.

## SEO & accessibility

- Per-page `title` / `description`, canonical URLs, `sitemap.xml`, `robots.txt`
- OpenGraph image at `public/og.png` (colour badge on the sunset gradient)
- `CafeOrCoffeeShop` JSON-LD with address, geo, phone and opening hours
- One `<h1>` per page, no skipped heading levels, alt text on every image,
  a skip-to-content link, visible focus rings, and `prefers-reduced-motion`
  respected

## Deploying

Pushes to `main` deploy automatically on Vercel (project `vistas`). The build
command is `npm run build`; output is the static `out/` directory.
