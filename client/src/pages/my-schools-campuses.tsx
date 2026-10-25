// ============================================================================
// MY SCHOOLS & CAMPUSES PAGE
// ============================================================================
// Tenant Admin page to view and manage all schools/campuses under their trust

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/store'
import AddSchoolModal from '@/components/modals/AddSchoolModal'
import toast from 'react-hot-toast'

interface School {
  id: string
  name: string
  category: string
  location: string
  campusCode: string
  principalName: string
  principalEmail: string
  principalPhone: string
  enrolled: number
  capacity: number
  status: 'Active' | 'Under Setup' | 'Deactivated'
  image: string
  verified: boolean
}

export default function MySchoolsCampusesPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [isAddSchoolModalOpen, setIsAddSchoolModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'setup' | 'deactivated'>('all')

  // Dummy data
  const schools: School[] = [
    {
      id: '1',
      name: 'Crown Jewel High School',
      category: 'Senior & Junior Secondary • WAEC / IGCSE',
      location: 'Lekki Phase 1, Lagos',
      campusCode: 'CJET-LEK',
      principalName: 'Mrs. Folake Balogun',
      principalEmail: 'folake.balogun@crownjewel-edu.ng',
      principalPhone: '0802 334 5678',
      enrolled: 520,
      capacity: 600,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400',
      verified: true,
    },
    {
      id: '2',
      name: 'Crown Jewel Preparatory',
      category: 'Early Years & Primary • Crèche to Basic 6',
      location: 'GRA Ikeja, Lagos',
      campusCode: 'CJET-IKJ',
      principalName: 'Mr. Kenneth Okafor',
      principalEmail: 'k.okafor@crownjewel-edu.ng',
      principalPhone: '0803 555 8901',
      enrolled: 382,
      capacity: 500,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400',
      verified: true,
    },
    {
      id: '3',
      name: 'Crown Jewel Academy',
      category: 'Comprehensive All-Through K-12',
      location: 'Guzape District, Abuja FCT',
      campusCode: 'CJET-ABJ',
      principalName: 'Dr. Amina Bello',
      principalEmail: 'amina.bello@crownjewel-edu.ng',
      principalPhone: '0814 222 3456',
      enrolled: 240,
      capacity: 400,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400',
      verified: true,
    },
  ]

  const handleAddSchoolSubmit = (data: any) => {
    console.log('New school/campus data:', data)
    toast.success(`Campus "${data.schoolName}" registered successfully!`)
  }

  // Filter schools
  const filteredSchools = schools.filter(school => {
    const matchesSearch =
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.campusCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.principalName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter =
      filterStatus === 'all' ||
      (filterStatus === 'active' && school.status === 'Active') ||
      (filterStatus === 'setup' && school.status === 'Under Setup') ||
      (filterStatus === 'deactivated' && school.status === 'Deactivated')

    return matchesSearch && matchesFilter
  })

  const totalEnrolled = schools.reduce((sum, school) => sum + school.enrolled, 0)
  const totalCapacity = schools.reduce((sum, school) => sum + school.capacity, 0)
  const utilizationPercent = (totalEnrolled / totalCapacity) * 100

  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-white shadow-sm z-50 flex flex-col justify-between">
        <div className="flex flex-col">
          {/* Logo & Tenant Info */}
          <div className="h-16 px-6 flex items-center gap-2 bg-gray-50">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-blue-600 tracking-tight leading-tight">EduManage</span>
              <span className="text-[9px] uppercase text-green-600 tracking-widest font-bold">Nigeria • GovCloud</span>
            </div>
          </div>

          {/* Tenant Badge */}
          <div className="px-4 pt-4">
            <div className="p-2 rounded-xl bg-gray-100 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center text-blue-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-semibold text-gray-900 truncate">CJET TRUST</span>
                <span className="text-[11px] text-gray-600 truncate">Crown Jewel Trust</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-1 px-4 mt-4">
            <a
              href="#"
              onClick={() => navigate('/tenant-admin/dashboard')}
              className="flex items-center gap-3 px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all text-sm font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
              </svg>
              <span>Dashboard</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow-sm text-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>My Schools / Campuses</span>
            </a>
            <button
              onClick={() => navigate('/tenant-admin/staff-appointees')}
              className="flex items-center gap-3 px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all text-sm font-medium w-full text-left"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
              </svg>
              <span>Staff & Appointees</span>
            </button>
            <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all text-sm font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>Student Directory</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all text-sm font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span>Billing & Plan Quota</span>
            </a>
            <button
              onClick={() => navigate('/tenant-admin/audit-logs')}
              className="flex items-center gap-3 px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all text-sm font-medium w-full text-left"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Audit Logs</span>
            </button>
            <button
              onClick={() => navigate('/tenant-admin/settings')}
              className="flex items-center gap-3 px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all text-sm font-medium w-full text-left"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Bottom Plan Info */}
        <div className="p-4">
          <div className="p-4 rounded-xl bg-gray-50 shadow-sm flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[9px] uppercase text-blue-600 font-bold tracking-wider">Enterprise Tier</span>
              <span className="text-[9px] text-green-700 bg-green-100 px-2 py-0.5 rounded-full font-bold">3 Active</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-900">
                {totalEnrolled} <span className="text-xs text-gray-600 font-normal">/ {totalCapacity}</span>
              </span>
              <span className="text-xs text-gray-600">Total Student Quota</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full transition-all" style={{ width: `${utilizationPercent}%` }}></div>
            </div>
            <span className="text-xs text-gray-600">Renewal: Nov 2025</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="pl-72">
        {/* Top Header */}
        <header className="fixed top-0 left-72 right-0 h-16 bg-white/85 backdrop-blur-xl shadow-sm z-40 flex items-center justify-between px-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-1.5 rounded-full text-green-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-[11px] font-semibold tracking-wide">Crown Jewel Education Trust • Proprietor</span>
            </div>
            <div className="hidden xl:flex items-center gap-2 bg-gray-50 px-4 py-1.5 rounded-lg text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                className="bg-transparent text-gray-900 placeholder:text-gray-500 text-xs outline-none w-64"
                placeholder="Search schools, principals, reg numbers..."
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-green-100 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
              <svg className="w-4 h-4 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-[11px] text-green-700 font-bold">Online & Synced</span>
            </div>

            <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-all relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="flex items-center gap-2 pl-2">
              <div className="flex flex-col text-right hidden sm:flex">
                <span className="text-sm font-semibold text-gray-900 leading-tight">Dr. Aliyu Mohammed</span>
                <span className="text-xs text-gray-600 leading-none">Lead Proprietor</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="w-full pt-16 bg-white px-10 pb-20">
          <div className="flex flex-col w-full">
            {/* Ambient Glow Background */}
            <div className="relative w-full overflow-hidden">
              <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute top-20 right-10 w-80 h-80 bg-green-500/5 rounded-full blur-3xl pointer-events-none"></div>

              {/* Page Header */}
              <div className="relative pt-6 pb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <nav className="flex items-center gap-2 text-gray-600 text-xs font-medium">
                    <a className="hover:text-blue-600 transition-colors flex items-center gap-1" href="#">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <span>Home</span>
                    </a>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-gray-900 font-semibold">My Schools & Campuses</span>
                  </nav>
                  <div className="flex items-center gap-2 mt-1">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                      Manage Schools & Campuses
                    </h1>
                    <span className="bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">
                      Trust Central
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 max-w-2xl">
                    View, add, update, and manage operational schools under Crown Jewel Education Trust. Real-time offline-first sync enabled.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 shrink-0">
                  <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-900 text-sm font-medium transition-all shadow-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>Export Directory (CSV)</span>
                  </button>
                  <button
                    onClick={() => setIsAddSchoolModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Add New School</span>
                  </button>
                </div>
              </div>

              {/* 4 Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {/* Card 1 */}
                <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-all border border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-wider text-gray-600 font-bold">Institutions</span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-4xl font-bold text-gray-900">3</span>
                        <span className="text-xs text-green-600 font-semibold">Active</span>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-green-100/40 text-green-700 flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-1.5 text-gray-600 text-xs bg-gray-50 px-2 py-1 rounded">
                    <span className="w-2 h-2 rounded-full bg-green-600"></span>
                    <span>All 3 campuses synchronized</span>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-all border border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-wider text-gray-600 font-bold">Total Enrolled</span>
                      <div className="flex items-baseline gap-1.5 mt-1">
                        <span className="text-4xl font-bold text-blue-600">{totalEnrolled}</span>
                        <span className="text-xs text-gray-600">/ {totalCapacity}</span>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-blue-100/40 text-blue-600 flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-green-600 font-medium">{utilizationPercent.toFixed(1)}% Quota consumed</span>
                      <span className="text-gray-600">{totalCapacity - totalEnrolled} seats left</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full rounded-full transition-all" style={{ width: `${utilizationPercent}%` }}></div>
                    </div>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-all border border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-wider text-gray-600 font-bold">Leadership</span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-4xl font-bold text-gray-900">3</span>
                        <span className="text-xs text-gray-600">Principals</span>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-amber-100/50 text-amber-700 flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-1.5 text-gray-600 text-xs bg-gray-50 px-2 py-1 rounded truncate">
                    <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="truncate">All leadership credentials verified</span>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-all border border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-wider text-gray-600 font-bold">Active Territories</span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-4xl font-bold text-gray-900">2</span>
                        <span className="text-xs text-gray-600">States</span>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-gray-200 text-gray-600 flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-1.5 text-gray-600 text-xs bg-gray-50 px-2 py-1 rounded truncate">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="truncate">Lekki Ph 1, Ikeja GRA, Guzape</span>
                  </div>
                </div>
              </div>

              {/* School Directory Table */}
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col border border-gray-100">
                {/* Search & Filters */}
                <div className="p-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-gray-50/40">
                  {/* Search Input */}
                  <div className="relative flex-1 max-w-lg">
                    <svg className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white text-gray-900 placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-sm"
                      placeholder="Search by school name, campus code, or appointed head..."
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                    <button
                      onClick={() => setFilterStatus('all')}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5 ${
                        filterStatus === 'all'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <span>All Schools</span>
                      <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                        filterStatus === 'all' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-900'
                      }`}>
                        {schools.length}
                      </span>
                    </button>
                    <button
                      onClick={() => setFilterStatus('active')}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5 ${
                        filterStatus === 'active'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <span>Active</span>
                      <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                        filterStatus === 'active' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-900'
                      }`}>
                        {schools.filter(s => s.status === 'Active').length}
                      </span>
                    </button>
                    <button
                      onClick={() => setFilterStatus('setup')}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5 ${
                        filterStatus === 'setup'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <span>Under Setup</span>
                      <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                        filterStatus === 'setup' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-900'
                      }`}>
                        {schools.filter(s => s.status === 'Under Setup').length}
                      </span>
                    </button>
                    <button
                      onClick={() => setFilterStatus('deactivated')}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5 ${
                        filterStatus === 'deactivated'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <span>Deactivated</span>
                      <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                        filterStatus === 'deactivated' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-900'
                      }`}>
                        {schools.filter(s => s.status === 'Deactivated').length}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-100 text-gray-600 text-xs font-semibold uppercase tracking-wider">
                        <th className="py-3.5 px-6" scope="col">School Name & Category</th>
                        <th className="py-3.5 px-4" scope="col">Campus Code</th>
                        <th className="py-3.5 px-4" scope="col">Appointed Head / Principal</th>
                        <th className="py-3.5 px-4" scope="col">Capacity & Enrollment</th>
                        <th className="py-3.5 px-4" scope="col">Status</th>
                        <th className="py-3.5 px-6 text-right" scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-900">
                      {filteredSchools.map((school, idx) => (
                        <tr key={school.id} className={`hover:bg-gray-50/60 transition-colors ${idx % 2 === 1 ? 'bg-gray-50/20' : ''}`}>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-gray-200 overflow-hidden flex-shrink-0">
                                <img className="w-full h-full object-cover" src={school.image} alt={school.name} />
                              </div>
                              <div className="flex flex-col min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-base font-semibold text-gray-900 truncate">{school.name}</span>
                                  {school.verified && (
                                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                  )}
                                </div>
                                <span className="text-xs text-gray-600">{school.category}</span>
                                <span className="text-[11px] text-green-600 flex items-center gap-1 mt-0.5 font-medium">
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  </svg>
                                  <span>{school.location}</span>
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gray-100 font-mono text-xs font-semibold text-gray-900 tracking-wider">
                              {school.campusCode}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex flex-col">
                              <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
                                <span>{school.principalName}</span>
                                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                              </div>
                              <a className="text-xs text-blue-600 hover:underline truncate" href={`mailto:${school.principalEmail}`}>
                                {school.principalEmail}
                              </a>
                              <span className="text-xs text-gray-600">{school.principalPhone}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 min-w-[180px]">
                            <div className="flex flex-col gap-1">
                              <div className="flex justify-between items-baseline text-xs">
                                <span className="font-semibold text-gray-900">{school.enrolled} / {school.capacity} <span className="font-normal text-gray-600">Students</span></span>
                                <span className="text-[9px] font-bold text-blue-600">{((school.enrolled / school.capacity) * 100).toFixed(1)}%</span>
                              </div>
                              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                                <div className="bg-blue-600 h-full rounded-full" style={{ width: `${(school.enrolled / school.capacity) * 100}%` }}></div>
                              </div>
                              <span className="text-[9px] text-gray-600 text-right">{school.capacity - school.enrolled} open slots</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                              school.status === 'Active' ? 'bg-green-100 text-green-700' :
                              school.status === 'Under Setup' ? 'bg-amber-100 text-amber-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                school.status === 'Active' ? 'bg-green-600 animate-pulse' :
                                school.status === 'Under Setup' ? 'bg-amber-600' :
                                'bg-red-600'
                              }`}></span>
                              {school.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end gap-3 text-xs">
                              <button
                                onClick={() => navigate(`/tenant-admin/update-school/${school.id}`)}
                                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                              >
                                Edit
                              </button>
                              <a className="inline-flex items-center gap-1 text-green-700 hover:text-green-800 font-semibold transition-colors bg-green-100/30 px-2 py-1 rounded-md" href="#">
                                <span>Enter Portal</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                              </a>
                              <button className="text-red-600 hover:text-red-700 font-medium transition-colors">
                                Deactivate
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Footer */}
                <div className="p-4 bg-gray-50/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-600 text-xs">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Showing <strong className="text-gray-900 font-semibold">{filteredSchools.length} of {schools.length}</strong> schools registered under Crown Jewel Education Trust</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 rounded bg-gray-200 text-gray-400 text-xs cursor-not-allowed" disabled>
                      Previous
                    </button>
                    <span className="px-2 py-1 rounded bg-blue-600 text-white text-xs font-bold">1</span>
                    <button className="px-3 py-1 rounded bg-gray-200 text-gray-400 text-xs cursor-not-allowed" disabled>
                      Next
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Insights */}
              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-100 p-4 rounded-xl flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white text-blue-600 flex items-center justify-center shrink-0 shadow-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-base font-semibold text-gray-900">Cross-Campus Data Sync</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      Local databases update instantly even during network drops and sync bidirectionally with the Abuja central server.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-100 p-4 rounded-xl flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white text-green-600 flex items-center justify-center shrink-0 shadow-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-base font-semibold text-gray-900">Role-Based Segregation</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      School principals can only access their specific campus ledger and gradebook while Trust Board maintains global oversight.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-100 p-4 rounded-xl flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white text-amber-600 flex items-center justify-center shrink-0 shadow-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-base font-semibold text-gray-900">Unified WAEC/NECO Center</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      Combined registration codes and exam result compilation across CJET-LEK and CJET-ABJ are centrally managed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add School Modal */}
      <AddSchoolModal
        isOpen={isAddSchoolModalOpen}
        onClose={() => setIsAddSchoolModalOpen(false)}
        onSubmit={handleAddSchoolSubmit}
      />
    </div>
  )
}
