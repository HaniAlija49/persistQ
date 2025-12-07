import Link from "next/link"
import { SharedHeader } from "@/components/shared-header"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <SharedHeader />

      <div className="container mx-auto px-4 flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* 404 Visual */}
          <div className="relative">
            <h1 className="text-9xl font-bold bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-cyan bg-clip-text text-transparent animate-pulse-subtle">
              404
            </h1>
            <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/20 via-accent-purple/20 to-accent-cyan/20 blur-3xl -z-10" />
          </div>

          {/* Error Message */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Page Not Found</h2>
            <p className="text-xl text-muted-foreground max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link href="/">
              <Button
                size="lg"
                className="bg-accent-cyan hover:bg-accent-cyan/90 text-black font-medium"
              >
                <Home className="mr-2 w-5 h-5" />
                Go Home
              </Button>
            </Link>
            <Link href="/docs">
              <Button
                size="lg"
                variant="outline"
                className="font-medium"
              >
                <Search className="mr-2 w-5 h-5" />
                Browse Docs
              </Button>
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="pt-12 border-t border-border/40">
            <p className="text-sm text-muted-foreground mb-4">You might be looking for:</p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <Link href="/docs/getting-started" className="text-accent-cyan hover:underline">
                Getting Started
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link href="/docs/api-reference" className="text-accent-cyan hover:underline">
                API Reference
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link href="/pricing" className="text-accent-cyan hover:underline">
                Pricing
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link href="/dashboard" className="text-accent-cyan hover:underline">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
