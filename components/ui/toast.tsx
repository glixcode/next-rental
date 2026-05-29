"use client"
import { useEffect, useState } from "react"
import { X, CheckCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ToastProps {
  message: string
  type?: "success" | "error"
  isVisible: boolean
  onClose: () => void
  duration?: number
}

export function Toast({ message, type = "success", isVisible, onClose, duration = 3000 }: ToastProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setMounted(true)
      const timer = setTimeout(() => {
        setMounted(false)
        setTimeout(onClose, 300) // wait for slide-out animation
      }, duration)
      return () => clearTimeout(timer)
    } else {
      setMounted(false)
    }
  }, [isVisible, duration, onClose])

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-100 flex items-center gap-3 rounded-xl border px-5 py-3.5 shadow-2xl transition-all duration-300",
        type === "success"
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
          : "border-red-500/30 bg-red-500/10 text-red-400",
        mounted
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0 pointer-events-none"
      )}
    >
      {type === "success" ? (
        <CheckCircle className="h-5 w-5 shrink-0" />
      ) : (
        <AlertCircle className="h-5 w-5 shrink-0" />
      )}
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={() => { setMounted(false); setTimeout(onClose, 300) }}
        className="ml-2 rounded-lg p-1 opacity-60 transition-opacity hover:opacity-100"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}