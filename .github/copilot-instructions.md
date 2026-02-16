# BioGPT Copilot Instructions

AI-powered social media bio generator built with Next.js, TypeScript, and OpenAI.

## Project Architecture

**Full-stack web app** with client-side UI and server-side LLM generation:
- **Frontend**: React 18 client components in [app/page.tsx](../app/page.tsx) with form inputs (text, platform, tone)
- **Backend**: Next.js API routes calling OpenAI/LangChain
- **Integration**: LangChain `LLMChain` with `ChatOpenAI(gpt-4o)` for bio generation via [app/api/generate/route.ts](../app/api/generate/route.ts)
- **Direction**: Persian/Farsi with RTL (`dir="rtl"` on html element in [app/layout.tsx](../app/layout.tsx))

**Data flow**: Form input → `/api/generate` POST → ChatOpenAI LLMChain PromptTemplate → Generated bio text

## Rate Limiting & Error Handling

**In-memory IP-based rate limiting** (not database):
- Two implementations: [lib/limiter.ts](../lib/limiter.ts) (time-window based) and [store/rateLimitStore.ts](../store/rateLimitStore.ts) (simpler 360-min window)
- Custom `RateLimitError` in [lib/errors.ts](../lib/errors.ts); custom `ServerError` class takes status code
- **Client-side cooldown**: `NEXT_PUBLIC_COOLDOWN_TIME` env var (default 10s) - managed in page.tsx state
- API returns JSON errors with Persian messages: `{ error: "لطفاً تمام فیلدهای مورد نیاز را پر کنید." }`

## Key Patterns & Conventions

### Environment Variables
- `NEXT_PUBLIC_OPENAI_API_KEY`: OpenAI API key (exposed to client in earlier versions; reconsider security)
- `NEXT_PUBLIC_COOLDOWN_TIME`: Cooldown in seconds between requests

### Styling & UI
- **Tailwind CSS** with RTL support; HSL CSS variables in [styles/globals.css](../styles/globals.css)
- **shadcn/ui components**: [components/ui/*](../components/ui/) (button, card, textarea, tabs, select, badge)
- **Animations**: Framer Motion (`MotionCard`, `MotionButton`)
- **Notifications**: Sonner toast (`sonner`) for success/error messages

### Form Validation & State
- **React Hook Form** not currently used (direct `useState` in page.tsx)
- **Zod** imported but no current validation schemas; add `zod` validation for bio generation request
- **Client state**: `aboutYou`, `platform`, `tone`, `generatedBio`, `isGenerating`, `isCooldown`

### LLMChain Template (Prompt Engineering)
- Persian prompt in [app/api/generate/route.ts](../app/api/generate/route.ts) includes:
  - Tone descriptions (professional, friendly, creative, humorous)
  - Platform-specific guidance (Instagram, Twitter, LinkedIn, Telegram)
  - Forbidden word list (بدون نام‌های خاص)
  - Character limit reminder
- **Note**: Prompt is embedded in route handler; consider moving to shared config if reused

## Development & Build

```bash
yarn dev        # Start Next.js dev server (port 3000)
yarn build      # Next.js build
yarn start      # Start production server
yarn run clean  # Remove node_modules, yarn.lock, reinstall
```

**Docker**: Use Makefile (dev.Dockerfile, prod.Dockerfile)
```bash
make build      # Build containers
make start      # Start in detached mode
make logs       # View logs
make stop       # Stop containers
```

## Critical Implementation Details

1. **Component Import Order**: React → third-party → UI components → utilities → types (enforced in page.tsx)
2. **Error Responses**: Always return `NextResponse.json({ error: "..." })` with Persian messages
3. **Temperature**: Set to 0.7 in ChatOpenAI for balanced creativity
4. **Model**: Currently `gpt-4o`; avoid switching without testing Persian output quality
5. **No Tests/Linting**: No jest/eslint configured; use code review for validation
6. **Analytics**: Vercel Analytics + Speed Insights included in layout

## File Organization Reference

- **API routes**: [app/api/generate/route.ts](../app/api/generate/route.ts) (main), [app/api/chat/route.ts](../app/api/chat/route.ts), [app/api/langchain/route.ts](../app/api/langchain/route.ts)
- **Core utilities**: [lib/utils.ts](../lib/utils.ts), [lib/OpenAiCompletations.ts](../lib/OpenAiCompletations.ts), [lib/Langchain.ts](../lib/Langchain.ts)
- **Types**: [types/types.ts](../types/types.ts) (ServerError, GeneratedBio, VibeType, GenerateBioPayload)
