export type EmploymentType = "full-time" | "part-time" | "contract" | "freelance" | "internship";

export interface Experience {
  _id: string;
  id?: string;
  role: string;
  company: string;
  location: string;
  employmentType: EmploymentType;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
  order: number;
  enabled: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ExperienceFormData {
  role: string;
  company: string;
  location: string;
  employmentType: EmploymentType;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
  order: number;
  enabled: boolean;
}

export const EMPTY_EXPERIENCE_FORM: ExperienceFormData = {
  role: "",
  company: "",
  location: "",
  employmentType: "full-time",
  startDate: "",
  endDate: null,
  current: false,
  description: "",
  responsibilities: [],
  technologies: [],
  achievements: [],
  order: 0,
  enabled: true,
};

export const EMPLOYMENT_LABELS: Record<EmploymentType, string> = {
  "full-time": "Full-Time",
  "part-time": "Part-Time",
  contract: "Contract",
  freelance: "Freelance",
  internship: "Internship",
};

export const EMPLOYMENT_TYPES: EmploymentType[] = [
  "full-time", "part-time", "contract", "freelance", "internship",
];
