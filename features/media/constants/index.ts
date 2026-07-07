import { Image, Video, FileText, Shapes, Music, File } from "lucide-react";
import type { MediaType } from "../types";

export const FILE_TYPE_OPTIONS: { label: string; value: MediaType | "all"; icon: React.ElementType }[] = [
  { label: "All", value: "all", icon: File },
  { label: "Images", value: "image", icon: Image },
  { label: "Videos", value: "video", icon: Video },
  { label: "PDFs", value: "pdf", icon: FileText },
  { label: "Documents", value: "document", icon: FileText },
  { label: "Icons", value: "icon", icon: Shapes },
  { label: "SVGs", value: "svg", icon: Shapes },
  { label: "Audio", value: "audio", icon: Music },
];

export const TYPE_COLORS: Record<MediaType, string> = {
  image: "text-accent bg-accent/10",
  video: "text-purple-500 bg-purple-500/10",
  pdf: "text-error bg-error/10",
  document: "text-info bg-info/10",
  icon: "text-amber-500 bg-amber-500/10",
  svg: "text-success bg-success/10",
  audio: "text-pink-500 bg-pink-500/10",
};

export const SORT_OPTIONS = [
  { label: "Name", value: "name" as const },
  { label: "Date", value: "date" as const },
  { label: "Size", value: "size" as const },
];

export const MEDIA_PAGE_SIZE = 30;

import type { Folder, Tag, Category, StorageStats } from "../types";

export const FOLDERS: Folder[] = [];
export const TAGS: Tag[] = [];
export const CATEGORIES: Category[] = [];

export const MOCK_STORAGE: StorageStats = {
  total: 0, used: 0, images: 0, videos: 0, documents: 0, icons: 0, audio: 0,
};


