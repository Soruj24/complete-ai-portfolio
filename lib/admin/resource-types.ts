export interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  images: string[];
  category: string;
  tags: string[];
  techStack: string[];
  liveUrl: string;
  repoUrl: string;
  startDate: string;
  endDate: string;
  featured: boolean;
  status: "draft" | "published" | "archived";
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectCategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  projectCount: number;
  createdAt: string;
}

export interface ProjectTag {
  _id: string;
  name: string;
  slug: string;
  projectCount: number;
  createdAt: string;
}

export interface Skill {
  _id: string;
  name: string;
  icon: string;
  category: "frontend" | "backend" | "devops" | "ai" | "tools" | "other";
  proficiency: number;
  order: number;
  featured: boolean;
  createdAt: string;
}

export interface Experience {
  _id: string;
  company: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string;
  current: boolean;
  location: string;
  companyUrl: string;
  technologies: string[];
  order: number;
  createdAt: string;
}

export interface Education {
  _id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
  description: string;
  achievements: string[];
  order: number;
  createdAt: string;
}

export interface Certificate {
  _id: string;
  name: string;
  issuer: string;
  date: string;
  url: string;
  credentialId: string;
  description: string;
  image: string;
  order: number;
  createdAt: string;
}

export interface Achievement {
  _id: string;
  title: string;
  description: string;
  date: string;
  icon: string;
  category: string;
  url: string;
  order: number;
  createdAt: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
  featured: boolean;
  order: number;
  createdAt: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  coverImage: string;
  author: string;
  status: "draft" | "published" | "archived";
  publishedAt: string;
  readTime: number;
  featured: boolean;
  views: number;
  createdAt: string;
}

export interface BlogCategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  postCount: number;
  createdAt: string;
}

export interface MediaItem {
  _id: string;
  name: string;
  url: string;
  type: "image" | "document" | "video" | "audio" | "other";
  mimeType: string;
  size: number;
  width: number;
  height: number;
  alt: string;
  folder: string;
  tags: string[];
  uploadedBy: string;
  createdAt: string;
}

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

export interface Download {
  _id: string;
  name: string;
  file: string;
  type: string;
  size: number;
  downloads: number;
  description: string;
  isPublic: boolean;
  createdAt: string;
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

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  image: string;
  role: string;
  permissions: string[];
  status: "active" | "inactive" | "banned";
  lastLogin: string;
  createdAt: string;
}

export interface AdminRole {
  _id: string;
  name: string;
  slug: string;
  description: string;
  permissions: string[];
  userCount: number;
  isSystem: boolean;
  createdAt: string;
}

export interface AdminPermission {
  _id: string;
  name: string;
  slug: string;
  group: string;
  description: string;
  createdAt: string;
}

export interface AnalyticsEvent {
  _id: string;
  event: string;
  page: string;
  referrer: string;
  browser: string;
  device: string;
  country: string;
  city: string;
  ip: string;
  userId: string;
  timestamp: string;
  metadata: Record<string, unknown>;
}

export interface SystemLog {
  _id: string;
  level: "info" | "warning" | "error" | "debug";
  message: string;
  source: string;
  userId: string;
  ip: string;
  metadata: Record<string, unknown>;
  timestamp: string;
}

export interface AuditEntry {
  _id: string;
  action: string;
  entity: string;
  entityId: string;
  userId: string;
  userName: string;
  changes: Record<string, { from: unknown; to: unknown }>;
  ip: string;
  timestamp: string;
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

export interface ApiKey {
  _id: string;
  name: string;
  key: string;
  permissions: string[];
  lastUsed: string;
  expiresAt: string;
  active: boolean;
  createdAt: string;
}

export interface Integration {
  _id: string;
  name: string;
  provider: string;
  config: Record<string, unknown>;
  enabled: boolean;
  lastSync: string;
  status: "connected" | "disconnected" | "error";
  createdAt: string;
}

export interface Backup {
  _id: string;
  name: string;
  type: "full" | "partial";
  size: number;
  files: string[];
  status: "completed" | "failed" | "in_progress";
  createdAt: string;
}

export interface AIPrompt {
  _id: string;
  name: string;
  content: string;
  category: string;
  tags: string[];
  variables: string[];
  model: string;
  temperature: number;
  maxTokens: number;
  isActive: boolean;
  version: number;
  createdAt: string;
}

export interface LLMProvider {
  _id: string;
  name: string;
  provider: "openai" | "anthropic" | "google" | "ollama" | "custom";
  apiKey: string;
  baseUrl: string;
  models: string[];
  defaultModel: string;
  enabled: boolean;
  configured: boolean;
  createdAt: string;
}

export interface MCPServer {
  _id: string;
  name: string;
  type: "stdio" | "sse" | "streamable-http";
  command: string;
  args: string[];
  env: Record<string, string>;
  enabled: boolean;
  status: "connected" | "disconnected" | "error";
  lastSeen: string;
  createdAt: string;
}

export interface WebRTCConfig {
  _id: string;
  name: string;
  iceServers: { urls: string; username?: string; credential?: string }[];
  enabled: boolean;
  createdAt: string;
}
