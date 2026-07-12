import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

interface SectionAnimationOptions {
  deps?: unknown[];
  scrollTrigger?: boolean;
}

export function useSectionAnimation(
  scope: RefObject<HTMLDivElement | null>,
  buildAnimations: (tl: GSAPTimeline) => void,
  options: SectionAnimationOptions = {},
) {
  const { deps = [], scrollTrigger = true } = options;

  useGSAP(
    () => {
      const tl = scrollTrigger
        ? gsap.timeline({
            scrollTrigger: {
              trigger: scope.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          })
        : gsap.timeline();
      buildAnimations(tl);
    },
    { scope, dependencies: deps },
  );
}
