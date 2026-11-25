import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import api from '@/lib/api-client'
import type { Staff, CreateStaffRequest, UpdateStaffRequest, StaffRole, SchoolSection } from '@/types'

export function useStaff(params?: {
  section?: SchoolSection
  role?: StaffRole
  activeOnly?: boolean
}) {
  const queryParams = new URLSearchParams()
  if (params?.section) queryParams.append('section', params.section)
  if (params?.role) queryParams.append('role', params.role)
  if (params?.activeOnly) queryParams.append('activeOnly', 'true')

  const queryString = queryParams.toString()
  const url = queryString ? `/staff?${queryString}` : '/staff'

  return useQuery({
    queryKey: ['staff', params],
    queryFn: async () => {
      const response = await api.get<Staff[]>(url)
      return response.data!
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  })
}

export function useStaffById(id: string | null) {
  return useQuery({
    queryKey: ['staff', id],
    queryFn: async () => {
      const response = await api.get<Staff>(`/staff/${id}`)
      return response.data!
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

export function useSearchStaff(searchTerm: string) {
  return useQuery({
    queryKey: ['staff', 'search', searchTerm],
    queryFn: async () => {
      const response = await api.get<Staff[]>(`/staff/search?q=${encodeURIComponent(searchTerm)}`)
      return response.data!
    },
    enabled: searchTerm.length > 0,
    staleTime: 2 * 60 * 1000,
  })
}

export function useFormTutors() {
  return useQuery({
    queryKey: ['staff', 'form-tutors'],
    queryFn: async () => {
      const response = await api.get<Staff[]>('/staff/form-tutors')
      return response.data!
    },
    staleTime: 5 * 60 * 1000,
  })
}

export function usePendingActivationStaff() {
  return useQuery({
    queryKey: ['staff', 'pending-activation'],
    queryFn: async () => {
      const response = await api.get<Staff[]>('/staff/pending-activation')
      return response.data!
    },
    staleTime: 2 * 60 * 1000,
  })
}

export function useRolesForSection(section: SchoolSection | null) {
  return useQuery({
    queryKey: ['staff', 'roles', section],
    queryFn: async () => {
      const response = await api.get<StaffRole[]>(`/staff/roles?section=${section}`)
      return response.data!
    },
    enabled: !!section,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  })
}

export function useStaffStats() {
  const totalCountQuery = useQuery({
    queryKey: ['staff', 'stats', 'total-count'],
    queryFn: async () => {
      const response = await api.get<number>('/staff/stats/total-count')
      return response.data!
    },
    staleTime: 5 * 60 * 1000,
  })

  const activeCountQuery = useQuery({
    queryKey: ['staff', 'stats', 'active-count'],
    queryFn: async () => {
      const response = await api.get<number>('/staff/stats/active-count')
      return response.data!
    },
    staleTime: 5 * 60 * 1000,
  })

  return {
    totalCount: totalCountQuery.data ?? 0,
    activeCount: activeCountQuery.data ?? 0,
    isLoading: totalCountQuery.isLoading || activeCountQuery.isLoading,
    isError: totalCountQuery.isError || activeCountQuery.isError,
  }
}

export function useCreateStaff() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateStaffRequest) => {
      const response = await api.post<Staff>('/staff', data)
      return response.data!
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['staff'] })
      toast.success(`Staff member "${data.fullName}" created successfully!`)
    },

    onError: (error: any) => {
      toast.error(error?.message || 'Failed to create staff member')
    },
  })
}

export function useUpdateStaff() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateStaffRequest }) => {
      const response = await api.put<Staff>(`/staff/${id}`, data)
      return response.data!
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['staff'] })
      queryClient.invalidateQueries({ queryKey: ['staff', data.id] })
      toast.success(`Staff member "${data.fullName}" updated successfully!`)
    },

    onError: (error: any) => {
      toast.error(error?.message || 'Failed to update staff member')
    },
  })
}

export function useDeleteStaff() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/staff/${id}`)
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff'] })
      toast.success('Staff member deleted successfully!')
    },

    onError: (error: any) => {
      toast.error(error?.message || 'Failed to delete staff member')
    },
  })
}

export function useActivateStaffAccount() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const response = await api.post<Staff>('/staff/activate-account')
      return response.data!
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['staff'] })
      queryClient.invalidateQueries({ queryKey: ['staff', data.id] })
      console.log('Staff account activated successfully', data)
    },

    onError: (error: any) => {
      console.error('Failed to activate staff account:', error)
    },
  })
}
