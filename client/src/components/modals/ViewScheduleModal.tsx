// ============================================================================
// VIEW SCHEDULE MODAL
// ============================================================================
// Modal for viewing a teacher's weekly timetable/schedule
// - Shows all periods across Monday-Friday
// - Display subjects, classes, and locations
// - Color-coded by subject type
// - Export/print capabilities
// ============================================================================

interface ScheduleSlot {
  period: number
  time: string
  monday?: { subject: string; class: string; room: string }
  tuesday?: { subject: string; class: string; room: string }
  wednesday?: { subject: string; class: string; room: string }
  thursday?: { subject: string; class: string; room: string }
  friday?: { subject: string; class: string; room: string }
}

interface ViewScheduleModalProps {
  isOpen: boolean
  onClose: () => void
  teacherName: string
  teacherId: string
}

export default function ViewScheduleModal({ isOpen, onClose, teacherName, teacherId }: ViewScheduleModalProps) {
  if (!isOpen) return null

  // Sample schedule data
  const schedule: ScheduleSlot[] = [
    {
      period: 1,
      time: '8:00 - 8:40',
      monday: { subject: 'Physics', class: 'SSS 2 Gold', room: 'Physics Lab B' },
      wednesday: { subject: 'Physics', class: 'SSS 1 Platinum', room: 'Physics Lab B' },
      friday: { subject: 'Physics', class: 'SSS 2 Gold', room: 'Physics Lab B' },
    },
    {
      period: 2,
      time: '8:45 - 9:25',
      monday: { subject: 'Physics', class: 'SSS 2 Gold', room: 'Physics Lab B' },
      tuesday: { subject: 'Physics', class: 'SSS 3 Gold', room: 'Physics Lab B' },
      thursday: { subject: 'Physics', class: 'SSS 1 Platinum', room: 'Physics Lab B' },
    },
    {
      period: 3,
      time: '9:30 - 10:10',
      tuesday: { subject: 'Physics', class: 'SSS 3 Gold', room: 'Physics Lab B' },
      wednesday: { subject: 'Physics', class: 'SSS 1 Platinum', room: 'Physics Lab B' },
      friday: { subject: 'Physics Masterclass', class: 'SSS 3 WAEC Prep', room: 'Science Hall' },
    },
    {
      period: 4,
      time: '10:30 - 11:10',
      monday: { subject: 'Form Period', class: 'SSS 2 Gold', room: 'Room 204' },
      thursday: { subject: 'Physics', class: 'SSS 3 Gold', room: 'Physics Lab B' },
      friday: { subject: 'Physics Masterclass', class: 'SSS 3 WAEC Prep', room: 'Science Hall' },
    },
    {
      period: 5,
      time: '11:15 - 11:55',
      tuesday: { subject: 'Physics', class: 'SSS 2 Gold', room: 'Physics Lab B' },
      wednesday: { subject: 'Physics', class: 'SSS 2 Gold', room: 'Physics Lab B' },
    },
    {
      period: 6,
      time: '12:00 - 12:40',
      monday: { subject: 'Physics', class: 'SSS 1 Platinum', room: 'Physics Lab B' },
      thursday: { subject: 'Physics', class: 'SSS 3 Gold', room: 'Physics Lab B' },
      friday: { subject: 'Physics Masterclass', class: 'SSS 3 WAEC Prep', room: 'Science Hall' },
    },
  ]

  const getSubjectColor = (subject?: string) => {
    if (!subject) return ''
    if (subject.includes('Masterclass') || subject.includes('WAEC')) {
      return 'bg-green-50 border-green-200 text-green-900'
    }
    if (subject.includes('Form Period')) {
      return 'bg-blue-50 border-blue-200 text-blue-900'
    }
    return 'bg-purple-50 border-purple-200 text-purple-900'
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/40 backdrop-blur-md overflow-y-auto">
      {/* Modal Card */}
      <div className="relative w-full max-w-6xl my-auto bg-[var(--md-sys-color-surface-container-lowest,#ffffff)] rounded-2xl shadow-[0_24px_48px_-12px_rgba(19,27,46,0.25),0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-[var(--md-sys-color-surface-container-lowest,#ffffff)] flex items-start justify-between sticky top-0 z-20 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[var(--md-sys-color-primary-fixed,#dbe1ff)] flex items-center justify-center text-[var(--md-sys-color-primary,#004ac6)] mt-0.5 shadow-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-[var(--md-sys-color-on-surface,#1a1c1e)] tracking-tight">Weekly Teaching Schedule</h2>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">2024/2025 Term 1</span>
              </div>
              <p className="text-sm text-[var(--md-sys-color-on-surface-variant,#44474e)] mt-0.5">
                {teacherName} · {teacherId}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 rounded-lg bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] text-[var(--md-sys-color-on-surface,#131b2e)] hover:bg-[var(--md-sys-color-surface-container,#eaedff)] text-xs font-semibold transition-all flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Export PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-lg bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] hover:bg-[var(--md-sys-color-surface-container,#eaedff)] text-[var(--md-sys-color-on-surface-variant,#434655)] hover:text-[var(--md-sys-color-on-surface,#131b2e)] flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body - Timetable Grid */}
        <div className="p-6 flex-1 overflow-auto">
          <div className="min-w-[900px]">
            {/* Header Row */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              <div className="font-bold text-xs text-gray-600 uppercase p-2">Period</div>
              <div className="font-bold text-xs text-blue-600 uppercase p-2 text-center">Monday</div>
              <div className="font-bold text-xs text-blue-600 uppercase p-2 text-center">Tuesday</div>
              <div className="font-bold text-xs text-blue-600 uppercase p-2 text-center">Wednesday</div>
              <div className="font-bold text-xs text-blue-600 uppercase p-2 text-center">Thursday</div>
              <div className="font-bold text-xs text-blue-600 uppercase p-2 text-center">Friday</div>
              <div className="font-bold text-xs text-gray-600 uppercase p-2 text-center">Time</div>
            </div>

            {/* Schedule Rows */}
            {schedule.map((slot) => (
              <div key={slot.period} className="grid grid-cols-7 gap-2 mb-2">
                {/* Period Number */}
                <div className="flex items-center justify-center p-2 rounded-lg bg-gray-100">
                  <span className="text-lg font-bold text-gray-900">{slot.period}</span>
                </div>

                {/* Monday */}
                <div className={`p-3 rounded-lg border-2 ${slot.monday ? getSubjectColor(slot.monday.subject) : 'bg-gray-50 border-gray-200'}`}>
                  {slot.monday ? (
                    <>
                      <p className="text-xs font-bold mb-0.5">{slot.monday.subject}</p>
                      <p className="text-xs text-gray-600">{slot.monday.class}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {slot.monday.room}
                      </p>
                    </>
                  ) : (
                    <p className="text-xs text-gray-400 text-center">Free period</p>
                  )}
                </div>

                {/* Tuesday */}
                <div className={`p-3 rounded-lg border-2 ${slot.tuesday ? getSubjectColor(slot.tuesday.subject) : 'bg-gray-50 border-gray-200'}`}>
                  {slot.tuesday ? (
                    <>
                      <p className="text-xs font-bold mb-0.5">{slot.tuesday.subject}</p>
                      <p className="text-xs text-gray-600">{slot.tuesday.class}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {slot.tuesday.room}
                      </p>
                    </>
                  ) : (
                    <p className="text-xs text-gray-400 text-center">Free period</p>
                  )}
                </div>

                {/* Wednesday */}
                <div className={`p-3 rounded-lg border-2 ${slot.wednesday ? getSubjectColor(slot.wednesday.subject) : 'bg-gray-50 border-gray-200'}`}>
                  {slot.wednesday ? (
                    <>
                      <p className="text-xs font-bold mb-0.5">{slot.wednesday.subject}</p>
                      <p className="text-xs text-gray-600">{slot.wednesday.class}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {slot.wednesday.room}
                      </p>
                    </>
                  ) : (
                    <p className="text-xs text-gray-400 text-center">Free period</p>
                  )}
                </div>

                {/* Thursday */}
                <div className={`p-3 rounded-lg border-2 ${slot.thursday ? getSubjectColor(slot.thursday.subject) : 'bg-gray-50 border-gray-200'}`}>
                  {slot.thursday ? (
                    <>
                      <p className="text-xs font-bold mb-0.5">{slot.thursday.subject}</p>
                      <p className="text-xs text-gray-600">{slot.thursday.class}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {slot.thursday.room}
                      </p>
                    </>
                  ) : (
                    <p className="text-xs text-gray-400 text-center">Free period</p>
                  )}
                </div>

                {/* Friday */}
                <div className={`p-3 rounded-lg border-2 ${slot.friday ? getSubjectColor(slot.friday.subject) : 'bg-gray-50 border-gray-200'}`}>
                  {slot.friday ? (
                    <>
                      <p className="text-xs font-bold mb-0.5">{slot.friday.subject}</p>
                      <p className="text-xs text-gray-600">{slot.friday.class}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {slot.friday.room}
                      </p>
                    </>
                  ) : (
                    <p className="text-xs text-gray-400 text-center">Free period</p>
                  )}
                </div>

                {/* Time */}
                <div className="flex items-center justify-center p-2 rounded-lg bg-gray-50">
                  <span className="text-xs font-semibold text-gray-600">{slot.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-6 p-4 rounded-xl bg-gray-50 flex flex-wrap items-center gap-4">
            <span className="text-xs font-bold text-gray-600 uppercase">Legend:</span>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-purple-100 border-2 border-purple-200"></div>
              <span className="text-xs text-gray-700">Regular Subject</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-100 border-2 border-green-200"></div>
              <span className="text-xs text-gray-700">WAEC Prep / Masterclass</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-100 border-2 border-blue-200"></div>
              <span className="text-xs text-gray-700">Form Period</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gray-100 border-2 border-gray-200"></div>
              <span className="text-xs text-gray-700">Free Period</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[var(--md-sys-color-surface-container-low,#f5f5f5)] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Total: 16 teaching periods per week · Generated on {new Date().toLocaleDateString()}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white text-gray-900 hover:bg-gray-100 text-sm font-semibold shadow-sm transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
