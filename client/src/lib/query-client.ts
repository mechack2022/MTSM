// ============================================================================
// REACT QUERY (TanStack Query) CONFIGURATION
// ============================================================================
// Expert-level configuration with:
// - Smart caching strategies
// - Automatic refetching
// - Optimistic updates
// - Error handling
// - Offline support
// ============================================================================

import { QueryClient, QueryClientConfig } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { ApiError } from '@/types'

// ============================================================================
// QUERY CLIENT CONFIGURATION
// ============================================================================

const queryConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      // ============ STALE TIME ============
      // Data is considered fresh for 5 minutes
      staleTime: 5 * 60 * 1000, // 5 minutes

      // ============ CACHE TIME ============
      // Inactive queries cached for 10 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)

      // ============ REFETCH BEHAVIOR ============
      // Refetch on window focus for fresh data
      refetchOnWindowFocus: true,

      // Refetch on reconnect after being offline
      refetchOnReconnect: true,

      // Don't refetch on mount if data is fresh
      refetchOnMount: true,

      // ============ RETRY LOGIC ============
      // Retry failed requests 3 times with exponential backoff
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors (client errors)
        if (error?.code?.startsWith('4')) return false

        // Don't retry on auth errors
        if (error?.code === 'UNAUTHORIZED') return false

        // Retry up to 3 times for server errors
        return failureCount < 3
      },

      retryDelay: (attemptIndex) => {
        // Exponential backoff: 1s, 2s, 4s
        return Math.min(1000 * 2 ** attemptIndex, 30000)
      },

      // ============ ERROR HANDLING ============
      onError: (error: any) => {
        console.error('[Query Error]', error)
        handleQueryError(error)
      },

      // ============ NETWORK MODE ============
      // How to behave when offline
      networkMode: 'online', // 'online' | 'always' | 'offlineFirst'
    },

    mutations: {
      // ============ RETRY LOGIC ============
      // Don't retry mutations by default (they're not idempotent)
      retry: false,

      // ============ ERROR HANDLING ============
      onError: (error: any) => {
        console.error('[Mutation Error]', error)
        handleMutationError(error)
      },

      // ============ NETWORK MODE ============
      networkMode: 'online',
    },
  },
}

export const queryClient = new QueryClient(queryConfig)

// ============================================================================
// ERROR HANDLERS
// ============================================================================

function handleQueryError(error: ApiError | any) {
  // Don't show errors for background refetches
  // Only show for user-initiated actions

  const message = error?.message || 'An error occurred while fetching data'

  // Silent errors (don't toast)
  if (error?.code === 'NETWORK_ERROR' || error?.code === 'TIMEOUT') {
    console.warn('[Silent Query Error]', message)
    return
  }

  // Show toast for other errors
  // toast.error(message, {
  //   duration: 4000,
  //   id: error?.code, // Prevent duplicate toasts
  // })
}

function handleMutationError(error: ApiError | any) {
  const message = error?.message || 'An error occurred'

  // Show error toast
  toast.error(message, {
    duration: 5000,
    id: error?.code,
  })
}

// ============================================================================
// QUERY KEY FACTORY
// ============================================================================
// Centralized query key management for consistency

export const queryKeys = {
  // Authentication
  auth: {
    current: ['auth', 'current'] as const,
  },

  // Schools
  schools: {
    all: ['schools'] as const,
    detail: (id: string) => ['schools', id] as const,
  },

  // Code Sets
  codeSets: {
    all: ['code-sets'] as const,
    byGroup: (group: string) => ['code-sets', group] as const,
  },

  // Learners
  learners: {
    all: ['learners'] as const,
    active: ['learners', 'active'] as const,
    bySchool: (schoolId: string) => ['learners', 'school', schoolId] as const,
    byGrade: (gradeId: string) => ['learners', 'grade', gradeId] as const,
    detail: (id: string) => ['learners', id] as const,
  },

  // Classes
  classes: {
    all: ['classes'] as const,
    active: ['classes', 'active'] as const,
    bySchool: (schoolId: string) => ['classes', 'school', schoolId] as const,
    byYear: (yearId: string) => ['classes', 'year', yearId] as const,
    detail: (id: string) => ['classes', id] as const,
  },

  // Enrollments
  enrollments: {
    all: ['enrollments'] as const,
    byClass: (classId: string) => ['enrollments', 'class', classId] as const,
    byLearner: (learnerId: string) => ['enrollments', 'learner', learnerId] as const,
    byYear: (yearId: string) => ['enrollments', 'year', yearId] as const,
    detail: (id: string) => ['enrollments', id] as const,
  },

  // Attendance
  attendance: {
    all: ['attendance'] as const,
    byClass: (classId: string, date: string) =>
      ['attendance', 'class', classId, date] as const,
    byLearner: (learnerId: string) => ['attendance', 'learner', learnerId] as const,
    byDateRange: (startDate: string, endDate: string) =>
      ['attendance', 'range', startDate, endDate] as const,
    detail: (id: string) => ['attendance', id] as const,
  },
} as const

// ============================================================================
// CACHE INVALIDATION HELPERS
// ============================================================================

export const invalidateQueries = {
  // Invalidate all learner queries
  learners: () => queryClient.invalidateQueries({ queryKey: queryKeys.learners.all }),

  // Invalidate all class queries
  classes: () => queryClient.invalidateQueries({ queryKey: queryKeys.classes.all }),

  // Invalidate all enrollment queries
  enrollments: () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.enrollments.all }),

  // Invalidate all attendance queries
  attendance: () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.attendance.all }),

  // Invalidate attendance for specific class and date
  attendanceByClass: (classId: string, date: string) =>
    queryClient.invalidateQueries({
      queryKey: queryKeys.attendance.byClass(classId, date),
    }),

  // Invalidate all data (after login/logout)
  all: () => queryClient.invalidateQueries(),
}

// ============================================================================
// PREFETCH HELPERS
// ============================================================================

export const prefetchQueries = {
  // Prefetch learners for a school
  learnersBySchool: async (schoolId: string, fetcher: () => Promise<any>) => {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.learners.bySchool(schoolId),
      queryFn: fetcher,
    })
  },

  // Prefetch classes for a school
  classesBySchool: async (schoolId: string, fetcher: () => Promise<any>) => {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.classes.bySchool(schoolId),
      queryFn: fetcher,
    })
  },
}

export default queryClient
