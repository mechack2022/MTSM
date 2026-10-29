import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth, useCurrentContext } from '@/store'
import { useLogout } from '@/hooks'

// Role-based dashboard components
import SuperAdminDashboard from '@/components/dashboards/SuperAdminDashboard'
import TenantAdminDashboard from '@/components/dashboards/TenantAdminDashboard'
import SchoolAdminDashboard from '@/pages/school-admin-dashboard'
import HeadTeacherDashboard from '@/components/dashboards/HeadTeacherDashboard'
import PrincipalDashboard from '@/components/dashboards/PrincipalDashboard'
import TeacherDashboard from '@/components/dashboards/TeacherDashboard'
import ClassTeacherDashboard from '@/components/dashboards/ClassTeacherDashboard'

export default function DashboardPage() {
  const location = useLocation()
  const { user } = useAuth()
  const { selectedSchool } = useCurrentContext()
  const logout = useLogout()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogout = () => {
    logout.mutate()
  }

  // Determine which dashboard to show based on role
  const renderDashboard = () => {
    const roleName = user?.roleName?.toUpperCase()

    switch (roleName) {
      case 'SUPER_ADMIN':
        return <SuperAdminDashboard />
      case 'TENANT_ADMIN':
        return <TenantAdminDashboard />
      case 'SCHOOL_ADMIN':
        return <SchoolAdminDashboard />
      case 'HEAD_TEACHER':
        return <HeadTeacherDashboard />
      case 'PRINCIPAL':
        return <PrincipalDashboard />
      case 'TEACHER':
        return <TeacherDashboard />
      case 'CLASS_TEACHER':
        return <ClassTeacherDashboard />
      default:
        return <SuperAdminDashboard /> // Default fallback to SuperAdmin for demo
    }
  }

  // School admin has its own layout, render it directly
  if (user?.roleName?.toUpperCase() === 'SCHOOL_ADMIN') {
    return <SchoolAdminDashboard />
  }

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Left: Logo & Menu Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ACE EDUManage</h1>
                {selectedSchool && (
                  <p className="text-xs text-gray-600">{selectedSchool.name}</p>
                )}
              </div>
            </div>
          </div>

          {/* Right: User Menu */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Settings */}
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.fullName}</p>
                <p className="text-xs text-gray-600">{user?.roleName || user?.username}</p>
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {user?.fullName?.charAt(0) || 'U'}
                </span>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'w-72' : 'w-0'
          } ${
            user?.roleName?.toUpperCase() === 'HEAD_TEACHER' || user?.roleName?.toUpperCase() === 'PRINCIPAL' || user?.roleName?.toUpperCase() === 'TEACHER' || user?.roleName?.toUpperCase() === 'CLASS_TEACHER'
              ? 'bg-surface-container-lowest'
              : 'bg-slate-900 text-white'
          } transition-all duration-300 overflow-hidden flex-shrink-0 shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex flex-col justify-between`}
        >
          {/* Academic Class Menu Sidebar (Class Teacher / Homeroom Tutor) */}
          {user?.roleName?.toUpperCase() === 'CLASS_TEACHER' ? (
            <>
              <div className="flex flex-col">
                {/* Header with Logo and Version */}
                <div className="h-16 px-4 flex items-center justify-between bg-surface-container-low">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm">
                      <span className="material-symbols-outlined text-[20px]">door_front</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-primary leading-tight">EduManage</span>
                      <span className="text-[10px] text-on-surface-variant uppercase tracking-wider">Homeroom Portal</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-surface-container-highest text-[11px] text-on-surface-variant">v4.2</span>
                </div>

                {/* Section Label */}
                <div className="px-4 py-2">
                  <div className="px-2 py-1 text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">Academic Class Menu</div>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-1 px-4">
                  <Link
                    to="/dashboard"
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm ${
                      isActive('/dashboard')
                        ? 'bg-primary text-on-primary font-semibold shadow-sm'
                        : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">dashboard</span>
                    <span>Homeroom Overview</span>
                  </Link>
                  <a className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface text-sm transition-colors" href="#">
                    <span className="material-symbols-outlined text-[20px]">diversity_3</span>
                    <span>My Class Roster</span>
                  </a>
                  <a className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface text-sm transition-colors" href="#">
                    <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
                    <span>Daily Roll Call</span>
                  </a>
                  <a className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface text-sm transition-colors" href="#">
                    <span className="material-symbols-outlined text-[20px]">folder_supervised</span>
                    <span>Pastoral Care Notes</span>
                  </a>
                  <a className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface text-sm transition-colors" href="#">
                    <span className="material-symbols-outlined text-[20px]">assignment</span>
                    <span>Subject CA Tracking</span>
                  </a>
                  <a className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface text-sm transition-colors" href="#">
                    <span className="material-symbols-outlined text-[20px]">menu_book</span>
                    <span>NERDC Scheme Monitor</span>
                  </a>
                  <a className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface text-sm transition-colors" href="#">
                    <span className="material-symbols-outlined text-[20px]">emoji_events</span>
                    <span>Class Achievements</span>
                  </a>
                  <a className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface text-sm transition-colors" href="#">
                    <span className="material-symbols-outlined text-[20px]">groups</span>
                    <span>Parent Communication</span>
                  </a>
                  <a className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface text-sm transition-colors" href="#">
                    <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
                    <span>QR Dismissal Gate</span>
                  </a>
                </nav>
              </div>

              {/* Footer */}
              <div className="p-4 flex flex-col gap-2 bg-surface-container-lowest">
                <div className="p-2 rounded-xl bg-surface-container-low flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></div>
                    <div className="flex flex-col">
                      <span className="text-[11px] text-on-surface font-medium">LAG-NODE-03</span>
                      <span className="text-[10px] text-on-surface-variant">Homeroom Sync</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                </div>
                <div className="flex items-center justify-between px-1 text-on-surface-variant">
                  <span className="text-[10px]">EduManage NG v4.2.1</span>
                  <span className="text-[10px]">TRCN Certified</span>
                </div>
              </div>
            </>
          ) : user?.roleName?.toUpperCase() === 'HEAD_TEACHER' || user?.roleName?.toUpperCase() === 'PRINCIPAL' || user?.roleName?.toUpperCase() === 'TEACHER' ? (
            /* Academic Leadership Sidebar (Head Teacher, Principal & Subject Teacher) */
            <>
              <div className="flex flex-col">
                {/* Header with Logo and Version */}
                <div className="h-16 px-4 flex items-center justify-between bg-surface-container-low">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm">
                      <span className="material-symbols-outlined text-[20px]">school</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-primary leading-tight">EduManage</span>
                      <span className="text-[10px] text-on-surface-variant uppercase tracking-wider">Nigeria Portal</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-surface-container-highest text-[11px] text-on-surface-variant">v4.2</span>
                </div>

                {/* Section Label */}
                <div className="px-4 py-2">
                  <div className="px-2 py-1 text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">Academic Leadership</div>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-1 px-4">
                  <Link
                    to="/dashboard"
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm ${
                      isActive('/dashboard')
                        ? 'bg-primary text-on-primary font-semibold shadow-sm'
                        : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">dashboard</span>
                    <span>Overview</span>
                  </Link>
                  <a className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface text-sm transition-colors" href="#">
                    <span className="material-symbols-outlined text-[20px]">meeting_room</span>
                    <span>Classes & Streams</span>
                  </a>
                  <a className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface text-sm transition-colors" href="#">
                    <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
                    <span>Attendance Register</span>
                  </a>
                  <a className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface text-sm transition-colors" href="#">
                    <span className="material-symbols-outlined text-[20px]">assignment_turned_in</span>
                    <span>CA & Gradebook</span>
                  </a>
                  <a className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface text-sm transition-colors" href="#">
                    <span className="material-symbols-outlined text-[20px]">menu_book</span>
                    <span>Lesson Plans & NERDC</span>
                  </a>
                  <a className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface text-sm transition-colors" href="#">
                    <span className="material-symbols-outlined text-[20px]">group</span>
                    <span>Student Records</span>
                  </a>
                  <a className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface text-sm transition-colors" href="#">
                    <span className="material-symbols-outlined text-[20px]">summarize</span>
                    <span>Termly Broadsheet</span>
                  </a>
                  <a className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface text-sm transition-colors" href="#">
                    <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                    <span>Timetable & Relief</span>
                  </a>
                </nav>
              </div>

              {/* Footer */}
              <div className="p-4 flex flex-col gap-2 bg-surface-container-lowest">
                <div className="p-2 rounded-xl bg-surface-container-low flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></div>
                    <div className="flex flex-col">
                      <span className="text-[11px] text-on-surface font-medium">LAG-NODE-03</span>
                      <span className="text-[10px] text-on-surface-variant">Local Gateway Sync</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                </div>
                <div className="flex items-center justify-between px-1 text-on-surface-variant">
                  <span className="text-[10px]">EduManage NG v4.2.1</span>
                  <span className="text-[10px]">WAEC/NECO Ready</span>
                </div>
              </div>
            </>
          ) : (
            // Regular sidebar for other roles
            <nav className="p-4 space-y-1">
            {/* SuperAdmin Menu */}
            {user?.roleName?.toUpperCase() === 'SUPER_ADMIN' && (
              <>
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
                    Federal Operations
                  </p>
                  <Link
                    to="/dashboard"
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive('/dashboard')
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-slate-800'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span className="font-medium">Core Infrastructure</span>
                  </Link>

                  <Link
                    to="/dashboard"
                    className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive('/dashboard')
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span className="font-medium">Tenants & Orgs</span>
                    </div>
                    <span className="px-2 py-0.5 bg-teal-500 text-white text-xs font-bold rounded">1,248</span>
                  </Link>

                  <Link
                    to="/schools"
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive('/schools')
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-slate-800'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span className="font-medium">Schools & Campuses</span>
                  </Link>

                  <Link
                    to="/dashboard"
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-gray-300 hover:bg-slate-800`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">Multi-Region Nodes</span>
                  </Link>

                  <Link
                    to="/dashboard"
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-gray-300 hover:bg-slate-800`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="font-medium">NDPA Compliance</span>
                  </Link>

                  <Link
                    to="/dashboard"
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-gray-300 hover:bg-slate-800`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="font-medium">Billing & Quotas</span>
                  </Link>

                  <Link
                    to="/dashboard"
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-gray-300 hover:bg-slate-800`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    <span className="font-medium">System Audit Logs</span>
                  </Link>
                </div>
              </>
            )}

            {/* Regular Admin Menu */}
            {user?.roleName?.toUpperCase() !== 'SUPER_ADMIN' && (
              <>
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
                  Core Administration
                </p>
              <Link
                to="/dashboard"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive('/dashboard')
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-slate-800'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="font-medium">Overview & Metrics</span>
              </Link>

              {user?.isPlatformAdmin && (
                <Link
                  to="/tenants"
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive('/tenants')
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-slate-800'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="font-medium">Tenants</span>
                </Link>
              )}

              <Link
                to="/schools"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive('/schools')
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-slate-800'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="font-medium">Schools</span>
              </Link>

              {!user?.isPlatformAdmin && (
                <Link
                  to="/code-sets"
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive('/code-sets')
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-slate-800'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  <span className="font-medium">CodeSets</span>
                </Link>
              )}
            </div>

            {/* Curriculum & Learning */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
                Curriculum & Learning
              </p>
              <Link
                to="/classes"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive('/classes')
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-slate-800'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span className="font-medium">Classes & Streams</span>
              </Link>

              <Link
                to="/learners"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive('/learners')
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-slate-800'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span className="font-medium">Learners</span>
              </Link>

              <Link
                to="/attendance"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive('/attendance')
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-slate-800'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <span className="font-medium">Daily Attendance</span>
              </Link>
            </div>

            {/* Finance & Development */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
                Finance & Development
              </p>
              <Link
                to="/reports"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive('/reports')
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-slate-800'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="font-medium">Reports</span>
              </Link>
            </div>
            </>
            )}
          </nav>
          )}
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            {renderDashboard()}
          </div>
        </main>
      </div>
    </div>
  )
}
