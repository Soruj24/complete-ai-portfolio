import { AdminResource } from "@/models/AdminResource";
import { Certificate } from "@/models/Certificate";
import { Testimonial } from "@/models/Testimonial";
import { Achievement } from "@/models/Achievement";
import { Resume } from "@/models/Resume";
import { SocialLink } from "@/models/SocialLink";
import { Skill } from "@/models/Skill";
import type { Model } from "mongoose";

export const ANALYTICS_RESOURCES = [
  "analytics/traffic", "analytics/search", "analytics/visitors",
  "analytics/ai", "analytics/github",
];

export const DEDICATED_MODELS: Record<string, Model<any>> = {
  certificates: Certificate,
  testimonials: Testimonial,
  achievements: Achievement,
  resume: Resume,
  "social-links": SocialLink,
  skills: Skill,
};

export function getResourceKey(pathname: string): string {
  const parts = pathname.replace(/^\/api\/admin\//, "").split("/").filter(Boolean);
  if (parts.length >= 2 && ["ai", "analytics", "security", "system"].includes(parts[0])) {
    return `${parts[0]}/${parts[1]}`;
  }
  return parts[0] || "";
}

export function getModel(key: string): Model<any> {
  return DEDICATED_MODELS[key] || AdminResource;
}

export function isDedicatedModel(key: string): boolean {
  return key in DEDICATED_MODELS;
}
