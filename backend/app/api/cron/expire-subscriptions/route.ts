/**
 * Cron Job: Expire Subscriptions
 *
 * This endpoint checks for subscriptions that have been cancelled
 * and have passed their period end date, then downgrades them to free.
 *
 * Also monitors for orphaned subscriptions (active/trialing past period end)
 * which indicates webhook failures and requires immediate alerting.
 *
 * Should be called daily via a cron service (Vercel Cron, cron-job.org, etc.)
 */

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { logBillingEvent } from "@/lib/billing/audit";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    // Verify cron secret to prevent unauthorized access
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("[Cron] Starting subscription expiration check...");

    const now = new Date();

    // CRITICAL CHECK: Find orphaned active/trialing subscriptions past period end
    // These should have been handled by webhooks - indicates webhook failure
    const orphanedSubscriptions = await prisma.user.findMany({
      where: {
        currentPeriodEnd: {
          lt: now,
        },
        subscriptionStatus: {
          in: ["active", "trialing"],
        },
        planId: {
          not: "free",
        },
      },
    });

    // Alert if orphaned subscriptions found
    if (orphanedSubscriptions.length > 0) {
      console.error(
        `[CRITICAL] Found ${orphanedSubscriptions.length} orphaned active/trialing subscriptions past period end!`
      );
      console.error("[CRITICAL] This indicates webhook processing failures!");

      // Send critical alert to monitoring system
      if (typeof global !== "undefined" && (global as any).monitoring) {
        (global as any).monitoring.captureMessage(
          `CRITICAL: ${orphanedSubscriptions.length} orphaned subscriptions found`,
          {
            level: "critical",
            extra: {
              count: orphanedSubscriptions.length,
              userIds: orphanedSubscriptions.map((u) => u.id),
              emails: orphanedSubscriptions.map((u) => u.email),
            },
          }
        );
      }

      // Log each orphaned subscription
      for (const user of orphanedSubscriptions) {
        console.error(`[CRITICAL] Orphaned subscription - User ${user.id} (${user.email}):`, {
          subscriptionId: user.subscriptionId,
          planId: user.planId,
          status: user.subscriptionStatus,
          periodEnd: user.currentPeriodEnd,
          daysOverdue: Math.floor(
            (now.getTime() - (user.currentPeriodEnd?.getTime() || 0)) / (1000 * 60 * 60 * 24)
          ),
        });
      }
    }

    // Find users with cancelled subscriptions that have reached period end
    const expiredUsers = await prisma.user.findMany({
      where: {
        cancelAtPeriodEnd: true,
        currentPeriodEnd: {
          lt: now,
        },
        subscriptionStatus: "canceled",
        planId: {
          not: "free",
        },
      },
    });

    console.log(`[Cron] Found ${expiredUsers.length} cancelled subscriptions to downgrade`);

    // Downgrade each user to free plan with audit logging
    const results = [];
    for (const user of expiredUsers) {
      try {
        // Use transaction for atomic update + audit log
        await prisma.$transaction(async (tx) => {
          await tx.user.update({
            where: { id: user.id },
            data: {
              planId: "free",
              subscriptionStatus: null,
              subscriptionId: null,
              cancelAtPeriodEnd: false,
              currentPeriodEnd: null,
              billingInterval: null,
              version: { increment: 1 },
            },
          });

          // Log downgrade event
          await logBillingEvent(
            user.id,
            "subscription.expired",
            {
              previousPlanId: user.planId,
              subscriptionId: user.subscriptionId,
              periodEnd: user.currentPeriodEnd?.toISOString(),
              downgradeReason: "period_ended",
            },
            { tx }
          );
        });

        console.log(
          `[Cron] Downgraded user ${user.id} (${user.email}) from ${user.planId} to free plan`
        );
        results.push({
          userId: user.id,
          email: user.email,
          previousPlan: user.planId,
          status: "downgraded",
        });

        // TODO: Send email notification about downgrade
      } catch (error) {
        console.error(
          `[Cron] Error downgrading user ${user.id}:`,
          error instanceof Error ? error.message : String(error)
        );
        results.push({
          userId: user.id,
          email: user.email,
          status: "error",
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }

    return NextResponse.json({
      status: "success",
      processed: expiredUsers.length,
      orphanedCount: orphanedSubscriptions.length,
      orphanedWarning:
        orphanedSubscriptions.length > 0
          ? "CRITICAL: Orphaned subscriptions detected - webhook failures!"
          : null,
      results,
      timestamp: now.toISOString(),
    });
  } catch (error) {
    console.error(
      "[Cron] Unexpected error:",
      error instanceof Error ? error.message : String(error)
    );

    return NextResponse.json(
      {
        status: "error",
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
