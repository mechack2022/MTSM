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
// LOGIN
// ============================================================================

export function useLogin() {
  const navigate = useNavigate()
  const setAuth = useAppStore((state) => state.setAuth)

  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      const response = await api.post<LoginResponse>('/auth/login', credentials)
      return response.data!
    },

    onSuccess: (data) => {
      // Create user object from response
      const user = {
        id: data.userId,
        tenantId: '',
        username: data.username,
        fullName: data.username,
        roleId: data.role,
        roleName: data.role,
        isActive: true,
        isPlatformAdmin: data.role === 'PLATFORM_ADMIN',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      // Save auth data to store
      setAuth({
        user,
        token: data.token,
        tenant: null,
        assignedSchools: [],
      })

      toast.success(`Welcome back, ${data.username}!`)
      navigate('/dashboard', { replace: true })
    },

    onError: (error: any) => {
      toast.error(error?.message || 'Login failed. Please check your credentials.')
    },
  })
}

// ============================================================================
// LOGOUT
// ============================================================================

export function useLogout() {
  const navigate = useNavigate()
  const clearAuth = useAppStore((state) => state.clearAuth)

  return useMutation({
    mutationFn: async () => {
      // Optional: call logout endpoint if you have one
      // await api.post('/auth/logout')
      return true
    },

    onSuccess: () => {
      // Clear all cached data
      invalidateQueries.all()

      // Clear auth state
      clearAuth()

      toast.success('Logged out successfully')

      // Navigate to login
      navigate('/login')
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
