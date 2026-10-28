// ============================================================================
// COMPOSITE CAMPUS DASHBOARD - Context-Aware Multi-Tier Navigation
// ============================================================================
// For School Directors/Admins managing All-in-One campuses with multiple
// educational tiers (Nursery, Primary, JSS, SSS)
// ============================================================================

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type TierType = 'all' | 'nursery' | 'primary' | 'jss' | 'sss'

interface TierStats {
  attendanceRate: string
  presentCount: number
  totalCount: number
  description: string
  pendingTasks: number
  taskDescription: string
}

const tierStatsData: Record<TierType, TierStats> = {
  all: {
    attendanceRate: '97.4%',
    presentCount: 898,
    totalCount: 922,
    description: 'Total pupils on campus',
    pendingTasks: 6,
    taskDescription: 'Aggregated across Nursery, Primary, and Secondary colleges',
  },
  nursery: {
    attendanceRate: '96.5%',
    presentCount: 137,
    totalCount: 142,
    description: 'Nursery toddlers present today',
    pendingTasks: 1,
    taskDescription: 'Nursery 2 Guardian biometric pick-up pass re-validation',
  },
  primary: {
    attendanceRate: '98.2%',
    presentCount: 314,
    totalCount: 320,
    description: 'Primary pupils present today',
    pendingTasks: 3,
    taskDescription: 'Primary 5 NCEE & CAS 2 SUBEB submittals pending review',
  },
  jss: {
    attendanceRate: '97.1%',
    presentCount: 238,
    totalCount: 245,
    description: 'Junior students present',
    pendingTasks: 2,
    taskDescription: 'BECE state examination mock schedules',
  },
  sss: {
    attendanceRate: '96.8%',
    presentCount: 208,
    totalCount: 215,
    description: 'Senior students present',
    pendingTasks: 4,
    taskDescription: 'WAEC practical biology laboratory timetabling check',
  },
}

