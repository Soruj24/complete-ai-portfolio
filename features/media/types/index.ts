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

export interface StorageStats {
  total: number;
  used: number;
  images: number;
  videos: number;
  documents: number;
  icons: number;
  audio: number;
}

export interface MediaFilterState {
  search: string;
  type: MediaType | "all";
  folder: string;
  sort: "name" | "date" | "size";
  order: "asc" | "desc";
  activeTags: string[];
  activeCategories: string[];
}

export interface UploadFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: "pending" | "uploading" | "done" | "error";
  error?: string;
}
