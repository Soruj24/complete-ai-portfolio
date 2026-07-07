export interface SeoPage {
  path: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  score: number;
  issues: SeoIssue[];
  lastCrawled: string;
}

export interface SeoIssue {
  type: "error" | "warning" | "info";
  message: string;
  fix: string;
}

export interface SeoStats {
  totalPages: number;
  averageScore: number;
  errors: number;
  warnings: number;
  pagesWithIssues: number;
}

export interface SitemapEntry {
  path: string;
  priority: number;
  changefreq: string;
  lastModified: string;
}
