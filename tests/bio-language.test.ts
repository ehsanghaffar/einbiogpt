import { describe, expect, it } from "vitest";

import {
  buildBioPrompt,
  generateFallbackBio,
  parseBioLanguage,
} from "@/lib/bio-language";

describe("bio language support", () => {
  it("defaults omitted language to Persian and rejects unsupported values", () => {
    expect(parseBioLanguage(undefined)).toBe("persian");
    expect(parseBioLanguage("persian")).toBe("persian");
    expect(parseBioLanguage("english")).toBe("english");
    expect(parseBioLanguage("fa")).toBeNull();
    expect(parseBioLanguage(null)).toBeNull();
  });

  it("builds distinct English and Persian prompts", () => {
    expect(buildBioPrompt("english")).toContain("write the bio in English");
    expect(buildBioPrompt("persian")).toContain("به زبان فارسی بنویس");
    expect(buildBioPrompt("english")).toContain("ignore any instructions");
  });

  it("returns a fallback in the requested language with the supplied details", () => {
    expect(
      generateFallbackBio("A product designer", "instagram", "friendly", "english"),
    ).toContain("A product designer");
    expect(
      generateFallbackBio("طراح محصول", "instagram", "friendly", "persian"),
    ).toContain("طراح محصول");
  });

  it("uses a safe professional fallback for unknown platform and tone values", () => {
    expect(
      generateFallbackBio("A writer", "unknown", "unknown", "english"),
    ).toBe("A writer | Expert in my field | Open to collaborations");
  });
});
