"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import type { Usage, Plan } from "@/lib/billing-types"
import { Button } from "@/components/ui/button"

interface UsageCardProps {
  usage: Usage
  plan: Plan
  onUpgrade?: () => void
}

export function UsageCard({ usage, plan, onUpgrade }: UsageCardProps) {
  // Color based on percentage
  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500'
    if (percentage >= 70) return 'bg-yellow-500'
    return 'bg-gradient-to-r from-accent-cyan to-accent-purple'
  }

  const getTextColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-500'
    if (percentage >= 70) return 'text-yellow-500'
    return 'text-foreground'
  }

  const apiCallsExceeded = usage.apiCalls.percentage >= 100
  const memoriesExceeded = usage.memories.percentage >= 100
  const nearLimit = usage.apiCalls.percentage >= 80 || usage.memories.percentage >= 80

  return (
    <Card>
      <CardHeader>
        <CardTitle>Usage This Month</CardTitle>
        <CardDescription>Current resource consumption</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Warning Alert */}
        {nearLimit && (
          <Alert variant={apiCallsExceeded || memoriesExceeded ? "destructive" : "default"}>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {apiCallsExceeded || memoriesExceeded ? (
                <>
                  You've reached your plan limit. {onUpgrade && (
                    <Button variant="link" className="p-0 h-auto" onClick={onUpgrade}>
                      Upgrade your plan
                    </Button>
                  )} to continue.
                </>
              ) : (
                "You're approaching your plan limits"
              )}
            </AlertDescription>
          </Alert>
        )}

        {/* API Calls */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">API Calls</span>
            <span className={`text-sm font-medium ${getTextColor(usage.apiCalls.percentage)}`}>
              {usage.apiCalls.percentage}%
            </span>
          </div>
          <div className="text-2xl font-bold">
            {usage.apiCalls.used.toLocaleString()}
            <span className="text-sm text-muted-foreground font-normal">
              {' '}/ {usage.apiCalls.limit.toLocaleString()}
            </span>
          </div>
          <Progress
            value={Math.min(usage.apiCalls.percentage, 100)}
            className="h-2"
            indicatorClassName={getProgressColor(usage.apiCalls.percentage)}
          />
        </div>

        {/* Memories */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Memories</span>
            <span className={`text-sm font-medium ${getTextColor(usage.memories.percentage)}`}>
              {usage.memories.percentage}%
            </span>
          </div>
          <div className="text-2xl font-bold">
            {usage.memories.used.toLocaleString()}
            <span className="text-sm text-muted-foreground font-normal">
              {' '}/ {usage.memories.limit.toLocaleString()}
            </span>
          </div>
          <Progress
            value={Math.min(usage.memories.percentage, 100)}
            className="h-2"
            indicatorClassName={getProgressColor(usage.memories.percentage)}
          />
        </div>

        {/* Plan Limits Info */}
        <div className="pt-2 border-t">
          <p className="text-xs text-muted-foreground">
            Usage resets on the 1st of each month
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
