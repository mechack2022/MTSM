// ============================================================================
// ZUSTAND STORE - Global Client State Management
// ============================================================================
// This handles:
// - User authentication state
// - Current context (selected school, class, date)
// - Offline queue
// - Network status
// - UI state
// ============================================================================

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type {
  User,
  Tenant,
  School,
  ClassSection,
  OfflineAction,
} from '@/types'

// ============================================================================
// STORE INTERFACE
// ============================================================================

interface AppStore {
  // ==================== AUTHENTICATION ====================
  user: User | null
  token: string | null
  refreshToken: string | null
  tenant: Tenant | null
  assignedSchools: School[]

  setAuth: (data: {
    user: User
    token: string
    refreshToken?: string
    tenant: Tenant | null
    assignedSchools: School[]
  }) => void
  clearAuth: () => void
  updateUser: (user: Partial<User>) => void

  // ==================== CURRENT CONTEXT ====================
  selectedSchool: School | null
  selectedClass: ClassSection | null
  selectedDate: Date

  setSelectedSchool: (school: School | null) => void
  setSelectedClass: (classSection: ClassSection | null) => void
  setSelectedDate: (date: Date) => void

  // ==================== NETWORK STATUS ====================
  isOnline: boolean
  setOnlineStatus: (status: boolean) => void

  // ==================== OFFLINE QUEUE ====================
  offlineQueue: OfflineAction[]
  lastSyncTime: string | null

  addToOfflineQueue: (action: Omit<OfflineAction, 'id' | 'timestamp' | 'synced'>) => void
  removeFromOfflineQueue: (actionId: string) => void
  clearOfflineQueue: () => void
  markActionSynced: (actionId: string) => void
  markActionFailed: (actionId: string, error: string) => void
  updateLastSyncTime: () => void

  // ==================== UI STATE ====================
  isSidebarOpen: boolean
  currentView: 'dashboard' | 'attendance' | 'learners' | 'classes' | 'reports'

  toggleSidebar: () => void
  setCurrentView: (view: AppStore['currentView']) => void

  // ==================== COMPUTED VALUES ====================
  get pendingSyncCount(): number
  get isAuthenticated(): boolean
  get hasSchoolAccess(): boolean
}

// ============================================================================
// CREATE STORE
// ============================================================================

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // ==================== AUTHENTICATION STATE ====================
      user: null,
      token: null,
      refreshToken: null,
      tenant: null,
      assignedSchools: [],

      setAuth: ({ user, token, refreshToken, tenant, assignedSchools }) => {
        console.log('Store.setAuth called with:', {
          userId: user.id,
          userName: user.fullName,
          token: token?.substring(0, 20) + '...',
          role: user.roleName
        })
        set({
          user,
          token,
          refreshToken: refreshToken || null,
          tenant,
          assignedSchools,
          selectedSchool: assignedSchools[0] || null,
        })
        console.log('Store.setAuth completed, state updated')
      },

      clearAuth: () => {
        set({
          user: null,
          token: null,
          refreshToken: null,
          tenant: null,
          assignedSchools: [],
          selectedSchool: null,
          selectedClass: null,
          offlineQueue: [],
        })
      },

      updateUser: (userUpdate) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userUpdate } : null,
        }))
      },

      // ==================== CURRENT CONTEXT ====================
      selectedSchool: null,
      selectedClass: null,
      selectedDate: new Date(),

      setSelectedSchool: (school) => {
        set({ selectedSchool: school, selectedClass: null })
      },

      setSelectedClass: (classSection) => {
        set({ selectedClass: classSection })
      },

      setSelectedDate: (date) => {
        set({ selectedDate: date })
      },

      // ==================== NETWORK STATUS ====================
      isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,

      setOnlineStatus: (status) => {
        set({ isOnline: status })
      },

      // ==================== OFFLINE QUEUE ====================
      offlineQueue: [],
      lastSyncTime: null,

      addToOfflineQueue: (action) => {
        const newAction: OfflineAction = {
          id: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
          synced: false,
          error: null,
          ...action,
        }

        set((state) => ({
          offlineQueue: [...state.offlineQueue, newAction],
        }))
      },

      removeFromOfflineQueue: (actionId) => {
        set((state) => ({
          offlineQueue: state.offlineQueue.filter((a) => a.id !== actionId),
        }))
      },

      clearOfflineQueue: () => {
        set({ offlineQueue: [] })
      },

      markActionSynced: (actionId) => {
        set((state) => ({
          offlineQueue: state.offlineQueue.map((action) =>
            action.id === actionId
              ? { ...action, synced: true, error: null }
              : action
          ),
        }))
      },

      markActionFailed: (actionId, error) => {
        set((state) => ({
          offlineQueue: state.offlineQueue.map((action) =>
            action.id === actionId ? { ...action, error } : action
          ),
        }))
      },

      updateLastSyncTime: () => {
        set({ lastSyncTime: new Date().toISOString() })
      },

      // ==================== UI STATE ====================
      isSidebarOpen: true,
      currentView: 'dashboard',

      toggleSidebar: () => {
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen }))
      },

      setCurrentView: (view) => {
        set({ currentView: view })
      },

      // ==================== COMPUTED VALUES ====================
      get pendingSyncCount() {
        const state = get()
        return state.offlineQueue?.filter((a) => !a.synced).length || 0
      },

      get isAuthenticated() {
        const state = get()
        return !!state.token && !!state.user
      },

      get hasSchoolAccess() {
        const state = get()
        return (state.assignedSchools?.length || 0) > 0 || state.user?.isPlatformAdmin || false
      },
    }),
    {
      name: 'attendance-app-storage', // LocalStorage/IndexedDB key
      storage: createJSONStorage(() => localStorage),

      // Only persist these fields (don't persist UI state, computed values)
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        tenant: state.tenant,
        assignedSchools: state.assignedSchools,
        selectedSchool: state.selectedSchool,
        selectedClass: state.selectedClass,
        offlineQueue: state.offlineQueue,
        lastSyncTime: state.lastSyncTime,
      }),

      // Merge persisted state with default state to ensure all properties exist
      merge: (persistedState, currentState) => {
        return {
          ...currentState,
          ...(persistedState as Partial<AppStore>),
          // Ensure offlineQueue is always an array
          offlineQueue: (persistedState as any)?.offlineQueue || [],
          // Ensure assignedSchools is always an array
          assignedSchools: (persistedState as any)?.assignedSchools || [],
        }
      },

      // Add debugging
      onRehydrateStorage: () => {
        console.log('Store: Starting rehydration from localStorage')
        return (state, error) => {
          if (error) {
            console.error('Store: Rehydration failed!', error)
          } else {
            console.log('Store: Rehydration completed:', {
              hasUser: !!state?.user,
              hasToken: !!state?.token,
              userName: state?.user?.fullName
            })
          }
        }
      },
    }
  )
)

