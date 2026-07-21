"use client";

import { AlertCircle, Check, Copy, RefreshCw, Sparkles, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { platforms } from "./PlatformSelector";
import { tones } from "./ToneSelector";

interface OutputPanelProps {
  generatedBio: string; platform: string; tone: string; copied: boolean;
  isGenerating: boolean; error: string; onCopy: () => void; onRegenerate: () => void;
}

export default function OutputPanel({ generatedBio, platform, tone, copied, isGenerating, error, onCopy, onRegenerate }: OutputPanelProps) {
  const currentPlatform = platforms.find((item) => item.value === platform);
  const currentTone = tones.find((item) => item.value === tone);
  const ToneIcon = currentTone?.icon;

  return (
    <section className="surface-shadow flex min-h-[540px] flex-col rounded-2xl border bg-card p-5 sm:p-7" aria-labelledby="output-title" aria-live="polite">
      <header className="flex items-center justify-between gap-3 border-b pb-5">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><Sparkles className="size-4" aria-hidden="true" /></span>
          <div><h2 id="output-title" className="text-sm font-bold">بایوی پیشنهادی</h2><p className="mt-0.5 text-xs text-muted-foreground">آماده برای ویرایش یا انتشار</p></div>
        </div>
        {currentTone && ToneIcon && <span className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground"><ToneIcon className="size-3.5" aria-hidden="true" />{currentTone.label}</span>}
      </header>

      <div className="flex flex-1 flex-col pt-5">
        {isGenerating ? (
          <div role="status" className="flex flex-1 flex-col gap-6">
            <div><p className="text-sm font-semibold text-foreground">در حال پیدا کردن بهترین واژه‌ها...</p><p className="mt-1 text-xs text-muted-foreground">چند ثانیه با ما همراه باش.</p></div>
            <div className="flex flex-col gap-3 rounded-xl bg-muted p-5">
              <div className="h-3 w-4/5 animate-pulse rounded bg-border" /><div className="h-3 w-full animate-pulse rounded bg-border" /><div className="h-3 w-3/5 animate-pulse rounded bg-border" />
            </div>
          </div>
        ) : error ? (
          <div role="alert" className="flex flex-1 flex-col items-center justify-center text-center">
            <span className="mb-4 flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive"><AlertCircle className="size-6" aria-hidden="true" /></span>
            <h3 className="font-bold">نتوانستیم بایو را بسازیم</h3><p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">{error}</p>
            <Button type="button" variant="outline" className="mt-5" onClick={onRegenerate}><RefreshCw data-icon="inline-start" />تلاش دوباره</Button>
          </div>
        ) : generatedBio ? (
          <div className="flex flex-1 flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="rounded-xl border bg-background p-5"><p className="text-pretty text-base leading-8 text-foreground">{generatedBio}</p><p className="mt-4 border-t pt-3 text-xs text-muted-foreground">{generatedBio.length} کاراکتر{currentPlatform ? ` از سقف ${currentPlatform.limit} کاراکتر ${currentPlatform.label}` : ""}</p></div>
            {currentPlatform && <div className="rounded-xl bg-secondary/70 p-4"><p className="mb-3 text-xs font-semibold text-muted-foreground">پیش‌نمایش در {currentPlatform.label}</p><div className="flex items-start gap-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-card text-muted-foreground"><UserRound className="size-5" aria-hidden="true" /></span><div className="min-w-0"><p className="text-sm font-bold">نام شما</p><p dir="ltr" className="text-left text-xs text-muted-foreground">@username</p><p className="mt-2 whitespace-pre-wrap text-sm leading-7">{generatedBio}</p></div></div></div>}
          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <span className="mb-5 flex size-16 items-center justify-center rounded-full border bg-secondary text-primary"><Sparkles className="size-7" aria-hidden="true" /></span>
            <h3 className="font-bold text-foreground">جای بایوی تو اینجاست</h3>
            <p className="mt-2 max-w-xs text-sm leading-7 text-muted-foreground">سه مرحله روبه‌رو را کامل کن تا یک بایوی شخصی‌سازی‌شده تحویل بگیری.</p>
          </div>
        )}
      </div>

      {generatedBio && !isGenerating && !error && <footer className="mt-5 grid grid-cols-[1fr_auto] gap-2 border-t pt-5">
        <Button type="button" onClick={onCopy} className={cn(copied && "bg-secondary text-secondary-foreground hover:bg-secondary")}>
          {copied ? <Check data-icon="inline-start" /> : <Copy data-icon="inline-start" />}{copied ? "کپی شد" : "کپی بایو"}
        </Button>
        <Button type="button" variant="outline" onClick={onRegenerate} aria-label="ساخت دوباره بایو"><RefreshCw data-icon="inline-start" /><span className="hidden sm:inline">ساخت دوباره</span></Button>
      </footer>}
    </section>
  );
}
