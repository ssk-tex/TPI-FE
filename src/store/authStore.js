import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
    persist(
        (set) => ({
            userData: null,
            login: (u) => set({userData:u}),
            logout: () => set({userData:null}) 
        }),
        {
            name: "auth-storage"
        }
    )
);