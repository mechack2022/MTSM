import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface StaffFormData {
  fullName: string
  email: string
  phone: string
  gender: 'male' | 'female'
  resumptionDate: string
  category: 'academic' | 'administrative' | 'support'
  department: string
  designation: string
  trcn: string
  primarySubject: string
  weeklyPeriods: number
  permissionProfile: string
  offlineAccess: boolean
}

export default function StaffOnboarding() {
  const navigate = useNavigate()
  const [isDispatching, setIsDispatching] = useState(false)
  const [formData, setFormData] = useState<StaffFormData>({
    fullName: 'Mr. Olumide Adeleke',
    email: 'o.adeleke@crownjewel.edu.ng',
    phone: '803 123 4567',
    gender: 'male',
    resumptionDate: '15 Jan 2026',
    category: 'academic',
    department: 'Mathematics & Sciences',
    designation: 'Senior Mathematics Teacher',
    trcn: 'TRCN/LA/2024/99120',
    primarySubject: 'Further Mathematics & General Mathematics',
    weeklyPeriods: 18,
    permissionProfile: 'Subject Teacher & Gradebook Access',
    offlineAccess: true,
  })

  const [assignedClasses, setAssignedClasses] = useState([
    { id: '1', name: 'SSS 1A', students: 38, color: 'bg-blue-600' },
    { id: '2', name: 'SSS 2B', students: 40, color: 'bg-teal-600' },
  ])

  const handleDispatch = () => {
    setIsDispatching(true)
    setTimeout(() => {
      setIsDispatching(false)
      // Navigate to success page with staff data
      navigate('/staff-onboarding/success', {
        state: {
          staffData: {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            designation: formData.designation,
            department: formData.department,
            staffId: 'CJ-STF-051',
            classes: assignedClasses.map(c => c.name),
            weeklyPeriods: formData.weeklyPeriods,
            passcode: 'CJET-MATH-2026#'
          }
        }
      })
    }, 900)
  }

  const removeClass = (id: string) => {
    setAssignedClasses(assignedClasses.filter(c => c.id !== id))
  }

  const totalStudents = assignedClasses.reduce((sum, c) => sum + c.students, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Sidebar - Same as school admin dashboard */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-white shadow-sm z-50 flex flex-col justify-between">
        <div className="flex flex-col flex-1 min-h-0">
          {/* School Header */}
          <div className="p-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm flex-shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-base font-bold text-gray-900 leading-tight truncate">Crown Jewel</span>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider truncate">High School · Lekki</span>
            </div>
          </div>

          {/* Version Badge */}
          <div className="px-6 py-2">
            <div className="px-3 py-1.5 rounded-lg bg-gray-100 flex items-center justify-between">
              <span className="text-[11px] font-bold text-teal-600 uppercase tracking-wider">EduManage NG</span>
              <span className="text-xs text-gray-600">v4.2 Admin</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all font-medium text-sm text-left"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
              </svg>
              <span>Dashboard</span>
            </button>

            {/* Staff Management Dropdown */}
            <div className="pt-2">
              <button
                className="w-full flex items-center justify-between px-3 py-2 text-gray-600 hover:text-gray-900 transition-all text-xs font-semibold uppercase tracking-wider"
              >
                <span>Staff Management</span>
                <svg
                  className="w-4 h-4 transition-transform rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className="pl-3 pr-2 mt-1 space-y-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate('/staff-directory')
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all font-medium text-sm text-left"
                >
                  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                  <span>Staff Directory</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all font-medium text-sm text-left">
                  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Recruitment</span>
                </button>
                <button
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[var(--md-sys-color-primary-container,#e3f2fd)] text-[var(--md-sys-color-on-primary-container,#1565c0)] font-medium text-sm text-left"
                >
                  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Staff Onboarding</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate('/employment-assignments')
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all font-medium text-sm text-left"
                >
                  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Employment & Assignments</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all font-medium text-sm text-left">
                  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Staff Attendance & Leave</span>
                </button>
              </div>
            </div>

            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all font-medium text-sm text-left">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>Class & Teaching Assignments</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all font-medium text-sm text-left">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>School Operations & Facilities</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all font-medium text-sm text-left">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <span>Daily Attendance</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all font-medium text-sm text-left">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Campus Info Footer */}
        <div className="p-4">
          <div className="p-3 rounded-xl bg-gray-50 flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-500 flex-shrink-0 animate-pulse"></span>
              <span className="text-xs font-bold text-gray-900 truncate">Campus: Lekki Branch</span>
            </div>
            <div className="pl-4">
              <span className="text-xs text-gray-600">Term 1 Active · 2024/2025</span>
            </div>
            <div className="mt-1 pt-1 border-t border-gray-200 flex items-center justify-between">
              <span className="text-[11px] font-bold text-gray-500 uppercase">Trust Registry</span>
              <span className="text-[11px] font-bold text-blue-600">CJET-LK-01</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-72 flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 right-0 h-16 bg-white/90 backdrop-blur-md shadow-sm z-40 pl-4 pr-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6 flex-1 min-w-0">
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs font-bold text-gray-900">Crown Jewel High School - Lekki</span>
            </div>
            <div className="hidden lg:flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full">
              <svg className="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs font-bold text-gray-600">2024/2025 Term 1</span>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-teal-500"></span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Online & Synced</span>
            </div>
            <button className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-sm font-bold text-gray-900 leading-tight">Mrs. Folake Balogun</span>
                <span className="text-xs text-gray-600 leading-tight">School Administrator / Registrar</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="w-full pl-4 pr-6 py-6 bg-gray-50 min-h-screen">
          <div className="flex flex-col w-full max-w-7xl mx-auto">
            {/* Top Navigation & Stepper Header */}
            <div className="flex flex-col gap-2 mb-6">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors py-1 group"
                >
                  <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Back to Staff Directory</span>
                </button>
                <div className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                  <span className="text-[11px] font-bold text-gray-900 uppercase tracking-wider">Step 1 of 2: Profile & Role Assignment</span>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-2">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Onboard New Staff Member</h1>
                  <p className="text-sm text-gray-600 mt-1 max-w-2xl">
                    Enter candidate details, assign their academic or operational role, and dispatch their official welcome portal invite with offline-first synchronization.
                  </p>
                </div>
                <div className="hidden md:flex items-center gap-2 text-teal-700 text-xs font-bold bg-teal-50 px-3 py-1.5 rounded-lg">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>TRCN & Lagos State MoE Compliant</span>
                </div>
              </div>
            </div>

            {/* Main Form Layout */}
            <form
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
              onSubmit={(e) => e.preventDefault()}
            >
              {/* LEFT COLUMN - Main Form Sections */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                {/* 1. Personal Information */}
                <section className="bg-white rounded-xl p-6 shadow-sm flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-blue-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <h2 className="text-lg font-bold text-gray-900">1. Personal Information</h2>
                    </div>
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Primary Record</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-gray-900 flex items-center justify-between">
                        <span>Full Legal Name</span>
                        <span className="text-red-600 text-xs">* Required</span>
                      </label>
                      <div className="relative">
                        <svg className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                        </svg>
                        <input
                          className="w-full bg-gray-50 text-gray-900 text-sm rounded-lg pl-10 pr-4 py-2.5 outline-none focus:bg-gray-100 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-gray-400"
                          type="text"
                          placeholder="First and last legal name"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-gray-900">Institutional / Contact Email</label>
                      <div className="relative">
                        <svg className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        <input
                          className="w-full bg-gray-50 text-gray-900 text-sm rounded-lg pl-10 pr-4 py-2.5 outline-none focus:bg-gray-100 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-gray-400"
                          type="email"
                          placeholder="e.g. name@crownjewel.edu.ng"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                      <span className="text-xs text-gray-600">Default Google Workspace & SIS login</span>
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-gray-900">Mobile Phone Number</label>
                        <div className="flex items-center gap-1 text-teal-600 text-[11px] font-bold">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>WhatsApp Verified</span>
                        </div>
                      </div>
                      <div className="relative flex items-center">
                        <div className="absolute left-3 flex items-center gap-1.5 pointer-events-none">
                          <span className="text-base">🇳🇬</span>
                          <span className="text-xs font-bold text-gray-900">+234</span>
                        </div>
                        <input
                          className="w-full bg-gray-50 text-gray-900 text-sm rounded-lg pl-20 pr-4 py-2.5 outline-none focus:bg-gray-100 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-gray-400"
                          type="tel"
                          placeholder="800 000 0000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                        />
                      </div>
                      <span className="text-xs text-gray-600">Used for instant 2FA & daily shift alerts</span>
                    </div>

                    {/* Gender */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-gray-900">Gender</label>
                      <div className="grid grid-cols-2 gap-2">
                        <label className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg cursor-pointer transition-all ${
                          formData.gender === 'male'
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                        }`}>
                          <input
                            className="hidden"
                            type="radio"
                            name="gender"
                            value="male"
                            checked={formData.gender === 'male'}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'male' | 'female' })}
                          />
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span className="text-xs font-bold">Male</span>
                        </label>
                        <label className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg cursor-pointer transition-all ${
                          formData.gender === 'female'
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                        }`}>
                          <input
                            className="hidden"
                            type="radio"
                            name="gender"
                            value="female"
                            checked={formData.gender === 'female'}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'male' | 'female' })}
                          />
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span className="text-xs font-bold">Female</span>
                        </label>
                      </div>
                    </div>

                    {/* Resumption Date */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-gray-900">Resumption Date</label>
                      <div className="relative">
                        <svg className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <input
                          className="w-full bg-gray-50 text-gray-900 text-sm rounded-lg pl-10 pr-4 py-2.5 outline-none focus:bg-gray-100 focus:ring-2 focus:ring-blue-500/20 transition-all"
                          type="text"
                          value={formData.resumptionDate}
                          onChange={(e) => setFormData({ ...formData, resumptionDate: e.target.value })}
                        />
                      </div>
                      <span className="text-xs text-gray-600">Preset to Term 1 formal resumption</span>
                    </div>
                  </div>
                </section>

                {/* 2. Employment & Role Designation */}
                <section className="bg-white rounded-xl p-6 shadow-sm flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-blue-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h2 className="text-lg font-bold text-gray-900">2. Employment & Role Designation</h2>
                    </div>
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Payroll & HR</span>
                  </div>

                  {/* Staff Category Cards */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-900">Staff Category</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-4 rounded-lg bg-blue-600 text-white shadow-sm cursor-pointer flex flex-col gap-1 transition-all">
                        <div className="flex items-center justify-between">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                          </svg>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="text-xs font-bold mt-1">Academic / Teaching</span>
                        <span className="text-xs opacity-90">Classroom teachers & tutors</span>
                      </div>
                      <div className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-900 cursor-pointer flex flex-col gap-1 transition-all">
                        <div className="flex items-center justify-between">
                          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          <span className="w-4 h-4 rounded-full bg-gray-200"></span>
                        </div>
                        <span className="text-xs font-bold mt-1">Administrative</span>
                        <span className="text-xs text-gray-600">Accounts, Registry, Admissions</span>
                      </div>
                      <div className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-900 cursor-pointer flex flex-col gap-1 transition-all">
                        <div className="flex items-center justify-between">
                          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          </svg>
                          <span className="w-4 h-4 rounded-full bg-gray-200"></span>
                        </div>
                        <span className="text-xs font-bold mt-1">Support & Facilities</span>
                        <span className="text-xs text-gray-600">Lab Tech, Clinic, Transport</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Department */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-gray-900">Department</label>
                      <div className="relative">
                        <select
                          className="w-full bg-gray-50 text-gray-900 text-sm rounded-lg pl-4 pr-10 py-2.5 outline-none appearance-none focus:bg-gray-100 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
                          value={formData.department}
                          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        >
                          <option>Mathematics & Sciences</option>
                          <option>Languages & Literature</option>
                          <option>Humanities & Social Studies</option>
                          <option>Commercial Studies & Economics</option>
                          <option>Vocational & Creative Arts</option>
                        </select>
                        <svg className="w-5 h-5 absolute right-3 top-2.5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    {/* Designation */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-gray-900">Primary Designation / Title</label>
                      <input
                        className="w-full bg-gray-50 text-gray-900 text-sm rounded-lg px-4 py-2.5 outline-none focus:bg-gray-100 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        type="text"
                        value={formData.designation}
                        onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      />
                    </div>

                    {/* TRCN */}
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-gray-900">Teachers Registration Council of Nigeria (TRCN) ID</label>
                        <span className="text-[11px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded">NERDC Compliance</span>
                      </div>
                      <div className="relative">
                        <svg className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <input
                          className="w-full bg-gray-50 text-gray-900 text-sm rounded-lg pl-10 pr-4 py-2.5 outline-none focus:bg-gray-100 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-gray-400 font-mono uppercase"
                          type="text"
                          placeholder="e.g. TRCN/LA/XXXX/XXXX"
                          value={formData.trcn}
                          onChange={(e) => setFormData({ ...formData, trcn: e.target.value })}
                        />
                      </div>
                      <span className="text-xs text-gray-600">Required for annual state accreditation and WAEC/NECO supervisor credentialing.</span>
                    </div>
                  </div>
                </section>

                {/* 3. Teaching & Classroom Scope */}
                <section className="bg-white rounded-xl p-6 shadow-sm flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-blue-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <h2 className="text-lg font-bold text-gray-900">3. Teaching & Classroom Scope</h2>
                    </div>
                    <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">Term 1 Allocation</span>
                  </div>

                  {/* Primary Subject */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-900">Primary Subject Assignment</label>
                    <div className="relative">
                      <svg className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <input
                        className="w-full bg-gray-50 text-gray-900 text-sm rounded-lg pl-10 pr-4 py-2.5 outline-none focus:bg-gray-100 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        type="text"
                        value={formData.primarySubject}
                        onChange={(e) => setFormData({ ...formData, primarySubject: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Assigned Classes */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-gray-900">Assigned Class Arms</label>
                      <span className="text-xs text-gray-600">{assignedClasses.length} classes currently mapped ({totalStudents} students)</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 p-2.5 bg-gray-50 rounded-lg min-h-[50px]">
                      {assignedClasses.map((cls) => (
                        <div key={cls.id} className="inline-flex items-center gap-1.5 bg-white text-gray-900 px-3 py-1 rounded-full shadow-sm text-xs">
                          <span className={`w-2 h-2 rounded-full ${cls.color}`}></span>
                          <span className="font-bold">{cls.name}</span>
                          <span className="text-gray-600 text-[11px] font-mono">({cls.students} studs)</span>
                          <button
                            className="w-4 h-4 rounded-full flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-100 transition-colors ml-0.5"
                            type="button"
                            onClick={() => removeClass(cls.id)}
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                      <button
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-blue-600 text-xs font-bold transition-all"
                        type="button"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Add Class Arm</span>
                      </button>
                    </div>
                  </div>

                  {/* Weekly Periods */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-gray-900">Weekly Timetable Load</label>
                      <div className="relative">
                        <input
                          className="w-full bg-gray-50 text-gray-900 text-sm rounded-lg pl-4 pr-20 py-2.5 outline-none focus:bg-gray-100 focus:ring-2 focus:ring-blue-500/20 transition-all font-bold"
                          type="number"
                          min="2"
                          max="35"
                          value={formData.weeklyPeriods}
                          onChange={(e) => setFormData({ ...formData, weeklyPeriods: parseInt(e.target.value) })}
                        />
                        <span className="absolute right-3 top-2.5 text-xs text-gray-600 pointer-events-none">periods/wk</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg flex flex-col justify-center">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-600">Recommended Full Load</span>
                        <span className="font-bold text-teal-600">60% of Cap (24 max)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* RIGHT COLUMN - System Access & Actions */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                {/* System Access */}
                <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col gap-4">
                  <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-blue-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">System Access</h3>
                  </div>

                  {/* Permission Profile */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-900">Permission Profile</label>
                    <div className="relative">
                      <select
                        className="w-full bg-gray-50 text-gray-900 text-sm rounded-lg pl-3 pr-8 py-2 outline-none appearance-none focus:bg-gray-100 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
                        value={formData.permissionProfile}
                        onChange={(e) => setFormData({ ...formData, permissionProfile: e.target.value })}
                      >
                        <option>Subject Teacher & Gradebook Access</option>
                        <option>Form Master (Attendance & Conduct)</option>
                        <option>Head of Department (Curriculum Audit)</option>
                        <option>Exam Officer / Recording Officer</option>
                      </select>
                      <svg className="w-4 h-4 absolute right-2.5 top-2 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Campus Badge */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-gray-900">Assigned Campus Node</span>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span className="text-xs font-bold text-gray-900">Crown Jewel Lekki</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600 text-[11px] font-bold uppercase">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span>Locked</span>
                      </div>
                    </div>
                  </div>

                  {/* Offline Toggle */}
                  <div className="bg-gray-50 rounded-lg p-3 flex items-start gap-3">
                    <div className="pt-0.5">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={formData.offlineAccess}
                          onChange={(e) => setFormData({ ...formData, offlineAccess: e.target.checked })}
                        />
                        <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-gray-900">Offline Tablet Grading</span>
                      <span className="text-xs text-gray-600 leading-relaxed">Permit continuous offline attendance taking and CA entry on institutional tablets with auto-sync.</span>
                    </div>
                  </div>
                </div>

                {/* Automated Package */}
                <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-teal-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">Automated Package</h3>
                    </div>
                    <span className="text-[11px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded">Triggered on dispatch</span>
                  </div>

                  <p className="text-xs text-gray-600">The following provisioning tasks will fire concurrently upon dispatch:</p>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg">
                      <svg className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-900">Instant WhatsApp Portal Link</span>
                        <span className="text-xs text-gray-600">Sends secure 48-hour password setup link to +234 {formData.phone}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg">
                      <svg className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-900">Institutional Mailbox Creation</span>
                        <span className="text-xs text-gray-600">Generates {formData.email} and dispatches welcome kit PDF</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg">
                      <svg className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-900">Biometric Terminal Enrollment</span>
                        <span className="text-xs text-gray-600">Pushes staff record to Gate 1 & Admin Block attendance clocks</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col gap-3">
                  <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-[0.99] disabled:opacity-70"
                    type="button"
                    onClick={handleDispatch}
                    disabled={isDispatching}
                  >
                    {isDispatching ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span>Provisioning System Nodes...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        <span>Dispatch Onboarding Invitation</span>
                      </>
                    )}
                  </button>
                  <button
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 text-sm font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all"
                    type="button"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                    <span>Save as Draft</span>
                  </button>
                  <p className="text-xs text-gray-500 text-center mt-1">
                    Authorized by Mrs. Folake Balogun (Registrar)
                  </p>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
