"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, HelpCircle, Sparkles } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PlatformSelector, { platforms } from "@/components/PlatformSelector";
import ToneSelector from "@/components/ToneSelector";
import OutputPanel from "@/components/OutputPanel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const COOLDOWN_TIME = Number(process.env.NEXT_PUBLIC_COOLDOWN_TIME || 10);

function SectionTitle({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold text-primary">{number}</span>
      <div className="flex flex-col gap-1">
        <h2 className="text-sm font-bold text-foreground">{title}</h2>
        <p className="text-xs leading-5 text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export default function BioGenerator() {
  const outputRef = useRef<HTMLDivElement>(null);
  const [cooldownTimer, setCooldownTimer] = useState(0);
  const [aboutYou, setAboutYou] = useState("");
  const [platform, setPlatform] = useState("");
  const [tone, setTone] = useState("professional");
  const [generatedBio, setGeneratedBio] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [isCooldown, setIsCooldown] = useState(false);

  const charCount = aboutYou.length;
  const currentPlatform = platforms.find((item) => item.value === platform);
  const charLimit = currentPlatform?.limit ?? 150;
  const charPercent = Math.min((charCount / charLimit) * 100, 100);
  const isFormValid = Boolean(platform && aboutYou.trim());

  const scrollToOutput = useCallback(() => {
    if (window.innerWidth < 1024) outputRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    if (!isCooldown || cooldownTimer <= 0) {
      if (cooldownTimer === 0) setIsCooldown(false);
      return;
    }
    const interval = setInterval(() => setCooldownTimer((timer) => timer - 1), 1000);
    return () => clearInterval(interval);
  }, [isCooldown, cooldownTimer]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatedBio);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("بایو در کلیپ‌بورد کپی شد");
  };

  const generateBio = async () => {
    if (isCooldown) {
      toast("چند لحظه صبر کن و دوباره تلاش کن");
      return;
    }
    setIsGenerating(true);
    setIsCooldown(true);
    setError("");
    setNote("");
    setCooldownTimer(COOLDOWN_TIME);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ aboutYou, platform, tone, language: "persian" }),
      });
      if (!response.ok) throw new Error(`خطا در ارتباط با سرور: ${response.status}`);
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setGeneratedBio(data.bio);
      if (data.note) setNote(data.note);
      toast.success("بایوی تازه آماده شد");
      setTimeout(scrollToOutput, 100);
    } catch (err) {
      const message = err instanceof Error ? err.message : "خطایی در تولید بایو رخ داد. دوباره تلاش کن.";
      console.error("Error generating bio:", err);
      setError(message);
      toast.error("ساخت بایو ناموفق بود");
      setTimeout(scrollToOutput, 100);
    } finally {
      setIsGenerating(false);
      setCooldownTimer(COOLDOWN_TIME);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Header />
        <main className="py-6 sm:py-8 lg:py-10">
          <section className="mx-auto mb-6 max-w-3xl text-center sm:mb-8">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="size-3.5" aria-hidden="true" />
              نویسنده هوشمند فارسی
            </div>
            <h1 className="text-balance text-3xl font-black leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">چند کلمه از تو، یک بایوی به‌یادماندنی</h1>
            <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm leading-6 text-muted-foreground sm:text-base">برای هر شبکه اجتماعی، بایویی متناسب با شخصیت و هدف تو می‌سازیم؛ سریع، فارسی و آماده انتشار.</p>
          </section>

          <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,.95fr)] lg:gap-6">
            <section className="surface-shadow rounded-2xl border bg-card p-5 sm:p-6" aria-label="فرم ساخت بایو">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <SectionTitle number="۱" title="مقصد بایو" description="شبکه‌ای که بایو را برای آن می‌خواهی انتخاب کن." />
                  <PlatformSelector selected={platform} onSelect={setPlatform} />
                </div>
                <div className="h-px bg-border" />
                <div className="flex flex-col gap-3">
                  <SectionTitle number="۲" title="لحن نوشته" description="حسی که قرار است از بایوی تو منتقل شود." />
                  <ToneSelector selected={tone} onSelect={setTone} />
                </div>
                <div className="h-px bg-border" />
                <div className="flex flex-col gap-3">
                  <SectionTitle number="۳" title="درباره تو یا صفحه‌ات" description="مهارت‌ها، علایق، حوزه فعالیت یا هر نکته مهمی را بنویس." />
                  <div className="flex flex-col gap-2">
                    <label htmlFor="about-you" className="sr-only">توضیحات درباره شما یا صفحه شما</label>
                    <textarea id="about-you" value={aboutYou} onChange={(event) => setAboutYou(event.target.value)} maxLength={charLimit} placeholder="مثلاً: طراح محصول هستم، درباره تجربه کاربری می‌نویسم و به عکاسی خیابانی علاقه دارم..." className="min-h-28 w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm leading-7 text-foreground placeholder:text-muted-foreground focus:border-primary" aria-describedby="about-help char-count" />
                    <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
                      <p id="about-help" className="flex items-center gap-1.5"><HelpCircle className="size-3.5" aria-hidden="true" />جزئیات بیشتر، نتیجه دقیق‌تر</p>
                      <span id="char-count" className={cn("font-medium tabular-nums", charPercent > 90 && "text-destructive")}>{charCount} از {charLimit}</span>
                    </div>
                    <div className="h-1 overflow-hidden rounded-full bg-muted" role="progressbar" aria-label="تعداد کاراکترهای واردشده" aria-valuenow={charCount} aria-valuemin={0} aria-valuemax={charLimit}>
                      <div className={cn("h-full rounded-full bg-primary transition-[width]", charPercent > 90 && "bg-destructive")} style={{ width: `${charPercent}%` }} />
                    </div>
                  </div>
                </div>

                {error && <div role="alert" className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm leading-6 text-destructive"><AlertCircle className="mt-1 size-4 shrink-0" aria-hidden="true" />{error}</div>}
                {note && <div role="status" className="flex items-start gap-2 rounded-xl border border-primary/20 bg-primary/10 p-3 text-sm leading-6 text-foreground"><CheckCircle2 className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />{note}</div>}

                <Button type="button" size="lg" className="w-full" onClick={generateBio} disabled={isGenerating || !isFormValid || isCooldown} aria-describedby={!isFormValid ? "form-guidance" : undefined}>
                  <Sparkles data-icon="inline-start" className={cn(isGenerating && "animate-pulse")} />
                  {isGenerating ? "در حال نوشتن بایو..." : isCooldown && cooldownTimer > 0 ? `${cooldownTimer} ثانیه تا ساخت بعدی` : "بایوی من را بساز"}
                </Button>
                <p id="form-guidance" className="text-center text-xs text-muted-foreground">برای شروع، شبکه اجتماعی و توضیحات را کامل کن.</p>
              </div>
            </section>

            <div ref={outputRef} className="scroll-mt-4 lg:sticky lg:top-6">
              <OutputPanel generatedBio={generatedBio} platform={platform} tone={tone} copied={copied} isGenerating={isGenerating} error={error} onCopy={copyToClipboard} onRegenerate={generateBio} />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
