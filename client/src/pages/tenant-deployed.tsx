import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/store'
import { useLogout } from '@/hooks'

export default function TenantDeployedPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const logout = useLogout()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [masterKeyRevealed, setMasterKeyRevealed] = useState(false)

  const handleLogout = () => {
    logout.mutate()
  }

  const isActive = (path: string) => {
    return location.pathname === path
  }

  // Mock data for the deployed tenant
  const tenantData = {
    txId: 'TX-PRV-940218-LIVE',
    name: 'Oasis Educational Foundation',
    rcNumber: 'RC: 940218',
    cacNumber: 'RC-940218',
    nodeCluster: 'NG-FED-LOS-01',
    shardId: 'SHARD-OASIS-NG-01',
    domain: 'oasis.edumanage.ng',
    replication: '0.38ms (LOS-01 • ABJ-02)',
    proprietor: {
      name: 'Chief Dr. Adebayo Adeleke',
      phone: '+234 803 ***  8192',
      whatsapp: 'WhatsApp OTP • Route 14:41 WAT'
    },
    capacity: {
      learnerSeats: 3000,
      rollout: '₦2,125,000',
      subsidy: 'UBEC SUBSIDY'
    },
    campuses: [
      {
        name: 'Victoria Island Main Campus',
        type: 'HQ',
        address: 'Plot 148 Adeola Odeku St • Node ID: CRN-VI-01',
        status: 'ENCLAVE MOUNT READY',
        seats: 1200
      },
      {
        name: 'Lekki Phase I Branch',
        type: 'SATELLITE',
        address: 'Admiralty Way Gateway • Node ID: CRN-LKK-02',
        status: 'TURNSTILE PAIRING',
        seats: 1000
      },
      {
        name: 'Ikeja GRA Campus',
        type: 'SATELLITE',
        address: 'Isaac John St Promenade • Node ID: CRN-IKJ-03',
        status: 'TURNSTILE PAIRING',
        seats: 800
      }
    ],
    enclave: {
      key: 'BxdF4A88B9E1...C729d900802A4F1C',
      rootPasscode: 'OSIS-7842-ROOT-NG',
      blockHash: 'SHA-256 TRANSACTION HASH\n8f1c22c48b77d0d46508d1d08fa3c613b9d124781290df409240e47d26d5b2f091',
      timestamp: '2025-05-18 14:49:22 WAT',
      signingOperator: 'sec-ops@edumanage.ng'
    }
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
                <h1 className="text-xl font-bold text-gray-900">EduManage</h1>
                <p className="text-xs text-gray-600">ENTERPRISE NIGERIA</p>
              </div>
            </div>
          </div>

          {/* Center: System Status */}
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-600">All Systems Operational • 99.98% Edge Uptime</span>
          </div>

          {/* Right: User Menu */}
          <div className="flex items-center gap-4">
            {/* Region Badges */}
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded">MESH: LOS</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded">ABJ</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded">PHC</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded">KAN</span>
            </div>

            {/* SUPERADMIN Badge */}
            <span className="px-3 py-1 bg-blue-600 text-white text-sm font-bold rounded">SUPERADMIN</span>

            {/* Notifications */}
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Root Authority</p>
                <p className="text-xs text-gray-600">sec-ops@edumanage.ng</p>
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">R</span>
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
            {/* Root Partition Badge */}
            <div className="mb-6 p-3 bg-slate-800 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-400">Root Partition: NG-FED</span>
                <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded">Tier-4</span>
              </div>
            </div>

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
                  isActive('/tenants')
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
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-gray-300 hover:bg-slate-800"
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
            <div className="flex items-center justify-between">
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
                <span className="text-blue-600 font-medium">Launch Completion</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded">
                  {tenantData.txId}
                </span>
                <Link
                  to="/dashboard"
                  className="px-4 py-1.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700"
                >
                  ← All Tenants
                </Link>
              </div>
            </div>
          </div>

          {/* Tenant Name Header */}
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900">{tenantData.name}</h2>
              <span className="px-3 py-1 bg-teal-500 text-white text-xs font-bold rounded">
                {tenantData.cacNumber}
              </span>
            </div>
          </div>

          {/* Live Status Badge */}
          <div className="px-6 py-3 bg-green-50 border-b border-green-200">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-bold text-green-900">LIVE DEPLOYED • NDPA TIER-4 VAULT</span>
              <span className="text-sm text-green-700">Replication Mesh Synchronized (14ms)</span>
            </div>
          </div>

          {/* Page Content */}
          <div className="p-6">
            {/* Success Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-lg p-8 mb-6 text-white">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-2 opacity-90">FEDERAL AUTONOMOUS SHARD • Node Cluster: {tenantData.nodeCluster}</p>
                    <h1 className="text-3xl font-bold mb-3">Tenant Provisioned & Sovereign Enclave Activated</h1>
                    <p className="text-lg opacity-90">
                      {tenantData.name} ({tenantData.rcNumber}) is mounted onto the Nigerian Federal Edge Mesh.
                      Decentralized SQLite replicas are online with dual-region hot-standby and zero cold-start latency.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Link
                    to="/tenant-observer/oasis-940218"
                    className="px-4 py-2 bg-white text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Open Observer Console
                  </Link>
                  <Link
                    to="/tenant-gazette/oasis-940218"
                    className="px-4 py-2 bg-white/20 text-white rounded-lg text-sm font-medium hover:bg-white/30 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Handover Gazette & Audit (PDF)
                  </Link>
                  <button className="px-4 py-2 bg-white/20 text-white rounded-lg text-sm font-medium hover:bg-white/30 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Inspect Shard Telemetry
                  </button>
                </div>
              </div>
            </div>

            {/* Key Information Grid */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {/* Edge Cluster Shard */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                  <p className="text-xs font-semibold text-gray-600 uppercase">Edge Cluster Shard</p>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded">OPERATIONAL</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{tenantData.shardId}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Replication: {tenantData.replication}</span>
                </div>
                <div className="mt-3 p-2 bg-gray-50 rounded text-xs">
                  <p className="text-gray-600 mb-1">Cipher State</p>
                  <p className="font-mono font-bold text-gray-900">AES-256 GCM (KVMS)</p>
                </div>
              </div>

              {/* Sovereign Domain */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <p className="text-xs font-semibold text-gray-600 uppercase">Sovereign Domain</p>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-bold rounded">ANYCAST ACTIVE</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{tenantData.domain}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>TLS 1.3 Active • Wildcard PoP</span>
                </div>
                <div className="mt-3 p-2 bg-gray-50 rounded text-xs">
                  <p className="text-gray-600 mb-1">Cloudflare Edge</p>
                  <p className="font-bold text-gray-900">Propagated <span className="text-green-600">(14ms)</span></p>
                </div>
              </div>

              {/* Proprietor Dispatch */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <p className="text-xs font-semibold text-gray-600 uppercase">Proprietor Dispatch</p>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded">DELIVERED</span>
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-2">{tenantData.proprietor.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-xs">{tenantData.proprietor.whatsapp}</span>
                </div>
                <div className="mt-3 p-2 bg-gray-50 rounded text-xs">
                  <p className="text-gray-600 mb-1">Auth Channel</p>
                  <p className="font-mono font-bold text-gray-900">{tenantData.proprietor.phone} 8192</p>
                </div>
              </div>

              {/* Allocated Capacity */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="text-xs font-semibold text-gray-600 uppercase">Allocated Capacity</p>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-bold rounded">{tenantData.capacity.subsidy}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{tenantData.capacity.learnerSeats.toLocaleString()} Learner Seats</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Rollout: {tenantData.capacity.rollout} (term credited)</span>
                </div>
                <div className="mt-3 p-2 bg-blue-50 rounded text-xs">
                  <p className="text-blue-600 mb-1">Active Campuses</p>
                  <p className="font-bold text-blue-900">3 Dedicated Nodes</p>
                </div>
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-3 gap-6">
              {/* Left: Multi-Campus Cluster & Milestones */}
              <div className="col-span-2 space-y-6">
                {/* Multi-Campus Cluster Activation */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Multi-Campus Cluster Activation</h3>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-bold rounded">{tenantData.campuses.length} Nodes Active</span>
                      <button className="px-4 py-1.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 flex items-center gap-2">
                        Manage Campus Nodes
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Autonomous local caching nodes mounted and awaiting regional activation.</p>

                  {/* Campus List */}
                  <div className="space-y-3">
                    {tenantData.campuses.map((campus, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start gap-4">
                          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg flex-shrink-0">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-bold text-gray-900">{campus.name}</h4>
                              <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-bold rounded">{campus.type}</span>
                              <span className={`px-2 py-0.5 text-xs font-bold rounded ${
                                campus.status === 'ENCLAVE MOUNT READY'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                {campus.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{campus.address}</p>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-gray-700 font-medium">{campus.seats.toLocaleString()} Seats Allocated</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm">
                    <div className="flex items-center gap-2 text-blue-900">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-semibold">All 3 local campus micro-servers automatically preloaded with offline sync runtime.</span>
                      <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded ml-auto">V3.4.2-EDGE</span>
                    </div>
                  </div>
                </div>

                {/* Next Administrative Milestones */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Next Administrative Milestones</h3>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-bold rounded">PROPRIETOR LIFECYCLE PHASE 1</span>
                  </div>

                  <div className="space-y-4">
                    {/* Milestone 1 */}
                    <div className="flex gap-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold text-sm flex-shrink-0">
                        1
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-gray-900">Proprietor Root Login & Passcode Setup</h4>
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded">IN PROGRESS</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Awaiting Chief Dr. Adebayo Adeleke to claim sovereign ownership via WhatsApp magic token sent to +234 803 *** 8192.</p>
                        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                          ▶ Re-trigger WhatsApp Notification → Expires in 23h 54m
                        </button>
                      </div>
                    </div>

                    {/* Milestone 2 */}
                    <div className="flex gap-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-600 rounded-full font-bold text-sm flex-shrink-0">
                        2
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-gray-700">Faculty & Campus Admin Ingestion</h4>
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-bold rounded">PENDING ROOT CLAIM</span>
                        </div>
                        <p className="text-sm text-gray-600">Proprietor can upload CSV of 3 Campus Principals & 140 Academic staff with predetermined NDPA consent forms.</p>
                      </div>
                    </div>

                    {/* Milestone 3 */}
                    <div className="flex gap-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-600 rounded-full font-bold text-sm flex-shrink-0">
                        3
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-gray-700">Biometric Turnstiles & Student Admissions Intake</h4>
                          <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-bold rounded">HARDWARE READY</span>
                        </div>
                        <p className="text-sm text-gray-600">Local edge synchronizers are ready to pair with optical turnstiles at Victoria Island, Lekki, and Ikeja gates.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Master Enclave & Ledger */}
              <div className="space-y-6">
                {/* Master Sovereign Enclave Vault */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <h3 className="text-lg font-bold text-gray-900">Master Sovereign Enclave Vault</h3>
                  </div>
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded mb-4">SEALED</span>

                  <p className="text-sm text-gray-600 mb-4">
                    These cryptographic secrets are generated within the HSM hardware boundary. The superadmin can inspect temporary handover tokens before transfer is finalized.
                  </p>

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-bold text-gray-900">ENCRYPTED MASTER ENCLAVE KEY</label>
                        <button
                          onClick={() => setMasterKeyRevealed(!masterKeyRevealed)}
                          className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          {masterKeyRevealed ? 'Hide Key' : 'Reveal Key'}
                        </button>
                      </div>
                      <div className="p-3 bg-gray-900 rounded border border-gray-700 font-mono text-sm text-green-400">
                        {masterKeyRevealed ? tenantData.enclave.key : '••••••••••••••••••••••••••'}
                      </div>
                      <button className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy to clipboard
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">TEMPORARY 24HR ROOT PASSCODE</label>
                      <div className="p-4 bg-red-50 border-2 border-red-200 rounded">
                        <div className="flex items-center gap-2 mb-2">
                          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          <span className="text-sm font-bold text-red-900">Single Use Only</span>
                        </div>
                        <div className="p-3 bg-white border border-red-300 rounded font-mono text-xl font-bold text-gray-900 text-center tracking-wider">
                          {tenantData.enclave.rootPasscode}
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-blue-50 border border-blue-200 rounded text-sm">
                      <p className="text-blue-900 mb-1">
                        <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Auto-invalidates immediately upon Chief Adebayo's biometric login.
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-bold text-green-900">Sovereign Cold Backup Synced</span>
                      </div>
                      <p className="text-xs text-gray-600">
                        Sealed into Nigerian National Sovereign Vault (NITDA Enclave Node #3, Abuja Datacenter).
                      </p>
                    </div>
                  </div>
                </div>

                {/* Immutable Provisioning Ledger */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <h3 className="text-lg font-bold text-gray-900">Immutable Provisioning Ledger</h3>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-bold rounded">BLOCK #1,881,251</span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase mb-1">{tenantData.enclave.blockHash.split('\n')[0]}</label>
                      <div className="p-2 bg-gray-900 rounded border border-gray-700 font-mono text-xs text-green-400 break-all">
                        {tenantData.enclave.blockHash.split('\n')[1]}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Timestamp</label>
                        <div className="p-2 bg-gray-50 rounded font-mono text-gray-900">
                          {tenantData.enclave.timestamp}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Signing Operator</label>
                        <div className="p-2 bg-gray-50 rounded font-mono text-gray-900">
                          {tenantData.enclave.signingOperator}
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-purple-50 border border-purple-200 rounded">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span className="text-sm font-bold text-purple-900">NDPA 2023 Statutory Compliance</span>
                        <span className="px-2 py-0.5 bg-green-600 text-white text-xs font-bold rounded ml-auto">PASSED (Score: 100%)</span>
                      </div>
                    </div>

                    <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-blue-900">Emergency Root Ops Channel</p>
                          <p className="text-xs text-blue-700">Liaison Officer assigned for onboarding assistance.</p>
                        </div>
                        <button className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700">
                          Contact Liaison
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Status Bar */}
            <div className="mt-6 p-4 bg-blue-600 text-white rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  <span className="font-bold">ONLINE • 1 SHARD SYNCED</span>
                  <span className="text-blue-100">LOS-01 Edge Mesh Hot • 0.38ms</span>
                </div>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-4 py-2 bg-white text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50"
                >
                  Return to All Tenants
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
