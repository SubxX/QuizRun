import { useMutation, useQuery } from 'react-query'
import { createQuiz, IQuiz, updateQuiz, getQuizById, getAllQuizes, deleteQuiz } from '@web/api/quiz.api'
import { useNotifications } from 'reapop'
import { ORGANIZATION } from './organization.query'
import { IOrganization } from '@web/api/organization.api'
import { queryClient } from '@web/modules/queryClient'

export const QUIZ = {
    ALL_QUIZES: 'all_quizes',
    SINGLE: 'single_quiz'
} as const


// Utils
const updateOrganization = (quiz: Partial<IQuiz>, type: 'add' | 'update' | 'delete') => {
    const prev = queryClient.getQueryData<IOrganization>([ORGANIZATION.DETAILS, quiz.organization])
    if (!prev) return

    const prevQuizzes = (prev?.quizzes ?? [])
    const quizzes = type === 'delete' ? prevQuizzes.filter(q => q.id !== quiz.id) :
        type === 'add' ? [...prevQuizzes, quiz] : prevQuizzes.map((p) => p.id === quiz.id ? quiz : p)

    queryClient.setQueryData([ORGANIZATION.DETAILS, quiz.organization], (prev) => ({ ...(prev ?? {}), quizzes }))
}


// Queries
export const useGetAllQuizs = (filters?: any) => useQuery(
    QUIZ.ALL_QUIZES,
    getAllQuizes.bind(this, filters)
)

export const useGetQuizByIdQuery = (id: string) => useQuery(
    [QUIZ.SINGLE, id],
    getQuizById.bind(this, id),
    { enabled: Boolean(id) }
)

// Mutation
export const useCreateQuizMutation = () => {
    const { notify } = useNotifications();
    return useMutation(createQuiz, {
        onSuccess: (quiz) => {
            notify(`Quiz created successfully!`, 'success');
            updateOrganization(quiz, 'add')
        }
    })
}
export const useUpdateQuizMutation = () => {
    const { notify } = useNotifications();
    return useMutation(updateQuiz, {
        onSuccess: (quiz) => {
            notify(`Quiz updated successfully!`, 'success');
            updateOrganization(quiz, 'update')
        }
    })
}


export const useDeleteQuizMutation = () => {
    const { notify } = useNotifications();
    return useMutation(deleteQuiz, {
        onSuccess: (quiz) => {
            notify(`Quiz deleted successfully!`, 'success');
            updateOrganization(quiz, 'delete')
        }
    })
}