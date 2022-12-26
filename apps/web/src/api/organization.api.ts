import { Organization } from '@web/store/organization.store';
import { supabase } from '@web/supabase/supabaseClient';

export const getOrganizationDetails = async (id: string): Promise<Organization[]> => {
    const { data, error } = await supabase
        .from('organization')
        .select(`*,
        organization_departments (
            department_id(
                *
            )
          )`)
        .eq('id', id);
    if (error) throw new Error(error.message, { cause: error });
    return data
};

export const getAllOrganizations = async (): Promise<Organization[]> => {
    const { data, error } = await supabase
        .from('organization')
        .select()
    if (error) throw new Error(error.message, { cause: error });
    return data;
};