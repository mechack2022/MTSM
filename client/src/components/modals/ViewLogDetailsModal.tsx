// ============================================================================
// VIEW LOG DETAILS MODAL
// ============================================================================
// Modal for viewing detailed information about a specific audit log entry

import { useState } from 'react'

interface LogDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  logEntry: AuditLogEntry | null
}

export interface AuditLogEntry {
  id: string
  timestamp: string
  date: string
  userName: string
  userRole: string
  userInitials: string
  avatarColor: string
  category: string
  categoryColor: string
  eventTitle: string
  eventDescription: string
  affectedEntity: string
  entityIcon: string
  ipAddress: string
  deviceInfo: string
  changeFrom?: string
  changeTo?: string
  changeReason?: string
  verification?: string
}

export default function ViewLogDetailsModal({ isOpen, onClose, logEntry }: LogDetailsModalProps) {
  const [copySuccess, setCopySuccess] = useState(false)

  if (!isOpen || !logEntry) return null

  const handleCopyDetails = () => {
    const details = `
Log ID: ${logEntry.id}
Event: ${logEntry.eventTitle}
Performed by: ${logEntry.userName} (${logEntry.userRole})
Timestamp: ${logEntry.date} ${logEntry.timestamp}
Category: ${logEntry.category}
IP Address: ${logEntry.ipAddress}
Device: ${logEntry.deviceInfo}
${logEntry.changeFrom ? `Changed from: ${logEntry.changeFrom}` : ''}
${logEntry.changeTo ? `Changed to: ${logEntry.changeTo}` : ''}
${logEntry.changeReason ? `Reason: ${logEntry.changeReason}` : ''}
    `.trim()

    navigator.clipboard.writeText(details).catch(() => {})
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2000)
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300"
      onClick={handleBackdropClick}
    >
      {/* MODAL CARD CONTAINER */}
      <div className="relative w-full bg-white rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden transform transition-all duration-300 max-w-2xl">
        {/* MODAL HEADER */}
        <div className="px-6 py-4 bg-gray-50/70 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 leading-tight">Log Details</h2>
              <p className="text-xs text-gray-600">Summary of administrative event</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Log Details"
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer"
            type="button"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* MODAL BODY SCROLLABLE */}
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
          {/* Event Summary Card */}
          <div className="rounded-xl bg-gray-50 p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <span className={`px-2.5 py-0.5 rounded-full ${logEntry.categoryColor} font-bold text-[11px] tracking-wide uppercase`}>
                {logEntry.category}
              </span>
              <span className="text-xs text-gray-600 flex items-center gap-1 font-medium">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {logEntry.date}, {logEntry.timestamp}
              </span>
            </div>
            <div>
              <span className="text-lg font-semibold text-gray-900 block">{logEntry.eventTitle}</span>
              <span className="text-sm text-gray-600 block mt-1">{logEntry.eventDescription}</span>
            </div>

            {/* Performer and Affected Entity Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {/* Performed By */}
              <div className="p-3 rounded-lg bg-white flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full ${logEntry.avatarColor} font-semibold text-xs flex items-center justify-center shrink-0`}>
                  {logEntry.userInitials}
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] uppercase text-gray-500 block font-bold tracking-wider">Performed By</span>
                  <span className="text-xs font-bold text-gray-900 truncate block">{logEntry.userName}</span>
                  <span className="text-xs text-gray-600 block truncate">{logEntry.userRole}</span>
                </div>
              </div>

              {/* Affected Entity */}
              <div className="p-3 rounded-lg bg-white flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-100 text-green-700 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] uppercase text-gray-500 block font-bold tracking-wider">Affected Entity</span>
                  <span className="text-xs font-bold text-gray-900 truncate block">{logEntry.affectedEntity}</span>
                  <span className="text-xs text-gray-600 block truncate">Campus Settings</span>
                </div>
              </div>
            </div>
          </div>

          {/* What Changed Section (if applicable) */}
          {logEntry.changeFrom && logEntry.changeTo && (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                What Changed
              </span>
              <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm flex flex-col gap-3">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <span className="text-xs text-gray-600 font-medium">Setting</span>
                  <span className="text-xs font-bold text-gray-900">Policy Configuration</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Changed From */}
                  <div className="rounded-lg bg-gray-50 p-3 flex flex-col gap-1">
                    <span className="text-[9px] uppercase text-gray-500 font-bold tracking-wider">Changed From</span>
                    <span className="text-sm text-gray-700 font-medium">{logEntry.changeFrom}</span>
                    <span className="text-xs text-gray-500">Previous value</span>
                  </div>
                  {/* Changed To */}
                  <div className="rounded-lg bg-blue-50/60 p-3 flex flex-col gap-1 shadow-sm border border-blue-100">
                    <span className="text-[9px] uppercase text-blue-700 font-bold tracking-wider">Changed To</span>
                    <span className="text-sm text-blue-900 font-bold">{logEntry.changeTo}</span>
                    <span className="text-xs text-blue-700 font-medium">Current value</span>
                  </div>
                </div>
                {logEntry.changeReason && (
                  <div className="pt-2 text-xs text-gray-600 flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="">Reason: {logEntry.changeReason}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* IP Address and Verification */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-xl bg-gray-50 p-3">
            <div className="flex items-center gap-3 px-2">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <span className="text-[9px] uppercase text-gray-500 block font-bold tracking-wider">IP Address</span>
                <span className="text-xs text-gray-900 font-medium block">{logEntry.ipAddress}</span>
                <span className="text-xs text-gray-600 block">{logEntry.deviceInfo}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div>
                <span className="text-[9px] uppercase text-gray-500 block font-bold tracking-wider">Verification</span>
                <span className="text-xs text-green-700 font-bold block">{logEntry.verification || '2FA Verified'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL FOOTER ACTIONS */}
        <div className="px-6 py-3 bg-gray-50 flex items-center justify-between border-t border-gray-200">
          <button
            onClick={handleCopyDetails}
            className="px-4 py-2 rounded-lg bg-white hover:bg-gray-100 text-gray-900 text-xs font-medium flex items-center gap-1.5 transition-colors shadow-sm border border-gray-200"
            type="button"
          >
            {copySuccess ? (
              <>
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-green-600 font-bold">Copied!</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="">Copy Details</span>
              </>
            )}
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
            type="button"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="">Close</span>
          </button>
        </div>
      </div>
    </div>
  )
}
