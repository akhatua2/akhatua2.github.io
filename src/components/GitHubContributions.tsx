"use client";

import { useEffect, useState } from "react";

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface GitHubContributionsProps {
  username: string;
  showStats?: boolean;
}

export default function GitHubContributions({
  username,
  showStats = true,
}: GitHubContributionsProps) {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);
  const [selectedDay, setSelectedDay] = useState<{
    date: string;
    count: number;
  } | null>(null);

  useEffect(() => {
    // Fetch contribution data from our API route
    fetch(`/api/github-contributions?username=${username}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.error("Failed to fetch GitHub contributions:", data.error);
          setLoading(false);
          return;
        }

        // Create a map of contributions by date for quick lookup
        const contributionMap = new Map<string, ContributionDay>();
        data.contributions.forEach((day: ContributionDay) => {
          contributionMap.set(day.date, day);
        });

        // Generate full 2025 calendar (Jan 1 to Dec 31)
        const allDays2025: ContributionDay[] = [];
        const startDate = new Date("2025-01-01");
        const endDate = new Date("2025-12-31");

        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
          const dateStr = d.toISOString().split("T")[0];
          const contribution = contributionMap.get(dateStr);

          if (contribution) {
            allDays2025.push(contribution);
          } else {
            // Empty day (no contributions)
            allDays2025.push({
              date: dateStr,
              count: 0,
              level: 0,
            });
          }
        }

        // Sort by date to ensure proper order for waterfall animation
        const sortedDays = allDays2025.sort((a, b) => {
          if (!a.date) return 1;
          if (!b.date) return -1;
          return a.date.localeCompare(b.date);
        });

        setContributions(sortedDays);
        setTotalContributions(data.total);
        setLoading(false);
        setDataLoaded(true);

        // Start animation after a brief moment to ensure boxes are rendered
        setTimeout(() => {
          setStartAnimation(true);
        }, 50);
      })
      .catch((err) => {
        console.error("Failed to fetch GitHub contributions:", err);
        setLoading(false);
      });
  }, [username]);

  // Create a date-to-index map for waterfall animation ordering
  const dateToIndexMap = new Map<string, number>();
  const startDate = new Date("2025-01-01");
  let dateIndex = 0;

  // Map all dates from Jan 1 to Dec 31, 2025
  for (let d = new Date(startDate); d <= new Date("2025-12-31"); d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split("T")[0];
    dateToIndexMap.set(dateStr, dateIndex++);
  }

  // Group contributions by week, starting from the Monday of the week containing Jan 1, 2025
  // Show complete weeks, with empty days before Jan 1 if needed (but no Dec 2024 dates)
  const weeks: ContributionDay[][] = [];
  const dayOfWeek = startDate.getDay(); // 0 = Sunday, 1 = Monday, etc.

  // Calculate empty days needed before Jan 1 to start on Monday
  const emptyDaysBefore = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const allDays: ContributionDay[] = [];

  // Add empty days at the beginning (these are just placeholders, not Dec 2024 dates)
  for (let i = 0; i < emptyDaysBefore; i++) {
    allDays.push({
      date: "", // Empty date for placeholder days
      count: 0,
      level: 0,
    });
  }

  // Add all 2025 days (already sorted by date)
  allDays.push(...contributions);

  // Add empty days at the end to complete the last week (for future dates in 2026 if needed)
  const remainingDays = allDays.length % 7;
  if (remainingDays > 0) {
    const daysToAdd = 7 - remainingDays;
    for (let i = 0; i < daysToAdd; i++) {
      allDays.push({
        date: "", // Empty date for placeholder days
        count: 0,
        level: 0,
      });
    }
  }

  // Group into weeks of 7 days
  for (let i = 0; i < allDays.length; i += 7) {
    weeks.push(allDays.slice(i, i + 7));
  }

  // Get month labels - show month at the start of each month
  const monthLabels: string[] = [];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let lastMonth = -1;

  weeks.forEach((week, _weekIndex) => {
    // Find the first day in the week that has a date (skip empty placeholder days)
    const firstDayWithDate = week.find((day) => day.date);

    if (firstDayWithDate?.date) {
      const date = new Date(firstDayWithDate.date);
      const month = date.getMonth();
      const dayOfMonth = date.getDate();

      // Show month label if it's the first week of the month (day <= 7)
      if (month !== lastMonth && dayOfMonth <= 7) {
        monthLabels.push(monthNames[month]);
        lastMonth = month;
      } else {
        monthLabels.push("");
      }
    } else {
      monthLabels.push("");
    }
  });

  const getColor = (level: number, isLoading: boolean = false) => {
    // Show very light gray shimmer while loading (almost white)
    if (isLoading) {
      return "bg-gray-100 dark:bg-gray-900 shimmer";
    }

    // Colors from white (no contributions) to darkest green (most contributions)
    // Level 0: white (no contributions) - Less
    // Level 1: lightest green (1-3 contributions)
    // Level 2: light green (4-6 contributions)
    // Level 3: medium green (7-9 contributions)
    // Level 4: dark green (10+ contributions) - More
    const colors = [
      "bg-white dark:bg-white", // Level 0: white (Less) - no border
      "bg-[#9be9a8] dark:bg-[#9be9a8]", // Level 1: lightest green
      "bg-[#40c463] dark:bg-[#40c463]", // Level 2: light green
      "bg-[#30a14e] dark:bg-[#30a14e]", // Level 3: medium green
      "bg-[#216e39] dark:bg-[#216e39]", // Level 4: dark green (More)
    ];
    return colors[level] || colors[0];
  };

  // Generate placeholder weeks structure for loading state
  const generatePlaceholderWeeks = (): ContributionDay[][] => {
    const placeholderWeeks: ContributionDay[][] = [];
    const startDate = new Date("2025-01-01");
    const dayOfWeek = startDate.getDay();
    const emptyDaysBefore = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    // Calculate total days needed (empty days before + 365 days of 2025 + empty days after)
    const totalDays = emptyDaysBefore + 365;
    const totalWeeks = Math.ceil(totalDays / 7);

    for (let i = 0; i < totalWeeks; i++) {
      const week: ContributionDay[] = [];
      for (let j = 0; j < 7; j++) {
        week.push({
          date: "",
          count: 0,
          level: 0,
        });
      }
      placeholderWeeks.push(week);
    }

    return placeholderWeeks;
  };

  const displayWeeks = loading ? generatePlaceholderWeeks() : weeks;
  const displayMonthLabels = loading ? Array(displayWeeks.length).fill("") : monthLabels;

  return (
    <div className="p-6" aria-busy={loading} aria-live="polite">
      {showStats && (
        <div className="mb-4 flex items-center justify-between">
          <div>
            {loading ? (
              <div className="h-4 w-48 bg-gray-100 dark:bg-gray-900 rounded animate-pulse">
                <span className="sr-only">Loading contribution data...</span>
              </div>
            ) : (
              <p className="text-sm text-muted">
                <span className="font-semibold text-foreground">
                  {totalContributions.toLocaleString()}
                </span>{" "}
                contributions in 2025
              </p>
            )}
          </div>
        </div>
      )}

      <div className="w-full">
        <div className="grid grid-cols-[auto_1fr] gap-1 w-full">
          {/* Day labels */}
          <div className="space-y-[2px] pt-2">
            {["Mon", "", "Wed", "", "Fri", "", ""].map((day, i) => (
              <div
                key={day || `empty-day-${i}`}
                className="h-[10px] text-[9px] text-muted leading-none"
                style={{ visibility: day ? "visible" : "hidden" }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Contribution grid */}
          <div className="w-full min-w-0">
            {/* Month labels */}
            <div
              className="grid gap-[2px] mb-[2px] w-full"
              style={{ gridTemplateColumns: `repeat(${displayWeeks.length}, minmax(0, 1fr))` }}
            >
              {displayMonthLabels.map((month, i) => (
                <div
                  key={month || `month-${i}`}
                  className="text-[9px] text-muted leading-none h-[10px] overflow-visible"
                  style={{ minWidth: month ? "20px" : "auto" }}
                >
                  {month}
                </div>
              ))}
            </div>

            {/* Contribution squares */}
            <div
              className="grid gap-[2px] w-full"
              style={{ gridTemplateColumns: `repeat(${displayWeeks.length}, minmax(0, 1fr))` }}
            >
              {displayWeeks.map((week, weekIndex) => {
                const weekKey = week.find((d) => d.date)?.date || `week-${weekIndex}`;
                return (
                  <div key={weekKey} className="flex flex-col gap-[2px]">
                    {week.map((day, dayIndex) => {
                      const dayKey = day.date || `empty-${weekIndex}-${dayIndex}`;
                      const isEmpty = !day.date;
                      // Calculate delay based on date order (waterfall effect from first to last date)
                      let delay = 0;
                      let globalIndex = 0;

                      if (day.date && dateToIndexMap.has(day.date)) {
                        // Use the date index for actual dates (Jan 1 = 0, Dec 31 = 364)
                        globalIndex = dateToIndexMap.get(day.date) || 0;
                        delay = globalIndex * 2; // 10ms per day for more visible sequential animation
                      } else if (isEmpty) {
                        // Empty days at start/end - calculate based on their position
                        // Empty days before Jan 1 come first (negative or early index)
                        const weekStartIndex = weekIndex * 7;
                        const positionInWeek = dayIndex;
                        globalIndex = weekStartIndex + positionInWeek;
                        delay = globalIndex * 10;
                      }

                      // During loading: show gray shimmer (opacity 1)
                      // When animation starts: fade in sequentially from Jan 1 to Dec 31
                      const isAnimating = startAnimation && dataLoaded && !loading;

                      return (
                        <button
                          key={dayKey}
                          type="button"
                          disabled={isEmpty || loading}
                          className={`h-[10px] w-full rounded-[2px] ${getColor(day.level, loading)} ${isEmpty ? "" : "hover:ring-1 hover:ring-accent cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-background"} ${isEmpty ? "cursor-default" : ""}`}
                          style={{
                            aspectRatio: "1",
                            opacity: loading ? 1 : isAnimating ? 1 : dataLoaded ? 0 : 1, // Start at 0, animate to 1
                            transition: isAnimating
                              ? `opacity 200ms ease-out ${delay}ms, background-color 300ms ease-out ${delay}ms`
                              : "none",
                          }}
                          aria-label={
                            isEmpty || loading
                              ? undefined
                              : `${day.count} contribution${day.count !== 1 ? "s" : ""} on ${new Date(day.date).toLocaleDateString()}`
                          }
                          title={
                            isEmpty || loading
                              ? ""
                              : `${day.count} contributions on ${new Date(day.date).toLocaleDateString()}`
                          }
                          onClick={() => {
                            if (!isEmpty && !loading) {
                              setSelectedDay({ date: day.date, count: day.count });
                            }
                          }}
                          onKeyDown={(e) => {
                            if ((e.key === "Enter" || e.key === " ") && !isEmpty && !loading) {
                              e.preventDefault();
                              setSelectedDay({ date: day.date, count: day.count });
                            }
                          }}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-2 text-xs text-muted">
        <span>Less</span>
        <div className="flex gap-[2px]">
          {[0, 1, 2, 3, 4].map((level) => (
            <div key={level} className={`h-[10px] w-[10px] rounded-[2px] ${getColor(level)}`} />
          ))}
        </div>
        <span>More</span>
      </div>

      {/* Selected day info */}
      {selectedDay && (
        <div
          className="mt-4 p-3 bg-muted/50 rounded-lg text-sm"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="font-semibold text-foreground">
            {selectedDay.count} contribution{selectedDay.count !== 1 ? "s" : ""} on{" "}
            {new Date(selectedDay.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      )}
    </div>
  );
}
