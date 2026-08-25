/**
 * Google Gemini API provider using the Interactions API (REST).
 * @see https://aistudio.google.com/docs/get-started
 */

export interface GeminiProviderOptions {
  apiKey: string;
  baseUrl?: string;
}

export interface GeminiChatCompletionOptions {
  model: string;
  input: string;
  temperature?: number;
  topP?: number;
  maxTokens?: number;
  signal?: AbortSignal;
}

export interface GeminiInteractionStep {
  type: string;
  content?: Array<{ type: string; text?: string }>;
  signature?: string;
  [key: string]: unknown;
}

export interface GeminiInteractionResponse {
  id: string;
  status: string;
  model?: string;
  steps?: GeminiInteractionStep[];
  usage?: {
    total_tokens?: number;
    total_input_tokens?: number;
    total_output_tokens?: number;
  };
  error?: string;
}

export class GeminiProvider {
  private apiKey: string;
  private baseUrl: string;

  constructor(options: GeminiProviderOptions) {
    if (!options.apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not set");
    }
    this.apiKey = options.apiKey;
    this.baseUrl = options.baseUrl || "https://generativelanguage.googleapis.com/v1beta";
  }

  async createChatCompletion(options: GeminiChatCompletionOptions): Promise<string> {
    const start = Date.now();
    console.log(
      `[Gemini] request start model=${options.model} temperature=${options.temperature ?? 0.7} topP=${options.topP ?? 1.0} maxTokens=${options.maxTokens ?? "unset"}`
    );

    const maxAttempts = 3;
    let attempt = 0;
    let lastError: unknown = null;

    while (attempt < maxAttempts) {
      attempt += 1;
      try {
        const body: Record<string, unknown> = {
          model: options.model,
          input: options.input,
        };

        // if (options.temperature !== undefined) body.temperature = options.temperature;
        // if (options.topP !== undefined) body.topP = options.topP;
        // if (options.maxTokens !== undefined) body.maxTokens = options.maxTokens;

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 60_000);

        const signal = options.signal
          ? anySignal([options.signal, controller.signal])
          : controller.signal;

        const response = await fetch(`${this.baseUrl}/interactions`, {
          method: "POST",
          headers: {
            "x-goog-api-key": this.apiKey,
            "Content-Type": "application/json",
            "Api-Revision": "2026-05-20",
          },
          body: JSON.stringify(body),
          signal,
        });

        clearTimeout(timeout);

        if (!response.ok) {
          const errorText = await response.text().catch(() => "Unknown error");
          throw new Error(
            `Gemini API error: ${response.status} - ${errorText.slice(0, 500)}`
          );
        }

        const data: GeminiInteractionResponse = await response.json();

        // Extract text from the last model_output step
        const text = this.extractOutputText(data);

        if (!text) {
          throw new Error("Gemini did not return a valid text response.");
        }

        console.log(
          `[Gemini] request end model=${options.model} latency=${Date.now() - start}ms attempt=${attempt}`
        );
        return text.trim();
      } catch (error: unknown) {
        lastError = error;

        try {
          console.error(
            `[Gemini] request error (attempt ${attempt}):`,
            error instanceof Error ? error.message : String(error)
          );
        } catch {
          /* ignore logging failures */
        }

        if (attempt >= maxAttempts) break;

        const shouldRetry = this.isRetryable(error);
        if (shouldRetry) {
          const wait = 500 * attempt;
          await new Promise((res) => setTimeout(res, wait));
          continue;
        }

        break;
      }
    }

    throw this.normalizeError(lastError);
  }

  private extractOutputText(data: GeminiInteractionResponse): string | null {
    if (!data.steps || data.steps.length === 0) return null;

    // Find the last model_output step and extract text content
    for (let i = data.steps.length - 1; i >= 0; i--) {
      const step = data.steps[i];
      if (step.type === "model_output" && step.content) {
        const textBlocks = step.content.filter((c) => c.type === "text" && c.text);
        if (textBlocks.length > 0) {
          return textBlocks.map((c) => c.text).join("");
        }
      }
    }

    return null;
  }

  private isRetryable(error: unknown): boolean {
    const message = error instanceof Error ? error.message : String(error).toLowerCase();
    const retryablePatterns = [
      "429",
      "500",
      "502",
      "503",
      "504",
      "rate limit",
      "overloaded",
      "timeout",
      "quota exceeded",
      "internal error",
      "network",
      "econnreset",
      "econnrefused",
    ];
    return retryablePatterns.some((p) => message.includes(p));
  }

  private normalizeError(error: unknown): Error {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        return new Error("Gemini request was aborted.");
      }
      return new Error(`Gemini API error: ${error.message}`);
    }
    return new Error("Gemini API request failed.");
  }
}

/**
 * Combine multiple AbortSignals into one (aborts when any one aborts).
 */
function anySignal(signals: AbortSignal[]): AbortSignal {
  const controller = new AbortController();
  for (const signal of signals) {
    if (signal.aborted) {
      controller.abort(signal.reason);
      return controller.signal;
    }
    signal.addEventListener("abort", () => controller.abort(signal.reason), {
      once: true,
    });
  }
  return controller.signal;
}
