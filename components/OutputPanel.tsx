"use client";

import { Check, Copy, RefreshCw, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { platforms } from "./PlatformSelector";
import { tones } from "./ToneSelector";

interface OutputPanelProps {
  generatedBio: string;
  platform: string;
  tone: string;
  copied: boolean;
  isGenerating: boolean;
  onCopy: () => void;
  onRegenerate: () => void;
}

export default function OutputPanel({
  generatedBio,
  platform,
  tone,
  copied,
  isGenerating,
  onCopy,
  onRegenerate,
}: OutputPanelProps) {
  const currentPlatform = platforms.find((p) => p.value === platform);
  const currentTone = tones.find((t) => t.value === tone);

  return (
    <div className="h-full flex flex-col">
      {/* Panel header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <h3 className="font-bold text-foreground text-sm">
            نتیجه تولید شده
          </h3>
        </div>
        {currentTone && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
            <span>{currentTone.emoji}</span>
            {currentTone.label}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col gap-4">
        {isGenerating ? (
          <div className="flex-1 flex flex-col gap-3 animate-in fade-in duration-300">
            <div className="h-4 w-3/4 bg-muted rounded-lg animate-pulse" />
            <div className="h-4 w-full bg-muted rounded-lg animate-pulse" />
            <div className="h-4 w-5/6 bg-muted rounded-lg animate-pulse" />
            <div className="h-4 w-2/3 bg-muted rounded-lg animate-pulse" />
          </div>
        ) : generatedBio ? (
          <div className="flex-1 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="relative p-5 bg-secondary/50 rounded-2xl border border-border">
              <p className="text-foreground leading-relaxed text-sm">
                {generatedBio}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {generatedBio.length} کاراکتر
                  {currentPlatform && (
                    <span>
                      {" "}
                      / {currentPlatform.limit} محدودیت{" "}
                      {currentPlatform.label}
                    </span>
                  )}
                </span>
              </div>
            </div>

            {/* Platform preview */}
            {currentPlatform && (
              <div className="mt-4 p-4 rounded-2xl border border-border bg-card animate-in fade-in slide-in-from-bottom-1 duration-300 delay-150">
                <p className="text-xs text-muted-foreground mb-3 font-medium">
                  پیش‌نمایش در {currentPlatform.label}
                </p>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <span className="text-xs text-muted-foreground font-medium">
                      شما
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-foreground">
                      نام کاربری شما
                    </p>
                    <p className="text-xs text-muted-foreground mb-1">
                      @username
                    </p>
                    <p className="text-sm text-foreground leading-relaxed">
                      {generatedBio}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <div className="p-4 rounded-2xl bg-muted/50 mb-4">
              <Sparkles className="h-8 w-8 text-muted-foreground/50" />
            </div>
            <p className="text-muted-foreground text-sm">
              بایو تولید شده اینجا نمایش داده می‌شود
            </p>
            <p className="text-muted-foreground/60 text-xs mt-1">
              اطلاعاتت رو وارد کن و دکمه ساخت بایو رو بزن
            </p>
          </div>
        )}

        {/* Action buttons */}
        {generatedBio && !isGenerating && (
          <div className="flex gap-3 pt-2 animate-in fade-in slide-in-from-bottom-1 duration-300 delay-200">
            <button
              onClick={onCopy}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium",
                "transition-all duration-200",
                copied
                  ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                  : "bg-primary text-primary-foreground hover:opacity-90"
              )}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  کپی شد
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  کپی بایو
                </>
              )}
            </button>
            <button
              onClick={onRegenerate}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border border-border bg-card text-foreground hover:bg-accent transition-all duration-200"
            >
              <RefreshCw className="h-4 w-4" />
              ساخت مجدد
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
