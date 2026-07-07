export interface TrafficDay {
  date: string;
  visitors: number;
  pageViews: number;
  bounceRate: number;
  avgSessionDuration: number;
}

export interface TrafficSource {
  source: string;
  visitors: number;
  percentage: number;
  color: string;
}

export interface TopPage {
  path: string;
  title: string;
  views: number;
  avgTime: number;
  bounceRate: number;
}

export interface TrafficStats {
  totalVisitors: number;
  totalPageViews: number;
  avgBounceRate: number;
  avgSessionDuration: number;
  visitorsTrend: number;
  pageViewsTrend: number;
}
