"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

interface SharedHeaderProps {
  activeLink?: "features" | "pricing" | "docs"
}

export function SharedHeader({ activeLink }: SharedHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <Image
              src="/logo-small.png"
              alt="PersistQ Logo"
              width={32}
              height={32}
              className="object-contain"
              priority
            />
          </div>
          <span className="text-xl font-semibold">PersistQ</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/#features"
            className={`text-sm transition-colors ${
              activeLink === "features"
                ? "text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className={`text-sm transition-colors ${
              activeLink === "pricing"
                ? "text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Pricing
          </Link>
          <Link
            href="/docs"
            className={`text-sm transition-colors ${
              activeLink === "docs"
                ? "text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Docs
          </Link>
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm" className="bg-accent-cyan hover:bg-accent-cyan/90 text-black">
              Get Started
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:bg-surface rounded-lg transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              href="/#features"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/docs"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Docs
            </Link>
            <div className="border-t border-border/40 pt-4 flex flex-col gap-3">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" size="sm" className="w-full">
                  Log in
                </Button>
              </Link>
              <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button size="sm" className="w-full bg-accent-cyan hover:bg-accent-cyan/90 text-black">
                  Get Started
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
