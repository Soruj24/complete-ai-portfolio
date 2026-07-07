export interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  status: "connected" | "disconnected" | "error";
  lastSync?: string;
  color: string;
}
