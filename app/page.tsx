"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  Globe,
  Info,
  RefreshCw,
  Smile,
  Sparkles,
  Zap,
} from "lucide-react";
import { toast as sonnar } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PlatformSelector, { platforms } from "@/components/PlatformSelector";
import ToneSelector from "@/components/ToneSelector";
import OutputPanel from "@/components/OutputPanel";

const NEXT_PUBLIC_COOLDOWN_TIME = Number(
  process.env.NEXT_PUBLIC_COOLDOWN_TIME || 10
);

export default function BioGenerator() {
  const outputRef = useRef<HTMLDivElement>(null);
  const [cooldownTimer, setCooldownTimer] = useState(0);
  const [aboutYou, setAboutYou] = useState("");
  const [platform, setPlatform] = useState("");
  const [tone, setTone] = useState("professional");
  const [generatedBio, setGeneratedBio] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [isCooldown, setIsCooldown] = useState(false);

  const scrollToOutput = useCallback(() => {
    if (window.innerWidth < 1024 && outputRef.current) {
      outputRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => {
    setCharCount(aboutYou.length);
  }, [aboutYou]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isCooldown && cooldownTimer > 0) {
      interval = setInterval(() => {
        setCooldownTimer((timer) => timer - 1);
      }, 1000);
    } else if (cooldownTimer === 0) {
      setIsCooldown(false);
    }
    return () => clearInterval(interval);
  }, [isCooldown, cooldownTimer]);

  const getCurrentPlatform = () => {
    return (
      platforms.find((p) => p.value === platform) || {
        limit: 150,
      }
    );
  };

  const getCharLimitPercent = () => {
    const currentLimit = getCurrentPlatform().limit;
    return (charCount / currentLimit) * 100;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedBio);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    sonnar("بایو کپی شد", { icon: "✂️" });
  };

  const generateBio = async () => {
    if (isCooldown) {
      sonnar("لطفا چند لحظه صبر کن و دوباره بزن", { icon: "⏳" });
      return;
    }

    setIsGenerating(true);
    setIsCooldown(true);
    setError("");
    setNote("");
    setCooldownTimer(NEXT_PUBLIC_COOLDOWN_TIME);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          aboutYou,
          platform,
          tone,
          language: "persian",
        }),
      });

      if (!response.ok) {
        throw new Error(`خطا در ارتباط با سرور: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setGeneratedBio(data.bio);
      if (data.note) {
        setNote(data.note);
      }

      sonnar.success("بایو ساخته شد!", { duration: 2000 });
      setTimeout(scrollToOutput, 100);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "خطایی در تولید بایو رخ داد. لطفاً دوباره تلاش کنید.";
      console.error("Error generating bio:", err);
      setError(errorMessage);
      sonnar.error("خطایی در تولید بایو رخ داد.");
    } finally {
      setIsGenerating(false);
      setCooldownTimer(NEXT_PUBLIC_COOLDOWN_TIME);
    }
  };

  const isFormValid = platform && aboutYou.trim().length > 0;

  return (
    <div dir="rtl" className="min-h-screen bg-background">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/[0.03] rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-10 flex flex-col min-h-screen">
        {/* Header */}
        <Header />

        {/* Hero section */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            هوش مصنوعی
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground text-balance mb-3">
            بایوی حرفه‌ای بساز، سریع و هوشمند
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            بایوهای جذاب و شخصی‌سازی شده برای شبکه‌های اجتماعی بساز
          </p>
        </div>

        {/* Main content: Two-panel layout */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Left panel: Input & Controls */}
          <div className="glass-surface rounded-2xl p-6 sm:p-8 flex flex-col">
            <div className="space-y-6 flex-1">
              {/* Platform Selection */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="h-4 w-4 text-primary" />
                  <h3 className="font-bold text-foreground text-sm">
                    شبکه اجتماعی رو انتخاب کن
                  </h3>
                </div>
                <PlatformSelector
                  selected={platform}
                  onSelect={setPlatform}
                />
              </section>

              {/* Tone Selection */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Smile className="h-4 w-4 text-primary" />
                  <h3 className="font-bold text-foreground text-sm">
                    نوع بایو رو انتخاب کن
                  </h3>
                </div>
                <ToneSelector selected={tone} onSelect={setTone} />
              </section>

              {/* About You Textarea */}
              <section>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <h3 className="font-bold text-foreground text-sm">
                      درباره خودت یا پیجت بگو
                    </h3>
                  </div>
                  {platform && (
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        getCharLimitPercent() > 90
                          ? "bg-destructive/10 text-destructive"
                          : getCharLimitPercent() > 70
                          ? "bg-amber-500/10 text-amber-600"
                          : "bg-emerald-500/10 text-emerald-600"
                      }`}
                    >
                      {charCount} / {getCurrentPlatform().limit}
                    </span>
                  )}
                </div>
                <textarea
                  placeholder="ویژگی یا هرچیزی در مورد خودت یا پیجت بگو..."
                  className="w-full min-h-[130px] resize-none rounded-xl px-4 py-3 text-sm bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all duration-200"
                  value={aboutYou}
                  onChange={(e) => setAboutYou(e.target.value)}
                  maxLength={platform ? getCurrentPlatform().limit : 150}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  هرچه جزئیات بیشتری بنویسی، بایوی بهتری دریافت می‌کنی
                </p>
              </section>

              {/* Error */}
              {error && (
                <div className="flex items-start gap-2 p-3 rounded-xl bg-destructive/5 border border-destructive/15">
                  <AlertCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                  <p className="text-destructive text-sm">{error}</p>
                </div>
              )}

              {/* Note */}
              {note && (
                <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/5 border border-amber-500/15">
                  <Info className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                  <p className="text-amber-700 text-sm">{note}</p>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <div className="mt-6">
              <button
                onClick={generateBio}
                disabled={isGenerating || !isFormValid || isCooldown}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-bold bg-primary text-primary-foreground shadow-[0_4px_16px_hsl(var(--primary)/0.3)] hover:shadow-[0_4px_24px_hsl(var(--primary)/0.4)] hover:opacity-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    در حال ساخت...
                  </>
                ) : isCooldown && cooldownTimer > 0 ? (
                  <>{cooldownTimer} ثانیه دیگر</>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    ساخت بایو
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right panel: Output */}
          <div ref={outputRef} className="glass-surface rounded-2xl p-6 sm:p-8">
            <OutputPanel
              generatedBio={generatedBio}
              platform={platform}
              tone={tone}
              copied={copied}
              isGenerating={isGenerating}
              onCopy={copyToClipboard}
              onRegenerate={generateBio}
            />
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
