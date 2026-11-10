import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/store'
import { useLogout } from '@/hooks'

export default function PrincipalsRegistrarsPage() {
  const { user } = useAuth()
  const logout = useLogout()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogout = () => {
    logout.mutate()
  }

  // Mock leadership data
  const leaders = [
    {
      id: 1,
      name: 'Mrs. Folashade Adeleke',
      photo: 'MFA',
      phone: 'Mrs. 7602-****-4410',
      campus: 'VI Main<br/>→ Campus',
      role: 'Principal (School Executive)',
      roleColor: 'bg-blue-100 text-blue-700',
      email: 'folashade@asis15.edumanage.ng',
      whatsapp: '+234 802 ••• 8110',
      whatsappStatus: 'Delivered',
      keyStatus: 'FIDO2 Yubikey Enforced',
      keyColor: 'bg-green-100 text-green-700'
    },
    {
      id: 2,
      name: 'Mr. Chuka Okonkwo',
      photo: 'MCO',
      phone: 'Mrs. 8781-****-9320',
      campus: 'VI Main<br/>→ Campus',
      role: 'Campus Registrar',
      roleColor: 'bg-teal-100 text-teal-700',
      email: 'c.okonkwo@asis15.edumanage.ng',
      whatsapp: '---',
      whatsappStatus: 'Legacy Exc Active',
      keyStatus: 'SMS Auto-fallover',
      keyColor: 'bg-orange-100 text-orange-700'
    },
    {
      id: 3,
      name: 'Mr. Babatunde Sanusi',
      photo: 'MBS',
      phone: 'Mrs. 5549-****-1805',
      campus: 'Lekki<br/>→ Phase 1',
      role: 'Principal (Head of School)',
      roleColor: 'bg-blue-100 text-blue-700',
      email: 'b.sanusi@asis15.edumanage.ng',
      whatsapp: '+234 814 ••• 7218',
      whatsappStatus: 'SMS Verified',
      keyStatus: 'Waiting first assignment from pool',
      keyColor: 'bg-yellow-100 text-yellow-700'
    },
    {
      id: 4,
      name: 'Dr. Ngozi Eze',
      photo: 'DNE',
      phone: 'Mrs. 9492-****-7848',
      campus: 'Ikeja GRA<br/>→ Campus',
      role: 'Principal (Head of School Lead)',
      roleColor: 'bg-blue-100 text-blue-700',
      email: 'ngozi.eze@asis15.edumanage.ng',
      whatsapp: '+234 806 ••• 2229',
      whatsappStatus: 'Delivered',
      keyStatus: 'FIDO2 Second Enforced',
      keyColor: 'bg-green-100 text-green-700'
    },
    {
      id: 5,
      name: 'Mrs. Amina Yusuf',
      photo: 'MAY',
      phone: 'Mrs. 4769-****-5342',
      campus: 'Ikeja GRA<br/>→ Campus',
      role: 'Campus Registrar',
      roleColor: 'bg-teal-100 text-teal-700',
      email: 'a.yusuf@asis15.edumanage.ng',
      whatsapp: '---',
      whatsappStatus: 'Invitation to Pending',
      keyStatus: 'Dispatch Invitation Pending',
      keyColor: 'bg-gray-100 text-gray-700'
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
            <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-bold rounded">
              ● NDPA Sovereign Vault Certified ● CCRC-RTFD2019
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
        {/* Sidebar */}
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
            <Link to="/tenant-admin/campus-architecture" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-slate-800">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="font-medium">Campus Architecture</span>
            </Link>
            <Link to="/tenant-admin/principals-registrars" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-600 text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="font-medium">Principals & Registrars</span>
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
                <span className="text-gray-600">Staff & Governance</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-blue-600 font-medium">Principals & Registrars</span>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                + Appoint School Leader
              </button>
            </div>
          </div>

          {/* Page Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Campus Leadership & Institutional RBAC</h1>
            <p className="text-gray-600">
              Appoint Heads of School, Campus Registrars, and enforce cryptographic hardware 2FA keys across all branches. All delegations are audited under the Nigerian Data Protection Act (NDPA).
            </p>
          </div>

          <div className="p-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-xs font-bold text-gray-600 uppercase">Statutory Principals</span>
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="text-3xl font-bold text-gray-900">3</h3>
                  <span className="text-lg text-gray-600">/3</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">School Assigned</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
                <p className="text-xs text-blue-600 font-bold mt-1">100% staffed</p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span className="text-xs font-bold text-gray-600 uppercase">Campus Registrars</span>
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="text-3xl font-bold text-gray-900">2</h3>
                  <span className="text-lg text-gray-600">/3</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">1 vacant staff<br/>appointment</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-teal-600 h-2 rounded-full" style={{ width: '66.7%' }}></div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-xs font-bold text-gray-600 uppercase">Access 2FA Enforced</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">4</h3>
                <p className="text-sm text-gray-600 mb-2">Staff Enforced</p>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">FIDO2 NDPA<br/>sync</span>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-xs font-bold text-gray-600 uppercase">WhatsApp Fabric Invites</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">5</h3>
                <p className="text-sm text-gray-600 mb-2">Dispatched</p>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">Invites<br/>awaiting<br/>acceptance clip-wait</span>
              </div>
            </div>

            {/* Leadership Table */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h3 className="text-xl font-bold text-gray-900">◎ Campus Executive Appointments & Leadership Table</h3>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="☉ Filter by faculty or campus..."
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Leader Name & Photo</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Campus</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Statutory Role</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Official Email</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">WhatsApp<br/>Dispatch</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">2FA Key Set</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {leaders.map((leader) => (
                      <tr key={leader.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                              {leader.photo}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900">{leader.name}</p>
                              <p className="text-xs text-gray-600">{leader.phone}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-sm text-gray-900" dangerouslySetInnerHTML={{ __html: leader.campus }}></p>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`px-3 py-1 text-xs font-bold rounded ${leader.roleColor}`}>
                            {leader.role}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-sm text-blue-600 hover:underline cursor-pointer">{leader.email}</p>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm">
                            <p className="font-mono text-gray-900">{leader.whatsapp}</p>
                            <p className="text-xs text-gray-600">{leader.whatsappStatus}</p>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`px-3 py-1 text-xs font-bold rounded ${leader.keyColor}`}>
                            {leader.keyStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm">
                <p className="text-blue-900">
                  <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-bold">Hardware 2FA enforcement policy is active.</span> Passwords auto-rotate every 90 days across campuses.
                </p>
              </div>
            </div>

            {/* RBAC Matrix */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <div className="flex items-center gap-2 mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <h3 className="text-xl font-bold text-gray-900">☸ Role-Based Access Control (RBAC) Matrix</h3>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                Statutory privilege operations audited per hierarchical authorization tokens, hardware-capped operations zone
              </p>

              {/* Simplified RBAC Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Authority Capability / Scope</th>
                      <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase">Tenant<br/>Admin<br/>(Proprietor)</th>
                      <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase">Head Of<br/>School<br/>(Principal)</th>
                      <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase">School<br/>Admin<br/>(Registrar)</th>
                      <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase">Head<br/>Teacher<br/>(Section Lead)</th>
                      <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase">Classroom<br/>Teacher<br/>(Staff)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="font-bold">Financial Billing & Capitation</span>
                        </div>
                        <p className="text-xs text-gray-600 ml-6">Tuition invoices, bulk reconciliations & fee waivers</p>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-teal-500 rounded-full">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <svg className="w-5 h-5 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <svg className="w-5 h-5 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <svg className="w-5 h-5 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </td>
                    </tr>

                    <tr>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="font-bold">Curriculum Schemes & Lesson Syllabi</span>
                        </div>
                        <p className="text-xs text-gray-600 ml-6">WAEC/NECO admin, syllabus, and academic compliance zone</p>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-teal-500 rounded-full">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-teal-500 rounded-full">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="font-bold">Final Term Grading & Dossier Sign-off</span>
                        </div>
                        <p className="text-xs text-gray-600 ml-6">Lock term CA 40% + Exam 60%, autofill WAEC/NECO submissions</p>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <svg className="w-5 h-5 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-teal-500 rounded-full">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <svg className="w-5 h-5 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded text-sm">
                <p className="text-purple-900 font-bold">
                  ● LIVE ●IMMUTABLE MAP
                </p>
                <p className="text-purple-800 text-xs mt-1">
                  Access delegation is cryptographically audited to National ledger. Updated monthly in Federal Reg. Audit logs (FOIA-exposed) under Section 24 NDPPC.
                </p>
              </div>
            </div>

            {/* Appointment Delegation Form */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200 p-6">
              <div className="flex items-center gap-2 mb-6">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-xl font-bold text-gray-900">☐ Statutory Appointment Delegation Form</h3>
                <div className="ml-auto flex items-center gap-2">
                  <svg className="w-4 h-4 text-purple-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="text-sm font-bold text-purple-900">Immediate WhatsApp-Provisioning Active</span>
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-6">
                Execute statutory campus delegation by appointing new Principals or Registrars and dispatching secure onboarding WhatsApp 6-digit OTP tokens.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Appointed Officer Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Olufunke Danjuma-Adeyemi"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                  <p className="text-xs text-gray-600 mt-1">Must match government-verified identification as statutory appointment</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Target Campus Assignment</label>
                  <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none">
                    <option>📍 Lekki Phase 1 Branch (1 Seat VI...)</option>
                    <option>📍 Victoria Island Main Campus</option>
                    <option>📍 Ikeja GRA Campus</option>
                  </select>
                  <p className="text-xs text-gray-600 mt-1">Download tax of sovereign territory assignment from pool</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Statutory Role Designation</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="role" defaultChecked className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">Campus Executive (Standard)</span>
                    </label>
                    <p className="text-xs text-gray-600 ml-6">Full school roster override authority and attestation root access</p>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="role" className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">Registrar & Records Lead</span>
                    </label>
                    <p className="text-xs text-gray-600 ml-6">Records, administrative compliance zone, WAEC/NECO handler</p>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="role" className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">Joint Trustee Delegate (High)</span>
                    </label>
                    <p className="text-xs text-gray-600 ml-6">Dual-signed authority on capital expense, Board-to-Campus sync</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">National Identity Number (NIN)</label>
                    <input
                      type="text"
                      placeholder="11.92418 N15 verification-bridge-enabled"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                    <button className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                      ↗ Live NIMC verification-bridge-enabled
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Official Oasis Email Address</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. n.ibrahim"
                        className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      />
                      <span className="flex items-center px-4 py-3 bg-gray-100 border-2 border-gray-300 rounded-lg text-sm text-gray-700">
                        @asis15.edumanage.ng
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Direct Mobile (WhatsApp Dispatch)</label>
                    <input
                      type="tel"
                      placeholder="+234 809 ••• ••••"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                    <p className="text-xs text-gray-600 mt-1">
                      Encrypted authorization token dispatched directly to this WhatsApp (vs legacy SMS & NIN linkage)
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white border-2 border-orange-200 rounded-lg">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600" />
                  <div className="text-sm text-gray-900">
                    <p className="font-bold mb-1">Require physical hardware key confirmation from Chief Dr. Adebayo Adeleke</p>
                    <p className="text-xs text-gray-600">
                      Proprietary YubiKey root signature must approve statutory delegate appointment before enclave activation (FIPS compliant)
                    </p>
                  </div>
                </label>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>All statutory delegations are immutable and logged to the Federal Audit Register</span>
                </div>
                <div className="flex gap-3">
                  <button className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50">
                    Reset Draft
                  </button>
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                    ▶ Execute Statutory Appointment & Dispatch Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
