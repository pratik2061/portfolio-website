"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export interface UseThemeReturn {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  mounted: boolean;
}

const STORAGE_KEY = "theme";

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "system";
  try {
    const val = localStorage.getItem(STORAGE_KEY);
    if (val === "light" || val === "dark" || val === "system") {
      return val;
    }
  } catch {
  }
  return "system";
}

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const isDark =
    theme === "dark" || (theme === "system" && getSystemTheme() === "dark");

  if (isDark) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }

  root.style.colorScheme = isDark ? "dark" : "light";
}

type Listener = () => void;
const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((listener) => listener());
}

let currentTheme: Theme = "system";
let isInitialized = false;

function init() {
  if (isInitialized || typeof window === "undefined") return;
  isInitialized = true;
  currentTheme = getStoredTheme();
  applyTheme(currentTheme);

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleMediaChange = () => {
    if (currentTheme === "system") {
      applyTheme("system");
      notify();
    }
  };

  mediaQuery.addEventListener("change", handleMediaChange);

  const handleStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      const newTheme = getStoredTheme();
      if (newTheme !== currentTheme) {
        currentTheme = newTheme;
        applyTheme(currentTheme);
        notify();
      }
    }
  };

  window.addEventListener("storage", handleStorage);
}

function subscribe(listener: Listener) {
  if (typeof window !== "undefined") {
    init();
  }
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): Theme {
  if (typeof window === "undefined") return "system";
  init();
  return currentTheme;
}

function getServerSnapshot(): Theme {
  return "system";
}

export function useTheme(): UseThemeReturn {
  const [mounted, setMounted] = useState(false);
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    setMounted(true);
  }, []);

  const setTheme = (newTheme: Theme) => {
    if (typeof window === "undefined") return;
    currentTheme = newTheme;
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch {
    }
    applyTheme(newTheme);
    notify();
  };

  const toggleTheme = () => {
    const active = theme === "system" ? getSystemTheme() : theme;
    setTheme(active === "dark" ? "light" : "dark");
  };

  const resolvedTheme: ResolvedTheme = !mounted
    ? "light"
    : theme === "system"
      ? getSystemTheme()
      : theme;

  return {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
    mounted,
  };
}

