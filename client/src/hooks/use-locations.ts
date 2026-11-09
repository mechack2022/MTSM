// ============================================================================
// LOCATION HOOKS - Nigerian States and Local Government Areas
// ============================================================================

import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api-client'
import type { State, LocalGovernment } from '@/types'

// ============================================================================
// QUERY HOOKS
// ============================================================================

/**
 * Fetch all Nigerian states
 */
export function useStates() {
  return useQuery({
    queryKey: ['locations', 'states'],
    queryFn: async () => {
      const response = await api.get<State[]>('/locations/states')
      return response.data!
    },
    staleTime: 60 * 60 * 1000, // 1 hour - states rarely change
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  })
}

/**
 * Fetch local governments for a specific state
 * @param stateId - The UUID of the state
 */
export function useLocalGovernments(stateId: string | null) {
  return useQuery({
    queryKey: ['locations', 'local-governments', stateId],
    queryFn: async () => {
      const response = await api.get<LocalGovernment[]>(`/locations/states/${stateId}/lgas`)
      return response.data!
    },
    enabled: !!stateId, // Only fetch when stateId is provided
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  })
}
