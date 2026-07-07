import { z } from "zod";

export const questionSchema = z.object({
  question: z.string().min(1, "Question is required").max(2000, "Question too long"),
});

export const specSchema = z.object({
  spec: z.string().min(10, "Specification too short").max(50000, "Specification too long"),
});

export const fileUploadSchema = z.object({
  maxSize: z.number().default(5 * 1024 * 1024),
  allowedTypes: z.array(z.string()).default([".pdf", ".txt", ".doc", ".docx"]),
});

export const generatedProjectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  fullDescription: z.string(),
  technologies: z.array(z.string()),
  features: z.array(z.string()),
  overview: z.string(),
  problem: z.string(),
  solution: z.string(),
  architecture: z.string(),
  challenges: z.array(z.string()),
  implementation: z.array(z.object({
    phase: z.string(),
    tasks: z.array(z.string()),
  })),
  results: z.array(z.object({
    metric: z.string(),
    value: z.string(),
    label: z.string(),
  })),
  businessImpact: z.string(),
  emoji: z.string(),
  category: z.enum(["AI", "Full Stack", "Frontend"]),
});

export type ValidatedQuestion = z.infer<typeof questionSchema>;
export type ValidatedSpec = z.infer<typeof specSchema>;
export type ValidatedGeneratedProject = z.infer<typeof generatedProjectSchema>;
