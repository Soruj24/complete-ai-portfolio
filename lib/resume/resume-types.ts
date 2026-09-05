export interface ResumeContact {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  github?: string;
  linkedin?: string;
  website?: string;
}

export interface ResumeSkillGroup {
  category: string;
  items: string[];
}

export interface ResumeExperience {
  role: string;
  company: string;
  period: string;
  highlights: string[];
}

export interface ResumeEducation {
  degree: string;
  institution: string;
  location: string;
  details: string[];
}

export interface ResumeProject {
  name: string;
  tech: string;
  highlights: string[];
}

export interface ResumeCertification {
  name: string;
  issuer?: string;
}

export interface ResumeLanguage {
  name: string;
  level: string;
}

export interface ResumeData {
  contact: ResumeContact;
  summary: string;
  skills: ResumeSkillGroup[];
  experience: ResumeExperience[];
  education: ResumeEducation[];
  projects: ResumeProject[];
  certifications: ResumeCertification[];
  languages: ResumeLanguage[];
}
