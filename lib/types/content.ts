export interface Resume {
  _id: string;
  name: string;
  title: string;
  summary: string;
  file: string;
  version: string;
  sections: ResumeSection[];
  isActive: boolean;
  downloads: number;
  createdAt: string;
}

export interface ResumeSection {
  type: string;
  title: string;
  content: string;
  order: number;
}

export interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  replied: boolean;
  reply: string;
  createdAt: string;
}

export interface ContactRequest {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied" | "closed";
  source: string;
  createdAt: string;
}

export interface NewsletterSubscriber {
  _id: string;
  email: string;
  name: string;
  subscribed: boolean;
  subscribedAt: string;
  source: string;
  createdAt: string;
}

export interface SEOEntry {
  _id: string;
  page: string;
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  ogTitle: string;
  ogDescription: string;
  canonical: string;
  robots: string;
  sitemapPriority: number;
  sitemapChangeFreq: string;
  createdAt: string;
}
