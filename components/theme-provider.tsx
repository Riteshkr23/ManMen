"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import gsap from "gsap";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const palette = {
  light: {
    "--bg": "#f5f5f2",
    "--fg": "#0d0d0f",
    "--muted": "#5f5f67",
    "--surface": "#ffffff",
    "--border": "#d7d7d2",
  },
  dark: {
    "--bg": "#090a0d",
    "--fg": "#f4f4f6",
    "--muted": "#9494a4",
    "--surface": "#121318",
    "--border": "#2d2f39",
  },
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return "dark";
    }
    return (window.localStorage.getItem("manmen-theme") as Theme | null) ?? "dark";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const animateTheme = useCallback((nextTheme: Theme) => {
    const root = document.documentElement;
    gsap.to(root, {
      duration: 0.65,
      ease: "power4.out",
      ...palette[nextTheme],
    });
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      window.localStorage.setItem("manmen-theme", next);
      animateTheme(next);
      return next;
    });
  }, [animateTheme]);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
