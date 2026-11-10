// ============================================================================
// TOPOLOGY-AWARE SCHOOL ADMIN DASHBOARD
// ============================================================================
// Dynamically renders based on school's topology configuration
// Only shows sections enabled for this specific school
// ============================================================================

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// This would normally come from API/context based on logged-in user's school
// For now, we'll use state to demonstrate the concept
interface SchoolTopology {
  type: 'all-in-one' | 'standalone' | 'distributed'
  enabledSections: {
    nursery: boolean
    primary: boolean
    juniorSecondary: boolean
    seniorSecondary: boolean
  }
  schoolName: string
  branch: string
  campusCode: string
}

export default function SchoolAdminDashboard() {
  const navigate = useNavigate()

  // This topology config would come from the backend based on how the tenant admin
  // configured this school when they created it
  const [schoolTopology] = useState<SchoolTopology>({
    type: 'all-in-one',
    enabledSections: {
      nursery: true,
      primary: true,
      juniorSecondary: true,
      seniorSecondary: true,
    },
    schoolName: 'Grace Crest Academy',
    branch: 'Lekki Branch',
    campusCode: 'CJET-LK-01',
  })

  const [selectedSection, setSelectedSection] = useState<'all' | 'ey' | 'pri' | 'jss' | 'sss'>('all')
  const [staffManagementOpen, setStaffManagementOpen] = useState(false)

  // Calculate totals based on enabled sections
  const getTotalPupils = () => {
    let total = 0
    if (schoolTopology.enabledSections.nursery) total += 140
    if (schoolTopology.enabledSections.primary) total += 320
    if (schoolTopology.enabledSections.juniorSecondary) total += 245
    if (schoolTopology.enabledSections.seniorSecondary) total += 215
    return total
  }

  const getEnabledSectionsCount = () => {
    return Object.values(schoolTopology.enabledSections).filter(Boolean).length
  }

  const handleSectionSwitch = (section: 'all' | 'ey' | 'pri' | 'jss' | 'sss') => {
    setSelectedSection(section)
  }

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
              <span className="text-base font-bold text-gray-900 leading-tight truncate">{schoolTopology.schoolName.split(' ')[0]}</span>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider truncate">High School · {schoolTopology.branch.split(' ')[0]}</span>
            </div>
          </div>

          {/* Version Badge */}
          <div className="px-6 py-2">
            <div className="px-3 py-1.5 rounded-lg bg-gray-100 flex items-center justify-between">
              <span className="text-[11px] font-bold text-teal-600 uppercase tracking-wider">EduManage NG</span>
              <span className="text-xs text-gray-600">v4.2 Admin</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all font-medium text-sm text-left">
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
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all font-medium text-sm text-left">
                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span>Recruitment</span>
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
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate('/employment-assignments')
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all font-medium text-sm text-left"
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
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all font-medium text-sm text-left">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>Class & Teaching Assignments</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all font-medium text-sm text-left">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>School Operations & Facilities</span>
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
              <span className="text-xs font-bold text-gray-900 truncate">Campus: {schoolTopology.branch}</span>
            </div>
            <div className="pl-4">
              <span className="text-xs text-gray-600">Term 1 Active · 2024/2025</span>
            </div>
            <div className="mt-1 pt-1 border-t border-gray-200 flex items-center justify-between">
              <span className="text-[11px] font-bold text-gray-500 uppercase">Trust Registry</span>
              <span className="text-[11px] font-bold text-blue-600">{schoolTopology.campusCode}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="pl-72">
        {/* Top Header */}
        <header className="fixed top-0 left-72 right-0 h-16 bg-white/90 backdrop-blur-xl shadow-sm z-40 px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6 flex-1 min-w-0 max-w-2xl">
            <div className="hidden xl:flex items-center gap-2 text-sm text-gray-600">
              <span className="text-gray-900 font-semibold truncate">{schoolTopology.schoolName} - {schoolTopology.branch}</span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">Registrar Portal</span>
            </div>
            <div className="relative flex-1">
              <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all"
                placeholder="Search staff records, allocations, classes..."
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-teal-500"></span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Online & Synced</span>
            </div>
            <button className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-sm font-bold text-gray-900 leading-tight">Mrs. Folake Balogun</span>
                <span className="text-xs text-gray-600 leading-tight">School Administrator / Registrar</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="w-full pt-16 bg-gray-50 min-h-screen px-6 py-6">
          <div className="flex flex-col w-full space-y-8 pb-12">
            {/* Top Global Institutional Context Bar */}
            <section className="bg-white rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm flex-shrink-0">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900">{schoolTopology.schoolName}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-green-100/50 text-green-800 text-xs font-bold">{schoolTopology.branch}</span>
                    </div>
                    <span className="text-sm text-gray-600 flex items-center gap-1.5 mt-0.5">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {schoolTopology.type === 'all-in-one' && 'Composite All-in-One K-12 Campus · Integrated Operations'}
                      {schoolTopology.type === 'standalone' && `Standalone ${getEnabledSectionsCount()}-Tier Campus`}
                      {schoolTopology.type === 'distributed' && 'Distributed Multi-Location Organization'}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-lg gap-2">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div className="flex flex-col">
                      <span className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold">Session & Term</span>
                      <span className="text-sm text-gray-900 font-bold">2024/2025 · First Term</span>
                    </div>
                    <svg className="w-4 h-4 text-gray-500 ml-1 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 text-gray-900 text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-green-600"></span>
                    <span>Week 6 of 13</span>
                  </div>
                </div>
              </div>

              {/* Academic Section Switcher Pill Bar - ONLY SHOWS ENABLED SECTIONS */}
              <div className="pt-2">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Context Filter & Scope</span>
                  <span className="text-sm text-gray-600">Switch between whole-compound or section-isolated view</span>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {/* All Sections - Always show if more than 1 section is enabled */}
                  {getEnabledSectionsCount() > 1 && (
                    <button
                      onClick={() => handleSectionSwitch('all')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all flex-shrink-0 ${
                        selectedSection === 'all'
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span>Whole School (All Sections)</span>
                      <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                        selectedSection === 'all'
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}>
                        {getTotalPupils()} Pupils
                      </span>
                    </button>
                  )}

                  {/* Early Years / Nursery - Only show if enabled */}
                  {schoolTopology.enabledSections.nursery && (
                    <button
                      onClick={() => handleSectionSwitch('ey')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all flex-shrink-0 ${
                        selectedSection === 'ey'
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Early Years / Nursery</span>
                      <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                        selectedSection === 'ey'
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        140
                      </span>
                    </button>
                  )}

                  {/* Primary - Only show if enabled */}
                  {schoolTopology.enabledSections.primary && (
                    <button
                      onClick={() => handleSectionSwitch('pri')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all flex-shrink-0 ${
                        selectedSection === 'pri'
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                      </svg>
                      <span>Primary Basic 1–6</span>
                      <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                        selectedSection === 'pri'
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        320
                      </span>
                    </button>
                  )}

                  {/* Junior Secondary - Only show if enabled */}
                  {schoolTopology.enabledSections.juniorSecondary && (
                    <button
                      onClick={() => handleSectionSwitch('jss')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all flex-shrink-0 ${
                        selectedSection === 'jss'
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <span>Junior Secondary (JSS)</span>
                      <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                        selectedSection === 'jss'
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        245
                      </span>
                    </button>
                  )}

                  {/* Senior Secondary - Only show if enabled */}
                  {schoolTopology.enabledSections.seniorSecondary && (
                    <button
                      onClick={() => handleSectionSwitch('sss')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all flex-shrink-0 ${
                        selectedSection === 'sss'
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      <span>Senior Secondary (SSS)</span>
                      <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                        selectedSection === 'sss'
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        215
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </section>

            {/* Welcome & Topology Banner */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-80 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none"></div>
              <div className="flex flex-col space-y-1 relative z-10 max-w-2xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/15 text-white text-xs tracking-wider uppercase backdrop-blur-sm font-semibold">
                    Topology: {schoolTopology.type === 'all-in-one' && 'Composite K-12 (All-in-One Compound)'}
                    {schoolTopology.type === 'standalone' && 'Standalone School'}
                    {schoolTopology.type === 'distributed' && 'Distributed Organization'}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 text-xs font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></span>
                    Campus Gate Biometrics Active
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-white mt-2">
                  Good morning, Mrs. Balogun
                </h1>
                <p className="text-sm text-white/80">
                  {getEnabledSectionsCount()} institutional wing{getEnabledSectionsCount() > 1 ? 's are' : ' is'} in active First Term operations.
                  Turnstile attendance is running at 97.4% with 4 administrative sign-offs pending your review today.
                </p>
              </div>
              <div className="flex items-center gap-3 relative z-10 flex-shrink-0">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 flex items-center gap-3">
                  <svg className="w-7 h-7 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div className="flex flex-col text-left">
                    <span className="text-xs text-white/70 uppercase font-semibold">Lekki Node State</span>
                    <span className="text-sm font-bold text-white">Local Server Synchronized</span>
                  </div>
                </div>
              </div>
            </section>

            {/* WHOLE SCHOOL VIEW - Only show when 'all' is selected */}
            {selectedSection === 'all' && (
              <>
            {/* Whole-School Key Vital Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Total Pupils Card */}
              <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-blue-600">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold">+2.4%</span>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Total Pupils Enrolled</p>
                  <p className="text-3xl font-bold text-gray-900">{getTotalPupils()}</p>
                  <p className="text-xs text-gray-600">{getEnabledSectionsCount()} section{getEnabledSectionsCount() > 1 ? 's' : ''} active</p>
                </div>
              </div>

              {/* Attendance Rate Card */}
              <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-green-600">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold">Today</span>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Attendance Rate</p>
                  <p className="text-3xl font-bold text-gray-900">97.4%</p>
                  <p className="text-xs text-gray-600">{getTotalPupils() - 19} present · 19 absent</p>
                </div>
              </div>

              {/* Staff On Duty Card */}
              <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-purple-600">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-xs font-bold">Active</span>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Staff On Duty</p>
                  <p className="text-3xl font-bold text-gray-900">48/52</p>
                  <p className="text-xs text-gray-600">4 on authorized leave</p>
                </div>
              </div>

              {/* Pending Actions Card */}
              <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-orange-600">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 text-xs font-bold">Urgent</span>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Pending Actions</p>
                  <p className="text-3xl font-bold text-gray-900">4</p>
                  <p className="text-xs text-gray-600">Require your approval</p>
                </div>
              </div>
            </div>

            {/* Urgent Operational Action Queue */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Urgent Administrative Queue</h3>
                    <p className="text-xs text-gray-600">Items requiring immediate attention from School Registrar</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-all">
                  View All
                </button>
              </div>

              <div className="space-y-3">
                {/* Action Item 1 */}
                <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg border border-red-100">
                  <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-900">Approve JSS3 Promotional Examination Schedule</h4>
                        <p className="text-xs text-gray-600 mt-1">Academic Head submitted final exam timetable for approval. Deadline: Today 5:00 PM</p>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white text-xs font-bold flex-shrink-0">HIGH</span>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-all">
                        Review & Approve
                      </button>
                      <button className="px-3 py-1.5 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg text-xs font-semibold transition-all">
                        Request Changes
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Item 2 */}
                <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg border border-orange-100">
                  <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-900">Sign-Off Primary 6 End-of-Term Reports</h4>
                        <p className="text-xs text-gray-600 mt-1">48 student reports awaiting final registrar sign-off before distribution to parents</p>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-orange-600 text-white text-xs font-bold flex-shrink-0">MEDIUM</span>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-all">
                        Review Reports
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Item 3 */}
                <div className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                  <div className="w-10 h-10 rounded-full bg-yellow-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-900">Verify New Staff Appointment Documentation</h4>
                        <p className="text-xs text-gray-600 mt-1">2 newly hired teachers require credential verification before onboarding completion</p>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-yellow-600 text-white text-xs font-bold flex-shrink-0">NORMAL</span>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-all">
                        Verify Documents
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Academic Section Breakdown Matrix */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Academic Section Performance Matrix</h3>
                    <p className="text-xs text-gray-600">Real-time institutional wing analytics</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nursery Section - Only show if enabled */}
                {schoolTopology.enabledSections.nursery && (
                  <div className="p-4 bg-gradient-to-br from-pink-50 to-pink-100/50 rounded-xl border border-pink-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-pink-600 flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h4 className="text-sm font-bold text-gray-900">Early Years / Nursery</h4>
                      </div>
                      <span className="px-2 py-1 rounded-full bg-pink-600 text-white text-xs font-bold">140 Pupils</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/60 rounded-lg p-2">
                        <p className="text-xs text-gray-600 mb-1">Attendance</p>
                        <p className="text-lg font-bold text-gray-900">98.2%</p>
                      </div>
                      <div className="bg-white/60 rounded-lg p-2">
                        <p className="text-xs text-gray-600 mb-1">Staff Ratio</p>
                        <p className="text-lg font-bold text-gray-900">1:12</p>
                      </div>
                      <div className="bg-white/60 rounded-lg p-2">
                        <p className="text-xs text-gray-600 mb-1">Classes</p>
                        <p className="text-lg font-bold text-gray-900">6</p>
                      </div>
                      <div className="bg-white/60 rounded-lg p-2">
                        <p className="text-xs text-gray-600 mb-1">Teachers</p>
                        <p className="text-lg font-bold text-gray-900">12</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Primary Section - Only show if enabled */}
                {schoolTopology.enabledSections.primary && (
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl border border-blue-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                          </svg>
                        </div>
                        <h4 className="text-sm font-bold text-gray-900">Primary Basic 1–6</h4>
                      </div>
                      <span className="px-2 py-1 rounded-full bg-blue-600 text-white text-xs font-bold">320 Pupils</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/60 rounded-lg p-2">
                        <p className="text-xs text-gray-600 mb-1">Attendance</p>
                        <p className="text-lg font-bold text-gray-900">96.8%</p>
                      </div>
                      <div className="bg-white/60 rounded-lg p-2">
                        <p className="text-xs text-gray-600 mb-1">Staff Ratio</p>
                        <p className="text-lg font-bold text-gray-900">1:20</p>
                      </div>
                      <div className="bg-white/60 rounded-lg p-2">
                        <p className="text-xs text-gray-600 mb-1">Classes</p>
                        <p className="text-lg font-bold text-gray-900">12</p>
                      </div>
                      <div className="bg-white/60 rounded-lg p-2">
                        <p className="text-xs text-gray-600 mb-1">Teachers</p>
                        <p className="text-lg font-bold text-gray-900">16</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Junior Secondary Section - Only show if enabled */}
                {schoolTopology.enabledSections.juniorSecondary && (
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl border border-purple-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <h4 className="text-sm font-bold text-gray-900">Junior Secondary (JSS 1–3)</h4>
                      </div>
                      <span className="px-2 py-1 rounded-full bg-purple-600 text-white text-xs font-bold">245 Pupils</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/60 rounded-lg p-2">
                        <p className="text-xs text-gray-600 mb-1">Attendance</p>
                        <p className="text-lg font-bold text-gray-900">97.1%</p>
                      </div>
                      <div className="bg-white/60 rounded-lg p-2">
                        <p className="text-xs text-gray-600 mb-1">Staff Ratio</p>
                        <p className="text-lg font-bold text-gray-900">1:18</p>
                      </div>
                      <div className="bg-white/60 rounded-lg p-2">
                        <p className="text-xs text-gray-600 mb-1">Classes</p>
                        <p className="text-lg font-bold text-gray-900">9</p>
                      </div>
                      <div className="bg-white/60 rounded-lg p-2">
                        <p className="text-xs text-gray-600 mb-1">Teachers</p>
                        <p className="text-lg font-bold text-gray-900">14</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Senior Secondary Section - Only show if enabled */}
                {schoolTopology.enabledSections.seniorSecondary && (
                  <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl border border-orange-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <h4 className="text-sm font-bold text-gray-900">Senior Secondary (SSS 1–3)</h4>
                      </div>
                      <span className="px-2 py-1 rounded-full bg-orange-600 text-white text-xs font-bold">215 Pupils</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/60 rounded-lg p-2">
                        <p className="text-xs text-gray-600 mb-1">Attendance</p>
                        <p className="text-lg font-bold text-gray-900">97.6%</p>
                      </div>
                      <div className="bg-white/60 rounded-lg p-2">
                        <p className="text-xs text-gray-600 mb-1">Staff Ratio</p>
                        <p className="text-lg font-bold text-gray-900">1:15</p>
                      </div>
                      <div className="bg-white/60 rounded-lg p-2">
                        <p className="text-xs text-gray-600 mb-1">Classes</p>
                        <p className="text-lg font-bold text-gray-900">9</p>
                      </div>
                      <div className="bg-white/60 rounded-lg p-2">
                        <p className="text-xs text-gray-600 mb-1">Teachers</p>
                        <p className="text-lg font-bold text-gray-900">15</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Administrative Shortcuts & Campus Bell Rhythm */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Administrative Shortcuts */}
              <div className="lg:col-span-1 bg-white rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900">Quick Actions</h3>
                </div>
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold transition-all text-left">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Mark Attendance</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold transition-all text-left">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    <span>Register New Pupil</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold transition-all text-left">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Generate Reports</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold transition-all text-left">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Class Timetables</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold transition-all text-left">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Fee Management</span>
                  </button>
                </div>
              </div>

              {/* Campus Bell Rhythm Timeline */}
              <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900">Campus Bell Rhythm · Today's Schedule</h3>
                </div>

                <div className="space-y-3">
                  {/* Morning Assembly - Completed */}
                  <div className="flex items-start gap-3 opacity-50">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="w-0.5 h-8 bg-gray-200"></div>
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-gray-900">Morning Assembly</h4>
                        <span className="text-xs text-gray-600">7:30 AM</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-0.5">Completed · All sections attended</p>
                    </div>
                  </div>

                  {/* Third Period - Active */}
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center ring-4 ring-blue-100">
                        <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                      </div>
                      <div className="w-0.5 h-8 bg-gray-200"></div>
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-gray-900">Third Period (Current)</h4>
                        <span className="text-xs text-blue-600 font-bold">10:15 AM - 11:00 AM</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-0.5">All classes in session · 28 min remaining</p>
                    </div>
                  </div>

                  {/* Break Time - Upcoming */}
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="w-0.5 h-8 bg-gray-200"></div>
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-gray-900">Mid-Morning Break</h4>
                        <span className="text-xs text-gray-600">11:00 AM</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-0.5">15 minutes · Canteen & playground supervision</p>
                    </div>
                  </div>

                  {/* Lunch - Upcoming */}
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="w-0.5 h-8 bg-gray-200"></div>
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-gray-900">Lunch Break</h4>
                        <span className="text-xs text-gray-600">1:00 PM</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-0.5">45 minutes · Cafeteria service active</p>
                    </div>
                  </div>

                  {/* Closing - Upcoming */}
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-gray-900">Closing Bell & Dismissal</h4>
                        <span className="text-xs text-gray-600">3:30 PM</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-0.5">Staggered dismissal by section · Transport coordination</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              </>
            )}

            {/* NURSERY SECTION CONTENT */}
            {selectedSection === 'ey' && (
              <div className="space-y-6">
                {/* Nursery Section Scope Header Banner */}
                <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 rounded-2xl p-6 shadow-lg text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="material-symbols-outlined text-3xl">child_care</span>
                        <h2 className="text-2xl font-bold">Foundation Stage Section Live</h2>
                      </div>
                      <p className="text-pink-100 text-sm">
                        Early Years / Nursery • {schoolTopology.topologyType === 'all-in-one' ? 'Ground Floor East Wing' : 'Standalone Building'} • 140 Enrolled Toddlers
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-pink-100 mb-1">EYFS Headmistress</div>
                      <div className="font-semibold">Mrs. S. Adeleke</div>
                    </div>
                  </div>
                </div>

                {/* Nursery Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Attendance */}
                  <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-green-500">
                    <div className="flex items-center justify-between mb-3">
                      <span className="material-symbols-outlined text-green-600 text-3xl">emoji_people</span>
                      <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">LIVE</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">98.6%</div>
                    <div className="text-sm text-gray-600 mb-2">Nursery Attendance</div>
                    <div className="text-xs text-gray-500">138 of 140 present</div>
                  </div>

                  {/* Staff Roster */}
                  <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-purple-500">
                    <div className="flex items-center justify-between mb-3">
                      <span className="material-symbols-outlined text-purple-600 text-3xl">groups</span>
                      <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded-full">1:7.7</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">18</div>
                    <div className="text-sm text-gray-600 mb-2">EYFS Staff Active</div>
                    <div className="text-xs text-gray-500">12 Teachers, 6 Aides</div>
                  </div>

                  {/* Guardian Passes */}
                  <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-blue-500">
                    <div className="flex items-center justify-between mb-3">
                      <span className="material-symbols-outlined text-blue-600 text-3xl">qr_code_2</span>
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">QR</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">140/140</div>
                    <div className="text-sm text-gray-600 mb-2">Guardian Passes</div>
                    <div className="text-xs text-gray-500">All authorized</div>
                  </div>

                  {/* Welfare Logs */}
                  <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-pink-500">
                    <div className="flex items-center justify-between mb-3">
                      <span className="material-symbols-outlined text-pink-600 text-3xl">health_and_safety</span>
                      <span className="text-xs font-semibold text-pink-600 bg-pink-50 px-2 py-1 rounded-full">TODAY</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">47</div>
                    <div className="text-sm text-gray-600 mb-2">Welfare Logs</div>
                    <div className="text-xs text-gray-500">Nap, Meal, Hygiene</div>
                  </div>
                </div>

                {/* Two Column: Action Queue + Bell Rhythm */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Nursery Action & Clearance Queue (7 cols) */}
                  <section className="lg:col-span-7 bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <span className="material-symbols-outlined text-pink-600">notifications_active</span>
                        Nursery Action & Clearance Queue
                      </h3>
                      <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-bold">3 Pending</span>
                    </div>

                    <div className="space-y-3">
                      {/* Action Item 1 */}
                      <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <span className="material-symbols-outlined text-yellow-600 mt-0.5">local_shipping</span>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 text-sm mb-1">Driver Pickup Pass Awaiting Approval</div>
                          <div className="text-xs text-gray-600 mb-2">Guardian: Mr. O. Johnson • Toddler: Khalil Johnson (Playgroup Ruby)</div>
                          <div className="flex items-center gap-2">
                            <button className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-semibold">Approve</button>
                            <button className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded text-xs font-semibold">Reject</button>
                            <span className="text-xs text-gray-500">Submitted 8 min ago</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Item 2 */}
                      <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <span className="material-symbols-outlined text-red-600 mt-0.5">warning</span>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 text-sm mb-1">Allergy Alert - Requires Acknowledgment</div>
                          <div className="text-xs text-gray-600 mb-2">Toddler: Amara Obi (Nursery 1 Sapphire) • Allergen: Tree Nuts</div>
                          <div className="flex items-center gap-2">
                            <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold">Acknowledge & Flag</button>
                            <span className="text-xs text-gray-500">From Medical Update</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Item 3 */}
                      <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <span className="material-symbols-outlined text-blue-600 mt-0.5">assessment</span>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 text-sm mb-1">EYFS Milestones Report Due</div>
                          <div className="text-xs text-gray-600 mb-2">10 Toddlers in Nursery 2 (Diamond & Emerald) • Deadline: Today 4:00 PM</div>
                          <div className="flex items-center gap-2">
                            <button className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded text-xs font-semibold">Open Report Form</button>
                            <span className="text-xs text-gray-500">Teacher: Miss F. Adeyemi</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Nursery Daily Bell Rhythm (5 cols) */}
                  <section className="lg:col-span-5 bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                      <span className="material-symbols-outlined text-purple-600">schedule</span>
                      Nursery Daily Bell Rhythm
                    </h3>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                        <span className="material-symbols-outlined text-purple-600 text-xl mt-0.5">bedtime</span>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">Nap Time</div>
                          <div className="text-xs text-gray-600">12:30 PM – 2:00 PM</div>
                          <div className="text-xs text-purple-600 font-semibold mt-1">All rooms quiet mode</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-pink-50 rounded-lg">
                        <span className="material-symbols-outlined text-pink-600 text-xl mt-0.5">waving_hand</span>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">Wave 1 Dismissal</div>
                          <div className="text-xs text-gray-600">2:00 PM – 2:30 PM</div>
                          <div className="text-xs text-pink-600 font-semibold mt-1">Crèche & Playgroup</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                        <span className="material-symbols-outlined text-blue-600 text-xl mt-0.5">logout</span>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">Wave 2 Dismissal</div>
                          <div className="text-xs text-gray-600">3:30 PM – 4:00 PM</div>
                          <div className="text-xs text-blue-600 font-semibold mt-1">Nursery 1 & 2 (All)</div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                {/* Early Years Classroom Cards Grid */}
                <section className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-pink-600">door_open</span>
                    Early Years Classroom Roster (6 Rooms)
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Room 1: Crèche */}
                    <div className="border-2 border-pink-200 rounded-xl p-4 bg-pink-50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-pink-600">crib</span>
                          <h4 className="font-bold text-gray-900">Crèche</h4>
                        </div>
                        <span className="px-2 py-1 bg-pink-200 text-pink-800 rounded text-xs font-bold">18 mos–2y</span>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Toddlers:</span>
                          <span className="font-semibold text-gray-900">18 / 20</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Lead Teacher:</span>
                          <span className="font-semibold text-gray-900">Mrs. Ojo</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Aides:</span>
                          <span className="font-semibold text-gray-900">2 present</span>
                        </div>
                        <div className="mt-2 pt-2 border-t border-pink-200">
                          <span className="text-green-600 font-semibold">✓ 90% Attendance</span>
                        </div>
                      </div>
                    </div>

                    {/* Room 2: Playgroup Ruby */}
                    <div className="border-2 border-red-200 rounded-xl p-4 bg-red-50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-red-600">toys</span>
                          <h4 className="font-bold text-gray-900">Playgroup Ruby</h4>
                        </div>
                        <span className="px-2 py-1 bg-red-200 text-red-800 rounded text-xs font-bold">2–3y</span>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Toddlers:</span>
                          <span className="font-semibold text-gray-900">22 / 24</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Lead Teacher:</span>
                          <span className="font-semibold text-gray-900">Miss Adeyemi</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Aides:</span>
                          <span className="font-semibold text-gray-900">2 present</span>
                        </div>
                        <div className="mt-2 pt-2 border-t border-red-200">
                          <span className="text-green-600 font-semibold">✓ 91.7% Attendance</span>
                        </div>
                      </div>
                    </div>

                    {/* Room 3: Playgroup Sapphire */}
                    <div className="border-2 border-blue-200 rounded-xl p-4 bg-blue-50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-blue-600">toys</span>
                          <h4 className="font-bold text-gray-900">Playgroup Sapphire</h4>
                        </div>
                        <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded text-xs font-bold">2–3y</span>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Toddlers:</span>
                          <span className="font-semibold text-gray-900">24 / 24</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Lead Teacher:</span>
                          <span className="font-semibold text-gray-900">Mrs. Okafor</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Aides:</span>
                          <span className="font-semibold text-gray-900">2 present</span>
                        </div>
                        <div className="mt-2 pt-2 border-t border-blue-200">
                          <span className="text-green-600 font-semibold">✓ 100% Attendance</span>
                        </div>
                      </div>
                    </div>

                    {/* Room 4: Nursery 1 Ruby */}
                    <div className="border-2 border-orange-200 rounded-xl p-4 bg-orange-50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-orange-600">school</span>
                          <h4 className="font-bold text-gray-900">Nursery 1 Ruby</h4>
                        </div>
                        <span className="px-2 py-1 bg-orange-200 text-orange-800 rounded text-xs font-bold">3–4y</span>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Pupils:</span>
                          <span className="font-semibold text-gray-900">20 / 20</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Lead Teacher:</span>
                          <span className="font-semibold text-gray-900">Miss Chukwu</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Aides:</span>
                          <span className="font-semibold text-gray-900">1 present</span>
                        </div>
                        <div className="mt-2 pt-2 border-t border-orange-200">
                          <span className="text-green-600 font-semibold">✓ 100% Attendance</span>
                        </div>
                      </div>
                    </div>

                    {/* Room 5: Nursery 1 Sapphire */}
                    <div className="border-2 border-cyan-200 rounded-xl p-4 bg-cyan-50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-cyan-600">school</span>
                          <h4 className="font-bold text-gray-900">Nursery 1 Sapphire</h4>
                        </div>
                        <span className="px-2 py-1 bg-cyan-200 text-cyan-800 rounded text-xs font-bold">3–4y</span>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Pupils:</span>
                          <span className="font-semibold text-gray-900">18 / 20</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Lead Teacher:</span>
                          <span className="font-semibold text-gray-900">Mrs. Ibrahim</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Aides:</span>
                          <span className="font-semibold text-gray-900">1 present</span>
                        </div>
                        <div className="mt-2 pt-2 border-t border-cyan-200">
                          <span className="text-green-600 font-semibold">✓ 90% Attendance</span>
                        </div>
                      </div>
                    </div>

                    {/* Room 6: Nursery 2 Emerald & Diamond (Combined) */}
                    <div className="border-2 border-green-200 rounded-xl p-4 bg-green-50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-green-600">workspace_premium</span>
                          <h4 className="font-bold text-gray-900">Nursery 2 (E+D)</h4>
                        </div>
                        <span className="px-2 py-1 bg-green-200 text-green-800 rounded text-xs font-bold">4–5y</span>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Pupils:</span>
                          <span className="font-semibold text-gray-900">38 / 40</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Lead Teachers:</span>
                          <span className="font-semibold text-gray-900">2 present</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Aides:</span>
                          <span className="font-semibold text-gray-900">2 present</span>
                        </div>
                        <div className="mt-2 pt-2 border-t border-green-200">
                          <span className="text-green-600 font-semibold">✓ 95% Attendance</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Toddler Welfare Status Strip */}
                <section className="bg-gradient-to-r from-purple-100 via-pink-100 to-purple-100 rounded-xl p-5 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-purple-600">favorite</span>
                    Toddler Welfare & Safety Status (Live)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-3 flex items-center gap-3">
                      <span className="material-symbols-outlined text-2xl text-green-600">sports_gymnastics</span>
                      <div>
                        <div className="text-xs text-gray-600">Soft Play Zone</div>
                        <div className="font-bold text-gray-900">12 Active</div>
                        <div className="text-xs text-green-600">Supervised ✓</div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3 flex items-center gap-3">
                      <span className="material-symbols-outlined text-2xl text-blue-600">water_drop</span>
                      <div>
                        <div className="text-xs text-gray-600">Hydration Check</div>
                        <div className="font-bold text-gray-900">All Clear</div>
                        <div className="text-xs text-blue-600">Last: 45 min ago</div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3 flex items-center gap-3">
                      <span className="material-symbols-outlined text-2xl text-orange-600">thermostat</span>
                      <div>
                        <div className="text-xs text-gray-600">Room Temperature</div>
                        <div className="font-bold text-gray-900">22°C Optimal</div>
                        <div className="text-xs text-orange-600">HVAC Auto</div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* PRIMARY SECTION CONTENT */}
            {selectedSection === 'pri' && (
              <div className="space-y-6">
                {/* Primary Education Scope Context Banner */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 p-6 shadow-lg text-white">
                  <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="space-y-2 max-w-3xl">
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md font-label-pill text-xs text-white uppercase tracking-wider">
                        <span className="material-symbols-outlined text-sm">school</span>
                        <span>Active Section Scope: Primary Education Track</span>
                      </div>
                      <h1 className="text-3xl font-bold text-white tracking-tight">Primary Basic 1 to Basic 6 Section</h1>
                      <p className="text-sm text-blue-100 leading-relaxed">
                        Displaying <strong className="text-white font-semibold">320 enrolled pupils</strong> across 12 class streams in the {schoolTopology.topologyType === 'all-in-one' ? 'Lekki Academic Wing' : 'Primary Building'}.
                        Head Teacher: <strong className="text-white font-semibold">Mr. David Adeleke, B.Ed</strong>. Continuous Assessment synchronization active for Lagos State SUBEB standard.
                      </p>
                    </div>
                    <div className="flex flex-wrap lg:flex-nowrap items-center gap-2.5 shrink-0">
                      <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-blue-600 text-sm font-semibold shadow hover:bg-blue-50 transition-all">
                        <span className="material-symbols-outlined text-lg">person_add</span>
                        <span>+ Enroll Pupil</span>
                      </button>
                      <button className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-medium backdrop-blur-sm transition-all">
                        <span className="material-symbols-outlined text-lg">print</span>
                        <span>Broadsheets</span>
                      </button>
                    </div>
                  </div>
                  {/* Decorative background */}
                  <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
                  <div className="absolute right-1/3 -bottom-16 w-48 h-48 rounded-full bg-blue-500/20 blur-xl pointer-events-none"></div>
                </div>

                {/* Key Metrics Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  {/* Metric 1: Daily Attendance */}
                  <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-600">Primary Attendance Today</span>
                      <div className="w-9 h-9 rounded-xl bg-green-100 text-green-700 flex items-center justify-center">
                        <span className="material-symbols-outlined text-xl">how_to_reg</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-gray-900">314</span>
                        <span className="text-sm text-gray-500">/ 320</span>
                        <span className="ml-auto px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold">98.1%</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                        <span>6 excused absences (Sick bay: 2)</span>
                      </p>
                    </div>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-green-600 h-full rounded-full" style={{width: '98.1%'}}></div>
                    </div>
                  </div>

                  {/* Metric 2: Teaching Faculty */}
                  <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-600">Teaching Faculty</span>
                      <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                        <span className="material-symbols-outlined text-xl">supervisor_account</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-gray-900">28</span>
                        <span className="text-xs text-gray-500">Instructors</span>
                        <span className="ml-auto px-2 py-0.5 rounded-full bg-gray-200 text-gray-700 text-xs font-semibold">100% Present</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 truncate">
                        12 Homeroom Class Teachers + 16 Rotational
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Pupil-to-Teacher Ratio</span>
                      <span className="text-gray-900 font-bold">11.4 : 1</span>
                    </div>
                  </div>

                  {/* Metric 3: CA Assessment Progress */}
                  <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-600">Continuous Assessment (CA)</span>
                      <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center">
                        <span className="material-symbols-outlined text-xl">grading</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-gray-900">94.2%</span>
                        <span className="ml-auto px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 text-xs font-bold">CA1 & CA2</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 truncate">
                        11 of 12 streams signed off by Lead Teachers
                      </p>
                    </div>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-orange-600 h-full rounded-full" style={{width: '94.2%'}}></div>
                    </div>
                  </div>

                  {/* Metric 4: NCEE Candidates */}
                  <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-600">NCEE & Common Entrance</span>
                      <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                        <span className="material-symbols-outlined text-xl">workspace_premium</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-gray-900">58</span>
                        <span className="text-xs text-gray-500">Basic 6 Candidates</span>
                        <span className="ml-auto px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-xs font-bold">Registry Ready</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 truncate">
                        91.4% Biometrics & LASIEC files cleared
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Exam Date Target</span>
                      <span className="text-blue-600 font-bold">May 2025 Cycle</span>
                    </div>
                  </div>
                </div>

                {/* Two Column: Action Queue + Bell Rhythm */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Primary Section Operational Queue (7 cols) */}
                  <section className="lg:col-span-7 bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between pb-4">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-blue-600 text-2xl">pending_actions</span>
                        <h2 className="text-lg font-bold text-gray-900">Primary Section Operational Queue</h2>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold">3 Pending Tasks</span>
                    </div>

                    <div className="space-y-3 mt-2">
                      {/* Queue Item 1 */}
                      <div className="p-3.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="material-symbols-outlined text-lg">verified_user</span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-semibold text-gray-900">Basic 4 Emerald CA2 Score Approval</span>
                              <span className="text-xs px-1.5 py-0.5 rounded bg-gray-200 text-gray-700">Numeracy</span>
                            </div>
                            <p className="text-xs text-gray-600 mt-0.5">
                              Submitted by Mrs. Patience Okon · 28 pupils recorded. Awaiting Registrar confirmation.
                            </p>
                          </div>
                        </div>
                        <button className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 shrink-0 transition-colors shadow-sm">
                          Review & Sign
                        </button>
                      </div>

                      {/* Queue Item 2 */}
                      <div className="p-3.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="material-symbols-outlined text-lg">badge</span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-semibold text-gray-900">NCEE Bio-Data Photo Clearance</span>
                              <span className="text-xs px-1.5 py-0.5 rounded bg-orange-100 text-orange-700">5 Candidates</span>
                            </div>
                            <p className="text-xs text-gray-600 mt-0.5">
                              Basic 6 Gold: White background passport photos missing for 5 registered candidates.
                            </p>
                          </div>
                        </div>
                        <button className="px-3 py-1.5 rounded-lg bg-gray-200 text-gray-700 text-xs font-medium hover:bg-gray-300 shrink-0 transition-colors">
                          Notify Parents
                        </button>
                      </div>

                      {/* Queue Item 3 - Resolved */}
                      <div className="p-3.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="material-symbols-outlined text-lg">check_circle</span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-semibold text-gray-900">Specialist Teacher Room Reassignment</span>
                              <span className="text-xs px-1.5 py-0.5 rounded bg-green-100 text-green-700">Resolved</span>
                            </div>
                            <p className="text-xs text-gray-600 mt-0.5">
                              Basic 3 French vs ICT Lab clash resolved with Mr. K. Balogun. Media Lab B assigned.
                            </p>
                          </div>
                        </div>
                        <span className="material-symbols-outlined text-green-600 text-2xl self-center pr-2">done_all</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 flex items-center justify-between text-gray-500 text-xs">
                      <span>Lagos State Ministry of Basic Education Registry #LK-PR-2024</span>
                      <a className="text-blue-600 text-sm font-semibold hover:underline flex items-center gap-1" href="#">
                        <span>View All Tasks (8)</span>
                        <span className="material-symbols-outlined text-base">arrow_forward</span>
                      </a>
                    </div>
                  </section>

                  {/* Primary Bell Rhythm (5 cols) */}
                  <section className="lg:col-span-5 bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between pb-3">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-green-600 text-2xl">schedule</span>
                        <h2 className="text-lg font-bold text-gray-900">Primary Bell Rhythm</h2>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold">Standard Day</span>
                    </div>

                    <div className="space-y-3.5 mt-2">
                      <div className="flex items-start gap-3">
                        <div className="flex flex-col items-center">
                          <span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span>
                          <span className="w-0.5 h-7 bg-gray-200"></span>
                        </div>
                        <div className="flex-1 -mt-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">08:15 AM - 10:30 AM</span>
                            <span className="text-xs text-gray-500 uppercase">Completed</span>
                          </div>
                          <p className="text-sm text-gray-900 font-medium">Morning Homeroom & Core Numeracy/Literacy</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="flex flex-col items-center">
                          <span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span>
                          <span className="w-0.5 h-7 bg-gray-200"></span>
                        </div>
                        <div className="flex-1 -mt-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">10:30 AM - 11:15 AM</span>
                            <span className="text-xs text-gray-500 uppercase">Completed</span>
                          </div>
                          <p className="text-sm text-gray-900 font-medium">Mid-Morning Snack & Playground Break</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="flex flex-col items-center">
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
                          <span className="w-0.5 h-7 bg-gray-200"></span>
                        </div>
                        <div className="flex-1 -mt-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-blue-600 font-semibold">11:15 AM - 01:45 PM</span>
                            <span className="text-xs px-1.5 py-0.2 rounded bg-blue-600 text-white font-bold uppercase">Now In Session</span>
                          </div>
                          <p className="text-sm text-gray-900 font-semibold">Specialist Periods: French, Yoruba, ICT & STEM Lab</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="flex flex-col items-center">
                          <span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span>
                        </div>
                        <div className="flex-1 -mt-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">02:00 PM</span>
                            <span className="text-xs text-gray-500 uppercase">Upcoming</span>
                          </div>
                          <p className="text-sm text-gray-900 font-medium">Pack-up & Safe School Bus Dismissal</p>
                        </div>
                      </div>
                    </div>

                    {/* Compliance Box */}
                    <div className="mt-4 p-3.5 rounded-xl bg-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-base">cloud_sync</span>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-gray-900">SUBEB CAS Synchronized</div>
                          <div className="text-xs text-gray-500">State portal batch #440-LK active</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-xs bg-gray-200 font-bold text-green-600">Verified</span>
                    </div>
                  </section>
                </div>

                {/* Primary Classes Matrix Table */}
                <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-blue-600 text-2xl">view_column</span>
                        <h2 className="text-lg font-bold text-gray-900">Primary Class Streams & Homeroom Roster</h2>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        12 Active Homeroom Streams across 6 Grade Levels (Capacity: 30 pupils per arm)
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium transition-colors flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-base">assignment_ind</span>
                        <span>Assign Teacher</span>
                      </button>
                      <button className="px-3.5 py-1.5 rounded-lg bg-blue-100 text-blue-700 text-xs font-medium hover:bg-blue-200 transition-colors flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-base">download</span>
                        <span>Download NCEE Register</span>
                      </button>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wider">
                          <th className="py-3 px-4 rounded-l-xl">Level & Streams</th>
                          <th className="py-3 px-4">Homeroom Teachers</th>
                          <th className="py-3 px-4">Pupils</th>
                          <th className="py-3 px-4">Capacity Load</th>
                          <th className="py-3 px-4">CA Submission</th>
                          <th className="py-3 px-4 rounded-r-xl text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {/* Basic 1 */}
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">B1</div>
                              <div>
                                <span className="text-sm font-bold text-gray-900">Basic 1</span>
                                <div className="text-xs text-gray-500 flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span> Gold ·
                                  <span className="w-1.5 h-1.5 rounded-full bg-green-600 ml-1"></span> Emerald
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="text-gray-900 font-medium">Mr. A. Adeleke & Mrs. C. Eze</div>
                            <div className="text-xs text-gray-500">Block A · Ground Floor</div>
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-gray-900">
                            52 <span className="text-xs text-gray-500 font-normal">(26 + 26)</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="w-28 space-y-1">
                              <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-blue-600 h-full rounded-full" style={{width: '86.6%'}}></div>
                              </div>
                              <div className="text-xs text-gray-500">86% (4 Seats free)</div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold">CA1 & CA2 100%</span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button className="px-2.5 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs font-medium">Manage</button>
                          </td>
                        </tr>

                        {/* Basic 2 */}
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">B2</div>
                              <div>
                                <span className="text-sm font-bold text-gray-900">Basic 2</span>
                                <div className="text-xs text-gray-500 flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span> Sapphire ·
                                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 ml-1"></span> Ruby
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="text-gray-900 font-medium">Mrs. H. Danladi & Mr. E. Okafor</div>
                            <div className="text-xs text-gray-500">Block A · Rm 102</div>
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-gray-900">
                            54 <span className="text-xs text-gray-500 font-normal">(27 + 27)</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="w-28 space-y-1">
                              <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-blue-600 h-full rounded-full" style={{width: '90%'}}></div>
                              </div>
                              <div className="text-xs text-gray-500">90% (6 Seats free)</div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold">CA1 & CA2 100%</span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button className="px-2.5 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs font-medium">Manage</button>
                          </td>
                        </tr>

                        {/* Basic 3 */}
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">B3</div>
                              <div>
                                <span className="text-sm font-bold text-gray-900">Basic 3</span>
                                <div className="text-xs text-gray-500 flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span> Diamond ·
                                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 ml-1"></span> Silver
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="text-gray-900 font-medium">Mr. K. Balogun & Mrs. F. Alabi</div>
                            <div className="text-xs text-gray-500">Block A · Rm 104</div>
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-gray-900">
                            50 <span className="text-xs text-gray-500 font-normal">(25 + 25)</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="w-28 space-y-1">
                              <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-blue-600 h-full rounded-full" style={{width: '83.3%'}}></div>
                              </div>
                              <div className="text-xs text-gray-500">83% (10 Seats free)</div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold">CA1 & CA2 100%</span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button className="px-2.5 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs font-medium">Manage</button>
                          </td>
                        </tr>

                        {/* Basic 4 */}
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm shrink-0">B4</div>
                              <div>
                                <span className="text-sm font-bold text-gray-900">Basic 4</span>
                                <div className="text-xs text-gray-500 flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span> Emerald ·
                                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-600 ml-1"></span> Gold
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="text-gray-900 font-medium">Mrs. P. Okon & Mr. T. Williams</div>
                            <div className="text-xs text-gray-500">Block B · 1st Floor</div>
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-gray-900">
                            56 <span className="text-xs text-gray-500 font-normal">(28 + 28)</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="w-28 space-y-1">
                              <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-blue-600 h-full rounded-full" style={{width: '93.3%'}}></div>
                              </div>
                              <div className="text-xs text-gray-500">93% (4 Seats free)</div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 text-xs font-bold">Sign-off Pending</span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button className="px-2.5 py-1 rounded bg-blue-600 text-white text-xs font-medium shadow-sm hover:bg-blue-700">Sign-off</button>
                          </td>
                        </tr>

                        {/* Basic 5 */}
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">B5</div>
                              <div>
                                <span className="text-sm font-bold text-gray-900">Basic 5</span>
                                <div className="text-xs text-gray-500 flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span> Platinum ·
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-700 ml-1"></span> Bronze
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="text-gray-900 font-medium">Mr. S. Alade & Mrs. K. Mustapha</div>
                            <div className="text-xs text-gray-500">Block B · Rm 202</div>
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-gray-900">
                            54 <span className="text-xs text-gray-500 font-normal">(27 + 27)</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="w-28 space-y-1">
                              <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-blue-600 h-full rounded-full" style={{width: '90%'}}></div>
                              </div>
                              <div className="text-xs text-gray-500">90% (6 Seats free)</div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold">CA1 & CA2 100%</span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button className="px-2.5 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs font-medium">Manage</button>
                          </td>
                        </tr>

                        {/* Basic 6 - Graduating */}
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm shrink-0">B6</div>
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-sm font-bold text-gray-900">Basic 6</span>
                                  <span className="text-xs px-1.5 py-0.2 rounded bg-purple-100 text-purple-700 uppercase">Graduating</span>
                                </div>
                                <div className="text-xs text-gray-500 flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-600"></span> Gold ·
                                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 ml-1"></span> Silver
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="text-gray-900 font-medium">Mr. E. Chukwuma & Mrs. B. Coker</div>
                            <div className="text-xs text-gray-500">Block B · Exam Wing 204</div>
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-gray-900">
                            54 <span className="text-xs text-gray-500 font-normal">(28 + 26)</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="w-28 space-y-1">
                              <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-blue-600 h-full rounded-full" style={{width: '90%'}}></div>
                              </div>
                              <div className="text-xs text-gray-500">90% (Common Ent.)</div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-xs font-bold">Mock Exams Ready</span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button className="px-2.5 py-1 rounded bg-purple-100 text-purple-700 text-xs font-medium font-semibold hover:bg-purple-200">NCEE Dossier</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Matrix Summary Footer */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-gray-500 text-xs">
                    <div className="flex items-center gap-4">
                      <span>Total Primary Capacity: <strong>360 desks</strong></span>
                      <span>Enrollment Utilization: <strong>88.9% (320 Active)</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-600"></span>
                      <span>All 12 Homeroom registers updated as of 09:15 AM today</span>
                    </div>
                  </div>
                </div>

                {/* Primary Operations Quick Command Footer Banner */}
                <div className="rounded-2xl bg-gray-100 p-5 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white text-blue-600 flex items-center justify-center shadow-sm shrink-0">
                      <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">Lekki Campus Primary Admin Desk</h3>
                      <p className="text-xs text-gray-600">
                        Managing registrar: Mrs. Folake Balogun · Shift logs archived to local core node.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button className="px-4 py-2 rounded-lg bg-white text-gray-700 hover:bg-gray-50 text-xs font-medium shadow-sm transition-all flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-lg">contactless</span>
                      <span>Sync NFC Bus Cards</span>
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-medium shadow-sm hover:bg-blue-700 transition-all flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-lg">summarize</span>
                      <span>Primary Term Dossier</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* JUNIOR SECONDARY SECTION CONTENT */}
            {selectedSection === 'jss' && (
              <div className="space-y-6">
                {/* JSS Section Scope Header Banner */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 p-6 shadow-lg text-white">
                  <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="space-y-2 max-w-3xl">
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md font-label-pill text-xs text-white uppercase tracking-wider">
                        <span className="material-symbols-outlined text-sm">school</span>
                        <span>Junior Secondary School Section</span>
                      </div>
                      <h1 className="text-3xl font-bold text-white tracking-tight">JSS 1 – JSS 3 Operational View</h1>
                      <p className="text-sm text-purple-100 leading-relaxed">
                        <strong className="text-white font-semibold">245 enrolled students</strong> across 9 class arms
                        {schoolTopology.topologyType === 'all-in-one' ? ' • First Floor West Wing' : ' • Standalone Building'}
                        • Vice Principal (JSS): <strong className="text-white">Mrs. Ngozi Adekunle</strong>
                        • <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/20 text-green-100 text-xs font-medium">
                          <span className="material-symbols-outlined text-xs">verified</span>
                          Lagos State BECE Verified
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* 4 Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-lg bg-green-100">
                        <span className="material-symbols-outlined text-green-600 text-xl">how_to_reg</span>
                      </div>
                      <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">Live</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">238/245</div>
                    <div className="text-sm text-gray-500 mb-2">Present Today (JSS)</div>
                    <div className="text-xs font-semibold text-green-600">97.1% Attendance Rate</div>
                  </div>

                  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-lg bg-violet-100">
                        <span className="material-symbols-outlined text-violet-600 text-xl">supervisor_account</span>
                      </div>
                      <span className="text-xs font-medium text-violet-600 bg-violet-50 px-2 py-1 rounded-full">Active</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">22</div>
                    <div className="text-sm text-gray-500 mb-2">Teaching Faculty (JSS)</div>
                    <div className="text-xs font-semibold text-gray-600">1:11 Student-Teacher Ratio</div>
                  </div>

                  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-lg bg-blue-100">
                        <span className="material-symbols-outlined text-blue-600 text-xl">workspace_premium</span>
                      </div>
                      <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">2026</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">84/84</div>
                    <div className="text-sm text-gray-500 mb-2">BECE Candidacy (JSS 3)</div>
                    <div className="text-xs font-semibold text-green-600">100% Registered</div>
                  </div>

                  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-lg bg-amber-100">
                        <span className="material-symbols-outlined text-amber-600 text-xl">assignment_turned_in</span>
                      </div>
                      <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">Current Term</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">91%</div>
                    <div className="text-sm text-gray-500 mb-2">CA Submission Rate</div>
                    <div className="text-xs font-semibold text-gray-600">223/245 Submitted</div>
                  </div>
                </div>

                {/* JSS Grade Cohorts Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">JSS Grade Cohorts (9 Classes)</h3>
                        <p className="text-sm text-gray-500 mt-1">All junior secondary class arms with homeroom teachers and enrollment</p>
                      </div>
                      <button className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                        <span className="material-symbols-outlined text-sm">download</span>
                        Export JSS Report
                      </button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wider">
                          <th className="px-6 py-3 font-semibold">Grade & Class Arm</th>
                          <th className="px-6 py-3 font-semibold">Homeroom Teacher</th>
                          <th className="px-6 py-3 font-semibold">Students</th>
                          <th className="px-6 py-3 font-semibold">Capacity</th>
                          <th className="px-6 py-3 font-semibold">CA Status</th>
                          <th className="px-6 py-3 font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {/* JSS 1 Amber */}
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-amber-100">
                                <span className="material-symbols-outlined text-amber-600 text-lg">school</span>
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900">JSS 1 Amber</div>
                                <div className="text-xs text-gray-500">Junior Secondary Year 1</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-700">Mr. Chukwudi Okafor</td>
                          <td className="px-6 py-4">
                            <div className="font-semibold text-gray-900">28</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-500" style={{ width: '93%' }}></div>
                              </div>
                              <span className="text-xs text-gray-600">93%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                              89% Submitted
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-purple-600 hover:text-purple-700 font-medium text-xs">View Details →</button>
                          </td>
                        </tr>

                        {/* JSS 1 Bronze */}
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-orange-100">
                                <span className="material-symbols-outlined text-orange-600 text-lg">school</span>
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900">JSS 1 Bronze</div>
                                <div className="text-xs text-gray-500">Junior Secondary Year 1</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-700">Mrs. Blessing Adeyemi</td>
                          <td className="px-6 py-4">
                            <div className="font-semibold text-gray-900">27</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-orange-500" style={{ width: '90%' }}></div>
                              </div>
                              <span className="text-xs text-gray-600">90%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                              92% Submitted
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-purple-600 hover:text-purple-700 font-medium text-xs">View Details →</button>
                          </td>
                        </tr>

                        {/* JSS 1 Crystal */}
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-cyan-100">
                                <span className="material-symbols-outlined text-cyan-600 text-lg">school</span>
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900">JSS 1 Crystal</div>
                                <div className="text-xs text-gray-500">Junior Secondary Year 1</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-700">Mr. Ibrahim Yusuf</td>
                          <td className="px-6 py-4">
                            <div className="font-semibold text-gray-900">26</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-cyan-500" style={{ width: '87%' }}></div>
                              </div>
                              <span className="text-xs text-gray-600">87%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                              88% Submitted
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-purple-600 hover:text-purple-700 font-medium text-xs">View Details →</button>
                          </td>
                        </tr>

                        {/* JSS 2 Diamond */}
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-blue-100">
                                <span className="material-symbols-outlined text-blue-600 text-lg">school</span>
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900">JSS 2 Diamond</div>
                                <div className="text-xs text-gray-500">Junior Secondary Year 2</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-700">Mrs. Chiamaka Nwachukwu</td>
                          <td className="px-6 py-4">
                            <div className="font-semibold text-gray-900">29</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500" style={{ width: '97%' }}></div>
                              </div>
                              <span className="text-xs text-gray-600">97%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                              94% Submitted
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-purple-600 hover:text-purple-700 font-medium text-xs">View Details →</button>
                          </td>
                        </tr>

                        {/* JSS 2 Emerald */}
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-emerald-100">
                                <span className="material-symbols-outlined text-emerald-600 text-lg">school</span>
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900">JSS 2 Emerald</div>
                                <div className="text-xs text-gray-500">Junior Secondary Year 2</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-700">Mr. Samuel Oluwaseun</td>
                          <td className="px-6 py-4">
                            <div className="font-semibold text-gray-900">27</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500" style={{ width: '90%' }}></div>
                              </div>
                              <span className="text-xs text-gray-600">90%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                              90% Submitted
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-purple-600 hover:text-purple-700 font-medium text-xs">View Details →</button>
                          </td>
                        </tr>

                        {/* JSS 2 Garnet */}
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-red-100">
                                <span className="material-symbols-outlined text-red-600 text-lg">school</span>
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900">JSS 2 Garnet</div>
                                <div className="text-xs text-gray-500">Junior Secondary Year 2</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-700">Mrs. Fatima Abdullahi</td>
                          <td className="px-6 py-4">
                            <div className="font-semibold text-gray-900">28</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-red-500" style={{ width: '93%' }}></div>
                              </div>
                              <span className="text-xs text-gray-600">93%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                              91% Submitted
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-purple-600 hover:text-purple-700 font-medium text-xs">View Details →</button>
                          </td>
                        </tr>

                        {/* JSS 3 Gold */}
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-yellow-100">
                                <span className="material-symbols-outlined text-yellow-600 text-lg">school</span>
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900">JSS 3 Gold</div>
                                <div className="text-xs text-gray-500">Junior Secondary Year 3 • BECE Class</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-700">Mr. David Adeleke</td>
                          <td className="px-6 py-4">
                            <div className="font-semibold text-gray-900">28</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-yellow-500" style={{ width: '93%' }}></div>
                              </div>
                              <span className="text-xs text-gray-600">93%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                              <span className="material-symbols-outlined text-xs">workspace_premium</span>
                              BECE Registered
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-purple-600 hover:text-purple-700 font-medium text-xs">View Details →</button>
                          </td>
                        </tr>

                        {/* JSS 3 Jasper */}
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-rose-100">
                                <span className="material-symbols-outlined text-rose-600 text-lg">school</span>
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900">JSS 3 Jasper</div>
                                <div className="text-xs text-gray-500">Junior Secondary Year 3 • BECE Class</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-700">Mrs. Jumoke Bakare</td>
                          <td className="px-6 py-4">
                            <div className="font-semibold text-gray-900">28</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-rose-500" style={{ width: '93%' }}></div>
                              </div>
                              <span className="text-xs text-gray-600">93%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                              <span className="material-symbols-outlined text-xs">workspace_premium</span>
                              BECE Registered
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-purple-600 hover:text-purple-700 font-medium text-xs">View Details →</button>
                          </td>
                        </tr>

                        {/* JSS 3 Opal */}
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-indigo-100">
                                <span className="material-symbols-outlined text-indigo-600 text-lg">school</span>
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900">JSS 3 Opal</div>
                                <div className="text-xs text-gray-500">Junior Secondary Year 3 • BECE Class</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-700">Mr. Emeka Onyeka</td>
                          <td className="px-6 py-4">
                            <div className="font-semibold text-gray-900">28</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500" style={{ width: '93%' }}></div>
                              </div>
                              <span className="text-xs text-gray-600">93%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                              <span className="material-symbols-outlined text-xs">workspace_premium</span>
                              BECE Registered
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-purple-600 hover:text-purple-700 font-medium text-xs">View Details →</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Two-Column Layout: Pre-Vocational Workshops + JSS Action Queue */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Pre-Vocational Workshop Schedules */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-violet-50">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-purple-100">
                          <span className="material-symbols-outlined text-purple-600 text-lg">handyman</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Pre-Vocational Workshop Schedules</h3>
                          <p className="text-xs text-gray-500">JSS 1–3 Practical Skills Training</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      {/* Basic Technology */}
                      <div className="flex items-start gap-4 p-4 rounded-lg bg-blue-50 border border-blue-200">
                        <div className="p-2 rounded-lg bg-blue-100 flex-shrink-0">
                          <span className="material-symbols-outlined text-blue-600">precision_manufacturing</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-gray-900">Basic Technology</h4>
                            <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">JSS 1–3</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">Tuesday & Thursday • 10:30 AM – 12:00 PM</p>
                          <p className="text-xs text-gray-500">Workshop A • Mr. Uche Nnamdi (Instructor)</p>
                        </div>
                      </div>

                      {/* Home Economics */}
                      <div className="flex items-start gap-4 p-4 rounded-lg bg-pink-50 border border-pink-200">
                        <div className="p-2 rounded-lg bg-pink-100 flex-shrink-0">
                          <span className="material-symbols-outlined text-pink-600">restaurant</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-gray-900">Home Economics</h4>
                            <span className="text-xs font-medium text-pink-600 bg-pink-100 px-2 py-0.5 rounded-full">JSS 1–3</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">Monday & Wednesday • 1:00 PM – 2:30 PM</p>
                          <p className="text-xs text-gray-500">Home Ec Lab • Mrs. Grace Afolabi (Instructor)</p>
                        </div>
                      </div>

                      {/* ICT & Computer Studies */}
                      <div className="flex items-start gap-4 p-4 rounded-lg bg-cyan-50 border border-cyan-200">
                        <div className="p-2 rounded-lg bg-cyan-100 flex-shrink-0">
                          <span className="material-symbols-outlined text-cyan-600">computer</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-gray-900">ICT & Computer Studies</h4>
                            <span className="text-xs font-medium text-cyan-600 bg-cyan-100 px-2 py-0.5 rounded-full">JSS 1–3</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">Friday • 9:00 AM – 11:00 AM</p>
                          <p className="text-xs text-gray-500">Computer Lab • Mr. Tunde Adebayo (Instructor)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* JSS Action Queue */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-violet-50 to-purple-50">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-violet-100">
                          <span className="material-symbols-outlined text-violet-600 text-lg">pending_actions</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">JSS Action Queue</h3>
                          <p className="text-xs text-gray-500">3 Pending Items Requiring Attention</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      {/* Pending Item 1 */}
                      <div className="flex items-start gap-4 p-4 rounded-lg bg-amber-50 border border-amber-200">
                        <div className="p-2 rounded-lg bg-amber-100 flex-shrink-0">
                          <span className="material-symbols-outlined text-amber-600">assignment_late</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-gray-900">JSS 2 CA Submission Overdue</h4>
                            <span className="text-xs font-medium text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">Pending</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">3 teachers have not submitted continuous assessment scores for JSS 2</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span className="material-symbols-outlined text-xs">schedule</span>
                            <span>Due: 2 days ago</span>
                          </div>
                        </div>
                      </div>

                      {/* Pending Item 2 */}
                      <div className="flex items-start gap-4 p-4 rounded-lg bg-blue-50 border border-blue-200">
                        <div className="p-2 rounded-lg bg-blue-100 flex-shrink-0">
                          <span className="material-symbols-outlined text-blue-600">workspace_premium</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-gray-900">BECE Mock Exam Scheduling</h4>
                            <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">In Progress</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">Schedule mock BECE examination for JSS 3 students (84 candidates)</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span className="material-symbols-outlined text-xs">event</span>
                            <span>Target: Next week</span>
                          </div>
                        </div>
                      </div>

                      {/* Pending Item 3 */}
                      <div className="flex items-start gap-4 p-4 rounded-lg bg-purple-50 border border-purple-200">
                        <div className="p-2 rounded-lg bg-purple-100 flex-shrink-0">
                          <span className="material-symbols-outlined text-purple-600">groups</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-gray-900">Parent-Teacher Meeting (JSS 1)</h4>
                            <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">Upcoming</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">Coordinate parent-teacher meetings for all JSS 1 classes</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span className="material-symbols-outlined text-xs">event</span>
                            <span>Scheduled: Next Thursday, 2:00 PM</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lagos BECE Gateway Card */}
                <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl p-6 shadow-lg text-white">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-white/20 backdrop-blur-md flex-shrink-0">
                        <span className="material-symbols-outlined text-white text-2xl">workspace_premium</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">Lagos State BECE Gateway Portal</h3>
                        <p className="text-sm text-blue-100 leading-relaxed mb-3">
                          <strong className="text-white">84 JSS 3 candidates</strong> registered for 2026 Basic Education Certificate Examination (BECE)
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">verified</span>
                            <span>100% Verified</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">check_circle</span>
                            <span>84/84 Registered</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-semibold whitespace-nowrap">
                      <span className="material-symbols-outlined text-sm">open_in_new</span>
                      View BECE Portal
                    </button>
                  </div>
                </div>

                {/* JSS Bell Rhythm */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-violet-50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-purple-100">
                        <span className="material-symbols-outlined text-purple-600 text-lg">schedule</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">JSS Daily Bell Rhythm</h3>
                        <p className="text-xs text-gray-500">Junior Secondary Section Schedule</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                        <div className="text-sm font-semibold text-gray-900 mb-1">Morning Assembly</div>
                        <div className="text-xs text-gray-500">7:45 AM – 8:00 AM</div>
                      </div>
                      <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                        <div className="text-sm font-semibold text-gray-900 mb-1">1st Period</div>
                        <div className="text-xs text-gray-500">8:00 AM – 8:40 AM</div>
                      </div>
                      <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                        <div className="text-sm font-semibold text-gray-900 mb-1">2nd Period</div>
                        <div className="text-xs text-gray-500">8:40 AM – 9:20 AM</div>
                      </div>
                      <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                        <div className="text-sm font-semibold text-blue-900 mb-1">Break Time</div>
                        <div className="text-xs text-blue-600">9:20 AM – 9:40 AM</div>
                      </div>
                      <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                        <div className="text-sm font-semibold text-gray-900 mb-1">3rd Period</div>
                        <div className="text-xs text-gray-500">9:40 AM – 10:20 AM</div>
                      </div>
                      <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                        <div className="text-sm font-semibold text-gray-900 mb-1">4th Period</div>
                        <div className="text-xs text-gray-500">10:20 AM – 11:00 AM</div>
                      </div>
                      <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                        <div className="text-sm font-semibold text-blue-900 mb-1">Lunch Break</div>
                        <div className="text-xs text-blue-600">11:00 AM – 12:00 PM</div>
                      </div>
                      <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                        <div className="text-sm font-semibold text-gray-900 mb-1">5th Period</div>
                        <div className="text-xs text-gray-500">12:00 PM – 12:40 PM</div>
                      </div>
                      <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                        <div className="text-sm font-semibold text-gray-900 mb-1">Closing</div>
                        <div className="text-xs text-gray-500">12:40 PM</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SENIOR SECONDARY SECTION CONTENT */}
            {selectedSection === 'sss' && (
              <div className="space-y-6">
                {/* SSS Section Scope Header Banner */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 p-6 shadow-lg text-white">
                  <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="space-y-2 max-w-3xl">
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md font-label-pill text-xs text-white uppercase tracking-wider">
                        <span className="material-symbols-outlined text-sm">workspace_premium</span>
                        <span>Collegiate Level Section</span>
                      </div>
                      <h1 className="text-3xl font-bold text-white tracking-tight">Senior Secondary School (SSS 1–3)</h1>
                      <p className="text-sm text-orange-100 leading-relaxed">
                        <strong className="text-white font-semibold">215 enrolled students</strong> across departmental cohorts (Science, Arts, Commercial)
                        {schoolTopology.topologyType === 'all-in-one' ? ' • Second Floor South Wing' : ' • Standalone Building'}
                        • Vice Principal (SSS): <strong className="text-white">Dr. Emeka Nwankwo</strong>
                        • <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/20 text-green-100 text-xs font-medium">
                          <span className="material-symbols-outlined text-xs">verified</span>
                          WAEC/WASSCE Accredited
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* 4 Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-lg bg-green-100">
                        <span className="material-symbols-outlined text-green-600 text-xl">how_to_reg</span>
                      </div>
                      <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">Live</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">210/215</div>
                    <div className="text-sm text-gray-500 mb-2">Present Today (SSS)</div>
                    <div className="text-xs font-semibold text-green-600">97.7% Attendance Rate</div>
                  </div>

                  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-lg bg-indigo-100">
                        <span className="material-symbols-outlined text-indigo-600 text-xl">school</span>
                      </div>
                      <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">Active</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">24</div>
                    <div className="text-sm text-gray-500 mb-2">Specialist Faculty (SSS)</div>
                    <div className="text-xs font-semibold text-gray-600">1:9 Student-Teacher Ratio</div>
                  </div>

                  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-lg bg-orange-100">
                        <span className="material-symbols-outlined text-orange-600 text-xl">workspace_premium</span>
                      </div>
                      <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full">2026</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">72/72</div>
                    <div className="text-sm text-gray-500 mb-2">WAEC Clearance (SSS 3)</div>
                    <div className="text-xs font-semibold text-green-600">100% Registered</div>
                  </div>

                  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-lg bg-cyan-100">
                        <span className="material-symbols-outlined text-cyan-600 text-xl">science</span>
                      </div>
                      <span className="text-xs font-medium text-cyan-600 bg-cyan-50 px-2 py-1 rounded-full">Operational</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">4/4</div>
                    <div className="text-sm text-gray-500 mb-2">Science Laboratories</div>
                    <div className="text-xs font-semibold text-green-600">All Labs Active</div>
                  </div>
                </div>

                {/* Collegiate Action Queue */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-red-50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-orange-100">
                        <span className="material-symbols-outlined text-orange-600 text-lg">priority_high</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Collegiate Action Queue</h3>
                        <p className="text-xs text-gray-500">3 High-Impact Items Requiring Senior Leadership Attention</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      {/* Action Item 1 */}
                      <div className="flex flex-col gap-3 p-4 rounded-lg bg-red-50 border border-red-200">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-red-100 flex-shrink-0">
                            <span className="material-symbols-outlined text-red-600">warning</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-semibold text-gray-900 text-sm">WAEC Mock Results Review</h4>
                              <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-0.5 rounded-full">Urgent</span>
                            </div>
                            <p className="text-xs text-gray-600 mb-2">Analyze mock WAEC results for SSS 3 students and identify intervention areas</p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span className="material-symbols-outlined text-xs">schedule</span>
                              <span>Due: Tomorrow</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Item 2 */}
                      <div className="flex flex-col gap-3 p-4 rounded-lg bg-amber-50 border border-amber-200">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-amber-100 flex-shrink-0">
                            <span className="material-symbols-outlined text-amber-600">assignment</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-semibold text-gray-900 text-sm">UTME Registration Deadline</h4>
                              <span className="text-xs font-medium text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">Pending</span>
                            </div>
                            <p className="text-xs text-gray-600 mb-2">Complete UTME registration for SSS 3 students (68 candidates)</p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span className="material-symbols-outlined text-xs">event</span>
                              <span>Deadline: Next week</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Item 3 */}
                      <div className="flex flex-col gap-3 p-4 rounded-lg bg-blue-50 border border-blue-200">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-blue-100 flex-shrink-0">
                            <span className="material-symbols-outlined text-blue-600">science</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-semibold text-gray-900 text-sm">Lab Equipment Calibration</h4>
                              <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">Scheduled</span>
                            </div>
                            <p className="text-xs text-gray-600 mb-2">Physics and Chemistry labs require annual equipment calibration</p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span className="material-symbols-outlined text-xs">calendar_month</span>
                              <span>Scheduled: Friday</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* External Examination Readiness Timeline */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-amber-50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-orange-100">
                        <span className="material-symbols-outlined text-orange-600 text-lg">timeline</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">External Examination Readiness Timeline</h3>
                        <p className="text-xs text-gray-500">WAEC/NECO/UTME Preparation Milestones for SSS 3</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Milestone 1 */}
                      <div className="relative">
                        <div className="flex items-start gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                              <span className="material-symbols-outlined text-green-600">check_circle</span>
                            </div>
                            <div className="w-0.5 h-full bg-green-200 mt-2"></div>
                          </div>
                          <div className="pb-6 flex-1">
                            <div className="inline-block px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium mb-2">Completed</div>
                            <h4 className="font-semibold text-gray-900 mb-1">WAEC Registration</h4>
                            <p className="text-sm text-gray-600 mb-2">All 72 SSS 3 students registered for WAEC/WASSCE examination</p>
                            <p className="text-xs text-gray-500">Completed: Jan 15, 2026</p>
                          </div>
                        </div>
                      </div>

                      {/* Milestone 2 */}
                      <div className="relative">
                        <div className="flex items-start gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                              <span className="material-symbols-outlined text-blue-600">play_circle</span>
                            </div>
                            <div className="w-0.5 h-full bg-blue-200 mt-2"></div>
                          </div>
                          <div className="pb-6 flex-1">
                            <div className="inline-block px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium mb-2">In Progress</div>
                            <h4 className="font-semibold text-gray-900 mb-1">Mock Examinations</h4>
                            <p className="text-sm text-gray-600 mb-2">WAEC mock exams in progress, results analysis scheduled</p>
                            <p className="text-xs text-gray-500">Target: Feb 28, 2026</p>
                          </div>
                        </div>
                      </div>

                      {/* Milestone 3 */}
                      <div className="relative">
                        <div className="flex items-start gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                              <span className="material-symbols-outlined text-gray-600">schedule</span>
                            </div>
                          </div>
                          <div className="pb-6 flex-1">
                            <div className="inline-block px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs font-medium mb-2">Upcoming</div>
                            <h4 className="font-semibold text-gray-900 mb-1">UTME Coaching</h4>
                            <p className="text-sm text-gray-600 mb-2">Intensive JAMB UTME preparation classes for university aspirants</p>
                            <p className="text-xs text-gray-500">Start: March 10, 2026</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Two-Column Layout: Senior Admin Controls + SSS Bell Schedule */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Senior Admin Controls */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-red-50">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-orange-100">
                          <span className="material-symbols-outlined text-orange-600 text-lg">admin_panel_settings</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Senior Admin Controls</h3>
                          <p className="text-xs text-gray-500">Quick Actions for SSS Management</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 space-y-3">
                      <button className="w-full flex items-center justify-between p-4 rounded-lg bg-orange-50 border border-orange-200 hover:bg-orange-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-orange-100">
                            <span className="material-symbols-outlined text-orange-600">assignment</span>
                          </div>
                          <div className="text-left">
                            <div className="font-semibold text-gray-900 text-sm">Generate WAEC Lists</div>
                            <div className="text-xs text-gray-500">Export WAEC candidate lists</div>
                          </div>
                        </div>
                        <span className="material-symbols-outlined text-gray-400">chevron_right</span>
                      </button>

                      <button className="w-full flex items-center justify-between p-4 rounded-lg bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-blue-100">
                            <span className="material-symbols-outlined text-blue-600">edit_document</span>
                          </div>
                          <div className="text-left">
                            <div className="font-semibold text-gray-900 text-sm">Update UTME Data</div>
                            <div className="text-xs text-gray-500">Manage JAMB registration data</div>
                          </div>
                        </div>
                        <span className="material-symbols-outlined text-gray-400">chevron_right</span>
                      </button>

                      <button className="w-full flex items-center justify-between p-4 rounded-lg bg-purple-50 border border-purple-200 hover:bg-purple-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-purple-100">
                            <span className="material-symbols-outlined text-purple-600">school</span>
                          </div>
                          <div className="text-left">
                            <div className="font-semibold text-gray-900 text-sm">University Counseling</div>
                            <div className="text-xs text-gray-500">Access guidance resources</div>
                          </div>
                        </div>
                        <span className="material-symbols-outlined text-gray-400">chevron_right</span>
                      </button>

                      <button className="w-full flex items-center justify-between p-4 rounded-lg bg-green-50 border border-green-200 hover:bg-green-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-green-100">
                            <span className="material-symbols-outlined text-green-600">trending_up</span>
                          </div>
                          <div className="text-left">
                            <div className="font-semibold text-gray-900 text-sm">Performance Analytics</div>
                            <div className="text-xs text-gray-500">View SSS academic trends</div>
                          </div>
                        </div>
                        <span className="material-symbols-outlined text-gray-400">chevron_right</span>
                      </button>
                    </div>
                  </div>

                  {/* SSS Bell Schedule */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-amber-50">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-orange-100">
                          <span className="material-symbols-outlined text-orange-600 text-lg">schedule</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">SSS Daily Bell Schedule</h3>
                          <p className="text-xs text-gray-500">Senior Secondary Collegiate Hours</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-gray-600">wb_twilight</span>
                          <span className="text-sm font-semibold text-gray-900">Morning Assembly</span>
                        </div>
                        <span className="text-xs text-gray-600">7:30 AM – 7:50 AM</span>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-gray-600">menu_book</span>
                          <span className="text-sm font-semibold text-gray-900">1st Period</span>
                        </div>
                        <span className="text-xs text-gray-600">7:50 AM – 8:40 AM</span>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-gray-600">menu_book</span>
                          <span className="text-sm font-semibold text-gray-900">2nd Period</span>
                        </div>
                        <span className="text-xs text-gray-600">8:40 AM – 9:30 AM</span>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-200">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-blue-600">free_breakfast</span>
                          <span className="text-sm font-semibold text-blue-900">Break</span>
                        </div>
                        <span className="text-xs text-blue-600">9:30 AM – 9:50 AM</span>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-gray-600">menu_book</span>
                          <span className="text-sm font-semibold text-gray-900">3rd Period</span>
                        </div>
                        <span className="text-xs text-gray-600">9:50 AM – 10:40 AM</span>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-gray-600">menu_book</span>
                          <span className="text-sm font-semibold text-gray-900">4th Period</span>
                        </div>
                        <span className="text-xs text-gray-600">10:40 AM – 11:30 AM</span>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-200">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-blue-600">restaurant</span>
                          <span className="text-sm font-semibold text-blue-900">Lunch</span>
                        </div>
                        <span className="text-xs text-blue-600">11:30 AM – 12:30 PM</span>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-gray-600">menu_book</span>
                          <span className="text-sm font-semibold text-gray-900">5th Period</span>
                        </div>
                        <span className="text-xs text-gray-600">12:30 PM – 1:20 PM</span>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-gray-600">logout</span>
                          <span className="text-sm font-semibold text-gray-900">Closing</span>
                        </div>
                        <span className="text-xs text-gray-600">1:20 PM</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Departmental Cohorts */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-red-50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-orange-100">
                        <span className="material-symbols-outlined text-orange-600 text-lg">diversity_3</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Senior Secondary Departmental Cohorts</h3>
                        <p className="text-xs text-gray-500">SSS 1, SSS 2, SSS 3 Student Distribution by Department</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* SSS 1 Cohort */}
                      <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2.5 rounded-lg bg-blue-100">
                            <span className="material-symbols-outlined text-blue-600 text-xl">group</span>
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-gray-900">SSS 1</h4>
                            <p className="text-xs text-gray-500">Foundation Year</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Total Students</span>
                            <span className="text-2xl font-bold text-blue-600">73</span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-600">Science Track</span>
                              <span className="font-semibold text-gray-900">32 students</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-600">Arts Track</span>
                              <span className="font-semibold text-gray-900">24 students</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-600">Commercial Track</span>
                              <span className="font-semibold text-gray-900">17 students</span>
                            </div>
                          </div>
                          <div className="pt-3 border-t border-blue-200">
                            <div className="flex items-center gap-2 text-xs text-green-600">
                              <span className="material-symbols-outlined text-xs">check_circle</span>
                              <span className="font-medium">96.5% Attendance</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* SSS 2 Cohort */}
                      <div className="p-5 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2.5 rounded-lg bg-purple-100">
                            <span className="material-symbols-outlined text-purple-600 text-xl">group</span>
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-gray-900">SSS 2</h4>
                            <p className="text-xs text-gray-500">Intermediate Year</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Total Students</span>
                            <span className="text-2xl font-bold text-purple-600">70</span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-600">Science Track</span>
                              <span className="font-semibold text-gray-900">30 students</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-600">Arts Track</span>
                              <span className="font-semibold text-gray-900">22 students</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-600">Commercial Track</span>
                              <span className="font-semibold text-gray-900">18 students</span>
                            </div>
                          </div>
                          <div className="pt-3 border-t border-purple-200">
                            <div className="flex items-center gap-2 text-xs text-green-600">
                              <span className="material-symbols-outlined text-xs">check_circle</span>
                              <span className="font-medium">97.1% Attendance</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* SSS 3 Cohort */}
                      <div className="p-5 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2.5 rounded-lg bg-orange-100">
                            <span className="material-symbols-outlined text-orange-600 text-xl">workspace_premium</span>
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-gray-900">SSS 3</h4>
                            <p className="text-xs text-gray-500">Final Year • WAEC Candidates</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Total Candidates</span>
                            <span className="text-2xl font-bold text-orange-600">72</span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-600">Science Track</span>
                              <span className="font-semibold text-gray-900">31 students</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-600">Arts Track</span>
                              <span className="font-semibold text-gray-900">23 students</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-600">Commercial Track</span>
                              <span className="font-semibold text-gray-900">18 students</span>
                            </div>
                          </div>
                          <div className="pt-3 border-t border-orange-200">
                            <div className="flex items-center gap-2 text-xs text-green-600">
                              <span className="material-symbols-outlined text-xs">verified</span>
                              <span className="font-medium">100% WAEC Registered</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Visual Facilities Showcase */}
                <div className="bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-600 rounded-xl p-6 shadow-lg text-white">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">SSS Collegiate Facilities</h3>
                    <p className="text-sm text-cyan-100">State-of-the-art laboratories and administrative facilities for senior secondary education</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                      <div className="p-3 rounded-lg bg-white/20 w-fit mb-3">
                        <span className="material-symbols-outlined text-white text-2xl">science</span>
                      </div>
                      <h4 className="font-semibold text-white mb-1">Physics Laboratory</h4>
                      <p className="text-xs text-cyan-100">Fully equipped with modern apparatus</p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                      <div className="p-3 rounded-lg bg-white/20 w-fit mb-3">
                        <span className="material-symbols-outlined text-white text-2xl">biotech</span>
                      </div>
                      <h4 className="font-semibold text-white mb-1">Chemistry Laboratory</h4>
                      <p className="text-xs text-cyan-100">Safety-certified with fume hoods</p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                      <div className="p-3 rounded-lg bg-white/20 w-fit mb-3">
                        <span className="material-symbols-outlined text-white text-2xl">psychology</span>
                      </div>
                      <h4 className="font-semibold text-white mb-1">Biology Laboratory</h4>
                      <p className="text-xs text-cyan-100">Microscopy and dissection facilities</p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                      <div className="p-3 rounded-lg bg-white/20 w-fit mb-3">
                        <span className="material-symbols-outlined text-white text-2xl">domain</span>
                      </div>
                      <h4 className="font-semibold text-white mb-1">Principal's Office</h4>
                      <p className="text-xs text-cyan-100">Administrative headquarters</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Offline Ready Badge */}
        <div className="fixed bottom-6 right-6 z-30 pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full shadow-lg">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-ping"></span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-wider">Lekki Core Node</span>
              <span className="text-xs font-medium leading-none">Offline-first ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
