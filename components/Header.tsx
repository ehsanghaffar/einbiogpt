import Link from "next/link";
import { Github, Sparkles } from "lucide-react";
import { ThemeToggle } from "./theme/ThemeToggle";

export default function Header() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border/80 sm:h-16" aria-label="سربرگ اصلی">
      <Link href="/" className="flex items-center gap-3 rounded-lg" aria-label="Ein Bio، صفحه اصلی">
        <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Sparkles className="size-4" aria-hidden="true" />
        </span>
        <span className="flex items-baseline gap-1" dir="ltr">
          <span className="text-lg font-extrabold text-foreground">Ein</span>
          <span className="text-lg font-semibold text-primary">Bio</span>
        </span>
      </Link>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <a href="https://github.com/ehsanghaffar/einbiogpt" target="_blank" rel="noreferrer" className="flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground" aria-label="مشاهده پروژه در گیت‌هاب">
          <Github className="size-5" aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}
