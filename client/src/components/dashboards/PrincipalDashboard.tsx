// ============================================================================
// PRINCIPAL DASHBOARD (JSS & SSS - Junior & Senior Secondary)
// ============================================================================
// Role-specific dashboard for College Principal managing JSS 1-3 & SSS 1-3
// Overseeing 460 students across 22 specialist faculty
// ============================================================================

import * as React from 'react'

export default function PrincipalDashboard() {
  const [selectedSection, setSelectedSection] = React.useState<'all' | 'jss' | 'sss'>('all')

  const filterSection = (section: 'all' | 'jss' | 'sss') => {
    setSelectedSection(section)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col w-full gap-y-8">
        {/* Executive Scope & Identity Banner */}
        <section className="relative rounded-2xl bg-surface-container-lowest p-6 shadow-sm overflow-hidden">
          <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-primary/5 pointer-events-none blur-3xl"></div>
          <div className="absolute right-36 -bottom-10 w-48 h-48 rounded-full bg-secondary/5 pointer-events-none blur-2xl"></div>
          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex flex-col gap-2 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-surface-container text-primary font-semibold tracking-wide flex items-center gap-1.5 text-sm">
                  <span className="material-symbols-outlined text-[15px]">verified_user</span>
                  College Principal Desk
                </span>
                <span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant text-xs">
                  Session: 2024/2025 · First Term · Week 6
                </span>
                <span className="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-semibold flex items-center gap-1 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  Accredited WAEC/BECE Center #049210
                </span>
              </div>
              <h1 className="text-3xl font-bold text-on-surface tracking-tight mt-1">
                Welcome, Principal Okafor
              </h1>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Overseeing Junior Secondary (JSS) &amp; Senior Secondary (SSS) — 460 Students, 22 Specialist Faculty, WAEC &amp; BECE Examination Centers.
              </p>
              {/* Authority Track Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-container-low text-on-surface text-xs">
                  <span className="material-symbols-outlined text-primary text-[17px]">auto_stories</span>
                  <span>NERDC Basic 7-9 BECE Track</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-container-low text-on-surface text-xs">
                  <span className="material-symbols-outlined text-primary text-[17px]">workspace_premium</span>
                  <span>WAEC / NECO / JAMB Senior Secondary Track</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container-high text-on-surface-variant text-xs">
                  <span className="material-symbols-outlined text-[16px]">lock</span>
                  <span>Primary &amp; Early Years restricted to Head Teacher Desk</span>
                </div>
              </div>
            </div>
            {/* Quick Session Controls & Section Toggle */}
            <div className="flex flex-col items-start lg:items-end gap-3 w-full lg:w-auto">
              <div className="flex items-center gap-2 bg-surface-container p-1 rounded-xl w-full lg:w-auto justify-between lg:justify-start">
                <button
                  className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 text-sm ${
                    selectedSection === 'all'
                      ? 'bg-primary text-on-primary font-semibold shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                  onClick={() => filterSection('all')}
                >
                  <span className="material-symbols-outlined text-[16px]">domain</span>
                  <span>All Secondary (460)</span>
                </button>
                <button
                  className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 text-sm ${
                    selectedSection === 'jss'
                      ? 'bg-primary text-on-primary font-semibold shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                  onClick={() => filterSection('jss')}
                >
                  <span className="material-symbols-outlined text-[16px]">menu_book</span>
                  <span>JSS 1-3 (245)</span>
                </button>
                <button
                  className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 text-sm ${
                    selectedSection === 'sss'
                      ? 'bg-primary text-on-primary font-semibold shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                  onClick={() => filterSection('sss')}
                >
                  <span className="material-symbols-outlined text-[16px]">school</span>
                  <span>SSS 1-3 (215)</span>
                </button>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant text-xs">
                <span className="material-symbols-outlined text-[16px] text-secondary">update</span>
                <span>Last biometric muster sync: Today at 08:14 AM</span>
              </div>
            </div>
          </div>
        </section>

        {/* Principal Quick Actions Strip */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button className="flex items-center justify-between p-3.5 rounded-xl bg-primary text-on-primary shadow-sm hover:bg-primary-container transition-all text-left group">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-on-primary/15 flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">verified</span>
              </span>
              <div className="flex flex-col">
                <span className="text-xs leading-tight font-medium">Sign-off Broadsheet</span>
                <span className="text-xs text-on-primary/80">3 sets ready</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform">chevron_right</span>
          </button>
          <button className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container-lowest text-on-surface hover:bg-surface-container-low shadow-sm transition-all text-left group">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[18px]">gavel</span>
              </span>
              <div className="flex flex-col">
                <span className="text-xs leading-tight font-medium">Review Disciplinary Log</span>
                <span className="text-xs text-on-surface-variant">0 critical escalations</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant group-hover:translate-x-0.5 transition-transform">chevron_right</span>
          </button>
          <button className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container-lowest text-on-surface hover:bg-surface-container-low shadow-sm transition-all text-left group">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[18px]">fact_check</span>
              </span>
              <div className="flex flex-col">
                <span className="text-xs leading-tight font-medium">Inspect Lesson Plans</span>
                <span className="text-xs text-on-surface-variant">21 of 22 reviewed</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant group-hover:translate-x-0.5 transition-transform">chevron_right</span>
          </button>
          <button className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container-lowest text-on-surface hover:bg-surface-container-low shadow-sm transition-all text-left group">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined text-[18px]">event_repeat</span>
              </span>
              <div className="flex flex-col">
                <span className="text-xs leading-tight font-medium">Academic Board Meet</span>
                <span className="text-xs text-on-surface-variant">Friday · 02:00 PM</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant group-hover:translate-x-0.5 transition-transform">chevron_right</span>
          </button>
        </section>

        {/* 4 Executive Operational Metric Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {/* Attendance Metric */}
          <div className="rounded-2xl bg-surface-container-lowest p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">Muster Register</span>
                <h2 className="text-lg font-bold text-on-surface mt-0.5">Secondary Attendance</h2>
              </div>
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[22px]">how_to_reg</span>
              </div>
            </div>
            <div className="my-4 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-on-surface tracking-tight">96.8%</span>
              <span className="text-xs text-secondary font-semibold flex items-center">
                <span className="material-symbols-outlined text-[16px]">trending_up</span> +0.7% vs Wk 5
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
                <div className="bg-secondary h-full rounded-full" style={{ width: '96.8%' }}></div>
              </div>
              <div className="flex items-center justify-between text-xs text-on-surface-variant pt-1">
                <span className="font-medium text-on-surface">445 / 460 Present</span>
                <span className="text-error font-medium">15 absent (6 medically excused)</span>
              </div>
            </div>
          </div>

          {/* Examination Candidacy Card */}
          <div className="rounded-2xl bg-surface-container-lowest p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">External Portals</span>
                <h2 className="text-lg font-bold text-on-surface mt-0.5">WAEC / BECE Candidacy</h2>
              </div>
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[22px]">fingerprint</span>
              </div>
            </div>
            <div className="my-4 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-on-surface tracking-tight">100%</span>
              <span className="text-xs text-primary font-semibold flex items-center">
                <span className="material-symbols-outlined text-[16px]">task_alt</span> Bio-Data Cleared
              </span>
            </div>
            <div className="flex flex-col gap-1.5 bg-surface-container-low p-2.5 rounded-xl">
              <div className="flex items-center justify-between text-xs">
                <span className="text-on-surface font-semibold">SSS 3 WAEC Registry</span>
                <span className="text-primary font-bold">72 / 72 Confirmed</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-on-surface font-semibold">JSS 3 State BECE</span>
                <span className="text-secondary font-bold">84 / 84 Indexed</span>
              </div>
            </div>
          </div>

          {/* CA & Broadsheet Verification */}
          <div className="rounded-2xl bg-surface-container-lowest p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">Assessment Ledger</span>
                <h2 className="text-lg font-bold text-on-surface mt-0.5">CA &amp; Broadsheet</h2>
              </div>
              <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined text-[22px]">assignment_turned_in</span>
              </div>
            </div>
            <div className="my-4 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-on-surface tracking-tight">92%</span>
              <span className="text-xs text-tertiary font-semibold flex items-center">
                <span className="material-symbols-outlined text-[16px]">hourglass_top</span> Week 6 Check
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
                <div className="bg-tertiary h-full rounded-full" style={{ width: '92%' }}></div>
              </div>
              <div className="flex items-center justify-between text-xs text-on-surface-variant pt-1">
                <span>342 scores authenticated</span>
                <span className="text-tertiary font-semibold">3 depts pending mid-term</span>
              </div>
            </div>
          </div>

          {/* Specialist Facilities & Labs */}
          <div className="rounded-2xl bg-surface-container-lowest p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">Science &amp; Tech</span>
                <h2 className="text-lg font-bold text-on-surface mt-0.5">Specialist Facilities</h2>
              </div>
              <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface">
                <span className="material-symbols-outlined text-[22px]">biotech</span>
              </div>
            </div>
            <div className="my-4 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-on-surface tracking-tight">4 / 4</span>
              <span className="text-xs text-secondary font-semibold">Active &amp; Supplied</span>
            </div>
            <div className="p-2.5 rounded-xl bg-surface-container-low flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span className="text-xs text-on-surface font-semibold">Physics Lab Practical</span>
              </div>
              <span className="text-xs text-on-surface-variant">10:30 AM · SSS 3</span>
            </div>
          </div>
        </section>

        {/* Secondary Cohort Census */}
        <div className="rounded-2xl bg-surface-container-lowest p-5 shadow-sm flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">table_rows</span>
              <span className="text-lg font-bold text-on-surface">Secondary Cohort Census &amp; Stream Balance</span>
            </div>
            <span className="text-xs text-on-surface-variant">Class Max Cap: 30 / Stream</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 pt-1">
            <div className="p-2.5 rounded-xl bg-surface-container-low flex flex-col">
              <span className="text-xs text-on-surface-variant">JSS 1</span>
              <span className="text-lg font-bold text-on-surface mt-1">82 <span className="text-xs font-normal text-on-surface-variant">/ 90</span></span>
              <span className="text-xs text-secondary font-medium">3 Streams (A-C)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-surface-container-low flex flex-col">
              <span className="text-xs text-on-surface-variant">JSS 2</span>
              <span className="text-lg font-bold text-on-surface mt-1">79 <span className="text-xs font-normal text-on-surface-variant">/ 90</span></span>
              <span className="text-xs text-secondary font-medium">3 Streams (A-C)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-surface-container-low flex flex-col">
              <span className="text-xs text-on-surface-variant">JSS 3 (BECE)</span>
              <span className="text-lg font-bold text-on-surface mt-1">84 <span className="text-xs font-normal text-on-surface-variant">/ 90</span></span>
              <span className="text-xs text-primary font-medium">3 Exam Streams</span>
            </div>
            <div className="p-2.5 rounded-xl bg-surface-container-low flex flex-col">
              <span className="text-xs text-on-surface-variant">SSS 1</span>
              <span className="text-lg font-bold text-on-surface mt-1">73 <span className="text-xs font-normal text-on-surface-variant">/ 80</span></span>
              <span className="text-xs text-secondary font-medium">Sci / Arts / Comm</span>
            </div>
            <div className="p-2.5 rounded-xl bg-surface-container-low flex flex-col">
              <span className="text-xs text-on-surface-variant">SSS 2</span>
              <span className="text-lg font-bold text-on-surface mt-1">70 <span className="text-xs font-normal text-on-surface-variant">/ 80</span></span>
              <span className="text-xs text-secondary font-medium">Mid-term CA on</span>
            </div>
            <div className="p-2.5 rounded-xl bg-surface-container-low flex flex-col">
              <span className="text-xs text-on-surface-variant">SSS 3 (WAEC)</span>
              <span className="text-lg font-bold text-on-surface mt-1">72 <span className="text-xs font-normal text-on-surface-variant">/ 75</span></span>
              <span className="text-xs text-primary font-medium">Intensive Prep</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl bg-surface-container-lowest text-on-surface-variant text-xs">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
            <span>WAEC/NECO Accredited Examination Center #049210 · BECE State Registry Active</span>
          </div>
          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <span>Curriculum: NERDC JSS Basic 7-9 + WAEC/NECO SSS Track</span>
            <span className="text-outline-variant">•</span>
            <span className="font-medium text-on-surface">Principal's Weekly Board Meeting: Friday 2:00 PM</span>
          </div>
        </div>
      </div>
    </div>
  )
}
