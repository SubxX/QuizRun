import { supabase } from "@web/supabase/supabaseClient";


export async function addDepartmentToOrg(payload: { organization: string; department: string; created_by: string }) {
    const { error, data } = await supabase.from('organization_departments').insert(payload).select('id').single()
    if (error) throw new Error(error.message, { cause: error })
    return data
}

export async function removeDepartmentFromOrg(org_department_id: string) {
    const { error } = await supabase.from('organization_departments').delete().eq('id', org_department_id)
    if (error) throw new Error(error.message, { cause: error })
}