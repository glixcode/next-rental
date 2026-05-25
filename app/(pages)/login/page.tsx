"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Film, Eye, EyeOff, Loader2 } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (data.success) {
        router.push("/dashboard")
      } else {
        setError(data.message || "Invalid username or password")
      }
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-[#1a1a1a]">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#121212]">
        <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 via-transparent to-emerald-500/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500 shadow-lg shadow-emerald-500/25">
              <Film className="h-7 w-7 text-white" />
            </div>
            <span className="text-3xl font-bold tracking-tight text-[#ededed]">MovieDash</span>
          </div>
          <p className="text-[#8c8c8c] text-lg max-w-md mx-auto leading-relaxed">
            Manage your movie catalog, track reviews, and oversee your entire media library from one place.
          </p>
          <div className="mt-12 flex justify-center gap-3">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            <div className="h-2 w-2 rounded-full bg-[#333]" />
            <div className="h-2 w-2 rounded-full bg-[#333]" />
          </div>
        </div>
      </div>

      {/* Right login form panel */}
      <div className="flex w-full items-center justify-center px-6 lg:w-1/2">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex items-center justify-center gap-2.5 mb-10 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500">
              <Film className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#ededed]">MovieDash</span>
          </div>

          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-2xl font-semibold text-[#ededed]">Welcome back</h1>
            <p className="mt-2 text-sm text-[#8c8c8c]">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="username" className="text-sm font-medium text-[#ededed]">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                  setError("")
                }}
                placeholder="Enter your username"
                className="w-full rounded-lg border border-[#333] bg-[#242424] px-3.5 py-2.5 text-sm text-[#ededed] placeholder-[#555] outline-none transition-all duration-200 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-sm font-medium text-[#ededed]">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError("")
                  }}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-[#333] bg-[#242424] px-3.5 py-2.5 pr-10 text-sm text-[#ededed] placeholder-[#555] outline-none transition-all duration-200 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#555] transition-colors hover:text-[#8c8c8c]"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-3.5 py-2.5">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-[#333] bg-[#242424] text-emerald-500 accent-emerald-500 focus:ring-emerald-500/10 focus:ring-2"
                />
                <span className="text-sm text-[#8c8c8c]">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-emerald-400 transition-colors hover:text-emerald-300"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-[#555]">
            Don't have an account?{" "}
            <button
              type="button"
              className="text-emerald-400 transition-colors hover:text-emerald-300"
            >
              Create one
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}