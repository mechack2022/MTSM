// ============================================================================
// UPDATE TENANT PAGE - Super Admin
// ============================================================================
// Full-featured tenant update form with health metrics and audit trail

import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// ============================================================================
// COMPONENT
// ============================================================================

export default function UpdateTenantPage() {
  const navigate = useNavigate()
  const { id } = useParams()

  // Form state (populated with existing tenant data)
  const [tenantName, setTenantName] = useState('ACE Education Group')
  const [tenantCode] = useState('MGVX9F') // Read-only
  const [cacNumber, setCacNumber] = useState('RC-883921')
  const [subdomain, setSubdomain] = useState('ace-group')
  const [address, setAddress] = useState('Plot 14 Victoria Island Commercial Blvd, Lagos')
  const [state, setState] = useState('Lagos State')
  const [lga, setLga] = useState('Eti-Osa LGA')
  const [adminName, setAdminName] = useState('Mr. Babatunde Sanusi')
  const [adminEmail, setAdminEmail] = useState('admin@ece-edu.com')
  const [adminPhone, setAdminPhone] = useState('+234 803 555 0114')
  const [subscriptionTier, setSubscriptionTier] = useState('enterprise')
  const [seatCount, setSeatCount] = useState(3000)
  const [renewalDate, setRenewalDate] = useState('2026-12-12')
  const [operationalStatus, setOperationalStatus] = useState('active')

  // UI state
  const [isSaving, setIsSaving] = useState(false)
  const [showSaveNotice, setShowSaveNotice] = useState(false)

  // Handle save
  const handleSave = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setShowSaveNotice(true)

      // Hide notice after 3 seconds
      setTimeout(() => {
        setShowSaveNotice(false)
      }, 3000)
    }, 700)
  }

  // Handle deactivation
  const handleDeactivate = () => {
    if (window.confirm(`Are you sure you want to deactivate ${tenantName}? All teachers, admins, and student portals will immediately be blocked from sign-on.`)) {
      alert(`Tenant ${tenantName} has been placed into Suspended status. Offline devices will receive revocation token upon next sync.`)
    }
  }

  // Handle deletion
  const handleDelete = () => {
    const input = window.prompt(`DANGER: This action is permanent! Type the tenant code '${tenantCode}' to confirm complete database purge:`)
    if (input === tenantCode) {
      alert(`Tenant ${tenantCode} deletion sequence scheduled. Records will be purged following federal data retention policy.`)
      navigate('/tenants')
    } else if (input !== null) {
      alert('Verification code did not match. Deletion aborted.')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-gray-50 shadow-sm z-50 flex flex-col justify-between">
        <div className="flex flex-col">
          {/* Logo */}
          <div className="h-16 px-6 flex items-center gap-2 bg-gray-50">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900 leading-none">EduManage</span>
              <span className="text-[10px] text-blue-600 uppercase font-bold tracking-wider mt-0.5">Nigeria • Federal HQ</span>
            </div>
          </div>

          {/* Section Label */}
          <div className="px-4 py-4">
            <span className="px-2 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Super Admin Control</span>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-1 px-4">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); navigate('/tenants') }}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-semibold shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>Tenants</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors text-sm font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span>System Users / Admins</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors text-sm font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Academic Calendars</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors text-sm font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>System Audit Logs</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors text-sm font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Platform Settings</span>
            </a>
          </nav>
        </div>

        {/* Bottom Status Card */}
        <div className="p-4">
          <div className="bg-gray-100 rounded-xl p-3 flex items-center gap-3 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-gray-900 leading-tight">Local Cache Ready</span>
              <span className="text-[11px] text-green-600 leading-tight">Sync buffer active (NG-Fed)</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="pl-72 flex flex-col min-h-screen">
        {/* Header */}
        <header className="fixed top-0 left-72 right-0 h-16 bg-white/85 backdrop-blur-xl shadow-sm z-40 flex items-center justify-between px-6">
          <div className="flex items-center gap-4 flex-1 max-w-lg">
            <div className="relative w-full">
              <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 text-gray-900 placeholder:text-gray-500 text-sm focus:outline-none focus:bg-gray-50 transition-colors"
                placeholder="Search schools, administrators, decrees, logs (Cmd + K)..."
                type="search"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700">
              <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-wide">System Healthy</span>
            </div>

            <button className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="flex items-center gap-2 pl-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="hidden xl:flex flex-col">
                <span className="text-sm font-semibold text-gray-900 leading-tight">Dr. Farouk Bello</span>
                <span className="text-xs text-gray-500 leading-tight">Super Admin • Federal Oversight</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="w-full pt-16 px-6 py-6 flex-1 bg-white">
          {/* Top Navigation & Header */}
          <div className="flex flex-col gap-2 mb-8">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate('/tenants')}
                className="inline-flex items-center gap-2 text-blue-600 text-sm font-semibold hover:underline transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Back to Tenants</span>
              </button>

              {/* Save Notification */}
              {showSaveNotice && (
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-700 shadow-sm animate-fadeIn">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs font-bold uppercase tracking-wide">Changes ready to persist across Nigerian Fed clusters</span>
                </div>
              )}
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-1">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Update Tenant: {tenantName}</h1>
                  <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase">Active</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-1 text-gray-600 text-sm">
                  <span className="font-medium text-gray-900">Tenant Code:</span>
                  <code className="px-1.5 py-0.5 rounded bg-gray-100 font-mono text-blue-600 font-semibold">{tenantCode}</code>
                  <span>•</span>
                  <span>Created on 14 Jan 2024</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-green-600 font-medium">
                    <span className="w-2 h-2 rounded-full bg-green-600"></span>
                    Operational Status: High Priority
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('/tenants')}
                  className="px-4 py-2.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-md hover:shadow-lg text-sm font-semibold disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Persisting...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                      </svg>
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Form Layout Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Main Configuration Column (8 cols) */}
            <div className="xl:col-span-8 flex flex-col gap-6">
              {/* Section 1: Organization Profile */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-blue-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <h2 className="text-lg font-semibold text-gray-900">1. Organization Profile</h2>
                      <span className="text-xs text-gray-500">Core legal, corporate and domain records verified by Federal Ministry.</span>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded bg-gray-100 text-blue-600 text-[10px] font-bold uppercase tracking-wider">Verified Org</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Tenant Name */}
                  <div className="md:col-span-2 flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-700" htmlFor="tenantName">
                      Tenant Organization Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      className="w-full px-4 py-2.5 rounded-lg bg-gray-100 text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
                      id="tenantName"
                      type="text"
                      value={tenantName}
                      onChange={(e) => setTenantName(e.target.value)}
                    />
                  </div>

                  {/* Tenant Code (Read-Only) */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-gray-700" htmlFor="tenantCode">Tenant Short Code</label>
                      <span className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Read-Only
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        className="w-full pl-4 pr-10 py-2.5 rounded-lg bg-gray-200 text-gray-600 font-mono text-sm font-semibold cursor-not-allowed shadow-sm"
                        id="tenantCode"
                        readOnly
                        type="text"
                        value={tenantCode}
                      />
                      <svg className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-500">System-generated identifier for tenancy isolation.</span>
                  </div>

                  {/* CAC Number */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-700" htmlFor="cacNumber">CAC Registration Number</label>
                    <input
                      className="w-full px-4 py-2.5 rounded-lg bg-gray-100 text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
                      id="cacNumber"
                      placeholder="RC-XXXXXX"
                      type="text"
                      value={cacNumber}
                      onChange={(e) => setCacNumber(e.target.value)}
                    />
                    <span className="text-xs text-gray-500">Corporate Affairs Commission accreditation.</span>
                  </div>

                  {/* Subdomain */}
                  <div className="md:col-span-2 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-gray-700" htmlFor="subdomain">Portal Subdomain</label>
                      <div className="flex items-center gap-1 text-green-600 text-[10px] font-bold uppercase">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span>Verified Domain • SSL TLS 1.3 Active</span>
                      </div>
                    </div>
                    <div className="flex rounded-lg overflow-hidden shadow-sm bg-gray-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20">
                      <input
                        className="flex-1 px-4 py-2.5 bg-transparent text-gray-900 text-sm focus:outline-none text-right font-medium"
                        id="subdomain"
                        type="text"
                        value={subdomain}
                        onChange={(e) => setSubdomain(e.target.value)}
                      />
                      <span className="px-4 py-2.5 bg-gray-200 text-gray-600 text-sm select-none font-semibold">.edumanage.ng</span>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2 flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-700" htmlFor="address">Physical Headquarters Address</label>
                    <input
                      className="w-full px-4 py-2.5 rounded-lg bg-gray-100 text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
                      id="address"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  {/* State */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-700" htmlFor="stateSelect">State of Operation</label>
                    <div className="relative">
                      <select
                        className="w-full appearance-none px-4 py-2.5 pr-10 rounded-lg bg-gray-100 text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
                        id="stateSelect"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      >
                        <option value="Lagos State">Lagos State</option>
                        <option value="FCT Abuja">Federal Capital Territory (Abuja)</option>
                        <option value="Rivers State">Rivers State</option>
                        <option value="Oyo State">Oyo State</option>
                        <option value="Kano State">Kano State</option>
                        <option value="Kaduna State">Kaduna State</option>
                        <option value="Enugu State">Enugu State</option>
                      </select>
                      <svg className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* LGA */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-700" htmlFor="lgaSelect">Local Government Area (LGA)</label>
                    <div className="relative">
                      <select
                        className="w-full appearance-none px-4 py-2.5 pr-10 rounded-lg bg-gray-100 text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
                        id="lgaSelect"
                        value={lga}
                        onChange={(e) => setLga(e.target.value)}
                      >
                        <option value="Eti-Osa LGA">Eti-Osa LGA</option>
                        <option value="Ikeja LGA">Ikeja LGA</option>
                        <option value="Lagos Island LGA">Lagos Island LGA</option>
                        <option value="Surulere LGA">Surulere LGA</option>
                        <option value="Alimosho LGA">Alimosho LGA</option>
                      </select>
                      <svg className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Primary Contact & Root Administrator */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-blue-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <h2 className="text-lg font-semibold text-gray-900">2. Primary Contact & Root Administrator</h2>
                      <span className="text-xs text-gray-500">The designated superintendent or system custodian with root tenant credentials.</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Admin Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-700" htmlFor="adminName">Contact Full Name</label>
                    <div className="relative">
                      <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <input
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-100 text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
                        id="adminName"
                        type="text"
                        value={adminName}
                        onChange={(e) => setAdminName(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Admin Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-700" htmlFor="adminEmail">Official Institutional Email</label>
                    <div className="relative">
                      <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                      <input
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-100 text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
                        id="adminEmail"
                        type="email"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Admin Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-700" htmlFor="adminPhone">Phone Number (SMS Alert Gateway)</label>
                    <div className="relative">
                      <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <input
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-100 text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
                        id="adminPhone"
                        type="text"
                        value={adminPhone}
                        onChange={(e) => setAdminPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Security Role */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-700">Administrative Security Role</label>
                    <div className="px-4 py-2.5 rounded-lg bg-gray-100 flex items-center justify-between">
                      <span className="text-sm text-gray-900 font-medium">Tenant Root Administrator (Level 4)</span>
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Admin Actions */}
                <div className="p-4 rounded-xl bg-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center text-blue-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-gray-900">Root Credential Lifecycle</span>
                      <span className="text-xs text-gray-500">Last administrative logon: Today at 08:42 WAT via Lagos Fiber</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => alert('Temporary reset token dispatched to ' + adminEmail)}
                      className="px-4 py-2 rounded-lg bg-gray-200 text-blue-600 hover:bg-gray-300 transition-colors text-xs font-semibold inline-flex items-center gap-1.5 shadow-sm"
                      type="button"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span>Reset Admin Password</span>
                    </button>
                    <button
                      onClick={() => alert('Welcome onboard invitation email re-sent.')}
                      className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors text-xs font-semibold inline-flex items-center gap-1.5 shadow-sm"
                      type="button"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>Resend Welcome Email</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Section 3: Subscription Plan & Quota */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-blue-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <h2 className="text-lg font-semibold text-gray-900">3. Subscription Plan & Quota</h2>
                      <span className="text-xs text-gray-500">Manage federal licensing tier, seat allocations, and operational status.</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-green-100 text-green-700 uppercase">Contract Guaranteed</span>
                </div>

                {/* Plan Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Basic */}
                  <label className="relative p-4 rounded-xl bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors flex flex-col gap-2">
                    <input
                      className="absolute top-4 right-4"
                      name="subPlan"
                      type="radio"
                      value="standard"
                      checked={subscriptionTier === 'standard'}
                      onChange={(e) => setSubscriptionTier(e.target.value)}
                    />
                    <span className="text-lg font-semibold text-gray-900">Basic Standard</span>
                    <span className="text-xs text-gray-500">Up to 1,000 students • Single campus node</span>
                    <div className="mt-2 text-blue-600 text-sm font-semibold">
                      NGN 1.2M <span className="text-xs text-gray-500">/yr</span>
                    </div>
                  </label>

                  {/* Enterprise (Selected) */}
                  <label className="relative p-4 rounded-xl bg-gray-100 cursor-pointer shadow-md flex flex-col gap-2 ring-2 ring-blue-600">
                    <input
                      checked={subscriptionTier === 'enterprise'}
                      className="absolute top-4 right-4"
                      name="subPlan"
                      type="radio"
                      value="enterprise"
                      onChange={(e) => setSubscriptionTier(e.target.value)}
                    />
                    <div className="flex items-center gap-1.5">
                      <span className="text-lg font-semibold text-gray-900 font-bold">Enterprise Plan</span>
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-600">Multi-campus federation • Offline mesh sync • 99.98% SLA</span>
                    <div className="mt-2 text-blue-600 text-lg font-bold">Custom Contract</div>
                  </label>

                  {/* Federal District */}
                  <label className="relative p-4 rounded-xl bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors flex flex-col gap-2">
                    <input
                      className="absolute top-4 right-4"
                      name="subPlan"
                      type="radio"
                      value="district"
                      checked={subscriptionTier === 'district'}
                      onChange={(e) => setSubscriptionTier(e.target.value)}
                    />
                    <span className="text-lg font-semibold text-gray-900">Federal District</span>
                    <span className="text-xs text-gray-500">Unlimited campuses • State Ministry oversight</span>
                    <div className="mt-2 text-blue-600 text-sm font-semibold">Govt Subsidized</div>
                  </label>
                </div>

                {/* Seats, Renewal, Status */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 mt-4">
                  {/* Student Seats */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-700" htmlFor="seatCount">Allocated Student Seats</label>
                    <div className="relative">
                      <input
                        className="w-full px-4 py-2.5 rounded-lg bg-gray-100 text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm font-semibold"
                        id="seatCount"
                        step={100}
                        type="number"
                        value={seatCount}
                        onChange={(e) => setSeatCount(parseInt(e.target.value))}
                      />
                      <svg className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-500">Current Active: 2,418 enrolled students</span>
                  </div>

                  {/* Renewal Date */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-700" htmlFor="renewalDate">Contract Renewal Date</label>
                    <input
                      className="w-full px-4 py-2.5 rounded-lg bg-gray-100 text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
                      id="renewalDate"
                      type="date"
                      value={renewalDate}
                      onChange={(e) => setRenewalDate(e.target.value)}
                    />
                    <span className="text-xs text-gray-500">Term duration: 3-Year Triennial License</span>
                  </div>

                  {/* Operational Status */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-700">Operational Status</label>
                    <div className="flex items-center gap-1.5 p-1 rounded-lg bg-gray-100">
                      <button
                        onClick={() => setOperationalStatus('active')}
                        className={`flex-1 py-1.5 rounded-md text-[10px] uppercase font-bold text-center shadow-sm transition-colors ${
                          operationalStatus === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'hover:bg-gray-200 text-gray-600'
                        }`}
                        type="button"
                      >
                        Active
                      </button>
                      <button
                        onClick={() => setOperationalStatus('suspended')}
                        className={`flex-1 py-1.5 rounded-md text-[10px] uppercase font-bold text-center transition-colors ${
                          operationalStatus === 'suspended'
                            ? 'bg-amber-100 text-amber-700'
                            : 'hover:bg-gray-200 text-gray-600'
                        }`}
                        type="button"
                      >
                        Suspended
                      </button>
                      <button
                        onClick={() => setOperationalStatus('pending')}
                        className={`flex-1 py-1.5 rounded-md text-[10px] uppercase font-bold text-center transition-colors ${
                          operationalStatus === 'pending'
                            ? 'bg-blue-100 text-blue-700'
                            : 'hover:bg-gray-200 text-gray-600'
                        }`}
                        type="button"
                      >
                        Pending
                      </button>
                    </div>
                    <span className="text-xs text-green-600">System accessible without restrictions</span>
                  </div>
                </div>
              </div>

              {/* Section 4: Danger Zone */}
              <div className="rounded-xl p-6 bg-red-50/50 flex flex-col gap-6 shadow-sm border border-red-100">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-lg font-semibold text-red-900 font-bold">4. Danger Zone</h2>
                    <p className="text-sm text-gray-600 mt-0.5">
                      Destructive administrative actions that immediately revoke credentials, freeze subdomains, or scrub student data arrays permanently across federal servers.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col divide-y divide-gray-200 gap-4">
                  {/* Deactivate */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                    <div className="flex flex-col max-w-lg">
                      <span className="text-lg font-semibold text-gray-900">Deactivate Tenant</span>
                      <span className="text-xs text-gray-600">Temporarily suspend portal access and pause student services for {tenantName}. Inbound and outbound API endpoints will respond with HTTP 423 (Locked).</span>
                    </div>
                    <button
                      onClick={handleDeactivate}
                      className="px-4 py-2.5 rounded-lg bg-gray-200 text-red-600 hover:bg-red-100 transition-colors text-sm font-semibold inline-flex items-center gap-1.5 flex-shrink-0 shadow-sm"
                      type="button"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Deactivate Tenant</span>
                    </button>
                  </div>

                  {/* Delete */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
                    <div className="flex flex-col max-w-lg">
                      <span className="text-lg font-semibold text-red-600">Delete Tenant Permanently</span>
                      <span className="text-xs text-gray-600">Irrevocably erase this tenant organization, branches, academic records, and Nigerian National Student Identity mappings. This operation cannot be undone.</span>
                    </div>
                    <button
                      onClick={handleDelete}
                      className="px-4 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors text-sm font-semibold inline-flex items-center gap-1.5 flex-shrink-0 shadow-sm"
                      type="button"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span>Delete Tenant</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar (4 cols) */}
            <div className="xl:col-span-4 flex flex-col gap-6">
              {/* Health & Sync Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-900">Instance Health & Sync</span>
                  <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase">Optimal</span>
                </div>

                {/* Quota Bar */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-600">Seat Quota Consumption</span>
                    <span className="font-semibold text-gray-900">2,418 / 3,000 (80.6%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '80.6%' }}></div>
                  </div>
                </div>

                {/* Storage Bar */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-600">Local Edge Storage</span>
                    <span className="font-semibold text-gray-900">14.2 GB / 50 GB</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                    <div className="h-full bg-green-600 rounded-full" style={{ width: '28.4%' }}></div>
                  </div>
                </div>

                {/* Campus Node Count */}
                <div className="p-2 rounded-lg bg-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span className="text-xs text-gray-900">Registered Sub-campuses</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">4 Nodes</span>
                </div>
              </div>

              {/* Campus Image */}
              <div className="relative rounded-xl overflow-hidden shadow-sm">
                <div className="w-full h-44 bg-gradient-to-br from-blue-200 to-blue-400"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 flex flex-col justify-end text-white">
                  <span className="text-[10px] uppercase text-blue-200 tracking-wider font-bold">Primary Installation</span>
                  <span className="text-lg font-bold">Victoria Island Main Campus</span>
                  <span className="text-xs text-gray-200">Connected to Mainframe Gateway IXPN-Lagos</span>
                </div>
              </div>

              {/* Audit Trail */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-900">Recent Administrative Audits</span>
                  <a className="text-[10px] font-bold text-blue-600 uppercase hover:underline" href="#">View All</a>
                </div>

                <div className="flex flex-col gap-2 text-xs">
                  <div className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></span>
                    <div className="flex flex-col">
                      <span className="text-gray-900 font-medium">Seat quota increased (+500)</span>
                      <span className="text-gray-500 text-xs">By Dr. Farouk Bello • 04 Feb 2025</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-green-600 mt-1.5 flex-shrink-0"></span>
                    <div className="flex flex-col">
                      <span className="text-gray-900 font-medium">DNS CNAME ace-group.edumanage.ng renewed</span>
                      <span className="text-gray-500 text-xs">Automated system cert • 14 Jan 2025</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-gray-400 mt-1.5 flex-shrink-0"></span>
                    <div className="flex flex-col">
                      <span className="text-gray-900 font-medium">CAC compliance records re-verified</span>
                      <span className="text-gray-500 text-xs">By Compliance Dept • 20 Nov 2024</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Server Spec */}
              <div className="p-4 rounded-xl bg-gray-100 flex items-center justify-between text-gray-600 text-xs">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                  <span>
                    Cluster Node: <strong>NG-WEST-2B</strong>
                  </span>
                </div>
                <span className="font-mono text-gray-500 font-medium text-[11px]">v4.8.12-rc</span>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Floating Status Badge */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-2.5 rounded-full bg-blue-600 text-white shadow-lg">
        <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-ping"></span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div className="flex flex-col leading-none">
          <span className="text-xs font-semibold">Online & Synced</span>
          <span className="text-[10px] font-bold text-blue-200">Offline-first ready</span>
        </div>
      </div>
    </div>
  )
}
