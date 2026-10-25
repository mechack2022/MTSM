// ============================================================================
// SCHOOL ADMIN DASHBOARD
// ============================================================================
// Dashboard for School Administrator/Registrar at campus level
// Manages staff, operations, facilities, and daily school activities

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SchoolAdminDashboard() {
  const navigate = useNavigate()

  // Sample data
  const stats = {
    totalStaff: 48,
    activeStaff: 42,
    onLeave: 4,
    pending: 2,
    attendanceRate: 96,
    checkedIn: 44,
    late: 2,
    absent: 2,
    teachingCoverage: 100,
    openTickets: 3
  }

  const recentOnboarding = [
    {
      id: '1',
      name: 'Mr. Chidiebere Eze',
      email: 'c.eze@crownjewel.sch.ng',
      initials: 'CE',
      role: 'Physics & ICT Lead',
      department: 'Senior Secondary (SS1 - SS3)',
      status: 'Active',
      statusColor: 'bg-teal-100 text-teal-700',
      verification: 'Verified #TRCN-9821',
      verified: true
    },
    {
      id: '2',
      name: 'Mrs. Amina Oladipo',
      email: 'a.oladipo@crownjewel.sch.ng',
      initials: 'AO',
      role: 'French Language Tutor',
      department: 'Junior Secondary (JSS 1 - JSS 3)',
      status: 'Contract Signed',
      statusColor: 'bg-blue-100 text-blue-700',
      verification: 'Security Vetting Clear',
      verified: false
    },
    {
      id: '3',
      name: 'Mr. Tunde Ogunsanya',
      email: 't.ogunsanya@crownjewel.sch.ng',
      initials: 'TO',
      role: 'Lab Technologist (Biology)',
      department: 'Academic Support Facilities',
      status: 'Verification Pending',
      statusColor: 'bg-amber-100 text-amber-700',
      verification: 'WAEC / Degree Awaiting',
      verified: false
    }
  ]

  const todaysSchedule = [
    {
      time: '09:15 - 10:00 AM',
      class: 'JSS 2A • Quadratic Expr.',
      teacher: 'Mr. S. Alabi',
      room: 'Room B-104 (32 Students)',
      status: 'completed',
      statusLabel: 'Completed'
    },
    {
      time: '11:30 - 12:15 PM',
      class: 'JSS 2B • Plane Geometry',
      teacher: 'Mr. S. Alabi',
      room: 'Room B-106 (34 Students)',
      status: 'in-progress',
      statusLabel: 'In Progress'
    },
    {
      time: '01:45 - 02:30 PM',
      class: 'JSS 2C • Remedial Clinic',
      teacher: 'Mr. S. Alabi',
      room: 'Math Lab East (14 Students)',
      status: 'upcoming',
      statusLabel: 'Upcoming'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-white shadow-sm z-50 flex flex-col justify-between">
        <div className="flex flex-col flex-1 min-h-0">
          {/* School Header */}
          <div className="p-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm flex-shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
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
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-600 text-white font-semibold text-sm shadow-sm transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
              </svg>
              <span>Dashboard</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all font-medium text-sm text-left">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
              </svg>
              <span>Staff Directory & Records</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all font-medium text-sm text-left">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              <span>Staff Onboarding & Recruitment</span>
            </button>
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
      <div className="ml-72 flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 right-0 h-16 bg-white/90 backdrop-blur-md shadow-sm z-40 pl-4 pr-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6 flex-1 min-w-0 max-w-2xl">
            <div className="hidden xl:flex items-center gap-2 text-xs text-gray-600">
              <span className="text-gray-900 font-semibold truncate">Crown Jewel High School - Lekki</span>
              <span className="text-gray-400">/</span>
              <span>Registrar Portal</span>
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-[11px] font-bold">
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
        <main className="w-full pl-4 pr-6 py-6 bg-gray-50 min-h-screen">
          <div className="flex flex-col w-full pb-12">
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-bold uppercase text-blue-600 tracking-widest bg-blue-50 px-2.5 py-0.5 rounded-full">
                    Lekki Campus • Operations Console
                  </span>
                  <span className="text-[11px] font-bold text-gray-500">• Academic Year 2024/2025</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Good morning, Mrs. Balogun 👋</h1>
                <p className="text-sm text-gray-600 mt-0.5">
                  Here is your school operational overview for Wednesday, 24 October 2025 • Term 1, Week 6
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => navigate('/staff-onboarding')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  <span>+ Onboard New Staff</span>
                </button>
                <button className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-white hover:bg-gray-50 text-gray-900 text-sm font-semibold shadow-sm transition-all border border-gray-200">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Assign Class Schedule</span>
                </button>
                <button className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-white hover:bg-gray-50 text-gray-900 text-sm font-semibold shadow-sm transition-all border border-gray-200">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  </svg>
                  <span>Log Incident / Maintenance</span>
                </button>
                <button className="inline-flex items-center gap-1 px-3 py-2.5 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-100 text-xs font-semibold transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Export Staff Roll</span>
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
              {/* Total Staff */}
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase text-gray-500 tracking-wider">Total Roster</span>
                  <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-bold text-gray-900 leading-none">{stats.totalStaff}</span>
                  <span className="text-xs font-semibold text-teal-600">Teaching & Non-Teaching</span>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-gray-100 text-xs text-gray-600">
                  <span className="inline-flex items-center gap-1 text-teal-600 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>{stats.activeStaff} Active
                  </span>
                  <span className="text-gray-400">•</span>
                  <span>{stats.onLeave} on leave</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-amber-600">{stats.pending} pending</span>
                </div>
              </div>

              {/* Staff Attendance */}
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase text-gray-500 tracking-wider">Staff Attendance Today</span>
                  <div className="w-9 h-9 rounded-lg bg-teal-100 flex items-center justify-center text-teal-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-bold text-gray-900 leading-none">{stats.attendanceRate}%</span>
                  <span className="text-xs font-semibold bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">Present</span>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-gray-100 text-xs text-gray-600">
                  <span className="text-gray-900 font-medium">{stats.checkedIn} checked in</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-amber-600 font-medium">{stats.late} late</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-red-600 font-medium">{stats.absent} absent</span>
                </div>
              </div>

              {/* Teaching Coverage */}
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase text-gray-500 tracking-wider">Teaching Coverage</span>
                  <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-blue-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-bold text-gray-900 leading-none">{stats.teachingCoverage}%</span>
                  <span className="text-xs font-semibold text-teal-600">Fully Staffed</span>
                </div>
                <div className="flex items-center gap-1.5 pt-2 border-t border-gray-100 text-xs text-gray-600">
                  <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>All 24 classroom periods staffed today</span>
                </div>
              </div>

              {/* Facilities */}
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase text-gray-500 tracking-wider">Facilities & Tickets</span>
                  <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-bold text-gray-900 leading-none">{stats.openTickets}</span>
                  <span className="text-xs font-semibold text-amber-600">Open Requests</span>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-gray-100 text-xs text-gray-600">
                  <span className="text-amber-600 font-semibold">1 electrical</span>
                  <span className="text-gray-400">•</span>
                  <span>2 lab maintenance</span>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column - 8/12 */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                {/* Recent Staff Onboarding */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-base font-bold text-gray-900">Recent Staff Onboarding & Verifications</h2>
                        <p className="text-xs text-gray-600">3 recruits currently advancing through credential verification & induction</p>
                      </div>
                    </div>
                    <a href="#" className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
                      <span>View All Records</span>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>

                  {/* Staff Table */}
                  <div className="overflow-x-auto mt-3">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50 text-gray-600 text-[11px] font-bold uppercase tracking-wider">
                          <th className="py-2.5 px-3 rounded-l-lg">Staff Member</th>
                          <th className="py-2.5 px-3">Role / Department</th>
                          <th className="py-2.5 px-3">Status</th>
                          <th className="py-2.5 px-3">TRCN / Dossier</th>
                          <th className="py-2.5 px-3 rounded-r-lg text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-sm">
                        {recentOnboarding.map(staff => (
                          <tr key={staff.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="py-3 px-3">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center font-bold text-blue-600 flex-shrink-0 text-xs">
                                  {staff.initials}
                                </div>
                                <div className="flex flex-col min-w-0">
                                  <span className="text-sm font-semibold text-gray-900 truncate">{staff.name}</span>
                                  <span className="text-xs text-gray-600 truncate">{staff.email}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-3 text-gray-900">
                              <div className="flex flex-col">
                                <span className="font-medium text-sm">{staff.role}</span>
                                <span className="text-xs text-gray-600">{staff.department}</span>
                              </div>
                            </td>
                            <td className="py-3 px-3">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${staff.statusColor} text-[11px] font-bold`}>
                                <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                                {staff.status}
                              </span>
                            </td>
                            <td className="py-3 px-3">
                              <div className={`flex items-center gap-1.5 text-[11px] font-bold ${staff.verified ? 'text-teal-600' : 'text-gray-600'}`}>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  {staff.verified ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  )}
                                </svg>
                                <span>{staff.verification}</span>
                              </div>
                            </td>
                            <td className="py-3 px-3 text-right">
                              <button className={`px-3 py-1.5 rounded-lg ${staff.verified ? 'bg-gray-100 hover:bg-gray-200 text-blue-600' : 'bg-blue-600 text-white hover:bg-blue-700'} text-xs font-semibold transition-all`}>
                                {staff.verified ? 'View Dossier' : 'Complete Setup'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Today's Schedule */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center text-teal-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-base font-bold text-gray-900">Today's Teaching Schedule & Reliever Notice</h2>
                        <p className="text-xs text-gray-600">Live timetable staffing adjustments and substitute cover assignments</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-900 text-[11px] font-bold">
                      <svg className="w-3.5 h-3.5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Period 4 of 8 Active
                    </span>
                  </div>

                  {/* Alert Banner */}
                  <div className="mt-4 p-6 rounded-xl bg-gray-50 border-l-4 border-blue-600 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-gray-900">Maternity Relief Allocation Confirmed</span>
                          <span className="text-[11px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded">JSS 2 Mathematics</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-0.5">
                          <strong className="text-gray-900 font-semibold">Mrs. K. Adeleke</strong> is currently on approved maternity leave.
                          All scheduled classroom periods are officially reassigned to <strong className="text-gray-900 font-semibold">Mr. S. Alabi</strong> (B.Ed Math, UNILAG) through Term 1.
                        </p>
                      </div>
                    </div>
                    <button className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-gray-100 text-gray-900 text-xs font-semibold shadow-xs flex-shrink-0">
                      Timetable Details
                    </button>
                  </div>

                  {/* Schedule Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                    {todaysSchedule.map((period, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg flex flex-col justify-between ${
                          period.status === 'in-progress'
                            ? 'bg-blue-50 ring-1 ring-blue-200'
                            : 'bg-gray-100'
                        }`}
                      >
                        <div>
                          <div className={`flex items-center justify-between text-[11px] font-bold uppercase ${
                            period.status === 'in-progress' ? 'text-blue-600' : 'text-gray-600'
                          }`}>
                            <span>{period.time}</span>
                            <span className={period.status === 'completed' ? 'text-teal-600' : ''}>
                              {period.status === 'in-progress' && (
                                <span className="flex items-center gap-1">
                                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                                  {period.statusLabel}
                                </span>
                              )}
                              {period.status !== 'in-progress' && period.statusLabel}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-gray-900 mt-1">{period.class}</h4>
                          <p className="text-xs text-gray-600">Reliever: {period.teacher}</p>
                        </div>
                        <div className={`mt-2 text-gray-600 text-[11px] flex items-center gap-1 ${
                          period.status === 'in-progress' ? 'text-gray-900' : ''
                        }`}>
                          <svg className={`w-3.5 h-3.5 ${period.status === 'completed' ? 'text-teal-500' : period.status === 'in-progress' ? 'text-blue-600' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {period.status === 'completed' && (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            )}
                            {period.status === 'in-progress' && (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                            )}
                            {period.status === 'upcoming' && (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            )}
                          </svg>
                          {period.room}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - 4/12 */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                {/* Campus Operations */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <h2 className="text-base font-bold text-gray-900">Campus Operations</h2>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" title="Systems Nominal"></span>
                  </div>
                  <div className="flex flex-col gap-3 mt-4">
                    {/* Generator */}
                    <div className="p-3 rounded-xl bg-gray-50 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <span className="text-sm font-bold text-gray-900">Generator 500kVA</span>
                        </div>
                        <span className="text-[11px] font-bold text-blue-600">85% Diesel</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>Primary Lekki grid offline</span>
                        <span className="text-gray-900 font-medium">Backup Active</span>
                      </div>
                    </div>

                    {/* Water Treatment */}
                    <div className="p-3 rounded-xl bg-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-teal-100 flex items-center justify-center text-teal-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                          </svg>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-gray-900">Water Treatment Plant</span>
                          <span className="text-xs text-gray-600">Tanks 1 & 2 Filtration Normal</span>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-700 text-[11px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span> Optimal
                      </span>
                    </div>

                    {/* Science Lab */}
                    <div className="p-3 rounded-xl bg-gray-50 flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-gray-900 truncate">Science Lab 2 Audit</span>
                          <span className="text-[11px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded ml-2">Today 2:00 PM</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          Gas burner nozzles safety audit and fume hood ventilation check by Facilities Engineer.
                        </p>
                      </div>
                    </div>

                    {/* Infirmary */}
                    <div className="p-3 rounded-xl bg-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-gray-200 flex items-center justify-center text-gray-700">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-gray-900">School Infirmary</span>
                          <span className="text-xs text-gray-600">Nurse Nwachukwu on duty</span>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-teal-600">2 visits logged</span>
                    </div>
                  </div>
                </div>

                {/* Quick Shortcuts */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <h2 className="text-base font-bold text-gray-900">Quick Shortcuts</h2>
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Fast Access</span>
                  </div>
                  <div className="flex flex-col gap-2 mt-3">
                    <a href="#" className="group p-3 rounded-xl bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white group-hover:bg-blue-600 group-hover:text-white text-blue-600 flex items-center justify-center transition-colors shadow-xs">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-gray-900">Download Duty Roster</span>
                          <span className="text-xs text-gray-600">Break & Gate Supervision • Week 6</span>
                        </div>
                      </div>
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                    <a href="#" className="group p-3 rounded-xl bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white group-hover:bg-blue-600 group-hover:text-white text-blue-600 flex items-center justify-center transition-colors shadow-xs">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-gray-900">View Teacher Timetables</span>
                          <span className="text-xs text-gray-600">Master period matrix for all arms</span>
                        </div>
                      </div>
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                    <a href="#" className="group p-3 rounded-xl bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white group-hover:bg-amber-600 group-hover:text-white text-amber-600 flex items-center justify-center transition-colors shadow-xs">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-gray-900">Staff Leave Requests</span>
                            <span className="text-[11px] font-bold bg-amber-100 text-amber-700 px-1.5 py-0.2 rounded">2 pending</span>
                          </div>
                          <span className="text-xs text-gray-600">Requires Registrar approval</span>
                        </div>
                      </div>
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Sync Status */}
                <div className="p-6 rounded-xl bg-blue-600 text-white flex flex-col justify-between shadow-md relative overflow-hidden">
                  <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10 pointer-events-none"></div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase text-blue-100 tracking-wider">Lekki Campus Sync Node</span>
                    <svg className="w-4 h-4 text-blue-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <p className="text-sm text-blue-50 leading-snug">
                    All biometrics from Gate 1 and staff punch terminals have synced with the CJET central cloud repository.
                  </p>
                  <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs text-blue-100">
                    <span>Last sync: 10:48 AM</span>
                    <span className="font-bold text-white">Latency: 24ms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Offline Ready Badge */}
        <div className="fixed bottom-6 right-6 z-30 pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full shadow-lg">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
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
