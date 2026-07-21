"use client";

import { Briefcase, Lightbulb, MessageCircle, Smile } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Tone { value: string; label: string; icon: React.ElementType }

export const tones: Tone[] = [
  { value: "professional", label: "حرفه‌ای", icon: Briefcase },
  { value: "friendly", label: "دوستانه", icon: Smile },
  { value: "creative", label: "خلاقانه", icon: Lightbulb },
  { value: "humorous", label: "طنز", icon: MessageCircle },
];

interface ToneSelectorProps { selected: string; onSelect: (value: string) => void }

export default function ToneSelector({ selected, onSelect }: ToneSelectorProps) {
  return (
    <div className="grid grid-cols-4 gap-1.5 sm:gap-2 lg:grid-cols-2 xl:grid-cols-4" role="group" aria-label="انتخاب لحن بایو">
      {tones.map((item) => {
        const Icon = item.icon;
        const active = selected === item.value;
        return (
          <button key={item.value} type="button" onClick={() => onSelect(item.value)} aria-pressed={active} className={cn("flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl border px-1 text-[11px] font-medium leading-tight transition-colors sm:flex-row sm:gap-2 sm:px-4 sm:text-sm", active ? "border-primary bg-primary text-primary-foreground" : "border-input bg-card text-card-foreground hover:border-primary/50 hover:bg-accent")}>
            <Icon className="size-4" aria-hidden="true" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
