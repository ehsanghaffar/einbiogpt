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
import { formatCount, formatMessage, toBioLanguage } from "@/lib/i18n";
import { useLocale } from "@/components/providers/LocaleProvider";

const COOLDOWN_TIME = Number(process.env.NEXT_PUBLIC_COOLDOWN_TIME || 10);

function SectionTitle({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="flex items-center gap-2 sm:items-start sm:gap-3">
      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold text-primary sm:size-7">{number}</span>
      <div className="flex flex-col gap-1">
        <h2 className="text-sm font-bold text-foreground">{title}</h2>
        <p className="hidden text-xs leading-5 text-muted-foreground sm:block">{description}</p>
      </div>
    </div>
  );
}

export default function BioGenerator() {
  const { locale, messages } = useLocale();
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
    toast.success(messages.bio.copied);
  };

  const generateBio = async () => {
    if (isCooldown) {
      toast(messages.bio.waitMessage);
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
        body: JSON.stringify({ aboutYou, platform, tone, language: toBioLanguage(locale) }),
      });
      const data: { bio?: unknown; error?: unknown; note?: unknown } = await response.json();
      if (response.status === 429) throw new Error(messages.bio.rateLimited);
      if (!response.ok) {
        throw new Error(typeof data.error === "string" ? data.error : messages.bio.errorNetwork);
      }
      if (typeof data.error === "string") throw new Error(data.error);
      if (typeof data.bio !== "string") throw new Error(messages.bio.errorUnexpected);
      setGeneratedBio(data.bio);
      if (typeof data.note === "string") setNote(data.note);
      toast.success(messages.bio.generated);
      setTimeout(scrollToOutput, 100);
    } catch (err) {
      const message =
        err instanceof TypeError
          ? messages.bio.errorNetwork
          : err instanceof Error
            ? err.message
            : messages.bio.errorUnexpected;
      console.error("Error generating bio:", err);
      setError(message);
      toast.error(messages.bio.failed);
      setTimeout(scrollToOutput, 100);
    } finally {
      setIsGenerating(false);
      setCooldownTimer(COOLDOWN_TIME);
    }
  };

  return (
    <div dir={locale === "fa" ? "rtl" : "ltr"} className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Header />
        <main className="py-3 sm:py-8 lg:py-10">
          <section className="mx-auto mb-3 max-w-3xl text-center sm:mb-8">
            <div className="mb-3 hidden items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary sm:inline-flex">
              <Sparkles className="size-3.5" aria-hidden="true" />
              {messages.bio.eyebrow}
            </div>
            <h1 className="text-balance text-xl font-black leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">{messages.bio.title}</h1>
            <p className="mx-auto mt-3 hidden max-w-2xl text-pretty text-sm leading-6 text-muted-foreground sm:block sm:text-base">{messages.bio.description}</p>
          </section>

          <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,.95fr)] lg:gap-6">
            <section className="surface-shadow rounded-2xl border bg-card p-3 sm:p-6" aria-label={messages.bio.formLabel}>
              <div className="flex flex-col gap-3 sm:gap-5">
                <div className="flex flex-col gap-3">
                  <SectionTitle number={messages.bio.stepNumbers[0]} title={messages.bio.platformTitle} description={messages.bio.platformHelp} />
                  <PlatformSelector selected={platform} onSelect={setPlatform} />
                </div>
                <div className="h-px bg-border" />
                <div className="flex flex-col gap-3">
                  <SectionTitle number={messages.bio.stepNumbers[1]} title={messages.bio.toneTitle} description={messages.bio.toneHelp} />
                  <ToneSelector selected={tone} onSelect={setTone} />
                </div>
                <div className="h-px bg-border" />
                <div className="flex flex-col gap-3">
                  <SectionTitle number={messages.bio.stepNumbers[2]} title={messages.bio.aboutTitle} description={messages.bio.aboutHelp} />
                  <div className="flex flex-col gap-2">
                    <label htmlFor="about-you" className="sr-only">{messages.bio.aboutLabel}</label>
                    <textarea id="about-you" dir={locale === "fa" ? "rtl" : "ltr"} value={aboutYou} onChange={(event) => setAboutYou(event.target.value)} maxLength={charLimit} placeholder={messages.bio.aboutPlaceholder} className="min-h-20 w-full resize-none sm:min-h-28 rounded-xl border border-input bg-background px-4 py-3 text-sm leading-7 text-foreground placeholder:text-muted-foreground focus:border-primary" aria-describedby="about-help char-count" />
                    <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
                      <p id="about-help" className="flex items-center gap-1.5"><HelpCircle className="size-3.5" aria-hidden="true" />{messages.bio.moreDetails}</p>
                      <span id="char-count" className={cn("font-medium tabular-nums", charPercent > 90 && "text-destructive")}>{formatMessage(messages.bio.characterCount, { count: formatCount(charCount, locale), limit: formatCount(charLimit, locale) })}</span>
                    </div>
                    <div className="h-1 overflow-hidden rounded-full bg-muted" role="progressbar" aria-label={messages.bio.characterProgress} aria-valuenow={charCount} aria-valuemin={0} aria-valuemax={charLimit}>
                      <div className={cn("h-full rounded-full bg-primary transition-[width]", charPercent > 90 && "bg-destructive")} style={{ width: `${charPercent}%` }} />
                    </div>
                  </div>
                </div>

                {error && <div role="alert" className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm leading-6 text-destructive"><AlertCircle className="mt-1 size-4 shrink-0" aria-hidden="true" />{error}</div>}
                {note && <div role="status" className="flex items-start gap-2 rounded-xl border border-primary/20 bg-primary/10 p-3 text-sm leading-6 text-foreground"><CheckCircle2 className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />{note}</div>}

                <Button type="button" size="lg" className="w-full" onClick={generateBio} disabled={isGenerating || !isFormValid || isCooldown} aria-describedby={!isFormValid ? "form-guidance" : undefined}>
                  <Sparkles data-icon="inline-start" className={cn(isGenerating && "animate-pulse")} />
                  {isGenerating ? messages.bio.generating : isCooldown && cooldownTimer > 0 ? formatMessage(messages.bio.cooldown, { seconds: formatCount(cooldownTimer, locale) }) : messages.home.createBio}
                </Button>
                <p id="form-guidance" className="text-center text-xs text-muted-foreground">{messages.bio.formGuidance}</p>
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
