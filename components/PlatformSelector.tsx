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
  { value: "instagram", label: "اینستاگرام", icon: <Instagram aria-hidden="true" />, limit: 150 },
  { value: "twitter", label: "توییتر / ایکس", icon: <Twitter aria-hidden="true" />, limit: 160 },
  { value: "linkedin", label: "لینکدین", icon: <Linkedin aria-hidden="true" />, limit: 220 },
  { value: "telegram", label: "تلگرام", icon: <MessageCircle aria-hidden="true" />, limit: 70 },
];

interface PlatformSelectorProps { selected: string; onSelect: (value: string) => void }

export default function PlatformSelector({ selected, onSelect }: PlatformSelectorProps) {
  return (
    <div className="grid grid-cols-4 gap-1.5 sm:gap-2 lg:grid-cols-2 xl:grid-cols-4" role="group" aria-label="انتخاب شبکه اجتماعی">
      {platforms.map((item) => {
        const active = selected === item.value;
        return (
          <button key={item.value} type="button" onClick={() => onSelect(item.value)} aria-pressed={active} className={cn("flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl border px-1 text-[11px] font-medium leading-tight transition-colors sm:flex-row sm:gap-2 sm:px-4 sm:text-sm", active ? "border-primary bg-primary text-primary-foreground" : "border-input bg-card text-card-foreground hover:border-primary/50 hover:bg-accent")}>
            <span className="[&_svg]:size-4">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
