import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getQuestionsByQuiz, createQuestion, updateQuestion, IQuestion } from '@web/api/questions.api'

export const QUESTION = {
    QUIZ_QUESTIONS: 'quiz_questions'
} as const


// Queries
export const useGetQuestionsByQuizQuery = (quizId: string) => useQuery(
    [QUESTION.QUIZ_QUESTIONS, quizId],
    getQuestionsByQuiz.bind(this, quizId),
    { enabled: Boolean(quizId) }
)

// Mutation
export const useCreateQuestionMutation = () => {
    const queryClient = useQueryClient()
    return useMutation(createQuestion, {
        onSuccess: (qs) => {
            queryClient.setQueryData<IQuestion[]>([QUESTION.QUIZ_QUESTIONS, qs.quiz], (prev = []) => ([...prev, qs]))
        }
    })
}
export const useUpdateQuestionMutation = () => {
    const queryClient = useQueryClient()
    return useMutation(updateQuestion, {
        onSuccess: (qs) => {
            queryClient.setQueryData<IQuestion[]>([QUESTION.QUIZ_QUESTIONS, qs.quiz],
                (prev = []) => prev.map((p) => p.id === qs.id ? qs : p)
            )
        }
    })
}