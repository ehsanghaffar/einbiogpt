export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between gap-2 border-t border-border/80 py-4 text-center text-sm text-muted-foreground sm:flex-row sm:text-start">
      <p>
        طراحی و توسعه توسط{" "}
        <a href="https://github.com/ehsanghaffar" target="_blank" rel="noreferrer" className="font-semibold text-foreground underline-offset-4 hover:underline">عین</a>
      </p>
      <a href="https://github.com/ehsanghaffar/einbiogpt" target="_blank" rel="noreferrer" className="underline-offset-4 hover:text-foreground hover:underline">متن‌باز با مجوز MIT</a>
    </footer>
  );
}
