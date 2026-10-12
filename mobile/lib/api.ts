import {
  messages,
  toBioLanguage,
} from "../../lib/i18n";
import type { Locale, PlatformId, ToneId } from "../../lib/i18n";

const API_BASE_URL = (
  process.env.EXPO_PUBLIC_API_BASE_URL ?? "https://bio.eindev.ir"
).replace(/\/+$/, "");

export interface BioRequest {
  aboutYou: string;
  platform: PlatformId;
  tone: ToneId;
}

export interface GeneratedBio {
  bio: string;
  note?: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function requestBio(
  request: BioRequest,
  locale: Locale,
): Promise<GeneratedBio> {
  const copy = messages[locale].bio;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60_000);

  try {
    let response: Response;
    try {
      response = await fetch(`${API_BASE_URL}/api/generate`, {
        method: "POST",
        headers: {
          "Accept-Language": locale === "fa" ? "fa-IR" : "en-US",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...request,
          language: toBioLanguage(locale),
        }),
        signal: controller.signal,
      });
    } catch {
      throw new Error(copy.errorNetwork);
    }

    let payload: unknown;
    try {
      payload = await response.json();
    } catch {
      throw new Error(copy.errorUnexpected);
    }
    if (!isRecord(payload)) throw new Error(copy.errorUnexpected);

    if (!response.ok) {
      throw new Error(
        typeof payload.error === "string" ? payload.error : copy.errorUnexpected,
      );
    }
    if (typeof payload.bio !== "string" || payload.bio.trim().length === 0) {
      throw new Error(copy.errorUnexpected);
    }

    return {
      bio: payload.bio,
      note: typeof payload.note === "string" ? payload.note : undefined,
    };
  } finally {
    clearTimeout(timeout);
  }
}
