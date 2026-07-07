import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(200),
  slug: z.string().min(2).max(200).regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with dashes"),
  description: z.string().min(10, "Description must be at least 10 characters").max(500),
  content: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).default([]),
  techStack: z.array(z.string()).default([]),
  status: z.enum(["draft", "in-progress", "review", "published", "archived"]).default("draft"),
  priority: z.enum(["low", "medium", "high", "critical"]).default("medium"),
  featured: z.boolean().default(false),
  demoUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  repoUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  client: z.string().optional(),
  budget: z.string().optional(),
  teamSize: z.number().min(1).max(100).default(1),
});

export type ProjectFormInput = z.infer<typeof projectSchema>;
