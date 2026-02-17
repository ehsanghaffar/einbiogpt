import { LLMChain } from "langchain/chains";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";

export type SupportedModel = 
  | "gpt-4o" 
  | "gpt-5" 
  | "glm-4.7-flash-free" 
  | "gemini-2.0-flash-free"
  | string;

export type ModelProvider = "openai" | "aihubmix";

interface LLMResponse {
  text: string;
}

/**
 * Determines the provider for a given model
 */
export function getModelProvider(model: SupportedModel): ModelProvider {
  if (model === "gpt-4o" || model === "gpt-5") {
    return "openai";
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
    prompt: promptTemplate,
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

  // Build the message content by replacing template variables
  let messageContent = template;
  Object.entries(inputVariables).forEach(([key, value]) => {
    messageContent = messageContent.replace(new RegExp(`{${key}}`, "g"), value);
  });

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
    // Use OpenAI with LangChain
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
  } else {
    // Use AIHUBMIX for other models
    const apiKey = process.env.AIHUBMIX_API_KEY;
    if (!apiKey) {
      throw new Error("AIHUBMIX_API_KEY environment variable is not set");
    }

    const text = await callAIHubMixAPI(model, apiKey, prompt, inputVariables);
    return {
      text: text.trim(),
    };
  }
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
