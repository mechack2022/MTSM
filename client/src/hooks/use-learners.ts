// ============================================================================
// LEARNER HOOKS - React Query Hooks for Learner API
// ============================================================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import api from '@/lib/api-client'
import { queryKeys } from '@/lib/query-client'
import type {
  Learner,
  CreateLearnerRequest,
  UpdateLearnerRequest,
  LearnerResponse,
} from '@/types'

// ============================================================================
// GET ALL LEARNERS
// ============================================================================

export function useLearners() {
  return useQuery({
    queryKey: queryKeys.learners.all,
    queryFn: async () => {
      const response = await api.get<LearnerResponse[]>('/learners')
      return response.data!
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// ============================================================================
// GET ACTIVE LEARNERS
// ============================================================================

export function useActiveLearners() {
  return useQuery({
    queryKey: queryKeys.learners.active,
    queryFn: async () => {
      const response = await api.get<LearnerResponse[]>('/learners', {
        params: { isActive: true },
      })
      return response.data!
    },
    staleTime: 3 * 60 * 1000, // 3 minutes (active learners change frequently)
  })
}

// ============================================================================
// GET LEARNERS BY SCHOOL
// ============================================================================

export function useLearnersBySchool(schoolId: string | null) {
  return useQuery({
    queryKey: queryKeys.learners.bySchool(schoolId!),
    queryFn: async () => {
      const response = await api.get<LearnerResponse[]>(
        `/learners/school/${schoolId}`
      )
      return response.data!
    },
    enabled: !!schoolId,
    staleTime: 3 * 60 * 1000,
  })
}

// ============================================================================
// GET LEARNERS BY GRADE
// ============================================================================

export function useLearnersByGrade(gradeId: string | null) {
  return useQuery({
    queryKey: queryKeys.learners.byGrade(gradeId!),
    queryFn: async () => {
      const response = await api.get<LearnerResponse[]>('/learners', {
        params: { gradeId },
      })
      return response.data!
    },
    enabled: !!gradeId,
  })
}

// ============================================================================
// GET SINGLE LEARNER
// ============================================================================

export function useLearner(learnerId: string | null) {
  return useQuery({
    queryKey: queryKeys.learners.detail(learnerId!),
    queryFn: async () => {
      const response = await api.get<LearnerResponse>(`/learners/${learnerId}`)
      return response.data!
    },
    enabled: !!learnerId,
    staleTime: 10 * 60 * 1000, // 10 minutes (learner details don't change often)
  })
}

// ============================================================================
// CREATE LEARNER
// ============================================================================

export function useCreateLearner() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateLearnerRequest) => {
      const response = await api.post<LearnerResponse>('/learners', data)
      return response.data!
    },

    // Optimistic update
    onMutate: async (newLearner) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.learners.all })

      // Snapshot previous value
      const previousLearners = queryClient.getQueryData(queryKeys.learners.all)

      // Optimistically add new learner
      queryClient.setQueryData(
        queryKeys.learners.all,
        (old: LearnerResponse[] = []) => [
          {
            id: 'temp-id',
            ...newLearner,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          } as any,
          ...old,
        ]
      )

      return { previousLearners }
    },

    // Rollback on error
    onError: (err, newLearner, context) => {
      queryClient.setQueryData(queryKeys.learners.all, context?.previousLearners)
      toast.error('Failed to create learner')
    },

    // Refetch on success
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.learners.all })
      if (variables.schoolId) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.learners.bySchool(variables.schoolId),
        })
      }
      toast.success('Learner created successfully!')
    },
  })
}

// ============================================================================
// UPDATE LEARNER
// ============================================================================

export function useUpdateLearner() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string
      data: UpdateLearnerRequest
    }) => {
      const response = await api.put<LearnerResponse>(`/learners/${id}`, data)
      return response.data!
    },

    // Optimistic update
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.learners.detail(id) })

      const previousLearner = queryClient.getQueryData(
        queryKeys.learners.detail(id)
      )

      queryClient.setQueryData(
        queryKeys.learners.detail(id),
        (old: LearnerResponse) => ({
          ...old,
          ...data,
          updatedAt: new Date().toISOString(),
        })
      )

      return { previousLearner }
    },

    onError: (err, { id }, context) => {
      queryClient.setQueryData(
        queryKeys.learners.detail(id),
        context?.previousLearner
      )
      toast.error('Failed to update learner')
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.learners.all })
      queryClient.invalidateQueries({
        queryKey: queryKeys.learners.detail(data.id),
      })
      if (data.schoolId) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.learners.bySchool(data.schoolId),
        })
      }
      toast.success('Learner updated successfully!')
    },
  })
}

// ============================================================================
// ACTIVATE LEARNER
// ============================================================================

export function useActivateLearner() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (learnerId: string) => {
      const response = await api.patch<LearnerResponse>(
        `/learners/${learnerId}/activate`
      )
      return response.data!
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.learners.all })
      queryClient.invalidateQueries({
        queryKey: queryKeys.learners.detail(data.id),
      })
      toast.success('Learner activated successfully')
    },

    onError: () => {
      toast.error('Failed to activate learner')
    },
  })
}

// ============================================================================
// DEACTIVATE LEARNER
// ============================================================================

export function useDeactivateLearner() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (learnerId: string) => {
      const response = await api.patch<LearnerResponse>(
        `/learners/${learnerId}/deactivate`
      )
      return response.data!
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.learners.all })
      queryClient.invalidateQueries({
        queryKey: queryKeys.learners.detail(data.id),
      })
      toast.success('Learner deactivated successfully')
    },

    onError: () => {
      toast.error('Failed to deactivate learner')
    },
  })
}
