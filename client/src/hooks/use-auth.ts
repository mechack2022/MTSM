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
      // Use Direct Access Grants (Resource Owner Password Credentials)
      const keycloakUrl = import.meta.env.VITE_KEYCLOAK_URL || 'http://localhost:8080'
      const realm = import.meta.env.VITE_KEYCLOAK_REALM || 'MTSMS'
      const clientId = import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'mtsms-frontend'

      const tokenEndpoint = `${keycloakUrl}/realms/${realm}/protocol/openid-connect/token`

      const body = new URLSearchParams({
        grant_type: 'password',
        client_id: clientId,
        username: credentials.username,
        password: credentials.password,
      })

      const response = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      })

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Invalid credentials' }))
        throw new Error(error.error_description || error.error || 'Login failed')
      }

      const tokens = await response.json()

      // Decode JWT to get user info
      const tokenParts = tokens.access_token.split('.')
      const tokenParsed = JSON.parse(atob(tokenParts[1]))

      // Extract role
      const roles = tokenParsed.realm_access?.roles || []
      let role = 'USER'
      if (roles.includes('platform_admin')) role = 'PLATFORM_ADMIN'
      else if (roles.includes('tenant_admin')) role = 'TENANT_ADMIN'
      else if (roles.includes('school_admin')) role = 'SCHOOL_ADMIN'
      else if (roles.includes('principal')) role = 'PRINCIPAL'
      else if (roles.includes('head_teacher')) role = 'HEAD_TEACHER'
      else if (roles.includes('class_teacher')) role = 'CLASS_TEACHER'
      else if (roles.includes('subject_teacher')) role = 'SUBJECT_TEACHER'
      else if (roles.includes('teacher')) role = 'TEACHER'

      return {
        userId: tokenParsed.sub,
        username: tokenParsed.preferred_username || tokenParsed.email,
        fullName: `${tokenParsed.given_name || ''} ${tokenParsed.family_name || ''}`.trim() || tokenParsed.preferred_username,
        role,
        token: tokens.access_token,
        refreshToken: tokens.refresh_token,
        tenantId: tokenParsed.tenant_id || null,
        schoolId: tokenParsed.school_id || null,
      }
    },

    onSuccess: (data) => {
      console.log('useLogin.onSuccess: Starting login success handler', { role: data.role })

      // Create user object from response
      const user = {
        id: data.userId,
        tenantId: data.tenantId || '',
        username: data.username,
        fullName: data.fullName,
        roleId: data.role,
        roleName: data.role,
        isActive: true,
        isPlatformAdmin: data.role === 'PLATFORM_ADMIN',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      console.log('useLogin.onSuccess: Created user object:', user)

      // Save auth data to store
      setAuth({
        user,
        token: data.token,
        refreshToken: data.refreshToken,
        tenant: null,
        assignedSchools: [],
      })

      // Also update Keycloak instance with the token (for compatibility with other parts)
      import('@/lib/keycloak').then(({ default: keycloak }) => {
        keycloak.token = data.token
        keycloak.refreshToken = data.refreshToken
        keycloak.authenticated = true
      })

      console.log('useLogin.onSuccess: Auth state saved to store')

      toast.success(`Welcome back, ${data.fullName || data.username}!`)

      // Route to appropriate dashboard based on role
      setTimeout(() => {
        if (data.role === 'PLATFORM_ADMIN') {
          console.log('useLogin.onSuccess: Navigating PLATFORM_ADMIN to /tenants')
          navigate('/tenants', { replace: true })
        } else if (data.role === 'TENANT_ADMIN') {
          console.log('useLogin.onSuccess: Navigating TENANT_ADMIN to /tenant-admin/dashboard')
          navigate('/tenant-admin/dashboard', { replace: true })
        } else {
          console.log('useLogin.onSuccess: Navigating to /dashboard')
          navigate('/dashboard', { replace: true })
        }
      }, 300)
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
      // For Direct Access Grants, we just need to clear local state
      // Optionally, we could call Keycloak's logout endpoint if needed
      const { refreshToken } = useAppStore.getState()

      if (refreshToken) {
        try {
          const keycloakUrl = import.meta.env.VITE_KEYCLOAK_URL || 'http://localhost:8080'
          const realm = import.meta.env.VITE_KEYCLOAK_REALM || 'MTSMS'
          const clientId = import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'mtsms-frontend'

          // Call Keycloak logout endpoint
          const logoutEndpoint = `${keycloakUrl}/realms/${realm}/protocol/openid-connect/logout`

          const body = new URLSearchParams({
            client_id: clientId,
            refresh_token: refreshToken,
          })

          await fetch(logoutEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: body.toString(),
          }).catch(() => {
            // Ignore errors, we'll clear local state anyway
          })
        } catch (error) {
          console.log('Keycloak logout call failed, clearing local state anyway')
        }
      }

      return true
    },

    onSuccess: () => {
      // Clear all cached data
      invalidateQueries.all()

      // Clear auth state
      clearAuth()

      // Navigate to landing page
      navigate('/', { replace: true })

      toast.success('Logged out successfully')
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
