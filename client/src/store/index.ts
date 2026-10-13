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
  tenant: Tenant | null
  assignedSchools: School[]

  setAuth: (data: {
    user: User
    token: string
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
      tenant: null,
      assignedSchools: [],

      setAuth: ({ user, token, tenant, assignedSchools }) => {
        set({
          user,
          token,
          tenant,
          assignedSchools,
          selectedSchool: assignedSchools[0] || null,
        })
      },

      clearAuth: () => {
        set({
          user: null,
          token: null,
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
        return get().offlineQueue.filter((a) => !a.synced).length
      },

      get isAuthenticated() {
        return !!get().token && !!get().user
      },

      get hasSchoolAccess() {
        return get().assignedSchools.length > 0 || get().user?.isPlatformAdmin
      },
    }),
    {
      name: 'attendance-app-storage', // LocalStorage/IndexedDB key
      storage: createJSONStorage(() => localStorage),

      // Only persist these fields (don't persist UI state, computed values)
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        tenant: state.tenant,
        assignedSchools: state.assignedSchools,
        selectedSchool: state.selectedSchool,
        selectedClass: state.selectedClass,
        offlineQueue: state.offlineQueue,
        lastSyncTime: state.lastSyncTime,
      }),
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
