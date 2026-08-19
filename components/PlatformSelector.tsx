"use client";

import { Instagram, Linkedin, MessageCircle, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";
import { PLATFORM_LIMITS, PLATFORMS } from "@/lib/generation";

export interface Platform {
  value: string;
  label: string;
  icon: React.ReactNode;
  limit: number;
}

const platformLabels: Record<(typeof PLATFORMS)[number], string> = {
  instagram: "اینستاگرام",
  twitter: "توییتر/ایکس",
  linkedin: "لینکدین",
  telegram: "تلگرام",
};

const platformIcons: Record<(typeof PLATFORMS)[number], React.ReactNode> = {
  instagram: <Instagram className="h-4 w-4" />,
  twitter: <Twitter className="h-4 w-4" />,
  linkedin: <Linkedin className="h-4 w-4" />,
  telegram: <MessageCircle className="h-4 w-4" />,
};

export const platforms: Platform[] = PLATFORMS.map((value) => ({
  value,
  label: platformLabels[value],
  icon: platformIcons[value],
  limit: PLATFORM_LIMITS[value],
}));

interface PlatformSelectorProps {
  selected: string;
  onSelect: (value: string) => void;
}

export default function PlatformSelector({
  selected,
  onSelect,
}: PlatformSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2" role="radiogroup" aria-label="شبکه اجتماعی">
      {platforms.map((plat) => {
        const isActive = selected === plat.value;
        return (
          <button
            type="button"
            key={plat.value}
            onClick={() => onSelect(plat.value)}
            role="radio"
            aria-checked={isActive}
            className={cn(
              "relative flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium",
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
