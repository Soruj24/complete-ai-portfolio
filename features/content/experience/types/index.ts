export type EmploymentType = "full-time" | "part-time" | "contract" | "freelance" | "internship";

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  employmentType: EmploymentType;
  description: string;
  highlights: string[];
  techStack: string[];
  startDate: string;
  endDate: string | null;
  current: boolean;
  order: number;
  createdAt: string;
}

export const EMPLOYMENT_LABELS: Record<EmploymentType, string> = {
  "full-time": "Full-Time", "part-time": "Part-Time", contract: "Contract",
  freelance: "Freelance", internship: "Internship",
};
