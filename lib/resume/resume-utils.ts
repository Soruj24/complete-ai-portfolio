import type { ResumeData, ResumeSkillGroup, ResumeExperience, ResumeProject } from "./resume-types";

export function getResumeJsonLd(data: ResumeData) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.contact.name,
    jobTitle: data.contact.title,
    email: data.contact.email,
    telephone: data.contact.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: data.contact.location,
    },
    sameAs: [data.contact.github, data.contact.linkedin].filter(Boolean),
    knowsAbout: data.skills.flatMap((s) => s.items),
  };
}

export function formatSkillGroups(groups: ResumeSkillGroup[]): string {
  return groups.map((g) => `${g.category}: ${g.items.join(", ")}`).join("\n");
}

export function formatExperience(exp: ResumeExperience[]): string {
  return exp
    .map(
      (e) =>
        `${e.role} at ${e.company} (${e.period})\n${e.highlights.map((h) => `- ${h}`).join("\n")}`
    )
    .join("\n\n");
}

export function formatProjects(projects: ResumeProject[]): string {
  return projects
    .map(
      (p) =>
        `${p.name} [${p.tech}]\n${p.highlights.map((h) => `- ${h}`).join("\n")}`
    )
    .join("\n\n");
}

export function getPlainTextResume(data: ResumeData): string {
  const lines: string[] = [];
  const { contact, summary, skills, experience, education, projects, certifications, languages } =
    data;

  lines.push(contact.name.toUpperCase());
  lines.push(contact.title);
  lines.push(`${contact.location} | ${contact.phone} | ${contact.email}`);
  if (contact.github) lines.push(contact.github);
  if (contact.linkedin) lines.push(contact.linkedin);
  lines.push("");

  lines.push("SUMMARY");
  lines.push(summary);
  lines.push("");

  lines.push("TECHNICAL SKILLS");
  for (const group of skills) {
    lines.push(`- ${group.category}: ${group.items.join(", ")}`);
  }
  lines.push("");

  lines.push("EXPERIENCE");
  for (const exp of experience) {
    lines.push(`${exp.role} (${exp.company}) | ${exp.period}`);
    for (const h of exp.highlights) {
      lines.push(`- ${h}`);
    }
    lines.push("");
  }

  lines.push("EDUCATION");
  for (const edu of education) {
    lines.push(`${edu.degree} - ${edu.institution}`);
    lines.push(`${edu.location}`);
    for (const d of edu.details) {
      lines.push(`- ${d}`);
    }
    lines.push("");
  }

  lines.push("PROJECTS");
  for (const proj of projects) {
    lines.push(`${proj.name} [${proj.tech}]`);
    for (const h of proj.highlights) {
      lines.push(`- ${h}`);
    }
    lines.push("");
  }

  lines.push("CERTIFICATIONS");
  for (const cert of certifications) {
    lines.push(`- ${cert.name}`);
  }
  lines.push("");

  lines.push("LANGUAGES");
  for (const lang of languages) {
    lines.push(`- ${lang.name} (${lang.level})`);
  }

  return lines.join("\n");
}
