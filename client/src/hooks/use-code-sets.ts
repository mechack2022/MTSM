// ============================================================================
// CODE SET HOOKS - React Query Hooks for CodeSet API
// ============================================================================
// Code sets are used for dropdown options (Academic Years, Grades, etc.)
// ============================================================================

import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api-client'
import { queryKeys } from '@/lib/query-client'
import type { CodeSet } from '@/types'

// ============================================================================
// GET ALL CODE SETS
// ============================================================================

export function useCodeSets() {
  return useQuery({
    queryKey: queryKeys.codeSets.all,
    queryFn: async () => {
      const response = await api.get<CodeSet[]>('/code-sets')
      return response.data!
    },
    staleTime: 30 * 60 * 1000, // 30 minutes (code sets rarely change)
    gcTime: 60 * 60 * 1000, // 1 hour
  })
}

// ============================================================================
// GET CODE SETS BY GROUP
// ============================================================================

export function useCodeSetsByGroup(groupCode: string | null) {
  return useQuery({
    queryKey: queryKeys.codeSets.byGroup(groupCode!),
    queryFn: async () => {
      const response = await api.get<CodeSet[]>('/code-sets', {
        params: { groupCode },
      })
      return response.data!
    },
    enabled: !!groupCode,
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  })
}

// ============================================================================
// SPECIFIC CODE SET GROUP HOOKS (For Better Developer Experience)
// ============================================================================

/**
 * Get Academic Years code sets
 * Example: 2023/2024, 2024/2025
 */
export function useAcademicYears() {
  return useCodeSetsByGroup('ACADEMIC_YEAR')
}

/**
 * Get Grade Levels code sets
 * Example: Grade 1, Grade 2, ..., Grade 12
 */
export function useGradeLevels() {
  return useCodeSetsByGroup('GRADE_LEVEL')
}

/**
 * Get Attendance Status code sets
 * Example: PRESENT, ABSENT, LATE, EXCUSED
 */
export function useAttendanceStatuses() {
  return useCodeSetsByGroup('ATTENDANCE_STATUS')
}

/**
 * Get Gender code sets
 * Example: MALE, FEMALE, OTHER, PREFER_NOT_TO_SAY
 */
export function useGenders() {
  return useCodeSetsByGroup('GENDER')
}

/**
 * Get Enrollment Status code sets
 * Example: ACTIVE, WITHDRAWN, COMPLETED
 */
export function useEnrollmentStatuses() {
  return useCodeSetsByGroup('ENROLLMENT_STATUS')
}

/**
 * Get Enrollment Type code sets
 * Example: NEW, TRANSFER_IN, RETURNING
 */
export function useEnrollmentTypes() {
  return useCodeSetsByGroup('ENROLLMENT_TYPE')
}

/**
 * Get User Role code sets
 * Example: TEACHER, ADMIN, PRINCIPAL, DISTRICT_ADMIN
 */
export function useUserRoles() {
  return useCodeSetsByGroup('USER_ROLE')
}

/**
 * Get Access Scope code sets
 * Example: SYSTEM, TENANT, ASSIGNED_SCHOOLS, OWN
 */
export function useAccessScopes() {
  return useCodeSetsByGroup('ACCESS_SCOPE')
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Helper to get code set value by code
 * Usage: const gradeName = getCodeSetValue(gradeLevels, 'GRADE_1')
 */
export function getCodeSetValue(
  codeSets: CodeSet[] | undefined,
  code: string
): string | undefined {
  return codeSets?.find((cs) => cs.code === code)?.value
}

/**
 * Helper to get code set by code
 */
export function getCodeSet(
  codeSets: CodeSet[] | undefined,
  code: string
): CodeSet | undefined {
  return codeSets?.find((cs) => cs.code === code)
}

/**
 * Helper to filter active code sets
 */
export function getActiveCodeSets(codeSets: CodeSet[] | undefined): CodeSet[] {
  return codeSets?.filter((cs) => cs.isActive) || []
}

/**
 * Helper to sort code sets by display order
 */
export function sortCodeSetsByOrder(codeSets: CodeSet[]): CodeSet[] {
  return [...codeSets].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
}
