"use client";

import { useState, useCallback, useRef, useEffect } from "react";

export interface SearchResult {
  id: string;
  name: string;
  type: string;
  status: string;
  icon: string;
  editPath: string;
  meta?: string;
}

export interface SearchResults {
  projects: SearchResult[];
  skills: SearchResult[];
  experience: SearchResult[];
  blog: SearchResult[];
  testimonials: SearchResult[];
  media: SearchResult[];
  settings: SearchResult[];
}

const GROUP_LABELS: Record<string, string> = {
  projects: "Projects",
  skills: "Skills",
  experience: "Experience",
  blog: "Blog Posts",
  testimonials: "Testimonials",
  media: "Media",
  settings: "Settings",
};

export function useGlobalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const search = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults(null);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/search?q=${encodeURIComponent(q)}`);
      if (!res.ok) return;
      const json = await res.json();
      setResults(json.data);
    } catch {
      setResults(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(query), 200);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, search]);

  const allResults: (SearchResult & { group: string })[] = results
    ? (Object.entries(results) as [string, SearchResult[]][]).flatMap(([group, items]) =>
        items.map((item: SearchResult) => ({ ...item, group }))
      )
    : [];

  const groupedResults: { group: string; label: string; items: SearchResult[] }[] = results
    ? (Object.entries(results) as [string, SearchResult[]][])
        .filter(([, items]) => items.length > 0)
        .map(([group, items]) => ({
          group,
          label: GROUP_LABELS[group] || group,
          items,
        }))
    : [];

  const totalCount = allResults.length;

  return {
    query,
    setQuery,
    results,
    groupedResults,
    allResults,
    totalCount,
    loading,
  } as const;
}
