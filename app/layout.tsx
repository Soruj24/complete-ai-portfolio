import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Providers from "./providers";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { Suspense, lazy } from "react";
import { METADATA, SITE } from "@/lib/constants";

const ChatBotWrapper = lazy(() => import("@/components/portfolio/ChatBotWrapper"));
const PageViewTracker = lazy(() => import("@/components/page-view-tracker").then(m => ({ default: m.PageViewTracker })));

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
  fallback: ["monospace"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | ${SITE.title}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "AI Engineer",
    "Full-Stack Developer",
    "LangChain",
    "MCP Server",
    "Next.js",
    "TypeScript",
    "Portfolio",
    "Software Engineer",
    "Machine Learning",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  openGraph: {
    ...METADATA.openGraph,
    title: `${SITE.name} | ${SITE.title}`,
    description: SITE.description,
    url: SITE.url,
  },
  twitter: {
    ...METADATA.twitter,
    title: `${SITE.name} | ${SITE.title}`,
    description: SITE.description,
  },
  robots: METADATA.robots,
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: SITE.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: SITE.name,
              url: SITE.url,
              jobTitle: SITE.title,
              description: SITE.description,
              knowsAbout: [
                "Artificial Intelligence",
                "Machine Learning",
                "LangChain",
                "Full-Stack Development",
                "Next.js",
                "TypeScript",
                "System Architecture",
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ScrollProgress />
            <Suspense fallback={null}>
              <PageViewTracker />
            </Suspense>
            {children}
            <Suspense fallback={null}>
              <ChatBotWrapper />
            </Suspense>
            <Toaster position="top-right" richColors closeButton />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
