export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  date: string;
  issuer: string;
  url?: string;
  featured: boolean;
  order: number;
  createdAt: string;
}
