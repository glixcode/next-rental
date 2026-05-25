import { DashboardLayout } from "@/components/dashboard-layout"
import { Film, Users, Star, Clapperboard, TrendingUp, Calendar } from "lucide-react"

const stats = [
  { label: "Total Movies", value: "2,847", change: "+12%", icon: Film, color: "emerald" },
  { label: "Active Users", value: "14,290", change: "+8%", icon: Users, color: "blue" },
  { label: "Reviews", value: "8,431", change: "+24%", icon: Star, color: "amber" },
  { label: "Genres", value: "24", change: "+2", icon: Clapperboard, color: "purple" },
]

const recentMovies = [
  { title: "Inception", year: 2010, rating: 8.8, genre: "Sci-Fi" },
  { title: "The Shawshank Redemption", year: 1994, rating: 9.3, genre: "Drama" },
  { title: "Interstellar", year: 2014, rating: 8.7, genre: "Sci-Fi" },
  { title: "Pulp Fiction", year: 1994, rating: 8.9, genre: "Crime" },
  { title: "The Dark Knight", year: 2008, rating: 9.0, genre: "Action" },
]

const colorMap: Record<string, { bg: string; icon: string; text: string }> = {
  emerald: { bg: "bg-emerald-500/10", icon: "text-emerald-400", text: "text-emerald-400" },
  blue: { bg: "bg-blue-500/10", icon: "text-blue-400", text: "text-blue-400" },
  amber: { bg: "bg-amber-500/10", icon: "text-amber-400", text: "text-amber-400" },
  purple: { bg: "bg-purple-500/10", icon: "text-purple-400", text: "text-purple-400" },
}

export default function Dashboard() {
  return (
    <DashboardLayout title="Dashboard">
      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const colors = colorMap[stat.color]
          return (
            <div
              key={stat.label}
              className="group rounded-xl border border-[#222] bg-[#242424] p-5 transition-all duration-200 hover:border-[#333] hover:bg-[#2a2a2a] hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${colors.bg} ${colors.icon} transition-colors duration-200`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <span className={`text-xs font-medium ${colors.text} ${colors.bg} px-2 py-0.5 rounded-full`}>
                  {stat.change}
                </span>
              </div>
              <p className="mt-3 text-2xl font-bold text-[#ededed]">{stat.value}</p>
              <p className="text-sm text-[#8c8c8c]">{stat.label}</p>
            </div>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Monthly Activity Chart */}
        <div className="rounded-xl border border-[#222] bg-[#242424] p-6 transition-all duration-200 hover:border-[#333] hover:shadow-lg hover:shadow-black/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[#ededed]">Monthly Activity</h3>
            <TrendingUp className="h-4 w-4 text-[#555]" />
          </div>
          <div className="flex items-end gap-2 h-40">
            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 88].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-md bg-linear-to-t from-emerald-500/60 to-emerald-400/30 transition-all duration-300 hover:from-emerald-500 hover:to-emerald-400"
                  style={{ height: `${height}%` }}
                />
                <span className="text-[10px] text-[#555]">
                  {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Rated Movies */}
        <div className="rounded-xl border border-[#222] bg-[#242424] p-6 transition-all duration-200 hover:border-[#333] hover:shadow-lg hover:shadow-black/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[#ededed]">Top Rated Movies</h3>
            <Calendar className="h-4 w-4 text-[#555]" />
          </div>
          <div className="space-y-3">
            {recentMovies.map((movie) => (
              <div
                key={movie.title}
                className="flex items-center justify-between rounded-lg bg-[#1a1a1a] px-3 py-2.5 transition-colors hover:bg-[#2a2a2a]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-500/10 text-xs font-semibold text-emerald-400">
                    {movie.rating.toFixed(1)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#ededed]">{movie.title}</p>
                    <p className="text-xs text-[#8c8c8c]">{movie.genre} · {movie.year}</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-[#555]">{movie.year}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions Cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { title: "Recent Reviews", desc: "5 new reviews today", icon: Star, count: "12" },
          { title: "New Registrations", desc: "3 new users joined", icon: Users, count: "3" },
          { title: "Pending Approvals", desc: "Movies awaiting review", icon: Film, count: "7" },
        ].map((card) => (
          <div
            key={card.title}
            className="group rounded-xl border border-[#222] bg-[#242424] p-5 transition-all duration-200 hover:border-[#333] hover:bg-[#2a2a2a] hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1a1a1a] text-[#555] transition-colors group-hover:bg-emerald-500/10 group-hover:text-emerald-400">
                <card.icon className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold text-[#ededed]">{card.count}</span>
            </div>
            <p className="text-sm font-medium text-[#ededed]">{card.title}</p>
            <p className="text-xs text-[#8c8c8c]">{card.desc}</p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  )
}