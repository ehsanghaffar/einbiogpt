import { Redis } from "@upstash/redis";
import { getUserIp } from "./get-ip";

const REDIS_URL = process.env.REDIS_URL;
const REDIS_TOKEN = process.env.REDIS_TOKEN;
const RATE_LIMIT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW || "60000", 10);
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX || "10", 10);

let redis: Redis | null = null;
let useRedis = false;

if (REDIS_URL && REDIS_TOKEN) {
  try {
    redis = new Redis({
      url: REDIS_URL,
      token: REDIS_TOKEN,
    });
    useRedis = true;
    console.log("Using Upstash Redis for rate limiting");
  } catch (error) {
    console.error("Failed to initialize Redis:", error);
  }
} else {
  console.log("REDIS_URL/REDIS_TOKEN not set, using in-memory rate limiting");
}

interface Tracker {
  count: number;
  expiresAt: number;
}

const memoryStore: Record<string, Tracker> = {};

function pruneMemoryStore() {
  const now = Date.now();
  Object.keys(memoryStore).forEach((key) => {
    if (memoryStore[key].expiresAt < now) {
      delete memoryStore[key];
    }
  });
}

if (!useRedis) {
  setInterval(pruneMemoryStore, 60000);
}

export class RateLimitError extends Error {
  constructor(message = "Rate limit exceeded") {
    super(message);
    this.name = "RateLimitError";
  }
}

export async function checkRateLimit(key: string): Promise<boolean> {
  if (useRedis && redis) {
    return checkRedisRateLimit(key);
  }
  return checkMemoryRateLimit(key);
}

async function checkRedisRateLimit(key: string): Promise<boolean> {
  if (!redis) return false;

  const redisKey = `ratelimit:${key}`;

  try {
    const current = await redis.get<number>(redisKey);

    if (!current) {
      await redis.setex(redisKey, Math.ceil(RATE_LIMIT_WINDOW / 1000), 1);
      return true;
    }

    if (current >= RATE_LIMIT_MAX) {
      return false;
    }

    await redis.incr(redisKey);
    return true;
  } catch (error) {
    console.error("Redis rate limit error:", error);
    return checkMemoryRateLimit(key);
  }
}

function checkMemoryRateLimit(key: string): boolean {
  const now = Date.now();
  const tracker = memoryStore[key];

  if (!tracker || tracker.expiresAt < now) {
    memoryStore[key] = { count: 1, expiresAt: now + RATE_LIMIT_WINDOW };
    return true;
  }

  if (tracker.count >= RATE_LIMIT_MAX) {
    return false;
  }

  tracker.count++;
  return true;
}

export async function rateLimitByIp(request: Request): Promise<void> {
  const ip = getUserIp(request) || "unknown";
  const allowed = await checkRateLimit(ip);

  if (!allowed) {
    throw new RateLimitError("تعداد درخواست‌های شما بیش از حد مجاز است. لطفاً بعداً تلاش کنید.");
  }
}

export async function getRateLimitInfo(key: string): Promise<{
  remaining: number;
  resetAt: number;
}> {
  if (useRedis && redis) {
    const redisKey = `ratelimit:${key}`;
    try {
      const current = await redis.get<number>(redisKey);
      const ttl = await redis.ttl(redisKey);
      const count = current || 0;
      return {
        remaining: Math.max(0, RATE_LIMIT_MAX - count),
        resetAt: Date.now() + (ttl > 0 ? ttl * 1000 : RATE_LIMIT_WINDOW),
      };
    } catch {
      return { remaining: RATE_LIMIT_MAX, resetAt: Date.now() + RATE_LIMIT_WINDOW };
    }
  }

  const tracker = memoryStore[key];
  if (!tracker) {
    return { remaining: RATE_LIMIT_MAX, resetAt: Date.now() + RATE_LIMIT_WINDOW };
  }

  return {
    remaining: Math.max(0, RATE_LIMIT_MAX - tracker.count),
    resetAt: tracker.expiresAt,
  };
}
