"use client";

import { Briefcase, Lightbulb, MessageCircle, Smile } from "lucide-react";
import { cn } from "@/lib/utils";
import { BIO_TONES } from "@/lib/bio-options";
import type { ToneId } from "@/lib/i18n";
import { useLocale } from "./providers/LocaleProvider";

export interface Tone { value: ToneId; icon: React.ElementType }

const toneIcons: Record<ToneId, React.ElementType> = {
  professional: Briefcase,
  friendly: Smile,
  creative: Lightbulb,
  humorous: MessageCircle,
};

export const tones: Tone[] = BIO_TONES.map((value) => ({
  value,
  icon: toneIcons[value],
}));

interface ToneSelectorProps { selected: string; onSelect: (value: string) => void }

export default function ToneSelector({ selected, onSelect }: ToneSelectorProps) {
  const { messages } = useLocale();

  return (
    <div className="grid grid-cols-4 gap-1.5 sm:gap-2 lg:grid-cols-2 xl:grid-cols-4" role="group" aria-label={messages.bio.toneTitle}>
      {tones.map((item) => {
        const Icon = item.icon;
        const active = selected === item.value;
        return (
          <button key={item.value} type="button" onClick={() => onSelect(item.value)} aria-pressed={active} className={cn("flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl border px-1 text-[11px] font-medium leading-tight transition-colors sm:flex-row sm:gap-2 sm:px-4 sm:text-sm", active ? "border-primary bg-primary text-primary-foreground" : "border-input bg-card text-card-foreground hover:border-primary/50 hover:bg-accent")}>
            <Icon className="size-4" aria-hidden="true" />
            <span>{messages.tones[item.value]}</span>
          </button>
        );
      })}
    </div>
  );
}
