'use client'
import { IActor } from "@/types/movie"
import { useState, useEffect } from "react"
import { X } from "lucide-react"
import defaultImage from "@/public/imageDefault.png"
import ModalFields from "./modal-fields"
import { ActorsContext } from "./context"

interface EditActorModalProps {
  actor: IActor | null
  isOpen: boolean
  addNew: boolean 
  onClose: () => void
  onSaved: () => void
}

const ActorModal = ({ actor, isOpen, onClose, onSaved, addNew }: EditActorModalProps) => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [photoUrl, setPhotoUrl] = useState(defaultImage.src)
  const [birthDate, setBirthDate] = useState("")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (addNew) {
      // Reset fields when adding a new actor
      setFirstName("")
      setLastName("")
      setPhotoUrl(defaultImage.src)
      setBirthDate("")
      setError("")
    } else if (actor) {
      // Populate fields when editing an existing actor
      setFirstName(actor.firstName)
      setLastName(actor.lastName)
      setPhotoUrl(actor.photoUrl || defaultImage.src)
      setBirthDate(actor.birthDate ? actor.birthDate.split("T")[0] : "")
      setError("")
    }
  }, [actor, addNew])

  if (!isOpen) return null

  const handleSave = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      setError("First name and last name are required.")
      return
    }

    setSaving(true)
    setError("")

    try {
      const url = addNew ? `/api/actors` : `/api/actors/${actor?.id}`
      const method = addNew ? "POST" : "PATCH"

      const res = await fetch(url, {
        method,
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
        throw new Error(data.error || "Failed to save actor")
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
    <ActorsContext.Provider value= {
      { firstName, setFirstName, lastName, setLastName, photoUrl, setPhotoUrl, birthDate, setBirthDate, saving, setSaving, error, setError }
    }>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

        {/* Modal */}
        <div className="relative w-full max-w-md rounded-xl border border-[#222] bg-[#242424] p-6 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#222] pb-4">
            <h3 className="text-lg font-semibold text-[#ededed]">{!actor ? "Add" : "Edit"} Actor</h3>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-[#555] transition-colors hover:bg-[#333] hover:text-[#ededed]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <ModalFields/>
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
    </ActorsContext.Provider>
  )
}

export default ActorModal