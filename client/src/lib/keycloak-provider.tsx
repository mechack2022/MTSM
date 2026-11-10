import { ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import keycloak from './keycloak'
import { useAppStore } from '@/store'
import api from './api-client'
import type { Tenant } from '@/types'

interface KeycloakProviderProps {
  children: ReactNode
}

export function KeycloakProvider({ children }: KeycloakProviderProps) {
  const [initialized, setInitialized] = useState(false)
  const navigate = useNavigate()
  const setAuth = useAppStore((state) => state.setAuth)
  const clearAuth = useAppStore((state) => state.clearAuth)

  // Fetch tenant data from backend
  const fetchTenantData = async (tenantId: string, user: any, token: string, refreshToken?: string) => {
    try {
      console.log('Fetching tenant data for tenant ID:', tenantId)
      // Use /tenants/me endpoint which is accessible by tenant_admin role
      const response = await api.get<Tenant>(`/tenants/me`)
      const tenantData = response.data

      console.log('Tenant data fetched successfully:', tenantData)

      setAuth({
        user,
        token,
        refreshToken,
        tenant: tenantData,
        assignedSchools: [],
      })
    } catch (error) {
      console.error('Failed to fetch tenant data:', error)
      // Set auth anyway without tenant data
      setAuth({
        user,
        token,
        refreshToken,
        tenant: null,
        assignedSchools: [],
      })
    }
  }

  useEffect(() => {
    // Initialize Keycloak with Authorization Code + PKCE flow
    keycloak
      .init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
        pkceMethod: 'S256',
        checkLoginIframe: false,
      })
      .then((authenticated) => {
        console.log('Keycloak initialized:', { authenticated })
        setInitialized(true)

        if (authenticated && keycloak.token && keycloak.tokenParsed) {
          // User is already authenticated (SSO or returning user)
          const tokenParsed = keycloak.tokenParsed
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

          const user = {
            id: tokenParsed.sub || '',
            tenantId: tokenParsed.tenant_id || '',
            username: tokenParsed.preferred_username || tokenParsed.email || '',
            fullName: `${tokenParsed.given_name || ''} ${tokenParsed.family_name || ''}`.trim() || tokenParsed.preferred_username || '',
            roleId: role,
            roleName: role,
            isActive: true,
            isPlatformAdmin: role === 'PLATFORM_ADMIN',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }

          // DISABLED: Fetching tenant data causes infinite loop
          // Even though JWT has tenant_id, the /tenants/me endpoint might not be ready
          // Backend will use tenant_id from JWT directly, so we don't need to fetch it here
          setAuth({
            user,
            token: keycloak.token,
            refreshToken: keycloak.refreshToken,
            tenant: null,
            assignedSchools: [],
          })

          console.log('User authenticated via SSO:', user)
        }
      })
      .catch((error) => {
        console.error('Keycloak initialization failed:', error)
        setInitialized(true)
      })

    // Token refresh handler
    keycloak.onTokenExpired = () => {
      console.log('Token expired, refreshing...')
      keycloak
        .updateToken(30)
        .then((refreshed) => {
          if (refreshed && keycloak.token) {
            console.log('Token refreshed successfully')
            const currentState = useAppStore.getState()
            if (currentState.user) {
              setAuth({
                ...currentState,
                token: keycloak.token,
                refreshToken: keycloak.refreshToken,
              })
            }
          }
        })
        .catch(() => {
          console.error('Token refresh failed')
          clearAuth()
          navigate('/', { replace: true })
        })
    }

    keycloak.onAuthLogout = () => {
      console.log('User logged out')
      clearAuth()
      navigate('/', { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!initialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Initializing...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

function getRoleName(tokenParsed: any): string {
  const realmAccess = tokenParsed.realm_access
  if (!realmAccess || !realmAccess.roles) return 'USER'

  const roles = realmAccess.roles as string[]

  if (roles.includes('platform_admin')) return 'PLATFORM_ADMIN'
  if (roles.includes('tenant_admin')) return 'TENANT_ADMIN'
  if (roles.includes('school_admin')) return 'SCHOOL_ADMIN'
  if (roles.includes('principal')) return 'PRINCIPAL'
  if (roles.includes('head_teacher')) return 'HEAD_TEACHER'
  if (roles.includes('class_teacher')) return 'CLASS_TEACHER'
  if (roles.includes('subject_teacher')) return 'SUBJECT_TEACHER'
  if (roles.includes('teacher')) return 'TEACHER'
  if (roles.includes('student')) return 'STUDENT'
  if (roles.includes('guardian')) return 'GUARDIAN'

  return 'USER'
}

function hasRealmRole(tokenParsed: any, role: string): boolean {
  const realmAccess = tokenParsed.realm_access
  if (!realmAccess || !realmAccess.roles) return false
  return realmAccess.roles.includes(role)
}
