export interface Chunk {
  id: string;
  content: string;
  metadata: Record<string, string>;
}

export function chunkText(
  text: string,
  source: string,
  metadata: Record<string, string> = {},
  chunkSize = 500,
  overlap = 50
): Chunk[] {
  const words = text.split(/\s+/);
  const chunks: Chunk[] = [];
  let i = 0;

  while (i < words.length) {
    const end = Math.min(i + chunkSize, words.length);
    const content = words.slice(i, end).join(" ");
    chunks.push({
      id: `${source}-${chunks.length}`,
      content,
      metadata: { ...metadata, source },
    });
    i += chunkSize - overlap;
  }

  return chunks;
}

export function chunkPortfolioData(data: {
  projects: { title: string; description: string; technologies: string[]; fullDescription?: string; caseStudy?: { problem: string; solution: string } }[];
  experience: { role: string; company: string; description?: string; highlights: string[] }[];
  skills: { name: string; description?: string; category: string }[];
}): Chunk[] {
  const chunks: Chunk[] = [];

  for (const p of data.projects) {
    const text = [
      `Project: ${p.title}`,
      p.description,
      p.fullDescription,
      p.caseStudy ? `Problem: ${p.caseStudy.problem}` : "",
      p.caseStudy ? `Solution: ${p.caseStudy.solution}` : "",
      `Technologies: ${p.technologies.join(", ")}`,
    ]
      .filter(Boolean)
      .join("\n");
    chunks.push(...chunkText(text, `project-${p.title}`, { type: "project", title: p.title }));
  }

  for (const e of data.experience) {
    const text = [
      `Role: ${e.role} at ${e.company}`,
      e.description,
      `Highlights: ${e.highlights.join(", ")}`,
    ]
      .filter(Boolean)
      .join("\n");
    chunks.push(...chunkText(text, `experience-${e.company}`, { type: "experience", company: e.company }));
  }

  for (const s of data.skills) {
    const text = `${s.name} (${s.category}): ${s.description || ""}`;
    chunks.push(...chunkText(text, `skill-${s.name}`, { type: "skill", category: s.category }));
  }

  return chunks;
}
