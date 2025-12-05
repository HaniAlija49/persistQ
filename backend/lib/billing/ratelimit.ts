/**
 * Billing-Specific Rate Limiting
 *
 * More restrictive rate limits for billing endpoints to prevent abuse
 * and protect against DOS attacks on payment processing.
 */

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

// Check if Upstash credentials are available
const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

let billingRateLimit: Ratelimit | null = null;

if (UPSTASH_REDIS_REST_URL && UPSTASH_REDIS_REST_TOKEN) {
  const redis = new Redis({
    url: UPSTASH_REDIS_REST_URL,
    token: UPSTASH_REDIS_REST_TOKEN,
  });

  // Create a more restrictive rate limiter for billing endpoints
  // 10 requests per minute is sufficient for normal user behavior
  billingRateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "1 m"), // 10 requests per minute
    analytics: true,
    prefix: "billing:",
  });

  console.log("✅ Billing rate limiting enabled (10 req/min per user)");
} else {
  console.warn(
    "⚠️  Billing rate limiting disabled - set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN to enable"
  );
}

/**
 * Check if a user has exceeded billing rate limits
 *
 * @param userId - The user ID to check rate limits for
 * @returns NextResponse with 429 error if rate limit exceeded, null if allowed
 */
export async function checkBillingRateLimit(
  userId: string
): Promise<NextResponse | null> {
  if (!billingRateLimit) {
    // Rate limiting disabled - allow all requests (fail open)
    return null;
  }

  try {
    const { success, limit, remaining, reset } =
      await billingRateLimit.limit(userId);

    if (!success) {
      console.warn(`[RateLimit] User ${userId} exceeded billing rate limit`);

      return NextResponse.json(
        {
          error: "Too many billing requests. Please try again later.",
          retryAfter: Math.floor((reset - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
            "Retry-After": Math.floor((reset - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    // Rate limit passed
    return null;
  } catch (error) {
    console.error("[RateLimit] Failed to check rate limit:", error);
    // On error, allow the request (fail open)
    return null;
  }
}

/**
 * Get current rate limit status for a user (for debugging/monitoring)
 *
 * @param userId - The user ID to check
 * @returns Rate limit status information
 */
export async function getBillingRateLimitStatus(userId: string): Promise<{
  enabled: boolean;
  limit?: number;
  remaining?: number;
  reset?: number;
}> {
  if (!billingRateLimit) {
    return { enabled: false };
  }

  try {
    const { success, limit, remaining, reset } =
      await billingRateLimit.limit(userId);

    return {
      enabled: true,
      limit,
      remaining,
      reset,
    };
  } catch (error) {
    console.error("[RateLimit] Failed to get status:", error);
    return { enabled: false };
  }
}
