import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must include uppercase, lowercase, number, and special character"
    ),
  image: z.string().url("Invalid image URL").optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
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
  githubUrl: z.string().url("Invalid URL").or(z.string().length(0)),
  linkedinUrl: z.string().url("Invalid URL").or(z.string().length(0)),
  twitterUrl: z.string().url("Invalid URL").or(z.string().length(0)),
  youtubeUrl: z.string().url("Invalid URL").or(z.string().length(0)),
  websiteUrl: z.string().url("Invalid URL").or(z.string().length(0)),
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

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must include uppercase, lowercase, number, and special character"
    ),
});

export const adminUpdateUserSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  role: z.enum(["user", "admin"]).optional(),
  status: z.enum(["active", "banned"]).optional(),
  name: z.string().min(2).max(50).optional(),
});

export const adminDeleteUserSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
});

export const blogPostSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100),
  content: z.string().min(20, "Content must be at least 20 characters"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters").max(200),
  category: z.string().min(2, "Category is required"),
  image: z.string().url("Invalid image URL"),
});


