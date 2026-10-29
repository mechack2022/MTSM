// ============================================================================
// EMPLOYMENT & ASSIGNMENTS PAGE
// ============================================================================
// Staff employment contracts, teaching assignments, and workload management
// - Contract management and positions
// - Homeroom class assignments
// - Subject allocations
// - Weekly teaching period workloads
// - Compliance standards and ratios
// ============================================================================

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AddTeachingAssignmentModal from '@/components/modals/AddTeachingAssignmentModal'
import EditAllocationModal from '@/components/modals/EditAllocationModal'
import ViewScheduleModal from '@/components/modals/ViewScheduleModal'
import ViewHomeroomModal from '@/components/modals/ViewHomeroomModal'
import ReviewDossierModal from '@/components/modals/ReviewDossierModal'
import ConfirmRosterModal from '@/components/modals/ConfirmRosterModal'

export default function EmploymentAssignmentsPage() {
  const navigate = useNavigate()
  const [selectedScope, setSelectedScope] = useState('Whole School')
  const [staffManagementOpen, setStaffManagementOpen] = useState(true)
  const [isAddAssignmentModalOpen, setIsAddAssignmentModalOpen] = useState(false)
  const [isEditAllocationModalOpen, setIsEditAllocationModalOpen] = useState(false)
  const [isViewScheduleModalOpen, setIsViewScheduleModalOpen] = useState(false)
  const [isViewHomeroomModalOpen, setIsViewHomeroomModalOpen] = useState(false)
  const [isReviewDossierModalOpen, setIsReviewDossierModalOpen] = useState(false)
  const [isConfirmRosterModalOpen, setIsConfirmRosterModalOpen] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState<any>(null)

  // Sample staff assignments data
  const staffAssignments = [
    {
      id: 'EMP-2024-089',
      name: 'Engr. Yusuf Bello',
      avatar: 'https://ui-avatars.com/api/?name=Yusuf+Bello&background=1976d2&color=fff&size=128',
      status: 'Confirmed',
      trcn: 'LA/2018/8892',
      role: 'Senior Physics Specialist · SSS Section',
      location: 'Science Lab B',
      employmentType: 'Full-time Tenured',
      periodsPerWeek: 16,
      workloadStatus: 'Standard Load',
      assignments: [
        { class: 'SSS 1', subject: 'Physics', periods: 4 },
        { class: 'SSS 2', subject: 'Physics', periods: 6 },
        { class: 'SSS 3 WAEC Prep', subject: 'Physics Masterclass', periods: 6, special: true },
      ],
    },
    {
      id: 'EMP-2024-142',
      name: 'Mrs. Patience E. Okon',
      avatar: 'https://ui-avatars.com/api/?name=Patience+Okon&background=4caf50&color=fff&size=128',
      status: 'Class Tutor',
      trcn: 'LA/2015/4102',
      role: 'Lead Homeroom Teacher · Primary Basic 4 Emerald',
      assistant: 'Miss Grace Danjuma',
      employmentType: 'Full-time Regular',
      periodsPerWeek: 18,
      workloadStatus: 'Optimal Load',
      assignments: [
        { class: 'Basic 4 Emerald', subject: 'Numeracy & Mental Math', periods: 6 },
        { class: 'Basic 4 Emerald', subject: 'Literacy & Phonics', periods: 6 },
        { class: 'Basic 4 Emerald', subject: 'Basic Science & Tech', periods: 6 },
      ],
    },
    {
      id: 'EMP-2025-NEW',
      name: 'Mr. Babatunde Lawal',
      initials: 'BL',
      status: 'Pending Sign-off',
      role: 'Homeroom Tutor Appointee · Primary Basic 4 Gold',
      employmentType: 'Effective Term 1',
      periodsPerWeek: 18,
      workloadStatus: 'Unconfirmed',
      pending: 'Awaiting School Head Signature',
      assignments: [
        { class: 'Basic 4 Gold', subject: 'Primary Integrated Curricula', periods: 18 },
      ],
    },
  ]

  return (
    <div className="min-h-screen flex bg-[var(--md-sys-color-surface,#faf8ff)]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-[var(--md-sys-color-surface-container-lowest,#ffffff)] shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between">
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Header */}
          <div className="h-16 px-6 flex items-center gap-3 bg-[var(--md-sys-color-surface-container-lowest,#ffffff)]">
            <div className="w-9 h-9 rounded-lg bg-[var(--md-sys-color-primary,#1976d2)] flex items-center justify-center text-white shadow-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[var(--md-sys-color-on-surface,#1a1c1e)] leading-tight">EduManage</span>
              <span className="text-[10px] text-[var(--md-sys-color-primary,#1976d2)] uppercase font-bold tracking-wider">Nigeria Portal</span>
            </div>
          </div>

          {/* School Context */}
          <div className="px-4 py-2">
            <div className="p-2 rounded-lg bg-[var(--md-sys-color-surface-container-low,#f5f5f5)] flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-900 truncate">Crown Jewel High</p>
                <p className="text-[11px] text-gray-600 truncate">Lekki Campus · Lagos</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-2 space-y-1">
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
                    onClick={() => navigate('/staff-directory')}
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
                    onClick={() => navigate('/staff-onboarding')}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all font-medium text-sm text-left"
                  >
                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Staff Onboarding</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[var(--md-sys-color-primary-container,#e3f2fd)] text-[var(--md-sys-color-on-primary-container,#1565c0)] transition-all font-semibold text-sm text-left shadow-sm">
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

            <div className="pt-2">
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all font-medium text-sm text-left">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>Facilities & Operations</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all font-medium text-sm text-left">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Settings</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[var(--md-sys-color-surface-container-low,#f5f5f5)]">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-white shadow-sm">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] uppercase text-gray-600 font-bold">Regulatory Compliance</p>
              <p className="text-xs text-gray-900 font-medium truncate">Lagos State MoE & NDPA</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="pl-72 flex-1">
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl shadow-sm border-b border-gray-200">
          <div className="h-16 px-6 flex items-center justify-between">
            <div className="flex items-center gap-6 flex-1">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900">Crown Jewel High School - Lekki</span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">Lagos Campus</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>2024/2025 Term 1 · Week 6</span>
                  <span className="mx-1">•</span>
                  <span className="text-green-600 font-medium">Mid-term Evaluation Period</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-green-700">
                <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
                <span className="text-xs font-semibold">Online & Synced</span>
              </div>
              <button className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200 flex items-center justify-center transition-all relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">Mrs. Folake Balogun</p>
                  <p className="text-xs text-gray-600">School Administrator</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                  FB
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <div className="max-w-[1440px] mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <span className="hover:text-blue-600 transition-colors cursor-pointer">Staff Management</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-blue-600 font-semibold">Employment & Assignments</span>
            </nav>

            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Staff Employment & Teaching Assignments</h1>
                <p className="text-sm text-gray-600 max-w-3xl mt-1">
                  Manage contracts, positions, homeroom classes, subject allocations, and weekly teaching period workloads across enabled school sections.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm shadow-sm transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>Workload Balance Audit</span>
                </button>
                <button
                  onClick={() => setIsAddAssignmentModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>+ New Teaching Assignment</span>
                </button>
              </div>
            </div>

            {/* School Section Tabs */}
            <div className="flex items-center gap-2 p-1.5 rounded-xl bg-gray-100 overflow-x-auto mb-6">
              <button
                onClick={() => setSelectedScope('Whole School')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${
                  selectedScope === 'Whole School'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span>Whole School</span>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                  selectedScope === 'Whole School' ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700'
                }`}>
                  54 Active Staff
                </span>
              </button>
              <button
                onClick={() => setSelectedScope('Early Years')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${
                  selectedScope === 'Early Years'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span>Early Years / Nursery</span>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                  selectedScope === 'Early Years' ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700'
                }`}>18</span>
              </button>
              <button
                onClick={() => setSelectedScope('Primary Basic')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${
                  selectedScope === 'Primary Basic'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span>Primary Basic 1-6</span>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                  selectedScope === 'Primary Basic' ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700'
                }`}>14</span>
              </button>
              <button
                onClick={() => setSelectedScope('Junior Secondary')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${
                  selectedScope === 'Junior Secondary'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span>Junior Secondary</span>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                  selectedScope === 'Junior Secondary' ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700'
                }`}>12</span>
              </button>
              <button
                onClick={() => setSelectedScope('Senior Secondary')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${
                  selectedScope === 'Senior Secondary'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span>Senior Secondary</span>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                  selectedScope === 'Senior Secondary' ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700'
                }`}>10</span>
              </button>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Total Staff */}
              <div className="p-6 rounded-xl bg-white shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Total Staff</span>
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900">54</div>
                <div className="text-xs text-gray-600 mt-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  <span>38 Teaching · 16 Admin & Support</span>
                </div>
              </div>

              {/* Homeroom Coverage */}
              <div className="p-6 rounded-xl bg-white shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Homeroom Coverage</span>
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-bold text-green-600">100%</div>
                <div className="text-xs text-gray-600 mt-2 flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>All 20 class arms staffed & certified</span>
                </div>
              </div>

              {/* Average Workload */}
              <div className="p-6 rounded-xl bg-white shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Average Workload</span>
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-blue-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  18.4 <span className="text-lg text-gray-600 font-normal">pds/wk</span>
                </div>
                <div className="text-xs text-green-600 font-medium mt-2 flex items-center gap-2">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Balanced within NERDC 16-22 range</span>
                </div>
              </div>

              {/* Open Allocations */}
              <div className="p-6 rounded-xl bg-red-50 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-red-800 uppercase tracking-wider">Open Allocations</span>
                  <div className="w-8 h-8 rounded-lg bg-red-200 flex items-center justify-center text-red-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-bold text-red-600">2 Slots</div>
                <div className="text-xs text-red-800 font-semibold mt-2 flex items-center gap-2">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                  </svg>
                  <span>JSS 2 Civic · Basic 3 French</span>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column - Staff Assignments List */}
              <div className="lg:col-span-8 space-y-4">
                {/* Search and Filter */}
                <div className="p-4 rounded-xl bg-white shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="relative w-full sm:max-w-md">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Filter by staff name, TRCN, subject, or class..."
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <select className="appearance-none px-4 py-2 rounded-lg bg-gray-50 text-sm font-semibold text-gray-900 focus:outline-none cursor-pointer">
                      <option>All Positions</option>
                      <option>Homeroom Class Teacher</option>
                      <option>Subject Specialist</option>
                      <option>HOD / Section Lead</option>
                      <option>Non-Teaching / Support</option>
                    </select>
                    <button className="p-2 rounded-lg bg-gray-50 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Staff Assignment Cards */}
                {staffAssignments.map((staff) => (
                  <div key={staff.id} className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        {staff.avatar ? (
                          <img
                            src={staff.avatar}
                            alt={staff.name}
                            className="w-12 h-12 rounded-xl object-cover shrink-0"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg shrink-0">
                            {staff.initials}
                          </div>
                        )}
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-lg font-bold text-gray-900">{staff.name}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[11px] uppercase font-bold ${
                              staff.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                              staff.status === 'Class Tutor' ? 'bg-green-100 text-green-700' :
                              'bg-amber-100 text-amber-700'
                            }`}>
                              {staff.status}
                            </span>
                            {staff.trcn && (
                              <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[11px]">
                                TRCN: {staff.trcn}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-0.5">{staff.role}</p>
                          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                            {staff.location && (
                              <>
                                <span className="flex items-center gap-1">
                                  <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                  </svg>
                                  {staff.location}
                                </span>
                                <span>•</span>
                              </>
                            )}
                            {staff.assistant && (
                              <>
                                <span className="flex items-center gap-1 text-gray-600">
                                  <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                                  </svg>
                                  Minder Assistant: {staff.assistant}
                                </span>
                                <span>•</span>
                              </>
                            )}
                            {staff.pending && (
                              <>
                                <span className="flex items-center gap-1 text-amber-600">
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  {staff.pending}
                                </span>
                                <span>•</span>
                              </>
                            )}
                            <span>{staff.employmentType}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex sm:flex-col items-center sm:items-end justify-between shrink-0">
                        <div className="text-right">
                          <span className="text-lg font-bold text-gray-900">{staff.periodsPerWeek}</span>
                          <span className="text-xs text-gray-600"> pds/wk</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold mt-2 ${
                          staff.workloadStatus === 'Standard Load' || staff.workloadStatus === 'Optimal Load' ? 'bg-gray-100 text-blue-600' :
                          staff.workloadStatus === 'Unconfirmed' ? 'bg-amber-100 text-amber-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {staff.workloadStatus}
                        </span>
                      </div>
                    </div>

                    {/* Assignments */}
                    <div className="mt-6 pt-4 bg-gray-50 p-4 rounded-lg">
                      <span className="text-[11px] text-gray-600 uppercase font-bold">
                        {staff.status === 'Class Tutor' ? 'Homeroom Core Instruction' : 'Weekly Subject Allocations'}
                      </span>
                      <div className="flex items-center gap-2 flex-wrap mt-2">
                        {staff.assignments.map((assignment, idx) => (
                          <div
                            key={idx}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm shadow-sm ${
                              assignment.special ? 'bg-green-50' : 'bg-white'
                            }`}
                          >
                            <span className={`font-semibold ${assignment.special ? 'text-green-600' : 'text-blue-600'}`}>
                              {assignment.class}
                            </span>
                            <span className="text-gray-900">{assignment.subject}</span>
                            <span className="text-xs text-gray-500">({assignment.periods} pds)</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 flex items-center justify-end gap-2">
                      {staff.pending ? (
                        <>
                          <button
                            onClick={() => {
                              setSelectedStaff(staff)
                              setIsReviewDossierModalOpen(true)
                            }}
                            className="px-4 py-1.5 rounded-lg text-gray-600 hover:bg-gray-100 font-semibold text-xs transition-colors"
                          >
                            Review Dossier
                          </button>
                          <button
                            onClick={() => {
                              setSelectedStaff(staff)
                              setIsConfirmRosterModalOpen(true)
                            }}
                            className="px-4 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold text-xs shadow-sm transition-all"
                          >
                            Confirm Roster
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setSelectedStaff(staff)
                              if (staff.status === 'Class Tutor') {
                                setIsViewHomeroomModalOpen(true)
                              } else {
                                setIsViewScheduleModalOpen(true)
                              }
                            }}
                            className="px-4 py-1.5 rounded-lg text-blue-600 hover:bg-blue-50 font-semibold text-xs transition-colors"
                          >
                            {staff.status === 'Class Tutor' ? 'View Homeroom' : 'View Schedule'}
                          </button>
                          <button
                            onClick={() => {
                              setSelectedStaff(staff)
                              setIsEditAllocationModalOpen(true)
                            }}
                            className="px-4 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs transition-colors"
                          >
                            Edit Allocation
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}

                {/* Pagination */}
                <div className="p-4 rounded-xl bg-gray-50 flex items-center justify-between text-sm text-gray-600">
                  <span>Showing 3 of 38 teaching allocations</span>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 rounded bg-white text-gray-900 font-semibold shadow-sm">1</button>
                    <button className="px-3 py-1 rounded hover:bg-gray-100 text-gray-600">2</button>
                    <button className="px-3 py-1 rounded hover:bg-gray-100 text-gray-600">3</button>
                    <span className="px-1">...</span>
                    <button className="px-3 py-1 rounded hover:bg-gray-100 text-gray-600">8</button>
                  </div>
                </div>
              </div>

              {/* Right Column - Sidebar Widgets */}
              <div className="lg:col-span-4 space-y-4">
                {/* Unallocated Needs */}
                <div className="p-6 rounded-xl bg-white shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                      <h2 className="text-lg font-bold text-gray-900">Unallocated Needs</h2>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[11px] font-bold">2 Open</span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 rounded-lg bg-red-50 border border-red-100">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div>
                          <p className="text-sm font-bold text-gray-900">JSS 2 Civic Education</p>
                          <p className="text-xs text-gray-600">3 periods/wk without assigned teacher</p>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[11px] font-bold">Urgent</span>
                      </div>
                      <div className="flex items-center justify-between gap-2 pt-2 border-t border-red-200">
                        <span className="text-xs text-gray-600">Rec: Mr. I. Bello (Social Studies)</span>
                        <button className="px-3 py-1 rounded bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-all">
                          Assign
                        </button>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-gray-50">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div>
                          <p className="text-sm font-bold text-gray-900">Basic 3 French Specialist</p>
                          <p className="text-xs text-gray-600">Mme. Dupont on approved medical leave (2 wks)</p>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-gray-200 text-blue-600 text-[11px] font-bold">Relief</span>
                      </div>
                      <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-200">
                        <span className="text-xs text-gray-600">Co-teacher pool available</span>
                        <button className="px-3 py-1 rounded bg-white hover:bg-gray-100 text-blue-600 text-xs font-semibold shadow-sm transition-all">
                          Assign Relief
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Workload Distribution */}
                <div className="p-6 rounded-xl bg-white shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-900">Workload Distribution</h2>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-gray-900 font-semibold flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-green-600"></span>
                          Optimal Load (16-20 pds)
                        </span>
                        <span className="text-gray-900 font-bold">28 teachers (74%)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div className="h-full bg-green-600 rounded-full" style={{ width: '74%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-gray-900 font-semibold flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                          Light Load (&lt;16 pds)
                        </span>
                        <span className="text-gray-900 font-bold">7 teachers (18%)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: '18%' }}></div>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">Includes lab specialists and part-time music tutors</p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-gray-900 font-semibold flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
                          Heavy Load (&gt;22 pds)
                        </span>
                        <span className="text-gray-900 font-bold">3 teachers (8%)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div className="h-full bg-amber-600 rounded-full" style={{ width: '8%' }}></div>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">SSS 3 WAEC prep tutors eligible for overload honorarium</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-blue-50 flex items-center gap-2 mt-4">
                    <svg className="w-4 h-4 text-blue-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-xs text-gray-700">NERDC curriculum standards applied across all schedules.</span>
                  </div>
                </div>

                {/* Compliance Standards */}
                <div className="p-6 rounded-xl bg-gray-50 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <h2 className="text-lg font-bold text-gray-900">Compliance Standards</h2>
                  </div>
                  <p className="text-xs text-gray-600 mb-4">Enforced by Lagos State Ministry of Basic & Secondary Education:</p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white text-xs">
                      <span className="text-gray-900 font-medium">Nursery / Crèche Cap</span>
                      <span className="font-semibold text-green-600">Max 1 : 8 (Active: 1:7)</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white text-xs">
                      <span className="text-gray-900 font-medium">Primary Basic 1-6 Cap</span>
                      <span className="font-semibold text-green-600">Max 1 : 30 (Active: 1:24)</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white text-xs">
                      <span className="text-gray-900 font-medium">Secondary JSS & SSS Cap</span>
                      <span className="font-semibold text-green-600">Max 1 : 35 (Active: 1:28)</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 pt-4 text-xs text-gray-600">
                    <svg className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>
                      Teachers Registration Council of Nigeria (TRCN) certified license mandatory for WAEC subject assignments.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add Teaching Assignment Modal */}
      <AddTeachingAssignmentModal
        isOpen={isAddAssignmentModalOpen}
        onClose={() => setIsAddAssignmentModalOpen(false)}
        onSave={(assignment) => {
          console.log('New teaching assignment:', assignment)
          // Handle save logic here
          setIsAddAssignmentModalOpen(false)
        }}
      />

      {/* Edit Allocation Modal */}
      <EditAllocationModal
        isOpen={isEditAllocationModalOpen}
        onClose={() => setIsEditAllocationModalOpen(false)}
        staff={selectedStaff}
        onSave={(updatedStaff) => {
          console.log('Updated staff allocation:', updatedStaff)
          // Handle save logic here
          setIsEditAllocationModalOpen(false)
        }}
      />

      {/* View Schedule Modal */}
      <ViewScheduleModal
        isOpen={isViewScheduleModalOpen}
        onClose={() => setIsViewScheduleModalOpen(false)}
        teacherName={selectedStaff?.name || ''}
        teacherId={selectedStaff?.id || ''}
      />

      {/* View Homeroom Modal */}
      <ViewHomeroomModal
        isOpen={isViewHomeroomModalOpen}
        onClose={() => setIsViewHomeroomModalOpen(false)}
        className={selectedStaff?.role?.split('·')[1]?.trim() || ''}
        teacherName={selectedStaff?.name || ''}
        assistant={selectedStaff?.assistant}
      />

      {/* Review Dossier Modal */}
      <ReviewDossierModal
        isOpen={isReviewDossierModalOpen}
        onClose={() => setIsReviewDossierModalOpen(false)}
        staffName={selectedStaff?.name || ''}
        staffId={selectedStaff?.id || ''}
      />

      {/* Confirm Roster Modal */}
      <ConfirmRosterModal
        isOpen={isConfirmRosterModalOpen}
        onClose={() => setIsConfirmRosterModalOpen(false)}
        staffName={selectedStaff?.name || ''}
        staffId={selectedStaff?.id || ''}
        role={selectedStaff?.role || ''}
        assignments={selectedStaff?.assignments || []}
      />
    </div>
  )
}
