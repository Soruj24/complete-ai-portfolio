export type CertProvider = "aws" | "google" | "microsoft" | "coursera" | "udemy" | "linkedin" | "other";

export interface Certificate {
  id: string;
  name: string;
  provider: CertProvider;
  providerLabel: string;
  description: string;
  issueDate: string;
  expiryDate: string | null;
  credentialId: string;
  credentialUrl: string;
  skills: string[];
  image: string;
  order: number;
  createdAt: string;
}

export const PROVIDER_LABELS: Record<CertProvider, string> = {
  aws: "AWS", google: "Google", microsoft: "Microsoft", coursera: "Coursera",
  udemy: "Udemy", linkedin: "LinkedIn Learning", other: "Other",
};
