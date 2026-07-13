import { OpenRouter } from "@openrouter/sdk";
import util from "util";

export type OpenRouterMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export interface OpenRouterProviderOptions {
  apiKey: string;
  serverURL?: string;
  baseUrl?: string;
  httpReferer?: string;
  appName?: string;
}

export interface OpenRouterChatCompletionOptions {
  model: string;
  messages: OpenRouterMessage[];
  temperature?: number;
  topP?: number;
  maxTokens?: number;
  stream?: boolean;
  signal?: AbortSignal;
}

export type OpenRouterChatStream = AsyncIterable<unknown>;

export class OpenRouterProvider {
  private client: OpenRouter;

  constructor(options: OpenRouterProviderOptions) {
    if (!options.apiKey) {
      throw new Error("OPENROUTER_API_KEY environment variable is not set");
    }

    this.client = new OpenRouter({
      apiKey: options.apiKey,
      serverURL: options.serverURL ?? options.baseUrl,
      httpReferer: options.httpReferer,
      xTitle: options.appName,
    });
  }

  async createChatCompletion(options: OpenRouterChatCompletionOptions): Promise<string> {
    const start = Date.now();
    console.log(
      `[OpenRouter] request start model=${options.model} temperature=${options.temperature ?? 0.7} topP=${options.topP ?? 1.0} maxTokens=${options.maxTokens ?? "unset"}`
    );

    const maxAttempts = 3;
    let attempt = 0;
    let lastError: unknown = null;

    while (attempt < maxAttempts) {
      attempt += 1;
      try {
        const response = await this.client.chat.send({
          model: options.model,
          messages: options.messages,
          temperature: options.temperature,
          topP: options.topP,
          maxTokens: options.maxTokens,
          stream: false,
        });

        const content = response?.choices?.[0]?.message?.content;
        if (!content || typeof content !== "string") {
          throw new Error("OpenRouter did not return a valid completion response.");
        }

        console.log(
          `[OpenRouter] request end model=${options.model} latency=${Date.now() - start}ms attempt=${attempt}`
        );
        return content.trim();
      } catch (error: unknown) {
        lastError = error;
        // Log internal error details for debugging (do not expose to clients)
        try {
          console.error(`OpenRouter request error (attempt ${attempt}):`, util.inspect(error, { depth: 6 }));
        } catch (e) {
          /* ignore logging failures */
        }

        const anyErr = error as any;
        const status = anyErr?.response?.status || anyErr?.response?.statusCode || anyErr?.status;
        const body = anyErr?.response?.body ?? anyErr?.response?.text ?? anyErr?.response?.data;
        const parsedBody = this.parseOpenRouterErrorBody(body);
        const message = String(anyErr?.message || anyErr?.error || parsedBody.message || "").toLowerCase();
        const retryableStatus = [429, 500, 502, 503, 504];
        const retryableMessagePatterns = [
          "provider returned error",
          "overload",
          "timeout",
          "idle timeout",
          "response validation failed",
          "upstream",
        ];

        if (attempt >= maxAttempts) break;

        const shouldRetry =
          (status && retryableStatus.includes(Number(status))) ||
          (parsedBody.code && retryableStatus.includes(Number(parsedBody.code))) ||
          retryableMessagePatterns.some((pattern) => message.includes(pattern)) ||
          (parsedBody.message && retryableMessagePatterns.some((pattern) => parsedBody.message?.toLowerCase().includes(pattern)));

        if (shouldRetry) {
          const wait = 500 * attempt;
          await new Promise((res) => setTimeout(res, wait));
          continue;
        }

        // Not retryable, break and propagate
        break;
      }
    }

    // exhausted retries -> surface normalized error
    throw this.normalizeError(lastError);
  }

  async streamChatCompletion(
    options: OpenRouterChatCompletionOptions
  ): Promise<OpenRouterChatStream> {
    console.log(`[OpenRouter] streaming start model=${options.model}`);

    try {
      const stream = await this.client.chat.send(
        {
          model: options.model,
          messages: options.messages,
          temperature: options.temperature,
          topP: options.topP,
          maxTokens: options.maxTokens,
          stream: true,
        },
        { signal: options.signal }
      );

      return stream as OpenRouterChatStream;
    } catch (error: unknown) {
      throw this.normalizeError(error);
    }
  }

  private normalizeError(error: unknown): Error {
    // Prefer Error instances
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        return new Error("OpenRouter request was aborted.");
      }

      const anyErr = error as any;
      if (anyErr?.response) {
        const status = anyErr.response.status || anyErr.response?.statusCode;
        const body = anyErr.response?.body ?? anyErr.response?.text ?? anyErr.response?.data;
        const parsedBody = this.parseOpenRouterErrorBody(body);
        const errorMessage = parsedBody.message || anyErr.message || "Provider returned error";
        const snippet = parsedBody.raw ? `: ${JSON.stringify(parsedBody.raw).slice(0, 300)}` : "";
        return new Error(
          `OpenRouter API error: ${errorMessage}${status ? ` (status ${status})` : ""}${snippet}`
        );
      }

      const message = anyErr?.message || "OpenRouter request failed.";
      return new Error(`OpenRouter API error: ${message}`);
    }

    // Non-Error objects returned by the SDK (tuple or object)
    const anyErr = error as any;
    if (anyErr && typeof anyErr === "object") {
      if (Array.isArray(anyErr) && anyErr.length > 0) {
        try {
          const candidate = anyErr[0];
          const msg = candidate?.message || candidate?.error || JSON.stringify(candidate);
          return new Error(`OpenRouter API error: ${String(msg).slice(0, 300)}`);
        } catch (e) {
          return new Error("OpenRouter API error: Provider returned error");
        }
      }

      if (anyErr?.status || anyErr?.value) {
        const msg = anyErr?.message || anyErr?.value || JSON.stringify(anyErr);
        return new Error(`OpenRouter API error: ${String(msg).slice(0, 300)}`);
      }

      const message = anyErr?.message || JSON.stringify(anyErr).slice(0, 300);
      return new Error(`OpenRouter API error: ${message}`);
    }

    return new Error("OpenRouter API request failed.");
  }

  private parseOpenRouterErrorBody(body: unknown): { code?: number; message?: string; raw?: unknown } {
    if (body == null) {
      return { raw: body };
    }

    let parsed: unknown = body;
    if (typeof body === "string") {
      try {
        parsed = JSON.parse(body);
      } catch {
        parsed = body;
      }
    }

    if (parsed && typeof parsed === "object") {
      const errorPayload = (parsed as any).error ?? parsed;
      const codeValue = errorPayload?.code;
      const code = typeof codeValue === "number" ? codeValue : typeof codeValue === "string" && !Number.isNaN(Number(codeValue)) ? Number(codeValue) : undefined;
      const message = typeof errorPayload?.message === "string" ? errorPayload.message : undefined;
      return { code, message, raw: parsed };
    }

    return { raw: parsed };
  }
}
