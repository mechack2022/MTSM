// ============================================================================
// GENERAL SETTINGS PAGE - School Defaults & Trust-Wide Policies
// ============================================================================
// Configure foundational policies, calendars, and academic parameters
// automatically inherited by all campuses

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/store'
import toast from 'react-hot-toast'

export default function GeneralSettingsPage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  // Form state
  const [academicSession, setAcademicSession] = useState('2025-2026')
  const [currentTerm, setCurrentTerm] = useState('second')
  const [termHarmonization, setTermHarmonization] = useState(true)
  const [morningAssembly, setMorningAssembly] = useState('07:45 AM')
  const [lateGateClosure, setLateGateClosure] = useState('08:15 AM')
  const [dailyDismissal, setDailyDismissal] = useState('02:30 PM (Pri) / 03:30 PM (Sec)')
  const [attendanceMode, setAttendanceMode] = useState('single')
  const [smsAlert, setSmsAlert] = useState(true)
  const [paymentGracePeriod, setPaymentGracePeriod] = useState('14')
  const [ancillarySubAccounts, setAncillarySubAccounts] = useState(true)
  const [trustMotto, setTrustMotto] = useState('Excellence, Integrity & Leadership')
  const [autoVerificationSeal, setAutoVerificationSeal] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)

    // Simulate save operation
    await new Promise(resolve => setTimeout(resolve, 700))

    toast.success('Settings saved and propagated to all 3 campuses!')
    setIsSaving(false)
  }

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all settings to defaults? This action cannot be undone.')) {
      toast.success('Settings reset to defaults')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-72 bg-white shadow-sm z-50 flex flex-col justify-between">
        <div className="flex flex-col flex-1 min-h-0">
          {/* Header */}
          <div className="h-16 px-6 flex items-center gap-2 bg-white">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm flex-shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-lg font-semibold text-gray-900 truncate tracking-tight">EduManage</span>
              <span className="text-[9px] text-gray-600 truncate uppercase tracking-widest font-bold">Nigeria • Enterprise</span>
            </div>
          </div>

          {/* Tenant Badge */}
          <div className="px-4 py-3">
            <div className="px-3 py-2 rounded-lg bg-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="text-xs font-semibold text-gray-900 truncate">CJET TRUST</span>
              </div>
              <span className="px-1.5 py-0.5 rounded text-[9px] bg-green-100 text-green-700 flex-shrink-0 font-bold">Proprietor</span>
            </div>
          </div>

          <div className="px-4 pt-2 pb-2">
            <span className="px-3 text-[9px] uppercase text-gray-600 font-bold tracking-wider">Proprietor Console</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
            <button
              onClick={() => navigate('/tenant-admin/dashboard')}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all w-full text-left"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
              </svg>
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => navigate('/tenant-admin/my-schools-campuses')}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all w-full text-left"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>My Schools / Campuses</span>
            </button>
            <button
              onClick={() => navigate('/tenant-admin/staff-appointees')}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all w-full text-left"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
              </svg>
              <span>Staff & Appointees</span>
            </button>
            <a href="#" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Student Directory</span>
            </a>
            <a href="#" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span>Billing & Plan Quota</span>
            </a>
            <button
              onClick={() => navigate('/tenant-admin/audit-logs')}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all w-full text-left"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Audit Logs</span>
            </button>
            {/* Active: Settings */}
            <button className="flex items-center gap-2 px-3 py-2.5 rounded-lg transition-all bg-blue-600 text-white font-semibold shadow-sm w-full text-left text-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Bottom Plan Info */}
        <div className="p-4">
          <div className="p-4 rounded-xl bg-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-900 truncate">Standard Enterprise</span>
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="flex items-center justify-between text-gray-600 text-xs mb-2.5">
              <span>3 Campuses Active</span>
              <span>1,500 Seats</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2 overflow-hidden">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '68%' }}></div>
            </div>
            <div className="flex items-center justify-between text-[9px] text-gray-600 font-bold">
              <span>1,020 / 1,500 Quota</span>
              <span className="text-blue-600">68%</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="pl-72 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="fixed top-0 left-72 right-0 h-16 bg-white/80 backdrop-blur-xl shadow-sm z-40 px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full">
              <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                placeholder="Search settings, policies, campuses..."
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-[9px] font-bold">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Sync: Online</span>
            </div>

            <button className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors" type="button">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"></span>
            </button>

            <div className="h-6 w-px bg-gray-300 hidden sm:block"></div>

            <div className="flex items-center gap-2 pl-2">
              <div className="text-right hidden md:block">
                <div className="text-xs font-semibold text-gray-900 leading-tight">Dr. Aliyu Mohammed</div>
                <div className="text-xs text-gray-600 leading-tight">Lead Proprietor</div>
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 pt-16 bg-gray-50 px-6 py-4 w-full">
          <div className="flex flex-col w-full pb-16">
            {/* Top Breadcrumb & Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <span className="hover:text-blue-600 cursor-pointer transition-colors">Settings</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-blue-600 font-semibold">General & School Defaults</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                  General School Settings & Inherited Defaults
                </h1>
                <p className="text-sm text-gray-600 max-w-2xl">
                  Configure foundational policies, calendars, and academic parameters automatically inherited by all campuses under Crown Jewel Education Trust (CJET).
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 self-start lg:self-center flex-shrink-0">
                <button
                  onClick={handleReset}
                  className="px-4 py-2.5 rounded-lg bg-white text-gray-900 hover:bg-gray-50 text-sm font-medium transition-all flex items-center gap-1.5 shadow-sm active:scale-95 border border-gray-200"
                  type="button"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Reset to Defaults</span>
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm font-semibold transition-all flex items-center gap-2 shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50"
                  type="button"
                >
                  {isSaving ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span>Saving Defaults...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span>Save General Settings</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Inheritance Banner */}
            <div className="mb-6 p-4 rounded-xl bg-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden">
              <div className="flex items-start sm:items-center gap-4 z-10">
                <div className="w-10 h-10 rounded-xl bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900">Trust Inheritance Active</span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] bg-green-100 text-green-700 font-semibold">3 Campuses Linked</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Changes propagate immediately to <span className="font-semibold text-gray-900">Crown Jewel High School (Lekki)</span>, <span className="font-semibold text-gray-900">Crown Jewel Prep (Ikeja)</span>, and <span className="font-semibold text-gray-900">Crown Jewel Academy (Abuja FCT)</span>. Overrides are highlighted.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 z-10 self-end sm:self-center">
                <span className="text-[9px] text-green-700 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span> Auto-Sync Enabled
                </span>
              </div>
            </div>

            {/* Main 2-Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Settings Column (8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                {/* Section Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-medium whitespace-nowrap shadow-sm" type="button">
                    All Defaults
                  </button>
                  <a className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:text-gray-900 text-xs font-medium whitespace-nowrap transition-colors" href="#card-academic">
                    Academic Year & Calendar
                  </a>
                  <a className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:text-gray-900 text-xs font-medium whitespace-nowrap transition-colors" href="#card-grading">
                    Grading & Assessment
                  </a>
                  <a className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:text-gray-900 text-xs font-medium whitespace-nowrap transition-colors" href="#card-hours">
                    School Hours
                  </a>
                  <a className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:text-gray-900 text-xs font-medium whitespace-nowrap transition-colors" href="#card-finance">
                    Financials
                  </a>
                  <a className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:text-gray-900 text-xs font-medium whitespace-nowrap transition-colors" href="#card-branding">
                    Brand & Reports
                  </a>
                </div>

                {/* Card 1: Academic Year & Term Defaults */}
                <section className="p-6 rounded-xl bg-white shadow-sm space-y-4" id="card-academic">
                  <div className="flex items-center justify-between pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-blue-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">Academic Year & Term Defaults</h2>
                        <p className="text-xs text-gray-600">Set centralized session timelines and standard holiday dates.</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[9px] bg-blue-100 text-blue-700 uppercase tracking-wider font-bold">Default Core</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Session dropdown */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-900 flex items-center justify-between">
                        <span>Active Academic Session</span>
                        <span className="text-gray-600 font-normal text-xs">Trust-Wide</span>
                      </label>
                      <div className="relative">
                        <select
                          value={academicSession}
                          onChange={(e) => setAcademicSession(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-lg bg-gray-50 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 appearance-none transition-all cursor-pointer"
                        >
                          <option value="2025-2026">2025/2026 Academic Session</option>
                          <option value="2026-2027">2026/2027 Academic Session (Upcoming)</option>
                          <option value="2024-2025">2024/2025 Academic Session (Archived)</option>
                        </select>
                        <svg className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    {/* Current Term */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-900 flex items-center justify-between">
                        <span>Current Term</span>
                        <span className="text-green-600 font-semibold text-[9px]">Active Phase</span>
                      </label>
                      <div className="relative">
                        <select
                          value={currentTerm}
                          onChange={(e) => setCurrentTerm(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-lg bg-gray-50 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 appearance-none transition-all cursor-pointer"
                        >
                          <option value="first">First Term (Michaelmas Term)</option>
                          <option value="second">Second Term (Lent Term)</option>
                          <option value="third">Third Term (Trinity Term)</option>
                        </select>
                        <svg className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Harmonization switch */}
                  <div className="p-4 rounded-lg bg-gray-100 flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <span className="text-xs font-semibold text-gray-900 block">Term Harmonization Policy</span>
                      <p className="text-xs text-gray-600">Enforce uniform term opening, mid-term breaks, and vacation dates across all branch schools.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={termHarmonization}
                        onChange={(e) => setTermHarmonization(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {/* Term Dates Schedule */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    <div className="p-3 rounded-lg bg-gray-100 space-y-1">
                      <span className="text-[9px] text-gray-600 uppercase tracking-wider block font-bold">Term Resumption</span>
                      <div className="flex items-center gap-1.5 text-sm text-gray-900 font-semibold">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>06 Jan 2026</span>
                      </div>
                      <span className="text-xs text-gray-600 block">All Campuses</span>
                    </div>
                    <div className="p-3 rounded-lg bg-gray-100 space-y-1">
                      <span className="text-[9px] text-gray-600 uppercase tracking-wider block font-bold">Mid-Term Break</span>
                      <div className="flex items-center gap-1.5 text-sm text-gray-900 font-semibold">
                        <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span>19 Feb 2026</span>
                      </div>
                      <span className="text-xs text-amber-700 block font-semibold">3 Days Duration</span>
                    </div>
                    <div className="p-3 rounded-lg bg-gray-100 space-y-1">
                      <span className="text-[9px] text-gray-600 uppercase tracking-wider block font-bold">Vacation & Speech Day</span>
                      <div className="flex items-center gap-1.5 text-sm text-gray-900 font-semibold">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        <span>03 Apr 2026</span>
                      </div>
                      <span className="text-xs text-gray-600 block">Term Closes</span>
                    </div>
                  </div>
                </section>

                {/* Card 2: Standard Assessment & Grading Scheme */}
                <section className="p-6 rounded-xl bg-white shadow-sm space-y-4" id="card-grading">
                  <div className="flex items-center justify-between pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-blue-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">Standard Assessment & Grading Scheme</h2>
                        <p className="text-xs text-gray-600">NERDC 9-tier grading and continuous assessment ratios for WAEC compliance.</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[9px] bg-amber-100 text-amber-700 uppercase tracking-wider font-bold">NERDC Aligned</span>
                  </div>

                  {/* Grading Matrix */}
                  <div className="rounded-lg border border-gray-200 overflow-hidden">
                    <div className="grid grid-cols-9 bg-gray-100 text-[9px] font-bold text-gray-700 uppercase tracking-wider">
                      <div className="p-2 border-r border-gray-200 text-center">A1</div>
                      <div className="p-2 border-r border-gray-200 text-center">B2</div>
                      <div className="p-2 border-r border-gray-200 text-center">B3</div>
                      <div className="p-2 border-r border-gray-200 text-center">C4</div>
                      <div className="p-2 border-r border-gray-200 text-center">C5</div>
                      <div className="p-2 border-r border-gray-200 text-center">C6</div>
                      <div className="p-2 border-r border-gray-200 text-center">D7</div>
                      <div className="p-2 border-r border-gray-200 text-center">E8</div>
                      <div className="p-2 text-center">F9</div>
                    </div>
                    <div className="grid grid-cols-9 text-xs font-semibold text-gray-900">
                      <div className="p-2 border-r border-gray-200 text-center bg-green-50">75+</div>
                      <div className="p-2 border-r border-gray-200 text-center bg-green-50">70-74</div>
                      <div className="p-2 border-r border-gray-200 text-center bg-green-50">65-69</div>
                      <div className="p-2 border-r border-gray-200 text-center bg-blue-50">60-64</div>
                      <div className="p-2 border-r border-gray-200 text-center bg-blue-50">55-59</div>
                      <div className="p-2 border-r border-gray-200 text-center bg-blue-50">50-54</div>
                      <div className="p-2 border-r border-gray-200 text-center bg-amber-50">45-49</div>
                      <div className="p-2 border-r border-gray-200 text-center bg-red-50">40-44</div>
                      <div className="p-2 text-center bg-red-50">0-39</div>
                    </div>
                  </div>

                  {/* CA Weighting */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-blue-900">Continuous Assessment (CA)</span>
                        <span className="text-xl font-bold text-blue-600">40%</span>
                      </div>
                      <p className="text-xs text-blue-700">Tests, quizzes, classwork & assignments</p>
                    </div>
                    <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-green-900">End-of-Term Examination</span>
                        <span className="text-xl font-bold text-green-600">60%</span>
                      </div>
                      <p className="text-xs text-green-700">Final comprehensive examination</p>
                    </div>
                  </div>
                </section>

                {/* Card 3: School Hours & Attendance */}
                <section className="p-6 rounded-xl bg-white shadow-sm space-y-4" id="card-hours">
                  <div className="flex items-center justify-between pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-blue-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">Attendance & School Day Timings</h2>
                        <p className="text-xs text-gray-600">Synchronized school hours, assembly and gate closure policy across all campuses.</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[9px] bg-blue-100 text-blue-700 uppercase tracking-wider font-bold">Default Core</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-900">Morning Assembly Start</label>
                      <input
                        type="text"
                        value={morningAssembly}
                        onChange={(e) => setMorningAssembly(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg bg-gray-50 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-900">Late Gate Closure</label>
                      <input
                        type="text"
                        value={lateGateClosure}
                        onChange={(e) => setLateGateClosure(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg bg-gray-50 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-900">Daily Dismissal Time</label>
                      <input
                        type="text"
                        value={dailyDismissal}
                        onChange={(e) => setDailyDismissal(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg bg-gray-50 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
                      />
                    </div>
                  </div>

                  {/* Attendance Mode */}
                  <div className="p-4 rounded-lg bg-gray-100 space-y-3">
                    <span className="text-xs font-semibold text-gray-900 block">Attendance Capture Mode</span>
                    <div className="flex gap-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="attendanceMode"
                          value="single"
                          checked={attendanceMode === 'single'}
                          onChange={(e) => setAttendanceMode(e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-900">Single Daily Mark</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="attendanceMode"
                          value="multi"
                          checked={attendanceMode === 'multi'}
                          onChange={(e) => setAttendanceMode(e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-900">Per-Period / Per-Subject</span>
                      </label>
                    </div>
                  </div>

                  {/* SMS Alert Toggle */}
                  <div className="p-4 rounded-lg bg-gray-100 flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <span className="text-xs font-semibold text-gray-900 block">Late Arrival / Absence SMS Alert</span>
                      <p className="text-xs text-gray-600">Automatically notify parents when a learner is marked absent or arrives late.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={smsAlert}
                        onChange={(e) => setSmsAlert(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </section>

                {/* Card 4: Currency, Invoicing & Tuition */}
                <section className="p-6 rounded-xl bg-white shadow-sm space-y-4" id="card-finance">
                  <div className="flex items-center justify-between pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-blue-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">Currency, Invoicing & Tuition Defaults</h2>
                        <p className="text-xs text-gray-600">Standard financial parameters and Central Bank of Nigeria (CBN) compliance.</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[9px] bg-green-100 text-green-700 uppercase tracking-wider font-bold">CBN Aligned</span>
                  </div>

                  {/* Currency Display */}
                  <div className="p-4 rounded-lg bg-gray-100 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-green-600 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                      ₦
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-gray-900 block">Nigerian Naira (NGN)</span>
                      <p className="text-xs text-gray-600">Official currency for all fee invoices, receipts, and financial reports</p>
                    </div>
                  </div>

                  {/* Payment Grace Period */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-900 flex items-center justify-between">
                      <span>Payment Grace Period (Days After Term Resumption)</span>
                      <span className="text-blue-600 font-bold">{paymentGracePeriod} Days</span>
                    </label>
                    <input
                      type="range"
                      min="7"
                      max="30"
                      value={paymentGracePeriod}
                      onChange={(e) => setPaymentGracePeriod(e.target.value)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-[9px] text-gray-600 font-medium">
                      <span>7 Days</span>
                      <span>30 Days</span>
                    </div>
                  </div>

                  {/* Ancillary Sub-Accounts */}
                  <div className="p-4 rounded-lg bg-gray-100 flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <span className="text-xs font-semibold text-gray-900 block">Ancillary Sub-Account Routing</span>
                      <p className="text-xs text-gray-600">Allow separate bank routing for Bus Fees, Meal Plans, Excursions & Extra Coaching</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={ancillarySubAccounts}
                        onChange={(e) => setAncillarySubAccounts(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {/* Bank Account Display */}
                  <div className="rounded-lg border border-gray-200 p-4 space-y-2">
                    <span className="text-[9px] uppercase text-gray-600 font-bold tracking-wider block">Trust Bank Account (Primary)</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-900">Account Number:</span>
                      <span className="text-sm text-gray-700 font-mono">0123456789</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-900">Bank:</span>
                      <span className="text-sm text-gray-700">First Bank of Nigeria Plc</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-900">Account Name:</span>
                      <span className="text-sm text-gray-700">Crown Jewel Education Trust</span>
                    </div>
                  </div>
                </section>

                {/* Card 5: Report Card Branding */}
                <section className="p-6 rounded-xl bg-white shadow-sm space-y-4" id="card-branding">
                  <div className="flex items-center justify-between pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-blue-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">Standard Report Card Branding & Seal</h2>
                        <p className="text-xs text-gray-600">Trust-wide branding elements, crest, and proprietor signature for authenticity.</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[9px] bg-purple-100 text-purple-700 uppercase tracking-wider font-bold">Trust Identity</span>
                  </div>

                  {/* Trust Crest Upload */}
                  <div className="p-4 rounded-lg border border-dashed border-gray-300 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-semibold text-gray-900 block">Trust Crest / Logo</span>
                      <p className="text-xs text-gray-600 mb-2">Upload official crest for report card headers (PNG/SVG, max 2MB)</p>
                      <button className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-colors" type="button">
                        Upload New Crest
                      </button>
                    </div>
                  </div>

                  {/* Trust Motto */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-900">Official Trust Motto</label>
                    <input
                      type="text"
                      value={trustMotto}
                      onChange={(e) => setTrustMotto(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg bg-gray-50 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
                      placeholder="Enter your trust motto"
                    />
                    <p className="text-xs text-gray-600">Displayed on all report cards, transcripts and certificates</p>
                  </div>

                  {/* Proprietor Signature */}
                  <div className="p-4 rounded-lg border border-dashed border-gray-300 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-semibold text-gray-900 block">Proprietor Signature</span>
                      <p className="text-xs text-gray-600 mb-2">Digital signature for report card authentication (PNG, transparent background)</p>
                      <button className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-colors" type="button">
                        Upload Signature
                      </button>
                    </div>
                  </div>

                  {/* Auto Verification Seal */}
                  <div className="p-4 rounded-lg bg-gray-100 flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <span className="text-xs font-semibold text-gray-900 block">Automated Verification QR Code / Seal</span>
                      <p className="text-xs text-gray-600">Generate tamper-proof QR code on each report card for online verification</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={autoVerificationSeal}
                        onChange={(e) => setAutoVerificationSeal(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </section>

              </div>

              {/* Right Status & Quick Actions Rail (4 cols) */}
              <aside className="lg:col-span-4 space-y-4">
                {/* Governed Campuses Status */}
                <div className="p-5 rounded-xl bg-white shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                    <span className="text-sm font-bold text-gray-900">Governed Campuses</span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] bg-green-100 text-green-700 font-bold">3 Active</span>
                  </div>

                  {/* Campus 1 */}
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0 font-bold text-xs">
                      CJ-L
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-semibold text-gray-900 block truncate">Crown Jewel High School</span>
                      <span className="text-xs text-gray-600 block truncate">Lekki Phase 1, Lagos</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      <span className="text-[9px] text-green-700 font-bold">Synced</span>
                    </div>
                  </div>

                  {/* Campus 2 */}
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded-lg bg-amber-600 text-white flex items-center justify-center flex-shrink-0 font-bold text-xs">
                      CJ-I
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-semibold text-gray-900 block truncate">Crown Jewel Prep</span>
                      <span className="text-xs text-gray-600 block truncate">Ikeja GRA, Lagos</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      <span className="text-[9px] text-green-700 font-bold">Synced</span>
                    </div>
                  </div>

                  {/* Campus 3 */}
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded-lg bg-green-600 text-white flex items-center justify-center flex-shrink-0 font-bold text-xs">
                      CJ-A
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-semibold text-gray-900 block truncate">Crown Jewel Academy</span>
                      <span className="text-xs text-gray-600 block truncate">Abuja FCT</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      <span className="text-[9px] text-green-700 font-bold">Synced</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button className="w-full px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-900 text-xs font-medium transition-colors flex items-center justify-center gap-1.5" type="button">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>View All Campus Details</span>
                    </button>
                  </div>
                </div>

                {/* Quick Policy Actions */}
                <div className="p-5 rounded-xl bg-white shadow-sm space-y-4">
                  <div className="pb-2 border-b border-gray-200">
                    <span className="text-sm font-bold text-gray-900">Quick Policy Actions</span>
                  </div>

                  <button className="w-full px-4 py-3 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-900 text-xs font-medium transition-all flex items-center gap-2 text-left" type="button">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <span className="block font-bold">Roll to Next Term</span>
                      <span className="text-blue-700">Advance academic calendar</span>
                    </div>
                  </button>

                  <button className="w-full px-4 py-3 rounded-lg bg-green-50 hover:bg-green-100 border border-green-200 text-green-900 text-xs font-medium transition-all flex items-center gap-2 text-left" type="button">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div>
                      <span className="block font-bold">Generate Report Cards</span>
                      <span className="text-green-700">Bulk print for all campuses</span>
                    </div>
                  </button>

                  <button className="w-full px-4 py-3 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-medium transition-all flex items-center gap-2 text-left" type="button">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <span className="block font-bold">Set Fee Schedule</span>
                      <span className="text-amber-700">Configure term invoices</span>
                    </div>
                  </button>

                  <button className="w-full px-4 py-3 rounded-lg bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-900 text-xs font-medium transition-all flex items-center gap-2 text-left" type="button">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <div>
                      <span className="block font-bold">Broadcast Notification</span>
                      <span className="text-purple-700">SMS/Email to all parents</span>
                    </div>
                  </button>
                </div>

                {/* Sync Status Info */}
                <div className="p-5 rounded-xl bg-gray-100 space-y-3">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-sm font-bold text-gray-900">Last Sync Status</span>
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div className="flex justify-between">
                      <span>Last successful sync:</span>
                      <span className="font-semibold text-gray-900">Today, 10:42 AM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Propagated changes:</span>
                      <span className="font-semibold text-gray-900">12 policy updates</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Next auto-sync:</span>
                      <span className="font-semibold text-blue-600">In 15 minutes</span>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
