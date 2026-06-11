# BioGPT API Documentation

## Overview

BioGPT provides a set of REST APIs for generating social media content and interactive refinement. All endpoints support real-time streaming responses and implement rate limiting for fair usage.

## Base URL

```
http://localhost:3000/api          (Development)
https://your-domain.com/api        (Production)
```

## Authentication

Currently, the API does not require authentication. Rate limiting is applied on a per-IP basis.

**Future**: API key-based authentication will be implemented for custom integrations.

## Rate Limiting

### Rate Limit Headers

All responses include rate limit information:

```
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 9
X-RateLimit-Reset: 1623456789
```

### Limits by Endpoint

| Endpoint | Limit | Window |
|----------|-------|--------|
| `POST /api/generate` | 10 requests | 1 hour |
| `POST /api/chat` | 30 requests | 1 hour |

### Rate Limit Exceeded Response

**Status**: `429 Too Many Requests`

```json
{
  "error": "Too many requests",
  "message": "Rate limit exceeded. Please try again later.",
  "retryAfter": 3600,
  "resetTime": "2026-06-11T17:30:00Z"
}
```

## Endpoints

---

## 1. Generate Content

Generate new social media bios, welcome messages, or enhanced content.

### Endpoint

```
POST /api/generate
```

### Content Types

Supported content generation types:
- `bio` - Social media bios
- `welcome` - Welcome messages
- `enhancement` - Content enhancement

### Request

#### Headers

```
Content-Type: application/json
```

#### Body

```json
{
  "contentType": "bio|welcome|enhancement",
  "bio": "string (optional, user's current bio or content)",
  "platform": "twitter|instagram|linkedin|tiktok|facebook|youtube|snapchat",
  "tone": "professional|casual|playful|humorous|inspirational|formal|conversational",
  "keywords": ["string"] (optional),
  "additionalContext": "string (optional, any other relevant information)"
}
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `contentType` | string | Yes | Type of content to generate |
| `bio` | string | No | Current bio or content to enhance |
| `platform` | string | Yes | Target social media platform |
| `tone` | string | Yes | Desired tone of the content |
| `keywords` | array | No | Keywords to incorporate |
| `additionalContext` | string | No | Extra information for generation |

### Response

#### Success Response (200 OK)

Server-Sent Events (SSE) stream:

```
data: {"type":"start","contentType":"bio","platform":"twitter"}
data: {"type":"content","text":"Your generated bio text...","chunk":true}
data: {"type":"content","text":" with more content...","chunk":true}
data: {"type":"complete","usage":{"promptTokens":50,"completionTokens":100,"totalTokens":150}}
data: {"type":"done"}
```

#### Error Response (400 Bad Request)

```json
{
  "error": "Invalid request",
  "message": "Platform 'invalid' is not supported",
  "supportedPlatforms": ["twitter", "instagram", "linkedin", "tiktok", "facebook"]
}
```

#### Rate Limited Response (429)

```json
{
  "error": "Too many requests",
  "message": "Rate limit exceeded",
  "retryAfter": 3600,
  "resetTime": "2026-06-11T17:30:00Z"
}
```

#### Server Error Response (500)

```json
{
  "error": "Internal server error",
  "message": "Failed to generate content",
  "requestId": "req_12345"
}
```

### Examples

#### Generate a Professional LinkedIn Bio

```bash
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "contentType": "bio",
    "platform": "linkedin",
    "tone": "professional",
    "bio": "Software engineer with 5 years of experience",
    "keywords": ["TypeScript", "React", "leadership"]
  }'
```

#### Generate a Playful Twitter Bio

```bash
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "contentType": "bio",
    "platform": "twitter",
    "tone": "playful",
    "bio": "I like coding and coffee",
    "additionalContext": "I'm a indie developer who loves building tools"
  }'
```

#### Enhance Existing Content

```bash
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "contentType": "enhancement",
    "bio": "We are a marketing agency that helps businesses grow",
    "tone": "professional",
    "keywords": ["growth", "strategy", "results"]
  }'
