export interface StorageBucket {
  name: string;
  type: string;
  files: number;
  used: number;
  quota: number;
  provider: string;
  region: string;
  color: string;
}
