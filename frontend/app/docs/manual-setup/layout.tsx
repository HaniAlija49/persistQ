"use client"

import { SharedHeader } from "@/components/shared-header"

export default function ManualSetupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <SharedHeader activeLink="docs" />
      {children}
    </div>
  )
}