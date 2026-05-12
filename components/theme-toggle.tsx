"use client";

import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-full border border-[var(--border)] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[var(--fg)] transition hover:scale-105"
      aria-label="Toggle color theme"
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