// ============================================================================
// CUSTOM HOOKS FOR COMMON SELECTIONS
// ============================================================================

export const useAuth = () => {
  const user = useAppStore((state) => state.user)
  const token = useAppStore((state) => state.token)
  const tenant = useAppStore((state) => state.tenant)
  const isAuthenticated = useAppStore((state) => state.isAuthenticated)
  const setAuth = useAppStore((state) => state.setAuth)
  const clearAuth = useAppStore((state) => state.clearAuth)

  return {
    user,
    token,
    tenant,
    isAuthenticated,
    setAuth,
    clearAuth,
  }
}

export const useCurrentContext = () => {
  const selectedSchool = useAppStore((state) => state.selectedSchool)
  const selectedClass = useAppStore((state) => state.selectedClass)
  const selectedDate = useAppStore((state) => state.selectedDate)
  const setSelectedSchool = useAppStore((state) => state.setSelectedSchool)
  const setSelectedClass = useAppStore((state) => state.setSelectedClass)
  const setSelectedDate = useAppStore((state) => state.setSelectedDate)

  return {
    selectedSchool,
    selectedClass,
    selectedDate,
    setSelectedSchool,
    setSelectedClass,
    setSelectedDate,
  }
}

export const useOfflineQueue = () => {
  const offlineQueue = useAppStore((state) => state.offlineQueue)
  const pendingSyncCount = useAppStore((state) => state.pendingSyncCount)
  const lastSyncTime = useAppStore((state) => state.lastSyncTime)
  const addToOfflineQueue = useAppStore((state) => state.addToOfflineQueue)
  const removeFromOfflineQueue = useAppStore((state) => state.removeFromOfflineQueue)
  const clearOfflineQueue = useAppStore((state) => state.clearOfflineQueue)
  const markActionSynced = useAppStore((state) => state.markActionSynced)
  const markActionFailed = useAppStore((state) => state.markActionFailed)
  const updateLastSyncTime = useAppStore((state) => state.updateLastSyncTime)

  return {
    offlineQueue,
    pendingSyncCount,
    lastSyncTime,
    addToOfflineQueue,
    removeFromOfflineQueue,
    clearOfflineQueue,
    markActionSynced,
    markActionFailed,
    updateLastSyncTime,
  }
}

export const useNetworkStatus = () => {
  const isOnline = useAppStore((state) => state.isOnline)
  const setOnlineStatus = useAppStore((state) => state.setOnlineStatus)

  return {
    isOnline,
    setOnlineStatus,
  }
}
