import { useAuth, useCurrentContext } from '@/store'

export function PageHeader() {
  const { user } = useAuth()
  const { selectedSchool } = useCurrentContext()

  return (
    <header className="fixed top-0 left-72 right-0 h-16 bg-white/90 backdrop-blur-xl shadow-sm z-40 flex items-center justify-between px-6">
      <div className="flex items-center gap-6 flex-1">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-gray-900 tracking-tight">
              {selectedSchool?.name || 'Loading...'}
            </span>
            {selectedSchool?.localGovernmentName && (
              <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-900 text-[11px] font-bold">
                {selectedSchool.localGovernmentName}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>2024/2025 Term 1 · Week 6</span>
            <span className="mx-1">•</span>
            <span className="text-teal-600 font-semibold">Mid-term Evaluation Period</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-700">
          <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse"></span>
          <span className="text-xs font-bold">Online & Synced</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div className="relative">
          <button className="w-9 h-9 rounded-lg bg-gray-50 text-gray-600 hover:text-gray-900 hover:bg-gray-100 flex items-center justify-center transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
        </div>

        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden lg:block">
            <p className="text-sm font-semibold text-gray-900 leading-tight">
              {user?.fullName || 'User'}
            </p>
            <p className="text-xs text-gray-600">
              {user?.roleName || 'Administrator'}
            </p>
          </div>
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center ring-2 ring-blue-100">
            <svg className="w-[18px] h-[18px] text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  )
}
