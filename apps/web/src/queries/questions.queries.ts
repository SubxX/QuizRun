import { useMutation, useQuery, useQueryClient, UseQueryOptions } from 'react-query'
import { getQuestionsByQuiz, createQuestion, updateQuestion, IQuestion, deleteQuestion, updateQuestionsOrder } from '@web/api/questions.api'
import { useNotifications } from 'reapop'

export const QUESTION = {
    QUIZ_QUESTIONS: 'quiz_questions'
} as const


// Queries
export const useGetQuestionsByQuizQuery = (quizId: string, options?: UseQueryOptions<IQuestion[]>) =>
    useQuery<IQuestion[]>(
        [QUESTION.QUIZ_QUESTIONS, quizId],
        getQuestionsByQuiz.bind(this, quizId),
        { enabled: Boolean(quizId), ...options }
    )

// Mutation
export const useCreateQuestionMutation = () => {
    const queryClient = useQueryClient()
    const { notify } = useNotifications();

    return useMutation(createQuestion, {
        onSuccess: (qs) => {
            notify(`Question created successfully!`, 'success');
            queryClient.setQueryData<IQuestion[]>([QUESTION.QUIZ_QUESTIONS, qs.quiz], (prev = []) => ([...prev, qs]))
        }
    })
}
export const useUpdateQuestionMutation = () => {
    const queryClient = useQueryClient()
    const { notify } = useNotifications();

    return useMutation(updateQuestion, {
        onSuccess: (qs) => {
            notify(`Question updated successfully!`, 'success');
            queryClient.setQueryData<IQuestion[]>([QUESTION.QUIZ_QUESTIONS, qs.quiz],
                (prev = []) => prev.map((p) => p.id === qs.id ? qs : p)
            )
        }
    })
}
export const useDeleteQuestionMutation = () => {
    const queryClient = useQueryClient()
    const { notify } = useNotifications();

    return useMutation(deleteQuestion, {
        onSuccess: (qs) => {
            notify(`Question deleted successfully!`, 'success');
            queryClient.setQueryData<IQuestion[]>([QUESTION.QUIZ_QUESTIONS, qs.quiz],
                (prev = []) => prev.filter((p) => p.id !== qs.id)
            )
        }
    })
}

export const useUpdateQuestionsOrderMutation = () => {
    const queryClient = useQueryClient()
    const { notify } = useNotifications();

    return useMutation(updateQuestionsOrder, {
        onSuccess: (questions) => {
            notify(`Questions order updated successfully!`, 'success');
            const quiz = questions?.[0]?.quiz
            if (!quiz) return
            queryClient.setQueryData<IQuestion[]>([QUESTION.QUIZ_QUESTIONS, quiz], questions)
        }
    })
}