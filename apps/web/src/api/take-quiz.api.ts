import { supabase } from '@web/supabase/supabaseClient';
import { IQuiz } from './quiz.api';

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

export const getQuizSubmission = async (userId: string, quizId: string): Promise<IQuizSubmission | null> => {
    const { data, error } = await supabase
        .from('leaderboard')
        .select()
        .eq('quiz', quizId)
        .eq('user', userId)
        .single()

    if (error?.code === 'PGRST116') return null // It means there no data
    if (error) throw new Error(error.message, { cause: error });
    return data;
};

export const getQuizSubmissionsByQuizId = async (quizId: string): Promise<IQuizSubmission[]> => {
    const { data, error } = await supabase
        .from('leaderboard')
        .select(`*, profile(*)`)
        .eq('quiz', quizId)
    if (error) throw new Error(error.message, { cause: error });
    return data;
};