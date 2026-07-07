export type DegreeType = "high-school" | "associate" | "bachelor" | "master" | "phd" | "certificate" | "diploma";

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  degreeType: DegreeType;
  location: string;
  description: string;
  highlights: string[];
  startDate: string;
  endDate: string | null;
  current: boolean;
  gpa?: string;
  order: number;
  createdAt: string;
}

export const DEGREE_LABELS: Record<DegreeType, string> = {
  "high-school": "High School", associate: "Associate", bachelor: "Bachelor's",
  master: "Master's", phd: "PhD", certificate: "Certificate", diploma: "Diploma",
};
