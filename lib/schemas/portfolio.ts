import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(100),
  description: z.string().min(10, "Description must be at least 10 characters"),
  fullDescription: z.string().optional(),
  image: z.string().url("Invalid image URL"),
  technologies: z
    .array(z.string())
    .min(1, "At least one technology is required"),
  features: z.array(z.string()).default([]),
  githubUrl: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
  liveUrl: z.string().url("Invalid live URL").optional().or(z.literal("")),
  category: z.string().min(1, "Category is required"),
  status: z.string().default("completed"),
  screenshots: z.array(z.string()).default([]),
  challenges: z.array(z.string()).default([]),
  solutions: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  difficulty: z.string().optional(),
  duration: z.string().optional(),
  teamSize: z.string().optional(),
  completionDate: z.string().optional(),
  tags: z.array(z.string()).default([]),
  emoji: z.string().optional(),
  stats: z
    .object({
      completionTime: z.string().optional(),
      teamSize: z.string().optional(),
      complexity: z.string().optional(),
      views: z.number().default(0),
      likes: z.number().default(0),
    })
    .default({ views: 0, likes: 0 }),
  architecture: z.string().optional(),
  developmentHighlights: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
      }),
    )
    .default([]),
  lessonsLearned: z.array(z.string()).default([]),
  futureImprovements: z.array(z.string()).optional(),
  metaDescription: z.string().optional(),
  seoTitle: z.string().optional(),
  performance: z
    .object({
      loadTime: z.number(),
      accessibility: z.number(),
      bestPractices: z.number(),
      seo: z.number(),
    })
    .optional(),
  caseStudy: z
    .object({
      problem: z.string(),
      solution: z.string(),
      results: z.array(
        z.object({
          metric: z.string(),
          value: z.string(),
          label: z.string(),
        }),
      ),
    })
    .optional(),
});

export const skillSchema = z.object({
  name: z.string().min(1, "Skill name is required"),
  level: z.number().min(0).max(100),
  icon: z.string().optional(),
  color: z.string().optional(),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required"),
});

export const experienceSchema = z.object({
  year: z.string().min(1, "Year is required"),
  role: z.string().min(1, "Role is required"),
  company: z.string().min(1, "Company is required"),
  description: z.string().optional(),
  technologies: z.array(z.string()).default([]),
  icon: z.string().optional(),
  color: z.string().optional(),
  period: z.string().default(""),
  highlights: z.array(z.string()).default([]),
});

export const settingsSchema = z.object({
  siteName: z.string().min(1, "Site name is required"),
  contactEmail: z.string().email("Invalid contact email"),
  allowRegistration: z.boolean(),
  maintenanceMode: z.boolean().optional(),
  fullName: z.string().min(1, "Full name is required"),
  professionalTitle: z.string().min(1, "Professional title is required"),
  bio: z.string().min(1, "Bio is required"),
  location: z.string().min(1, "Location is required"),
  phone: z.string().min(1, "Phone is required"),
  githubUrl: z.string().url("Invalid GitHub URL").or(z.literal("")),
  linkedinUrl: z.string().url("Invalid LinkedIn URL").or(z.literal("")),
  twitterUrl: z.string().url("Invalid Twitter URL").or(z.literal("")),
  specializations: z.array(z.string()).default([]),
});
