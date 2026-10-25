// ============================================================================
// ASSIGN LEADERSHIP MODAL - Principal & Registrar Appointment
// ============================================================================
// Modern React implementation with ALL original content preserved
// ============================================================================

import { useState } from 'react'

interface AssignLeadershipModalProps {
  isOpen: boolean
  onClose: () => void
  campusName?: string
  campusNodeId?: string
  onSubmit?: (data: LeadershipFormData) => void
}

interface LeadershipFormData {
  executiveRole: 'principal' | 'registrar'
  fullName: string
  nin: string
  trcnNumber: string
  email: string
  phone: string
  authorities: {
    admissions: boolean
    classAllocation: boolean
    caEndorsement: boolean
    broadsheet: boolean
    tuitionOverride: boolean
  }
  recoveryToken: string
}

export default function AssignLeadershipModal({
  isOpen,
  onClose,
  campusName = 'Lekki Phase 1 Branch',
  campusNodeId = 'CRN-LEK-02',
  onSubmit
}: AssignLeadershipModalProps) {
  // Form state
  const [executiveRole, setExecutiveRole] = useState<'principal' | 'registrar'>('registrar')
  const [fullName, setFullName] = useState('Mrs. Chinyere Nwosu')
  const [nin, setNin] = useState('7849 2018 3920')
  const [trcnNumber, setTrcnNumber] = useState('TRCN/LA/2019/84920')
  const [email, setEmail] = useState('registrar.lekki@oasis.edumanage.ng')
  const [phone, setPhone] = useState('803 456 7890')

  // RBAC Authorities
  const [admissions, setAdmissions] = useState(true)
  const [classAllocation, setClassAllocation] = useState(true)
  const [caEndorsement, setCaEndorsement] = useState(true)
  const [broadsheet, setBroadsheet] = useState(true)
  const [tuitionOverride, setTuitionOverride] = useState(false)

  const recoveryToken = 'LEK-REG-2026-X89'

  const handleSubmit = () => {
    const formData: LeadershipFormData = {
      executiveRole,
      fullName,
      nin,
      trcnNumber,
      email,
      phone,
      authorities: {
        admissions,
        classAllocation,
        caEndorsement,
        broadsheet,
        tuitionOverride
      },
      recoveryToken
    }

    onSubmit?.(formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 left-72 z-40 bg-gray-900/40 backdrop-blur-md flex items-center justify-center p-6 overflow-y-auto"
        onClick={onClose}
      />

      {/* Modal Window Container */}
      <div className="fixed inset-0 left-72 z-50 flex items-center justify-center p-6 pointer-events-none overflow-y-auto">
        <div
          className="w-full max-w-4xl my-auto bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden max-h-[942px] animate-in fade-in zoom-in-95 duration-200 pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Top Bar & Context Breadcrumbs */}
          <div className="px-8 pt-6 pb-4 bg-gray-50 flex flex-col gap-2 shrink-0">
            <div className="flex items-center justify-between">
              {/* Breadcrumb Micro-Navigation */}
              <div className="flex items-center gap-2 text-gray-600 text-xs font-medium">
                <span>Sovereign Enclave</span>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <span>Campus Architecture</span>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <span className="text-blue-600 font-bold">Appoint Executive Campus Leadership</span>
              </div>

              {/* Close Modal Trigger */}
              <button
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 transition-colors"
                title="Close Dialog"
                type="button"
                onClick={onClose}
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Campus Headline Banner */}
            <div className="flex flex-wrap items-center justify-between gap-3 mt-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px]">verified_user</span>
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900 leading-tight">
                    Appoint Campus Leadership: {campusName}
                  </h1>
                  <span className="text-sm text-gray-600">
                    Node ID: {campusNodeId} • Zone 1 Institutional Authority
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-yellow-600 animate-pulse"></span>
                <span className="text-[10px] font-bold uppercase tracking-wider">Vacant Registrar Seat</span>
                <span className="text-yellow-600 opacity-40">•</span>
                <span className="text-[10px] font-semibold">Head of School Active</span>
              </div>
            </div>
          </div>

          {/* Scrollable Form Body */}
          <div className="p-8 overflow-y-auto space-y-8 flex-1">
            {/* 1. Executive Role Selection */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase text-gray-600 tracking-wider">
                  Step 1 • Targeted Governance Seat
                </span>
                <span className="text-xs font-medium text-blue-600">
                  Statutory Requirement: NIMC Gazette 2026
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Principal Card (Occupied) */}
                <label className="relative flex flex-col p-4 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-900">
                        <span className="material-symbols-outlined text-[18px]">school</span>
                      </div>
                      <div>
                        <span className="text-base font-bold text-gray-900 block leading-none">
                          Head of School / Principal
                        </span>
                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                          Currently Occupied
                        </span>
                      </div>
                    </div>
                    <input
                      className="w-4 h-4 text-blue-600 accent-blue-600"
                      name="executive_role"
                      type="radio"
                      value="principal"
                      checked={executiveRole === 'principal'}
                      onChange={() => setExecutiveRole('principal')}
                    />
                  </div>

                  <div className="mt-4 pt-2 flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-gray-900 text-xs font-medium">
                      <span className="material-symbols-outlined text-[16px] text-blue-600">person</span>
                      <span>Mr. Babatunde Sanusi</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-xs">
                      <span className="material-symbols-outlined text-[16px] text-blue-500">verified</span>
                      <span>TRCN Verified • 08023456781</span>
                    </div>
                    <div className="mt-2">
                      <span className="inline-block text-blue-600 text-xs font-medium hover:underline">
                        Reassign or update credentials →
                      </span>
                    </div>
                  </div>
                </label>

                {/* Campus Registrar Card (Selected / Vacant) */}
                <label className="relative flex flex-col p-4 rounded-xl bg-blue-50 shadow-md cursor-pointer border-2 border-blue-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                        <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                      </div>
                      <div>
                        <span className="text-base font-bold text-gray-900 block leading-none">
                          Campus Registrar
                        </span>
                        <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">
                          Immediate Statutory Vacancy
                        </span>
                      </div>
                    </div>
                    <input
                      checked={executiveRole === 'registrar'}
                      className="w-4 h-4 text-blue-600 accent-blue-600"
                      name="executive_role"
                      type="radio"
                      value="registrar"
                      onChange={() => setExecutiveRole('registrar')}
                    />
                  </div>

                  <div className="mt-4 pt-2 flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-red-600 text-xs font-medium">
                      <span className="material-symbols-outlined text-[16px]">error_outline</span>
                      <span>Intake Paused: Mandatory for NIMC Student Sync</span>
                    </div>
                    <p className="text-xs text-gray-600">
                      Responsible for WAEC/NECO continuous broadsheets, local stamp authority, and primary identity KYC.
                    </p>
                    <div className="mt-2 flex items-center gap-1 text-blue-600 text-xs font-medium">
                      <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
                      <span>Awaiting Appointee Ingestion</span>
                    </div>
                  </div>
                </label>
              </div>
            </section>

            {/* 2. Appointee Identity & Statutory Credentials */}
            <section className="space-y-4 p-6 rounded-xl bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-600 text-[20px]">badge</span>
                  <span className="text-xl font-semibold text-gray-900">
                    Appointee Identity & Statutory Credentials
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-[10px] font-bold">
                  <span className="material-symbols-outlined text-[14px]">bolt</span>
                  <span>Federal Bridge Active</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Legal Name */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-900 flex items-center gap-1">
                    Full Legal Name (as registered with NIMC)
                    <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      className="w-full px-4 py-2.5 rounded-lg bg-white text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm"
                      placeholder="e.g. Mrs. Chinyere Nwosu"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    <span className="absolute right-3 top-2.5 material-symbols-outlined text-blue-500 text-[20px]">
                      check_circle
                    </span>
                  </div>
                  <span className="text-xs text-gray-600">
                    Must match Bank Verification Number (BVN) and Teachers Roster
                  </span>
                </div>

                {/* NIMC NIN & Instant Verification */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-900 flex items-center justify-between">
                    <span>
                      National Identification Number (NIN) <span className="text-red-600">*</span>
                    </span>
                    <span className="text-[10px] font-bold text-blue-500 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]">verified</span>
                      Instant NIMC API Verified
                    </span>
                  </label>
                  <div className="relative flex items-center">
                    <input
                      className="w-full px-4 py-2.5 rounded-lg bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                      placeholder="11-digit NIN"
                      type="text"
                      value={nin}
                      onChange={(e) => setNin(e.target.value)}
                    />
                    <div className="absolute right-2 px-2 py-1 rounded bg-blue-100 text-blue-600 text-[10px] font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                      NIMC AUTH #9921
                    </div>
                  </div>
                  <span className="text-xs text-gray-600">
                    Validated against National Identity Management Database
                  </span>
                </div>

                {/* TRCN Number */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-900 flex items-center gap-1">
                    TRCN License Number
                    <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      className="w-full px-4 py-2.5 rounded-lg bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm"
                      placeholder="TRCN/XX/YYYY/XXXXX"
                      type="text"
                      value={trcnNumber}
                      onChange={(e) => setTrcnNumber(e.target.value)}
                    />
                    <span className="absolute right-3 top-2.5 material-symbols-outlined text-blue-500 text-[20px]">
                      assignment_turned_in
                    </span>
                  </div>
                  <span className="text-xs text-gray-600">
                    Lagos State Chapter • Certified Master Administrator
                  </span>
                </div>

                {/* Official Email */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-900 flex items-center gap-1">
                    Institutional Official Email
                    <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      className="w-full px-4 py-2.5 rounded-lg bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm"
                      placeholder="registrar.campus@oasis.edumanage.ng"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <span className="absolute right-3 top-2.5 material-symbols-outlined text-gray-500 text-[20px]">
                      mail
                    </span>
                  </div>
                  <span className="text-xs text-gray-600">
                    Auto-provisioned with HSM multi-tenant mailbox
                  </span>
                </div>

                {/* Mobile for WhatsApp Key Delivery */}
                <div className="flex flex-col gap-1 md:col-span-2">
                  <label className="text-xs font-semibold text-gray-900 flex items-center gap-1">
                    Direct Mobile for Encrypted WhatsApp Handshake
                    <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-2.5 flex items-center gap-1 text-gray-600 text-xs font-medium">
                      <span className="material-symbols-outlined text-[16px] text-blue-500">chat</span>
                      <span>NG +234</span>
                    </div>
                    <input
                      className="w-full pl-24 pr-4 py-2.5 rounded-lg bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm"
                      placeholder="800 000 0000"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <span className="text-xs text-gray-600">
                    Required for hardware biometric token binding and zero-trust login pins
                  </span>
                </div>
              </div>
            </section>

            {/* 3. Delegation of RBAC Powers & Academic Authorities */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-600 text-[20px]">
                    admin_panel_settings
                  </span>
                  <span className="text-xl font-semibold text-gray-900">
                    Delegation of RBAC Powers & Academic Authorities
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-gray-200 text-gray-600 text-[10px] font-bold">
                  Default Registrar Profile
                </span>
              </div>

              <div className="grid grid-cols-1 gap-1 bg-white rounded-xl p-3 shadow-sm">
                {/* Authority Item 1 */}
                <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <input
                    checked={admissions}
                    className="mt-1 w-4 h-4 text-blue-600 accent-blue-600 rounded"
                    type="checkbox"
                    onChange={(e) => setAdmissions(e.target.checked)}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-gray-900">
                        Statutory Learner Admissions & NIMC KYC Ingestion
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-600 text-[10px] font-bold">
                        Statutory
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">
                      Authorized to enroll candidates, ingest biometric fingerprints, and validate NIN tokens directly to UBEC registry.
                    </p>
                  </div>
                </label>

                {/* Authority Item 2 */}
                <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <input
                    checked={classAllocation}
                    className="mt-1 w-4 h-4 text-blue-600 accent-blue-600 rounded"
                    type="checkbox"
                    onChange={(e) => setClassAllocation(e.target.checked)}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-gray-900">
                        Class Arm & Form Tutor Allocation
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">
                      Empowered to segment Junior and Senior Secondary classes (JSS1-SSS3) and assign subject teachers.
                    </p>
                  </div>
                </label>

                {/* Authority Item 3 */}
                <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <input
                    checked={caEndorsement}
                    className="mt-1 w-4 h-4 text-blue-600 accent-blue-600 rounded"
                    type="checkbox"
                    onChange={(e) => setCaEndorsement(e.target.checked)}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-gray-900">
                        WAEC / NECO Continuous Assessment (CA) Score Endorsement
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-600 text-[10px] font-bold">
                        Strict Compliance
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">
                      Authority to sign terminal CA portal uploads to the National Examination Council and West African Examinations Council.
                    </p>
                  </div>
                </label>

                {/* Authority Item 4 */}
                <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <input
                    checked={broadsheet}
                    className="mt-1 w-4 h-4 text-blue-600 accent-blue-600 rounded"
                    type="checkbox"
                    onChange={(e) => setBroadsheet(e.target.checked)}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-gray-900">
                        Terminal Broadsheet & Statutory Stamp Authority
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">
                      Applies digital cryptographic watermark & seal to student report cards and transfer certificates.
                    </p>
                  </div>
                </label>

                {/* Authority Item 5 (Restricted) */}
                <label className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer">
                  <input
                    checked={tuitionOverride}
                    className="mt-1 w-4 h-4 text-blue-600 accent-blue-600 rounded"
                    type="checkbox"
                    onChange={(e) => setTuitionOverride(e.target.checked)}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-gray-900">
                        Tuition Collection & Fee Exemption Overrides
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-yellow-100 text-yellow-800 text-[10px] font-bold">
                        Dual-Key Required
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">
                      Requires Proprietor General or Trustee Dual-Key Authorization for scholarship allocations or fee write-offs.
                    </p>
                  </div>
                </label>
              </div>
            </section>

            {/* 4. Fast-Track Dispatch & Cryptographic Handshake */}
            <section className="p-4 rounded-xl bg-gray-50 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">key</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-gray-900">
                      Dispatch Instant WhatsApp Secure Passkey & Magic Link
                    </span>
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  </div>
                  <p className="text-xs text-gray-600">
                    One-time provisioning token generated with 48-hour hardware attestation lifetime.
                  </p>
                </div>
              </div>

              {/* Code Generator Pill */}
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm shrink-0">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase text-gray-600">Recovery Token</span>
                  <span className="text-xs font-mono font-bold text-blue-600 tracking-wider">
                    {recoveryToken}
                  </span>
                </div>
                <button
                  className="p-1 text-gray-600 hover:text-blue-600 transition-colors"
                  title="Copy Token"
                  type="button"
                  onClick={() => navigator.clipboard.writeText(recoveryToken)}
                >
                  <span className="material-symbols-outlined text-[18px]">content_copy</span>
                </button>
              </div>
            </section>
          </div>

          {/* Modal Action Footer */}
          <div className="px-8 py-4 bg-gray-50 flex flex-wrap items-center justify-between gap-4 shrink-0">
            <div className="flex items-center gap-2 text-gray-600 text-xs">
              <span className="material-symbols-outlined text-blue-500 text-[16px]">lock</span>
              <span>End-to-End Encrypted Authority Handshake (Zone 1 Master HSM)</span>
            </div>

            <div className="flex items-center gap-3">
              {/* Cancel / Close */}
              <button
                className="px-4 py-2.5 rounded-lg text-gray-900 text-xs font-medium hover:bg-gray-100 transition-colors"
                type="button"
                onClick={onClose}
              >
                Cancel / Close
              </button>

              {/* Save as Draft */}
              <button
                className="px-4 py-2.5 rounded-lg bg-gray-200 text-gray-900 text-xs font-medium hover:bg-gray-300 transition-colors"
                type="button"
              >
                Save as Draft Appointee
              </button>

              {/* Primary Confirmation Action */}
              <button
                className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-bold shadow-md hover:bg-blue-700 transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
                type="button"
                onClick={handleSubmit}
              >
                <span>Confirm Statutory Appointment & Dispatch Credentials</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
