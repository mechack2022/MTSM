// ============================================================================
// AUDIT LOGS & GOVERNANCE LEDGER PAGE
// ============================================================================
// Tenant Admin page to track administrative actions, policy adjustments,
// leadership appointments, and campus-wide modifications

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/store'
import ViewLogDetailsModal, { AuditLogEntry } from '@/components/modals/ViewLogDetailsModal'

export default function AuditLogsPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCampus, setSelectedCampus] = useState('all')
  const [selectedSeverity, setSelectedSeverity] = useState('all')
  const [filterCategory, setFilterCategory] = useState<'all' | 'staff' | 'policy' | 'operations' | 'financial' | 'security'>('all')
  const [selectedLog, setSelectedLog] = useState<AuditLogEntry | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleViewLog = (log: AuditLogEntry) => {
    setSelectedLog(log)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedLog(null), 200) // Clear after animation
  }

  // Dummy audit log data
  const auditLogs: AuditLogEntry[] = [
    {
      id: '1',
      timestamp: 'Today, 10:42 AM',
      date: '24 Oct 2025',
      userName: 'Dr. Aliyu Mohammed',
      userRole: 'Lead Proprietor',
      userInitials: 'AM',
      avatarColor: 'bg-blue-600 text-white',
      category: 'POLICY UPDATE',
      categoryColor: 'bg-blue-100 text-blue-700',
      eventTitle: 'Modified Academic Calendar',
      eventDescription: 'Confirmed Term 2 resumption date set to 06 Jan 2026 across trust schools',
      affectedEntity: 'All 3 Campuses',
      entityIcon: 'apartment',
      ipAddress: '102.89.44.12',
      deviceInfo: 'Lagos, NG • Chrome (macOS)',
      changeFrom: '12 Jan 2026',
      changeTo: '06 Jan 2026',
      changeReason: 'Accelerated resumption approved by Trust Board',
      verification: '2FA Verified (WhatsApp OTP)',
    },
    {
      id: '2',
      timestamp: 'Today, 08:15 AM',
      date: '24 Oct 2025',
      userName: 'System Core Daemon',
      userRole: 'Automated Process',
      userInitials: '',
      avatarColor: 'bg-gray-200 text-gray-600',
      category: 'POLICY SYNC',
      categoryColor: 'bg-teal-100 text-teal-700',
      eventTitle: 'Propagated Inherited Grading Standards',
      eventDescription: 'Applied statutory NERDC (A1-F9) schema with 40% CA to Ikeja & Abuja databases',
      affectedEntity: 'Crown Jewel Prep, Ikeja',
      entityIcon: 'school',
      ipAddress: 'Internal Worker',
      deviceInfo: 'GovCloud Enclave (Abuja DC)',
    },
    {
      id: '3',
      timestamp: 'Yesterday, 04:30 PM',
      date: '23 Oct 2025',
      userName: 'Dr. Aliyu Mohammed',
      userRole: 'Lead Proprietor',
      userInitials: 'AM',
      avatarColor: 'bg-blue-600 text-white',
      category: 'STAFF MANDATE',
      categoryColor: 'bg-gray-200 text-blue-700',
      eventTitle: 'Appointed Principal & Approval Authority',
      eventDescription: 'Appointed Mrs. Folake Balogun as Principal (Lekki) with spend authorization of ₦1,500,000/mo',
      affectedEntity: 'Lekki High School',
      entityIcon: 'domain',
      ipAddress: '102.89.44.12',
      deviceInfo: 'Lagos, NG • Chrome (macOS)',
    },
    {
      id: '4',
      timestamp: '22 Oct 2025, 02:10 PM',
      date: 'Wednesday',
      userName: 'Dr. Aliyu Mohammed',
      userRole: 'Lead Proprietor',
      userInitials: 'AM',
      avatarColor: 'bg-blue-600 text-white',
      category: 'FINANCE POLICY',
      categoryColor: 'bg-amber-100 text-amber-800',
      eventTitle: 'Updated Tuition Settlement Bank Account',
      eventDescription: 'Verified Zenith Bank PLC collection account (Acct: 1014892019) with Paystack gateway route',
      affectedEntity: 'Trust Secretariat',
      entityIcon: 'account_balance',
      ipAddress: '102.89.44.12',
      deviceInfo: 'Lagos, NG • Chrome (macOS)',
    },
    {
      id: '5',
      timestamp: '21 Oct 2025, 11:05 AM',
      date: 'Tuesday',
      userName: 'Mrs. Folake Balogun',
      userRole: 'Principal (Lekki)',
      userInitials: 'FB',
      avatarColor: 'bg-teal-100 text-teal-700',
      category: 'SECURITY AUTH',
      categoryColor: 'bg-teal-100 text-teal-700',
      eventTitle: 'Credential Activation & 2FA Bind',
      eventDescription: 'Completed WhatsApp OTP two-factor authentication registration and hardware key linking',
      affectedEntity: 'Lekki High School',
      entityIcon: 'domain',
      ipAddress: '105.112.38.90',
      deviceInfo: 'Lagos, NG • Safari (iOS 18)',
    },
    {
      id: '6',
      timestamp: '19 Oct 2025, 09:20 AM',
      date: 'Sunday',
      userName: 'Dr. Aliyu Mohammed',
      userRole: 'Lead Proprietor',
      userInitials: 'AM',
      avatarColor: 'bg-blue-600 text-white',
      category: 'SCHOOL SETUP',
      categoryColor: 'bg-gray-200 text-gray-600',
      eventTitle: 'Dismissal Schedule Override',
      eventDescription: 'Updated early pickup closing time window (01:30 PM) for Crèche & Nursery sections',
      affectedEntity: 'Ikeja Prep',
      entityIcon: 'child_care',
      ipAddress: '102.89.44.12',
      deviceInfo: 'Lagos, NG • Chrome (macOS)',
    },
  ]

  // Filter logs
  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch =
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.eventTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.eventDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ipAddress.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-white shadow-sm z-50 flex flex-col justify-between">
        <div className="flex flex-col">
          {/* Header */}
          <div className="h-16 px-4 flex items-center justify-between border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-base">E</div>
              <div>
                <span className="font-bold text-sm text-gray-900 block leading-tight tracking-tight">EduManage</span>
                <span className="text-[9px] uppercase text-teal-700 font-bold tracking-widest block">Nigeria Core</span>
              </div>
            </div>
            <div className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 text-[9px] font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>NG GovCloud
            </div>
          </div>

          {/* Tenant Badge */}
          <div className="px-4 py-3">
            <div className="p-2 rounded-xl bg-gray-100 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center text-blue-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="overflow-hidden">
                <span className="text-xs font-bold text-gray-900 block truncate">CJET TRUST</span>
                <span className="text-xs text-gray-600 block truncate">Crown Jewel Trust</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-1 px-4 mt-2">
            <button
              onClick={() => navigate('/tenant-admin/dashboard')}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all text-sm font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
              </svg>
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => navigate('/tenant-admin/my-schools-campuses')}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all text-sm font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>My Schools / Campuses</span>
            </button>
            <button
              onClick={() => navigate('/tenant-admin/staff-appointees')}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all text-sm font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Staff & Appointees</span>
            </button>
            <a href="#" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all text-sm font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>Student Directory</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all text-sm font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span>Billing & Plan Quota</span>
            </a>
            {/* Active: Audit Logs */}
            <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm shadow-md">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Audit Logs</span>
            </button>
            <a href="#" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all text-sm font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Settings</span>
            </a>
          </nav>
        </div>

        {/* Bottom Tier Card */}
        <div className="p-4">
          <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-900">Enterprise Tier</span>
              <span className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-700 text-[9px] font-bold">Active</span>
            </div>
            <p className="text-xs text-gray-600 mb-2">3 of 5 school licenses assigned</p>
            <div className="w-full h-1.5 rounded-full bg-gray-200 overflow-hidden">
              <div className="w-3/5 h-full rounded-full bg-blue-600"></div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="pl-72">
        {/* Top Header */}
        <header className="fixed top-0 left-72 right-0 h-16 bg-white/85 backdrop-blur-xl shadow-sm z-40 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 max-w-2xl">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 text-gray-900 text-xs font-medium">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="font-bold">Crown Jewel Education Trust</span>
              <span className="text-gray-500">• Proprietor</span>
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div className="flex-1 relative">
              <svg className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                className="w-full pl-10 pr-4 py-1.5 bg-gray-50 rounded-full text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-sm"
                placeholder="Search logs, staff, settings..."
                type="search"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="px-4 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
              <span>Online & Synced</span>
            </div>
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="w-2 h-2 rounded-full bg-red-500 absolute top-2 right-2"></span>
            </button>
            <div className="flex items-center gap-2 pl-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="hidden xl:block">
                <span className="text-xs font-bold text-gray-900 block leading-tight">Dr. Aliyu Mohammed</span>
                <span className="text-xs text-gray-600 block leading-tight">Lead Proprietor</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="w-full pt-16 min-h-screen bg-gray-50 px-6 py-6">
          <div className="flex flex-col w-full">
            {/* Page Header & Governance Context */}
            <div className="flex flex-col gap-4 mb-8">
              {/* Breadcrumb & Compliance Badge Row */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-gray-600 text-xs font-medium">
                  <span className="flex items-center gap-1 hover:text-blue-600 transition-colors cursor-pointer">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Governance
                  </span>
                  <span className="text-gray-400">/</span>
                  <span className="text-blue-600 font-bold">Audit Logs & Activity Trail</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-100 text-teal-700 text-[9px] font-semibold tracking-wider uppercase">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                  </svg>
                  <span>Tamper-Evident Ledger Active • NDPA 2023 Compliant</span>
                </div>
              </div>

              {/* Main Title & Action Bar */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Audit Logs & Governance Ledger</h1>
                  <p className="text-sm text-gray-600 mt-1 max-w-3xl">
                    Track administrative actions, policy adjustments, leadership appointments, and campus-wide modifications across all schools.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-gray-900 hover:bg-gray-50 text-sm font-medium shadow-sm transition-all border border-gray-200">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Last 30 Days</span>
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-gray-900 hover:bg-gray-50 text-sm font-medium shadow-sm transition-all border border-gray-200">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>Export Ledger (CSV / PDF)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Stat Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {/* Card 1 */}
              <div className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Total Recorded Events</span>
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-blue-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-gray-900 leading-tight tracking-tight">1,248</div>
                  <div className="flex items-center gap-1.5 mt-2 text-teal-700 text-xs font-medium">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span className="font-semibold">+42 recorded this week</span>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Security & Login Events</span>
                  <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center text-teal-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-gray-900 leading-tight tracking-tight">312</div>
                  <div className="flex items-center gap-1.5 mt-2 text-teal-700 text-xs font-medium">
                    <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                    <span className="font-semibold">0 unauthorized attempts</span>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Policy & Core Settings</span>
                  <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-gray-900 leading-tight tracking-tight">18</div>
                  <div className="flex items-center gap-1.5 mt-2 text-gray-600 text-xs font-medium">
                    <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Synced to 3 campuses</span>
                  </div>
                </div>
              </div>

              {/* Card 4 */}
              <div className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Executive & Staff Actions</span>
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-gray-900 leading-tight tracking-tight">64</div>
                  <div className="flex items-center gap-1.5 mt-2 text-gray-600 text-xs font-medium">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Appointments & limits</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter & Search Toolbar Section */}
            <div className="bg-white rounded-xl p-4 shadow-sm mb-4 flex flex-col gap-4 border border-gray-100">
              {/* Top Search & Quick Pickers */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
                {/* Search Bar */}
                <div className="lg:col-span-6 relative">
                  <svg className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-lg text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 shadow-inner border border-gray-200"
                    placeholder="Search by administrator name, email, IP, or action keyword..."
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Campus Selector Filter */}
                <div className="lg:col-span-3">
                  <div className="relative">
                    <select
                      className="w-full appearance-none pl-3.5 pr-9 py-2.5 bg-gray-50 rounded-lg text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer border border-gray-200"
                      value={selectedCampus}
                      onChange={(e) => setSelectedCampus(e.target.value)}
                    >
                      <option value="all">Campus: All Campuses (3 Branches)</option>
                      <option value="lekki">Crown Jewel High School, Lekki</option>
                      <option value="ikeja">Crown Jewel Prep, Ikeja</option>
                      <option value="abuja">Crown Jewel Academy, Abuja</option>
                      <option value="central">Trust Central Secretariat</option>
                    </select>
                    <svg className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>

                {/* Severity / Impact Filter */}
                <div className="lg:col-span-3">
                  <div className="relative">
                    <select
                      className="w-full appearance-none pl-3.5 pr-9 py-2.5 bg-gray-50 rounded-lg text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer border border-gray-200"
                      value={selectedSeverity}
                      onChange={(e) => setSelectedSeverity(e.target.value)}
                    >
                      <option value="all">Severity: All Categories</option>
                      <option value="info">Informational & Routine</option>
                      <option value="notice">Policy & Staff Changes</option>
                      <option value="critical">High Impact & Security</option>
                    </select>
                    <svg className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 border-t border-gray-100">
                <button
                  onClick={() => setFilterCategory('all')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
                    filterCategory === 'all'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  All Events (1,248)
                </button>
                <button
                  onClick={() => setFilterCategory('staff')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    filterCategory === 'staff'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  Staff & Appointments (64)
                </button>
                <button
                  onClick={() => setFilterCategory('policy')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    filterCategory === 'policy'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  Policy & Academics (18)
                </button>
                <button
                  onClick={() => setFilterCategory('operations')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    filterCategory === 'operations'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  Campus Operations (430)
                </button>
                <button
                  onClick={() => setFilterCategory('financial')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    filterCategory === 'financial'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  Financial Caps & Accounts (27)
                </button>
                <button
                  onClick={() => setFilterCategory('security')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    filterCategory === 'security'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  Authentication & Security (312)
                </button>
              </div>
            </div>

            {/* Audit Log Table Surface */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[1040px]">
                  <thead>
                    <tr className="bg-gray-100 text-gray-600 text-xs font-bold tracking-wider uppercase border-b border-gray-200">
                      <th className="py-3.5 px-4">Timestamp & Date</th>
                      <th className="py-3.5 px-4">User / Initiator</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4">Event Description & Details</th>
                      <th className="py-3.5 px-4">Affected Entity</th>
                      <th className="py-3.5 px-4">Origin / Device</th>
                      <th className="py-3.5 px-4 text-right">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm text-gray-900">
                    {filteredLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className="text-xs font-bold text-gray-900 block">{log.timestamp}</span>
                          <span className="text-gray-600 text-xs block">{log.date}</span>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-2.5">
                            {log.userInitials ? (
                              <div className={`w-8 h-8 rounded-full ${log.avatarColor} flex items-center justify-center text-xs font-bold`}>
                                {log.userInitials}
                              </div>
                            ) : (
                              <div className={`w-8 h-8 rounded-full ${log.avatarColor} flex items-center justify-center`}>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                            <div>
                              <span className="text-xs font-bold text-gray-900 block leading-tight">{log.userName}</span>
                              <span className="text-gray-600 text-[11px] block leading-tight">{log.userRole}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${log.categoryColor} text-[9px] font-bold`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                            {log.category}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-xs font-semibold text-gray-900 block">{log.eventTitle}</span>
                          <span className="text-gray-600 text-xs block line-clamp-1">{log.eventDescription}</span>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-900 text-xs font-medium">
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            {log.affectedEntity}
                          </span>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className="font-mono text-xs text-gray-900 font-medium block">{log.ipAddress}</span>
                          <span className="text-gray-600 text-[11px] block">{log.deviceInfo}</span>
                        </td>
                        <td className="py-4 px-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => handleViewLog(log)}
                            className="px-2.5 py-1 rounded-lg text-blue-600 hover:bg-blue-50 text-xs font-bold transition-colors"
                          >
                            View Log
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer / Pagination */}
              <div className="py-3.5 px-4 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Showing <span className="font-semibold text-gray-900">1 – 6</span> of <span className="font-semibold text-gray-900">1,248</span> recorded audit events
                </div>
                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors disabled:opacity-40" disabled>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-blue-600 text-white text-xs font-bold shadow-sm">1</button>
                  <button className="w-8 h-8 rounded-lg text-gray-900 hover:bg-gray-100 text-xs transition-colors">2</button>
                  <button className="w-8 h-8 rounded-lg text-gray-900 hover:bg-gray-100 text-xs transition-colors">3</button>
                  <span className="px-1 text-gray-500 text-xs">...</span>
                  <button className="w-8 h-8 rounded-lg text-gray-900 hover:bg-gray-100 text-xs transition-colors">208</button>
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Informational Banner / Compliance & Integrity */}
            <div className="mt-6 p-4 rounded-xl bg-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-teal-700 shadow-sm shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <div>
                  <span className="text-sm font-bold text-gray-900 block">Immutable Ledger Archival Guarantee</span>
                  <span className="text-xs text-gray-600 block">
                    All changes to fee accounts, staff appointments, and student marks are cryptographically hashed and mirrored across EduManage GovCloud. Retention period: 7 Years.
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button className="px-4 py-2 rounded-lg bg-white hover:bg-gray-50 text-gray-900 text-xs font-semibold shadow-sm transition-colors">
                  Verification Certificate
                </button>
                <button className="px-4 py-2 rounded-lg bg-white hover:bg-gray-50 text-gray-900 text-xs font-semibold shadow-sm transition-colors">
                  Retention Policies
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* View Log Details Modal */}
      <ViewLogDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        logEntry={selectedLog}
      />
    </div>
  )
}
