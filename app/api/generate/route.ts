import { NextResponse } from "next/server";
import { rateLimitByIp, RateLimitError } from "@/lib/rate-limit";
import { generateBioWithLLM, SupportedModel } from "@/lib/llm-provider";
import {
  buildBioPrompt,
  generateFallbackBio,
  parseBioLanguage,
} from "@/lib/bio-language";
import { messages } from "@/lib/i18n";
import type { BioLanguage } from "@/lib/i18n";

const LLM_MODEL = (process.env.NEXT_LLM_MODEL || "gpt-4o") as SupportedModel;

/** Allowed platform values – prevents injection via platform field */
const ALLOWED_PLATFORMS = [
  "instagram",
  "twitter",
  "linkedin",
  "tiktok",
  "telegram",
  "youtube",
] as const;
/** Allowed tone values – prevents injection via tone field */
const ALLOWED_TONES = ["professional", "friendly", "creative", "humorous"] as const;

const MAX_ABOUT_YOU_LENGTH = 2000;

/**
 * Sanitizes user-provided text: truncates length, strips control chars, normalizes whitespace.
 * Reduces prompt-injection and token-abuse risk.
 */
function sanitizeUserInput(raw: unknown): string {
  if (typeof raw !== "string") return "";
  const stripped = raw
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return stripped.slice(0, MAX_ABOUT_YOU_LENGTH);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function localizedBioMessages(language: BioLanguage) {
  return messages[language === "english" ? "en" : "fa"].bio;
}

export async function POST(request: Request) {
  let language: BioLanguage =
    request.headers.get("accept-language")?.toLowerCase().startsWith("en") === true
      ? "english"
      : "persian";

  try {
    await rateLimitByIp(request);

    const body: unknown = await request.json();
    if (!isRecord(body)) {
      return NextResponse.json(
        { error: localizedBioMessages(language).errorRequired },
        { status: 400 },
      );
    }

    const parsedLanguage = parseBioLanguage(body.language);
    if (!parsedLanguage) {
      const requestedEnglish =
        request.headers.get("accept-language")?.toLowerCase().startsWith("en") === true;
      const invalidLanguage = messages[requestedEnglish ? "en" : "fa"].bio.errorInvalidLanguage;
      return NextResponse.json({ error: invalidLanguage }, { status: 400 });
    }
    language = parsedLanguage;
    const copy = localizedBioMessages(language);

    const rawAbout = body.aboutYou;
    const platform =
      typeof body.platform === "string" ? body.platform.toLowerCase().trim() : "";
    const tone = typeof body.tone === "string" ? body.tone.toLowerCase().trim() : "";

    if (!rawAbout || !platform || !tone) {
      return NextResponse.json({ error: copy.errorRequired }, { status: 400 });
    }

    if (!ALLOWED_PLATFORMS.includes(platform as (typeof ALLOWED_PLATFORMS)[number])) {
      return NextResponse.json({ error: copy.errorInvalidPlatform }, { status: 400 });
    }
    if (!ALLOWED_TONES.includes(tone as (typeof ALLOWED_TONES)[number])) {
      return NextResponse.json({ error: copy.errorInvalidTone }, { status: 400 });
    }

    const aboutYou = sanitizeUserInput(rawAbout);
    if (!aboutYou) {
      return NextResponse.json({ error: copy.errorInvalidAbout }, { status: 400 });
    }

    try {
      const result = await generateBioWithLLM(LLM_MODEL, buildBioPrompt(language), {
        aboutYou,
        platform,
        tone,
      });

      return NextResponse.json({
        bio: result.text,
        model: LLM_MODEL,
      });
    } catch (error) {
      console.error("Error generating bio with AI:", error);
      return NextResponse.json(
        {
          bio: generateFallbackBio(aboutYou, platform, tone, language),
          note: copy.fallbackNote,
        },
        { status: 200 },
      );
    }
  } catch (error) {
    console.error("Error in generate-bio API:", error);

    if (error instanceof RateLimitError) {
      return NextResponse.json(
        { error: localizedBioMessages(language).rateLimited },
        { status: 429 },
      );
    }

    return NextResponse.json(
      { error: localizedBioMessages(language).errorUnexpected },
      { status: 500 },
    );
  }
}
