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

  if (isOnline && pendingSyncCount === 0) {
    return null // Don't show indicator when online and no pending changes
  }

  return (
    <div
      className={`
        fixed bottom-4 right-4 z-50
        px-4 py-2 rounded-lg shadow-lg
        flex items-center gap-2
        ${isOnline ? 'bg-green-500' : 'bg-red-500'}
        text-white text-sm font-medium
      `}
    >
      <div
        className={`
          w-2 h-2 rounded-full
          ${isOnline ? 'bg-white animate-pulse' : 'bg-white'}
        `}
      />
      <span>
        {isOnline ? (
          pendingSyncCount > 0 ? (
            `Syncing ${pendingSyncCount} changes...`
          ) : (
            'Online'
          )
        ) : (
          `Offline - ${pendingSyncCount} changes pending`
        )}
      </span>
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
