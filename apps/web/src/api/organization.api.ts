import { IOrganization } from '@web/store/organization.store';
import { supabase } from '@web/supabase/supabaseClient';

export const getOrganizationDetails = async (id: string): Promise<IOrganization> => {
    const { data, error } = await supabase
        .from('organization')
        .select(`*,
        organization_departments (
            department_id(
                *
            )
          )`)
        .eq('id', id);
    const organization = data?.[0]

    if (error) throw new Error(error.message, { cause: error });
    if (!organization) throw new Error('404');

    // Mapping department data
    organization.departments = organization.organization_departments.map((d: any) => d?.department_id)
    delete organization.organization_departments

    return organization
};

export const getAllOrganizations = async (): Promise<IOrganization[]> => {
    const { data, error } = await supabase
        .from('organization')
        .select()
    if (error) throw new Error(error.message, { cause: error });
    return data;
};