// ============================================================================
// EDIT ALLOCATION MODAL
// ============================================================================
// Modal for editing existing teaching assignments for a staff member
// - Modify periods per week
// - Add/remove subject allocations
// - Track workload changes
// - Save updates to teaching roster
// ============================================================================

import { useState } from 'react'

interface Assignment {
  class: string
  subject: string
  periods: number
  special?: boolean
}

interface StaffMember {
  id: string
  name: string
  role: string
  currentLoad: number
  maxLoad: number
  assignments: Assignment[]
}

interface EditAllocationModalProps {
  isOpen: boolean
  onClose: () => void
  staff: StaffMember | null
  onSave?: (updatedStaff: StaffMember) => void
}

export default function EditAllocationModal({ isOpen, onClose, staff, onSave }: EditAllocationModalProps) {
  const [assignments, setAssignments] = useState<Assignment[]>(staff?.assignments || [])
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  if (!isOpen || !staff) return null

  const totalPeriods = assignments.reduce((sum, a) => sum + a.periods, 0)
  const availableRemaining = Math.max(0, staff.maxLoad - totalPeriods)
  const existingPercent = Math.min(100, (totalPeriods / 24) * 100)

  const handlePeriodChange = (index: number, delta: number) => {
    const newAssignments = [...assignments]
    const newPeriods = newAssignments[index].periods + delta
    if (newPeriods >= 1 && newPeriods <= 10) {
      newAssignments[index].periods = newPeriods
      setAssignments(newAssignments)
    }
  }

  const handleRemoveAssignment = (index: number) => {
    const newAssignments = assignments.filter((_, i) => i !== index)
    setAssignments(newAssignments)
  }

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaved(true)
      setIsSaving(false)
      setTimeout(() => {
        if (onSave) {
          onSave({
            ...staff,
            assignments,
            currentLoad: totalPeriods,
          })
        }
        onClose()
        setIsSaved(false)
      }, 600)
    }, 800)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/40 backdrop-blur-md overflow-y-auto">
      {/* Modal Card */}
      <div className="relative w-full max-w-3xl my-auto bg-[var(--md-sys-color-surface-container-lowest,#ffffff)] rounded-2xl shadow-[0_24px_48px_-12px_rgba(19,27,46,0.25),0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-[var(--md-sys-color-surface-container-lowest,#ffffff)] flex items-start justify-between sticky top-0 z-20 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[var(--md-sys-color-primary-fixed,#dbe1ff)] flex items-center justify-center text-[var(--md-sys-color-primary,#004ac6)] mt-0.5 shadow-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-[var(--md-sys-color-on-surface,#1a1c1e)] tracking-tight">Edit Teaching Allocation</h2>
              </div>
              <p className="text-sm text-[var(--md-sys-color-on-surface-variant,#44474e)] mt-0.5">
                Modify periods, add or remove subject allocations for {staff.name}
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
          {/* Staff Info */}
          <div className="p-4 rounded-xl bg-[var(--md-sys-color-surface-container-low,#f2f3ff)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-[var(--md-sys-color-on-surface,#131b2e)]">{staff.name}</p>
                <p className="text-xs text-[var(--md-sys-color-on-surface-variant,#434655)]">{staff.role}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-[var(--md-sys-color-on-surface,#131b2e)]">{totalPeriods} <span className="text-sm font-normal text-[var(--md-sys-color-on-surface-variant,#434655)]">pds/wk</span></p>
                <p className={`text-xs font-bold ${availableRemaining > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {availableRemaining} periods remaining
                </p>
              </div>
            </div>

            {/* Workload Bar */}
            <div className="w-full bg-[var(--md-sys-color-surface-container-high,#e2e7ff)] h-2.5 rounded-full overflow-hidden mt-4">
              <div
                className="bg-[var(--md-sys-color-primary,#004ac6)] h-full transition-all duration-300"
                style={{ width: `${existingPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Current Assignments */}
          <div>
            <h3 className="text-sm font-bold text-[var(--md-sys-color-on-surface,#1a1c1e)] mb-3">Current Teaching Allocations</h3>
            <div className="space-y-3">
              {assignments.map((assignment, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-white shadow-sm border-2 border-[var(--md-sys-color-outline-variant,#c4c6d0)]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-full bg-[var(--md-sys-color-primary-container,#dbe1ff)] text-[var(--md-sys-color-on-primary-container,#001a41)] text-xs font-bold">
                          {assignment.class}
                        </span>
                        {assignment.special && (
                          <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                            WAEC Prep
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-[var(--md-sys-color-on-surface,#131b2e)]">
                        {assignment.subject}
                      </p>
                    </div>

                    {/* Period Stepper */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handlePeriodChange(index, -1)}
                        className="w-8 h-8 rounded-lg bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] hover:bg-[var(--md-sys-color-surface-container,#eaedff)] text-[var(--md-sys-color-on-surface,#131b2e)] flex items-center justify-center font-bold transition-all"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <div className="w-14 text-center">
                        <span className="text-lg font-bold text-[var(--md-sys-color-on-surface,#131b2e)]">
                          {assignment.periods}
                        </span>
                        <p className="text-xs text-[var(--md-sys-color-on-surface-variant,#434655)]">pds</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handlePeriodChange(index, 1)}
                        className="w-8 h-8 rounded-lg bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] hover:bg-[var(--md-sys-color-surface-container,#eaedff)] text-[var(--md-sys-color-on-surface,#131b2e)] flex items-center justify-center font-bold transition-all"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={() => handleRemoveAssignment(index)}
                      className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-all"
                      title="Remove this assignment"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}

              {assignments.length === 0 && (
                <div className="p-8 text-center rounded-xl bg-[var(--md-sys-color-surface-container-low,#f2f3ff)]">
                  <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-sm text-gray-600">No assignments. All allocations have been removed.</p>
                </div>
              )}
            </div>
          </div>

          {/* Add New Assignment */}
          <div className="p-4 rounded-xl bg-blue-50 border-2 border-dashed border-blue-300">
            <button className="flex items-center gap-2 text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add New Subject Allocation</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[var(--md-sys-color-surface-container-lowest,#ffffff)] flex items-center justify-between gap-3 shadow-[0_-1px_4px_rgba(0,0,0,0.03)] sticky bottom-0 z-20">
          <div className="flex items-center gap-2 text-xs text-[var(--md-sys-color-on-surface-variant,#434655)]">
            <svg className="w-4 h-4 text-[var(--md-sys-color-secondary,#006a61)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Changes will update the official teaching roster</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] text-[var(--md-sys-color-on-surface,#131b2e)] hover:bg-[var(--md-sys-color-surface-container,#eaedff)] text-sm font-semibold transition-all"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving || isSaved}
              className="px-6 py-2.5 rounded-lg bg-[var(--md-sys-color-primary,#004ac6)] hover:bg-[var(--md-sys-color-primary-container,#dbe1ff)] text-white hover:text-[var(--md-sys-color-on-primary-container,#00174b)] text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
            >
              {isSaving ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Saving Changes...</span>
                </>
              ) : isSaved ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Changes Saved!</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
