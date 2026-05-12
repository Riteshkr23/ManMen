"use client";

import { useEffect } from "react";
import gsap from "gsap";

export function useSplitHeadline(selector: string) {
  useEffect(() => {
    let splitInstance: { chars: Element[]; revert: () => void } | null = null;

    const animate = async () => {
      const element = document.querySelector(selector);
      if (!element) return;

      const splitTextModule = await import("gsap/SplitText");
      gsap.registerPlugin(splitTextModule.SplitText);
      splitInstance = new splitTextModule.SplitText(element, {
        type: "chars,words",
      });

      gsap.fromTo(
        splitInstance.chars,
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.02,
          ease: "power4.out",
        },
      );
    };

    animate();

    return () => {
      splitInstance?.revert();
    };
  }, [selector]);
}
