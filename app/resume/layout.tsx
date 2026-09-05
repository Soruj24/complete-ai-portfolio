import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Soruj Mahmud - Resume",
  description: "Print-ready resume of Soruj Mahmud - AI Engineer & Full-Stack Developer",
  robots: { index: false, follow: false },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
