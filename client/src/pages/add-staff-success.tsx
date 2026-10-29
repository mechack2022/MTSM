// ============================================================================
// ADD STAFF SUCCESS CONFIRMATION PAGE
// ============================================================================
// Success modal overlay showing confirmation of staff member addition
// - Success message with checkmark icon
// - Staff member summary card
// - Key appointment details
// - Navigation options
// ============================================================================

import { useNavigate, useSearchParams } from 'react-router-dom'

export default function AddStaffSuccessPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // Sample staff data from URL params (would be passed from add-staff page)
  const staffData = {
    fullName: searchParams.get('name') || 'Engr. Yusuf Bello',
    employeeId: searchParams.get('id') || 'EMP-2025-145',
    role: searchParams.get('role') || 'Senior Specialist Teacher',
    department: searchParams.get('dept') || 'SSS Physics & STEM',
    section: searchParams.get('section') || 'Senior Secondary (SSS)',
    email: searchParams.get('email') || 'y.bello@school.ng',
    phone: searchParams.get('phone') || '+234 803 456 7891',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      {/* Success Modal */}
      <div className="relative w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl animate-in zoom-in duration-300">
        {/* Success Header */}
        <div className="relative p-8 bg-gradient-to-br from-green-50 to-teal-50 rounded-t-2xl border-b border-green-100">
          <div className="flex flex-col items-center text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 rounded-full bg-green-600 flex items-center justify-center mb-4 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* Success Message */}
            <h1 className="text-3xl font-bold text-[var(--md-sys-color-on-surface,#1a1c1e)] mb-2">
              Successfully Added!
            </h1>
            <p className="text-sm text-[var(--md-sys-color-on-surface-variant,#44474e)]">
              New staff member has been registered and added to the Crown Jewel High School directory
            </p>
          </div>
        </div>

        {/* Staff Member Summary Card */}
        <div className="p-8">
          <div className="bg-[var(--md-sys-color-surface-container-low,#f5f5f5)] rounded-xl p-6 border border-gray-200">
            <div className="flex items-start gap-4">
              {/* Staff Avatar */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                  {staffData.fullName.split(' ').map(n => n[0]).join('')}
                </div>
              </div>

              {/* Staff Details */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h2 className="text-xl font-bold text-[var(--md-sys-color-on-surface,#1a1c1e)]">
                      {staffData.fullName}
                    </h2>
                    <p className="text-sm text-[var(--md-sys-color-on-surface-variant,#44474e)]">
                      {staffData.role}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                    Active
                  </span>
                </div>

                {/* Key Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-600 uppercase mb-0.5">Employee ID</p>
                    <p className="text-sm font-bold text-gray-900">{staffData.employeeId}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-600 uppercase mb-0.5">Department</p>
                    <p className="text-sm font-bold text-gray-900">{staffData.department}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-600 uppercase mb-0.5">School Section</p>
                    <p className="text-sm font-bold text-gray-900">{staffData.section}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-600 uppercase mb-0.5">Contact</p>
                    <p className="text-sm font-bold text-gray-900">{staffData.phone}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs font-semibold text-gray-600 uppercase mb-0.5">Portal Access Email</p>
                  <p className="text-sm font-bold text-blue-600">{staffData.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps Information */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-[var(--md-sys-color-on-surface,#1a1c1e)] mb-1">
                  What Happens Next?
                </h3>
                <ul className="text-xs text-[var(--md-sys-color-on-surface-variant,#44474e)] space-y-1.5 list-disc list-inside">
                  <li>Onboarding credentials have been sent to <strong>{staffData.email}</strong></li>
                  <li>WhatsApp notification dispatched to <strong>{staffData.phone}</strong></li>
                  <li>NDPA 2023 data consent verification link included in email</li>
                  <li>Temporary portal access code will expire in 72 hours</li>
                  <li>Staff member can complete profile setup and biometric registration</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-8 pb-8 flex items-center gap-3">
          <button
            onClick={() => navigate(`/edit-staff/${staffData.employeeId}`)}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[var(--md-sys-color-primary,#1976d2)] hover:bg-blue-700 text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Staff Dossier
          </button>

          <button
            onClick={() => navigate('/add-staff')}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white hover:bg-gray-50 text-gray-700 font-semibold text-sm border border-gray-300 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Another Staff
          </button>

          <button
            onClick={() => navigate('/staff-directory')}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white hover:bg-gray-50 text-gray-700 font-semibold text-sm border border-gray-300 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Go to Directory
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={() => navigate('/staff-directory')}
          className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
