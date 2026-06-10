"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

/**
 * Theme Toggle Component
 * Allows users to switch between light, dark, and system themes
 * Features:
 * - Three-mode toggle (light/dark/system)
 * - Visual indicators for active theme
 * - Smooth transitions
 * - Accessible keyboard navigation
 * - RTL-aware
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder with same dimensions to prevent layout shift
    return (
      <div className={cn("inline-flex items-center gap-1 p-1", className)} />
    );
  }

  const themes = [
    {
      value: "light",
      label: "روز",
      icon: Sun,
    },
    {
      value: "dark",
      label: "شب",
      icon: Moon,
    },
    {
      value: "system",
      label: "سیستم",
      icon: Monitor,
    },
  ];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1",
        "p-1 rounded-lg",
        "bg-muted/50",
        "border border-border/50",
        className
      )}
      role="group"
      aria-label="انتخاب تم"
    >
      {themes.map((t) => {
        const Icon = t.icon;
        const isActive = theme === t.value;

        return (
          <button
            key={t.value}
            onClick={() => setTheme(t.value)}
            className={cn(
              "inline-flex items-center justify-center",
              "h-8 w-8 rounded-md",
              "transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isActive
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            )}
            aria-pressed={isActive}
            aria-label={`تم ${t.label}`}
            title={`تم ${t.label}`}
          >
            <Icon className="h-4 w-4" />
          </button>
        );
      })}
    </div>
  );
}

export default ThemeToggle;
