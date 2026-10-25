// ============================================================================
// UPDATE SCHOOL PAGE - Edit School/Campus Details
// ============================================================================
// Comprehensive form for tenant admins to update school information,
// leadership, capacity, and manage school lifecycle

import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '@/store'
import toast from 'react-hot-toast'

// ============================================================================
// COMPONENT
// ============================================================================

export default function UpdateSchoolPage() {
  const navigate = useNavigate()
  const { schoolId } = useParams()
  const { user } = useAuth()

  // Form state
  const [schoolName, setSchoolName] = useState('Crown Jewel High School – Lekki Campus')
  const [educationalLevel, setEducationalLevel] = useState('Secondary School (JSS1 – SS3, WAEC/NERDC & Cambridge IGCSE)')
  const [physicalAddress, setPhysicalAddress] = useState('Plot 8 Block B, Admiralty Way, Lekki Phase 1, Lagos')
  const [stateLga, setStateLga] = useState('Lagos State • Eti-Osa LGA')
  const [officialEmail, setOfficialEmail] = useState('lekki@crownjewel-edu.ng')
  const [phoneNumber, setPhoneNumber] = useState('+234 802 334 5678')
  const [capacity, setCapacity] = useState(600)
  const [isSaving, setIsSaving] = useState(false)

  // School data
  const campusCode = 'CJET-LEK'
  const currentEnrolled = 520
  const utilizationPercent = ((currentEnrolled / capacity) * 100).toFixed(1)
  const remainingSeats = capacity - currentEnrolled

  const handleSave = async () => {
    setIsSaving(true)

    // Simulate save operation
    await new Promise(resolve => setTimeout(resolve, 700))

    setIsSaving(false)
    toast.success('Campus Updated - Lekki Campus details synced with GovCloud')
  }

  const handleDeactivate = () => {
    if (confirm('Are you sure you want to temporarily deactivate this school? Teachers and parents will not be able to log in.')) {
      toast.success('School deactivated successfully')
    }
  }

  const handleDelete = () => {
    if (confirm('This action is IRREVERSIBLE. All 520 active students must be transferred out first. Are you absolutely sure?')) {
      toast.error('Cannot delete: 520 active students still enrolled')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-white shadow-sm z-50 flex flex-col justify-between">
        <div className="flex flex-col">
          {/* Logo & Tenant Info */}
          <div className="h-16 px-6 flex items-center gap-2 bg-gray-50">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-blue-600 tracking-tight leading-tight">EduManage</span>
              <span className="text-[11px] text-green-600 font-bold uppercase tracking-widest">Nigeria • GovCloud</span>
            </div>
          </div>

          {/* Tenant Badge */}
          <div className="px-4 pt-4">
            <div className="p-2 rounded-xl bg-gray-100 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-blue-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-bold text-gray-900 truncate">CJET TRUST</span>
                <span className="text-xs text-gray-600 truncate">Crown Jewel Trust</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-1 px-4 mt-4">
            <button
              onClick={() => navigate('/tenant-admin/dashboard')}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 text-sm font-medium transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
              </svg>
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => navigate('/tenant-admin/my-schools-campuses')}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-blue-100 text-blue-700 font-semibold shadow-sm transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>My Schools / Campuses</span>
            </button>
            <button
              onClick={() => navigate('/tenant-admin/staff-appointees')}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 text-sm font-medium transition-all w-full text-left"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
              </svg>
              <span>Staff & Appointees</span>
            </button>
            <a href="#" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 text-sm font-medium transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Student Directory</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 text-sm font-medium transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span>Billing & Plan Quota</span>
            </a>
            <button
              onClick={() => navigate('/tenant-admin/audit-logs')}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 text-sm font-medium transition-all w-full text-left"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Audit Logs</span>
            </button>
            <a href="#" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 text-sm font-medium transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              <span>Settings</span>
            </a>
          </nav>
        </div>

        {/* Bottom Plan Info */}
        <div class="p-4">
          <div class="p-4 rounded-xl bg-gray-50 shadow-sm flex flex-col gap-1">
            <div class="flex items-center justify-between">
              <span class="text-[11px] font-bold uppercase text-blue-600 tracking-wider">Enterprise Tier</span>
              <span class="text-[11px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">3 Active</span>
            </div>
            <div class="flex flex-col mt-1">
              <span class="text-lg font-semibold text-gray-900">1,142 <span class="text-xs text-gray-600 font-normal">/ 1,500</span></span>
              <span class="text-xs text-gray-600">Total Student Quota</span>
            </div>
            <div class="w-full bg-gray-200 h-2 rounded-full overflow-hidden mt-1">
              <div class="bg-blue-600 h-full rounded-full" style={{ width: '76.1%' }}></div>
            </div>
            <span class="text-xs text-gray-600 mt-1">Renewal: Nov 2025</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="pl-72">
        {/* Header */}
        <header className="fixed top-0 left-72 right-0 h-16 bg-white/85 backdrop-blur-xl shadow-sm z-40 flex items-center justify-between px-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-1.5 rounded-full text-green-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-[11px] font-semibold">Crown Jewel Education Trust • Proprietor</span>
            </div>
            <div className="hidden xl:flex items-center gap-2 bg-gray-50 px-4 py-1.5 rounded-lg text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input className="bg-transparent text-sm outline-none w-64 placeholder:text-gray-500" placeholder="Search schools, principals, reg numbers..." type="text" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-green-100 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
              <svg className="w-4 h-4 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-[11px] font-bold text-green-700">Online & Synced</span>
            </div>

            <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-all relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="flex items-center gap-2 pl-2">
              <div className="flex flex-col text-right hidden sm:flex">
                <span className="text-sm font-semibold text-gray-900 leading-tight">Dr. Aliyu Mohammed</span>
                <span className="text-xs text-gray-600 leading-none">Lead Proprietor</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="pt-16 bg-white px-10 pb-10 min-h-screen">
          {/* Ambient Glow */}
          <div className="relative w-full">
            <div className="absolute -top-12 right-12 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
            <div className="absolute top-80 left-10 w-80 h-80 bg-green-500/5 rounded-full blur-3xl pointer-events-none -z-10"></div>

            {/* Breadcrumb & Page Header */}
            <div className="flex flex-col gap-2 pt-4 pb-6">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-gray-600">
                <button
                  onClick={() => navigate('/tenant-admin/my-schools-campuses')}
                  className="hover:text-blue-600 transition-colors flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span>My Schools & Campuses</span>
                </button>
                <span className="text-gray-400">/</span>
                <span className="text-gray-900 font-medium">Crown Jewel High School – Lekki</span>
                <span className="text-gray-400">/</span>
                <span className="text-blue-600 font-semibold">Update Details</span>
              </nav>

              {/* Main Action Bar */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mt-1">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => navigate('/tenant-admin/my-schools-campuses')}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-blue-600 transition-colors py-1 px-2 -ml-2 rounded-lg hover:bg-gray-100"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      <span>Back to Schools</span>
                    </button>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-[11px] font-bold shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
                      Active Campus
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gray-100 text-blue-600 text-[11px] font-bold">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      GovCloud Synced
                    </span>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight mt-1">
                    Update School: <span className="text-blue-600">Crown Jewel High School – Lekki</span>
                  </h1>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 self-start lg:self-center">
                  <button
                    onClick={() => navigate('/tenant-admin/my-schools-campuses')}
                    className="px-4 py-2.5 rounded-xl bg-white text-gray-900 text-sm font-semibold shadow-sm hover:bg-gray-50 transition-all flex items-center gap-1.5"
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow-md hover:bg-blue-700 transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSaving ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* 2-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-2">
              {/* MAIN COLUMN: Left 8 cols */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                {/* CARD 1: School Information & Location */}
                <div className="p-6 rounded-xl bg-white shadow-sm border border-gray-100 flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-blue-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <h2 className="text-lg font-semibold text-gray-900 leading-tight">School Information & Location</h2>
                        <span className="text-xs text-gray-600">Institutional identifiers, accredited tier, and geo-coordinates</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wider bg-gray-100 px-2.5 py-1 rounded-md">Step 01</span>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {/* School Name */}
                    <div className="md:col-span-2 flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-gray-900 flex items-center justify-between">
                        <span>School Display Name</span>
                        <span className="text-blue-600 text-sm">Official Legal Name</span>
                      </label>
                      <div className="flex items-center bg-gray-50 px-4 py-2.5 rounded-xl focus-within:bg-white focus-within:shadow-md transition-all">
                        <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <input
                          className="w-full bg-transparent text-sm text-gray-900 outline-none"
                          type="text"
                          value={schoolName}
                          onChange={(e) => setSchoolName(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Campus Code (Read Only) */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-gray-900 flex items-center justify-between">
                        <span>Campus Code</span>
                        <span className="text-[11px] font-bold uppercase text-green-600">Organization Identifier</span>
                      </label>
                      <div className="flex items-center bg-gray-100 px-4 py-2.5 rounded-xl">
                        <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        <input
                          className="w-full bg-transparent text-sm font-semibold text-gray-900 cursor-not-allowed outline-none font-mono"
                          readOnly
                          type="text"
                          value={campusCode}
                        />
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                    </div>

                    {/* Educational Level */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-gray-900">Category / Educational Level</label>
                      <div className="flex items-center bg-gray-50 px-4 py-2.5 rounded-xl focus-within:bg-white focus-within:shadow-md transition-all">
                        <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <input
                          className="w-full bg-transparent text-sm text-gray-900 outline-none"
                          type="text"
                          value={educationalLevel}
                          onChange={(e) => setEducationalLevel(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Physical Address */}
                    <div className="md:col-span-2 flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-gray-900">Campus Physical Address</label>
                      <div className="flex items-center bg-gray-50 px-4 py-2.5 rounded-xl focus-within:bg-white focus-within:shadow-md transition-all">
                        <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <input
                          className="w-full bg-transparent text-sm text-gray-900 outline-none"
                          type="text"
                          value={physicalAddress}
                          onChange={(e) => setPhysicalAddress(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* State & LGA */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-gray-900">State & Local Government Area (LGA)</label>
                      <div className="flex items-center bg-gray-50 px-4 py-2.5 rounded-xl focus-within:bg-white focus-within:shadow-md transition-all">
                        <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        <input
                          className="w-full bg-transparent text-sm text-gray-900 outline-none"
                          type="text"
                          value={stateLga}
                          onChange={(e) => setStateLga(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Official Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-gray-900">Official Administrative Email</label>
                      <div className="flex items-center bg-gray-50 px-4 py-2.5 rounded-xl focus-within:bg-white focus-within:shadow-md transition-all">
                        <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <input
                          className="w-full bg-transparent text-sm text-gray-900 outline-none"
                          type="email"
                          value={officialEmail}
                          onChange={(e) => setOfficialEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div className="md:col-span-2 flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-gray-900">Desk Reception & Emergency Dispatch Phone</label>
                      <div className="flex items-center bg-gray-50 px-4 py-2.5 rounded-xl focus-within:bg-white focus-within:shadow-md transition-all">
                        <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <input
                          className="w-full bg-transparent text-sm text-gray-900 outline-none"
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* CARD 2: Appointed School Head */}
                <div className="p-6 rounded-xl bg-white shadow-sm border border-gray-100 flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-700">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <h2 className="text-lg font-semibold text-gray-900 leading-tight">Appointed School Head (Leadership)</h2>
                        <span className="text-xs text-gray-600">Designated Principal with high-level sign-off authorities</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold uppercase text-green-700 bg-green-100 px-2 py-1 rounded-full">Principal Level</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden shadow-sm">
                          <img
                            className="w-full h-full object-cover"
                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop"
                            alt="Mrs. Folake Balogun"
                          />
                        </div>
                        <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-600 ring-2 ring-white" title="Active Account"></span>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold text-gray-900">Mrs. Folake Balogun</span>
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <div className="flex flex-col text-gray-600 text-sm mt-0.5">
                          <span className="flex items-center gap-1.5">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            folake.balogun@crownjewel-edu.ng
                          </span>
                          <span className="flex items-center gap-1.5">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            +234 802 334 5678
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                      <button className="px-4 py-2 rounded-xl bg-white text-gray-900 hover:bg-gray-100 text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-1.5">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                        <span>Change Principal / Reassign</span>
                      </button>
                      <button className="px-4 py-2 rounded-xl bg-gray-100 text-gray-900 hover:bg-gray-200 text-xs font-semibold transition-all flex items-center justify-center gap-1.5">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                        <span>Reset Credentials</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* CARD 3: Capacity & Quota */}
                <div className="p-6 rounded-xl bg-white shadow-sm border border-gray-100 flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <h2 className="text-lg font-semibold text-gray-900 leading-tight">Capacity & Quota Management</h2>
                        <span className="text-xs text-gray-600">Allocated seat allowances within CJET Trust enterprise cloud</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600 text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Governed by Enterprise License</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-gray-50 flex flex-col justify-between">
                      <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Current Enrolled</span>
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-4xl font-bold text-blue-600">{currentEnrolled}</span>
                        <span className="text-sm text-gray-600">Students</span>
                      </div>
                      <span className="text-sm text-green-600 font-medium mt-1 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        +32 this Term
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-gray-50 flex flex-col justify-between">
                      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Allocated Capacity Cap</label>
                      <div className="flex items-center gap-2 mt-2">
                        <input
                          className="w-28 bg-white px-3 py-1.5 rounded-lg text-2xl font-bold text-gray-900 outline-none shadow-sm focus:ring-2 focus:ring-blue-600"
                          type="number"
                          min={currentEnrolled}
                          max={1500}
                          value={capacity}
                          onChange={(e) => setCapacity(parseInt(e.target.value) || 600)}
                        />
                        <span className="text-sm text-gray-600">Seats max</span>
                      </div>
                      <span className="text-sm text-gray-600 mt-1">Adjustable by Trust Board</span>
                    </div>

                    <div className="p-4 rounded-xl bg-gray-50 flex flex-col justify-between">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Seat Utilization</span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">{utilizationPercent}% Full</span>
                      </div>
                      <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden mt-3">
                        <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{ width: `${utilizationPercent}%` }}></div>
                      </div>
                      <span className="text-sm text-gray-600 mt-2">{remainingSeats} Remaining seats before cap</span>
                    </div>
                  </div>
                </div>

                {/* CARD 4: Danger Zone */}
                <div className="p-6 rounded-xl bg-red-50 shadow-sm flex flex-col gap-4">
                  <div className="flex items-center gap-3 pb-2">
                    <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-sm">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <h2 className="text-lg font-bold text-red-600 leading-tight">Danger Zone: School Lifecycle & Deactivation</h2>
                      <span className="text-xs text-gray-600">Critical state operations impacting student admissions and portal access</span>
                    </div>
                  </div>

                  {/* Deactivate School */}
                  <div className="p-4 rounded-xl bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-col max-w-xl">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-900">Deactivate School Branch</span>
                        <span className="text-[11px] font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded uppercase">Temporary</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                        Temporarily suspend academic operations and portal access for this school branch. Teachers and parents will not be able to log in, but all academic records, exam results, and historic transcripts are fully preserved.
                      </p>
                    </div>
                    <button
                      onClick={handleDeactivate}
                      className="px-4 py-2.5 rounded-xl bg-gray-100 text-red-600 hover:bg-red-600 hover:text-white text-sm font-semibold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap shadow-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Deactivate School</span>
                    </button>
                  </div>

                  {/* Delete School */}
                  <div className="p-4 rounded-xl bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-col max-w-xl">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-red-600">Archive & Delete Campus Record</span>
                        <span className="text-[11px] font-bold bg-red-600 text-white px-2 py-0.5 rounded uppercase">Irreversible</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                        Permanently delete this campus branch from CJET Trust database. Requires all {currentEnrolled} active students to be successfully transferred out or graduated before initiation.
                      </p>
                    </div>
                    <button
                      onClick={handleDelete}
                      className="px-4 py-2.5 rounded-xl bg-red-600 text-white hover:bg-red-700 text-sm font-semibold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span>Delete School Record</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT RAIL: Right 4 cols */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                {/* Campus Snapshot Card */}
                <div className="rounded-xl bg-white shadow-sm overflow-hidden flex flex-col border border-gray-100">
                  <div className="relative h-44 w-full">
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop')" }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent flex items-end p-4">
                      <div className="flex flex-col text-white">
                        <span className="text-[11px] font-bold uppercase text-green-300 tracking-wider">Campus Snapshot</span>
                        <span className="text-lg font-bold">Lekki Campus Quick Stats</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 flex flex-col gap-4">
                    <div className="grid grid-cols-3 gap-2 text-center py-2 bg-gray-50 rounded-xl">
                      <div className="flex flex-col">
                        <span className="text-lg font-bold text-blue-600">520</span>
                        <span className="text-xs text-gray-600">Students</span>
                      </div>
                      <div className="flex flex-col border-x border-gray-200">
                        <span className="text-lg font-bold text-gray-900">38</span>
                        <span className="text-xs text-gray-600">Staff</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-lg font-bold text-gray-900">18</span>
                        <span className="text-xs text-gray-600">Classrooms</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between text-sm py-1.5 px-2 rounded-lg bg-gray-50">
                        <span className="text-gray-600 flex items-center gap-1.5">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Academic Term:
                        </span>
                        <span className="font-semibold text-gray-900">Second Term (Lent)</span>
                      </div>
                      <div className="flex items-center justify-between text-sm py-1.5 px-2 rounded-lg bg-gray-50">
                        <span className="text-gray-600 flex items-center gap-1.5">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Last Cloud Sync:
                        </span>
                        <span className="font-medium text-green-600">2 mins ago (100%)</span>
                      </div>
                    </div>

                    <a
                      href="#"
                      className="w-full py-3 px-4 rounded-xl bg-blue-600 text-white text-sm font-semibold flex items-center justify-between hover:bg-blue-700 transition-all shadow-sm"
                    >
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        <span>Enter School Portal as Admin</span>
                      </span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Inherited Settings Summary */}
                <div className="p-6 rounded-xl bg-white shadow-sm border border-gray-100 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                      </svg>
                      <h3 className="text-lg font-semibold text-gray-900">Inherited Settings</h3>
                    </div>
                    <span className="text-[11px] font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded uppercase">Trust Wide</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    These configurations are centrally mandated across CJET Trust branches and can only be amended at Enterprise Board level.
                  </p>

                  <div className="flex flex-col gap-2 pt-2">
                    <div className="p-2 rounded-xl bg-gray-50 flex items-start gap-2">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold text-gray-900">Standard NERDC 9-Tier Grading</span>
                          <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-600 mt-0.5">A1 to F9 grading scale applied to all secondary reports.</span>
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-gray-50 flex items-start gap-2">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-green-600 shrink-0 mt-0.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold text-gray-900">Term Harmonization</span>
                          <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-600 mt-0.5">Coordinated holiday and mid-term assessment timetables.</span>
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-gray-50 flex items-start gap-2">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-amber-600 shrink-0 mt-0.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold text-gray-900">Main Revenue Account</span>
                          <span className="text-[11px] font-bold bg-amber-100 text-amber-700 px-1.5 py-0.2 rounded">Locked</span>
                        </div>
                        <span className="text-sm text-gray-600 mt-0.5">Zenith Bank PLC (Trust Central Treasury - Lagos)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Audit Signature */}
                <div className="p-4 rounded-xl bg-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-sm text-gray-600">Audit Signature:</span>
                  </div>
                  <span className="font-mono text-sm font-semibold text-blue-600 truncate max-w-[160px]">
                    CJET-AUD-2025-88F4
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
