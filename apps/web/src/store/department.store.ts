import { supabase } from '@web/supabase/supabaseClient'
import create from 'zustand'

export interface IDepartment {
    id: string
    created_at: string
    description: string
    image?: string
    name: string
}

interface DepartmentState {
    data: IDepartment[]
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