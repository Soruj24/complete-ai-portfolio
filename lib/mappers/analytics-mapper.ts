export function computeChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 1000) / 10;
}

export function getFlagFromCode(code: string): string {
  if (!code || code.length !== 2) return "🌍";
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

export function buildDevicesResponse(devices: any[]) {
  const total = devices.reduce((s: number, d: any) => s + d.count, 0) || 1;
  return devices.map((d: any) => ({
    name: d._id,
    visitors: d.count,
    percentage: Math.round((d.count / total) * 100),
  }));
}

export function buildBrowsersResponse(browsers: any[]) {
  const total = browsers.reduce((s: number, d: any) => s + d.count, 0) || 1;
  return browsers.map((d: any) => ({
    name: d._id,
    visitors: d.count,
    percentage: Math.round((d.count / total) * 100),
  }));
}

export function buildOperatingSystemsResponse(operatingSystems: any[]) {
  const total = operatingSystems.reduce((s: number, d: any) => s + d.count, 0) || 1;
  return operatingSystems.map((d: any) => ({
    name: d._id,
    visitors: d.count,
    percentage: Math.round((d.count / total) * 100),
  }));
}

export function buildSourcesResponse(sourcesAgg: any[]) {
  const total = sourcesAgg.reduce((s: number, d: any) => s + d.count, 0) || 1;
  return sourcesAgg.map((d: any) => {
    const name = d._id.charAt(0).toUpperCase() + d._id.slice(1);
    return {
      name,
      visitors: d.count,
      percentage: Math.round((d.count / total) * 100),
      trend: computeChange(d.count, d.count),
    };
  });
}

export function buildReferrersResponse(referrersAgg: any[]) {
  const total = referrersAgg.reduce((s: number, d: any) => s + d.count, 0) || 1;
  return referrersAgg.map((d: any) => ({
    domain: d._id?.match ? d._id.match[1] || d._id.match[0] : String(d._id),
    visitors: d.count,
    percentage: Math.round((d.count / total) * 100),
    bounce: "30%",
  }));
}

export function buildCountriesResponse(countriesAgg: any[]) {
  const total = countriesAgg.reduce((s: number, d: any) => s + d.count, 0) || 1;
  return countriesAgg.map((d: any) => ({
    code: d._id.code || "",
    name: d._id.country,
    flag: getFlagFromCode(d._id.code || ""),
    visitors: d.count,
    percentage: Math.round((d.count / total) * 100),
    change: computeChange(d.count, d.count),
  }));
}

export function buildCitiesResponse(citiesAgg: any[]) {
  return citiesAgg.map((d: any) => ({
    name: d._id.city,
    country: d._id.country || "",
    visitors: d.count,
    duration: "--",
  }));
}

export function buildTopPagesResponse(topPagesAgg: any[]) {
  return topPagesAgg.map((d: any) => {
    const path = d._id;
    const title = path === "/" ? "Home" : path.split("/").filter(Boolean).join(" > ");
    return { path, title, views: d.views, visitors: d.visitors.length };
  });
}

export function buildProjectsResponse(projectsAgg: any[], downloadsAgg: any[]) {
  const downloadMap: Record<string, number> = {};
  for (const d of downloadsAgg) {
    downloadMap[d._id] = d.count;
  }
  return projectsAgg.map((p: any) => ({
    _id: String(p._id),
    name: p.title,
    views: (p.stats as Record<string, unknown>)?.views as number || 0,
    downloads: downloadMap[p.title] || 0,
    trend: computeChange((p.stats as Record<string, unknown>)?.views as number || 0, 0),
  }));
}

export function buildEngagementResponse(
  totalDownloads: number,
  prevDownloads: number,
  totalMessages: number,
  topViewsCount: number,
) {
  return [
    { label: "Resume Downloads", count: totalDownloads, change: computeChange(totalDownloads, prevDownloads), previous: prevDownloads },
    { label: "Contact Messages", count: totalMessages, change: 0, previous: 0 },
    { label: "Total Page Views", count: topViewsCount, change: 0, previous: 0 },
  ];
}

export function buildTrafficDays(daily: any[]) {
  return daily.map((d: any) => ({
    date: d.date,
    visitors: d.visitors,
    pageViews: d.pageViews,
    bounceRate: 0,
    avgSessionDuration: 0,
  }));
}

export function buildTrafficStats(
  totalVisitors: number,
  prevTotalVisitors: number,
  totalViews: number,
  prevTotalViews: number,
) {
  return {
    totalVisitors,
    totalPageViews: totalViews,
    avgBounceRate: 0,
    avgSessionDuration: 0,
    visitorsTrend: computeChange(totalVisitors, prevTotalVisitors),
    pageViewsTrend: computeChange(totalViews, prevTotalViews),
  };
}

export function buildTrafficSources(sourcesAgg: any[]) {
  const total = sourcesAgg.reduce((s: number, d: any) => s + d.count, 0) || 1;
  const sourceColors: Record<string, string> = {
    Direct: "#10b981", Google: "#f59e0b", Github: "#8b5cf6",
    Linkedin: "#06b6d4", Twitter: "#3b82f6", Other: "#6b7280",
  };
  return sourcesAgg.map((d: any) => {
    const name = d._id.charAt(0).toUpperCase() + d._id.slice(1);
    return {
      source: name,
      visitors: d.count,
      percentage: Math.round((d.count / total) * 100),
      color: sourceColors[name] || "#6b7280",
    };
  });
}

export function buildTrafficTopPages(topPagesAgg: any[]) {
  return topPagesAgg.map((d: any) => ({
    path: d._id,
    title: d._id === "/" ? "Home" : d._id.split("/").filter(Boolean).join(" > "),
    views: d.views,
    avgTime: 0,
    bounceRate: 0,
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

export function buildVisitorCountries(countriesData: any[]) {
  const totalCountries = countriesData.reduce((s: number, c: any) => s + c.visitors, 0) || 1;
  return countriesData.map((c: any) => ({
    country: c.name,
    code: c.code?.toLowerCase() || "unknown",
    visitors: c.visitors,
    pageViews: Math.round(c.visitors * 2),
    avgDuration: 0,
    bounceRate: 0,
    flag: c.flag,
  }));
}

export function buildVisitorStats(countries: any[]) {
  return {
    totalVisitors: countries.reduce((s: number, c: any) => s + c.visitors, 0),
    totalPageViews: countries.reduce((s: number, c: any) => s + c.pageViews, 0),
    avgDuration: 0,
    avgBounceRate: 0,
    visitorsChange: 0,
    pageViewsChange: 0,
  };
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
