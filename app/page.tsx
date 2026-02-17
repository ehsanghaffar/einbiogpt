"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  Check,
  Copy,
  Globe,
  Heart,
  Info,
  Instagram,
  Linkedin,
  MessageCircle,
  RefreshCw,
  Smile,
  Sparkles,
  Twitter,
  Zap,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast as sonnar } from "sonner";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const NEXT_PUBLIC_COOLDOWN_TIME = process.env.NEXT_PUBLIC_COOLDOWN_TIME || 10;

const MotionCard = motion.create(Card);
const MotionButton = motion.create(Button);

const BioGenerator = () => {
  const [cooldownTimer, setCooldownTimer] = useState(0);

  // new
  const [aboutYou, setAboutYou] = useState("");
  const [platform, setPlatform] = useState("");
  const [tone, setTone] = useState("professional");
  const [generatedBio, setGeneratedBio] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [activeView, setActiveView] = useState("generate"); // Instead of tabs
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [isCooldown, setIsCooldown] = useState(false);

  // Update character count
  useEffect(() => {
    setCharCount(aboutYou.length);
  }, [aboutYou]);

  const tones = [
    {
      value: "professional",
      label: "حرفه‌ای",
      emoji: "💼",
      color: "bg-blue-100 border-blue-300",
    },
    {
      value: "friendly",
      label: "دوستانه",
      emoji: "😊",
      color: "bg-green-100 border-green-300",
    },
    {
      value: "creative",
      label: "خلاقانه",
      emoji: "🎨",
      color: "bg-purple-100 border-purple-300",
    },
    {
      value: "humorous",
      label: "طنز",
      emoji: "😂",
      color: "bg-yellow-100 border-yellow-300",
    },
  ];

  const platforms = [
    {
      value: "instagram",
      label: "اینستاگرام",
      emoji: <Instagram className="h-4 w-4" />,
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      limit: 150,
    },
    {
      value: "twitter",
      label: "توییتر/ایکس",
      emoji: <Twitter className="h-4 w-4" />,
      color: "bg-blue-500",
      limit: 160,
    },
    {
      value: "linkedin",
      label: "لینکدین",
      emoji: <Linkedin className="h-4 w-4" />,
      color: "bg-blue-700",
      limit: 220,
    },

    {
      value: "telegram",
      label: "تلگرام",
      emoji: <MessageCircle className="h-4 w-4" />,
      color: "bg-blue-500",
      limit: 70,
    },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedBio);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    sonnar("بایو کپی شد", {
      icon: "✂️",
    });
  };

  const getCurrentPlatform = () => {
    return (
      platforms.find((p) => p.value === platform) || {
        limit: 150,
        color: "bg-gray-500",
      }
    );
  };

  const getCharLimitColor = () => {
    const currentLimit = getCurrentPlatform().limit;
    const percentage = (charCount / currentLimit) * 100;

    if (percentage < 70) return "text-green-600";
    if (percentage < 90) return "text-yellow-600";
    return "text-red-600";
  };

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

  const generateBio = async () => {
    setIsGenerating(true);
    setIsCooldown(true);
    setError("");
    setNote("");

    if (isCooldown) {
      sonnar("لطفا چند لحظه صبر کن و دوباره بزن", {
        icon: "⏳",
      });
      return;
    }

    setCooldownTimer(NEXT_PUBLIC_COOLDOWN_TIME);

    try {
      const requestData = {
        aboutYou,
        platform,
        tone,
        language: "persian",
      };

      // Make the API request
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`خطا در ارتباط با سرور: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setGeneratedBio(data.bio);
      // Check if there's a note (e.g., fallback was used)
      if (data.note) {
        setNote(data.note);
      }
      setActiveView("result");

      sonnar.success("بایو ساخته شد!", {
        duration: 2000,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "خطایی در تولید بایو رخ داد. لطفاً دوباره تلاش کنید.";
      console.error("Error generating bio:", err);
      setError(errorMessage);

      sonnar.error("خطایی در تولید بایو رخ داد. لطفاً دوباره تلاش کنید.");
    } finally {
      setIsGenerating(false);
      setCooldownTimer(NEXT_PUBLIC_COOLDOWN_TIME);
    }
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gradient-to-b from-orange-50 to-white"
    >
      <div className="container mx-auto max-w-4xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          {/* <div className="inline-block p-2 bg-white rounded-full shadow-lg mb-4">
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-full p-1">
              <Sparkles className="size-4 text-white" />
            </div>
          </div> */}
          <Header />
          <p className="text-gray-600 max-w-xl mx-auto text-xs sm:text-lg">
            بایوهای باحال و جذاب برای شبکه‌های اجتماعی بساز
          </p>
        </motion.div>

        {/* Main Card */}
        <MotionCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="border-0 shadow bg-white rounded-2xl overflow-hidden"
        >
          {/* Custom Navigation */}
          <div className="border-b">
            <div className="flex px-4">
              <button
                onClick={() => setActiveView("generate")}
                className={`px-4 py-3 relative ${
                  activeView === "generate"
                    ? "text-orange-500 font-bold"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <div className="flex items-center">
                  <Zap className="h-4 w-4 ml-2" />
                  ساخت بایو
                </div>
                {activeView === "generate" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"></div>
                )}
              </button>
              {generatedBio && (
                <button
                  onClick={() => setActiveView("result")}
                  className={`px-4 py-3 relative ${
                    activeView === "result"
                      ? "text-orange-500 font-bold"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <div className="flex items-center">
                    <Sparkles className="h-4 w-4 ml-2" />
                    نتیجه
                  </div>
                  {activeView === "result" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"></div>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Generate View */}
          {activeView === "generate" && (
            <CardContent className="p-6 space-y-6">
              {/* Platform Selection */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="h-5 w-5 text-orange-500" />
                  <h3 className="font-bold text-gray-800">
                   شبکه اجتماعی رو انتخاب کن
                  </h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {platforms.map((plat) => (
                    <MotionButton
                      key={plat.value}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      variant={platform === plat.value ? "default" : "outline"}
                      className={`justify-start h-auto py-3 px-4 ${
                        platform === plat.value
                          ? `${plat.color} text-white border-0`
                          : "border-2 hover:border-gray-300"
                      }`}
                      onClick={() => setPlatform(plat.value)}
                    >
                      <div className="flex items-center">
                        <span
                          className={`ml-2 ${
                            platform === plat.value
                              ? "text-white"
                              : "text-gray-600"
                          }`}
                        >
                          {plat.emoji}
                        </span>
                        <span>{plat.label}</span>
                      </div>
                    </MotionButton>
                  ))}
                </div>
              </div>

              {/* Tone Selection */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <Smile className="h-5 w-5 text-orange-500" />
                  <h3 className="font-bold text-gray-800">
                    نوع بایو رو انتخاب کن
                  </h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {tones.map((t) => (
                    <MotionButton
                      key={t.value}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      variant="outline"
                      className={`justify-start border-2 ${
                        tone === t.value
                          ? `${t.color} border-2`
                          : "hover:border-gray-300"
                      }`}
                      onClick={() => setTone(t.value)}
                    >
                      <span className="ml-2">{t.emoji}</span>
                      {t.label}
                    </MotionButton>
                  ))}
                </div>
              </div>

              {/* About You */}
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-orange-500" />
                    <h3 className="font-bold text-gray-800">
                      درباره خودت یا پیجت بگو
                    </h3>
                  </div>
                  {platform && (
                    <Badge
                      variant="outline"
                      className={`${getCharLimitColor()} border-2`}
                    >
                      {charCount} / {getCurrentPlatform().limit}
                    </Badge>
                  )}
                </div>
                <Textarea
                  placeholder="ویژگی یا هرچیزی در مورد خودت یا پیجت بگو"
                  className="min-h-[120px] resize-none border-2 focus:border-orange-300 rounded-xl p-4 transition-all"
                  value={aboutYou}
                  onChange={(e) => setAboutYou(e.target.value)}
                  maxLength={platform ? getCurrentPlatform().limit : 150}
                />
                {platform && charCount > getCurrentPlatform().limit * 0.8 && (
                  <p className={`text-sm ${getCharLimitColor()}`}>
                    {charCount > getCurrentPlatform().limit * 0.9
                      ? "به محدودیت کاراکتر نزدیک شدی!"
                      : "در حال نزدیک شدن به محدودیت کاراکتر هستی."}
                  </p>
                )}
              </div>

                {/* Error Message */}
                {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 ml-2 flex-shrink-0" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {/* Generate Button */}
              <MotionButton
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                onClick={generateBio}
                disabled={isGenerating || !platform || !aboutYou || isCooldown}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="ml-2 h-5 w-5 animate-spin" />
                    در حال ساخت...
                  </>
                ) : isCooldown ? (
                  <>{cooldownTimer} ثانیه دیگر</>
                ) : (
                  <>
                    <Sparkles className="ml-2 h-5 w-5" />
                    ساخت بایو
                  </>
                )}
              </MotionButton>
            </CardContent>
          )}

          {/* Result View */}
          {activeView === "result" && generatedBio && (
            <CardContent className="p-6 space-y-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`p-1.5 rounded-md ${
                        getCurrentPlatform().color
                      }`}
                    >
                      {platforms.find((p) => p.value === platform)?.emoji}
                    </div>
                    <h3 className="font-bold text-gray-800">
                      بیوی {platforms.find((p) => p.value === platform)?.label}{" "}
                      شما
                    </h3>
                  </div>
                  <Badge
                    variant="outline"
                    className={`${
                      tone === "professional"
                        ? "bg-blue-100"
                        : tone === "friendly"
                        ? "bg-green-100"
                        : tone === "creative"
                        ? "bg-purple-100"
                        : "bg-yellow-100"
                    } border-0`}
                  >
                    {tones.find((t) => t.value === tone)?.emoji}{" "}
                    {tones.find((t) => t.value === tone)?.label}
                  </Badge>
                </div>

                {/* Note Message (if using fallback) */}
                {note && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start">
                    <Info className="h-5 w-5 text-amber-500 mt-0.5 ml-2 flex-shrink-0" />
                    <p className="text-amber-700 text-sm">{note}</p>
                  </div>
                )}
                <div className="relative">
                  <div className="p-6 bg-gradient-to-r from-gray-50 to-white rounded-xl border-2 border-gray-100 text-gray-800 shadow-inner">
                    <p className=" leading-relaxed">{generatedBio}</p>
                  </div>
                  <MotionButton
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    size="sm"
                    variant="outline"
                    className="absolute top-2 left-2 rounded-full h-10 w-10 p-0 border-2"
                    onClick={copyToClipboard}
                  >
                    {copied ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </MotionButton>
                </div>

                {/* Preview Section */}
                <div className="bg-gray-50 rounded-xl p-2 border border-gray-100">
                  <h4 className="font-bold text-gray-700 mb-3 flex items-center">
                    <Heart className="h-4 w-4 text-pink-500 ml-2" />
                    پیش‌نمایش در{" "}
                    {platforms.find((p) => p.value === platform)?.label}
                  </h4>
                  <div
                    className={`rounded-xl overflow-hidden border ${
                      platform === "instagram"
                        ? "border-pink-200"
                        : platform === "twitter"
                        ? "border-blue-200"
                        : platform === "linkedin"
                        ? "border-blue-700"
                        : platform === "telegram"
                        ? "border-blue-300"
                        : "border-red-200"
                    }`}
                  >
                    <div
                      className={`p-3 ${
                        platform === "instagram"
                          ? "bg-gradient-to-r from-purple-500 to-pink-500"
                          : platform === "twitter"
                          ? "bg-blue-500"
                          : platform === "linkedin"
                          ? "bg-blue-700"
                          : platform === "telegram"
                          ? "bg-blue-500"
                          : "bg-red-600"
                      } text-white`}
                    >
                      <div className="flex items-center">
                        {platforms.find((p) => p.value === platform)?.emoji}
                        <span className="mr-2 font-bold">
                          {platforms.find((p) => p.value === platform)?.label}
                        </span>
                      </div>
                    </div>
                    <div className="bg-white p-4">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                          <span className="text-sm">شما</span>
                        </div>
                        <div className="mr-3">
                          <p className="font-bold">نام کاربری شما</p>
                          <p className="text-sm text-gray-500">@username</p>
                        </div>
                      </div>
                      <p className="text-gray-800 text-sm leading-relaxed">
                        {generatedBio}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between w-full pt-2">
                  <MotionButton
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    variant="outline"
                    className="border-2"
                    onClick={() => setActiveView("generate")}
                  >
                    <ArrowLeft className="ml-2 h-4 w-4" />
                    بازگشت به ویرایش
                  </MotionButton>
                  <MotionButton
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0"
                    onClick={generateBio}
                  >
                    <RefreshCw className="ml-2 h-4 w-4" />
                    ساخت مجدد
                  </MotionButton>
                </div>
              </motion.div>
            </CardContent>
          )}
        </MotionCard>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 text-center text-sm text-gray-500"
        >
          <Footer />
        </motion.div>
      </div>
    </div>
  );
};

export default BioGenerator;
