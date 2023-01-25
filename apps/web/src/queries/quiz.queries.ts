import { useMutation, useQuery, useQueryClient } from 'react-query'
import { createQuiz, IQuiz, getQuizesByOrganization, updateQuiz, getQuizById } from '@web/api/quiz.api'
import { useNotifications } from 'reapop'

export const QUIZ = {
    ORGANIZATION_QUIZES: 'organization_quizes',
    SINGLE: 'single_quiz'
} as const


// Queries
export const useGetQuizesByOrgQuery = (orgId: string) => useQuery(
    [QUIZ.ORGANIZATION_QUIZES, orgId],
    getQuizesByOrganization.bind(this, orgId),
    { enabled: Boolean(orgId) }
)

export const useGetQuizByIdQuery = (id: string) => useQuery(
    [QUIZ.SINGLE, id],
    getQuizById.bind(this, id),
    { enabled: Boolean(id) }
)

// Mutation
export const useCreateQuizMutation = () => {
    const queryClient = useQueryClient()
    const { notify } = useNotifications();

    return useMutation(createQuiz, {
        onSuccess: (quiz) => {
            notify(`Quiz created successfully!`, 'success');
            queryClient.setQueryData<IQuiz[]>([QUIZ.ORGANIZATION_QUIZES, quiz.organization], (prev = []) => ([...prev, quiz]))
        }
    })
}
export const useUpdateQuizMutation = () => {
    const queryClient = useQueryClient()
    const { notify } = useNotifications();

    return useMutation(updateQuiz, {
        onSuccess: (quiz) => {
            notify(`Quiz updated successfully!`, 'success');
            queryClient.setQueryData<IQuiz[]>([QUIZ.ORGANIZATION_QUIZES, quiz.organization],
                (prev = []) => prev.map((p) => p.id === quiz.id ? quiz : p)
            )
        }
    })
}
