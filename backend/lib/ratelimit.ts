import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Check if Upstash credentials are available
const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN

let ratelimit: Ratelimit | null = null

// In-memory fallback rate limiter (per-process)
interface RateLimitEntry {
  count: number
  resetTime: number
}
const inMemoryLimits = new Map<string, RateLimitEntry>()
const LIMIT_PER_MINUTE = 100
const WINDOW_MS = 60 * 1000 // 1 minute

if (UPSTASH_REDIS_REST_URL && UPSTASH_REDIS_REST_TOKEN) {
  const redis = new Redis({
    url: UPSTASH_REDIS_REST_URL,
    token: UPSTASH_REDIS_REST_TOKEN,
  })

  // Create a rate limiter
  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(LIMIT_PER_MINUTE, '1 m'),
    analytics: true,
    prefix: 'memoryhub:ratelimit',
  })

  console.log('✅ Rate limiting enabled (Redis-backed, 100 req/min per API key)')
} else {
  console.warn('⚠️  Redis not configured - using in-memory rate limiting fallback (100 req/min per API key)')
  console.warn('⚠️  Note: In-memory limits are per-process and reset on restart')
}

function checkInMemoryRateLimit(identifier: string): { success: boolean; limit: number; remaining: number; reset: number } {
  const now = Date.now()
  const entry = inMemoryLimits.get(identifier)

  // Clean up expired entries periodically
  if (Math.random() < 0.01) { // 1% chance on each request
    for (const [key, value] of inMemoryLimits.entries()) {
      if (value.resetTime < now) {
        inMemoryLimits.delete(key)
      }
    }
  }

  if (!entry || entry.resetTime < now) {
    // Create new entry
    const resetTime = now + WINDOW_MS
    inMemoryLimits.set(identifier, { count: 1, resetTime })
    return {
      success: true,
      limit: LIMIT_PER_MINUTE,
      remaining: LIMIT_PER_MINUTE - 1,
      reset: resetTime
    }
  }

  if (entry.count >= LIMIT_PER_MINUTE) {
    // Rate limit exceeded
    return {
      success: false,
      limit: LIMIT_PER_MINUTE,
      remaining: 0,
      reset: entry.resetTime
    }
  }

  // Increment counter
  entry.count++
  return {
    success: true,
    limit: LIMIT_PER_MINUTE,
    remaining: LIMIT_PER_MINUTE - entry.count,
    reset: entry.resetTime
  }
}

export async function checkRateLimit(identifier: string): Promise<{ success: boolean; limit?: number; remaining?: number; reset?: number }> {
  if (!ratelimit) {
    // Use in-memory fallback
    return checkInMemoryRateLimit(identifier)
  }

  try {
    const { success, limit, remaining, reset } = await ratelimit.limit(identifier)
    return { success, limit, remaining, reset }
  } catch (error) {
    console.error('Rate limit check failed (Redis error), falling back to in-memory:', error)
    // On Redis error, fall back to in-memory rate limiting
    return checkInMemoryRateLimit(identifier)
  }
}
