// ============================================================================
// ADD NEW STAFF PAGE - SCHOOL ADMIN
// ============================================================================
// Material Design 3 compliant staff registration form with:
// - Basic Information section
// - Role & Institutional Assignment
// - Statutory & Professional Credentials
// - System Access & Invitation settings
// ============================================================================

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddStaffPage() {
  const navigate = useNavigate()
  const [staffManagementOpen, setStaffManagementOpen] = useState(true)
  const [selectedSection, setSelectedSection] = useState('eyfs')
  const [sendCredentials, setSendCredentials] = useState(true)
  const [issueBiometricId, setIssueBiometricId] = useState(true)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Get form data
    const formData = new FormData(e.currentTarget)
    const firstName = formData.get('first-name') as string
    const lastName = formData.get('last-name') as string
    const email = formData.get('work-email') as string
    const phone = formData.get('phone-whatsapp') as string
    const role = formData.get('primary-role') as string
    const department = formData.get('department') as string

    // Generate employee ID (in production, this would come from the backend)
    const empId = `EMP-${new Date().getFullYear()}-${Math.floor(Math.random() * 900) + 100}`

    // Get section label
    const sectionLabels: Record<string, string> = {
      eyfs: 'Early Years / Nursery',
      primary: 'Primary (Basic 1-6)',
      jss: 'Junior Secondary (JSS)',
      sss: 'Senior Secondary (SSS)',
      whole: 'Whole School / Shared',
    }

    // Navigate to success page with staff data
    const params = new URLSearchParams({
      name: `${firstName} ${lastName}`,
      id: empId,
      role: role || 'Staff Member',
      dept: department || 'General',
      section: sectionLabels[selectedSection] || 'Whole School',
      email: email,
      phone: phone,
    })

    navigate(`/add-staff-success?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-[var(--md-sys-color-surface,#faf8ff)]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-[var(--md-sys-color-surface-container-lowest,#ffffff)] shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between">
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* School Header */}
          <div className="h-16 px-6 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[var(--md-sys-color-primary,#004ac6)] flex items-center justify-center text-white shadow-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-[var(--md-sys-color-on-surface,#131b2e)] leading-tight tracking-tight">
                EduManage
              </span>
              <span className="text-[11px] font-bold text-[var(--md-sys-color-primary,#004ac6)] uppercase tracking-wider">
                Nigeria Portal
              </span>
            </div>
          </div>

          {/* Campus Info Badge */}
          <div className="px-4 py-2">
            <div className="p-2 rounded-lg bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[var(--md-sys-color-primary-fixed,#dbe1ff)] flex items-center justify-center text-[var(--md-sys-color-on-primary-fixed-variant,#003ea8)]">
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[var(--md-sys-color-on-surface,#131b2e)] truncate">
                  Crown Jewel High
                </p>
                <p className="text-xs text-[var(--md-sys-color-on-surface-variant,#434655)] truncate">
                  Lekki Campus · Lagos
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-2 space-y-1">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[var(--md-sys-color-on-surface-variant,#434655)] hover:bg-[var(--md-sys-color-surface-container,#eaedff)] hover:text-[var(--md-sys-color-on-surface,#131b2e)] transition-all font-semibold text-sm text-left"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
              </svg>
              <span>Dashboard</span>
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[var(--md-sys-color-on-surface-variant,#434655)] hover:bg-[var(--md-sys-color-surface-container,#eaedff)] hover:text-[var(--md-sys-color-on-surface,#131b2e)] transition-all font-semibold text-sm text-left">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>Classes &amp; Streams</span>
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[var(--md-sys-color-on-surface-variant,#434655)] hover:bg-[var(--md-sys-color-surface-container,#eaedff)] hover:text-[var(--md-sys-color-on-surface,#131b2e)] transition-all font-semibold text-sm text-left">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <span>Daily Attendance</span>
            </button>

            {/* Staff Management Dropdown */}
            <div className="pt-2">
              <button
                onClick={() => setStaffManagementOpen(!staffManagementOpen)}
                className="w-full flex items-center justify-between px-4 py-2 text-[var(--md-sys-color-on-surface-variant,#434655)] hover:text-[var(--md-sys-color-on-surface,#131b2e)] transition-all text-xs font-bold uppercase tracking-wider"
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
                <div className="pl-4 pr-2 mt-1 space-y-1">
                  <button
                    onClick={() => navigate('/staff-directory')}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[var(--md-sys-color-on-surface-variant,#434655)] hover:bg-[var(--md-sys-color-surface-container,#eaedff)] hover:text-[var(--md-sys-color-on-surface,#131b2e)] transition-all font-semibold text-sm text-left"
                  >
                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                    <span>Staff Directory</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[var(--md-sys-color-on-surface-variant,#434655)] hover:bg-[var(--md-sys-color-surface-container,#eaedff)] hover:text-[var(--md-sys-color-on-surface,#131b2e)] transition-all font-semibold text-sm text-left">
                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span>Recruitment</span>
                  </button>
                  <button
                    onClick={() => navigate('/staff-onboarding')}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[var(--md-sys-color-on-surface-variant,#434655)] hover:bg-[var(--md-sys-color-surface-container,#eaedff)] hover:text-[var(--md-sys-color-on-surface,#131b2e)] transition-all font-semibold text-sm text-left"
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
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[var(--md-sys-color-on-surface-variant,#434655)] hover:bg-[var(--md-sys-color-surface-container,#eaedff)] hover:text-[var(--md-sys-color-on-surface,#131b2e)] transition-all font-semibold text-sm text-left"
                  >
                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Employment &amp; Assignments</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[var(--md-sys-color-on-surface-variant,#434655)] hover:bg-[var(--md-sys-color-surface-container,#eaedff)] hover:text-[var(--md-sys-color-on-surface,#131b2e)] transition-all font-semibold text-sm text-left">
                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Staff Attendance &amp; Leave</span>
                  </button>
                </div>
              )}
            </div>

            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[var(--md-sys-color-on-surface-variant,#434655)] hover:bg-[var(--md-sys-color-surface-container,#eaedff)] hover:text-[var(--md-sys-color-on-surface,#131b2e)] transition-all font-semibold text-sm text-left">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>Facilities &amp; Operations</span>
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[var(--md-sys-color-on-surface-variant,#434655)] hover:bg-[var(--md-sys-color-surface-container,#eaedff)] hover:text-[var(--md-sys-color-on-surface,#131b2e)] transition-all font-semibold text-sm text-left">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Regulatory Compliance Footer */}
        <div className="p-4 bg-[var(--md-sys-color-surface-container-low,#f2f3ff)]">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-[var(--md-sys-color-surface-container-lowest,#ffffff)] shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
            <svg className="w-5 h-5 text-[var(--md-sys-color-secondary,#006a61)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-bold uppercase text-[var(--md-sys-color-on-surface-variant,#434655)] tracking-wider">
                Regulatory Compliance
              </p>
              <p className="text-xs font-semibold text-[var(--md-sys-color-on-surface,#131b2e)] truncate">
                Lagos State MoE &amp; NDPA
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="pl-72">
        {/* Top Header */}
        <header className="fixed top-0 left-72 right-0 h-16 bg-[var(--md-sys-color-surface-container-lowest,#ffffff)]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-6">
          <div className="flex items-center gap-6 flex-1">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-[var(--md-sys-color-on-surface,#131b2e)] tracking-tight">
                  Crown Jewel High School - Lekki
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[var(--md-sys-color-surface-variant,#dae2fd)] text-[var(--md-sys-color-on-surface,#131b2e)] text-[11px] font-bold">
                  Lagos Campus
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[var(--md-sys-color-on-surface-variant,#434655)]">
                <svg className="w-3.5 h-3.5 text-[var(--md-sys-color-primary,#004ac6)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>2024/2025 Term 1 · Week 6</span>
                <span className="mx-1">•</span>
                <span className="text-[var(--md-sys-color-secondary,#006a61)] font-semibold">Mid-term Evaluation Period</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--md-sys-color-secondary-container,#86f2e4)] text-[var(--md-sys-color-on-secondary-container,#006f66)]">
              <span className="w-2 h-2 rounded-full bg-[var(--md-sys-color-secondary,#006a61)] animate-pulse"></span>
              <span className="text-xs font-bold">Online &amp; Synced</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div className="relative">
              <button className="w-9 h-9 rounded-lg bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] text-[var(--md-sys-color-on-surface-variant,#434655)] hover:text-[var(--md-sys-color-on-surface,#131b2e)] hover:bg-[var(--md-sys-color-surface-container,#eaedff)] flex items-center justify-center transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[var(--md-sys-color-error,#ba1a1a)] rounded-full ring-2 ring-white"></span>
            </div>

            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden lg:block">
                <p className="text-sm font-semibold text-[var(--md-sys-color-on-surface,#131b2e)] leading-tight">
                  Mrs. Folake Balogun
                </p>
                <p className="text-xs text-[var(--md-sys-color-on-surface-variant,#434655)]">
                  School Administrator
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-[var(--md-sys-color-primary,#004ac6)] flex items-center justify-center ring-2 ring-[var(--md-sys-color-primary-fixed,#dbe1ff)]">
                <svg className="w-[18px] h-[18px] text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="relative pt-16 bg-[var(--md-sys-color-surface,#faf8ff)] min-h-[calc(100vh-4rem)] flex flex-col justify-between">
          <div className="flex flex-col w-full">
            <div className="px-4 lg:px-10 py-6 w-full max-w-5xl mx-auto space-y-6">
              {/* Breadcrumb & Top Bar Navigation */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <nav className="flex items-center gap-2 text-sm text-[var(--md-sys-color-on-surface-variant,#434655)]">
                  <span>Staff Management</span>
                  <svg className="w-4 h-4 text-[var(--md-sys-color-outline,#737686)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <button
                    onClick={() => navigate('/staff-directory')}
                    className="hover:text-[var(--md-sys-color-primary,#004ac6)] transition-colors"
                  >
                    Staff Directory
                  </button>
                  <svg className="w-4 h-4 text-[var(--md-sys-color-outline,#737686)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="font-semibold text-[var(--md-sys-color-primary,#004ac6)]">Add New Staff</span>
                </nav>

                <button
                  onClick={() => navigate('/staff-directory')}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--md-sys-color-on-surface-variant,#434655)] hover:text-[var(--md-sys-color-primary,#004ac6)] transition-colors py-1 px-2 rounded-lg hover:bg-[var(--md-sys-color-surface-container,#eaedff)]"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Staff Directory
                </button>
              </div>

              {/* Header Section */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-[30px] leading-[38px] font-bold text-[var(--md-sys-color-on-surface,#131b2e)] tracking-tight">
                      Add New Staff Member
                    </h1>
                    <span className="px-2 py-0.5 rounded-full bg-[var(--md-sys-color-surface-container,#eaedff)] text-[var(--md-sys-color-on-surface-variant,#434655)] text-[11px] font-bold uppercase tracking-wide">
                      Lekki Campus 2024/25
                    </span>
                  </div>
                  <p className="text-sm text-[var(--md-sys-color-on-surface-variant,#434655)]">
                    Register a new teaching or non-teaching staff member to Crown Jewel High School - Lekki
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start md:self-auto px-2 py-1 rounded-full bg-[var(--md-sys-color-secondary-container,#86f2e4)]/50 text-[var(--md-sys-color-on-secondary-container,#006f66)]">
                  <svg className="w-4 h-4 text-[var(--md-sys-color-secondary,#006a61)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    All-in-One Campus (Nursery, Primary, JSS, SSS)
                  </span>
                </div>
              </div>

              {/* Main Form */}
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="bg-[var(--md-sys-color-surface-container-lowest,#ffffff)] rounded-xl shadow-[0_1px_3px_0_rgba(15,23,42,0.04),0_6px_16px_-4px_rgba(15,23,42,0.03)] p-6 md:p-10 space-y-10">
                  {/* SECTION 1: Basic Information */}
                  <section className="space-y-4">
                    <div className="flex items-center gap-2 pb-2">
                      <div className="w-7 h-7 rounded-lg bg-[var(--md-sys-color-primary-fixed,#dbe1ff)] flex items-center justify-center text-[var(--md-sys-color-on-primary-fixed-variant,#003ea8)]">
                        <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-[var(--md-sys-color-on-surface,#131b2e)]">
                          1. Basic Information
                        </h2>
                        <p className="text-xs text-[var(--md-sys-color-on-surface-variant,#434655)]">
                          Personal details and direct operational contact
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[var(--md-sys-color-on-surface,#131b2e)] flex items-center gap-1" htmlFor="first-name">
                          First Name <span className="text-[var(--md-sys-color-error,#ba1a1a)]">*</span>
                        </label>
                        <input
                          className="w-full px-4 py-2.5 rounded-lg bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] text-[var(--md-sys-color-on-surface,#131b2e)] text-sm placeholder:text-[var(--md-sys-color-outline,#737686)] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--md-sys-color-primary,#004ac6)] transition-all"
                          id="first-name"
                          name="first-name"
                          placeholder="e.g. Babatunde"
                          required
                          type="text"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[var(--md-sys-color-on-surface,#131b2e)] flex items-center gap-1" htmlFor="last-name">
                          Last Name <span className="text-[var(--md-sys-color-error,#ba1a1a)]">*</span>
                        </label>
                        <input
                          className="w-full px-4 py-2.5 rounded-lg bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] text-[var(--md-sys-color-on-surface,#131b2e)] text-sm placeholder:text-[var(--md-sys-color-outline,#737686)] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--md-sys-color-primary,#004ac6)] transition-all"
                          id="last-name"
                          name="last-name"
                          placeholder="e.g. Adeyemi"
                          required
                          type="text"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[var(--md-sys-color-on-surface,#131b2e)] flex items-center gap-1" htmlFor="work-email">
                          Institutional Email <span className="text-[var(--md-sys-color-error,#ba1a1a)]">*</span>
                        </label>
                        <div className="relative">
                          <svg className="w-[18px] h-[18px] absolute left-3 top-1/2 -translate-y-1/2 text-[var(--md-sys-color-outline,#737686)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <input
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] text-[var(--md-sys-color-on-surface,#131b2e)] text-sm placeholder:text-[var(--md-sys-color-outline,#737686)] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--md-sys-color-primary,#004ac6)] transition-all"
                            id="work-email"
                            name="work-email"
                            placeholder="b.adeyemi@crownjewel.sch.ng"
                            required
                            type="email"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[var(--md-sys-color-on-surface,#131b2e)] flex items-center gap-1" htmlFor="phone-whatsapp">
                          Phone Number / WhatsApp <span className="text-[var(--md-sys-color-error,#ba1a1a)]">*</span>
                        </label>
                        <div className="relative">
                          <svg className="w-[18px] h-[18px] absolute left-3 top-1/2 -translate-y-1/2 text-[var(--md-sys-color-outline,#737686)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          <input
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] text-[var(--md-sys-color-on-surface,#131b2e)] text-sm placeholder:text-[var(--md-sys-color-outline,#737686)] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--md-sys-color-primary,#004ac6)] transition-all"
                            id="phone-whatsapp"
                            name="phone-whatsapp"
                            placeholder="+234 803 000 0000"
                            required
                            type="tel"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[var(--md-sys-color-on-surface,#131b2e)] flex items-center gap-1" htmlFor="gender">
                          Gender <span className="text-[var(--md-sys-color-error,#ba1a1a)]">*</span>
                        </label>
                        <select
                          className="w-full px-4 py-2.5 rounded-lg bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] text-[var(--md-sys-color-on-surface,#131b2e)] text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--md-sys-color-primary,#004ac6)] transition-all"
                          id="gender"
                          required
                        >
                          <option value="" disabled>Select gender</option>
                          <option value="female">Female</option>
                          <option value="male">Male</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[var(--md-sys-color-on-surface,#131b2e)] flex items-center gap-1" htmlFor="dob">
                          Date of Birth <span className="text-[var(--md-sys-color-error,#ba1a1a)]">*</span>
                        </label>
                        <input
                          className="w-full px-4 py-2.5 rounded-lg bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] text-[var(--md-sys-color-on-surface,#131b2e)] text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--md-sys-color-primary,#004ac6)] transition-all"
                          id="dob"
                          required
                          type="date"
                        />
                      </div>
                    </div>
                  </section>

                  {/* SECTION 2: Role & Institutional Assignment */}
                  <section className="space-y-4 pt-2">
                    <div className="flex items-center gap-2 pb-2">
                      <div className="w-7 h-7 rounded-lg bg-[var(--md-sys-color-primary-fixed,#dbe1ff)] flex items-center justify-center text-[var(--md-sys-color-on-primary-fixed-variant,#003ea8)]">
                        <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-[var(--md-sys-color-on-surface,#131b2e)]">
                          2. Role &amp; Institutional Assignment
                        </h2>
                        <p className="text-xs text-[var(--md-sys-color-on-surface-variant,#434655)]">
                          Designation, section, and faculty department
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[var(--md-sys-color-on-surface,#131b2e)] flex items-center gap-1" htmlFor="primary-role">
                          Primary Role / Designation <span className="text-[var(--md-sys-color-error,#ba1a1a)]">*</span>
                        </label>
                        <select
                          className="w-full px-4 py-2.5 rounded-lg bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] text-[var(--md-sys-color-on-surface,#131b2e)] text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--md-sys-color-primary,#004ac6)] transition-all"
                          id="primary-role"
                          name="primary-role"
                          required
                          defaultValue=""
                        >
                          <option value="" disabled>Select staff role</option>
                          <option value="Lead Homeroom Teacher">Lead Homeroom Teacher</option>
                          <option value="Subject Specialist Teacher">Subject Specialist Teacher</option>
                          <option value="Assistant Minder / EYFS">Assistant Minder / EYFS</option>
                          <option value="Clinic Nurse">Clinic Nurse</option>
                          <option value="Administrative Staff">Administrative Staff</option>
                          <option value="Facility Staff">Facility Staff</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[var(--md-sys-color-on-surface,#131b2e)] flex items-center gap-1" htmlFor="department">
                          Department <span className="text-[var(--md-sys-color-error,#ba1a1a)]">*</span>
                        </label>
                        <select
                          className="w-full px-4 py-2.5 rounded-lg bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] text-[var(--md-sys-color-on-surface,#131b2e)] text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--md-sys-color-primary,#004ac6)] transition-all"
                          id="department"
                          name="department"
                          required
                          defaultValue=""
                        >
                          <option value="" disabled>Assign faculty department</option>
                          <option value="Sciences & STEM">Sciences &amp; STEM</option>
                          <option value="Humanities & Languages">Humanities &amp; Languages</option>
                          <option value="Primary Homeroom">Primary Homeroom</option>
                          <option value="EYFS & Crèche">EYFS &amp; Crèche</option>
                          <option value="Administration & Operations">Administration &amp; Operations</option>
                        </select>
                      </div>

                      {/* School Section Scope pills selection */}
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-semibold text-[var(--md-sys-color-on-surface,#131b2e)] flex items-center justify-between">
                          <span>
                            School Section Scope <span className="text-[var(--md-sys-color-error,#ba1a1a)]">*</span>
                          </span>
                          <span className="text-xs text-[var(--md-sys-color-on-surface-variant,#434655)] font-normal">
                            Choose primary posting
                          </span>
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                          {[
                            { value: 'eyfs', icon: 'child_care', label: 'Early Years / Nursery' },
                            { value: 'primary', icon: 'auto_stories', label: 'Primary (Basic 1-6)' },
                            { value: 'jss', icon: 'menu_book', label: 'Junior Sec. (JSS)' },
                            { value: 'sss', icon: 'school', label: 'Senior Sec. (SSS)' },
                            { value: 'whole', icon: 'domain', label: 'Whole School / Shared' },
                          ].map((section) => (
                            <label
                              key={section.value}
                              className={`relative flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer hover:bg-[var(--md-sys-color-surface-container,#eaedff)] transition-all shadow-sm ${
                                selectedSection === section.value
                                  ? 'bg-[var(--md-sys-color-primary-container,#dbe1ff)] text-[var(--md-sys-color-on-primary-container,#00174b)]'
                                  : 'bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] text-[var(--md-sys-color-on-surface-variant,#434655)]'
                              } ${section.value === 'whole' ? 'col-span-2 sm:col-span-1' : ''}`}
                            >
                              <input
                                className="sr-only"
                                name="school-section"
                                type="radio"
                                value={section.value}
                                checked={selectedSection === section.value}
                                onChange={(e) => setSelectedSection(e.target.value)}
                              />
                              <span className="material-symbols-outlined text-[20px] mb-1">{section.icon}</span>
                              <span className="text-xs font-semibold text-center">{section.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* SECTION 3: Statutory & Professional Credentials */}
                  <section className="space-y-4 pt-2">
                    <div className="flex items-center gap-2 pb-2">
                      <div className="w-7 h-7 rounded-lg bg-[var(--md-sys-color-primary-fixed,#dbe1ff)] flex items-center justify-center text-[var(--md-sys-color-on-primary-fixed-variant,#003ea8)]">
                        <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-[var(--md-sys-color-on-surface,#131b2e)]">
                          3. Statutory &amp; Professional Credentials
                        </h2>
                        <p className="text-xs text-[var(--md-sys-color-on-surface-variant,#434655)]">
                          Lagos State MoE accreditation and teaching credentials
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[var(--md-sys-color-on-surface,#131b2e)] flex items-center justify-between" htmlFor="trcn-number">
                          <span>TRCN Registration No.</span>
                          <span className="text-[11px] text-[var(--md-sys-color-on-surface-variant,#434655)]">Optional</span>
                        </label>
                        <input
                          className="w-full px-4 py-2.5 rounded-lg bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] text-[var(--md-sys-color-on-surface,#131b2e)] text-sm placeholder:text-[var(--md-sys-color-outline,#737686)] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--md-sys-color-primary,#004ac6)] transition-all"
                          id="trcn-number"
                          placeholder="e.g. TRCN/LA/2022/41029"
                          type="text"
                        />
                        <p className="text-xs text-[var(--md-sys-color-on-surface-variant,#434655)]">
                          Leave blank if pending or for non-teaching staff
                        </p>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[var(--md-sys-color-on-surface,#131b2e)] flex items-center gap-1" htmlFor="highest-qual">
                          Highest Qualification <span className="text-[var(--md-sys-color-error,#ba1a1a)]">*</span>
                        </label>
                        <select
                          className="w-full px-4 py-2.5 rounded-lg bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] text-[var(--md-sys-color-on-surface,#131b2e)] text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--md-sys-color-primary,#004ac6)] transition-all"
                          id="highest-qual"
                          required
                        >
                          <option value="" disabled>Select qualification</option>
                          <option value="NCE">NCE (National Certificate in Education)</option>
                          <option value="B.Ed">B.Ed (Bachelor of Education)</option>
                          <option value="B.Sc">B.Sc / B.A + PGDE</option>
                          <option value="M.Ed">M.Ed / M.Sc</option>
                          <option value="PGDE">PGDE</option>
                          <option value="Nursing">Registered Nurse (RN / RM)</option>
                          <option value="SSCE-OND">OND / HND / General</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[var(--md-sys-color-on-surface,#131b2e)] flex items-center gap-1" htmlFor="emp-type">
                          Employment Type <span className="text-[var(--md-sys-color-error,#ba1a1a)]">*</span>
                        </label>
                        <select
                          className="w-full px-4 py-2.5 rounded-lg bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] text-[var(--md-sys-color-on-surface,#131b2e)] text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--md-sys-color-primary,#004ac6)] transition-all"
                          id="emp-type"
                          required
                        >
                          <option value="fulltime">Full-time Regular</option>
                          <option value="parttime">Part-time Specialist</option>
                          <option value="contract">Fixed-Term Contract</option>
                          <option value="probation">Probationary Period</option>
                        </select>
                      </div>
                    </div>
                  </section>

                  {/* SECTION 4: System Access & Invitation */}
                  <section className="space-y-2 pt-2 bg-[var(--md-sys-color-surface-container-low,#f2f3ff)]/60 rounded-xl p-4">
                    <div className="flex items-center gap-2 pb-2">
                      <svg className="w-5 h-5 text-[var(--md-sys-color-primary,#004ac6)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <h2 className="text-lg font-semibold text-[var(--md-sys-color-on-surface,#131b2e)]">
                        4. System Access &amp; Invitation
                      </h2>
                    </div>

                    <div className="space-y-2 pl-1">
                      <label className="flex items-start gap-2 cursor-pointer select-none">
                        <input
                          checked={sendCredentials}
                          onChange={(e) => setSendCredentials(e.target.checked)}
                          className="mt-1 w-4 h-4 rounded text-[var(--md-sys-color-primary,#004ac6)] focus:ring-[var(--md-sys-color-primary,#004ac6)] bg-[var(--md-sys-color-surface-container,#eaedff)] border-[var(--md-sys-color-outline-variant,#c3c6d7)]"
                          type="checkbox"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-[var(--md-sys-color-on-surface,#131b2e)]">
                            Send WhatsApp &amp; Email onboarding credentials automatically
                          </span>
                          <span className="text-xs text-[var(--md-sys-color-on-surface-variant,#434655)]">
                            Sends temporary portal passcode and NDPA verification link via SMS / WhatsApp gateway.
                          </span>
                        </div>
                      </label>

                      <label className="flex items-start gap-2 cursor-pointer select-none">
                        <input
                          checked={issueBiometricId}
                          onChange={(e) => setIssueBiometricId(e.target.checked)}
                          className="mt-1 w-4 h-4 rounded text-[var(--md-sys-color-primary,#004ac6)] focus:ring-[var(--md-sys-color-primary,#004ac6)] bg-[var(--md-sys-color-surface-container,#eaedff)] border-[var(--md-sys-color-outline-variant,#c3c6d7)]"
                          type="checkbox"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-[var(--md-sys-color-on-surface,#131b2e)]">
                            Issue temporary biometric attendance ID
                          </span>
                          <span className="text-xs text-[var(--md-sys-color-on-surface-variant,#434655)]">
                            Enables immediate staff gate check-in at Lekki Campus terminal ahead of physical card printing.
                          </span>
                        </div>
                      </label>
                    </div>
                  </section>
                </div>

                {/* Action Buttons Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
                  <button
                    type="button"
                    onClick={() => navigate('/staff-directory')}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[var(--md-sys-color-surface-container,#eaedff)] text-[var(--md-sys-color-on-surface,#131b2e)] text-sm font-semibold text-center hover:bg-[var(--md-sys-color-surface-container-high,#e2e7ff)] transition-all"
                  >
                    Cancel
                  </button>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] text-[var(--md-sys-color-on-surface-variant,#434655)] hover:text-[var(--md-sys-color-on-surface,#131b2e)] hover:bg-[var(--md-sys-color-surface-container,#eaedff)] text-sm font-semibold transition-all"
                      type="button"
                    >
                      Save as Draft
                    </button>

                    <button
                      className="w-full sm:w-auto px-10 py-2.5 rounded-lg bg-[var(--md-sys-color-primary,#004ac6)] text-white text-sm font-semibold shadow-sm hover:bg-[var(--md-sys-color-primary-container,#dbe1ff)] hover:text-[var(--md-sys-color-on-primary-container,#00174b)] transition-all flex items-center justify-center gap-1.5"
                      type="submit"
                    >
                      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      Save &amp; Add Staff Member
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Live Edge Sync Badge (Bottom Right) */}
          <div className="fixed bottom-6 right-6 z-50">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--md-sys-color-primary,#004ac6)] text-white shadow-[0_8px_20px_-2px_rgba(37,99,235,0.4),0_2px_6px_-1px_rgba(0,0,0,0.1)] hover:bg-[var(--md-sys-color-primary-container,#dbe1ff)] hover:text-[var(--md-sys-color-on-primary-container,#00174b)] transition-all cursor-pointer">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--md-sys-color-secondary-fixed,#89f5e7)] animate-ping"></span>
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
              </svg>
              <div className="flex flex-col text-left leading-none">
                <span className="text-xs font-bold">Live Edge Sync</span>
                <span className="text-[11px] opacity-90">Offline-first active</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
