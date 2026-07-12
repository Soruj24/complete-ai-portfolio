import { computeChange, getFlagFromCode } from "./analytics-mapper";

function percentageList(items: any[], total: number) {
  return items.map((d: any) => ({
    name: d._id,
    visitors: d.count,
    percentage: Math.round((d.count / (total || 1)) * 100),
  }));
}

export function buildDevicesResponse(devices: any[]) {
  const total = devices.reduce((s: number, d: any) => s + d.count, 0) || 1;
  return percentageList(devices, total);
}

export function buildBrowsersResponse(browsers: any[]) {
  const total = browsers.reduce((s: number, d: any) => s + d.count, 0) || 1;
  return percentageList(browsers, total);
}

export function buildOperatingSystemsResponse(operatingSystems: any[]) {
  const total = operatingSystems.reduce((s: number, d: any) => s + d.count, 0) || 1;
  return percentageList(operatingSystems, total);
}

export function buildSourcesResponse(sourcesAgg: any[]) {
  const total = sourcesAgg.reduce((s: number, d: any) => s + d.count, 0) || 1;
  return sourcesAgg.map((d: any) => ({
    name: d._id.charAt(0).toUpperCase() + d._id.slice(1),
    visitors: d.count,
    percentage: Math.round((d.count / total) * 100),
    trend: computeChange(d.count, d.count),
  }));
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
  return topPagesAgg.map((d: any) => ({
    path: d._id,
    title: d._id === "/" ? "Home" : d._id.split("/").filter(Boolean).join(" > "),
    views: d.views,
    visitors: d.visitors.length,
  }));
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
