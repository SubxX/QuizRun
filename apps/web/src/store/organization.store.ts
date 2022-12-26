import { supabase } from '@web/supabase/supabaseClient'
import create from 'zustand'

export interface Organization {
    id: string
    created_at: string
    created_by: string
    name: string
    description: string
    logo?: string
    organization_departments: any[]
}

interface OrganizationState {
    data: Organization[]
    loading: boolean
    error: Error | null
    fetch: (user_id: string) => Promise<void>
}

/**
 * @author Subham
 * @purpose To fetch authenticated users created organization from database
 */
export const useGetMyOrganizationStore = create<OrganizationState>()(
    (set) => ({
        data: [],
        loading: true,
        error: null,
        fetch: async (user_id: string) => {
            try {
                set({ loading: true })
                const { data, error } = await supabase.from('organization').select().eq('created_by', user_id)
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