"use client";

import { useEffect, useState } from "react";
import { useIntersectionObserver } from "./use-intersection-observer";

export function useAnimatedCounter(
  target: number,
  duration: number = 2000,
  enabled: boolean = true
): [React.RefObject<HTMLDivElement | null>, number] {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true,
  });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible || !enabled) return;

    let startTime: number | null = null;
    let animationId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isVisible, target, duration, enabled]);

  return [ref, count];
}
