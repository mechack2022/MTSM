import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { classArmsApi } from '@/api/class-arms'
import type {
  ClassArm,
  CreateClassArmRequest,
  UpdateClassArmRequest,
  ClassName,
  ArmName,
  SchoolSection,
} from '@/types/class-arm'
import type { Staff } from '@/types/staff'

// ============================================================================
// QUERY HOOKS - Fetching Data
// ============================================================================

/**
 * Get all class arms for the school (with optional filters)
 */
export function useClassArms(params?: {
  section?: SchoolSection
  academicYearId?: string
}) {
  return useQuery({
    queryKey: ['class-arms', params],
    queryFn: async () => {
      const response = await classArmsApi.getAllClassArms(params)
      return response.data!
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  })
}

/**
 * Get a single class arm by ID
 */
export function useClassArmById(id: string | null) {
  return useQuery({
    queryKey: ['class-arms', id],
    queryFn: async () => {
      const response = await classArmsApi.getClassArmById(id!)
      return response.data!
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

/**
 * Search class arms by search term
 */
export function useSearchClassArms(searchTerm: string) {
  return useQuery({
    queryKey: ['class-arms', 'search', searchTerm],
    queryFn: async () => {
      const response = await classArmsApi.searchClassArms(searchTerm)
      return response.data!
    },
    enabled: searchTerm.length > 0,
    staleTime: 2 * 60 * 1000,
  })
}

/**
 * Get available class names for a specific school section
 * Returns the enum values that can be used (e.g., ['CRECHE', 'PRE_NURSERY'])
 */
export function useAvailableClassNames(section: SchoolSection | null) {
  return useQuery({
    queryKey: ['class-arms', 'available-class-names', section],
    queryFn: async () => {
      const response = await classArmsApi.getAvailableClassNames(section!)
      return response.data!
    },
    enabled: !!section,
    staleTime: 60 * 60 * 1000, // 1 hour (enum values rarely change)
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
  })
}

/**
 * Get available arm names (presets) for a specific school section
 * Returns the enum values that can be used (e.g., ['SUNSHINE', 'EMERALD', 'DIAMOND'])
 */
export function useAvailableArmNames(section: SchoolSection | null) {
  return useQuery({
    queryKey: ['class-arms', 'available-arm-names', section],
    queryFn: async () => {
      const response = await classArmsApi.getAvailableArmNames(section!)
      return response.data!
    },
    enabled: !!section,
    staleTime: 60 * 60 * 1000, // 1 hour (enum values rarely change)
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
  })
}

/**
 * Get eligible staff for a school section (for lead caregiver assignment)
 * Only returns staff who are:
 * - From the same section
 * - Account activated
 * - Email verified
 * - Employment status: ACTIVE or ON_LEAVE
 */
export function useEligibleStaffForSection(section: SchoolSection | null) {
  return useQuery({
    queryKey: ['class-arms', 'eligible-staff', section],
    queryFn: async () => {
      const response = await classArmsApi.getEligibleStaffForSection(section!)
      return response.data!
    },
    enabled: !!section,
    staleTime: 5 * 60 * 1000,
  })
}

/**
 * Get statistics - total class arms count
 */
export function useClassArmsStats() {
  const totalCountQuery = useQuery({
    queryKey: ['class-arms', 'stats', 'total-count'],
    queryFn: async () => {
      const response = await classArmsApi.getTotalClassArmsCount()
      return response.data!
    },
    staleTime: 5 * 60 * 1000,
  })

  return {
    totalCount: totalCountQuery.data ?? 0,
    isLoading: totalCountQuery.isLoading,
    isError: totalCountQuery.isError,
  }
}

/**
 * Get class arms count by section
 */
export function useClassArmsCountBySection(section: SchoolSection | null) {
  return useQuery({
    queryKey: ['class-arms', 'stats', 'count-by-section', section],
    queryFn: async () => {
      const response = await classArmsApi.getClassArmsCountBySection(section!)
      return response.data!
    },
    enabled: !!section,
    staleTime: 5 * 60 * 1000,
  })
}

// ============================================================================
// MUTATION HOOKS - Modifying Data
// ============================================================================

/**
 * Create a new class arm
 */
export function useCreateClassArm() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateClassArmRequest) => {
      const response = await classArmsApi.createClassArm(data)
      return response.data!
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['class-arms'] })
      toast.success(`Class arm "${data.fullName}" created successfully!`)
    },

    onError: (error: any) => {
      const message = error?.message || 'Failed to create class arm'
      toast.error(message)
    },
  })
}

/**
 * Update an existing class arm
 */
export function useUpdateClassArm() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateClassArmRequest }) => {
      const response = await classArmsApi.updateClassArm(id, data)
      return response.data!
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['class-arms'] })
      queryClient.invalidateQueries({ queryKey: ['class-arms', data.id] })
      toast.success(`Class arm "${data.fullName}" updated successfully!`)
    },

    onError: (error: any) => {
      const message = error?.message || 'Failed to update class arm'
      toast.error(message)
    },
  })
}

/**
 * Delete a class arm (soft delete)
 */
export function useDeleteClassArm() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      await classArmsApi.deleteClassArm(id)
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['class-arms'] })
      toast.success('Class arm deleted successfully!')
    },

    onError: (error: any) => {
      const message = error?.message || 'Failed to delete class arm'
      toast.error(message)
    },
  })
}
