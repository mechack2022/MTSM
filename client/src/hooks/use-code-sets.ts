// ============================================================================
// CODE SET HOOKS - Complete CRUD for CodeSet Management
// ============================================================================

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import api from '@/lib/api-client'
import { queryKeys } from '@/lib/query-client'
import type { CodeSet } from '@/types'

// ============================================================================
// QUERY HOOKS
// ============================================================================

export function useCodeSetsByGroup(
  group: string,
  includeInactive: boolean = false,
  tenantId?: string | null
) {
  return useQuery({
    queryKey: [...queryKeys.codeSets.byGroup(group), includeInactive, tenantId],
    queryFn: async () => {
      const params: any = { group, includeInactive }
      if (tenantId) {
        params.tenantId = tenantId
      }
      const response = await api.get<CodeSet[]>('/code-sets', { params })
      return response.data!
    },
    enabled: !!group,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  })
}

export function useCodeSetById(id: string | null) {
  return useQuery({
    queryKey: ['code-sets', id],
    queryFn: async () => {
      const response = await api.get<CodeSet>(`/code-sets/${id}`)
      return response.data!
    },
    enabled: !!id,
  })
}

// ============================================================================
// MUTATION HOOKS
// ============================================================================

export function useCreateCodeSet() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: {
      codeSetGroup: string
      code: string
      displayName: string
      description?: string | null
      attributes?: Record<string, any> | null
      sortOrder: number
    }) => {
      const response = await api.post<CodeSet>('/code-sets', data)
      return response.data!
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.codeSets.byGroup(data.codeSetGroup),
      })
      toast.success(`CodeSet "${data.displayName}" created successfully!`)
    },

    onError: (error: any) => {
      toast.error(error?.message || 'Failed to create code set')
    },
  })
}

export function useUpdateCodeSet() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string
      data: {
        codeSetGroup: string
        code: string
        displayName: string
        description?: string | null
        attributes?: Record<string, any> | null
        sortOrder: number
      }
    }) => {
      const response = await api.put<CodeSet>(`/code-sets/${id}`, data)
      return response.data!
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.codeSets.byGroup(data.codeSetGroup),
      })
      queryClient.invalidateQueries({ queryKey: ['code-sets', data.id] })
      toast.success(`CodeSet "${data.displayName}" updated successfully!`)
    },

    onError: (error: any) => {
      toast.error(error?.message || 'Failed to update code set')
    },
  })
}

export function useActivateCodeSet() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.patch<CodeSet>(`/code-sets/${id}/activate`)
      return response.data!
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.codeSets.byGroup(data.codeSetGroup),
      })
      queryClient.invalidateQueries({ queryKey: ['code-sets', data.id] })
      toast.success(`CodeSet "${data.displayName}" activated!`)
    },

    onError: (error: any) => {
      toast.error(error?.message || 'Failed to activate code set')
    },
  })
}

export function useDeactivateCodeSet() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.patch<CodeSet>(`/code-sets/${id}/deactivate`)
      return response.data!
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.codeSets.byGroup(data.codeSetGroup),
      })
      queryClient.invalidateQueries({ queryKey: ['code-sets', data.id] })
      toast.success(`CodeSet "${data.displayName}" deactivated!`)
    },

    onError: (error: any) => {
      toast.error(error?.message || 'Failed to deactivate code set')
    },
  })
}

// ============================================================================
// CONVENIENCE HOOKS FOR SPECIFIC GROUPS
// ============================================================================

export function useGradeLevels(includeInactive = false, tenantId?: string | null) {
  return useCodeSetsByGroup('GRADE_LEVEL', includeInactive, tenantId)
}

export function useAcademicYears(includeInactive = false, tenantId?: string | null) {
  return useCodeSetsByGroup('ACADEMIC_YEAR', includeInactive, tenantId)
}

export function useAcademicTerms(includeInactive = false, tenantId?: string | null) {
  return useCodeSetsByGroup('ACADEMIC_TERM', includeInactive, tenantId)
}

export function useAttendanceStatuses(includeInactive = false, tenantId?: string | null) {
  return useCodeSetsByGroup('ATTENDANCE_STATUS', includeInactive, tenantId)
}

export function useAbsenceReasons(includeInactive = false, tenantId?: string | null) {
  return useCodeSetsByGroup('ABSENCE_REASON', includeInactive, tenantId)
}

export function useGenders(includeInactive = false, tenantId?: string | null) {
  return useCodeSetsByGroup('GENDER', includeInactive, tenantId)
}
