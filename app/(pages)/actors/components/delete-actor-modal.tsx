'use client'
import { IActor } from "@/types/movie"
import { useState } from "react"
import { X, AlertTriangle } from "lucide-react"

interface DeleteActorModalProps {
  actor: IActor | null
  isOpen: boolean
  onClose: () => void
  onDeleted: () => void
}

const DeleteActorModal = ({ actor, isOpen, onClose, onDeleted }: DeleteActorModalProps) => {
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState("")

  if (!isOpen || !actor) return null

  const handleDelete = async () => {
    setDeleting(true)
    setError("")

    try {
      const res = await fetch(`/api/actors/${actor.id}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to delete actor")
      }

      onDeleted()
      onClose()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-sm rounded-xl border border-[#222] bg-[#242424] p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-[#ededed]">Delete Actor</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#555] transition-colors hover:bg-[#333] hover:text-[#ededed]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="mt-2">
          <p className="text-sm text-[#8c8c8c]">
            Are you sure you want to delete{" "}
            <span className="font-medium text-[#ededed]">
              {actor.firstName} {actor.lastName}
            </span>
            ? This action cannot be undone.
          </p>

          {error && (
            <p className="mt-3 text-sm text-red-400">{error}</p>
          )}
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3 border-t border-[#222] pt-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-[#333] px-4 py-2 text-sm font-medium text-[#8c8c8c] transition-colors hover:bg-[#333] hover:text-[#ededed]"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteActorModal