"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

export function Preloader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timeline = gsap.timeline({
      defaults: { ease: "power4.inOut" },
      onComplete: () => setHidden(true),
    });

    timeline
      .fromTo(".preloader-logo", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 })
      .to(".preloader-bar", { scaleX: 1, duration: 1, transformOrigin: "left" }, "-=0.2")
      .to(".preloader", { yPercent: -100, duration: 0.9, delay: 0.3, ease: "expo.inOut" });
  }, []);

  if (hidden) {
    return null;
  }

  return (
    <div className="preloader fixed inset-0 z-[90] flex flex-col items-center justify-center gap-4 bg-[var(--bg)]">
      <p className="preloader-logo text-3xl font-semibold tracking-[0.35em]">MANMEN</p>
      <div className="h-[2px] w-56 overflow-hidden bg-[var(--border)]">
        <div className="preloader-bar h-full origin-left scale-x-0 bg-[var(--fg)]" />
      </div>
    </div>
  );
}
