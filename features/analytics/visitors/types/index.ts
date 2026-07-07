export interface VisitorStat {
  country: string;
  code: string;
  visitors: number;
  pageViews: number;
  avgDuration: number;
  bounceRate: number;
  flag: string;
}
export interface GeoPoint {
  lat: number;
  lng: number;
  country: string;
  count: number;
}
