export interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  images: string[];
  category: string;
  tags: string[];
  techStack: string[];
  liveUrl: string;
  repoUrl: string;
  startDate: string;
  endDate: string;
  featured: boolean;
  status: "draft" | "published" | "archived";
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectCategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  projectCount: number;
  createdAt: string;
}

export interface ProjectTag {
  _id: string;
  name: string;
  slug: string;
  projectCount: number;
  createdAt: string;
}

export interface Skill {
  _id: string;
  name: string;
  icon: string;
  category: "frontend" | "backend" | "devops" | "ai" | "tools" | "other";
  proficiency: number;
  order: number;
  featured: boolean;
  createdAt: string;
}

export interface Experience {
  _id: string;
  company: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string;
  current: boolean;
  location: string;
  companyUrl: string;
  technologies: string[];
  order: number;
  createdAt: string;
}

export interface Education {
  _id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
  description: string;
  achievements: string[];
  order: number;
  createdAt: string;
}

export interface Certificate {
  _id: string;
  name: string;
  issuer: string;
  date: string;
  url: string;
  credentialId: string;
  description: string;
  image: string;
  order: number;
  createdAt: string;
}

export interface Achievement {
  _id: string;
  title: string;
  description: string;
  date: string;
  icon: string;
  category: string;
  url: string;
  order: number;
  createdAt: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
  featured: boolean;
  order: number;
  createdAt: string;
}
