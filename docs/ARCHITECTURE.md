# BioGPT Architecture Documentation

## System Overview

BioGPT is a modern full-stack web application built with Next.js that generates AI-powered social media content. The system follows a client-server architecture with streaming responses for real-time user feedback.

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Layer                              │
├─────────────────────────────────────────────────────────────────┤
│  React Components (TypeScript)                                   │
│  ├── Header / Footer                                             │
│  ├── BioForm (Input collection)                                  │
│  ├── ToneSelector / PlatformSelector                             │
│  └── OutputPanel (Results display)                               │
│                                                                   │
│  State Management:                                               │
│  ├── React Hooks (useState, useCallback)                         │
│  ├── React Context (Theme)                                       │
│  └── react-hook-form (Form state)                                │
│                                                                   │
│  Styling:                                                        │
│  ├── Tailwind CSS (Utility classes)                              │
│  ├── CSS Variables (Theme colors)                                │
│  └── Radix UI (Accessible components)                            │
└──────────────┬──────────────────────────────────────────────────┘
               │
               │ HTTP Requests / SSE Streaming
               │
┌──────────────▼──────────────────────────────────────────────────┐
│                        Server Layer                              │
├─────────────────────────────────────────────────────────────────┤
│  Next.js API Routes                                              │
│  ├── /api/generate - Generate new content                        │
│  ├── /api/chat - Interactive chat refinement                     │
│  └── /api/langchain - LangChain integration                      │
│                                                                   │
│  Request Processing:                                             │
│  ├── Input Validation (Zod schemas)                              │
│  ├── Rate Limiting (IP-based, Redis)                             │
│  └── Request Context (IP extraction)                             │
│                                                                   │
│  LLM Integration:                                                │
│  ├── LangChain Chains                                            │
│  ├── LLM Provider Selection                                      │
│  │   ├── OpenAI (gpt-4o, gpt-5)                                  │
│  │   └── AIHUBMIX (free models)                                  │
│  └── OpenAI Stream Handler                                       │
│                                                                   │
│  Response Handling:                                              │
│  ├── Server-Sent Events (SSE)                                    │
│  └── JSON Response formatting                                    │
└──────────────┬──────────────────────────────────────────────────┘
               │
               │ API Calls
               │
┌──────────────▼──────────────────────────────────────────────────┐
│                    External Services                             │
├─────────────────────────────────────────────────────────────────┤
│  ├── OpenAI API (LLM)                                             │
│  ├── AIHUBMIX API (LLM)                                           │
│  ├── Upstash Redis (Rate limiting)                               │
│  └── Vercel Analytics (Monitoring)                               │
└─────────────────────────────────────────────────────────────────┘
```

## Directory Structure and Module Organization

### Application Root (`app/`)

The App Router directory contains all routes and layouts:

```
app/
├── api/                          # API Route Handlers
│   ├── chat/
│   │   └── route.ts              # Chat API endpoint
│   ├── generate/
│   │   └── route.ts              # Content generation endpoint
│   └── langchain/
│       └── route.ts              # LangChain integration
│
├── layout.tsx                    # Root layout with providers
├── page.tsx                      # Main application page
├── error.tsx                     # Error boundary
├── not-found.tsx                 # 404 page
├── robots.ts                     # SEO robots.txt
└── sitemap.ts                    # XML sitemap generation
```

### Components (`components/`)

Organized by feature and UI pattern:

```
components/
├── ui/                           # Shadcn/Radix UI components
│   ├── button/
│   ├── input/
│   ├── select/
│   ├── tabs/
│   └── ...other primitive UI components
│
├── theme/                        # Theme management
│   └── ThemeProvider.tsx         # Dark/Light mode provider
│
├── providers/                    # Application providers
│   └── Providers.tsx             # Composite providers (Theme, etc.)
│
├── bio-generator/               # Bio generation feature
│   └── BioForm.tsx              # Form component for bio generation
│
├── Header.tsx                   # Top navigation
├── Footer.tsx                   # Bottom footer
├── OutputPanel.tsx              # Results display
├── PlatformSelector.tsx         # Platform selection UI
└── ToneSelector.tsx             # Tone selection UI
```

### Utilities and Configuration (`lib/`)

```
lib/
├── constants/                   # Application constants
│   └── index.ts                 # Constants definitions
│
├── hooks/                       # Custom React hooks
│   └── index.ts                 # Custom hooks
│
├── Langchain.ts                 # LangChain setup
├── llm-provider.ts              # LLM provider initialization
├── OpenAIStream.ts              # OpenAI streaming handler
├── OpenAiCompletaions.ts        # OpenAI completions
├── rate-limit.ts                # Rate limiting logic
├── get-ip.ts                    # IP extraction utilities
├── theme-no-flash.ts            # Theme flash prevention
└── utils.ts                     # General utilities (cn, etc.)
```

### Styling (`styles/`)

```
styles/
└── globals.css                  # Global styles and CSS variables
```

## Data Flow Architecture

### 1. Content Generation Flow

```
User Input
    ↓
