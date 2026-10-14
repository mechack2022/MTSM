// ============================================================================
// ATTENDANCE HOOKS - React Query Hooks for Attendance API
// ============================================================================
// Most critical hooks for the attendance tracking app
// ============================================================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import api from '@/lib/api-client'
import { queryKeys } from '@/lib/query-client'
import type {
  Attendance,
  MarkAttendanceRequest,
  BulkAttendanceRequest,
  AttendanceResponse,
  AttendanceStats,
} from '@/types'

// ============================================================================
// GET ATTENDANCE BY CLASS AND DATE
// ============================================================================

export function useAttendanceByClass(
  classSectionId: string | null,
  date: string | null
) {
  return useQuery({
    queryKey: queryKeys.attendance.byClass(classSectionId!, date!),
    queryFn: async () => {
      const response = await api.get<AttendanceResponse[]>('/attendance', {
        params: {
          classSectionId,
          date,
        },
      })
      return response.data!
    },
    enabled: !!classSectionId && !!date,
    staleTime: 1 * 60 * 1000, // 1 minute (attendance changes frequently)
    refetchInterval: 2 * 60 * 1000, // Auto-refetch every 2 minutes
  })
}

// ============================================================================
// GET ATTENDANCE BY LEARNER (History)
// ============================================================================

export function useAttendanceByLearner(
  learnerId: string | null,
  startDate?: string,
  endDate?: string
) {
  return useQuery({
    queryKey: queryKeys.attendance.byLearner(learnerId!),
    queryFn: async () => {
      const response = await api.get<AttendanceResponse[]>(
        `/attendance/learner/${learnerId}`,
        {
          params: { startDate, endDate },
        }
      )
      return response.data!
    },
    enabled: !!learnerId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// ============================================================================
// GET ATTENDANCE BY DATE RANGE
// ============================================================================

export function useAttendanceByDateRange(
  startDate: string | null,
  endDate: string | null,
  classSectionId?: string
) {
  return useQuery({
    queryKey: queryKeys.attendance.byDateRange(startDate!, endDate!),
    queryFn: async () => {
      const response = await api.get<AttendanceResponse[]>('/attendance', {
        params: {
          startDate,
          endDate,
          classSectionId,
        },
      })
      return response.data!
    },
    enabled: !!startDate && !!endDate,
    staleTime: 5 * 60 * 1000,
  })
}

// ============================================================================
// GET ATTENDANCE STATISTICS
// ============================================================================

export function useAttendanceStats(
  classSectionId: string | null,
  startDate?: string,
  endDate?: string
) {
  return useQuery({
    queryKey: [
      'attendance',
      'stats',
      classSectionId,
      startDate,
      endDate,
    ] as const,
    queryFn: async () => {
      const response = await api.get<AttendanceStats>('/attendance/stats', {
        params: {
          classSectionId,
          startDate,
          endDate,
        },
      })
      return response.data!
    },
    enabled: !!classSectionId,
    staleTime: 5 * 60 * 1000,
  })
}

// ============================================================================
// MARK SINGLE ATTENDANCE
// ============================================================================

export function useMarkAttendance() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: MarkAttendanceRequest) => {
      const response = await api.post<AttendanceResponse>('/attendance', data)
      return response.data!
    },

    // Optimistic update
    onMutate: async (newAttendance) => {
      const queryKey = queryKeys.attendance.byClass(
        newAttendance.classSectionId,
        newAttendance.attendanceDate
      )

      await queryClient.cancelQueries({ queryKey })

      const previousAttendance = queryClient.getQueryData(queryKey)

      // Optimistically update
      queryClient.setQueryData(
        queryKey,
        (old: AttendanceResponse[] = []) => {
          const existing = old.find(
            (a) => a.learnerId === newAttendance.learnerId
          )

          if (existing) {
            // Update existing attendance
            return old.map((a) =>
              a.learnerId === newAttendance.learnerId
                ? {
                    ...a,
                    status: newAttendance.status,
                    arrivalTime: newAttendance.arrivalTime,
                    notes: newAttendance.notes,
                    updatedAt: new Date().toISOString(),
                  }
                : a
            )
          } else {
            // Add new attendance
            return [
              ...old,
              {
                id: 'temp-id',
                ...newAttendance,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              } as any,
            ]
          }
        }
      )

      return { previousAttendance }
    },

    onError: (err, newAttendance, context) => {
      const queryKey = queryKeys.attendance.byClass(
        newAttendance.classSectionId,
        newAttendance.attendanceDate
      )
      queryClient.setQueryData(queryKey, context?.previousAttendance)
      toast.error('Failed to mark attendance')
    },

    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.attendance.byClass(
          variables.classSectionId,
          variables.attendanceDate
        ),
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.attendance.byLearner(variables.learnerId),
      })
      toast.success('Attendance marked successfully!')
    },
  })
}

