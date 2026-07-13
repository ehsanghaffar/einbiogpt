import { describe, expect, it, vi, beforeEach } from "vitest";
import { OpenRouterProvider } from "@/lib/openrouter-provider";
import { OpenRouter } from "@openrouter/sdk";

const mockSend = vi.fn();

vi.mock("@openrouter/sdk", () => ({
  OpenRouter: vi.fn().mockImplementation(() => ({
    chat: {
      send: mockSend,
    },
  })),
}));

describe("OpenRouterProvider", () => {
  const defaultOptions = {
    apiKey: "test-api-key",
    baseUrl: "https://openrouter.ai/api/v1",
    httpReferer: "https://example.com",
    appName: "BioGPT",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("initializes with provided options", () => {
    const provider = new OpenRouterProvider(defaultOptions);
    expect(OpenRouter).toHaveBeenCalledWith({
      apiKey: "test-api-key",
      serverURL: "https://openrouter.ai/api/v1",
      httpReferer: "https://example.com",
      xTitle: "BioGPT",
    });
    expect(provider).toBeDefined();
  });

  it("throws when apiKey is missing", () => {
    expect(() => new OpenRouterProvider({ apiKey: "" })).toThrow(
      "OPENROUTER_API_KEY environment variable is not set"
    );
  });

  it("creates chat completion and returns trimmed text", async () => {
    mockSend.mockResolvedValue({
      choices: [{ message: { content: " Hello world " } }],
    });

    const provider = new OpenRouterProvider(defaultOptions);
    const result = await provider.createChatCompletion({
      model: "meta-llama/llama-3.3-70b-instruct:free",
      messages: [{ role: "user", content: "Hi" }],
      temperature: 0.5,
      topP: 0.9,
      maxTokens: 64,
    });

    expect(result).toBe("Hello world");
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        model: "meta-llama/llama-3.3-70b-instruct:free",
        stream: false,
      })
    );
  });

  it("retries on ResponseValidationError with upstream timeout payload", async () => {
    const timeoutError = new Error("Response validation failed");
    timeoutError.name = "ResponseValidationError";
    (timeoutError as any).response = {
      status: 200,
      body: {
        error: {
          message: "Upstream idle timeout exceeded",
          code: 504,
        },
      },
      headers: new Headers({ "content-type": "application/json" }),
    };

    mockSend
      .mockRejectedValueOnce(timeoutError)
      .mockResolvedValueOnce({
        choices: [{ message: { content: " Retry success " } }],
      });

    const provider = new OpenRouterProvider(defaultOptions);
    const result = await provider.createChatCompletion({
      model: "meta-llama/llama-3.3-70b-instruct:free",
      messages: [{ role: "user", content: "Hi" }],
      temperature: 0.5,
      topP: 0.9,
      maxTokens: 64,
    });

    expect(result).toBe("Retry success");
    expect(mockSend).toHaveBeenCalledTimes(2);
  });

  it("streams chat completion", async () => {
    const streamValue = [{ choices: [{ delta: { content: "Hello" } }] }];
    mockSend.mockResolvedValue(streamValue);

    const provider = new OpenRouterProvider(defaultOptions);
    const stream = await provider.streamChatCompletion({
      model: "meta-llama/llama-3.3-70b-instruct:free",
      messages: [{ role: "user", content: "Hi" }],
      stream: true,
    });

    expect(stream).toBe(streamValue);
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({ stream: true }),
      expect.any(Object)
    );
  });
});
