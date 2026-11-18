import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import api from '@/lib/api-client'
import { queryKeys } from '@/lib/query-client'

export interface AuditLog {
  id: string
  timestamp: string
  date: string
  userName: string
  userRole: string
  userInitials: string
  avatarColor: string
  category: string
  categoryDisplayName: string
  categoryColor: string
  eventTitle: string
  eventDescription?: string
  affectedEntity?: string
  affectedEntityType?: string
  ipAddress?: string
  deviceInfo?: string
  geoLocation?: string
  changeFrom?: string
  changeTo?: string
  changeReason?: string
  verificationMethod?: string
  eventTimestamp: string
  severity?: string
  isSystemGenerated: boolean
}

export interface AuditLogStatistics {
  totalEvents: number
  securityEvents: number
  policyEvents: number
  staffEvents: number
  eventsThisWeek: number
}

export interface AuditLogsPage {
  content: AuditLog[]
  totalElements: number
  totalPages: number
  size: number
  number: number
  first: boolean
  last: boolean
  empty: boolean
}

export interface CreateAuditLogRequest {
  tenantId: string
  schoolId?: string
  userId?: string
  userName: string
  userRole: string
  category: string
  eventTitle: string
  eventDescription?: string
  affectedEntity?: string
  affectedEntityType?: string
  affectedEntityId?: string
  ipAddress?: string
  deviceInfo?: string
  geoLocation?: string
  changeFrom?: string
  changeTo?: string
  changeReason?: string
  verificationMethod?: string
  severity?: string
  isSystemGenerated?: boolean
  metadata?: string
}

export interface AuditLogsFilters {
  searchTerm?: string
  category?: string
  schoolId?: string
  severity?: string
  page?: number
  size?: number
}

export function useAuditLogs(filters?: AuditLogsFilters) {
  const params = new URLSearchParams()

  if (filters?.searchTerm) params.append('searchTerm', filters.searchTerm)
  if (filters?.category) params.append('category', filters.category)
  if (filters?.schoolId) params.append('schoolId', filters.schoolId)
  if (filters?.severity) params.append('severity', filters.severity)
  if (filters?.page !== undefined) params.append('page', filters.page.toString())
  if (filters?.size !== undefined) params.append('size', filters.size.toString())

  const queryString = params.toString()

  return useQuery({
    queryKey: ['audit-logs', filters],
    queryFn: async () => {
      const url = `/audit-logs${queryString ? `?${queryString}` : ''}`
      const response = await api.get<AuditLogsPage>(url)
      return response.data!
    },
    staleTime: 30 * 1000,
  })
}

export function useAuditLogStatistics() {
  return useQuery({
    queryKey: ['audit-logs', 'statistics'],
    queryFn: async () => {
      const response = await api.get<AuditLogStatistics>('/audit-logs/statistics')
      return response.data!
    },
    staleTime: 60 * 1000,
  })
}

export function useCreateAuditLog() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateAuditLogRequest) => {
      const response = await api.post<AuditLog>('/audit-logs', data)
      return response.data!
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['audit-logs'] })
    },

    onError: (error: any) => {
      toast.error(error?.message || 'Failed to create audit log')
    },
  })
}
