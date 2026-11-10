// ============================================================================
// MAIN APP COMPONENT
// ============================================================================
// Expert-level App setup with:
// - React Query (TanStack Query) provider
// - React Router for routing
// - Toast notifications
// - Offline sync manager
// - Network status monitoring
// - Protected routes
// ============================================================================

import * as React from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { queryClient } from '@/lib/query-client'
import { useSyncManager, NetworkStatusIndicator } from '@/lib/sync-manager'
import { useAuth } from '@/store'
import { KeycloakProvider } from '@/lib/keycloak-provider'

// ============================================================================
// PAGES (Placeholder imports - to be created)
// ============================================================================

// These will be created in the next steps
import LandingPage from '@/pages/landing'
import LoginPage from '@/pages/login'
import SignupPage from '@/pages/signup'
import VerifyEmailPage from '@/pages/verify-email'
import ResendVerificationPage from '@/pages/resend-verification'
import DashboardPage from '@/pages/dashboard'
import TenantsPage from '@/pages/tenants'
import CreateTenantPage from '@/pages/create-tenant'
import UpdateTenantPage from '@/pages/update-tenant'
import ProvisionNewTenantPage from '@/pages/provision-new-tenant'
import TenantDeployedPage from '@/pages/tenant-deployed'
import TenantObserverPage from '@/pages/tenant-observer'
import TenantGazettePage from '@/pages/tenant-gazette'
import TrusteeFirstLoginPage from '@/pages/trustee-first-login'
import TenantAdminDashboardPage from '@/pages/tenant-admin-dashboard'
import MySchoolsCampusesPage from '@/pages/my-schools-campuses'
import UpdateSchoolPage from '@/pages/update-school'
import StaffAppointeesPage from '@/pages/staff-appointees'
import AuditLogsPage from '@/pages/audit-logs'
import GeneralSettingsPage from '@/pages/general-settings'
import CampusArchitecturePage from '@/pages/campus-architecture'
import PrincipalsRegistrarsPage from '@/pages/principals-registrars'
import CodeSetsPage from '@/pages/code-sets'
import SchoolsPage from '@/pages/schools'
import AttendancePage from '@/pages/attendance'
import LearnersPage from '@/pages/learners'
import ClassesPage from '@/pages/classes'
import ReportsPage from '@/pages/reports'
import StaffOnboardingPage from '@/pages/staff-onboarding'
import StaffOnboardingSuccessPage from '@/pages/staff-onboarding-success'
import CompositeCampusDashboard from '@/pages/composite-campus-dashboard'
import HeadTeacherDashboard from '@/pages/head-teacher-dashboard'
import SchoolAdminStaffDirectoryPage from '@/pages/school-admin-staff-directory'
import AddStaffPage from '@/pages/add-staff'
import EditStaffPage from '@/pages/edit-staff'
import AddStaffSuccessPage from '@/pages/add-staff-success'
import EmploymentAssignmentsPage from '@/pages/employment-assignments'

// ============================================================================
// PROTECTED ROUTE COMPONENT
// ============================================================================

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, token } = useAuth()
  const [isHydrated, setIsHydrated] = React.useState(false)

  // Wait for Zustand to hydrate from localStorage
  React.useEffect(() => {
    console.log('ProtectedRoute.useEffect: Setting hydrated to true')
    setIsHydrated(true)
  }, [])

  console.log('ProtectedRoute: Rendering...', {
    isHydrated,
    hasUser: !!user,
    hasToken: !!token,
    userName: user?.fullName
  })

  // Show nothing while hydrating to prevent flash of redirect
  if (!isHydrated) {
    console.log('ProtectedRoute: Not hydrated yet, showing null')
    return null
  }

  // Check authentication after hydration
  if (!user || !token) {
    console.error('❌ ProtectedRoute: NOT AUTHENTICATED! Redirecting to /', {
      user,
      token: token ? 'exists' : 'null'
    })
    return <Navigate to="/" replace />
  }

  console.log('✅ ProtectedRoute: AUTHENTICATED as', user.fullName, 'role:', user.roleName)
  return <>{children}</>
}

