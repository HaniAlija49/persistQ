import { headers } from 'next/headers'
import { prisma } from './prisma'
import { User } from '@prisma/client'
import { checkRateLimit } from './ratelimit'
import bcrypt from 'bcrypt'
import { Redis } from '@upstash/redis'

export class AuthError extends Error {
  constructor(message: string, public statusCode: number = 401) {
    super(message)
    this.name = 'AuthError'
  }
}

const BCRYPT_ROUNDS = 10

// Redis cache for API key -> User ID mapping
let redis: Redis | null = null
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  })
}

const CACHE_TTL = 300 // 5 minutes

export async function validateApiKey(): Promise<User> {
  const headersList = await headers()
  const authHeader = headersList.get('authorization')

  if (!authHeader) {
    throw new AuthError('Missing authorization header', 401)
  }

  // Support both "Bearer token" and "token" formats
  const apiKey = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : authHeader

  if (!apiKey) {
    throw new AuthError('Invalid authorization format', 401)
  }

  try {
    // Check Redis cache first
    let userId: string | null = null
    if (redis) {
      const cacheKey = `memoryhub:apikey:${apiKey}`
      userId = await redis.get<string>(cacheKey)

      if (userId) {
        // Get user from database
        const user = await prisma.user.findUnique({
          where: { id: userId },
        })

        if (user) {
          // Check rate limit
          const rateLimitResult = await checkRateLimit(user.id)
          if (!rateLimitResult.success) {
            throw new AuthError(
              `Rate limit exceeded. Try again in ${rateLimitResult.reset ? Math.ceil((rateLimitResult.reset - Date.now()) / 1000) : 60} seconds`,
              429
            )
          }
          return user
        } else {
          // User deleted, clear cache
          await redis.del(cacheKey)
        }
      }
    }

    // Cache miss - validate from database
    // First, try to find user by plaintext API key (fast, indexed lookup)
    let user = await prisma.user.findUnique({
      where: { apiKey },
    })

    // Fallback: if not found by plaintext key, try bcrypt hash comparison
    // This handles legacy keys or keys that were only stored as hashes
    if (!user) {
      const prefix = getApiKeyPrefix(apiKey)
      const candidateUsers = await prisma.user.findMany({
        where: { apiKeyPrefix: prefix },
        take: 10,
      })

      for (const candidate of candidateUsers) {
        if (candidate.apiKeyHash && await bcrypt.compare(apiKey, candidate.apiKeyHash)) {
          user = candidate
          break
        }
      }
    }

    if (!user) {
      throw new AuthError('Invalid API key', 401)
    }

    // Cache the result in Redis
    if (redis) {
      const cacheKey = `memoryhub:apikey:${apiKey}`
      await redis.setex(cacheKey, CACHE_TTL, user.id)
    }

    // Check rate limit
    const rateLimitResult = await checkRateLimit(user.id)
    if (!rateLimitResult.success) {
      throw new AuthError(
        `Rate limit exceeded. Try again in ${rateLimitResult.reset ? Math.ceil((rateLimitResult.reset - Date.now()) / 1000) : 60} seconds`,
        429
      )
    }

    return user
  } catch (error) {
    if (error instanceof AuthError) {
      throw error
    }
    console.error('Error validating API key:', error)
    throw new AuthError('Authentication failed', 500)
  }
}

/**
 * Invalidate API key cache (call when API key is regenerated or user is deleted)
 * Note: Since we no longer store plaintext keys, this requires the actual key value
 * which is only available during regeneration. For user deletion, we invalidate by user ID.
 */
export async function invalidateApiKeyCache(apiKeyOrUserId: string): Promise<void> {
  if (redis) {
    // If it looks like an API key (starts with pq_), invalidate it directly
    if (apiKeyOrUserId.startsWith('pq_')) {
      const cacheKey = `memoryhub:apikey:${apiKeyOrUserId}`
      await redis.del(cacheKey)
    } else {
      // Otherwise it's a user ID - we can't invalidate without the key
      // The cache will expire naturally after TTL (5 minutes)
      console.log(`Cache for user ${apiKeyOrUserId} will expire after TTL`)
    }
  }
}

export function generateApiKey(): string {
  // Generate a secure random API key with prefix
  const randomBytes = crypto.getRandomValues(new Uint8Array(32))
  const randomString = Array.from(randomBytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')

  return `pq_${randomString}`
}

export function getApiKeyPrefix(apiKey: string): string {
  // Return first 12 characters for display (e.g., "pq_a1b2c3d4")
  return apiKey.substring(0, 12)
}

export async function hashApiKey(apiKey: string): Promise<string> {
  return bcrypt.hash(apiKey, BCRYPT_ROUNDS)
}
