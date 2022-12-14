import { supabase } from '@web/supabase/supabaseClient'
import create from 'zustand'
import { IDepartment } from './department.store'

export interface IOrganization {
    id: string
    created_at?: string
    created_by: string
    name: string
    description: string
    logo?: string
    departments: string[]
}

interface MyOrganizationState {
    data: IOrganization[]
    loading: boolean
    error: Error | null
    fetch: (user_id: string) => Promise<void>
    addOrganization: (newOrg: IOrganization) => void
    removeOrganization: (orgId: string) => void
}

/**
 * @author Subham
 * @purpose To fetch authenticated users created organization from database
 */
export const useGetMyOrganizationStore = create<MyOrganizationState>()(
    (set, get) => ({
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
        },
        addOrganization: (newOrg: IOrganization) => {
            set({ data: [...get().data, newOrg] })
        },
        removeOrganization: (orgId: string) => {
            set({ data: get().data.filter((org) => org.id !== orgId) })
        }
    })
)