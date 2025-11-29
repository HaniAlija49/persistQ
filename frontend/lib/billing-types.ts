/**
 * Billing Type Definitions
 *
 * TypeScript interfaces for billing-related data structures.
 * These types match the backend billing API contracts.
 */

export type BillingInterval = 'monthly' | 'yearly'

export type SubscriptionStatus =
  | 'active'
  | 'trialing'
  | 'past_due'
  | 'canceled'
  | 'paused'
  | 'incomplete'
  | 'incomplete_expired'

export interface Subscription {
  planId: string
  planName: string
  status: SubscriptionStatus
  interval: BillingInterval | null
  currentPeriodEnd: string | null
  cancelAtPeriodEnd: boolean
}

export interface PlanLimits {
  apiCallsPerMonth: number
  maxMemories: number
  maxMemorySize: number
  rateLimit: {
    requestsPerMinute: number
    requestsPerDay: number
  }
}

export interface Plan {
  id: string
  name: string
  description: string
  limits: PlanLimits
  pricing: {
    monthly: number // in cents
    yearly: number // in cents
  }
  features: string[]
  recommended?: boolean
}

export interface Usage {
  apiCalls: {
    used: number
    limit: number
    percentage: number
  }
  memories: {
    used: number
    limit: number
    percentage: number
  }
}

export interface BillingData {
  subscription: Subscription
  plan: Plan
  usage: Usage
}

export interface CheckoutSession {
  url: string
  sessionId: string
}
