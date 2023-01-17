import { useQuery } from 'react-query'
import { getUser } from '@web/api/auth.api'

export const USER_KEY = 'QUIZRUN_USER'
export const useUserQuery = () => useQuery(USER_KEY, getUser)