/**
 * Authentication Service
 *
 * Handles API key retrieval and management for authenticated Clerk users.
 */

import { apiClient } from '@/lib/api-client'

export interface ApiKeyData {
  apiKey: string  // Full key
  userId: string
  email: string
}

export interface ApiKeyStatus {
  hasApiKey: boolean
  apiKey: string | null  // Full key always available for copying
  userId?: string
  email: string | null
}

export class AuthService {
  /**
   * Check if the user has generated an API key yet
   * Returns the full API key for easy copying and configuration
   */
  static async checkApiKeyStatus(): Promise<ApiKeyStatus | null> {
    try {
      const response = await apiClient.getApiKeyStatus()

      if (response.status === 'error') {
        console.error('Failed to check API key status:', response.error)
        return null
      }

      if (response.data) {
        return response.data
      }

      return null
    } catch (error) {
      console.error('Error checking API key status:', error)
      return null
    }
  }

  /**
   * Generate API key for the current Clerk user (first time)
   */
  static async generateApiKey(): Promise<ApiKeyData | null> {
    try {
      const response = await apiClient.generateApiKey()

      if (response.status === 'error') {
        console.error('Failed to generate API key:', response.error)
        return null
      }

      if (response.data) {
        // Set the API key for all future requests
        apiClient.setApiKey(response.data.apiKey)
        return response.data
      }

      return null
    } catch (error) {
      console.error('Error generating API key:', error)
      return null
    }
  }

  /**
   * Regenerate the user's API key (invalidates old key)
   */
  static async regenerateApiKey(): Promise<ApiKeyData | null> {
    try {
      const response = await apiClient.regenerateApiKey()

      if (response.status === 'error') {
        console.error('Failed to regenerate API key:', response.error)
        return null
      }

      if (response.data) {
        // Update the API key for all future requests
        apiClient.setApiKey(response.data.apiKey)
        return response.data
      }

      return null
    } catch (error) {
      console.error('Error regenerating API key:', error)
      return null
    }
  }

  /**
   * Check if user has an API key set (in memory)
   */
  static hasApiKey(): boolean {
    return apiClient.getApiKey() !== null
  }

  /**
   * Get the current API key (if set in memory)
   */
  static getCurrentApiKey(): string | null {
    return apiClient.getApiKey()
  }
}
