// ============================================================================
// SUBJECT TEACHER DASHBOARD (Specialist Subject Instructor)
// ============================================================================
// For specialist teachers who teach specific subjects (Physics, ICT, etc.)
// across multiple classes and year groups
// ============================================================================

import * as React from 'react'
import { Link } from 'react-router-dom'

export default function TeacherDashboard() {
  const [actionDrawerOpen, setActionDrawerOpen] = React.useState(true)

  return (
    <div className="space-y-6">
      <div className="flex flex-col w-full gap-y-8">
        {/* ================================================================ */}
        {/* Ambient Decorative Background Element & Instructor Header Banner */}
        {/* ================================================================ */}
        <section className="relative w-full overflow-hidden rounded-2xl bg-surface-container-lowest p-6 shadow-sm">
          {/* Decorative gradients */}
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-primary-fixed/30 blur-3xl pointer-events-none"></div>
          <div className="absolute right-60 -bottom-24 w-72 h-72 rounded-full bg-secondary-fixed/40 blur-3xl pointer-events-none"></div>

          {/* Instructor Header Banner */}
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              {/* Profile Image */}
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-surface-container-high shadow-md shrink-0">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGAYcMrGZJ6bXXpkMA0TgSgSW7ha4x-miVtZqFvvMtC_mCLYNCdvho2s7Jg38pvcH_YWehPRbs6vpbsXhCO81ru2R0k20-8h1jSPB7Z2FL0-6_bhTybTbaxvApGe7tUJi7jUWrfYU9vq8Nh7QhYyPocXFLclTRyfgtHshanjXy0M-BAMAu5qR4b14X8ysneaqHR7UIt-qzOM2NX1WHUACn3CELEv7j8HW8Ykd29eHb3EwdvtpBAwnN"
                  alt="Subject Teacher Profile"
                />
                <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-secondary ring-2 ring-surface-container-lowest"></span>
              </div>

              <div className="flex flex-col">
                {/* Badges */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded-full bg-primary-fixed font-label-pill text-label-pill text-on-primary-fixed tracking-wide uppercase">
                    Specialist Subject Instructor
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container font-label-pill text-label-pill text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px] text-primary">verified_user</span>
                    WAEC / NERDC Certified
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-on-surface mt-1 leading-tight tracking-tight">
                  Good morning, Engr. Yusuf Bello
                </h1>
                <p className="text-sm text-on-surface-variant flex items-center gap-1.5 mt-0.5">
                  <span className="material-symbols-outlined text-[16px] text-primary">school</span>
                  Physics (SSS 1–3) &amp; Computer Science / Robotics · 16 Teaching Periods / Wk
                </p>
              </div>
            </div>

            {/* Quick Context Chips */}
            <div className="flex items-center gap-3 flex-wrap self-start lg:self-center">
              {/* Science Lab B */}
              <div className="px-3.5 py-2 rounded-xl bg-surface-container-low flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[18px]">science</span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">Primary Venue</span>
                  <span className="text-xs font-semibold text-on-surface">Science Lab B</span>
                </div>
              </div>

              {/* ICT Hub */}
              <div className="px-3.5 py-2 rounded-xl bg-surface-container-low flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[18px]">terminal</span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">Tech Venue</span>
                  <span className="text-xs font-semibold text-on-surface">ICT Computer Hub</span>
                </div>
              </div>

              {/* Quick Actions Button */}
              <button
                onClick={() => setActionDrawerOpen(!actionDrawerOpen)}
                className="px-4 py-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-sm font-semibold transition-colors shadow-sm flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                <span>Quick Actions</span>
              </button>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* Four Vital Teaching Metrics Bento */}
        {/* ================================================================ */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Metric 1: Today's Classes */}
          <div className="rounded-xl bg-surface-container-lowest p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Today's Schedule</span>
                <span className="text-4xl font-bold text-on-surface mt-1">
                  3 <span className="text-lg font-normal text-on-surface-variant">Periods</span>
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[22px]">calendar_today</span>
              </div>
            </div>
            <div className="mt-3 pt-2 flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-on-surface font-medium truncate">SSS 2 Gold · 09:00 AM</span>
                <span className="px-1.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed-variant text-[11px] font-bold tracking-wide">Next</span>
              </div>
              <p className="text-xs text-on-surface-variant truncate">SSS 3 Platinum &amp; Basic 5 Emerald later</p>
            </div>
          </div>

          {/* Metric 2: CA Grading Progress */}
          <div className="rounded-xl bg-surface-container-lowest p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Assessment Grading</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl font-bold text-on-surface">82%</span>
                  <span className="text-xs font-semibold text-secondary">CA On Track</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[22px]">checklist_rtl</span>
              </div>
            </div>
            <div className="mt-3 pt-2 flex flex-col gap-1.5">
              <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                <div className="bg-secondary h-1.5 rounded-full" style={{ width: '82%' }}></div>
              </div>
              <div className="flex items-center justify-between text-xs text-on-surface-variant">
                <span>SSS 2 Lab Reports</span>
                <span className="font-semibold text-on-surface">24 / 25 Marked</span>
              </div>
            </div>
          </div>

          {/* Metric 3: Curriculum NERDC Scheme */}
          <div className="rounded-xl bg-surface-container-lowest p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">NERDC Scheme of Work</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl font-bold text-on-surface">Wk 6</span>
                  <span className="text-xs font-semibold text-primary">95% Matched</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined text-[22px]">auto_stories</span>
              </div>
            </div>
            <div className="mt-3 pt-2 flex flex-col">
              <span className="text-[11px] font-bold text-tertiary uppercase tracking-wide">Active Lesson Module</span>
              <span className="text-sm font-semibold text-on-surface truncate mt-0.5">Electromagnetic Induction</span>
            </div>
          </div>

          {/* Metric 4: Lab Readiness */}
          <div className="rounded-xl bg-surface-container-lowest p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Science Lab B Status</span>
                <span className="text-4xl font-bold text-on-surface mt-1">12 / 12</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-secondary-fixed-dim/30 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[22px]">precision_manufacturing</span>
              </div>
            </div>
            <div className="mt-3 pt-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse shrink-0"></span>
              <span className="text-xs text-on-surface truncate">Galvanometers &amp; Multimeters Calibrated</span>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* Primary Layout: Teaching Periods & CA Ledger */}
        {/* ================================================================ */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Left 7 Columns: Today's Period Schedule */}
          <div className="xl:col-span-7 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-6 rounded-full bg-primary"></div>
                <h2 className="text-xl font-semibold text-on-surface">Today's Teaching Periods &amp; Lab Sessions</h2>
              </div>
              <span className="text-xs text-on-surface-variant px-2.5 py-1 rounded-md bg-surface-container-low">Wednesday Roster</span>
            </div>

            {/* Period 1: Active/Next */}
            <div className="p-4 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all flex flex-col gap-3 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary"></div>

              <div className="flex flex-wrap items-center justify-between gap-2 pl-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed-variant text-xs font-semibold">Period 1</span>
                  <span className="text-xs text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">schedule</span>
                    09:00 AM – 10:15 AM (75 mins)
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant text-[11px] font-bold tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  <span>Ready to Start</span>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pl-2 pt-1">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-on-surface">SSS 2 Gold</span>
                    <span className="text-xs text-on-surface-variant">· 25 Students Enrolled</span>
                  </div>
                  <p className="text-sm text-on-surface-variant mt-0.5">
                    Physics Practicals: Ohms Law, Electric Current &amp; Resistor Networks
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-on-surface-variant flex-wrap">
                    <span className="flex items-center gap-1 text-primary">
                      <span className="material-symbols-outlined text-[16px]">meeting_room</span>
                      Science Lab B (Bench 1–6)
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">inventory_2</span>
                      12 Breadboard Kits Pre-loaded
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button className="px-3.5 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-sm font-semibold transition-colors flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px]">description</span>
                    <span>Lesson Note</span>
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-sm font-semibold transition-colors shadow-sm flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                    <span>Open Subject Register</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Period 2: Upcoming */}
            <div className="p-4 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all flex flex-col gap-3 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-outline-variant"></div>

              <div className="flex flex-wrap items-center justify-between gap-2 pl-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant text-xs font-semibold">Period 2</span>
                  <span className="text-xs text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">schedule</span>
                    11:30 AM – 12:45 PM (75 mins)
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[11px] font-bold tracking-wide">Upcoming</span>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pl-2 pt-1">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-on-surface">SSS 3 Platinum</span>
                    <span className="text-xs text-on-surface-variant">· 28 Senior Candidates</span>
                  </div>
                  <p className="text-sm text-on-surface-variant mt-0.5">
                    Advanced Optics: Triangular Prisms, Refraction &amp; Lens Formulas
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-on-surface-variant">
                    <span className="flex items-center gap-1 text-on-surface">
                      <span className="material-symbols-outlined text-[16px]">domain</span>
                      Senior Block Classroom S-301
                    </span>
                    <span className="flex items-center gap-1 text-secondary">
                      <span className="material-symbols-outlined text-[16px]">assignment</span>
                      WAEC Prep Unit 4
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button className="px-3.5 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface text-sm font-semibold transition-colors flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px]">co_present</span>
                    <span>Roster Preview</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Period 3: ICT/Coding */}
            <div className="p-4 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all flex flex-col gap-3 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-outline-variant"></div>

              <div className="flex flex-wrap items-center justify-between gap-2 pl-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant text-xs font-semibold">Period 3</span>
                  <span className="text-xs text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">schedule</span>
                    01:15 PM – 02:15 PM (60 mins)
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[11px] font-bold tracking-wide">Upcoming</span>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pl-2 pt-1">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-on-surface">Basic 5 Emerald</span>
                    <span className="text-xs text-on-surface-variant">· 30 Junior Pupils</span>
                  </div>
                  <p className="text-sm text-on-surface-variant mt-0.5">
                    Intro to Scratch Visual Coding: Conditional Statements &amp; Motion Loops
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-on-surface-variant">
                    <span className="flex items-center gap-1 text-primary">
                      <span className="material-symbols-outlined text-[16px]">desktop_windows</span>
                      Computer Lab A (Terminal 1–30)
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">network_wifi</span>
                      Local Offline Cache Loaded
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button className="px-3.5 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface text-sm font-semibold transition-colors flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px]">play_circle</span>
                    <span>Launch Scratch Server</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Lab Safety Bar */}
            <div className="p-4 rounded-2xl bg-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-4 mt-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface-container-lowest flex items-center justify-center text-primary shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-[20px]">health_and_safety</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-on-surface">Science Lab B Safety Protocol Validated</span>
                  <span className="text-xs text-on-surface-variant">
                    First aid kit checked · Fire blanket certified · Inverter backup battery at 98%
                  </span>
                </div>
              </div>
              <button className="text-primary hover:text-primary-container text-xs font-semibold flex items-center gap-1 shrink-0">
                <span>Lab Checklist</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Right 5 Columns: CA & Assessment Ledger */}
          <div className="xl:col-span-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-6 rounded-full bg-secondary"></div>
                <h2 className="text-xl font-semibold text-on-surface">CA &amp; Continuous Assessment Ledger</h2>
              </div>
              <button className="text-xs text-primary hover:underline font-semibold">View All</button>
            </div>

            {/* Assessment Card 1: SSS 2 Gold */}
            <div className="p-4 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-on-surface">SSS 2 Gold · Physics</span>
                  <span className="text-xs text-on-surface-variant">25 Students · Term 1 Continuous Assessment</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant text-[11px] font-bold tracking-wide">WAEC Stream</span>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-1">
                <div className="p-2.5 rounded-xl bg-surface-container-low flex flex-col">
                  <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wide">CA 1 (15%)</span>
                  <span className="text-xs font-bold text-on-surface mt-1">100% Graded</span>
                  <span className="text-xs text-secondary flex items-center gap-0.5 mt-0.5">
                    <span className="material-symbols-outlined text-[13px]">check_circle</span>
                    Approved
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-surface-container flex flex-col">
                  <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wide">CA 2 Lab (15%)</span>
                  <span className="text-xs font-bold text-on-surface mt-1">24 / 25 Marks</span>
                  <span className="text-xs text-error flex items-center gap-0.5 mt-0.5">
                    <span className="material-symbols-outlined text-[13px]">pending</span>
                    1 Pending
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-surface-container-low flex flex-col opacity-75">
                  <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wide">Exam (70%)</span>
                  <span className="text-xs font-bold text-on-surface mt-1">Locked</span>
                  <span className="text-xs text-on-surface-variant flex items-center gap-0.5 mt-0.5">
                    <span className="material-symbols-outlined text-[13px]">lock</span>
                    Week 12
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-on-surface-variant">1 unsubmitted practical: Chinedu O.</span>
                <button className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold transition-colors">
                  Finalize CA 2 Score
                </button>
              </div>
            </div>

            {/* Assessment Card 2: SSS 3 Platinum */}
            <div className="p-4 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-on-surface">SSS 3 Platinum · Physics</span>
                  <span className="text-xs text-on-surface-variant">28 Students · WAEC Mock Practical Assessment</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed-variant text-[11px] font-bold tracking-wide">Priority</span>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-low flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary font-bold text-xs">
                    28/28
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-on-surface">Practical Sheets Processed</span>
                    <span className="text-xs text-on-surface-variant">Average Class Score: 78.4%</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant text-[11px] font-bold tracking-wide flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-tertiary">hourglass_empty</span>
                  VP Sign-off Pending
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold transition-colors flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">visibility</span>
                  <span>View Broadsheet</span>
                </button>
              </div>
            </div>

            {/* Assessment Card 3: Basic 5 Emerald */}
            <div className="p-4 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-on-surface">Basic 5 Emerald · ICT &amp; Coding</span>
                  <span className="text-xs text-on-surface-variant">30 Junior Pupils · Module Project Assessment</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant text-[11px] font-bold tracking-wide">Primary Dept</span>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-low flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-on-surface">Scratch Maze Project</span>
                  <span className="text-xs text-on-surface-variant">Rubric: Motion logic, variables &amp; sound trigger</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed-variant text-[11px] font-bold tracking-wide">Open Now</span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-on-surface-variant">Due Friday 03:00 PM</span>
                <button className="px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold transition-colors shadow-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">upload_file</span>
                  <span>Upload Scores</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* Quick Shortcuts Section */}
        {/* ================================================================ */}
        {actionDrawerOpen && (
          <section className="rounded-2xl bg-surface-container-lowest p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-6 rounded-full bg-primary"></div>
                <h3 className="text-xl font-semibold text-on-surface">Specialist Subject Teacher Quick Shortcuts</h3>
              </div>
              <span className="text-xs text-on-surface-variant">Departmental Fast Operations</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Shortcut 1 */}
              <Link
                to="/attendance"
                className="p-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all group flex flex-col gap-2"
              >
                <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[22px]">post_add</span>
                </div>
                <span className="text-lg font-semibold text-on-surface mt-1">Record CA Scores</span>
                <span className="text-xs text-on-surface-variant">
                  Batch upload or manually fill CA 1, 2, and practical marks across streams.
                </span>
                <span className="text-xs text-primary font-semibold flex items-center gap-1 mt-auto pt-2">
                  <span>Open Score Register</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </span>
              </Link>

              {/* Shortcut 2 */}
              <Link
                to="/reports"
                className="p-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all group flex flex-col gap-2"
              >
                <div className="w-10 h-10 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[22px]">download_for_offline</span>
                </div>
                <span className="text-lg font-semibold text-on-surface mt-1">WAEC Physics Syllabus</span>
                <span className="text-xs text-on-surface-variant">
                  Official NERDC / WAEC SSCE 2025 aligned scheme with practical guidelines.
                </span>
                <span className="text-xs text-secondary font-semibold flex items-center gap-1 mt-auto pt-2">
                  <span>Download PDF (2.4 MB)</span>
                  <span className="material-symbols-outlined text-[16px]">file_download</span>
                </span>
              </Link>

              {/* Shortcut 3 */}
              <Link
                to="/attendance"
                className="p-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all group flex flex-col gap-2"
              >
                <div className="w-10 h-10 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[22px]">biotech</span>
                </div>
                <span className="text-lg font-semibold text-on-surface mt-1">Reserve Laboratory Slot</span>
                <span className="text-xs text-on-surface-variant">
                  Book Science Lab B or ICT Hub for double practicals or relief sessions.
                </span>
                <span className="text-xs text-tertiary font-semibold flex items-center gap-1 mt-auto pt-2">
                  <span>Request Slot</span>
                  <span className="material-symbols-outlined text-[16px]">calendar_add_on</span>
                </span>
              </Link>

              {/* Shortcut 4 */}
              <Link
                to="/reports"
                className="p-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all group flex flex-col gap-2"
              >
                <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-on-surface group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[22px]">assignment_add</span>
                </div>
                <span className="text-lg font-semibold text-on-surface mt-1">Weekly Lesson Plan</span>
                <span className="text-xs text-on-surface-variant">
                  Submit Week 7 scheme and instructional aids to HOD Science &amp; VP Academic.
                </span>
                <span className="text-xs text-on-surface font-semibold flex items-center gap-1 mt-auto pt-2">
                  <span>Submit Plan</span>
                  <span className="material-symbols-outlined text-[16px]">send</span>
                </span>
              </Link>
            </div>
          </section>
        )}

        {/* ================================================================ */}
        {/* Role Scope Boundary Notice */}
        {/* ================================================================ */}
        <div className="px-4 py-3 rounded-xl bg-surface-container-lowest flex items-center justify-between text-xs text-on-surface-variant shadow-sm">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-outline text-[18px]">lock</span>
            <span>
              <strong>Instructor Access Scope:</strong> Restricted to assigned classes (SSS 1–3 Physics, Basic 5 ICT).
              Homeroom registers &amp; general tuition ledgers are managed by Campus Administration.
            </span>
          </div>
          <span className="text-xs text-primary font-semibold hidden md:inline">Contact VP Academic for Load Adjustments</span>
        </div>
      </div>
    </div>
  )
}
