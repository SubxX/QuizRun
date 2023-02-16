import { supabase } from '@web/modules/supabaseClient'

interface IUserProfile {
    id: string;
    name: string;
    email: string;
    created_at: string;
    profile_pic: string | null;
}

export const getProfile = async (id: string): Promise<IUserProfile> => {
    const { data, error } = await supabase.from('profile').select().eq('id', id).single()
    if (error) throw new Error(error.message, { cause: error });
    return data
}

export const getUser = async () => {
    const { error, data: { session } } = await supabase.auth.getSession();

    if (error) throw new Error(error.message, { cause: error });
    if (!session) throw new Error('401');

    const profile = await getProfile(session.user.id)

    return profile
}
