import { chunkPortfolioData } from "./chunker";
import { indexChunks, isIndexed } from "./vector-store";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experience";
import { skillCategories } from "@/data/skills";

export async function seedPortfolioData(): Promise<void> {
  if (isIndexed()) return;

  const allSkills = skillCategories.flatMap((cat) =>
    cat.skills.map((s) => ({
      name: s.name,
      description: s.description,
      category: cat.title,
    }))
  );

  const chunks = chunkPortfolioData({
    projects: projects.map((p) => ({
      title: p.title,
      description: p.description,
      technologies: p.technologies,
      fullDescription: p.fullDescription,
      caseStudy: p.caseStudy,
    })),
    experience: experiences.map((e) => ({
      role: e.role,
      company: e.company,
      description: e.description,
      highlights: e.highlights,
    })),
    skills: allSkills,
  });

  await indexChunks(chunks);
}
