import { z } from "zod";

const VALID_TYPES = ["image", "video", "pdf", "document", "icon", "svg", "audio"] as const;

export const mediaItemSchema = z.object({
  name: z.string().min(1, "Name is required").max(200, "Name is too long"),
  type: z.enum(VALID_TYPES),
  folder: z.string().min(1, "Folder is required"),
  tags: z.array(z.string()).default([]),
  category: z.string().default("Uncategorized"),
  alt: z.string().max(500, "Alt text is too long").optional(),
});

export const mediaRenameSchema = z.object({
  name: z.string().min(1, "Name is required").max(200, "Name is too long")
    .regex(/^[a-zA-Z0-9._-]+$/, "Name can only contain letters, numbers, dots, dashes, and underscores"),
});

export const uploadSchema = z.object({
  files: z.array(z.instanceof(File)).min(1, "Select at least one file"),
  folder: z.string().min(1, "Folder is required"),
  tags: z.array(z.string()).default([]),
});

export type MediaItemInput = z.infer<typeof mediaItemSchema>;
export type MediaRenameInput = z.infer<typeof mediaRenameSchema>;
export type UploadInput = z.infer<typeof uploadSchema>;
