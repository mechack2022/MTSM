// DEBUG COMPONENT - Remove after testing
import { useAppStore } from '@/store'

export default function DebugAuthButton() {
  const setAuth = useAppStore((state) => state.setAuth)
  const user = useAppStore((state) => state.user)
  const token = useAppStore((state) => state.token)

  const handleTestAuth = () => {
    console.log('DebugAuthButton: Testing auth...')

    const testUser = {
      id: 'test-123',
      tenantId: '',
      username: 'test@test.com',
      fullName: 'Test User',
      roleId: 'PLATFORM_ADMIN',
      roleName: 'PLATFORM_ADMIN',
      isActive: true,
      isPlatformAdmin: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    console.log('DebugAuthButton: Calling setAuth...')
    setAuth({
      user: testUser,
      token: 'test-token-123',
      tenant: null,
      assignedSchools: [],
    })

    console.log('DebugAuthButton: setAuth called')

    setTimeout(() => {
      const currentUser = useAppStore.getState().user
      const currentToken = useAppStore.getState().token
      console.log('DebugAuthButton: Current state:', {
        hasUser: !!currentUser,
        hasToken: !!currentToken,
        userName: currentUser?.fullName
      })

      // Check localStorage
      const stored = localStorage.getItem('attendance-app-storage')
      console.log('DebugAuthButton: localStorage:', stored)
    }, 500)
  }

  return (
    <div className="fixed bottom-20 left-4 z-50 bg-red-600 text-white p-4 rounded-lg shadow-xl">
      <div className="text-xs mb-2">
        <div>User: {user ? user.fullName : 'null'}</div>
        <div>Token: {token ? 'exists' : 'null'}</div>
      </div>
      <button
        onClick={handleTestAuth}
        className="px-4 py-2 bg-white text-red-600 rounded font-bold hover:bg-gray-100"
      >
        TEST AUTH
      </button>
    </div>
  )
}
