// ============================================================================
// TEST CREDENTIALS DISPLAY COMPONENT
// ============================================================================
// Shows mock login credentials for testing UI flows

import { useState } from 'react'

interface TestAccount {
  role: string
  username: string
  password: string
  description: string
  color: string
}

const TEST_ACCOUNTS: TestAccount[] = [
  {
    role: 'Super Admin',
    username: 'superadmin',
    password: 'admin123',
    description: 'Platform-wide access, manage all tenants',
    color: 'bg-purple-100 text-purple-800 border-purple-300',
  },
  {
    role: 'Tenant Admin',
    username: 'tenantadmin',
    password: 'admin123',
    description: 'Organization/district level management',
    color: 'bg-blue-100 text-blue-800 border-blue-300',
  },
  {
    role: 'School Admin',
    username: 'schooladmin',
    password: 'admin123',
    description: 'School-level administration',
    color: 'bg-cyan-100 text-cyan-800 border-cyan-300',
  },
  {
    role: 'Principal',
    username: 'principal',
    password: 'admin123',
    description: 'JSS & SSS oversight, specialist faculty',
    color: 'bg-indigo-100 text-indigo-800 border-indigo-300',
  },
  {
    role: 'Head Teacher',
    username: 'headteacher',
    password: 'admin123',
    description: 'Academic management and oversight',
    color: 'bg-green-100 text-green-800 border-green-300',
  },
  {
    role: 'Teacher',
    username: 'teacher',
    password: 'admin123',
    description: 'Classes, attendance, grading',
    color: 'bg-amber-100 text-amber-800 border-amber-300',
  },
  {
    role: 'Class Teacher',
    username: 'classteacher',
    password: 'admin123',
    description: 'Homeroom tutor, one class, multiple subjects',
    color: 'bg-rose-100 text-rose-800 border-rose-300',
  },
]

interface Props {
  onSelectCredentials?: (username: string, password: string) => void
}

export default function TestCredentials({ onSelectCredentials }: Props) {
  const [isOpen, setIsOpen] = useState(true)

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors flex items-center gap-2 z-50"
      >
        <span className="material-symbols-outlined text-[20px]">key</span>
        <span>Show Test Accounts</span>
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-[80vh] overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px]">science</span>
            <div>
              <h3 className="font-semibold">Test Accounts</h3>
              <p className="text-xs text-blue-100">Mock credentials for UI testing</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white/20 rounded transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
      </div>

      {/* Accounts List */}
      <div className="p-4 space-y-3">
        {TEST_ACCOUNTS.map((account) => (
          <div
            key={account.username}
            className={`border rounded-lg p-3 ${account.color} hover:shadow-md transition-shadow`}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-semibold text-sm">{account.role}</h4>
                <p className="text-xs opacity-80 mt-0.5">{account.description}</p>
              </div>
              {onSelectCredentials && (
                <button
                  onClick={() =>
                    onSelectCredentials(account.username, account.password)
                  }
                  className="px-2 py-1 bg-white/50 hover:bg-white/80 rounded text-xs font-medium transition-colors"
                  title="Auto-fill credentials"
                >
                  Use
                </button>
              )}
            </div>
            <div className="space-y-1 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="opacity-60 w-16">User:</span>
                <span className="font-semibold">{account.username}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="opacity-60 w-16">Pass:</span>
                <span className="font-semibold">{account.password}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Notice */}
      <div className="border-t border-gray-200 p-3 bg-gray-50 rounded-b-lg">
        <div className="flex items-start gap-2 text-xs text-gray-600">
          <span className="material-symbols-outlined text-[16px] text-amber-600">
            warning
          </span>
          <p>
            <strong>Dev Mode:</strong> These are mock accounts for testing UI flows.
            No real API calls are made. Remove before production.
          </p>
        </div>
      </div>
    </div>
  )
}
