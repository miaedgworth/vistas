/**
 * Sundown Sessions line-ups.
 *
 * To add next year's season: copy a season object, change `year`, `label`,
 * `details` and `dates`, and put it at the top of `seasons`. The first season
 * in the array is the one the Events page opens on; every later season is
 * shown as a past season. No component changes needed.
 */
export type EventAct = {
  /** Date as shown on the poster, e.g. "Fri 5 Jun" */
  date: string;
  /** "DJs" or "Musicians" */
  type: "DJs" | "Musicians";
  /** Event name, e.g. "Sunset Sessions" — optional */
  event?: string;
  /** Performing acts */
  acts: string;
  /** Genre / short description — optional */
  genre?: string;
  /** High tide time for that evening */
  highTide: string;
  /** Set times, when they differ from the season default — optional */
  time?: string;
};

export type Season = {
  year: number;
  label: string;
  /** The strip of details printed across the top of the poster */
  details: string[];
  dates: EventAct[];
};

export const seasons: Season[] = [
  {
    year: 2026,
    label: "2026 Season",
    details: [
      "Live music",
      "Food until 7pm",
      "Mobile beer bar",
      "Over 18s only from 7pm",
      "ID required",
    ],
    dates: [
      {
        date: "Fri 5 Jun",
        type: "DJs",
        event: "Sunset Sessions",
        acts: "Kieran Higgs, Jimbo Jones + Colin Falla",
        genre: "Balearic beats",
        highTide: "10pm",
      },
      {
        date: "Fri 12 Jun",
        type: "DJs",
        event: "West Coast Wind Down",
        acts: "Lime & Dan",
        genre: "Reggae, dub, soul & hip hop",
        highTide: "5pm",
      },
      {
        date: "Sat 13 Jun",
        time: "2–6pm",
        type: "DJs",
        event: "Aurora Guernsey Edition",
        acts: "UK DJ Mista Tee",
        genre: "R&B, hip hop & reggae",
        highTide: "6pm",
      },
      {
        date: "Sat 11 Jul",
        type: "DJs",
        event: "Sunset Sessions",
        acts: "Kieran Higgs & Jimbo Jones (+guests)",
        genre: "Balearic beats",
        highTide: "4pm",
      },
      {
        date: "Fri 17 Jul",
        type: "DJs",
        event: "West Coast Wind Down",
        acts: "Lime & Dan",
        genre: "Reggae, dub, soul & hip hop",
        highTide: "10pm",
      },
      {
        date: "Sat 25 Jul",
        type: "DJs",
        event: "Selection x Dub Sessions x Rave Era",
        acts: "Dogger & Slay (UK), Vague, Pressure + Vit. D",
        highTide: "4pm",
      },
      {
        date: "Sat 1 Aug",
        type: "DJs",
        event: "End of Summer Session",
        acts: "Kieran Higgs & Jimbo Jones (+guests)",
        genre: "Balearic beats",
        highTide: "9pm",
      },
      {
        date: "Fri 7 Aug",
        type: "Musicians",
        event: "Acoustic",
        acts: "Iain and Adam",
        genre: "Upbeat acoustic covers",
        highTide: "12am",
      },
      {
        date: "Fri 14 Aug",
        type: "DJs",
        event: "West Coast Wind Down",
        acts: "Lime & Dan",
        genre: "Reggae, dub, soul & hip hop",
        highTide: "9pm",
      },
      {
        date: "Fri 21 Aug",
        type: "DJs",
        event: "Sundown Session",
        acts: "Toby Le Ray & Jordan Galliene",
        genre: "Melodic house",
        highTide: "12am",
      },
    ],
  },
  {
    year: 2025,
    label: "2025 Season",
    details: [
      "Music 5pm–10pm",
      "Food until 7pm",
      "Satellite beer bar",
      "Over 18s from 8pm",
      "ID required",
    ],
    dates: [
      {
        date: "Sun 25 May",
        type: "DJs",
        event: "Weekend Wind Down",
        acts: "Lime & Dan",
        genre: "Reggae, dub, soul & hip hop",
        highTide: "6pm",
      },
      { date: "Fri 6 Jun", type: "Musicians", acts: "Lane and Adam", highTide: "4pm" },
      {
        date: "Fri 27 Jun",
        type: "DJs",
        event: "Sunset Sessions",
        acts: "Kieran Higgs & Jimbo Jones (+guests)",
        genre: "Balearic beats",
        highTide: "9pm",
      },
      { date: "Fri 4 Jul", type: "Musicians", acts: "Lane and Adam", highTide: "8pm" },
      {
        date: "Fri 18 Jul",
        type: "DJs",
        event: "Weekend Wind Down",
        acts: "Lime & Dan",
        genre: "Reggae, dub, soul & hip hop",
        highTide: "12pm",
      },
      {
        date: "Fri 25 Jul",
        type: "DJs",
        event: "Sunset Sessions",
        acts: "Kieran Higgs & Jimbo Jones (+guests)",
        genre: "Balearic beats",
        highTide: "8pm",
      },
      { date: "Fri 8 Aug", type: "DJs", event: "Soul Sessions", acts: "Vit D + Trik", highTide: "8pm" },
      {
        date: "Fri 15 Aug",
        type: "DJs",
        event: "Weekend Wind Down",
        acts: "Lime & Dan",
        genre: "Reggae, dub, soul & hip hop",
        highTide: "11pm",
      },
      {
        date: "Fri 5 Sep",
        type: "DJs",
        event: "End of Summer Session",
        acts: "Kieran Higgs & Jimbo Jones (+guests)",
        genre: "Balearic beats",
        highTide: "6pm",
      },
    ],
  },
];
