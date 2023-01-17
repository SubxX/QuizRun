import { getAllDepartments } from '@web/api/department.api'
import { useQuery } from 'react-query'


export const DEPARTMENTS_KEY = 'DEPARTMENTS'
export const useDepartmentsQuery = () => useQuery(DEPARTMENTS_KEY, getAllDepartments)