"use client";

import { cn } from "@/lib/utils";
import { TONES } from "@/lib/generation";

export interface Tone {
  value: string;
  label: string;
  emoji: string;
}

const toneMetadata: Record<(typeof TONES)[number], Omit<Tone, "value">> = {
  professional: { label: "حرفه‌ای", emoji: "💼" },
  friendly: { label: "دوستانه", emoji: "😊" },
  creative: { label: "خلاقانه", emoji: "🎨" },
  humorous: { label: "طنز", emoji: "😂" },
};

export const tones: Tone[] = TONES.map((value) => ({
  value,
  ...toneMetadata[value],
}));

interface ToneSelectorProps {
  selected: string;
  onSelect: (value: string) => void;
}

export default function ToneSelector({
  selected,
  onSelect,
}: ToneSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2" role="radiogroup" aria-label="نوع بایو">
      {tones.map((t) => {
        const isActive = selected === t.value;
        return (
          <button
            type="button"
            key={t.value}
            onClick={() => onSelect(t.value)}
            role="radio"
            aria-checked={isActive}
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
