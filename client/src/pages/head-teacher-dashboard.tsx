// ============================================================================
// HEAD TEACHER DASHBOARD (Nursery/Primary Sections)
// ============================================================================
// Role-specific dashboard for Head Teachers managing Nursery and Primary sections
// Includes: Class management, staff assignments, attendance, and operations
// ============================================================================

import * as React from 'react'

export default function HeadTeacherDashboard() {
  const [selectedSection, setSelectedSection] = React.useState<'all' | 'ey' | 'pri' | 'jss' | 'sss'>('jss')

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between">
        <div className="flex flex-col flex-1 min-h-0">
          {/* School Logo & Name */}
          <div className="p-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm flex-shrink-0">
              <span className="material-symbols-outlined text-[24px]">school</span>
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="font-semibold text-lg text-gray-900 leading-tight truncate">Crown Jewel</span>
              <span className="text-xs text-gray-500 uppercase tracking-wider truncate">High School · Lekki</span>
            </div>
          </div>

          {/* Platform Badge */}
          <div className="px-6 py-2">
            <div className="px-3 py-1.5 rounded-lg bg-gray-100 flex items-center justify-between">
              <span className="text-xs text-blue-600 uppercase tracking-wider font-bold">EduManage NG</span>
              <span className="text-xs text-gray-600">v4.2 Admin</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            <a
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all"
              href="#"
            >
              <span className="material-symbols-outlined text-[20px]">grid_view</span>
              <span>Dashboard</span>
            </a>
            <a
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all"
              href="#"
            >
              <span className="material-symbols-outlined text-[20px]">badge</span>
              <span>Staff Directory & Records</span>
            </a>
            <a
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all"
              href="#"
            >
              <span className="material-symbols-outlined text-[20px]">person_add</span>
              <span>Staff Onboarding & Recruitment</span>
            </a>
            <a
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all"
              href="#"
            >
              <span className="material-symbols-outlined text-[20px]">auto_stories</span>
              <span>Class & Teaching Assignments</span>
            </a>
            <a
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all"
              href="#"
            >
              <span className="material-symbols-outlined text-[20px]">domain</span>
              <span>School Operations & Facilities</span>
            </a>
            <a
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all"
              href="#"
            >
              <span className="material-symbols-outlined text-[20px]">fact_check</span>
              <span>Daily Attendance</span>
            </a>
            <a
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all"
              href="#"
            >
              <span className="material-symbols-outlined text-[20px]">tune</span>
              <span>Settings</span>
            </a>
          </nav>
        </div>

        {/* Campus Info Footer */}
        <div className="p-4">
          <div className="p-3 rounded-xl bg-gray-50 flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0 animate-pulse"></span>
              <span className="text-xs text-gray-900 font-semibold truncate">Campus: Lekki Branch</span>
            </div>
            <div className="pl-4">
              <span className="text-xs text-gray-500">Term 1 Active · 2024/2025</span>
            </div>
            <div className="mt-1 pt-1 border-t border-gray-200 flex items-center justify-between">
              <span className="text-[10px] text-gray-500 uppercase tracking-wider">Trust Registry</span>
              <span className="text-[10px] text-blue-600 font-bold">CJET-LK-01</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="pl-72 w-full">
        {/* Header */}
        <header className="fixed top-0 left-72 right-0 h-16 bg-white/90 backdrop-blur-xl shadow-sm z-40 px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-0 max-w-2xl">
            <div className="flex items-center gap-2 text-sm text-gray-500 flex-shrink-0 hidden xl:flex">
              <span className="text-gray-900 font-semibold truncate">Crown Jewel High School - Lekki</span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-500">Registrar Portal</span>
            </div>
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">search</span>
              <input
                className="w-full pl-9 pr-4 py-2 bg-gray-50 rounded-lg text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-600 shadow-sm transition-all"
                placeholder="Search staff records, allocations, classes..."
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0"></span>
              <span className="material-symbols-outlined text-[14px]">cloud_done</span>
              <span>Online & Synced</span>
            </div>
            <button className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors" type="button">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-600 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-white text-[18px]">person</span>
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-sm font-semibold text-gray-900 leading-tight">Mrs. Folake Balogun</span>
                <span className="text-xs text-gray-500 leading-tight">School Administrator / Registrar</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="w-full pt-16 bg-background min-h-screen px-6 py-4">
          <div className="flex flex-col w-full space-y-6 pb-12">
            {/* Section Scope Selector */}
            <div className="w-full bg-white rounded-xl p-2 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
                <button
                  onClick={() => setSelectedSection('all')}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium whitespace-nowrap flex items-center gap-1.5 transition-colors ${
                    selectedSection === 'all'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span>Whole School</span>
                  <span className="px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[10px] font-bold">920</span>
                </button>
                <button
                  onClick={() => setSelectedSection('ey')}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium whitespace-nowrap flex items-center gap-1.5 transition-colors ${
                    selectedSection === 'ey'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span>Early Years / Nursery</span>
                  <span className="px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[10px] font-bold">140</span>
                </button>
                <button
                  onClick={() => setSelectedSection('pri')}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium whitespace-nowrap flex items-center gap-1.5 transition-colors ${
                    selectedSection === 'pri'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span>Primary Basic 1–6</span>
                  <span className="px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[10px] font-bold">320</span>
                </button>
                <button
                  onClick={() => setSelectedSection('jss')}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium whitespace-nowrap flex items-center gap-2 transition-colors ${
                    selectedSection === 'jss'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {selectedSection === 'jss' && <span className="w-2 h-2 rounded-full bg-blue-200"></span>}
                  <span className={selectedSection === 'jss' ? 'font-bold' : ''}>Junior Secondary</span>
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wide ${
                    selectedSection === 'jss'
                      ? 'bg-blue-800 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    245 Enrolled
                  </span>
                </button>
                <button
                  onClick={() => setSelectedSection('sss')}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium whitespace-nowrap flex items-center gap-1.5 transition-colors ${
                    selectedSection === 'sss'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span>Senior Secondary (SSS)</span>
                  <span className="px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[10px] font-bold">215</span>
                </button>
              </div>

              {/* Quick Filter Meta */}
              <div className="flex items-center gap-3 self-end md:self-auto flex-shrink-0">
                <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg text-gray-600 text-sm">
                  <span className="material-symbols-outlined text-[16px] text-blue-600">calendar_month</span>
                  <span>2024/2025 Term 1 · Week 7</span>
                </div>
                <button className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors" title="Export JSS Scope Ledger">
                  <span className="material-symbols-outlined text-[20px]">download</span>
                </button>
              </div>
            </div>

            {/* JSS SECTION CONTENT */}
            {selectedSection === 'jss' && (
              <>
                {/* Hero Scope Banner */}
                <div className="w-full bg-white rounded-xl p-5 shadow-sm relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  <div className="absolute -right-16 -top-16 w-56 h-56 bg-blue-50 rounded-full pointer-events-none"></div>
                  <div className="flex items-start sm:items-center gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                      <span className="material-symbols-outlined text-[26px]">school</span>
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xl font-semibold text-gray-900">Junior Secondary School (JSS 1–3 / Basic 7–9)</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs uppercase tracking-wider font-bold">
                          BECE Track Verified
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-0.5">
                        Displaying 245 enrolled students across 9 class arms. Vice Principal (JSS): <strong className="text-gray-900">Mrs. K. Adebayo</strong> · Campus: Lekki Wing B
                      </p>
                    </div>
                  </div>

                  {/* Rapid Administrative CTA Bar */}
                  <div className="flex flex-wrap items-center gap-2.5 relative z-10 w-full sm:w-auto">
                    <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gray-100 text-gray-900 hover:bg-gray-200 text-sm font-medium transition-colors shadow-sm">
                      <span className="material-symbols-outlined text-[18px] text-blue-600">assignment_turned_in</span>
                      <span>View Broadsheet</span>
                    </button>
                    <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium transition-all shadow-sm">
                      <span className="material-symbols-outlined text-[18px]">person_add</span>
                      <span>Register JSS Student</span>
                    </button>
                  </div>
                </div>

                {/* JSS Key Metrics Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  {/* Metric 1: Attendance Today */}
                  <div className="bg-white p-5 rounded-xl shadow-sm flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">JSS Daily Attendance</span>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-4xl font-bold text-gray-900">97.1%</span>
                          <span className="text-sm text-blue-600 font-medium">238 / 245</span>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-[22px]">how_to_reg</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 flex items-center justify-between text-sm">
                      <span className="text-gray-500">7 excused absent today</span>
                      <span className="text-blue-600 font-semibold flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[16px]">arrow_upward</span> +1.4% vs Wk 6
                      </span>
                    </div>
                  </div>

                  {/* Metric 2: Specialist Teachers */}
                  <div className="bg-white p-5 rounded-xl shadow-sm flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Faculty & Subject Teachers</span>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-4xl font-bold text-gray-900">22</span>
                          <span className="text-sm text-gray-500">Specialists</span>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-[22px]">groups</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 flex items-center justify-between text-sm">
                      <span className="text-gray-500">Pre-vocational, STEM & Humanities</span>
                      <span className="px-2 py-0.5 rounded-full bg-gray-100 text-xs text-blue-600 font-bold">100% Deployed</span>
                    </div>
                  </div>

                  {/* Metric 3: Lagos BECE Exam Readiness */}
                  <div className="bg-white p-5 rounded-xl shadow-sm flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">BECE Exam Candidacy</span>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-4xl font-bold text-blue-600">84 / 84</span>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-gray-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-[22px]">verified</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 flex items-center justify-between text-sm">
                      <span className="text-gray-900 font-medium">100% Indexed (Lagos ME&T)</span>
                      <span className="text-blue-600 font-semibold">JSS 3 Finals</span>
                    </div>
                  </div>

                  {/* Metric 4: CA Broadsheet Completion */}
                  <div className="bg-white p-5 rounded-xl shadow-sm flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Continuous Assessment (CA)</span>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-4xl font-bold text-gray-900">91%</span>
                          <span className="text-sm text-gray-500">Computed</span>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-[22px]">calculate</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 flex items-center justify-between text-sm">
                      <span className="text-gray-500">Term 1 Test 1 & Mid-term</span>
                      <span className="text-blue-600 font-semibold">8 arms locked</span>
                    </div>
                  </div>
                </div>

                {/* Primary Asymmetric Operational Bento Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* LEFT 8 COLS: Cohort Ledger & Classes Breakdown */}
                  <div className="lg:col-span-8 flex flex-col space-y-6">
                    {/* JSS Class Arms Table */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
                        <div>
                          <h2 className="text-lg font-semibold text-gray-900">JSS Grade Cohorts & Class Arms (Basic 7–9)</h2>
                          <p className="text-sm text-gray-600">Active class registers, capacity occupancy, and appointed Form Tutors</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 text-xs font-medium">9 Active Classes</span>
                          <button className="p-1.5 rounded-lg bg-gray-100 text-blue-600 hover:bg-gray-200 transition-colors" title="Filter columns">
                            <span className="material-symbols-outlined text-[18px]">tune</span>
                          </button>
                        </div>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                          <thead>
                            <tr className="text-gray-500 text-xs uppercase tracking-wider bg-gray-50 rounded-lg">
                              <th className="py-3 px-4 rounded-l-lg font-semibold">Cohort & Arm</th>
                              <th className="py-3 px-4 font-semibold">Students</th>
                              <th className="py-3 px-4 font-semibold">Form Tutor</th>
                              <th className="py-3 px-4 font-semibold">Today's Attendance</th>
                              <th className="py-3 px-4 font-semibold">Room Allocation</th>
                              <th className="py-3 px-4 text-right rounded-r-lg font-semibold">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {/* JSS 1 Amber */}
                            <tr className="hover:bg-gray-50 transition-colors">
                              <td className="py-3.5 px-4 font-semibold text-gray-900">
                                <div className="flex items-center gap-2.5">
                                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                                  <div>
                                    <span>JSS 1 Amber</span>
                                    <span className="block text-xs text-gray-500 font-normal">Basic 7 - Arm A</span>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3.5 px-4 text-gray-900">
                                <span className="font-bold">28</span> <span className="text-gray-500 font-normal">/ 30 cap</span>
                              </td>
                              <td className="py-3.5 px-4 text-gray-900">
                                <div className="flex items-center gap-2">
                                  <span className="w-6 h-6 rounded-full bg-gray-100 text-blue-600 flex items-center justify-center text-[11px] font-bold">DP</span>
                                  <span>Mr. D. Peters</span>
                                </div>
                              </td>
                              <td className="py-3.5 px-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-16 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                                    <div className="bg-blue-600 h-full rounded-full" style={{ width: '100%' }}></div>
                                  </div>
                                  <span className="text-blue-600 font-semibold text-xs">28/28 (100%)</span>
                                </div>
                              </td>
                              <td className="py-3.5 px-4 text-gray-600 text-xs">Wing B - Room 101</td>
                              <td className="py-3.5 px-4 text-right">
                                <button className="px-2.5 py-1 rounded-md bg-gray-100 hover:bg-blue-600 hover:text-white text-xs font-medium text-gray-900 transition-all">Manage</button>
                              </td>
                            </tr>

                            {/* Add more rows similarly... */}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT 4 COLS: Action Queue & Bell Schedule */}
                  <div className="lg:col-span-4 flex flex-col space-y-6">
                    {/* Operational Action Queue */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
                          <h3 className="text-lg font-semibold text-gray-900">JSS Action Queue</h3>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider">
                          3 Pending
                        </span>
                      </div>
                      <div className="space-y-3">
                        {/* Queue items... */}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>

      {/* Offline Ready Badge */}
      <div className="fixed bottom-6 right-6 z-30 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full shadow-lg">
          <span className="w-2 h-2 rounded-full bg-blue-300 animate-ping"></span>
          <span className="material-symbols-outlined text-[18px]">offline_bolt</span>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider">Lekki Core Node</span>
            <span className="text-xs font-medium leading-none">Offline-first ready</span>
          </div>
        </div>
      </div>
    </div>
  )
}
