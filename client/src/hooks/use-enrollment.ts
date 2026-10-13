// ============================================================================
// ENROLLMENT HOOKS - React Query Hooks for Enrollment API
// ============================================================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import api from '@/lib/api-client'
import { queryKeys } from '@/lib/query-client'
import type { Enrollment, EnrollLearnerRequest } from '@/types'

// ============================================================================
// GET ENROLLMENTS BY CLASS
// ============================================================================

export function useEnrollmentsByClass(classSectionId: string | null) {
  return useQuery({
    queryKey: queryKeys.enrollments.byClass(classSectionId!),
    queryFn: async () => {
      const response = await api.get<Enrollment[]>(
        `/enrollments/class/${classSectionId}`
      )
      return response.data!
    },
    enabled: !!classSectionId, // Only fetch if classId exists
    staleTime: 2 * 60 * 1000, // 2 minutes (enrollments change frequently)
  })
}

// ============================================================================
// GET ENROLLMENTS BY LEARNER (History)
// ============================================================================

export function useEnrollmentsByLearner(learnerId: string | null) {
  return useQuery({
    queryKey: queryKeys.enrollments.byLearner(learnerId!),
    queryFn: async () => {
      const response = await api.get<Enrollment[]>(
        `/enrollments/learner/${learnerId}`
      )
      return response.data!
    },
    enabled: !!learnerId,
  })
}

// ============================================================================
// GET ENROLLMENTS BY ACADEMIC YEAR
// ============================================================================

export function useEnrollmentsByYear(academicYearId: string | null) {
  return useQuery({
    queryKey: queryKeys.enrollments.byYear(academicYearId!),
    queryFn: async () => {
      const response = await api.get<Enrollment[]>(
        `/enrollments/academic-year/${academicYearId}`
      )
      return response.data!
    },
    enabled: !!academicYearId,
  })
}

// ============================================================================
// ENROLL LEARNER
// ============================================================================

export function useEnrollLearner() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: EnrollLearnerRequest) => {
      const response = await api.post<Enrollment>('/enrollments', data)
      return response.data!
    },

    // Optimistic update
    onMutate: async (newEnrollment) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({
        queryKey: queryKeys.enrollments.byClass(newEnrollment.classSectionId),
      })

      // Snapshot previous value
      const previousEnrollments = queryClient.getQueryData(
        queryKeys.enrollments.byClass(newEnrollment.classSectionId)
      )

      // Optimistically update
      queryClient.setQueryData(
        queryKeys.enrollments.byClass(newEnrollment.classSectionId),
        (old: Enrollment[] = []) => [
          ...old,
          {
            id: 'temp-id',
            ...newEnrollment,
            status: 'ACTIVE',
            createdAt: new Date().toISOString(),
          } as any,
        ]
      )

      return { previousEnrollments }
    },

    // Rollback on error
    onError: (err, newEnrollment, context) => {
      queryClient.setQueryData(
        queryKeys.enrollments.byClass(newEnrollment.classSectionId),
        context?.previousEnrollments
      )
      toast.error('Failed to enroll student')
    },

    // Refetch on success
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.enrollments.byClass(variables.classSectionId),
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.enrollments.byLearner(variables.learnerId),
      })
      toast.success('Student enrolled successfully!')
    },
  })
}

// ============================================================================
// WITHDRAW LEARNER
// ============================================================================

export function useWithdrawLearner() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      enrollmentId,
      withdrawalDate,
    }: {
      enrollmentId: string
      withdrawalDate: string
    }) => {
      const response = await api.patch<Enrollment>(
        `/enrollments/${enrollmentId}/withdraw`,
        null,
        { params: { withdrawalDate } }
      )
      return response.data!
    },

    onSuccess: (data) => {
      // Invalidate all enrollment queries
      queryClient.invalidateQueries({ queryKey: queryKeys.enrollments.all })
      toast.success('Student withdrawn successfully')
    },

    onError: () => {
      toast.error('Failed to withdraw student')
    },
  })
}
