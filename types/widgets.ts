export interface WidgetDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface TimeSeriesPoint {
  date: string;
  value: number;
  label?: string;
}

export interface StatCardData {
  title: string;
  value: string | number;
  trend: number;
  trendLabel: string;
  comparison: string;
  icon: string;
  chart?: TimeSeriesPoint[];
}

export interface UsageData {
  label: string;
  used: number;
  total: number;
  unit: string;
  color: string;
}

export interface StatusData {
  label: string;
  status: "healthy" | "warning" | "critical" | "offline";
  uptime: string;
  responseTime: string;
}

export interface ListItem {
  id: string;
  label: string;
  value: number;
  secondary?: string;
  image?: string;
  trend?: number;
}

export interface RealtimeData {
  current: number;
  peak: number;
  sources: WidgetDataPoint[];
}

export interface WidgetConfig {
  title: string;
  description?: string;
  grid?: string;
  height?: string;
}
