"use client";

import Link from "next/link";
import { Github, Languages, Sparkles } from "lucide-react";
import { ThemeToggle } from "./theme/ThemeToggle";
import { useLocale } from "./providers/LocaleProvider";

export default function Header() {
  const { locale, messages, setLocale } = useLocale();

  return (
    <header className="flex h-14 items-center justify-between border-b border-border/80 sm:h-16" aria-label={messages.common.home}>
      <Link href="/" className="flex items-center gap-3 rounded-lg" aria-label={messages.common.home}>
        <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Sparkles className="size-4" aria-hidden="true" />
        </span>
        <span className="flex items-baseline gap-1" dir="ltr">
          <span className="text-lg font-extrabold text-foreground">Ein</span>
          <span className="text-lg font-semibold text-primary">Bio</span>
        </span>
      </Link>
      <div className="flex items-center gap-2">
        <Link href="/bio" className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-foreground sm:inline-flex">{messages.common.buildBio}</Link>
        <button
          type="button"
          onClick={() => setLocale(locale === "fa" ? "en" : "fa")}
          className="inline-flex h-10 items-center gap-1.5 rounded-lg px-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label={messages.common.switchLanguage}
          title={messages.common.switchLanguage}
        >
          <Languages className="size-4" aria-hidden="true" />
          <span>{locale === "fa" ? "EN" : "فا"}</span>
        </button>
        <ThemeToggle />
        <a href="https://github.com/ehsanghaffar/einbiogpt" target="_blank" rel="noreferrer" className="flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground" aria-label={messages.common.github}>
          <Github className="size-5" aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}
