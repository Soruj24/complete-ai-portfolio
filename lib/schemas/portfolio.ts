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
  role: z.string().min(1, "Role is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().default(""),
  employmentType: z.string().default("full-time"),
  startDate: z.string().default(""),
  endDate: z.string().nullable().default(null),
  current: z.boolean().default(false),
  description: z.string().default(""),
  responsibilities: z.array(z.string()).default([]),
  technologies: z.array(z.string()).default([]),
  achievements: z.array(z.string()).default([]),
  order: z.number().default(0),
  enabled: z.boolean().default(true),
});

export const settingsSchema = z.object({
  // General
  siteName: z.string().min(1, "Site name is required"),
  siteDescription: z.string().default(""),
  logo: z.string().default(""),
  favicon: z.string().default(""),
  contactEmail: z.string().email("Invalid email address").or(z.string().length(0)),
  // Profile
  fullName: z.string().min(1, "Full name is required"),
  professionalTitle: z.string().min(1, "Professional title is required"),
  bio: z.string().default(""),
  location: z.string().default(""),
  phone: z.string().default(""),
  avatar: z.string().default(""),
  // Social
  githubUrl: z.string().url("Invalid URL").or(z.literal("")),
  linkedinUrl: z.string().url("Invalid URL").or(z.literal("")),
  twitterUrl: z.string().url("Invalid URL").or(z.literal("")),
  youtubeUrl: z.string().url("Invalid URL").or(z.literal("")),
  websiteUrl: z.string().url("Invalid URL").or(z.literal("")),
  specializations: z.array(z.string()).default([]),
  // SEO
  seoTitle: z.string().default(""),
  seoDescription: z.string().default(""),
  seoKeywords: z.array(z.string()).default([]),
  ogImage: z.string().default(""),
  // Appearance
  theme: z.string().default("system"),
  accentColor: z.string().default("#3b82f6"),
  layoutStyle: z.string().default("modern"),
  // Security
  allowRegistration: z.boolean().default(false),
  maintenanceMode: z.boolean().default(false),
});
