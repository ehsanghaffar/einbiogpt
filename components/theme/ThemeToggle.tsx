"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps { className?: string }

const options = [
  { value: "light", label: "روشن", icon: Sun },
  { value: "dark", label: "تیره", icon: Moon },
  { value: "system", label: "سیستم", icon: Monitor },
];

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className={cn("h-10 w-28 rounded-lg bg-muted", className)} aria-hidden="true" />;

  return (
    <div className={cn("flex items-center rounded-lg border border-border bg-muted p-1", className)} role="group" aria-label="انتخاب ظاهر سایت">
      {options.map((item) => {
        const Icon = item.icon;
        const active = theme === item.value;
        return (
          <button key={item.value} type="button" onClick={() => setTheme(item.value)} aria-pressed={active} aria-label={`حالت ${item.label}`} title={`حالت ${item.label}`} className={cn("flex size-8 items-center justify-center rounded-md transition-colors", active ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground")}>
            <Icon className="size-4" aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}

export default ThemeToggle;
