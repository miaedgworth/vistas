import { seasons } from "@/data/events";
import type { Season } from "@/data/events";
import type { SiteSettings } from "@/lib/content";

/**
 * The site's factory settings.
 *
 * Everything the admin area can edit falls back to these, so the site renders
 * fully even against an empty database. Editing a value in the admin area
 * writes a row that overrides the entry here; deleting that row restores it.
 */
export const defaultContent: {
  settings: SiteSettings;
  text: Record<string, string>;
  photos: Record<string, { url: string; alt: string }[]>;
  seasons: Season[];
} = {
  settings: {
    phone: "01481 252513",
    email: "vistasgsy@gmail.com",
    hoursLabel: "8am–5pm, every day",
    hoursOpens: "08:00",
    hoursCloses: "17:00",
    addressStreet: "Vazon Rd",
    addressLocality: "Castel",
    addressRegion: "Guernsey",
    addressPostcode: "GY5 7BF",
    facebook:
      "https://www.facebook.com/people/Vistas-Beach-Cafe/61554066410905/",
    videoCredit: "Ross at @skywavephotography",
  },

  text: {
    // ---------------------------------------------------------------- home
    "home.hero.subhead": "A beach cafe on Vazon Bay, right on the sand.",
    "home.hero.cta": "Find us",

    "home.card1.title": "Open 8am–5pm daily",
    "home.card1.body": "Breakfast through to late afternoon, every day of the week.",
    "home.card2.title": "Dine in & outdoor seating",
    "home.card2.body": "Cosy inside, or out in the sea air with your feet almost in the sand.",
    "home.card3.title": "Roof terrace views",
    "home.card3.body": "The best seat on the west coast for watching the sun go down.",

    "home.intro.label": "On the beach at Vazon",
    "home.intro.heading": "Locally prepared food, coffee and cakes",
    "home.intro.body":
      "Vistas sits right on Vazon Bay on Guernsey's west coast. Everything is prepared locally — proper breakfasts, lunches, good coffee and a counter full of cakes. Eat inside, spread out on the outdoor seating, or take the stairs up to the roof terrace, where the view runs the whole way across the bay.",
    "home.intro.note": "No bookings needed — just turn up.",

    "home.strip.label": "A look inside",
    "home.strip.heading": "Golden hour, every day",

    "home.clean.label": "Our beach project",
    "home.clean.heading": "Clean for Ice Cream",
    "home.clean.intro":
      "Fill a bag with litter from Vazon beach, bring it back to the cafe, and swap it for a free ice cream.",
    "home.clean.step1.title": "Collect a bag",
    "home.clean.step1.body":
      "Pop into the cafe and pick up a beach-clean bag and a litter picker. They're free to borrow — just ask at the counter.",
    "home.clean.step2.title": "Pick litter",
    "home.clean.step2.body":
      "Head out along Vazon beach and fill it up. Anything you find counts, and the tideline is usually the best hunting ground.",
    "home.clean.step3.title": "Swap it for ice cream",
    "home.clean.step3.body":
      "Bring your rubbish back to the cafe and we'll swap it for a free ice cream. That's the whole deal.",

    "home.findus.note": "Walk-ins only — no reservations.",

    // --------------------------------------------------------------- about
    "about.label": "About",
    "about.title": "A beach cafe on Vazon Bay",
    "about.intro":
      "Right on the sand on Guernsey's west coast, open every day of the year from 8am until 5pm.",
    "about.cafe.label": "The cafe",
    "about.cafe.heading": "Somewhere to settle in",
    "about.cafe.p1":
      "Vistas sits on Vazon Bay, on the west coast of Guernsey — the side of the island the sun sets over. There's indoor dining for when the weather turns, outdoor seating for when it doesn't, and a roof terrace above it all with a view straight across the bay.",
    "about.cafe.p2":
      "The food is prepared locally, and the coffee and cakes are the reason plenty of people come in the first place. Breakfast from 8am, lunch through the middle of the day, and cake whenever you like.",
    "about.cafe.p3":
      "We don't take reservations. It's walk-ins only, every day — find a table, order at the counter, stay as long as you want.",
    "about.feature1.title": "Indoor dining",
    "about.feature1.body":
      "Timber, rattan and warm light — comfortable whatever the weather is doing outside.",
    "about.feature2.title": "Outdoor seating",
    "about.feature2.body": "Tables in the sea air, a few steps from the sand at Vazon.",
    "about.feature3.title": "Roof terrace",
    "about.feature3.body":
      "Up the stairs for the widest view of the bay, and the best sunset on the island.",
    "about.merch.title": "Vistas merch & gift cards",
    "about.merch.body":
      "Reusable cups, keyrings and gift cards are available in the cafe — worth a look on your way past the counter, and an easy present for anyone who loves this stretch of coast.",
    "about.closing.note": "No reservations — just turn up.",

    // -------------------------------------------------------------- events
    "events.label": "What's on at Vistas",
    "events.title": "Events",
    "events.intro":
      "Sundown Sessions are our summer DJ and live-music evenings — music into the evening while the sun drops over the bay.",
    "events.upcoming.label": "What's coming up",
    "events.upcoming.heading": "Upcoming events",
    "events.empty.p1": "That's the season done — the last Sundown Session has been and gone.",
    "events.empty.p2":
      "Next summer's dates usually land in the spring, and they go up on Facebook first. The cafe is open as normal in the meantime, 8am–5pm every day.",
    "events.video.label": "A taste of it",
    "events.video.heading": "Watch a session",
    "events.past.label": "Previous seasons",
    "events.past.heading": "Past events",
    "events.past.intro":
      "How the Sundown Sessions have run: music into the evening, food served until 7pm, a mobile beer bar, over-18s later on with ID, and the high tide time alongside each date.",
    "events.bookings.title": "Available for private bookings and events",
    "events.bookings.body": "Planning something? Get in touch and we'll talk it through.",

    // ------------------------------------------------------------- contact
    "contact.label": "Contact",
    "contact.title": "Find us at Vazon",
    "contact.intro":
      "On the beach on Guernsey's west coast, open every day from 8am until 5pm.",
    "contact.noreservations.title": "No reservations",
    "contact.noreservations.body":
      "We don't take bookings for tables — it's walk-ins only, every day. Just turn up and find a spot.",
    "contact.private.title": "Private events",
  },

  photos: {
    hero: [
      {
        url: "/photos/hero-sunset.jpg",
        alt: "Sunset over Vazon Bay from the Vistas roof terrace, with a busy crowd on the deck and the sea beyond",
      },
    ],
    strip: [
      {
        url: "/photos/cake-counter.jpg",
        alt: "The cake counter at Vistas: an almond slice, chocolate slices and sugared doughnuts in the glass display",
      },
      {
        url: "/photos/golden-hour-seating.jpg",
        alt: "Rattan chairs and timber slat walls inside Vistas, lit by low golden-hour sun",
      },
      {
        url: "/photos/inside-the-cafe.jpg",
        alt: "Inside Vistas, looking past the rattan seating to the windows and the bay beyond",
      },
    ],
    about: [
      {
        url: "/photos/golden-hour-seating.jpg",
        alt: "Rattan chairs and timber slat walls inside Vistas, lit by low golden-hour sun",
      },
    ],
    merch: [
      {
        url: "/photos/merch.jpg",
        alt: "Vistas reusable cups, gift cards and a keyring on a timber table",
      },
    ],
  },

  seasons,
};
