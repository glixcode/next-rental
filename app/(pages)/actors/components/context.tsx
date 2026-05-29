import { createContext, useContext } from "react";

interface ActorsContextType {
    firstName: string;
    setFirstName: React.Dispatch<React.SetStateAction<string>>;
    lastName: string;
    setLastName: React.Dispatch<React.SetStateAction<string>>
    photoUrl: string
    setPhotoUrl: React.Dispatch<React.SetStateAction<string>>
    birthDate: string
    setBirthDate: React.Dispatch<React.SetStateAction<string>>
    saving: boolean
    setSaving: React.Dispatch<React.SetStateAction<boolean>>
    error: string
    setError: React.Dispatch<React.SetStateAction<string>>
}

export const ActorsContext = createContext<ActorsContextType | undefined>(undefined)


export const useActorsContext = () => {
    const context = useContext(ActorsContext)

    if(context === undefined) {
        throw new Error("useActorsContext must be used within an ActorsContextProvider")
    }
    
    return context
}