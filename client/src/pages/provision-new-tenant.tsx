import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/store'
import { useLogout } from '@/hooks'

export default function ProvisionNewTenantPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const logout = useLogout()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Corporate Identity
    organizationName: 'Corona Schools Trust Council',
    cacNumber: 'RC-948218',
    federalTaxId: '2499-1936-0819',
    state: 'Lagos State (South-West Zone)',
    lga: 'Ikoyi / Obalende LGA',
    address: '72 Raymond Njoku Street, SW Ikoyi, Lagos Island, Nigeria',
    domainSlug: 'corona',
    primaryExecutive: 'Chief Dr. Adebayo Adeleke',
    governanceRole: 'Chairman, Board of Trustees / Proprietor',
    email: 'adebayo.adeleke@coronaschools.org',
    phone: '+234 803 456 7898',
    ubecAccreditation: true,

    // Step 2: Multi-Campus Topology
    numberOfCampuses: '4',
    primaryCampus: 'Corona School Gbagada (Main Campus)',
    campusRegion: 'Lagos Metro / South-West Zone',
    totalLearnerQuota: '2500',
    totalStaffLicenses: '80',
    expectedEnrollment: '2265',

    // Step 3: Sovereign Edge DB
    edgeNodeRegion: 'Lagos (Primary)',
    replicationMode: 'Encrypted Multi-Region',
    encryptedReplica: true,
    ndpaCompliance: true
  })

  const handleLogout = () => {
    logout.mutate()
  }

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Left: Logo & Menu Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ACE EDUManage</h1>
                <p className="text-xs text-gray-600">Enterprise Nigeria</p>
              </div>
            </div>
          </div>

          {/* Right: User Menu */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Settings */}
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.fullName || 'Super Admin'}</p>
                <p className="text-xs text-gray-600">Federal Root Authority</p>
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {user?.fullName?.charAt(0) || 'S'}
                </span>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'w-64' : 'w-0'
          } bg-slate-900 text-white transition-all duration-300 overflow-hidden flex-shrink-0`}
        >
          <nav className="p-4 space-y-1">
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
                Federal Operations
              </p>
              <Link
                to="/dashboard"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive('/dashboard')
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-slate-800'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="font-medium">Core Infrastructure</span>
              </Link>

              <Link
                to="/dashboard"
                className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive('/provision-new-tenant')
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="font-medium">Tenants & Orgs</span>
                </div>
                <span className="px-2 py-0.5 bg-teal-500 text-white text-xs font-bold rounded">1,248</span>
              </Link>

              <Link
                to="/schools"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive('/schools')
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-slate-800'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="font-medium">Schools & Campuses</span>
              </Link>

              <Link
                to="/dashboard"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-gray-300 hover:bg-slate-800"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">Multi-Region Nodes</span>
              </Link>

              <Link
                to="/dashboard"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-gray-300 hover:bg-slate-800"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="font-medium">NDPA Compliance</span>
              </Link>

              <Link
                to="/dashboard"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-gray-300 hover:bg-slate-800"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="font-medium">Billing & Quotas</span>
              </Link>

              <Link
                to="/dashboard"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-gray-300 hover:bg-slate-800"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                <span className="font-medium">System Audit Logs</span>
              </Link>
            </div>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {/* Breadcrumb */}
          <div className="bg-white border-b border-gray-200 px-6 py-3">
            <div className="flex items-center gap-2 text-sm">
              <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
                Tenants & Orgs
              </Link>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-600">Provisioning Engine</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-blue-600 font-medium">New Tenant Setup</span>
            </div>
          </div>

          {/* Page Content */}
          <div className="p-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-teal-100 text-teal-700 text-xs font-bold rounded">
                      ROOT ENCLAVE ORCHESTRATOR
                    </span>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Provision New Educational Tenant &amp; Trust Organization
                  </h1>
                  <p className="text-gray-600">
                    Instantiate sovereign educational entity, query real-time CAC verification gateway, and prepare
                    decentralized SQLite storage nodes compliant with the Nigerian Data Protection Act (NDPA 2023).
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <div>
                      <p className="text-xs text-gray-600 uppercase">Enclave</p>
                      <p className="text-sm font-bold text-gray-900">SECURITY LEVEL</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-gray-900">FIPS140-3</p>
                  <p className="text-sm text-gray-600">Level 3</p>
                  <p className="text-xs text-gray-600">Hardware Root</p>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center gap-4 mb-6">
                {/* Step 1 */}
                <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 flex-1 ${
                  currentStep === 1
                    ? 'border-blue-500 bg-blue-50'
                    : currentStep > 1
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${
                    currentStep === 1
                      ? 'bg-blue-600 text-white'
                      : currentStep > 1
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {currentStep > 1 ? '✓' : '01'}
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase">
                      {currentStep === 1 ? 'Step 01 • In Progress (33%)' : currentStep > 1 ? 'Step 01 • Completed' : 'Step 01 • Pending'}
                    </p>
                    <p className={`font-semibold ${currentStep >= 1 ? 'text-gray-900' : 'text-gray-700'}`}>
                      Corporate Identity &amp; CAC
                    </p>
                    <p className="text-xs text-gray-600">Statutory RC, accreditation &amp; root key</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 flex-1 ${
                  currentStep === 2
                    ? 'border-blue-500 bg-blue-50'
                    : currentStep > 2
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${
                    currentStep === 2
                      ? 'bg-blue-600 text-white'
                      : currentStep > 2
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {currentStep > 2 ? '✓' : '02'}
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase">
                      {currentStep === 2 ? 'Step 02 • In Progress (66%)' : currentStep > 2 ? 'Step 02 • Completed' : 'Step 02 • Pending'}
                    </p>
                    <p className={`font-semibold ${currentStep >= 2 ? 'text-gray-900' : 'text-gray-700'}`}>
                      Multi-Campus Topology
                    </p>
                    <p className="text-xs text-gray-600">Branch locations, staff licenses</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 flex-1 ${
                  currentStep === 3
                    ? 'border-blue-500 bg-blue-50'
                    : currentStep > 3
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${
                    currentStep === 3
                      ? 'bg-blue-600 text-white'
                      : currentStep > 3
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {currentStep > 3 ? '✓' : '03'}
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase">
                      {currentStep === 3 ? 'Step 03 • In Progress (100%)' : currentStep > 3 ? 'Step 03 • Completed' : 'Step 03 • Pending'}
                    </p>
                    <p className={`font-semibold ${currentStep >= 3 ? 'text-gray-900' : 'text-gray-700'}`}>
                      Sovereign Edge DB
                    </p>
                    <p className="text-xs text-gray-600">Decentralized node spin-up</p>
                  </div>
                </div>
              </div>

              {/* Step 1: Corporate Identity & CAC */}
              {currentStep === 1 && (
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Corporate & Statutory Registry</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Organization / Educational Trust Legal Name *
                        </label>
                        <input
                          type="text"
                          value={formData.organizationName}
                          onChange={(e) => setFormData({...formData, organizationName: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          CAC Registration Number (RC / IT / BN) *
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={formData.cacNumber}
                            onChange={(e) => setFormData({...formData, cacNumber: e.target.value})}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                            Query CAC Gateway
                          </button>
                        </div>
                        <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
                          ✓ CAC Registry Verified: Active Trust Council - STATUS: COMPLIANT
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Sovereign Tenant Domain Slug *
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={formData.domainSlug}
                            onChange={(e) => setFormData({...formData, domainSlug: e.target.value})}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                          <div className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-700">
                            .edumanage.ng
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Root Council Authority</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Primary Executive / Appointed Trustee Full Name *
                        </label>
                        <input
                          type="text"
                          value={formData.primaryExecutive}
                          onChange={(e) => setFormData({...formData, primaryExecutive: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Official Institutional Email Address *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Direct Emergency Phone *
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Multi-Campus Topology & Quotas */}
              {currentStep === 2 && (
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Campus Network Topology</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Total Number of Branch Campuses *
                        </label>
                        <input
                          type="number"
                          value={formData.numberOfCampuses}
                          onChange={(e) => setFormData({...formData, numberOfCampuses: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <p className="mt-1 text-xs text-gray-600">
                          Including main campus and all satellite branches
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Primary / Headquarters Campus *
                        </label>
                        <input
                          type="text"
                          value={formData.primaryCampus}
                          onChange={(e) => setFormData({...formData, primaryCampus: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Geographic Region / Zone *
                        </label>
                        <select
                          value={formData.campusRegion}
                          onChange={(e) => setFormData({...formData, campusRegion: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option>Lagos Metro / South-West Zone</option>
                          <option>Abuja FCT / North-Central Zone</option>
                          <option>Port Harcourt / South-South Zone</option>
                          <option>Kano / North-West Zone</option>
                          <option>Enugu / South-East Zone</option>
                          <option>Calabar / South-South Zone</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Resource Allocation & Quotas</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Total Learner Quota (All Campuses) *
                        </label>
                        <input
                          type="number"
                          value={formData.totalLearnerQuota}
                          onChange={(e) => setFormData({...formData, totalLearnerQuota: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <p className="mt-1 text-xs text-gray-600">
                          Maximum concurrent learners across all campuses
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Total Staff Licenses *
                        </label>
                        <input
                          type="number"
                          value={formData.totalStaffLicenses}
                          onChange={(e) => setFormData({...formData, totalStaffLicenses: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <p className="mt-1 text-xs text-gray-600">
                          Teachers, administrators, and support staff
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Expected Current Enrollment *
                        </label>
                        <input
                          type="number"
                          value={formData.expectedEnrollment}
                          onChange={(e) => setFormData({...formData, expectedEnrollment: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
                          ℹ Quota utilization: {Math.round((parseInt(formData.expectedEnrollment) / parseInt(formData.totalLearnerQuota)) * 100)}% ({formData.expectedEnrollment} / {formData.totalLearnerQuota})
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Sovereign Edge DB & Live Activation */}
              {currentStep === 3 && (
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Decentralized SQLite Edge Configuration</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Primary Edge Node Region *
                        </label>
                        <select
                          value={formData.edgeNodeRegion}
                          onChange={(e) => setFormData({...formData, edgeNodeRegion: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option>Lagos (Primary)</option>
                          <option>Abuja (Federal Capital)</option>
                          <option>Port Harcourt (South-South Hub)</option>
                          <option>Kano (Northern Hub)</option>
                        </select>
                        <p className="mt-1 text-xs text-gray-600">
                          Nearest geographic node for optimal latency
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Replication Strategy *
                        </label>
                        <select
                          value={formData.replicationMode}
                          onChange={(e) => setFormData({...formData, replicationMode: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option>Encrypted Multi-Region</option>
                          <option>Single-Region (No Replication)</option>
                          <option>Cross-Zone Redundancy</option>
                        </select>
                      </div>

                      <div>
                        <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.encryptedReplica}
                            onChange={(e) => setFormData({...formData, encryptedReplica: e.target.checked})}
                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Enable AES-256 Encrypted Replication
                            </p>
                            <p className="text-xs text-gray-600">
                              All data replicated to secondary nodes is encrypted at rest
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">NDPA Compliance & Live Activation</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.ndpaCompliance}
                            onChange={(e) => setFormData({...formData, ndpaCompliance: e.target.checked})}
                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              ✓ NDPA 2023 Compliance Acknowledgment *
                            </p>
                            <p className="text-xs text-gray-600">
                              Data sovereignty and privacy rules will be enforced
                            </p>
                          </div>
                        </label>
                      </div>

                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h4 className="text-sm font-bold text-green-900 mb-2">Ready for Live Activation</h4>
                        <ul className="space-y-1 text-xs text-green-700">
                          <li>✓ CAC Verification: Compliant</li>
                          <li>✓ Campus Topology: {formData.numberOfCampuses} campuses configured</li>
                          <li>✓ Resource Quotas: {formData.totalLearnerQuota} learners / {formData.totalStaffLicenses} staff</li>
                          <li>✓ Edge Node: {formData.edgeNodeRegion}</li>
                          <li>✓ Replication: {formData.replicationMode}</li>
                          <li>✓ NDPA Compliance: Enabled</li>
                        </ul>
                      </div>

                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="text-sm font-bold text-blue-900 mb-2">Post-Activation Steps</h4>
                        <ol className="space-y-1 text-xs text-blue-700 list-decimal list-inside">
                          <li>Tenant will receive activation email with credentials</li>
                          <li>Edge DB node will be provisioned (~2-5 minutes)</li>
                          <li>Initial admin account will be created</li>
                          <li>Tenant can begin adding campus-specific data</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
                <Link
                  to="/dashboard"
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
                >
                  Cancel & Return to Tenants
                </Link>
                <div className="flex items-center gap-3">
                  {currentStep > 1 && (
                    <button
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
                    >
                      ← Back to Step {currentStep - 1}
                    </button>
                  )}
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                    Save Staged Draft
                  </button>
                  {currentStep === 1 && (
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                    >
                      Continue to Step 2: Multi-Campus Topology & Quotas →
                    </button>
                  )}
                  {currentStep === 2 && (
                    <button
                      onClick={() => setCurrentStep(3)}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                    >
                      Continue to Step 3: Sovereign Edge DB →
                    </button>
                  )}
                  {currentStep === 3 && (
                    <button
                      onClick={() => {
                        // In a real app, this would submit the form to backend
                        // For now, navigate to the deployment success page
                        navigate('/tenant-deployed/oasis-940218')
                      }}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
                    >
                      🚀 Activate Tenant Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
