export interface SearchQuery {
  id: string;
  query: string;
  results: number;
  clicks: number;
  clickRate: number;
  date: string;
}
export interface SearchTrend {
  date: string;
  queries: number;
  avgResults: number;
}
