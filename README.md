# BioGPT - AI-Powered Social Media Bio Generator

<div align="center">

[![English](https://img.shields.io/badge/Language-English-blue?style=flat-square)](./README.md)
[![Persian/Farsi](https://img.shields.io/badge/زبان-فارسی-green?style=flat-square)](./README_FA.md)

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18.2-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**Generate engaging, personalized social media bios, welcome messages, and improved content with AI-powered suggestions.**

[Live Demo](#) • [Documentation](#documentation) • [Contributing](#contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Configuration](#-configuration)
- [Development](#-development)
- [Deployment](#-deployment)
- [Contributing](#contributing)
- [License](#-license)

---

## Overview

BioGPT is an intelligent web application that helps users create compelling social media bios, welcome messages, and content improvements using advanced AI models. Built with modern web technologies and powered by OpenAI's GPT models and LangChain, it provides a seamless experience for content creators, marketers, and social media enthusiasts.

### Key Use Cases

- **Social Media Managers**: Generate multiple bio variations for different platforms
- **Job Seekers**: Create professional LinkedIn bios
- **Small Business Owners**: Write engaging business descriptions
- **Content Creators**: Enhance and improve existing content
- **Marketing Teams**: Bulk generate platform-specific content

---

## 🚀 Features

### Core Features

| Feature | Description |
|---------|-------------|
| **Bio Generator** | Create captivating, personalized social media bios tailored to personality and goals |
| **Welcome Message Creator** | Generate personalized welcome messages for various platforms and occasions |
| **Content Enhancer** | Improve and refine existing content with AI-driven suggestions |
| **Multi-Platform Support** | Optimize content for Twitter, Instagram, LinkedIn, TikTok, and more |
| **Tone Selection** | Choose from multiple tone options (Professional, Casual, Playful, etc.) |
| **Real-time Chat** | Interactive chat for iterative content refinement |
| **Theme Support** | Light/Dark mode with persistent user preferences |

### Technical Features

- ⚡ **Server-Side Rendering (SSR)** - Optimized performance with Next.js App Router
- 🔒 **Rate Limiting** - Built-in protection against abuse with Upstash Redis
- 🌐 **RTL Support** - Full support for Persian/Farsi and other RTL languages
- 📊 **Analytics** - Integrated with Vercel Analytics and Speed Insights
- 🎨 **Responsive Design** - Mobile-first, fully responsive UI
- ♿ **Accessibility** - WCAG compliant with Radix UI components
- 🚀 **Streaming Responses** - Real-time AI response streaming for better UX

---

## 🛠️ Tech Stack

### Frontend

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Framework** | [Next.js](https://nextjs.org/) | 14.2.35 | React metaframework with App Router |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | 5.9.3 | Type-safe development |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | 3.4.17 | Utility-first CSS framework |
| **Components** | [Radix UI](https://www.radix-ui.com/) | Latest | Unstyled, accessible component primitives |
| **Icons** | [Lucide React](https://lucide.dev/) | 0.303.0 | Beautiful SVG icons |
| **Themes** | [next-themes](https://github.com/pacocoursey/next-themes) | 0.3.0 | Dark/Light mode management |
| **Animations** | [Tailwind Animate](https://tailwindcss-animate.com/) | 1.0.7 | Smooth animations |

### Backend & AI

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **LLM Framework** | [LangChain](https://www.langchain.com/) | 0.2.2 | LLM orchestration and chain management |
| **LLM Providers** | OpenAI, AIHUBMIX | Latest | Multiple LLM providers support |
| **OpenAI** | [OpenAI SDK](https://openai.com/) | 3.2.1 | GPT models (gpt-4o, gpt-5) |
| **LangChain OpenAI** | [@langchain/openai](https://www.npmjs.com/package/@langchain/openai) | 0.0.33 | OpenAI integration for LangChain |
| **HTTP Client** | [Axios](https://axios-http.com/) | 1.4.0 | HTTP requests and API calls |
| **SSE Parser** | [eventsource-parser](https://www.npmjs.com/package/eventsource-parser) | 0.0.5 | Parse Server-Sent Events |

**Supported LLM Models:**
- **OpenAI**: gpt-4o, gpt-5
- **AIHUBMIX Free Models**: glm-4.7-flash-free, gemini-2.0-flash-free, mimo-v2-flash-free

### Data & Infrastructure

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Caching & Rate Limiting** | [Upstash Redis](https://upstash.com/) | 1.36.2 | Serverless Redis for rate limiting |
| **Validation** | [Zod](https://github.com/colinhacks/zod) | 3.23.8 | Runtime schema validation |
| **Form Handling** | [React Hook Form](https://react-hook-form.com/) | - | Performant form management |

### Analytics & Monitoring

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Analytics** | [Vercel Analytics](https://vercel.com/analytics) | 0.1.8 | User analytics and insights |
| **Performance** | [Vercel Speed Insights](https://vercel.com/speed-insights) | 1.0.11 | Web vitals monitoring |

### Development

| Tool | Version | Purpose |
|------|---------|---------|
| **Node.js** | 18+ | JavaScript runtime |
| **Package Manager** | Yarn 1.22+ | Dependency management |
| **Autoprefixer** | 10.4.12 | CSS vendor prefixes |
| **PostCSS** | 8.5.6 | CSS transformations |

---

## 📁 Project Structure

```
einbiogpt/
├── app/                           # Next.js App Router directory
│   ├── api/                       # API route handlers
│   │   ├── chat/                  # Chat endpoint for interactive refinement
│   │   ├── generate/              # Content generation endpoints
│   │   └── langchain/             # LangChain integration endpoints
│   ├── layout.tsx                 # Root layout with providers
│   ├── page.tsx                   # Main application page
│   ├── error.tsx                  # Error boundary component
│   ├── not-found.tsx              # 404 page
│   ├── robots.ts                  # SEO robots configuration
│   └── sitemap.ts                 # XML sitemap generation
│
├── components/                    # React components
│   ├── ui/                        # Shadcn/Radix UI components
│   │   ├── button/
│   │   ├── input/
│   │   ├── select/
│   │   ├── tabs/
│   │   └── ...other UI components
│   ├── theme/                     # Theme provider and utilities
│   │   └── ThemeProvider.tsx
│   ├── providers/                 # Application providers
│   │   └── Providers.tsx
│   ├── bio-generator/             # Bio generation components
│   │   └── BioForm.tsx
│   ├── Header.tsx                 # Application header
│   ├── Footer.tsx                 # Application footer
│   ├── OutputPanel.tsx            # Results display component
│   ├── PlatformSelector.tsx       # Platform selection UI
│   └── ToneSelector.tsx           # Tone selection UI
│
├── lib/                           # Utility functions and helpers
│   ├── constants/                 # Application constants
│   ├── hooks/                     # Custom React hooks
│   ├── Langchain.ts               # LangChain configuration
│   ├── OpenAIStream.ts            # Streaming response handler
│   ├── OpenAiCompletaions.ts      # OpenAI completion utilities
│   ├── llm-provider.ts            # LLM provider setup and configuration
│   ├── rate-limit.ts              # Rate limiting logic
│   ├── get-ip.ts                  # IP extraction for rate limiting
│   ├── theme-no-flash.ts          # Theme script to prevent flash
│   └── utils.ts                   # General utility functions
│
├── styles/                        # Global styles
│   └── globals.css                # Tailwind CSS and CSS variables
│
├── public/                        # Static assets
│   ├── fonts/
│   ├── images/
│   └── ...other static files
│
├── docs/                          # Additional documentation
├── .github/                       # GitHub configuration
│   └── workflows/                 # CI/CD workflows
├── next.config.js                 # Next.js configuration
├── tailwind.config.js             # Tailwind CSS configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Project dependencies
├── AGENTS.md                      # AI agent guidelines
├── LICENCE                        # MIT License
├── Makefile                       # Docker build commands
├── dev.Dockerfile                 # Development Docker image
├── prod.Dockerfile               # Production Docker image
└── docker-compose.*.yml           # Docker Compose configurations
```

### Directory Descriptions

| Directory | Purpose |
|-----------|---------|
| `app/` | Contains all routes and layouts using Next.js App Router |
| `components/` | Reusable React components organized by feature |
| `lib/` | Utility functions, hooks, and configuration |
| `styles/` | Global CSS and Tailwind CSS configuration |
| `public/` | Static assets served directly by the web server |

---

## 🔌 API Endpoints

### Bio Generation

#### `POST /api/generate`

Generate new social media bios based on user input.

**Request Body:**
```json
{
  "bio": "string (user's current bio or description)",
  "platform": "twitter | instagram | linkedin | tiktok | facebook",
  "tone": "professional | casual | playful | humorous | inspirational",
  "keywords": "string[] (optional keywords to include)"
}
```

**Response:**
```json
{
  "suggestions": [
    {
      "text": "Generated bio text",
      "platform": "twitter",
      "tone": "professional"
    }
  ],
  "timestamp": "ISO 8601 timestamp"
}
```

**Status Codes:**
- `200` - Success
- `400` - Invalid input
- `429` - Rate limit exceeded
- `500` - Server error

---

### Content Chat

#### `POST /api/chat`

Interactive chat for iterative content refinement.

**Request Body:**
```json
{
  "message": "string (user message or request)",
  "context": "object (previous conversation context)",
  "contentType": "bio | welcome | enhancement"
}
```

**Response:**
Server-Sent Events (SSE) stream with real-time responses:
```
data: {"content": "streamed response text..."}
```

**Features:**
- Real-time streaming response
- Conversation context preservation
- Support for follow-up refinements

---

### Rate Limiting

All API endpoints implement rate limiting using Upstash Redis.

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/api/generate` | 10 requests | 1 hour |
| `/api/chat` | 30 requests | 1 hour |

**Rate Limit Response (429):**
```json
{
  "error": "Too many requests",
  "retryAfter": 3600
}
```

---

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the project root with the following variables:

#### LLM Model Selection

```bash
# Choose one of: gpt-4o, gpt-5, glm-4.7-flash-free, gemini-2.0-flash-free, mimo-v2-flash-free
# or any AIHUBMIX model (default: mimo-v2-flash-free)
NEXT_LLM_MODEL=gpt-4o
```

#### OpenAI Configuration

```bash
# Required only if using gpt-4o or gpt-5 models
# Get from: https://platform.openai.com/api-keys
NEXT_OPENAI_API_KEY=sk_your_key_here
```

#### AIHUBMIX Configuration (for free models)

```bash
# Required for: glm-4.7-flash-free, gemini-2.0-flash-free, mimo-v2-flash-free
# Get from: https://aihubmix.com
AIHUBMIX_API_KEY=your_aihubmix_key_here
AIHUBMIX_API_BASE_URL=https://aihubmix.com/v1
```

#### Rate Limiting Configuration

```bash
# Upstash Redis for production rate limiting (optional - falls back to in-memory if not set)
REDIS_URL=https://...                          # Redis connection URL
REDIS_TOKEN=xxxxx                              # Redis authentication token

# Rate limiting parameters
RATE_LIMIT_WINDOW=60000                        # Window duration in milliseconds
RATE_LIMIT_MAX=10                              # Maximum requests per window per IP
```

#### Client-side Settings

```bash
# Cooldown between requests (seconds)
NEXT_PUBLIC_COOLDOWN_TIME=10
```

#### Quick Start

1. **Using GPT-4o** (requires OpenAI key):
   ```bash
   NEXT_LLM_MODEL=gpt-4o
   NEXT_OPENAI_API_KEY=sk_...
   ```

2. **Using free models** (requires AIHUBMIX key):
   ```bash
   NEXT_LLM_MODEL=glm-4.7-flash-free
   AIHUBMIX_API_KEY=...
   ```

For detailed setup instructions, see `docs/ENV_VARIABLES.md`

### Tailwind Configuration

The project uses Tailwind CSS with custom CSS variables for theming:

```css
/* Light theme (default) */
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.6%;
  /* ... other color variables */
}

/* Dark theme */
@media (prefers-color-scheme: dark) {
  :root {
    --background: 0 0% 3.6%;
    --foreground: 0 0% 98%;
    /* ... other color variables */
  }
}
```

### RTL Support

The application supports RTL (Right-to-Left) languages:

```tsx
<html dir="rtl" lang="fa">
  {/* content */}
</html>
```

To disable RTL, remove the `dir="rtl"` attribute from the root layout.

---

## 🚀 Quick Start

### Prerequisites

- **Node.js**: 18 or higher
- **Package Manager**: Yarn 1.22+ or npm 9+
- **OpenAI Account**: With API access and credits
- **Upstash Account**: (Optional, for rate limiting in production)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ehsaghaffar/einbiogpt.git
   cd einbiogpt
   ```

2. **Install dependencies:**
   ```bash
   yarn install
   # or
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API keys
   ```

4. **Start the development server:**
   ```bash
   yarn dev
   # or
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 👨‍💻 Development

### Available Commands

| Command | Description |
|---------|-------------|
| `yarn dev` | Start development server on port 3000 |
| `yarn build` | Build for production |
| `yarn start` | Start production server |
| `yarn run clean` | Remove dependencies and reinstall |

### Development Workflow

1. **Start the development server:**
   ```bash
   yarn dev
   ```

2. **Make changes** to components, styles, or API routes

3. **Hot reload** automatically applies changes (no restart needed)

4. **Test your changes** in the browser at `http://localhost:3000`

### Code Style

The project follows these conventions:

- **Components**: PascalCase file names (e.g., `BioGenerator.tsx`)
- **Utilities**: camelCase file names (e.g., `utils.ts`)
- **Imports**: Organized in groups (React → third-party → internal → types)
- **Styling**: Tailwind CSS utility classes + `cn()` for conditionals
- **TypeScript**: Strict mode enabled, full type coverage expected

**See `AGENTS.md` for detailed coding guidelines.**

### Key Technologies

- **App Router**: Next.js 14 App Router for file-based routing
- **Server Actions**: Use for form submissions and data mutations
- **TypeScript**: Full type safety throughout the codebase
- **Tailwind CSS**: Utility-first styling approach

---

## 🐳 Docker

### Development with Docker

Build and run using Docker Compose:

```bash
# Build Docker image
make build

# Start containers
make start

# View logs
make logs

# Stop containers
make stop
```

Or use Docker Compose directly:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

### Production Deployment

Build the production Docker image:

```bash
docker build -f prod.Dockerfile -t biogpt-prod .
docker run -p 3000:3000 \
  -e OPENAI_API_KEY=sk_xxx \
  -e UPSTASH_REDIS_REST_URL=https://... \
  -e UPSTASH_REDIS_REST_TOKEN=xxxxx \
  biogpt-prod
```

---

## 🌐 Deployment

### Prerequisites for Deployment

- OpenAI API key with sufficient credits
- Upstash Redis URL and token (for production rate limiting)
- Deployment platform account (Vercel, Netlify, Railway, etc.)

### Vercel Deployment (Recommended)

1. **Push to GitHub:**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to [https://vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in project settings

3. **Deploy:**
   ```bash
   vercel
   ```

**Environment Variables in Vercel:**
- `OPENAI_API_KEY`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `NEXT_PUBLIC_APP_URL`

### Other Deployment Options

#### Railway
1. Connect GitHub repository
2. Add environment variables
3. Deploy

#### Docker/Self-Hosted
1. Build Docker image: `docker build -f prod.Dockerfile -t biogpt-prod .`
2. Run container with environment variables
3. Use reverse proxy (nginx) for production setup

#### Performance Optimization

- Vercel Analytics enabled for monitoring
- Speed Insights integrated for Web Vitals tracking
- Image optimization with Next.js
- CSS minification via Tailwind
- Code splitting for optimal bundle size

---

## 📊 Performance Considerations

### Optimization Strategies

1. **API Response Streaming**: Uses Server-Sent Events (SSE) for real-time streaming
2. **Rate Limiting**: Prevents abuse and ensures fair resource usage
3. **Caching**: Redis integration for efficient data caching
4. **Code Splitting**: Next.js automatic code splitting
5. **Image Optimization**: Tailwind CSS and optimized assets

### Monitoring

- **Vercel Analytics**: Track user behavior and engagement
- **Speed Insights**: Monitor Core Web Vitals
- **Error Tracking**: Built-in error boundaries and error pages

---

## 🔐 Security Features

- **API Key Protection**: Environment variable isolation
- **Rate Limiting**: Upstash Redis-based protection
- **CORS Configuration**: Restrictive CORS policies
- **Input Validation**: Zod schema validation
- **XSS Prevention**: React's built-in escaping
- **Type Safety**: TypeScript strict mode

---

## Contributing

Contributions are welcome! Please follow these guidelines:

### Getting Started

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit with clear messages: `git commit -m 'feat: add amazing feature'`
6. Push to your fork: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Development Guidelines

- Follow the code style in `AGENTS.md`
- Write TypeScript with strict type checking
- Use Tailwind CSS for styling
- Test changes locally before submitting PR
- Update documentation as needed
- Keep commits atomic and descriptive

### PR Requirements

- Clear description of changes
- Related issue numbers (if applicable)
- Screenshots for UI changes
- Tests for new features (if applicable)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENCE](./LICENCE) file for details.

---

## 👤 Author

**Ehsan Ghaffar**
- GitHub: [@ehsaghaffar](https://github.com/ehsaghaffar)
- Email: [contact information]

---

## 🔗 Resources & Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs/api-reference)
- [LangChain Documentation](https://js.langchain.com/)
- [Radix UI Documentation](https://www.radix-ui.com/docs/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

## 🐛 Troubleshooting

### Common Issues

**Issue: "API key not found"**
- Solution: Ensure `.env.local` contains `OPENAI_API_KEY`
- Verify the key is valid and has available credits

**Issue: "Rate limit exceeded"**
- Solution: Wait for the cooldown period or upgrade your Redis plan
- Check `UPSTASH_REDIS_REST_URL` configuration

**Issue: "Port 3000 already in use"**
- Solution: `yarn dev --p 3001` (use different port)
- Or kill process: `lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9`

**Issue: "Styling not applied"**
- Solution: Rebuild Tailwind CSS cache: `rm -rf .next && yarn dev`
- Ensure CSS is imported in root layout

### Getting Help

1. Check the [Issues](https://github.com/ehsaghaffar/einbiogpt/issues) page
2. Review existing documentation
3. Create a detailed bug report with reproduction steps

---

## 📈 Roadmap

Future enhancements planned:

- [ ] Multi-language support for content generation
- [ ] User authentication and saved bios
- [ ] Batch processing for multiple bios
- [ ] Custom tone options
- [ ] Browser extension
- [ ] Mobile app
- [ ] API for third-party integration
- [ ] Analytics dashboard

---

## 📝 Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history and updates.

---

## 🙏 Acknowledgments

- OpenAI for GPT models
- LangChain for LLM orchestration
- Vercel for hosting and analytics
- Radix UI for accessible components
- Tailwind CSS for utility-first styling

---

<div align="center">

[⬆ Back to Top](#biogpt---ai-powered-social-media-bio-generator)

</div>
