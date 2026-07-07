export interface Subscriber {
  id: string;
  email: string;
  name?: string;
  status: "active" | "unsubscribed" | "bounced" | "spam";
  source: string;
  subscribedAt: string;
  unsubscribedAt?: string;
  campaignsReceived: number;
  lastOpenedAt?: string;
}
export interface Campaign {
  id: string;
  subject: string;
  sentAt: string;
  recipients: number;
  opened: number;
  clicked: number;
  bounced: number;
  status: "draft" | "sent" | "scheduled";
}
