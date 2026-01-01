import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Providers from "./providers";
import { ThemeProvider } from "@/components/theme-provider";
import ChatBotWrapper from "@/components/portfolio/ChatBotWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Soruj Mahmud | Portfolio",
  description: "Professional portfolio of Soruj Mahmud",
  openGraph: {
    title: "Soruj Mahmud | Portfolio",
    description: "Professional portfolio of Soruj Mahmud",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <ChatBotWrapper />
            <Toaster position="top-right" richColors closeButton />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}