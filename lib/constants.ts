export const SITE = {
  name: "Soruj Mahmud",
  title: "AI Engineer & Full-Stack Developer",
  description:
    "I architect production-grade AI systems and full-stack applications. Specializing in LangChain, MCP servers, and scalable web infrastructure.",
  tagline: "Building Intelligent Systems That Scale",
  url: "https://soruj-mahmud.dev",
  location: "Bangladesh",
  email: "sorujmahmudb2h@gmail.com",
  since: 2021,
  resumeUrl: "/Soruj_Mahmud_CV.txt",
} as const;

export const SOCIAL = {
  github: { url: "https://github.com/Soruj24", label: "GitHub", handle: "Soruj24" },
  linkedin: { url: "https://linkedin.com/in/soruj-mahmud", label: "LinkedIn", handle: "soruj-mahmud" },
  twitter: { url: "https://twitter.com/soruj_mahmud", label: "X / Twitter", handle: "@soruj_mahmud" },
  email: { url: "mailto:sorujmahmudb2h@gmail.com", label: "Email" },
} as const;

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
] as const;

export const CLIENT_LOGOS = [];

export const METADATA = {
  openGraph: {
    type: "website" as const,
    locale: "en_US",
    siteName: SITE.name,
  },
  twitter: {
    card: "summary_large_image" as const,
    creator: "@soruj_mahmud",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
} as const;

export const GITHUB_USERNAME = "Soruj24" as const;
