import { getAllOrganizations, getMyOrganizations, createOrganization, deleteOrganization, editOrganization, getOrganizationDetails, IOrganization } from '@web/api/organization.api'
import { useMutation, useQuery, useQueryClient } from 'react-query'


export const ORGANIZATION = {
    ALL: 'ORGANIZATION-ALL',
    MINE: 'ORGANIZATION-MINE',
    DETAILS: 'ORGANIZATION-DETAILS'
} as const

// Queries
export const useAllOrganizationsQuery = () => useQuery(ORGANIZATION.ALL, getAllOrganizations)

export const useMyOrganizationsQuery = (userId: string, params = {}) => {
    return useQuery(ORGANIZATION.MINE, getMyOrganizations.bind(this, userId), { enabled: Boolean(userId), ...params })
}

export const useOrganizationDetailsQuery = (orgId: string) => useQuery([ORGANIZATION.DETAILS, orgId], getOrganizationDetails.bind(this, orgId))


// Mutations
export const useCreateOrganizationMutation = () => {
    const queryClient = useQueryClient()
    return useMutation(createOrganization, {
        onSuccess: (org) => {
            queryClient.setQueryData<IOrganization[]>(ORGANIZATION.MINE, (prev = []) => ([...prev, org]))
        }
    })
}

export const useUpdateOrganizationMutation = () => {
    const queryClient = useQueryClient()
    return useMutation(editOrganization, {
        onSuccess: (updatedOrg) => {
            queryClient.setQueryData<IOrganization>([ORGANIZATION.DETAILS, updatedOrg.id], (prev) => ({ ...prev, ...updatedOrg }))
            queryClient.setQueryData<IOrganization[]>(ORGANIZATION.MINE, (prev = []) => prev.map((org) => (
                org.id !== updatedOrg.id ? org : updatedOrg
            )))
        }
    })
}

export const useDeleteOrganizationMutation = () => {
    const queryClient = useQueryClient()
    return useMutation(deleteOrganization, {
        onSuccess: (orgId) => {
            queryClient.setQueryData<IOrganization[]>(ORGANIZATION.MINE, (prev = []) => prev.filter((org) => org.id !== orgId))
        }
    })
}