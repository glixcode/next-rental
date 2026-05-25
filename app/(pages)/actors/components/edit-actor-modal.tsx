'use client'
import { IActor } from "@/types/movie"
import { useState, useEffect } from "react"
import { X } from "lucide-react"
import defaultImage from "@/public/imageDefault.png"

interface EditActorModalProps {
  actor: IActor | null
  isOpen: boolean
  onClose: () => void
  onSaved: () => void
}

const EditActorModal = ({ actor, isOpen, onClose, onSaved }: EditActorModalProps) => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [photoUrl, setPhotoUrl] = useState(defaultImage.src)
  const [birthDate, setBirthDate] = useState("")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    console.log(actor)
    if (actor) {
      setFirstName(actor.firstName)
      setLastName(actor.lastName)
      setPhotoUrl(actor.photoUrl || defaultImage.src)
      setBirthDate(actor.birthDate ? actor.birthDate.split("T")[0] : "")
      setError("")
    }
  }, [actor])

  if (!isOpen || !actor) return null

  const handleSave = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      setError("First name and last name are required.")
      return
    }

    setSaving(true)
    setError("")

    try {
      const res = await fetch(`/api/actors/${actor.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          photoUrl: photoUrl.trim(),
          birthDate: birthDate || null,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to update actor")
      }

      onSaved()
      onClose()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-xl border border-[#222] bg-[#242424] p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#222] pb-4">
          <h3 className="text-lg font-semibold text-[#ededed]">Edit Actor</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#555] transition-colors hover:bg-[#333] hover:text-[#ededed]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex justify-center py-4">
            <div className="h-30 w-30 overflow-hidden rounded-full border-2 border-emerald-500 p-1">
                {actor.photoUrl ? (
                    <img
                        src={photoUrl}
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
        </div>
        {/* Form */}
        <div className="mt-4 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#8c8c8c]">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-[#ededed] placeholder-[#555] outline-none transition-all duration-200 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10"
              placeholder="Enter first name"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#8c8c8c]">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-[#ededed] placeholder-[#555] outline-none transition-all duration-200 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10"
              placeholder="Enter last name"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#8c8c8c]">Birth Date</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-[#ededed] outline-none transition-all duration-200 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#8c8c8c]">Photo URL</label>
            <input
              type="text"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-[#ededed] outline-none transition-all duration-200 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
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
            onClick={handleSave}
            disabled={saving}
            className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditActorModal