// ============================================================================
// OFFLINE SYNC MANAGER
// ============================================================================
// Handles offline queue synchronization and network status monitoring
// ============================================================================

import { useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'
import { useAppStore, useOfflineQueue, useNetworkStatus } from '@/store'
import api from '@/lib/api-client'
import type { OfflineAction } from '@/types'

// ============================================================================
// SYNC MANAGER HOOK
// ============================================================================

export function useSyncManager() {
  const queryClient = useQueryClient()
  const { isOnline, setOnlineStatus } = useNetworkStatus()
  const {
    offlineQueue,
    pendingSyncCount,
    lastSyncTime,
    markActionSynced,
    markActionFailed,
    removeFromOfflineQueue,
    updateLastSyncTime,
  } = useOfflineQueue()

  // ============================================================================
  // NETWORK STATUS MONITORING
  // ============================================================================

  useEffect(() => {
    const handleOnline = () => {
      console.log('[Sync Manager] Back online')
      setOnlineStatus(true)
      toast.success('Back online! Syncing changes...')
    }

    const handleOffline = () => {
      console.log('[Sync Manager] Gone offline')
      setOnlineStatus(false)
      toast.error('No internet connection. Changes will be saved locally.')
    }

    // Listen to browser online/offline events
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Check initial status
    setOnlineStatus(navigator.onLine)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [setOnlineStatus])

  // ============================================================================
  // AUTO-SYNC WHEN ONLINE
  // ============================================================================

  useEffect(() => {
    if (isOnline && pendingSyncCount > 0) {
      console.log(`[Sync Manager] Syncing ${pendingSyncCount} pending actions`)
      syncOfflineQueue()
    }
  }, [isOnline, pendingSyncCount])

  // ============================================================================
  // SYNC OFFLINE QUEUE
  // ============================================================================

  const syncOfflineQueue = useCallback(async () => {
    const pendingActions = offlineQueue.filter((action) => !action.synced)

    if (pendingActions.length === 0) {
      console.log('[Sync Manager] No pending actions to sync')
      return
    }

    console.log(`[Sync Manager] Syncing ${pendingActions.length} actions`)

    let successCount = 0
    let failureCount = 0

    // Process each action sequentially
    for (const action of pendingActions) {
      try {
        await syncAction(action)
        markActionSynced(action.id)
        successCount++

        // Remove synced action after a delay
        setTimeout(() => {
          removeFromOfflineQueue(action.id)
        }, 5000) // Keep for 5 seconds to show in UI
      } catch (error: any) {
        console.error(`[Sync Manager] Failed to sync action ${action.id}`, error)
        markActionFailed(action.id, error.message)
        failureCount++
      }
    }

    // Update last sync time
    updateLastSyncTime()

    // Invalidate all queries to refresh data
    queryClient.invalidateQueries()

    // Show sync result
    if (successCount > 0 && failureCount === 0) {
      toast.success(`Synced ${successCount} changes successfully!`)
    } else if (successCount > 0 && failureCount > 0) {
      toast.success(`Synced ${successCount} of ${pendingActions.length} changes`)
      toast.error(`${failureCount} changes failed to sync`)
    } else if (failureCount > 0) {
      toast.error(`Failed to sync ${failureCount} changes`)
    }
  }, [
    offlineQueue,
    markActionSynced,
    markActionFailed,
    removeFromOfflineQueue,
    updateLastSyncTime,
    queryClient,
  ])

  // ============================================================================
  // SYNC INDIVIDUAL ACTION
  // ============================================================================

  const syncAction = async (action: OfflineAction): Promise<void> => {
    const { type, entity, data } = action

    switch (entity) {
      case 'ATTENDANCE':
        await syncAttendance(type, data)
        break
      case 'LEARNER':
        await syncLearner(type, data)
        break
      case 'ENROLLMENT':
        await syncEnrollment(type, data)
        break
      default:
        throw new Error(`Unknown entity type: ${entity}`)
    }
  }

  // ============================================================================
  // ENTITY-SPECIFIC SYNC FUNCTIONS
  // ============================================================================

  const syncAttendance = async (
    type: OfflineAction['type'],
    data: any
  ): Promise<void> => {
    switch (type) {
      case 'CREATE':
        await api.post('/attendance', data)
        break
      case 'UPDATE':
        await api.put(`/attendance/${data.id}`, data)
        break
      case 'DELETE':
        await api.delete(`/attendance/${data.id}`)
        break
    }
  }

  const syncLearner = async (
    type: OfflineAction['type'],
    data: any
  ): Promise<void> => {
    switch (type) {
      case 'CREATE':
        await api.post('/learners', data)
        break
      case 'UPDATE':
        await api.put(`/learners/${data.id}`, data)
        break
      case 'DELETE':
        await api.delete(`/learners/${data.id}`)
        break
    }
  }

  const syncEnrollment = async (
    type: OfflineAction['type'],
    data: any
  ): Promise<void> => {
    switch (type) {
      case 'CREATE':
        await api.post('/enrollments', data)
        break
      case 'UPDATE':
        await api.put(`/enrollments/${data.id}`, data)
        break
      case 'DELETE':
        await api.delete(`/enrollments/${data.id}`)
        break
    }
  }

  // ============================================================================
  // MANUAL SYNC TRIGGER
  // ============================================================================

  const manualSync = useCallback(async () => {
    if (!isOnline) {
      toast.error('Cannot sync while offline')
      return
    }

    toast.loading('Syncing...', { id: 'manual-sync' })
    await syncOfflineQueue()
    toast.dismiss('manual-sync')
  }, [isOnline, syncOfflineQueue])

  return {
    isOnline,
    pendingSyncCount,
    lastSyncTime,
    syncOfflineQueue,
    manualSync,
  }
}

// ============================================================================
// NETWORK STATUS INDICATOR COMPONENT
// ============================================================================

export function NetworkStatusIndicator() {
  const { isOnline, pendingSyncCount } = useSyncManager()

  // Always show the indicator to inform users about offline-first capabilities
  return (
    <div
      className={`
        fixed bottom-4 right-4 z-50
        px-5 py-3 rounded-xl shadow-2xl border-2
        flex items-center gap-3
        transition-all duration-300 hover:scale-105
        ${
          isOnline
            ? pendingSyncCount > 0
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 border-emerald-400'
              : 'bg-gradient-to-r from-blue-500 to-indigo-500 border-blue-400'
            : 'bg-gradient-to-r from-orange-500 to-red-500 border-orange-400'
        }
        text-white font-medium backdrop-blur-sm
      `}
    >
      {/* Status Icon */}
      <div className="relative flex items-center justify-center">
        {isOnline ? (
          pendingSyncCount > 0 ? (
            <svg
              className="w-5 h-5 animate-spin"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          )
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"
            />
          </svg>
        )}
        <div
          className={`
            absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-white
            ${isOnline ? 'animate-pulse' : ''}
          `}
        />
      </div>

      {/* Status Text */}
      <div className="flex flex-col">
        <span className="text-sm font-bold leading-tight">
          {isOnline ? (
            pendingSyncCount > 0 ? (
              `Syncing ${pendingSyncCount} change${pendingSyncCount !== 1 ? 's' : ''}...`
            ) : (
              'Online & Synced'
            )
          ) : (
            'Working Offline'
          )}
        </span>
        <span className="text-xs opacity-90 leading-tight">
          {isOnline ? (
            pendingSyncCount > 0 ? (
              'Auto-syncing to cloud'
            ) : (
              'Offline-first ready'
            )
          ) : pendingSyncCount > 0 ? (
            `${pendingSyncCount} pending sync`
          ) : (
            'Changes saved locally'
          )}
        </span>
      </div>

      {/* Pulse animation for offline mode */}
      {!isOnline && (
        <div className="absolute inset-0 rounded-xl border-2 border-white opacity-75 animate-ping" />
      )}
    </div>
  )
}

// ============================================================================
// OFFLINE QUEUE HELPER
// ============================================================================

/**
 * Add an action to the offline queue
 * Use this when making mutations that should be queued when offline
 */
export function useOfflineAction() {
  const addToOfflineQueue = useAppStore((state) => state.addToOfflineQueue)
  const isOnline = useAppStore((state) => state.isOnline)

  const queueAction = useCallback(
    (action: {
      type: 'CREATE' | 'UPDATE' | 'DELETE'
      entity: 'ATTENDANCE' | 'LEARNER' | 'ENROLLMENT'
      data: any
      changeId: string
    }) => {
      if (!isOnline) {
        addToOfflineQueue(action)
        toast.success('Change saved offline. Will sync when online.')
        return true
      }
      return false
    },
    [isOnline, addToOfflineQueue]
  )

  return { queueAction, isOnline }
}
