/**
 * Billing Service
 *
 * Handles all billing-related operations including subscription management,
 * plan changes, and portal access.
 */

import { apiClient, type ApiResponse } from '@/lib/api-client'
import type { BillingData, CheckoutSession } from '@/lib/billing-types'

export class BillingService {
  /**
   * Get current subscription data
   */
  static async getSubscriptionData(): Promise<BillingData | null> {
    try {
      const response = await apiClient.getBilling()

      if (response.status === 'error') {
        console.error('Failed to fetch billing data:', response.error)
        return null
      }

      return response.data || null
    } catch (error) {
      console.error('Error fetching billing data:', error)
      return null
    }
  }

  /**
   * Update plan (upgrade/downgrade)
   */
  static async updatePlan(
    planId: string,
    interval: 'monthly' | 'yearly'
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await apiClient.updateSubscription(planId, interval)

      if (response.status === 'error') {
        return { success: false, error: response.error }
      }

      return { success: true }
    } catch (error) {
      console.error('Error updating plan:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  /**
   * Cancel subscription
   */
  static async cancelSubscription(
    immediate: boolean = false
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await apiClient.cancelSubscription(immediate)

      if (response.status === 'error') {
        return { success: false, error: response.error }
      }

      return { success: true }
    } catch (error) {
      console.error('Error canceling subscription:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  /**
   * Open customer portal (redirects user)
   */
  static async openPortal(): Promise<void> {
    try {
      const response = await apiClient.getPortalUrl()

      if (response.status === 'error') {
        console.error('Failed to get portal URL:', response.error)
        throw new Error(response.error)
      }

      if (response.data?.url) {
        window.location.href = response.data.url
      }
    } catch (error) {
      console.error('Error opening portal:', error)
      throw error
    }
  }

  /**
   * Create checkout session
   */
  static async createCheckout(
    planId: string,
    interval: 'monthly' | 'yearly'
  ): Promise<CheckoutSession | null> {
    try {
      const response = await apiClient.createCheckout(planId, interval)

      if (response.status === 'error') {
        console.error('Failed to create checkout:', response.error)
        return null
      }

      return response.data || null
    } catch (error) {
      console.error('Error creating checkout:', error)
      return null
    }
  }
}
