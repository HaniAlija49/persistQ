"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, Loader2 } from "lucide-react"

interface CancelSubscriptionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentPeriodEnd: string | null
  onConfirm: (immediate: boolean) => Promise<void>
}

export function CancelSubscriptionDialog({
  open,
  onOpenChange,
  currentPeriodEnd,
  onConfirm,
}: CancelSubscriptionDialogProps) {
  const [cancelType, setCancelType] = useState<'period-end' | 'immediate'>('period-end')
  const [isLoading, setIsLoading] = useState(false)

  const handleConfirm = async () => {
    setIsLoading(true)
    try {
      await onConfirm(cancelType === 'immediate')
      onOpenChange(false)
    } catch (error) {
      console.error('Failed to cancel subscription:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const periodEndDate = currentPeriodEnd
    ? new Date(currentPeriodEnd).toLocaleDateString()
    : 'the end of your billing period'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel Subscription</DialogTitle>
          <DialogDescription>
            Choose how you'd like to cancel your subscription
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Canceling your subscription will revert your account to the Free plan.
            </AlertDescription>
          </Alert>

          <RadioGroup value={cancelType} onValueChange={(v) => setCancelType(v as any)}>
            <div className="space-y-3">
              {/* Cancel at Period End (Recommended) */}
              <div
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  cancelType === 'period-end'
                    ? 'border-accent-cyan bg-accent-cyan/5'
                    : 'border-border hover:border-accent-cyan/50'
                }`}
                onClick={() => setCancelType('period-end')}
              >
                <div className="flex items-start gap-3">
                  <RadioGroupItem value="period-end" id="period-end" className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="period-end" className="font-semibold cursor-pointer">
                        Cancel at period end
                      </Label>
                      <span className="text-xs bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-0.5 rounded">
                        Recommended
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Keep your subscription active until {periodEndDate}. You'll retain access to paid features until then.
                    </p>
                  </div>
                </div>
              </div>

              {/* Cancel Immediately */}
              <div
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  cancelType === 'immediate'
                    ? 'border-accent-cyan bg-accent-cyan/5'
                    : 'border-border hover:border-accent-cyan/50'
                }`}
                onClick={() => setCancelType('immediate')}
              >
                <div className="flex items-start gap-3">
                  <RadioGroupItem value="immediate" id="immediate" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="immediate" className="font-semibold cursor-pointer">
                      Cancel immediately
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your subscription will be canceled right away and you'll lose access to paid features immediately. No refunds will be issued.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </RadioGroup>

          {cancelType === 'immediate' && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Warning: Immediate cancellation cannot be undone and no refund will be provided.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Keep Subscription
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Canceling...
              </>
            ) : (
              'Confirm Cancellation'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
