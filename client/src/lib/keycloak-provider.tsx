import { ReactNode, useEffect, useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import keycloak from './keycloak'
import { useAppStore } from '@/store'

interface KeycloakProviderProps {
  children: ReactNode
}

export function KeycloakProvider({ children }: KeycloakProviderProps) {
  const [initialized, setInitialized] = useState(false)
  const hasNavigated = useRef(false)
  const navigate = useNavigate()
  const location = useLocation()
  const setAuth = useAppStore((state) => state.setAuth)
  const clearAuth = useAppStore((state) => state.clearAuth)

  useEffect(() => {
    // Just initialize Keycloak without auto-login
    // We'll use Direct Access Grants for login instead
    setInitialized(true)
    console.log('Keycloak provider initialized (passive mode)')

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
              })
            }
          }
        })
        .catch(() => {
          console.error('Token refresh failed')
          clearAuth()
          keycloak.login()
        })
    }

    keycloak.onAuthLogout = () => {
      console.log('User logged out')
      clearAuth()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setAuth, clearAuth])

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
