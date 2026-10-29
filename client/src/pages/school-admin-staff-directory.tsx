// ============================================================================
// SCHOOL ADMIN STAFF DIRECTORY PAGE - COMPLETE IMPLEMENTATION
// ============================================================================
// Material Design 3 compliant staff directory with:
// - Department/Role filtering
// - Scope filter pill bar
// - Search & filter functionality
// - Quick status tabs
// - Complete staff table with 7 members
// - Right rail intelligence panel (TRCN vetting, distribution, shortcuts)
// - Compliance footer
// ============================================================================

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Staff members data with section assignments
const ALL_STAFF = [
  {
    id: 'EMP-2024-089',
    name: 'Engr. Yusuf Bello',
    role: 'Senior Specialist',
    department: 'SSS Physics & STEM',
    trcn: 'LA/2018/8892',
    email: 'y.bello@school.ng',
    phone: '+234 803 456 7891',
    status: 'Active',
    avatar: 'https://ui-avatars.com/api/?name=Yusuf+Bello&background=1976d2&color=fff&size=128',
    sections: ['Senior Secondary', 'Whole School'],
  },
  {
    id: 'EMP-2024-090',
    name: 'Mrs. Patience E. Okon',
    role: 'Class Tutor',
    department: 'Primary Basic 4',
    trcn: 'TRCN/LA/44120',
    email: 'p.okon@school.ng',
    phone: '+234 802 334 1122',
    status: 'Active',
    avatar: 'https://ui-avatars.com/api/?name=Patience+Okon&background=9c27b0&color=fff&size=128',
    sections: ['Primary Basic', 'Whole School'],
  },
  {
    id: 'EMP-2023-034',
    name: 'Ms. Chidinma Nwankwo',
    role: 'English Teacher',
    department: 'JSS Humanities',
    trcn: 'TRCN/LA/39201',
    email: 'c.nwankwo@school.ng',
    phone: '+234 809 123 4567',
    status: 'Active',
    avatar: 'https://ui-avatars.com/api/?name=Chidinma+Nwankwo&background=e91e63&color=fff&size=128',
    sections: ['Junior Secondary', 'Whole School'],
  },
  {
    id: 'EMP-2022-017',
    name: 'Mr. Olumide Adeyemi',
    role: 'Mathematics HOD',
    department: 'SSS Mathematics',
    trcn: 'TRCN/LA/28765',
    email: 'o.adeyemi@school.ng',
    phone: '+234 806 987 6543',
    status: 'Active',
    avatar: 'https://ui-avatars.com/api/?name=Olumide+Adeyemi&background=4caf50&color=fff&size=128',
    sections: ['Senior Secondary', 'Whole School'],
  },
  {
    id: 'EMP-2024-112',
    name: 'Mrs. Fatima A. Yusuf',
    role: 'School Bursar',
    department: 'Finance & Admin',
    trcn: 'ICAN/FCA/11203',
    email: 'f.yusuf@school.ng',
    phone: '+234 805 432 1098',
    status: 'On Leave',
    avatar: 'https://ui-avatars.com/api/?name=Fatima+Yusuf&background=ff9800&color=fff&size=128',
    sections: ['Whole School'],
  },
  {
    id: 'EMP-2021-065',
    name: 'Mr. Ibrahim Musa',
    role: 'ICT Coordinator',
    department: 'IT & Digital',
    trcn: 'TRCN/LA/22987',
    email: 'i.musa@school.ng',
    phone: '+234 807 654 3210',
    status: 'Active',
    avatar: 'https://ui-avatars.com/api/?name=Ibrahim+Musa&background=3f51b5&color=fff&size=128',
    sections: ['Whole School'],
  },
  {
    id: 'EMP-2023-098',
    name: 'Mrs. Ngozi Okeke',
    role: 'School Nurse',
    department: 'Health Services',
    trcn: 'NMCN/RN/34512',
    email: 'n.okeke@school.ng',
    phone: '+234 808 765 4321',
    status: 'On Leave',
    avatar: 'https://ui-avatars.com/api/?name=Ngozi+Okeke&background=00bcd4&color=fff&size=128',
    sections: ['Whole School'],
  },
  {
    id: 'EMP-2024-145',
    name: 'Ms. Aisha Mohammed',
    role: 'Nursery Coordinator',
    department: 'Early Years Foundation',
    trcn: 'TRCN/LA/55432',
    email: 'a.mohammed@school.ng',
    phone: '+234 801 234 5678',
    status: 'Active',
    avatar: 'https://ui-avatars.com/api/?name=Aisha+Mohammed&background=ff5722&color=fff&size=128',
    sections: ['Early Years', 'Whole School'],
  },
  {
    id: 'EMP-2023-156',
    name: 'Mr. Chidi Okafor',
    role: 'Primary Mathematics Teacher',
    department: 'Primary Basic 5-6',
    trcn: 'TRCN/LA/33891',
    email: 'c.okafor@school.ng',
    phone: '+234 803 555 4321',
    status: 'Active',
    avatar: 'https://ui-avatars.com/api/?name=Chidi+Okafor&background=673ab7&color=fff&size=128',
    sections: ['Primary Basic', 'Whole School'],
  },
  {
    id: 'EMP-2024-178',
    name: 'Mrs. Blessing Eze',
    role: 'JSS Science Teacher',
    department: 'Junior Secondary Science',
    trcn: 'TRCN/LA/44567',
    email: 'b.eze@school.ng',
    phone: '+234 805 777 8888',
    status: 'Active',
    avatar: 'https://ui-avatars.com/api/?name=Blessing+Eze&background=009688&color=fff&size=128',
    sections: ['Junior Secondary', 'Whole School'],
  },
]

