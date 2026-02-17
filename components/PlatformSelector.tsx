"use client";

import { Instagram, Linkedin, MessageCircle, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Platform {
  value: string;
  label: string;
  icon: React.ReactNode;
  limit: number;
}

export const platforms: Platform[] = [
  {
    value: "instagram",
    label: "اینستاگرام",
    icon: <Instagram className="h-4 w-4" />,
    limit: 150,
  },
  {
    value: "twitter",
    label: "توییتر/ایکس",
    icon: <Twitter className="h-4 w-4" />,
    limit: 160,
  },
  {
    value: "linkedin",
    label: "لینکدین",
    icon: <Linkedin className="h-4 w-4" />,
    limit: 220,
  },
  {
    value: "telegram",
    label: "تلگرام",
    icon: <MessageCircle className="h-4 w-4" />,
    limit: 70,
  },
];

interface PlatformSelectorProps {
  selected: string;
  onSelect: (value: string) => void;
}

export default function PlatformSelector({
  selected,
  onSelect,
}: PlatformSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {platforms.map((plat) => {
        const isActive = selected === plat.value;
        return (
          <button
            key={plat.value}
            onClick={() => onSelect(plat.value)}
            className={cn(
              "relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium",
              "transition-all duration-200 ease-out cursor-pointer",
              "border",
              isActive
                ? "bg-primary text-primary-foreground border-primary shadow-[0_2px_12px_hsl(var(--primary)/0.25)]"
                : "bg-card text-foreground border-border hover:border-primary/30 hover:bg-accent"
            )}
          >
            <span
              className={cn(
                isActive ? "text-primary-foreground" : "text-muted-foreground"
              )}
            >
              {plat.icon}
            </span>
            <span>{plat.label}</span>
          </button>
        );
      })}
    </div>
  );
}
