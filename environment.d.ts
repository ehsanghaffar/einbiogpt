declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NEXT_OPENAI_API_KEY: string
    readonly NEXT_PUBLIC_COOLDOWN_TIME: number
    readonly NEXT_LLM_MODEL: string
    readonly NEXT_LLM_PROVIDER: string
    readonly OPENROUTER_API_KEY: string
    readonly OPENROUTER_BASE_URL: string
    readonly OPENROUTER_DEFAULT_MODEL: string
    readonly OPENROUTER_HTTP_REFERER: string
    readonly OPENROUTER_APP_NAME: string
  }
}
