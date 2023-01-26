import { supabase } from '@web/supabase/supabaseClient';

export interface IOrganization {
    id: string
    created_at?: string
    created_by: string
    name: string
    description: string
    logo?: string
}

export const getOrganizationDetails = async (id: string): Promise<IOrganization> => {
    const { data: organization, error } = await supabase
        .from('organization')
        .select()
        .eq('id', id)
        .single()

    if (error) throw new Error(error.message, { cause: error });
    if (!organization) throw new Error('404');

    return organization
};

export const getAllOrganizations = async (): Promise<IOrganization[]> => {
    const { data, error } = await supabase
        .from('organization')
        .select()
    if (error) throw new Error(error.message, { cause: error });
    return data;
};

export const createOrganization = async (payload: Omit<IOrganization, 'created_at' | 'id'>): Promise<IOrganization> => {
    const { data, error } = await supabase
        .from('organization')
        .insert(payload)
        .select()
        .single()
    if (error) throw new Error(error.message, { cause: error });
    return data;
};

export const editOrganization = async (payload: Omit<IOrganization, 'created_at' | 'created_by'>): Promise<IOrganization> => {
    const { id, ...rest } = payload
    const { data, error } = await supabase
        .from('organization')
        .update(rest)
        .eq('id', id)
        .select()
        .single()
    if (error) throw new Error(error.message, { cause: error });
    return data;
};

export const deleteOrganization = async (orgId: string): Promise<string> => {
    const { error } = await supabase
        .from('organization')
        .delete()
        .eq('id', orgId)

    if (error) throw new Error(error.message, { cause: error });
    return orgId;
};

export const getMyOrganizations = async (user_id: string): Promise<IOrganization[]> => {
    const { data, error } = await supabase.from('organization').select().eq('created_by', user_id)
    if (error) throw new Error(error?.message, { cause: error })
    return data
}