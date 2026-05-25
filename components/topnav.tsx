"use client"
import { Avatar } from "@/components/ui/avatar"
import { Bell, Settings, Menu } from "lucide-react"

interface TopNavProps {
  title: string
  onMenuToggle?: () => void
}

export function TopNav({ title, onMenuToggle }: TopNavProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-[#222] bg-[#121212]/80 backdrop-blur-xl px-4 sm:px-6">
      {/* Mobile menu button */}
      <button
        onClick={onMenuToggle}
        className="inline-flex items-center justify-center rounded-lg p-2 text-[#8c8c8c] transition-colors hover:bg-[#1c1c1c] hover:text-[#ededed] lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Page title */}
      <div className="flex-1">
        <h1 className="text-lg font-semibold text-[#ededed]">{title}</h1>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1">
        {/* Notification bell */}
        <button className="relative inline-flex items-center justify-center rounded-lg p-2.5 text-[#8c8c8c] transition-colors hover:bg-[#1c1c1c] hover:text-[#ededed]">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
        </button>

        {/* Settings */}
        <button className="inline-flex items-center justify-center rounded-lg p-2.5 text-[#8c8c8c] transition-colors hover:bg-[#1c1c1c] hover:text-[#ededed]">
          <Settings className="h-5 w-5" />
        </button>

        {/* Divider */}
        <div className="mx-3 h-6 w-px bg-[#222]" />

        {/* User profile */}
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-[#ededed]">Gil Gucela</p>
            <p className="text-xs text-[#8c8c8c]">Administrator</p>
          </div>
          <Avatar fallback="GG" className="h-9 w-9 ring-2 ring-[#222]" />
        </div>
      </div>
    </header>
  )
}