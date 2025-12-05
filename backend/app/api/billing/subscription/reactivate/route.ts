/**
 * Subscription Reactivation API Endpoint
 *
 * POST: Reactivate a cancelled subscription
 */

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getBillingProvider, isBillingConfigured } from "@/lib/billing/factory";
import { authenticateRequest } from "@/lib/clerk-auth-helper";

const prisma = new PrismaClient();

/**
 * POST /api/billing/subscription/reactivate
 * Reactivate a cancelled subscription
 */
export async function POST(request: Request) {
  try {
    // Check if billing is configured
    if (!isBillingConfigured()) {
      return NextResponse.json(
        { error: "Billing is not configured on this server" },
        { status: 503 }
      );
    }

    // Authenticate user
    const { userId: clerkUserId } = await authenticateRequest(request);

    if (!clerkUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { clerkUserId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if user has a subscription
    if (!user.subscriptionId) {
      return NextResponse.json(
        { error: "No subscription found" },
        { status: 400 }
      );
    }

    // Check if subscription is actually cancelled
    if (!user.cancelAtPeriodEnd) {
      return NextResponse.json(
        { error: "Subscription is not scheduled for cancellation" },
        { status: 400 }
      );
    }

    // Get billing provider
    const provider = getBillingProvider();

    console.log("[Billing] Reactivating subscription:", {
      userId: user.id,
      subscriptionId: user.subscriptionId,
    });

    // Call provider API FIRST (webhook will update database)
    // If provider has a reactivate method, use it
    if ('reactivateSubscription' in provider && typeof provider.reactivateSubscription === 'function') {
      await provider.reactivateSubscription(user.subscriptionId);
    }

    // Update sync timestamp only (webhook will handle actual data update)
    await prisma.user.update({
      where: { id: user.id },
      data: {
        lastBillingSyncAt: new Date(),
      },
    });

    console.log("[Billing] Subscription reactivation initiated, waiting for webhook confirmation");

    return NextResponse.json({
      status: "success",
      message: "Subscription reactivation initiated. Changes will be reflected shortly.",
      note: "Waiting for payment provider confirmation via webhook"
    });
  } catch (error) {
    console.error("[Billing] Reactivate subscription error:", error);

    return NextResponse.json(
      {
        status: "error",
        error:
          error instanceof Error
            ? error.message
            : "Failed to reactivate subscription",
      },
      { status: 500 }
    );
  }
}
