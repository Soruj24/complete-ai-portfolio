export interface LoginEntry {
  id: string;
  user: string;
  ip: string;
  location: string;
  device: string;
  browser: string;
  status: "success" | "failed";
  timestamp: string;
  reason?: string;
}
