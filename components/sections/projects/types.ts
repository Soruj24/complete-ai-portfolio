export interface Project {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  fullDescription?: string;
  image: string;
  technologies: string[];
  features?: string[];
  githubUrl?: string;
  liveUrl?: string;
  category?: string;
  featured?: boolean;
  emoji?: string;
  caseStudy?: {
    problem?: string;
    solution?: string;
    results?: { metric: string; value: string; label?: string }[];
  };
}
