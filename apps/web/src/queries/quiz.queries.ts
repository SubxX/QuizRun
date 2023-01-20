import { useMutation, useQuery, useQueryClient } from 'react-query'
import { createQuiz, IQuiz, getQuizesByOrganization, updateQuiz } from '@web/api/quiz.api'

export const QUIZ = {
    ORGANIZATION_QUIZES: 'organization_quiz'
} as const


// Queries
export const useGetQuizesByOrgQuery = (orgId: string) => useQuery(
    [QUIZ.ORGANIZATION_QUIZES, orgId],
    getQuizesByOrganization.bind(this, orgId),
    { enabled: Boolean(orgId) }
)

// Mutation
export const useCreateQuizMutation = () => {
    const queryClient = useQueryClient()
    return useMutation(createQuiz, {
        onSuccess: (quiz) => {
            queryClient.setQueryData<IQuiz[]>([QUIZ.ORGANIZATION_QUIZES, quiz.organization], (prev = []) => ([...prev, quiz]))
        }
    })
}
export const useUpdateQuizMutation = () => {
    const queryClient = useQueryClient()
    return useMutation(updateQuiz, {
        onSuccess: (quiz) => {
            queryClient.setQueryData<IQuiz[]>([QUIZ.ORGANIZATION_QUIZES, quiz.organization],
                (prev = []) => prev.map((p) => p.id === quiz.id ? quiz : p)
            )
        }
    })
}