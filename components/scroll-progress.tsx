"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      setProgress((scrollTop / docHeight) * 100);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed left-0 top-0 z-[70] h-[2px] w-full bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-[#b8a46f] via-[#78d8d0] to-[#9f8fff] transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
