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
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4" role="group" aria-label="انتخاب شبکه اجتماعی">
      {platforms.map((item) => {
        const active = selected === item.value;
        return (
          <button key={item.value} type="button" onClick={() => onSelect(item.value)} aria-pressed={active} className={cn("flex min-h-12 items-center gap-2 rounded-xl border px-3 text-sm font-medium transition-colors sm:px-4", active ? "border-primary bg-primary text-primary-foreground" : "border-input bg-card text-card-foreground hover:border-primary/50 hover:bg-accent")}>
            <span className="[&_svg]:size-4">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
