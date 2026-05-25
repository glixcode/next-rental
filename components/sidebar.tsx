"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Film,
  Clapperboard,
  Users,
  UserCircle,
  UserCog,
  Star,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const navItems = [
  { label: "Movies", href: "/movies", icon: Film },
  { label: "Genres", href: "/genres", icon: Clapperboard },
  { label: "Actors", href: "/actors", icon: Users },
  { label: "Directors", href: "/directors", icon: UserCog },
  { label: "Users", href: "/users", icon: UserCircle },
  { label: "Reviews", href: "/reviews", icon: Star },
  { label: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full flex-col border-r border-[#222] bg-[#121212] transition-all duration-300",
          collapsed ? "w-16" : "w-64",
          "lg:relative lg:z-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo area */}
        <div
          className={cn(
            "flex h-16 items-center border-b border-[#222] px-4",
            collapsed ? "justify-center" : "justify-between"
          )}
        >
          {!collapsed && (
            <Link href="/dashboard" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500">
                <Film className="h-4 w-4 text-white" />
              </div>
              <span className="text-base font-semibold tracking-tight text-[#ededed]">
                MovieDash
              </span>
            </Link>
          )}
          {collapsed && (
            <Link href="/dashboard" className="flex items-center justify-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500">
                <Film className="h-4 w-4 text-white" />
              </div>
            </Link>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "text-[#8c8c8c] hover:bg-[#1c1c1c] hover:text-[#ededed]",
                  collapsed && "justify-center px-2"
                )}
                onClick={() => setMobileOpen(false)}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5 shrink-0",
                    isActive ? "text-emerald-400" : "text-[#555]"
                  )}
                />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Collapse toggle (desktop only) */}
        <div className="hidden lg:block border-t border-[#222] px-3 py-3">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm text-[#555] transition-colors hover:bg-[#1c1c1c] hover:text-[#8c8c8c]"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4" />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  )
}