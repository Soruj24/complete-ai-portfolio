"use client";

import { useRouter } from "next/navigation";
import { PenLine, FileText, Upload, Download, Sparkles } from "lucide-react";
import { ActionCard } from "./action-card";
import { useAppDispatch } from "@/lib/store/hooks";
import { toggleCommandPalette } from "@/lib/store/slices/ui-slice";

const actions = [
  {
    label: "Create Project",
    description: "Add a new portfolio project",
    icon: PenLine,
    gradient: "bg-gradient-to-br from-blue-500 to-blue-600",
    shortcut: "G P",
    href: "/admin/projects",
  },
  {
    label: "Write Blog",
    description: "Draft a new blog post",
    icon: FileText,
    gradient: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    shortcut: "G B",
    href: "/admin/blogs",
  },
  {
    label: "Upload Media",
    description: "Add files to media library",
    icon: Upload,
    gradient: "bg-gradient-to-br from-purple-500 to-purple-600",
    shortcut: "G M",
    href: "/admin/media",
  },
  {
    label: "Update Resume",
    description: "Edit your professional resume",
    icon: Download,
    gradient: "bg-gradient-to-br from-amber-500 to-amber-600",
    shortcut: "G R",
    href: "/admin/resume",
  },
  {
    label: "AI Assistant",
    description: "Generate content with AI",
    icon: Sparkles,
    gradient: "bg-gradient-to-br from-rose-500 to-rose-600",
    shortcut: "Cmd+K",
  },
];

export function QuickActions() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-text-primary">Quick Actions</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {actions.map((action, i) => (
          <ActionCard
            key={action.label}
            {...action}
            onClick={() => {
              if (action.href) router.push(action.href);
              else dispatch(toggleCommandPalette());
            }}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
