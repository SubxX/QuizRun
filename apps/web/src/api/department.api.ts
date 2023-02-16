import { supabase } from "@web/modules/supabaseClient";

export interface IDepartment {
    id: string
    created_at: string
    description: string
    image?: string
    name: string
}

export async function getAllDepartments(): Promise<IDepartment[]> {
    const { data, error } = await supabase.from('department').select()
    if (error) throw new Error(error.message, { cause: error })
    return data
}