export default function SchoolAdminStaffDirectoryPage() {
  const navigate = useNavigate()
  const [staffManagementOpen, setStaffManagementOpen] = useState(true)
  const [selectedScope, setSelectedScope] = useState('Whole School')
  const [selectedStatus, setSelectedStatus] = useState('All')

  // Filter staff based on selected scope
  const filteredStaff = ALL_STAFF.filter((staff) => {
    return staff.sections.includes(selectedScope)
  })

  // Calculate filtered statistics
  const totalStaff = filteredStaff.length
  const teachingStaff = filteredStaff.filter((s) =>
    s.role.includes('Teacher') || s.role.includes('Tutor') || s.role.includes('HOD') || s.role.includes('Specialist') || s.role.includes('Coordinator') && s.department.includes('Years')
  ).length
  const adminStaff = filteredStaff.filter((s) =>
    s.role.includes('Bursar') || s.role.includes('ICT') || s.role.includes('Nurse') || s.role.includes('Admin')
  ).length
  const onLeave = filteredStaff.filter((s) => s.status === 'On Leave').length

  return (
    <div className="min-h-screen bg-[var(--md-sys-color-surface-container-lowest,#f8f9fa)]">
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
              <span className="text-base font-bold text-gray-900 leading-tight truncate">Crown Jewel</span>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider truncate">High School · Lekki</span>
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
            <button
              onClick={() => navigate('/dashboard')}
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
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[var(--md-sys-color-primary-container,#e3f2fd)] text-[var(--md-sys-color-on-primary-container,#1565c0)] font-medium text-sm text-left"
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
                    onClick={() => navigate('/staff-onboarding')}
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
              <span className="text-xs font-bold text-gray-900 truncate">Campus: Lekki Branch</span>
            </div>
            <div className="pl-4">
              <span className="text-xs text-gray-600">Term 1 Active · 2024/2025</span>
            </div>
            <div className="mt-1 pt-1 border-t border-gray-200 flex items-center justify-between">
              <span className="text-[11px] font-bold text-gray-500 uppercase">Trust Registry</span>
              <span className="text-[11px] font-bold text-blue-600">CJET-LK-01</span>
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
              <span className="text-gray-900 font-semibold truncate">Crown Jewel High School - Lekki</span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">Staff Directory</span>
            </div>
            <div className="relative flex-1">
              <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all"
                placeholder="Search staff, ID, TRCN number..."
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
                <span className="text-xs text-gray-600 leading-tight">School Administrator</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="w-full pt-16 bg-[var(--md-sys-color-surface-container-lowest,#f8f9fa)] min-h-screen px-6 py-6">
          <div className="flex flex-col w-full space-y-6 pb-12 max-w-[1600px] mx-auto">
            {/* Page Header with Official Ledger Badge */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold text-[var(--md-sys-color-on-surface,#1a1c1e)]">
                      Staff Directory & Records
                    </h1>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--md-sys-color-tertiary-container,#ffd8e4)] text-[var(--md-sys-color-on-tertiary-container,#7d1131)] text-xs font-bold uppercase tracking-wide">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Official Ledger
                    </span>
                  </div>
                  <p className="text-sm text-[var(--md-sys-color-on-surface-variant,#44474e)]">
                    Crown Jewel High School Lekki · Academic Year 2024/2025
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--md-sys-color-secondary-container,#e8def8)] text-[var(--md-sys-color-on-secondary-container,#1d192b)] font-semibold text-sm transition-all hover:shadow-md">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                    Department / Role
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm transition-all">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Export Directory
                  </button>
                  <button
                    onClick={() => navigate('/add-staff')}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--md-sys-color-primary,#1976d2)] hover:bg-blue-700 text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add New Staff
                  </button>
                </div>
              </div>

              {/* Scope Filter Pill Bar */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Scope:</span>
                {['Whole School', 'Early Years', 'Primary Basic', 'Junior Secondary', 'Senior Secondary'].map((scope) => (
                  <button
                    key={scope}
                    onClick={() => setSelectedScope(scope)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      selectedScope === scope
                        ? 'bg-[var(--md-sys-color-primary-container,#e3f2fd)] text-[var(--md-sys-color-on-primary-container,#1565c0)] shadow-sm'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {scope}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[var(--md-sys-color-on-surface-variant,#44474e)] uppercase font-bold tracking-wide">Total Staff</p>
                    <p className="text-3xl font-bold text-[var(--md-sys-color-on-surface,#1a1c1e)] mt-1">{totalStaff}</p>
                    <p className="text-xs text-gray-600 mt-1">In {selectedScope}</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-[var(--md-sys-color-primary-container,#e3f2fd)] flex items-center justify-center">
                    <svg className="w-6 h-6 text-[var(--md-sys-color-primary,#1976d2)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[var(--md-sys-color-on-surface-variant,#44474e)] uppercase font-bold tracking-wide">Teaching Faculty</p>
                    <p className="text-3xl font-bold text-[var(--md-sys-color-on-surface,#1a1c1e)] mt-1">{teachingStaff}</p>
                    <p className="text-xs text-green-600 mt-1 font-semibold">TRCN Compliant</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[var(--md-sys-color-on-surface-variant,#44474e)] uppercase font-bold tracking-wide">Admin & Support</p>
                    <p className="text-3xl font-bold text-[var(--md-sys-color-on-surface,#1a1c1e)] mt-1">{adminStaff}</p>
                    <p className="text-xs text-gray-600 mt-1">5 Departments</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[var(--md-sys-color-on-surface-variant,#44474e)] uppercase font-bold tracking-wide">On Leave</p>
                    <p className="text-3xl font-bold text-[var(--md-sys-color-on-surface,#1a1c1e)] mt-1">{onLeave}</p>
                    <p className="text-xs text-amber-600 mt-1 font-semibold">Cover Assigned</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-amber-50 flex items-center justify-center">
                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Grid: 8 cols for table, 4 cols for right rail */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              {/* Left: Staff Table (8 cols) */}
              <div className="xl:col-span-8">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                  {/* Search & Filter Bar */}
                  <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <div className="relative flex-1 w-full">
                        <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                          type="text"
                          placeholder="Search by name, ID, TRCN, phone..."
                          className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                      </div>
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <select className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 flex-1 sm:flex-none">
                          <option>All Departments</option>
                          <option>Science & STEM</option>
                          <option>Humanities & Arts</option>
                          <option>Mathematics</option>
                          <option>Languages</option>
                          <option>Administration</option>
                        </select>
                        <select className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 flex-1 sm:flex-none">
                          <option>All Types</option>
                          <option>Teaching</option>
                          <option>Administrative</option>
                          <option>Support</option>
                        </select>
                        <select className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 flex-1 sm:flex-none">
                          <option>All Sections</option>
                          <option>Early Years</option>
                          <option>Primary</option>
                          <option>JSS</option>
                          <option>SSS</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Quick Status Tabs */}
                  <div className="px-4 pt-3 pb-0 border-b border-gray-200 bg-white">
                    <div className="flex items-center gap-1 -mb-px">
                      {[
                        { label: 'All', count: 54 },
                        { label: 'Active On Duty', count: 52 },
                        { label: 'On Leave', count: 2 },
                      ].map((tab) => (
                        <button
                          key={tab.label}
                          onClick={() => setSelectedStatus(tab.label)}
                          className={`px-4 py-2.5 text-sm font-semibold transition-all border-b-2 ${
                            selectedStatus === tab.label
                              ? 'text-[var(--md-sys-color-primary,#1976d2)] border-[var(--md-sys-color-primary,#1976d2)]'
                              : 'text-gray-600 border-transparent hover:text-gray-900'
                          }`}
                        >
                          {tab.label} <span className="text-xs opacity-75">({tab.count})</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Staff Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-bold text-[var(--md-sys-color-on-surface-variant,#44474e)] uppercase tracking-wider">
                            Staff Member
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-bold text-[var(--md-sys-color-on-surface-variant,#44474e)] uppercase tracking-wider">
                            Role & Dept
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-bold text-[var(--md-sys-color-on-surface-variant,#44474e)] uppercase tracking-wider">
                            TRCN / License
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-bold text-[var(--md-sys-color-on-surface-variant,#44474e)] uppercase tracking-wider">
                            Contact
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-bold text-[var(--md-sys-color-on-surface-variant,#44474e)] uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-bold text-[var(--md-sys-color-on-surface-variant,#44474e)] uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {filteredStaff.map((staff) => (
                          <tr key={staff.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={staff.avatar}
                                  alt={staff.name}
                                  className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                  <p className="font-semibold text-[var(--md-sys-color-on-surface,#1a1c1e)]">{staff.name}</p>
                                  <p className="text-xs text-gray-500">{staff.id}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <p className="text-sm font-medium text-gray-900">{staff.role}</p>
                              <p className="text-xs text-gray-500">{staff.department}</p>
                            </td>
                            <td className="px-4 py-4">
                              <p className="text-sm font-medium text-gray-900">{staff.trcn}</p>
                              <p className="text-xs text-green-600 font-semibold">
                                {staff.trcn.startsWith('TRCN') ? 'MoE Verified' : staff.trcn.startsWith('ICAN') ? 'Professional' : 'Licensed RN'}
                              </p>
                            </td>
                            <td className="px-4 py-4">
                              <p className="text-sm text-gray-900">{staff.phone}</p>
                              <p className="text-xs text-gray-500">{staff.email}</p>
                            </td>
                            <td className="px-4 py-4">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                                staff.status === 'Active'
                                  ? 'bg-green-50 text-green-700'
                                  : 'bg-amber-50 text-amber-700'
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                  staff.status === 'Active' ? 'bg-green-600' : 'bg-amber-600'
                                }`}></span>
                                {staff.status}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-right">
                              <div className="flex items-center justify-end gap-3">
                                <button
                                  onClick={() => navigate(`/edit-staff/${staff.id}`)}
                                  className="p-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all"
                                  title="Edit staff details"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </button>
                                <button className="text-[var(--md-sys-color-primary,#1976d2)] hover:underline text-sm font-semibold">
                                  View
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination Footer */}
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                    <p className="text-sm text-[var(--md-sys-color-on-surface-variant,#44474e)]">
                      Showing <span className="font-semibold">{filteredStaff.length}</span> of <span className="font-semibold">{ALL_STAFF.length}</span> staff members
                      {selectedScope !== 'Whole School' && <span className="ml-1">in {selectedScope}</span>}
                    </p>
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 rounded-lg bg-white border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-all">
                        Previous
                      </button>
                      <button className="px-3 py-1.5 rounded-lg bg-[var(--md-sys-color-primary,#1976d2)] text-white text-sm font-semibold shadow-sm">
                        1
                      </button>
                      <button className="px-3 py-1.5 rounded-lg bg-white border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-all">
                        2
                      </button>
                      <button className="px-3 py-1.5 rounded-lg bg-white border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-all">
                        3
                      </button>
                      <button className="px-3 py-1.5 rounded-lg bg-white border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-all">
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Intelligence Panel (4 cols) */}
              <div className="xl:col-span-4 space-y-4">
                {/* TRCN Statutory Vetting Card */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-[var(--md-sys-color-on-surface,#1a1c1e)] uppercase tracking-wide">
                      TRCN Statutory Vetting
                    </h3>
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>

                  {/* Circular Gauge */}
                  <div className="flex items-center justify-center mb-4">
                    <div className="relative w-32 h-32">
                      <svg className="w-32 h-32 transform -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="#e5e7eb"
                          strokeWidth="8"
                          fill="none"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="#10b981"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray="351.86"
                          strokeDashoffset="35.19"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-[var(--md-sys-color-on-surface,#1a1c1e)]">90%</span>
                        <span className="text-xs text-gray-500">Compliant</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Valid Licenses</span>
                      <span className="font-semibold text-green-600">34/38</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Pending Renewal</span>
                      <span className="font-semibold text-amber-600">4</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">MoE Verified</span>
                      <span className="font-semibold text-blue-600">38/38</span>
                    </div>
                  </div>
                </div>

                {/* Staff Distribution Breakdown */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <h3 className="text-sm font-bold text-[var(--md-sys-color-on-surface,#1a1c1e)] uppercase tracking-wide mb-4">
                    Staff Distribution
                  </h3>

                  <div className="space-y-4">
                    {/* Teaching Faculty */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-700 font-medium">Teaching Faculty</span>
                        <span className="text-sm font-bold text-[var(--md-sys-color-on-surface,#1a1c1e)]">38</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '70%' }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">70% of total staff</p>
                    </div>

                    {/* Admin & Support */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-700 font-medium">Admin & Support</span>
                        <span className="text-sm font-bold text-[var(--md-sys-color-on-surface,#1a1c1e)]">16</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">30% of total staff</p>
                    </div>

                    {/* Section Breakdown */}
                    <div className="pt-3 border-t border-gray-200">
                      <p className="text-xs font-semibold text-gray-600 uppercase mb-2">By Section</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Early Years</span>
                          <span className="font-semibold">8</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Primary Basic</span>
                          <span className="font-semibold">12</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Junior Secondary</span>
                          <span className="font-semibold">9</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Senior Secondary</span>
                          <span className="font-semibold">9</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Cross-Section</span>
                          <span className="font-semibold">16</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Administrative Shortcuts */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-100">
                  <h3 className="text-sm font-bold text-[var(--md-sys-color-on-surface,#1a1c1e)] uppercase tracking-wide mb-3">
                    Quick Actions
                  </h3>

                  <div className="space-y-2">
                    <button
                      onClick={() => navigate('/add-staff')}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white hover:bg-blue-50 text-left transition-all border border-transparent hover:border-blue-200"
                    >
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span className="text-sm font-medium text-gray-900">Add New Staff</span>
                    </button>

                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white hover:bg-blue-50 text-left transition-all border border-transparent hover:border-blue-200">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-900">Export Full Report</span>
                    </button>

                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white hover:bg-blue-50 text-left transition-all border border-transparent hover:border-blue-200">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <span className="text-sm font-medium text-gray-900">Attendance Register</span>
                    </button>

                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white hover:bg-blue-50 text-left transition-all border border-transparent hover:border-blue-200">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-900">Compliance Check</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Compliance Footer */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-[var(--md-sys-color-on-surface,#1a1c1e)] mb-1">
                    Data Protection & Compliance Notice
                  </h4>
                  <p className="text-xs text-[var(--md-sys-color-on-surface-variant,#44474e)] leading-relaxed">
                    All staff personal data is collected, stored, and processed in accordance with the{' '}
                    <span className="font-semibold text-blue-600">Nigeria Data Protection Act 2023 (NDPA 2023)</span> and{' '}
                    <span className="font-semibold text-blue-600">Lagos State Ministry of Education</span> guidelines for educational institutions.
                    Staff members have consented to data processing for employment, payroll, regulatory compliance, and school operations.
                    Access to this directory is restricted to authorized school administrators only.
                  </p>
                  <div className="mt-2 flex items-center gap-4">
                    <a href="#" className="text-xs text-blue-600 hover:underline font-medium">
                      Privacy Policy
                    </a>
                    <a href="#" className="text-xs text-blue-600 hover:underline font-medium">
                      Data Subject Rights
                    </a>
                    <a href="#" className="text-xs text-blue-600 hover:underline font-medium">
                      NDPA 2023 Compliance
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
