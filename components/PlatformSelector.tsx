"use client";

import { Instagram, Linkedin, MessageCircle, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";
import { BIO_PLATFORMS } from "@/lib/bio-options";
import type { PlatformId } from "@/lib/i18n";
import { useLocale } from "./providers/LocaleProvider";

const platformIcons: Record<PlatformId, React.ReactNode> = {
  instagram: <Instagram aria-hidden="true" />,
  twitter: <Twitter aria-hidden="true" />,
  linkedin: <Linkedin aria-hidden="true" />,
  telegram: <MessageCircle aria-hidden="true" />,
};

export const platforms = BIO_PLATFORMS.map((platform) => ({
  ...platform,
  icon: platformIcons[platform.value],
}));

interface PlatformSelectorProps { selected: string; onSelect: (value: string) => void }

export default function PlatformSelector({ selected, onSelect }: PlatformSelectorProps) {
  const { locale, messages } = useLocale();

  return (
    <div className="grid grid-cols-4 gap-1.5 sm:gap-2 lg:grid-cols-2 xl:grid-cols-4" role="group" aria-label={messages.bio.platformTitle}>
      {platforms.map((item) => {
        const active = selected === item.value;
        return (
          <button key={item.value} type="button" onClick={() => onSelect(item.value)} aria-pressed={active} className={cn("flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl border px-1 text-[11px] font-medium leading-tight transition-colors sm:flex-row sm:gap-2 sm:px-4 sm:text-sm", active ? "border-primary bg-primary text-primary-foreground" : "border-input bg-card text-card-foreground hover:border-primary/50 hover:bg-accent")}>
            <span className="[&_svg]:size-4">{item.icon}</span>
            <span>{messages.platforms[item.value]}</span>
          </button>
        );
      })}
    </div>
  );
}
