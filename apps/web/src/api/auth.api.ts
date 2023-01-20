import { supabase } from '@web/supabase/supabaseClient'

export const getUser = async () => {
    const { error, data: { session } } = await supabase.auth.getSession();

    if (error) throw new Error(error.message, { cause: error });
    if (!session) throw new Error('401');

    return session.user
}