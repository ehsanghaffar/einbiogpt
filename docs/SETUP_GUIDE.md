# BioGPT Setup Guide

This guide walks you through setting up BioGPT locally and deploying to production.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Environment Configuration](#environment-configuration)
4. [Running the Application](#running-the-application)
5. [Docker Setup](#docker-setup)
6. [Production Deployment](#production-deployment)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### System Requirements

- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher (or Yarn 1.22+)
- **Git**: For version control
- **RAM**: Minimum 4GB
- **Storage**: At least 2GB free space

### Verify Installation

```bash
# Check Node.js version
node --version
# Expected output: v18.x.x or higher

# Check npm version
npm --version
# Expected output: 9.x.x or higher

# Check Git version
git --version
# Expected output: git version 2.x.x
```

### Required Accounts

1. **OpenAI Account** (for GPT models)
   - Sign up at https://platform.openai.com
   - Create an API key
   - Add billing information and credits

2. **OpenRouter Account** (Optional, for free/community models)
   - Sign up at https://openrouter.ai
   - Get API key for free models

3. **Google AI Studio Account** (Optional, for Gemini models)
   - Sign up at https://aistudio.google.com
   - Get API key from https://aistudio.google.com/apikey

4. **Upstash Account** (For production rate limiting)
   - Sign up at https://upstash.com
   - Create a Redis database
   - Get REST URL and token

---

## Local Development Setup

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/ehsaghaffar/einbiogpt.git
cd einbiogpt

# Or if forked, clone your fork
git clone https://github.com/YOUR_USERNAME/einbiogpt.git
cd einbiogpt
```

### Step 2: Install Dependencies

Using Yarn (recommended):

```bash
# Install Yarn if not already installed
npm install -g yarn

# Install project dependencies
yarn install
```

Or using npm:

```bash
npm install
```

### Step 3: Create Environment File

```bash
# Copy the example environment file
cp .env.example .env.local

# Edit the file with your preferred editor
nano .env.local
# or
code .env.local
# or
vi .env.local
```

---

## Environment Configuration

### Option 1: Using GPT-4o (OpenAI)

**Best for**: Production use, best quality

#### 1. Get OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Copy the key (you won't see it again)

#### 2. Add Credits to OpenAI

1. Go to https://platform.openai.com/account/billing/overview
2. Click "Set up paid account"
3. Add payment method and set usage limits

#### 3. Configure `.env.local`

```bash
NEXT_LLM_MODEL=gpt-4o
NEXT_OPENAI_API_KEY=sk_live_your_key_here
```

### Option 2: Using OpenRouter Models

**Best for**: Any OpenRouter model slug, dynamic model selection, and broad provider support.

#### 1. Get OpenRouter API Key

1. Go to https://openrouter.ai
2. Sign up or log in
3. Create an API key
4. Copy your API key

#### 2. Configure `.env.local`

```bash
NEXT_LLM_MODEL=meta-llama/llama-3.3-70b-instruct:free
NEXT_LLM_PROVIDER=openrouter
OPENROUTER_API_KEY=your_openrouter_key_here
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
OPENROUTER_DEFAULT_MODEL=meta-llama/llama-3.3-70b-instruct:free
OPENROUTER_HTTP_REFERER=https://your-site.example
OPENROUTER_APP_NAME=BioGPT
```

### Complete `.env.local` Example

```bash
# ============================================
# LLM Model Selection
# ============================================
# Options: gpt-4o, gpt-5 (OpenAI)
#          gemini-2.0-flash, gemini-2.5-flash, gemini-3.7-flash (Google)
#          Any OpenRouter model slug (free/community models)
NEXT_LLM_MODEL=gpt-4o

# ============================================
# OpenAI Configuration (if using GPT models)
# ============================================
NEXT_OPENAI_API_KEY=sk_live_your_key_here

# ============================================
# OpenRouter Configuration (if using OpenRouter models)
# ============================================
OPENROUTER_API_KEY=your_openrouter_key_here
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
OPENROUTER_DEFAULT_MODEL=meta-llama/llama-3.3-70b-instruct:free
OPENROUTER_HTTP_REFERER=https://your-site.example
OPENROUTER_APP_NAME=BioGPT

# ============================================
# Gemini Configuration (if using Gemini models)
# ============================================
GEMINI_API_KEY=your_gemini_key_here
# GEMINI_API_BASE_URL=https://generativelanguage.googleapis.com/v1beta
# GEMINI_DEFAULT_MODEL=gemini-2.0-flash

# ============================================
# Rate Limiting (Optional)
# ============================================
# For production, set up Upstash Redis
REDIS_URL=https://your-redis-url.upstash.io
REDIS_TOKEN=your_redis_token

# Rate limiting parameters
RATE_LIMIT_WINDOW=60000
RATE_LIMIT_MAX=10

# ============================================
# Client-side Settings
# ============================================
NEXT_PUBLIC_COOLDOWN_TIME=10

# ============================================
# Node Environment
# ============================================
NODE_ENV=development
```

### Important Notes

- ⚠️ **Never commit `.env.local`** to Git
- ✅ `.env.local` is already in `.gitignore`
- 🔐 Treat API keys like passwords
- 🚫 Don't share keys in messages, screenshots, or commits

---

## Running the Application

### Development Server

```bash
# Start the development server
yarn dev

# Server will be available at http://localhost:3000
```

The development server includes:
- Hot Module Replacement (HMR) - Changes apply instantly
- File watching - Automatic recompilation
- Detailed error messages - Helpful debugging info

### Access the Application

1. Open your browser
2. Navigate to http://localhost:3000
3. You should see the BioGPT interface

### Common Development Tasks

```bash
# View logs
yarn dev --log

# Use a different port
yarn dev -p 3001

# Build for production
yarn build

# Start production server
yarn start

# Clean dependencies and reinstall
yarn run clean
```

---

## Docker Setup

### Development with Docker

#### Prerequisites

- Docker installed (https://docs.docker.com/get-docker/)
- Docker Compose installed (usually included with Docker Desktop)

#### Build and Run

```bash
# Build the Docker image
make build

# Start containers in background
make start

# View logs
make logs

# Stop containers
make stop

# Remove containers
make down
```

Or use Docker Compose directly:

```bash
# Build and start
docker-compose -f docker-compose.dev.yml up --build

# Stop
docker-compose -f docker-compose.dev.yml down
```

#### Docker Development Benefits

- Consistent environment across machines
- No local Node.js installation needed
- Easy to switch between projects
- Production-like environment

### Production Docker Image

#### Build Production Image

```bash
docker build -f prod.Dockerfile -t biogpt-prod:latest .
```

#### Run Production Container

```bash
docker run -p 3000:3000 \
  -e NEXT_LLM_MODEL=gpt-4o \
  -e NEXT_OPENAI_API_KEY=sk_xxx \
  -e REDIS_URL=https://... \
  -e REDIS_TOKEN=xxx \
  biogpt-prod:latest
```

#### Docker Compose Production

```bash
docker-compose -f docker-compose.prod.yml up -d
```

---

## Production Deployment

### Deployment Options

#### Option 1: Vercel (Recommended)

**Advantages**:
- Easiest setup
- Automatic deployments from Git
- Built-in analytics and monitoring
- CDN included
- Free tier available

**Steps**:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Select the repository

3. **Configure Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add all required variables:
     - `NEXT_LLM_MODEL`
     - `NEXT_OPENAI_API_KEY` (or OpenRouter keys)
     - `REDIS_URL` (optional)
     - `REDIS_TOKEN` (optional)

4. **Deploy**
   ```bash
   # Vercel auto-deploys on push
   git push origin main
   
   # Or deploy manually
   vercel
   ```

5. **Verify Deployment**
   - Check deployment status in Vercel dashboard
   - Visit your app URL
   - Test the generation endpoints

#### Option 2: Self-Hosted (Railway, Fly.io, etc.)

##### Railway Deployment

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Add Environment Variables**
   - In Railway, go to Variables
   - Add all required environment variables

4. **Deploy**
   - Railway auto-deploys on push to main

#### Option 3: Docker on Server

##### Deploy to Self-Managed Server

```bash
# SSH into your server
ssh user@your-server.com

# Clone repository
git clone https://github.com/your-username/einbiogpt.git
cd einbiogpt

# Create environment file
nano .env.local
# Add your environment variables

# Build Docker image
docker build -f prod.Dockerfile -t biogpt-prod .

# Run container
docker run -d \
  -p 80:3000 \
  --name biogpt \
  --env-file .env.local \
  biogpt-prod

# Check status
docker ps
docker logs biogpt
```

### Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Environment variables are NOT in version control
- [ ] API keys are valid and have sufficient credits
- [ ] Redis connection tested (if using rate limiting)
- [ ] Application builds without errors: `yarn build`
- [ ] Application starts successfully: `yarn start`
- [ ] Tested key features locally:
  - [ ] Generate bio
  - [ ] Chat refinement
  - [ ] Multiple platforms
  - [ ] Different tones

### Post-Deployment Testing

```bash
# Test the deployed application
curl https://your-app.vercel.app/api/generate \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "contentType":"bio",
    "platform":"twitter",
    "tone":"professional",
    "bio":"Test"
  }'
```

### Production Environment Variables

```bash
# Set these in your deployment platform
NEXT_LLM_MODEL=gpt-4o
NEXT_OPENAI_API_KEY=sk_live_xxx
REDIS_URL=https://your-redis.upstash.io
REDIS_TOKEN=xxx
RATE_LIMIT_WINDOW=3600000      # 1 hour in milliseconds
RATE_LIMIT_MAX=100              # Adjust based on needs
NODE_ENV=production
```

### Monitoring Production

#### Vercel Analytics

1. Enable in Vercel Dashboard
2. View metrics at https://vercel.com/analytics
3. Monitor:
   - Page load times
   - User engagement
   - Geographic distribution

#### Application Health Checks

```bash
# Check if application is responding
curl https://your-app.com/

# Check for errors
curl https://your-app.com/api/health

# Monitor in real-time
watch curl https://your-app.com/
```

---

## Troubleshooting

### Common Issues and Solutions

#### Issue: "API key not found"

**Error Message**:
```
Error: NEXT_OPENAI_API_KEY is not set
```

**Solution**:
1. Check `.env.local` exists
2. Verify API key is set: `echo $NEXT_OPENAI_API_KEY`
3. Restart the development server
4. Make sure the key is valid at https://platform.openai.com/api-keys

#### Issue: "Port 3000 already in use"

**Error Message**:
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution 1** - Use different port:
```bash
yarn dev -p 3001
```

**Solution 2** - Kill process using port 3000:
```bash
# On macOS/Linux
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

#### Issue: "Styling not applied (Tailwind CSS not working)"

**Solution**:
```bash
# Rebuild Tailwind CSS cache
rm -rf .next
yarn dev
```

#### Issue: "Rate limit exceeded immediately"

**Error**:
```
429 Too Many Requests: Rate limit exceeded
```

**Solution 1** - Check rate limit configuration:
```bash
# Check .env.local for rate limit settings
cat .env.local | grep RATE_LIMIT
```

**Solution 2** - In development, disable rate limiting:
```bash
# Edit lib/rate-limit.ts and comment out the check
```

**Solution 3** - Wait for rate limit window to reset:
- Check `X-RateLimit-Reset` header for timestamp

#### Issue: "Module not found" or "Cannot find module"

**Solution**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules yarn.lock
yarn install

# Or use the clean script
yarn run clean
```

#### Issue: "TypeScript errors in IDE"

**Solution**:
```bash
# Rebuild TypeScript
yarn build

# Check tsconfig.json is valid
cat tsconfig.json

# Restart IDE/editor
```

#### Issue: "Deployment fails on Vercel"

**Steps to debug**:
1. Check build logs in Vercel dashboard
2. Verify environment variables are set
3. Ensure `.env.local` is NOT in Git
4. Test locally: `yarn build && yarn start`

**Common causes**:
- Missing environment variables
- Incompatible Node.js version
- Typo in variable names

### Getting Additional Help

1. **Check logs**:
   ```bash
   # Development server logs
   yarn dev

   # Docker logs
   docker logs <container-id>

   # Production (check platform-specific logs)
   ```

2. **Review documentation**:
   - [README.md](./README.md) - Project overview
   - [ARCHITECTURE.md](./ARCHITECTURE.md) - System design
   - [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - API reference
   - [AGENTS.md](./AGENTS.md) - Coding guidelines

3. **Create an issue on GitHub**:
   - Describe the problem
   - Include error message
   - List your environment (Node version, OS, etc.)
   - Include reproduction steps

4. **Check existing issues**:
   - https://github.com/ehsaghaffar/einbiogpt/issues

---

## Next Steps

After successful setup:

1. **Explore the interface**
   - Try generating bios for different platforms
   - Test different tones
   - Refine content using chat

2. **Review the code**
   - Check `app/page.tsx` for main component
   - Review API routes in `app/api/`
   - Study `lib/` utilities

3. **Customize the application**
   - Add new platforms
   - Create custom tones
   - Modify styling with Tailwind CSS

4. **Deploy your instance**
   - Follow deployment section
   - Monitor performance
   - Gather user feedback

---

## Additional Resources

### Official Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### API Documentation

- [OpenAI API Docs](https://platform.openai.com/docs/api-reference)
- [LangChain Documentation](https://js.langchain.com/)
- [Upstash Redis Docs](https://upstash.com/docs/redis/overall/getstarted)

### Community

- [GitHub Discussions](https://github.com/ehsaghaffar/einbiogpt/discussions)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/nextjs)
- [OpenAI Community](https://community.openai.com)

---

**Last Updated**: 2026-06-11  
**Version**: 1.0.0
