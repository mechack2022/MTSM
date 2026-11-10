// ============================================================================
// EDIT/VIEW STAFF DOSSIER PAGE
// ============================================================================
// Comprehensive staff member profile and dossier management
// - 3-column layout (Personal Info, Academic Assignment, Credentials/Actions)
// - Editable personal information
// - Teaching schedule with workload meter
// - Statutory vetting and compliance
// - Administrative actions
// ============================================================================

import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditStaffPage() {
  const navigate = useNavigate()
  const { staffId } = useParams<{ staffId: string }>()
  const [staffManagementOpen, setStaffManagementOpen] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  // Sample staff data (would come from API in production)
  const staffData = {
    id: staffId || 'EMP-2024-089',
    fullName: 'Engr. Yusuf Bello',
    email: 'y.bello@school.ng',
    phone: '+234 803 456 7891',
    dateOfBirth: '1985-03-15',
    gender: 'Male',
    address: '45 Admiralty Way, Lekki Phase 1, Lagos',
    emergencyContact: '+234 803 456 7892',
    role: 'Senior Specialist',
    department: 'SSS Physics & STEM',
    trcn: 'LA/2018/8892',
    employmentDate: '2018-09-01',
    status: 'Active',
    photo: 'https://ui-avatars.com/api/?name=Yusuf+Bello&background=1976d2&color=fff&size=256',
  }

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
                    onClick={() => navigate('/staff-directory')}
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
          <div className="flex items-center gap-6 flex-1 min-w-0">
            <button
              onClick={() => navigate('/staff-directory')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-medium">Back to Directory</span>
            </button>
            <div className="hidden xl:flex items-center gap-2 text-sm text-gray-600">
              <span className="text-gray-900 font-semibold truncate">Staff Directory</span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">Edit Staff Dossier</span>
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
            {/* Page Header */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold text-[var(--md-sys-color-on-surface,#1a1c1e)]">
                      Staff Dossier: {staffData.fullName}
                    </h1>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                      {staffData.status}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--md-sys-color-on-surface-variant,#44474e)]">
                    Employee ID: {staffData.id} · {staffData.department}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--md-sys-color-primary,#1976d2)] hover:bg-blue-700 text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    {isEditing ? 'Save Changes' : 'Edit Dossier'}
                  </button>
                </div>
              </div>
            </div>

            {/* 3-Column Layout: Personal Info (4) + Academic Assignment (5) + Credentials/Actions (3) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Column 1: Personal Information (4 cols) */}
              <div className="lg:col-span-4 space-y-6">
                {/* Staff Photo Card */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-sm font-bold text-[var(--md-sys-color-on-surface,#1a1c1e)] uppercase tracking-wide mb-4">
                    Staff Photo
                  </h3>
                  <div className="flex flex-col items-center gap-4">
                    <img
                      src={staffData.photo}
                      alt={staffData.fullName}
                      className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
                    />
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-all">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      Upload New Photo
                    </button>
                  </div>
                </div>

                {/* Personal Information Card */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-sm font-bold text-[var(--md-sys-color-on-surface,#1a1c1e)] uppercase tracking-wide mb-4">
                    Personal Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-600 uppercase block mb-1">
                        Full Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          defaultValue={staffData.fullName}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-sm font-medium text-gray-900">{staffData.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-600 uppercase block mb-1">
                        Email Address
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          defaultValue={staffData.email}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-sm font-medium text-gray-900">{staffData.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-600 uppercase block mb-1">
                        Phone Number
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          defaultValue={staffData.phone}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-sm font-medium text-gray-900">{staffData.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-600 uppercase block mb-1">
                        Date of Birth
                      </label>
                      {isEditing ? (
                        <input
                          type="date"
                          defaultValue={staffData.dateOfBirth}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(staffData.dateOfBirth).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-600 uppercase block mb-1">
                        Gender
                      </label>
                      {isEditing ? (
                        <select
                          defaultValue={staffData.gender}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      ) : (
                        <p className="text-sm font-medium text-gray-900">{staffData.gender}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-600 uppercase block mb-1">
                        Home Address
                      </label>
                      {isEditing ? (
                        <textarea
                          defaultValue={staffData.address}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-sm font-medium text-gray-900">{staffData.address}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-600 uppercase block mb-1">
                        Emergency Contact
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          defaultValue={staffData.emergencyContact}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-sm font-medium text-gray-900">{staffData.emergencyContact}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 2: Academic Assignment & Teaching Schedule (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                {/* Employment Information */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-sm font-bold text-[var(--md-sys-color-on-surface,#1a1c1e)] uppercase tracking-wide mb-4">
                    Employment & Role
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-600 uppercase block mb-1">
                        Role / Position
                      </label>
                      <p className="text-sm font-medium text-gray-900">{staffData.role}</p>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-600 uppercase block mb-1">
                        Department
                      </label>
                      <p className="text-sm font-medium text-gray-900">{staffData.department}</p>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-600 uppercase block mb-1">
                        Employment Date
                      </label>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(staffData.employmentDate).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-600 uppercase block mb-1">
                        Years of Service
                      </label>
                      <p className="text-sm font-medium text-gray-900">6 years</p>
                    </div>
                  </div>
                </div>

                {/* Teaching Schedule & Workload */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-[var(--md-sys-color-on-surface,#1a1c1e)] uppercase tracking-wide">
                      Teaching Schedule & Workload
                    </h3>
                    <span className="text-xs font-semibold text-gray-600">Current Term</span>
                  </div>

                  {/* Workload Meter */}
                  <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">Weekly Workload</span>
                      <span className="text-lg font-bold text-blue-600">18/24 hours</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-blue-600 h-3 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">75% capacity · 6 hours available</p>
                  </div>

                  {/* Class Assignments */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-semibold text-gray-600 uppercase">Class Assignments</h4>

                    <div className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-all">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">SSS 3 Physics</span>
                        <span className="text-xs font-bold text-blue-600">6 hrs/week</span>
                      </div>
                      <p className="text-xs text-gray-600">Monday, Wednesday, Friday · 8:00 AM - 10:00 AM</p>
                    </div>

                    <div className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-all">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">SSS 2 Physics</span>
                        <span className="text-xs font-bold text-blue-600">5 hrs/week</span>
                      </div>
                      <p className="text-xs text-gray-600">Tuesday, Thursday · 10:30 AM - 1:00 PM</p>
                    </div>

                    <div className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-all">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">SSS 1 Intro to Engineering</span>
                        <span className="text-xs font-bold text-blue-600">4 hrs/week</span>
                      </div>
                      <p className="text-xs text-gray-600">Wednesday, Friday · 2:00 PM - 4:00 PM</p>
                    </div>

                    <div className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-all">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">STEM Club (Extra-curricular)</span>
                        <span className="text-xs font-bold text-purple-600">3 hrs/week</span>
                      </div>
                      <p className="text-xs text-gray-600">Thursday · 3:00 PM - 6:00 PM</p>
                    </div>
                  </div>

                  <button className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-all">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Modify Teaching Assignment
                  </button>
                </div>

                {/* Additional Responsibilities */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-sm font-bold text-[var(--md-sys-color-on-surface,#1a1c1e)] uppercase tracking-wide mb-4">
                    Additional Responsibilities
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-700">STEM Club Coordinator</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-700">Science Department Deputy HOD</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-700">Examination Oversight Committee</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 3: Credentials & Administrative Actions (3 cols) */}
              <div className="lg:col-span-3 space-y-6">
                {/* Statutory Vetting & Credentials */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <h3 className="text-sm font-bold text-[var(--md-sys-color-on-surface,#1a1c1e)] uppercase tracking-wide mb-4">
                    Statutory Vetting
                  </h3>

                  <div className="space-y-4">
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 mb-1">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span className="text-xs font-bold text-green-700 uppercase">TRCN Verified</span>
                      </div>
                      <p className="text-sm font-semibold text-gray-900 mb-0.5">{staffData.trcn}</p>
                      <p className="text-xs text-gray-600">Lagos State MoE Verified</p>
                      <p className="text-xs text-green-700 font-medium mt-1">Valid until Dec 2026</p>
                    </div>

                    <div className="space-y-2">
                      <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all">
                        <span className="text-xs font-medium text-gray-700">View TRCN Certificate</span>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>

                      <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all">
                        <span className="text-xs font-medium text-gray-700">View Police Clearance</span>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>

                      <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all">
                        <span className="text-xs font-medium text-gray-700">Medical Fitness Certificate</span>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Administrative Actions */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-100">
                  <h3 className="text-sm font-bold text-[var(--md-sys-color-on-surface,#1a1c1e)] uppercase tracking-wide mb-3">
                    Admin Actions
                  </h3>

                  <div className="space-y-2">
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white hover:bg-purple-50 text-left transition-all border border-transparent hover:border-purple-200">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-900">Reset Portal Password</span>
                    </button>

                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white hover:bg-purple-50 text-left transition-all border border-transparent hover:border-purple-200">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                      </svg>
                      <span className="text-sm font-medium text-gray-900">Re-issue Staff ID Badge</span>
                    </button>

                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white hover:bg-amber-50 text-left transition-all border border-transparent hover:border-amber-200">
                      <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-900">Mark On Leave</span>
                    </button>

                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white hover:bg-red-50 text-left transition-all border border-transparent hover:border-red-200">
                      <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                      </svg>
                      <span className="text-sm font-medium text-gray-900">Deactivate Account</span>
                    </button>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <h3 className="text-sm font-bold text-[var(--md-sys-color-on-surface,#1a1c1e)] uppercase tracking-wide mb-4">
                    Quick Stats
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">Attendance Rate</span>
                        <span className="text-sm font-bold text-green-600">98.5%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '98.5%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">Lesson Plans (Current Term)</span>
                        <span className="text-sm font-bold text-blue-600">24/24</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-gray-200">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Leave Days Remaining</span>
                        <span className="font-bold text-gray-900">18 days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Log */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-sm font-bold text-[var(--md-sys-color-on-surface,#1a1c1e)] uppercase tracking-wide mb-4">
                Recent Activity Log
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      <span className="font-semibold">Lesson plan submitted</span> for SSS 3 Physics (Week 8)
                    </p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all">
                  <div className="w-2 h-2 rounded-full bg-green-600 mt-1.5"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      <span className="font-semibold">Attendance marked</span> for all assigned classes
                    </p>
                    <p className="text-xs text-gray-500">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all">
                  <div className="w-2 h-2 rounded-full bg-purple-600 mt-1.5"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      <span className="font-semibold">Grade submissions</span> completed for SSS 2 Mid-term Assessment
                    </p>
                    <p className="text-xs text-gray-500">Yesterday at 4:32 PM</p>
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
