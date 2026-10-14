// ============================================================================
// DASHBOARD PAGE - Main Dashboard with Navigation
// ============================================================================

import { Link, useNavigate } from 'react-router-dom'
import { useAuth, useCurrentContext } from '@/store'
import { useLogout } from '@/hooks'
import { useActiveLearners, useActiveClasses } from '@/hooks'
import AnimatedBackground from '@/components/AnimatedBackground'

export default function DashboardPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { selectedSchool } = useCurrentContext()
  const logout = useLogout()

  const { data: learners, isLoading: learnersLoading } = useActiveLearners()
  const { data: classes, isLoading: classesLoading } = useActiveClasses()

  const handleLogout = () => {
    logout.mutate()
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />

      {/* Navigation Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Title */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  ACE EDUManage
                </h1>
                {selectedSchool && (
                  <p className="text-xs text-gray-600">{selectedSchool.name}</p>
                )}
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              <Link
                to="/dashboard"
                className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg"
              >
                Dashboard
              </Link>
              {user?.isPlatformAdmin && (
                <Link
                  to="/tenants"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Tenants
                </Link>
              )}
              {!user?.isPlatformAdmin && (
                <Link
                  to="/code-sets"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  CodeSets
                </Link>
              )}
              <Link
                to="/schools"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Schools
              </Link>
              <Link
                to="/attendance"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Attendance
              </Link>
              <Link
                to="/learners"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Learners
              </Link>
              <Link
                to="/classes"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Classes
              </Link>
              <Link
                to="/reports"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Reports
              </Link>
            </nav>

            {/* User Menu */}
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">
                  {user?.fullName}
                </p>
                <p className="text-xs text-gray-600">{user?.username}</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.fullName?.split(' ')[0]}! 👋
          </h2>
          <p className="text-gray-600">
            Here's what's happening with your school today.
          </p>
        </div>

        {/* School Info Banner */}
        {selectedSchool && (
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 mb-8 text-white">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold mb-1">{selectedSchool.name}</h3>
                <p className="text-blue-100 text-sm">{selectedSchool.address || 'No address'}</p>
                <p className="text-blue-100 text-sm mt-1">
                  Contact: {selectedSchool.phone || 'No contact'}
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <p className="text-xs text-blue-100">School Code</p>
                <p className="font-mono text-sm">{selectedSchool.code || 'N/A'}</p>
              </div>
            </div>
          </div>
        )}

        {!selectedSchool && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-yellow-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-sm font-semibold text-yellow-900 mb-1">
                  No School Selected
                </h3>
                <p className="text-sm text-yellow-800">
                  You don't have any schools assigned yet. Please contact your administrator.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Learners */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 rounded-lg p-3">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <span className="text-xs font-medium text-gray-500 uppercase">
                Learners
              </span>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">
                {learnersLoading ? (
                  <span className="animate-pulse">...</span>
                ) : (
                  learners?.length || 0
                )}
              </p>
              <p className="text-sm text-gray-600 mt-1">Active students</p>
            </div>
          </div>

          {/* Total Classes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 rounded-lg p-3">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <span className="text-xs font-medium text-gray-500 uppercase">
                Classes
              </span>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">
                {classesLoading ? (
                  <span className="animate-pulse">...</span>
                ) : (
                  classes?.length || 0
                )}
              </p>
              <p className="text-sm text-gray-600 mt-1">Active class sections</p>
            </div>
          </div>

          {/* Today's Attendance */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 rounded-lg p-3">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <span className="text-xs font-medium text-gray-500 uppercase">
                Today
              </span>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">-</p>
              <p className="text-sm text-gray-600 mt-1">
                Attendance not implemented
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => navigate('/attendance')}
              className="group p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
            >
              <div className="text-3xl mb-3">📋</div>
              <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-1">
                Mark Attendance
              </h4>
              <p className="text-sm text-gray-600">
                Record daily attendance for classes
              </p>
            </button>

            <button
              onClick={() => navigate('/learners')}
              className="group p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all text-left"
            >
              <div className="text-3xl mb-3">👥</div>
              <h4 className="font-semibold text-gray-900 group-hover:text-green-600 mb-1">
                Manage Learners
              </h4>
              <p className="text-sm text-gray-600">
                Add, edit, or view learner profiles
              </p>
            </button>

            <button
              onClick={() => navigate('/classes')}
              className="group p-4 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all text-left"
            >
              <div className="text-3xl mb-3">🏫</div>
              <h4 className="font-semibold text-gray-900 group-hover:text-purple-600 mb-1">
                Manage Classes
              </h4>
              <p className="text-sm text-gray-600">
                View and manage class sections
              </p>
            </button>

            <button
              onClick={() => navigate('/reports')}
              className="group p-4 border-2 border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all text-left"
            >
              <div className="text-3xl mb-3">📊</div>
              <h4 className="font-semibold text-gray-900 group-hover:text-orange-600 mb-1">
                View Reports
              </h4>
              <p className="text-sm text-gray-600">
                Attendance analytics and insights
              </p>
            </button>
          </div>
        </div>

        {/* Recent Activity Placeholder */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="text-center py-12 text-gray-500">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-sm">No recent activity to display</p>
          </div>
        </div>
      </main>
    </div>
  )
}
