export type MessageStatus = "read" | "unread" | "flagged";
export type MessageSource = "contact-form" | "newsletter" | "direct";

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  content: string;
  status: MessageStatus;
  source: MessageSource;
  category: string;
  ip?: string;
  userAgent?: string;
  readAt?: string;
  repliedAt?: string;
  createdAt: string;
}

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
  createdAt: string;
}

export interface MessagesStats {
  total: number;
  unread: number;
  flagged: number;
  contacted: number;
  newLeads: number;
}

export interface MessageFilterState {
  search: string;
  status: MessageStatus | "all";
  source: MessageSource | "all";
  category: string;
}
