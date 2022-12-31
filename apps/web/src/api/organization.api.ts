import { IOrganization } from '@web/store/organization.store';
import { supabase } from '@web/supabase/supabaseClient';

export const getOrganizationDetails = async (id: string): Promise<IOrganization> => {
    const { data: organization, error } = await supabase
        .from('organization')
        .select(`*, 
            organization_departments (
                id, 
                department( 
                    name,
                    description,
                    image,
                    id
                ) 
            )`
        )
        .eq('id', id)
        .single()

    if (error) throw new Error(error.message, { cause: error });
    if (!organization) throw new Error('404');


    // Mapping department data
    const format = (d: any) => ({ dep_id: d.department.id, ...d.department, id: d.id, })
    organization.departments = organization.organization_departments.map(format)
    delete organization.organization_departments

    return organization as any
};

export const getAllOrganizations = async (): Promise<IOrganization[]> => {
    const { data, error } = await supabase
        .from('organization')
        .select()
    if (error) throw new Error(error.message, { cause: error });
    return data;
};

export const createOrganization = async (payload: Omit<IOrganization, 'departments' | 'created_at' | 'id'>): Promise<IOrganization> => {
    const { data, error } = await supabase
        .from('organization')
        .insert(payload)
        .select()
        .single()
    if (error) throw new Error(error.message, { cause: error });
    return data;
};

export const deleteOrganization = async (orgId: string): Promise<boolean> => {
    const { error } = await supabase
        .from('organization')
        .delete()
        .eq('id', orgId)

    if (error) throw new Error(error.message, { cause: error });
    return true;
};