// ============================================================================
// CLASS TEACHER DASHBOARD (Homeroom Tutor)
// ============================================================================
// For homeroom/class teachers who manage a specific class and teach
// multiple subjects to that same group of students
// ============================================================================

import * as React from 'react'

export default function ClassTeacherDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col w-full">
        {/* Subtle ambient gradient */}
        <div className="relative w-full overflow-hidden">
          <div className="absolute -top-24 -right-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
          <div className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-secondary/5 blur-3xl pointer-events-none"></div>

          {/* Scope Guardrail Notice */}
          <div className="mb-4 p-3 rounded-xl bg-surface-container-low shadow-sm flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <span className="material-symbols-outlined text-primary text-[20px] shrink-0" style={{ fontVariationSettings: '"FILL" 1' }}>
                shield_person
              </span>
              <p className="text-xs text-on-surface-variant truncate">
                <strong className="text-on-surface font-semibold">Homeroom Access Scope:</strong> Restricted to Basic 4 Emerald roster and assigned primary learning modules. Central administrative files are governed by Campus Leadership.
              </p>
            </div>
            <span className="shrink-0 px-2.5 py-1 rounded-full bg-surface-container-highest text-primary text-[11px] font-bold tracking-wider uppercase">
              TRCN/LA/44120
            </span>
          </div>

          {/* ================================================================ */}
          {/* SECTION 1: Welcome Banner & Hero Context */}
          {/* ================================================================ */}
          <section className="rounded-xl bg-surface-container-lowest p-6 shadow-sm relative overflow-hidden mb-6">
            <div className="relative z-10 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6">
              {/* Lead Tutor Identity */}
              <div className="flex flex-col gap-2 max-w-2xl">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold tracking-wider uppercase">
                    Lead Homeroom Session
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
                  <span className="text-xs text-secondary font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    TRCN Verified Specialist
                  </span>
                </div>
                <h1 className="text-4xl font-bold text-on-surface tracking-tight">
                  Good morning, Mrs. Patience Okon
                </h1>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-on-surface-variant text-sm pt-1">
                  <span className="font-semibold text-primary">Basic 4 - Emerald</span>
                  <span className="text-outline-variant">•</span>
                  <span className="flex items-center gap-1 text-on-surface font-medium">
                    <span className="material-symbols-outlined text-[16px] text-outline">location_on</span>
                    Room P-102
                  </span>
                  <span className="text-outline-variant">•</span>
                  <span>Primary Basic 1–6 Wing</span>
                  <span className="text-outline-variant">•</span>
                  <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-on-surface text-[11px] font-bold">
                    28 Enrolled Pupils
                  </span>
                </div>
              </div>

              {/* Quick Homeroom Triggers */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button className="px-4 py-2.5 rounded-lg bg-primary text-on-primary text-sm font-bold flex items-center gap-2 shadow-sm hover:opacity-95 transition-all">
                  <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                  <span>+ Take Roll Call</span>
                </button>
                <button className="px-4 py-2.5 rounded-lg bg-surface-container text-on-surface text-sm font-semibold flex items-center gap-2 hover:bg-surface-container-high transition-all">
                  <span className="material-symbols-outlined text-[18px] text-tertiary">edit_note</span>
                  <span>Log Pastoral Note</span>
                </button>
                <button className="px-4 py-2.5 rounded-lg bg-surface-container text-on-surface text-sm font-semibold flex items-center gap-2 hover:bg-surface-container-high transition-all">
                  <span className="material-symbols-outlined text-[18px] text-primary">assignment</span>
                  <span>CA Gradebook Entry</span>
                </button>
                <button className="p-2.5 rounded-lg bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all" title="WhatsApp Class Broadcast">
                  <span className="material-symbols-outlined text-[20px]">cell_tower</span>
                </button>
              </div>
            </div>
          </section>

          {/* ================================================================ */}
          {/* SECTION 2: Daily Teaching Vitals (4 Metrics) */}
          {/* ================================================================ */}
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            {/* Card 1: Attendance Today */}
            <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-wider text-outline">Today's Attendance</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl font-bold text-on-surface tracking-tight">
                      27<span className="text-2xl font-medium text-outline">/28</span>
                    </span>
                    <span className="text-xs font-bold text-secondary">96.4%</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-secondary-container/40 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                    groups
                  </span>
                </div>
              </div>
              <div className="mt-4 pt-2 flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-tertiary">healing</span>
                    1 Excused Sick (Chidinma Obi)
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  <span className="text-[11px] font-bold text-secondary uppercase tracking-wide">Synced to Lagos MoE Node</span>
                </div>
              </div>
            </div>

            {/* Card 2: Roll Call Submission */}
            <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-wider text-outline">Roll Call Audit</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-bold text-on-surface tracking-tight">08:15 AM</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                    verified_user
                  </span>
                </div>
              </div>
              <div className="mt-4 pt-2 flex flex-col gap-1">
                <div className="flex items-center gap-1 text-on-surface">
                  <span className="text-xs font-bold text-primary">Submitted &amp; Locked</span>
                  <span className="text-[11px] font-bold text-outline">• P.E. Okon</span>
                </div>
                <p className="text-xs text-on-surface-variant truncate">
                  Tamper-proof digital timestamp recorded
                </p>
              </div>
            </div>

            {/* Card 3: CA 2 Gradebook Status */}
            <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-wider text-outline">CA 2 Assessment Track</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl font-bold text-on-surface tracking-tight">85%</span>
                    <span className="text-xs font-bold text-on-surface-variant">24/28 Graded</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[22px]">auto_stories</span>
                </div>
              </div>
              <div className="mt-4 pt-2 flex flex-col gap-1.5">
                <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                  <div className="bg-primary h-1.5 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-xs text-tertiary font-medium">4 Pending entries due Friday</span>
                </div>
              </div>
            </div>

            {/* Card 4: Guardian QR Dismissal */}
            <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-wider text-outline">Gate Dismissal QR</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl font-bold text-secondary tracking-tight">100%</span>
                    <span className="text-xs font-bold text-on-surface">Ready</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-secondary-container/30 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[22px]">qr_code_scanner</span>
                </div>
              </div>
              <div className="mt-4 pt-2 flex flex-col gap-1">
                <span className="text-xs text-on-surface">28/28 Active pickup passes</span>
                <span className="text-[11px] font-semibold text-outline tracking-wide">Scheduled for 02:30 PM release</span>
              </div>
            </div>
          </section>

          {/* ================================================================ */}
          {/* SECTION 3: Class Schedule & Pastoral Care */}
          {/* ================================================================ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
            {/* LEFT: Today's Schedule (Col 7) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="p-6 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[20px]">view_timeline</span>
                    </div>
                    <div className="flex flex-col">
                      <h2 className="text-lg font-bold text-on-surface">Today's Class Schedule &amp; Rotations</h2>
                      <span className="text-xs text-on-surface-variant">Wednesday • Week 6 • Term 1</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-surface-container-low text-on-surface text-[11px] font-bold">
                    5 Academic Periods
                  </span>
                </div>

                {/* Schedule Timeline */}
                <div className="space-y-3 mt-4">
                  {/* Period 1: Active */}
                  <div className="p-3 rounded-xl bg-primary/5 flex items-start gap-4">
                    <div className="w-24 shrink-0 flex flex-col">
                      <span className="text-xs font-bold text-primary">08:30 – 09:30</span>
                      <span className="text-[11px] uppercase text-primary font-bold tracking-wide">Period 1</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-bold text-on-surface truncate">Numeracy: Mental Arithmetic &amp; Fractions</h3>
                        <span className="px-2 py-0.5 rounded-full bg-primary text-on-primary text-[11px] font-bold flex items-center gap-1 animate-pulse">
                          <span className="w-1.5 h-1.5 rounded-full bg-on-primary"></span>
                          Active Now
                        </span>
                      </div>
                      <p className="text-xs text-on-surface-variant mt-0.5">
                        Tutor: Mrs. Patience Okon (Lead Homeroom) • Room P-102
                      </p>
                    </div>
                    <button className="p-1.5 rounded-lg bg-surface-container-lowest text-primary shadow-sm hover:bg-surface-container transition-all" title="View lesson plan">
                      <span className="material-symbols-outlined text-[18px]">menu_book</span>
                    </button>
                  </div>

                  {/* Period 2 */}
                  <div className="p-3 rounded-xl bg-surface-container-low flex items-start gap-4 hover:bg-surface-container transition-colors">
                    <div className="w-24 shrink-0 flex flex-col">
                      <span className="text-xs font-bold text-on-surface">09:30 – 10:15</span>
                      <span className="text-[11px] uppercase text-outline font-bold tracking-wide">Period 2</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-on-surface truncate">Basic Science &amp; Technology</h3>
                      <p className="text-xs text-on-surface-variant mt-0.5">
                        Hands-on: States of Matter Experiment • Venue: Primary Science Corner
                      </p>
                    </div>
                    <span className="px-2 py-1 rounded-md bg-surface-container-lowest text-on-surface-variant text-[11px] font-semibold">
                      Lab Kits Ready
                    </span>
                  </div>

                  {/* Recess Break */}
                  <div className="px-3 py-2 rounded-lg bg-tertiary-fixed/30 flex items-center gap-4">
                    <div className="w-24 shrink-0 flex items-center gap-1 text-tertiary text-[11px] font-bold">
                      <span className="material-symbols-outlined text-[16px]">restaurant</span>
                      10:15 – 10:45
                    </div>
                    <span className="text-xs text-on-surface font-medium truncate">
                      Recess &amp; Supervised Playground • Fruit Snack Distribution (Amina's Birthday Sharing)
                    </span>
                  </div>

                  {/* Period 3: Specialist Handoff */}
                  <div className="p-3 rounded-xl bg-surface-container-low flex items-start gap-4 hover:bg-surface-container transition-colors">
                    <div className="w-24 shrink-0 flex flex-col">
                      <span className="text-xs font-bold text-on-surface">10:45 – 11:30</span>
                      <span className="text-[11px] uppercase text-outline font-bold tracking-wide">Period 3</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-bold text-on-surface truncate">English Phonics &amp; Diction</h3>
                        <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-primary text-[11px] font-bold">
                          Specialist Handoff
                        </span>
                      </div>
                      <p className="text-xs text-on-surface-variant mt-0.5">
                        Visiting Specialist: Mr. Babatunde Okafor • Remedial Step-up included
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-outline text-[18px]">co_present</span>
                  </div>

                  {/* Period 4: French */}
                  <div className="p-3 rounded-xl bg-surface-container-low flex items-start gap-4 hover:bg-surface-container transition-colors">
                    <div className="w-24 shrink-0 flex flex-col">
                      <span className="text-xs font-bold text-on-surface">11:30 – 12:15</span>
                      <span className="text-[11px] uppercase text-outline font-bold tracking-wide">Period 4</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-bold text-on-surface truncate">French Language (Oral Vocabulary)</h3>
                        <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-primary text-[11px] font-bold">
                          Specialist Handoff
                        </span>
                      </div>
                      <p className="text-xs text-on-surface-variant mt-0.5">
                        Visiting Specialist: Madame Dupont • Interactive Audio-Visuals
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-outline text-[18px]">translate</span>
                  </div>

                  {/* Lunch Break */}
                  <div className="px-3 py-2 rounded-lg bg-surface-container flex items-center gap-4">
                    <div className="w-24 shrink-0 flex items-center gap-1 text-on-surface-variant text-[11px] font-bold">
                      <span className="material-symbols-outlined text-[16px]">wb_sunny</span>
                      12:15 – 01:15
                    </div>
                    <span className="text-xs text-on-surface-variant truncate">
                      Midday Assembly &amp; Dining Hall Lunch Service
                    </span>
                  </div>

                  {/* Period 5 */}
                  <div className="p-3 rounded-xl bg-surface-container-low flex items-start gap-4 hover:bg-surface-container transition-colors">
                    <div className="w-24 shrink-0 flex flex-col">
                      <span className="text-xs font-bold text-on-surface">01:15 – 02:15</span>
                      <span className="text-[11px] uppercase text-outline font-bold tracking-wide">Period 5</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-on-surface truncate">Social Studies &amp; Civic Education</h3>
                      <p className="text-xs text-on-surface-variant mt-0.5">
                        Tutor: Mrs. Patience Okon • Dismissal Gate QR Verification at 02:15 PM
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-outline text-[18px]">badge</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Pastoral Care (Col 5) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="p-6 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-tertiary text-[20px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                        heart_check
                      </span>
                      <h2 className="text-lg font-bold text-on-surface">Pastoral Care &amp; Pupil Alerts</h2>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container text-[11px] font-bold">
                      4 Active Notes
                    </span>
                  </div>

                  {/* Alert List */}
                  <div className="space-y-3 mt-3">
                    {/* Medical Alert */}
                    <div className="p-3 rounded-xl bg-surface-container-low flex items-start gap-3 hover:bg-surface-container transition-all">
                      <div className="w-9 h-9 rounded-lg bg-error-container text-on-error-container flex items-center justify-center shrink-0 text-sm font-bold">
                        08
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-on-surface truncate">Chidinma Obi</span>
                          <span className="px-2 py-0.5 rounded-md bg-error-container text-on-error-container text-[11px] font-bold">Medical Excused</span>
                        </div>
                        <p className="text-xs text-on-surface-variant mt-0.5 leading-snug">
                          Mild fever reported via EduManage WhatsApp Bot. Doctor's note uploaded and verified by Campus Nurse.
                        </p>
                      </div>
                    </div>

                    {/* Birthday */}
                    <div className="p-3 rounded-xl bg-surface-container-low flex items-start gap-3 hover:bg-surface-container transition-all">
                      <div className="w-9 h-9 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0 text-sm font-bold">
                        03
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-on-surface truncate">Amina Danjuma</span>
                          <span className="px-2 py-0.5 rounded-md bg-tertiary-fixed text-on-tertiary-fixed text-[11px] font-bold">🎂 9th Birthday</span>
                        </div>
                        <p className="text-xs text-on-surface-variant mt-0.5 leading-snug">
                          Authorized fruit platter sharing during recess break. Homeroom song scheduled at 10:20 AM.
                        </p>
                      </div>
                    </div>

                    {/* Remedial */}
                    <div className="p-3 rounded-xl bg-surface-container-low flex items-start gap-3 hover:bg-surface-container transition-all">
                      <div className="w-9 h-9 rounded-lg bg-surface-container-highest text-primary flex items-center justify-center shrink-0 text-sm font-bold">
                        21
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-on-surface truncate">Emeka Eze</span>
                          <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-primary text-[11px] font-bold">Phonics Remedial</span>
                        </div>
                        <p className="text-xs text-on-surface-variant mt-0.5 leading-snug">
                          Step-up reading support session booked with Mr. Okafor during Period 3 in the Literacy Bay.
                        </p>
                      </div>
                    </div>

                    {/* Class Prefect */}
                    <div className="p-3 rounded-xl bg-surface-container-low flex items-start gap-3 hover:bg-surface-container transition-all">
                      <div className="w-9 h-9 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 text-sm font-bold">
                        14
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-on-surface truncate">Tobi Adeyemi</span>
                          <span className="px-2 py-0.5 rounded-md bg-secondary-container text-on-secondary-container text-[11px] font-bold">Class Prefect</span>
                        </div>
                        <p className="text-xs text-on-surface-variant mt-0.5 leading-snug">
                          Handing over Class Library logs to Primary Head at 12:45 PM. Excused from assembly dismissal early.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Log Button */}
                <div className="pt-4 mt-4 bg-surface-container-lowest">
                  <button className="w-full py-2 px-3 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-semibold flex items-center justify-center gap-2 transition-all">
                    <span className="material-symbols-outlined text-[18px]">add_circle</span>
                    <span>Create New Pastoral Pupil Log</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ================================================================ */}
          {/* SECTION 4: NERDC Scheme Progress */}
          {/* ================================================================ */}
          <section className="rounded-xl bg-surface-container-lowest p-6 shadow-sm mb-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[22px]">analytics</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-on-surface">Term 1 Scheme of Work Progress</h2>
                  <span className="text-xs text-on-surface-variant">NERDC National Primary Curriculum Compliance Engine</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-secondary-container/50 text-on-secondary-container text-[11px] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-secondary">check_circle</span>
                  On Track for Week 7 Mid-Term Review
                </span>
                <span className="text-lg font-bold text-primary">50% Complete</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-surface-container rounded-full h-2 mb-6 overflow-hidden">
              <div className="bg-primary h-2 rounded-full transition-all duration-500" style={{ width: '50%' }}></div>
            </div>

            {/* Subject cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-surface-container-low flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-on-surface">Basic Numeracy</span>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container text-primary text-[11px] font-bold">6 of 10 Covered</span>
                  </div>
                  <p className="text-xs text-on-surface-variant mb-3">
                    Current focus: Improper Fractions &amp; Number Place Values up to 10,000.
                  </p>
                </div>
                <div className="pt-2">
                  <div className="w-full bg-surface-container-highest rounded-full h-1.5 mb-2 overflow-hidden">
                    <div className="bg-primary h-1.5 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[11px] text-outline uppercase font-semibold">Next Topic:</span>
                    <span className="text-xs font-bold text-on-surface truncate">Mixed Numbers &amp; Decimals</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-container-low flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-on-surface">Basic Science &amp; Tech</span>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container text-primary text-[11px] font-bold">4 of 8 Covered</span>
                  </div>
                  <p className="text-xs text-on-surface-variant mb-3">
                    Current focus: Changes in Matter &amp; Introductory Kinetic Properties.
                  </p>
                </div>
                <div className="pt-2">
                  <div className="w-full bg-surface-container-highest rounded-full h-1.5 mb-2 overflow-hidden">
                    <div className="bg-primary h-1.5 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[11px] text-outline uppercase font-semibold">Next Topic:</span>
                    <span className="text-xs font-bold text-on-surface truncate">Living Things &amp; Habitats</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-container-low flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-on-surface">Social &amp; Civic Studies</span>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container text-primary text-[11px] font-bold">2 of 6 Covered</span>
                  </div>
                  <p className="text-xs text-on-surface-variant mb-3">
                    Current focus: Family Structures, Civic Rights &amp; Communal Responsibilities.
                  </p>
                </div>
                <div className="pt-2">
                  <div className="w-full bg-surface-container-highest rounded-full h-1.5 mb-2 overflow-hidden">
                    <div className="bg-primary h-1.5 rounded-full" style={{ width: '33%' }}></div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[11px] text-outline uppercase font-semibold">Next Topic:</span>
                    <span className="text-xs font-bold text-on-surface truncate">Nigerian Heritage &amp; Culture</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ================================================================ */}
          {/* SECTION 5: Quick Shortcuts */}
          {/* ================================================================ */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <button className="p-4 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md flex items-center gap-4 text-left transition-all group">
              <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[22px]">checklist_rtl</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-on-surface truncate">Quick Attendance</span>
                <span className="text-xs text-on-surface-variant truncate">Live verification scan</span>
              </div>
            </button>

            <button className="p-4 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md flex items-center gap-4 text-left transition-all group">
              <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[22px]">print</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-on-surface truncate">Desk Nametags &amp; QR</span>
                <span className="text-xs text-on-surface-variant truncate">Print Basic 4 badges</span>
              </div>
            </button>

            <button className="p-4 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md flex items-center gap-4 text-left transition-all group">
              <div className="w-10 h-10 rounded-xl bg-secondary-container/40 flex items-center justify-center text-secondary group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[22px]">send</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-on-surface truncate">WhatsApp Broadcast</span>
                <span className="text-xs text-on-surface-variant truncate">Notify all 28 families</span>
              </div>
            </button>

            <button className="p-4 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md flex items-center gap-4 text-left transition-all group">
              <div className="w-10 h-10 rounded-xl bg-error-container/50 flex items-center justify-center text-error group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[22px]">construction</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-on-surface truncate">Report Room Issue</span>
                <span className="text-xs text-on-surface-variant truncate">P-102 AC / Smartboard</span>
              </div>
            </button>
          </section>

          {/* ================================================================ */}
          {/* SECTION 6: Compliance Footer */}
          {/* ================================================================ */}
          <footer className="p-4 rounded-xl bg-surface-container-low flex flex-col md:flex-row items-center justify-between gap-3 text-outline">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
              <span className="text-xs text-on-surface-variant">
                Lagos State Ministry of Basic &amp; Secondary Education Standardized Class Record • NDPA 2023 Compliant Cryptographic Storage
              </span>
            </div>
            <div className="flex items-center gap-4 text-[11px] uppercase font-bold tracking-wider text-outline">
              <span>Node: LAG-LEK-048</span>
              <span className="text-outline-variant">•</span>
              <span>TRCN Verified Session</span>
              <span className="text-outline-variant">•</span>
              <span className="text-secondary">Cache Status: Synchronized</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
