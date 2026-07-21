"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <main dir="rtl" className="flex min-h-screen items-center justify-center bg-background px-4">
      <section className="surface-shadow w-full max-w-lg rounded-2xl border bg-card p-8 text-center sm:p-10">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive"><AlertCircle className="size-6" aria-hidden="true" /></span>
        <h1 className="mt-5 text-2xl font-black">مشکلی پیش آمد</h1>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">{error.message || "در نمایش این بخش خطایی رخ داد. لطفاً دوباره تلاش کن."}</p>
        <Button type="button" onClick={reset} className="mt-6"><RotateCcw data-icon="inline-start" />تلاش دوباره</Button>
      </section>
    </main>
  );
}
