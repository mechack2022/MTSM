// ============================================================================
// APPOINTMENT SUCCESS MODAL
// ============================================================================
// Confirmation modal shown after successfully appointing a senior leader
// Shows dispatch status, credentials, and appointee details

import { useState } from 'react'

interface AppointeeDetails {
  fullName: string
  designation: string
  campus: string
  staffId: string
  monthlyLimit: string
  phone: string
  email: string
  initials?: string
}

interface AppointmentSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  appointee: AppointeeDetails | null
}

export default function AppointmentSuccessModal({ isOpen, onClose, appointee }: AppointmentSuccessModalProps) {
  const [copyLabel, setCopyLabel] = useState('Copy Credentials')
  const [copyIcon, setCopyIcon] = useState('content_copy')
  const [resendLabel, setResendLabel] = useState('Resend WhatsApp Link')
  const [isResending, setIsResending] = useState(false)

  if (!isOpen || !appointee) return null

  const temporaryPasscode = 'CJET-WELCOME-2026!'

  const handleCopyPasscode = async () => {
    try {
      await navigator.clipboard.writeText(temporaryPasscode)
      setCopyLabel('Copied to Clipboard!')
      setCopyIcon('check_circle')

      setTimeout(() => {
        setCopyLabel('Copy Credentials')
        setCopyIcon('content_copy')
      }, 2500)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleResendWhatsApp = () => {
    setIsResending(true)
    setResendLabel('Link Resent via WhatsApp!')

    setTimeout(() => {
      setResendLabel('Resend WhatsApp Link')
      setIsResending(false)
    }, 2500)
  }

  const getInitials = () => {
    if (appointee.initials) return appointee.initials
    return appointee.fullName
      .split(' ')
      .map(n => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
  }

  return (
    <>
      {/* Modal Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
        onClick={onClose}
      >
        {/* Modal Card */}
        <div
          className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col relative transform transition-all animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative gradient bar */}
          <div className="h-2 w-full bg-gradient-to-r from-blue-600 via-teal-500 to-blue-500"></div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors z-10"
            title="Close confirmation"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 flex flex-col gap-6">
            {/* 1. Header & Success Icon */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 shadow-sm ring-4 ring-teal-50/50">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <div className="flex flex-col pr-6">
                <h2 className="text-xl font-bold text-gray-900 tracking-tight leading-snug">
                  Appointment Mandate Issued Successfully
                </h2>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                  Official invitation, executive access credentials, and the Crown Jewel Trust board mandate have been dispatched to{' '}
                  <span className="font-semibold text-gray-900">{appointee.fullName}</span>.
                </p>
              </div>
            </div>

            {/* 2. Appointee Summary Card */}
            <div className="bg-blue-50 rounded-xl p-4 sm:p-5 flex flex-col gap-3.5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center shadow-sm text-sm">
                    {getInitials()}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-bold text-gray-900">{appointee.fullName}</span>
                    <span className="text-xs font-semibold text-blue-700">{appointee.designation}</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-[11px] font-bold tracking-wider uppercase">
                  Executive
                </span>
              </div>

              <div className="w-full h-px bg-blue-200/50"></div>

              {/* Structured Meta Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-0.5">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-600 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Assigned Campus
                  </span>
                  <span className="text-xs font-semibold text-gray-900 mt-0.5">{appointee.campus}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-600 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                    Staff ID
                  </span>
                  <span className="text-xs font-semibold text-gray-900 mt-0.5">{appointee.staffId}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-600 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Spending Authority
                  </span>
                  <span className="text-xs font-semibold text-teal-600 mt-0.5">₦{appointee.monthlyLimit} / mo</span>
                </div>
              </div>
            </div>

            {/* 3. Credential & Dispatch Status Tracking */}
            <div className="flex flex-col gap-2.5">
              <span className="text-[11px] font-bold uppercase text-gray-500 tracking-wider">
                Multi-Channel Dispatch Channels
              </span>
              <div className="flex flex-col gap-2">
                {/* WhatsApp Dispatch */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-gray-900">Direct WhatsApp Dispatch</span>
                      <span className="text-xs text-gray-600">Sent to {appointee.phone} (Instant mobile setup link)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-100 text-teal-700 text-[11px] font-bold">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Delivered</span>
                  </div>
                </div>

                {/* Official Institutional Email */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-gray-900">Institutional Email</span>
                      <span className="text-xs text-gray-600">Sent to {appointee.email} (Welcome letter &amp; temp key)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-100 text-teal-700 text-[11px] font-bold">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Queued • Sent</span>
                  </div>
                </div>

                {/* 2FA & Activation Window */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 text-blue-600 flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-gray-900">2FA Security • 72-Hour Activation</span>
                      <span className="text-xs text-gray-600">Requires WhatsApp OTP confirmation upon initial portal sign-in</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-gray-200 text-gray-700 text-[11px] font-bold">
                    Expires in 72h
                  </span>
                </div>
              </div>
            </div>

            {/* 4. Temporary Access Key */}
            <div className="flex flex-col gap-1.5 p-3.5 rounded-xl bg-gray-50 shadow-inner">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-700 font-semibold flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  Temporary Master Access Passcode
                </span>
                <span className="text-xs text-gray-500">One-time authentication key</span>
              </div>
              <div className="flex items-center justify-between gap-3 mt-1 bg-white px-3.5 py-2 rounded-lg border border-gray-200">
                <code className="font-mono text-gray-900 font-semibold tracking-wider text-sm select-all">
                  {temporaryPasscode}
                </code>
                <button
                  onClick={handleCopyPasscode}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all shadow-sm text-xs font-semibold ${
                    copyIcon === 'check_circle'
                      ? 'bg-teal-100 text-teal-700'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {copyIcon === 'check_circle' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    )}
                  </svg>
                  <span>{copyLabel}</span>
                </button>
              </div>
            </div>
          </div>

          {/* 5. Actions Footer */}
          <div className="p-6 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-inner">
            <button
              onClick={handleResendWhatsApp}
              className={`w-full sm:w-auto px-4 py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors ${
                isResending
                  ? 'bg-teal-100 text-teal-700'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span>{resendLabel}</span>
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Done &amp; Return to Directory</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
