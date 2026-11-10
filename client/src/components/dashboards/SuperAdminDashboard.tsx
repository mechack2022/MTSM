import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Mock data for tenants
  const tenants = [
    {
      id: 1,
      name: 'Corona Schools Trust Council',
      abbreviation: 'C',
      color: 'bg-blue-100 text-blue-700',
      regNumber: '#62418',
      email: 'corona.edu@manage.ng',
      website: 'https://corona.edu',
      type: 'ENTERPRISE',
      status: 'Active SUBEB',
      campuses: 4,
      proprietor: 'Council Secretariat',
      proprietorEmail: 'council@coronatrust.org.ng',
      proprietorLocation: 'GRA Interstate Percent',
      learnerQuota: { used: 2265, total: 2500, percentage: 88 },
      badges: ['355 Licensees Remaining']
    },
    {
      id: 2,
      name: 'Pilot Education Organization',
      abbreviation: 'P',
      color: 'bg-teal-100 text-teal-700',
      regNumber: 'BN8182',
      email: 'pilot.edu@manage.ng',
      website: 'https://pilot.edu',
      type: 'PRO MULTI',
      status: 'About PEO',
      campuses: 1,
      proprietor: 'Dr. Bola Adati (Director)',
      proprietorEmail: 'adati@pilotar.org',
      proprietorLocation: 'Redemption Area',
      learnerQuota: { used: 420, total: 650, percentage: 64 },
      badges: ['230 Licenses Available']
    },
    {
      id: 3,
      name: 'ACE Education Group',
      abbreviation: 'A',
      color: 'bg-amber-100 text-amber-700',
      regNumber: 'RC5560',
      email: 'ace.edu@manage.ng',
      website: 'https://aceed.ng',
      type: 'ENTERPRISE',
      status: 'Rivers State',
      campuses: 6,
      proprietor: 'Chief Tinyé Ekwere',
      proprietorEmail: 'chieftinye@aceedu.org.ng',
      proprietorLocation: '62 Admin Engineering',
      learnerQuota: { used: 1893, total: 2000, percentage: 94 },
      badges: ['107 Open Seats']
    },
    {
      id: 4,
      name: 'Crescent Heights Educational Trust',
      abbreviation: 'C',
      color: 'bg-indigo-100 text-indigo-700',
      regNumber: 'IT86882',
      email: 'crescent.edu@manage.ng',
      website: 'https://crescent.edu',
      type: 'PRO MULTI',
      status: 'Kano State',
      campuses: 3,
      proprietor: 'Hajia Maryam Danjuma',
      proprietorEmail: 'hmdanjuma@crescent.edu.ng',
      proprietorLocation: 'Verified RNDOZ',
      learnerQuota: { used: 1106, total: 1600, percentage: 62 },
      badges: ['494 Available Seat']
    },
    {
      id: 5,
      name: 'Ifedore Community Schools Board',
      abbreviation: 'I',
      color: 'bg-emerald-100 text-emerald-700',
      regNumber: 'LGSE-SMB-6381',
      email: 'ifedore.edu@manage.ng',
      website: 'https://ifedore.edu',
      type: 'THEME PARTNERS',
      status: 'Ondo State',
      campuses: 8,
      proprietor: 'Hon. Kehinde Adegbite',
      proprietorEmail: 'kadegbite@ifedorelsb.ng',
      proprietorLocation: 'Ọ Oshanbọ SEO Enclaves',
      learnerQuota: { used: 4062, total: 10000, percentage: 64 },
      badges: ['State Subsidy Quota']
    },
    {
      id: 6,
      name: 'Kenny Schools Group',
      abbreviation: 'K',
      color: 'bg-purple-100 text-purple-700',
      regNumber: 'IT77643',
      email: 'kenny@schools.edu@manage.ng',
      website: 'https://kenny.edu',
      type: 'GROWTH',
      status: 'Kano State',
      campuses: 4,
      proprietor: 'Pastor Kehinde Ogunlekan',
      proprietorEmail: 'pogunlekan@kenny.ng',
      proprietorLocation: 'BNS 39A Active',
      learnerQuota: { used: 780, total: 1000, percentage: 78 },
      badges: ['220 Open Seats']
    },
    {
      id: 7,
      name: 'T-Academy Educational Foundation',
      abbreviation: 'T',
      color: 'bg-blue-100 text-blue-700',
      regNumber: 'RC26619',
      email: 't.academy.edu@manage.ng',
      website: 'https://t-academy.edu',
      type: 'GROWTH',
      status: 'Lagos State',
      campuses: 2,
      proprietor: 'Mrs. Funmilayo Adebayo',
      proprietorEmail: 'fadebayo@tacademy.org.ng',
      proprietorLocation: 'Akinpelumi Ero',
      learnerQuota: { used: 458, total: 680, percentage: 67 },
      badges: ['222 Open Seats']
    }
  ]

  const filteredTenants = tenants.filter(tenant =>
    tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tenant.regNumber.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">
                  NG2-FED SUPERSADMIN ENCLAVE
                </span>
                <span className="text-xs text-gray-500">◎ NJURE 2025 SECURED</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                Enterprise Tenant &amp; Multi-School Governance Console
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Provision, version, and monitor trust councils, state school boards, and private multi-campus proprietors across Nigeria.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export Statutory Registry
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Bulk Ingest (CSV/API)
            </button>
            <Link
              to="/provision-new-tenant"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Provision New Tenant
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Active Tenants */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <p className="text-xs font-semibold text-gray-600 uppercase">Active Tenants</p>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <h3 className="text-4xl font-bold text-gray-900">48</h3>
          </div>
          <p className="text-xs text-gray-600 mb-3">Live State Boards</p>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">+4 this month</span>
              <span className="px-2 py-0.5 bg-teal-100 text-teal-700 font-semibold rounded">100% Up</span>
            </div>
          </div>
        </div>

        {/* School Campuses */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <p className="text-xs font-semibold text-gray-600 uppercase">School Campuses</p>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <h3 className="text-4xl font-bold text-gray-900">184</h3>
          </div>
          <p className="text-xs text-gray-600 mb-3">Campus Enclaves</p>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">24 States Onboard</span>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 font-semibold rounded">Fed Reach</span>
            </div>
          </div>
        </div>

        {/* Learner Quotas */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <p className="text-xs font-semibold text-gray-600 uppercase">Learner Quotas</p>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <h3 className="text-4xl font-bold text-gray-900">86.4k</h3>
          </div>
          <p className="text-xs text-gray-600 mb-3">KAN</p>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">73% Peak Alloc</span>
              <span className="px-2 py-0.5 bg-green-100 text-green-700 font-semibold rounded">21.5k Left</span>
            </div>
          </div>
        </div>

        {/* Edge-Board Nodes */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
            </svg>
            <p className="text-xs font-semibold text-gray-600 uppercase">Edge-Board Nodes</p>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <h3 className="text-4xl font-bold text-gray-900">184</h3>
          </div>
          <p className="text-xs text-gray-600 mb-3">Live SQL or Edge Shards</p>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">9 new zone</span>
              <span className="px-2 py-0.5 bg-purple-100 text-purple-700 font-semibold rounded">1-49 Late</span>
            </div>
          </div>
        </div>

        {/* NOPA Compliance */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <p className="text-xs font-semibold text-gray-600 uppercase">NOPA Compliance</p>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <h3 className="text-4xl font-bold text-green-600">100%</h3>
          </div>
          <p className="text-xs text-gray-600 mb-3">Sovereign Seal Health</p>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Zero Cross-Tenant</span>
              <span className="px-2 py-0.5 bg-green-100 text-green-700 font-semibold rounded">Leak</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tenant Staging & Activation Cadence */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tenant Staging &amp; Activation Cadence</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Live Enclave */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-2xl font-bold text-gray-900">44</h4>
              <span className="px-3 py-1 bg-teal-100 text-teal-700 text-xs font-bold rounded">LIVE ENCLAVE</span>
            </div>
            <p className="text-sm text-gray-700 font-medium mb-2">Tenants</p>
            <p className="text-xs text-gray-600 mb-3">
              Active (KAN, PH, 5 private, verified SQLDB service cluster, designated Tenant-Edge)
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Serving 82,435 Students</span>
            </div>
          </div>

          {/* Awaiting Campuses */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-2xl font-bold text-gray-900">3</h4>
              <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded">AWAITING CAMPUSES</span>
            </div>
            <p className="text-sm text-gray-700 font-medium mb-2">Tenants</p>
            <p className="text-xs text-gray-600 mb-3">
              Tenant created, awaiting secondary training, registration &amp; financials seeds.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Corona Epo, Pilot North Node</span>
            </div>
          </div>

          {/* CAC & UBEC Staged */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-2xl font-bold text-gray-900">1</h4>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">CAC &amp; UBEC STAGED</span>
            </div>
            <p className="text-sm text-gray-700 font-medium mb-2">Tenant</p>
            <p className="text-xs text-gray-600 mb-3">
              Registration complete, pending with Federal Ministry of Education or UBEC desk-review.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Aqua Form Academy (Ilorin)</span>
            </div>
          </div>

          {/* Redgate Clean */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-2xl font-bold text-gray-900">0</h4>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">REDGATE CLEAN</span>
            </div>
            <p className="text-sm text-gray-700 font-medium mb-2">Breaches</p>
            <p className="text-xs text-gray-600 mb-3">
              No policy breaches are currently threading undue queries or surpassing schema-memory quota.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>National Ops-Access States</span>
            </div>
          </div>
        </div>
      </div>

      {/* Registered Educational Tenants Table */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Registered Educational Tenants &amp; Organizations</h3>
            <p className="text-sm text-gray-600">Entities with CAC verification and localized edge</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Filter by name, CAC/RC, domain, state"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>All Org Types</option>
              <option>Enterprise</option>
              <option>Pro Multi</option>
              <option>Theme Partners</option>
              <option>Growth</option>
            </select>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-4 border-b border-gray-200">
          <button
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'all'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('all')}
          >
            All Tenants (48)
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'archive'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('archive')}
          >
            Archive Enclaves (64)
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'pending'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('pending')}
          >
            Pending Campuses (3)
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'staged'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('staged')}
          >
            Staged / CAC Review (1)
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700">ORGANIZATION / IDENTITY</th>
                <th className="text-center py-3 px-4 font-medium text-gray-700">CAMPUSES</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">APPOINTED PROPRIETOR / ADMIN</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">LEARNER SEAT QUOTA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTenants.map((tenant) => (
                <tr key={tenant.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 ${tenant.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <span className="text-xl font-bold">{tenant.abbreviation}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900">{tenant.name}</h4>
                          <span className={`px-2 py-0.5 text-xs font-bold rounded ${
                            tenant.type === 'ENTERPRISE' ? 'bg-blue-100 text-blue-700' :
                            tenant.type === 'PRO MULTI' ? 'bg-purple-100 text-purple-700' :
                            tenant.type === 'THEME PARTNERS' ? 'bg-teal-100 text-teal-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {tenant.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-600">
                          <span>RC: {tenant.regNumber}</span>
                          <span>•</span>
                          <a href={`mailto:${tenant.email}`} className="text-blue-600 hover:text-blue-800">
                            {tenant.email}
                          </a>
                          <span>•</span>
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded">{tenant.status}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-2xl font-bold text-gray-900">{tenant.campuses}</span>
                    <p className="text-xs text-gray-600">Campuses</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-medium text-gray-900">{tenant.proprietor}</p>
                    <p className="text-xs text-gray-600">{tenant.proprietorEmail}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-xs text-gray-600">{tenant.proprietorLocation}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-bold text-gray-900">
                        {tenant.learnerQuota.used.toLocaleString()} / {tenant.learnerQuota.total.toLocaleString()}
                      </span>
                      <span className="text-sm font-semibold text-blue-600">
                        {tenant.learnerQuota.percentage}%
                      </span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${tenant.learnerQuota.percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600">{tenant.badges[0]}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Showing <strong>1-7</strong> of <strong>48</strong> Registered Educational Tenants • 100% Core Shared Synced
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
              &lt;
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm font-medium">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">2</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">3</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">...</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">7</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Grid - Recent Events & Edge Node Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tenant Provisioning Events */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Tenant Provisioning Events &amp; Audit Trail</h3>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">WATCHING LIVE</span>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Provisioning signed-client immediate-logs capturing domain shifts, edge shard mounts, and seat licensing.
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-blue-700 font-bold text-sm">B</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Crescent Heights Council added new campus: Corona Secondary School, Epe
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Partition code NG-LA-03 provisioned with 850 max-capacity • Primary Edge DB attached
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs">
                  <span className="text-gray-600">MSNR: <strong>943P44AA</strong></span>
                  <span className="text-gray-600">STR: <strong>Actor</strong></span>
                  <span className="text-gray-600">SBC: <strong>spec.supersadmin.ng</strong></span>
                </div>
              </div>
              <span className="text-xs text-gray-500 whitespace-nowrap">4m ago</span>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-purple-700 font-bold text-sm">P</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Pilot Education adjusted learner quota to 1,500
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Seat verification completed • New quotas increased student limit
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs">
                  <span className="text-gray-600">MSNR: <strong>RCJH341</strong></span>
                  <span className="text-gray-600">PRS: <strong>Port Authority</strong></span>
                </div>
              </div>
              <span className="text-xs text-gray-500 whitespace-nowrap">28m ago</span>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-amber-700 font-bold text-sm">E</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Equanimity requested for Crescent Heights Node-5 learner quota sync
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Tenancy main synchronized with zero drop/loss across Kano bridge cluster
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs">
                  <span className="text-gray-600">MSNR: <strong>60V43BXk9</strong></span>
                  <span className="text-gray-600">STR: <strong>Automated Shard Agent</strong></span>
                </div>
              </div>
              <span className="text-xs text-gray-500 whitespace-nowrap">2h ago</span>
            </div>
          </div>
          <button className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
            View Full Immutable Audit Trail →
          </button>
        </div>

        {/* National Edge Node Health */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">National Edge Node Health</h3>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">Health Active</span>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Active distributed SQL-lite replicas serving school node-lookup with zero packet drop.
          </p>
          <div className="space-y-4">
            {/* Lagos Node */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <h4 className="font-semibold text-gray-900">Lagos/Ikeja (LOS)</h4>
                </div>
                <span className="text-xs text-gray-600">Main Latency ∿ 99.99% Up</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-gray-600">Nodes</p>
                  <p className="font-bold text-gray-900">92 Nodes</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Latency</p>
                  <p className="font-bold text-green-600">∿ 99.99%</p>
                </div>
              </div>
            </div>

            {/* Abuja Node */}
            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <h4 className="font-semibold text-gray-900">Abuja/FCT (ABI)</h4>
                </div>
                <span className="text-xs text-gray-600">Main Latency ∿ 100% Up</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-gray-600">Nodes</p>
                  <p className="font-bold text-gray-900">42 Nodes</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Latency</p>
                  <p className="font-bold text-green-600">∿ 100%</p>
                </div>
              </div>
            </div>

            {/* Port Harcourt Node */}
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <h4 className="font-semibold text-gray-900">Port Harcourt (PHC)</h4>
                </div>
                <span className="text-xs text-gray-600">Main Latency ∿ 99.98%</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-gray-600">Nodes</p>
                  <p className="font-bold text-gray-900">28 Nodes</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Latency</p>
                  <p className="font-bold text-green-600">∿ 99.98%</p>
                </div>
              </div>
            </div>

            {/* Kano Node */}
            <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <h4 className="font-semibold text-gray-900">Kano/Sabon (KAN)</h4>
                </div>
                <span className="text-xs text-gray-600">Main Latency ∿ 99.99%</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-gray-600">Nodes</p>
                  <p className="font-bold text-gray-900">22 Nodes</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Latency</p>
                  <p className="font-bold text-green-600">∿ 99.99%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-gray-100 rounded-lg">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-700">
                <strong>Offline Queues:</strong> 0 Pending
              </span>
              <span className="text-green-700 font-semibold">100% Core Cluster Healthy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
