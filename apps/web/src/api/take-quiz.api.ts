import { supabase } from '@web/supabase/supabaseClient';

export interface IQuizSubmission {
    quiz: string;
    user: string;
    correct: number;
    incorrect: number;
    created_at?: string;
    id?: string
}

export const submitQuiz = async (payload: Omit<IQuizSubmission, 'created_at' | 'id'>): Promise<IQuizSubmission> => {
    const { data, error } = await supabase
        .from('leaderboard')
        .insert(payload)
        .select()
        .single()
    if (error) throw new Error(error.message, { cause: error });
    return data;
};

export const getQuizSubmission = async (userId: string, quizId: string): Promise<IQuizSubmission> => {
    const { data, error } = await supabase
        .from('leaderboard')
        .select()
        .eq('quiz', quizId)
        .eq('user', userId)
        .single()
    if (error) throw new Error(error.message, { cause: error });
    return data;
};