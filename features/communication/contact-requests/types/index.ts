export interface ContactRequest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  budget?: string;
  message: string;
  status: "new" | "contacted" | "qualified" | "converted" | "closed";
  priority: "low" | "medium" | "high";
  source: string;
  createdAt: string;
  respondedAt?: string;
}
