// ============================================================================
// REVIEW DOSSIER MODAL
// ============================================================================
// Modal for reviewing staff qualifications, certifications, and documents
// - Personal information
// - Educational qualifications
// - Professional certifications (TRCN, etc.)
// - Employment history
// - Document verification status
// ============================================================================

interface ReviewDossierModalProps {
  isOpen: boolean
  onClose: () => void
  staffName: string
  staffId: string
}

export default function ReviewDossierModal({ isOpen, onClose, staffName, staffId }: ReviewDossierModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/40 backdrop-blur-md overflow-y-auto">
      {/* Modal Card */}
      <div className="relative w-full max-w-4xl my-auto bg-[var(--md-sys-color-surface-container-lowest,#ffffff)] rounded-2xl shadow-[0_24px_48px_-12px_rgba(19,27,46,0.25),0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-[var(--md-sys-color-surface-container-lowest,#ffffff)] flex items-start justify-between sticky top-0 z-20 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 mt-0.5 shadow-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-[var(--md-sys-color-on-surface,#1a1c1e)] tracking-tight">Staff Dossier Review</h2>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">Pending Verification</span>
              </div>
              <p className="text-sm text-[var(--md-sys-color-on-surface-variant,#44474e)] mt-0.5">
                {staffName} · {staffId}
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
          {/* Personal Information */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Personal Information
            </h3>
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-gray-50">
              <div>
                <p className="text-xs text-gray-600 mb-1">Full Name</p>
                <p className="text-sm font-semibold text-gray-900">Mr. Babatunde Lawal</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Date of Birth</p>
                <p className="text-sm font-semibold text-gray-900">March 15, 1988</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Email Address</p>
                <p className="text-sm font-semibold text-gray-900">b.lawal@example.com</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Phone Number</p>
                <p className="text-sm font-semibold text-gray-900">+234 803 456 7890</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">National ID (NIN)</p>
                <p className="text-sm font-semibold text-gray-900">12345678901</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">State of Origin</p>
                <p className="text-sm font-semibold text-gray-900">Lagos State</p>
              </div>
            </div>
          </div>

          {/* Educational Qualifications */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
              Educational Qualifications
            </h3>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">B.Ed. Primary Education</p>
                    <p className="text-xs text-gray-600">University of Lagos · 2006 - 2010</p>
                    <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Second Class Upper Division
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold">Verified</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">M.Ed. Curriculum & Instruction</p>
                    <p className="text-xs text-gray-600">University of Ibadan · 2015 - 2017</p>
                    <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Distinction
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold">Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Certifications */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
              Professional Certifications & Licenses
            </h3>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-green-50 border-2 border-green-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-green-900">TRCN Professional Teaching License</p>
                    <p className="text-xs text-green-700">Teachers Registration Council of Nigeria</p>
                    <div className="flex items-center gap-3 mt-2 text-xs">
                      <span className="text-green-700">License No: LA/2015/4102</span>
                      <span>•</span>
                      <span className="text-green-700">Issued: Jan 2015</span>
                      <span>•</span>
                      <span className="font-semibold text-green-900">Valid until: Jan 2026</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-green-600 text-white text-xs font-bold">Active</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">Early Years Montessori Certification</p>
                    <p className="text-xs text-gray-600">Montessori Academy of Nigeria · 2018</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">Certified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Employment History */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Employment History
            </h3>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-200">
                <p className="text-sm font-bold text-gray-900">Homeroom Teacher · Primary 3</p>
                <p className="text-xs text-gray-600">Greenfield International School, Lagos · 2019 - 2024</p>
                <p className="text-xs text-gray-700 mt-2">Managed homeroom class of 26 students, taught integrated curriculum</p>
              </div>

              <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-200">
                <p className="text-sm font-bold text-gray-900">Teacher · Primary Section</p>
                <p className="text-xs text-gray-600">Divine Heritage Academy, Lagos · 2012 - 2019</p>
                <p className="text-xs text-gray-700 mt-2">Specialized in Mathematics and English Language instruction</p>
              </div>
            </div>
          </div>

          {/* Document Checklist */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
              Document Verification Checklist
            </h3>
            <div className="space-y-2">
              {[
                { doc: 'Degree Certificates', status: 'verified' },
                { doc: 'TRCN License (Current)', status: 'verified' },
                { doc: 'Medical Fitness Certificate', status: 'verified' },
                { doc: 'Police Clearance Certificate', status: 'pending' },
                { doc: 'Passport Photographs', status: 'verified' },
                { doc: 'Reference Letters (2)', status: 'verified' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-2">
                    {item.status === 'verified' ? (
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    <span className="text-sm text-gray-900">{item.doc}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    item.status === 'verified' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {item.status === 'verified' ? 'Verified' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[var(--md-sys-color-surface-container-lowest,#ffffff)] flex items-center justify-between shadow-[0_-1px_4px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>1 document pending verification</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-900 hover:bg-gray-200 text-sm font-semibold transition-all"
            >
              Close
            </button>
            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm font-semibold shadow-sm transition-all">
              Request Missing Document
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
