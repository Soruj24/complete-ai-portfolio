"use client";

import { useState, useEffect } from "react";
import type { ISettings, ISocialLink } from "@/shared/types";

interface Cache {
  settings: ISettings | null;
  socialLinks: ISocialLink[];
}

let cache: Cache | null = null;
let pending: Promise<Cache> | null = null;

async function fetchAll(): Promise<Cache> {
  const [sr, lr] = await Promise.all([
    fetch("/api/settings/public"),
    fetch("/api/social-links"),
  ]);

  const result: Cache = { settings: null, socialLinks: [] };

  if (sr.ok) {
    const d = await sr.json();
    if (d.success) result.settings = d.data;
  }
  if (lr.ok) {
    const d = await lr.json();
    if (d.success) result.socialLinks = d.data;
  }

  return result;
}

export function useSiteSettings() {
  const [data, setData] = useState<Cache>(() => cache ?? { settings: null, socialLinks: [] });
  const [loading, setLoading] = useState(!cache);

  useEffect(() => {
    if (cache) return;
    if (!pending) pending = fetchAll().then((res) => { cache = res; return res; });
    let cancelled = false;
    pending.then((res) => {
      if (!cancelled) { setData(res); setLoading(false); }
    });
    return () => { cancelled = true; };
  }, []);

  return { settings: data.settings, socialLinks: data.socialLinks, loading };
}
