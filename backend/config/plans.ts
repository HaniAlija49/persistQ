/**
 * Centralized plan configuration
 *
 * Define plans once with features, limits, and pricing.
 * Map to provider-specific product IDs for easy provider switching.
 */

import type { BillingInterval } from "../lib/billing/types";

// ============================================================================
// Plan Feature Limits
// ============================================================================

export interface PlanLimits {
  apiCallsPerMonth: number;
  maxMemories: number;
  maxMemorySize: number; // in bytes
  rateLimit: {
    requestsPerMinute: number;
    requestsPerDay: number;
  };
}

// ============================================================================
// Plan Metadata
// ============================================================================

export interface PlanMetadata {
  id: string;
  name: string;
  description: string;
  limits: PlanLimits;
  pricing: {
    monthly: number; // in cents
    yearly: number; // in cents
  };
  features: string[];
  recommended?: boolean;
  providers: {
    dodo?: {
      monthly?: string; // Dodo product ID for monthly billing
      yearly?: string; // Dodo product ID for yearly billing
    };
    stripe?: {
      monthly?: string; // Stripe price ID for monthly billing
      yearly?: string; // Stripe price ID for yearly billing
    };
  };
}

// ============================================================================
// Plan Definitions
// ============================================================================

export const PLANS: Record<string, PlanMetadata> = {
  free: {
    id: "free",
    name: "Free",
    description: "Perfect for testing and small projects",
    limits: {
      apiCallsPerMonth: 5_000,
      maxMemories: 250,
      maxMemorySize: 50 * 1024, // 50 KB per memory
      rateLimit: {
        requestsPerMinute: 10,
        requestsPerDay: 1_000,
      },
    },
    pricing: {
      monthly: 0,
      yearly: 0,
    },
    features: [
      "5,000 API calls/month",
      "250 memories",
      "50 KB per memory",
      "Community support",
      "Basic analytics",
    ],
    providers: {
      // Free plan has no provider products
    },
  },

  starter: {
    id: "starter",
    name: "Starter",
    description: "For growing applications and production use",
    limits: {
      apiCallsPerMonth: 50_000,
      maxMemories: 2_500,
      maxMemorySize: 100 * 1024, // 100 KB per memory
      rateLimit: {
        requestsPerMinute: 50,
        requestsPerDay: 10_000,
      },
    },
    pricing: {
      monthly: 500, // $5.00
      yearly: 5_000, // $50.00 (17% discount)
    },
    features: [
      "50,000 API calls/month",
      "2,500 memories",
      "100 KB per memory",
      "Email support",
      "Advanced analytics",
      "99.9% uptime SLA",
    ],
    providers: {
      dodo: {
        // TODO: Replace with actual Dodo product IDs from dashboard
        monthly: "pdt_starter_monthly",
        yearly: "pdt_starter_yearly",
      },
      // stripe: {
      //   monthly: "price_xxx",
      //   yearly: "price_yyy",
      // },
    },
  },

  pro: {
    id: "pro",
    name: "Pro",
    description: "For professional teams and high-traffic apps",
    limits: {
      apiCallsPerMonth: 500_000,
      maxMemories: 25_000,
      maxMemorySize: 500 * 1024, // 500 KB per memory
      rateLimit: {
        requestsPerMinute: 200,
        requestsPerDay: 100_000,
      },
    },
    pricing: {
      monthly: 1_200, // $12.00
      yearly: 12_000, // $120.00 (17% discount)
    },
    features: [
      "500,000 API calls/month",
      "25,000 memories",
      "500 KB per memory",
      "Priority support",
      "Advanced analytics",
      "99.95% uptime SLA",
      "Custom integrations",
    ],
    recommended: true,
    providers: {
      dodo: {
        // TODO: Replace with actual Dodo product IDs from dashboard
        monthly: "pdt_pro_monthly",
        yearly: "pdt_pro_yearly",
      },
    },
  },

  premium: {
    id: "premium",
    name: "Premium",
    description: "For enterprise-scale applications",
    limits: {
      apiCallsPerMonth: 2_000_000,
      maxMemories: 100_000,
      maxMemorySize: 1024 * 1024, // 1 MB per memory
      rateLimit: {
        requestsPerMinute: 1000,
        requestsPerDay: 500_000,
      },
    },
    pricing: {
      monthly: 2_900, // $29.00
      yearly: 29_000, // $290.00 (17% discount)
    },
    features: [
      "2,000,000 API calls/month",
      "100,000 memories",
      "1 MB per memory",
      "Dedicated support",
      "Advanced analytics",
      "99.99% uptime SLA",
      "Custom integrations",
      "On-premise deployment option",
      "Custom data retention",
    ],
    providers: {
      dodo: {
        // TODO: Replace with actual Dodo product IDs from dashboard
        monthly: "pdt_premium_monthly",
        yearly: "pdt_premium_yearly",
      },
    },
  },
};

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get plan by ID
 */
export function getPlan(planId: string): PlanMetadata | undefined {
  return PLANS[planId];
}

/**
 * Get provider product ID for a plan and interval
 */
export function getProviderProductId(
  planId: string,
  provider: string,
  interval: BillingInterval
): string | undefined {
  const plan = PLANS[planId];
  if (!plan) return undefined;

  const providerConfig = plan.providers[provider as keyof typeof plan.providers];
  if (!providerConfig) return undefined;

  return providerConfig[interval];
}

/**
 * Get plan ID from provider product ID
 */
export function getPlanIdFromProductId(
  provider: string,
  productId: string
): { planId: string; interval: BillingInterval } | undefined {
  for (const [planId, plan] of Object.entries(PLANS)) {
    const providerConfig = plan.providers[provider as keyof typeof plan.providers];
    if (!providerConfig) continue;

    if (providerConfig.monthly === productId) {
      return { planId, interval: "monthly" };
    }
    if (providerConfig.yearly === productId) {
      return { planId, interval: "yearly" };
    }
  }
  return undefined;
}

/**
 * Get all plan IDs
 */
export function getAllPlanIds(): string[] {
  return Object.keys(PLANS);
}

/**
 * Validate if a plan ID is valid
 */
export function isValidPlanId(planId: string): boolean {
  return planId in PLANS;
}

/**
 * Check if a plan is paid
 */
export function isPaidPlan(planId: string): boolean {
  const plan = PLANS[planId];
  return plan ? plan.pricing.monthly > 0 || plan.pricing.yearly > 0 : false;
}