// ============================================================================
// APP PROVIDERS
// ============================================================================

function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <KeycloakProvider>{children}</KeycloakProvider>
      </BrowserRouter>

      {/* React Query DevTools (only in development) */}
      {import.meta.env.DEV && (
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      )}

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </QueryClientProvider>
  )
}

// ============================================================================
// SYNC MANAGER WRAPPER
// ============================================================================

function SyncManagerWrapper() {
  // Initialize sync manager
  useSyncManager()

  return <NetworkStatusIndicator />
}

// ============================================================================
// APP ROUTES
// ============================================================================

function AppRoutes() {
  const { user, token } = useAuth()
  const isAuthenticated = !!user && !!token

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route path="/resend-verification" element={<ResendVerificationPage />} />
      <Route path="/trustee-first-login" element={<TrusteeFirstLoginPage />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenants"
        element={
          <ProtectedRoute>
            <TenantsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-tenant"
        element={
          <ProtectedRoute>
            <CreateTenantPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/update-tenant/:id"
        element={
          <ProtectedRoute>
            <UpdateTenantPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/provision-new-tenant"
        element={
          <ProtectedRoute>
            <ProvisionNewTenantPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenant-deployed/:tenantId"
        element={
          <ProtectedRoute>
            <TenantDeployedPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenant-observer/:tenantId"
        element={
          <ProtectedRoute>
            <TenantObserverPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenant-gazette/:tenantId"
        element={
          <ProtectedRoute>
            <TenantGazettePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenant-admin/dashboard"
        element={
          <ProtectedRoute>
            <TenantAdminDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenant-admin/my-schools-campuses"
        element={
          <ProtectedRoute>
            <MySchoolsCampusesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenant-admin/update-school/:schoolId"
        element={
          <ProtectedRoute>
            <UpdateSchoolPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenant-admin/staff-appointees"
        element={
          <ProtectedRoute>
            <StaffAppointeesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenant-admin/audit-logs"
        element={
          <ProtectedRoute>
            <AuditLogsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenant-admin/settings"
        element={
          <ProtectedRoute>
            <GeneralSettingsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenant-admin/campus-architecture"
        element={
          <ProtectedRoute>
            <CampusArchitecturePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenant-admin/principals-registrars"
        element={
          <ProtectedRoute>
            <PrincipalsRegistrarsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/code-sets"
        element={
          <ProtectedRoute>
            <CodeSetsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/schools"
        element={
          <ProtectedRoute>
            <SchoolsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/attendance"
        element={
          <ProtectedRoute>
            <AttendancePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/learners"
        element={
          <ProtectedRoute>
            <LearnersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/classes"
        element={
          <ProtectedRoute>
            <ClassesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <ReportsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/composite-campus-dashboard"
        element={
          <ProtectedRoute>
            <CompositeCampusDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/staff-onboarding"
        element={
          <ProtectedRoute>
            <StaffOnboardingPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/staff-onboarding/success"
        element={
          <ProtectedRoute>
            <StaffOnboardingSuccessPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/staff-directory"
        element={
          <ProtectedRoute>
            <SchoolAdminStaffDirectoryPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-staff"
        element={
          <ProtectedRoute>
            <AddStaffPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-staff/:staffId"
        element={
          <ProtectedRoute>
            <EditStaffPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-staff-success"
        element={
          <ProtectedRoute>
            <AddStaffSuccessPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employment-assignments"
        element={
          <ProtectedRoute>
            <EmploymentAssignmentsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/head-teacher-dashboard"
        element={
          <ProtectedRoute>
            <HeadTeacherDashboard />
          </ProtectedRoute>
        }
      />

      {/* 404 Not Found - redirect to landing or dashboard based on auth */}
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? '/dashboard' : '/'} replace />}
      />
    </Routes>
  )
}

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================

function App() {
  return (
    <AppProviders>
      <SyncManagerWrapper />
      <AppRoutes />
    </AppProviders>
  )
}

export default App
