// ============================================================================
// TENANT HOOKS - React Query hooks for tenant CRUD operations
// ============================================================================

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import api from '@/lib/api-client'
import { queryKeys } from '@/lib/query-client'
import type { Tenant, CreateTenantRequest, UpdateTenantRequest } from '@/types'

// ============================================================================
// QUERY HOOKS
// ============================================================================

export function useAllTenants() {
  return useQuery({
    queryKey: queryKeys.tenants.all,
    queryFn: async () => {
      // DUMMY DATA - Replace with real API call when connecting to backend
      await new Promise(resolve => setTimeout(resolve, 500)) // Simulate network delay

      const dummyTenants: Tenant[] = [
        {
          id: 'tenant-001',
          code: 'LAGOS-EDU',
          name: 'Lagos State Education District',
          contactEmail: 'admin@lagosedu.ng',
          contactPhone: '+234 123 456 7890',
          isActive: true,
          createdAt: new Date('2024-01-15').toISOString(),
          updatedAt: new Date('2024-01-15').toISOString(),
        },
        {
          id: 'tenant-002',
          code: 'ABUJA-SCH',
          name: 'Federal Capital Territory Schools',
          contactEmail: 'contact@fctschools.ng',
          contactPhone: '+234 987 654 3210',
          isActive: true,
          createdAt: new Date('2024-02-10').toISOString(),
          updatedAt: new Date('2024-02-10').toISOString(),
        },
        {
          id: 'tenant-003',
          code: 'KANO-EDU',
          name: 'Kano State Educational Authority',
          contactEmail: 'info@kanoedu.ng',
          contactPhone: '+234 555 123 4567',
          isActive: false,
          createdAt: new Date('2024-03-05').toISOString(),
          updatedAt: new Date('2024-03-20').toISOString(),
        },
      ]

      return dummyTenants

      // REAL API CALL (commented out for now)
      // const response = await api.get<Tenant[]>('/tenants')
      // return response.data!
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
      const response = await api.post<Tenant>('/tenants', data)
      return response.data!
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tenants.all })
      toast.success(`Tenant "${data.name}" created successfully!`)
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

export function useActivateTenant() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.patch<Tenant>(`/tenants/${id}/activate`)
      return response.data!
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tenants.all })
      queryClient.invalidateQueries({
        queryKey: queryKeys.tenants.detail(data.id),
      })
      toast.success(`Tenant "${data.name}" activated successfully!`)
    },

    onError: (error: any) => {
      toast.error(error?.message || 'Failed to activate tenant')
    },
  })
}

export function useDeactivateTenant() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.patch<Tenant>(`/tenants/${id}/deactivate`)
      return response.data!
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tenants.all })
      queryClient.invalidateQueries({
        queryKey: queryKeys.tenants.detail(data.id),
      })
      toast.success(`Tenant "${data.name}" deactivated successfully!`)
    },

    onError: (error: any) => {
      toast.error(error?.message || 'Failed to deactivate tenant')
    },
  })
}
