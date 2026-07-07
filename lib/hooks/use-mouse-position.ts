"use client";

import { useEffect, useState, useCallback, type RefObject } from "react";

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

export function useMousePosition(
  ref?: RefObject<HTMLElement | null>
): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (ref?.current) {
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setPosition({
          x,
          y,
          normalizedX: rect.width > 0 ? (x / rect.width - 0.5) * 2 : 0,
          normalizedY: rect.height > 0 ? (y / rect.height - 0.5) * 2 : 0,
        });
      } else {
        setPosition({
          x: e.clientX,
          y: e.clientY,
          normalizedX: (e.clientX / window.innerWidth - 0.5) * 2,
          normalizedY: (e.clientY / window.innerHeight - 0.5) * 2,
        });
      }
    },
    [ref]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return position;
}
