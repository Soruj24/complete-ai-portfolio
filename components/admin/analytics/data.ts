export interface DailyPoint {
  date: string;
  label: string;
  value: number;
}

export interface CountryData {
  code: string;
  name: string;
  visitors: number;
  percentage: number;
  change: number;
  flag: string;
}

export interface CityData {
  name: string;
  country: string;
  visitors: number;
  percentage: number;
  duration: string;
}

export interface DeviceData {
  name: string;
  visitors: number;
  percentage: number;
  icon: string;
}

export interface BrowserData {
  name: string;
  visitors: number;
  percentage: number;
  version: string;
}

export interface OSData {
  name: string;
  visitors: number;
  percentage: number;
}

export interface SourceData {
  name: string;
  visitors: number;
  percentage: number;
  trend: number;
}

export interface ReferrerData {
  domain: string;
  visitors: number;
  percentage: number;
  bounce: string;
}

export interface PageData {
  path: string;
  title: string;
  views: number;
  unique: number;
  avgDuration: string;
  bounceRate: string;
}

export interface ProjectData {
  name: string;
  views: number;
  downloads: number;
  trend: number;
}

export interface EngagementData {
  label: string;
  count: number;
  change: number;
  previous: number;
}

export interface RealtimeEvent {
  id: string;
  type: "pageview" | "click" | "download" | "search" | "visit";
  page: string;
  country: string;
  timestamp: string;
  duration: string;
}

export function generateDailyPoints(days: number, base = 200, variance = 150): DailyPoint[] {
  const dayLabels = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  return Array.from({ length: days }, (_, i) => ({
    date: new Date(Date.now() - (days - 1 - i) * 86400000).toISOString(),
    label: dayLabels[i % 7],
    value: Math.floor(Math.random() * variance) + base,
  }));
}

export const visitorsData: DailyPoint[] = generateDailyPoints(30, 450, 300);
export const pageviewsData: DailyPoint[] = generateDailyPoints(30, 1200, 600);

