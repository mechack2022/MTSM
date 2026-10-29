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
// DUMMY CREDENTIALS FOR TESTING (Remove when connecting to backend)
// ============================================================================
//
// TEST ACCOUNTS - Use these credentials to test different user flows:
//
// 1. SUPER ADMIN (Platform-wide access)
//    Username: superadmin
//    Password: admin123
//    Access: Manage all tenants, system settings
//
// 2. TENANT ADMIN (Organization/District level)
//    Username: tenantadmin
//    Password: admin123
//    Access: Manage schools within tenant
//
// 3. SCHOOL ADMIN (School level)
//    Username: schooladmin
//    Password: admin123
//    Access: Manage specific school
//
// 4. PRINCIPAL (Secondary School level)
//    Username: principal
//    Password: admin123
//    Access: JSS & SSS oversight, specialist faculty
//
// 5. HEAD TEACHER (School level)
//    Username: headteacher
//    Password: admin123
//    Access: Academic management
//
// 6. TEACHER (Classroom level)
//    Username: teacher
//    Password: admin123
//    Access: Classes, attendance, grading
//
// ============================================================================

const DUMMY_USERS = {
  'superadmin': {
    password: 'admin123',
    userId: '1',
    username: 'Dr. Farouk Bello',
    role: 'PLATFORM_ADMIN',
    token: 'dummy-token-superadmin',
    tenantId: null,
    schoolId: null,
  },
  'tenantadmin': {
    password: 'admin123',
    userId: '2',
    username: 'Chief Dr. Adebayo Adeleke',
    role: 'TENANT_ADMIN',
    token: 'dummy-token-tenantadmin',
    tenantId: 'tenant-001',
    schoolId: null,
  },
  'schooladmin': {
    password: 'admin123',
    userId: '3',
    username: 'Mrs. Folashade Adeleke',
    role: 'SCHOOL_ADMIN',
    token: 'dummy-token-schooladmin',
    tenantId: 'tenant-001',
    schoolId: 'school-001',
  },
  'principal': {
    password: 'admin123',
    userId: '4',
    username: 'Principal Okafor',
    role: 'PRINCIPAL',
    token: 'dummy-token-principal',
    tenantId: 'tenant-001',
    schoolId: 'school-001',
  },
  'headteacher': {
    password: 'admin123',
    userId: '5',
    username: 'Mr. Chukwuma Okonkwo',
    role: 'HEAD_TEACHER',
    token: 'dummy-token-headteacher',
    tenantId: 'tenant-001',
    schoolId: 'school-001',
  },
  'teacher': {
    password: 'admin123',
    userId: '6',
    username: 'Ms. Aisha Mohammed',
    role: 'TEACHER',
    token: 'dummy-token-teacher',
    tenantId: 'tenant-001',
    schoolId: 'school-001',
  },
  'classteacher': {
    password: 'admin123',
    userId: '7',
    username: 'Mrs. Patience Okon',
    role: 'CLASS_TEACHER',
    token: 'dummy-token-classteacher',
    tenantId: 'tenant-001',
    schoolId: 'school-001',
  },
}

// ============================================================================
// LOGIN
// ============================================================================

export function useLogin() {
  const navigate = useNavigate()
  const setAuth = useAppStore((state) => state.setAuth)

  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      // DUMMY LOGIN - Replace with real API call when connecting to backend
      await new Promise(resolve => setTimeout(resolve, 800)) // Simulate network delay

      const user = DUMMY_USERS[credentials.username.toLowerCase() as keyof typeof DUMMY_USERS]

      if (!user || user.password !== credentials.password) {
        throw new Error('Invalid username or password')
      }

      return {
        userId: user.userId,
        username: user.username,
        role: user.role,
        token: user.token,
        tenantId: user.tenantId,
        schoolId: user.schoolId,
      } as LoginResponse

      // REAL LOGIN (commented out for now)
      // const response = await api.post<LoginResponse>('/auth/login', credentials)
      // return response.data!
    },

    onSuccess: (data) => {
      console.log('useLogin.onSuccess: Starting login success handler', { role: data.role })

      // Create user object from response
      const user = {
        id: data.userId,
        tenantId: data.tenantId || '',
        username: data.username,
        fullName: data.username,
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
        tenant: null,
        assignedSchools: [],
      })

      console.log('useLogin.onSuccess: Auth state saved to store')

      // Verify the state was actually saved
      const currentState = useAppStore.getState()
      console.log('useLogin.onSuccess: Current store state:', {
        hasUser: !!currentState.user,
        hasToken: !!currentState.token,
        userName: currentState.user?.fullName
      })

      toast.success(`Welcome back, ${data.username}!`)

      // Route to appropriate dashboard based on role with a delay to ensure state is persisted to localStorage
      setTimeout(() => {
        // Double-check the state before navigating
        const finalState = useAppStore.getState()
        console.log('useLogin.onSuccess: State before navigation:', {
          hasUser: !!finalState.user,
          hasToken: !!finalState.token,
          userName: finalState.user?.fullName
        })

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

      // Navigate to landing page (login page is at '/')
      navigate('/')
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
