'use client'
import {IActor} from "@/types/movie"
import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Users, UserPlus, CalendarDays, Star, Search, Pencil, Trash2 } from "lucide-react"
import ActorCards from "./actor-cards"
import EditActorModal from "./edit-actor-modal"
import DeleteActorModal from "./delete-actor-modal"

const summaryCards = [
  { label: "Total Actors", value: "1,482", change: "+18", icon: Users, color: "emerald" },
  { label: "New This Month", value: "24", change: "+5", icon: UserPlus, color: "blue" },
  { label: "With Movies", value: "1,203", change: "81%", icon: Star, color: "amber" },
  { label: "Joined This Year", value: "156", change: "+32", icon: CalendarDays, color: "purple" },
]

const ActorsTable = ({actors}: {actors: IActor[]}) => {
  const [search, setSearch] = useState("")
  const [editingActor, setEditingActor] = useState<IActor | null>(null)
  const [deletingActor, setDeletingActor] = useState<IActor | null>(null)
  const router = useRouter()

  const handleSaved = useCallback(() => {
    router.refresh()
  }, [router])

  const handleDeleted = useCallback(() => {
    router.refresh()
  }, [router])

  const filteredActors = actors.filter((actor) => {
    const fullName = `${actor.firstName} ${actor.lastName}`.toLowerCase()
    return fullName.includes(search.toLowerCase())
  })

  return (
  <>
    {/* <button className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-emerald-400 cursor-pointer">Add New</button> */}
    
    <div className="mt-2 flex gap-6 ">
      {/* Summary Cards - right column on large screens */}
      <div className="order-1 flex flex-col justify-between lg:order-2 lg:w-72">
        {summaryCards.map((card) => {
          return (
            <ActorCards key={card.label} {...card} />
          )
        })}
      </div>

      {/* Table - left column, fills remaining space */}
      <div className="order-2 min-w-0 flex-1 lg:order-1">
        <div className="rounded-xl border border-[#222] bg-[#242424] transition-all duration-200 hover:border-[#333] hover:shadow-lg hover:shadow-black/20">
          {/* Table header with search */}
          <div className="flex flex-col gap-4 border-b border-[#222] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-semibold text-[#ededed]">All Actors</h3>
              <p className="text-xs text-[#8c8c8c] mt-0.5">
                {filteredActors.length} of {actors.length} actors
              </p>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#555]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search actors..."
                className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] py-2 pl-9 pr-3 text-sm text-[#ededed] placeholder-[#555] outline-none transition-all duration-200 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10"
              />
            </div>
          </div>

          {/* Scrollable Table */}
          <div className="max-h-170 overflow-y-auto">
            <table className="w-full">
              <thead className="sticky top-0 bg-[#242424]">
                <tr className="border-b border-[#222]">
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#555]">Actor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#555]">First Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#555]">Last Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#555]">Birth Date</th>
                  <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-[#555]">Movies</th>
                  <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-[#555]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#222]">
                {filteredActors.map((actor) => (
                  <tr
                    key={actor.id}
                    className="transition-colors hover:bg-[#1c1c1c]"
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 overflow-hidden rounded-full border border-emerald-400 p-1">
                          {actor.photoUrl ? (
                            <img
                              src={actor.photoUrl}
                              alt={`${actor.firstName} ${actor.lastName}`}
                              className="h-full w-full rounded-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center rounded-full bg-[#333] text-2xl font-semibold text-[#ededed]">
                              {actor.firstName.charAt(0)}
                              {actor.lastName.charAt(0)}
                            </div>
                          )}
                        </div>
                        <span className="text-sm font-medium text-[#ededed]">
                          {actor.firstName} {actor.lastName}
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-[#8c8c8c]">{actor.firstName}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-[#8c8c8c]">{actor.lastName}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-[#8c8c8c]">
                      --
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                        {actor.movieCount}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setEditingActor(actor)}
                          className="rounded-lg p-1.5 text-[#555] transition-colors hover:bg-[#333] hover:text-emerald-400"
                          title="Edit actor"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeletingActor(actor)}
                          className="rounded-lg p-1.5 text-[#555] transition-colors hover:bg-[#333] hover:text-red-400"
                          title="Delete actor"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredActors.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-sm text-[#555]">
                      No actors found matching &ldquo;{search}&rdquo;
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <EditActorModal
        actor={editingActor}
        isOpen={editingActor !== null}
        onClose={() => setEditingActor(null)}
        onSaved={handleSaved}
      />

      {/* Delete Modal */}
      <DeleteActorModal
        actor={deletingActor}
        isOpen={deletingActor !== null}
        onClose={() => setDeletingActor(null)}
        onDeleted={handleDeleted}
      />
    </div>
  </>
  )
}

export default ActorsTable