import { afterEach, describe, expect, it, vi } from "vitest";

import { requestBio } from "../mobile/lib/api";

const fetchMock = vi.fn<typeof fetch>();

describe("mobile bio API client", () => {
  afterEach(() => {
    fetchMock.mockReset();
    vi.unstubAllGlobals();
  });

  it("sends the selected language and generator options to the existing API", async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ bio: "A thoughtful bio" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      requestBio(
        { aboutYou: "A product designer", platform: "instagram", tone: "friendly" },
        "en",
      ),
    ).resolves.toEqual({ bio: "A thoughtful bio", note: undefined });

    const [url, init] = fetchMock.mock.calls[0] ?? [];
    expect(url).toMatch(/\/api\/generate$/);
    expect(init?.headers).toEqual({
      "Accept-Language": "en-US",
      "Content-Type": "application/json",
    });
    expect(JSON.parse(String(init?.body))).toEqual({
      aboutYou: "A product designer",
      platform: "instagram",
      tone: "friendly",
      language: "english",
    });
  });

  it("returns localized server errors without replacing their message", async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ error: "Too many requests." }), {
        status: 429,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      requestBio(
        { aboutYou: "A product designer", platform: "instagram", tone: "friendly" },
        "en",
      ),
    ).rejects.toThrow("Too many requests.");
  });
});
