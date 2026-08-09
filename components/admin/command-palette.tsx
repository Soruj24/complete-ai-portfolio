"use client";

import { useEffect, useCallback, useMemo } from "react";
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
import { useGlobalSearch } from "@/hooks/use-global-search";
import type { SearchResult } from "@/hooks/use-global-search";
import {
  LayoutDashboard, FolderKanban, Code2, Briefcase, BookOpen, Image,
  Users, Settings, Home, Moon, Sun, Mail, FileText, Sparkles,
  MessageSquare, BriefcaseBusiness, Search, Loader2,
} from "lucide-react";
import { useTheme } from "next-themes";

const ICON_MAP: Record<string, React.ElementType> = {
  FolderKanban,
  Code2,
  Briefcase,
  BriefcaseBusiness,
  BookOpen,
  Image,
  MessageSquare,
  Settings,
  FileText,
};

const STATUS_COLORS: Record<string, string> = {
  completed: "text-emerald-500",
  active: "text-emerald-500",
  current: "text-emerald-500",
  draft: "text-amber-500",
  disabled: "text-text-tertiary",
  past: "text-text-tertiary",
};

const STATUS_LABELS: Record<string, string> = {
  completed: "Published",
  active: "Active",
  current: "Current",
  draft: "Draft",
  disabled: "Disabled",
  past: "Past",
};

const navigationPages = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard", shortcut: "G D" },
  { label: "Content Hub", icon: LayoutDashboard, href: "/admin/content", shortcut: "G C" },
  { label: "Projects", icon: FolderKanban, href: "/admin/projects", shortcut: "G P" },
  { label: "Skills", icon: Code2, href: "/admin/skills", shortcut: "G S" },
  { label: "Experience", icon: Briefcase, href: "/admin/experience", shortcut: "G E" },
  { label: "Blog", icon: BookOpen, href: "/admin/blogs", shortcut: "G B" },
  { label: "Media", icon: Image, href: "/admin/media", shortcut: "G M" },
  { label: "Messages", icon: Mail, href: "/admin/messages", shortcut: "G I" },
  { label: "Testimonials", icon: MessageSquare, href: "/admin/testimonials" },
  { label: "Resume", icon: FileText, href: "/admin/resume", shortcut: "G R" },
  { label: "Settings", icon: Settings, href: "/admin/settings/general", shortcut: "G G" },
  { label: "View Site", icon: Home, href: "/", shortcut: "G H" },
];

function SearchResultItem({
  item,
  onSelect,
}: {
  item: SearchResult & { group: string };
  onSelect: () => void;
}) {
  const Icon = ICON_MAP[item.icon] || FileText;
  const statusColor = STATUS_COLORS[item.status] || "text-text-tertiary";
  const statusLabel = STATUS_LABELS[item.status] || item.status;

  return (
    <CommandItem onSelect={onSelect} className="text-[13px] gap-3 py-2">
      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-surface shrink-0">
        <Icon className="h-3.5 w-3.5 text-text-secondary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-text-primary truncate">{item.name}</p>
        {item.meta && (
          <p className="text-[11px] text-text-tertiary truncate">{item.meta}</p>
        )}
      </div>
      <span className={`text-[10px] font-medium shrink-0 ${statusColor}`}>
        {statusLabel}
      </span>
    </CommandItem>
  );
}

export function CommandPalette() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const open = useAppSelector((s) => s.ui.commandPaletteOpen);
  const { theme, setTheme } = useTheme();
  const {
    query, setQuery, groupedResults, totalCount, loading,
  } = useGlobalSearch();

  const handleSelect = useCallback(
    (item: { href?: string; action?: string; editPath?: string }) => {
      dispatch(setCommandPaletteOpen(false));
      setQuery("");
      if (item.href) {
        router.push(item.href);
      } else if (item.editPath) {
        router.push(item.editPath);
      } else if (item.action === "theme") {
        setTheme(theme === "dark" ? "light" : "dark");
      }
    },
    [dispatch, router, theme, setTheme, setQuery],
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

  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open, setQuery]);

  const hasQuery = query.trim().length > 0;

  return (
    <CommandDialog open={open} onOpenChange={(v) => dispatch(setCommandPaletteOpen(v))}>
      <CommandInput
        placeholder="Search projects, skills, experience, blog, media..."
        value={query}
        onValueChange={setQuery}
        className="text-[13px]"
      />
      <CommandList>
        <CommandEmpty className="text-[13px] py-6">
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-accent" />
              <span>Searching...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Search className="h-6 w-6 mb-2 text-text-tertiary" />
              <p>No results found for &quot;{query}&quot;</p>
            </div>
          )}
        </CommandEmpty>

        {hasQuery && groupedResults.length > 0 && (
          <>
            {groupedResults.map(({ group, label, items }) => (
              <CommandGroup key={group} heading={label} className="text-[12px]">
                {items.map((item: SearchResult) => (
                  <SearchResultItem
                    key={`${group}-${item.id}`}
                    item={{ ...item, group }}
                    onSelect={() => handleSelect(item)}
                  />
                ))}
              </CommandGroup>
            ))}
            <CommandSeparator />
          </>
        )}

        {hasQuery && !loading && groupedResults.length === 0 && query.length >= 2 && (
          <CommandGroup heading="Pages" className="text-[12px]">
            {navigationPages
              .filter((p) => p.label.toLowerCase().includes(query.toLowerCase()))
              .map((page) => (
                <CommandItem
                  key={page.href}
                  onSelect={() => handleSelect(page)}
                  className="text-[13px]"
                >
                  <page.icon className="mr-2 h-3.5 w-3.5" />
                  <span>{page.label}</span>
                  {page.shortcut && (
                    <CommandShortcut className="text-[10px]">{page.shortcut}</CommandShortcut>
                  )}
                </CommandItem>
              ))}
          </CommandGroup>
        )}

        {!hasQuery && (
          <>
            <CommandGroup heading="Quick Navigation" className="text-[12px]">
              {navigationPages.map((page) => (
                <CommandItem
                  key={page.href}
                  onSelect={() => handleSelect(page)}
                  className="text-[13px]"
                >
                  <page.icon className="mr-2 h-3.5 w-3.5" />
                  <span>{page.label}</span>
                  {page.shortcut && (
                    <CommandShortcut className="text-[10px]">{page.shortcut}</CommandShortcut>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Actions" className="text-[12px]">
              <CommandItem
                onSelect={() => handleSelect({ action: "theme" })}
                className="text-[13px]"
              >
                {theme === "dark" ? (
                  <Sun className="mr-2 h-3.5 w-3.5" />
                ) : (
                  <Moon className="mr-2 h-3.5 w-3.5" />
                )}
                <span>Toggle Theme</span>
                <CommandShortcut className="text-[10px]">T T</CommandShortcut>
              </CommandItem>
              <CommandItem
                onSelect={() => handleSelect({ href: "/admin/ai/settings" })}
                className="text-[13px]"
              >
                <Sparkles className="mr-2 h-3.5 w-3.5" />
                <span>AI Assistant</span>
              </CommandItem>
            </CommandGroup>
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
}
