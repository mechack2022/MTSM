import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api-client'
import type { TenantDashboard } from '@/types/tenant'

export function useTenantDashboard() {
  return useQuery({
    queryKey: ['tenant', 'dashboard'],
    queryFn: async () => {
      const response = await api.get<TenantDashboard>('/tenants/dashboard')
      return response.data!
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retry: (failureCount, error: any) => {
      // Don't retry on 400 errors (missing tenant_id in JWT)
      if (error?.response?.status === 400) {
        return false
      }
      // Retry other errors up to 3 times
      return failureCount < 3
    },
  })
}
