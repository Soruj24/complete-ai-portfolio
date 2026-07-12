import { dbConnect } from "@/config/db";
import { PageView } from "@/models/PageView";
import { Download } from "@/models/Download";
import { ContactMessage } from "@/models/ContactMessage";
import { Project } from "@/models/Project";

function getDateRange(days: number): Date {
  return new Date(Date.now() - days * 86400000);
}

function periods(days: number) {
  const now = Date.now();
  const day = 86400000;
  return {
    current: new Date(now - days * day),
    previous: new Date(now - 2 * days * day),
    beforePrevious: new Date(now - 3 * days * day),
  };
}

function computeChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 1000) / 10;
}

function getFlagFromCode(code: string): string {
  if (!code || code.length !== 2) return "🌍";
  const offset = 127397;
  return String.fromCodePoint(code.charCodeAt(0) + offset, code.charCodeAt(1) + offset);
}

export class AnalyticsService {
  private async connect() {
    await dbConnect();
  }

  async getRealtimeData() {
    await this.connect();
    const fiveMinAgo = new Date(Date.now() - 5 * 60000);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [liveVisitors, peakToday, totalToday, recentEvents] = await Promise.all([
      PageView.countDocuments({ timestamp: { $gte: fiveMinAgo } }),
      PageView.aggregate([
        { $match: { timestamp: { $gte: today } } },
        { $group: { _id: { $dateToString: { format: "%H", date: "$timestamp" } }, count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 1 },
      ]),
      PageView.countDocuments({ timestamp: { $gte: today } }),
      PageView.find({ timestamp: { $gte: fiveMinAgo } })
        .sort({ timestamp: -1 })
        .limit(50)
        .lean(),
    ]);

    return {
      liveVisitors,
      peakToday: peakToday[0]?.count ?? 0,
      totalToday,
      recentEvents: recentEvents.map((e) => ({
        path: e.path,
        country: e.country,
        city: e.city,
        deviceType: e.deviceType,
        browser: e.browser,
        os: e.os,
        timestamp: e.timestamp,
      })),
    };
  }

  async getChartsData(days: number = 30) {
    await this.connect();
    const { current, previous } = periods(days);

    const [daily, prevDaily, devices, browsers, operatingSystems, sessionStats, prevSessionStats, allTimeIps] = await Promise.all([
      PageView.aggregate([
        { $match: { timestamp: { $gte: current } } },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
            visitors: { $addToSet: "$ip" },
            pageViews: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
        { $project: { _id: 0, date: "$_id", visitors: { $size: "$visitors" }, pageViews: 1 } },
      ]),
      PageView.aggregate([
        { $match: { timestamp: { $gte: previous, $lt: current } } },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
            visitors: { $addToSet: "$ip" },
            pageViews: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
        { $project: { _id: 0, date: "$_id", visitors: { $size: "$visitors" }, pageViews: 1 } },
      ]),
      PageView.aggregate([
        { $match: { timestamp: { $gte: current }, deviceType: { $exists: true, $ne: null } } },
        { $group: { _id: "$deviceType", visitors: { $addToSet: "$ip" }, count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      PageView.aggregate([
        { $match: { timestamp: { $gte: current }, browser: { $exists: true, $ne: null } } },
        { $group: { _id: "$browser", visitors: { $addToSet: "$ip" }, count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      PageView.aggregate([
        { $match: { timestamp: { $gte: current }, os: { $exists: true, $ne: null } } },
        { $group: { _id: "$os", visitors: { $addToSet: "$ip" }, count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      this.getSessionStats(current),
      this.getSessionStats(previous),
      PageView.distinct("ip"),
    ]);

    const totalVisitors = daily.reduce((s, d) => s + d.visitors, 0);
    const prevTotalVisitors = prevDaily.reduce((s, d) => s + d.visitors, 0);
    const totalViews = daily.reduce((s, d) => s + d.pageViews, 0);
    const prevTotalViews = prevDaily.reduce((s, d) => s + d.pageViews, 0);

    const visitorsData = daily.map((d) => ({ label: d.date, value: d.visitors }));
    const pageviewsData = daily.map((d) => ({ label: d.date, value: d.pageViews }));
    const sessionDurationsData = daily.map((d) => ({ label: d.date, value: 0 }));
    const bounceRatesData = daily.map((d) => ({ label: d.date, value: 0 }));

    const totalDevices = devices.reduce((s, d) => s + d.count, 0) || 1;
    const totalBrowsers = browsers.reduce((s, d) => s + d.count, 0) || 1;
    const totalOS = operatingSystems.reduce((s, d) => s + d.count, 0) || 1;

    return {
      visitorsData,
      pageviewsData,
      sessionDurations: sessionDurationsData,
      bounceRates: bounceRatesData,
      devices: devices.map((d) => ({ name: d._id, visitors: d.count, percentage: Math.round((d.count / totalDevices) * 100) })),
      browsers: browsers.map((d) => ({ name: d._id, visitors: d.count, percentage: Math.round((d.count / totalBrowsers) * 100) })),
      operatingSystems: operatingSystems.map((d) => ({ name: d._id, visitors: d.count, percentage: Math.round((d.count / totalOS) * 100) })),
      totalVisitors,
      totalPageviews: totalViews,
      visitorsChange: computeChange(totalVisitors, prevTotalVisitors),
      pageviewsChange: computeChange(totalViews, prevTotalViews),
      avgBounceRate: sessionStats.totalSessions > 0 ? Math.round((sessionStats.bouncedSessions / sessionStats.totalSessions) * 100) : 0,
      avgSessionDuration: sessionStats.totalSessions > 0 ? Math.round(sessionStats.totalDuration / sessionStats.totalSessions) : 0,
    };
  }

  private async getSessionStats(since: Date) {
    const sessions = await PageView.aggregate([
      { $match: { timestamp: { $gte: since }, sessionId: { $exists: true, $ne: null } } },
      {
        $group: {
          _id: "$sessionId",
          count: { $sum: 1 },
          firstView: { $min: "$timestamp" },
          lastView: { $max: "$timestamp" },
        },
      },
    ]);
    const totalSessions = sessions.length;
    const bouncedSessions = sessions.filter((s) => s.count === 1).length;
    const totalDuration = sessions
      .filter((s) => s.count > 1)
      .reduce((sum, s) => sum + (new Date(s.lastView).getTime() - new Date(s.firstView).getTime()), 0);
    return { totalSessions, bouncedSessions, totalDuration };
  }

  async getTablesData(days: number = 30) {
    await this.connect();
    const { current, previous } = periods(days);

    const [countriesAgg, citiesAgg, sourcesAgg, referrersAgg, topPagesAgg, projectsAgg, downloadsAgg,
      totalDownloads, prevDownloads, totalMessages, prevMessages] = await Promise.all([
      PageView.aggregate([
        { $match: { timestamp: { $gte: current }, country: { $exists: true, $ne: null } } },
        {
          $group: {
            _id: { country: "$country", code: "$countryCode" },
            visitors: { $addToSet: "$ip" },
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 20 },
      ]),
      PageView.aggregate([
        { $match: { timestamp: { $gte: current }, city: { $exists: true, $ne: null } } },
        {
          $group: {
            _id: { city: "$city", country: "$country" },
            visitors: { $addToSet: "$ip" },
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 20 },
      ]),
      PageView.aggregate([
        { $match: { timestamp: { $gte: current } } },
        {
          $group: {
            _id: {
              $cond: [
                { $eq: ["$referrer", null] }, "direct",
                {
                  $cond: [
                    { $regexMatch: { input: "$referrer", regex: /google\./i } }, "google",
                    {
                      $cond: [
                        { $regexMatch: { input: "$referrer", regex: /github\./i } }, "github",
                        {
                          $cond: [
                            { $regexMatch: { input: "$referrer", regex: /linkedin\./i } }, "linkedin",
                            {
                              $cond: [
                                { $regexMatch: { input: "$referrer", regex: /twitter|x\.com/i } }, "twitter",
                                { $cond: [{ $eq: ["$referrer", ""] }, "direct", "other"] },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            visitors: { $addToSet: "$ip" },
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
      ]),
      PageView.aggregate([
        { $match: { timestamp: { $gte: current }, referrer: { $exists: true, $nin: [null, ""] } } },
        {
          $group: {
            _id: { $regexFind: { input: "$referrer", regex: /https?:\/\/(?:www\.)?([^\/]+)/ } },
            visitors: { $addToSet: "$ip" },
            count: { $sum: 1 },
          },
        },
        { $match: { _id: { $ne: null } } },
        { $sort: { count: -1 } },
        { $limit: 20 },
      ]),
      PageView.aggregate([
        { $match: { timestamp: { $gte: current } } },
        { $group: { _id: "$path", visitors: { $addToSet: "$ip" }, views: { $sum: 1 } } },
        { $sort: { views: -1 } },
        { $limit: 20 },
      ]),
      Project.find().select("title stats.views").sort({ "stats.views": -1 }).limit(10).lean(),
      Download.aggregate([
        { $match: { timestamp: { $gte: current } } },
        { $group: { _id: "$file", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      Download.countDocuments({ timestamp: { $gte: current } }),
      Download.countDocuments({ timestamp: { $gte: previous, $lt: current } }),
      ContactMessage.countDocuments(),
      ContactMessage.countDocuments({ createdAt: { $gte: current } }),
    ]);

    const totalWithReferrer = sourcesAgg.reduce((s, d) => s + d.count, 0) || 1;
    const totalRef = referrersAgg.reduce((s, d) => s + d.count, 0) || 1;
    const totalCountries = countriesAgg.reduce((s, d) => s + d.count, 0) || 1;

    const sources = sourcesAgg.map((d) => {
      const name = d._id.charAt(0).toUpperCase() + d._id.slice(1);
      return {
        name,
        visitors: d.count,
        percentage: Math.round((d.count / totalWithReferrer) * 100),
        trend: computeChange(d.count, d.count),
      };
    });

    const referrers = referrersAgg.map((d) => ({
      domain: d._id?.match ? d._id.match[1] || d._id.match[0] : String(d._id),
      visitors: d.count,
      percentage: Math.round((d.count / totalRef) * 100),
      bounce: `${Math.round(30)}%`,
    }));

    const countries = countriesAgg.map((d) => ({
      code: d._id.code || "",
      name: d._id.country,
      flag: getFlagFromCode(d._id.code || ""),
      visitors: d.count,
      percentage: Math.round((d.count / totalCountries) * 100),
      change: computeChange(d.count, d.count),
    }));

    const cities = citiesAgg.map((d) => ({
      name: d._id.city,
      country: d._id.country || "",
      visitors: d.count,
      duration: "--",
    }));

    const topPages = topPagesAgg.map((d) => {
      const path = d._id;
      const title = path === "/" ? "Home" : path.split("/").filter(Boolean).join(" > ");
      return {
        path,
        title,
        views: d.views,
        visitors: d.visitors.length,
      };
    });

    const downloadMap: Record<string, number> = {};
    for (const d of downloadsAgg) {
      downloadMap[d._id] = d.count;
    }

    const projects = projectsAgg.map((p) => ({
      _id: String(p._id),
      name: p.title,
      views: (p.stats as Record<string, unknown>)?.views as number || 0,
      downloads: downloadMap[p.title] || 0,
      trend: computeChange((p.stats as Record<string, unknown>)?.views as number || 0, 0),
    }));

    const engagement = [
      { label: "Resume Downloads", count: totalDownloads, change: computeChange(totalDownloads, prevDownloads), previous: prevDownloads },
      { label: "Contact Messages", count: totalMessages, change: 0, previous: 0 },
      { label: "Total Page Views", count: topPagesAgg.reduce((s, d) => s + d.views, 0), change: 0, previous: 0 },
    ];

    return { countries, cities, sources, referrers, topPages, projects, engagement };
  }

  async getCalendarData(year: number, month: number) {
    await this.connect();
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59);

    const daily = await PageView.aggregate([
      { $match: { timestamp: { $gte: start, $lte: end } } },
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } }, count: { $sum: 1 } } },
    ]);

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

    return {
      year, month, days: counts, levels,
      total: counts.reduce((s, c) => s + c, 0),
      avg: Math.round(counts.reduce((s, c) => s + c, 0) / daysInMonth),
      peak: maxCount,
    };
  }

  async getTrafficData(days: number = 30) {
    await this.connect();
    const { current, previous } = periods(days);

    const [daily, prevDaily, sourcesAgg] = await Promise.all([
      this.getDailyAggregation(current),
      this.getDailyAggregation(previous, current),
      PageView.aggregate([
        { $match: { timestamp: { $gte: current } } },
        {
          $group: {
            _id: {
              $cond: [
                { $eq: ["$referrer", null] }, "direct",
                {
                  $cond: [
                    { $regexMatch: { input: "$referrer", regex: /google\./i } }, "google",
                    {
                      $cond: [
                        { $regexMatch: { input: "$referrer", regex: /github\./i } }, "github",
                        { $cond: [{ $regexMatch: { input: "$referrer", regex: /linkedin\./i } }, "linkedin", "other"] },
                      ],
                    },
                  ],
                },
              ],
            },
            visitors: { $addToSet: "$ip" },
            count: { $sum: 1 },
          },
        },
      ]),
    ]);

    const totalVisitors = daily.reduce((s, d) => s + d.visitors, 0);
    const prevTotalVisitors = prevDaily.reduce((s, d) => s + d.visitors, 0);
    const totalViews = daily.reduce((s, d) => s + d.pageViews, 0);
    const prevTotalViews = prevDaily.reduce((s, d) => s + d.pageViews, 0);

    const totalSources = sourcesAgg.reduce((s, d) => s + d.count, 0) || 1;
    const sourceColors: Record<string, string> = {
      Direct: "#10b981", Google: "#f59e0b", Github: "#8b5cf6",
      Linkedin: "#06b6d4", Twitter: "#3b82f6", Other: "#6b7280",
    };

    const sourceStats = sourcesAgg.map((d) => {
      const name = d._id.charAt(0).toUpperCase() + d._id.slice(1);
      return {
        source: name,
        visitors: d.count,
        percentage: Math.round((d.count / totalSources) * 100),
        color: sourceColors[name] || "#6b7280",
      };
    });

    const topPagesAgg = await PageView.aggregate([
      { $match: { timestamp: { $gte: current } } },
      { $group: { _id: "$path", visitors: { $addToSet: "$ip" }, views: { $sum: 1 } } },
      { $sort: { views: -1 } },
      { $limit: 10 },
    ]);

    const trafficDays = daily.map((d) => ({
      date: d.date,
      visitors: d.visitors,
      pageViews: d.pageViews,
      bounceRate: 0,
      avgSessionDuration: 0,
    }));

    const topPages = topPagesAgg.map((d) => ({
      path: d._id,
      title: d._id === "/" ? "Home" : d._id.split("/").filter(Boolean).join(" > "),
      views: d.views,
      avgTime: 0,
      bounceRate: 0,
    }));

    return {
      daily: trafficDays,
      stats: {
        totalVisitors,
        totalPageViews: totalViews,
        avgBounceRate: 0,
        avgSessionDuration: 0,
        visitorsTrend: computeChange(totalVisitors, prevTotalVisitors),
        pageViewsTrend: computeChange(totalViews, prevTotalViews),
      },
      sources: sourceStats,
      topPages,
    };
  }

  private async getDailyAggregation(since: Date, lt?: Date) {
    const match: Record<string, unknown> = { timestamp: { $gte: since } };
    if (lt) match.timestamp = { $gte: since, $lt: lt };
    return PageView.aggregate([
      { $match: match },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
          visitors: { $addToSet: "$ip" },
          pageViews: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      { $project: { _id: 0, date: "$_id", visitors: { $size: "$visitors" }, pageViews: 1 } },
    ]);
  }

  async getVisitorData(days: number = 30) {
    const data = await this.getTablesData(days);
    const totalCountries = data.countries.reduce((s, c) => s + c.visitors, 0) || 1;
    const countries = data.countries.map((c) => ({
      country: c.name,
      code: c.code?.toLowerCase() || "unknown",
      visitors: c.visitors,
      pageViews: Math.round(c.visitors * 2),
      avgDuration: 0,
      bounceRate: 0,
      flag: c.flag,
    }));
    return {
      countries,
      stats: {
        totalVisitors: countries.reduce((s, c) => s + c.visitors, 0),
        totalPageViews: countries.reduce((s, c) => s + c.pageViews, 0),
        avgDuration: 0,
        avgBounceRate: 0,
        visitorsChange: 0,
        pageViewsChange: 0,
      },
    };
  }

  async getDashboardStats() {
    await this.connect();
    const thirtyDaysAgo = getDateRange(30);
    const sixtyDaysAgo = getDateRange(60);

    const [visitors, prevVisitors, downloads, prevDownloads, messages, projectViews] = await Promise.all([
      PageView.aggregate([
        { $match: { timestamp: { $gte: thirtyDaysAgo } } },
        { $group: { _id: null, visitors: { $addToSet: "$ip" }, views: { $sum: 1 } } },
      ]),
      PageView.aggregate([
        { $match: { timestamp: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo } } },
        { $group: { _id: null, visitors: { $addToSet: "$ip" }, views: { $sum: 1 } } },
      ]),
      Download.countDocuments({ timestamp: { $gte: thirtyDaysAgo } }),
      Download.countDocuments({ timestamp: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo } }),
      ContactMessage.countDocuments({ read: false }),
      Project.aggregate([{ $group: { _id: null, total: { $sum: "$stats.views" } } }]),
    ]);

    const currVisitorCount = visitors[0]?.visitors?.length || 0;
    const prevVisitorCount = prevVisitors[0]?.visitors?.length || 0;
    const currViewCount = visitors[0]?.views || 0;
    const prevViewCount = prevVisitors[0]?.views || 0;

    return {
      visitors: currVisitorCount,
      visitorsChange: computeChange(currVisitorCount, prevVisitorCount),
      pageViews: currViewCount,
      pageViewsChange: computeChange(currViewCount, prevViewCount),
      resumeDownloads: downloads,
      resumeDownloadsChange: computeChange(downloads, prevDownloads),
      contactMessages: messages,
      contactMessagesChange: 0,
      projectViews: projectViews[0]?.total || 0,
      projectViewsChange: 0,
    };
  }
}

let instance: AnalyticsService | null = null;

export function getAnalyticsService(): AnalyticsService {
  if (!instance) {
    instance = new AnalyticsService();
  }
  return instance;
}
