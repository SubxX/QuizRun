import { supabase } from '@web/modules/supabaseClient';
import { IQuestion } from './questions.api'
import { IOrganization } from './organization.api';

export interface IQuiz {
    id: string
    created_at?: string
    created_by: string
    name: string
    description: string
    department: string
    organization: string | Partial<IOrganization>
    questions?: IQuestion[]
}

export const createQuiz = async (payload: Omit<IQuiz, 'created_at' | 'id'>): Promise<IQuiz> => {
    const { data, error } = await supabase
        .from('quizzes')
        .insert(payload)
        .select()
        .single()
    if (error) throw new Error(error.message, { cause: error });
    return data;
};

export const getQuizById = async (id: string): Promise<IQuiz> => {
    const { data, error } = await supabase
        .from('quizzes')
        .select(`*, questions (*), organization (id,name)`)
        .eq('id', id)
        .single()
    if (error) throw new Error(error.message, { cause: error });
    if (!data) throw new Error('404');

    return data;
};

export const updateQuiz = async (payload: Omit<IQuiz, 'created_at' | 'created_by'>): Promise<IQuiz> => {
    const { id, ...rest } = payload
    const { data, error } = await supabase
        .from('quizzes')
        .update(rest)
        .eq('id', id)
        .select()
        .single()
    if (error) throw new Error(error.message, { cause: error });
    return data;
};

export const getAllQuizes = async (filters?: any): Promise<IQuiz[]> => {
    const { data, error } = await supabase
        .from('quizzes')
        .select(`*, questions (*), organization(id,name)`)
    if (error) throw new Error(error.message, { cause: error });
    if (!data) throw new Error('404');

    return data;
}

type DeleteQuizPayload = { id: string; organization: string }
export const deleteQuiz = async (payload: DeleteQuizPayload): Promise<DeleteQuizPayload> => {
    const { error } = await supabase
        .from('quizzes')
        .delete()
        .eq('id', payload.id)

    if (error) throw new Error(error.message, { cause: error });
    return payload;
};