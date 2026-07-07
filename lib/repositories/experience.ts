import { BaseRepository } from "./base";
import { Experience } from "@/models/Experience";
import type { Document } from "mongoose";

interface IExperienceDocument extends Document {
  year: string;
  role: string;
  company: string;
  description?: string;
  technologies?: string[];
  icon?: string;
  color?: string;
  period: string;
  highlights: string[];
  createdAt: Date;
  updatedAt: Date;
}

class ExperienceRepository extends BaseRepository<IExperienceDocument> {
  constructor() {
    super(Experience as any);
  }
}

export const experienceRepository = new ExperienceRepository();
