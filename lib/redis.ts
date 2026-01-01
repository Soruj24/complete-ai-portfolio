import { Redis } from "@upstash/redis";

let redisInstance: Redis | null = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redisInstance = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
} else {
  console.warn("Redis environment variables are missing. Redis features will be disabled.");
}

export const redis = redisInstance;

export async function redisRateLimit(ip: string, limit: number = 5, window: number = 60) {
  if (!redis) {
    return {
      success: true,
      limit,
      remaining: limit,
      disabled: true
    };
  }

  const key = `ratelimit:${ip}`;
  try {
    const count = await redis.incr(key);

    if (count === 1) {
      await redis.expire(key, window);
    }

    return {
      success: count <= limit,
      limit,
      remaining: Math.max(0, limit - count),
    };
  } catch (error) {
    console.error("Redis rate limit error:", error);
    return {
      success: true,
      limit,
      remaining: limit,
      error: true
    };
  }
}
