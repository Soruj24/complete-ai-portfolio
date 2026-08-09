"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setCommandPaletteOpen } from "@/lib/store/slices/ui-slice";
import {
  LayoutDashboard, FolderKanban, Code2, Briefcase, BookOpen, Image,
  Users, Settings, Home, Moon, Sun, Mail, FileText, Sparkles,
} from "lucide-react";
import { useTheme } from "next-themes";

const pages = [
  { label: "Command Center", icon: LayoutDashboard, href: "/admin/dashboard", shortcut: "G D" },
  { label: "Projects", icon: FolderKanban, href: "/admin/projects", shortcut: "G P" },
  { label: "Skills", icon: Code2, href: "/admin/skills", shortcut: "G S" },
  { label: "Experience", icon: Briefcase, href: "/admin/experience", shortcut: "G E" },
  { label: "Blogs", icon: BookOpen, href: "/admin/blogs", shortcut: "G B" },
  { label: "Media Library", icon: Image, href: "/admin/media", shortcut: "G M" },
  { label: "Messages", icon: Mail, href: "/admin/messages", shortcut: "G I" },
  { label: "Users", icon: Users, href: "/admin/users", shortcut: "G U" },
  { label: "Resume", icon: FileText, href: "/admin/resume", shortcut: "G R" },
  { label: "Settings", icon: Settings, href: "/admin/settings/general", shortcut: "G G" },
  { label: "View Site", icon: Home, href: "/", shortcut: "G H" },
];

export function CommandPalette() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const open = useAppSelector((s) => s.ui.commandPaletteOpen);
  const { theme, setTheme } = useTheme();

  const handleSelect = useCallback(
    (item: (typeof pages)[number] | { label: string; icon: typeof Sun; action: string; shortcut: string }) => {
      dispatch(setCommandPaletteOpen(false));
      if ("href" in item) {
        router.push(item.href);
      } else if (item.action === "theme") {
        setTheme(theme === "dark" ? "light" : "dark");
      }
    },
    [dispatch, router, theme, setTheme],
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        dispatch(setCommandPaletteOpen(!open));
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [dispatch, open]);

  return (
    <CommandDialog open={open} onOpenChange={(v) => dispatch(setCommandPaletteOpen(v))}>
      <CommandInput placeholder="Search pages, actions, or settings..." className="text-[13px]" />
      <CommandList>
        <CommandEmpty className="text-[13px]">No results found.</CommandEmpty>
        <CommandGroup heading="Navigate" className="text-[12px]">
          {pages.map((page) => (
            <CommandItem key={page.href} onSelect={() => handleSelect(page)} className="text-[13px]">
              <page.icon className="mr-2 h-3.5 w-3.5" />
              <span>{page.label}</span>
              <CommandShortcut className="text-[10px]">{page.shortcut}</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions" className="text-[12px]">
          <CommandItem onSelect={() => handleSelect({ label: "Toggle Theme", icon: Sun, action: "theme", shortcut: "T T" })} className="text-[13px]">
            {theme === "dark" ? <Sun className="mr-2 h-3.5 w-3.5" /> : <Moon className="mr-2 h-3.5 w-3.5" />}
            <span>Toggle Theme</span>
            <CommandShortcut className="text-[10px]">T T</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => router.push("/admin/ai/settings")} className="text-[13px]">
            <Sparkles className="mr-2 h-3.5 w-3.5" />
            <span>AI Assistant</span>
            <CommandShortcut className="text-[10px]">G A</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