export default function CompositeCampusDashboard() {
  const navigate = useNavigate()
  const [selectedTier, setSelectedTier] = useState<TierType>('primary')
  const [showDelegationToast, setShowDelegationToast] = useState(false)

  const currentStats = tierStatsData[selectedTier]

  const handleTierSwitch = (tier: TierType) => {
    setSelectedTier(tier)
  }

  const handleDelegation = () => {
    setShowDelegationToast(true)
    setTimeout(() => setShowDelegationToast(false), 4000)
  }

  const getTierBadgeClasses = () => {
    switch (selectedTier) {
      case 'nursery':
        return 'bg-green-100 text-green-800'
      case 'primary':
        return 'bg-blue-100 text-blue-800'
      case 'jss':
      case 'sss':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getScopeText = () => {
    switch (selectedTier) {
      case 'nursery':
        return 'Early Years / Nursery Division (EYFS Regs)'
      case 'primary':
        return 'Primary Basic 1-6 Division (SUBEB Accredited)'
      case 'jss':
        return 'Junior Secondary College (JSS 1-3 BECE)'
      case 'sss':
        return 'Senior Secondary College (SSS 1-3 WAEC Track)'
      default:
        return 'Unified K-12 Overview (Grace Schools Integrated)'
    }
  }

  const showNurseryPrimaryOps = selectedTier === 'all' || selectedTier === 'nursery' || selectedTier === 'primary'
  const showSecondaryOps = selectedTier === 'all' || selectedTier === 'jss' || selectedTier === 'sss'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Sidebar - Left */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-white z-50 flex flex-col justify-between shadow-sm border-r border-gray-200">
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Logo Header */}
          <div className="h-16 flex items-center gap-3 px-6 bg-gray-50/60 backdrop-blur-xl border-b border-gray-200">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-blue-600 leading-none">EduManage</span>
              <span className="text-xs uppercase text-green-700 font-bold tracking-wider mt-0.5">Nigeria SIS Enterprise</span>
            </div>
          </div>

          {/* Navigation Section Label */}
          <div className="px-6 mt-4 mb-2">
            <span className="text-xs uppercase text-gray-500 tracking-wider font-semibold">Institutional Core</span>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-3 space-y-1">
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-semibold shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-sm">Dashboard</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="text-sm">Campuses & Tiers</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-sm">Staff Directory</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="text-sm">Academic Allocations</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <span className="text-sm">Daily Attendance</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm">School Operations</span>
            </a>

            <div className="pt-4 pb-2 px-3">
              <span className="text-xs uppercase text-gray-500 tracking-wider font-semibold">System Governance</span>
            </div>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              <span className="text-sm">Settings</span>
            </a>
          </nav>
        </div>

        {/* Network Status Footer */}
        <div className="p-4 m-3 bg-gray-50 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-green-600 animate-pulse"></div>
              <div className="absolute w-4 h-4 rounded-full bg-green-600/40 -z-10"></div>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-gray-900 truncate">Lagos Edge Node #04</span>
              <span className="text-xs text-green-700 truncate flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
                Local Mesh Active
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area - Offset by sidebar */}
      <div className="pl-72">
        {/* Top Header Bar */}
        <header className="fixed top-0 left-72 right-0 h-16 bg-white/85 backdrop-blur-xl z-40 shadow-sm border-b border-gray-200">
          <div className="h-16 w-full px-6 flex items-center justify-between gap-4">
            {/* Left Section */}
            <div className="flex items-center gap-4 flex-1 max-w-2xl">
              <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-gray-50 shadow-sm text-gray-900 hover:bg-gray-100 transition-colors">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="text-sm font-semibold">Abuja Central Campus</span>
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className="hidden xl:flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 text-gray-900">
                <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-xs font-semibold">2024/2025 Academic Year • Term 1</span>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4 shrink-0">
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100/50 text-green-800 shadow-sm">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs font-bold uppercase tracking-wide">Online & Synced</span>
              </div>

              <button className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-600"></span>
              </button>

              <div className="flex items-center gap-3 pl-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="hidden lg:flex flex-col">
                  <span className="text-xs font-semibold text-gray-900 leading-tight">Dr. Amina Bello</span>
                  <span className="text-xs text-gray-600 leading-tight">District Registrar</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="w-full pt-16 bg-gray-50 min-h-screen">
          <div className="flex flex-col w-full">
            {/* Ambient Background Glow */}
            <div className="relative w-full px-6 py-6 overflow-hidden">
              <div className="absolute -top-24 -right-16 w-96 h-96 bg-blue-100/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute top-12 left-1/4 w-80 h-80 bg-green-100/15 rounded-full blur-3xl pointer-events-none"></div>

              {/* Campus Identity Header */}
              <div className="relative flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0">
                    <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Grace Schools Integrated Campus</h1>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-green-100/50 text-green-800 text-xs font-bold uppercase">
                        Composite K-12
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">
                        Gbagada, Lagos
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Unified Multi-Tier Command: Synchronizing Early Years Foundation, Basic 1-6 Primary, and 6-Year Secondary Colleges.
                    </p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center gap-3 shrink-0 self-start xl:self-center">
                  <button
                    onClick={handleDelegation}
                    className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-gray-900 hover:bg-gray-50 shadow-sm transition-all duration-200"
                  >
                    <svg className="w-5 h-5 text-blue-600 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-semibold leading-none text-gray-900">Delegate Authority</span>
                      <span className="text-xs text-gray-600 leading-none mt-1">Head Teacher & Principal</span>
                    </div>
                    <svg className="w-4 h-4 text-gray-500 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow-sm hover:bg-blue-700 active:scale-[0.99] transition-all">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>New Unified Record</span>
                  </button>
                </div>
              </div>

              {/* TIER SWITCHER - The key innovation! */}
              <div className="relative bg-white p-1.5 rounded-2xl shadow-sm mb-8 overflow-x-auto scrollbar-hide">
                <div className="flex items-center min-w-[760px] gap-1.5">
                  {/* All Sections Tab */}
                  <button
                    onClick={() => handleTierSwitch('all')}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                      selectedTier === 'all'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    <span>All Sections</span>
                    <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                      selectedTier === 'all'
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      922 Pupils
                    </span>
                  </button>

                  {/* Nursery Tab */}
                  <button
                    onClick={() => handleTierSwitch('nursery')}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                      selectedTier === 'nursery'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full ${selectedTier === 'nursery' ? 'bg-green-300' : 'bg-green-600'}`}></span>
                    <span>Early Years / Nursery</span>
                    <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                      selectedTier === 'nursery'
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      142
                    </span>
                  </button>

                  {/* Primary Tab */}
                  <button
                    onClick={() => handleTierSwitch('primary')}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                      selectedTier === 'primary'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full ${selectedTier === 'primary' ? 'bg-blue-300' : 'bg-blue-600'}`}></span>
                    <span>Primary Basic 1-6</span>
                    <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                      selectedTier === 'primary'
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      320
                    </span>
                  </button>

                  {/* Junior Secondary Tab */}
                  <button
                    onClick={() => handleTierSwitch('jss')}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                      selectedTier === 'jss'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full ${selectedTier === 'jss' ? 'bg-orange-300' : 'bg-orange-600'}`}></span>
                    <span>Junior Secondary</span>
                    <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                      selectedTier === 'jss'
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      245
                    </span>
                  </button>

                  {/* Senior Secondary Tab */}
                  <button
                    onClick={() => handleTierSwitch('sss')}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                      selectedTier === 'sss'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full ${selectedTier === 'sss' ? 'bg-purple-300' : 'bg-purple-600'}`}></span>
                    <span>Senior Secondary</span>
                    <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                      selectedTier === 'sss'
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      215
                    </span>
                  </button>
                </div>
              </div>

              {/* Dynamic Feedback Ribbon */}
              <div className="flex items-center justify-between px-4 py-2 mb-8 rounded-xl bg-white shadow-sm border border-gray-200">
                <div className="flex items-center gap-2 text-gray-900 text-sm">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  <span>
                    Viewing Scope: <strong className={`text-sm font-bold ${getTierBadgeClasses().split(' ')[1]}`}>{getScopeText()}</strong>
                    {selectedTier === 'primary' && ' (SUBEB Accredited Curriculum)'}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-gray-600 text-xs">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-600"></span> Gate Biometric Sync: <strong>Normal</strong>
                  </span>
                  <span className="hidden md:inline text-gray-400">•</span>
                  <span className="hidden md:flex items-center gap-1">
                    <svg className="w-3 h-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Morning Roll Call: Closed (08:45 AM)
                  </span>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                {/* Attendance Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase text-gray-500 tracking-wider font-semibold">Campus Attendance</span>
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-4xl leading-tight font-extrabold text-gray-900">{currentStats.attendanceRate}</span>
                      <span className="text-xs font-bold text-green-700 flex items-center">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        +1.4% vs Wk 3
                      </span>
                    </div>
                    <span className="text-xs text-gray-600">{currentStats.presentCount} of {currentStats.totalCount} {currentStats.description}</span>
                  </div>
                </div>

                {/* Faculty Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase text-gray-500 tracking-wider font-semibold">Active Educators & Staff</span>
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-4xl leading-tight font-extrabold text-gray-900">50</span>
                      <span className="text-xs text-gray-500">on site / 52 enrolled</span>
                    </div>
                    <span className="text-xs text-gray-600">Head Teacher (Mrs. Alabi) & Principal checked in</span>
                  </div>
                </div>

                {/* Gate Turnstile Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase text-gray-500 tracking-wider font-semibold">Gate 1 Smart Turnstiles</span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100/50 text-green-700 text-xs font-bold uppercase">
                      LIVE FEED
                    </span>
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-4xl leading-tight font-extrabold text-gray-900">898</span>
                      <span className="text-xs text-green-700 font-semibold">Taps Logged</span>
                    </div>
                    <span className="text-xs text-gray-600">Peak surge cleared: 07:42 AM - 08:15 AM</span>
                  </div>
                </div>

                {/* Tasks Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase text-gray-500 tracking-wider font-semibold">Regulatory Operations</span>
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-4xl leading-tight font-extrabold text-orange-600">{currentStats.pendingTasks}</span>
                      <span className="text-xs text-gray-600 font-semibold">Tier Action Items</span>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-1">{currentStats.taskDescription}</p>
                  </div>
                </div>
              </div>

              {/* Operations Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
                {/* Left Column - Operations Matrix */}
                <div className="lg:col-span-8 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                      <h2 className="text-xl font-bold text-gray-900">Tier Operations Matrix</h2>
                    </div>
                    <span className={`text-xs uppercase px-3 py-1 rounded-full font-bold tracking-wide ${getTierBadgeClasses()}`}>
                      {selectedTier === 'nursery' && 'Early Years View'}
                      {selectedTier === 'primary' && 'Primary Division View'}
                      {selectedTier === 'jss' && 'Junior Secondary View'}
                      {selectedTier === 'sss' && 'Senior Secondary View'}
                      {selectedTier === 'all' && 'Composite Whole-School View'}
                    </span>
                  </div>

                  {/* Nursery & Primary Operations */}
                  {showNurseryPrimaryOps && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Guardian Pick-Up Registry */}
                      <div className="p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer">
                        <div className="flex items-start justify-between">
                          <div className="w-11 h-11 rounded-xl bg-green-100/50 flex items-center justify-center text-green-700">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </div>
                          <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                        <div className="mt-4">
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Guardian Pick-Up Registry</h3>
                          <p className="text-sm text-gray-600 mt-1">Biometric card validation for authorized parent/driver afternoon gate releases.</p>
                        </div>
                        <div className="mt-4 pt-2 flex items-center gap-2">
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-900">142 Nursery Passes</span>
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-100/40 text-green-700">100% Verified</span>
                        </div>
                      </div>

                      {/* SUBEB Continuous Assessment */}
                      <div className="p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer">
                        <div className="flex items-start justify-between">
                          <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                          </div>
                          <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                        <div className="mt-4">
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">SUBEB Continuous Assessment</h3>
                          <p className="text-sm text-gray-600 mt-1">Batch compute Basic 1-6 terminal marks, cognitive domains & Lagos State CAS uploads.</p>
                        </div>
                        <div className="mt-4 pt-2 flex items-center gap-2">
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-900">CAS 2 Window Active</span>
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">4 Classes Pending</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Secondary Operations */}
                  {showSecondaryOps && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      {/* WAEC/NECO Track */}
                      <div className="p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer">
                        <div className="flex items-start justify-between">
                          <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                          </div>
                          <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                        <div className="mt-4">
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">WAEC / NECO / BECE Track</h3>
                          <p className="text-sm text-gray-600 mt-1">Senior SS3 practical logistics, e-PIN validation, and Junior BECE mock brooking.</p>
                        </div>
                        <div className="mt-4 pt-2 flex items-center gap-2">
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-900">SSS 3: 72 Candidates</span>
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-100/40 text-green-700">Timetable Ready</span>
                        </div>
                      </div>

                      {/* Lab Rotations */}
                      <div className="p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer">
                        <div className="flex items-start justify-between">
                          <div className="w-11 h-11 rounded-xl bg-gray-100 text-gray-700 flex items-center justify-center">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                          </div>
                          <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                        <div className="mt-4">
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Lab & Specialist Rotations</h3>
                          <p className="text-sm text-gray-600 mt-1">Physics/Chemistry labs, ICT server suites, and language laboratory reservations.</p>
                        </div>
                        <div className="mt-4 pt-2 flex items-center gap-2">
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-900">18 Instructors</span>
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-gray-200 text-gray-900">2 Slots Free</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column - Leadership & Governance */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                  <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          <h3 className="text-lg font-bold text-gray-900">Administrative Governance</h3>
                        </div>
                        <span className="text-xs font-bold uppercase text-green-700">Unified Apex</span>
                      </div>
                      <p className="text-xs text-gray-600 mb-4">
                        As School Director / Executive Administrator, you have omni-tier oversight. Delegate tactical control in one click:
                      </p>

                      {/* Head Teacher Card */}
                      <div className="p-4 rounded-xl bg-gray-50 mb-3 flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-sm">
                              BA
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-gray-900 leading-tight">Mrs. Bolanle Adeleke</span>
                              <span className="text-xs text-green-700 font-semibold">Head Teacher (Nursery & Primary)</span>
                            </div>
                          </div>
                          <span className="w-2.5 h-2.5 rounded-full bg-green-600"></span>
                        </div>
                        <div className="flex items-center justify-between pt-2 text-gray-600 text-xs">
                          <span>Scope: EYFS to Basic 6 (462 Pupils)</span>
                          <button className="px-2 py-1 rounded-md bg-white hover:bg-gray-100 text-blue-600 text-xs font-semibold transition-colors">
                            Assign Quorum
                          </button>
                        </div>
                      </div>

                      {/* Principal Card */}
                      <div className="p-4 rounded-xl bg-gray-50 mb-4 flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                              EO
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-gray-900 leading-tight">Mr. Emeka Okafor, M.Ed</span>
                              <span className="text-xs text-blue-700 font-semibold">College Principal (JSS1 - SSS3)</span>
                            </div>
                          </div>
                          <span className="w-2.5 h-2.5 rounded-full bg-green-600"></span>
                        </div>
                        <div className="flex items-center justify-between pt-2 text-gray-600 text-xs">
                          <span>Scope: JSS1 to SSS3 (460 Students)</span>
                          <button className="px-2 py-1 rounded-md bg-white hover:bg-gray-100 text-blue-600 text-xs font-semibold transition-colors">
                            Assign Quorum
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Notice Card */}
                    <div className="p-4 rounded-xl bg-gray-100 text-gray-900 flex items-start gap-3">
                      <svg className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold">Lagos State MOE Joint Inspection</span>
                        <span className="text-xs text-gray-600 mt-1">Dual-curriculum logbook ready for statutory district accreditation visit on Thursday.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Delegation Toast */}
        {showDelegationToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-slide-up">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex flex-col">
              <span className="text-sm font-bold">Directorial Override Enabled</span>
              <span className="text-xs text-blue-200">Full dual-delegation: Mrs. Adeleke & Mr. Okafor</span>
            </div>
          </div>
        )}

        {/* Floating Network Status */}
        <div className="fixed bottom-6 left-[19rem] z-40">
          <div className="bg-blue-600 text-white px-4 py-2.5 rounded-full shadow-xl flex items-center gap-3 backdrop-blur-md">
            <div className="relative flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-ping"></div>
              <div className="absolute w-2.5 h-2.5 rounded-full bg-green-400"></div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 leading-none">
                <span className="text-xs font-bold">All 4 Tiers Synced</span>
                <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-white/20">Mesh #04</span>
              </div>
              <span className="text-[11px] text-blue-200 leading-tight mt-0.5">Offline-Ready Local Cache Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
