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
| `/` | Hero, opening-hours cards, intro, photo strip, Sundown Sessions teaser, Clean for Ice Cream (full section), address + map |
| `/about` | The cafe, seating, merch & gift cards |
| `/events` | Sundown Sessions — tabbed line-ups by season, Facebook video link, private bookings |
| `/contact` | Address, phone, email, Facebook, Google Map, opening hours |

---

## Updating the site

Almost everything you'll want to change lives in two files.

### Events — `data/events.ts`

Line-ups are data, not markup. **Adding next year's season:**

1. Copy an existing season object in the `seasons` array.
2. Change `year`, `label`, `details` (the strip of text across the top of the
   poster) and `dates`.
3. Put the new season **first** in the array.

The first season in the array is the one the Events page opens on; every season
after it is shown as a past season. No component changes needed.

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

Currently in `public/photos/`: `cake-counter.jpg`, `golden-hour-seating.jpg`,
`inside-the-cafe.jpg` (home strip) and `merch.jpg` (About page). They're
resized to 900px wide at quality 78 — plenty for the 4:5 frames, and small
enough to load quickly on mobile data.

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

## Artwork

Two illustrations in `public/images/` are hand-authored SVG in the brand
palette (flat, poster-style, matching the Sundown Sessions look):

- `hero-vazon-sunset.svg` — the home hero
- `beach-clean.svg` — the Clean for Ice Cream section on the home page

They're vector, so they stay sharp at any size and cost a few KB each. Edit
them with any SVG tool, or replace them with photography — both are referenced
from `app/page.tsx`.

Clean for Ice Cream lives on the home page as a full section (anchored at
`#clean-for-ice-cream`) rather than a page of its own, so it isn't in the top
nav. The nav links are the `links` array at the top of `components/Nav.tsx`.

The Google Map is `components/MapEmbed.tsx`, shared by the home and contact
pages. It reads `mapsEmbed` from `data/site.ts` — no API key needed.

`design/brand-src/` holds the SVG marks drawn before the real logo files
arrived. Nothing in the site uses them now; they're kept only as a fallback.

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
