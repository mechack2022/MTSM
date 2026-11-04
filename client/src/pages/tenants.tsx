// ============================================================================
// SUPER ADMIN TENANT MANAGEMENT DASHBOARD
// ============================================================================
// Full-featured tenant management UI with stats, filtering, and search

import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAllTenants, useLogout } from '@/hooks'
import { useAuth } from '@/store'

// ============================================================================
// COMPONENT
// ============================================================================

export default function TenantsPage() {
  const navigate = useNavigate()
  const { data: tenants, isLoading } = useAllTenants()
  const logout = useLogout()
  const { user } = useAuth()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedState, setSelectedState] = useState('All States (36 + FCT)')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const userMenuRef = useRef<HTMLDivElement>(null)

  const handleLogout = () => {
    logout.mutate()
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isUserMenuOpen])

  // Filter tenants
  const filteredTenants = tenants?.filter((tenant) => {
    const matchesSearch =
      tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.code.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      selectedStatus === 'all' ||
      (selectedStatus === 'Active' && tenant.isActive) ||
      (selectedStatus === 'Suspended' && !tenant.isActive)

    return matchesSearch && matchesStatus
  })

  const states = [
    'All States (36 + FCT)',
    'Lagos',
    'Abuja (FCT)',
    'Rivers',
    'Oyo',
    'Kaduna',
  ]

  const statusFilters = [
    { label: 'All Tenants (3)', value: 'all' },
    { label: 'Active (2)', value: 'Active' },
    { label: 'Pending Setup (0)', value: 'Pending Setup' },
    { label: 'Suspended (1)', value: 'Suspended' },
  ]

  return (
    <div className="min-h-screen bg-surface">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-surface-container-lowest z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="flex flex-col">
          {/* Logo */}
          <div className="h-16 px-6 flex items-center gap-2 bg-surface-container-lowest">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm text-gray-900 leading-tight">EduManage</span>
              <span className="text-[10px] text-blue-600 uppercase font-bold tracking-wider">Nigeria Admin</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="px-4 py-4">
            <div className="px-2 py-1">
              <span className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold">Super Admin Core</span>
            </div>
            <nav className="mt-2 flex flex-col gap-1">
              <a href="#" className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-semibold shadow-md">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>Tenants</span>
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>System Users / Admins</span>
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Academic Calendars</span>
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>System Audit Logs</span>
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Platform Settings</span>
              </a>
            </nav>
          </div>
        </div>

        {/* Offline Status */}
        <div className="p-4 m-4 rounded-xl bg-gray-100 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
            </span>
            <span className="text-[10px] text-green-700 uppercase font-bold tracking-wider">Offline-Ready Cache</span>
          </div>
          <p className="text-[11px] text-gray-600 leading-tight">Local nodes synchronized with Federal Ministry Education Cluster.</p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="pl-72 flex flex-col min-h-screen">
        {/* Header */}
        <header className="fixed top-0 left-72 right-0 h-16 bg-white/85 backdrop-blur-xl z-40 flex items-center justify-between px-6 shadow-sm">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full max-w-md">
              <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-gray-100 text-gray-900 placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="Search tenants, organizations, admins..."
                type="text"
              />
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-[11px] font-bold">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Platform Super Admin
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-[11px] font-bold">
              <span className="h-2 w-2 rounded-full bg-green-600"></span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
              System Healthy
            </div>

            <button className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 pl-2 hover:bg-gray-50 rounded-lg p-1.5 transition-colors"
              >
                <div className="flex flex-col items-end text-right">
                  <span className="text-[13px] font-semibold text-gray-900 leading-tight">{user?.fullName || 'Platform Admin'}</span>
                  <span className="text-[11px] text-gray-500">Super Admin - Federal Oversight</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-xl z-50 p-2 border border-gray-100">
                  <div className="px-3 py-2 border-b border-gray-100 mb-1">
                    <p className="text-sm font-semibold text-gray-900">{user?.fullName || 'Platform Admin'}</p>
                    <p className="text-xs text-gray-500">{user?.username || 'platform.admin@mtsms.local'}</p>
                  </div>
                  <button className="w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 text-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    My Profile
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 text-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Settings
                  </button>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    onClick={handleLogout}
                    disabled={logout.isPending}
                    className="w-full text-left px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 text-sm font-medium flex items-center gap-2 disabled:opacity-50"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    {logout.isPending ? 'Logging out...' : 'Logout'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="pt-16 flex-1 px-6 py-6 bg-white">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Tenant Management</h1>
              <p className="text-sm text-gray-600 mt-0.5">Manage educational tenant accounts, organizations, subscription tiers, and tenant administrator credentials.</p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative">
                <button
                  onClick={() => setIsStateDropdownOpen(!isStateDropdownOpen)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-700 text-sm font-medium shadow-sm hover:bg-gray-50"
                >
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{selectedState}</span>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isStateDropdownOpen && (
                  <div className="absolute right-0 mt-1 w-56 rounded-xl bg-white shadow-xl z-30 p-1.5 flex flex-col gap-0.5 border border-gray-100">
                    {states.map((state) => (
                      <button
                        key={state}
                        onClick={() => {
                          setSelectedState(state)
                          setIsStateDropdownOpen(false)
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg text-gray-900 hover:bg-gray-100 text-sm"
                      >
                        {state}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => navigate('/create-tenant')}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold shadow-md hover:bg-blue-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>+ Create Tenant</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Tenants</span>
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-blue-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">{tenants?.length || 0}</span>
                <span className="text-sm text-gray-500">organizations</span>
              </div>
            </div>

            <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Active Students</span>
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-blue-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">348,210</span>
                <span className="text-sm text-gray-500">enrolled</span>
              </div>
              <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>

            <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Teachers</span>
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-green-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">18,450</span>
                <span className="text-sm text-gray-500">active</span>
              </div>
              <span className="text-sm text-gray-500 mt-1">1:18 Teacher-Student ratio</span>
            </div>

            <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">System Status</span>
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-600"></span>
                </span>
                <span className="text-xl font-semibold text-gray-900">All Online</span>
              </div>
              <span className="text-sm text-green-600 font-medium mt-1">100% operational across all regions</span>
            </div>
          </div>

          {/* Filters */}
          <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm mb-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              {statusFilters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setSelectedStatus(filter.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    selectedStatus === filter.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 flex-1 max-w-xl justify-end">
              <div className="relative w-full max-w-sm">
                <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-gray-100 text-gray-900 placeholder:text-gray-500 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Search tenant name, code, contact email, state..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition-colors shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export CSV
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden mb-4">
            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="p-8 text-center text-gray-500">
                  Loading tenants...
                </div>
              ) : filteredTenants?.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  {searchQuery ? 'No tenants found matching your search.' : 'No tenants yet. Create your first tenant to get started.'}
                </div>
              ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 text-gray-600 text-xs font-semibold uppercase tracking-wider">
                      <th className="py-3 px-4">Tenant Organization</th>
                      <th className="py-3 px-4">Code & CAC</th>
                      <th className="py-3 px-4">Contact</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredTenants?.map((tenant) => (
                      <tr key={tenant.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0">
                              {tenant.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-semibold text-gray-900 leading-snug">{tenant.name}</span>
                              <span className="text-xs text-gray-500">Educational Organization</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex flex-col">
                            <span className="text-[11px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded w-fit uppercase">{tenant.code}</span>
                            <span className="text-xs text-gray-500 mt-0.5">RC-104928</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex flex-col">
                            {tenant.contactEmail && (
                              <span className="text-sm text-gray-900">{tenant.contactEmail}</span>
                            )}
                            {tenant.contactPhone && (
                              <span className="text-xs text-gray-500">{tenant.contactPhone}</span>
                            )}
                            {!tenant.contactEmail && !tenant.contactPhone && (
                              <span className="text-sm text-gray-400">No contact info</span>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            tenant.isActive
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${tenant.isActive ? 'bg-green-600' : 'bg-gray-400'}`}></span>
                            {tenant.isActive ? 'Active' : 'Suspended'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center gap-2 justify-end">
                            <button
                              onClick={() => navigate(`/update-tenant/${tenant.id}`)}
                              className="px-2.5 py-1 rounded-lg text-blue-600 hover:bg-blue-50 text-xs font-semibold transition-colors"
                            >
                              Edit
                            </button>
                            <button className="px-2.5 py-1 rounded-lg text-red-600 hover:bg-red-50 text-xs font-semibold transition-colors">
                              {tenant.isActive ? 'Deactivate' : 'Activate'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Pagination */}
            <div className="p-4 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Showing <span className="font-semibold text-gray-900">1-{filteredTenants?.length || 0}</span> of{' '}
                <span className="font-semibold text-gray-900">{tenants?.length || 0}</span> tenants
              </div>
              <div className="flex items-center gap-1">
                <button
                  disabled
                  className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed text-xs font-medium inline-flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
                <button className="px-3 py-1 rounded-lg bg-blue-600 text-white text-xs font-medium">
                  1
                </button>
                <button className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium inline-flex items-center gap-1">
                  Next
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full bg-white py-3 px-6 shadow-sm border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <span>EduManage NG Core v4.12.0</span>
              <span className="inline-block h-3 w-px bg-gray-300"></span>
              <span className="inline-flex items-center gap-1 text-green-600">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
                Active DB: Abuja Primary Cluster (Encrypted)
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Quick Support Desk
              </a>
              <span className="inline-block h-3 w-px bg-gray-300"></span>
              <span>Federal Ministry of Education Oversight</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
