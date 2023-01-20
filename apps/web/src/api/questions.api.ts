import { supabase } from '@web/supabase/supabaseClient';

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
};


export const createQuestion = async (payload: Omit<IQuestion, | 'id'>): Promise<IQuestion> => {
    const { data, error } = await supabase
        .from('question')
        .insert(payload)
        .select()
        .single()
    if (error) throw new Error(error.message, { cause: error });
    return data;
};

export const updateQuestion = async (payload: IQuestion): Promise<IQuestion> => {
    const { id, ...rest } = payload
    const { data, error } = await supabase
        .from('question')
        .update(rest)
        .eq('id', id)
        .select()
        .single()
    if (error) throw new Error(error.message, { cause: error });
    return data;
};

export const getQuestionsByQuiz = async (quizId: string): Promise<IQuestion[]> => {
    const { data, error } = await supabase
        .from('question')
        .select()
        .eq('quiz', quizId)
    if (error) throw new Error(error.message, { cause: error });
    return data;
};