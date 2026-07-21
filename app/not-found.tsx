import Link from "next/link";
import { ArrowRight, SearchX } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <main dir="rtl" className="flex min-h-screen items-center justify-center bg-background px-4">
      <section className="surface-shadow w-full max-w-lg rounded-2xl border bg-card p-8 text-center sm:p-10">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-secondary text-primary"><SearchX className="size-6" aria-hidden="true" /></span>
        <p className="mt-5 text-sm font-bold text-primary">خطای ۴۰۴</p>
        <h1 className="mt-2 text-2xl font-black">این صفحه پیدا نشد</h1>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">ممکن است آدرس تغییر کرده باشد یا این صفحه دیگر وجود نداشته باشد.</p>
        <Link href="/" className={cn(buttonVariants(), "mt-6")}><ArrowRight data-icon="inline-start" />بازگشت به صفحه اصلی</Link>
      </section>
    </main>
  );
}
