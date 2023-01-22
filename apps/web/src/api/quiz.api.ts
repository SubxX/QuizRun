import { supabase } from '@web/supabase/supabaseClient';
import { IQuestion } from './questions.api'

export interface IQuiz {
    id: string
    created_at?: string
    created_by: string
    name: string
    description: string
    department: string
    organization: string
    questions?: IQuestion[]
}

export const createQuiz = async (payload: Omit<IQuiz, 'created_at' | 'id'>): Promise<IQuiz> => {
    const { data, error } = await supabase
        .from('quiz')
        .insert(payload)
        .select()
        .single()
    if (error) throw new Error(error.message, { cause: error });
    return data;
};

export const getQuizesByOrganization = async (orgId: string): Promise<IQuiz[]> => {
    const { data, error } = await supabase
        .from('quiz')
        .select(`*, questions (*)`)
        .eq('organization', orgId)
    if (error) throw new Error(error.message, { cause: error });
    if (!data) throw new Error('404');

    return data;
};

export const updateQuiz = async (payload: Omit<IQuiz, 'created_at' | 'created_by'>): Promise<IQuiz> => {
    const { id, ...rest } = payload
    const { data, error } = await supabase
        .from('quiz')
        .update(rest)
        .eq('id', id)
        .select()
        .single()
    if (error) throw new Error(error.message, { cause: error });
    return data;
};