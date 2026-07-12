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
