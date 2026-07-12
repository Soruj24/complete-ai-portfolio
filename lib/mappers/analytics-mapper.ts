export function computeChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 1000) / 10;
}

export function getFlagFromCode(code: string): string {
  if (!code || code.length !== 2) return "\u{1F30D}";
  const offset = 127397;
  return String.fromCodePoint(code.charCodeAt(0) + offset, code.charCodeAt(1) + offset);
}

export function mapRecentEvents(events: any[]) {
  return events.map((e) => ({
    path: e.path,
    country: e.country,
    city: e.city,
    deviceType: e.deviceType,
    browser: e.browser,
    os: e.os,
    timestamp: e.timestamp,
  }));
}

export function mapDailyToChart(daily: any[], field: "visitors" | "pageViews") {
  return daily.map((d) => ({ label: d.date, value: d[field] }));
}

export function mapZeroChartData(daily: any[]) {
  return daily.map((d) => ({ label: d.date, value: 0 }));
}

export function buildPercentageList(
  items: any[],
  total: number,
  nameField: string = "_id",
) {
  return items.map((d) => ({
    name: d[nameField],
    visitors: d.count,
    percentage: Math.round((d.count / (total || 1)) * 100),
  }));
}

export function buildCalendarDays(daily: any[], year: number, month: number) {
  const countMap: Record<string, number> = {};
  for (const d of daily) countMap[d._id] = d.count;

  const daysInMonth = new Date(year, month, 0).getDate();
  const counts: number[] = [];
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
    counts.push(countMap[dateStr] || 0);
  }

  const maxCount = Math.max(...counts, 1);
  const levels = counts.map((c) => {
    if (c === 0) return 0;
    const ratio = c / maxCount;
    if (ratio > 0.75) return 4;
    if (ratio > 0.5) return 3;
    if (ratio > 0.25) return 2;
    return 1;
  });

  return { counts, levels, maxCount, daysInMonth };
}

export function computeSessionStats(sessionStats: { totalSessions: number; bouncedSessions: number; totalDuration: number }) {
  return {
    avgBounceRate: sessionStats.totalSessions > 0
      ? Math.round((sessionStats.bouncedSessions / sessionStats.totalSessions) * 100)
      : 0,
    avgSessionDuration: sessionStats.totalSessions > 0
      ? Math.round(sessionStats.totalDuration / sessionStats.totalSessions)
      : 0,
  };
}
