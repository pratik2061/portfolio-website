"use client";

import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="h-9 w-9 rounded-md border border-secondary/20 bg-background flex items-center justify-center opacity-70"
        disabled
      >
        <span className="h-4 w-4" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-secondary/20 bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-neutral/40 cursor-pointer"
    >
      {resolvedTheme === "dark" ? (
        <>
          <span>Dark</span>
        </>
      ) : (
        <>
          <span>Light</span>
        </>
      )}
    </button>
  );
}

