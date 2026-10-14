// ============================================================================
// CLASS SECTION HOOKS - React Query Hooks for ClassSection API
// ============================================================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import api from '@/lib/api-client'
import { queryKeys } from '@/lib/query-client'
import type {
  ClassSection,
  CreateClassSectionRequest,
  UpdateClassSectionRequest,
  ClassSectionResponse,
} from '@/types'

// ============================================================================
// GET ALL CLASSES
// ============================================================================

export function useClasses() {
  return useQuery({
    queryKey: queryKeys.classes.all,
    queryFn: async () => {
      const response = await api.get<ClassSectionResponse[]>('/class-sections')
      return response.data!
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// ============================================================================
// GET ACTIVE CLASSES
// ============================================================================

export function useActiveClasses() {
  return useQuery({
    queryKey: queryKeys.classes.active,
    queryFn: async () => {
      const response = await api.get<ClassSectionResponse[]>('/class-sections', {
        params: { isActive: true },
      })
      return response.data!
    },
    staleTime: 3 * 60 * 1000, // 3 minutes
  })
}

// ============================================================================
// GET CLASSES BY SCHOOL
// ============================================================================

export function useClassesBySchool(schoolId: string | null) {
  return useQuery({
    queryKey: queryKeys.classes.bySchool(schoolId!),
    queryFn: async () => {
      const response = await api.get<ClassSectionResponse[]>(
        `/class-sections/school/${schoolId}`
      )
      return response.data!
    },
    enabled: !!schoolId,
    staleTime: 3 * 60 * 1000,
  })
}

// ============================================================================
// GET CLASSES BY ACADEMIC YEAR
// ============================================================================

export function useClassesByYear(academicYearId: string | null) {
  return useQuery({
    queryKey: queryKeys.classes.byYear(academicYearId!),
    queryFn: async () => {
      const response = await api.get<ClassSectionResponse[]>('/class-sections', {
        params: { academicYearId },
      })
      return response.data!
    },
    enabled: !!academicYearId,
  })
}

// ============================================================================
// GET SINGLE CLASS SECTION
// ============================================================================

export function useClassSection(classSectionId: string | null) {
  return useQuery({
    queryKey: queryKeys.classes.detail(classSectionId!),
    queryFn: async () => {
      const response = await api.get<ClassSectionResponse>(
        `/class-sections/${classSectionId}`
      )
      return response.data!
    },
    enabled: !!classSectionId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

// ============================================================================
// CREATE CLASS SECTION
// ============================================================================

export function useCreateClassSection() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateClassSectionRequest) => {
      const response = await api.post<ClassSectionResponse>(
        '/class-sections',
        data
      )
      return response.data!
    },

    // Optimistic update
    onMutate: async (newClass) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.classes.all })

      const previousClasses = queryClient.getQueryData(queryKeys.classes.all)

      queryClient.setQueryData(
        queryKeys.classes.all,
        (old: ClassSectionResponse[] = []) => [
          {
            id: 'temp-id',
            ...newClass,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          } as any,
          ...old,
        ]
      )

      return { previousClasses }
    },

    onError: (err, newClass, context) => {
      queryClient.setQueryData(queryKeys.classes.all, context?.previousClasses)
      toast.error('Failed to create class section')
    },

    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.classes.all })
      if (variables.schoolId) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.classes.bySchool(variables.schoolId),
        })
      }
      toast.success('Class section created successfully!')
    },
  })
}

// ============================================================================
// UPDATE CLASS SECTION
// ============================================================================

export function useUpdateClassSection() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string
      data: UpdateClassSectionRequest
    }) => {
      const response = await api.put<ClassSectionResponse>(
        `/class-sections/${id}`,
        data
      )
      return response.data!
    },

    // Optimistic update
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.classes.detail(id) })

      const previousClass = queryClient.getQueryData(queryKeys.classes.detail(id))

      queryClient.setQueryData(
        queryKeys.classes.detail(id),
        (old: ClassSectionResponse) => ({
          ...old,
          ...data,
          updatedAt: new Date().toISOString(),
        })
      )

      return { previousClass }
    },

    onError: (err, { id }, context) => {
      queryClient.setQueryData(queryKeys.classes.detail(id), context?.previousClass)
      toast.error('Failed to update class section')
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.classes.all })
      queryClient.invalidateQueries({
        queryKey: queryKeys.classes.detail(data.id),
      })
      if (data.schoolId) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.classes.bySchool(data.schoolId),
        })
      }
      toast.success('Class section updated successfully!')
    },
  })
}

// ============================================================================
// ACTIVATE CLASS SECTION
// ============================================================================

export function useActivateClassSection() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (classSectionId: string) => {
      const response = await api.patch<ClassSectionResponse>(
        `/class-sections/${classSectionId}/activate`
      )
      return response.data!
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.classes.all })
      queryClient.invalidateQueries({
        queryKey: queryKeys.classes.detail(data.id),
      })
      toast.success('Class section activated successfully')
    },

    onError: () => {
      toast.error('Failed to activate class section')
    },
  })
}

// ============================================================================
// DEACTIVATE CLASS SECTION
// ============================================================================

export function useDeactivateClassSection() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (classSectionId: string) => {
      const response = await api.patch<ClassSectionResponse>(
        `/class-sections/${classSectionId}/deactivate`
      )
      return response.data!
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.classes.all })
      queryClient.invalidateQueries({
        queryKey: queryKeys.classes.detail(data.id),
      })
      toast.success('Class section deactivated successfully')
    },

    onError: () => {
      toast.error('Failed to deactivate class section')
    },
  })
}
