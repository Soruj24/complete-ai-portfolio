import { AnalyticsRepository } from "@/lib/repositories/analytics-repository";
import {
  mapRecentEvents,
  mapDailyToChart,
  mapZeroChartData,
  buildDevicesResponse,
  buildBrowsersResponse,
  buildOperatingSystemsResponse,
  computeChange,
  buildCountriesResponse,
  buildCitiesResponse,
  buildSourcesResponse,
  buildReferrersResponse,
  buildTopPagesResponse,
  buildProjectsResponse,
  buildEngagementResponse,
  buildTrafficDays,
  buildTrafficStats,
  buildTrafficSources,
  buildTrafficTopPages,
  buildCalendarDays,
  buildVisitorCountries,
  buildVisitorStats,
  computeSessionStats,
} from "@/lib/mappers/analytics-mapper";

export class AnalyticsService {
  private repo: AnalyticsRepository;

  constructor(repo?: AnalyticsRepository) {
    this.repo = repo ?? new AnalyticsRepository();
  }

  async getRealtimeData() {
    const fiveMinAgo = new Date(Date.now() - 5 * 60000);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [liveVisitors, peakToday, totalToday, recentEvents] = await Promise.all([
      this.repo.getLiveVisitors(fiveMinAgo),
      this.repo.getPeakHourToday(today),
      this.repo.getTotalToday(today),
      this.repo.getRecentEvents(fiveMinAgo),
    ]);

    return {
      liveVisitors,
      peakToday,
      totalToday,
      recentEvents: mapRecentEvents(recentEvents),
    };
  }

  async getChartsData(days: number = 30) {
    const { current, previous } = this.repo.getPeriods(days);

    const [daily, prevDaily, devices, browsers, operatingSystems, sessionStats, prevSessionStats, allTimeIps] = await Promise.all([
      this.repo.getDailyAggregation(current),
      this.repo.getDailyAggregation(previous, current),
      this.repo.getDevices(current),
      this.repo.getBrowsers(current),
      this.repo.getOperatingSystems(current),
      this.repo.getSessionStats(current),
      this.repo.getSessionStats(previous),
      this.repo.getAllTimeIPs(),
    ]);

    const totalVisitors = daily.reduce((s, d) => s + d.visitors, 0);
    const prevTotalVisitors = prevDaily.reduce((s, d) => s + d.visitors, 0);
    const totalViews = daily.reduce((s, d) => s + d.pageViews, 0);
    const prevTotalViews = prevDaily.reduce((s, d) => s + d.pageViews, 0);

    const { avgBounceRate, avgSessionDuration } = computeSessionStats(sessionStats);

    return {
      visitorsData: mapDailyToChart(daily, "visitors"),
      pageviewsData: mapDailyToChart(daily, "pageViews"),
      sessionDurations: mapZeroChartData(daily),
      bounceRates: mapZeroChartData(daily),
      devices: buildDevicesResponse(devices),
      browsers: buildBrowsersResponse(browsers),
      operatingSystems: buildOperatingSystemsResponse(operatingSystems),
      totalVisitors,
      totalPageviews: totalViews,
      visitorsChange: computeChange(totalVisitors, prevTotalVisitors),
      pageviewsChange: computeChange(totalViews, prevTotalViews),
      avgBounceRate,
      avgSessionDuration,
    };
  }

  async getTablesData(days: number = 30) {
    const { current, previous } = this.repo.getPeriods(days);

    const [countriesAgg, citiesAgg, sourcesAgg, referrersAgg, topPagesAgg, projectsAgg, downloadsAgg,
      totalDownloads, prevDownloads, totalMessages] = await Promise.all([
      this.repo.getCountries(current),
      this.repo.getCities(current),
      this.repo.getSources(current),
      this.repo.getReferrers(current),
      this.repo.getTopPages(current),
      this.repo.getProjects(),
      this.repo.getDownloads(current),
      this.repo.getDownloadCount(current),
      this.repo.getDownloadCount(previous),
      this.repo.getContactMessageCount(),
    ]);

    const topViewsCount = topPagesAgg.reduce((s, d) => s + d.views, 0);

    return {
      countries: buildCountriesResponse(countriesAgg),
      cities: buildCitiesResponse(citiesAgg),
      sources: buildSourcesResponse(sourcesAgg),
      referrers: buildReferrersResponse(referrersAgg),
      topPages: buildTopPagesResponse(topPagesAgg),
      projects: buildProjectsResponse(projectsAgg, downloadsAgg),
      engagement: buildEngagementResponse(totalDownloads, prevDownloads, totalMessages, topViewsCount),
    };
  }

  async getCalendarData(year: number, month: number) {
    const daily = await this.repo.getDailyViews(year, month);
    const { counts, levels, maxCount, daysInMonth } = buildCalendarDays(daily, year, month);

    return {
      year, month, days: counts, levels,
      total: counts.reduce((s, c) => s + c, 0),
      avg: Math.round(counts.reduce((s, c) => s + c, 0) / daysInMonth),
      peak: maxCount,
    };
  }

  async getTrafficData(days: number = 30) {
    const { current, previous } = this.repo.getPeriods(days);

    const [daily, prevDaily, sourcesAgg, topPagesAgg] = await Promise.all([
      this.repo.getDailyAggregation(current),
      this.repo.getDailyAggregation(previous, current),
      this.repo.getSources(current),
      this.repo.getTopPages(current, 10),
    ]);

    const totalVisitors = daily.reduce((s, d) => s + d.visitors, 0);
    const prevTotalVisitors = prevDaily.reduce((s, d) => s + d.visitors, 0);
    const totalViews = daily.reduce((s, d) => s + d.pageViews, 0);
    const prevTotalViews = prevDaily.reduce((s, d) => s + d.pageViews, 0);

    return {
      daily: buildTrafficDays(daily),
      stats: buildTrafficStats(totalVisitors, prevTotalVisitors, totalViews, prevTotalViews),
      sources: buildTrafficSources(sourcesAgg),
      topPages: buildTrafficTopPages(topPagesAgg),
    };
  }

  async getVisitorData(days: number = 30) {
    const data = await this.getTablesData(days);
    const countries = buildVisitorCountries(data.countries);
    const stats = buildVisitorStats(countries);
    return { countries, stats };
  }

  async getDashboardStats() {
    const thirtyDaysAgo = await this.repo.getDateRange(30);
    const sixtyDaysAgo = await this.repo.getDateRange(60);

    const [visitors, prevVisitors, downloads, prevDownloads, messages, projectViews] = await Promise.all([
      this.repo.getVisitorsAndViews(thirtyDaysAgo),
      this.repo.getPrevVisitorsAndViews(sixtyDaysAgo, thirtyDaysAgo),
      this.repo.getDownloadCount(thirtyDaysAgo),
      this.repo.getDownloadCount(sixtyDaysAgo),
      this.repo.getUnreadMessages(),
      this.repo.getProjectViewsTotal(),
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
