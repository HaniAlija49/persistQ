/**
 * Billing Provider Factory
 *
 * Central factory for creating billing provider instances.
 * Enables easy switching between payment providers via environment configuration.
 */

import { env } from "../env";
import { DodoProvider } from "./providers/dodo";
import type { IBillingProvider } from "./types";

/**
 * Get the configured billing provider instance
 *
 * This is the single source of truth for which billing provider to use.
 * To switch providers, just change BILLING_PROVIDER environment variable.
 */
export function getBillingProvider(): IBillingProvider {
  const provider = env.BILLING_PROVIDER || "dodo";

  switch (provider.toLowerCase()) {
    case "dodo":
      if (!env.DODO_API_KEY || !env.DODO_WEBHOOK_SECRET) {
        throw new Error(
          "Dodo Payments not configured: DODO_API_KEY and DODO_WEBHOOK_SECRET required"
        );
      }

      return new DodoProvider({
        apiKey: env.DODO_API_KEY,
        webhookSecret: env.DODO_WEBHOOK_SECRET,
        mode: (env.DODO_MODE as "test" | "live") || "test",
      });

    // Add more providers here as needed:
    // case "stripe":
    //   if (!env.STRIPE_SECRET_KEY || !env.STRIPE_WEBHOOK_SECRET) {
    //     throw new Error("Stripe not configured");
    //   }
    //   return new StripeProvider({
    //     apiKey: env.STRIPE_SECRET_KEY,
    //     webhookSecret: env.STRIPE_WEBHOOK_SECRET,
    //     mode: env.STRIPE_MODE || "test",
    //   });

    default:
      throw new Error(
        `Unknown billing provider: ${provider}. Supported providers: dodo`
      );
  }
}

/**
 * Check if billing is configured
 */
export function isBillingConfigured(): boolean {
  try {
    getBillingProvider();
    return true;
  } catch {
    return false;
  }
}

/**
 * Get the current billing provider name
 */
export function getCurrentProvider(): string {
  return env.BILLING_PROVIDER || "dodo";
}
