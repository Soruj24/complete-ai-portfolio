"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { certificateService } from "../services/certificate-service";
import type { Certificate, CertProvider } from "../types";

export function useCertificates() {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [provider, setProvider] = useState<CertProvider | "all">("all");

  const fetchData = useCallback(async () => {
    setLoading(true); setError(null);
    try { setCerts(await certificateService.getAll()); }
    catch (e) { setError(e instanceof Error ? e.message : "Failed to load"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = useMemo(() => {
    let result = certs;
    if (search) { const q = search.toLowerCase(); result = result.filter((c) => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.skills.some((s) => s.toLowerCase().includes(q))); }
    if (provider !== "all") result = result.filter((c) => c.provider === provider);
    return result.sort((a, b) => a.order - b.order);
  }, [certs, search, provider]);

  const addCertificate = useCallback(async (data: Partial<Certificate>) => {
    const created = await certificateService.create(data);
    setCerts((prev) => [...prev, created]);
    return created;
  }, []);

  return { certs, filtered, loading, error, search, setSearch, provider, setProvider, refresh: fetchData, addCertificate };
}
