export interface AnalyticsEvent {
  _id: string;
  event: string;
  page: string;
  referrer: string;
  browser: string;
  device: string;
  country: string;
  city: string;
  ip: string;
  userId: string;
  timestamp: string;
  metadata: Record<string, unknown>;
}