```

### Stream Handling (JavaScript/TypeScript)

```typescript
async function generateBio(params) {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const text = decoder.decode(value);
    const lines = text.split('\n');

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = JSON.parse(line.slice(6));
        
        if (data.type === 'content') {
          console.log(data.text); // Streamed content chunk
        } else if (data.type === 'complete') {
          console.log('Generation complete:', data.usage);
        }
      }
    }
  }
}
```

---

## 2. Chat Refinement

Interactively refine generated content through a chat interface.

### Endpoint

```
POST /api/chat
```

### Request

#### Headers

```
Content-Type: application/json
```

#### Body

```json
{
  "message": "string (user message or refinement request)",
  "contentType": "bio|welcome|enhancement",
  "context": {
    "previousContent": "string (the generated content being refined)",
    "platform": "string (target platform)",
    "tone": "string (desired tone)",
    "conversationHistory": [
      {
        "role": "user|assistant",
        "content": "string"
      }
    ]
  }
}
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `message` | string | Yes | User's refinement request or question |
| `contentType` | string | Yes | Type of content being refined |
| `context.previousContent` | string | No | Original generated content |
| `context.platform` | string | No | Target platform |
| `context.tone` | string | No | Desired tone |
| `context.conversationHistory` | array | No | Previous chat messages |

### Response

#### Success Response (200 OK)

Server-Sent Events stream:

```
data: {"type":"start","contentType":"bio"}
data: {"type":"content","text":"Refined content here...","chunk":true}
data: {"type":"content","text":" continuing the refined content...","chunk":true}
data: {"type":"complete","usage":{"promptTokens":120,"completionTokens":80}}
data: {"type":"done"}
```

#### Error Response (400 Bad Request)

```json
{
  "error": "Invalid request",
  "message": "Missing required context parameter: previousContent"
}
```

### Examples

#### Make Content More Professional

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Make this more formal and professional",
    "contentType": "bio",
    "context": {
      "previousContent": "I code, I debug, I coffee",
      "platform": "linkedin",
      "tone": "professional"
    }
  }'
```

#### Refine with Follow-up Requests

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Can you add a call-to-action to the end?",
    "contentType": "bio",
    "context": {
      "previousContent": "Experienced software engineer specializing in full-stack development",
      "platform": "twitter",
      "conversationHistory": [
        {
          "role": "user",
          "content": "Make this sound more impactful"
        },
        {
          "role": "assistant",
          "content": "Full-stack engineer transforming ideas into impactful digital solutions"
        }
      ]
    }
  }'
```

### Stream Handling (JavaScript)

```typescript
async function refineContent(params) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let refinedContent = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const text = decoder.decode(value);
    const lines = text.split('\n');

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = JSON.parse(line.slice(6));
        
        if (data.type === 'content') {
          refinedContent += data.text;
          updateUIWithContent(refinedContent);
        } else if (data.type === 'complete') {
          console.log('Refinement complete');
        }
      }
    }
  }
}
```

---

## 3. Platform and Tone References

### Supported Platforms

```json
{
  "platforms": [
    "twitter",
    "instagram",
    "linkedin",
    "tiktok",
    "facebook",
    "youtube",
    "snapchat",
    "pinterest",
    "threads",
    "bluesky"
  ]
}
```

### Supported Tones

```json
{
  "tones": [
    "professional",
    "casual",
    "playful",
    "humorous",
    "inspirational",
    "formal",
    "conversational",
    "authoritative",
    "friendly",
    "motivational"
  ]
}
```

---

## Error Handling

### Common Error Codes

| Code | Status | Description |
|------|--------|-------------|
| `INVALID_INPUT` | 400 | Validation error in request |
| `UNSUPPORTED_PLATFORM` | 400 | Platform not in supported list |
| `UNSUPPORTED_TONE` | 400 | Tone not in supported list |
| `RATE_LIMITED` | 429 | Rate limit exceeded |
| `INVALID_CONTENT_TYPE` | 400 | Content type not supported |
| `LLM_ERROR` | 503 | LLM provider error |
| `SERVER_ERROR` | 500 | Internal server error |

### Error Response Format

