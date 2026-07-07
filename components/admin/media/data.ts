export type MediaType = "image" | "video" | "pdf" | "document" | "icon" | "svg" | "audio";

export interface MediaItem {
  id: string;
  name: string;
  type: MediaType;
  mime: string;
  size: number;
  dimensions?: string;
  url: string;
  thumbnail: string;
  folder: string;
  tags: string[];
  category: string;
  favorite: boolean;
  createdAt: string;
  modifiedAt: string;
  version: number;
  versions: MediaVersion[];
  alt?: string;
  duration?: string;
}

export interface MediaVersion {
  version: number;
  size: number;
  dimensions?: string;
  createdAt: string;
  note: string;
}

export interface Folder {
  id: string;
  name: string;
  parent: string | null;
  count: number;
  icon: string;
}

export interface Tag {
  id: string;
  name: string;
  count: number;
  color: string;
}

export interface Category {
  id: string;
  name: string;
  count: number;
}

export const FOLDERS: Folder[] = [
  { id: "root", name: "All Files", parent: null, count: 0, icon: "Folder" },
  { id: "images", name: "Images", parent: "root", count: 48, icon: "Image" },
  { id: "videos", name: "Videos", parent: "root", count: 12, icon: "Video" },
  { id: "documents", name: "Documents", parent: "root", count: 24, icon: "FileText" },
  { id: "icons", name: "Icons", parent: "root", count: 36, icon: "Shapes" },
  { id: "uploads", name: "Uploads", parent: "root", count: 18, icon: "Upload" },
  { id: "projects", name: "Projects", parent: "root", count: 9, icon: "Briefcase" },
  { id: "project-ai", name: "AI Dashboard", parent: "projects", count: 6, icon: "Brain" },
  { id: "project-ecom", name: "E-Commerce", parent: "projects", count: 3, icon: "ShoppingCart" },
  { id: "logos", name: "Logos & Branding", parent: "icons", count: 15, icon: "Palette" },
  { id: "screenshots", name: "Screenshots", parent: "images", count: 22, icon: "Monitor" },
];

export const TAGS: Tag[] = [
  { id: "t1", name: "hero", count: 8, color: "accent" },
  { id: "t2", name: "featured", count: 15, color: "success" },
  { id: "t3", name: "background", count: 12, color: "purple" },
  { id: "t4", name: "thumbnail", count: 20, color: "amber" },
  { id: "t5", name: "logo", count: 10, color: "info" },
  { id: "t6", name: "screenshot", count: 22, color: "pink" },
  { id: "t7", name: "optimized", count: 30, color: "emerald" },
  { id: "t8", name: "draft", count: 6, color: "slate" },
];

export const CATEGORIES: Category[] = [
  { id: "c1", name: "Marketing", count: 28 },
  { id: "c2", name: "Branding", count: 18 },
  { id: "c3", name: "Development", count: 35 },
  { id: "c4", name: "Design", count: 42 },
  { id: "c5", name: "Documentation", count: 15 },
  { id: "c6", name: "Social Media", count: 22 },
];

function makeId() { return Math.random().toString(36).slice(2, 9); }

const imageNames = [
  "hero-banner-dark", "team-photo-2026", "product-screenshot", "dashboard-preview",
  "office-workspace", "architecture-diagram", "mockup-desktop", "mockup-mobile",
  "gradient-background", "pattern-tile", "icon-set-primary", "icon-set-secondary",
  "logo-horizontal", "logo-vertical", "logo-icon-only", "favicon-final",
  "screenshot-analytics", "screenshot-settings", "screenshot-profile", "banner-about",
  "hero-section-v2", "testimonial-avatar-1", "testimonial-avatar-2", "project-cover-ai",
  "project-cover-ecom", "project-cover-portfolio", "social-card-twitter", "social-card-linkedin",
  "og-image-home", "og-image-blog", "email-header", "newsletter-banner",
  "chart-q1-results", "chart-q2-projections", "wireframe-home-v3", "wireframe-dashboard",
  "style-guide-colors", "style-guide-typography", "component-library", "ui-kit-buttons",
];

const videoNames = [
  "product-demo-2026", "hero-video-loop", "tutorial-onboarding",
  "meeting-recording-q2", "animation-logo-reveal", "testimonial-reel",
  "screencast-workflow", "motion-background", "team-all-hands", "conference-talk",
  "social-media-teaser", "explainer-short",
];

const docNames = [
  "proposal-q3", "technical-specs", "api-documentation", "style-guide-v3",
  "onboarding-manual", "security-audit", "roadmap-2026", "brand-guidelines",
  "contract-template", "presentation-pitch", "report-annual", "case-study-client",
  "meeting-notes-q2", "project-plan", "release-notes-v2", "design-system-docs",
  "privacy-policy", "terms-of-service", "cookie-policy", "accessibility-guide",
  "seo-checklist", "content-strategy", "social-media-calendar", "email-template",
];

