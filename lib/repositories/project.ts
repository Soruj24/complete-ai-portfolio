import { BaseRepository } from "./base";
import { Project } from "@/models/Project";
import type { Document } from "mongoose";

interface IProjectDocument extends Document {
  title: string;
  description: string;
  fullDescription?: string;
  image: string;
  technologies: string[];
  features: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: string;
  status: string;
  screenshots: string[];
  challenges: string[];
  solutions: string[];
  featured: boolean;
  difficulty: string;
  duration: string;
  teamSize: string;
  completionDate: string;
  tags: string[];
  emoji: string;
  stats: {
    completionTime: string;
    teamSize: string;
    complexity: string;
    views: number;
    likes: number;
  };
  architecture: string;
  developmentHighlights: { title: string; description: string }[];
  lessonsLearned: string[];
  createdAt: Date;
  updatedAt: Date;
}

class ProjectRepository extends BaseRepository<IProjectDocument> {
  constructor() {
    super(Project as any);
  }

  async findFeatured(): Promise<IProjectDocument[]> {
    const result = await this.findAll({
      filter: { featured: true },
      sort: "createdAt",
      order: "desc",
      limit: 100,
    });
    return result.data;
  }

  async findByCategory(category: string): Promise<IProjectDocument[]> {
    const result = await this.findAll({
      filter: { category } as any,
      sort: "createdAt",
      order: "desc",
    });
    return result.data;
  }

  async incrementViews(id: string): Promise<void> {
    await Project.findByIdAndUpdate(id, { $inc: { "stats.views": 1 } });
  }
}

export const projectRepository = new ProjectRepository();
