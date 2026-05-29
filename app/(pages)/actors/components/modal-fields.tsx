"use client"
import InputField from "./input-field"
import { useActorsContext } from "./context"
const ModalFields = () => {
  const context = useActorsContext()

  return (
    <>
        <div className="flex justify-center py-4">
            <div className="h-30 w-30 overflow-hidden rounded-full border-2 border-emerald-500 p-1">
                {context.photoUrl ? (
                    <img
                        src={context.photoUrl}
                        alt={`${context.firstName} ${context.lastName}`}
                        className="h-full w-full rounded-full object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-[#333] text-2xl font-semibold text-[#ededed]">
                        {context.firstName.charAt(0)}
                        {context.lastName.charAt(0)}
                    </div>
                )}
            </div>
        </div>
        {/* Form */}
        <div className="mt-4 space-y-4">
            <InputField value={context.firstName} onChange={context.setFirstName} placeholder="Enter first name" label="First Name" type="text"/>
            <InputField value={context.lastName} onChange={context.setLastName} placeholder="Enter last name" label="Last Name" type="text"/>
            <InputField value={context.birthDate} onChange={context.setBirthDate} placeholder="" label="Birth Date" type="date"/>
            <InputField value={context.photoUrl} onChange={context.setPhotoUrl} placeholder="" label="Photo Url" type="text"/>
            {context.error && (
                <p className="text-sm text-red-400">{context.error}</p>
            )}
        </div>
    </>
  )
}

export default ModalFields

