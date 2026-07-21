"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Home, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter();
  useEffect(() => { console.error(error); }, [error]);
  return (
    <html lang="fa" dir="rtl" className="bg-background">
      <body className="font-sans text-foreground">
        <main className="flex min-h-screen items-center justify-center bg-background px-4">
          <section className="w-full max-w-lg rounded-2xl border bg-card p-8 text-center">
            <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive"><AlertCircle className="size-6" aria-hidden="true" /></span>
            <h1 className="mt-5 text-2xl font-black">یک خطای غیرمنتظره رخ داد</h1>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">می‌توانی دوباره تلاش کنی یا به صفحه اصلی برگردی.</p>
            <div className="mt-6 flex justify-center gap-2"><Button type="button" onClick={reset}><RotateCcw data-icon="inline-start" />تلاش دوباره</Button><Button type="button" variant="outline" onClick={() => router.push("/")}><Home data-icon="inline-start" />صفحه اصلی</Button></div>
          </section>
        </main>
      </body>
    </html>
  );
}
