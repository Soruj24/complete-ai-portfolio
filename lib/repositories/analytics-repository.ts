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

export class AnalyticsRepository {
  private async connect() {
    await dbConnect();
  }

  async getDateRange(days: number): Promise<Date> {
    return getDateRange(days);
  }

  getPeriods(days: number) {
    return periods(days);
  }

  async getLiveVisitors(since: Date): Promise<number> {
    await this.connect();
    return PageView.countDocuments({ timestamp: { $gte: since } });
  }

  async getPeakHourToday(today: Date): Promise<number> {
    await this.connect();
    const result = await PageView.aggregate([
      { $match: { timestamp: { $gte: today } } },
      { $group: { _id: { $dateToString: { format: "%H", date: "$timestamp" } }, count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);
    return result[0]?.count ?? 0;
  }

  async getTotalToday(today: Date): Promise<number> {
    await this.connect();
    return PageView.countDocuments({ timestamp: { $gte: today } });
  }

  async getRecentEvents(since: Date, limit: number = 50) {
    await this.connect();
    return PageView.find({ timestamp: { $gte: since } })
      .sort({ timestamp: -1 })
      .limit(limit)
      .lean();
  }

  async getDailyAggregation(since: Date, lt?: Date) {
    await this.connect();
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

  async getSessionStats(since: Date) {
    await this.connect();
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

  async getDevices(since: Date) {
    await this.connect();
    return PageView.aggregate([
      { $match: { timestamp: { $gte: since }, deviceType: { $exists: true, $ne: null } } },
      { $group: { _id: "$deviceType", visitors: { $addToSet: "$ip" }, count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
  }

  async getBrowsers(since: Date) {
    await this.connect();
    return PageView.aggregate([
      { $match: { timestamp: { $gte: since }, browser: { $exists: true, $ne: null } } },
      { $group: { _id: "$browser", visitors: { $addToSet: "$ip" }, count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
  }

  async getOperatingSystems(since: Date) {
    await this.connect();
    return PageView.aggregate([
      { $match: { timestamp: { $gte: since }, os: { $exists: true, $ne: null } } },
      { $group: { _id: "$os", visitors: { $addToSet: "$ip" }, count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
  }

  async getAllTimeIPs() {
    await this.connect();
    return PageView.distinct("ip");
  }

  async getCountries(since: Date, limit: number = 20) {
    await this.connect();
    return PageView.aggregate([
      { $match: { timestamp: { $gte: since }, country: { $exists: true, $ne: null } } },
      {
        $group: {
          _id: { country: "$country", code: "$countryCode" },
          visitors: { $addToSet: "$ip" },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: limit },
    ]);
  }

  async getCities(since: Date, limit: number = 20) {
    await this.connect();
    return PageView.aggregate([
      { $match: { timestamp: { $gte: since }, city: { $exists: true, $ne: null } } },
      {
        $group: {
          _id: { city: "$city", country: "$country" },
          visitors: { $addToSet: "$ip" },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: limit },
    ]);
  }

  async getSources(since: Date) {
    await this.connect();
    return PageView.aggregate([
      { $match: { timestamp: { $gte: since } } },
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
    ]);
  }

  async getReferrers(since: Date, limit: number = 20) {
    await this.connect();
    return PageView.aggregate([
      { $match: { timestamp: { $gte: since }, referrer: { $exists: true, $nin: [null, ""] } } },
      {
        $group: {
          _id: { $regexFind: { input: "$referrer", regex: /https?:\/\/(?:www\.)?([^\/]+)/ } },
          visitors: { $addToSet: "$ip" },
          count: { $sum: 1 },
        },
      },
      { $match: { _id: { $ne: null } } },
      { $sort: { count: -1 } },
      { $limit: limit },
    ]);
  }

  async getTopPages(since: Date, limit: number = 20) {
    await this.connect();
    return PageView.aggregate([
      { $match: { timestamp: { $gte: since } } },
      { $group: { _id: "$path", visitors: { $addToSet: "$ip" }, views: { $sum: 1 } } },
      { $sort: { views: -1 } },
      { $limit: limit },
    ]);
  }

  async getProjects() {
    await this.connect();
    return Project.find().select("title stats.views").sort({ "stats.views": -1 }).limit(10).lean();
  }

  async getDownloads(since: Date) {
    await this.connect();
    return Download.aggregate([
      { $match: { timestamp: { $gte: since } } },
      { $group: { _id: "$file", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
  }

  async getDownloadCount(since?: Date): Promise<number> {
    await this.connect();
    const filter: Record<string, unknown> = {};
    if (since) filter.timestamp = { $gte: since };
    return Download.countDocuments(filter);
  }

  async getContactMessageCount(since?: Date): Promise<number> {
    await this.connect();
    const filter: Record<string, unknown> = {};
    if (since) filter.createdAt = { $gte: since };
    return ContactMessage.countDocuments(filter);
  }

  async getDailyViews(year: number, month: number) {
    await this.connect();
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59);
    return PageView.aggregate([
      { $match: { timestamp: { $gte: start, $lte: end } } },
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } }, count: { $sum: 1 } } },
    ]);
  }

  async getVisitorsAndViews(since: Date) {
    await this.connect();
    return PageView.aggregate([
      { $match: { timestamp: { $gte: since } } },
      { $group: { _id: null, visitors: { $addToSet: "$ip" }, views: { $sum: 1 } } },
    ]);
  }

  async getPrevVisitorsAndViews(since: Date, lt: Date) {
    await this.connect();
    return PageView.aggregate([
      { $match: { timestamp: { $gte: since, $lt: lt } } },
      { $group: { _id: null, visitors: { $addToSet: "$ip" }, views: { $sum: 1 } } },
    ]);
  }

  async getProjectViewsTotal() {
    await this.connect();
    return Project.aggregate([{ $group: { _id: null, total: { $sum: "$stats.views" } } }]);
  }

  async getUnreadMessages(): Promise<number> {
    await this.connect();
    return ContactMessage.countDocuments({ read: false });
  }
}