const iconNames = [
  "icon-arrow-right", "icon-checkmark", "icon-close", "icon-menu-hamburger",
  "icon-search", "icon-settings", "icon-user", "icon-bell",
  "icon-download", "icon-upload", "icon-share", "icon-star",
  "icon-heart", "icon-trash", "icon-edit", "icon-plus",
  "icon-minus", "icon-chevron-down", "icon-external-link", "icon-copy",
  "icon-moon", "icon-sun", "icon-globe", "icon-lock",
  "icon-mail", "icon-phone", "icon-map-pin", "icon-calendar",
  "icon-clock", "icon-camera", "icon-video", "icon-music",
  "icon-file", "icon-folder", "icon-image", "icon-code",
];

const svgNames = [
  "logo-mark-animated", "divider-wave", "divider-angles", "background-grid",
  "background-dots", "ornament-floral", "pattern-hexagon", "pattern-circuit",
  "icon-weather-sun", "icon-weather-cloud", "chart-pie-icon", "chart-bar-icon",
  "badge-premium", "badge-new", "badge-sale", "badge-certified",
  "arrow-curve", "arrow-circle", "shape-triangle", "shape-diamond",
];

const audioNames = [
  "podcast-episode-42", "background-music-loop", "sound-effect-notification",
  "voiceover-hero", "ambient-office", "sound-effect-success",
  "interview-client", "music-intro",
];

function generateVersions(baseName: string, count: number): MediaVersion[] {
  return Array.from({ length: count }, (_, i) => ({
    version: i + 1,
    size: Math.floor(Math.random() * 2000000) + 50000,
    dimensions: ["1920x1080", "1920x1080", "1280x720"][i % 3],
    createdAt: new Date(Date.now() - (count - i) * 86400000 * 3).toISOString(),
    note: i === count - 1 ? "Original upload" : `Edit ${String.fromCharCode(65 + i)}`,
  })).reverse();
}

function buildItems<T>(names: string[], type: MediaType, mime: string, folder: string, extra: Partial<T> = {}): MediaItem[] {
  return names.map((name, i) => ({
    id: makeId(),
    name,
    type,
    mime,
    size: Math.floor(Math.random() * 5000000) + 10000,
    dimensions: type === "audio" ? undefined : `${[1920, 1280, 800, 640, 2560][i % 5]}x${[1080, 720, 600, 480, 1440][i % 5]}`,
    url: `/media/${type}/${name}.${mime.split("/")[1]}`,
    thumbnail: `/media/${type}/${name}-thumb.webp`,
    folder,
    tags: TAGS.filter(() => Math.random() > 0.6).map((t) => t.name),
    category: CATEGORIES[i % CATEGORIES.length].name,
    favorite: Math.random() > 0.8,
    createdAt: new Date(Date.now() - i * 86400000 * 2).toISOString(),
    modifiedAt: new Date(Date.now() - i * 86400000).toISOString(),
    version: 3,
    versions: generateVersions(name, 3),
    ...extra,
  }));
}

export const ALL_MEDIA: MediaItem[] = [
  ...buildItems(imageNames, "image", "image/webp", "images", { alt: "Image description" }),
  ...buildItems(videoNames, "video", "video/mp4", "videos", { duration: `${Math.floor(Math.random() * 120) + 10}s` }),
  ...buildItems(docNames, "document", "application/pdf", "documents"),
  ...buildItems(iconNames, "icon", "image/svg+xml", "icons"),
  ...buildItems(svgNames, "svg", "image/svg+xml", "icons"),
  ...buildItems(audioNames, "audio", "audio/mpeg", "uploads", { duration: `${Math.floor(Math.random() * 300) + 30}s` }),
].map((item, i) => ({ ...item, id: `media-${i + 1}` }));

export const STORAGE_STATS = {
  total: 25600000000,
  used: 8240000000,
  images: 3200000000,
  videos: 2800000000,
  documents: 1200000000,
  icons: 560000000,
  audio: 480000000,
};

export function formatSize(bytes: number): string {
  if (bytes >= 1073741824) return `${(bytes / 1073741824).toFixed(1)} GB`;
  if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(1)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${bytes} B`;
}

export function getMediaTypeIcon(type: MediaType): string {
  const map: Record<MediaType, string> = {
    image: "Image", video: "Video", pdf: "FileText", document: "FileText",
    icon: "Shapes", svg: "Shapes", audio: "Music",
  };
  return map[type];
}

export function getTypeColor(type: MediaType): string {
  const map: Record<MediaType, string> = {
    image: "text-accent bg-accent/10",
    video: "text-purple-500 bg-purple-500/10",
    pdf: "text-error bg-error/10",
    document: "text-info bg-info/10",
    icon: "text-amber-500 bg-amber-500/10",
    svg: "text-success bg-success/10",
    audio: "text-pink-500 bg-pink-500/10",
  };
  return map[type];
}
