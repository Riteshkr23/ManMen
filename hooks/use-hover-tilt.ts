"use client";

import { useCallback } from "react";
import gsap from "gsap";

export function useHoverTilt() {
  const handleMove = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (event.clientY - rect.top) / rect.height - 0.5;

    gsap.to(target, {
      rotateY: relativeX * 12,
      rotateX: -relativeY * 12,
      transformPerspective: 900,
      transformOrigin: "center",
      duration: 0.45,
      ease: "power4.out",
    });
  }, []);

  const handleLeave = useCallback((event: React.MouseEvent<HTMLElement>) => {
    gsap.to(event.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "expo.out",
    });
  }, []);

  return { handleMove, handleLeave };
}
