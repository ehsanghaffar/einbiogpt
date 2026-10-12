"use client";

import { useLocale } from "./providers/LocaleProvider";

export default function Footer() {
  const { messages } = useLocale();

  return (
    <footer className="flex flex-col items-center justify-between gap-2 border-t border-border/80 py-4 text-center text-sm text-muted-foreground sm:flex-row sm:text-start">
      <p>
        {messages.footer.credit}{" "}
        <a href="https://github.com/ehsanghaffar" target="_blank" rel="noreferrer" className="font-semibold text-foreground underline-offset-4 hover:underline">{messages.common.authorName}</a>
      </p>
      <a href="https://github.com/ehsanghaffar/einbiogpt" target="_blank" rel="noreferrer" className="underline-offset-4 hover:text-foreground hover:underline">{messages.footer.license}</a>
    </footer>
  );
}
