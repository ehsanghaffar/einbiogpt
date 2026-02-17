"use client";

import { cn } from "@/lib/utils";

export interface Tone {
  value: string;
  label: string;
  emoji: string;
}

export const tones: Tone[] = [
  { value: "professional", label: "حرفه‌ای", emoji: "💼" },
  { value: "friendly", label: "دوستانه", emoji: "😊" },
  { value: "creative", label: "خلاقانه", emoji: "🎨" },
  { value: "humorous", label: "طنز", emoji: "😂" },
];

interface ToneSelectorProps {
  selected: string;
  onSelect: (value: string) => void;
}

export default function ToneSelector({
  selected,
  onSelect,
}: ToneSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
      {tones.map((t) => {
        const isActive = selected === t.value;
        return (
          <button
            key={t.value}
            onClick={() => onSelect(t.value)}
            className={cn(
              "flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium",
              "transition-all duration-200 ease-out cursor-pointer",
              "border",
              isActive
                ? "bg-primary text-primary-foreground border-primary shadow-[0_2px_12px_hsl(var(--primary)/0.25)]"
                : "bg-card text-foreground border-border hover:border-primary/30 hover:bg-accent"
            )}
          >
            <span className="text-base">{t.emoji}</span>
            <span>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}
