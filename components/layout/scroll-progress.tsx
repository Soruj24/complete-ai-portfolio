"use client";

import { useScrollProgress } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[1px]">
      <div
        className="h-full bg-accent transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})`, transformOrigin: "left" }}
        role="progressbar"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}


