import { supabase } from '@web/modules/supabaseClient';

type IAnswer = { value: string }

export type IQuestion = {
    id: string
    created_at?: string
    created_by: string
    quiz: string
    name: string;
    description?: string;
    correctAnswer: number
    answers: IAnswer[];
    order?: number
};

export const getQuestionsByQuiz = async (quizId: string): Promise<IQuestion[]> => {
    const { data, error } = await supabase
        .from('questions')
        .select()
        .eq('quiz', quizId)
        .order('order', { ascending: true })
    if (error) throw new Error(error.message, { cause: error });
    return data;
};

export const createQuestion = async (payload: Omit<IQuestion, | 'id'>): Promise<IQuestion> => {
    const { data, error } = await supabase
        .from('questions')
        .insert(payload)
        .select()
        .single()
    if (error) throw new Error(error.message, { cause: error });
    return data;
};

export const updateQuestion = async (payload: Omit<IQuestion, | 'quiz'>): Promise<IQuestion> => {
    const { id, ...rest } = payload
    const { data, error } = await supabase
        .from('questions')
        .update(rest)
        .eq('id', id)
        .select()
        .single()
    if (error) throw new Error(error.message, { cause: error });
    return data;
};

type DeleteQuestionPayload = { id: string; quiz: string }
export const deleteQuestion = async (payload: DeleteQuestionPayload): Promise<DeleteQuestionPayload> => {
    const { error } = await supabase
        .from('questions')
        .delete()
        .eq('id', payload.id)
    if (error) throw new Error(error.message, { cause: error });
    return payload;
};


export const updateQuestionsOrder = async (payload: IQuestion[]): Promise<IQuestion[]> => {
    const { data, error } = await supabase
        .from('questions')
        .upsert(payload.map(({ id, created_by, quiz }, idx) => ({ id, created_by, quiz, order: idx + 1 })))
        .select()
        .order('order', { ascending: true })
    if (error) throw new Error(error.message, { cause: error });
    return data
};