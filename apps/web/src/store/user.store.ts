import { supabase } from '@web/supabase/supabaseClient'
import create from 'zustand'

interface UserState {
    user: any
    loading: boolean
    error: Error | null
    set: (user: any) => void
    clear: () => void
    checkSession: () => Promise<void>
}

export const useUserStore = create<UserState>()(
    (set) => ({
        user: {},
        loading: true,
        error: null,
        set: (user: any) => set({ user }),
        clear: () => set({ user: null }),
        checkSession: async () => {
            try {
                set({ loading: true })
                const { error, data: { session } } = await supabase.auth.getSession();

                if (error) throw new Error(error.name, { cause: error });
                if (!session) throw new Error("401");
                set({ error: null })
            } catch (error: any) {
                set({ error: error as Error, ...(error?.message === '401' ? { user: null } : {}) })
            } finally {
                set({ loading: false })
            }
        }
    })
)