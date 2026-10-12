import { describe, expect, it, vi } from "vitest";

import { messages } from "@/lib/i18n";
import { RateLimitError, rateLimitByIp } from "@/lib/rate-limit";
import { POST } from "@/app/api/generate/route";

vi.mock("@/lib/rate-limit", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/rate-limit")>();
  return { ...actual, rateLimitByIp: vi.fn() };
});

describe("generate route rate-limit errors", () => {
  it.each([
    ["en-US", messages.en.bio.rateLimited],
    ["fa-IR", messages.fa.bio.rateLimited],
  ])("localizes the rate-limit response for %s", async (acceptLanguage, expected) => {
    vi.mocked(rateLimitByIp).mockRejectedValueOnce(new RateLimitError());
    const request = new Request("https://bio.example/api/generate", {
      method: "POST",
      headers: { "Accept-Language": acceptLanguage },
      body: "{}",
    });

    const response = await POST(request);

    expect(response.status).toBe(429);
    expect(await response.json()).toEqual({ error: expected });
  });
});
