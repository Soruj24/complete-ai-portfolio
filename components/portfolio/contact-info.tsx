"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Mail, Github, Linkedin, MapPin } from "lucide-react";
import Link from "next/link";

import type { ISettings } from "@/shared/types";

interface Props {
  settings: ISettings | null;
}

const iconMap: Record<string, React.ElementType> = {
  Mail, Github, Linkedin, MapPin,
};

export function ContactInfo({ settings }: Props) {
  if (!settings) {
    return null;
  }

  const contactInfo = [
    { label: "Email", value: settings.contactEmail || "Not set", link: settings.contactEmail ? `mailto:${settings.contactEmail}` : "#", icon: "Mail" },
    { label: "LinkedIn", value: settings.linkedinUrl ? new URL(settings.linkedinUrl).hostname.replace("www.", "") : "Not set", link: settings.linkedinUrl || "#", icon: "Linkedin" },
    { label: "GitHub", value: settings.githubUrl ? new URL(settings.githubUrl).pathname.replace("/", "") : "Not set", link: settings.githubUrl || "#", icon: "Github" },
    { label: "Location", value: settings.location || "Not set", link: "#", icon: "MapPin" },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 md:gap-6">
      {contactInfo.map((info, index) => {
        const Icon = iconMap[info.icon];
        return (
          <Link key={index} href={info.link} target="_blank" rel="noopener noreferrer" className="group contact-info-item block">
            <Card className="border-none shadow-xl shadow-gray-100/50 dark:shadow-none rounded-[20px] md:rounded-[32px] overflow-hidden bg-[#fafafa] dark:bg-gray-800/50 group-hover:bg-white dark:group-hover:bg-gray-800 group-hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-4 md:p-6 flex items-center gap-4 md:gap-6">
                <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white dark:bg-gray-900 shadow-sm flex items-center justify-center text-lg md:text-2xl group-hover:bg-blue-600 dark:group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  {Icon && <Icon className="h-4 w-4 md:h-6 md:w-6" />}
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] md:text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-0.5 md:mb-1">{info.label}</p>
                  <p className="text-sm md:text-xl font-black text-gray-900 dark:text-white truncate">{info.value}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
