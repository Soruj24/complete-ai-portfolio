"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

function generateCalendarDays(year: number, month: number) {
  const daysInMonth = new Date(year, month, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => ({
    date: `${year}-${String(month).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`,
    count: 0,
    level: 0 as const,
  }));
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const levelColors = [
  "bg-surface-hover",
  "bg-accent/15",
  "bg-accent/30",
  "bg-accent/60",
  "bg-accent",
];

export function CalendarHeatmap() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);

  const days = useMemo(() => generateCalendarDays(year, month), [year, month]);

  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDay = new Date(year, month - 1, 1).getDay();

  const prevMonth = () => {
    if (month === 1) { setMonth(12); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (month === 12) { setMonth(1); setYear((y) => y + 1); }
    else setMonth((m) => m + 1);
  };

  const goToday = () => {
    setYear(now.getFullYear());
    setMonth(now.getMonth() + 1);
  };

  const totalCount = days.reduce((s, d) => s + d.count, 0);
  const avgCount = Math.round(totalCount / days.length);
  const maxCount = Math.max(...days.map((d) => d.count));

  const grid: ({ day: number; count: number; level: number } | null)[][] = [];
  let dayCounter = 0;

  for (let w = 0; w < Math.ceil((firstDay + daysInMonth) / 7); w++) {
    const week: ({ day: number; count: number; level: number } | null)[] = [];
    for (let d = 0; d < 7; d++) {
      if ((w === 0 && d < firstDay) || dayCounter >= daysInMonth) {
        week.push(null);
      } else {
        const dayData = days[dayCounter];
        week.push({ day: dayData ? parseInt(dayData.date.split("-")[2]) : dayCounter + 1, count: dayData?.count || 0, level: dayData?.level || 0 });
        dayCounter++;
      }
    }
    grid.push(week);
  }

  return (
    <Card className="border-border-subtle bg-surface">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-accent" />
              Calendar Heatmap
            </CardTitle>
            <CardDescription>Daily visitor activity</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={prevMonth} className="h-7 w-7 rounded-lg">
                <ChevronLeft className="h-3.5 w-3.5" />
              </Button>
              <span className="text-xs font-semibold text-text-primary min-w-[100px] text-center">
                {MONTHS[month - 1]} {year}
              </span>
              <Button variant="ghost" size="icon" onClick={nextMonth} className="h-7 w-7 rounded-lg">
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
            <Button variant="outline" size="sm" onClick={goToday} className="h-7 text-[10px] rounded-lg border-border-subtle px-2">
              Today
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4 text-[10px] text-text-tertiary">
          <span>Total: <strong className="text-text-primary">{totalCount.toLocaleString()}</strong></span>
          <span>Avg: <strong className="text-text-primary">{avgCount.toLocaleString()}</strong>/day</span>
          <span>Peak: <strong className="text-text-primary">{maxCount.toLocaleString()}</strong></span>
        </div>
        <div className="overflow-x-auto">
          {/* Day labels */}
          <div className="flex gap-0.5 mb-1">
            <div className="w-8 shrink-0" />
            {DAYS.map((d) => (
              <div key={d} className="flex-1 text-[8px] text-text-tertiary text-center font-medium">{d}</div>
            ))}
          </div>
          {/* Grid */}
          {grid.map((week, wi) => (
            <div key={wi} className="flex gap-0.5 mb-0.5">
              <div className="w-8 shrink-0 text-[8px] text-text-tertiary flex items-center justify-center font-medium">
                {wi * 7 + 1}-{Math.min((wi + 1) * 7, daysInMonth)}
              </div>
              {week.map((day, di) => (
                <div key={di} className="flex-1 aspect-square">
                  {day ? (
                    <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: (wi * 7 + di) * 0.005 }}
                      className={cn(
                        "w-full h-full rounded-sm cursor-pointer transition-all hover:ring-2 hover:ring-accent/50 relative group",
                        levelColors[day.level],
                      )}
                    >
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block z-10">
                        <div className="bg-surface border border-border-subtle rounded-lg px-2 py-1 text-[9px] whitespace-nowrap shadow-lg">
                          <strong className="text-text-primary">{day.count.toLocaleString()}</strong>{" "}
                          <span className="text-text-tertiary">visitors on {MONTHS[month - 1]} {day.day}, {year}</span>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="w-full h-full rounded-sm" />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* Legend */}
        <div className="flex items-center justify-end gap-1.5 mt-3 text-[9px] text-text-tertiary">
          <span>Less</span>
          {levelColors.map((color, i) => (
            <div key={i} className={cn("h-3 w-3 rounded-sm", color)} />
          ))}
          <span>More</span>
        </div>
      </CardContent>
    </Card>
  );
}
