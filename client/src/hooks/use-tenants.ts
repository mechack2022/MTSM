import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import api from '@/lib/api-client'
import { queryKeys } from '@/lib/query-client'
import type { Tenant, CreateTenantRequest, CreateTenantResponse, UpdateTenantRequest } from '@/types'

export function useAllTenants(activeOnly?: boolean) {
  return useQuery({
    queryKey: activeOnly ? queryKeys.tenants.active : queryKeys.tenants.all,
    queryFn: async () => {
      const params = activeOnly ? '?activeOnly=true' : ''
      const response = await api.get<Tenant[]>(`/tenants${params}`)
      return response.data!
    },
  })
}

export function useTenantById(id: string | null) {
  return useQuery({
    queryKey: queryKeys.tenants.detail(id!),
    queryFn: async () => {
      const response = await api.get<Tenant>(`/tenants/${id}`)
      return response.data!
    },
    enabled: !!id,
  })
}

// ============================================================================
// MUTATION HOOKS
// ============================================================================

export function useCreateTenant() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateTenantRequest) => {
      const response = await api.post<CreateTenantResponse>('/tenants', data)
      return response.data!
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tenants.all })
      toast.success(`Tenant "${data.tenant.name}" created successfully!`)
    },

    onError: (error: any) => {
      toast.error(error?.message || 'Failed to create tenant')
    },
  })
}

export function useUpdateTenant() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string
      data: UpdateTenantRequest
    }) => {
      const response = await api.put<Tenant>(`/tenants/${id}`, data)
      return response.data!
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tenants.all })
      queryClient.invalidateQueries({
        queryKey: queryKeys.tenants.detail(data.id),
      })
      toast.success(`Tenant "${data.name}" updated successfully!`)
    },

    onError: (error: any) => {
      toast.error(error?.message || 'Failed to update tenant')
    },
  })
}

export function useDeleteTenant() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/tenants/${id}`)
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tenants.all })
      toast.success('Tenant deleted successfully!')
    },

    onError: (error: any) => {
      toast.error(error?.message || 'Failed to delete tenant')
    },
  })
}

export function useActivateTenant() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.post<Tenant>(`/tenants/${id}/activate`)
      return response.data!
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tenants.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.tenants.detail(data.id) })
      toast.success(`Tenant "${data.name}" activated successfully!`)
    },

    onError: (error: any) => {
      const message = error?.response?.data?.message || error?.message || 'Failed to activate tenant'
      toast.error(message)
    },
  })
}

export function useSuspendTenant() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.post<Tenant>(`/tenants/${id}/suspend`)
      return response.data!
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tenants.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.tenants.detail(data.id) })
      toast.success(`Tenant "${data.name}" suspended successfully!`)
    },

    onError: (error: any) => {
      const message = error?.response?.data?.message || error?.message || 'Failed to suspend tenant'
      toast.error(message)
    },
  })
}
