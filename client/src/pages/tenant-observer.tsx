import { useState, useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useAuth } from '@/store'
import { useLogout } from '@/hooks'

export default function TenantObserverPage() {
  const location = useLocation()
  const { tenantId } = useParams()
  const { user } = useAuth()
  const logout = useLogout()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [passcodeTimeRemaining, setPasscodeTimeRemaining] = useState('23h 51m')

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleLogout = () => {
    logout.mutate()
  }

  const isActive = (path: string) => {
    return location.pathname === path
  }

  // Mock data for the tenant
  const tenantData = {
    name: 'Oasis Educational Foundation',
    domain: 'oasis.edumanage.ng',
    rcNumber: 'RC: 940218',
    obsSession: 'OBS: 940218-AF2',
    shardId: 'SHARD-OASIS-NG-01',
    uptime: '99.99%',
    campusesMounted: { current: 3, total: 3 },
    ramAllocation: { used: 1.4, total: 8.0, percentage: 17.5 },
    licensePartition: { tier: 'Tier 4 Cap', provisioned: 3000, activated: 0 },
    rootKeyholder: {
      name: 'Chief Dr. Adebayo A...',
      phone: '+234 803 294 1109',
      tokenDispatched: true,
      tokenReadTime: '14:41 WAT',
      passcodeStatus: 'Pending'
    },
    vfsEngine: {
      pageCache: 99.4,
      reads: 142,
      writes: 4,
      replicationLag: 0,
      journalMode: 'WAL2',
      storagePath: '/vol/shards/oasis',
      vectorSearch: 'sqlite-vss',
      tlsCipher: 'CHACHA20-POLY1305'
    },
    handshakeLifecycle: [
      { step: 1, title: 'WhatsApp Credential Dispatch', status: 'completed', time: '14:40:22 WAT', description: 'Dispatched encrypted payload to validated Meta WhatsApp Business API (+234 803 294 1109).' },
      { step: 2, title: 'WhatsApp Message Read Receipt', status: 'completed', time: '14:41:05 WAT', description: 'Blue ticks registered by device in Lagos (Cellular IP: 105.112.98.11, MTN Nigeria).' },
      { step: 3, title: 'Passcode Entry & Root 2FA Registration', status: 'in-progress', description: 'Awaiting Chief Dr. Adebayo Adeleke to submit 6-digit root passphrase and enroll FIDO2 hardware token.' },
      { step: 4, title: 'Campus Principals & Faculty Delegation', status: 'pending', description: 'Unlocks administrative delegation for VI, Lekki, and Ikeja headteachers.' }
    ],
    campusNodes: [
      { id: 'CRN-VI-01', campus: 'Victoria Island HQ', daemon: 'v3.4.2', ip: '102.89.44.12', address: 'Plot 148 Adeola Odeku St, Hub', turnstiles: '2 Turnstiles Paired (RFID Bio)', ping: '12ms', region: 'Mainland Mesh', status: 'Active' },
      { id: 'CRN-LEK-02', campus: 'Lekki Phase 1 Branch', daemon: 'v3.4.2', ip: '102.89.46.88', address: 'Admiralty Way Annex', turnstiles: '2 Turnstiles Staged', ping: '14ms', region: 'Island Mesh', status: 'Active' },
      { id: 'CRN-IKJ-03', campus: 'Ikeja GRA Campus', daemon: 'v3.4.2', ip: '102.89.47.99', address: 'Isaac John St Campus', turnstiles: '2 Turnstiles Staged', ping: '16ms', region: 'Ikeja Core Mesh', status: 'Active' }
    ],
    ndpaMonitor: {
      borderEgress: 0.00,
      domesticTraffic: 100,
      primaryStorage: { name: 'MDXi Appolonia / Rack Centre', location: 'Tier-III Datacenter, Oregun, Ikeja Lagos' },
      backupStorage: { name: 'Galaxy Backbone Abuja', location: 'National Data Centre Vault, Federal Capital Territory' }
    },
    liveEvents: [
      { time: '[14:48:02.112 WAT]', node: 'NODE_HEARTBEAT', message: 'CRN-IKJ-03 ping ACK: 16.2ms • VFS_WAL synced at checkpoint #1204' },
      { time: '[14:42:30.001 WAT]', node: 'NODE_HEARTBEAT', message: 'CRN-LEK-02 ping ACK: 13.8ms • Zero replication drift' },
      { time: '[14:41:05.418 WAT]', node: 'WA_MSG_ID', receipt: 'wamid.HBgNLjI3NDMoDM3MTAxNz', message: 'Read acknowledged by recipient' }
    ]
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Observer Mode Banner */}
      <div className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-3 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="text-xl font-bold">OBSERVER MODE ACTIVE</span>
            </div>
            <div className="h-6 w-px bg-white/30"></div>
            <div>
              <h2 className="text-lg font-bold">{tenantData.name} Enclave</h2>
              <div className="flex items-center gap-3 text-sm">
                <span>{tenantData.rcNumber}</span>
                <span>•</span>
                <span>{tenantData.obsSession}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Impersonation Audit Active (LOS-SEC-01)
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded text-sm font-medium">
              Re-dispatch WhatsApp Credentials
            </button>
            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm font-medium">
              🔒 Enclave Emergency Lockdown
            </button>
            <Link
              to="/dashboard"
              className="px-4 py-2 bg-white text-orange-600 rounded text-sm font-medium hover:bg-gray-100"
            >
              ⬅ Exit Observer Mode
            </Link>
          </div>
        </div>
      </div>

      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center justify-between h-16 px-6">
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

          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-600">All Systems Operational • 99.98% Edge Uptime</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded">MESH: LOS</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded">ABJ</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded">PHC</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded">KAN</span>
            </div>
            <span className="px-3 py-1 bg-blue-600 text-white text-sm font-bold rounded">SUPERADMIN</span>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Root Authority</p>
                <p className="text-xs text-gray-600">sec-ops@edumanage.ng</p>
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">R</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'w-64' : 'w-0'
          } bg-slate-900 text-white transition-all duration-300 overflow-hidden flex-shrink-0`}
        >
          <nav className="p-4 space-y-1">
            <div className="mb-6 p-3 bg-slate-800 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-400">● Root Partition: NG-FED</span>
                <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded">Tier-4</span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
                Federal Operations
              </p>
              <Link
                to="/dashboard"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-gray-300 hover:bg-slate-800"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="font-medium">Core Infrastructure</span>
              </Link>

              <Link
                to="/dashboard"
                className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-colors text-gray-300 hover:bg-slate-800"
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

          {/* Sync Status */}
          <div className="p-4 border-t border-slate-800">
            <div className="p-3 bg-green-900/30 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs font-bold text-green-400">SYNC STATUS</span>
                <span className="px-2 py-0.5 bg-green-600 text-white text-xs font-bold rounded ml-auto">Active</span>
              </div>
              <div className="text-xs text-gray-300">
                <div className="flex items-center gap-1 mb-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>National Ledger Synced</span>
                </div>
                <p>Latency: 14ms (LOS-LAG)</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {/* Top Stats Grid */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            {/* Node Telemetry */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">
                  {tenantData.uptime}% Uptime
                </span>
              </div>
              <p className="text-xs text-gray-600 mb-1">NODE TELEMETRY</p>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{tenantData.shardId}</h3>
              <p className="text-sm text-gray-600 mb-3">
                <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                0.38ms sync latency to core LOS-01
              </p>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">RAM Allocation</span>
                  <span className="font-bold">{tenantData.ramAllocation.used} GB / {tenantData.ramAllocation.total} GB ({tenantData.ramAllocation.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${tenantData.ramAllocation.percentage}%` }}></div>
                </div>
              </div>
            </div>

            {/* Multi-Campus Sharing */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <p className="text-xs text-gray-600 mb-1">MULTI-CAMPUS SHARDING</p>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">
                {tenantData.campusesMounted.current} of {tenantData.campusesMounted.total}
              </h3>
              <p className="text-sm font-medium text-gray-900 mb-2">Campus Mounted</p>
              <p className="text-xs text-gray-600">Victoria Island HQ, Lekki Phase 1, Ikeja GRA</p>
            </div>

            {/* VFS Active */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <p className="text-xs text-gray-600 mb-1">VFS</p>
              <h3 className="text-2xl font-bold text-purple-600 mb-1">Active</h3>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 rounded text-xs">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  <span className="font-bold text-blue-900">VI</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-yellow-100 rounded text-xs">
                  <span className="w-2 h-2 bg-yellow-600 rounded-full"></span>
                  <span className="font-bold text-yellow-900">LK</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-pink-100 rounded text-xs">
                  <span className="w-2 h-2 bg-pink-600 rounded-full"></span>
                  <span className="font-bold text-pink-900">IK</span>
                </div>
              </div>
              <p className="text-xs text-gray-600">Zero Split-Brain Detected</p>
            </div>

            {/* License Partition */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <p className="text-xs text-gray-600 mb-1">LICENSE PARTITION {tenantData.licensePartition.tier}</p>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {tenantData.licensePartition.provisioned.toLocaleString()}
              </h3>
              <p className="text-sm text-gray-600 mb-2">Provisioned</p>
              <p className="text-xs text-gray-600">
                {tenantData.licensePartition.activated}/{tenantData.licensePartition.provisioned.toLocaleString()} Activated • Awaiting 1st Import
              </p>
            </div>

            {/* Root Keyholder */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <p className="text-xs text-gray-600 mb-1">ROOT KEYHOLDER</p>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{tenantData.rootKeyholder.name}</h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded">Token Dispatched</span>
              </div>
              <p className="text-xs text-gray-600 mb-1">{tenantData.rootKeyholder.phone}</p>
              <p className="text-xs text-gray-600">Read {tenantData.rootKeyholder.tokenReadTime}</p>
              <div className="mt-2 p-2 bg-orange-50 border border-orange-200 rounded">
                <p className="text-xs font-bold text-orange-900">
                  <svg className="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Passcode Pending {passcodeTimeRemaining}
                </p>
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-3 gap-6">
            {/* Left Column - VFS Engine & Campus Nodes */}
            <div className="col-span-2 space-y-6">
              {/* SQLite VFS Engine */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                    </svg>
                    <h3 className="text-lg font-bold text-gray-900">SQLite VFS Engine & Throughput</h3>
                  </div>
                  <span className="px-3 py-1 bg-teal-500 text-white text-sm font-bold rounded">
                    PAGE CACHE: {tenantData.vfsEngine.pageCache}% HIT
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Write-Ahead Logging (WAL) Mode • Hardware AES-256 GCM on NVMe
                </p>

                {/* Metrics Charts */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">READS</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-blue-600">{tenantData.vfsEngine.reads}</span>
                      <span className="text-sm text-gray-600">/10s</span>
                    </div>
                    <div className="mt-2 h-12 bg-blue-100 rounded relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 right-0 h-8 bg-blue-500" style={{ clipPath: 'polygon(0% 100%, 20% 80%, 40% 90%, 60% 70%, 80% 85%, 100% 75%, 100% 100%)' }}></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">WRITES (WAL COMMIT)</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-green-600">{tenantData.vfsEngine.writes}</span>
                      <span className="text-sm text-gray-600">/10s</span>
                    </div>
                    <div className="mt-2 h-12 bg-green-100 rounded relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 right-0 h-4 bg-green-500" style={{ clipPath: 'polygon(0% 100%, 20% 95%, 40% 92%, 60% 96%, 80% 93%, 100% 94%, 100% 100%)' }}></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">REPLICATION LAG</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-gray-900">{tenantData.vfsEngine.replicationLag}</span>
                      <span className="text-sm text-gray-600">ms (Realtime)</span>
                    </div>
                    <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded">
                      <p className="text-xs font-bold text-green-900">
                        <svg className="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Fully Synchronous
                      </p>
                    </div>
                  </div>
                </div>

                {/* Technical Details */}
                <div className="grid grid-cols-4 gap-3 pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">JOURNAL MODE</p>
                    <p className="font-mono font-bold text-gray-900">{tenantData.vfsEngine.journalMode}</p>
                    <p className="text-xs text-gray-600">(Autocheckpoint)</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">STORAGE PATH</p>
                    <p className="font-mono text-sm text-gray-900">{tenantData.vfsEngine.storagePath}</p>
                    <p className="text-xs text-gray-600">940218</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">VECTOR SEARCH</p>
                    <p className="font-mono font-bold text-gray-900">{tenantData.vfsEngine.vectorSearch}</p>
                    <p className="text-xs text-gray-600">enabled</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">TLS CIPHER</p>
                    <p className="font-mono text-xs text-gray-900">{tenantData.vfsEngine.tlsCipher}</p>
                    <p className="text-xs text-gray-600">POLY1305</p>
                  </div>
                </div>
              </div>

              {/* Campus Edge Node Topology */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Campus Edge Node Topology</h3>
                  <span className="px-3 py-1 bg-green-500 text-white text-sm font-bold rounded">
                    {tenantData.campusNodes.length} NODES ONLINE
                  </span>
                </div>

                <div className="space-y-3">
                  {tenantData.campusNodes.map((node, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="grid grid-cols-6 gap-4 items-center">
                        <div>
                          <p className="text-xs text-gray-600 mb-1">NODE IDENTIFIER</p>
                          <p className="font-bold text-gray-900">{node.id}</p>
                          <p className="text-xs text-gray-600">daemon {node.daemon}</p>
                          <p className="text-xs text-gray-600">● IP: {node.ip}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-xs text-gray-600 mb-1">CAMPUS DESIGNATION</p>
                          <p className="font-bold text-gray-900">{node.campus}</p>
                          <p className="text-xs text-gray-600">{node.address}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">HARDWARE & TURNSTILES</p>
                          <p className="font-bold text-gray-900">{node.turnstiles}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">PING LATENCY</p>
                          <p className="text-2xl font-bold text-green-600">{node.ping}</p>
                          <p className="text-xs text-gray-600">{node.region}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">STATE</p>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="font-bold text-green-900">{node.status}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* NDPA 2023 Sovereign Data Boundary Monitor */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <h3 className="text-lg font-bold text-gray-900">NDPA 2023 Sovereign Data Boundary Monitor</h3>
                  </div>
                  <span className="px-3 py-1 bg-teal-500 text-white text-sm font-bold rounded">
                    {tenantData.ndpaMonitor.domesticTraffic}% DOMESTIC TRAFFIC
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Nigeria Data Protection Act Section 41-43 Residency Compliance
                </p>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-2">DATA PLANE SOVEREIGNTY</p>
                    <div className="text-center p-4 bg-green-50 border-2 border-green-500 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Cross-</p>
                      <p className="text-4xl font-bold text-green-600">{tenantData.ndpaMonitor.borderEgress.toFixed(2)}%</p>
                      <p className="text-sm font-bold text-green-900">Border Egress</p>
                      <p className="text-xs text-gray-600 mt-2">Strict geofencing enforced by Cloudflare Nigeria Edge</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-2">PRIMARY STORAGE ZONE</p>
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-bold text-gray-900 mb-1">{tenantData.ndpaMonitor.primaryStorage.name}</h4>
                      <p className="text-xs text-gray-600">{tenantData.ndpaMonitor.primaryStorage.location}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-2">DISASTER RECOVERY (COLD MIRROR)</p>
                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <h4 className="font-bold text-gray-900 mb-1">{tenantData.ndpaMonitor.backupStorage.name}</h4>
                      <p className="text-xs text-gray-600">{tenantData.ndpaMonitor.backupStorage.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Proprietor Handshake & Live Events */}
            <div className="space-y-6">
              {/* Proprietor Handshake Lifecycle */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    <h3 className="text-lg font-bold text-gray-900">Proprietor Handshake Lifecycle</h3>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded">STAGE 3 OF 4</span>
                </div>

                <div className="space-y-4">
                  {tenantData.handshakeLifecycle.map((step, index) => (
                    <div key={index} className={`flex gap-4 ${step.status !== 'pending' ? '' : 'opacity-50'}`}>
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm flex-shrink-0 ${
                        step.status === 'completed' ? 'bg-green-600 text-white' :
                        step.status === 'in-progress' ? 'bg-yellow-600 text-white' :
                        'bg-gray-300 text-gray-600'
                      }`}>
                        {step.status === 'completed' ? '✓' : step.step}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-gray-900 text-sm">{step.title}</h4>
                          {step.time && (
                            <span className="text-xs text-gray-600">{step.time} WAT</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600">{step.description}</p>
                        {step.status === 'in-progress' && (
                          <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
                            <p className="text-xs font-bold text-yellow-900">
                              <svg className="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Session valid for next {passcodeTimeRemaining}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Emergency SuperAdmin Overrides */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs font-bold text-gray-900 mb-3 uppercase">Emergency SuperAdmin Overrides</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-medium rounded flex items-center justify-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Regen 24h Root Passcode
                    </button>
                    <button className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded flex items-center justify-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Resend Meta WA Link
                    </button>
                  </div>
                  <button className="mt-2 w-full px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded flex items-center justify-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Raw Handshake Audit Log (JSON)
                  </button>
                </div>
              </div>

              {/* Live Event Stream */}
              <div className="bg-gray-900 rounded-lg border border-gray-700 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <h3 className="text-lg font-bold text-white">Live Event Stream</h3>
                  </div>
                  <span className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded">
                    ● SEC-SOCKET CONNECTED
                  </span>
                </div>

                <div className="space-y-2 font-mono text-xs">
                  {tenantData.liveEvents.map((event, index) => (
                    <div key={index} className="text-green-400">
                      <span className="text-gray-500">{event.time}</span>
                      {' '}
                      <span className="text-yellow-400">[{event.node}]</span>
                      {' '}
                      {event.receipt && <span className="text-cyan-400">{event.receipt}:</span>}
                      {' '}
                      <span>{event.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Status Bar */}
          <div className="mt-6 p-4 bg-blue-600 text-white rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                <span className="font-bold">Online • 1 Shard Synced</span>
                <span className="text-blue-100">Offline drift={currentTime.toISOString()} • 0ms lag</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
