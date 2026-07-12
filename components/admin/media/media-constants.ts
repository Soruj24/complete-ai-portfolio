import { FolderOpen, Image, Video, FileText, Shapes, Music } from "lucide-react";
import type { MediaType } from "@/features/media/types";

export const FILE_TYPE_OPTIONS: { label: string; value: MediaType | "all"; icon: React.ElementType }[] = [
  { label: "All", value: "all", icon: FolderOpen },
  { label: "Images", value: "image", icon: Image },
  { label: "Videos", value: "video", icon: Video },
  { label: "PDFs", value: "pdf", icon: FileText },
  { label: "Documents", value: "document", icon: FileText },
  { label: "Icons", value: "icon", icon: Shapes },
  { label: "SVGs", value: "svg", icon: Shapes },
  { label: "Audio", value: "audio", icon: Music },
];
