import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth, useCurrentContext } from '@/store'
import { useLogout } from '@/hooks/use-auth'

export function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const { selectedSchool } = useCurrentContext()
  const { mutate: logout } = useLogout()

  // Check if current page is staff-related
  const isStaffPage = location.pathname.includes('/staff') ||
                      location.pathname.includes('/add-staff') ||
                      location.pathname.includes('/employment')

  const [staffManagementOpen, setStaffManagementOpen] = useState(isStaffPage)

  // Auto-open Staff Management submenu when on staff-related pages
  useEffect(() => {
    if (isStaffPage) {
      setStaffManagementOpen(true)
    }
  }, [isStaffPage])

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/')

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-white shadow-sm z-50 flex flex-col justify-between">
      <div className="flex flex-col flex-1 min-h-0">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm flex-shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-base font-bold text-gray-900 leading-tight truncate">
              {selectedSchool?.name?.split(' ')[0] || 'School'}
            </span>
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider truncate">
              School Admin · {selectedSchool?.campusCode || 'CAMPUS'}
            </span>
          </div>
        </div>

        <div className="px-4 py-2">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-2">
            Platform Info
          </div>
          <div className="px-3 py-2 rounded-lg bg-gray-50 flex items-center justify-between">
            <span className="text-xs text-gray-700 font-medium">
              Multi-Tier School Management System
            </span>
          </div>
        </div>

        <div className="px-4 py-1 my-2">
          <div className="h-px bg-gray-200"></div>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
          <button
            onClick={() => navigate('/school-admin-dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all font-medium text-sm text-left ${
              isActive('/school-admin-dashboard')
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
            </svg>
            <span>Dashboard</span>
          </button>

          <div className="pt-2">
            <button
              onClick={() => setStaffManagementOpen(!staffManagementOpen)}
              className="w-full flex items-center justify-between px-3 py-2 text-gray-600 hover:text-gray-900 transition-all text-xs font-semibold uppercase tracking-wider"
            >
              <span>Staff Management</span>
              <svg
                className={`w-4 h-4 transition-transform ${staffManagementOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {staffManagementOpen && (
              <div className="pl-3 pr-2 mt-1 space-y-1">
                <button
                  onClick={() => navigate('/staff-directory')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all font-medium text-sm text-left ${
                    isActive('/staff-directory')
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                  <span>Staff Directory</span>
                </button>
                <button
                  onClick={() => navigate('/add-staff')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all font-medium text-sm text-left ${
                    isActive('/add-staff')
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  <span>Add Staff</span>
                </button>
                <button
                  onClick={() => navigate('/staff-onboarding')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all font-medium text-sm text-left ${
                    isActive('/staff-onboarding')
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Staff Onboarding</span>
                </button>
                <button
                  onClick={() => navigate('/employment-assignments')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all font-medium text-sm text-left ${
                    isActive('/employment-assignments')
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Employment & Assignments</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all font-medium text-sm text-left">
                  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Staff Attendance & Leave</span>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => navigate('/classes-management')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all font-medium text-sm text-left ${
              isActive('/classes-management')
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span>Classes, Streams & Arms</span>
          </button>

          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all font-medium text-sm text-left">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <span>Daily Attendance</span>
          </button>

          <button
            onClick={() => navigate('/audit-logs')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all font-medium text-sm text-left ${
              isActive('/audit-logs')
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Audit Logs</span>
          </button>
        </nav>
      </div>

      <div className="p-4">
        <div className="p-3 rounded-xl bg-gray-50 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-500 flex-shrink-0 animate-pulse"></span>
            <span className="text-xs font-bold text-gray-900 truncate">
              Campus: {selectedSchool?.localGovernmentName || selectedSchool?.stateName || 'N/A'}
            </span>
          </div>
          <div className="pl-4">
            <span className="text-xs text-gray-600">Term 1 Active · 2024/2025</span>
          </div>
          <div className="mt-1 pt-1 border-t border-gray-200 flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-500 uppercase">Trust Registry</span>
            <span className="text-[11px] font-bold text-blue-600">
              {selectedSchool?.campusCode || 'N/A'}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 pt-0">
        <button
          onClick={() => logout()}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all font-medium text-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  )
}
