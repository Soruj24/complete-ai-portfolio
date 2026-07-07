"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Mail, Github, Linkedin } from "lucide-react";
import Link from "next/link";

import type { ISettings } from "@/shared/types";

interface Props {
  settings: ISettings | null;
}

const fallbackEmail = "sorujmahmudb2h@gmail.com";
const fallbackLinkedIn = "Soruj Mahmud";
const fallbackGithub = "sorujmahmud";
const fallbackLocation = "Tangail, Bangladesh";

export function ContactInfo({ settings }: Props) {
  const contactInfo = [
    { label: "Email", value: (settings?.contactEmail as string) || fallbackEmail, link: `mailto:${(settings?.contactEmail as string) || fallbackEmail}` },
    { label: "LinkedIn", value: fallbackLinkedIn, link: (settings?.linkedinUrl as string) || "#" },
    { label: "GitHub", value: fallbackGithub, link: (settings?.githubUrl as string) || "https://github.com/sorujmahmud" },
    { label: "Location", value: (settings?.location as string) || fallbackLocation, link: "#" },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 md:gap-6">
      {contactInfo.map((info, index) => (
        <Link key={index} href={info.link} target="_blank" rel="noopener noreferrer" className="group contact-info-item block">
          <Card className="border-none shadow-xl shadow-gray-100/50 dark:shadow-none rounded-[20px] md:rounded-[32px] overflow-hidden bg-[#fafafa] dark:bg-gray-800/50 group-hover:bg-white dark:group-hover:bg-gray-800 group-hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-4 md:p-6 flex items-center gap-4 md:gap-6">
              <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white dark:bg-gray-900 shadow-sm flex items-center justify-center text-lg md:text-2xl group-hover:bg-blue-600 dark:group-hover:bg-blue-500 group-hover:text-white transition-colors">
                {info.label === "Email" && <Mail className="h-4 w-4 md:h-6 md:w-6" />}
                {info.label === "LinkedIn" && <Linkedin className="h-4 w-4 md:h-6 md:w-6" />}
                {info.label === "GitHub" && <Github className="h-4 w-4 md:h-6 md:w-6" />}
              </div>
              <div className="min-w-0">
                <p className="text-[9px] md:text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-0.5 md:mb-1">{info.label}</p>
                <p className="text-sm md:text-xl font-black text-gray-900 dark:text-white truncate">{String(info.value)}</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
