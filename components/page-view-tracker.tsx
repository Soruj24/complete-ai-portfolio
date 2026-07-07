"use client";

import { usePageViewTrack } from "@/hooks/use-page-view-track";

export function PageViewTracker() {
  usePageViewTrack();
  return null;
}
