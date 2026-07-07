"use client";

import { useScrollProgress } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[2px]">
      <div
        className="h-full bg-gradient-to-r from-accent via-purple-500 to-blue-500 transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})`, transformOrigin: "left" }}
        role="progressbar"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}

export function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
      <span className="text-[10px] font-medium tracking-widest uppercase text-text-tertiary">
        Scroll
      </span>
      <div className="w-[1px] h-8 bg-gradient-to-b from-text-tertiary to-transparent" />
    </div>
  );
}
