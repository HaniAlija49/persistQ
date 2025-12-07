"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface CookiePreferences {
  necessary: boolean
  functional: boolean
  analytics: boolean
  marketing: boolean
  timestamp: number
}

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true
    functional: false,
    analytics: false,
    marketing: false,
    timestamp: Date.now(),
  })

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const savePreferences = (prefs: CookiePreferences) => {
    const consentData = {
      ...prefs,
      timestamp: Date.now(),
      version: "1.0", // Update this when you change cookie policy
    }
    localStorage.setItem("cookie-consent", JSON.stringify(consentData))
    setShowBanner(false)

    // Here you would initialize analytics/tracking based on preferences
    if (prefs.analytics) {
      // Enable analytics (Vercel Analytics, Highlight.io, etc.)
      console.log("Analytics enabled")
    }
    if (prefs.marketing) {
      // Enable marketing cookies (if any)
      console.log("Marketing enabled")
    }
  }

  const acceptAll = () => {
    const prefs = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now(),
    }
    savePreferences(prefs)
  }

  const acceptNecessary = () => {
    const prefs = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
      timestamp: Date.now(),
    }
    savePreferences(prefs)
  }

  const saveCustomPreferences = () => {
    savePreferences(preferences)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur border-t border-border shadow-lg">
      <div className="container mx-auto max-w-6xl">
        {!showDetails ? (
          // Simple Banner
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">We use cookies</h3>
              <p className="text-sm text-muted-foreground">
                We use cookies to enhance your experience, analyze site usage, and provide essential functionality.
                By clicking "Accept All", you consent to our use of cookies. You can customize your preferences or
                learn more in our{" "}
                <Link href="/cookie-policy" className="text-accent-cyan hover:underline">
                  Cookie Policy
                </Link>{" "}
                and{" "}
                <Link href="/privacy-policy" className="text-accent-cyan hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDetails(true)}
              >
                Customize
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={acceptNecessary}
              >
                Necessary Only
              </Button>
              <Button
                size="sm"
                className="bg-accent-cyan hover:bg-accent-cyan/90 text-black"
                onClick={acceptAll}
              >
                Accept All
              </Button>
            </div>
          </div>
        ) : (
          // Detailed Preferences
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Cookie Preferences</h3>
              <button
                onClick={() => setShowDetails(false)}
                className="p-2 hover:bg-surface rounded-lg transition-colors"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {/* Necessary Cookies */}
              <div className="flex items-start justify-between p-3 bg-surface rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium mb-1">Strictly Necessary</h4>
                  <p className="text-sm text-muted-foreground">
                    Essential for authentication, security, and basic functionality. Cannot be disabled.
                  </p>
                </div>
                <div className="ml-4">
                  <input
                    type="checkbox"
                    checked={true}
                    disabled
                    className="w-5 h-5"
                  />
                </div>
              </div>

              {/* Functional Cookies */}
              <div className="flex items-start justify-between p-3 bg-surface rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium mb-1">Functional</h4>
                  <p className="text-sm text-muted-foreground">
                    Remember your preferences and settings for a better experience.
                  </p>
                </div>
                <div className="ml-4">
                  <input
                    type="checkbox"
                    checked={preferences.functional}
                    onChange={(e) =>
                      setPreferences({ ...preferences, functional: e.target.checked })
                    }
                    className="w-5 h-5"
                  />
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-start justify-between p-3 bg-surface rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium mb-1">Analytics</h4>
                  <p className="text-sm text-muted-foreground">
                    Help us understand how visitors use our site (Vercel Analytics, Highlight.io).
                  </p>
                </div>
                <div className="ml-4">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) =>
                      setPreferences({ ...preferences, analytics: e.target.checked })
                    }
                    className="w-5 h-5"
                  />
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="flex items-start justify-between p-3 bg-surface rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium mb-1">Marketing</h4>
                  <p className="text-sm text-muted-foreground">
                    Used for targeted advertising and promotional content (currently not used).
                  </p>
                </div>
                <div className="ml-4">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) =>
                      setPreferences({ ...preferences, marketing: e.target.checked })
                    }
                    className="w-5 h-5"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={acceptNecessary}
              >
                Necessary Only
              </Button>
              <Button
                size="sm"
                className="bg-accent-cyan hover:bg-accent-cyan/90 text-black"
                onClick={saveCustomPreferences}
              >
                Save Preferences
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
