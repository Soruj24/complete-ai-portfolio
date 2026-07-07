import type { MediaType } from "../types";

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

export function getFileExtension(filename: string): string {
  const parts = filename.split(".");
  return parts.length > 1 ? `.${parts[parts.length - 1].toLowerCase()}` : "";
}

export function isImageFile(mime: string): boolean {
  return mime.startsWith("image/");
}

export function isVideoFile(mime: string): boolean {
  return mime.startsWith("video/");
}

export function isDocumentFile(mime: string): boolean {
  return mime === "application/pdf" || mime.startsWith("text/");
}

export function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").toLowerCase();
}

export function generateThumbnailUrl(url: string): string {
  const ext = getFileExtension(url);
  return url.replace(ext, "-thumb.webp");
}
