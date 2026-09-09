"use client";

import { useState } from "react";
import type { Season } from "@/data/events";

export default function SeasonTabs({ seasons }: { seasons: Season[] }) {
  const [active, setActive] = useState(0);
  const season = seasons[active];

  return (
    <div>
      {/* Tab list */}
      <div
        role="tablist"
        aria-label="Sundown Sessions seasons"
        className="flex flex-wrap justify-center gap-3"
      >
        {seasons.map((s, i) => (
          <button
            key={s.year}
            type="button"
            role="tab"
            id={`season-tab-${s.year}`}
            aria-selected={i === active}
            aria-controls={`season-panel-${s.year}`}
            onClick={() => setActive(i)}
            className={`rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-brand transition-colors ${
              i === active
                ? "bg-teal text-white"
                : "border-2 border-teal/25 text-teal/70 hover:border-teal/50 hover:text-teal"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Panel — styled like the posters */}
      <div
        role="tabpanel"
        id={`season-panel-${season.year}`}
        aria-labelledby={`season-tab-${season.year}`}
        className="bg-sunset mt-10 overflow-hidden rounded-3xl text-white shadow-lg"
      >
        <div className="px-6 pt-10 text-center sm:px-10">
          <h3 className="text-3xl font-medium tracking-brand sm:text-4xl">
            Sundown Sessions {season.year}
          </h3>
          <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[11px] font-semibold uppercase tracking-brand text-cream sm:text-xs">
            {season.details.map((detail, i) => (
              <li key={detail} className="flex items-center gap-3">
                {i > 0 && (
                  <span aria-hidden="true" className="text-cream/40">
                    |
                  </span>
                )}
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Column headings — hidden on mobile, where each date is a stacked row */}
        <div className="mt-10 px-6 sm:px-10">
          <div className="hidden border-b border-white/30 pb-3 text-[11px] font-semibold uppercase tracking-brand text-cream sm:grid sm:grid-cols-[9.5rem_6rem_1fr_6rem] sm:gap-4">
            <span>Date</span>
            <span>Type</span>
            <span>Event / Acts</span>
            <span className="text-right">High tide</span>
          </div>

          <ul className="pb-10">
            {season.dates.map((date) => (
              <li
                key={`${date.date}-${date.acts}`}
                className="border-b border-white/20 py-5 last:border-b-0 sm:grid sm:grid-cols-[9.5rem_6rem_1fr_6rem] sm:items-baseline sm:gap-4"
              >
                <p className="font-medium tracking-brand text-cream">
                  {date.date}
                  {date.time && (
                    <span className="block text-xs font-normal tracking-normal text-white/90">
                      {date.time}
                    </span>
                  )}
                </p>

                <p className="mt-1 text-xs uppercase tracking-brand text-white/90 sm:mt-0">
                  {date.type}
                </p>

                <div className="mt-2 sm:mt-0">
                  {date.event && (
                    <p className="font-medium text-white">{date.event}</p>
                  )}
                  <p className="text-sm text-white/90">{date.acts}</p>
                  {date.genre && (
                    <p className="mt-0.5 text-sm italic text-white/80">
                      {date.genre}
                    </p>
                  )}
                </div>

                <p className="mt-2 text-sm text-white/80 sm:mt-0 sm:text-right">
                  <span className="uppercase tracking-brand text-[11px] text-cream sm:hidden">
                    High tide{" "}
                  </span>
                  {date.highTide}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
