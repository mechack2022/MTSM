// ============================================================================
// SCHOOL HOOKS - React Query Hooks for School API
// ============================================================================

import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api-client'
import { queryKeys } from '@/lib/query-client'
import type { School } from '@/types'

// ============================================================================
// GET ALL SCHOOLS
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

// ============================================================================
// GET SINGLE SCHOOL
// ============================================================================

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
