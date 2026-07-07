export interface DbTable {
  name: string;
  rows: number;
  size: string;
  engine: string;
  collation: string;
  updatedAt: string;
}
export interface DbMetric {
  label: string;
  value: string;
  change: string;
  up: boolean;
}
