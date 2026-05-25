import Link from "next/link"
import { Film, Clapperboard, Users, Star, TrendingUp, ArrowRight } from "lucide-react"

const features = [
  {
    title: "Movie Management",
    description: "Add, edit, and organize your entire movie catalog with ease.",
    icon: Film,
  },
  {
    title: "Genre Library",
    description: "Categorize films by genre for smarter browsing and discovery.",
    icon: Clapperboard,
  },
  {
    title: "Cast & Crew",
    description: "Track actors and directors with detailed profiles and filmographies.",
    icon: Users,
  },
  {
    title: "Reviews & Ratings",
    description: "Collect and display user reviews with dynamic rating systems.",
    icon: Star,
  },
]

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#1a1a1a]">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-[#222] bg-[#121212]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500">
              <Film className="h-4 w-4 text-white" />
            </div>
            <span className="text-base font-semibold tracking-tight text-[#ededed]">MovieDash</span>
          </Link>

          <nav className="hidden items-center gap-6 sm:flex">
            <Link href="#features" className="text-sm text-[#8c8c8c] transition-colors hover:text-[#ededed]">
              Features
            </Link>
            <Link href="#about" className="text-sm text-[#8c8c8c] transition-colors hover:text-[#ededed]">
              About
            </Link>
            <Link
              href="/login"
              className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-emerald-400"
            >
              Sign in
            </Link>
          </nav>

          {/* Mobile menu button - just sign in link */}
          <Link
            href="/login"
            className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-emerald-400 sm:hidden"
          >
            Sign in
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#222]">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#333] bg-[#242424] px-4 py-1.5 text-xs text-[#8c8c8c]">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Your complete movie management solution
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-[#ededed] sm:text-5xl lg:text-6xl">
              Manage your{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
                movie library
              </span>{" "}
              with ease
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[#8c8c8c] max-w-2xl mx-auto">
              A powerful admin dashboard for organizing movies, tracking genres, managing actors and directors,
              and collecting reviews — all in one place.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/25"
              >
                Get started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center gap-2 rounded-lg border border-[#333] px-6 py-3 text-sm font-medium text-[#8c8c8c] transition-all duration-200 hover:border-[#555] hover:text-[#ededed]"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-b border-[#222] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-[#ededed] sm:text-4xl">
              Everything you need
            </h2>
            <p className="mt-4 text-lg text-[#8c8c8c]">
              Powerful tools to manage every aspect of your movie collection.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-xl border border-[#222] bg-[#242424] p-6 transition-all duration-200 hover:border-[#333] hover:bg-[#2a2a2a] hover:-translate-y-1"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 transition-colors group-hover:bg-emerald-500/20">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-[#ededed]">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#8c8c8c]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="about" className="border-b border-[#222] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { value: "2,847+", label: "Movies cataloged" },
              { value: "24", label: "Genres covered" },
              { value: "8,431+", label: "Reviews collected" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold text-[#ededed]">{stat.value}</p>
                <p className="mt-2 text-sm text-[#8c8c8c]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-[#ededed] sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mt-4 text-lg text-[#8c8c8c]">
              Sign in to your account and start managing your movie library today.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/25"
              >
                Sign in to dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#222] py-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500">
                <Film className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-sm font-medium text-[#8c8c8c]">MovieDash</span>
            </div>
            <p className="text-xs text-[#555]">
              &copy; {new Date().getFullYear()} MovieDash. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}