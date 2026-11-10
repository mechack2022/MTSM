// ============================================================================
// APPOINT STAFF MEMBER MODAL
// ============================================================================
// High-fidelity modal for appointing senior school executives (Principals,
// Vice Principals, Bursars, Registrars) under Crown Jewel Education Trust

import { useState, FormEvent } from 'react'
import toast from 'react-hot-toast'

interface AppointStaffModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: AppointStaffFormData) => void
}

export interface AppointStaffFormData {
  fullName: string
  email: string
  phone: string
  campus: string
  role: string
  staffId: string
}

export default function AppointStaffModal({ isOpen, onClose, onSubmit }: AppointStaffModalProps) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [campus, setCampus] = useState('lekki')
  const [role, setRole] = useState('principal')
  const [staffId, setStaffId] = useState('CJET-STF-085')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRegenerateStaffId = () => {
    const campusPrefix = campus.toUpperCase().slice(0, 3) || 'LEK'
    const randomNum = Math.floor(100 + Math.random() * 900)
    setStaffId(`CJET-${campusPrefix}-${randomNum}`)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate credential dispatch
    await new Promise(resolve => setTimeout(resolve, 1200))

    const formData: AppointStaffFormData = {
      fullName,
      email,
      phone,
      campus,
      role,
      staffId,
    }

    onSubmit(formData)
    setIsSubmitting(false)

    // Reset form
    setFullName('')
    setEmail('')
    setPhone('')
    setCampus('lekki')
    setRole('principal')
    setStaffId('CJET-STF-085')

    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/40 backdrop-blur-sm">
      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden my-8 flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 flex items-start justify-between">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-lg font-bold text-gray-900 tracking-tight">Appoint Senior School Executive</h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[11px] font-bold tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  PROPRIETOR MANDATE
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Appoint and confer executive mandates for Heads of School, Principals, and Executive Directors under Crown Jewel Education Trust.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 flex items-center justify-center transition-colors flex-shrink-0 ml-3"
            title="Close dialog"
            type="button"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Form Body */}
        <form id="appointStaffForm" onSubmit={handleSubmit} className="px-6 py-5 space-y-6 max-h-[calc(85vh-140px)] overflow-y-auto overscroll-contain">
          {/* SECTION 1: Personal Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 pb-0.5">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">1</div>
              <span className="text-sm font-bold text-gray-900">Senior Executive Appointee Information</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Legal Name */}
              <div className="md:col-span-2 space-y-1.5">
                <label className="block text-xs font-semibold text-gray-900" htmlFor="fullName">Full Legal Name</label>
                <div className="relative flex items-center">
                  <svg className="w-4 h-4 absolute left-3.5 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <input
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white text-gray-900 placeholder:text-gray-500 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-none transition-all"
                    id="fullName"
                    placeholder="e.g. Engr. Daniel Adeleke"
                    required
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>

              {/* Official Email Address */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-900" htmlFor="staffEmail">Official Email Address</label>
                <div className="relative flex items-center">
                  <svg className="w-4 h-4 absolute left-3.5 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <input
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white text-gray-900 placeholder:text-gray-500 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-none transition-all"
                    id="staffEmail"
                    placeholder="d.adeleke@crownjewel-edu.ng"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Nigerian Mobile Phone */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-900" htmlFor="phoneNumber">Nigerian Mobile Phone</label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 flex items-center gap-1.5 pointer-events-none text-gray-900 text-xs pr-2 border-r border-gray-300">
                    <span className="text-sm leading-none" title="Nigeria">🇳🇬</span>
                    <span className="font-bold">+234</span>
                  </div>
                  <input
                    className="w-full pl-24 pr-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white text-gray-900 placeholder:text-gray-500 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-none transition-all"
                    id="phoneNumber"
                    placeholder="0803 456 7890"
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <span className="block text-[11px] text-gray-600">Used for direct WhatsApp &amp; SMS credential dispatch</span>
              </div>
            </div>
          </div>

          {/* SECTION 2: Role & Campus Assignment */}
          <div className="space-y-4 pt-1">
            <div className="flex items-center gap-2.5 pb-0.5">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">2</div>
              <span className="text-sm font-bold text-gray-900">Executive Role &amp; Campus Assignment</span>
            </div>

            <div className="space-y-3">
              {/* Target Campus */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-900" htmlFor="targetCampus">Governing Campus Jurisdiction</label>
                <div className="relative flex items-center">
                  <svg className="w-4 h-4 absolute left-3.5 text-blue-600 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <select
                    className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white text-gray-900 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-none appearance-none cursor-pointer transition-all"
                    id="targetCampus"
                    value={campus}
                    onChange={(e) => setCampus(e.target.value)}
                  >
                    <option value="lekki">Crown Jewel High School – Lekki</option>
                    <option value="ikeja">Crown Jewel Preparatory – Ikeja</option>
                    <option value="abuja">Crown Jewel Academy – Abuja (Asokoro)</option>
                    <option value="central">Central Academic Trust Secretariat</option>
                  </select>
                  <svg className="w-4 h-4 absolute right-3 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Designated Appointed Senior Executive Role 2x2 grid */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-gray-900">Senior Executive Appointed Office</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Option 1: Principal / Head of School */}
                  <label className={`relative flex items-start p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    role === 'principal' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                  }`}>
                    <input
                      checked={role === 'principal'}
                      className="sr-only peer"
                      name="appointedRole"
                      type="radio"
                      value="principal"
                      onChange={(e) => setRole(e.target.value)}
                    />
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mr-2.5 mt-0.5 flex-shrink-0 ${
                      role === 'principal' ? 'border-blue-600 bg-blue-600' : 'border-gray-300 bg-white'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full bg-white ${role === 'principal' ? 'opacity-100' : 'opacity-0'}`}></span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className={`text-xs font-bold leading-snug ${role === 'principal' ? 'text-blue-600' : 'text-gray-900'}`}>Principal / Head of School</span>
                      <span className="text-[11px] text-gray-600 leading-tight mt-0.5">Chief Executive &amp; Academic Officer</span>
                    </div>
                  </label>

                  {/* Option 2: Vice Principal / Deputy Head */}
                  <label className={`relative flex items-start p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    role === 'vice_principal' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                  }`}>
                    <input
                      checked={role === 'vice_principal'}
                      className="sr-only peer"
                      name="appointedRole"
                      type="radio"
                      value="vice_principal"
                      onChange={(e) => setRole(e.target.value)}
                    />
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mr-2.5 mt-0.5 flex-shrink-0 ${
                      role === 'vice_principal' ? 'border-blue-600 bg-blue-600' : 'border-gray-300 bg-white'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full bg-white ${role === 'vice_principal' ? 'opacity-100' : 'opacity-0'}`}></span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className={`text-xs font-bold leading-snug ${role === 'vice_principal' ? 'text-blue-600' : 'text-gray-900'}`}>Vice Principal / Deputy Head</span>
                      <span className="text-[11px] text-gray-600 leading-tight mt-0.5">Academic &amp; Curricular Governance</span>
                    </div>
                  </label>

                  {/* Option 3: Bursar / Director of Finance */}
                  <label className={`relative flex items-start p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    role === 'bursar_director' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                  }`}>
                    <input
                      checked={role === 'bursar_director'}
                      className="sr-only peer"
                      name="appointedRole"
                      type="radio"
                      value="bursar_director"
                      onChange={(e) => setRole(e.target.value)}
                    />
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mr-2.5 mt-0.5 flex-shrink-0 ${
                      role === 'bursar_director' ? 'border-blue-600 bg-blue-600' : 'border-gray-300 bg-white'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full bg-white ${role === 'bursar_director' ? 'opacity-100' : 'opacity-0'}`}></span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className={`text-xs font-bold leading-snug ${role === 'bursar_director' ? 'text-blue-600' : 'text-gray-900'}`}>Bursar / Director of Finance</span>
                      <span className="text-[11px] text-gray-600 leading-tight mt-0.5">Financial Oversight &amp; Trust Audits</span>
                    </div>
                  </label>

                  {/* Option 4: Campus Administrator / Registrar */}
                  <label className={`relative flex items-start p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    role === 'registrar_director' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                  }`}>
                    <input
                      checked={role === 'registrar_director'}
                      className="sr-only peer"
                      name="appointedRole"
                      type="radio"
                      value="registrar_director"
                      onChange={(e) => setRole(e.target.value)}
                    />
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mr-2.5 mt-0.5 flex-shrink-0 ${
                      role === 'registrar_director' ? 'border-blue-600 bg-blue-600' : 'border-gray-300 bg-white'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full bg-white ${role === 'registrar_director' ? 'opacity-100' : 'opacity-0'}`}></span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className={`text-xs font-bold leading-snug ${role === 'registrar_director' ? 'text-blue-600' : 'text-gray-900'}`}>Campus Administrator / Registrar</span>
                      <span className="text-[11px] text-gray-600 leading-tight mt-0.5">Institutional Governance &amp; Compliance</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Governance Callout Note */}
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-start gap-2.5">
                <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  <strong className="text-gray-900 font-semibold">Notice:</strong> Hiring of teaching faculty, subject specialists, and support staff is delegated to the respective Campus Principal via their School Portal.
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 3: Credentials & Staff ID */}
          <div className="space-y-4 pt-1">
            <div className="flex items-center gap-2.5 pb-0.5">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">3</div>
              <span className="text-sm font-bold text-gray-900">Board Resolution &amp; Executive Mandate</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
              {/* Staff Identification Number with Auto-Gen */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-900" htmlFor="staffId">Board Resolution / Staff ID</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-blue-600 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <input
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white text-gray-900 text-xs tracking-wider uppercase font-bold focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-none transition-all"
                      id="staffId"
                      required
                      type="text"
                      value={staffId}
                      onChange={(e) => setStaffId(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={handleRegenerateStaffId}
                    className="px-3 py-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 border border-blue-200 text-xs font-semibold flex items-center gap-1 transition-colors"
                    title="Auto-generate next ID"
                    type="button"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Auto-Gen</span>
                  </button>
                </div>
              </div>

              {/* Credential Delivery Method Badge Banner */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-900">Credential Delivery</label>
                <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                    </svg>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-gray-900">WhatsApp &amp; Email Dispatch</span>
                    <span className="text-[11px] text-gray-600 leading-tight">Auto-sends activation link &amp; OTP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 text-gray-900 text-xs font-medium transition-colors text-center"
            type="button"
          >
            Cancel
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              const form = document.getElementById('appointStaffForm') as HTMLFormElement
              if (form) form.requestSubmit()
            }}
            disabled={isSubmitting}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm flex items-center justify-center gap-1.5 transition-all transform active:scale-[0.98] disabled:opacity-50"
            type="button"
          >
            {isSubmitting ? (
              <>
                <svg className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" viewBox="0 0 24 24"></svg>
                <span>Dispatching Credentials...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>+ Appoint Senior Leader &amp; Dispatch Mandate</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
