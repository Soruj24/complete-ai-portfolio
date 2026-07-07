export interface ResumeSection {
  id: string;
  title: string;
  type: "summary" | "experience" | "education" | "skills" | "certifications" | "custom";
  content: string;
  order: number;
  visible: boolean;
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
}

export interface ResumeExportConfig {
  includePhoto: boolean;
  includeContact: boolean;
  includeSocial: boolean;
  sections: string[];
  template: string;
}