Form Validation (React Hook Form)
    ↓
Rate Limit Check (Client-side estimation)
    ↓
POST /api/generate
    ↓
Server: IP extraction and rate limit check (Redis)
    ↓
Input validation (Zod schemas)
    ↓
LLM Provider selection (OpenAI or AIHUBMIX)
    ↓
LangChain chain execution
    ↓
LLM Request (with streaming enabled)
    ↓
Stream response back to client (SSE)
    ↓
Client: Display streamed content in real-time
```

### 2. Chat Refinement Flow

```
User Message
    ↓
Form submission
    ↓
Rate limit check
    ↓
POST /api/chat
    ↓
Server: Context preservation and processing
    ↓
LangChain chain execution with conversation history
    ↓
LLM streaming response
    ↓
SSE stream back to client
    ↓
Client: Append response to chat history
```

## Key Design Decisions

### 1. Server-Side Rendering (SSR) and Streaming

**Decision**: Use Next.js App Router with server-side streaming for API responses

**Why**:
- Real-time feedback for long-running AI operations
- Better performance perception (progressive rendering)
- Reduces client JavaScript bundle size
- Better SEO for static content

**Implementation**:
- Server-Sent Events (SSE) for streaming responses
- `eventsource-parser` for client-side stream handling
- Streaming from LLM directly to client

### 2. Rate Limiting Architecture

**Decision**: Multi-layer rate limiting with Redis backend

**Why**:
- Prevent abuse and ensure fair resource usage
- Protect against malicious actors
- Cost control for API usage

**Implementation**:
```
┌─ Client-side: Cooldown (UX improvement)
├─ Server-side: IP-based rate limiting
└─ Redis: Distributed rate limit tracking
```

**Rate Limit Configuration**:
- Generation: 10 requests per hour per IP
- Chat: 30 requests per hour per IP
- Fallback to in-memory store if Redis unavailable

### 3. Multiple LLM Provider Support

**Decision**: Support multiple LLM providers (OpenAI, AIHUBMIX)

**Why**:
- Cost optimization (free models vs. premium)
- Provider flexibility and redundancy
- User choice based on requirements

**Implementation**:
```
Environment Variables
    ↓
NEXT_LLM_MODEL selection
    ↓
llm-provider.ts (Router)
    ├─ gpt-4o/gpt-5 → OpenAI SDK
    └─ Free models → AIHUBMIX API
    ↓
LangChain Chain
```

### 4. Theme Management

**Decision**: Server-side theme detection with client-side override

**Why**:
- Prevent flash of unstyled content (FOUC)
- Respect system preferences
- Allow user override

**Implementation**:
- `theme-script.tsx`: Inline script in head for theme detection
- `next-themes` library for theme state management
- CSS variables for dynamic theming

### 5. Type Safety

**Decision**: Full TypeScript strict mode with runtime validation

**Why**:
- Catch bugs at compile time
- Better IDE support and autocomplete
- Runtime validation with Zod

**Implementation**:
- `tsconfig.json` with strict mode enabled
- Zod schemas for API request validation
- Type-safe props and state

## Component Architecture

### Smart vs. Presentational Components

**Presentational Components** (UI-focused):
- Located in `components/ui/`
- No business logic
- Fully controlled via props
- Examples: Button, Input, Select

**Smart Components** (Feature-focused):
- Located in `components/`
- Handle business logic and state
- Connect to APIs
- Examples: BioForm, OutputPanel

### State Management Strategy

**Local Component State**:
```tsx
const [bio, setBio] = useState("")
const [platform, setPlatform] = useState("")
const [tone, setTone] = useState("")
```

**Theme Context**:
```tsx
import { useTheme } from "next-themes"
const { theme, setTheme } = useTheme()
```

**Form State** (react-hook-form):
```tsx
const { register, handleSubmit, watch } = useForm()
```

## API Architecture

### Request/Response Pattern

**Standard Request**:
```json
{
  "bio": "string",
  "platform": "string",
  "tone": "string",
  "keywords": ["string"]
}
```

**Streaming Response** (SSE):
```
data: {"content": "Generated text chunk..."}
data: {"content": "More generated text..."}
data: {"done": true}
```

**Error Response**:
```json
{
  "error": "Error description",
  "code": "ERROR_CODE",
  "retryAfter": 3600
}
```

## Security Architecture

### Input Validation

```
User Input
    ↓
