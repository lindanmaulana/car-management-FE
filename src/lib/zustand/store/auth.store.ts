import {create} from "zustand"

interface Profile {
     _id: string
    name: string
    role: "admin" | "user" | null
}

interface authState {
    profile: Profile,
    token: string
}

interface authAction {
    setProfile: (profile: Profile) => void
    setToken: (token: string) => void
}

export const useStoreAuth = create<authState & authAction>((set) => ({
    profile: {
        _id: "",
        name: "",
        role: null
    },
    token: "",
    setProfile: (profile) => set(() => ({profile: {_id: profile._id, name: profile.name, role: profile.role}})),
    setToken: (token) => set(() => ({token}))
}))