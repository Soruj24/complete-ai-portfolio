"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function usePageViewTrack() {
  const pathname = usePathname();

  useEffect(() => {
    const id = setTimeout(() => {
      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "pageview", path: pathname }),
        keepalive: true,
      }).catch(() => {});
    }, 500);

    return () => clearTimeout(id);
  }, [pathname]);
}
