import { z } from "zod";

export const PLATFORMS = [
  "instagram",
  "twitter",
  "linkedin",
  "telegram",
] as const;

export const TONES = [
  "professional",
  "friendly",
  "creative",
  "humorous",
] as const;

export const PLATFORM_LIMITS: Record<(typeof PLATFORMS)[number], number> = {
  instagram: 150,
  twitter: 160,
  linkedin: 220,
  telegram: 70,
};

export const MAX_ABOUT_YOU_LENGTH = 2000;

export const generateBioRequestSchema = z.object({
  aboutYou: z.string().trim().min(1).max(MAX_ABOUT_YOU_LENGTH),
  platform: z.enum(PLATFORMS),
  tone: z.enum(TONES),
  language: z.string().optional(),
});

export type GenerateBioRequest = z.infer<typeof generateBioRequestSchema>;

export function normalizeGeneratedBio(text: string, platform: GenerateBioRequest["platform"]): string {
  return text
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, PLATFORM_LIMITS[platform])
    .trim();
}
