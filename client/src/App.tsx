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

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { queryClient } from '@/lib/query-client'
import { useSyncManager, NetworkStatusIndicator } from '@/lib/sync-manager'
import { useAuth } from '@/store'

// ============================================================================
// PAGES (Placeholder imports - to be created)
// ============================================================================

// These will be created in the next steps
import LoginPage from '@/pages/login'
import DashboardPage from '@/pages/dashboard'
import AttendancePage from '@/pages/attendance'
import LearnersPage from '@/pages/learners'
import ClassesPage from '@/pages/classes'
import ReportsPage from '@/pages/reports'

// ============================================================================
// PROTECTED ROUTE COMPONENT
// ============================================================================

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, token } = useAuth()

  if (!user || !token) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

// ============================================================================
// APP PROVIDERS
// ============================================================================

function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>

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
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />

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

      {/* Default Redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* 404 Not Found */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
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
