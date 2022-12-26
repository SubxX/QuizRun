import { supabase } from '@web/supabase/supabaseClient'
import create from 'zustand'

interface Department {
    created_at: string
    description: string
    id: string
    image?: string
    name: string
}

interface DepartmentState {
    data: Department[]
    loading: boolean
    error: Error | null
    fetch: () => Promise<void>
}

/**
 * @author Subham
 * @purpose To fetch the predefined departments from database
 */
export const useDepartmentStore = create<DepartmentState>()(
    (set, get) => ({
        data: [],
        loading: true,
        error: null,
        fetch: async () => {
            if (get().data.length) return
            try {
                set({ loading: true })
                const { data, error } = await supabase.from('department').select()
                if (error) throw new Error(error?.message, { cause: error })
                set({ data, error: null })
            } catch (error: any) {
                set({ error })
            } finally {
                set({ loading: false })
            }
        }
    })
)