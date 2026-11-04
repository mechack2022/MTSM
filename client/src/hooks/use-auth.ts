// ============================================================================
// AUTHENTICATION HOOKS
// ============================================================================

import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '@/lib/api-client'
import { useAppStore } from '@/store'
import { invalidateQueries } from '@/lib/query-client'
import type { LoginRequest, LoginResponse } from '@/types'

// ============================================================================
// LOGIN (Authorization Code + PKCE)
// ============================================================================

export function useLogin() {
  return useMutation({
    mutationFn: async (_credentials: LoginRequest) => {
      // Import Keycloak instance
      const { default: keycloak } = await import('@/lib/keycloak')

      // Trigger Authorization Code + PKCE flow
      // This will redirect to Keycloak login page
      await keycloak.login({
        redirectUri: window.location.origin + '/',
      })

      // This code won't execute as the user will be redirected
      // The login completion is handled by KeycloakProvider after redirect
      return { success: true }
    },

    onError: (error: any) => {
      toast.error(error?.message || 'Login failed. Please try again.')
    },
  })
}

// ============================================================================
// LOGOUT (Authorization Code + PKCE)
// ============================================================================

export function useLogout() {
  const clearAuth = useAppStore((state) => state.clearAuth)

  return useMutation({
    mutationFn: async () => {
      // Import Keycloak instance
      const { default: keycloak } = await import('@/lib/keycloak')

      // Clear all cached data
      invalidateQueries.all()

      // Clear local auth state
      clearAuth()

      // Trigger Keycloak logout
      // This will redirect to Keycloak logout page, then back to our app
      await keycloak.logout({
        redirectUri: window.location.origin + '/',
      })

      return { success: true }
    },

    onError: (error: any) => {
      console.error('Logout error:', error)
      // Clear local state anyway
      invalidateQueries.all()
      useAppStore.getState().clearAuth()
      toast.error('Logout encountered an issue, but local session was cleared')
    },
  })
}

// ============================================================================
// GET CURRENT USER (Refresh)
// ============================================================================

export function useRefreshUser() {
  return useMutation({
    mutationFn: async () => {
      const response = await api.get<LoginResponse>('/auth/me')
      return response.data!
    },

    onSuccess: (data) => {
      // Update user in store
      useAppStore.getState().setAuth({
        user: data.user,
        token: useAppStore.getState().token!,
        tenant: data.tenant,
        assignedSchools: data.assignedSchools,
      })
    },
  })
}
