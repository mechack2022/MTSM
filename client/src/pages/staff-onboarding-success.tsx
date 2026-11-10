import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

interface StaffData {
  fullName: string
  email: string
  phone: string
  designation: string
  department: string
  staffId: string
  classes: string[]
  weeklyPeriods: number
  passcode: string
}

export default function StaffOnboardingSuccess() {
  const navigate = useNavigate()
  const location = useLocation()
  const [copyLabel, setCopyLabel] = useState('Copy Credentials')
  const [copyIcon, setCopyIcon] = useState('content_copy')

  // Get staff data from navigation state or use defaults
  const staffData: StaffData = location.state?.staffData || {
    fullName: 'Mr. Olumide Adeleke',
    email: 'o.adeleke@crownjewel.edu.ng',
    phone: '803 123 4567',
    designation: 'Senior Mathematics Teacher',
    department: 'Mathematics & Sciences',
    staffId: 'CJ-STF-051',
    classes: ['SSS 1A', 'SSS 2B'],
    weeklyPeriods: 18,
    passcode: 'CJET-MATH-2026#'
  }

  const handleCopyPasscode = async () => {
    try {
      await navigator.clipboard.writeText(staffData.passcode)
      setCopyLabel('Copied!')
      setCopyIcon('check')
      setTimeout(() => {
        setCopyLabel('Copy Credentials')
        setCopyIcon('content_copy')
      }, 2200)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-white shadow-sm z-50 flex flex-col justify-between">
        <div className="flex flex-col flex-1 min-h-0">
          {/* School Header */}
          <div className="p-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm flex-shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
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
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-600 text-white font-semibold text-sm shadow-sm transition-all">
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

      {/* Main Content with Blurred Background */}
      <div className="ml-72 flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 right-0 h-16 bg-white/90 backdrop-blur-md shadow-sm z-40 pl-4 pr-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6 flex-1 min-w-0">
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs font-bold text-gray-900">Crown Jewel High School - Lekki</span>
            </div>
            <div className="hidden lg:flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full">
              <svg className="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs font-bold text-gray-600">2024/2025 Term 1</span>
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

        {/* Main Content with Blurred Background */}
        <main className="w-full flex-1 bg-gray-50 relative">
          {/* Blurred Staff Directory Background */}
          <div className="w-full px-12 py-8 pointer-events-none select-none opacity-40 blur-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">Faculty Lifecycle</span>
                <h1 className="text-3xl font-bold text-gray-900">Staff Directory & Allocation</h1>
                <p className="text-sm text-gray-600">Lekki Academic Roster • 74 Active Educators</p>
              </div>
              <div className="flex gap-3">
                <div className="h-10 px-4 rounded-lg bg-gray-100 flex items-center gap-2 text-gray-900">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="text-sm">Search personnel...</span>
                </div>
                <div className="h-10 px-6 rounded-lg bg-blue-600 text-white flex items-center text-sm font-bold">
                  + Dispatch Onboarding Invitation
                </div>
              </div>
            </div>

            {/* Mock Roster Grid */}
            <div className="grid grid-cols-3 gap-4">
              {['Mrs. Amina Yusuf', 'Dr. Chidi Nwosu', 'Engr. Tunde Coker'].map((name, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm flex flex-col gap-3">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100"></div>
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-gray-900">{name}</span>
                      <span className="text-xs text-gray-600">Staff Member • CJ-STF-{String(i + 1).padStart(3, '0')}</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg flex justify-between text-xs">
                    <span>Active Terms: {4 + i}</span>
                    <span className="text-teal-600 font-bold">Verified</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Modal Backdrop */}
          <div className="fixed inset-0 top-16 left-72 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-6 overflow-y-auto">
            {/* Success Modal */}
            <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              {/* Top Accent Bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-blue-500 to-teal-600"></div>

              <div className="p-8 flex flex-col gap-6">
                {/* 1. Success Header */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 shrink-0 shadow-sm">
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-teal-600 uppercase tracking-widest bg-teal-50 px-2 py-0.5 rounded-full">Automated Pipeline</span>
                      <span className="text-[11px] font-bold text-gray-500">• Instant Broadcast</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Onboarding Invitation Sent Successfully!</h2>
                    <p className="text-sm text-gray-600">
                      <span className="font-bold text-gray-900">{staffData.fullName}</span> has been registered as {staffData.designation} and added to the Lekki campus roster.
                    </p>
                  </div>
                </div>

                {/* 2. Candidate Summary */}
                <div className="bg-gray-50 rounded-xl p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-2">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                      </svg>
                      <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">Candidate & Roster Allocation</span>
                    </div>
                    <span className="text-[11px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-mono tracking-wider">ID: {staffData.staffId}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg flex flex-col gap-2 shadow-sm">
                      <span className="text-xs text-gray-500">Full Name & Division</span>
                      <span className="text-lg font-bold text-gray-900">{staffData.fullName}</span>
                      <span className="text-xs text-gray-600 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-blue-600 inline-block"></span>
                        Academic Staff • {staffData.department}
                      </span>
                    </div>
                    <div className="bg-white p-4 rounded-lg flex flex-col gap-2 shadow-sm">
                      <span className="text-xs text-gray-500">Teaching Load & Section</span>
                      <span className="text-lg font-bold text-gray-900">{staffData.classes.join(', ')}</span>
                      <span className="text-xs text-teal-600 font-bold flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {staffData.weeklyPeriods} periods / week (Full-time)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 text-xs text-gray-600">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      Campus Node: <strong className="text-gray-900 font-bold">Crown Jewel High School – Lekki</strong>
                    </span>
                    <span className="flex items-center gap-2 text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Authorizer: Mrs. Folake Balogun
                    </span>
                  </div>
                </div>

                {/* 3. Dispatch Status */}
                <div className="flex flex-col gap-2">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Real-time Node Dispatch Status</span>
                  <div className="flex flex-col gap-2">
                    {/* WhatsApp */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                          </svg>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-gray-900">WhatsApp Direct Dispatch</span>
                          <span className="text-xs text-gray-600">Delivered to +234 {staffData.phone} • Sent one-tap activation link</span>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        DELIVERED
                      </span>
                    </div>

                    {/* Email */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-gray-900">Institutional Email Relay</span>
                          <span className="text-xs text-gray-600">Dispatched to {staffData.email} • Welcome packet & temp key</span>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        SENT
                      </span>
                    </div>

                    {/* Biometric */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                          </svg>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-gray-900">Biometric Hardware Terminal</span>
                          <span className="text-xs text-gray-600">Gate 1 & Staff Room turnstile • Queued for biometric profile handshake</span>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        QUEUED
                      </span>
                    </div>
                  </div>
                </div>

                {/* 4. Temporary Credentials */}
                <div className="bg-gray-100 rounded-xl p-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-600">Administrator Reference Passcode</span>
                    <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded uppercase">Expires in 72h</span>
                  </div>
                  <div className="flex items-center justify-between bg-white px-4 py-3 rounded-lg mt-1 shadow-sm">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                      </svg>
                      <span className="font-mono text-lg font-bold tracking-wider text-gray-900 select-all">{staffData.passcode}</span>
                    </div>
                    <button
                      className="flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-blue-600 text-xs font-bold transition-all active:scale-95"
                      onClick={handleCopyPasscode}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {copyIcon === 'check' ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        )}
                      </svg>
                      <span>{copyLabel}</span>
                    </button>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Staff will be prompted to set a permanent password and link their WhatsApp 2FA on first login.
                  </p>
                </div>

                {/* 5. Action Buttons */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-2">
                  <div className="flex items-center gap-2">
                    <button
                      className="px-4 py-2.5 rounded-lg bg-gray-100 text-gray-900 text-sm font-bold hover:bg-gray-200 transition-all flex items-center gap-2"
                      onClick={() => navigate('/staff-onboarding')}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      <span>Onboard Another Staff</span>
                    </button>
                  </div>
                  <button
                    className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 hover:shadow-md transition-all active:scale-95 flex items-center gap-2"
                    onClick={() => navigate('/dashboard')}
                  >
                    <span>Done & Return to Directory</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
