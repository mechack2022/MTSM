import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/store'
import { useLogout } from '@/hooks'
import AddCampusModal from '@/components/modals/AddCampusModal'
import toast from 'react-hot-toast'

export default function CampusArchitecturePage() {
  const { user } = useAuth()
  const logout = useLogout()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isAddCampusModalOpen, setIsAddCampusModalOpen] = useState(false)

  const handleLogout = () => {
    logout.mutate()
  }

  const handleAddCampusSubmit = (data: any) => {
    console.log('New campus data:', data)
    toast.success('Campus branch provisioned successfully!')
    setIsAddCampusModalOpen(false)
    // TODO: Implement actual API call to create campus
  }

  const handleOpenModal = () => {
    console.log('Opening modal...')
    setIsAddCampusModalOpen(true)
    console.log('Modal state set to true')
  }

  // Mock data
  const campuses = [
    {
      id: 1,
      name: 'Victoria Island Main Campus',
      nodeId: 'CRN-VI-01',
      badge: 'Main Ring',
      type: 'PRIMARY',
      status: 'OPERATIONAL',
      address: '181 Adeola Odeku Street, VI • Lagos Island',
      tiers: 'Early Childhood & Nursery',
      secondary: 'Primary (Basic 1-6)',
      tertiary: 'BECE Secondary (SS1-3)',
      hardwareNodeId: 'CRN-VI-01',
      memory: 'Local (Word Mix): 0',
      buffer: 'Buffer: 91.8% free',
      seats: 1200,
      capacity: '(40% Pool)',
      utilization: 40,
      officers: {
        principal: 'Mrs. Folashade Adele',
        registrar: 'Mrs. Jemila Karol'
      },
      access: '2 Biometric Gates',
      registrarStatus: 'Registrar VACANCY',
      healthStatus: 'HEALTHY'
    },
    {
      id: 2,
      name: 'Lekki Phase I Branch',
      nodeId: 'CRN-LEK-02',
      badge: 'Main Ring',
      type: 'SATELLITE',
      status: 'OPERATIONAL',
      address: 'Block 5, Admiralty Way, Lekki',
      tiers: 'Early Childhood & Nursery',
      secondary: 'Primary Basic Education',
      tertiary: 'Secondary (Prim.Remedial)',
      hardwareNodeId: 'CRN-LEK-02',
      memory: 'Local (Word Mix): 0',
      buffer: 'Buffer: 93.2% free',
      seats: 1000,
      capacity: '(33.3% Pool)',
      utilization: 33.3,
      officers: {
        principal: 'Mr. Babatunde Samui',
        registrar: ''
      },
      access: '2 Biometric Gates',
      registrarStatus: 'Pending Registrar assignment from pool',
      healthStatus: 'HEALTHY'
    },
    {
      id: 3,
      name: 'Ikeja GRA Campus',
      nodeId: 'CRN-IKJ-03',
      badge: 'Main Ring',
      type: 'SATELLITE',
      status: 'OPERATIONAL',
      address: 'I Henry Park St Promenade, Ikeja GRA',
      tiers: 'Junior Secondary (JSS 1-3)',
      secondary: 'BECE Secondary (SS1-3)',
      tertiary: '',
      hardwareNodeId: 'CRN-IKJ-03',
      memory: 'Local (Word Mix): 0',
      buffer: 'Buffer: 95.8% free',
      seats: 800,
      capacity: '(26.7% Pool)',
      utilization: 26.7,
      officers: {
        principal: 'Dr. Ngozi Eze',
        registrar: 'Mrs. Amina Yusuf'
      },
      access: '2 Biometric Gates',
      registrarStatus: 'Invites Dispatch to Pending',
      healthStatus: 'HEALTHY'
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">EduManage</h1>
                <p className="text-xs text-gray-600">SOVEREIGN ENCLAVE</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-gray-900">Oasis Educational Foundation</span>
            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded">RC: 940218</span>
            <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded">PROPRIETOR</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded">
              ● FEDERATED NAVIGATION ONLINE
            </span>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Chief Dr. Adebayo Adeleke</p>
                <p className="text-xs text-gray-600">Proprietor & Trustee</p>
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">C</span>
              </div>
            </div>
            <button onClick={handleLogout} className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - same as dashboard */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-slate-900 text-white transition-all duration-300 overflow-hidden flex-shrink-0`}>
          <nav className="p-4 space-y-1">
            <div className="mb-6 p-3 bg-slate-800 rounded-lg">
              <span className="text-xs text-gray-400">Oasis Edu. Foundation</span>
            </div>
            <Link to="/tenant-admin/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-slate-800">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="font-medium">Executive Dashboard</span>
            </Link>
            <Link to="/tenant-admin/campus-architecture" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-600 text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="font-medium">Campus Architecture</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {/* Breadcrumb */}
          <div className="bg-white border-b border-gray-200 px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Link to="/tenant-admin/dashboard" className="text-gray-600 hover:text-gray-900">Trust Council</Link>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-gray-600">Schools & Campuses</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-blue-600 font-medium">Campus Architecture</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded">
                  ● RESEEDED NAVIGATION ONLINE
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-bold rounded">
                  ● NDPA COMPLIANT SHARDING
                </span>
              </div>
            </div>
          </div>

          {/* Page Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Campus Topology & Physical Enclaves</h1>
            <p className="text-gray-600">
              Manage federated physical schools, campus tiers, and local offline micro-server nodes across Nigeria.
            </p>
          </div>

          <div className="p-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="text-xs font-bold text-gray-600 uppercase">Topology Nodes</span>
                </div>
                <h3 className="text-4xl font-bold text-gray-900">3</h3>
                <p className="text-sm text-gray-600">Campuses</p>
                <p className="text-xs text-gray-500 mt-1">● Sovereign Hz • 2 Satellite</p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-xs font-bold text-gray-600 uppercase">Allocated Seat Capacity</span>
                </div>
                <h3 className="text-4xl font-bold text-gray-900">3,000</h3>
                <p className="text-sm text-gray-600">Seats</p>
                <p className="text-xs text-gray-500 mt-1">Batch Sync</p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                  <span className="text-xs font-bold text-gray-600 uppercase">Local Shard Edge</span>
                </div>
                <h3 className="text-4xl font-bold text-gray-900">3</h3>
                <p className="text-sm text-gray-600">Active Daemons</p>
                <p className="text-xs text-gray-500 mt-1">Edqe<br/>Sync</p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  <span className="text-xs font-bold text-gray-600 uppercase">Perimeter Biometrics</span>
                </div>
                <h3 className="text-4xl font-bold text-gray-900">6</h3>
                <p className="text-sm text-gray-600">Optical Turnstiles</p>
                <p className="text-xs text-gray-500 mt-1">◯ Live</p>
              </div>
            </div>

            {/* Physical Campus Topology Nodes */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <h3 className="text-xl font-bold text-gray-900">☆ Physical Campus Topology Nodes</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleOpenModal}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    + Add New Campus Branch
                  </button>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-bold rounded">Re-allocate Seat Quotas</span>
                </div>
              </div>

              {/* Campus Cards */}
              <div className="space-y-4">
                {campuses.map((campus) => (
                  <div key={campus.id} className="border-2 border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                    <div className="grid grid-cols-3 gap-6">
                      {/* Left Column */}
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <span className={`px-3 py-1 text-xs font-bold rounded ${
                            campus.type === 'PRIMARY' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {campus.nodeId}
                          </span>
                          <span className={`px-3 py-1 text-xs font-bold rounded ${
                            campus.badge === 'Main Ring' ? 'bg-green-600 text-white' : 'bg-green-100 text-green-700'
                          }`}>
                            ● {campus.badge}
                          </span>
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded">
                            {campus.type === 'PRIMARY' ? 'PRIMARY' : 'SATELLITE'}
                          </span>
                        </div>

                        <h4 className="text-lg font-bold text-gray-900 mb-2">{campus.name}</h4>
                        <p className="text-sm text-gray-600 mb-4">📍 {campus.address}</p>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-700">Educational Tiers Provisioned</span>
                          </div>
                          <p className="text-blue-600 ml-6">☆ {campus.tiers}</p>
                          <p className="text-gray-700 ml-6">● {campus.secondary}</p>
                          {campus.tertiary && <p className="text-gray-700 ml-6">Ⓓ {campus.tertiary}</p>}
                        </div>
                      </div>

                      {/* Middle Column */}
                      <div>
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-gray-600 uppercase">Hardware Node ID</span>
                            <span className="px-2 py-1 bg-green-600 text-white text-xs font-bold rounded">{campus.status}</span>
                          </div>
                          <p className="font-mono font-bold text-gray-900">{campus.hardwareNodeId}</p>
                          <p className="text-xs text-gray-600 mt-1">{campus.memory}</p>
                          <p className="text-xs text-green-600 font-bold">{campus.buffer}</p>
                        </div>

                        <div className="space-y-2">
                          <div>
                            <p className="text-xs text-gray-600 mb-1">Local School Win / Buffer</p>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${parseFloat(campus.buffer.match(/[\d.]+/)?.[0] || '0')}%` }}></div>
                              </div>
                              <span className="text-xs font-bold text-gray-900">{campus.buffer.match(/[\d.]+/)?.[0]}%</span>
                            </div>
                          </div>

                          <div className="pt-2">
                            <p className="text-xs text-gray-600 mb-1">Seat Capacity & Utilization</p>
                            <div className="flex items-baseline gap-2">
                              <span className="text-2xl font-bold text-gray-900">{campus.seats.toLocaleString()}</span>
                              <span className="text-sm text-gray-600">Seats {campus.capacity}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${campus.utilization}%` }}></div>
                              </div>
                              <span className="text-xs font-bold text-gray-900">{campus.utilization}%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-4">
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                          <p className="text-xs font-bold text-gray-600 uppercase mb-3">Executive Officers</p>
                          <div className="space-y-2">
                            <div>
                              <p className="text-xs text-gray-600">Principal / Mx. Fahashedo Adda</p>
                              <p className="text-sm font-bold text-gray-900">{campus.officers.principal || 'Vacant'}</p>
                            </div>
                            {campus.officers.registrar ? (
                              <div>
                                <p className="text-xs text-gray-600">BECE Registrar</p>
                                <p className="text-sm font-bold text-gray-900">{campus.officers.registrar}</p>
                              </div>
                            ) : (
                              <div className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded">
                                {campus.registrarStatus}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <p className="text-xs font-bold text-gray-600 uppercase mb-2">Access Perimeters (IA)</p>
                          <div className="flex items-center gap-2 mb-2">
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                            </svg>
                            <span className="text-sm font-bold text-gray-900">{campus.access}</span>
                          </div>
                          <p className="text-xs text-gray-600">NFC Ipsec • Biometric waiting<br/>Hardware key exclusion</p>
                        </div>

                        <div className="flex gap-2">
                          <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded text-sm font-bold hover:bg-blue-700 flex items-center justify-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Switch to Campus→ Portal
                          </button>
                          <button className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded text-sm font-medium hover:bg-gray-50">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </button>
                          <button className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded text-sm font-medium hover:bg-gray-50">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded text-sm font-medium hover:bg-gray-50">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                          </button>
                        </div>

                        <button className="w-full px-3 py-2 bg-blue-600 text-white rounded text-sm font-bold hover:bg-blue-700">
                          Configure Node ↗
                        </button>

                        <button className="w-full px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded text-sm font-medium hover:bg-gray-50">
                          Manage Leadership →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Section: Cross-Campus Allocation & Offline Sync */}
            <div className="grid grid-cols-2 gap-6">
              {/* Cross-Campus Learner Attendance & Capacity Allocation */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <h3 className="text-lg font-bold text-gray-900">Cross-Campus Learner<br/>Attendance & Capacity Allocation</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Drag and adjust seat allocations per individual leader, tie-goal fetch, and UBEC grant census boundaries.
                </p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">URBAN CAMPUS</span>
                    <span className="text-sm font-bold text-gray-900">1,200</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div className="bg-blue-600 h-3 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                    <span className="text-xs font-bold text-gray-900 w-12">40.0%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">LEKKI SATELLITE</span>
                    <span className="text-sm font-bold text-gray-900">1,000</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div className="bg-green-600 h-3 rounded-full" style={{ width: '33.3%' }}></div>
                    </div>
                    <span className="text-xs font-bold text-gray-900 w-12">33.3%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">IKEJA GRA</span>
                    <span className="text-sm font-bold text-gray-900">800</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div className="bg-purple-600 h-3 rounded-full" style={{ width: '26.7%' }}></div>
                    </div>
                    <span className="text-xs font-bold text-gray-900 w-12">26.7%</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">
                    Federated Decentralized Attendance Topology: ● Local corpus re-attribution-ledger, no campus can overrule Trunk.
                  </p>
                  <p className="text-xs text-gray-500">
                    Tier-configured Quotas ❑❑: UBEX (1M units) • LEKKI (534 • Max: 3,000) • IKJ (852 • 800 Cap)
                  </p>
                </div>

                <div className="mt-4 flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded text-sm font-bold hover:bg-blue-700">
                    ↻ Persist Allocation
                  </button>
                  <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded text-sm font-medium hover:bg-gray-50">
                    Reset
                  </button>
                </div>
              </div>

              {/* Offline Sync & VFS Shard Storage */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <h3 className="text-lg font-bold text-gray-900">Offline Sync & VFS Shard Storage</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Snapshot-style read and write edge replication along with local edge captation allows 90-day offline guarantee. Local Campus Indigo-crypt.Type (CRDT).
                </p>

                <div className="space-y-4">
                  <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-gray-600 uppercase">Edge Topology Shard</span>
                      <span className="px-2 py-1 bg-teal-600 text-white text-xs font-bold rounded">SOVEREIGN VFS V3.4.2</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                          </svg>
                          <span className="text-xs font-bold text-gray-700">Lagos Core</span>
                        </div>
                        <p className="text-xs text-gray-600">Primary FSync<br/>WAL Ledger</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                          </svg>
                          <span className="text-xs font-bold text-gray-700">Work Locality</span>
                        </div>
                        <p className="text-xs text-gray-600">VT-Pag: 0<br/>Local Replica</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 bg-gray-50 rounded border border-gray-200">
                      <p className="text-xs text-gray-600 mb-1">Turbo Conflict-Free</p>
                      <p className="text-sm font-bold text-gray-900">CRDT</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded border border-gray-200">
                      <p className="text-xs text-gray-600 mb-1">Bi-directional Conflict Tree</p>
                      <p className="text-sm font-bold text-gray-900">◎Persist Ledger</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded border border-gray-200">
                      <p className="text-xs text-gray-600 mb-1">Hardware Encrypted Ledger</p>
                      <p className="text-sm font-bold text-gray-900">AES-256 FIPS</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs text-blue-900 mb-2">
                      <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-bold">Autonomous Offline Guarantee</span>
                    </p>
                    <p className="text-xs text-gray-700">
                      Each campus micro-shard can continue intakes, class ledger, Local SQLite VFS merge-replication conflict-free for up to 90 calendar days without central internet. Automatic fallback to Local Campus Infrastructure (LCI) via manual ethernet backup.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Hardware-level NITDA enclave • Local shard: 256GB local SSD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add Campus Modal */}
      <AddCampusModal
        isOpen={isAddCampusModalOpen}
        onClose={() => setIsAddCampusModalOpen(false)}
        onSubmit={handleAddCampusSubmit}
      />
    </div>
  )
}
