import { describe, expect, it } from "vitest";
import {
  generateBioRequestSchema,
  normalizeGeneratedBio,
  PLATFORM_LIMITS,
} from "@/lib/generation";

describe("generation validation", () => {
  it("accepts the supported request shape", () => {
    const result = generateBioRequestSchema.safeParse({
      aboutYou: "طراح محصول و علاقه‌مند به فناوری",
      platform: "instagram",
      tone: "creative",
      language: "persian",
    });

    expect(result.success).toBe(true);
  });

  it("rejects unsupported platforms and empty descriptions", () => {
    expect(
      generateBioRequestSchema.safeParse({
        aboutYou: "",
        platform: "tiktok",
        tone: "friendly",
      }).success,
    ).toBe(false);
  });

  it("normalizes whitespace and respects platform limits", () => {
    const longBio = `  ${"بایو ".repeat(100)}  `;
    const normalized = normalizeGeneratedBio(longBio, "telegram");

    expect(normalized.length).toBeLessThanOrEqual(PLATFORM_LIMITS.telegram);
    expect(normalized).not.toMatch(/\s{2,}/);
    expect(normalized).not.toMatch(/^\s|\s$/);
  });
});
