import { getAllOrganizations, getMyOrganizations, createOrganization, deleteOrganization, editOrganization, getOrganizationDetails, IOrganization } from '@web/api/organization.api'
import { queryClient } from '@web/modules/queryClient'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNotifications } from 'reapop'

export const ORGANIZATION = {
    ALL: 'ORGANIZATION-ALL',
    MINE: 'ORGANIZATION-MINE',
    DETAILS: 'ORGANIZATION-DETAILS'
} as const

// utils
export const invalidateOrganizationQuery = (orgId: string) => queryClient.invalidateQueries([ORGANIZATION.DETAILS, orgId])


// Queries
export const useAllOrganizationsQuery = () => useQuery(ORGANIZATION.ALL, getAllOrganizations)

export const useMyOrganizationsQuery = (userId: string, params = {}) => {
    return useQuery(ORGANIZATION.MINE, getMyOrganizations.bind(this, userId), { enabled: Boolean(userId), ...params })
}

export const useOrganizationDetailsQuery = (orgId: string) => useQuery([ORGANIZATION.DETAILS, orgId], getOrganizationDetails.bind(this, orgId))


// Mutations
export const useCreateOrganizationMutation = () => {
    const queryClient = useQueryClient()
    const { notify } = useNotifications();

    return useMutation(createOrganization, {
        onSuccess: (org) => {
            notify(`Organization created successfully!`, 'success');
            queryClient.setQueryData<IOrganization[]>(ORGANIZATION.MINE, (prev = []) => ([...prev, org]))
        }
    })
}

export const useUpdateOrganizationMutation = () => {
    const queryClient = useQueryClient()
    const { notify } = useNotifications();

    return useMutation(editOrganization, {
        onSuccess: (updatedOrg) => {
            notify(`Organization updated successfully!`, 'success');
            queryClient.setQueryData<IOrganization>([ORGANIZATION.DETAILS, updatedOrg.id], (prev) => ({ ...prev, ...updatedOrg }))
            queryClient.setQueryData<IOrganization[]>(ORGANIZATION.MINE, (prev = []) => prev.map((org) => (
                org.id !== updatedOrg.id ? org : updatedOrg
            )))
        }
    })
}

export const useDeleteOrganizationMutation = () => {
    const queryClient = useQueryClient()
    const { notify } = useNotifications();

    return useMutation(deleteOrganization, {
        onSuccess: (orgId) => {
            notify(`Organization deleted successfully!`, 'success');
            queryClient.setQueryData<IOrganization[]>(ORGANIZATION.MINE, (prev = []) => prev.filter((org) => org.id !== orgId))
        }
    })
}