export const countries: CountryData[] = [
  { code: "US", name: "United States", visitors: 45280, percentage: 28.4, change: 12.5, flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", visitors: 18240, percentage: 11.4, change: 8.2, flag: "🇬🇧" },
  { code: "DE", name: "Germany", visitors: 14210, percentage: 8.9, change: -2.1, flag: "🇩🇪" },
  { code: "IN", name: "India", visitors: 12580, percentage: 7.9, change: 24.8, flag: "🇮🇳" },
  { code: "CA", name: "Canada", visitors: 9850, percentage: 6.2, change: 5.4, flag: "🇨🇦" },
  { code: "FR", name: "France", visitors: 8720, percentage: 5.5, change: 3.7, flag: "🇫🇷" },
  { code: "AU", name: "Australia", visitors: 7640, percentage: 4.8, change: -1.5, flag: "🇦🇺" },
  { code: "BR", name: "Brazil", visitors: 6890, percentage: 4.3, change: 15.2, flag: "🇧🇷" },
  { code: "JP", name: "Japan", visitors: 5340, percentage: 3.4, change: -4.8, flag: "🇯🇵" },
  { code: "NL", name: "Netherlands", visitors: 4210, percentage: 2.6, change: 6.3, flag: "🇳🇱" },
];

export const cities: CityData[] = [
  { name: "New York", country: "United States", visitors: 12450, percentage: 7.8, duration: "4m 32s" },
  { name: "London", country: "United Kingdom", visitors: 9870, percentage: 6.2, duration: "5m 12s" },
  { name: "San Francisco", country: "United States", visitors: 8340, percentage: 5.2, duration: "6m 45s" },
  { name: "Berlin", country: "Germany", visitors: 6210, percentage: 3.9, duration: "3m 50s" },
  { name: "Mumbai", country: "India", visitors: 5890, percentage: 3.7, duration: "4m 10s" },
  { name: "Toronto", country: "Canada", visitors: 5120, percentage: 3.2, duration: "5m 08s" },
  { name: "Paris", country: "France", visitors: 4780, percentage: 3.0, duration: "4m 55s" },
  { name: "Sydney", country: "Australia", visitors: 4230, percentage: 2.7, duration: "3m 28s" },
  { name: "São Paulo", country: "Brazil", visitors: 3890, percentage: 2.4, duration: "5m 20s" },
  { name: "Tokyo", country: "Japan", visitors: 3450, percentage: 2.2, duration: "4m 02s" },
];

export const devices: DeviceData[] = [
  { name: "Desktop", visitors: 89200, percentage: 56.0, icon: "🖥" },
  { name: "Mobile", visitors: 61200, percentage: 38.4, icon: "📱" },
  { name: "Tablet", visitors: 8900, percentage: 5.6, icon: "📟" },
];

export const browsers: BrowserData[] = [
  { name: "Chrome", visitors: 98200, percentage: 61.6, version: "125.0" },
  { name: "Firefox", visitors: 24500, percentage: 15.4, version: "128.0" },
  { name: "Safari", visitors: 18200, percentage: 11.4, version: "17.5" },
  { name: "Edge", visitors: 12400, percentage: 7.8, version: "126.0" },
  { name: "Opera", visitors: 3200, percentage: 2.0, version: "112.0" },
  { name: "Other", visitors: 2900, percentage: 1.8, version: "-" },
];

export const operatingSystems: OSData[] = [
  { name: "Windows", visitors: 72400, percentage: 45.4 },
  { name: "macOS", visitors: 38500, percentage: 24.2 },
  { name: "Linux", visitors: 18200, percentage: 11.4 },
  { name: "iOS", visitors: 16800, percentage: 10.5 },
  { name: "Android", visitors: 12400, percentage: 7.8 },
  { name: "Other", visitors: 1100, percentage: 0.7 },
];

export const sources: SourceData[] = [
  { name: "Direct", visitors: 62100, percentage: 39.0, trend: 8.5 },
  { name: "Organic Search", visitors: 43200, percentage: 27.1, trend: 15.2 },
  { name: "Social Media", visitors: 24500, percentage: 15.4, trend: -3.8 },
  { name: "Referral", visitors: 18400, percentage: 11.5, trend: 6.2 },
  { name: "Email", visitors: 11100, percentage: 7.0, trend: 22.4 },
];

export const referrers: ReferrerData[] = [
  { domain: "github.com", visitors: 6240, percentage: 3.9, bounce: "28%" },
  { domain: "linkedin.com", visitors: 4210, percentage: 2.6, bounce: "35%" },
  { domain: "twitter.com", visitors: 3850, percentage: 2.4, bounce: "42%" },
  { domain: "reddit.com", visitors: 2980, percentage: 1.9, bounce: "38%" },
  { domain: "medium.com", visitors: 2120, percentage: 1.3, bounce: "25%" },
  { domain: "dev.to", visitors: 1890, percentage: 1.2, bounce: "22%" },
  { domain: "stackoverflow.com", visitors: 1450, percentage: 0.9, bounce: "18%" },
  { domain: "hashnode.com", visitors: 980, percentage: 0.6, bounce: "30%" },
];

export const topPages: PageData[] = [
  { path: "/", title: "Home", views: 28400, unique: 18200, avgDuration: "3m 45s", bounceRate: "32%" },
  { path: "/projects", title: "Projects", views: 18200, unique: 12400, avgDuration: "5m 20s", bounceRate: "24%" },
  { path: "/about", title: "About", views: 12400, unique: 8900, avgDuration: "2m 10s", bounceRate: "45%" },
  { path: "/resume", title: "Resume / CV", views: 9800, unique: 7200, avgDuration: "4m 30s", bounceRate: "20%" },
  { path: "/blog", title: "Blog", views: 8200, unique: 6100, avgDuration: "6m 15s", bounceRate: "18%" },
  { path: "/contact", title: "Contact", views: 5400, unique: 4200, avgDuration: "1m 50s", bounceRate: "55%" },
  { path: "/projects/e-commerce", title: "Project: E-Commerce Platform", views: 4200, unique: 3100, avgDuration: "7m 20s", bounceRate: "15%" },
  { path: "/projects/ai-tool", title: "Project: AI Dashboard", views: 3800, unique: 2800, avgDuration: "8m 10s", bounceRate: "12%" },
];

export const projects: ProjectData[] = [
  { name: "AI Dashboard", views: 12400, downloads: 3200, trend: 28.5 },
  { name: "E-Commerce Platform", views: 9800, downloads: 2400, trend: 15.2 },
  { name: "Task Manager App", views: 7200, downloads: 1800, trend: -5.8 },
  { name: "Weather Widget", views: 5400, downloads: 4200, trend: 42.1 },
  { name: "Portfolio CMS", views: 4200, downloads: 0, trend: 0 },
];

export function generateEngagementData(): EngagementData[] {
  return [
    { label: "Resume Downloads", count: 2840, change: 18.5, previous: 2396 },
    { label: "Contact Form", count: 1240, change: 12.2, previous: 1105 },
    { label: "Project Links", count: 5620, change: -3.8, previous: 5842 },
    { label: "Social Links", count: 3890, change: 8.4, previous: 3588 },
    { label: "GitHub Stars", count: 1420, change: 24.6, previous: 1140 },
    { label: "Newsletter Signups", count: 890, change: 42.8, previous: 623 },
  ];
}

export const sessionDurations: DailyPoint[] = generateDailyPoints(30, 180, 60).map((d) => ({ ...d, value: Math.floor(Math.random() * 120) + 120 }));
export const bounceRates: DailyPoint[] = generateDailyPoints(30, 30, 10).map((d) => ({ ...d, value: Math.floor(Math.random() * 15) + 25 }));

export function generateCalendarDays(year: number, month: number): { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[] {
  const daysInMonth = new Date(year, month, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const count = Math.floor(Math.random() * 200);
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (count > 150) level = 4;
    else if (count > 100) level = 3;
    else if (count > 50) level = 2;
    else if (count > 10) level = 1;
    return { date: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`, count, level };
  });
}

const eventTypes = ["pageview", "click", "download", "search", "visit"] as const;
const eventPages = ["/", "/projects", "/about", "/resume", "/blog", "/contact", "/projects/e-commerce", "/projects/ai-tool"];
const eventCountries = ["United States", "United Kingdom", "Germany", "India", "Canada", "France", "Australia", "Brazil"];

let eventCounter = 0;

export function generateRealtimeEvent(): RealtimeEvent {
  eventCounter++;
  const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
  return {
    id: `evt-${Date.now()}-${eventCounter}`,
    type,
    page: eventPages[Math.floor(Math.random() * eventPages.length)],
    country: eventCountries[Math.floor(Math.random() * eventCountries.length)],
    timestamp: new Date().toLocaleTimeString(),
    duration: `${Math.floor(Math.random() * 8) + 1}m ${Math.floor(Math.random() * 60)}s`,
  };
}
