export default function Footer() {
  return (
    <footer className="flex items-center justify-between py-6 text-xs text-muted-foreground">
      <p>
        {"طراحی و پیاده سازی توسط "}
        <a
          href="https://github.com/ehsanghaffar"
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-primary hover:underline underline-offset-2 transition-colors"
        >
          احسان غفار
        </a>
      </p>
      <p className="hidden sm:block">
        ساخته شده با هوش مصنوعی
      </p>
    </footer>
  );
}
