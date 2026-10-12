import type { PlatformId, ToneId } from "./i18n";

export const BIO_PLATFORMS: ReadonlyArray<{ value: PlatformId; limit: number }> = [
  { value: "instagram", limit: 150 },
  { value: "twitter", limit: 160 },
  { value: "linkedin", limit: 220 },
  { value: "telegram", limit: 70 },
];

export const BIO_TONES: ReadonlyArray<ToneId> = [
  "professional",
  "friendly",
  "creative",
  "humorous",
];