Client-side validation (UX)
    ↓
API Request
    ↓
Server-side Zod validation (Security)
    ↓
LLM Execution
```

### Rate Limiting Security

```
Request
    ↓
IP Extraction (x-forwarded-for, x-real-ip)
    ↓
Redis lookup for IP rate limit
    ↓
Increment counter if below limit
    ↓
Return 429 if limit exceeded
```

### API Key Management

- Server-side only environment variables (not prefixed with `NEXT_PUBLIC_`)
- Separate keys for different providers
- No keys exposed to client

## Performance Optimization

### 1. Code Splitting

Next.js automatically splits code by route:
- Each API route is a separate function
- Components are lazy-loaded

### 2. Response Streaming

- Stream LLM responses directly without buffering
- User sees content appear in real-time
- Better perceived performance

### 3. Caching Strategy

- Redis for rate limit tracking
- Next.js built-in caching for static content

### 4. CSS Optimization

- Tailwind CSS with PurgeCSS
- CSS variables for theming
- No runtime style calculations

## Deployment Architecture

### Environment Separation

```
Development
├── yarn dev (Next.js dev server)
├── .env.local (local configuration)
└── Hot module replacement

Production
├── yarn build (static optimization)
├── yarn start (production server)
├── Environment variables (CI/CD)
└── Vercel deployment (recommended)
```

### Docker Architecture

```
Development:
├── dev.Dockerfile
├── Node.js with hot reload
└── Mounted volumes for code changes

Production:
├── prod.Dockerfile
├── Multi-stage build
├── Minimal runtime image
└── Environment variables injected at runtime
```

## Extension Points

### Adding New Platforms

1. Add platform to `SUPPORTED_PLATFORMS` constant
2. Create platform-specific prompt in LangChain chain
3. Update `PlatformSelector` component
4. Test generation with new platform

### Adding New Tones

1. Add tone to `SUPPORTED_TONES` constant
2. Update tone selection UI
3. Adjust prompt instructions for new tone
4. Test output quality

### Adding New LLM Providers

1. Update `llm-provider.ts` to support new provider
2. Add environment variables
3. Create provider initialization function
4. Update `NEXT_LLM_MODEL` documentation
5. Add provider-specific SDK integration if required (OpenRouter uses `@openrouter/sdk`)

### Custom Rate Limiting

Modify `lib/rate-limit.ts`:
- Adjust rate limit windows
- Implement different strategies per endpoint
- Add custom rate limiting logic

## Monitoring and Observability

### Vercel Analytics

- User behavior tracking
- Page performance metrics
- Geographic insights

### Speed Insights

- Web Vitals monitoring
- Core Web Vitals (LCP, FID, CLS)
- Performance bottleneck identification

### Error Handling

- Error boundaries (React)
- Error pages (404, 500)
- Server-side error logging

## Dependencies and Their Roles

| Dependency | Purpose | Version |
|------------|---------|---------|
| next | Framework | 14.2.35 |
| react | UI library | 18.2.0 |
| typescript | Type safety | 5.9.3 |
| tailwindcss | Styling | 3.4.17 |
| langchain | LLM orchestration | 0.2.2 |
| openai | OpenAI integration | 3.2.1 |
| axios | HTTP client | 1.4.0 |
| zod | Validation | 3.23.8 |
| react-hook-form | Form management | Latest |
| next-themes | Theme management | 0.3.0 |

## Future Architecture Improvements

1. **Caching Layer**: Implement result caching for common queries
2. **User Accounts**: Add authentication and saved bios
3. **Analytics Dashboard**: Track generation metrics
4. **Batch Processing**: Support bulk bio generation
5. **Custom Models**: Fine-tuned models for specific niches
6. **API Gateway**: External API for third-party integration
7. **Message Queue**: Background job processing with Bull/RabbitMQ
8. **Database**: Persistent storage for user data and usage metrics

---

**Last Updated**: 2026-06-11  
**Version**: 1.0.0
