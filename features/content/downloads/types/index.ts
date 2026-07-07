export interface Download {
  id: string;
  name: string;
  description: string;
  fileType: string;
  fileSize: string;
  icon: string;
  downloads: number;
  category: string;
  url: string;
  featured: boolean;
  visible: boolean;
  order: number;
  createdAt: string;
}

export type DownloadCategory = "resume" | "code" | "document" | "presentation" | "other";
