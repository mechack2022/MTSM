// ============================================================================
// SCHOOL HOOKS - React Query Hooks for School API
// ============================================================================

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import api from '@/lib/api-client'
import { queryKeys } from '@/lib/query-client'
import type { School, CreateSchoolRequest, UpdateSchoolRequest } from '@/types/school'

// ============================================================================
// QUERY HOOKS
// ============================================================================

export function useSchools() {
  return useQuery({
    queryKey: queryKeys.schools.all,
    queryFn: async () => {
      const response = await api.get<School[]>('/schools')
      return response.data!
    },
    staleTime: 15 * 60 * 1000, // 15 minutes (schools don't change often)
    gcTime: 30 * 60 * 1000, // 30 minutes
  })
}

export function useSchool(schoolId: string | null) {
  return useQuery({
    queryKey: queryKeys.schools.detail(schoolId!),
    queryFn: async () => {
      const response = await api.get<School>(`/schools/${schoolId}`)
      return response.data!
    },
    enabled: !!schoolId,
    staleTime: 15 * 60 * 1000, // 15 minutes
  })
}

// ============================================================================
// MUTATION HOOKS
// ============================================================================

export function useCreateSchool() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateSchoolRequest & { tenantId?: string }) => {
      const { tenantId, ...schoolData } = data
      const params = tenantId ? { tenantId } : {}
      const response = await api.post<School>('/schools', schoolData, { params })
      return response.data!
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.schools.all })
      toast.success(`School "${data.name}" created successfully!`)
    },

    onError: (error: any) => {
      toast.error(error?.message || 'Failed to create school')
    },
  })
}

export function useUpdateSchool() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string
      data: UpdateSchoolRequest
    }) => {
      const response = await api.put<School>(`/schools/${id}`, data)
      return response.data!
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.schools.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.schools.detail(data.id) })
      toast.success(`School "${data.name}" updated successfully!`)
    },

    onError: (error: any) => {
      toast.error(error?.message || 'Failed to update school')
    },
  })
}

// ============================================================================
// STATISTICS HOOKS
// ============================================================================

export function useSchoolStats() {
  const activeSchoolsQuery = useQuery({
    queryKey: ['schools', 'stats', 'active-count'],
    queryFn: async () => {
      const response = await api.get<number>('/schools/stats/active-count')
      return response.data!
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const totalStudentsQuery = useQuery({
    queryKey: ['schools', 'stats', 'total-students'],
    queryFn: async () => {
      const response = await api.get<number>('/schools/stats/total-students')
      return response.data!
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const totalTeachersQuery = useQuery({
    queryKey: ['schools', 'stats', 'total-teachers'],
    queryFn: async () => {
      const response = await api.get<number>('/schools/stats/total-teachers')
      return response.data!
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  return {
    activeSchoolCount: activeSchoolsQuery.data ?? 0,
    totalStudents: totalStudentsQuery.data ?? 0,
    totalTeachers: totalTeachersQuery.data ?? 0,
    isLoading: activeSchoolsQuery.isLoading || totalStudentsQuery.isLoading || totalTeachersQuery.isLoading,
    isError: activeSchoolsQuery.isError || totalStudentsQuery.isError || totalTeachersQuery.isError,
  }
}
