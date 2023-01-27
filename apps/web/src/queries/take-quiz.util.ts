import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNotifications } from 'reapop'
import { submitQuiz, getQuizSubmission, getQuizSubmissionsByQuizId } from '@web/api/take-quiz.api'
import { useUserQuery } from './auth.queries'


export const SUBMISSION = {
    SINGLE: 'user_quiz_submission',
    ALL: 'quiz_submissions'
} as const

// Queries
export const useGetQuizSubmissionQuery = (quizId: string) => {
    const { data: user } = useUserQuery()
    return useQuery(
        [SUBMISSION.SINGLE, quizId],
        getQuizSubmission.bind(this, user?.id as string, quizId),
        { enabled: Boolean(quizId) }
    )
}

export const useGetQuizSubmissionsQuery = (quizId: string) => {
    return useQuery(
        [SUBMISSION.ALL, quizId],
        getQuizSubmissionsByQuizId.bind(this, quizId),
        { enabled: Boolean(quizId) }
    )
}

// Mutation
export const useSubmitQuizMutation = () => {
    const { notify } = useNotifications();
    const queryClient = useQueryClient()

    return useMutation(submitQuiz, {
        onSuccess: (response) => {
            queryClient.setQueryData([SUBMISSION.SINGLE, response.quiz], response)
            notify(`Quiz submitted successfully!`, 'success');
        }
    })
}