import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCurrentSchool } from '@/hooks/use-schools'
import { useAuth, useAppStore } from '@/store'
import { useLogout } from '@/hooks/use-auth'

export default function ClassesManagementPage() {
  const navigate = useNavigate()
  const { data: school, isLoading } = useCurrentSchool()
  const { user } = useAuth()
  const { mutate: logout } = useLogout()
  const [selectedTier, setSelectedTier] = useState<string | null>(null)
  const [staffManagementOpen, setStaffManagementOpen] = useState(false)

  const getEnabledTiers = () => {
    if (!school?.educationalTiers) return []
    return school.educationalTiers
  }

  const tierLabels: Record<string, string> = {
    EARLY_YEARS: 'Early Years / Nursery',
    PRIMARY: 'Primary',
    JUNIOR_SECONDARY: 'Junior Secondary',
    SENIOR_SECONDARY: 'Senior Secondary',
  }

  const tierClasses: Record<string, string[]> = {
    EARLY_YEARS: ['Creche', 'Pre-Nursery', 'Nursery 1', 'Nursery 2'],
    PRIMARY: ['Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6'],
    JUNIOR_SECONDARY: ['JSS 1', 'JSS 2', 'JSS 3'],
    SENIOR_SECONDARY: ['SSS 1', 'SSS 2', 'SSS 3'],
  }

  const classToRouteMap: Record<string, string> = {
    'SSS 1': 'sss-1',
    'SSS 2': 'sss-2',
    'SSS 3': 'sss-3',
    'JSS 1': 'jss-1',
    'JSS 2': 'jss-2',
    'JSS 3': 'jss-3',
    'Primary 1': 'primary-1',
    'Primary 2': 'primary-2',
    'Primary 3': 'primary-3',
    'Primary 4': 'primary-4',
    'Primary 5': 'primary-5',
    'Primary 6': 'primary-6',
    'Creche': 'creche',
    'Pre-Nursery': 'pre-nursery',
    'Nursery 1': 'nursery-1',
    'Nursery 2': 'nursery-2',
  }

  const handleConfigureStreams = (className: string) => {
    const routeId = classToRouteMap[className]
    if (routeId) {
      navigate(`/class-streams/${routeId}`)
    }
  }

  if (isLoading || !school) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600 font-medium">Loading school information...</span>
        </div>
      </div>
    )
  }

  const enabledTiers = getEnabledTiers()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-white shadow-sm z-50 flex flex-col justify-between">
        <div className="flex flex-col flex-1 min-h-0">
          {/* School Header */}
          <div className="p-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm flex-shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-base font-bold text-gray-900 leading-tight truncate">{school.name.split(' ')[0]}</span>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider truncate">School Admin · {school.campusCode}</span>
            </div>
          </div>

          <div className="px-4 py-2">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-2">Platform Info</div>
            <div className="px-3 py-2 rounded-lg bg-gray-50 flex items-center justify-between">
              <span className="text-xs text-gray-700 font-medium">Multi-Tier School Management System</span>
            </div>
          </div>

          <div className="px-4 py-1 my-2">
            <div className="h-px bg-gray-200"></div>
          </div>

          <div className="px-4 pb-2">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-2">School System Version</div>
            <div className="px-3 py-2 bg-blue-50 rounded-lg flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></div>
              <span className="text-xs text-gray-600">v4.2 Admin</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
            <button
              onClick={() => navigate('/school-admin-dashboard')}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all font-medium text-sm text-left"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
              </svg>
              <span>Dashboard</span>
            </button>

            {/* Staff Management Dropdown */}
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
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate('/staff-directory')
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all font-medium text-sm text-left"
                  >
                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                    <span>Staff Directory</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate('/staff-onboarding')
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all font-medium text-sm text-left"
                  >
                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Staff Onboarding</span>
                  </button>
                </div>
              )}
            </div>

            <button
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-100 text-blue-700 font-semibold text-sm text-left"
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

            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all font-medium text-sm text-left">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Campus Info Footer */}
        <div className="p-4">
          <div className="p-3 rounded-xl bg-gray-50 flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-500 flex-shrink-0 animate-pulse"></span>
              <span className="text-xs font-bold text-gray-900 truncate">Campus: {school.localGovernmentName || school.stateName}</span>
            </div>
            <div className="pl-4">
              <span className="text-xs text-gray-600">Term 1 Active · 2024/2025</span>
            </div>
            <div className="mt-1 pt-1 border-t border-gray-200 flex items-center justify-between">
              <span className="text-[11px] font-bold text-gray-500 uppercase">Trust Registry</span>
              <span className="text-[11px] font-bold text-blue-600">{school.campusCode}</span>
            </div>
          </div>
        </div>

        {/* Logout Button */}
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

      {/* Main Content */}
      <div className="pl-72">
        {/* Header */}
        <header className="fixed top-0 left-72 right-0 h-20 bg-white/85 backdrop-blur-xl shadow-sm z-40 px-8 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-sm font-bold text-gray-900 leading-tight">{school?.schoolHeadName || 'School Admin'}</span>
              <span className="text-xs text-gray-600 leading-tight">School Administrator</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="relative pt-20 bg-white min-h-screen px-8 py-6 w-full">
          <div className="flex flex-col w-full space-y-8 pb-12">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Classes, Streams & Arms Management</h1>
              <p className="text-sm text-gray-600 mt-1">
                Configure your school's class structure based on your {school.topology} topology
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">School Topology: {school.topology}</h2>
                  <p className="text-sm text-gray-600">
                    {enabledTiers.length} Educational Tier{enabledTiers.length !== 1 ? 's' : ''} Enabled
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {enabledTiers.map((tier) => (
                  <span
                    key={tier}
                    className="px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium"
                  >
                    {tierLabels[tier] || tier}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {enabledTiers.map((tier) => (
                <button
                  key={tier}
                  onClick={() => setSelectedTier(tier)}
                  className={`p-6 rounded-xl border-2 transition-all text-left ${
                    selectedTier === tier
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      selectedTier === tier ? 'bg-blue-600' : 'bg-gray-100'
                    }`}>
                      <svg
                        className={`w-6 h-6 ${selectedTier === tier ? 'text-white' : 'text-gray-600'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    {selectedTier === tier && (
                      <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{tierLabels[tier]}</h3>
                  <p className="text-sm text-gray-600">{tierClasses[tier]?.length || 0} Classes Available</p>
                </button>
              ))}
            </div>

            {selectedTier && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{tierLabels[selectedTier]} Classes</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Manage classes, streams, and arms for this educational tier
                    </p>
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-all flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Add New Class</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {tierClasses[selectedTier]?.map((className, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                            <span className="text-sm font-bold text-gray-900">{idx + 1}</span>
                          </div>
                          <div>
                            <h4 className="text-base font-semibold text-gray-900">{className}</h4>
                            <p className="text-xs text-gray-600">No streams configured</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleConfigureStreams(className)}
                            className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-all"
                          >
                            Configure Streams
                          </button>
                          <button className="p-2 rounded-lg hover:bg-gray-100 transition-all">
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!selectedTier && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select an Educational Tier</h3>
                <p className="text-sm text-gray-600">
                  Choose an educational tier above to view and manage its classes, streams, and arms
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
