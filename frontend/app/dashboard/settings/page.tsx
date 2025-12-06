"use client"

import { UserProfile } from "@clerk/nextjs"
import { dark } from "@clerk/themes"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Account Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your account profile, security, and preferences
        </p>
      </div>

      <div className="flex justify-center">
        <UserProfile
          appearance={{
            baseTheme: dark,
            variables: {
              colorPrimary: '#00e0ff',
              colorBackground: '#181818',
              colorInputBackground: '#2a2a2a',
              colorInputText: '#ffffff',
              colorText: '#ffffff',
              colorTextSecondary: '#a1a1aa',
            },
            elements: {
              card: 'bg-[#181818] border border-[#2a2a2a] shadow-sm',
              navbar: 'bg-[#181818] border-b border-[#2a2a2a]',
              navbarButton: 'hover:bg-[#1e1e1e] text-white data-[active]:bg-[#2a2a2a]',
              navbarButtonIcon: 'text-[#00e0ff]',
              pageScrollBox: 'bg-[#181818]',
              page: 'bg-[#181818]',
              formButtonPrimary: 'bg-gradient-to-r from-accent-cyan to-accent-purple hover:opacity-90 text-white font-medium',
              formButtonReset: 'hover:bg-[#1e1e1e] text-white border-[#2a2a2a]',
              footer: '!hidden',
              headerTitle: 'text-white font-semibold',
              headerSubtitle: 'text-gray-400',
              profileSectionTitle: 'text-white font-medium',
              profileSectionContent: 'text-gray-300',
              formFieldLabel: 'text-gray-300',
              formFieldInput: 'bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-gray-500',
              identityPreview: 'bg-[#2a2a2a] border-[#3a3a3a]',
              identityPreviewText: 'text-white',
              identityPreviewEditButton: 'text-[#00e0ff] hover:text-[#00c8e6]',
              accordionTriggerButton: 'hover:bg-[#1e1e1e] text-white',
              badge: 'bg-[#2a2a2a] text-white border-[#3a3a3a]',
              breadcrumbsItem: 'text-gray-400',
              breadcrumbsItemDivider: 'text-gray-600',
              formFieldSuccessText: 'text-green-400',
              formFieldErrorText: 'text-red-400',
            },
          }}
        />
      </div>
    </div>
  )
}
