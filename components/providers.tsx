"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Preloader } from "@/components/preloader";
import { ScrollProgress } from "@/components/scroll-progress";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SmoothScroll />
      <ScrollProgress />
      <Preloader />
      {children}
    </ThemeProvider>
  );
}
