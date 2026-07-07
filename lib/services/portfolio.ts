import {
  projectRepository,
  skillRepository,
  experienceRepository,
  settingsRepository,
} from "@/lib/repositories";
import type { IProject, ISkill, IExperience, ISettings, PaginationInfo } from "@/shared/types";

class PortfolioService {
  async getProjects(params?: {
    page?: number;
    limit?: number;
    category?: string;
    featured?: boolean;
  }): Promise<{ data: IProject[]; pagination: PaginationInfo }> {
    const filter: Record<string, unknown> = {};
    if (params?.category) filter.category = params.category;
    if (params?.featured) filter.featured = true;

    const result = await projectRepository.findAll({
      page: params?.page,
      limit: params?.limit,
      filter: filter as any,
      sort: "createdAt",
      order: "desc",
    });

    return {
      data: result.data as unknown as IProject[],
      pagination: result.pagination,
    };
  }

  async getProjectById(id: string): Promise<IProject | null> {
    const project = await projectRepository.findById(id);
    if (project) {
      await projectRepository.incrementViews(id);
    }
    return project as unknown as IProject | null;
  }

  async createProject(data: any): Promise<IProject> {
    const project = await projectRepository.create(data);
    return project as unknown as IProject;
  }

  async updateProject(id: string, data: any): Promise<IProject | null> {
    const project = await projectRepository.update(id, data);
    return project as unknown as IProject | null;
  }

  async deleteProject(id: string): Promise<IProject | null> {
    const project = await projectRepository.delete(id);
    return project as unknown as IProject | null;
  }

  async getSkills(params?: { category?: string }): Promise<ISkill[]> {
    if (params?.category) {
      return (await skillRepository.findByCategory(params.category)) as unknown as ISkill[];
    }
    const result = await skillRepository.findAll({ sort: "level", order: "desc" });
    return result.data as unknown as ISkill[];
  }

  async createSkill(data: any): Promise<ISkill> {
    const skill = await skillRepository.create(data);
    return skill as unknown as ISkill;
  }

  async updateSkill(id: string, data: any): Promise<ISkill | null> {
    const skill = await skillRepository.update(id, data);
    return skill as unknown as ISkill | null;
  }

  async deleteSkill(id: string): Promise<ISkill | null> {
    const skill = await skillRepository.delete(id);
    return skill as unknown as ISkill | null;
  }

  async getExperience(): Promise<IExperience[]> {
    const result = await experienceRepository.findAll({ sort: "year", order: "desc" });
    return result.data as unknown as IExperience[];
  }

  async createExperience(data: any): Promise<IExperience> {
    const exp = await experienceRepository.create(data);
    return exp as unknown as IExperience;
  }

  async updateExperience(id: string, data: any): Promise<IExperience | null> {
    const exp = await experienceRepository.update(id, data);
    return exp as unknown as IExperience | null;
  }

  async deleteExperience(id: string): Promise<IExperience | null> {
    const exp = await experienceRepository.delete(id);
    return exp as unknown as IExperience | null;
  }

  async getSettings(): Promise<ISettings | null> {
    const settings = await settingsRepository.getSingleton();
    return settings as unknown as ISettings | null;
  }

  async upsertSettings(data: any): Promise<ISettings> {
    const settings = await settingsRepository.upsert(data);
    return settings as unknown as ISettings;
  }
}

export const portfolioService = new PortfolioService();
