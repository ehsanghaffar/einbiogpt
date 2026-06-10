import Link from "next/link";
import { ThemeToggle } from "./theme/ThemeToggle";

export default function Header() {
  return (
    <header className="flex items-center justify-between py-4 mb-2">
      <Link href="/" className="flex items-baseline gap-1">
        <span className="text-xl font-extrabold text-primary">Ein</span>
        <span className="text-xl font-bold text-muted-foreground">Bio</span>
      </Link>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <a
          href="https://github.com/ehsanghaffar/einbiogpt"
          target="_blank"
          rel="noreferrer"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          GitHub
        </a>
      </div>
    </header>
  );
}
