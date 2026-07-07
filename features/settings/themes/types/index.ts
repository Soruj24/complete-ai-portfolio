export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  preview: string;
  accent: string;
  mode: "light" | "dark";
  popular: boolean;
}
