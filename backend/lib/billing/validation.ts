/**
 * Billing Input Validation Schemas
 *
 * Strict validation using Zod to prevent invalid data from reaching
 * the billing system and payment providers.
 */

import { z } from "zod";

// Valid plan IDs (must match plans.ts configuration)
const VALID_PLAN_IDS = ["free", "starter", "pro", "premium"] as const;
const VALID_PAID_PLAN_IDS = ["starter", "pro", "premium"] as const;
const VALID_INTERVALS = ["monthly", "yearly"] as const;

/**
 * Checkout Session Schema
 * Used for POST /api/billing/checkout
 */
export const CheckoutSessionSchema = z.object({
  planId: z.enum(VALID_PAID_PLAN_IDS, {
    errorMap: () => ({ message: "Invalid plan ID. Must be starter, pro, or premium" }),
  }),
  interval: z.enum(VALID_INTERVALS, {
    errorMap: () => ({ message: "Invalid interval. Must be monthly or yearly" }),
  }),
});

export type CheckoutSessionInput = z.infer<typeof CheckoutSessionSchema>;

/**
 * Update Subscription Schema
 * Used for POST /api/billing/subscription
 */
export const UpdateSubscriptionSchema = z.object({
  planId: z.enum(VALID_PAID_PLAN_IDS, {
    errorMap: () => ({ message: "Invalid plan ID. Must be starter, pro, or premium" }),
  }),
  interval: z.enum(VALID_INTERVALS, {
    errorMap: () => ({ message: "Invalid interval. Must be monthly or yearly" }),
  }),
});

export type UpdateSubscriptionInput = z.infer<typeof UpdateSubscriptionSchema>;

/**
 * Cancel Subscription Schema
 * Used for DELETE /api/billing/subscription (query params)
 */
export const CancelSubscriptionSchema = z.object({
  immediate: z
    .string()
    .optional()
    .transform((val) => val === "true")
    .pipe(z.boolean()),
});

export type CancelSubscriptionInput = z.infer<typeof CancelSubscriptionSchema>;

/**
 * Webhook Metadata Schema
 * Used for validating metadata in webhook events
 */
export const WebhookMetadataSchema = z.object({
  userId: z.string().optional(),
  user_id: z.string().optional(),
  clerkUserId: z.string().optional(),
  clerk_user_id: z.string().optional(),
  planId: z.enum(VALID_PLAN_IDS).optional(),
  interval: z.enum(VALID_INTERVALS).optional(),
});

export type WebhookMetadata = z.infer<typeof WebhookMetadataSchema>;

/**
 * Helper function to validate and parse request body
 *
 * @param schema - The Zod schema to validate against
 * @param data - The data to validate
 * @returns Parsed and validated data
 * @throws ZodError if validation fails
 */
export function validateInput<T extends z.ZodTypeAny>(
  schema: T,
  data: unknown
): z.infer<T> {
  return schema.parse(data);
}

/**
 * Helper function to safely validate input and return validation errors
 *
 * @param schema - The Zod schema to validate against
 * @param data - The data to validate
 * @returns Object with success flag and either data or errors
 */
export function safeValidateInput<T extends z.ZodTypeAny>(
  schema: T,
  data: unknown
): { success: true; data: z.infer<T> } | { success: false; errors: z.ZodError } {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  } else {
    return { success: false, errors: result.error };
  }
}

/**
 * Format Zod errors for API responses
 *
 * @param error - The ZodError to format
 * @returns User-friendly error object
 */
export function formatValidationErrors(error: z.ZodError): {
  message: string;
  fields: Record<string, string[]>;
} {
  const fieldErrors: Record<string, string[]> = {};

  error.errors.forEach((err) => {
    const field = err.path.join(".");
    if (!fieldErrors[field]) {
      fieldErrors[field] = [];
    }
    fieldErrors[field].push(err.message);
  });

  return {
    message: "Validation failed",
    fields: fieldErrors,
  };
}
