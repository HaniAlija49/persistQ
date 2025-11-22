/**
 * Customer Portal API Endpoint
 *
 * Redirects users to the billing provider's customer portal
 * where they can manage subscription, payment methods, and view invoices.
 */

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { getBillingProvider, isBillingConfigured } from "@/lib/billing/factory";
import { env } from "@/lib/env";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    // Check if billing is configured
    if (!isBillingConfigured()) {
      return NextResponse.json(
        { error: "Billing is not configured on this server" },
        { status: 503 }
      );
    }

    // Authenticate user
    const { userId: clerkUserId } = await auth();

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

    // Check if user has a billing customer ID
    if (!user.billingCustomerId) {
      return NextResponse.json(
        { error: "No billing customer found. Please subscribe to a plan first." },
        { status: 400 }
      );
    }

    // Get billing provider
    const provider = getBillingProvider();

    // Determine return URL
    const appUrl = env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const returnUrl = `${appUrl}/dashboard/billing`;

    // Create portal session
    const portalSession = await provider.createPortalSession({
      customerId: user.billingCustomerId,
      returnUrl,
    });

    // Redirect to portal
    return NextResponse.redirect(portalSession.url);
  } catch (error) {
    console.error("[Billing] Portal error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create portal session",
      },
      { status: 500 }
    );
  }
}
