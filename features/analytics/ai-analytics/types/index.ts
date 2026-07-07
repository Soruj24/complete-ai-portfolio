export interface AiMetric {
  model: string;
  provider: string;
  totalCalls: number;
  totalTokens: number;
  avgLatency: number;
  cost: number;
  errorRate: number;
  color: string;
}
export interface AiDailyUsage {
  date: string;
  calls: number;
  tokens: number;
}
