"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface CalendarEvent {
  date: string;
  dateSort: string;
  title: string;
  description: string;
  category: "Teaching" | "Conference" | "Mentoring" | "Talk" | "Travel" | "Project";
  location?: string;
  link?: string;
  day?: number; // Specific day of month if available
}

export default function Calendar() {
  const [currentYear, setCurrentYear] = useState(2025);

  const events: CalendarEvent[] = [
    {
      date: "Fall 2025",
      dateSort: "2025-09",
      title: "Teaching CS224V",
      description: "Teaching CS224V this quarter.",
      category: "Teaching",
      location: "Stanford University",
      day: 1, // Start of fall quarter
    },
    {
      date: "Nov 2025",
      dateSort: "2025-11",
      title: "EMNLP 2025",
      description: "EMNLP 2025 in Suzhou; presented Wikipedia inconsistency work.",
      category: "Conference",
      location: "Suzhou, China",
      day: 3, // Approximate conference start
    },
    {
      date: "Oct 2025",
      dateSort: "2025-10",
      title: "WikiFix Launch",
      description: "Launched WikiFix; 30+ contributors flagged hundreds of issues.",
      category: "Project",
      location: "Stanford",
      link: "https://wikifix.genie.stanford.edu/",
      day: 15, // Approximate
    },
    {
      date: "Sep 2025",
      dateSort: "2025-09",
      title: "Wikimedia Research Talk",
      description: "Talk at Wikimedia Research on Wikipedia inconsistency work.",
      category: "Talk",
      location: "Wikimedia Research",
      day: 20, // Approximate
    },
    {
      date: "Summer 2025",
      dateSort: "2025-06",
      title: "Mentoring at ALgoverse",
      description: "Mentored students at ALgoverse over the summer.",
      category: "Mentoring",
      location: "ALgoverse",
      day: 1, // Start of summer
    },
  ];

  const getCategoryColor = (category: CalendarEvent["category"]) => {
    const colors: Record<CalendarEvent["category"], string> = {
      Teaching: "bg-blue-100 text-blue-800",
      Conference: "bg-purple-100 text-purple-800",
      Mentoring: "bg-green-100 text-green-800",
      Talk: "bg-orange-100 text-orange-800",
      Travel: "bg-pink-100 text-pink-800",
      Project: "bg-indigo-100 text-indigo-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  // Hand-drawn circle used to emphasize specific dates
  const scribbleCircle =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      "<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'><circle cx='40' cy='40' r='26' fill='none' stroke='%23000' stroke-width='1.4' stroke-dasharray='7 5' opacity='0.7'/></svg>"
    );

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const eventsForYear = events.filter((event) => {
    const [year] = event.dateSort.split("-").map(Number);
    return year === currentYear;
  });

  const eventsByMonth = monthNames.map((_, monthIndex) =>
    eventsForYear
      .filter((event) => event.dateSort.split("-")[1] === String(monthIndex + 1).padStart(2, "0"))
      .sort((a, b) => (a.day || 0) - (b.day || 0))
  );

  const renderMonth = (monthIndex: number) => {
    const monthEvents = eventsByMonth[monthIndex];
    const hasEvents = monthEvents.length > 0;

    return (
      <motion.article
        key={monthIndex}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: monthIndex * 0.03 }}
        className="border-2 border-foreground bg-background shadow-[3px_3px_0px_0px_rgb(0,0,0)] motion-safe:transition-all motion-reduce:transition-none"
      >
        {/* Month Header */}
        <div className="border-b-2 border-foreground px-4 py-3 bg-foreground text-background">
          <h3
            className="text-sm sm:text-base font-bold text-center"
            style={{ fontFamily: "var(--font-snowy), cursive" }}
          >
            {monthNames[monthIndex]}
          </h3>
        </div>

        <div className="p-4 space-y-3">
          {hasEvents ? (
            monthEvents.map((event, idx) => (
              <div
                key={`${event.title}-${event.date}-${idx}`}
                className="border border-dashed border-foreground/40 rounded-lg p-2.5 space-y-1"
              >
                <div className="flex flex-wrap items-center gap-2">
                  {event.day && (
                    <span
                      className="inline-flex items-center justify-center w-8 h-8 text-[11px] font-semibold text-foreground"
                      style={{
                        backgroundImage: `url(${scribbleCircle})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        fontFamily: "var(--font-space)",
                      }}
                    >
                      {event.day}
                    </span>
                  )}
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded ${getCategoryColor(event.category)}`}
                  >
                    {event.category}
                  </span>
                  {event.location && (
                    <span className="text-[10px] text-muted">· {event.location}</span>
                  )}
                </div>
                <h4
                  className="text-sm sm:text-base font-bold text-foreground"
                  style={{ fontFamily: "var(--font-snowy), cursive" }}
                >
                  {event.link ? (
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline hover:text-accent"
                    >
                      {event.title}
                    </a>
                  ) : (
                    event.title
                  )}
                </h4>
                <p
                  className="text-xs sm:text-sm text-foreground/80 leading-relaxed"
                  style={{ fontFamily: "var(--font-snowy), cursive" }}
                >
                  {event.description}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted italic">No events this month.</p>
          )}
        </div>
      </motion.article>
    );
  };

  return (
    <section id="calendar" className="max-w-[65rem] mx-auto px-6 py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="motion-safe:transition-all motion-reduce:transition-none"
      >
        <div className="border-2 border-foreground bg-background shadow-[4px_4px_0px_0px_rgb(0,0,0)]">
          {/* Year Navigation */}
          <div className="flex items-center justify-between gap-3 px-4 py-3 border-b-2 border-foreground">
            <button
              type="button"
              onClick={() => setCurrentYear(currentYear - 1)}
              className="border border-foreground px-3 py-1 bg-background hover:bg-foreground hover:text-background transition font-semibold focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              style={{ fontFamily: "var(--font-space)" }}
              aria-label={`Previous year, go to ${currentYear - 1}`}
            >
              <span aria-hidden="true">←</span>
            </button>
            <h2
              className="text-2xl sm:text-3xl font-bold text-foreground text-center flex-1"
              style={{ fontFamily: "var(--font-snowy), cursive" }}
            >
              {currentYear}
            </h2>
            <button
              type="button"
              onClick={() => setCurrentYear(currentYear + 1)}
              className="border border-foreground px-3 py-1 bg-background hover:bg-foreground hover:text-background transition font-semibold focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              style={{ fontFamily: "var(--font-space)" }}
              aria-label={`Next year, go to ${currentYear + 1}`}
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>

          {/* Calendar Grid - 3 columns, 4 rows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 p-4">
            {monthNames.map((_, monthIndex) => renderMonth(monthIndex))}
          </div>

          {/* Legend */}
          <div className="px-4 pb-4 pt-4 border-t border-foreground/40">
            <h3
              className="text-sm sm:text-base font-bold mb-3 text-foreground"
              style={{ fontFamily: "var(--font-space)" }}
            >
              Event Categories
            </h3>
            <div className="flex flex-wrap gap-2">
              {(["Teaching", "Conference", "Mentoring", "Talk", "Travel", "Project"] as const).map(
                (category) => (
                  <div
                    key={category}
                    className={`text-xs px-2 py-1 rounded ${getCategoryColor(category)}`}
                  >
                    {category}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
