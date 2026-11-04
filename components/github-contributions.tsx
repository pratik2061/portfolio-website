"use client";

import { useEffect, useState, useMemo } from "react";

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ContributionData {
  total: {
    lastYear?: number;
    [key: string]: number | undefined;
  };
  contributions: ContributionDay[];
  username?: string;
}

interface GithubContributionsProps {
  githubUrl?: string;
}

const MONTH_NAMES = [
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

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function GithubContributions({
  githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL,
}: GithubContributionsProps) {
  const [data, setData] = useState<ContributionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  // Extract username from URL
  const username = useMemo(() => {
    if (!githubUrl) return "pratik2061";
    const clean = githubUrl.replace(/\/+$/, "");
    const parts = clean.split("/");
    return parts[parts.length - 1] || "pratik2061";
  }, [githubUrl]);

  useEffect(() => {
    let cancelled = false;

    async function loadContributions() {
      setLoading(true);
      setError(null);

      try {
        // Try internal route first
        let res = await fetch(`/api/github-contributions?username=${username}`);
        let json: ContributionData;

        if (res.ok) {
          json = await res.json();
        } else {
          // Fallback to direct client call if route fails
          res = await fetch(
            `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
          );
          if (!res.ok) throw new Error("Could not load contribution data");
          json = await res.json();
        }

        if (!cancelled) {
          setData(json);
        }
      } catch (err: unknown) {
        if (!cancelled) {
          const msg = err instanceof Error ? err.message : "Failed to load";
          setError(msg);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadContributions();

    return () => {
      cancelled = true;
    };
  }, [username]);

  // Group contributions into 7-day columns (weeks)
  const { weeks, monthLabels, totalCount, maxCount } = useMemo(() => {
    if (!data?.contributions || data.contributions.length === 0) {
      return { weeks: [], monthLabels: [], totalCount: 0, maxCount: 0 };
    }

    const days = data.contributions;
    const weekCols: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];

    // Check first day's day-of-week to align
    const firstDate = new Date(days[0].date);
    const firstDayIndex = firstDate.getDay();

    // Pad beginning of first week if needed
    for (let i = 0; i < firstDayIndex; i++) {
      currentWeek.push({
        date: "",
        count: 0,
        level: 0,
      });
    }

    let max = 0;
    days.forEach((day) => {
      if (day.count > max) max = day.count;
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weekCols.push(currentWeek);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      weekCols.push(currentWeek);
    }

    // Determine month labels position
    const months: { label: string; weekIndex: number }[] = [];
    let lastMonth = -1;

    weekCols.forEach((week, wIdx) => {
      const validDay = week.find((d) => d.date);
      if (validDay) {
        const d = new Date(validDay.date);
        const m = d.getMonth();
        if (m !== lastMonth) {
          months.push({ label: MONTH_NAMES[m], weekIndex: wIdx });
          lastMonth = m;
        }
      }
    });

    const total =
      data.total.lastYear ??
      days.reduce((acc, curr) => acc + (curr.count || 0), 0);

    return {
      weeks: weekCols,
      monthLabels: months,
      totalCount: total,
      maxCount: max,
    };
  }, [data]);

  // Color classes for contribution levels
  const getLevelColor = (level: number, isEmpty?: boolean) => {
    if (isEmpty) return "invisible";
    switch (level) {
      case 1:
        return "bg-emerald-300 dark:bg-emerald-950/90 border border-emerald-400/40 dark:border-emerald-800/40";
      case 2:
        return "bg-emerald-400 dark:bg-emerald-800/90 border border-emerald-500/50 dark:border-emerald-700/50";
      case 3:
        return "bg-emerald-500 dark:bg-emerald-600 border border-emerald-600/60 dark:border-emerald-500/60";
      case 4:
        return "bg-emerald-600 dark:bg-emerald-400 border border-emerald-700 dark:border-emerald-300";
      case 0:
      default:
        return "bg-secondary/20 dark:bg-secondary/40 border border-secondary/30 dark:border-secondary/60 hover:border-tertiary";
    }
  };

  return (
    <section className="w-full pb-6 font-mono">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Telemetry Card Outer Container */}
        <div className="w-full border border-secondary/40 dark:border-secondary bg-neutral/40 dark:bg-primary/50 p-4 sm:p-6 transition-colors">
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-secondary/30 dark:border-secondary/60 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-semibold tracking-wider text-primary dark:text-neutral">
                // GITHUB.CONTRIBUTIONS
              </span>
              <span className="hidden sm:inline-flex items-center border border-secondary/40 dark:border-secondary px-1.5 py-0.5 text-[11px] text-tertiary">
                @{username}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="border border-secondary/40 dark:border-secondary bg-secondary/15 dark:bg-secondary/30 px-2.5 py-1 text-xs text-primary dark:text-neutral font-medium">
                {loading ? "FETCHING..." : `${totalCount.toLocaleString()} CONTRIBUTIONS (LAST YEAR)`}
              </span>
            </div>
          </div>

          {/* Chart Content Area */}
          <div className="pt-5 w-full">
            {loading ? (
              /* Loading Skeleton */
              <div className="flex flex-col gap-2 py-8 animate-pulse">
                <div className="h-3 w-48 bg-secondary/20 dark:bg-secondary/40 rounded-xs mb-2" />
                <div className="h-28 w-full bg-secondary/15 dark:bg-secondary/30 rounded-xs" />
              </div>
            ) : error ? (
              /* Error State */
              <div className="py-8 text-center text-xs text-tertiary">
                <p>Telemetry stream unavailable ({error}).</p>
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block underline text-primary dark:text-neutral"
                >
                  View directly on GitHub ↗
                </a>
              </div>
            ) : (
              /* Active Contribution Chart */
              <div className="relative w-full">
                {/* Scrollable Graph Container */}
                <div className="overflow-x-auto pb-2 scrollbar-thin w-full">
                  <div className="min-w-[760px] w-full flex flex-col gap-1.5">
                    {/* Month Labels Row */}
                    <div className="flex pl-7 text-[10px] text-tertiary select-none w-full">
                      <div
                        className="grid w-full gap-[3px]"
                        style={{
                          gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))`,
                        }}
                      >
                        {weeks.map((_, wIdx) => {
                          const m = monthLabels.find((ml) => ml.weekIndex === wIdx);
                          return (
                            <div
                              key={wIdx}
                              className="overflow-visible whitespace-nowrap text-left"
                            >
                              {m ? m.label : ""}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Heatmap Grid Row */}
                    <div className="flex w-full items-stretch">
                      {/* Day of Week Labels */}
                      <div className="flex flex-col justify-between text-[9px] text-tertiary pr-2 select-none w-7 shrink-0 leading-none py-[2px]">
                        <span>Mon</span>
                        <span>Wed</span>
                        <span>Fri</span>
                      </div>

                      {/* Weeks Columns Grid */}
                      <div
                        className="grid w-full gap-[3px]"
                        style={{
                          gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))`,
                        }}
                      >
                        {weeks.map((week, wIdx) => (
                          <div key={wIdx} className="flex flex-col gap-[3px]">
                            {week.map((day, dIdx) => (
                              <button
                                key={dIdx}
                                type="button"
                                aria-label={
                                  day.date
                                    ? `${day.count} contributions on ${day.date}`
                                    : "Empty"
                                }
                                onMouseEnter={() => day.date && setHoveredDay(day)}
                                onMouseLeave={() => setHoveredDay(null)}
                                className={`aspect-square w-full rounded-[1px] transition-transform hover:scale-125 hover:z-10 cursor-pointer ${getLevelColor(
                                  day.level,
                                  !day.date
                                )}`}
                              />
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Tooltip Readout */}
                <div className="min-h-[22px] mt-3 flex items-center justify-between text-[11px] border-t border-secondary/20 dark:border-secondary/50 pt-3">
                  <div className="text-tertiary">
                    {hoveredDay ? (
                      <span className="text-primary dark:text-neutral">
                        <strong className="font-semibold text-emerald-500">
                          {hoveredDay.count}
                        </strong>{" "}
                        contribution{hoveredDay.count === 1 ? "" : "s"} on{" "}
                        <span className="font-medium">
                          {new Date(hoveredDay.date + "T00:00:00").toLocaleDateString(
                            undefined,
                            {
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </span>
                    ) : (
                      <span>Hover over squares to inspect activity</span>
                    )}
                  </div>

                  {/* Legend */}
                  <div className="flex items-center gap-1.5 text-[10px] text-tertiary">
                    <span>Less</span>
                    <span className="inline-block h-2.5 w-2.5 rounded-[1px] bg-secondary/20 dark:bg-secondary/40 border border-secondary/30 dark:border-secondary/60" />
                    <span className="inline-block h-2.5 w-2.5 rounded-[1px] bg-emerald-300 dark:bg-emerald-950 border border-emerald-400/40 dark:border-emerald-800/40" />
                    <span className="inline-block h-2.5 w-2.5 rounded-[1px] bg-emerald-400 dark:bg-emerald-800 border border-emerald-500/50 dark:border-emerald-700/50" />
                    <span className="inline-block h-2.5 w-2.5 rounded-[1px] bg-emerald-500 dark:bg-emerald-600 border border-emerald-600/60 dark:border-emerald-500/60" />
                    <span className="inline-block h-2.5 w-2.5 rounded-[1px] bg-emerald-600 dark:bg-emerald-400 border border-emerald-700 dark:border-emerald-300" />
                    <span>More</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

