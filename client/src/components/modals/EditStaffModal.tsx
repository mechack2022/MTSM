// ============================================================================
// EDIT STAFF MODAL
// ============================================================================
// Modal for editing staff appointee details, permissions, and approval limits

import { useState, useEffect } from 'react'

interface StaffAppointee {
  id: string
  name: string
  phone: string
  email: string
  role: string
  campus: string
  staffId?: string
  monthlyLimit?: string
  status: 'Active' | 'Pending' | 'Suspended' | 'On Leave'
  photoUrl?: string
  permissions?: {
    reportCardSignOff: boolean
    staffHiring: boolean
  }
}

interface EditStaffModalProps {
  isOpen: boolean
  onClose: () => void
  staff: StaffAppointee | null
  onSave: (data: StaffAppointee) => void
  onSuspend: (staffId: string) => void
}

export default function EditStaffModal({ isOpen, onClose, staff, onSave, onSuspend }: EditStaffModalProps) {
  const [formData, setFormData] = useState<StaffAppointee | null>(staff)

  // Update form data when staff prop changes
  useEffect(() => {
    if (staff) {
      setFormData(staff)
    }
  }, [staff])

  if (!isOpen || !formData) return null

  const handleSave = () => {
    onSave(formData)
    onClose()
  }

  const handleSuspend = () => {
    if (confirm(`Are you sure you want to suspend access for ${formData.name}? This action will revoke all portal access and permissions.`)) {
      onSuspend(formData.id)
      onClose()
    }
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      {/* Modal Dialog */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col my-auto overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 pb-5 bg-gray-50 flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="relative">
              <img
                className="w-14 h-14 rounded-2xl object-cover shadow-sm bg-gray-200"
                src={formData.photoUrl || ''}
                alt={formData.name}
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shadow-sm">
                <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2.5">
                <h3 className="text-lg font-bold text-gray-900 font-display">Edit Staff Details</h3>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
                  formData.status === 'Active' ? 'bg-green-100 text-green-700' :
                  formData.status === 'On Leave' ? 'bg-amber-100 text-amber-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {formData.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-0.5">
                Update contact details, role title, and operational permissions for {formData.name}.
              </p>
            </div>
          </div>
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="w-8 h-8 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors flex items-center justify-center"
            type="button"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Quick Info Strip */}
        <div className="px-6 py-2.5 bg-gray-100/60 flex flex-wrap items-center gap-4 text-gray-600 text-sm">
          {formData.staffId && (
            <>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
                <span>Staff ID:</span>
                <span className="font-bold text-gray-900">{formData.staffId}</span>
              </div>
              <span className="text-gray-400">•</span>
            </>
          )}
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Campus:</span>
            <span className="font-bold text-gray-900">{formData.campus}</span>
          </div>
        </div>

        {/* Modal Body (Form Fields) */}
        <div className="p-6 flex flex-col gap-5 overflow-y-auto max-h-[calc(85vh-200px)]">
          {/* Row 1: Full Name & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-900">Full Name</label>
              <div className="relative flex items-center">
                <svg className="w-4 h-4 absolute left-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <input
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-gray-50 text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-900 flex items-center justify-between">
                <span>Phone Number</span>
                <span className="text-[11px] text-green-600 flex items-center gap-1 font-semibold">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  WhatsApp Enabled
                </span>
              </label>
              <div className="relative flex items-center">
                <svg className="w-4 h-4 absolute left-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <input
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-gray-50 text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Row 2: Email & Designation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-900">Official Email</label>
              <div className="relative flex items-center">
                <svg className="w-4 h-4 absolute left-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <input
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-gray-50 text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-900">Appointed Designation</label>
              <div className="relative flex items-center">
                <svg className="w-4 h-4 absolute left-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <select
                  className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-gray-50 text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all appearance-none cursor-pointer"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  <option>Principal / Head of School</option>
                  <option>Vice Principal - Academics</option>
                  <option>Vice Principal - Admin</option>
                  <option>Bursar / Financial Secretary</option>
                  <option>Head of Department</option>
                  <option>Senior Teacher</option>
                </select>
                <svg className="w-4 h-4 absolute right-3 pointer-events-none text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Row 3: Monthly Expense Authorization */}
          {formData.monthlyLimit !== undefined && (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-900 flex items-center justify-between">
                <span>Monthly Operational Expense Approval Limit</span>
                <span className="text-xs text-gray-600 font-normal">Max threshold without Trustee sign-off</span>
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 flex items-center pointer-events-none">
                  <span className="text-base text-blue-600 font-bold">₦</span>
                </div>
                <input
                  className="w-full pl-10 pr-12 py-2.5 rounded-xl bg-gray-50 text-gray-900 text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all font-semibold"
                  type="text"
                  value={formData.monthlyLimit}
                  onChange={(e) => setFormData({ ...formData, monthlyLimit: e.target.value })}
                />
                <span className="absolute right-3.5 text-gray-600 text-sm">NGN</span>
              </div>
            </div>
          )}

          {/* Operational Permissions */}
          {formData.permissions && (
            <div className="flex flex-col gap-3 pt-2">
              <span className="text-[11px] uppercase text-gray-600 font-bold tracking-wider">Institutional Permissions</span>

              {/* Permission 1: Report Card Sign-off */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-blue-600 mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="text-sm font-semibold text-gray-900 leading-snug">Report Card Sign-off</span>
                    <span className="text-xs text-gray-600">Authorize and batch publish official termly student report cards to parent portals.</span>
                  </div>
                </div>
                {/* Toggle */}
                <button
                  type="button"
                  onClick={() => setFormData({
                    ...formData,
                    permissions: { ...formData.permissions!, reportCardSignOff: !formData.permissions!.reportCardSignOff }
                  })}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out p-0.5 ${
                    formData.permissions.reportCardSignOff ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      formData.permissions.reportCardSignOff ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Permission 2: Staff Hiring */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-green-600 mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="text-sm font-semibold text-gray-900 leading-snug">Staff Hiring Recommendations</span>
                    <span className="text-xs text-gray-600">Submit interview dossiers and recommend candidate appointments to Board of Trustees.</span>
                  </div>
                </div>
                {/* Toggle */}
                <button
                  type="button"
                  onClick={() => setFormData({
                    ...formData,
                    permissions: { ...formData.permissions!, staffHiring: !formData.permissions!.staffHiring }
                  })}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out p-0.5 ${
                    formData.permissions.staffHiring ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      formData.permissions.staffHiring ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}
        </div>
¯¯
        {/* Modal Footer */}
        <div className="p-6 bg-gray-50 flex items-center justify-between">
          {/* Destructive Action Link */}
          <button
            onClick={handleSuspend}
            className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1.5 hover:underline transition-all"
            type="button"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
            Suspend Access
          </button>
          {/* Right CTA Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-gray-100 text-gray-900 text-sm font-medium transition-colors shadow-sm border border-gray-200"
              type="button"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-md flex items-center gap-2 transition-all"
              type="button"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
