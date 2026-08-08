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
    <div className="space-y-2">
      {contactInfo.map((info, index) => {
        const Icon = iconMap[info.icon];
        return (
          <Link key={index} href={info.link} target="_blank" rel="noopener noreferrer" className="group contact-info-item block">
            <Card className="border border-border-subtle rounded-xl overflow-hidden bg-surface group-hover:border-border transition-all duration-200">
              <CardContent className="p-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-accent/8 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-200">
                  {Icon && <Icon className="h-4 w-4" />}
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold text-text-tertiary uppercase tracking-wider mb-0.5">{info.label}</p>
                  <p className="text-[13px] font-medium text-text-primary truncate">{info.value}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
