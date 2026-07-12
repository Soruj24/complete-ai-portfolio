import { BaseRepository } from "./base";
import { Skill } from "@/models/Skill";
import type { Document } from "mongoose";

interface ISkillDocument extends Document {
  name: string;
  slug?: string;
  level: number;
  icon?: string;
  color?: string;
  description?: string;
  category: string;
  yearsOfExperience?: number;
  order?: number;
  createdAt: Date;
  updatedAt: Date;
}

class SkillRepository extends BaseRepository<ISkillDocument> {
  constructor() {
    super(Skill as any);
  }

  async findByCategory(category: string): Promise<ISkillDocument[]> {
    const result = await this.findAll({
      filter: { category } as any,
      sort: "level",
      order: "desc",
    });
    return result.data;
  }

  async getCategories(): Promise<string[]> {
    return Skill.distinct("category");
  }
}

export const skillRepository = new SkillRepository();
