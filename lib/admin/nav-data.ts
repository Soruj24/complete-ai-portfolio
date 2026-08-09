import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  FolderKanban,
  Briefcase,
  Code2,
  MessageSquare,
  BookOpen,
  FileText,
  Image,
  Mail,
  BarChart3,
  Settings2,
  GraduationCap,
  Award,
  Star,
  Download,
  Newspaper,
  MessageCircle,
  Users2,
  Shield,
  LockKeyhole,
  Activity,
  SearchIcon,
  Map,
  ScrollText,
  History,
  Bell,
  Palette,
  Link2,
  Key,
  Database,
  RefreshCw,
  Server,
  Sparkles,
  Library,
  Workflow,
  Cable,
  Phone,
  Brain,
} from "lucide-react";

export interface NavItem {
  label: string;
  icon: LucideIcon;
  href: string;
  badge?: number;
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

export const navSections: NavSection[] = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
    ],
  },
  {
    label: "Content",
    items: [
      { label: "Projects", icon: FolderKanban, href: "/admin/projects" },
      { label: "Skills", icon: Code2, href: "/admin/skills" },
      { label: "Experience", icon: Briefcase, href: "/admin/experience" },
      { label: "Education", icon: GraduationCap, href: "/admin/education" },
      { label: "Certificates", icon: Award, href: "/admin/certificates" },
      { label: "Achievements", icon: Star, href: "/admin/achievements" },
      { label: "Testimonials", icon: MessageSquare, href: "/admin/testimonials" },
      { label: "Blog", icon: BookOpen, href: "/admin/blogs" },
      { label: "Resume", icon: FileText, href: "/admin/resume" },
    ],
  },
  {
    label: "Portfolio",
    items: [
      { label: "Featured Projects", icon: FolderKanban, href: "/admin/projects" },
      { label: "Tech Stack", icon: Code2, href: "/admin/skills" },
      { label: "GitHub", icon: BarChart3, href: "/admin/analytics/github" },
      { label: "AI Projects", icon: Brain, href: "/admin/ai" },
    ],
  },
  {
    label: "System",
    items: [
      { label: "Media", icon: Image, href: "/admin/media" },
      { label: "Messages", icon: Mail, href: "/admin/messages" },
      { label: "Analytics", icon: Activity, href: "/admin/analytics" },
      { label: "Settings", icon: Settings2, href: "/admin/settings/general" },
    ],
  },
];

export const allNavItems: NavItem[] = navSections.flatMap((s) => s.items);