// ============================================================================
// BULK MARK ATTENDANCE (Entire Class)
// ============================================================================

export function useBulkAttendance() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: BulkAttendanceRequest) => {
      const response = await api.post<AttendanceResponse[]>(
        '/attendance/bulk',
        data
      )
      return response.data!
    },

    // Optimistic update for bulk
    onMutate: async (bulkData) => {
      const queryKey = queryKeys.attendance.byClass(
        bulkData.classSectionId,
        bulkData.attendanceDate
      )

      await queryClient.cancelQueries({ queryKey })

      const previousAttendance = queryClient.getQueryData(queryKey)

      // Optimistically update all attendance records
      queryClient.setQueryData(queryKey, (old: AttendanceResponse[] = []) => {
        return bulkData.attendanceRecords.map((record) => {
          const existing = old.find((a) => a.learnerId === record.learnerId)

          if (existing) {
            return {
              ...existing,
              status: record.status,
              arrivalTime: record.arrivalTime,
              notes: record.notes,
              updatedAt: new Date().toISOString(),
            }
          } else {
            return {
              id: `temp-${record.learnerId}`,
              tenantId: existing?.tenantId || '',
              schoolId: existing?.schoolId || '',
              classSectionId: bulkData.classSectionId,
              learnerId: record.learnerId,
              attendanceDate: bulkData.attendanceDate,
              status: record.status,
              arrivalTime: record.arrivalTime,
              notes: record.notes,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            } as AttendanceResponse
          }
        })
      })

      return { previousAttendance }
    },

    onError: (err, bulkData, context) => {
      const queryKey = queryKeys.attendance.byClass(
        bulkData.classSectionId,
        bulkData.attendanceDate
      )
      queryClient.setQueryData(queryKey, context?.previousAttendance)
      toast.error('Failed to mark bulk attendance')
    },

    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.attendance.byClass(
          variables.classSectionId,
          variables.attendanceDate
        ),
      })
      // Invalidate all learner queries (since many learners were updated)
      queryClient.invalidateQueries({
        queryKey: queryKeys.attendance.all,
      })
      toast.success(
        `Attendance marked for ${variables.attendanceRecords.length} students!`
      )
    },
  })
}

// ============================================================================
// UPDATE ATTENDANCE
// ============================================================================

export function useUpdateAttendance() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string
      data: Partial<MarkAttendanceRequest>
    }) => {
      const response = await api.put<AttendanceResponse>(`/attendance/${id}`, data)
      return response.data!
    },

    onMutate: async ({ id, data }) => {
      // We don't know the class/date without the full record, so we'll just invalidate after
      const previousAttendance = queryClient.getQueryData(
        queryKeys.attendance.detail(id)
      )
      return { previousAttendance }
    },

    onError: () => {
      toast.error('Failed to update attendance')
    },

    onSuccess: (data) => {
      // Invalidate the specific class/date query
      queryClient.invalidateQueries({
        queryKey: queryKeys.attendance.byClass(
          data.classSectionId,
          data.attendanceDate
        ),
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.attendance.byLearner(data.learnerId),
      })
      toast.success('Attendance updated successfully!')
    },
  })
}

// ============================================================================
// DELETE ATTENDANCE
// ============================================================================

export function useDeleteAttendance() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (attendanceId: string) => {
      await api.delete(`/attendance/${attendanceId}`)
      return attendanceId
    },

    onSuccess: () => {
      // Invalidate all attendance queries
      queryClient.invalidateQueries({ queryKey: queryKeys.attendance.all })
      toast.success('Attendance record deleted')
    },

    onError: () => {
      toast.error('Failed to delete attendance')
    },
  })
}
