import { LLMChain } from "langchain/chains";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { OpenRouterProvider } from "@/lib/openrouter-provider";

export type SupportedModel =
  | "gpt-4o"
  | "gpt-5"
  | "glm-4.7-flash-free"
  | "gemini-2.0-flash-free"
  | string;

export type ModelProvider = "openai" | "aihubmix" | "openrouter";

interface LLMResponse {
  text: string;
}

/**
 * Determines the provider for a given model
 */
export function getModelProvider(model: SupportedModel): ModelProvider {
  const forcedProvider = (process.env.NEXT_LLM_PROVIDER || "").toLowerCase();
  if (forcedProvider === "openai" || forcedProvider === "openrouter" || forcedProvider === "aihubmix") {
    return forcedProvider as ModelProvider;
  }

  if (model === "gpt-4o" || model === "gpt-5") {
    return "openai";
  }

  if (typeof model === "string" && (model.includes("/") || model.startsWith("~") || model.includes(":"))) {
    return "openrouter";
  }

  return "aihubmix";
}

/**
 * Creates an LLMChain for OpenAI models using LangChain
 */
function createOpenAIChain(
  model: string,
  apiKey: string,
  template: string,
  inputVariables: string[]
): LLMChain {
  const chatOpenAI = new ChatOpenAI({
    modelName: model,
    temperature: 0.7,
    openAIApiKey: apiKey,
  });

  const promptTemplate = new PromptTemplate({
    template,
    inputVariables,
  });

  return new LLMChain({
    llm: chatOpenAI,
    prompt: promptTemplate as any, // Type assertion to bypass type issuesp
  });
}

/**
 * Calls AIHUBMIX API for non-OpenAI models using fetch
 */
async function callAIHubMixAPI(
  model: string,
  apiKey: string,
  template: string,
  inputVariables: Record<string, string>
): Promise<string> {
  const apiBaseUrl = process.env.AIHUBMIX_API_BASE_URL || "https://aihubmix.com/v1";

  let messageContent = renderTemplate(template, inputVariables);

  const response = await fetch(`${apiBaseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "user",
          content: messageContent,
        },
      ],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `AIHUBMIX API Error: ${response.status} - ${
        errorData.error?.message || "Unknown error"
      }`
    );
  }

  const data = await response.json();

  if (!data.choices || !data.choices[0] || !data.choices[0].message) {
    throw new Error("Invalid response format from AIHUBMIX API");
  }

  return data.choices[0].message.content;
}

function renderTemplate(template: string, inputVariables: Record<string, string>) {
  return Object.entries(inputVariables).reduce((result, [key, value]) => {
    return result.replace(new RegExp(`{${key}}`, "g"), value);
  }, template);
}

function isOpenRouterModel(model: string): boolean {
  return model.startsWith("~") || model.includes("/") || model.includes(":");
}

/**
 * Main function to generate bio text using the selected model
 */
export async function generateBioWithLLM(
  model: SupportedModel,
  prompt: string,
  inputVariables: Record<string, string>
): Promise<LLMResponse> {
  const provider = getModelProvider(model);

  if (provider === "openai") {
    const apiKey = process.env.NEXT_OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("NEXT_OPENAI_API_KEY environment variable is not set");
    }

    const chain = createOpenAIChain(
      model,
      apiKey,
      prompt,
      Object.keys(inputVariables)
    );

    const result = await chain.call(inputVariables);
    return {
      text: result.text.trim(),
    };
  }

  if (provider === "openrouter") {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new Error("OPENROUTER_API_KEY environment variable is not set");
    }

    const openRouter = new OpenRouterProvider({
      apiKey,
      baseUrl: process.env.OPENROUTER_BASE_URL,
      httpReferer: process.env.OPENROUTER_HTTP_REFERER,
      appName: process.env.OPENROUTER_APP_NAME,
    });

    const selectedModel = isOpenRouterModel(model)
      ? model
      : process.env.OPENROUTER_DEFAULT_MODEL;

    if (!selectedModel) {
      throw new Error("No OpenRouter model provided and OPENROUTER_DEFAULT_MODEL is not set");
    }

    const messageContent = renderTemplate(prompt, inputVariables);
    const text = await openRouter.createChatCompletion({
      model: selectedModel,
      messages: [
        {
          role: "user",
          content: messageContent,
        },
      ],
      temperature: 0.7,
      topP: 1,
      maxTokens: 1024,
      stream: false,
    });

    return {
      text: text.trim(),
    };
  }

  const apiKey = process.env.AIHUBMIX_API_KEY;
  if (!apiKey) {
    throw new Error("AIHUBMIX_API_KEY environment variable is not set");
  }

  const text = await callAIHubMixAPI(model, apiKey, prompt, inputVariables);
  return {
    text: text.trim(),
  };
}

/**
 * Get all supported models with their configurations
 */
export const SUPPORTED_MODELS = {
  "gpt-4o": { label: "GPT-4o (OpenAI)", provider: "openai" },
  "gpt-5": { label: "GPT-5 (OpenAI)", provider: "openai" },
  "glm-4.7-flash-free": { label: "GLM-4.7-Flash (Free)", provider: "aihubmix" },
  "gemini-2.0-flash-free": { label: "Gemini 2.0 Flash (Free)", provider: "aihubmix" },
} as const;
