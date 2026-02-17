declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NEXT_OPENAI_API_KEY: string
    readonly NEXT_PUBLIC_COOLDOWN_TIME: number
    readonly AIHUBMIX_API_KEY: string
    readonly AIHUBMIX_API_BASE_URL: string
    readonly NEXT_LLM_MODEL: string
  }
}