```json
{
  "error": "ERROR_CODE",
  "message": "Human-readable error message",
  "details": {
    "field": "The problematic field",
    "value": "The provided value",
    "allowed": ["valid", "values"]
  },
  "requestId": "req_12345"
}
```

---

## Rate Limiting Details

### Rate Limit Strategy

Rate limiting is applied per IP address with a sliding window algorithm:

1. **IP Extraction**: The server extracts the client IP from:
   - `x-forwarded-for` header (load balanced)
   - `x-real-ip` header (proxy)
   - `connection.remoteAddress` (direct)

2. **Rate Limit Check**: On each request:
   - Increment request counter for the IP
   - Check if counter exceeds limit for the time window
   - Return 429 if limit exceeded

3. **Redis Storage** (production):
   - Rate limit data stored in Upstash Redis
   - TTL set to window duration
   - Automatically cleaned up after expiration

4. **Fallback**: If Redis unavailable:
   - Falls back to in-memory rate limiting
   - Applies to current process only

### Rate Limit Headers

```
X-RateLimit-Limit: 10              # Maximum requests
X-RateLimit-Remaining: 8           # Requests remaining
X-RateLimit-Reset: 1686840600      # Unix timestamp when limit resets
```

---

## Streaming Responses

### Server-Sent Events Format

All streaming responses use SSE with JSON payloads:

```
data: {"type":"start",...}
data: {"type":"content",...}
data: {"type":"complete",...}
data: {"type":"done"}
```

### Event Types

| Type | Description | Payload |
|------|-------------|---------|
| `start` | Generation started | `contentType`, `platform` |
| `content` | Text chunk streamed | `text`, `chunk` |
| `complete` | Generation complete | `usage` (token counts) |
| `done` | Stream finished | - |
| `error` | Stream error | `error`, `message` |

### Client-Side Parsing

```typescript
const parseSSE = (text: string): any[] => {
  return text
    .split('\n')
    .filter(line => line.startsWith('data: '))
    .map(line => JSON.parse(line.slice(6)));
};
```

---

## Token Usage and Quotas

### Response Token Information

Each generation returns token usage in the `complete` event:

```json
{
  "type": "complete",
  "usage": {
    "promptTokens": 150,
    "completionTokens": 200,
    "totalTokens": 350
  }
}
```

### Token Estimation

- Average bio: 300-400 tokens
- Average welcome message: 400-500 tokens
- Average enhancement: 200-300 tokens

---

## Best Practices

### 1. Error Handling

```typescript
try {
  const response = await fetch('/api/generate', {
    method: 'POST',
    body: JSON.stringify(params)
  });

  if (!response.ok) {
    if (response.status === 429) {
      // Handle rate limiting
    } else {
      // Handle other errors
    }
  }

  // Process stream...
} catch (error) {
  console.error('API Error:', error);
}
```

### 2. Rate Limit Handling

```typescript
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function generateWithRetry(params, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await generateBio(params);
    } catch (error) {
      if (error.status === 429) {
        const retryAfter = error.retryAfter || Math.pow(2, i) * 1000;
        await delay(retryAfter);
      } else {
        throw error;
      }
    }
  }
}
```

### 3. Stream Timeout Handling

```typescript
const streamWithTimeout = (response, timeout = 30000) => {
  return Promise.race([
    response.body,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Stream timeout')), timeout)
    )
  ]);
};
```

---

## Testing

### Using cURL

```bash
# Test generation
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"contentType":"bio","platform":"twitter","tone":"casual","bio":"Developer"}'

# Test chat
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Make it longer","contentType":"bio","context":{"previousContent":"A developer"}}'
```

### Automated Testing

```bash
# Using Node.js with fetch
node -e "
fetch('http://localhost:3000/api/generate', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({contentType:'bio',platform:'twitter',tone:'professional',bio:'Engineer'})
}).then(r => r.text()).then(console.log)
"
```

---

## Changelog

### Version 1.0.0 (2026-06-11)

- Initial API release
- Support for bio generation
- Chat refinement endpoint
- Rate limiting with Redis backend
- Multiple LLM provider support
- Server-Sent Events streaming

---

**Last Updated**: 2026-06-11  
**API Version**: 1.0.0
