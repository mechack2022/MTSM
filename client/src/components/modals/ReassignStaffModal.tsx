// ============================================================================
// REASSIGN STAFF MODAL
// ============================================================================
// Modal for reassigning staff to different campuses

import { useState, useEffect } from 'react'

interface StaffAppointee {
  id: string
  name: string
  phone: string
  email: string
  role: string
  campus: string
  staffId?: string
  initials?: string
  avatarColor?: string
}

interface ReassignStaffModalProps {
  isOpen: boolean
  onClose: () => void
  staff: StaffAppointee | null
  onReassign: (data: { staffId: string; newCampus: string; newRole: string; effectiveDate: string; handoverNote: string; sendNotification: boolean }) => void
}

export default function ReassignStaffModal({ isOpen, onClose, staff, onReassign }: ReassignStaffModalProps) {
  const [newCampus, setNewCampus] = useState('Crown Jewel Academy - Abuja')
  const [effectiveDate, setEffectiveDate] = useState('06 Jan 2026 (Start of Term 2)')
  const [newRole, setNewRole] = useState('Principal / Head of School')
  const [handoverNote, setHandoverNote] = useState('')
  const [sendNotification, setSendNotification] = useState(true)

  useEffect(() => {
    if (staff) {
      // Set defaults when staff changes
      setNewRole(staff.role)
      setHandoverNote('')
      setSendNotification(true)
    }
  }, [staff])

  if (!isOpen || !staff) return null

  const handleReassign = () => {
    onReassign({
      staffId: staff.id,
      newCampus,
      newRole,
      effectiveDate,
      handoverNote,
      sendNotification,
    })
    onClose()
  }

  return (
    <>
      {/* Modal Backdrop */}
      <div
        className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal Card */}
        <div
          className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="p-6 pb-4 flex items-start justify-between bg-white">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl font-bold text-gray-900">Reassign Appointed Leader</h2>
                <p className="text-sm text-gray-600 mt-0.5">
                  Transfer or assign <span className="font-semibold text-gray-900">{staff.name}</span> to a different school or campus branch within Crown Jewel Education Trust.
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-900 p-1.5 rounded-xl hover:bg-gray-100 transition-colors"
              title="Close Modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Current Assignment Banner */}
          <div className="px-6 py-1">
            <div className="bg-blue-50 p-4 rounded-2xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${staff.avatarColor || 'bg-blue-100 text-blue-700'} flex items-center justify-center font-bold text-sm shadow-sm`}>
                  {staff.initials || staff.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">Current Assignment</span>
                  <span className="text-base font-semibold text-gray-900">{staff.campus}</span>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-gray-500 uppercase">Current Role</span>
                  <span className="text-sm text-gray-900 font-semibold">{staff.role}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Reassignment Form Body */}
          <form className="p-6 flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); handleReassign(); }}>
            {/* Grid: Target Campus & Effective Date */}
            <div className="grid grid-cols-2 gap-4">
              {/* 1. New Campus Branch */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span>New Campus Branch</span>
                </label>
                <div className="relative">
                  <select
                    className="w-full appearance-none bg-gray-50 text-gray-900 text-sm rounded-xl px-3.5 py-2.5 pr-10 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                    value={newCampus}
                    onChange={(e) => setNewCampus(e.target.value)}
                  >
                    <option value="Crown Jewel Academy - Abuja">Crown Jewel Academy - Abuja Campus</option>
                    <option value="Crown Jewel High School – Lekki">Crown Jewel High School - Lekki</option>
                    <option value="Ikeja Prep">Crown Jewel Prep - Ikeja</option>
                  </select>
                  <svg className="w-5 h-5 absolute right-3 top-3 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* 2. Effective Transfer Date */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Effective Transfer Date</span>
                </label>
                <div className="relative">
                  <input
                    className="w-full bg-gray-50 text-gray-900 text-sm rounded-xl px-3.5 py-2.5 pr-10 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                    type="text"
                    value={effectiveDate}
                    onChange={(e) => setEffectiveDate(e.target.value)}
                  />
                  <svg className="w-5 h-5 absolute right-3 top-3 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* 3. Role at New Campus */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
                <span>Role at New Campus</span>
              </label>
              <div className="relative">
                <select
                  className="w-full appearance-none bg-gray-50 text-gray-900 text-sm rounded-xl px-3.5 py-2.5 pr-10 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                >
                  <option value="Principal / Head of School">Principal / Head of School</option>
                  <option value="Vice Principal (Academic)">Vice Principal (Academic)</option>
                  <option value="Campus Director">Campus Director / Executive Head</option>
                  <option value="Academic Quality Advisor">Academic Quality Advisor</option>
                  <option value="Vice Principal (Student Affairs)">Vice Principal (Student Affairs)</option>
                </select>
                <svg className="w-5 h-5 absolute right-3 top-3 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* 4. Handover & Transition Note */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Handover & Transition Note</span>
                </label>
                <span className="text-xs text-gray-500">Archived in Audit Trail</span>
              </div>
              <textarea
                className="w-full bg-gray-50 text-gray-900 text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all resize-none leading-relaxed"
                rows={3}
                value={handoverNote}
                onChange={(e) => setHandoverNote(e.target.value)}
                placeholder="Enter handover notes and transition details..."
              />
            </div>

            {/* 5. Notification Toggle / Briefing Checkbox */}
            <div className="p-3.5 bg-gray-50 rounded-2xl flex items-start gap-3">
              <div className="pt-0.5">
                <input
                  checked={sendNotification}
                  onChange={(e) => setSendNotification(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-0 focus:outline-none cursor-pointer"
                  id="notify-check"
                  type="checkbox"
                />
              </div>
              <label className="flex flex-col cursor-pointer select-none" htmlFor="notify-check">
                <span className="text-sm font-semibold text-gray-900 leading-tight">Send automated transfer notification & WhatsApp briefing</span>
                <span className="text-xs text-gray-600 mt-0.5">Dispatches official digital transfer memo to appointee and receiving campus administration.</span>
              </label>
            </div>

            {/* Modal Footer Actions */}
            <div className="pt-3 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={handleReassign}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-all shadow-md flex items-center gap-2"
                type="button"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Confirm & Reassign Campus</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
