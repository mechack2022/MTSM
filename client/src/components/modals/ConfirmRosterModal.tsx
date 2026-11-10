// ============================================================================
// CONFIRM ROSTER MODAL
// ============================================================================
// Modal for confirming and finalizing pending staff assignments
// - Review assignment details
// - Sign-off confirmation
// - Contract effective date
// - Final approval workflow
// ============================================================================

interface ConfirmRosterModalProps {
  isOpen: boolean
  onClose: () => void
  staffName: string
  staffId: string
  role: string
  assignments: Array<{ class: string; subject: string; periods: number }>
}

export default function ConfirmRosterModal({ isOpen, onClose, staffName, staffId, role, assignments }: ConfirmRosterModalProps) {
  if (!isOpen) return null

  const totalPeriods = assignments.reduce((sum, a) => sum + a.periods, 0)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/40 backdrop-blur-md overflow-y-auto">
      {/* Modal Card */}
      <div className="relative w-full max-w-3xl my-auto bg-[var(--md-sys-color-surface-container-lowest,#ffffff)] rounded-2xl shadow-[0_24px_48px_-12px_rgba(19,27,46,0.25),0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-[var(--md-sys-color-surface-container-lowest,#ffffff)] flex items-start justify-between sticky top-0 z-20 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600 mt-0.5 shadow-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-[var(--md-sys-color-on-surface,#1a1c1e)] tracking-tight">Confirm Teaching Roster</h2>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">Awaiting Sign-off</span>
              </div>
              <p className="text-sm text-[var(--md-sys-color-on-surface-variant,#44474e)] mt-0.5">
                Review and approve teaching assignment for {staffName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] hover:bg-[var(--md-sys-color-surface-container,#eaedff)] text-[var(--md-sys-color-on-surface-variant,#434655)] hover:text-[var(--md-sys-color-on-surface,#131b2e)] flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          {/* Staff Information Summary */}
          <div className="p-5 rounded-xl bg-blue-50 border-2 border-blue-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-blue-900">{staffName}</h3>
                <p className="text-sm text-blue-700">{staffId} · {role}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-900">{totalPeriods} <span className="text-sm font-normal">pds/wk</span></p>
                <p className="text-xs text-blue-700">Total workload</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-blue-800">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Contract Effective: Term 1, 2024/2025 Academic Session</span>
            </div>
          </div>

          {/* Teaching Assignments */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3">Teaching Assignments to Confirm</h3>
            <div className="space-y-3">
              {assignments.map((assignment, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white shadow-sm border-2 border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-xs font-bold">
                          {assignment.class}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">{assignment.subject}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">{assignment.periods}</p>
                      <p className="text-xs text-gray-600">periods/week</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance Check */}
          <div className="p-4 rounded-xl bg-green-50 border-2 border-green-200">
            <h3 className="text-sm font-bold text-green-900 mb-3 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Compliance Checklist
            </h3>
            <div className="space-y-2">
              {[
                'TRCN professional teaching license verified and active',
                'Workload within NERDC recommended 16-22 periods per week',
                'Background check and police clearance completed',
                'Medical fitness certificate on file',
                'Employment contract terms agreed and signed',
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-green-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs text-green-900">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Authorization Statement */}
          <div className="p-4 rounded-xl bg-gray-50 border-2 border-gray-300">
            <p className="text-xs text-gray-700 leading-relaxed">
              <strong className="text-gray-900">Authorization Statement:</strong> By confirming this roster, you certify that all teaching assignments comply with Lagos State Ministry of Education guidelines, NERDC curriculum standards, and institutional policies. The appointee has been verified, is qualified, and authorized to commence duties effective Term 1, 2024/2025 Academic Session.
            </p>
            <div className="mt-3 flex items-center gap-2">
              <input type="checkbox" id="confirm-checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <label htmlFor="confirm-checkbox" className="text-xs font-semibold text-gray-900">
                I have reviewed and confirmed the accuracy of all information above
              </label>
            </div>
          </div>

          {/* Signature Section */}
          <div className="p-4 rounded-xl bg-blue-50">
            <h3 className="text-sm font-bold text-blue-900 mb-3">School Head Approval</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-blue-700 mb-1">Approving Officer</p>
                <p className="text-sm font-semibold text-blue-900">Mrs. Folake Balogun</p>
                <p className="text-xs text-blue-700">School Administrator</p>
              </div>
              <div>
                <p className="text-xs text-blue-700 mb-1">Approval Date & Time</p>
                <p className="text-sm font-semibold text-blue-900">{new Date().toLocaleDateString()}</p>
                <p className="text-xs text-blue-700">{new Date().toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[var(--md-sys-color-surface-container-lowest,#ffffff)] flex items-center justify-between shadow-[0_-1px_4px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>This action cannot be undone once confirmed</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-900 hover:bg-gray-200 text-sm font-semibold transition-all"
            >
              Cancel
            </button>
            <button className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 text-sm font-bold shadow-md transition-all flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Confirm & Finalize Roster</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
